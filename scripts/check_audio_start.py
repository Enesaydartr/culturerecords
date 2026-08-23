import subprocess

# Let's inspect when audio is active in bak_ne_dicem.mp4
# Run silencedetect
cmd = ['ffmpeg', '-i', 'public/assets/audio/bak_ne_dicem.mp4', '-af', 'silencedetect=noise=-30dB:d=0.5', '-f', 'null', '-']
res = subprocess.run(cmd, capture_output=True, text=True)
print("bak_ne_dicem silence output:")
for line in res.stderr.splitlines():
    if "silencedetect" in line or "Duration" in line:
        print(line)
