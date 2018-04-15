use image::{self, GenericImage, FilterType};
use termplay::{
    converters::{Converter, TrueColor},
    resizer::{Sizer, StandardSizer}
};
use std::{
    ffi::CString,
    os::raw::c_char,
    slice
};

#[no_mangle]
pub extern fn slice_new(len: usize) -> *mut u8 {
    let vec = vec![0u8; len].into_boxed_slice();
    Box::into_raw(vec) as *mut u8
}
#[no_mangle]
pub unsafe extern fn slice_set(slice: *mut u8, len: usize, index: usize, val: u8) {
    let slice = slice::from_raw_parts_mut(slice, len);
    slice[index] = val;
}
#[no_mangle]
pub unsafe extern fn slice_free(slice: *mut u8, len: usize) {
    let slice = slice::from_raw_parts_mut(slice, len);
    Box::from_raw(slice);
}
#[no_mangle]
pub extern fn image_to_string(slice: *mut u8, len: usize) -> *const c_char {
    let slice = unsafe { slice::from_raw_parts_mut(slice, len) };

    let string = _image_to_string(&slice);

    CString::new(string).unwrap().into_raw()
}

fn _image_to_string(input: &[u8]) -> String {
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
