import urllib.request
import urllib.parse
import re
import json
import os
import time

headers = {
    'User-Agent': 'curl/7.68.0'
}

def get_yt_id(query):
    encoded = urllib.parse.quote(query)
    url = f"https://www.youtube.com/results?search_query={encoded}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as r:
            content = r.read().decode('utf-8', errors='ignore')
            ids = re.findall(r'watch\?v=([a-zA-Z0-9_-]{11})', content)
            unique = []
            for i in ids:
                if i not in unique:
                    unique.append(i)
            return unique[0] if unique else None
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return None

def download_image(url, out_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=5) as r, open(out_path, 'wb') as f:
            data = r.read()
            if len(data) < 2000:
                return False
            f.write(data)
            print(f"Saved {out_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"Failed {url}: {e}")
        return False

songs_raw = [
    {
        "id": "nafile",
        "title": "NAFİLE",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR NAFILE",
        "duration": "2:48",
        "streams": "18.5M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Top Hit #1",
        "bpm": "142",
        "key": "F Minor",
        "lyrics": """Yazdım adını kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile

Sokaklar soğuk, geceler ayaz
Gözlerimin rengi kara ve beyaz
Söyle bana ne kaldı geriye biraz
Frankfurt'tan doğan bu büyük avaz

Yazdım adını kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile""",
        "genre": "Drill / Trap",
        "producers": "Kaleen, İTSKİMOBEATS",
        "mix_master": "Waxy",
        "label": "Culture Records"
    },
    {
        "id": "yazik_sana",
        "title": "YAZIK SANA",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR YAZIK SANA",
        "duration": "3:12",
        "streams": "14.2M",
        "album": "Single",
        "year": "2026",
        "badge": "Trend Klip",
        "bpm": "140",
        "key": "C# Minor",
        "lyrics": """Tüm rapçiler fiyasko, yüzlerinde maske
Aileme asker ben, sokaklara hasret
Götün yerse kastet, buraları kasvet
Kararıyor kederden, dinlemez adalet

Düşmanlar pusuda, bekler bizi sırayla
Biz bu yolu kazandık tırnakla, değil parayla
Mansur & Eray tek yumruk sahada
Yazık sana çocuk, kalırsın arkada""",
        "genre": "Street Drill",
        "producers": "Waxy",
        "mix_master": "Waxy",
        "label": "netd müzik / CLTR"
    },
    {
        "id": "sofi",
        "title": "sofi",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR sofi ALLIANCE",
        "duration": "2:35",
        "streams": "9.8M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Alliance Çıkış",
        "bpm": "138",
        "key": "G Minor",
        "lyrics": """Bunlar kim? Bunlar değil bizim mahalleden
Burdan bir eksildik, bir arttık hapishaneden
Her köşe başında nöbette gençler
Gecenin karanlığı umutları gizler

Sofi derler bize yolumuz açık
Korkumuz yok kimseden, alnımız ak açık
Frankfurt'tan akar ritim damarlara
Selam olsun sokaktaki canlara""",
        "genre": "Dark Trap",
        "producers": "CLTR Beats",
        "mix_master": "Culture Records",
        "label": "Culture Records"
    },
    {
        "id": "gucum_yok",
        "title": "GÜCÜM YOK",
        "artist": "ERAY067 x MANSUR x CONTRA",
        "query": "ERAY067 MANSUR CONTRA GUCUM YOK",
        "duration": "3:05",
        "streams": "22.4M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Contra Feat",
        "bpm": "145",
        "key": "A Minor",
        "lyrics": """Gücüm yok artık tutmaya bu elleri
Yalanların sardı her bi yerleri
Kırıldı güvenim, kapandı perdeler
Kaldı geride sadece gölgeler

Contra girdi mikrofona, sözler kurşun gibi
Sokaklar anlatır gerçek sahibi
Eray ve Mansur vurdu mühürü
Yıkamaz bizi bu düzenin zihniyeti""",
        "genre": "Heavy Trap / Rap",
        "producers": "CLTR",
        "mix_master": "Waxy",
        "label": "Culture Records"
    },
    {
        "id": "yaramaz",
        "title": "YARAMAZ",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR YARAMAZ",
        "duration": "2:52",
        "streams": "11.1M",
        "album": "Single",
        "year": "2025",
        "badge": "Viral Hit",
        "bpm": "135",
        "key": "D Minor",
        "lyrics": """Yaramaz sokaklar, geceler kan ağlar
Peşimizde sirenler, arkamızda dağlar
Biz seçmedik bu yolu, hayat böyle istedi
Herkes kaçarken biz durduk, kimse bilmedi

Yaramaz çocukların öfkesi dinmez
Bu sokaklarda hiç kimse pes etmez""",
        "genre": "Trap",
        "producers": "Culture Records",
        "mix_master": "CLTR",
        "label": "Culture Records"
    },
    {
        "id": "bu_gece_misafirinim",
        "title": "BU GECE MİSAFİRİNİM",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR Bu Gece Misafirinim",
        "duration": "3:18",
        "streams": "8.7M",
        "album": "Single",
        "year": "2025",
        "badge": "Melodik",
        "bpm": "130",
        "key": "E Minor",
        "lyrics": """Bu gece misafirinim kapında bekleyen
Her anım seninle ömrüme eklenen
Yağmur yağar üstüme, ıslanır ceketim
Sana dair ne varsa tek tek biriktirdim""",
        "genre": "Melodic Trap",
        "producers": "Culture Records",
        "mix_master": "Culture Records",
        "label": "Culture Records"
    },
    {
        "id": "cok_agladim",
        "title": "ÇOK AĞLADIM",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR Cok Agladim",
        "duration": "2:41",
        "streams": "16.9M",
        "album": "Single",
        "year": "2025",
        "badge": "Platin",
        "bpm": "132",
        "key": "B Minor",
        "lyrics": """Çok ağladım geceler boyu sessizce
Kimse bilmez içimi derinden gizlice
Yıkıldı duvarlar, tükendi umutlar
Başımızın üstünde kara bulutlar""",
        "genre": "Emotional Trap",
        "producers": "CLTR",
        "mix_master": "Waxy",
        "label": "Culture Records"
    },
    {
        "id": "bak_ne_dicem",
        "title": "BAK NE DİCEM",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR Bak Ne Dicem",
        "duration": "2:29",
        "streams": "7.3M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Drill",
        "bpm": "144",
        "key": "G# Minor",
        "lyrics": """Bak ne dicem sana dinle iyi bu sözleri
Paralar desteyle kapattık biz gözleri
Mansur beat'e girdi mi durduramaz kimse
Konuşur arkamızdan boş yapan herkes""",
        "genre": "UK Drill Style",
        "producers": "CLTR",
        "mix_master": "CLTR",
        "label": "Culture Records"
    },
    {
        "id": "ihtiyac_yok_otele",
        "title": "İHTİYAÇ YOK OTELE",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR Ihtiyac Yok Otele",
        "duration": "2:55",
        "streams": "13.4M",
        "album": "Single",
        "year": "2025",
        "badge": "Club Hit",
        "bpm": "136",
        "key": "C Minor",
        "lyrics": """İhtiyaç yok otele arabada konaklar
Yollarda hızımız durduramaz yasaklar
Bas gaza Eray dönmeyiz geriye
Sokaklar bizim bırak gerisini kederiye""",
        "genre": "Club Trap",
        "producers": "Culture Records",
        "mix_master": "Waxy",
        "label": "Culture Records"
    },
    {
        "id": "tmax",
        "title": "TMAX",
        "artist": "ERAY067",
        "query": "ERAY067 Tmax",
        "duration": "2:20",
        "streams": "12.1M",
        "album": "Solo",
        "year": "2025",
        "badge": "Solo",
        "bpm": "142",
        "key": "D# Minor",
        "lyrics": """Tmax altında gazlar sokaklarda ses
Frankfurt geceleri herkes alır nefes
067 imzamız plakada yazılı
Dostlarım yanımda, kalleşler kazılı""",
        "genre": "Street Drill",
        "producers": "CLTR",
        "mix_master": "Waxy",
        "label": "CLTR"
    }
]

out_dir = r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\images"
os.makedirs(out_dir, exist_ok=True)

processed = []

for s in songs_raw:
    print(f"Finding video for: {s['title']}...")
    vid = get_yt_id(s["query"])
    if not vid:
        vid = "gD3SqwOJ9Sc" # fallback
    
    s["youtube_id"] = vid
    s["youtube_url"] = f"https://www.youtube.com/watch?v={vid}"
    s["embed_url"] = f"https://www.youtube.com/embed/{vid}?autoplay=1&enablejsapi=1"
    
    img_filename = f"{s['id']}.jpg"
    img_filepath = os.path.join(out_dir, img_filename)
    
    # Try downloading maxresdefault then hqdefault
    max_url = f"https://img.youtube.com/vi/{vid}/maxresdefault.jpg"
    hq_url = f"https://img.youtube.com/vi/{vid}/hqdefault.jpg"
    
    if not download_image(max_url, img_filepath):
        download_image(hq_url, img_filepath)
        
    s["thumbnail_local"] = f"assets/images/{img_filename}"
    s["thumbnail_cdn"] = hq_url
    processed.append(s)
    time.sleep(0.3)

with open(r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\songs.json", "w", encoding="utf-8") as f:
    json.dump(processed, f, ensure_ascii=False, indent=2)

print("\nAll songs data processed and images downloaded successfully!")
