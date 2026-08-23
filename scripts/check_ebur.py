import subprocess
import os

# Extract first 30s of bak_ne_dicem with audio waveform analysis
cmd = 'ffmpeg -i "public/assets/audio/bak_ne_dicem.mp4" -t 30 -af ebur128=framelog=verbose -f null -'
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
lines = [l for l in res.stderr.splitlines() if "t:" in l and "M:" in l][:20]
for l in lines:
    print(l)
