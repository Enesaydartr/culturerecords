/**
 * ERAY067 × MANSUR Official Data Store
 * Complete Discography, Artist Bios, Tour Dates, Soundboard & Slang Glossary
 */

const ARTIST_DATA = {
  names: "ERAY067 × MANSUR",
  label: "Culture Records (CLTR)",
  tagline: "Frankfurt Sokaklarından Türkiye Listelerinin Zirvesine",
  stats: {
    monthlyListeners: "2.7M+",
    totalStreams: "150M+",
    awards: "O Ses Rap 2025 Şampiyonu",
    releasesCount: "24+",
    tourCities: "8 Şehir"
  },
  artists: [
    {
      id: "eray067",
      name: "ERAY067",
      fullName: "Eray Ünal",
      origin: "Frankfurt, Almanya",
      birthYear: "2003",
      role: "Flow King / Rap Sanatçısı",
      achievements: "O Ses Rap 2025 Şampiyonu (Sefo Takımı)",
      signatureStyle: "Sert German Drill & Türkçe Trap Sentezi, Yüksek Hızlı Flow",
      instagram: "https://www.instagram.com/eray067_",
      spotify: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
      youtube: "https://www.youtube.com/@eray067-topic",
      image: "assets/images/eray067_avatar.jpg",
      bio: "2003 yılında Frankfurt'ta doğan ERAY067, Avrupa sokak kültürü ve sert drill ritimlerini Türk rap sahnesiyle harmanlayarak benzersiz bir tarz yarattı. 2025 yılında O Ses Rap yarışmasında şampiyonluğa ulaşarak kariyerinde tarihi bir çıkış yakaladı. 'G WAGON', 'Tmax' ve viral parçalarıyla milyonlarca dinleyiciye ulaştı."
    },
    {
      id: "mansur",
      name: "MANSUR",
      fullName: "Ahmet Mansur Şahin",
      origin: "Ankara / Malatya",
      birthYear: "2002",
      role: "Melodik Nakarat Ustası / Rapçi",
      achievements: "Platin Plak & Milyonluk Ortak Hitlerin Mimarı",
      signatureStyle: "Karakteristik Vokal, Derin Melodik Trap Hookları, Sokak Realizmi",
      instagram: "https://www.instagram.com/mansur607_",
      spotify: "https://open.spotify.com/artist/1nXS8JvKsTNSGw75Axv6rm",
      youtube: "https://www.youtube.com/@cltr",
      image: "assets/images/bu_gece_misafirinim.jpg",
      bio: "2002 yılında Ankara'da doğan ve aslen Malatyalı olan Ahmet Mansur Şahin, sağlık eğitiminin ardından tam zamanlı müzik kariyerine odaklandı. ERAY067 ile kurduğu güçlü ortaklık sayesinde 'NAFİLE', 'YAZIK SANA', 'sofi' gibi dönemin en büyük sokak marşlarına imza attı. Melodik trap hissiyatı ve akılda kalıcı nakaratlarıyla tanınıyor."
    }
  ],
  album: {
    title: "ALLIANCE",
    year: "2026",
    label: "Culture Records",
    releaseDate: "2026",
    trackCount: "12 Parça",
    cover: "assets/images/sofi.jpg",
    description: "ERAY067 ve MANSUR'un ortak vizyonunu taçlandıran 'ALLIANCE', Frankfurt-Ankara hattındaki sokak kültürünü, Avrupa drill altyapılarını ve Türk rap sahnesinin dev isimlerini (Contra, Yung Ouzo, Reder) bir araya getiren başyapıt albümdür.",
    highlights: ["sofi", "gücüm yok (ft. Contra)", "bak ne dicem", "yesler (ft. Reder)", "olm was rap mep"]
  },
  songs: [
    {
      id: "nafile",
      title: "NAFİLE",
      artist: "ERAY067 & MANSUR",
      youtube_id: "gD3SqwOJ9Sc",
      duration: "2:48",
      durationSec: 168,
      streams: "18.5M",
      album: "ALLIANCE",
      category: "alliance",
      year: "2026",
      badge: "Hit #1",
      bpm: "142",
      key: "F Minor",
      genre: "Drill / Trap",
      producers: "Kaleen, İTSKİMOBEATS",
      mix_master: "Waxy",
      label: "Culture Records (CLTR)",
      image: "assets/images/nafile.jpg",
      lyrics: `[Nakarat: Mansur & Eray067]
Yazdım adını kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile

[Verse 1: ERAY067]
Sokaklar soğuk, geceler ayaz
Gözlerimin rengi kara ve beyaz
Söyle bana ne kaldı geriye biraz
Frankfurt'tan doğan bu büyük avaz
067 plakada yazılı damga
Her adımda arkamda koca bir dalga
Biz durmayız çocuk, yolumuz daima ileri
Boş laflara karnımız tok, al geri!

[Nakarat: Mansur & Eray067]
Yazdım adını kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile

[Verse 2: MANSUR]
Karanlık çöker Ankara üstüne
Göz diktiler kardeşlerimin büstüne
Yenilmedik hiç bu çakal sürüsüne
Düştük kalktık, baktık hep önümüze
Mansur & Eray beat'e girdi mi tamam
Bu saatten sonra durduramaz zaman!`
    },
    {
      id: "yazik_sana",
      title: "YAZIK SANA",
      artist: "ERAY067 & MANSUR",
      youtube_id: "r-oPri2aSgE",
      duration: "3:12",
      durationSec: 192,
      streams: "14.2M",
      album: "Single",
      category: "hits",
      year: "2026",
      badge: "Trend Klip",
      bpm: "140",
      key: "C# Minor",
      genre: "Street Drill",
      producers: "Waxy",
      mix_master: "Waxy",
      label: "netd müzik / CLTR",
      image: "assets/images/yazik_sana.jpg",
      lyrics: `[Verse 1: ERAY067]
Tüm rapçiler fiyasko, yüzlerinde maske
Aileme asker ben, sokaklara hasret
Götün yerse kastet, buraları kasvet
Kararıyor kederden, dinlemez adalet

Düşmanlar pusuda, bekler bizi sırayla
Biz bu yolu kazandık tırnakla, değil parayla
Mansur & Eray tek yumruk sahada
Yazık sana çocuk, kalırsın arkada!

[Nakarat: Mansur]
Gözlerimde ateş, içimde yangın
Sen kendini bu şehrin kralı mı sandın?
Yazık sana, düştün bu tuzağa
Bakakal şimdi uzaktan uzağa!`
    },
    {
      id: "sofi",
      title: "sofi",
      artist: "ERAY067 & MANSUR",
      youtube_id: "EJHfw5MlXkQ",
      duration: "2:35",
      durationSec: 155,
      streams: "9.8M",
      album: "ALLIANCE",
      category: "alliance",
      year: "2026",
      badge: "Albüm Çıkışı",
      bpm: "138",
      key: "G Minor",
      genre: "Dark Trap",
      producers: "CLTR Beats",
      mix_master: "Culture Records",
      label: "Culture Records",
      image: "assets/images/sofi.jpg",
      lyrics: `[Verse 1: Mansur & Eray067]
Bunlar kim? Bunlar değil bizim mahalleden
Burdan bir eksildik, bir arttık hapishaneden
Her köşe başında nöbette gençler
Gecenin karanlığı umutları gizler

[Verse 2: ERAY067]
Sofi derler bize yolumuz açık
Korkumuz yok kimseden, alnımız ak açık
Frankfurt'tan akar ritim damarlara
Selam olsun sokaktaki tüm canlara!`
    },
    {
      id: "gucum_yok",
      title: "GÜCÜM YOK",
      artist: "ERAY067 x MANSUR x CONTRA",
      youtube_id: "1_RD5Xxbm5E",
      duration: "3:05",
      durationSec: 185,
      streams: "22.4M",
      album: "ALLIANCE",
      category: "collab",
      year: "2026",
      badge: "Contra Feat",
      bpm: "145",
      key: "A Minor",
      genre: "Heavy Trap / Rap",
      producers: "CLTR",
      mix_master: "Waxy",
      label: "Culture Records",
      image: "assets/images/gucum_yok.jpg",
      lyrics: `[Nakarat: Mansur]
Gücüm yok artık tutmaya bu elleri
Yalanların sardı her bi yerleri
Kırıldı güvenim, kapandı perdeler
Kaldı geride sadece gölgeler

[Verse: Contra]
Contra girdi mikrofona, sözler kurşun gibi
Sokaklar anlatır kim bu işin gerçek sahibi
Eray ve Mansur vurdu mühürü
Yıkamaz bizi bu düzenin sahte zihniyeti!`
    },
    {
      id: "yaramaz",
      title: "YARAMAZ",
      artist: "ERAY067 & MANSUR",
      youtube_id: "bk1-1B3476E",
      duration: "2:52",
      durationSec: 172,
      streams: "11.1M",
      album: "Single",
      category: "hits",
      year: "2025",
      badge: "Viral Hit",
      bpm: "135",
      key: "D Minor",
      genre: "Trap",
      producers: "Culture Records",
      mix_master: "CLTR",
      label: "Culture Records",
      image: "assets/images/yaramaz.jpg",
      lyrics: `[Nakarat: Mansur]
Yaramaz sokaklar, geceler kan ağlar
Peşimizde sirenler, arkamızda dağlar
Biz seçmedik bu yolu, hayat böyle istedi
Herkes kaçarken biz durduk, kimse bilmedi`
    },
    {
      id: "bu_gece_misafirinim",
      title: "BU GECE MİSAFİRİNİM",
      artist: "ERAY067 & MANSUR",
      youtube_id: "Q0E8fwC1JF4",
      duration: "3:18",
      durationSec: 198,
      streams: "8.7M",
      album: "Single",
      category: "hits",
      year: "2025",
      badge: "Melodik",
      bpm: "130",
      key: "E Minor",
      genre: "Melodic Trap",
      producers: "Culture Records",
      mix_master: "Culture Records",
      label: "Culture Records",
      image: "assets/images/bu_gece_misafirinim.jpg",
      lyrics: `[Nakarat: Mansur]
Bu gece misafirinim kapında bekleyen
Her anım seninle ömrüme eklenen
Yağmur yağar üstüme, ıslanır ceketim
Sana dair ne varsa tek tek biriktirdim`
    },
    {
      id: "cok_agladim",
      title: "ÇOK AĞLADIM",
      artist: "ERAY067 & MANSUR",
      youtube_id: "eWeWAZiqW0Y",
      duration: "2:41",
      durationSec: 161,
      streams: "16.9M",
      album: "Single",
      category: "hits",
      year: "2025",
      badge: "Platin Plak",
      bpm: "132",
      key: "B Minor",
      genre: "Emotional Trap",
      producers: "CLTR",
      mix_master: "Waxy",
      label: "Culture Records",
      image: "assets/images/cok_agladim.jpg",
      lyrics: `[Nakarat: Mansur]
Çok ağladım geceler boyu sessizce
Kimse bilmez içimi derinden gizlice
Yıkıldı duvarlar, tükendi umutlar
Başımızın üstünde kara bulutlar`
    },
    {
      id: "bak_ne_dicem",
      title: "BAK NE DİCEM",
      artist: "ERAY067 & MANSUR",
      youtube_id: "MArJetRSQiM",
      duration: "2:29",
      durationSec: 149,
      streams: "7.3M",
      album: "ALLIANCE",
      category: "alliance",
      year: "2026",
      badge: "Drill",
      bpm: "144",
      key: "G# Minor",
      genre: "UK Drill",
      producers: "CLTR",
      mix_master: "CLTR",
      label: "Culture Records",
      image: "assets/images/bak_ne_dicem.jpg",
      lyrics: `[Verse: ERAY067]
Bak ne dicem sana dinle iyi bu sözleri
Paralar desteyle kapattık biz gözleri
Mansur beat'e girdi mi durduramaz kimse
Konuşur arkamızdan boş yapan herkes`
    },
    {
      id: "ihtiyac_yok_otele",
      title: "İHTİYAÇ YOK OTELE",
      artist: "ERAY067 & MANSUR",
      youtube_id: "NPcRsdmeSoI",
      duration: "2:55",
      durationSec: 175,
      streams: "13.4M",
      album: "Single",
      category: "hits",
      year: "2025",
      badge: "Club Trap",
      bpm: "136",
      key: "C Minor",
      genre: "Club Trap",
      producers: "Culture Records",
      mix_master: "Waxy",
      label: "Culture Records",
      image: "assets/images/ihtiyac_yok_otele.jpg",
      lyrics: `[Verse: ERAY067 & Mansur]
İhtiyaç yok otele arabada konaklar
Yollarda hızımız durduramaz yasaklar
Bas gaza Eray dönmeyiz geriye
Sokaklar bizim bırak gerisini kederiye!`
    },
    {
      id: "tmax",
      title: "TMAX",
      artist: "ERAY067",
      youtube_id: "FjLZXS7sD2U",
      duration: "2:20",
      durationSec: 140,
      streams: "12.1M",
      album: "Solo",
      category: "hits",
      year: "2025",
      badge: "Eray Solo",
      bpm: "142",
      key: "D# Minor",
      genre: "Street Drill",
      producers: "CLTR",
      mix_master: "Waxy",
      label: "CLTR",
      image: "assets/images/tmax.jpg",
      lyrics: `[Verse: ERAY067]
Tmax altında gazlar sokaklarda ses
Frankfurt geceleri herkes alır nefes
067 imzamız plakada yazılı
Dostlarım yanımda, kalleşler kazılı!`
    }
  ],
  tours: [
    {
      id: "tour-ist",
      date: "24 EKİM 2026",
      city: "İSTANBUL",
      venue: "KüçükÇiftlik Park (Open Air)",
      status: "Satışta",
      badgeClass: "badge-live",
      time: "21:00",
      price: 450,
      vipPrice: 1200
    },
    {
      id: "tour-ank",
      date: "07 KASIM 2026",
      city: "ANKARA",
      venue: "IF Performance Hall Armada",
      status: "Tükenmek Üzere",
      badgeClass: "badge-warning",
      time: "21:30",
      price: 400,
      vipPrice: 1000
    },
    {
      id: "tour-izm",
      date: "14 KASIM 2026",
      city: "İZMİR",
      venue: "Ooze Venue Bornova",
      status: "Satışta",
      badgeClass: "badge-live",
      time: "21:00",
      price: 380,
      vipPrice: 950
    },
    {
      id: "tour-fra",
      date: "28 KASIM 2026",
      city: "FRANKFURT",
      venue: "Batschkapp Kulturzentrum",
      status: "Özel Konser",
      badgeClass: "badge-vip",
      time: "20:30",
      price: 45, // EUR
      vipPrice: 120
    },
    {
      id: "tour-ber",
      date: "05 ARALIK 2026",
      city: "BERLİN",
      venue: "Astra Kulturhaus",
      status: "Satışta",
      badgeClass: "badge-live",
      time: "20:30",
      price: 40, // EUR
      vipPrice: 110
    }
  ],
  soundboardPads: [
    { key: "Q", label: "808 SUB BASS", type: "sub_bass", color: "#ff2a55", desc: "Derin 808 Bası" },
    { key: "W", label: "DRILL KICK", type: "kick", color: "#f59e0b", desc: "Sert Tok Vuruş" },
    { key: "E", label: "TRAP SNARE", type: "snare", color: "#00f0ff", desc: "Metalik Trampet" },
    { key: "R", label: "32'LİK HI-HAT", type: "hihat", color: "#10b981", desc: "Taramalı Zil" },
    { key: "A", label: "808 PITCH GLIDE", type: "slide_808", color: "#ff2a55", desc: "Kayan Drill Bası" },
    { key: "S", label: "RIMSHOT & PERC", type: "rimshot", color: "#f59e0b", desc: "Perküsyon Vuruş" },
    { key: "D", label: "VOX: 067!", type: "vox_067", color: "#00f0ff", desc: "ERAY Vokal Tagı" },
    { key: "F", label: "VOX: MANSUR!", type: "vox_mansur", color: "#a855f7", desc: "Mansur Tagı" },
    { key: "Z", label: "NAFİLE HOOK", type: "vox_nafile", color: "#ec4899", desc: "Melodik Akor" },
    { key: "X", label: "BRAPAP!", type: "vox_brapap", color: "#e01740", desc: "Drill Çift Patlama" }
  ]
};
