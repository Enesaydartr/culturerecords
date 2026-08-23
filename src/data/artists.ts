export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  currentTime: string;
  progress: number;
  durationSec: number;
  bpm: number;
  key: string;
  genre: string;
  producers: string;
  mixMaster: string;
  badge: string;
  category: "all" | "alliance" | "hits" | "collab";
  releaseDate: string;
  releaseYear: number;
  image: string;
  spotifyUrl: string;
  embedUrl: string;
  youtubeId: string;
  lyrics: string;
  syncedLyrics?: { time: number; text: string }[];
  audioUrl?: string;
  customAudioUrl?: string;
  isMix?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  fullName: string;
  origin: string;
  birthYear: string;
  role: string;
  monthlyListeners: string;
  achievements: string;
  signatureStyle: string;
  instagram: string;
  spotify: string;
  youtube: string;
  image: string;
  bannerImage: string;
  bio: string;
}

export interface TicketPlatform {
  name: string;
  price?: number;
  currency?: string;
  url: string;
  badge?: string;
  isAvailable: boolean;
  statusText?: string;
}

export interface TicketTier {
  name: string;
  price: number;
  currency?: string;
  description: string;
  perks: string[];
}

export interface TourDate {
  id: string;
  isoDate: string;
  date: string;
  day: string;
  city: string;
  venue: string;
  venueAddress: string;
  time: string;
  doorsOpen: string;
  ageLimit: string;
  status: string;
  badgeClass: string;
  price: number;
  vipPrice: number;
  currency: string;
  googleMapsUrl: string;
  bubiletUrl: string;
  bubiletCategory: string;
  soldCount: number;
  totalCapacity: number;
  soldPercentage: number;
  ticketTiers: TicketTier[];
  rules: string[];
}

export interface SoundboardPad {
  key: string;
  label: string;
  type: string;
  color: string;
  desc: string;
}

