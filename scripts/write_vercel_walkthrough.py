import os

walkthrough_content = """# ALLIANCE RECORDS & ERAY067 × MANSUR — VERCEL & CULTURERECORDS.COM DAĞITIM REHBERİ

Projenin tüm Vercel yapılandırmaları (`vercel.json`, SPA yönlendirmeleri, statik dosya önbellekleri ve Git deposu) hazırlandı.

---

## 🌐 culturerecords.com Alan Adı İçin DNS Ayarları:

Alan adınızı satın aldığınız panelde (GoDaddy, Namecheap, Turhost, Cloudflare vb.) DNS yönetimine girip şu 2 kaydı ekleyin:

| Tür (Type) | İsim / Host | Değer (Value / Target) |
|---|---|---|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

---

## 🚀 Vercel'e Bağlama (2 Kolay Yol):

### 1. Yol: Terminalden Tek Komutla (Vercel CLI)
Proje klasöründe terminali açıp şu komutu çalıştırın:
```bash
npx vercel --prod
```
- Tarayıcıda açılan ekranda Vercel hesabınıza giriş yapın.
- Proje adını onaylayın (Örn: `culturerecords`).
- Yükleme tamamlandıktan sonra alan adınızı ekleyin:
```bash
npx vercel domains add culturerecords.com
```

### 2. Yol: GitHub Üzerinden (Otomatik Güncelleme)
1. GitHub'da yeni bir repo oluşturun.
2. Terminalden gönderin:
   ```bash
   git remote add origin https://github.com/KULLANICI_ADINIZ/culturerecords.git
   git branch -M main
   git push -u origin main
   ```
3. [vercel.com/new](https://vercel.com/new) adresine girin, reponuzu seçin ve **Deploy**'a basın.
4. Proje açılınca **Settings > Domains** kısmından `culturerecords.com` ekleyin.
"""

with open("C:/Users/EnesA/.gemini/antigravity/brain/1c603c8b-a7b3-496f-aaf0-1d98ce1d8bf5/walkthrough.md", "w", encoding="utf-8") as f:
    f.write(walkthrough_content)

print("walkthrough.md updated with Vercel and domain deployment instructions!")
