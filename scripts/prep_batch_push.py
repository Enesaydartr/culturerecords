import os
import glob
import subprocess
import shutil

# Step 1: Temporarily move audio files to a temp folder outside git tracking
temp_audio = "temp_audio_staging"
os.makedirs(temp_audio, exist_ok=True)

audio_files = glob.glob("public/assets/audio/*.mp4") + glob.glob("public/assets/audio/*.mp3")
print(f"Total audio files found: {len(audio_files)}")

for f in audio_files:
    fname = os.path.basename(f)
    shutil.move(f, os.path.join(temp_audio, fname))

print("Moved audio files to staging.")
