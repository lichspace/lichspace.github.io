# 显示图片到minifb

```rust
use image::GenericImageView;
use minifb::{Key, Menu, MouseButton, MouseMode, Scale, Window, WindowOptions};

fn main() {
    let src = "C:\\Users\\tangentguo\\Downloads\\A0003.png";
    let img = image::open(src).unwrap();
    let (width, height) = img.dimensions();

    let mut buffer = vec![0u32; (width * height) as usize];
    let mut data = img.to_rgba8().to_vec();
    let u8_buffer = unsafe {
        std::slice::from_raw_parts_mut(data.as_mut_ptr() as *mut u8, (width * height * 4) as usize)
    };

    // convert RGBA buffer read by the reader to an ARGB buffer as expected by minifb.
    for (rgba, argb) in u8_buffer.chunks_mut(4).zip(buffer.iter_mut()) {
        // extracting the subpixels
        let r = rgba[0] as u32;
        let g = rgba[1] as u32;
        let b = rgba[2] as u32;
        let a = rgba[3] as u32;

        // merging the subpixels in ARGB format.
        *argb = a << 24 | r << 16 | g << 8 | b;
    }

    let mut window = Window::new(
        "Image background example - Press ESC to exit",
        width as usize,
        height as usize,
        WindowOptions {
            topmost: true,
            resize: true,
            scale: Scale::FitScreen,
            ..WindowOptions::default()
        },
    )
    .expect("Unable to create the window");

    let mut menu = Menu::new("文件").unwrap();
    let sub = Menu::new("打开").unwrap();
    menu.add_sub_menu("打开", &sub);
    window.add_menu(&menu);

    window.set_target_fps(60);

    while window.is_open() && !window.is_key_down(Key::Escape) {
        if let Some((x, y)) = window.get_unscaled_mouse_pos(MouseMode::Discard) {
            let screen_pos = (y * width as f32 + x) as usize;

            if window.get_mouse_down(MouseButton::Left) {
                println!("Mouse pos: {} {}", x, y);
                buffer[screen_pos] = 0x00ffffff; // white
            }

            if window.get_mouse_down(MouseButton::Right) {
                println!("Mouse pos: {} {}", x, y);
                buffer[screen_pos] = 0x00000000; // black
            }
        }

        if let Some((scroll_x, scroll_y)) = window.get_scroll_wheel() {
            println!("Scrolling {} - {}", scroll_x, scroll_y);
        }

        window
            .update_with_buffer(&buffer, width as usize, height as usize)
            .unwrap();
    }
}

```
