import shutil
import os

src = r"C:\Users\EnesA\Downloads\image (44).png"
dst_dir = r"public\assets\images"
dst = os.path.join(dst_dir, "brand_logo.png")

if os.path.exists(src):
    os.makedirs(dst_dir, exist_ok=True)
    shutil.copy2(src, dst)
    print(f"Copied logo to {dst} successfully! File size: {os.path.getsize(dst)} bytes")
else:
    print(f"Source file not found at {src}")
