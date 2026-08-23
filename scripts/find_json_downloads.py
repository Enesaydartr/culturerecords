import glob
import os

files = glob.glob(r"C:\Users\EnesA\Downloads\*.json")
print(f"Found {len(files)} JSON files in Downloads:")
for f in files:
    print(f"- {f} ({os.path.getsize(f)} bytes)")
