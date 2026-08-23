import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    d = json.load(f)

print(f"Total songs in backup: {len(d)}")
for tid, item in d.items():
    lc = len(item.get("lyrics", []))
    print(f"  - {tid}: {lc} lines")
