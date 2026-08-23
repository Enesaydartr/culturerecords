import glob
files = glob.glob("scripts/original_audios/*.*")
print(f"Downloaded files: {len(files)}")
for f in files:
    print(f)
