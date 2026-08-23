import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    d = json.load(f)

for k in ["bak_ne_dicem", "geldigim_yer", "tmax", "sofi"]:
    if k in d:
        print(f"=== {k} ===")
        print("Trim:", d[k].get("trim"))
        lyrics = d[k].get("lyrics", [])
        print("Total lyrics:", len(lyrics))
        print("First 5 lines:")
        for l in lyrics[:5]:
            print(" ", l)
