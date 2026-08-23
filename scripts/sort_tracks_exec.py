with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    full_text = f.read()

# Split before PLAYLIST and after PLAYLIST
prefix = full_text[:full_text.find("export const PLAYLIST: Track[] = [")]
postfix = full_text[full_text.find("export const ARTISTS: Artist[] = ["):]

playlist_body = full_text[full_text.find("export const PLAYLIST: Track[] = ["):full_text.find("export const ARTISTS: Artist[] = [")]

# Extract each track object block
# A track block starts with { and has id: "..."
import re

# Split by track blocks
pattern = r'\{\s*id:\s*"([^"]+)",'
track_splits = list(re.finditer(pattern, playlist_body))

tracks_map = {}
for i in range(len(track_splits)):
    start_pos = track_splits[i].start()
    if i < len(track_splits) - 1:
        end_pos = track_splits[i+1].start()
    else:
        end_pos = playlist_body.rfind("];")
    
    track_block = playlist_body[start_pos:end_pos].strip()
    # remove trailing comma if any
    if track_block.endswith(","):
        track_block = track_block[:-1].strip()
    
    track_id = track_splits[i].group(1)
    tracks_map[track_id] = track_block

print(f"Extracted {len(tracks_map)} individual track blocks.")

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

# Re-assemble the new sorted playlist
new_playlist_blocks = []
for tid in ordered_ids:
    if tid in tracks_map:
        block = tracks_map[tid]
        # Update releaseDate in block if needed
        rel_date = dates_map[tid]
        if "releaseDate:" in block:
            block = re.sub(r'releaseDate:\s*"[^"]*"', f'releaseDate: "{rel_date}"', block)
        else:
            block = block.replace(f'id: "{tid}",', f'id: "{tid}",\n    releaseDate: "{rel_date}",')
        new_playlist_blocks.append(block)
    else:
        print(f"Warning: {tid} not in tracks_map")

sorted_playlist_code = "export const PLAYLIST: Track[] = [\n  " + ",\n  ".join(new_playlist_blocks) + "\n];\n\n"

new_full_text = prefix + sorted_playlist_code + postfix

with open("src/data/artists.ts", "w", encoding="utf-8") as f:
    f.write(new_full_text)

print("artists.ts updated with chronologically sorted tracks!")