export const PLAYLIST: Track[] = [
  {
    id: "bak_ne_dicem",
    title: "bak ne dicem",
    artist: "ERAY067 & MANSUR",
    album: "ALLIANCE",
    duration: "2:29",
    currentTime: "01:15",
    progress: 50,
    durationSec: 149,
    bpm: 144,
    key: "G# Minor",
    genre: "UK Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "ALLIANCE #1",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/MArJetRSQiM?autoplay=1",
    youtubeId: "MArJetRSQiM",
    lyrics: `Bak ne diyeceğim, aklıma geldi
Biz bu yolu yürümüştük, yürümüştük o
Hatta yürürken ceketimi sana verip üşümüştüm
Üşümüştüm ooo

Gittiğinden beri soruyor tüm mahalle hâlimi
Sen de merak edersen bir mesaj at bahaneli
Katiller yoklarmış zaten olay mahallini
Mahallini oo

Kaşıdıkça kanadı
Bir kabuk tutamadık
Gözden uzak olan gönülden ırakmış, anladım
Sakındım hep yaramı
Yanlışım bu sanırım
İsterdim sen beni ara, ben hep seni aradım

Beni Mecnun sanmayın, unuturum yaz ayı
Leyla olsaydın bitirmezdim kavgayı
Gözümü oysun diye besledim kargayı
Besledim kargayı

Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil yaşlarım hediye
Sana değer
Bu kalp sana değer

Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil yaşlarım hediye
Sana değer
Bu kalp sana değer

Her şey akıp gider zaman gibi, anla
Ne de olsa yaşıyorsun kızım İstanbul'da
Bu devirde bugün var, yarın yok anla
Hâlâ vaktimiz varken sarıl bana bir anda

Bir anda bir güne başlamışsın biriyle
Ben sevemem yeniden senden başkasını
Bana kalıyor de, neden bu acılar, nereden?
Sana kırk sular taşımıştım kırk bir tane dereden

Sana değer döktüğüm bütün gözyaşlarım
Uyku ilaçlarım
Sana neler oldu diyor bütün dostlarım
Arkadaşlarım

Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil yaşlarım hediye
Sana değer
Bu kalp sana değer`,
  },
  {
    id: "gucum_yok",
    title: "gücüm yok",
    artist: "ERAY067 x MANSUR ft. Contra",
    album: "ALLIANCE",
    duration: "3:05",
    currentTime: "00:45",
    progress: 24,
    durationSec: 185,
    bpm: 145,
    key: "A Minor",
    genre: "Heavy Trap / Rap",
    producers: "Tanerman",
    mixMaster: "Waxy",
    badge: "Contra Feat",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/1_RD5Xxbm5E?autoplay=1",
    youtubeId: "1_RD5Xxbm5E",
    lyrics: `(Giriş: ERAY067)
Uh-ah (Ta-Ta-Tanerman)
Ah

(Verse 1: Mansur & ERAY067)
Nasıl geldim, söyle, bugüne dek
Acıyı yanımda gezdirerek?
Sanki onun bi' parçası gibi acım
Nereye gitse yokmuş ilacı
İlacı bulursun, arayan bulurmuş
Ben bulamayıp küstüm kendime
Yürüdüm çok yollar, çaldım çok kapılar
Hancı yok bu handa, vay hâlime
Söyle, şimdi mutlu musun?
Huzurlu uykular var mı?
Benim hâlâ kâbusumsun
Bu sensiz beşinci yazdı
Bu şarkıyı sana yazdım
Sen unuturken adımı
Rüyalarımda sayıkladım
Beni tanıdın mı?

(Nakarat: Mansur & ERAY067)
Seninle baş edecek gücüm yok
Bu aşk yorar ikimizi
Seni taşıyacak bi' kalbim yok
Kalbim sorar ikimizi
İkimizi, unutmak istedim ikimizi
İkimizi, nasıl unuturum ikimizi?

(Verse 2: Contra)
(Na-na) Nasıl hatırlamam ikimizi?
Bi' fırtına tuttu bizi, batırmasa da gemimizi
Nasıl hatırlamam evimizi?
Senin güzel yüzün yüzünden yüzümde yüz tane yara izi
Aynalar anlatır bana bizi, sanki dizi
Yak, ver ateşi, çeker, dert dumanı sisi (Woah)
Bende hasım denizde yosun
Yansa da cigara ben hâlâ buzum
Huyum kurusun, çocuk uyusun
Allah'ım korusun var ise lüzum
Yüzüme kusarım hep illa bi' kusur ararken
Yirmi bir gramlık huzur
Bi' sana küsüm ben, bi' sana pozum
Hayat kısa, namlum uzun, kuzum (Ah-ah)
Çünkü seninle"”

(Nakarat: Mansur & ERAY067)
Baş edecek gücüm yok
Bu aşk yorar ikimizi
Seni taşıyacak bi' kalbim yok
Kalbim sorar ikimizi
İkimizi, unutmak istedim ikimizi
İkimizi, nasıl unuturum ikimizi?`,
  },
  {
    id: "nafile",
    title: "NAFİLE",
    artist: "ERAY067 & MANSUR",
    album: "ALLIANCE",
    duration: "2:48",
    currentTime: "01:12",
    progress: 42,
    durationSec: 168,
    bpm: 142,
    key: "F Minor",
    genre: "Drill / Trap",
    producers: "Kaleen, İTSKİMOBEATS",
    mixMaster: "Waxy",
    badge: "Top Hit #1",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/gD3SqwOJ9Sc?autoplay=1",
    youtubeId: "gD3SqwOJ9Sc",
    lyrics: `Sokaklar pistir sokak acımaz
Tuzunu basabiliyor bile acına
Yaşamak denen şey inadına
Hiç kimse varamıyor muradına

Kaderimi taktım bu kez koluma
Nispet yapıyorum tüm anılara
Çıkmak nasip olmasın ki yarına
Kanmış gibi yaptım aşk oyununa

Şimdi deme bana
Kaybettiğini gelip de söyleme bana
Önce bana sonra ayıp bütün anılara
Yazdım adını yüzüme kapattığın kapılara

Yazdım seni kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile

Yazdım adını kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile

Herkesi sen sandım sandığım kadarlar
Nasıl bu aşk senin için ihtiyarlar
Şimdi anlamsız geliyor bu diyarlar
Burada dar değil fazlaca boş sokaklar

Neden Neden bunlar bana
Seven Kaybeder mi her seferden
Her şey tamam yarım bir sen Gelsen
İçiyorum şarap içer gibi seni
İzliyorum film izler gibi seni
Giyip gel kırmızı elbiseni
Çok özledim lan vicdansız seni

Yazdım seni kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile

Yazdım adını kalbime
Silemezsin nafile
Benim aşkım yaramaz
Kendine şans dile`,
  },
  {
    id: "bilezik_pirlanta",
    title: "bilezik pırlanta",
    artist: "ERAY067 & MANSUR",
    album: "ALLIANCE",
    duration: "2:50",
    currentTime: "00:40",
    progress: 23,
    durationSec: 170,
    bpm: 140,
    key: "C Minor",
    genre: "Street Drill",
    producers: "CLTR",
    mixMaster: "Waxy",
    badge: "ALLIANCE",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/w5-l0DzPlEg?autoplay=1",
    youtubeId: "w5-l0DzPlEg",
    lyrics: `Ellerimi bırak,
Işıklı caddelerden,
Sensiz çiçekli bahçelerden
Geçtim. Tüm kahpelerden,
Gençliğim esir ruhuma yaşarken.
Ooooo,
Kaç polislerden.
Söz sana, pırlantayı getireceğim ben.
Oooo,
Saklan istersen,
Ne fark eder kalbime hapisken?

Karakol ifade, (Şş"¦) dedim, rahat ol.
Çantayı avukata indirdim, alo.
Neredesin kuzen, buradayım babo.
Sadece mobeseye verdim foto.
Düştük, dalga geçtiğimiz hale.
Bulma artık bana bahane.
Ettin yalanlarına alet,
Sana cenazeme açık davet.

Siyah bir Motorola, paket zula, işler tamam.
Sana demiştim kızım, bana bırak her şey tamam.
Helal değil haram, zor oldu ama getirdim sana,
Bilezik pırlanta, bilezik pırlanta.
Siyah bir Motorola, paket zula, işler tamam.
Sana demiştim kızım, bana bırak her şey tamam.
Helal değil haram, zor oldu ama getirdim sana,
Bilezik pırlanta, bilezik pırlanta.`,
  },
  {
    id: "olm_was_rap_mep",
    title: "olm was rap mep",
    artist: "ERAY067 x MANSUR ft. Yung Ouzo",
    album: "ALLIANCE",
    duration: "3:10",
    currentTime: "01:20",
    progress: 43,
    durationSec: 190,
    bpm: 142,
    key: "D Minor",
    genre: "German Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Yung Ouzo Feat",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/WgEVW4us_n8?autoplay=1",
    youtubeId: "WgEVW4us_n8",
    lyrics: `Oğlum, was rap mep?
Mahallede yaşıyom
Ayakkabı Nike ama ayakkabı sikiyo
Çekil benle video, ben de beni çekiyom
Kızlar beni yesler, bende kızları ısırıyom

Schöne manzara artık para cepte oldu bana mandala
Olympic marsil silahla kombin asics
Her şarkı üç günde bir milyon basit

Yediniz bitiremediniz Eray Mansur
Bu nasıl bi proje oğlum Eray Mansur
Bunları dinleyen var mı Eray Mansur
Götünüze girsin Eray Mansur
Enes bunu bipleme, merak duysunlar
Tüm şehirde havada uçuyo kurşunlar

Ich bin jung, ich bin wild, ich bin asosyal
Gopcity city real life doğuştan anormal
Doğuştan anormal
Doğum yeri 607
Sanırım ondan
Soğuk sevmem ondan
Hemen alcam intikam
Doğuştan anormal

Eray & Mansur, Ouzo'da misafir
Laf edenler gelemiyor vis a vis
Enes helal bu beat'e ben kafi
Kiralık araç, rengi safir
44, 33, 067 in Opel Astra, bin Audi 7
Her sözüm fiilen, her yerim bilezik, Saudi feelin'
Sim simma häng ab mit Mansur, Sem7iya Yimma ha
1000 Euro, sence para mı lan 50.000 lira?

Benim araç kiralık, sizin ruhunuz eğri
Siniz bu yüzden siki tuttunuz
Hızlı parlayan hızlı unutulur
Konuşurlar ama konular kuruntudur

Doğuştan anormal
Doğum yeri 607
Sanırım ondan
Soğuk sevmem ondan
Hemen alcam intikam
Doğuştan anormal`,
  },
  {
    id: "yesler",
    title: "yesler",
    artist: "ERAY067 x MANSUR ft. Reder",
    album: "ALLIANCE",
    duration: "2:44",
    currentTime: "00:40",
    progress: 25,
    durationSec: 164,
    bpm: 140,
    key: "F# Minor",
    genre: "International Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Reder Feat",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/OrdCSlxdHAI?autoplay=1",
    youtubeId: "OrdCSlxdHAI",
    lyrics: `(Ya) Piyasadayız, CLTR ekip
Stüdyonun içine düşen yanıyor
34 sizi, araba asfaltı
Influencer benimkini
Reder'le birlikte sistematik
Tik tik tak dedik ya kural basit
Basit, hâlâ Asics, hâlâ Madrid
Çok kastınız sanki Android
Seslen bana aşkım, babalar gibi rap
Kızlar beni hep yesler, yesler
Sordu nerdesin, dedim burdayım
Yazıyorum no at yes der, yes der
Nokia tele çalıyor gene
Ama açamam (ah, ah)
Kafam bir porsiyon, 2 oldu ama doyamam

Hazır mısın, çıkalım? Ben hazırım
Sizi bekliyorum o zaman, bugün uçalım
Uçarken kanat takmıyorum
Okey geldi zaman, gece sonu falan filan
Ablam yok vallahi param
Yavrum sana çiçek alamam
Okey geldi zaman zaman
Seni görmesem uyuyamam
Muhabbet olur saçma sapan
Boşver geçelim uzatmadan

Mamak'tan sevgiler
Yanımda kanak gurbetçiler
Arttı bir anda beklentiler
Beyler değil beyefendiler
Damsız girişler, çünkü nam var
Dam yok ama iki dakikaya damlar
Damlar, herkese bol şanslar
Dayanabilirsen dayan Ali Cabbar
Cabbar, sen sağ ben selamet
Yani komşu kızın bana emanet (haha)
Yoruldum, yaptım hararet
Neyse sen gene hakkını helal et

Bana hazır mısın, çıkalım? Ben hazırım
Sizi bekliyorum o zaman, bugün uçalım
Uçarken kanat takmıyorum
Okey geldi zaman, gece sonu falan filan
Ablam yok vallahi param
Yavrum sana çiçek alamam
Okey geldi zaman zaman
Seni görmesem uyuyamam
Muhabbet olur saçma sapan
Boşver geçelim uzatmadan`,
  },
  {
    id: "sofi",
    title: "sofi",
    artist: "ERAY067 & MANSUR",
    album: "ALLIANCE",
    duration: "1:45",
    currentTime: "00:40",
    progress: 38,
    durationSec: 105,
    bpm: 138,
    key: "G Minor",
    genre: "Dark Trap",
    producers: "CLTR Beats",
    mixMaster: "Culture Records",
    badge: "ALLIANCE",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/EJHfw5MlXkQ?autoplay=1",
    youtubeId: "EJHfw5MlXkQ",
    lyrics: `[Verse 1: Mansur]
Bunlar kim? Bunlar değil bizim mahalleden
Bur'dan bir eksildik, bir arttık hapishaneden
İstanbul'da sahneler, İstanbul'da var neler
Almanya'da alıyo'larmış eczaneden
Sofilerle kıldık namaz
Sofi yanmaz ateşte, korkmaz ateşten
Sofi heyvandır, motor sürer
Sofi koymuş belinde, hiç korkar mı senden?
Yaptırdım bakkaldan kaşar salam
SÉ™nÉ™ deyirÉ™m "NÉ™ xÉ™bÉ™r, kaşar? Salam"
Benimle anlaş ya da kalk masadan
34'ten gitsek kalmaz adam

[Nakarat: Mansur & ERAY067]
Zu viel Gangsta, was Sofi
Her yol var, tam cambaz sofi
Tabakhanede boss sofi
Bas, lan, bas gaza, bas, bas, sofi
Zu viel Gangsta, was Sofi
Her yol var, tam cambaz sofi
Tabakhanede boss sofi
Bas, lan, bas gaza, bas, bas, sofi`,
  },
  {
    id: "outro",
    title: "outro (selam götürün)",
    artist: "ERAY067 & MANSUR",
    album: "ALLIANCE",
    duration: "2:58",
    currentTime: "00:50",
    progress: 28,
    durationSec: 178,
    bpm: 134,
    key: "C Minor",
    genre: "Street Rap / Outro",
    producers: "Yaparsovunuenes",
    mixMaster: "Waxy",
    badge: "Outro",
    category: "alliance",
    releaseDate: "2026-07-31",
    releaseYear: 2026,
    image: "/assets/images/alliance_cover.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/hVm-YmUEtIo?autoplay=1",
    youtubeId: "hVm-YmUEtIo",
    lyrics: `(Yaparsovunuenes)
Yeah, ya

Selam götürün, bulutlar, bizim mahalleye
Hasretim sana, anne, hasretim daye
Eve dönmem gerekir, bulaştı elime kir
Benim o yağmurlarda yıkanmam gerekir
Eve dönmem gerekir
Gözlerimde kan var
Ne kadar anlatsam eksik kalır, yani kan var
Yanımda şöhretim
Ve iki kaslı adam var
Birinde zulam
Diğerinde tabancam var

Evden çıktığım gün bu hâlde değildim
Tamam, masum küçük bir çocuk değildim
Ama yana yana bu ateşte kora döndüm
Ayağım da kaymadı nasıl çukura düştüm?
Silahlar ve haram
Uymadım şeytana!
Bu sözleri yazarken foto verdim fanlara
Huzur neydi anlatsana, huzur neydi baba?
Ceplerindekinin rengi karar verir buna`,
  },

  // --- SINGLES & COLLABORATIONS ---,
  {
    id: "sayfa",
    title: "SAYFA",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:45",
    currentTime: "00:50",
    progress: 30,
    durationSec: 165,
    bpm: 136,
    key: "D Minor",
    genre: "Melodic Rap",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Melodik Hit",
    category: "hits",
    releaseDate: "2026-07-17",
    releaseYear: 2024,
    image: "/assets/images/sayfa.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/oz1mWgEQ9Dg?autoplay=1",
    youtubeId: "oz1mWgEQ9Dg",
    lyrics: `Yeni bir sayfa açtım hayata
Geçmişi gömdüm eski sokaklara
Yazdım her satırda adını
Ama kapattım artık bu kitabı!`,
  },
  {
    id: "azdan_az_coktan_cok",
    title: "Azdan Az Çoktan Çok",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:36",
    currentTime: "00:35",
    progress: 22,
    durationSec: 156,
    bpm: 142,
    key: "F# Minor",
    genre: "Heavy Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Drill Hit",
    category: "hits",
    releaseDate: "2026-07-10",
    releaseYear: 2024,
    image: "/assets/images/azdan_az_coktan_cok.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/Hzm9npnncCA?autoplay=1",
    youtubeId: "Hzm9npnncCA",
    lyrics: `Azdan az gider çoktan çok
Bizim lügatta geri vites yok
Koyduk her şeyi masaya
Selam olsun tüm sokaklara!`,
  },
  {
    id: "yazik_sana",
    title: "YAZIK SANA",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "3:12",
    currentTime: "00:54",
    progress: 28,
    durationSec: 192,
    bpm: 140,
    key: "C# Minor",
    genre: "Street Drill",
    producers: "Waxy",
    mixMaster: "Waxy",
    badge: "Trend Hit",
    category: "hits",
    releaseDate: "2026-06-05",
    releaseYear: 2026,
    image: "/assets/images/yazik_sana.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/r-oPri2aSgE?autoplay=1",
    youtubeId: "r-oPri2aSgE",
    lyrics: `(Mansur)
Tüm rapçiler fiyasko, yüzlerinde maske
Aileme asker ben
Götün yerse kastet, buraları kasvet
Kararıyoruz kederden
Hep eksi bir bilanço
Sıktı beni bu mahalle
Koleksiyon yaptım şişelerden
Kurudu gönül bahçem
Kırıldı kanatlarım
Hayatla yeni tanışırken

(Eray067)
Sana dedim var bi yol, inan bana
Geceleri tutmuyor uyku hâlâ
Çıkıp geldik evimizden uzaklara
Haram para ve de birçok yara
SS okey okey
Yaşadıkça dahiliz bu oyuna
Anılarım eskidi
İndirdim duvardan resmini

(Mansur)
İsterim unut beni
Doğaldı hislerim bulut gibi
Bana soru sorma (sorma)
Bunlar artık normal (normal)

(Mansur & Eray067)
Gözlerim kan doldu bugüne dek ama (ama, ama, ama)
Sahte sadakat ve sahte bir sevgili, yalan, yalan, yalan
Bozdur harca bir günde bitir hepsini
Give me para, para, para
Son sözümü bile hiç merak etmedin
Yazık sana, sana, sana...`,
  },
  {
    id: "familia",
    title: "FAMILIA",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:40",
    currentTime: "00:40",
    progress: 25,
    durationSec: 160,
    bpm: 140,
    key: "C Minor",
    genre: "Street Trap",
    producers: "Culture Records",
    mixMaster: "CLTR",
    badge: "Familia Hit",
    category: "hits",
    releaseDate: "2026-05-22",
    releaseYear: 2024,
    image: "/assets/images/familia.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/_ffondt1asw?autoplay=1",
    youtubeId: "_ffondt1asw",
    lyrics: `Biz bir aileyiz, sırt sırta verdik
Yıkılmadık hiçbir zaman direndik
Frankfurt Mamak Malatya hattı
Kardeşlik bu yolda altın tahtı!`,
  },
  {
    id: "bu_gece_misafirinim",
    title: "bu gece misafirinim",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "3:18",
    currentTime: "02:05",
    progress: 63,
    durationSec: 198,
    bpm: 130,
    key: "E Minor",
    genre: "Melodic Trap",
    producers: "Culture Records",
    mixMaster: "Culture Records",
    badge: "Melodik Hit",
    category: "hits",
    releaseDate: "2026-02-27",
    releaseYear: 2025,
    image: "/assets/images/bu_gece_misafirinim.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/Q0E8fwC1JF4?autoplay=1",
    youtubeId: "Q0E8fwC1JF4",
    lyrics: `Bilmem çıkar mıyım yarına mon ami
Yanıma geliyor salına salına
Caddeler diyorum caddeler mon ami
Kanıma giriyor kanıma kanıma
Marlboro sigaramın içine seni doladım
İçtikçe giriyorsun içine kafamın
Ne aldığım yaranın hesabı var ne kaybettiğim paranın
Seni bana yar olmayan gözlerinden tanıdım

Bilirsin beni dört döndüm caddeyi
Bilirsin dedim de artık yabancıyız
Bilsen ne haldeyim sensiz viraneyim
Issız karanlık yalnız
Bu şehir benden şansız
Ben bu şehirden çaresizim
Bana nerde olduğunu söyle
Bu gece misafirinim

Çalarım bir gece kapını
Nasıl unutursun adımı
Ben o günlerde yaşıyorum
Gelirsen beklerim bırak inadını
Çalarım bir gece kapını
Nasıl unutursun adımı
Ben o günlerde yaşıyorum
Gelirsen beklerim bırak inadını

Geçmedi mi kızım semtinizden ayıplar
Bir gün seni sevmeyi bırakırsam yuhlayın lan
Sana geliyorum yollarında mayınlar
Al canımı sende kalsın acıyor aşk ayında
Bu sana söylediğim son sözüm
Gülmedi hiç yüzüm
Seninki gülsün diye
Acımı derdimi gizledim
Sende hiç sormadın
Bekledim hep sor diye

Artık tek istediğim gittiğin yerde mutlu ol
Burası çok soğuk duydun mu ben üşüyorum
Kalbim taş gönlüm kör ve hapis
Buna yaşamak denilmez ama yaşıyorum
Bu şehir benden şansız
Ben bu şehirden çaresizim
Bana nerde olduğunu söyle
Bu gece misafirinim

Çalarım bir gece kapını
Nasıl unutursun adımı
Ben o günlerde yaşıyorum
Gelirsen beklerim bırak inadını
Çalarım bir gece kapını
Nasıl unutursun adımı
Ben o günlerde yaşıyorum
Gelirsen beklerim bırak inadını`,
  },
  {
    id: "aktiv2",
    title: "AKTIV II",
    artist: "Batuflex x Chiko x ERAY067 & MANSUR x Reder",
    album: "Single",
    duration: "3:02",
    currentTime: "01:00",
    progress: 33,
    durationSec: 182,
    bpm: 144,
    key: "G# Minor",
    genre: "Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "International",
    category: "collab",
    releaseDate: "2026-02-06",
    releaseYear: 2024,
    image: "/assets/images/aktiv2.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/6FJOb84qe9c?autoplay=1",
    youtubeId: "6FJOb84qe9c",
    lyrics: `Aktiv iki, hız kesmeden tam gaz
Bizi durduramaz hiçbir ayaz
Avrupa'dan Türkiye hattına
Milyonlar akıyor şarkılara!`,
  },
  {
    id: "yaramaz",
    title: "YARAMAZ",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:52",
    currentTime: "01:10",
    progress: 40,
    durationSec: 172,
    bpm: 135,
    key: "D Minor",
    genre: "Trap",
    producers: "Culture Records",
    mixMaster: "CLTR",
    badge: "Viral Hit",
    category: "hits",
    releaseDate: "2025-12-12",
    releaseYear: 2024,
    image: "/assets/images/yaramaz.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/bk1-1B3476E?autoplay=1",
    youtubeId: "bk1-1B3476E",
    lyrics: `Seninle çok ortak konum var
Ama çok farklı oldu konumlar
Bize artık derler yabancı
Aydınlığa çıkmaz bu yollar

Al kırık kalbimi yanında
Götür o yaramaz
Sana yaranmaya binbir dereden
Sular taşıdım, yara kaşıdın
Yar olmaz senden bana
Senin aşkın yaramaz

Gece çöker üstüme dertler gibi
Bıraktın beni virane yerler gibi
Nasıl unutur bu kalp seni söyle
Biz bu oyunda kaybettik böyle`,
  },
  {
    id: "yok_hic_adalet",
    title: "YOK HİÇ ADALET",
    artist: "AVIE x DELIL x ERAY067 x MANSUR",
    album: "Single",
    duration: "3:12",
    currentTime: "00:50",
    progress: 27,
    durationSec: 192,
    bpm: 140,
    key: "E Minor",
    genre: "International Rap",
    producers: "CLTR",
    mixMaster: "Waxy",
    badge: "International",
    category: "collab",
    releaseDate: "2025-11-07",
    releaseYear: 2023,
    image: "/assets/images/yok_hic_adalet.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/1g00j1XH2kY?autoplay=1",
    youtubeId: "1g00j1XH2kY",
    lyrics: `Yok hiç adalet bu kirli dünyada
Yaşıyoruz her an bir rüyada
Frankfurt'tan İstanbul'a sesimiz
Sokaklarda yankılanır nefesimiz!`,
  },
  {
    id: "brapap2",
    title: "BRAPAP II",
    artist: "ERAY067 x MANSUR x Organize x Batuflex",
    album: "Single",
    duration: "2:45",
    currentTime: "01:00",
    progress: 36,
    durationSec: 165,
    bpm: 144,
    key: "A Minor",
    genre: "Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Organize Feat",
    category: "collab",
    releaseDate: "2025-10-31",
    releaseYear: 2025,
    image: "/assets/images/brapap2.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/BoIMxiYFOEI?autoplay=1",
    youtubeId: "BoIMxiYFOEI",
    lyrics: `Alles okay, okay, ekip tamam
Dört kişi, dört maske, yola devam
Getto fenomen, made in Gop, baba
Bu sene şampiyon biziz, at fav'a

Sürekli adrenalin, taşa döndü yüreğim
Hayatım bi' macera, son tatilin ilk günündeyim
Cha-Cha-Champions League brapap, iki kere iki brapap
Yarıştayız her gün brapap, brapap, brapap

Konuşuyo' denyo, hepinize motherfuck
İki kere iki dört, yine mi 'Brapap'?
Bana laf yapma lan, Fate Fat gibiyim
Kulakta 'Bizik', kafamda çizik`,
  },
  {
    id: "burada_sokaklar",
    title: "BURADA SOKAKLAR",
    artist: "ERAY067 x MANSUR x Batuflex",
    album: "Single",
    duration: "3:02",
    currentTime: "01:00",
    progress: 33,
    durationSec: 182,
    bpm: 142,
    key: "C Minor",
    genre: "Heavy Street Trap",
    producers: "Yaparsovunuenes",
    mixMaster: "Waxy",
    badge: "Batuflex Feat",
    category: "collab",
    releaseDate: "2025-09-19",
    releaseYear: 2025,
    image: "/assets/images/burada_sokaklar.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/BeSfzuVaZTg?autoplay=1",
    youtubeId: "BeSfzuVaZTg",
    lyrics: `(Ya-ya-ya-yapar şovunu Enes)

Burada sokaklar fazlaca dar, kovalar memurlar
Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)
Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar (Ah)
Ben de istemezdim, buna mecburlar ama bebek, anla

Ben beni öldür'cek bi' silahlayım
Sanki hiç istemedin beni anlamayı
Yoruldum, sırtımı sana yasladım
Sen düşünmedin, yaktın beni cayır cayır
İçimde bi' yerde hâlâ sen, gözüm hep seni görüyo'
N'apıyım, sen söyle, seni cebimde mi saklasam?
Başım çok deli dönüyo'
Ner'desin sen? Söyle

Bize "Koştur" dedi mahalle
Koşturdum, daha ne? Paket oldu hayaller
(Hayat) Hayat illegale, şarkılarım yaktı semtimde caddeler

Burada sokaklar fazlaca dar, kovalar memurlar (Uh)
Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)
Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar (Ah)
Ben de istemezdim, buna mecburlar ama bebek, anla (Uh)

Yalnız kaldım, bebe, anlayamadın beni
Geceleri rüyamda hep görüyorum seni
Bi' rastlamadın bana, tanıyamadın kalbimi
Acaba kim tutuyo' şu anda ellerini?
Sen ve ben ters, serseriler de sever
İstiyoruz papel, para gelir güçten
Kontak ve trafik, bunlar elimden gelen
Sevgimi gösteremem, bu göremediğimden

Elimdeki silah doluydu, kafama doğruldu
Tüm yanlışların içindeki tek doğruydun
Bardağımı viskiyle doldurdum
Yerini doldurdun (Uh)

Burada sokaklar fazlaca dar, kovalar memurlar (Uh)
Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)
Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar
Ben de istemezdim, buna mecburlar ama bebek, anla`,
  },
  {
    id: "ihtiyac_yok_otele",
    title: "İHTİYAÇ YOK OTELE",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:55",
    currentTime: "00:50",
    progress: 29,
    durationSec: 175,
    bpm: 136,
    key: "C Minor",
    genre: "Club Trap",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Club Trap",
    category: "hits",
    releaseDate: "2025-08-29",
    releaseYear: 2025,
    image: "/assets/images/ihtiyac_yok_otele.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/NPcRsdmeSoI?autoplay=1",
    youtubeId: "NPcRsdmeSoI",
    lyrics: `(M61, woah)
(Uh)

Tüm gece gözler açık
Benz'in üstü açık, ihtiyaç yok otele
(Uh)
En yakın arkadaşım, o benim sırdaşım
Onu değişmem ele
(Uh)

Endişelenme, beni düşünme
Günün sonunda gelice'm yanına
(Uh-ah)
Beni arama
İki kadeh içince zaten sen geliyo'sun yanıma-a-a

Ben yazarken ağladım, sen dinlerken ağlama
Dile kolay üç senemi harcadım
Kalan ömrümü de harcarım, sana feda
(Uh)
Hep elveda, yüzümüz gülmedi aşktan yana
Mutlu görünse de mutsuz resimler
Yaralar oldu yanıma kalan
(Uh)

Yaralar var ve yeni değil
(Uh)
İstanbul, seni yeneceğim
Anlatırdım da yeri değil
(Uh)
Bi' kadına mı yenileceğim?

Delale, götürdün aklımı başımdan
Söyle, delale
Kaldım yalnız şu yaşımda, söyle
Ne hâle geldik, perişane
(Uh-uh)
Oldu mu, delale?
Delale (De-de-delale)

Delale, durumlar sakat
Bak, dizlerimde kalmadı takat
(Uh-uh)
Gözlerimde yaşlarım fakat
(Uh)
Gelmeyeceksin, anladım, tamam
(Ah)
Beni vur, beni bırakma burada
(Ah)
Sensiz bu şehir karanlık, bebeğim
Bazen kendimi izliyorum aynada
Uzaklaştım ve yaşlandım epey

Yan yana yanalım bu cehennemde
Gel benimle, hadi
Sanma da biter bu hırsım
Benim günahlarımdan kalelerim var
"Gülüm" dedim, dikenlerini serdin yollarıma
Vakit dar
Ve sadece canım var

Yaralar var ve yeni değil
(Uh)
İstanbul, seni yeneceğim
Anlatırdım da yeri değil
(Uh)
Bi' kadına mı yenileceğim?

Delale, götürdün aklımı başımdan
Söyle, delale
Kaldım yalnız şu yaşımda, söyle
Ne hâle geldik, perişane
(Uh-uh)
Oldu mu, delale?
Delale
(Ya-yaparsovunuenes)
(Uh) (Uh) (Uh)`,
  },
  {
    id: "cok_agladim",
    title: "ÇOK AĞLADIM",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:41",
    currentTime: "00:30",
    progress: 19,
    durationSec: 161,
    bpm: 132,
    key: "B Minor",
    genre: "Emotional Trap",
    producers: "Edokaleen, Yaparsovunuenes",
    mixMaster: "Waxy",
    badge: "Platin Plak",
    category: "hits",
    releaseDate: "2025-08-08",
    releaseYear: 2025,
    image: "/assets/images/cok_agladim.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/eWeWAZiqW0Y?autoplay=1",
    youtubeId: "eWeWAZiqW0Y",
    lyrics: `(E-Edokaleen)
(Yaparsovunuenes)

Kaçtım da geldim polislerden (Ah)
Cebimde sana hediyem vardı
Bayağıdır uzaktım bu hislerden (Ah)
Diğer cepte yaralar vardı

Delikanlı adam ne ister ki?
Yanımda sadece kalbim, gördün
Sensiz olamam, dünya yansın, seni isterdim (Ah)
Sen, ben, ters, baby
Fast life, lazım Mercedes, baby
Sevmek kim, sen kimsin
Kaçtım gecelerden sabahlara dek
Seni bana sordu yine sokaklar
Dedim ona 'Yalan hepsi, yalan'
Beni benden aldın, çok ağladım ardından`,
  },
  {
    id: "sifir_yuz",
    title: "0-100",
    artist: "QASSEM x ERAY067 & MANSUR x NARCO",
    album: "Single",
    duration: "2:42",
    currentTime: "00:35",
    progress: 22,
    durationSec: 162,
    bpm: 145,
    key: "F# Minor",
    genre: "Fast Drill",
    producers: "ERICK & TOM",
    mixMaster: "Waxy",
    badge: "0-100 Speed",
    category: "collab",
    releaseDate: "2025-05-23",
    releaseYear: 2023,
    image: "/assets/images/sifir_yuz.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/0on2FkbtLUc?autoplay=1",
    youtubeId: "0on2FkbtLUc",
    lyrics: `Sıfırdan yüze iki saniye
Bizi yakalamak hayal hediye
067 basıyor tam gaz
Duman altı şehir, arkana bakma bas!`,
  },
  {
    id: "balmain",
    title: "BALMAIN",
    artist: "Organize x ERAY067 x MANSUR",
    album: "Single",
    duration: "2:40",
    currentTime: "00:40",
    progress: 25,
    durationSec: 160,
    bpm: 142,
    key: "C# Minor",
    genre: "Street Trap",
    producers: "CLTR",
    mixMaster: "Waxy",
    badge: "Organize Feat",
    category: "collab",
    releaseDate: "2025-05-09",
    releaseYear: 2023,
    image: "/assets/images/balmain.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/zjrG2L8OFY8?autoplay=1",
    youtubeId: "zjrG2L8OFY8",
    lyrics: `Yırtık pantolon Balmain
Oğlum, ne yaptığımı da sormayın, he
Maradona'dan formayım
On numara, taşak, baba, formdayım, he
Gördüm yüzünü, şoktayım, he, ben
Gördüm ben bütün topları, he
Sıktın havaya kovanları sen
Barut kokmuyo', toplayın, he

Hep üç kişiden fazlayız, canım, ama değiliz çete çete
İstanbul, Berlin, or'dan Bodrum, gelir Avro'dan keke keke
Konuşur bütün itler, geldim ben buralara ite ite
Baba da benim, paşa da benim, kabul edice'n sike sike
İmzalar yeni, "Â¡Hala Madrid", bağır fanlara "Así, así"
Benim hasımlar çok konuşur, ben de hepsine basi'm basi'm`,
  },
  {
    id: "sorma",
    title: "Sorma",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:34",
    currentTime: "00:45",
    progress: 30,
    durationSec: 154,
    bpm: 138,
    key: "F Minor",
    genre: "Melodic Trap",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Melodik Hit",
    category: "hits",
    releaseDate: "2025-03-20",
    releaseYear: 2024,
    image: "/assets/images/sorma.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/jLfygFNmKc8?autoplay=1",
    youtubeId: "jLfygFNmKc8",
    lyrics: `Bana soru sorma, sorma
Bunlar artık normal, normal
Yollarımız ayrıldı çoktan
Geriye dönemem yoktan

Sensiz geceler zindan gibi
Karanlık sokaklar derman gibi
Bana sorma neden bittiğini
Kalbim unuttu sevmeyi...`,
  },
  {
    id: "hmdl",
    title: "HMDL",
    artist: "Avie x Organize x ERAY067 x MANSUR x Batuflex",
    album: "Single",
    duration: "3:25",
    currentTime: "00:50",
    progress: 25,
    durationSec: 205,
    bpm: 140,
    key: "F Minor",
    genre: "International Trap",
    producers: "Mehsah",
    mixMaster: "Waxy",
    badge: "International",
    category: "collab",
    releaseDate: "2025-03-14",
    releaseYear: 2023,
    image: "/assets/images/hmdl.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/FinAvFZdwi8?autoplay=1",
    youtubeId: "FinAvFZdwi8",
    lyrics: `(Giriş: Avie)
(Mehsah   la prod)
Neu-, neuf, geh auf Profil, sacri-
Trance in meinem Block von Marihu-
GT, mach' heute-
Für uns, Cho, nie wieder hapis

(Verse)
Cho, zéro-neuf, geh auf Profil, sacrifice
Zieh' ein Zug in Trance in meinem Block vom Marihu'
Choya, in Parkhaus, fahr' GT, mach' heut Geld mit Artifice
Das heißt: Für uns, cho, nie wieder hapis
Schweißgebadet wegen Stress
Zulu op Audi, bro, herres
Wenn du fragst wieso, khoya, ich nicht arbeite für ein Chef
Komm vom Block
Sag was ich seh
Fick Gericht, ich Knie vor Gott, no pledoyee eh
Bin mit Bande
ZÉRO NEUF ekip, sind nicht wie andre
Police kontrolle, khoya, im Audi perfomante
Lenk weil ibaash hinter uns
Fick die afd weil die Lage kocht zum Siedepunkt
Ich Liefer Qualität aus ghetto, bin am Boden, khoya, immernoch
Mach's für Hip Hop, chaye, nicht für Klicks
Bau mir alles selber auf, gib den jüngeren Respekt
Fick Geld, fick auf Hype, cho, du weißt wofür ich steh
Emanet in pantolon, beatler Mehsah a la prod
Pardon, kafa is reset, sıfıraltıyedi
Yaşıyorum Hamdullah, savaşıyorum billah
Tüm çabam senin için, altıyüzyedi
Culture ekip, Zero neuf
Kardeşlere selam, gerekirse suçlarını ört
C'est la vie, yaşa gör
İçindeyim ama bunu ben seçmedim.`,
  },
  {
    id: "geldigim_yer",
    title: "GELDİĞİM YER",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:48",
    currentTime: "00:40",
    progress: 24,
    durationSec: 168,
    bpm: 140,
    key: "E Minor",
    genre: "Street Drill",
    producers: "CLTR",
    mixMaster: "Waxy",
    badge: "Sokak Hit",
    category: "hits",
    releaseDate: "2025-02-28",
    releaseYear: 2024,
    image: "/assets/images/geldigim_yer.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/wnLybLVNzus?autoplay=1",
    youtubeId: "wnLybLVNzus",
    lyrics: `Geldiğim yeri asla unutmam
Sokaklarımdan vazgeçip uyumam
067 Frankfurt 607 Ankara
Mühür gibi kazındı bu toprağa!`,
  },
  {
    id: "aktiv",
    title: "AKTIV",
    artist: "Batuflex x ERAY067 & MANSUR x Chiko",
    album: "Single",
    duration: "2:54",
    currentTime: "00:50",
    progress: 29,
    durationSec: 174,
    bpm: 144,
    key: "A Minor",
    genre: "Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Batuflex Feat",
    category: "collab",
    releaseDate: "2025-02-14",
    releaseYear: 2024,
    image: "/assets/images/aktiv.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/BdG5nnlwQ40?autoplay=1",
    youtubeId: "BdG5nnlwQ40",
    lyrics: `Aktiv her gece sokaklardayız
Gözler radar gibi avlardayız
CLTR ekip en önde
Karanlık gecede fırtına gibi!`,
  },
  {
    id: "bir_kere_daha",
    title: "BİR KERE DAHA",
    artist: "ERAY067 x MANSUR ft. BIGBAT",
    album: "Single",
    duration: "2:50",
    currentTime: "00:45",
    progress: 26,
    durationSec: 170,
    bpm: 138,
    key: "A Minor",
    genre: "Melodic Drill",
    producers: "Big Bat",
    mixMaster: "Waxy",
    badge: "BIGBAT Feat",
    category: "collab",
    releaseDate: "2025-02-07",
    releaseYear: 2025,
    image: "/assets/images/bir_kere_daha.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/eAUwDhZ2RXQ?autoplay=1",
    youtubeId: "eAUwDhZ2RXQ",
    lyrics: `(Giriş: ERAY067)
A-a-ah, a-a-ah (B-B-Big Bat)

(Verse 1: MANSUR & ERAY067)
Bi' kere daha yolum düşmez sokağına
Aramaz gözlerim seni
Gidiyorum en uzağına-a-ah
Bi' kere daha güvenmem anlattığın masala
Elimde rüzgâr gibi gençliğim
Al kızım, hediyem olsun sana

(Nakarat: MANSUR & ERAY067)
Sen sarmadın yaramı
Ben sardım sigaramı
Yapmışım ben hatamı seni severek
Gel yine delalım
Gel, sensiz olmaz, hayır
Sen, belki de hataydın
Kaldım yalnız başıma
Yağmurlar altında
Bun'la baş edemem
Her şeyde biraz sen
Yalnız başıma
Yağmurlar altında
Bun'la baş edemem
Her şeyde biraz sen

(Verse 2: ERAY067 & MANSUR)
Yalnız başıma
Aklar düştü bir gecede saçıma
Yastığım kokuyorken hâlâ sen hâlâ
Sen hâl₺ dedim "Bu sefer başka"
Tam da kapılmıştım o aşka
Yunuslar aldı on altı yaşta (Pa-ra-pa-pa)

(Nakarat: MANSUR & ERAY067)
Sen sarmadın yaramı
Ben sardım sigaramı
Yapmışım ben hatamı seni severek
Gel yine delalım
Gel, sensiz olmaz, hayır
Sen, belki de hataydın
Kaldım yalnız başıma
Yağmurlar altında
Bun'la baş edemem
Her şeyde biraz sen`,
  },
  {
    id: "brapap",
    title: "BRAPAP",
    artist: "ERAY067 & MANSUR x Organize x Batuflex",
    album: "Single",
    duration: "2:52",
    currentTime: "00:45",
    progress: 26,
    durationSec: 172,
    bpm: 144,
    key: "A Minor",
    genre: "Drill",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Kült Hit",
    category: "collab",
    releaseDate: "2025-02-01",
    releaseYear: 2023,
    image: "/assets/images/brapap.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/Lj8kloI_3Tw?autoplay=1",
    youtubeId: "Lj8kloI_3Tw",
    lyrics: `Brapap brapap sesler sokakta
Geriye bakma, bas gaza hatta
Organize, Batuflex, Eray, Mansur
Kuralı bozanı sokaklar yutar!`,
  },
  {
    id: "paranoya",
    title: "PARANOYA",
    artist: "ERAY067 & MANSUR ft. Organize",
    album: "Single",
    duration: "3:01",
    currentTime: "00:50",
    progress: 28,
    durationSec: 181,
    bpm: 140,
    key: "F Minor",
    genre: "Trap",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Organize Feat",
    category: "collab",
    releaseDate: "2025-01-17",
    releaseYear: 2023,
    image: "/assets/images/paranoya.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/iMfPqrpxx8w?autoplay=1",
    youtubeId: "iMfPqrpxx8w",
    lyrics: `Kafamda binlerce paranoya
Gözlerimin rengi döndü kora
Sokaklar dar, geceler uzun
Biz bu yolda bulduk huzur!`,
  },
  {
    id: "alisamadim",
    title: "Alışamadım",
    artist: "MANSUR & ERAY067",
    album: "Single",
    duration: "2:38",
    currentTime: "00:45",
    progress: 29,
    durationSec: 158,
    bpm: 136,
    key: "D Minor",
    genre: "Melodic Trap",
    producers: "BIGBAT",
    mixMaster: "Waxy",
    badge: "BIGBAT Prod",
    category: "hits",
    releaseDate: "2024-11-15",
    releaseYear: 2023,
    image: "/assets/images/alisamadim.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/1Rirxg0tdzI?autoplay=1",
    youtubeId: "1Rirxg0tdzI",
    lyrics: `Alışamadım yokluğuna bir türlü
Gönlüm virane, sokaklar örtülü
Sensiz geçen her gün bir cehennem
Dön bana yeniden, gitme erkenden...`,
  },
  {
    id: "mahalle",
    title: "MAHALLE",
    artist: "ERAY067 ft. ERA7CAPONE",
    album: "Single",
    duration: "2:46",
    currentTime: "00:40",
    progress: 24,
    durationSec: 166,
    bpm: 142,
    key: "G Minor",
    genre: "Street Drill",
    producers: "MRLYN",
    mixMaster: "Waxy",
    badge: "ERA7CAPONE Feat",
    category: "collab",
    releaseDate: "2024-10-04",
    releaseYear: 2023,
    image: "/assets/images/mahalle.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/mLE7YKqD_zg?autoplay=1",
    youtubeId: "mLE7YKqD_zg",
    lyrics: `Burası bizim mahalle, adımını denk at
Kaldırımlarda yazılı hayat
067 ve ERA7 sahnede
Korku yok bizim lügatte!`,
  },
  {
    id: "tmax",
    title: "Tmax",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "2:20",
    currentTime: "01:05",
    progress: 46,
    durationSec: 140,
    bpm: 142,
    key: "D# Minor",
    genre: "Street Drill",
    producers: "Edokaleen",
    mixMaster: "Waxy",
    badge: "Solo Hit",
    category: "hits",
    releaseDate: "2024-08-02",
    releaseYear: 2024,
    image: "/assets/images/tmax.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/FjLZXS7sD2U?autoplay=1",
    youtubeId: "FjLZXS7sD2U",
    lyrics: `(Edokaleen)

Dokuz milim glock, üstümde var bi' emanet
Sizin flowlar rezalet, yaparım felaket
Tam isabet, 067, tamamlanmış full paket
Şirketler der "Bu nası' cesaret?"

Pafladım ofiste choco marrakesh
Sizinkiler kalleş
Verdim açık adres
Bebe, gel, test et

Otomatik Sig Sauer hasımlara
Gerek yok kasılmana
Her üfleyen dönüyo' aslana
Paslıyo'm çocuklara
Yorma bizi, uğraş onla...`,
  },
  {
    id: "anne",
    title: "ANNE",
    artist: "ERAY067 & MANSUR",
    album: "Single",
    duration: "3:18",
    currentTime: "01:00",
    progress: 30,
    durationSec: 198,
    bpm: 130,
    key: "C Minor",
    genre: "Emotional Rap",
    producers: "Culture Records",
    mixMaster: "Waxy",
    badge: "Duygusal Hit",
    category: "hits",
    releaseDate: "2024-08-01",
    releaseYear: 2023,
    image: "/assets/images/anne.jpg",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    embedUrl: "https://www.youtube.com/embed/YDLhTAxzS4Q?autoplay=1",
    youtubeId: "YDLhTAxzS4Q",
    lyrics: `Affet beni anne, yollarım çamur
Gözlerinden akan yaşları kurut
Söz verdim sana, gülecek yüzün
Dualarınla biter bu hüzün...`,
  }
];

