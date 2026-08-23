import os
import glob
import cv2

backup_dir = r"public\assets\audio\backups"
audio_dir = r"public\assets\audio"

print("Checking backup files in public/assets/audio/backups:")
backups = glob.glob(os.path.join(backup_dir, "*.*"))
print(f"Found {len(backups)} backups")

for b in backups:
    name = os.path.basename(b)
    track_id = name.replace("_backup", "").split(".")[0]
    orig_file = os.path.join(audio_dir, name.replace("_backup", ""))
    
    cap1 = cv2.VideoCapture(b)
    d1 = cap1.get(cv2.CAP_PROP_FRAME_COUNT) / cap1.get(cv2.CAP_PROP_FPS) if cap1.get(cv2.CAP_PROP_FPS) > 0 else 0
    cap1.release()
    
    cap2 = cv2.VideoCapture(orig_file)
    d2 = cap2.get(cv2.CAP_PROP_FRAME_COUNT) / cap2.get(cv2.CAP_PROP_FPS) if cap2.get(cv2.CAP_PROP_FPS) > 0 else 0
    cap2.release()
    
    diff = d1 - d2
    print(f"Track: {track_id} | Backup: {d1:.2f}s | Current: {d2:.2f}s | Diff (Trimmed cut): {diff:.2f}s")
