extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

pub mod wasm_crappy_chess_minimax;
pub mod wasm_insult;
pub mod wasm_lci;
pub mod wasm_nix;
pub mod wasm_termplay;

#[wasm_bindgen]
extern {
    fn alert(string: &str);
    fn prompt() -> String;

    #[wasm_bindgen(js_namespace = console)]
    fn log(string: &str);

    #[wasm_bindgen(js_namespace = Math)]
    fn random() -> f64;
}
