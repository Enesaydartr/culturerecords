import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

print("Sample 'bak_ne_dicem':")
print(json.dumps(data["bak_ne_dicem"], indent=2, ensure_ascii=False)[:600])

print("\nSample 'nafile':")
print(json.dumps(data["nafile"], indent=2, ensure_ascii=False)[:600])
