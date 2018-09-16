use crate::*;
use chess_minimax::{
    board::Board,
    Side
};
use js_sys::Function;
use std::{
    collections::HashSet,
    io::{self, Write},
    str
};

pub struct JsWriter(Function);

impl JsWriter {
    fn call(&self, data: &[u8]) {
        let s = str::from_utf8(data).unwrap();
        self.0.call1(&JsValue::NULL, &JsValue::from(s)).unwrap();
    }
}
impl Write for JsWriter {
    fn write(&mut self, data: &[u8]) -> io::Result<usize> {
        // Replace \n with \r\n
        let mut start = 0;
        while let Some(newline) = data[start..].iter().position(|b| *b == b'\n') {
            self.call(&data[start..newline]);
            self.call(b"\r\n");
            start = newline+1;
        }
        self.call(&data[start..]);
        Ok(data.len())
    }
    fn flush(&mut self) -> io::Result<()> {
        Ok(())
    }
}

#[wasm_bindgen]
pub struct ChessTerm(chess_minimax::terminal::Session<JsWriter>);

#[wasm_bindgen]
impl ChessTerm {
    #[wasm_bindgen(constructor)]
    pub fn new(write: Function) -> Self {
        ChessTerm(chess_minimax::terminal::Session {
            out: JsWriter(write),
            board: Board::new(),
            side: Side::Black,
            undo: Vec::new(),
            highlight: HashSet::new()
        })
    }
    pub fn draw(&mut self) {
        if let Err(err) = self.0.draw() {
            writeln!(self.0.out, "{}", err).unwrap();
        }
    }
    pub fn command(&mut self, input: &str) {
        if let Err(err) = self.0.command(input) {
            writeln!(self.0.out, "{}", err).unwrap();
        }
    }
}

#[wasm_bindgen]
pub struct CanMove {
    pub illegal: bool,
    check: Option<String>
}
#[wasm_bindgen]
impl CanMove {
    pub fn check(&self) -> Option<String> {
        self.check.clone()
    }
}
#[wasm_bindgen]
#[derive(Default)]
pub struct MoveResult {
    pub success: bool,
    from: String,
    to: String
}
#[wasm_bindgen]
impl MoveResult {
    pub fn from(&self) -> String {
        self.from.clone()
    }
    pub fn to(&self) -> String {
        self.to.clone()
    }
}

const SIDE_PLAYER: Side = Side::White;
const DEPTH: u8 = 6;

#[wasm_bindgen]
pub struct ChessBoard(Board);

#[wasm_bindgen]
impl ChessBoard {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        ChessBoard(Board::new())
    }

    pub fn can_move(&mut self, from: &str, to: &str) -> CanMove {
        let board = &mut self.0;
        let (from, to) = match (from.parse(), to.parse()) {
            (Ok(from), Ok(to)) => (from, to),
            _ => return CanMove {
                illegal: true,
                check: None
            }
        };

        if board.get(from).map(|p| p.side != SIDE_PLAYER).unwrap_or(true) {
            return CanMove {
                illegal: true,
                check: None
            };
        }

        let mut legal = false;
        let mut moves = board.moves_for(from);
        while let Some(m) = moves.next(board) {
            if m == to {
                legal = true;
                break;
            }
        }

        if !legal {
            return CanMove {
                illegal: true,
                check: None
            };
        }

        let undo = board.move_(from, to);
        if let Some(checker) = board.check(SIDE_PLAYER) {
            board.undo(undo);
            return CanMove {
                illegal: true,
                check: Some(checker.to_string())
            };
        }

        CanMove {
            illegal: false,
            check: None
        }
    }
    pub fn get_move(&mut self) -> MoveResult {
        self.0.minimax(DEPTH, !SIDE_PLAYER, None)
            .map(|result| {
                self.0.move_(result.from, result.to);
                MoveResult {
                    success: true,
                    from: result.from.to_string(),
                    to: result.to.to_string()
                }
            })
            .unwrap_or_default()
    }
}
