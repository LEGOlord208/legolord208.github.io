use crate::*;
use image::{self, GenericImage, FilterType};
use termplay::{
    converters::{Converter, TrueColor},
    resizer::{Sizer, StandardSizer}
};

#[wasm_bindgen]
pub fn image_to_string(input: &[u8]) -> String {
    let image = match image::load_from_memory(input) {
        Ok(image) => image,
        Err(err) => return format!("failed to load image: {}", err)
    };

    let sizer = StandardSizer {
        new_width: 80,
        new_height: 24,
        ratio: Some(50)
    };

    let (width, height) = sizer.get_size(image.width(), image.height());

    let image = image.resize_exact(width, height, FilterType::Nearest);
    let bytes = TrueColor.to_vec(&image);

    String::from_utf8(bytes)
        .unwrap_or_else(|err| format!("failed to parse utf8: {}", err))
}
