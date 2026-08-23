import json
import subprocess
import numpy as np

# Let's inspect bak_ne_dicem lyrics
path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

print("First 5 lines of bak_ne_dicem in backup JSON:")
for line in data["bak_ne_dicem"]["lyrics"][:5]:
    print(line)
