import os
import glob

total_size = sum(os.path.getsize(f) for f in glob.glob("public/assets/videos/frames/alliance/*.webp"))
print(f"Total alliance frames size: {total_size / (1024*1024):.2f} MB")
