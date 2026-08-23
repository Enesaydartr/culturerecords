import json
import subprocess
import os

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

aligned_lyrics = {}
aligned_trims = {}

for track_id, item in data.items():
    audio_path = f"public/assets/audio/{track_id}.mp4"
    if not os.path.exists(audio_path):
        audio_path = f"public/assets/audio/{track_id}.mp3"
    
    lyrics = item.get("lyrics", [])
    if not lyrics:
        continue
    
    first_time = lyrics[0]["time"]
    last_time = lyrics[-1]["time"]
    
    cmd = f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{audio_path}"'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    audio_dur = float(res.stdout.strip()) if res.stdout.strip() else 0
    
    if first_time > 15.0 or last_time > audio_dur:
        shift = first_time - 1.0
        new_lyrics = []
        for line in lyrics:
            new_time = max(0.0, round(line["time"] - shift, 2))
            new_lyrics.append({
                "time": new_time,
                "text": line["text"]
            })
        aligned_lyrics[track_id] = new_lyrics
    else:
        aligned_lyrics[track_id] = lyrics

    if item.get("trim") is not None:
        aligned_trims[track_id] = item["trim"]

ts_content = """export interface SyncedLineData {
  time: number;
  text: string;
}

export interface TrackTrimData {
  startSec: number;
  endSec: number;
}

export const BUILTIN_SYNCED_LYRICS: Record<string, SyncedLineData[]> = """ + json.dumps(aligned_lyrics, indent=2, ensure_ascii=False) + """;

export const BUILTIN_TRIMS: Record<string, TrackTrimData> = """ + json.dumps(aligned_trims, indent=2, ensure_ascii=False) + """;
"""

with open("src/data/backupLyricsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Updated src/data/backupLyricsData.ts with perfectly aligned lyrics for all trimmed audio files!")
