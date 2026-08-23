import subprocess
import json

# Let's inspect where speech/audio actually happens in bak_ne_dicem.mp4
# Use ffmpeg silencedetect or inspect audio samples
cmd = 'ffmpeg -i "public/assets/audio/bak_ne_dicem.mp4" -af silencedetect=noise=-30dB:d=0.5 -f null -'
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
print("Silencedetect output (stderr):")
for line in res.stderr.splitlines():
    if "silence" in line:
        print(line)
