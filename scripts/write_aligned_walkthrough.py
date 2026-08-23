import os

walkthrough_content = """# ALLIANCE RECORDS & ERAY067 × MANSUR — ŞARKI SÖZLERİ & KIRPMA KALİBRASYON RAPORU

Fiziksel olarak kırpılmış şarkıların (video introları kesilmiş ses dosyaları) zamanlamaları analiz edilerek, **tüm şarkı sözlerinin zaman damgaları kırpılan ses başlangıçlarına göre milisaniyelik olarak yeniden kalibre edildi**.

---

## 🎯 1. Neden Kayma Vardı & Nasıl Düzeltildi?
- **Sorun:** Orijinal YouTube video kliplerinde yer alan 18–26 saniyelik introlar kesilip şarkılar baştan başlatıldığı için, eski yedek dosyasındaki sözler 20 saniye geç kalıyordu (şarkı 0. saniyede söze girerken, sözler 20. saniyede geliyordu).
- **Çözüm:** 
  - Kırpılan her şarkı (`gucum_yok`, `bilezik_pirlanta`, `olm_was_rap_mep`, `yesler`, `bak_ne_dicem`, `yaramaz`, `hmdl`, `aktiv2`, `yazik_sana`, `sorma`, `alisamadim`) ses dosyalarının gerçek başlangıç anına göre tam olarak kaydırıldı (`-offset`).
  - İlk sözler tam şarkının başladığı **1. saniyeye** oturtuldu.
  - Zaten tam süresinde olan şarkılara (`sofi`, `nafile`, `brapap2`, `azdan_az_coktan_cok`, `burada_sokaklar` vb.) dokunulmadı.

---

## 🔒 2. Temiz Önbellek & Canlı Dağıtım
- Tarayıcı önbellek anahtarları `v4` seviyesine yükseltilerek eski kaymış verilerin üzerine yeni mükemmel senkron yazıldı.
- `npm run build`: **0 Hata** ile başarıyla derlendi.
- Canlı GitHub deposuna (`main`) gönderildi.

---

## 📱 Canlı Linkleriniz:
- **Public / Mobil:** `https://b5cf-212-133-199-137.ngrok-free.app`
- **Yerel Ağ (Wi-Fi):** `http://192.168.1.175:5173`
- **Bilgisayar:** `http://localhost:5173`
"""

with open("C:/Users/EnesA/.gemini/antigravity/brain/1c603c8b-a7b3-496f-aaf0-1d98ce1d8bf5/walkthrough.md", "w", encoding="utf-8") as f:
    f.write(walkthrough_content)

print("walkthrough.md updated with aligned lyrics report!")
