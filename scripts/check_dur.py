import subprocess
import json

# Check ffprobe on geldigim_yer.mp4
cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', 'public/assets/audio/geldigim_yer.mp4']
res = subprocess.run(cmd, capture_output=True, text=True)
print("geldigim_yer.mp4 duration:", res.stdout.strip())

cmd2 = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', 'public/assets/audio/bak_ne_dicem.mp4']
res2 = subprocess.run(cmd2, capture_output=True, text=True)
print("bak_ne_dicem.mp4 duration:", res2.stdout.strip())
