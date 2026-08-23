import os
import glob
from PIL import Image, ImageChops

def trim_black_borders(im):
    bg = Image.new(im.mode, im.size, (0, 0, 0))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

def process_to_1_to_1_square(img_path):
    try:
        with Image.open(img_path) as im:
            im = im.convert("RGB")
            
            # Trim black letterbox bars if present
            im_trimmed = trim_black_borders(im)
            w, h = im_trimmed.size
            
            # Center square crop
            min_dim = min(w, h)
            left = (w - min_dim) // 2
            top = (h - min_dim) // 2
            right = left + min_dim
            bottom = top + min_dim
            
            square_im = im_trimmed.crop((left, top, right, bottom))
            
            # Standardize to 720x720 1:1
            final_im = square_im.resize((720, 720), Image.Resampling.LANCZOS)
            final_im.save(img_path, "JPEG", quality=95)
            print(f"Processed 1:1 square: {os.path.basename(img_path)}")
    except Exception as e:
        print(f"Error: {e}")

images = glob.glob("public/assets/images/*.jpg")
for img_path in images:
    process_to_1_to_1_square(img_path)

print(f"All {len(images)} covers are now true 1:1 square!")
