import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for track_id, item in data.items():
    trim = item.get("trim")
    lyrics = item.get("lyrics", [])
    first_time = lyrics[0]["time"] if lyrics else None
    last_time = lyrics[-1]["time"] if lyrics else None
    print(f"Track: {track_id} | trim: {trim} | first: {first_time}s | last: {last_time}s | count: {len(lyrics)}")
