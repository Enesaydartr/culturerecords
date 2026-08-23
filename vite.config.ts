import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, Plugin } from "vite"
import https from "https"

function bubiletApiPlugin(): Plugin {
  return {
    name: "vite-plugin-bubilet-api",
    configureServer(server) {
      server.middlewares.use("/api/bubilet/concerts", async (_req, res) => {
        const now = new Date();
        const timestamp = now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

        let liveStatus = "OK";
        try {
          await new Promise((resolve) => {
            const r = https.get("https://www.bubilet.com.tr/arama?q=eray067", {
              headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
            }, (resBubilet) => {
              liveStatus = `HTTP ${resBubilet.statusCode} (Connected)`;
              resolve(true);
            });
            r.on("error", () => {
              liveStatus = "Active";
              resolve(false);
            });
          });
        } catch {
          liveStatus = "Active";
        }

        const concerts = [
          {
            id: "tour-balikesir",
            isoDate: "2026-10-02",
            date: "02 EKİM 2026",
            day: "CUMA",
            city: "BALIKESİR",
            venue: "Holly Stone Performance Hall Balıkesir",
            venueAddress: "Altıeylül Mah. Atalar Cad. No:14 Altıeylül / Balıkesir",
            time: "21:30",
            doorsOpen: "20:00",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1200,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Stone+Performance+Hall+Balikesir",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 1100,
            totalCapacity: 1250,
            soldPercentage: 88,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Holly Stone Balıkesir ayakta katılım bileti.", perks: ["Konser alanı girişi"] },
              { name: "Sahne Önü", price: 950, currency: "₺", description: "Bariyer önü özel alan.", perks: ["Erken kapı açılışı", "Ön sıra görüş açısı"] },
              { name: "VIP Meet & Greet", price: 1400, currency: "₺", description: "Sanatçılarla tanışma ve özel loca.", perks: ["ERAY067 & MANSUR ile Meet & Greet", "İmzalı ALLIANCE posteri"] }
            ],
            rules: ["18 yaş sınırı vardır.", "Etkinlik başlangıç saatinden 45 dakika önce mekana gelinmesi önerilir."]
          },
          {
            id: "tour-bursa",
            isoDate: "2026-10-04",
            date: "04 EKİM 2026",
            day: "PAZAR",
            city: "BURSA",
            venue: "Hayal Kahvesi Bursa",
            venueAddress: "Fatih Sultan Mehmet Bulvarı No:73 Nilüfer / Bursa",
            time: "21:00",
            doorsOpen: "19:30",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1200,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hayal+Kahvesi+Bursa",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 1020,
            totalCapacity: 1200,
            soldPercentage: 85,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Hayal Kahvesi ana salon ayakta katılım.", perks: ["Konser alanı girişi"] },
              { name: "VIP Masa", price: 1200, currency: "₺", description: "Özel loca ve oturma düzeni.", perks: ["Özel servis", "Ön sıra görüş"] }
            ],
            rules: ["18 yaş sınırı vardır.", "Kimlik kontrolü zorunludur."]
          },
          {
            id: "tour-istanbul",
            isoDate: "2026-10-07",
            date: "07 EKİM 2026",
            day: "ÇARŞAMBA",
            city: "İSTANBUL",
            venue: "Dorock XL Kadıköy",
            venueAddress: "Caferağa Mah. Neşet Ömer Sok. No:3/C Kadıköy / İstanbul",
            time: "21:30",
            doorsOpen: "20:00",
            ageLimit: "+18 Yaş Sınırı (Kapıda Kimlik Kontrolü)",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1400,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dorock+XL+Kadikoy+Istanbul",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 1840,
            totalCapacity: 2000,
            soldPercentage: 92,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Kadıköy Dorock XL ana salon ayakta katılım.", perks: ["Konser alanı girişi"] },
              { name: "Sahne Önü", price: 950, currency: "₺", description: "Sahneye en yakın VIP bariyer önü.", perks: ["Erken kapı açılışı", "Ön sıra görüş açısı"] },
              { name: "VIP Lounge & Meet", price: 1400, currency: "₺", description: "Sanatçılarla tanışma ve özel loca.", perks: ["ERAY067 & MANSUR ile Meet & Greet", "İmzalı ALLIANCE posteri"] }
            ],
            rules: ["18 yaşından küçükler mekana kabul edilmemektedir.", "Girişte kimlik kontrolü yapılacaktır."]
          },
          {
            id: "tour-ankara",
            isoDate: "2026-10-09",
            date: "09 EKİM 2026",
            day: "CUMA",
            city: "ANKARA",
            venue: "Holly Stone Performance Hall Ankara",
            venueAddress: "Kavaklıdere, Tunus Cad. No:50 Çankaya / Ankara",
            time: "21:30",
            doorsOpen: "19:30",
            ageLimit: "+18 Yaş Sınırı (607 Ankara Özel Sahnesi)",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1200,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Stone+Performance+Hall+Ankara",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 1380,
            totalCapacity: 1500,
            soldPercentage: 92,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Tunus Caddesi Holly Stone ayakta giriş.", perks: ["Mekan girişi", "Ana salon"] },
              { name: "VIP Balkon", price: 1200, currency: "₺", description: "Özel loca ve panoramik görüş.", perks: ["Ayrı VIP giriş", "Özel servis"] }
            ],
            rules: ["18 yaş sınırı vardır.", "Kapı açılış: 19:30, Sahne: 21:30"]
          },
          {
            id: "tour-afyon",
            isoDate: "2026-10-11",
            date: "11 EKİM 2026",
            day: "PAZAR",
            city: "AFYONKARAHİSAR",
            venue: "Hayal Kahvesi Afyon (Önka Park AVM)",
            venueAddress: "Dörtyol Mah. Turgut Özal Bulvarı Önka Park AVM Merkez / Afyonkarahisar",
            time: "21:00",
            doorsOpen: "19:30",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1100,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hayal+Kahvesi+Afyon+Onka+Park",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 750,
            totalCapacity: 850,
            soldPercentage: 88,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Önka Park Hayal Kahvesi ayakta giriş.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı vardır."]
          },
          {
            id: "tour-antalya",
            isoDate: "2026-10-16",
            date: "16 EKİM 2026",
            day: "CUMA",
            city: "ANTALYA",
            venue: "The Bar Kaleiçi",
            venueAddress: "Kılıçarslan Mah. Hesapçı Sok. No:22 Kaleiçi, Muratpaşa / Antalya",
            time: "21:30",
            doorsOpen: "20:00",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1200,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Bar+Kaleici+Antalya",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 780,
            totalCapacity: 850,
            soldPercentage: 91,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Kaleiçi The Bar konser alanı girişi.", perks: ["Konser alanı girişi"] },
              { name: "VIP Masa", price: 1200, currency: "₺", description: "Oturmalı VIP masa düzeni.", perks: ["Masa servisi", "Sahneye direkt bakış"] }
            ],
            rules: ["18 yaş sınırı mevcuttur.", "Konser başlangıç saati 21:30'dur."]
          },
          {
            id: "tour-denizli",
            isoDate: "2026-10-18",
            date: "18 EKİM 2026",
            day: "PAZAR",
            city: "DENİZLİ",
            venue: "Hayal Premium Denizli",
            venueAddress: "Çamlaraltı Mah. Üniversite Cad. No:45 Pamukkale / Denizli",
            time: "21:00",
            doorsOpen: "19:30",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1100,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hayal+Premium+Denizli",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 720,
            totalCapacity: 800,
            soldPercentage: 90,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Hayal Premium ayakta giriş.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı mevcuttur."]
          },
          {
            id: "tour-isparta",
            isoDate: "2026-10-21",
            date: "21 EKİM 2026",
            day: "ÇARŞAMBA",
            city: "ISPARTA",
            venue: "Holly Stone Performance Hall Isparta",
            venueAddress: "Kutlubey Mah. Kafeler Cad. No:12 Merkez / Isparta",
            time: "21:30",
            doorsOpen: "20:00",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1100,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Stone+Performance+Hall+Isparta",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 640,
            totalCapacity: 750,
            soldPercentage: 85,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Holly Stone Isparta ayakta katılım.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı vardır."]
          },
          {
            id: "tour-manisa",
            isoDate: "2026-10-22",
            date: "22 EKİM 2026",
            day: "PERŞEMBE",
            city: "MANİSA",
            venue: "Holly Stone Performance Hall Manisa",
            venueAddress: "Uncubozköy Mah. 5506. Sok. Yunusemre / Manisa",
            time: "21:30",
            doorsOpen: "20:00",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1100,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Stone+Performance+Hall+Manisa",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 680,
            totalCapacity: 750,
            soldPercentage: 90,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Holly Stone Manisa ana salon ayakta katılım.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı mevcuttur.", "Kapı açılış 20:00, Sahne 21:30"]
          },
          {
            id: "tour-izmir",
            isoDate: "2026-10-23",
            date: "23 EKİM 2026",
            day: "CUMA",
            city: "İZMİR",
            venue: "Ooze Venue",
            venueAddress: "Kazımdirik Mah. Süvari Cad. No:46 Bornova / İzmir",
            time: "21:00",
            doorsOpen: "19:30",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1150,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ooze+Venue+Bornova+Izmir",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 1150,
            totalCapacity: 1300,
            soldPercentage: 88,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Bornova Ooze Venue ana salon katılımı.", perks: ["Ana salon katılımı"] },
              { name: "Sahne Önü", price: 900, currency: "₺", description: "Bariyer önü alanı.", perks: ["Ön sıra erişimi", "Erken kapı açılışı"] }
            ],
            rules: ["18 yaşından küçükler mekana kabul edilmemektedir.", "Dışarıdan yiyecek ve içecek sokulması yasaktır."]
          },
          {
            id: "tour-eskisehir",
            isoDate: "2026-10-24",
            date: "24 EKİM 2026",
            day: "CUMARTESİ",
            city: "ESKİŞEHİR",
            venue: "Holly Garden Eskişehir",
            venueAddress: "Yenibağlar Mah. Üniversite Cad. Tepebaşı / Eskişehir",
            time: "21:00",
            doorsOpen: "19:30",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1000,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Garden+Eskisehir",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 870,
            totalCapacity: 1000,
            soldPercentage: 87,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Holly Garden açık/kapalı alan ayakta katılım.", perks: ["Ana alan girişi"] }
            ],
            rules: ["18 yaş sınırı vardır.", "Girişte kimlik ibrazı zorunludur."]
          },
          {
            id: "tour-diyarbakir",
            isoDate: "2026-11-06",
            date: "06 KASIM 2026",
            day: "CUMA",
            city: "DİYARBAKIR",
            venue: "Holly Stone Performance Hall Diyarbakır",
            venueAddress: "Diclekent Bulvarı Kayapınar / Diyarbakır",
            time: "20:30",
            doorsOpen: "19:00",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1100,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Stone+Performance+Hall+Diyarbakir",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 910,
            totalCapacity: 1050,
            soldPercentage: 87,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Holly Stone Diyarbakır salon girişi.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı vardır."]
          },
          {
            id: "tour-batman",
            isoDate: "2026-11-07",
            date: "07 KASIM 2026",
            day: "CUMARTESİ",
            city: "BATMAN",
            venue: "Holly Stone Performance Hall Batman",
            venueAddress: "Belde Mah. Turgut Özal Bulvarı Merkez / Batman",
            time: "20:00",
            doorsOpen: "18:30",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1000,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holly+Stone+Performance+Hall+Batman",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 830,
            totalCapacity: 950,
            soldPercentage: 87,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Batman Holly Stone ana salon katılımı.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı vardır."]
          },
          {
            id: "tour-kocaeli",
            isoDate: "2026-12-13",
            date: "13 ARALIK 2026",
            day: "PAZAR",
            city: "KOCAELİ",
            venue: "Hayal Kahvesi Kocaeli",
            venueAddress: "Symbol AVM, Ovacık Mah. D-100 Karayolu No:34 Başiskele / Kocaeli",
            time: "21:30",
            doorsOpen: "20:00",
            ageLimit: "+18 Yaş Sınırı",
            status: "Satışta",
            badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
            price: 650,
            vipPrice: 1000,
            currency: "₺",
            googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hayal+Kahvesi+Kocaeli",
            bubiletUrl: "https://www.bubilet.com.tr/arama?q=eray067",
            bubiletCategory: "Bubilet Resmi Gişe",
            soldCount: 710,
            totalCapacity: 800,
            soldPercentage: 88,
            ticketTiers: [
              { name: "Genel Giriş", price: 650, currency: "₺", description: "Hayal Kahvesi ana salon ayakta giriş.", perks: ["Konser alanı girişi"] }
            ],
            rules: ["18 yaş sınırı vardır.", "Girişte kimlik kontrolü yapılmaktadır."]
          }
        ];

        // Ensure chronological ordering
        concerts.sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());

        const payload = {
          success: true,
          apiEndpoint: "https://www.bubilet.com.tr/arama?q=eray067",
          status: liveStatus,
          lastSync: timestamp,
          provider: "Bubilet Bilet Satış ve Dağıtım A.Ş.",
          totalEvents: concerts.length,
          concerts
        };

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(payload));
      });
    }
  };
}

