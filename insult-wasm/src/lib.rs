extern crate insult;
extern crate rand;

use insult::WordsFile;
use rand::Rng;

use std::{
    ffi::CString,
    os::raw::c_char
};

extern {
    fn rand() -> f64;
}

pub struct WasmRand;

impl Rng for WasmRand {
    fn next_u32(&mut self) -> u32 {
        self.next_u64() as u32
    }
    fn next_u64(&mut self) -> u64 {
        unsafe { rand() }.to_bits()
    }
}

pub fn parse(content: &str) -> Vec<(bool, String)> {
    content.lines()
        .map(|line| {
            let mut split = line.splitn(2, ',');
            let flag = match split.next().unwrap().trim() {
                "false" => false,
                "true" => true,
                _ => panic!("invalid file")
            };
            (flag, split.next().unwrap().trim().to_string())
        })
        .collect()
}

#[no_mangle]
pub extern fn insult() -> *mut c_char {
    let wordsfile = WordsFile {
        nouns: parse(include_str!("nouns")),
        endings: parse(include_str!("endings")),
        verbs: parse(include_str!("verbs"))
    };
    let string = wordsfile.generate(WasmRand).to_string();

    CString::new(string)
        .unwrap()
        .into_raw()
}
#[no_mangle]
pub extern fn free(string: *mut c_char) {
    unsafe {
        CString::from_raw(string);
    }
}
