import urllib.request
import urllib.parse
import re
import os

all_tracks = [
    # ALLIANCE Album (8 tracks)
    ("bak_ne_dicem", "ERAY067 MANSUR Bak Ne Dicem ALLIANCE", "MArJetRSQiM"),
    ("gucum_yok", "ERAY067 MANSUR CONTRA GUCUM YOK", "1_RD5Xxbm5E"),
    ("nafile", "ERAY067 MANSUR NAFİLE official", "gD3SqwOJ9Sc"),
    ("bilezik_pirlanta", "ERAY067 MANSUR Bilezik Pırlanta", "4e45d1d6a74"), # fallback search
    ("olm_was_rap_mep", "ERAY067 MANSUR olm was rap mep Yung Ouzo", "WgEVW4us_n8"),
    ("yesler", "ERAY067 MANSUR yesler Reder", "OrdCSlxdHAI"),
    ("sofi", "ERAY067 MANSUR sofi ALLIANCE", "SU4I9_bZYbo"),
    ("outro", "ERAY067 MANSUR outro selam goturun", "hVm-YmUEtIo"),
    
    # Singles & Collabs (19 tracks)
    ("yazik_sana", "ERAY067 MANSUR YAZIK SANA", "r-oPri2aSgE"),
    ("bu_gece_misafirinim", "ERAY067 MANSUR Bu Gece Misafirinim", "Q0E8fwC1JF4"),
    ("burada_sokaklar", "ERAY067 MANSUR Batuflex Burada Sokaklar", "BeSfzuVaZTg"),
    ("ihtiyac_yok_otele", "ERAY067 MANSUR Ihtiyac Yok Otele", "NPcRsdmeSoI"),
    ("cok_agladim", "ERAY067 MANSUR Cok Agladim", "eWeWAZiqW0Y"),
    ("bir_kere_daha", "ERAY067 MANSUR BIGBAT Bir Kere Daha", "Qd9Rz3Z1P5M"),
    ("brapap", "Batuflex ERAY067 MANSUR Organize BRAPAP", "jGf1h3pY0_E"),
    ("brapap2", "ERAY067 Organize BRAPAP 2", "BoIMxiYFOEI"),
    ("sorma", "ERAY067 MANSUR Organize Sorma", "v9v8t6v9u4g"),
    ("yaramaz", "ERAY067 MANSUR YARAMAZ", "bk1-1B3476E"),
    ("familia", "ERAY067 MANSUR FAMILIA", "vX_wP6VlM3c"),
    ("tmax", "ERAY067 Tmax", "FjLZXS7sD2U"),
    ("aktiv", "Batuflex ERAY067 Chiko AKTIV", "e9P7Uv9Xq5s"),
    ("aktiv2", "Batuflex Chiko ERAY067 MANSUR Reder AKTIV II", "w4Q8K5s2N7c"),
    ("sayfa", "KC Rebell ERAY067 MANSUR SAYFA", "l5R7B2w0Q8k"),
    ("azdan_az_coktan_cok", "Keskin ERAY067 MANSUR Azdan Az Coktan Cok", "n7X4P9l1T5w"),
    ("geldigim_yer", "ERAY067 MANSUR Geldigim Yer 607", "m3Z9K1l6P8c"),
    ("hmdl", "ERAY067 MANSUR HMDL", "FinAvFZdwi8"),
    ("balmain", "Organize ERAY067 MANSUR BALMAIN", "zjrG2L8OFY8"),
    ("g_wagon", "ERAY067 G WAGON", "1M8I1Qupy7w")
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36'}

def fetch_img(query, out_name):
    p1 = f"public/assets/images/{out_name}.jpg"
    p2 = f"assets/images/{out_name}.jpg"
    if os.path.exists(p1) and os.path.getsize(p1) > 20000:
        return
    try:
        url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'curl/7.68.0'})
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', errors='ignore')
        ids = re.findall(r'watch\?v=([a-zA-Z0-9_-]{11})', html)
        if ids:
            vid = ids[0]
            for q in ['maxresdefault', 'hqdefault', 'mqdefault']:
                thumb = f"https://img.youtube.com/vi/{vid}/{q}.jpg"
                try:
                    with urllib.request.urlopen(urllib.request.Request(thumb, headers=headers), timeout=5) as r:
                        data = r.read()
                        if len(data) > 3000:
                            with open(p1, 'wb') as f: f.write(data)
                            with open(p2, 'wb') as f: f.write(data)
                            print(f"Downloaded {out_name}.jpg ({len(data)} bytes, vid={vid})")
                            return
                except:
                    continue
    except Exception as e:
        print(f"Err {out_name}: {e}")

for item in all_tracks:
    fetch_img(item[1], item[0])

print("All track covers checked and ready!")
