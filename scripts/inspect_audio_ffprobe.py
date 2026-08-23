import subprocess
import json

# Let's inspect audio stream info of bak_ne_dicem.mp4 and a few others
for track in ["bak_ne_dicem", "gucum_yok", "nafile", "sofi", "tmax"]:
    file_path = f"public/assets/audio/{track}.mp4"
    cmd = f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{file_path}"'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    dur = res.stdout.strip()
    print(f"{track}: duration = {dur}s")
