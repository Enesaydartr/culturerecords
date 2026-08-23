import os
import re
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import yt_dlp

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    text = f.read()

tracks = []
matches = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?youtubeId:\s*"([^"]+)"', text)
for m in matches:
    tracks.append({"id": m[0], "title": m[1], "youtubeId": m[2]})

os.makedirs("public/assets/audio", exist_ok=True)
os.makedirs("temp_audio", exist_ok=True)

def download_one(t):
    track_id = t["id"]
    ytid = t["youtubeId"]
    url = f"https://www.youtube.com/watch?v={ytid}"
    final_mp4 = f"public/assets/audio/{track_id}.mp4"
    
    # Check if already downloaded cleanly with valid size (>500KB)
    if os.path.exists(final_mp4) and os.path.getsize(final_mp4) > 500000:
        # Check if modified within last 10 minutes (already freshly downloaded)
        mtime = os.path.getmtime(final_mp4)
        if time.time() - mtime < 600:
            print(f"[SKIP] {track_id} already freshly downloaded.")
            return track_id, True

    temp_tmpl = f"temp_audio/{track_id}_%(id)s.%(ext)s"
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': temp_tmpl,
        'overwrites': True,
        'quiet': True,
        'no_warnings': True,
        'retries': 5,
        'fragment_retries': 5,
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'ios', 'mweb', 'web']
            }
        }
    }
    
    for attempt in range(3):
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                downloaded_file = ydl.prepare_filename(info)
            
            if os.path.exists(downloaded_file):
                cmd = ['ffmpeg', '-y', '-i', downloaded_file, '-c:a', 'aac', '-b:a', '192k', final_mp4]
                subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
                try:
                    os.remove(downloaded_file)
                except:
                    pass
                print(f"[SUCCESS] {track_id} -> {final_mp4} ({os.path.getsize(final_mp4) // 1024} KB)")
                return track_id, True
        except Exception as e:
            time.sleep(2)
            if attempt == 2:
                print(f"[ERROR] Failed {track_id} after 3 attempts: {e}")
                return track_id, False
                
    return track_id, False

print(f"Launching parallel downloads for {len(tracks)} tracks with 4 workers...")
results = {}
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {executor.submit(download_one, t): t for t in tracks}
    for future in as_completed(futures):
        tid, ok = future.result()
        results[tid] = ok

success_count = sum(1 for v in results.values() if v)
print(f"\n==========================================")
print(f"DOWNLOAD RESULT: {success_count}/{len(tracks)} tracks complete!")
print(f"==========================================")
