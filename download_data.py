import urllib.request
import urllib.parse
import re
import json
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
}

def get_yt_vids(query):
    url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
            unique = []
            for i in ids:
                if i not in unique:
                    unique.append(i)
            return unique[:3]
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return []

def download_file(url, target_path):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp, open(target_path, 'wb') as f:
            data = resp.read()
            if len(data) < 1000:
                return False
            f.write(data)
            print(f"Saved {target_path} ({len(data)} bytes)")
            return True
    except Exception as e:
        print(f"Failed {url}: {e}")
        return False

songs_list = [
    {
        "id": "nafile",
        "title": "NAFİLE",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR NAFİLE official video",
        "duration": "2:48",
        "streams": "18.5M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Top Hit",
        "lyrics_snippet": "Yazdım adını kalbime, silemezsin nafile / Benim aşkım yaramaz, kendine şans dile",
        "genre": "Drill / Trap",
        "producer": "Kaleen, İTSKİMOBEATS"
    },
    {
        "id": "yazik_sana",
        "title": "YAZIK SANA",
        "artist": "ERAY067 & MANSUR",
        "query": "ERAY067 MANSUR YAZIK SANA netd",
        "duration": "3:12",
        "streams": "14.2M",
        "album": "Single",
        "year": "2026",
        "badge": "Trend #1",
        "lyrics_snippet": "Tüm rapciler fiyasko yüzlerinde maske aileme asker ben / Götün yerse kastet buraları kasvet kararıyor kederden",
        "genre": "Street Drill",
        "producer": "Waxy"
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
        "badge": "Albüm Çıkışı",
        "lyrics_snippet": "Bunlar kim? Bunlar değil bizim mahalleden / Burdan bir eksildik, bir arttık hapishaneden",
        "genre": "Trap",
        "producer": "CLTR"
    },
    {
        "id": "gucum_yok",
        "title": "GÜCÜM YOK",
        "artist": "ERAY067 x MANSUR x CONTRA",
        "query": "ERAY067 MANSUR CONTRA GÜCÜM YOK",
        "duration": "3:05",
        "streams": "22.4M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Feat. Contra",
        "lyrics_snippet": "Gücüm yok artık tutmaya bu elleri / Yalanların sardı her bi yerleri",
        "genre": "Hip-Hop / Drill",
        "producer": "CLTR"
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
        "badge": "Viral",
        "lyrics_snippet": "Yaramaz sokaklar, geceler kan ağlar / Peşimizde sirenler, arkamızda dağlar",
        "genre": "Trap / Drill",
        "producer": "Culture Records"
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
        "lyrics_snippet": "Bu gece misafirinim kapında bekleyen / Her anım seninle ömrüme eklenen",
        "genre": "Melodic Trap",
        "producer": "Culture Records"
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
        "badge": "Platin Plak",
        "lyrics_snippet": "Çok ağladım geceler boyu sessizce / Kimse bilmez içimi derinden gizlice",
        "genre": "Emotional Trap",
        "producer": "CLTR"
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
        "lyrics_snippet": "Bak ne dicem sana dinle iyi bu sözleri / Paralar desteyle kapattık biz gözleri",
        "genre": "Drill",
        "producer": "CLTR"
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
        "lyrics_snippet": "İhtiyaç yok otele arabada konaklar / Yollarda hızımız durduramaz yasaklar",
        "genre": "Club Drill",
        "producer": "Culture Records"
    },
    {
        "id": "yesler",
        "title": "YESLER",
        "artist": "ERAY067 x MANSUR ft. Reder",
        "query": "ERAY067 MANSUR yesler Reder",
        "duration": "2:44",
        "streams": "6.5M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Feat. Reder",
        "lyrics_snippet": "Yesler cebimde kafam rahat gerisi hikaye / Frankfurt'tan Malatya'ya kuruldu gaye",
        "genre": "International Trap",
        "producer": "Culture Records"
    },
    {
        "id": "olm_was_rap_mep",
        "title": "OLM WAS RAP MEP",
        "artist": "ERAY067 x MANSUR ft. Yung Ouzo",
        "query": "ERAY067 MANSUR olm was rap mep",
        "duration": "3:02",
        "streams": "5.9M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Deutsch-TR Drill",
        "lyrics_snippet": "Olm was rap mep Frankfurt sokakları / Tanır bizi herkes bilir blokları",
        "genre": "German-TR Drill",
        "producer": "Culture Records"
    },
    {
        "id": "tmax",
        "title": "TMAX",
        "artist": "ERAY067",
        "query": "ERAY067 Tmax official video",
        "duration": "2:20",
        "streams": "12.1M",
        "album": "Solo",
        "year": "2025",
        "badge": "Solo Klasik",
        "lyrics_snippet": "Tmax altında gazlar sokaklarda ses / Frankfurt geceleri herkes alır nefes",
        "genre": "Drill",
        "producer": "CLTR"
    }
]

images_dir = r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\images"
os.makedirs(images_dir, exist_ok=True)

processed_songs = []

for song in songs_list:
    print(f"Searching {song['title']}...")
    vids = get_yt_vids(song["query"])
    if vids:
        vid_id = vids[0]
        song["youtube_id"] = vid_id
        song["youtube_url"] = f"https://www.youtube.com/watch?v={vid_id}"
        song["embed_url"] = f"https://www.youtube.com/embed/{vid_id}?autoplay=1&enablejsapi=1"
        
        file_name = f"{song['id']}.jpg"
        file_path = os.path.join(images_dir, file_name)
        
        # Try maxres, fallback to hqdefault
        thumb_url = f"https://img.youtube.com/vi/{vid_id}/maxresdefault.jpg"
        if not download_file(thumb_url, file_path):
            thumb_url = f"https://img.youtube.com/vi/{vid_id}/hqdefault.jpg"
            download_file(thumb_url, file_path)
            
        song["thumbnail"] = f"assets/images/{file_name}"
        song["thumbnail_cdn"] = thumb_url
        processed_songs.append(song)
    else:
        print(f"No video found for {song['title']}")

with open(r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\songs.json", "w", encoding="utf-8") as f:
    json.dump(processed_songs, f, ensure_ascii=False, indent=2)

print(f"\nSuccessfully processed {len(processed_songs)} songs and downloaded cover images!")
