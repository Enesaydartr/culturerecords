import os

walkthrough_content = """# ALLIANCE RECORDS & ERAY067 × MANSUR — GÜNCELLEME RAPORU

İlettiğiniz logo görseli ve metin güncellemesi başarıyla entegre edildi.

---

## 🎨 1. Özel Logo Entegre Edildi
- Sol üst menüdeki kırmızı kutucuk (`067`) kaldırılarak yerine **`C:\\Users\\EnesA\\Downloads\\image (44).png`** dosyanız (`/assets/images/brand_logo.png`) yüksek çözünürlüklü ve net olarak yerleştirildi.

---

## ✍️ 2. Ana Sayfa Hero Metni Güncellendi
- Eski biyografik anlatım yerine ikilinin enerjisini ve tarzını kısa, öz ve vurucu şekilde tamamlayan yeni metin yerleştirildi:
  > *"Ham sokak enerjisi, sert 808 ritimleri ve tavizsiz bir vizyon. İki ayrı gücün tek bir ortak manifestoda buluştuğu resmi ses ve topluluk platformu."*

---

## 🚀 3. Derleme & Doğrulama
- `npm run build`: **0 Hata** ile başarıyla derlendi (`dist/` güncellendi).
"""

with open("C:/Users/EnesA/.gemini/antigravity/brain/1c603c8b-a7b3-496f-aaf0-1d98ce1d8bf5/walkthrough.md", "w", encoding="utf-8") as f:
    f.write(walkthrough_content)

print("walkthrough.md updated with new logo and hero manifesto!")
