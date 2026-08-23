import json
import os

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
print("File exists:", os.path.exists(path))

if os.path.exists(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    print("Keys in backup json:", list(data.keys()) if isinstance(data, dict) else "List of items")
    if isinstance(data, dict):
        for k in data.keys():
            print(f"Key: {k}, type: {type(data[k])}, len: {len(data[k]) if hasattr(data[k], '__len__') else 'N/A'}")
