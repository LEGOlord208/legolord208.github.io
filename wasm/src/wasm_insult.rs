use ::*;
use insult::WordsFile;
use rand::Rng;

extern {
    fn rand() -> f32;
}

pub struct WasmRand;

impl Rng for WasmRand {
    fn next_u32(&mut self) -> u32 {
        unsafe { rand() }.to_bits()
    }
    fn next_u64(&mut self) -> u64 {
        let mut result = self.next_u32() as u64;
        result <<= 32;
        result += self.next_u32() as u64;
        result
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
pub extern fn insult() -> *mut u16 {
    let wordsfile = WordsFile {
        nouns: parse(include_str!("insult/nouns")),
        endings: parse(include_str!("insult/endings")),
        verbs: parse(include_str!("insult/verbs"))
    };
    let string = wordsfile.generate(WasmRand).to_string();

    to_utf16(&*string)
}
