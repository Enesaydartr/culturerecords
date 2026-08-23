import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Extract EXACT lyrics and trims without any shifts
exact_lyrics = {k: v.get("lyrics", []) for k, v in data.items()}
exact_trims = {k: v["trim"] for k, v in data.items() if v.get("trim") is not None}

ts_content = """export interface SyncedLineData {
  time: number;
  text: string;
}

export interface TrackTrimData {
  startSec: number;
  endSec: number;
}

// EXACT 100% Match of the User's Localhost Synced Lyrics Database (33 Songs)
export const BUILTIN_SYNCED_LYRICS: Record<string, SyncedLineData[]> = """ + json.dumps(exact_lyrics, indent=2, ensure_ascii=False) + """;

// EXACT Trim Settings
export const BUILTIN_TRIMS: Record<string, TrackTrimData> = """ + json.dumps(exact_trims, indent=2, ensure_ascii=False) + """;
"""

with open("src/data/backupLyricsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Restored src/data/backupLyricsData.ts to the EXACT unadulterated localhost backup data!")
