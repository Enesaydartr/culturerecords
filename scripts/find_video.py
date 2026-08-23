import os
import glob

downloads = r"C:\Users\EnesA\Downloads"
files = glob.glob(os.path.join(downloads, "*Gramophone*"))
print("Matching files in Downloads:")
for f in files:
    print(f, os.path.getsize(f))

if not files:
    all_mp4 = glob.glob(os.path.join(downloads, "*.mp4"))
    print("All MP4s in Downloads:")
    for f in all_mp4:
        print(f)
