use ::*;
use rand_core::{impls, Error as RngError, RngCore};

pub struct WasmRand;

impl RngCore for WasmRand {
    fn next_u32(&mut self) -> u32 {
        // Apparently Chrome gives a float with 32-bits of randomness
        (unsafe { rand() } * std::u32::MAX as f64) as u32
    }
    fn next_u64(&mut self) -> u64 { impls::next_u64_via_u32(self) }
    fn fill_bytes(&mut self, dest: &mut [u8]) { impls::fill_bytes_via_next(self, dest); }
    fn try_fill_bytes(&mut self, dest: &mut [u8]) -> Result<(), RngError> {
        impls::fill_bytes_via_next(self, dest);
        Ok(())
    }
}

#[no_mangle]
pub extern fn insult() -> *mut u16 {
    let wordsfile = insult::open_default();
    let string = wordsfile.generate(WasmRand).to_string();

    to_utf16(&*string)
}
