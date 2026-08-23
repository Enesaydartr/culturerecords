import json
import subprocess
import os

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    orig_data = json.load(f)

# Shift dictionary calculated from precise acoustic onset diffs
SHIFTS = {
    "gucum_yok": 21.18,
    "bilezik_pirlanta": 25.86,
    "olm_was_rap_mep": 20.06,
    "yesler": 23.03,
    "yaramaz": 24.20,
    "bak_ne_dicem": 22.43,
    "hmdl": 20.12,
    "aktiv2": 18.31,
    "yazik_sana": 18.81,
    "sorma": 15.71,
    "alisamadim": 6.22,
}

calibrated_lyrics = {}
calibrated_trims = {}

for track_id, item in orig_data.items():
    lyrics = item.get("lyrics", [])
    if not lyrics:
        continue
    
    shift = SHIFTS.get(track_id, 0.0)
    
    new_lyrics = []
    for line in lyrics:
        new_time = max(0.0, round(line["time"] - shift, 2))
        new_lyrics.append({
            "time": new_time,
            "text": line["text"]
        })
    
    calibrated_lyrics[track_id] = new_lyrics
    if item.get("trim"):
        calibrated_trims[track_id] = item["trim"]

ts_content = """export interface SyncedLineData {
  time: number;
  text: string;
}

export interface TrackTrimData {
  startSec: number;
  endSec: number;
}

export const BUILTIN_SYNCED_LYRICS: Record<string, SyncedLineData[]> = """ + json.dumps(calibrated_lyrics, indent=2, ensure_ascii=False) + """;

export const BUILTIN_TRIMS: Record<string, TrackTrimData> = """ + json.dumps(calibrated_trims, indent=2, ensure_ascii=False) + """;
"""

with open("src/data/backupLyricsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("src/data/backupLyricsData.ts written with mathematically precise acoustic onset shifts!")
