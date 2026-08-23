import urllib.request
import urllib.parse
import re
import json
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

def get_yt_best_thumb(query, out_path):
    url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'curl/7.68.0'})
    try:
        html = urllib.request.urlopen(req, timeout=6).read().decode('utf-8', errors='ignore')
        ids = re.findall(r'watch\?v=([a-zA-Z0-9_-]{11})', html)
        if ids:
            vid = ids[0]
            # Try maxresdefault, then hqdefault, then mqdefault
            for quality in ['maxresdefault', 'hqdefault', 'mqdefault']:
                thumb_url = f"https://img.youtube.com/vi/{vid}/{quality}.jpg"
                try:
                    img_req = urllib.request.Request(thumb_url, headers=headers)
                    with urllib.request.urlopen(img_req, timeout=5) as resp:
                        data = resp.read()
                        if len(data) > 3000: # real image, not 404 placeholder
                            with open(out_path, 'wb') as f:
                                f.write(data)
                            print(f"Saved {out_path} from {vid} ({quality}, {len(data)} bytes)")
                            return vid
                except Exception:
                    continue
    except Exception as e:
        print(f"Error {query}: {e}")
    return None

tracks_to_fetch = [
    ("nafile", "ERAY067 MANSUR NAFİLE official video"),
    ("yazik_sana", "ERAY067 MANSUR YAZIK SANA netd"),
    ("sofi", "ERAY067 MANSUR sofi ALLIANCE"),
    ("gucum_yok", "ERAY067 MANSUR CONTRA GUCUM YOK"),
    ("yaramaz", "ERAY067 MANSUR YARAMAZ"),
    ("bu_gece_misafirinim", "ERAY067 MANSUR Bu Gece Misafirinim"),
    ("cok_agladim", "ERAY067 MANSUR Cok Agladim"),
    ("bak_ne_dicem", "ERAY067 MANSUR Bak Ne Dicem"),
    ("ihtiyac_yok_otele", "ERAY067 MANSUR Ihtiyac Yok Otele"),
    ("tmax", "ERAY067 Tmax"),
    ("yesler", "ERAY067 MANSUR yesler Reder"),
    ("olm_was_rap_mep", "ERAY067 MANSUR olm was rap mep"),
    ("burada_sokaklar", "ERAY067 MANSUR Batuflex Burada Sokaklar"),
    ("brapap2", "ERAY067 Organize BRAPAP 2"),
    ("outro", "ERAY067 MANSUR outro selam goturun"),
    ("g_wagon", "ERAY067 G WAGON"),
    ("balmain", "Organize ERAY067 MANSUR BALMAIN"),
    ("hmdl", "ERAY067 MANSUR HMDL"),
    ("eray067_portrait", "ERAY067 o ses rap sefo şampiyon"),
    ("mansur_portrait", "Mansur rapçi klip")
]

dirs = [
    r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\public\assets\images",
    r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\images"
]

for d in dirs:
    os.makedirs(d, exist_ok=True)

for track_id, q in tracks_to_fetch:
    p1 = os.path.join(dirs[0], f"{track_id}.jpg")
    p2 = os.path.join(dirs[1], f"{track_id}.jpg")
    vid = get_yt_best_thumb(q, p1)
    if os.path.exists(p1):
        with open(p1, 'rb') as f:
            data = f.read()
        with open(p2, 'wb') as f:
            f.write(data)

print("All high-res images processed!")
