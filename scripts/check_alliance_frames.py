import glob
files = glob.glob("public/assets/videos/frames/alliance/*.webp")
print(f"Generated frames count: {len(files)}/72")
