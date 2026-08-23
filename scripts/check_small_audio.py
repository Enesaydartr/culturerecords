import os, json, subprocess

audio_dir = r"public\assets\audio"
files = {}
for f in os.listdir(audio_dir):
    if f.endswith((".mp4", ".m4a")):
        path = os.path.join(audio_dir, f)
        size_kb = os.path.getsize(path) / 1024
        name = f.rsplit(".", 1)[0]
        files[name] = size_kb

# Check which are suspiciously small (< 3MB likely trimmed/broken)
small_threshold = 3000  # 3MB
print("Muhtemel kırpılmış/küçük dosyalar (< 3MB):")
for name, size in sorted(files.items()):
    if size < small_threshold:
        print(f"  {name}: {size:.1f} KB")

print(f"\nToplam dosya: {len(files)}")
print(f"Küçük dosya sayısı: {len([s for s in files.values() if s < small_threshold])}")
