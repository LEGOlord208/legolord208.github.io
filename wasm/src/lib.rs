extern crate image;
extern crate insult;
extern crate lci;
extern crate rand;
extern crate termplay;
extern crate crappy_chess_minimax;

pub mod wasm_crappy_chess_minimax;
pub mod wasm_insult;
pub mod wasm_lci;
pub mod wasm_termplay;

use std::{
    ffi::CString,
    os::raw::c_char,
    slice
};

extern {
    fn alert(string: *mut u16);
    fn log(string: *mut u16);
    fn prompt() -> *mut u16;
    fn rand() -> f64;
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
pub unsafe extern fn free_utf8(string: *mut c_char) {
    CString::from_raw(string);
}
#[no_mangle]
pub unsafe extern fn free_utf16(string: *mut u16) {
    let len = strlen(string);
    let slice = slice::from_raw_parts_mut(string, len+1);
    Box::from_raw(slice);
}

unsafe fn strlen(string: *mut u16) -> usize {
    let mut len = 0;
    while *string.offset(len) != 0 {
        len += 1;
    }
    len as usize
}
unsafe fn from_utf16(string: *mut u16) -> String {
    let len = strlen(string);
    let slice = slice::from_raw_parts(string, len);
    String::from_utf16(slice).unwrap()
}
fn to_utf16(string: &str) -> *mut u16 {
    let mut output: Vec<u16> = string.encode_utf16().collect();
    assert!(!output.contains(&0));
    output.push(0);
    Box::into_raw(output.into_boxed_slice()) as *mut u16
}
