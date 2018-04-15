use ::*;
use lci;
use std::{borrow::Cow, io, str as stdstr};

#[no_mangle]
pub extern fn eval(code: *mut u16) -> *mut u16 {
    let code = unsafe { from_utf16(code) };
    let mut writer = Vec::new();
    let string = match lci::eval(&code, io::empty(), &mut writer) {
        Ok(()) => Cow::Borrowed(stdstr::from_utf8(&writer).unwrap()),
        Err(err) => Cow::Owned(err.to_string())
    };
    to_utf16(&string)
}
