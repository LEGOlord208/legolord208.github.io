use crate::*;
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
            self.0.extend(prompt().as_bytes());
            self.0.push(b'\n');
            self.read(buf)
        }
    }
}

#[wasm_bindgen]
pub fn lci_eval(code: String) -> String {
    let reader = PromptReader::default();
    let reader = BufReader::new(reader);

    match lci::capture(&code, reader, |eval| {
        //eval.set_recursion_limit(32);
        eval.bind_func("ALERTIN", None, |values| {
            unsafe {
                alert(&join(values));
            }
            Value::Noob
        });
        eval.bind_func("LOGGIN", None, |values| {
            unsafe {
                log(&join(values));
            }
            Value::Noob
        });
    }) {
        Ok(output) => output,
        Err(err) => err.to_string()
    }
}

fn join(values: Vec<Value>) -> String {
    values.into_iter().fold(String::new(), |result, value|
        if let Some(yarn) = value.cast_yarn() {
            result + &yarn
        } else { result })
}
