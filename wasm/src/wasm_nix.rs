use crate::*;
use rowan::WalkEvent;
use std::fmt::Write;

#[wasm_bindgen]
pub fn nix_parse(input: String) -> String {
    let mut output = String::new();
    let mut indent = 0;
    for event in rnix::parse(&input).node().preorder() {
        match event {
            WalkEvent::Enter(node) => {
                writeln!(output, "{:indent$}{:?}", "", node, indent=indent).unwrap();
                indent += 2;
            },
            WalkEvent::Leave(_) => indent -= 2
        }
    }
    output
}
