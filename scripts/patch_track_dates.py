import re

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Update Track interface
if "releaseDate: string;" not in content:
    content = content.replace("category: \"all\" | \"alliance\" | \"hits\" | \"collab\";", """category: "all" | "alliance" | "hits" | "collab";
  releaseDate: string;
  releaseYear: number;""")

# Release dates map
dates_map = {
  "bak_ne_dicem": ("2026-02-14", 2026),
  "gucum_yok": ("2026-02-14", 2026),
  "nafile": ("2026-02-14", 2026),
  "bilezik_pirlanta": ("2026-02-14", 2026),
  "olm_was_rap_mep": ("2026-02-14", 2026),
  "yesler": ("2026-02-14", 2026),
  "sofi": ("2026-02-14", 2026),
  "outro": ("2026-02-14", 2026),
  "yazik_sana": ("2026-01-10", 2026),
  "bu_gece_misafirinim": ("2025-11-20", 2025),
  "burada_sokaklar": ("2025-09-15", 2025),
  "ihtiyac_yok_otele": ("2025-07-28", 2025),
  "cok_agladim": ("2025-05-12", 2025),
  "bir_kere_daha": ("2025-03-20", 2025),
  "brapap2": ("2025-01-18", 2025),
  "yaramaz": ("2024-12-05", 2024),
  "tmax": ("2024-10-14", 2024),
  "sorma": ("2024-08-22", 2024),
  "aktiv2": ("2024-07-01", 2024),
  "aktiv": ("2024-05-19", 2024),
  "familia": ("2024-04-10", 2024),
  "sayfa": ("2024-03-02", 2024),
  "geldigim_yer": ("2024-02-15", 2024),
  "azdan_az_coktan_cok": ("2024-01-20", 2024),
  "hmdl": ("2023-12-10", 2023),
  "balmain": ("2023-10-25", 2023),
  "brapap": ("2023-09-08", 2023),
  "paranoya": ("2023-07-14", 2023),
  "anne": ("2023-05-20", 2023),
  "mahalle": ("2023-04-05", 2023),
  "alisamadim": ("2023-03-12", 2023),
  "yok_hic_adalet": ("2023-02-01", 2023),
  "sifir_yuz": ("2023-01-15", 2023),
}

for track_id, (r_date, r_year) in dates_map.items():
    pattern = f'(id:\\s*"{track_id}",[\\s\\S]*?category:\\s*"[^"]+",)'
    replacement = f'\\1\\n    releaseDate: "{r_date}",\\n    releaseYear: {r_year},'
    content = re.sub(pattern, replacement, content, count=1)

with open("src/data/artists.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("artists.ts updated with releaseDate and releaseYear for each track!")
