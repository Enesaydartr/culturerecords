import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

ts_content = """export interface SyncedLineData {
  time: number;
  text: string;
}

export interface TrackTrimData {
  startSec: number;
  endSec: number;
}

export const BUILTIN_SYNCED_LYRICS: Record<string, SyncedLineData[]> = """ + json.dumps({k: v.get("lyrics", []) for k, v in data.items()}, indent=2, ensure_ascii=False) + """;

export const BUILTIN_TRIMS: Record<string, TrackTrimData> = """ + json.dumps({k: v["trim"] for k, v in data.items() if v.get("trim") is not None}, indent=2, ensure_ascii=False) + """;
"""

with open("src/data/backupLyricsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Generated src/data/backupLyricsData.ts successfully!")
