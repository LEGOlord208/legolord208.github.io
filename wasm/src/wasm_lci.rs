use ::*;
use lci::types::Value;
use lci;
use std::io::{self, BufReader};

#[derive(Default)]
struct PromptReader(Vec<u8>);

impl io::Read for PromptReader {
    fn read(&mut self, buf: &mut [u8]) -> io::Result<usize> {
        if buf.is_empty() {
            return Ok(0);
        }
        if !self.0.is_empty() {
            let len = self.0.len().min(buf.len());
            buf[..len].copy_from_slice(&self.0[..len]);
            self.0.drain(..len);
            Ok(len)
        } else {
            let offset = unsafe { prompt() };
            self.0.extend(unsafe { from_utf16(offset) }.as_bytes());
            unsafe {
                free_utf16(offset);
            }
            self.0.push(b'\n');
            self.read(buf)
        }
    }
}

#[no_mangle]
pub extern fn eval(code: *mut u16) -> *mut u16 {
    let code = unsafe { from_utf16(code) };
    let reader = PromptReader::default();
    let reader = BufReader::new(reader);

    let string = match lci::capture(&code, reader, |eval| {
        //eval.set_recursion_limit(32);
        eval.bind_func("ALERTIN", None, |values| {
            unsafe {
                alert(to_utf16(&join(values)));
            }
            Value::Noob
        });
        eval.bind_func("LOGGIN", None, |values| {
            unsafe {
                log(to_utf16(&join(values)));
            }
            Value::Noob
        });
    }) {
        Ok(output) => output,
        Err(err) => err.to_string()
    };
    to_utf16(&string)
}

fn join(values: Vec<Value>) -> String {
    values.into_iter().fold(String::new(), |result, value|
        if let Some(yarn) = value.cast_yarn() {
            result + &yarn
        } else { result })
}
