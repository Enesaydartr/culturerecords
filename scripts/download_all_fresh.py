import os
import re
import subprocess
import yt_dlp

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    text = f.read()

tracks = []
matches = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?youtubeId:\s*"([^"]+)"', text)
for m in matches:
    tracks.append({"id": m[0], "title": m[1], "youtubeId": m[2]})

print(f"Starting download for {len(tracks)} tracks...")

os.makedirs("public/assets/audio", exist_ok=True)
os.makedirs("temp_audio", exist_ok=True)

success = 0
failed = []

for idx, t in enumerate(tracks, 1):
    track_id = t["id"]
    ytid = t["youtubeId"]
    url = f"https://www.youtube.com/watch?v={ytid}"
    temp_file = f"temp_audio/{track_id}.%(ext)s"
    final_mp4 = f"public/assets/audio/{track_id}.mp4"
    
    print(f"[{idx}/{len(tracks)}] Downloading {track_id} ({t['title']})...")
    
    ydl_opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio/best',
        'outtmpl': temp_file,
        'overwrites': True,
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'ios', 'mweb', 'web']
            }
        }
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            downloaded_file = ydl.prepare_filename(info)
        
        # Convert or remux to mp4 container cleanly with ffmpeg
        if os.path.exists(downloaded_file):
            cmd = ['ffmpeg', '-y', '-i', downloaded_file, '-c:a', 'aac', '-b:a', '192k', final_mp4]
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            print(f"  [OK] {track_id} converted to {final_mp4}")
            success += 1
            # Clean up temp
            try:
                os.remove(downloaded_file)
            except:
                pass
        else:
            print(f"  [FAIL] Downloaded file not found for {track_id}")
            failed.append(track_id)
            
    except Exception as e:
        print(f"  [FAIL] {track_id}: {e}")
        failed.append(track_id)

print(f"\nAll downloads completed: {success}/{len(tracks)} successful.")
if failed:
    print(f"Failed: {failed}")
