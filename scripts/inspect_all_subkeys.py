import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.items():
    sub_keys = list(v.keys())
    print(f"Track: {k} -> subkeys: {sub_keys}")
