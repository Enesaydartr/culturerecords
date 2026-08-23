import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Show structure of first track
first_key = list(data.keys())[0]
first = data[first_key]
print(f"Track: {first_key}")
print(f"Keys: {list(first.keys())}")
if "lyrics" in first:
    print(f"Lyrics count: {len(first['lyrics'])}")
    print(f"First 3 lyrics: {first['lyrics'][:3]}")
if "trim" in first:
    print(f"Trim: {first['trim']}")

# Show all track IDs
print(f"\nTotal tracks: {len(data)}")
for tid in sorted(data.keys()):
    lc = len(data[tid].get("lyrics", []))
    tr = data[tid].get("trim")
    print(f"  {tid}: {lc} lyrics, trim={tr}")