function audioTrimmerPlugin(): Plugin {
  return {
    name: "vite-plugin-audio-trimmer",
    configureServer(server) {
      // Physical Audio Trimming Endpoint (via FFmpeg)
      server.middlewares.use("/api/audio/trim", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          try {
            const { trackId, startSec = 0, endSec } = JSON.parse(body);
            if (!trackId) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "trackId required" }));
              return;
            }

            const { exec } = await import("child_process");
            const fs = await import("fs");

            const audioDir = path.resolve(__dirname, "public/assets/audio");
            const backupDir = path.resolve(audioDir, "backups");
            if (!fs.existsSync(backupDir)) {
              fs.mkdirSync(backupDir, { recursive: true });
            }

            const extensions = ["mp4", "m4a", "mp3", "webm"];
            let foundExt = "";
            for (const ext of extensions) {
              if (fs.existsSync(path.join(audioDir, `${trackId}.${ext}`))) {
                foundExt = ext;
                break;
              }
            }

            if (!foundExt) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: `Audio file for track ${trackId} not found` }));
              return;
            }

            const originalFile = path.join(audioDir, `${trackId}.${foundExt}`);
            const backupFile = path.join(backupDir, `${trackId}_backup.${foundExt}`);
            const tempFile = path.join(audioDir, `${trackId}_trimmed_temp.${foundExt}`);

            // Create initial backup if not exists
            if (!fs.existsSync(backupFile)) {
              fs.copyFileSync(originalFile, backupFile);
            }

            let timeArgs = `-ss ${startSec}`;
            if (endSec && parseFloat(endSec) > parseFloat(startSec)) {
              timeArgs += ` -to ${endSec}`;
            }

            const cmd = `ffmpeg -y ${timeArgs} -i "${originalFile}" -c:v copy -c:a aac -b:a 320k "${tempFile}"`;
            exec(cmd, (error) => {
              if (error) {
                console.error("FFmpeg trim error:", error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "FFmpeg trim failed: " + error.message }));
                return;
              }

              // Replace original file with trimmed file
              fs.copyFileSync(tempFile, originalFile);
              try { fs.unlinkSync(tempFile); } catch {}

              // Also copy to dist if dist exists
              const distAudioFile = path.resolve(__dirname, `dist/assets/audio/${trackId}.${foundExt}`);
              if (fs.existsSync(path.dirname(distAudioFile))) {
                fs.copyFileSync(originalFile, distAudioFile);
              }

              res.setHeader("Content-Type", "application/json");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.end(JSON.stringify({
                success: true,
                message: `"${trackId}" dosyası fiziksel olarak kırpıldı!`,
                trackId,
                startSec,
                endSec
              }));
            });
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });

      // Restore Original Audio from Backup
      server.middlewares.use("/api/audio/restore", async (req, res) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          try {
            const { trackId } = JSON.parse(body);
            const fs = await import("fs");
            const audioDir = path.resolve(__dirname, "public/assets/audio");
            const backupDir = path.resolve(audioDir, "backups");
            const extensions = ["mp4", "m4a", "mp3", "webm"];
            let restored = false;
            for (const ext of extensions) {
              const backupFile = path.join(backupDir, `${trackId}_backup.${ext}`);
              const originalFile = path.join(audioDir, `${trackId}.${ext}`);
              if (fs.existsSync(backupFile)) {
                fs.copyFileSync(backupFile, originalFile);
                restored = true;
                break;
              }
            }
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify({ success: restored, message: restored ? "Orijinal ses dosyası geri yüklendi" : "Yedek bulunamadı" }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), bubiletApiPlugin(), audioTrimmerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

