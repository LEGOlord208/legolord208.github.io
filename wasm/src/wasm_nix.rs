use crate::*;

#[wasm_bindgen]
pub fn nix_parse(input: String) -> String {
    match rnix::parse(&input) {
        Ok(ast) => format!("{:#?}", ast),
        Err(err) => err.to_string()
    }
}
