import urllib.request
import urllib.parse
import re
import json
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def search_youtube(query):
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.youtube.com/results?search_query={encoded_query}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
            video_ids = re.findall(r'/watch\?v=([a-zA-Z0-9_-]{11})', html)
            seen = set()
            unique_ids = []
            for vid in video_ids:
                if vid not in seen:
                    seen.add(vid)
                    unique_ids.append(vid)
            return unique_ids[:5]
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

def download_image(url, output_path):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response, open(output_path, 'wb') as out_file:
            data = response.read()
            # check if 404 image (youtube returns a small 120x90 or error 404)
            if len(data) < 1500: # too small, likely placeholder
                return False
            out_file.write(data)
            print(f"Downloaded {output_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

songs = [
    {"title": "NAFİLE", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR NAFİLE official video", "duration": "2:48", "streams": "18.5M", "album": "ALLIANCE", "year": "2026", "badge": "Hit Tekli"},
    {"title": "YAZIK SANA", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR YAZIK SANA netd", "duration": "3:12", "streams": "14.2M", "album": "Single", "year": "2026", "badge": "Yeni Klip"},
    {"title": "sofi", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR sofi ALLIANCE", "duration": "2:35", "streams": "9.8M", "album": "ALLIANCE", "year": "2026", "badge": "Albüm Çıkışı"},
    {"title": "GÜCÜM YOK", "artist": "ERAY067 x MANSUR x CONTRA", "query": "ERAY067 MANSUR CONTRA GÜCÜM YOK", "duration": "3:05", "streams": "22.4M", "album": "ALLIANCE", "year": "2026", "badge": "Feat. Contra"},
    {"title": "YARAMAZ", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR YARAMAZ", "duration": "2:52", "streams": "11.1M", "album": "Single", "year": "2025", "badge": "Trend"},
    {"title": "BU GECE MİSAFİRİNİM", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR Bu Gece Misafirinim", "duration": "3:18", "streams": "8.7M", "album": "Single", "year": "2025", "badge": "Klasik"},
    {"title": "ÇOK AĞLADIM", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR Cok Agladim", "duration": "2:41", "streams": "16.9M", "album": "Single", "year": "2025", "badge": "Platin"},
    {"title": "BAK NE DİCEM", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR Bak Ne Dicem", "duration": "2:29", "streams": "7.3M", "album": "ALLIANCE", "year": "2026", "badge": "Drill"},
    {"title": "İHTİYAÇ YOK OTELE", "artist": "ERAY067 & MANSUR", "query": "ERAY067 MANSUR Ihtiyac Yok Otele", "duration": "2:55", "streams": "13.4M", "album": "Single", "year": "2025", "badge": "Hit"},
    {"title": "YESLER", "artist": "ERAY067 x MANSUR ft. Reder", "query": "ERAY067 MANSUR yesler Reder", "duration": "2:44", "streams": "6.5M", "album": "ALLIANCE", "year": "2026", "badge": "Feat. Reder"},
    {"title": "OLM WAS RAP MEP", "artist": "ERAY067 x MANSUR ft. Yung Ouzo", "query": "ERAY067 MANSUR olm was rap mep", "duration": "3:02", "streams": "5.9M", "album": "ALLIANCE", "year": "2026", "badge": "Trap / Drill"},
    {"title": "TMAX", "artist": "ERAY067", "query": "ERAY067 Tmax official video", "duration": "2:20", "streams": "12.1M", "album": "Solo", "year": "2025", "badge": "Eray Solo"},
]

out_dir = r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\images"
results = []

for song in songs:
    vids = search_youtube(song["query"])
    if vids:
        vid_id = vids[0]
        song["youtube_id"] = vid_id
        song["youtube_url"] = f"https://www.youtube.com/watch?v={vid_id}"
        song["embed_url"] = f"https://www.youtube.com/embed/{vid_id}"
        
        img_name = f"{song['title'].lower().replace(' ', '_').replace('ö','o').replace('ü','u').replace('ı','i').replace('ğ','g').replace('ş','s').replace('ç','c')}.jpg"
        img_path = os.path.join(out_dir, img_name)
        
        thumb_url = f"https://img.youtube.com/vi/{vid_id}/maxresdefault.jpg"
        if not download_image(thumb_url, img_path):
            thumb_url = f"https://img.youtube.com/vi/{vid_id}/hqdefault.jpg"
            download_image(thumb_url, img_path)
            
        song["thumbnail_local"] = f"assets/images/{img_name}"
        song["thumbnail_url"] = thumb_url
        results.append(song)
        print(f"Processed {song['title']}: {vid_id}")

with open(r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\songs.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Saved {len(results)} songs!")
