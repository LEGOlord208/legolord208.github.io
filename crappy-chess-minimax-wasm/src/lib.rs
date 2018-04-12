extern crate crappy_chess_minimax;

use crappy_chess_minimax as chess;
use std::slice;

type Prompt = chess::input::Prompt<Vec<u8>, Vec<u8>>;

unsafe fn to_utf16(string: &str) -> *mut u16 {
    // UTF-16 string because JavaScript
    let mut utf16: Vec<u16> = string.encode_utf16().collect();
    assert!(!utf16.contains(&0));
    utf16.push(0);

    Box::into_raw(utf16.into_boxed_slice()) as *mut u16
}
unsafe fn strlen(string: *mut u16) -> usize {
    let mut len = 0;
    while *string.offset(len) != 0 {
        len += 1;
    }
    len as usize
}
unsafe fn from_utf16(string: *mut u16) -> Box<[u16]> {
    let len = strlen(string);
    let slice = slice::from_raw_parts_mut(string, len + 1);
    Box::from_raw(slice)
}
fn read(prompt: &mut Prompt) -> String {
    let mut combined = String::with_capacity(prompt.stdout.len() + 1 + prompt.stderr.len());
    combined.push_str(std::str::from_utf8(&prompt.stdout).unwrap());
    if !prompt.stdout.is_empty() && !prompt.stderr.is_empty() {
        combined.push('\n');
    }
    combined.push_str(std::str::from_utf8(&prompt.stderr).unwrap());

    prompt.stdout.clear();
    prompt.stderr.clear();

    combined
}

#[no_mangle]
pub extern fn string_new(len: usize) -> *mut u16 {
    Box::into_raw(vec![0; len+1].into_boxed_slice()) as *mut u16
}
#[no_mangle]
pub unsafe extern fn string_set(string: *mut u16, len: usize, index: usize, val: u16) {
    let slice = slice::from_raw_parts_mut(string, len+1);
    slice[index] = val;
}

#[no_mangle]
pub extern fn prompt_new() -> *mut Prompt {
    let prompt = chess::input::Prompt {
        board: chess::make_board(),
        stdout: Vec::new(),
        stderr: Vec::new()
    };
    Box::into_raw(Box::new(prompt))
}
#[no_mangle]
pub extern fn prompt_print(prompt: *mut Prompt) -> *mut u16 {
    let prompt = unsafe { &mut *prompt };

    prompt.print().unwrap();
    let output = read(prompt);

    unsafe { to_utf16(&output) }
}
#[no_mangle]
pub extern fn prompt_input(prompt: *mut Prompt, input: *mut u16) -> *mut u16 {
    let prompt = unsafe { &mut *prompt };
    let input = unsafe { &from_utf16(input) };
    let input = String::from_utf16(&input[..input.len()-1]).unwrap();

    prompt.input(&input).unwrap();
    let output = read(prompt);

    unsafe { to_utf16(&output) }
}
#[no_mangle]
pub unsafe extern fn prompt_free(prompt: *mut Prompt) {
    Box::from_raw(prompt);
}

#[no_mangle]
pub unsafe extern fn free(string: *mut u16) {
    from_utf16(string);
}
