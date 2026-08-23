import os
import glob
import shutil
import subprocess
import time

staging_dir = "temp_audio_staging"
dest_dir = "public/assets/audio"
os.makedirs(dest_dir, exist_ok=True)

files = sorted(os.listdir(staging_dir)) if os.path.exists(staging_dir) else []
print(f"Staged files count: {len(files)}")

# Move all staged files back in 5-file chunks and commit
CHUNK_SIZE = 5

for i in range(0, len(files), CHUNK_SIZE):
    chunk = files[i:i + CHUNK_SIZE]
    print(f"Restoring batch {i // CHUNK_SIZE + 1}: {chunk}")
    for f in chunk:
        src = os.path.join(staging_dir, f)
        dst = os.path.join(dest_dir, f)
        shutil.move(src, dst)
    
    # Git add and commit this chunk
    subprocess.run(["git", "add", "public/assets/audio/"], check=True)
    batch_num = i // CHUNK_SIZE + 1
    subprocess.run(["git", "commit", "-m", f"feat: add audio tracks batch {batch_num}"], check=True)

# Remove temp staging folder
if os.path.exists(staging_dir) and not os.listdir(staging_dir):
    os.rmdir(staging_dir)
    print("Cleaned up temp staging directory.")

print("All audio files safely restored and split into clean small Git commits!")