export const ARTISTS: Artist[] = [
  {
    id: "eray067",
    name: "ERAY067",
    fullName: "Eray Ünal",
    origin: "Frankfurt am Main, Almanya",
    birthYear: "2003",
    role: "Flow King / German Drill & Trap Öncüsü",
    monthlyListeners: "2.7M+",
    achievements: "O Ses Türkiye Rap 2. Sezon Şampiyonu (Sefo Takımı)",
    signatureStyle: "Frankfurt 067 Sokak Drill & Çift Zamanlı (Double-time) Flow Tekniği",
    instagram: "https://www.instagram.com/eray067_",
    spotify: "https://open.spotify.com/intl-tr/artist/7l1AEP7z8ERNZzknXqPUFT",
    youtube: "https://www.youtube.com/@eray067-topic",
    image: "/assets/images/eray067_portrait.jpg",
    bannerImage: "/assets/images/tmax.jpg",
    bio: "2003 yılında Frankfurt am Main'de doğan Eray Ünal, Avrupa sokak realizmini ve sert German Drill ritimlerini Türk rap sahnesine taşıdı. O Ses Türkiye Rap 2. sezonunda Sefo'nun koçluğunda sergilediği 'Bana Gelsen', 'Catalonya' ve 'Zirve' performanslarıyla yarışmanın şampiyonu oldu. 'G WAGON', 'Tmax', 'BRAPAP II' ve 'BALMAIN' teklileriyle yüz milyonlarca dinlenmeye ulaştı.",
  },
  {
    id: "mansur",
    name: "MANSUR",
    fullName: "Ahmet Mansur Şahin",
    origin: "Ankara / Malatya",
    birthYear: "2002",
    role: "Melodik Hook Ustası / Vokal Mimarı",
    monthlyListeners: "1.8M+",
    achievements: "Platin Plak & Milyonluk Viral Nakaratların Mimarı",
    signatureStyle: "Karakteristik Vokal Tonu, Derin Melodik Trap Hookları, Ankara 607 Hissiyatı",
    instagram: "https://www.instagram.com/mansur607_",
    spotify: "https://open.spotify.com/artist/1nXS8JvKsTNSGw75Axv6rm",
    youtube: "https://www.youtube.com/@cltr",
    image: "/assets/images/mansur_portrait.jpg",
    bannerImage: "/assets/images/bu_gece_misafirinim.jpg",
    bio: "2002 yılında Ankara'da doğan ve aslen Malatyalı olan Ahmet Mansur Şahin (Mansur607), sağlık eğitiminin ardından 2022'de tam zamanlı müzik kariyerine adım attı. 'Bu Gece Misafirinim', 'Çok Ağladım', 'sofi', 'NAFİLE' ve 'ANNE' gibi şarkılara kattığı derin vokal hissiyatı ve akılda kalıcı nakaratlarıyla modern trap sahnesinin en çok aranan seslerinden biri oldu.",
  }
];

export const TOUR_DATES: TourDate[] = [
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
    day: "ÇARŞAMBA",
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
    day: "ÇARŞAMBA",
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
    day: "PERŞEMBE",
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
    city: "ESKİŞEHİR",
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

export const SOUNDBOARD_PADS: SoundboardPad[] = [
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
];

