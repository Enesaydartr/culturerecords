import os

walkthrough_content = """# ALLIANCE RECORDS & ERAY067 × MANSUR — GELİŞMİŞ ALTYAPI VE ÖZELLİK RAPORU

Tüm istenen geliştirmeler, güvenlik katmanları, dosya yükleme sistemleri ve kullanıcı deneyimi optimizasyonları eksiksiz uygulanmış; derin hata kontrolü yapılarak proje sıfır hata ile derlenmiştir.

---

## 🔑 1. Resmi Hesap Giriş Bilgileri

- **👑 Ana Süperadmin (Enes):**
  - **Kullanıcı Adı:** `enes`
  - **Şifre:** `enes7645`
  - **Rol:** `👑 Alliance Superadmin`

- **🎙️ ERAY067 (Sanatçı Hesabı):**
  - **Kullanıcı Adı:** `eray067`
  - **Şifre:** `alliance2026`
  - **Rol:** `👑 Admin`

- **🎹 MANSUR (Prodüktör Hesabı):**
  - **Kullanıcı Adı:** `mansur`
  - **Şifre:** `alliance2026`
  - **Rol:** `👑 Admin`

---

## 📱 2. Galeriden ve Dosyalardan Medya Yükleme Desteği

- **Profil Resmi (Avatar):** Kullanıcılar galerisinden veya dosyalarından istedikleri resmi profil fotoğrafı yapabilir (`FileReader` base64).
- **Haber Resmi:** Admin panelinde haber oluştururken bilgisayardan / galeriden kapak resmi seçilebilir.
- **Mix Kapak Resmi:** 1:1 formatında kapak resmi cihazdan yüklenebilir.
- **Mix MP3 Ses Dosyası:** Bilgisayar veya telefondan mikslenen MP3 / ses dosyası seçilebilir ve oynatıcıda dinlenebilir.
- **Sohbet & DM Görseli:** Canlı sohbette ve özel mesajlarda cihazdan resim seçip gönderebilme.

---

## 🧭 3. Üst Menü & Navigasyon Yenilendi
- Geniş "TOPLULUK & LİSTELER" butonu kaldırıldı.
- Profilin hemen sağına şık bir **Hamburger Menü Butonu (`☰`)** yerleştirildi. Bu butona tıklanarak Çalma Listeleri, Mixler ve Topluluk çekmecesine doğrudan erişilebilir.
- Profil resimlerindeki kırık görsel sorunları otomatik yedek kapak sistemiyle (`onError` fallback) tamamen giderildi.

---

## ➕ 4. Şarkıları Çalma Listelerine Ekleme (`AddToPlaylistModal`)
- Hem diskografi parçalarında hem de alt oynatıcıda **`+ Listeye Ekle`** butonu eklendi.
- Dinleyiciler tek tıkla şarkıyı mevcut listelerine ekleyebilir/çıkarabilir veya anında yeni bir çalma listesi oluşturabilir.

---

## 👤 5. Kullanıcı Profili Görüntüleme (`UserProfileModal`)
- Sohbet veya yorumlardaki herhangi bir kullanıcının profiline tıklandığında açılan detaylı profil penceresi:
  - Avatar, görünen ad, kullanıcı adı, biyografi, kayıt tarihi.
  - Dinleyicinin favori şarkısı (tıklayıp çalabilme).
  - Oluşturduğu çalma listeleri ve paylaştığı mixler.
  - Takip Et / Arkadaş Ekle ve DM Gönder butonları.

---

## 🔒 6. Güvenlik & Şifre İşlemleri
- **Şifremi Unuttum:** E-posta adresi girildiğinde 6 haneli güvenlik doğrulama kodu oluşturulur; kod girilerek yeni şifre belirlenir.
- **Güvenli Şifre Değiştirme:** Ayarlardan şifre değiştirmek için kullanıcının önce **Mevcut (Eski) Şifresini** girmesi zorunludur.
- **Google ile Giriş Yap:** Google ile ilk kez katılan kullanıcılara benzersiz kullanıcı adı seçimi sunulur; kullanıcı adı çakışmaları engellenir.

---

## 📻 7. Birlikte Dinle & Eşleşme Sistemi
- **Mod & Rastgele Eşleşme:** "Drill & Hype", "Gece Sürüşü", "Melankoli", "Konser" modlarında anlık frekans odaları.
- **Özel Davet Kodu:** Özel oda açıp arkadaşla kod paylaşarak canlı senkron dinleme ve oda sohbeti.

---

## 🚀 8. Derleme & Doğrulama
- `npm run build`: **0 Hata** ile başarıyla derlendi (`dist/` optimize edildi).
"""

with open("C:/Users/EnesA/.gemini/antigravity/brain/1c603c8b-a7b3-496f-aaf0-1d98ce1d8bf5/walkthrough.md", "w", encoding="utf-8") as f:
    f.write(walkthrough_content)

print("walkthrough.md fully updated!")
