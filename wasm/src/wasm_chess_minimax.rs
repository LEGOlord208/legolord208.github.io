use crate::*;
use chess_minimax::{
    board::Board,
    Side
};
use std::{
    collections::HashSet,
    io::{self, Write},
    str
};

pub struct JsWriter(Terminal);

impl Write for JsWriter {
    fn write(&mut self, data: &[u8]) -> io::Result<usize> {
        // Replace \n with \r\n
        let mut start = 0;
        while let Some(newline) = data[start..].iter().position(|b| *b == b'\n') {
            self.0.write(str::from_utf8(&data[start..newline]).unwrap());
            self.0.write("\r\n");
            start = newline+1;
        }
        self.0.write(str::from_utf8(&data[start..]).unwrap());
        Ok(data.len())
    }
    fn flush(&mut self) -> io::Result<()> {
        Ok(())
    }
}

type Chess = chess_minimax::terminal::Session<JsWriter>;

#[wasm_bindgen]
pub fn chess_new(terminal: Terminal) -> *mut Chess {
    Box::into_raw(Box::new(Chess {
        out: JsWriter(terminal),
        board: Board::new(),
        side: Side::Black,
        undo: Vec::new(),
        highlight: HashSet::new()
    }))
}
#[wasm_bindgen]
pub fn chess_draw(s: *mut Chess) {
    let s = unsafe { &mut *s };
    if let Err(err) = s.draw() {
        writeln!(s.out, "{}", err).unwrap();
    }
}
#[wasm_bindgen]
pub fn chess_cmd(s: *mut Chess, input: &str) {
    let s = unsafe { &mut *s };
    if let Err(err) = s.command(input) {
        writeln!(s.out, "{}", err).unwrap();
    }
}
#[wasm_bindgen]
pub fn chess_free(s: *mut Chess) {
    unsafe { Box::from_raw(s); }
}
