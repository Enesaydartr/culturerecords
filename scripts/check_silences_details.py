import subprocess
import os

# Let's check when sound starts in gucum_yok.mp4, bilezik_pirlanta.mp4, olm_was_rap_mep.mp4, yesler.mp4
for track in ["gucum_yok", "bilezik_pirlanta", "olm_was_rap_mep", "yesler", "yaramaz", "bak_ne_dicem"]:
    audio_path = f"public/assets/audio/{track}.mp4"
    # Find silence start/end in first 30 seconds
    cmd = f'ffmpeg -i "{audio_path}" -t 30 -af silencedetect=noise=-25dB:d=0.3 -f null -'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    silences = [l for l in res.stderr.splitlines() if "silencedetect" in l]
    print(f"Track: {track} -> silence detect in first 30s: {silences}")
