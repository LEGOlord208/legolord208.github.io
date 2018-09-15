use crate::*;
use crappy_chess_minimax as chess;
use std::str as stdstr;

type Prompt = chess::input::Prompt<Vec<u8>, Vec<u8>>;

fn read(prompt: &mut Prompt) -> String {
    let mut combined = String::with_capacity(prompt.stdout.len() + 1 + prompt.stderr.len());
    combined.push_str(stdstr::from_utf8(&prompt.stdout).unwrap());
    if !prompt.stdout.is_empty() && !prompt.stderr.is_empty() {
        combined.push('\n');
    }
    combined.push_str(stdstr::from_utf8(&prompt.stderr).unwrap());

    prompt.stdout.clear();
    prompt.stderr.clear();

    combined
}

#[wasm_bindgen]
pub fn prompt_new() -> *mut Prompt {
    let prompt = chess::input::Prompt {
        board: chess::make_board(),
        stdout: Vec::new(),
        stderr: Vec::new()
    };
    Box::into_raw(Box::new(prompt))
}
#[wasm_bindgen]
pub fn prompt_print(prompt: *mut Prompt) -> String {
    let prompt = unsafe { &mut *prompt };

    prompt.print().unwrap();
    read(prompt)
}
#[wasm_bindgen]
pub fn prompt_input(prompt: *mut Prompt, input: String) -> String {
    let prompt = unsafe { &mut *prompt };

    prompt.input(&input).unwrap();
    read(prompt)
}
#[wasm_bindgen]
pub fn prompt_free(prompt: *mut Prompt) {
    unsafe { Box::from_raw(prompt); }
}
