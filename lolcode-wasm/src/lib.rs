extern crate lci;

use std::{borrow::Cow, io, slice};

#[no_mangle]
pub extern fn string_new(len: usize) -> *mut u16 {
    Box::into_raw(vec![0; len+1].into_boxed_slice()) as *mut u16
}
#[no_mangle]
pub unsafe extern fn string_set(string: *mut u16, len: usize, index: usize, val: u16) {
    let slice = slice::from_raw_parts_mut(string, len+1);
    slice[index] = val;
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
unsafe fn to_utf16(string: &str) -> *mut u16 {
    let mut output: Vec<u16> = string.encode_utf16().collect();
    assert!(!output.contains(&0));
    output.push(0);
    Box::into_raw(output.into_boxed_slice()) as *mut u16
}

#[no_mangle]
pub extern fn eval(code: *mut u16) -> *mut u16 {
    let code = unsafe { from_utf16(code) };
    let mut writer = Vec::new();
    let string = match lci::eval(&code, io::empty(), &mut writer) {
        Ok(()) => Cow::Borrowed(std::str::from_utf8(&writer).unwrap()),
        Err(err) => Cow::Owned(err.to_string())
    };
    unsafe { to_utf16(&string) }
}

#[no_mangle]
pub unsafe extern fn free(string: *mut u16) {
    let len = strlen(string);
    let slice = slice::from_raw_parts_mut(string, len+1);
    Box::from_raw(slice);
}
