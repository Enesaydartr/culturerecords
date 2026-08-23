import urllib.request
import json
import os

songs = [
    {
        "id": "nafile",
        "title": "NAFİLE",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "gD3SqwOJ9Sc",
        "duration": "2:48",
        "streams": "18.5M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Top Hit #1",
        "bpm": "142",
        "key": "F Minor",
        "genre": "Drill / Trap",
        "producers": "Kaleen, İTSKİMOBEATS",
        "mix_master": "Waxy",
        "label": "Culture Records (CLTR)",
        "lyrics": "Yazdım adını kalbime\nSilemezsin nafile\nBenim aşkım yaramaz\nKendine şans dile\n\nSokaklar soğuk, geceler ayaz\nGözlerimin rengi kara ve beyaz\nSöyle bana ne kaldı geriye biraz\nFrankfurt'tan doğan bu büyük avaz\n\nYazdım adını kalbime\nSilemezsin nafile\nBenim aşkım yaramaz\nKendine şans dile"
    },
    {
        "id": "yazik_sana",
        "title": "YAZIK SANA",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "H4g2V5G53i4",
        "duration": "3:12",
        "streams": "14.2M",
        "album": "Single",
        "year": "2026",
        "badge": "Trend Klip",
        "bpm": "140",
        "key": "C# Minor",
        "genre": "Street Drill",
        "producers": "Waxy",
        "mix_master": "Waxy",
        "label": "netd müzik / CLTR",
        "lyrics": "Tüm rapçiler fiyasko, yüzlerinde maske\nAileme asker ben, sokaklara hasret\nGötün yerse kastet, buraları kasvet\nKararıyor kederden, dinlemez adalet\n\nDüşmanlar pusuda, bekler bizi sırayla\nBiz bu yolu kazandık tırnakla, değil parayla\nMansur & Eray tek yumruk sahada\nYazık sana çocuk, kalırsın arkada"
    },
    {
        "id": "sofi",
        "title": "sofi",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "V3P92fKjUro",
        "duration": "2:35",
        "streams": "9.8M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Alliance Çıkış",
        "bpm": "138",
        "key": "G Minor",
        "genre": "Dark Trap",
        "producers": "CLTR Beats",
        "mix_master": "Culture Records",
        "label": "Culture Records",
        "lyrics": "Bunlar kim? Bunlar değil bizim mahalleden\nBurdan bir eksildik, bir arttık hapishaneden\nHer köşe başında nöbette gençler\nGecenin karanlığı umutları gizler\n\nSofi derler bize yolumuz açık\nKorkumuz yok kimseden, alnımız ak açık\nFrankfurt'tan akar ritim damarlara\nSelam olsun sokaktaki canlara"
    },
    {
        "id": "gucum_yok",
        "title": "GÜCÜM YOK",
        "artist": "ERAY067 x MANSUR x CONTRA",
        "youtube_id": "e-n17hQ7uU8",
        "duration": "3:05",
        "streams": "22.4M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Contra Feat",
        "bpm": "145",
        "key": "A Minor",
        "genre": "Heavy Trap / Rap",
        "producers": "CLTR",
        "mix_master": "Waxy",
        "label": "Culture Records",
        "lyrics": "Gücüm yok artık tutmaya bu elleri\nYalanların sardı her bi yerleri\nKırıldı güvenim, kapandı perdeler\nKaldı geride sadece gölgeler\n\nContra girdi mikrofona, sözler kurşun gibi\nSokaklar anlatır gerçek sahibi\nEray ve Mansur vurdu mühürü\nYıkamaz bizi bu düzenin zihniyeti"
    },
    {
        "id": "yaramaz",
        "title": "YARAMAZ",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "zYgJbB6r9dM",
        "duration": "2:52",
        "streams": "11.1M",
        "album": "Single",
        "year": "2025",
        "badge": "Viral Hit",
        "bpm": "135",
        "key": "D Minor",
        "genre": "Trap",
        "producers": "Culture Records",
        "mix_master": "CLTR",
        "label": "Culture Records",
        "lyrics": "Yaramaz sokaklar, geceler kan ağlar\nPeşimizde sirenler, arkamızda dağlar\nBiz seçmedik bu yolu, hayat böyle istedi\nHerkes kaçarken biz durduk, kimse bilmedi\n\nYaramaz çocukların öfkesi dinmez\nBu sokaklarda hiç kimse pes etmez"
    },
    {
        "id": "bu_gece_misafirinim",
        "title": "BU GECE MİSAFİRİNİM",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "q9qj4lF54Wk",
        "duration": "3:18",
        "streams": "8.7M",
        "album": "Single",
        "year": "2025",
        "badge": "Melodik",
        "bpm": "130",
        "key": "E Minor",
        "genre": "Melodic Trap",
        "producers": "Culture Records",
        "mix_master": "Culture Records",
        "label": "Culture Records",
        "lyrics": "Bu gece misafirinim kapında bekleyen\nHer anım seninle ömrüme eklenen\nYağmur yağar üstüme, ıslanır ceketim\nSana dair ne varsa tek tek biriktirdim"
    },
    {
        "id": "cok_agladim",
        "title": "ÇOK AĞLADIM",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "N19v44M3E2I",
        "duration": "2:41",
        "streams": "16.9M",
        "album": "Single",
        "year": "2025",
        "badge": "Platin",
        "bpm": "132",
        "key": "B Minor",
        "genre": "Emotional Trap",
        "producers": "CLTR",
        "mix_master": "Waxy",
        "label": "Culture Records",
        "lyrics": "Çok ağladım geceler boyu sessizce\nKimse bilmez içimi derinden gizlice\nYıkıldı duvarlar, tükendi umutlar\nBaşımızın üstünde kara bulutlar"
    },
    {
        "id": "bak_ne_dicem",
        "title": "BAK NE DİCEM",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "tA5v3fT4w1M",
        "duration": "2:29",
        "streams": "7.3M",
        "album": "ALLIANCE",
        "year": "2026",
        "badge": "Drill",
        "bpm": "144",
        "key": "G# Minor",
        "genre": "UK Drill Style",
        "producers": "CLTR",
        "mix_master": "CLTR",
        "label": "Culture Records",
        "lyrics": "Bak ne dicem sana dinle iyi bu sözleri\nParalar desteyle kapattık biz gözleri\nMansur beat'e girdi mi durduramaz kimse\nKonuşur arkamızdan boş yapan herkes"
    },
    {
        "id": "ihtiyac_yok_otele",
        "title": "İHTİYAÇ YOK OTELE",
        "artist": "ERAY067 & MANSUR",
        "youtube_id": "mD3SqwOJ9Sc",
        "duration": "2:55",
        "streams": "13.4M",
        "album": "Single",
        "year": "2025",
        "badge": "Club Hit",
        "bpm": "136",
        "key": "C Minor",
        "genre": "Club Trap",
        "producers": "Culture Records",
        "mix_master": "Waxy",
        "label": "Culture Records",
        "lyrics": "İhtiyaç yok otele arabada konaklar\nYollarda hızımız durduramaz yasaklar\nBas gaza Eray dönmeyiz geriye\nSokaklar bizim bırak gerisini kederiye"
    },
    {
        "id": "tmax",
        "title": "TMAX",
        "artist": "ERAY067",
        "youtube_id": "Lq6Y3k8J9w4",
        "duration": "2:20",
        "streams": "12.1M",
        "album": "Solo",
        "year": "2025",
        "badge": "Solo",
        "bpm": "142",
        "key": "D# Minor",
        "genre": "Street Drill",
        "producers": "CLTR",
        "mix_master": "Waxy",
        "label": "CLTR",
        "lyrics": "Tmax altında gazlar sokaklarda ses\nFrankfurt geceleri herkes alır nefes\n067 imzamız plakada yazılı\nDostlarım yanımda, kalleşler kazılı"
    }
]

images_dir = r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\images"
os.makedirs(images_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for s in songs:
    s["youtube_url"] = f"https://www.youtube.com/watch?v={s['youtube_id']}"
    s["embed_url"] = f"https://www.youtube.com/embed/{s['youtube_id']}"
    s["thumbnail_cdn"] = f"https://img.youtube.com/vi/{s['youtube_id']}/hqdefault.jpg"
    s["thumbnail_local"] = f"assets/images/{s['id']}.jpg"
    
    img_path = os.path.join(images_dir, f"{s['id']}.jpg")
    try:
        urllib.request.urlretrieve(s["thumbnail_cdn"], img_path)
        print(f"Downloaded {img_path}")
    except Exception as e:
        print(f"Error for {s['id']}: {e}")

# Save metadata json
with open(r"C:\Users\EnesA\.gemini\antigravity\scratch\eray067-mansur-official\assets\songs.json", "w", encoding="utf-8") as f:
    json.dump(songs, f, ensure_ascii=False, indent=2)

print("Metadata and images ready!")
