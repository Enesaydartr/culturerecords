import os
import glob

files = sorted(glob.glob("public/assets/videos/frames/alliance/*.webp"))
print(f"Total alliance frames: {len(files)}")
print(f"First frame: {files[0]} ({os.path.getsize(files[0])} bytes)")
print(f"Middle frame: {files[35]} ({os.path.getsize(files[35])} bytes)")
print(f"Last frame: {files[-1]} ({os.path.getsize(files[-1])} bytes)")
