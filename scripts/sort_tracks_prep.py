import re

# Read artists.ts
with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Define the exact chronological date mapping
dates_map = {
    "bak_ne_dicem": "2026-07-31",
    "gucum_yok": "2026-07-31",
    "nafile": "2026-07-31",
    "bilezik_pirlanta": "2026-07-31",
    "olm_was_rap_mep": "2026-07-31",
    "yesler": "2026-07-31",
    "sofi": "2026-07-31",
    "outro": "2026-07-31",
    "sayfa": "2026-07-17",
    "azdan_az_coktan_cok": "2026-07-10",
    "yazik_sana": "2026-06-05",
    "familia": "2026-05-22",
    "bu_gece_misafirinim": "2026-02-27",
    "aktiv2": "2026-02-06",
    "yaramaz": "2025-12-12",
    "yok_hic_adalet": "2025-11-07",
    "brapap2": "2025-10-31",
    "burada_sokaklar": "2025-09-19",
    "ihtiyac_yok_otele": "2025-08-29",
    "cok_agladim": "2025-08-08",
    "sifir_yuz": "2025-05-23",
    "balmain": "2025-05-09",
    "sorma": "2025-03-20",
    "hmdl": "2025-03-14",
    "geldigim_yer": "2025-02-28",
    "aktiv": "2025-02-14",
    "bir_kere_daha": "2025-02-07",
    "brapap": "2025-02-01",
    "paranoya": "2025-01-17",
    "alisamadim": "2024-11-15",
    "mahalle": "2024-10-04",
    "tmax": "2024-08-02",
    "anne": "2024-08-01"
}

# The desired order array (from newest 2026 to oldest 2024)
ordered_ids = [
    "bak_ne_dicem",
    "gucum_yok",
    "nafile",
    "bilezik_pirlanta",
    "olm_was_rap_mep",
    "yesler",
    "sofi",
    "outro",
    "sayfa",
    "azdan_az_coktan_cok",
    "yazik_sana",
    "familia",
    "bu_gece_misafirinim",
    "aktiv2",
    "yaramaz",
    "yok_hic_adalet",
    "brapap2",
    "burada_sokaklar",
    "ihtiyac_yok_otele",
    "cok_agladim",
    "sifir_yuz",
    "balmain",
    "sorma",
    "hmdl",
    "geldigim_yer",
    "aktiv",
    "bir_kere_daha",
    "brapap",
    "paranoya",
    "alisamadim",
    "mahalle",
    "tmax",
    "anne"
]

print(f"Total ordered items: {len(ordered_ids)}")
