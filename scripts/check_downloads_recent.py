import os
import glob
import time

files = glob.glob(r"C:\Users\EnesA\Downloads\*.*")
# Sort by modification time
files.sort(key=lambda x: os.path.getmtime(x), reverse=True)

print("Recent files in Downloads (Top 15):")
for f in files[:15]:
    mtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(f)))
    print(f"- {mtime} | {os.path.basename(f)} ({os.path.getsize(f)} bytes)")
