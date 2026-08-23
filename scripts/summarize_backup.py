import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total songs in backup: {len(data)}")
for k, v in data.items():
    lyrics_count = len(v.get("lyrics", []))
    trim = v.get("trim")
    print(f"- {k}: {lyrics_count} lines, trim: {trim}")
