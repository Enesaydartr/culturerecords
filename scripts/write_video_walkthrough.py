import os

walkthrough_content = """# ALLIANCE RECORDS & ERAY067 × MANSUR — 3D ALLIANCE VİDEO VE ANİMASYON RAPORU

İlettiğiniz gramofon ve plak videosunun yeşil arka planı profesyonel renk ayrıştırma (Chroma Key & Despill) ile silinerek, **Mansur'dan sonra gelen 3. Bölüm (ALLIANCE)** olarak 3D kaydırmalı deneyime entegre edildi.

---

## 🎬 1. Yeşil Arka Plan Silme & Video İşleme (Chroma Key)
- İlettiğiniz `Gramophone_playing_vinyl_record_...mp4` videosunun yeşil arka planı Python/OpenCV algoritmalarıyla tamamen şeffaflaştırıldı.
- Kenar yumuşatma (*alpha feathering*) ve yeşil yansıma önleme (*despill*) uygulanarak 72 adet yüksek kaliteli şeffaf WebP kare (`frame_000.webp` - `frame_071.webp`) üretildi.

---

## 📜 2. ALLIANCE 3D Kaydırmalı Bölümü (Mansur'dan Sonra)
- **Akış Sıralaması:**
  1. `01. ERAY067 // FRANKFURT`
  2. `02. MANSUR // ANKARA`
  3. `03. ALLIANCE // ALBUM EXPERIENCE` (Yeni)
- **Hız Eğrisi (Playback Curve):**
  - İstediğiniz gibi ilk kaydırmada **hızlı dönüp ilerleyen**, ardından sözler ve bilgiler okunurken **yavaşlayan ve süzülen** dinamik matematiksel eğri (`Math.pow(subProgress, 0.55)`) uygulandı.

---

## ✍️ 3. Anlatılan ALLIANCE Albüm Detayları:
1. **Orijinal Plan & Erken Çıkış:** Albümün normalde Eylül 2026'da çıkacağı, ancak dinleyicilerden gelen yoğun talep üzerine 31 Temmuz'da erkene çekildiği.
2. **Dinleyici İradesi:** Sokağın sesine kulak verilip bekletilmeden yayınlandığı.
3. **Eylül 2026 Yeni Albüm Müjdesi:** Eylül ayında Culture Records çatısı altında dinleyicileri bambaşka yepyeni bir stüdyo albümü projesinin daha beklediği.
4. **8 Ortak Başyapıt:** *bak ne dicem, gücüm yok (ft. Contra), NAFİLE, bilezik pırlanta, olm was rap mep (ft. Yung Ouzo), yesler (ft. Reder), sofi, outro*.
5. **CLTR Sound:** Waxy ve Culture Records prodüksiyonunun üst düzey ses mühendisliği.

---

## 🚀 4. Derleme & Canlı Sunucu
- `npm run build`: **0 Hata** ile başarıyla derlendi.
- Canlı sunucu aktif: **`http://192.168.1.171:5173`** (Telefon) ve **`http://localhost:5173`** (Bilgisayar).
"""

with open("C:/Users/EnesA/.gemini/antigravity/brain/1c603c8b-a7b3-496f-aaf0-1d98ce1d8bf5/walkthrough.md", "w", encoding="utf-8") as f:
    f.write(walkthrough_content)

print("walkthrough.md updated with 3D ALLIANCE video details!")
