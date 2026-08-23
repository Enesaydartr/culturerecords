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
    syncedLyrics: [{"time": 22.93, "text": "(yap-yap-yaparsovunuenes)"}, {"time": 27.47, "text": "Bak, ne diy'ce'm, aklıma geldi, biz bu yolu yürümüştük, yürümüştük, oh"}, {"time": 32.71, "text": "Hatta yürürken ceketimi sana verip üşümüştüm, üşümüştüm, oh"}, {"time": 37.49, "text": "Gittiğinden beri soruyo' tüm mahalle hâlimi"}, {"time": 40.24, "text": "Sen de merak edersen bi' mesaj at bahaneli"}, {"time": 42.84, "text": "Katiller yoklarmış zaten olay mahallini, mahallini, oh"}, {"time": 47.7, "text": "Kaşıdıkça kanadı, bi' kabuk tutamadık"}, {"time": 50.37, "text": "Gözden uzak olan gönülden ırakmış, anladım"}, {"time": 52.84, "text": "Sakındım hep yaramı, yanlışım bu sanırım"}, {"time": 55.34, "text": "İsterdim sen beni ara, ben hep seni aradım"}, {"time": 57.53, "text": "Beni Mecnun sanmayın unuturum yaz ayı"}, {"time": 60.04, "text": "Leyla olsaydın bitirmezdim kavgayı"}, {"time": 62.46, "text": "Gözümü oysun diye besledim kargayı (Besledim kargayı)"}, {"time": 66.04, "text": "(kargayı) (kargayı)"}, {"time": 67.71, "text": "Seni taşıyorum kalbimde beni sev diye"}, {"time": 69.77, "text": "İhtiyaç duyuyorum sen tarafından sevgiye"}, {"time": 72.33, "text": "İki gözüm, gözlerim değil, yaşlarım hediye"}, {"time": 75.02, "text": "Sana değer, bu kalp sana değer"}, {"time": 77.6, "text": "Seni taşıyorum kalbimde beni sev diye"}, {"time": 80.09, "text": "İhtiyaç duyuyorum sen tarafından sevgiye"}, {"time": 82.46, "text": "İki gözüm, gözlerim değil, yaşlarım hediye"}, {"time": 85.17, "text": "Sana değer, bu kalp sana değer"}, {"time": 88.29, "text": "He-her şey akıp gider zaman gibi, anla"}, {"time": 90.71, "text": "Ne de olsa yaşıyo'sun, kızım, İstanbul'da"}, {"time": 93.33, "text": "Bu devirde bugün var, yarın yok, anla"}, {"time": 95.82, "text": "Hâlâ vaktimiz varken sarıl bana bir anda"}, {"time": 98.23, "text": "Bir anda bi' güne başlamışsın biriyle"}, {"time": 100.54, "text": "Ben sevemem yeniden senden başkasını"}, {"time": 103.29, "text": "Bana \"Kalıyo'\" de, neden bu acılar, nereden?"}, {"time": 105.7, "text": "Sana kırk sular taşımıştım kırk bir tane dereden"}, {"time": 108.32, "text": "Sana değer döktüğüm bütün gözyaşlarım, uyku ilaçlarım"}, {"time": 113.35, "text": "\"Sana neler oldu?\" diyo' bütün dostlarım, arkadaşlarım"}, {"time": 120.65, "text": "Seni taşıyorum kalbimde beni sev diye"}, {"time": 123.29, "text": "İhtiyaç duyuyorum sen tarafından sevgiye"}, {"time": 125.55, "text": "İki gözüm, gözlerim değil, yaşlarım hediye"}, {"time": 128.36, "text": "Sana değer, bu kalp sana değer"}, {"time": 130.65, "text": "Seni taşıyorum kalbimde beni sev diye"}, {"time": 133.2, "text": "İhtiyaç duyuyorum sen tarafından sevgiye"}, {"time": 135.35, "text": "İki gözüm, gözlerim değil, yaşlarım hediye"}, {"time": 139.71, "text": "Sana değer, bu kalp sana değer"}],
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
    lyrics: `(yap-yap-yaparsovunuenes)
Bak, ne diy'ce'm, aklıma geldi, biz bu yolu yürümüştük, yürümüştük, oh
Hatta yürürken ceketimi sana verip üşümüştüm, üşümüştüm, oh
Gittiğinden beri soruyo' tüm mahalle hâlimi
Sen de merak edersen bi' mesaj at bahaneli
Katiller yoklarmış zaten olay mahallini, mahallini, oh
Kaşıdıkça kanadı, bi' kabuk tutamadık
Gözden uzak olan gönülden ırakmış, anladım
Sakındım hep yaramı, yanlışım bu sanırım
İsterdim sen beni ara, ben hep seni aradım
Beni Mecnun sanmayın unuturum yaz ayı
Leyla olsaydın bitirmezdim kavgayı
Gözümü oysun diye besledim kargayı (Besledim kargayı)
(kargayı) (kargayı)
Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil, yaşlarım hediye
Sana değer, bu kalp sana değer
Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil, yaşlarım hediye
Sana değer, bu kalp sana değer
He-her şey akıp gider zaman gibi, anla
Ne de olsa yaşıyo'sun, kızım, İstanbul'da
Bu devirde bugün var, yarın yok, anla
Hâlâ vaktimiz varken sarıl bana bir anda
Bir anda bi' güne başlamışsın biriyle
Ben sevemem yeniden senden başkasını
Bana "Kalıyo'" de, neden bu acılar, nereden?
Sana kırk sular taşımıştım kırk bir tane dereden
Sana değer döktüğüm bütün gözyaşlarım, uyku ilaçlarım
"Sana neler oldu?" diyo' bütün dostlarım, arkadaşlarım
Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil, yaşlarım hediye
Sana değer, bu kalp sana değer
Seni taşıyorum kalbimde beni sev diye
İhtiyaç duyuyorum sen tarafından sevgiye
İki gözüm, gözlerim değil, yaşlarım hediye
Sana değer, bu kalp sana değer`,
  },
  {
    id: "gucum_yok",
    syncedLyrics: [{"time": 21.58, "text": "Uh-ah"}, {"time": 23.17, "text": "(Ta-Ta-Tanerman)"}, {"time": 24.33, "text": "Ah"}, {"time": 25.69, "text": "Nasıl geldim, söyle, bugüne dek"}, {"time": 27.69, "text": "Acıyı yanımda gezdirerek?"}, {"time": 29.41, "text": "Sanki onun bi' parçası gibi acım"}, {"time": 31.59, "text": "Nereye gitse yokmuş ilacı"}, {"time": 33.93, "text": "İlacı bulursun, arayan bulurmuş"}, {"time": 35.62, "text": "Ben bulamayıp küstüm kendime"}, {"time": 37.72, "text": "Yürüdüm çok yollar, çaldım çok kapılar"}, {"time": 39.39, "text": "Hancı yok bu handa, vay hâlime"}, {"time": 41.89, "text": "Söyle, şimdi mutlu musun?"}, {"time": 44.15, "text": "Huzurlu uykular var mı?"}, {"time": 45.95, "text": "Benim hâlâ kâbusumsun"}, {"time": 48.03, "text": "Bu sensiz beşinci yazdı"}, {"time": 50.63, "text": "Bu şarkıyı sana yazdım"}, {"time": 52.48, "text": "Sen unuturken adımı"}, {"time": 54.92, "text": "Rüyalarımda sayıkladım"}, {"time": 57.01, "text": "Beni tanıdın mı?"}, {"time": 58.38, "text": "Seninle baş edecek gücüm yok"}, {"time": 61.53, "text": "Bu aşk yorar ikimizi"}, {"time": 63.17, "text": "Seni taşıyacak bi' kalbim yok"}, {"time": 65.26, "text": "Kalbim sorar ikimizi"}, {"time": 67.04, "text": "İkimizi, unutmak istedim ikimizi"}, {"time": 70.71, "text": "İkimizi, nasıl unuturum ikimizi?"}, {"time": 74.49, "text": "(Na-na) Nasıl hatırlamam ikimizi?"}, {"time": 76.71, "text": "Bi' fırtına tuttu bizi, batırmasa da gemimizi"}, {"time": 79.69, "text": "Nasıl hatırlamam evimizi?"}, {"time": 81.7, "text": "Senin güzel yüzün yüzünden yüzümde yüz tane yara izi"}, {"time": 84.99, "text": "Aynalar anlatır bana bizi, sanki dizi"}, {"time": 87.41, "text": "Yak, ver ateşi, çeker, dert dumanı sisi (Woah)"}, {"time": 90.84, "text": "Bende hasım denizde yosun"}, {"time": 92.58, "text": "Yansa da cigara ben hâlâ buzum"}, {"time": 94.4, "text": "Huyum kurusun, çocuk uyusun"}, {"time": 96.37, "text": "Allah'ım korusun var ise lüzum"}, {"time": 98.36, "text": "Yüzüme kusarım hep illa bi' kusur"}, {"time": 100.35, "text": "Ararken yirmi bir gramlık huzur"}, {"time": 102.57, "text": "Bi' sana küsüm ben, bi' sana pozum"}, {"time": 104.34, "text": "Hayat kısa, namlum uzun, kuzum (Ah-ah)"}, {"time": 107.99, "text": "Çünkü seninle—"}, {"time": 108.73, "text": "Baş edecek gücüm yok"}, {"time": 110.63, "text": "Bu aşk yorar ikimizi"}, {"time": 112.23, "text": "Seni taşıyacak bi' kalbim yok"}, {"time": 114.59, "text": "Kalbim sorar ikimizi"}, {"time": 115.93, "text": "İkimizi, unutmak istedim ikimizi"}, {"time": 118.24, "text": "İkimizi, nasıl unuturum ikimizi?"}, {"time": 124.08, "text": "İkimizi, unutmak istedim ikimizi"}, {"time": 127.96, "text": "İkimizi, nasıl unuturum ikimizi? (Ya)"}],
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
    lyrics: `Uh-ah
(Ta-Ta-Tanerman)
Ah
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
Seninle baş edecek gücüm yok
Bu aşk yorar ikimizi
Seni taşıyacak bi' kalbim yok
Kalbim sorar ikimizi
İkimizi, unutmak istedim ikimizi
İkimizi, nasıl unuturum ikimizi?
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
Yüzüme kusarım hep illa bi' kusur
Ararken yirmi bir gramlık huzur
Bi' sana küsüm ben, bi' sana pozum
Hayat kısa, namlum uzun, kuzum (Ah-ah)
Çünkü seninle—
Baş edecek gücüm yok
Bu aşk yorar ikimizi
Seni taşıyacak bi' kalbim yok
Kalbim sorar ikimizi
İkimizi, unutmak istedim ikimizi
İkimizi, nasıl unuturum ikimizi?
İkimizi, unutmak istedim ikimizi
İkimizi, nasıl unuturum ikimizi? (Ya)`,
  },
  {
    id: "nafile",
    syncedLyrics: [{"time": 5.01, "text": "(KIMO)"}, {"time": 6.07, "text": "(E-Edokaleen)"}, {"time": 8.84, "text": "Sokaklar pistir, sokak acımaz"}, {"time": 11.18, "text": "Tuzunu basabiliyo' bile acına"}, {"time": 13.54, "text": "\"Yaşamak\" denen şey inadına"}, {"time": 15.88, "text": "Hiç kimse varamıyo' muradına"}, {"time": 18.21, "text": "Kaderimi taktım bu kez koluma"}, {"time": 20.31, "text": "Nispet yapıyorum tüm anılara"}, {"time": 22.55, "text": "Çıkmak nasip olmasın ki yarına"}, {"time": 25.05, "text": "Kanmış gibi yaptım aşk oyununa"}, {"time": 27.96, "text": "Şimdi deme bana"}, {"time": 29.11, "text": "Kaybettiğini gelip de söyleme bana"}, {"time": 31.29, "text": "Ö-önce bana, sonra ayıp bütün anılara"}, {"time": 33.5, "text": "Yazdım adını yüzüme kapattığın kapılara, ah"}, {"time": 36.7, "text": "Yazdım seni kalbime"}, {"time": 38.81, "text": "Silemezsin, nafile"}, {"time": 41.06, "text": "Benim aşkım yaramaz"}, {"time": 43.73, "text": "Kendine şans dile"}, {"time": 46.1, "text": "Yazdım adını kalbime"}, {"time": 48.24, "text": "Silemezsin, nafile"}, {"time": 50.65, "text": "Benim aşkım yaramaz"}, {"time": 53.12, "text": "Kendine şans dile"}, {"time": 56.51, "text": "He-herkesi sen sandım, sandığım kadarlar"}, {"time": 58.71, "text": "Nasıl bu aşk senin için ihtiyarlar?"}, {"time": 61.36, "text": "Şimdi anlamsız geliyo' bu diyarlar"}, {"time": 62.97, "text": "Burada dar değil, fazlaca boş sokaklar"}, {"time": 65.5, "text": "(Nedеn?) Neden bunlar bana sevеn?"}, {"time": 68.64, "text": "Kaybeder mi her seferden?"}, {"time": 71.21, "text": "Her şey tamam, yarım bir sen, gelsen"}, {"time": 74.5, "text": "İçiyorum şarap içer gibi seni"}, {"time": 76.92, "text": "İzliyorum film izler gibi seni"}, {"time": 79.42, "text": "Gi-giyip gel kırmızı elbiseni"}, {"time": 81.53, "text": "Çok özledim lan vicdansız seni"}, {"time": 85.61, "text": "Yazdım seni kalbime"}, {"time": 87.87, "text": "Silemezsin, nafile"}, {"time": 90.14, "text": "Benim aşkım yaramaz"}, {"time": 92.81, "text": "Kendine şans dile"}, {"time": 95.08, "text": "Yazdım adını kalbime"}, {"time": 97.17, "text": "Silemezsin, nafile"}, {"time": 99.64, "text": "Benim aşkım yaramaz"}, {"time": 102.08, "text": "Kendine şans dile"}],
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
    lyrics: `(KIMO)
(E-Edokaleen)
Sokaklar pistir, sokak acımaz
Tuzunu basabiliyo' bile acına
"Yaşamak" denen şey inadına
Hiç kimse varamıyo' muradına
Kaderimi taktım bu kez koluma
Nispet yapıyorum tüm anılara
Çıkmak nasip olmasın ki yarına
Kanmış gibi yaptım aşk oyununa
Şimdi deme bana
Kaybettiğini gelip de söyleme bana
Ö-önce bana, sonra ayıp bütün anılara
Yazdım adını yüzüme kapattığın kapılara, ah
Yazdım seni kalbime
Silemezsin, nafile
Benim aşkım yaramaz
Kendine şans dile
Yazdım adını kalbime
Silemezsin, nafile
Benim aşkım yaramaz
Kendine şans dile
He-herkesi sen sandım, sandığım kadarlar
Nasıl bu aşk senin için ihtiyarlar?
Şimdi anlamsız geliyo' bu diyarlar
Burada dar değil, fazlaca boş sokaklar
(Nedеn?) Neden bunlar bana sevеn?
Kaybeder mi her seferden?
Her şey tamam, yarım bir sen, gelsen
İçiyorum şarap içer gibi seni
İzliyorum film izler gibi seni
Gi-giyip gel kırmızı elbiseni
Çok özledim lan vicdansız seni
Yazdım seni kalbime
Silemezsin, nafile
Benim aşkım yaramaz
Kendine şans dile
Yazdım adını kalbime
Silemezsin, nafile
Benim aşkım yaramaz
Kendine şans dile`,
  },
  {
    id: "bilezik_pirlanta",
    syncedLyrics: [{"time": 26.26, "text": "(BIGBAT)"}, {"time": 26.7, "text": "Ellerimi bırak, ışıklı caddelerden"}, {"time": 28.81, "text": "Sensiz çiçekli bahçelerden"}, {"time": 32.11, "text": "Geçtim tüm kahpelerden"}, {"time": 33.9, "text": "Gençliğim esir ruhuma yaşarken (Ah)"}, {"time": 35.78, "text": "Kaç polislerden, söz sana pırlantayı getir'cem ben (Ah)"}, {"time": 39.76, "text": "Saklan istersen, ne fark eder kalbime hapisken?"}, {"time": 43.34, "text": "Karakol ifade, \"Şşt\" dedim, \"rahat ol\""}, {"time": 45.43, "text": "Çantayı avukata indirdim, alo"}, {"time": 47.43, "text": "Ner'desin, kuzen? Bur'dayım, babo"}, {"time": 49.53, "text": "Sadece MOBESE'ye verdim foto'"}, {"time": 51.7, "text": "Düştük dalga geçtiğimiz hâle"}, {"time": 53.71, "text": "Bulma artık bana bahane"}, {"time": 55.75, "text": "Ettin yalanlarına alet"}, {"time": 57.57, "text": "Sana, cenazeme açık davet"}, {"time": 58.97, "text": "Siyah bi' Motorola, paket zula, işler tamam"}, {"time": 62.54, "text": "Sana demiştim \"Kızım, bana bırak, her şey tamam\""}, {"time": 66.48, "text": "Helal değil haram, zor oldu ama getirdim sana"}, {"time": 70.55, "text": "Bilezik pırlanta, bilezik pırlanta"}, {"time": 74.46, "text": "Siyah bi' Motorola, paket zula, işler tamam"}, {"time": 78.24, "text": "Sana demiştim \"Kızım, bana bırak, her şey tamam\""}, {"time": 82.36, "text": "Helal değil haram, zor oldu ama getirdim sana"}, {"time": 86.49, "text": "Bilezik pırlanta, bilezik pırlanta"}, {"time": 90.79, "text": "Bu dert yer bitirir adamı"}, {"time": 92.55, "text": "Bana da böylesi denk geliyo', adamım"}, {"time": 95.08, "text": "Annem bile sana düşman"}, {"time": 96.54, "text": "Ama ben hâlâ senden tarafım"}, {"time": 98.93, "text": "Allah'ım, görüyo' yananı"}, {"time": 100.53, "text": "Evimde yanar sokak lambaları"}, {"time": 102.51, "text": "Çıkmaz sandın ortaya yalanın"}, {"time": 104.48, "text": "Sen sen sandın yalnız kalanı"}, {"time": 107.58, "text": "Bir ihtimal vedalaşırız, neler gördüm ben bu hayatta"}, {"time": 109.99, "text": "Kalbim kırık, n'olucak? Kızım, hâlâ istiyo'sun pırlanta"}, {"time": 115.68, "text": "Belki tekrar karşılaşırız, belki ağlatırsın yeniden"}, {"time": 119.56, "text": "Kolundaysa bilezik pırlanta"}, {"time": 124.36, "text": "Siyah bi' Motorola, paket zula, işler tamam"}, {"time": 128.44, "text": "Sana demiştim \"Kızım, bana bırak, her şey tamam\""}, {"time": 132.35, "text": "Helal değil haram, zor oldu ama getirdim sana"}, {"time": 136.42, "text": "Bilezik pırlanta, bilezik pırlanta"}, {"time": 140.43, "text": "Siyah bi' Motorola, paket zula, işler tamam"}, {"time": 144.82, "text": "Sana demiştim \"Kızım, bana bırak, her şey tamam\""}, {"time": 148.44, "text": "Helal değil haram, zor oldu ama getirdim sana"}, {"time": 152.42, "text": "Bilezik pırlanta, bilezik pırlanta"}],
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
    lyrics: `(BIGBAT)
Ellerimi bırak, ışıklı caddelerden
Sensiz çiçekli bahçelerden
Geçtim tüm kahpelerden
Gençliğim esir ruhuma yaşarken (Ah)
Kaç polislerden, söz sana pırlantayı getir'cem ben (Ah)
Saklan istersen, ne fark eder kalbime hapisken?
Karakol ifade, "Şşt" dedim, "rahat ol"
Çantayı avukata indirdim, alo
Ner'desin, kuzen? Bur'dayım, babo
Sadece MOBESE'ye verdim foto'
Düştük dalga geçtiğimiz hâle
Bulma artık bana bahane
Ettin yalanlarına alet
Sana, cenazeme açık davet
Siyah bi' Motorola, paket zula, işler tamam
Sana demiştim "Kızım, bana bırak, her şey tamam"
Helal değil haram, zor oldu ama getirdim sana
Bilezik pırlanta, bilezik pırlanta
Siyah bi' Motorola, paket zula, işler tamam
Sana demiştim "Kızım, bana bırak, her şey tamam"
Helal değil haram, zor oldu ama getirdim sana
Bilezik pırlanta, bilezik pırlanta
Bu dert yer bitirir adamı
Bana da böylesi denk geliyo', adamım
Annem bile sana düşman
Ama ben hâlâ senden tarafım
Allah'ım, görüyo' yananı
Evimde yanar sokak lambaları
Çıkmaz sandın ortaya yalanın
Sen sen sandın yalnız kalanı
Bir ihtimal vedalaşırız, neler gördüm ben bu hayatta
Kalbim kırık, n'olucak? Kızım, hâlâ istiyo'sun pırlanta
Belki tekrar karşılaşırız, belki ağlatırsın yeniden
Kolundaysa bilezik pırlanta
Siyah bi' Motorola, paket zula, işler tamam
Sana demiştim "Kızım, bana bırak, her şey tamam"
Helal değil haram, zor oldu ama getirdim sana
Bilezik pırlanta, bilezik pırlanta
Siyah bi' Motorola, paket zula, işler tamam
Sana demiştim "Kızım, bana bırak, her şey tamam"
Helal değil haram, zor oldu ama getirdim sana
Bilezik pırlanta, bilezik pırlanta`,
  },
  {
    id: "olm_was_rap_mep",
    syncedLyrics: [{"time": 20.86, "text": "Oğlum, was rap mep? Mahallede yaşıyo'm"}, {"time": 23.08, "text": "Ayakkabı Nike ama ayakkabı sikiyo'"}, {"time": 25.28, "text": "Çekil ben'le video, ben de beni çekiyo'm"}, {"time": 27.48, "text": "Kızlar beni \"Yes\"ler, ben de kızları ısırıyo'm"}, {"time": 29.67, "text": "(Hah, hah, hah) Schöne manzara"}, {"time": 32.11, "text": "Artık para cepte, oldu bana mandala"}, {"time": 33.94, "text": "O-Olympique Marseil', silahla kombin, ASICS"}, {"time": 36.58, "text": "Her şarkı üç günde bir milyon, basit"}, {"time": 38.66, "text": "Yediniz, bitiremediniz, ERAY, Mansur"}, {"time": 40.83, "text": "Bu nası' bi' proje, oğlum? ERAY, Mansur"}, {"time": 42.92, "text": "Bunları dinleyen var mı? ERAY, Mansur"}, {"time": 45.51, "text": "Götünüze girsin ERAY, Mansur"}, {"time": 47.86, "text": "(Enes, bunu bip'leme, moruk, duysunlar)"}, {"time": 49.96, "text": "Tüm şehirde havada uçuyo' kurşunlar"}, {"time": 52.33, "text": "Ich bin jung, ich bin wild, ich bin asosyal"}, {"time": 54.2, "text": "GOP City, real life, doğuştan anormal"}, {"time": 57.48, "text": "Doğuştan anormal"}, {"time": 59.09, "text": "Doğum yeri 607, sanırım ondan"}, {"time": 61.75, "text": "So-so-soğuk sevmem ondan"}, {"time": 63.21, "text": "Hemеn al'ca'm intikam, doğuştan anormal (E-E—)"}, {"time": 65.46, "text": "ERAY, Mansur, Ouzo da misafir (He)"}, {"time": 67.75, "text": "Laf edenlеr gelemiyo' vis-à-vis (He)"}, {"time": 70.95, "text": "Enes, helal, bu beat'te ben kâfi (Okay)"}, {"time": 72.34, "text": "Kiralık araç, rengi safir (Let's go)"}, {"time": 74.25, "text": "4-4, 3-3, 0-6-7"}, {"time": 76.09, "text": "İn Opel Astra, bin Audi sieben (Bin Audi)"}, {"time": 79.22, "text": "Her sözüm fiilen"}, {"time": 81.07, "text": "Her yerim bilezik, Saudi feelin' (Yallah)"}, {"time": 83.57, "text": "Ah, sim simma"}, {"time": 84.83, "text": "Häng ab mit Mansur, sem'hemme yimma (Sem'hemme yimma)"}, {"time": 87.95, "text": "He, bin Euro"}, {"time": 89.52, "text": "Sence para mı, lan, elli bin lira? (Elli bin lira)"}, {"time": 91.66, "text": "Be-benim araç kiralık, sizin ruhunuz (He)"}, {"time": 93.67, "text": "Eğrisiniz, bu yüzden siki tuttunuz (He)"}, {"time": 95.84, "text": "Hızlı parlayan hızlı unutulur"}, {"time": 98.11, "text": "Konuşurlar ama konular kuruntudur (Şş)"}, {"time": 101.17, "text": "Doğuştan anormal"}, {"time": 102.21, "text": "Doğum yeri 607, sanırım ondan"}, {"time": 105.46, "text": "So-so-soğuk sevmem ondan"}, {"time": 106.72, "text": "Hemen al'ca'm intikam, doğuştan anormal"}, {"time": 109.8, "text": "Doğuştan anormal"}, {"time": 110.98, "text": "Doğum yeri 607, sanırım ondan"}, {"time": 113.56, "text": "So-so-soğuk sevmem ondan"}, {"time": 115.51, "text": "Hemen al'ca'm intikam, doğuştan anormal"}, {"time": 117.96, "text": "ERAY, Mansur, Ouzo da misafir (He)"}, {"time": 120.57, "text": "Ou-Ouzo da misafir"}, {"time": 122.39, "text": "ERAY, Mansur, Ouzo da— (yaparsovunu—)"}, {"time": 124.9, "text": "(ya-ya-yaparsovunuenes)"}],
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
    lyrics: `Oğlum, was rap mep? Mahallede yaşıyo'm
Ayakkabı Nike ama ayakkabı sikiyo'
Çekil ben'le video, ben de beni çekiyo'm
Kızlar beni "Yes"ler, ben de kızları ısırıyo'm
(Hah, hah, hah) Schöne manzara
Artık para cepte, oldu bana mandala
O-Olympique Marseil', silahla kombin, ASICS
Her şarkı üç günde bir milyon, basit
Yediniz, bitiremediniz, ERAY, Mansur
Bu nası' bi' proje, oğlum? ERAY, Mansur
Bunları dinleyen var mı? ERAY, Mansur
Götünüze girsin ERAY, Mansur
(Enes, bunu bip'leme, moruk, duysunlar)
Tüm şehirde havada uçuyo' kurşunlar
Ich bin jung, ich bin wild, ich bin asosyal
GOP City, real life, doğuştan anormal
Doğuştan anormal
Doğum yeri 607, sanırım ondan
So-so-soğuk sevmem ondan
Hemеn al'ca'm intikam, doğuştan anormal (E-E—)
ERAY, Mansur, Ouzo da misafir (He)
Laf edenlеr gelemiyo' vis-à-vis (He)
Enes, helal, bu beat'te ben kâfi (Okay)
Kiralık araç, rengi safir (Let's go)
4-4, 3-3, 0-6-7
İn Opel Astra, bin Audi sieben (Bin Audi)
Her sözüm fiilen
Her yerim bilezik, Saudi feelin' (Yallah)
Ah, sim simma
Häng ab mit Mansur, sem'hemme yimma (Sem'hemme yimma)
He, bin Euro
Sence para mı, lan, elli bin lira? (Elli bin lira)
Be-benim araç kiralık, sizin ruhunuz (He)
Eğrisiniz, bu yüzden siki tuttunuz (He)
Hızlı parlayan hızlı unutulur
Konuşurlar ama konular kuruntudur (Şş)
Doğuştan anormal
Doğum yeri 607, sanırım ondan
So-so-soğuk sevmem ondan
Hemen al'ca'm intikam, doğuştan anormal
Doğuştan anormal
Doğum yeri 607, sanırım ondan
So-so-soğuk sevmem ondan
Hemen al'ca'm intikam, doğuştan anormal
ERAY, Mansur, Ouzo da misafir (He)
Ou-Ouzo da misafir
ERAY, Mansur, Ouzo da— (yaparsovunu—)
(ya-ya-yaparsovunuenes)`,
  },
  {
    id: "yesler",
    syncedLyrics: [{"time": 23.73, "text": "(Ya)"}, {"time": 24.77, "text": "Piyasadayız, CLTR ekip"}, {"time": 26.16, "text": "Stüdyonun içine düşen yanıyo'"}, {"time": 27.64, "text": "34 sizi, araba asfaltı"}, {"time": 29.4, "text": "Influencer benimkini ****"}, {"time": 31.42, "text": "Re-Reder'le birlikte sistematik"}, {"time": 32.91, "text": "Tik-tik tak, dedik ya \"Kural basit, basit\""}, {"time": 35.21, "text": "Hâlâ ASICS, \"¡Hala Madrid!\""}, {"time": 36.76, "text": "Çok kastınız sanki Android"}, {"time": 38.61, "text": "Seslen bana \"Aşkım\", babalar gibi rap"}, {"time": 40.55, "text": "Kızlar beni hep \"Yes\"ler, \"Yes\"ler"}, {"time": 42.41, "text": "Sordu \"Ner'desin?\", dedim \"Bur'dayım\""}, {"time": 44.2, "text": "Yazıyo'm \"No at\", \"Yes\" der, \"Yes\" der"}, {"time": 46.03, "text": "No-Nokia tele' çalıyo' gene"}, {"time": 47.97, "text": "Ama açamam (A-ah, a-ah)"}, {"time": 49.92, "text": "Kafa bi' porsiyon"}, {"time": 51.26, "text": "İki oldu ama doyamam"}, {"time": 53.8, "text": "Hazır mısın? Çıkalım"}, {"time": 55.47, "text": "Ben hazırım, sizi bekliyorum"}, {"time": 57.42, "text": "O-o zaman bugün uçalım"}, {"time": 59.01, "text": "Uçarken kanat takmıyorum"}, {"time": 60.39, "text": "Okay, geldi zaman"}, {"time": 62.12, "text": "Gece sonu falan filan"}, {"time": 63.95, "text": "Ablam, yok vallah param"}, {"time": 65.79, "text": "Yavrum, sana çiçek alamam"}, {"time": 67.96, "text": "Okay, geldi zaman, zaman"}, {"time": 69.63, "text": "Seni görmezsem uyuyamam"}, {"time": 71.48, "text": "Muhabbet olur saçma sapan"}, {"time": 73.25, "text": "Boş ver, geçelim uzatmadan"}, {"time": 75.08, "text": "Ma-Mamak'tan sevgiler"}, {"time": 76.96, "text": "Yanımda Kanak gurbetçiler"}, {"time": 78.83, "text": "Arttı bi' anda beklentiler"}, {"time": 80.6, "text": "\"Beyler\" değil, \"Beyefendiler\""}, {"time": 82.39, "text": "Da-damsız girişler çünkü nam var"}, {"time": 84.28, "text": "Dam yok ama iki dak'kaya damlar, damlar"}, {"time": 86.75, "text": "Herkese bol şanslar"}, {"time": 88.13, "text": "Dayanabilirsen dayan, Ali Cabbar, Cabbar"}, {"time": 90.59, "text": "Sen sağ, ben selamet"}, {"time": 91.8, "text": "Yani komşu kızın bana emanet, haha"}, {"time": 94.05, "text": "Yoruldum, yaptım hararet"}, {"time": 95.65, "text": "Neyse, sen gene hakkını helal et bana"}, {"time": 97.64, "text": "Ha-hazır mısın? Çıkalım"}, {"time": 99.63, "text": "Ben hazırım, sizi bekliyorum"}, {"time": 101.45, "text": "O-o zaman bugün uçalım"}, {"time": 103.29, "text": "Uçarken kanat takmıyorum"}, {"time": 105.08, "text": "Okay, geldi zaman"}, {"time": 106.4, "text": "Gece sonu falan filan"}, {"time": 108.34, "text": "Ablam, yok vallah param"}, {"time": 110.13, "text": "Yavrum, sana çiçek alamam"}, {"time": 112.09, "text": "Okay, geldi zaman, zaman"}, {"time": 113.93, "text": "Seni görmezsem uyuyamam"}, {"time": 115.72, "text": "Muhabbet olur saçma sapan"}, {"time": 117.59, "text": "Boş ver, geçelim uzatmadan"}, {"time": 125.57, "text": "(ya-yaparsovunuenes)"}, {"time": 133.98, "text": "(pan-panmadeit)"}],
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
    lyrics: `(Ya)
Piyasadayız, CLTR ekip
Stüdyonun içine düşen yanıyo'
34 sizi, araba asfaltı
Influencer benimkini ****
Re-Reder'le birlikte sistematik
Tik-tik tak, dedik ya "Kural basit, basit"
Hâlâ ASICS, "¡Hala Madrid!"
Çok kastınız sanki Android
Seslen bana "Aşkım", babalar gibi rap
Kızlar beni hep "Yes"ler, "Yes"ler
Sordu "Ner'desin?", dedim "Bur'dayım"
Yazıyo'm "No at", "Yes" der, "Yes" der
No-Nokia tele' çalıyo' gene
Ama açamam (A-ah, a-ah)
Kafa bi' porsiyon
İki oldu ama doyamam
Hazır mısın? Çıkalım
Ben hazırım, sizi bekliyorum
O-o zaman bugün uçalım
Uçarken kanat takmıyorum
Okay, geldi zaman
Gece sonu falan filan
Ablam, yok vallah param
Yavrum, sana çiçek alamam
Okay, geldi zaman, zaman
Seni görmezsem uyuyamam
Muhabbet olur saçma sapan
Boş ver, geçelim uzatmadan
Ma-Mamak'tan sevgiler
Yanımda Kanak gurbetçiler
Arttı bi' anda beklentiler
"Beyler" değil, "Beyefendiler"
Da-damsız girişler çünkü nam var
Dam yok ama iki dak'kaya damlar, damlar
Herkese bol şanslar
Dayanabilirsen dayan, Ali Cabbar, Cabbar
Sen sağ, ben selamet
Yani komşu kızın bana emanet, haha
Yoruldum, yaptım hararet
Neyse, sen gene hakkını helal et bana
Ha-hazır mısın? Çıkalım
Ben hazırım, sizi bekliyorum
O-o zaman bugün uçalım
Uçarken kanat takmıyorum
Okay, geldi zaman
Gece sonu falan filan
Ablam, yok vallah param
Yavrum, sana çiçek alamam
Okay, geldi zaman, zaman
Seni görmezsem uyuyamam
Muhabbet olur saçma sapan
Boş ver, geçelim uzatmadan
(ya-yaparsovunuenes)
(pan-panmadeit)`,
  },
  {
    id: "sofi",
    syncedLyrics: [{"time": 2.35, "text": "Bunlar kim? Bunlar değil bizim mahalleden"}, {"time": 4.1, "text": "Bur'dan bir eksildik, bir arttık hapishaneden"}, {"time": 6.26, "text": "İstanbul'da sahneler, İstanbul'da var neler"}, {"time": 8.36, "text": "Almanya'da alıyo'larmış eczaneden"}, {"time": 10.38, "text": "Sofilerle kıldık namaz"}, {"time": 12.1, "text": "Sofi yanmaz ateşte, korkmaz ateşten"}, {"time": 14.5, "text": "Sofi heyvandır, motor sürer"}, {"time": 16.2, "text": "Sofi koymuş belinde, hiç korkar mı senden?"}, {"time": 18.39, "text": "Yaptırdım bakkaldan kaşar salam"}, {"time": 20.29, "text": "Sənə deyirəm \"Nə xəbər, kaşar? Salam\" (Şş)"}, {"time": 22.25, "text": "Benimle anlaş ya da kalk masadan"}, {"time": 24.36, "text": "34'ten gitsek kalmaz adam"}, {"time": 26.61, "text": "Zu viel Gangsta, was Sofi"}, {"time": 28.39, "text": "Her yol var, tam cambaz sofi"}, {"time": 30.64, "text": "Tabakhanede boss sofi"}, {"time": 32.38, "text": "Bas, lan, bas gaza, bas, bas, sofi"}, {"time": 34.76, "text": "Zu viel Gangsta, was Sofi"}, {"time": 36.43, "text": "Her yol var, tam cambaz sofi"}, {"time": 38.8, "text": "Tabakhanede boss sofi"}, {"time": 40.41, "text": "Bas, lan, bas gaza, bas, bas, sofi"}, {"time": 42.51, "text": "Sahadayım aktif, sharmūṭ sempatik"}, {"time": 44.59, "text": "Yapmam empati, ben oraları geçtim"}, {"time": 46.36, "text": "Bana anlatma taktik, sentetik statik"}, {"time": 47.62, "text": "Dembele forma, Ballon d'Or hak ettim"}, {"time": 50.64, "text": "Drive-by sound, euro, dolar, pound"}, {"time": 52.48, "text": "Olurum black out, menajerimden dekont"}, {"time": 54.63, "text": "\"Pa-para, para\" Napolyon, baba"}, {"time": 56.84, "text": "Bu parayı kaldıramaz ki kumbara"}, {"time": 58.84, "text": "Her zaman bende, pantolonumda"}, {"time": 60.78, "text": "Tüm sakladıklarım buzdolabımda"}, {"time": 62.75, "text": "Pahalı takımlar gardırobumda"}, {"time": 64.89, "text": "Benimle yok olamaz sorunum da"}, {"time": 67.34, "text": "Zu viel Gangsta, was Sofi"}, {"time": 68.56, "text": "Her yol var, tam cambaz sofi"}, {"time": 71.07, "text": "Tabakhanede boss sofi"}, {"time": 72.55, "text": "Bas, lan, bas gaza, bas, sofi"}, {"time": 75.18, "text": "Zu viel Gangsta, was Sofi"}, {"time": 76.64, "text": "Her yol var, tam cambaz sofi"}, {"time": 79.08, "text": "Tabakhanede boss sofi"}, {"time": 80.66, "text": "Bas, lan, bas gaza, bas, bas, sofi"}, {"time": 83.23, "text": "Bunlar kim? Bunlar değil bizim mahalleden"}, {"time": 86.72, "text": "Her zaman bende, pantolonumda"}, {"time": 90.9, "text": "Sharmūṭ sempatik, yapmam empati"}, {"time": 95.16, "text": "Koymuş belinde, hiç korkar mı senden?"}],
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
    lyrics: `Bunlar kim? Bunlar değil bizim mahalleden
Bur'dan bir eksildik, bir arttık hapishaneden
İstanbul'da sahneler, İstanbul'da var neler
Almanya'da alıyo'larmış eczaneden
Sofilerle kıldık namaz
Sofi yanmaz ateşte, korkmaz ateşten
Sofi heyvandır, motor sürer
Sofi koymuş belinde, hiç korkar mı senden?
Yaptırdım bakkaldan kaşar salam
Sənə deyirəm "Nə xəbər, kaşar? Salam" (Şş)
Benimle anlaş ya da kalk masadan
34'ten gitsek kalmaz adam
Zu viel Gangsta, was Sofi
Her yol var, tam cambaz sofi
Tabakhanede boss sofi
Bas, lan, bas gaza, bas, bas, sofi
Zu viel Gangsta, was Sofi
Her yol var, tam cambaz sofi
Tabakhanede boss sofi
Bas, lan, bas gaza, bas, bas, sofi
Sahadayım aktif, sharmūṭ sempatik
Yapmam empati, ben oraları geçtim
Bana anlatma taktik, sentetik statik
Dembele forma, Ballon d'Or hak ettim
Drive-by sound, euro, dolar, pound
Olurum black out, menajerimden dekont
"Pa-para, para" Napolyon, baba
Bu parayı kaldıramaz ki kumbara
Her zaman bende, pantolonumda
Tüm sakladıklarım buzdolabımda
Pahalı takımlar gardırobumda
Benimle yok olamaz sorunum da
Zu viel Gangsta, was Sofi
Her yol var, tam cambaz sofi
Tabakhanede boss sofi
Bas, lan, bas gaza, bas, sofi
Zu viel Gangsta, was Sofi
Her yol var, tam cambaz sofi
Tabakhanede boss sofi
Bas, lan, bas gaza, bas, bas, sofi
Bunlar kim? Bunlar değil bizim mahalleden
Her zaman bende, pantolonumda
Sharmūṭ sempatik, yapmam empati
Koymuş belinde, hiç korkar mı senden?`,
  },
  {
    id: "outro",
    syncedLyrics: [{"time": 3.66, "text": "(yaparsovunuenes)"}, {"time": 6.36, "text": "Yeah, ya"}, {"time": 9.17, "text": "Selam götürün, bulutlar, bizim mahalleye"}, {"time": 11.6, "text": "Hasretim sana, anne, hasretim, daye"}, {"time": 13.6, "text": "Eve dönmem gerekir, bulaştı elime kir"}, {"time": 16.33, "text": "Benim o yağmurlarda yıkanmam gerekir"}, {"time": 18.56, "text": "Eve dönmem gerekir, gözlerimde kan var"}, {"time": 21.12, "text": "Ne kadar anlatsam eksik kalır, yani kan var"}, {"time": 23.36, "text": "Yanımda şöhretim ve kaslı iki adam var"}, {"time": 25.96, "text": "Birinde zulam, diğerinde tabancam var"}, {"time": 28.38, "text": "Evden çıktığım gün bu hâlde değildim"}, {"time": 30.78, "text": "Tamam, masum küçük bi' çocuk değildim"}, {"time": 32.99, "text": "Ama yana yana bu ateşte kora döndüm"}, {"time": 35.12, "text": "Ayağım da kaymadı, nası' çukura düştüm?"}, {"time": 38.02, "text": "Silahlar ve haram, uymadım şeytana"}, {"time": 40.28, "text": "Bu sözleri yazarken foto verdim fanlara"}, {"time": 42.49, "text": "Huzur, huzur neydi anlatsana, huzur neydi, baba?"}, {"time": 45.18, "text": "Ceplerimdekinin rengi karar verir buna"}, {"time": 47.7, "text": "Selam götürün, bulutlar, bizim mahalleye"}, {"time": 49.99, "text": "Hasretim sana, anne, hasretim, daye"}, {"time": 52.17, "text": "Eve dönmem gerekir, bulaştı elime kir"}, {"time": 54.78, "text": "Benim o yağmurlarda yıkanmam gerekir"}, {"time": 57.25, "text": "Selam götürün, bulutlar, bizim mahalleye"}, {"time": 59.57, "text": "Hasretim sana, anne, hasretim, daye"}, {"time": 61.75, "text": "Eve dönmem gerekir, bulaştı elime kir"}, {"time": 64.44, "text": "Benim o yağmurlarda yıkanmam gerekir"}, {"time": 67.42, "text": "Selam götürün bizim mahalleye"}, {"time": 69.82, "text": "Biz-bizim mahalleye"}, {"time": 72.01, "text": "Dönmem gerekir, elime kir"}, {"time": 77.86, "text": "Bizim mahalleye"}, {"time": 79.52, "text": "Selam—"}, {"time": 79.94, "text": "Bizim mahalleye, bizim mahalleye"}],
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
    lyrics: `(yaparsovunuenes)
Yeah, ya
Selam götürün, bulutlar, bizim mahalleye
Hasretim sana, anne, hasretim, daye
Eve dönmem gerekir, bulaştı elime kir
Benim o yağmurlarda yıkanmam gerekir
Eve dönmem gerekir, gözlerimde kan var
Ne kadar anlatsam eksik kalır, yani kan var
Yanımda şöhretim ve kaslı iki adam var
Birinde zulam, diğerinde tabancam var
Evden çıktığım gün bu hâlde değildim
Tamam, masum küçük bi' çocuk değildim
Ama yana yana bu ateşte kora döndüm
Ayağım da kaymadı, nası' çukura düştüm?
Silahlar ve haram, uymadım şeytana
Bu sözleri yazarken foto verdim fanlara
Huzur, huzur neydi anlatsana, huzur neydi, baba?
Ceplerimdekinin rengi karar verir buna
Selam götürün, bulutlar, bizim mahalleye
Hasretim sana, anne, hasretim, daye
Eve dönmem gerekir, bulaştı elime kir
Benim o yağmurlarda yıkanmam gerekir
Selam götürün, bulutlar, bizim mahalleye
Hasretim sana, anne, hasretim, daye
Eve dönmem gerekir, bulaştı elime kir
Benim o yağmurlarda yıkanmam gerekir
Selam götürün bizim mahalleye
Biz-bizim mahalleye
Dönmem gerekir, elime kir
Bizim mahalleye
Selam—
Bizim mahalleye, bizim mahalleye`,
  },

  // --- SINGLES & COLLABORATIONS ---,
  {
    id: "sayfa",
    syncedLyrics: [{"time": 10.63, "text": "Holding on"}, {"time": 13.21, "text": "For someone"}, {"time": 14.8, "text": "What should I do?"}, {"time": 16.58, "text": "Tell me what you want me to do"}, {"time": 20.78, "text": "Auch wenn's nicht meine Art ist"}, {"time": 23.6, "text": "Doch dir sag' ich's, ich fühl' mich einsam"}, {"time": 25.75, "text": "Warte wieder auf 'ne Nachricht"}, {"time": 27.55, "text": "Doch es kam nix, du bist unerreichbar"}, {"time": 30.43, "text": "Sensizlik var ya"}, {"time": 32.35, "text": "Geçmez oldu seneler, aylar, oh"}, {"time": 35.43, "text": "Aç kendine bi' sayfa"}, {"time": 37.34, "text": "Ve unut beni o kadar kolaysa"}, {"time": 40.71, "text": "Gib mir noch ein letztes Mal ein „I love you“"}, {"time": 42.98, "text": "Weil das wär mir grade mehr wert als 'ne halbe Mio"}, {"time": 45.46, "text": "Nur eine Träne von dir und mein Tabanca macht piu"}, {"time": 47.97, "text": "Ich hab' so viel durchgemacht, du kennst die ganze Bio"}, {"time": 50.87, "text": "Sie wollen, dass man tief fällt"}, {"time": 52.43, "text": "Und ich weiß, dass deine Fam von mir nicht viel hält, yeah"}, {"time": 55.45, "text": "Doch du weißt, ich mach' viel Geld"}, {"time": 57.42, "text": "Bleib' für immer Nummer eins auf diesem Spielfeld"}, {"time": 60.41, "text": "Geceler ne geçer, ne biter"}, {"time": 62.96, "text": "Sinirlerimi de zedeler"}, {"time": 65.45, "text": "Wir beide sind wie vom selben Stern"}, {"time": 68.04, "text": "Weil die andern sind für mich nicht mal ein'n Penny wert"}, {"time": 70.55, "text": "Oh"}, {"time": 72.23, "text": "Lass mal Vergangenes vergangen sein"}, {"time": 75.09, "text": "Ah"}, {"time": 77.27, "text": "Ich verlier' mein'n Verstand mit der Zeit"}, {"time": 80.6, "text": "Auch wenn's nicht meine Art ist"}, {"time": 82.44, "text": "Doch dir sag' ich's, ich fühl' mich einsam"}, {"time": 85.29, "text": "Warte wieder auf 'ne Nachricht"}, {"time": 87.26, "text": "Doch es kam nix, du bist unerreichbar"}, {"time": 90.4, "text": "Sensizlik var ya"}, {"time": 92.46, "text": "Geçmez oldu seneler, aylar, oh"}, {"time": 95.42, "text": "Aç kendine bi' sayfa"}, {"time": 97.57, "text": "Ve unut beni o kadar kolaysa"}, {"time": 100.6, "text": "O kadar kolaysa unut beni bugün hemen"}, {"time": 102.78, "text": "Bana seninle yaşaması geliyo' daha zor"}, {"time": 105.4, "text": "Hislerim var beni sana karşı ele veren"}, {"time": 108.02, "text": "Huyum değil ama gözlerim hep seni arıyo'"}, {"time": 110.52, "text": "Bu-bu yüzden mi silahın bana dönüyo'?"}, {"time": 113.05, "text": "Ge-gecelerime siyah renk katıyo'"}, {"time": 115.73, "text": "Dünya senin hat'rına mı dönüyo?"}, {"time": 118.51, "text": "Ne-neden hep iyiler kaybediyo'?"}, {"time": 120.85, "text": "Senin sevenin vay hâline vay"}, {"time": 123.42, "text": "Nasıl sevilmezler? Hâli olay"}, {"time": 126.14, "text": "Beklemene gerek yok, benden onay"}, {"time": 127.96, "text": "Gitmek sana kolay, eh"}, {"time": 130.84, "text": "Auch wenn's nicht meine Art ist"}, {"time": 132.51, "text": "Doch dir sag' ich's, ich fühl' mich einsam"}, {"time": 135.48, "text": "Warte wieder auf 'ne Nachricht"}, {"time": 137.41, "text": "Doch es kam nix, du bist unerreichbar"}, {"time": 140.28, "text": "Sensizlik var ya"}, {"time": 142.3, "text": "Geçmez oldu seneler, aylar, oh"}, {"time": 145.43, "text": "Aç kendine bi' sayfa"}, {"time": 147.5, "text": "Ve unut beni o kadar kolaysa"}, {"time": 155.37, "text": "(Clay made that)"}],
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
    lyrics: `Holding on
For someone
What should I do?
Tell me what you want me to do
Auch wenn's nicht meine Art ist
Doch dir sag' ich's, ich fühl' mich einsam
Warte wieder auf 'ne Nachricht
Doch es kam nix, du bist unerreichbar
Sensizlik var ya
Geçmez oldu seneler, aylar, oh
Aç kendine bi' sayfa
Ve unut beni o kadar kolaysa
Gib mir noch ein letztes Mal ein „I love you“
Weil das wär mir grade mehr wert als 'ne halbe Mio
Nur eine Träne von dir und mein Tabanca macht piu
Ich hab' so viel durchgemacht, du kennst die ganze Bio
Sie wollen, dass man tief fällt
Und ich weiß, dass deine Fam von mir nicht viel hält, yeah
Doch du weißt, ich mach' viel Geld
Bleib' für immer Nummer eins auf diesem Spielfeld
Geceler ne geçer, ne biter
Sinirlerimi de zedeler
Wir beide sind wie vom selben Stern
Weil die andern sind für mich nicht mal ein'n Penny wert
Oh
Lass mal Vergangenes vergangen sein
Ah
Ich verlier' mein'n Verstand mit der Zeit
Auch wenn's nicht meine Art ist
Doch dir sag' ich's, ich fühl' mich einsam
Warte wieder auf 'ne Nachricht
Doch es kam nix, du bist unerreichbar
Sensizlik var ya
Geçmez oldu seneler, aylar, oh
Aç kendine bi' sayfa
Ve unut beni o kadar kolaysa
O kadar kolaysa unut beni bugün hemen
Bana seninle yaşaması geliyo' daha zor
Hislerim var beni sana karşı ele veren
Huyum değil ama gözlerim hep seni arıyo'
Bu-bu yüzden mi silahın bana dönüyo'?
Ge-gecelerime siyah renk katıyo'
Dünya senin hat'rına mı dönüyo?
Ne-neden hep iyiler kaybediyo'?
Senin sevenin vay hâline vay
Nasıl sevilmezler? Hâli olay
Beklemene gerek yok, benden onay
Gitmek sana kolay, eh
Auch wenn's nicht meine Art ist
Doch dir sag' ich's, ich fühl' mich einsam
Warte wieder auf 'ne Nachricht
Doch es kam nix, du bist unerreichbar
Sensizlik var ya
Geçmez oldu seneler, aylar, oh
Aç kendine bi' sayfa
Ve unut beni o kadar kolaysa
(Clay made that)`,
  },
  {
    id: "azdan_az_coktan_cok",
    syncedLyrics: [{"time": 2.43, "text": "Pa-pa-pa"}, {"time": 5.49, "text": "Grr, ey"}, {"time": 7.13, "text": "Ya-yapar mermiler salsa, salsa"}, {"time": 8.79, "text": "Memurlar yakamı salsa"}, {"time": 10.67, "text": "Üzgün rapçiler bana kalsa"}, {"time": 11.68, "text": "Bizler siyah maske, boş arsa (Güm güm)"}, {"time": 13.4, "text": "Benim 9'luk kalktı bu dansa"}, {"time": 15.54, "text": "Senin güvendiğin dağlar karsa"}, {"time": 17.29, "text": "Konuşurum eğer laf anlarsa"}, {"time": 19.14, "text": "Saçılır yere hep kanlarsa"}, {"time": 20.8, "text": "Ko-kovalar dururum, bilemem sonumu"}, {"time": 22.75, "text": "Yakalar, yakarım, kaybet yolunu"}, {"time": 24.21, "text": "Dökerim bi’ şişe, bilirim konumu"}, {"time": 26.09, "text": "Ama kelepçeler tutar hep kolumu"}, {"time": 28.02, "text": "Durma, evlat, sen gaza bas (Yeah)"}, {"time": 29.45, "text": "Bu yaramazların kafa tas"}, {"time": 31.11, "text": "Senin ufaklık L saramaz"}, {"time": 32.96, "text": "Giydim hüküm, bi' de Adidas"}, {"time": 35.87, "text": "Ko-ko-koş, koş, koş, yakalayamasınlar"}, {"time": 39.21, "text": "Bunlar boş, boş, boş, yapamaz, konuşurlar"}, {"time": 42.25, "text": "Azdan az, çoktan çok, aslan vazgeçer mi aslından?"}, {"time": 46.26, "text": "Pa-pa-patlar Glock, çıkar telefonlar kapsamdan"}, {"time": 49.76, "text": "Ma-mahalleyi ziyaret"}, {"time": 51.24, "text": "Kolu kesiklerle sohbet"}, {"time": 52.77, "text": "Üstümde Barcelona forma"}, {"time": 54.52, "text": "Birazdan kopar kıyamеt"}, {"time": 56.11, "text": "Ma-Ma-Mansur \"Yabba Dabba Do\""}, {"time": 58.16, "text": "Deme bana \"Dur\""}, {"time": 58.8, "text": "İşaret gеldi, vur"}, {"time": 60.27, "text": "Avcının köpeği avcıdan daha çok yorulur"}, {"time": 62.87, "text": "Bi-bi-bi-bi-bi-bizim gibisi yok, lale"}, {"time": 65.29, "text": "Görürsen at DM'den"}, {"time": 66.69, "text": "Her günümüz \"Dale, Don, dale\""}, {"time": 68.62, "text": "Davet gelir hep bi’ yerden"}, {"time": 70.25, "text": "Tahmin ettim sonraki hamleni"}, {"time": 72.25, "text": "067, habibi"}, {"time": 73.83, "text": "Vallah kolay değil, mon ami"}, {"time": 75.38, "text": "Kafam güzel, yakıca'm konseri"}, {"time": 77.35, "text": "Koş, koş, koş, yakalayamasınlar"}, {"time": 80.02, "text": "Bunlar boş, boş, boş, yapamaz, konuşurlar"}, {"time": 83.53, "text": "Azdan az, çoktan çok, aslan vazgeçer mi aslından?"}, {"time": 87.11, "text": "Pa-pa-patlar Glock, çıkar telefonlar kapsamdan"}, {"time": 93.81, "text": "(yaparsovunuenes)"}],
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
    lyrics: `Pa-pa-pa
Grr, ey
Ya-yapar mermiler salsa, salsa
Memurlar yakamı salsa
Üzgün rapçiler bana kalsa
Bizler siyah maske, boş arsa (Güm güm)
Benim 9'luk kalktı bu dansa
Senin güvendiğin dağlar karsa
Konuşurum eğer laf anlarsa
Saçılır yere hep kanlarsa
Ko-kovalar dururum, bilemem sonumu
Yakalar, yakarım, kaybet yolunu
Dökerim bi’ şişe, bilirim konumu
Ama kelepçeler tutar hep kolumu
Durma, evlat, sen gaza bas (Yeah)
Bu yaramazların kafa tas
Senin ufaklık L saramaz
Giydim hüküm, bi' de Adidas
Ko-ko-koş, koş, koş, yakalayamasınlar
Bunlar boş, boş, boş, yapamaz, konuşurlar
Azdan az, çoktan çok, aslan vazgeçer mi aslından?
Pa-pa-patlar Glock, çıkar telefonlar kapsamdan
Ma-mahalleyi ziyaret
Kolu kesiklerle sohbet
Üstümde Barcelona forma
Birazdan kopar kıyamеt
Ma-Ma-Mansur "Yabba Dabba Do"
Deme bana "Dur"
İşaret gеldi, vur
Avcının köpeği avcıdan daha çok yorulur
Bi-bi-bi-bi-bi-bizim gibisi yok, lale
Görürsen at DM'den
Her günümüz "Dale, Don, dale"
Davet gelir hep bi’ yerden
Tahmin ettim sonraki hamleni
067, habibi
Vallah kolay değil, mon ami
Kafam güzel, yakıca'm konseri
Koş, koş, koş, yakalayamasınlar
Bunlar boş, boş, boş, yapamaz, konuşurlar
Azdan az, çoktan çok, aslan vazgeçer mi aslından?
Pa-pa-patlar Glock, çıkar telefonlar kapsamdan
(yaparsovunuenes)`,
  },
  {
    id: "yazik_sana",
    syncedLyrics: [{"time": 19.31, "text": "(Ah)"}, {"time": 20.57, "text": "Tüm rapçiler fiyasko, yüzlerinde maske"}, {"time": 23.41, "text": "Aileme asker ben (Ah)"}, {"time": 25.93, "text": "Götün yerse kastet, buraları kasvet"}, {"time": 28.25, "text": "Kararıyoruz kederden"}, {"time": 30.83, "text": "Hep eksi bilanço, sıktı beni bu mahalle"}, {"time": 33.2, "text": "Koleksiyon yaptım şişelerden"}, {"time": 35.92, "text": "Kurudu gönül bahçem, kırıldı kanatlarım"}, {"time": 38.25, "text": "Hayatla yeni tanışırken"}, {"time": 39.71, "text": "Sana dedim \"Var bi' yol, inan bana\""}, {"time": 42.14, "text": "Geceleri tutmuyor uyku hâlâ"}, {"time": 44.57, "text": "Çıkıp geldik evimizden uzaklara"}, {"time": 47.25, "text": "Haram para ve de bi'çok yara"}, {"time": 49.91, "text": "Es ist okay, okay, yaşadıkça dâhiliz bu oyuna"}, {"time": 54.7, "text": "Anılarım eskidi, indirdim duvardan resmini, ah-ah"}, {"time": 60.53, "text": "İsterim unut beni, doğaldı hislerim bulut gibi"}, {"time": 64.7, "text": "Bana soru sorma, sorma"}, {"time": 67.85, "text": "Bunlar artık normal, normal"}, {"time": 70.13, "text": "Gözlerim kan doldu bugüne dеk ama"}, {"time": 72.5, "text": "Ama, ama, ama"}, {"time": 74.65, "text": "Sahte sadakat ve sahte bi' sеvgili"}, {"time": 77.43, "text": "Yalan, yalan, yalan"}, {"time": 79.66, "text": "Bozdur, harca, bir günde bitir hepsini"}, {"time": 82.07, "text": "Gibi para, para, para"}, {"time": 84.63, "text": "Son sözümü bile hiç merak etmedin"}, {"time": 87.45, "text": "Yazık sana, sana"}, {"time": 90.34, "text": "A-arar bulur bela beni, bulamadım yolumu"}, {"time": 92.62, "text": "Daraldım hep sıkıntı, gözlerimden okudun mu?"}, {"time": 95.41, "text": "Gözünü kırpmadan asıldı tetiğe"}, {"time": 98.12, "text": "Çocuk üşür sokaklarda hep var diye"}, {"time": 100.28, "text": "Sokak lambaları altında gölgeler dans eder"}, {"time": 102.72, "text": "Delikanlı adam severse gönlüne hapseder"}, {"time": 105.32, "text": "Kan değdi dişine, bakmaz üç beşine"}, {"time": 107.84, "text": "Ödül dönmek eve sırtında leş ile"}, {"time": 110.17, "text": "İsterim unut beni, doğaldı hislerim bulut gibi"}, {"time": 114.62, "text": "Bana soru sorma, sorma"}, {"time": 117.15, "text": "Bunlar artık normal, normal"}, {"time": 119.7, "text": "Gözlerim kan doldu bugüne dek ama"}, {"time": 122.45, "text": "Ama, ama, ama"}, {"time": 124.61, "text": "Sahte sadakat ve sahte bi' sevgili"}, {"time": 127.55, "text": "Yalan, yalan, yalan"}, {"time": 129.65, "text": "Bozdur, harca, bir günde bitir hepsini"}, {"time": 132.15, "text": "Gibi para, para, para"}, {"time": 134.69, "text": "Son sözümü bile hiç merak etmedin"}, {"time": 137.44, "text": "Yazık sana, sana"}, {"time": 142.53, "text": "(Ama, ama, ama)"}, {"time": 147.72, "text": "(Yalan, yalan, yalan)"}, {"time": 152.66, "text": "(Para, para, para)"}, {"time": 157.54, "text": "(Yazık sana, sana)"}],
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
    lyrics: `(Ah)
Tüm rapçiler fiyasko, yüzlerinde maske
Aileme asker ben (Ah)
Götün yerse kastet, buraları kasvet
Kararıyoruz kederden
Hep eksi bilanço, sıktı beni bu mahalle
Koleksiyon yaptım şişelerden
Kurudu gönül bahçem, kırıldı kanatlarım
Hayatla yeni tanışırken
Sana dedim "Var bi' yol, inan bana"
Geceleri tutmuyor uyku hâlâ
Çıkıp geldik evimizden uzaklara
Haram para ve de bi'çok yara
Es ist okay, okay, yaşadıkça dâhiliz bu oyuna
Anılarım eskidi, indirdim duvardan resmini, ah-ah
İsterim unut beni, doğaldı hislerim bulut gibi
Bana soru sorma, sorma
Bunlar artık normal, normal
Gözlerim kan doldu bugüne dеk ama
Ama, ama, ama
Sahte sadakat ve sahte bi' sеvgili
Yalan, yalan, yalan
Bozdur, harca, bir günde bitir hepsini
Gibi para, para, para
Son sözümü bile hiç merak etmedin
Yazık sana, sana
A-arar bulur bela beni, bulamadım yolumu
Daraldım hep sıkıntı, gözlerimden okudun mu?
Gözünü kırpmadan asıldı tetiğe
Çocuk üşür sokaklarda hep var diye
Sokak lambaları altında gölgeler dans eder
Delikanlı adam severse gönlüne hapseder
Kan değdi dişine, bakmaz üç beşine
Ödül dönmek eve sırtında leş ile
İsterim unut beni, doğaldı hislerim bulut gibi
Bana soru sorma, sorma
Bunlar artık normal, normal
Gözlerim kan doldu bugüne dek ama
Ama, ama, ama
Sahte sadakat ve sahte bi' sevgili
Yalan, yalan, yalan
Bozdur, harca, bir günde bitir hepsini
Gibi para, para, para
Son sözümü bile hiç merak etmedin
Yazık sana, sana
(Ama, ama, ama)
(Yalan, yalan, yalan)
(Para, para, para)
(Yazık sana, sana)`,
  },
  {
    id: "familia",
    syncedLyrics: [{"time": 8.44, "text": "(yaparsovunuenes)"}, {"time": 11.3, "text": "Familya, ah"}, {"time": 14.52, "text": "Ah, familya, ah"}, {"time": 18.63, "text": "İllegal trafik, bi'çoğu fanatik"}, {"time": 20.93, "text": "Sadece aile, bra, zamanım sana değil"}, {"time": 23.11, "text": "Rakip hiç tanımam, rakamlar kafamda"}, {"time": 25.58, "text": "Her zaman matiz, baba, ama iskalamam"}, {"time": 28.18, "text": "Hayatım bi' savaş, yaşadım, kimseden kaçmadım"}, {"time": 30.38, "text": "Ama sen kaçarsan, pa-pa"}, {"time": 32.86, "text": "On-on dosttan üç kaldı, beş hâlâ hapis"}, {"time": 34.98, "text": "Aslında yapmazlar hata"}, {"time": 37.63, "text": "Silahlar ve günler, farkım yok ki dünden"}, {"time": 39.93, "text": "Her yanım yara bere"}, {"time": 42.12, "text": "Yolum hep yokuş, her gün mücadele"}, {"time": 44.14, "text": "Söyle, n'olucak böyle?"}, {"time": 46.64, "text": "Bi' tur at mahallede, görürsün nedir zorluk"}, {"time": 48.92, "text": "Harbiden kahpe felek"}, {"time": 51.34, "text": "Sanki herkes doğru, bi' tek biz yanlış"}, {"time": 53.2, "text": "Kaderinde varmış kelek"}, {"time": 55.16, "text": "(Pat, pat vuruyo' familya; Familya)"}, {"time": 59.31, "text": "(Paf, paf vuruyo' familya)"}, {"time": 64.36, "text": "Burada her gün pat, pat vuruyo' familya"}, {"time": 66.86, "text": "Şarjörüm dolu"}, {"time": 68.02, "text": "Her gün paf, paf vuruyo' familya"}, {"time": 71.28, "text": "Takip et dumanı"}, {"time": 72.86, "text": "Familya, sonsuza dek"}, {"time": 76.96, "text": "Ah, familya, sonsuzum bu hеp"}, {"time": 83.44, "text": "Yürüyorum ama boyun eğmedim"}, {"time": 84.75, "text": "Tüm acılara yeminim var, \"Yapamazsın\" dеme"}, {"time": 88.02, "text": "Sana gelir basit ama"}, {"time": 88.98, "text": "Kaldır kıçını o zaman, yaptıklarımın yarısını bi' dene"}, {"time": 92.28, "text": "(Yok-yok) Yok boş dönmek eve ama razı gelme kadere"}, {"time": 97.2, "text": "Söz verdim kendime, kaybetmiy'cem diye kaç kere"}, {"time": 100.69, "text": "(Pat, pat, vuruyo' familya; Familya)"}, {"time": 108.3, "text": "(Paf, paf, vuruyo' familya)"}, {"time": 109, "text": "Burada her gün pat, pat vuruyo' familya"}, {"time": 112.56, "text": "Şarjörüm dolu"}, {"time": 113.81, "text": "Her gün paf, paf vuruyo' familya"}, {"time": 116.94, "text": "Takip et dumanı"}, {"time": 118.45, "text": "Familya, sonsuza dek"}, {"time": 122.79, "text": "Ah, familya, sonsuzum bu hep"}, {"time": 130.15, "text": "Familya, ah"}, {"time": 134.33, "text": "Ah, familya, ah"}],
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
    lyrics: `(yaparsovunuenes)
Familya, ah
Ah, familya, ah
İllegal trafik, bi'çoğu fanatik
Sadece aile, bra, zamanım sana değil
Rakip hiç tanımam, rakamlar kafamda
Her zaman matiz, baba, ama iskalamam
Hayatım bi' savaş, yaşadım, kimseden kaçmadım
Ama sen kaçarsan, pa-pa
On-on dosttan üç kaldı, beş hâlâ hapis
Aslında yapmazlar hata
Silahlar ve günler, farkım yok ki dünden
Her yanım yara bere
Yolum hep yokuş, her gün mücadele
Söyle, n'olucak böyle?
Bi' tur at mahallede, görürsün nedir zorluk
Harbiden kahpe felek
Sanki herkes doğru, bi' tek biz yanlış
Kaderinde varmış kelek
(Pat, pat vuruyo' familya; Familya)
(Paf, paf vuruyo' familya)
Burada her gün pat, pat vuruyo' familya
Şarjörüm dolu
Her gün paf, paf vuruyo' familya
Takip et dumanı
Familya, sonsuza dek
Ah, familya, sonsuzum bu hеp
Yürüyorum ama boyun eğmedim
Tüm acılara yeminim var, "Yapamazsın" dеme
Sana gelir basit ama
Kaldır kıçını o zaman, yaptıklarımın yarısını bi' dene
(Yok-yok) Yok boş dönmek eve ama razı gelme kadere
Söz verdim kendime, kaybetmiy'cem diye kaç kere
(Pat, pat, vuruyo' familya; Familya)
(Paf, paf, vuruyo' familya)
Burada her gün pat, pat vuruyo' familya
Şarjörüm dolu
Her gün paf, paf vuruyo' familya
Takip et dumanı
Familya, sonsuza dek
Ah, familya, sonsuzum bu hep
Familya, ah
Ah, familya, ah`,
  },
  {
    id: "bu_gece_misafirinim",
    syncedLyrics: [{"time": 2.82, "text": "(panmadeit)"}, {"time": 3.98, "text": "(yaparsovunuenes)"}, {"time": 9.06, "text": "Bilmem çıkar mıyım yarına"}, {"time": 10.8, "text": "Mon ami yanıma geliyo' salına salına"}, {"time": 13.79, "text": "\"Caddeler\" diyorum, caddeler"}, {"time": 15.81, "text": "Mon ami kanıma giriyo’, kanıma, kanıma"}, {"time": 19.07, "text": "Marlboro sigaramın içine seni doladım"}, {"time": 21.58, "text": "İçtikçe giriyo'sun içine kafamın"}, {"time": 24.16, "text": "Ne aldığım yaranın hesabı var ne kaybettiğim paranın"}, {"time": 26.93, "text": "Seni bana yâr olmayan gözlerinden tanıdım"}, {"time": 29.31, "text": "Bilirsin beni, dört döndüm caddeyi"}, {"time": 31.57, "text": "\"Bilirsin\" dediğimde artık yabancıyız"}, {"time": 34.65, "text": "Bilsen ne hâldeyim, sensiz viraneyim"}, {"time": 37.09, "text": "Issız, karanlık, yalnız"}, {"time": 39.59, "text": "Bu şehir benden şanssız"}, {"time": 42.23, "text": "Ben bu şehirden çaresizim"}, {"time": 44.6, "text": "Bana ner'de olduğunu söyle"}, {"time": 47.37, "text": "Bu gece misafirinim"}, {"time": 49.41, "text": "Çalarım bi’ gecе kapını"}, {"time": 51.48, "text": "Nasıl unutursun adımı?"}, {"time": 53.86, "text": "Ben o günlerde yaşıyorum"}, {"time": 55.69, "text": "Gеlirsen beklerim, bırak inadını"}, {"time": 58.81, "text": "Çalarım bi' gece kapını"}, {"time": 60.91, "text": "Nasıl unutursun adımı?"}, {"time": 63.39, "text": "Ben o günlerde yaşıyorum"}, {"time": 65.92, "text": "Gelirsen beklerim, bırak inadını"}, {"time": 67.92, "text": "Geçmedi mi, kızım, semtimizden ayıplar?"}, {"time": 69.72, "text": "Bi' gün seni sevmeyi bırakırsam yuhlayın, lan"}, {"time": 72.2, "text": "Sana geliyorum, yollarında mayınlar"}, {"time": 74.46, "text": "Al canımı, sende kalsın, acıyo' aşk ayında"}, {"time": 77.06, "text": "Bu sana söylediğim son sözüm"}, {"time": 78.81, "text": "Gülmedi hiç yüzüm seninki gülsün diye"}, {"time": 81.93, "text": "Acımı, derdimi gizledim"}, {"time": 83.79, "text": "Sen de hiç sormadın, bekledim hep sor diye"}, {"time": 86.91, "text": "Artık tek isteğim gittiğin yerde mutlu ol"}, {"time": 89.3, "text": "Burası çok soğuk, duydun mu? Ben üşüyorum (Oh-oh)"}, {"time": 90.59, "text": "Kalbim taş, gönlüm kör ve hapis"}, {"time": 94.16, "text": "Buna \"yaşamak\" denilmez ama yaşıyorum"}, {"time": 97.1, "text": "Bu şehir benden şanssız"}, {"time": 99.66, "text": "Ben bu şehirden çaresizim"}, {"time": 101.94, "text": "Bana ner'de olduğunu söyle"}, {"time": 104.87, "text": "Bu gece misafirinim"}, {"time": 107.06, "text": "Çalarım bi' gece kapını"}, {"time": 109.4, "text": "Nasıl unutursun adımı?"}, {"time": 111.28, "text": "Ben o günlerde yaşıyorum"}, {"time": 113.36, "text": "Gelirsen beklerim, bırak inadını"}, {"time": 116.36, "text": "Çalarım bi' gece kapını"}, {"time": 118.49, "text": "Nasıl unutursun adımı?"}, {"time": 120.79, "text": "Ben o günlerde yaşıyorum"}, {"time": 122.86, "text": "Gelirsen beklerim, bırak inadını"}],
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
    lyrics: `(panmadeit)
(yaparsovunuenes)
Bilmem çıkar mıyım yarına
Mon ami yanıma geliyo' salına salına
"Caddeler" diyorum, caddeler
Mon ami kanıma giriyo’, kanıma, kanıma
Marlboro sigaramın içine seni doladım
İçtikçe giriyo'sun içine kafamın
Ne aldığım yaranın hesabı var ne kaybettiğim paranın
Seni bana yâr olmayan gözlerinden tanıdım
Bilirsin beni, dört döndüm caddeyi
"Bilirsin" dediğimde artık yabancıyız
Bilsen ne hâldeyim, sensiz viraneyim
Issız, karanlık, yalnız
Bu şehir benden şanssız
Ben bu şehirden çaresizim
Bana ner'de olduğunu söyle
Bu gece misafirinim
Çalarım bi’ gecе kapını
Nasıl unutursun adımı?
Ben o günlerde yaşıyorum
Gеlirsen beklerim, bırak inadını
Çalarım bi' gece kapını
Nasıl unutursun adımı?
Ben o günlerde yaşıyorum
Gelirsen beklerim, bırak inadını
Geçmedi mi, kızım, semtimizden ayıplar?
Bi' gün seni sevmeyi bırakırsam yuhlayın, lan
Sana geliyorum, yollarında mayınlar
Al canımı, sende kalsın, acıyo' aşk ayında
Bu sana söylediğim son sözüm
Gülmedi hiç yüzüm seninki gülsün diye
Acımı, derdimi gizledim
Sen de hiç sormadın, bekledim hep sor diye
Artık tek isteğim gittiğin yerde mutlu ol
Burası çok soğuk, duydun mu? Ben üşüyorum (Oh-oh)
Kalbim taş, gönlüm kör ve hapis
Buna "yaşamak" denilmez ama yaşıyorum
Bu şehir benden şanssız
Ben bu şehirden çaresizim
Bana ner'de olduğunu söyle
Bu gece misafirinim
Çalarım bi' gece kapını
Nasıl unutursun adımı?
Ben o günlerde yaşıyorum
Gelirsen beklerim, bırak inadını
Çalarım bi' gece kapını
Nasıl unutursun adımı?
Ben o günlerde yaşıyorum
Gelirsen beklerim, bırak inadını`,
  },
  {
    id: "aktiv2",
    syncedLyrics: [{"time": 22.41, "text": "(Petric)"}, {"time": 23.87, "text": "Türkiye'nin üç tarafı deniz, bizim semtin dört tarafı beton kaplıydı"}, {"time": 27.55, "text": "Esmer iyi kızdı ama sarı da tatlıydı"}, {"time": 30.05, "text": "Onlarda var, bende yok, söyle bana, hak mıydı?"}, {"time": 32.59, "text": "Hocam dedi \"Senden hayır gelmez\", adam haklıydı"}, {"time": 35.09, "text": "Kır, yuvarla, döndür, serseriler güldü"}, {"time": 37.35, "text": "Serseriler güldü çünkü hepsi çok kez gördü"}, {"time": 40.23, "text": "Hayat tecrübedir, e, biz de tecrübeli"}, {"time": 42.8, "text": "Unut içindekini, sigara gibi öldür"}, {"time": 45.15, "text": "Vazgeçmekse hayır aileme dair"}, {"time": 47.68, "text": "Mevzu ekmek davasıysa âlemine abiyim"}, {"time": 50.36, "text": "Anlattılar hikâye ve kolpadalar safi"}, {"time": 52.8, "text": "Bi' gün tatil olucak hayat ama daha değil"}, {"time": 54.77, "text": "Hеr Mercedes gördüğümdе hep derdim \"Bu piçin teki\""}, {"time": 57.52, "text": "Oldum bugün Mercedes'in içindeki"}, {"time": 60.08, "text": "Hayatım boyunca hiç sevmemiştim etiketi"}, {"time": 62.64, "text": "Çünkü kardeşlerim hep gerçekten tetikteydi (Chikocan, 24)"}, {"time": 65.11, "text": "Basarım tetiklere, senin gibi konuşmam"}, {"time": 67.23, "text": "Sen gösterme hiç icraat, hep karı gibi konuş, lan (Hehehe)"}, {"time": 69.91, "text": "Bebek'te date yok, var adliyede duruşmam"}, {"time": 72.04, "text": "Bundan yazan influencer karılarla buluşmam"}, {"time": 74.61, "text": "Tıraşlar hep siker, baba, kıyafetler mazın"}, {"time": 77.13, "text": "Ama TV'lerde yüz kapalı çekiyo' bu basın (Şş, şş)"}, {"time": 79.71, "text": "Ararsam ben bulurum ve bulursam da vururum"}, {"time": 82.49, "text": "Sokaklarda kurtarmıyo' kilo ya da kasın"}, {"time": 84.92, "text": "Hızır yoldaşımız, asaletim Ali'den"}, {"time": 87.47, "text": "Bize \"Ayan\" derler ama sen yalancı beysin"}, {"time": 90.07, "text": "Mesajlarda erkektin ya, bulduğumda geysin"}, {"time": 92.16, "text": "Az'cık adam ol, birayê min, seni vurduğuma değsin (Hehehe)"}, {"time": 95.02, "text": "Okmeydanı City, sokakta çalıştım çok işte"}, {"time": 97.57, "text": "Senin gibi takılmadım o club'ta o beach'te"}, {"time": 99.96, "text": "Çocukken de dızdım, o zaman da tersoydum"}, {"time": 102.96, "text": "Komşularım derdi \"Sakın oynamayın o piçle\""}, {"time": 105.28, "text": "Ben gaza basıyo'm, senin aklın frenlerde"}, {"time": 107.38, "text": "Aslan gibi savaşıyo'z üç senedir biraderle"}, {"time": 110.06, "text": "Açtık arayı kederle, yarıştayız kahpelerle"}, {"time": 113.07, "text": "Sen ne dersen de baba zirvelerde"}, {"time": 115.23, "text": "Wo bist du? Arkadaşlar, polis bu"}, {"time": 117.2, "text": "Kaçar sanki Tolisso, yönetemez çete Mourinho"}, {"time": 119.63, "text": "Tu-tu-tuttum bi' otel, getto fenomen, je m'appelle"}, {"time": 122.24, "text": "Mansur ve de Kanak götünden alır o donunu"}, {"time": 125, "text": "Ha-ha-hamdullah for everything, favela'mda bitmez umut"}, {"time": 127.93, "text": "Kırk fırın ekmek ye, gözünde yaşları kurut"}, {"time": 130.51, "text": "Daha uzun olsa bile bur'da ötmez borun"}, {"time": 133.06, "text": "Tişörtle geziyo'm, sen çelik yeleğinle korun"}, {"time": 135.93, "text": "Mansur abi harbi straat internasyonel"}, {"time": 138.09, "text": "Uyan, trafik, telefonuna para rasyonel"}, {"time": 140.45, "text": "Takımlarım or'jinal, tabancalar da or'jinal (Pow)"}, {"time": 142.86, "text": "Mein Brudi ist Macher, oyun kurucu personel"}, {"time": 145.69, "text": "Bratte, Mamak stil, adım \"Reder\", kalite"}, {"time": 148.13, "text": "Sesi kesip sakin olun, gerek yok hiç panike"}, {"time": 150.6, "text": "Redo K dahil oyuna, kim kimin payına"}, {"time": 153.18, "text": "Senin gibi adamın ta koyayım ****"}, {"time": 156, "text": "CLTR ekip takım, Ankaralı David Beckham"}, {"time": 158.06, "text": "En yakın rakibim zaten gerimde kaldı on adım, ah"}, {"time": 160.9, "text": "Rakkas, dar alanda makas"}, {"time": 162.79, "text": "Oğlum, senin işin gücün çekmek göte paspas (Çek, çek, çek)"}, {"time": 165.97, "text": "Çek sabır, karardı bu kehribar"}, {"time": 167.82, "text": "Devir bizim devir, sen de rap'i bırak, ihtiyar"}, {"time": 170.4, "text": "Arsa alıp sat ya da gece sonu barbuta"}, {"time": 172.93, "text": "Bizimkiler ayı ve sen benziyo'sun armuta, hahaha"}, {"time": 178.61, "text": "(Soylu)"}],
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
    lyrics: `(Petric)
Türkiye'nin üç tarafı deniz, bizim semtin dört tarafı beton kaplıydı
Esmer iyi kızdı ama sarı da tatlıydı
Onlarda var, bende yok, söyle bana, hak mıydı?
Hocam dedi "Senden hayır gelmez", adam haklıydı
Kır, yuvarla, döndür, serseriler güldü
Serseriler güldü çünkü hepsi çok kez gördü
Hayat tecrübedir, e, biz de tecrübeli
Unut içindekini, sigara gibi öldür
Vazgeçmekse hayır aileme dair
Mevzu ekmek davasıysa âlemine abiyim
Anlattılar hikâye ve kolpadalar safi
Bi' gün tatil olucak hayat ama daha değil
Hеr Mercedes gördüğümdе hep derdim "Bu piçin teki"
Oldum bugün Mercedes'in içindeki
Hayatım boyunca hiç sevmemiştim etiketi
Çünkü kardeşlerim hep gerçekten tetikteydi (Chikocan, 24)
Basarım tetiklere, senin gibi konuşmam
Sen gösterme hiç icraat, hep karı gibi konuş, lan (Hehehe)
Bebek'te date yok, var adliyede duruşmam
Bundan yazan influencer karılarla buluşmam
Tıraşlar hep siker, baba, kıyafetler mazın
Ama TV'lerde yüz kapalı çekiyo' bu basın (Şş, şş)
Ararsam ben bulurum ve bulursam da vururum
Sokaklarda kurtarmıyo' kilo ya da kasın
Hızır yoldaşımız, asaletim Ali'den
Bize "Ayan" derler ama sen yalancı beysin
Mesajlarda erkektin ya, bulduğumda geysin
Az'cık adam ol, birayê min, seni vurduğuma değsin (Hehehe)
Okmeydanı City, sokakta çalıştım çok işte
Senin gibi takılmadım o club'ta o beach'te
Çocukken de dızdım, o zaman da tersoydum
Komşularım derdi "Sakın oynamayın o piçle"
Ben gaza basıyo'm, senin aklın frenlerde
Aslan gibi savaşıyo'z üç senedir biraderle
Açtık arayı kederle, yarıştayız kahpelerle
Sen ne dersen de baba zirvelerde
Wo bist du? Arkadaşlar, polis bu
Kaçar sanki Tolisso, yönetemez çete Mourinho
Tu-tu-tuttum bi' otel, getto fenomen, je m'appelle
Mansur ve de Kanak götünden alır o donunu
Ha-ha-hamdullah for everything, favela'mda bitmez umut
Kırk fırın ekmek ye, gözünde yaşları kurut
Daha uzun olsa bile bur'da ötmez borun
Tişörtle geziyo'm, sen çelik yeleğinle korun
Mansur abi harbi straat internasyonel
Uyan, trafik, telefonuna para rasyonel
Takımlarım or'jinal, tabancalar da or'jinal (Pow)
Mein Brudi ist Macher, oyun kurucu personel
Bratte, Mamak stil, adım "Reder", kalite
Sesi kesip sakin olun, gerek yok hiç panike
Redo K dahil oyuna, kim kimin payına
Senin gibi adamın ta koyayım ****
CLTR ekip takım, Ankaralı David Beckham
En yakın rakibim zaten gerimde kaldı on adım, ah
Rakkas, dar alanda makas
Oğlum, senin işin gücün çekmek göte paspas (Çek, çek, çek)
Çek sabır, karardı bu kehribar
Devir bizim devir, sen de rap'i bırak, ihtiyar
Arsa alıp sat ya da gece sonu barbuta
Bizimkiler ayı ve sen benziyo'sun armuta, hahaha
(Soylu)`,
  },
  {
    id: "yaramaz",
    syncedLyrics: [{"time": 26.3, "text": "(E-Edokaleen)"}, {"time": 27.89, "text": "(KIMO)"}, {"time": 28.86, "text": "Seninle çok ortak konum var"}, {"time": 30.67, "text": "Ama çok farklı oldu konumlar"}, {"time": 32.96, "text": "Bize artık derler \"Yabancı\""}, {"time": 34.37, "text": "Aydınlığa çıkmaz bu yollar"}, {"time": 36.09, "text": "Hiç bitmek bilmiyo' sorunlar"}, {"time": 38.02, "text": "Bugünler idare peki yarınlar?"}, {"time": 40.1, "text": "Rüyalarım hâlâ zavallı"}, {"time": 41.88, "text": "Ve kuşkum hep dolanıyo’ yanımda"}, {"time": 44.49, "text": "Bana bi' gül verdin, arada gülümserdin"}, {"time": 47.4, "text": "Bilirdim hepsi yalandan"}, {"time": 49.63, "text": "Ama bunu ben seçtim"}, {"time": 51.44, "text": "Sen en güzel yaşımdın"}, {"time": 53.39, "text": "Canımla yarışırdın"}, {"time": 55.12, "text": "Sana bi' dünya kurdum"}, {"time": 56.62, "text": "Beni kimle karıştırdın"}, {"time": 59.55, "text": "Değil kaybetmek normal (Normal)"}, {"time": 62.41, "text": "Ben hep kazanırdım (Ben hep kazanırdım)"}, {"time": 66.81, "text": "A-a-artık kırıldı karma"}, {"time": 70.22, "text": "Kötüler kazandı (Kötüler kazandı)"}, {"time": 75.02, "text": "Kızım bende öldü duygular"}, {"time": 75.77, "text": "Bitti hislerim"}, {"time": 76.61, "text": "Sen kazandın al kırık kalbimi"}, {"time": 78.43, "text": "Yanında götür o yaramaz"}, {"time": 81.19, "text": "Sana yaranmaya binbir dereden sular taşıdım"}, {"time": 83.89, "text": "Yara kaşıdın, yar olmaz senden bana (Ah)"}, {"time": 87.13, "text": "Senin aşkın yaramaz (Yaramaz)"}, {"time": 89.78, "text": "Yaralanmadan yaşamak imkânsız"}, {"time": 91.55, "text": "Geçmez asla günlerim kansız"}, {"time": 93.53, "text": "Dinsizin hakkından gelir imansız"}, {"time": 95.36, "text": "Masamda dansöz yaver şansım"}, {"time": 97.31, "text": "Sensiz olmazdı ve yapamazdım"}, {"time": 99.4, "text": "Nasıl değiştim inanamazsın"}, {"time": 101.04, "text": "Dikenler ezdim güllere bastım"}, {"time": 102.78, "text": "Seninle olanlar seninle kalsın"}, {"time": 104.59, "text": "Değil kaybetmek normal (Normal)"}, {"time": 107.77, "text": "Ben hep kazanırdım (Ben hep kazanırdım)"}, {"time": 111.73, "text": "A-a-artık kırıldı karma"}, {"time": 115.31, "text": "Kötüler kazandı (Kötüler kazandı)"}, {"time": 119.36, "text": "Kızım bende öldü duygular"}, {"time": 120.8, "text": "Bitti hislerim"}, {"time": 121.72, "text": "Sen kazandın al kırık kalbimi"}, {"time": 123.76, "text": "Yanında götür o yaramaz"}, {"time": 126.45, "text": "Sana yaranmaya binbir dereden sular taşıdım"}, {"time": 129.25, "text": "Yara kaşıdın, yar olmaz senden bana (Ah)"}, {"time": 132.45, "text": "Senin aşkın yaramaz (Yaramaz)"}, {"time": 135.33, "text": "Kızım bende öldü duygular"}, {"time": 136.92, "text": "Bitti hislerim"}, {"time": 137.8, "text": "Sen kazandın al kırık kalbimi"}, {"time": 138.93, "text": "Yanında götür o yaramaz"}, {"time": 141.81, "text": "Sana yaranmaya binbir dereden sular taşıdım"}, {"time": 144.48, "text": "Yara kaşıdın, yar olmaz senden bana (Ah)"}, {"time": 147.79, "text": "Senin aşkın yaramaz (Yaramaz)"}],
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
    lyrics: `(E-Edokaleen)
(KIMO)
Seninle çok ortak konum var
Ama çok farklı oldu konumlar
Bize artık derler "Yabancı"
Aydınlığa çıkmaz bu yollar
Hiç bitmek bilmiyo' sorunlar
Bugünler idare peki yarınlar?
Rüyalarım hâlâ zavallı
Ve kuşkum hep dolanıyo’ yanımda
Bana bi' gül verdin, arada gülümserdin
Bilirdim hepsi yalandan
Ama bunu ben seçtim
Sen en güzel yaşımdın
Canımla yarışırdın
Sana bi' dünya kurdum
Beni kimle karıştırdın
Değil kaybetmek normal (Normal)
Ben hep kazanırdım (Ben hep kazanırdım)
A-a-artık kırıldı karma
Kötüler kazandı (Kötüler kazandı)
Kızım bende öldü duygular
Bitti hislerim
Sen kazandın al kırık kalbimi
Yanında götür o yaramaz
Sana yaranmaya binbir dereden sular taşıdım
Yara kaşıdın, yar olmaz senden bana (Ah)
Senin aşkın yaramaz (Yaramaz)
Yaralanmadan yaşamak imkânsız
Geçmez asla günlerim kansız
Dinsizin hakkından gelir imansız
Masamda dansöz yaver şansım
Sensiz olmazdı ve yapamazdım
Nasıl değiştim inanamazsın
Dikenler ezdim güllere bastım
Seninle olanlar seninle kalsın
Değil kaybetmek normal (Normal)
Ben hep kazanırdım (Ben hep kazanırdım)
A-a-artık kırıldı karma
Kötüler kazandı (Kötüler kazandı)
Kızım bende öldü duygular
Bitti hislerim
Sen kazandın al kırık kalbimi
Yanında götür o yaramaz
Sana yaranmaya binbir dereden sular taşıdım
Yara kaşıdın, yar olmaz senden bana (Ah)
Senin aşkın yaramaz (Yaramaz)
Kızım bende öldü duygular
Bitti hislerim
Sen kazandın al kırık kalbimi
Yanında götür o yaramaz
Sana yaranmaya binbir dereden sular taşıdım
Yara kaşıdın, yar olmaz senden bana (Ah)
Senin aşkın yaramaz (Yaramaz)`,
  },
  {
    id: "yok_hic_adalet",
    syncedLyrics: [{"time": 3.14, "text": "Die —, damals Müşteri, jetzt fragt ihr Sohn mich nach Fotos—"}, {"time": 5.37, "text": "Sie kennt mein altes Leben, aber er mich erst seit oh, oh—"}, {"time": 7.47, "text": "Annesi eski müşterim, oğlu çekiliyo' foto"}, {"time": 9.94, "text": "O eskiden bilir, oğlu tek biliyo'dur"}, {"time": 12.51, "text": "Die Mutter damals Müşteri, jetzt fragt ihr Sohn mich nach Foto"}, {"time": 15.11, "text": "Sie kennt mein altes Leben, aber er mich erst seit oh, oh"}, {"time": 17.25, "text": "Annesi eski müşterim, oğlu çekiliyo' foto"}, {"time": 19.69, "text": "O eskiden bilir, oğlu tek biliyo'dur (Oh-oh)"}, {"time": 22.16, "text": "Früher noch untеrwegs mit Otobüs, bis jetzt schreibt mеin Bruder „Konum at“"}, {"time": 24.55, "text": "Ich komme mit ei'm otobüs, dieses Mal einer von Maybach"}, {"time": 27.23, "text": "Narco beat wie Narkotik, gib die Melo Edokaleen (Wha-what the—)"}, {"time": 30.98, "text": "(Edokaleen)"}, {"time": 31.46, "text": "Te-te-te-tetikçi"}, {"time": 31.83, "text": "Motorsiklet"}, {"time": 34.29, "text": "Silah, shoot"}, {"time": 35.3, "text": "Mach nicht auf autoritär"}, {"time": 36.76, "text": "(Ich hol' Mansur ab von G.O.P)"}, {"time": 38.19, "text": "(Aber nicht mit Taxi, Choya)"}, {"time": 39.36, "text": "(Weil er traut sich nicht zum Ort) Eh"}, {"time": 41.58, "text": "Wechsel Euro nicht zu TL, weil zahl' ab heut nur mit Amex"}, {"time": 43.66, "text": "Kommt für mich nach Istanbul, buch' nur Pegasus für Kahis"}, {"time": 46.28, "text": "Check Radisson-Residance"}, {"time": 47.97, "text": "(Ficke diese Welt, Cho, hab' mich drin verlor'n, so wollt ich's nicht)"}, {"time": 50.85, "text": "Avrupa'da Türk'üz diye yok hiç adalet"}, {"time": 52.97, "text": "Von Karadeniz bis nach Karlıova"}, {"time": 55.46, "text": "Kurden, Nafris, Türken in Europa, Hakayet"}, {"time": 58.05, "text": "Kein Mercedes, im RS mit Choya"}, {"time": 60.59, "text": "Pa-pa-pa-pa-pa, pa-pap"}, {"time": 62.8, "text": "Yamaha T-Max, Honda grün, Kawasaki"}, {"time": 65.14, "text": "Pa-pa-pa-pa-pa, pa-pap"}, {"time": 67.68, "text": "İstanbul, NRW, Cho, wir kommen auf last trip"}, {"time": 70.94, "text": "Vida loca, so normale"}, {"time": 73.1, "text": "Her gün para harcıyorum, döniyi'm normale"}, {"time": 75.83, "text": "Çakı, çakmak, tespih, nevale"}, {"time": 78.32, "text": "Burası mahalle"}, {"time": 80.44, "text": "Anne, oğlun illegaldi, oldu internasyonel"}, {"time": 82.49, "text": "Immernoch späti mit Avie, Delil, yiyo'z falafel"}, {"time": 85.27, "text": "Polis ve getto paralel"}, {"time": 86.63, "text": "Kardeşlerim hep sahnede"}, {"time": 87.92, "text": "Onlar bana \"Efsane\" der"}, {"time": 89.25, "text": "Siktim, öldü fareler"}, {"time": 90.37, "text": "Siz zero sept"}, {"time": 91.09, "text": "Hafti abi on kaset"}, {"time": 92.21, "text": "Ghetto'larda yerde pet"}, {"time": 93.22, "text": "Choya bin auf motorsiklet"}, {"time": 94.98, "text": "Tanır mahalleli, 0-6-7"}, {"time": 97.46, "text": "Turco mentalite, zu viel paranoya, deli"}, {"time": 100.02, "text": "Quatre-Cinq, zéro-neuf, new era"}, {"time": 102.15, "text": "Sokaklar dinliyor, bur'da Avie, Delil"}, {"time": 104.92, "text": "Kardeş, bu çalan \"Geldiğim Yer\""}, {"time": 107.03, "text": "Sana anlatıyor bütün polisleri"}, {"time": 108.91, "text": "Avrupa'da Türk'üz diye yok hiç adalet"}, {"time": 111.31, "text": "Von Karadeniz bis nach Karlıova"}, {"time": 113.75, "text": "Kurden, Nafris, Türken in Europa, Hakayet"}, {"time": 116.33, "text": "Kein Mercedes, im RS mit Choya"}, {"time": 118.67, "text": "Pa-pa-pa-pa-pa, pa-pap"}, {"time": 121, "text": "Yamaha T-Max, Honda Grün, Kawasaki"}, {"time": 123.44, "text": "Pa-pa-pa-pa-pa, pa-pap"}, {"time": 125.87, "text": "İstanbul, NRW, Cho, wir kommen auf last trip"}],
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
    lyrics: `Die —, damals Müşteri, jetzt fragt ihr Sohn mich nach Fotos—
Sie kennt mein altes Leben, aber er mich erst seit oh, oh—
Annesi eski müşterim, oğlu çekiliyo' foto
O eskiden bilir, oğlu tek biliyo'dur
Die Mutter damals Müşteri, jetzt fragt ihr Sohn mich nach Foto
Sie kennt mein altes Leben, aber er mich erst seit oh, oh
Annesi eski müşterim, oğlu çekiliyo' foto
O eskiden bilir, oğlu tek biliyo'dur (Oh-oh)
Früher noch untеrwegs mit Otobüs, bis jetzt schreibt mеin Bruder „Konum at“
Ich komme mit ei'm otobüs, dieses Mal einer von Maybach
Narco beat wie Narkotik, gib die Melo Edokaleen (Wha-what the—)
(Edokaleen)
Te-te-te-tetikçi
Motorsiklet
Silah, shoot
Mach nicht auf autoritär
(Ich hol' Mansur ab von G.O.P)
(Aber nicht mit Taxi, Choya)
(Weil er traut sich nicht zum Ort) Eh
Wechsel Euro nicht zu TL, weil zahl' ab heut nur mit Amex
Kommt für mich nach Istanbul, buch' nur Pegasus für Kahis
Check Radisson-Residance
(Ficke diese Welt, Cho, hab' mich drin verlor'n, so wollt ich's nicht)
Avrupa'da Türk'üz diye yok hiç adalet
Von Karadeniz bis nach Karlıova
Kurden, Nafris, Türken in Europa, Hakayet
Kein Mercedes, im RS mit Choya
Pa-pa-pa-pa-pa, pa-pap
Yamaha T-Max, Honda grün, Kawasaki
Pa-pa-pa-pa-pa, pa-pap
İstanbul, NRW, Cho, wir kommen auf last trip
Vida loca, so normale
Her gün para harcıyorum, döniyi'm normale
Çakı, çakmak, tespih, nevale
Burası mahalle
Anne, oğlun illegaldi, oldu internasyonel
Immernoch späti mit Avie, Delil, yiyo'z falafel
Polis ve getto paralel
Kardeşlerim hep sahnede
Onlar bana "Efsane" der
Siktim, öldü fareler
Siz zero sept
Hafti abi on kaset
Ghetto'larda yerde pet
Choya bin auf motorsiklet
Tanır mahalleli, 0-6-7
Turco mentalite, zu viel paranoya, deli
Quatre-Cinq, zéro-neuf, new era
Sokaklar dinliyor, bur'da Avie, Delil
Kardeş, bu çalan "Geldiğim Yer"
Sana anlatıyor bütün polisleri
Avrupa'da Türk'üz diye yok hiç adalet
Von Karadeniz bis nach Karlıova
Kurden, Nafris, Türken in Europa, Hakayet
Kein Mercedes, im RS mit Choya
Pa-pa-pa-pa-pa, pa-pap
Yamaha T-Max, Honda Grün, Kawasaki
Pa-pa-pa-pa-pa, pa-pap
İstanbul, NRW, Cho, wir kommen auf last trip`,
  },
  {
    id: "brapap2",
    syncedLyrics: [{"time": 3.66, "text": "Brra-pa-pa-ra-pa-pa-ra-pa"}, {"time": 5.24, "text": "(E-Edokaleen)"}, {"time": 6.09, "text": "(yaparsovunuenes)"}, {"time": 7.39, "text": "Alles okay, okay, ekip tamam"}, {"time": 9.15, "text": "Dört kişi, dört maske, yola devam"}, {"time": 11.15, "text": "Getto fenomen, made in Gop, baba"}, {"time": 13.05, "text": "Bu sene şampiyon biziz, at fav'a"}, {"time": 14.9, "text": "Sanki 2000'ler Barack Obama"}, {"time": 16.66, "text": "Siz ikiniz, ben tek, geçelim odama"}, {"time": 18.57, "text": "Attım jürilerin pabucu dama"}, {"time": 20.38, "text": "Puanı verirler anca kafama"}, {"time": 22.66, "text": "A-a-amına koyi'm, artist, Spotify"}, {"time": 24.64, "text": "Malatyalı Kürdî oldu sportboy"}, {"time": 26.77, "text": "0-067 kanak'e koştur"}, {"time": 28.29, "text": "İba'ash yunus, yemin, dünya boştur"}, {"time": 30.02, "text": "Turkish boy, rakı ve karpuz"}, {"time": 31.99, "text": "Sıfırdan yüze, Eray ve Mansur"}, {"time": 33.86, "text": "Jungle gözler açık, ekip aktif"}, {"time": 35.77, "text": "Sen bizi iyi tanıyo'sun (Ah, ah, ah-ah)"}, {"time": 37.65, "text": "Sürekli adrenalin, taşa döndü yüreğim"}, {"time": 42.52, "text": "Hayatım bi' macera, son tatilin ilk günündeyim"}, {"time": 45.95, "text": "Cha-Cha-Champions League brapap, iki kere iki brapap"}, {"time": 50.05, "text": "Yarıştayız her gün brapap, brapap, brapap (N'oluyo' lan?)"}, {"time": 54.41, "text": "Konuşuyo' denyo, hepinize mothеrfuck"}, {"time": 56.54, "text": "Sizin ekip kadar bendeki malafat"}, {"time": 58.48, "text": "İki kеre iki dört, yine mi \"Brapap\"?"}, {"time": 60.28, "text": "Bana laf yapma lan, Fate Fat gibiyim"}, {"time": 62.23, "text": "Kulakta \"Bizik\", kafamda çizik"}, {"time": 63.91, "text": "Mercedes'ten formayla iniyorum"}, {"time": 65.61, "text": "Selam, kızlar, çok fena fizik"}, {"time": 67.22, "text": "Aldım kilo çünkü param var, yiyorum"}, {"time": 69.05, "text": "Gülüyorum piçlere he-he, he-he"}, {"time": 71.07, "text": "Bi' kere daha he-he, he-he"}, {"time": 72.9, "text": "Emanet bele, he-he, he-he"}, {"time": 74.75, "text": "Siz bana hiçbi' şey yapamazsınız (Siktirin gidin lan bur'dan)"}, {"time": 77.81, "text": "Batu, Esenler'den hareket"}, {"time": 79.02, "text": "ERAY067, hareket"}, {"time": 80.87, "text": "Mansur, Gop City'den hareket"}, {"time": 82.77, "text": "Ner'deysen beş dak'kaya or'dayım"}, {"time": 84.61, "text": "Batuflex değil bi' rol model"}, {"time": 86.4, "text": "Yeni arabam Porsche, son model"}, {"time": 88.62, "text": "Konum Hilton Hotel, hızlı ticaret sanki Lionel"}, {"time": 90.11, "text": "On altıda tezgahta, dedim \"Mama I'm criminal\""}, {"time": 95.43, "text": "Hayalimdi G kasa, yirmi altıda milyoner"}, {"time": 98.73, "text": "La-la-la-la-la-le"}, {"time": 100.37, "text": "Ba-Ba-Batuflex sahada N'Golo Kanté"}, {"time": 102.16, "text": "34 plaka, İstanbul av'cumun içi, tüm ekibim trafficante (Batuflex)"}, {"time": 106.03, "text": "Batuflex in the club, pa-paslar tiki, tiki-tak"}, {"time": 110.23, "text": "Eray, Mansur, Organize, ekip, tamam, sindikat"}, {"time": 115.2, "text": "Sürekli adrenalin, taşa döndü yüreğim"}, {"time": 119.49, "text": "Hayatım bi' macera, son tatilin ilk günündeyim"}, {"time": 122.26, "text": "Cha-Cha-Champions League brapap, iki kere iki brapap"}, {"time": 126.32, "text": "Yarıştayız her gün brapap, brapap, brapap"}, {"time": 131.03, "text": "Brrap-pa-pa-pa"}, {"time": 133.34, "text": "(A-A-A-A-A-A-A-A-Alo?)"}],
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
    lyrics: `Brra-pa-pa-ra-pa-pa-ra-pa
(E-Edokaleen)
(yaparsovunuenes)
Alles okay, okay, ekip tamam
Dört kişi, dört maske, yola devam
Getto fenomen, made in Gop, baba
Bu sene şampiyon biziz, at fav'a
Sanki 2000'ler Barack Obama
Siz ikiniz, ben tek, geçelim odama
Attım jürilerin pabucu dama
Puanı verirler anca kafama
A-a-amına koyi'm, artist, Spotify
Malatyalı Kürdî oldu sportboy
0-067 kanak'e koştur
İba'ash yunus, yemin, dünya boştur
Turkish boy, rakı ve karpuz
Sıfırdan yüze, Eray ve Mansur
Jungle gözler açık, ekip aktif
Sen bizi iyi tanıyo'sun (Ah, ah, ah-ah)
Sürekli adrenalin, taşa döndü yüreğim
Hayatım bi' macera, son tatilin ilk günündeyim
Cha-Cha-Champions League brapap, iki kere iki brapap
Yarıştayız her gün brapap, brapap, brapap (N'oluyo' lan?)
Konuşuyo' denyo, hepinize mothеrfuck
Sizin ekip kadar bendeki malafat
İki kеre iki dört, yine mi "Brapap"?
Bana laf yapma lan, Fate Fat gibiyim
Kulakta "Bizik", kafamda çizik
Mercedes'ten formayla iniyorum
Selam, kızlar, çok fena fizik
Aldım kilo çünkü param var, yiyorum
Gülüyorum piçlere he-he, he-he
Bi' kere daha he-he, he-he
Emanet bele, he-he, he-he
Siz bana hiçbi' şey yapamazsınız (Siktirin gidin lan bur'dan)
Batu, Esenler'den hareket
ERAY067, hareket
Mansur, Gop City'den hareket
Ner'deysen beş dak'kaya or'dayım
Batuflex değil bi' rol model
Yeni arabam Porsche, son model
Konum Hilton Hotel, hızlı ticaret sanki Lionel
On altıda tezgahta, dedim "Mama I'm criminal"
Hayalimdi G kasa, yirmi altıda milyoner
La-la-la-la-la-le
Ba-Ba-Batuflex sahada N'Golo Kanté
34 plaka, İstanbul av'cumun içi, tüm ekibim trafficante (Batuflex)
Batuflex in the club, pa-paslar tiki, tiki-tak
Eray, Mansur, Organize, ekip, tamam, sindikat
Sürekli adrenalin, taşa döndü yüreğim
Hayatım bi' macera, son tatilin ilk günündeyim
Cha-Cha-Champions League brapap, iki kere iki brapap
Yarıştayız her gün brapap, brapap, brapap
Brrap-pa-pa-pa
(A-A-A-A-A-A-A-A-Alo?)`,
  },
  {
    id: "burada_sokaklar",
    syncedLyrics: [{"time": 3.41, "text": "(ya-ya-ya-yaparsovunuenes)"}, {"time": 8.91, "text": "Burada sokaklar fazlaca dar, kovalar memurlar"}, {"time": 13.18, "text": "Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)"}, {"time": 17.74, "text": "Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar (Ah)"}, {"time": 22.34, "text": "Ben de istemezdim, buna mecburlar ama, bebek, anla"}, {"time": 27.16, "text": "Ben beni öldür'cek bi' silahlayım"}, {"time": 29.14, "text": "Sanki hiç istemedin beni anlamayı"}, {"time": 31.61, "text": "Yoruldum, sırtımı sana yasladım"}, {"time": 33.69, "text": "Sen düşünmedin, yaktın beni cayır cayır"}, {"time": 36.1, "text": "İçimde bi' yerde hâlâ sen, gözüm hep seni görüyo'"}, {"time": 38.95, "text": "N'apıyım, sen söyle, seni cebimde mi saklasam?"}, {"time": 42.09, "text": "Başım çok deli dönüyo'"}, {"time": 43.6, "text": "Ner'desin sen? Söyle"}, {"time": 45.73, "text": "Bize \"Koştur\" dedi mahalle"}, {"time": 47.16, "text": "Koşturdum, daha ne? Paket oldu hayaller"}, {"time": 50, "text": "(Hayat) Hayat illegale"}, {"time": 51.68, "text": "Şarkılarım yaktı semtimde caddeler"}, {"time": 54.72, "text": "Burada sokaklar fazlaca dar, kovalar memurlar (Uh)"}, {"time": 59.04, "text": "Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)"}, {"time": 63.5, "text": "Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar (Ah)"}, {"time": 68.12, "text": "Ben de istemezdim, buna mecburlar ama, bebek, anla (Uh)"}, {"time": 72.87, "text": "Yalnız kaldım, bebe, anlayamadın beni"}, {"time": 75.03, "text": "Geceleri rüyamda hep görüyorum seni"}, {"time": 77.52, "text": "Bi' rastlamadın bana, tanıyamadın kalbimi"}, {"time": 79.57, "text": "Acaba kim tutuyo' şu anda ellerini?"}, {"time": 81.84, "text": "Sen ve ben ters, serseriler de sever"}, {"time": 84.17, "text": "İstiyoruz papel, para gelir güçten"}, {"time": 86.46, "text": "Kontak ve trafik, bunlar elimden gelen"}, {"time": 88.73, "text": "Sevgimi gösteremem, bu göremediğimden"}, {"time": 91.16, "text": "Elimdeki silah doluydu, kafama doğruldu"}, {"time": 93.78, "text": "Tüm yanlışların içindeki tek doğruydun"}, {"time": 96.29, "text": "Bardağımı viskiyle doldurdum"}, {"time": 99.46, "text": "Yerini doldurdum (Uh)"}, {"time": 102.83, "text": "Burada sokaklar fazlaca dar, kovalar memurlar (Uh)"}, {"time": 107.03, "text": "Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)"}, {"time": 111.79, "text": "Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar"}, {"time": 116.34, "text": "Ben de istemezdim, buna mecburlar ama, bebek, anla"}, {"time": 126.34, "text": "(Narco, wha-what the—)"}],
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
    lyrics: `(ya-ya-ya-yaparsovunuenes)
Burada sokaklar fazlaca dar, kovalar memurlar
Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)
Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar (Ah)
Ben de istemezdim, buna mecburlar ama, bebek, anla
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
(Hayat) Hayat illegale
Şarkılarım yaktı semtimde caddeler
Burada sokaklar fazlaca dar, kovalar memurlar (Uh)
Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)
Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar (Ah)
Ben de istemezdim, buna mecburlar ama, bebek, anla (Uh)
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
Yerini doldurdum (Uh)
Burada sokaklar fazlaca dar, kovalar memurlar (Uh)
Kekem kovalar, fazlaca para lazım, buna mecburlar (Uh)
Bi'çoğumuzda yas var, gözümüzde yaş, düştü saçıma aklar
Ben de istemezdim, buna mecburlar ama, bebek, anla
(Narco, wha-what the—)`,
  },
  {
    id: "ihtiyac_yok_otele",
    syncedLyrics: [{"time": 7.35, "text": "(M61, woah)"}, {"time": 10.5, "text": "(Uh)"}, {"time": 15.97, "text": "Tüm gece gözler açık"}, {"time": 17.07, "text": "Benz'in üstü açık, ihtiyaç yok otele"}, {"time": 19.26, "text": "(Uh)"}, {"time": 19.96, "text": "En yakın arkadaşım, o benim sırdaşım"}, {"time": 22.04, "text": "Onu değişmem ele"}, {"time": 22.86, "text": "(Uh)"}, {"time": 23.71, "text": "Endişelenme, beni düşünme"}, {"time": 25.49, "text": "Günün sonunda gelice'm yanına"}, {"time": 26.87, "text": "(Uh-ah)"}, {"time": 27.47, "text": "Beni arama"}, {"time": 28.84, "text": "İki kadeh içince zaten sen geliyo'sun yanıma-a-a"}, {"time": 32.26, "text": "Ben yazarken ağladım, sen dinlerken ağlama"}, {"time": 35.13, "text": "Dile kolay üç senemi harcadım"}, {"time": 37.53, "text": "Kalan ömrümü de harcarım, sana feda"}, {"time": 38.29, "text": "(Uh)"}, {"time": 39.1, "text": "Hep elveda, yüzümüz gülmedi aşktan yana"}, {"time": 42.95, "text": "Mutlu görünse de mutsuz resimler"}, {"time": 44.81, "text": "Yaralar oldu yanıma kalan"}, {"time": 46.89, "text": "(Uh)"}, {"time": 50.2, "text": "Yaralar var ve yeni değil"}, {"time": 51.54, "text": "(Uh)"}, {"time": 52.73, "text": "İstanbul, seni yeneceğim"}, {"time": 55.99, "text": "Anlatırdım da yeri değil"}, {"time": 58.62, "text": "(Uh)"}, {"time": 59.76, "text": "Bi' kadına mı yenileceğim?"}, {"time": 61.5, "text": "Delale, götürdün aklımı başımdan"}, {"time": 64.77, "text": "Söyle, delale"}, {"time": 66.9, "text": "Kaldım yalnız şu yaşımda, söyle"}, {"time": 69.18, "text": "Ne hâle geldik, perişane"}, {"time": 71.21, "text": "(Uh-uh)"}, {"time": 72.52, "text": "Oldu mu, delale?"}, {"time": 75.06, "text": "Delale (De-de-delale)"}, {"time": 77.07, "text": "Delale, durumlar sakat"}, {"time": 78.95, "text": "Bak, dizlerimde kalmadı takat"}, {"time": 80.95, "text": "(Uh-uh)"}, {"time": 81.95, "text": "Gözlerimde yaşlarım fakat"}, {"time": 82.92, "text": "(Uh)"}, {"time": 83.55, "text": "Gelmeyeceksin, anladım, tamam"}, {"time": 84.7, "text": "(Ah)"}, {"time": 84.94, "text": "Beni vur, beni bırakma burada"}, {"time": 86.37, "text": "(Ah)"}, {"time": 86.57, "text": "Sensiz bu şehir karanlık, bebeğim"}, {"time": 88.46, "text": "Bazen kendimi izliyorum aynada"}, {"time": 90.33, "text": "Uzaklaştım ve yaşlandım epey"}, {"time": 91.43, "text": "Yan yana yanalım bu cehennemde"}, {"time": 94.58, "text": "Gel benimle, hadi"}, {"time": 96.19, "text": "Sanma da biter bu hırsım"}, {"time": 98.17, "text": "Benim günahlarımdan kalelerim var"}, {"time": 101.27, "text": "\"Gülüm\" dedim, dikenlerini serdin yollarıma"}, {"time": 103.85, "text": "Vakit dar"}, {"time": 105.03, "text": "Ve sadece canım var"}, {"time": 110.03, "text": "Yaralar var ve yeni değil"}, {"time": 112.43, "text": "(Uh)"}, {"time": 114.2, "text": "İstanbul, seni yeneceğim"}, {"time": 117.49, "text": "Anlatırdım da yeri değil"}, {"time": 120.04, "text": "(Uh)"}, {"time": 121.81, "text": "Bi' kadına mı yenileceğim?"}, {"time": 122.97, "text": "Delale, götürdün aklımı başımdan"}, {"time": 126.36, "text": "Söyle, delale"}, {"time": 128.55, "text": "Kaldım yalnız şu yaşımda, söyle"}, {"time": 130.72, "text": "Ne hâle geldik, perişane"}, {"time": 132.49, "text": "(Uh-uh)"}, {"time": 134.19, "text": "Oldu mu, delale?"}, {"time": 136.42, "text": "Delale"}, {"time": 140.4, "text": "(Ya-yaparsovunuenes)"}, {"time": 141.82, "text": "(Uh) (Uh) (Uh)"}],
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
    syncedLyrics: [{"time": 12.14, "text": "(E-Edokaleen)"}, {"time": 13.91, "text": "(yaparsovunuenes)"}, {"time": 15.7, "text": "Kaçtım da geldim polislerden (Ah)"}, {"time": 18.04, "text": "Cebimde sana hediyem vardı"}, {"time": 19.77, "text": "Bayağıdır uzaktım bu hislerden (Ah)"}, {"time": 21.76, "text": "Diğer cepte yaralar vardı"}, {"time": 23.51, "text": "Delikanlı adam ne ister ki?"}, {"time": 25.5, "text": "Yanımda sadece kalbim, gördün"}, {"time": 28.11, "text": "Sensiz olamam, dünya yansın, seni isterdim (Ah)"}, {"time": 31.73, "text": "Sen, ben, ters, baby"}, {"time": 32.73, "text": "Fast life, lazım Mercedes, baby"}, {"time": 35.32, "text": "Sevmek kim, sen kimsin?"}, {"time": 36.98, "text": "Bana \"Kalbin taştan\" deme"}, {"time": 38.4, "text": "Yarattın sorunlar"}, {"time": 39.73, "text": "Fark ettim, benimle zorun var"}, {"time": 41.78, "text": "Seninle artık yaşayamam, ah"}, {"time": 45.6, "text": "Çok ağladım, sesimi sana duyuramadım"}, {"time": 49.21, "text": "Gözümün önünden geçiyo' bütün anılarım"}, {"time": 52.78, "text": "Ben-ben bugün uyumadım, karmaşık tüm duygularım"}, {"time": 56.91, "text": "Adını sayıkladım, bana bi' kez sarılmadın"}, {"time": 61.35, "text": "Benden bu ömrümü çalanı getir (Uh-uh)"}, {"time": 63.53, "text": "Hat'rın kalmadı, var hasretin (Ah)"}, {"time": 65.66, "text": "Senden kalanlar bana nedir? (Uh-uh)"}, {"time": 67.4, "text": "Gözyaşlarım altında şu maskenin (Uh)"}, {"time": 69.36, "text": "Çocuğumuz olacaktı, güzelliği senden, huyları benden (Ah-ah)"}, {"time": 73.12, "text": "Güneşim doğacaktı, yalan olduk mutlu oluca'z derken (Ah)"}, {"time": 76.39, "text": "Yarattın sorunlar"}, {"time": 78, "text": "Fark ettim, benimle zorun var"}, {"time": 79.88, "text": "Seninle artık yaşayamam, ah"}, {"time": 83.72, "text": "Çok ağladım, sesimi sana duyuramadım"}, {"time": 87.14, "text": "Gözümün önünden geçiyo' bütün anılarım"}, {"time": 90.87, "text": "Ben-ben bugün uyumadım, karmaşık tüm duygularım"}, {"time": 94.92, "text": "Adını sayıkladım, bana bi' kez sarılmadın (Uh)"}, {"time": 101.67, "text": "(Narco, what-what the—)"}],
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
(yaparsovunuenes)
Kaçtım da geldim polislerden (Ah)
Cebimde sana hediyem vardı
Bayağıdır uzaktım bu hislerden (Ah)
Diğer cepte yaralar vardı
Delikanlı adam ne ister ki?
Yanımda sadece kalbim, gördün
Sensiz olamam, dünya yansın, seni isterdim (Ah)
Sen, ben, ters, baby
Fast life, lazım Mercedes, baby
Sevmek kim, sen kimsin?
Bana "Kalbin taştan" deme
Yarattın sorunlar
Fark ettim, benimle zorun var
Seninle artık yaşayamam, ah
Çok ağladım, sesimi sana duyuramadım
Gözümün önünden geçiyo' bütün anılarım
Ben-ben bugün uyumadım, karmaşık tüm duygularım
Adını sayıkladım, bana bi' kez sarılmadın
Benden bu ömrümü çalanı getir (Uh-uh)
Hat'rın kalmadı, var hasretin (Ah)
Senden kalanlar bana nedir? (Uh-uh)
Gözyaşlarım altında şu maskenin (Uh)
Çocuğumuz olacaktı, güzelliği senden, huyları benden (Ah-ah)
Güneşim doğacaktı, yalan olduk mutlu oluca'z derken (Ah)
Yarattın sorunlar
Fark ettim, benimle zorun var
Seninle artık yaşayamam, ah
Çok ağladım, sesimi sana duyuramadım
Gözümün önünden geçiyo' bütün anılarım
Ben-ben bugün uyumadım, karmaşık tüm duygularım
Adını sayıkladım, bana bi' kez sarılmadın (Uh)
(Narco, what-what the—)`,
  },
  {
    id: "sifir_yuz",
    syncedLyrics: [{"time": 4.87, "text": "(Komm' von nichts zu starten direkt null auf hundert)"}, {"time": 10.67, "text": "(Narco, wha-what the fuck)"}, {"time": 12.61, "text": "(DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta)"}, {"time": 17.07, "text": "Woulad l'Gourba"}, {"time": 18.93, "text": "Komm' von nichts zu starten direkt null auf hundert"}, {"time": 22.41, "text": "Versorg' Traffic regelmäßig, wieder Kundschaft"}, {"time": 25.69, "text": "DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta"}, {"time": 31.48, "text": "On beş yaşından beridir mahalle"}, {"time": 33.52, "text": "Choya, her günümüz karnavale"}, {"time": 35.29, "text": "Haftada bi' gün verir ifade"}, {"time": 37.02, "text": "Ne kadar kaçsan da yakanda lanet"}, {"time": 38.63, "text": "Denedim, yok ama limit"}, {"time": 40.01, "text": "Bütün geçmişimi kafandan silip"}, {"time": 41.7, "text": "Yıllarca taşıdım göğsümde izi"}, {"time": 43.4, "text": "Değmezmişsiniz, tanıdım sizi"}, {"time": 45.64, "text": "K-k-kardeş Afrik', TN klasik"}, {"time": 47.05, "text": "Fethet'ce'm İstanbul'u, değilim Fatih"}, {"time": 49.14, "text": "Yerim pak bugün, yarın Paris"}, {"time": 51.11, "text": "Choya, inan bana, yok hiç tatil"}, {"time": 52.88, "text": "Helal yok, hepsi haram"}, {"time": 54.39, "text": "Yalanlarla doldu kumbaram"}, {"time": 56.11, "text": "Sadakatla geldik buralara"}, {"time": 57.93, "text": "Yeminim barrio valla, valla"}, {"time": 59.63, "text": "Woulad l'Gourba"}, {"time": 61.4, "text": "Komm' von nichts zu starten direkt null auf hundert"}, {"time": 64.82, "text": "Versorg' Traffic regelmäßig, wieder Kundschaft"}, {"time": 68.47, "text": "DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta (DZ, DZ, rrh)"}, {"time": 74.6, "text": "International, Türko, Maroc, Algerian"}, {"time": 77.88, "text": "Trikot Inter Mailand Taïder"}, {"time": 79.58, "text": "Raus aus Gourba, zu tief gefang'n"}, {"time": 81.56, "text": "Für Dirhams über Playa mit Speedboat"}, {"time": 83.38, "text": "Geldgedanken schon als Bambino"}, {"time": 84.72, "text": "Damals kackten ab, Cho, in Spielos"}, {"time": 86.69, "text": "Heute jag' mit– die Million"}, {"time": 88.53, "text": "Über Fähre, Tunsi, Italia"}, {"time": 90.36, "text": "Transport batata"}, {"time": 92.21, "text": "Beydak a7la, Choya ist 8aliya"}, {"time": 94.37, "text": "Cho, über Matar"}, {"time": 95.67, "text": "Schmuggelt Ware im Valise"}, {"time": 97.41, "text": "Maghrebi-Mentaliät"}, {"time": 99.42, "text": "Alger, Türko, Maruecco"}, {"time": 101.27, "text": "Leben heut Star, ist Normalität"}, {"time": 102.94, "text": "Woulad l'Gourba"}, {"time": 104.49, "text": "Komm' von nichts zu starten direkt null auf hundert"}, {"time": 107.8, "text": "Versorg' Traffic regelmäßig, wieder Kundschaft"}, {"time": 111.54, "text": "DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta"}, {"time": 117.24, "text": "Woulad l'Gourba"}, {"time": 118.87, "text": "Komm' von nichts zu starten direkt null auf hundert"}, {"time": 122.64, "text": "Versorg' Traffic regelmäßig, wieder Kundschaft"}, {"time": 126.03, "text": "DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta"}],
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
    lyrics: `(Komm' von nichts zu starten direkt null auf hundert)
(Narco, wha-what the fuck)
(DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta)
Woulad l'Gourba
Komm' von nichts zu starten direkt null auf hundert
Versorg' Traffic regelmäßig, wieder Kundschaft
DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta
On beş yaşından beridir mahalle
Choya, her günümüz karnavale
Haftada bi' gün verir ifade
Ne kadar kaçsan da yakanda lanet
Denedim, yok ama limit
Bütün geçmişimi kafandan silip
Yıllarca taşıdım göğsümde izi
Değmezmişsiniz, tanıdım sizi
K-k-kardeş Afrik', TN klasik
Fethet'ce'm İstanbul'u, değilim Fatih
Yerim pak bugün, yarın Paris
Choya, inan bana, yok hiç tatil
Helal yok, hepsi haram
Yalanlarla doldu kumbaram
Sadakatla geldik buralara
Yeminim barrio valla, valla
Woulad l'Gourba
Komm' von nichts zu starten direkt null auf hundert
Versorg' Traffic regelmäßig, wieder Kundschaft
DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta (DZ, DZ, rrh)
International, Türko, Maroc, Algerian
Trikot Inter Mailand Taïder
Raus aus Gourba, zu tief gefang'n
Für Dirhams über Playa mit Speedboat
Geldgedanken schon als Bambino
Damals kackten ab, Cho, in Spielos
Heute jag' mit– die Million
Über Fähre, Tunsi, Italia
Transport batata
Beydak a7la, Choya ist 8aliya
Cho, über Matar
Schmuggelt Ware im Valise
Maghrebi-Mentaliät
Alger, Türko, Maruecco
Leben heut Star, ist Normalität
Woulad l'Gourba
Komm' von nichts zu starten direkt null auf hundert
Versorg' Traffic regelmäßig, wieder Kundschaft
DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta
Woulad l'Gourba
Komm' von nichts zu starten direkt null auf hundert
Versorg' Traffic regelmäßig, wieder Kundschaft
DZ, 7araga, mach Arwena nur für Umsatz und bezahl' Shurta`,
  },
  {
    id: "balmain",
    syncedLyrics: [{"time": 7.79, "text": "Yırtık pantolon Balmain"}, {"time": 8.84, "text": "Oğlum, ne yaptığımı da sormayın, he"}, {"time": 10.83, "text": "Maradona'dan formayım"}, {"time": 12.26, "text": "Bi’ daha, bi' daha, bi' daha, bi’ daha, bi' daha"}, {"time": 14.89, "text": "Waxy, bi' daha ver kaydı (Faça)"}, {"time": 16.01, "text": "Yırtık pantolon Balmain"}, {"time": 17.3, "text": "Oğlum, ne yaptığımı da sormayın, he"}, {"time": 19.27, "text": "Maradona'dan formayım"}, {"time": 20.87, "text": "On numara taşak, baba, formdayım, he"}, {"time": 22.56, "text": "Gördüm yüzünü, şoktayım, he, ben"}, {"time": 24.16, "text": "Gördüm ben bütün topları, he"}, {"time": 25.8, "text": "Sıktın havaya kovanları sen"}, {"time": 27.51, "text": "Barut kokmuyo', toplayın, he"}, {"time": 29.07, "text": "Hep üç kişiden fazlayız, canım, ama değiliz çete, çete"}, {"time": 32.29, "text": "İstanbul, Berlin, or'dan Bodrum, gelir avrodan keke keke"}, {"time": 35.67, "text": "Konuşur bütün itler, geldim ben buralara ite ite"}, {"time": 38.91, "text": "Baba da benim paşa da benim, kabul edice'n sike sike"}, {"time": 42.19, "text": "İmzalar yeni, \"¡Hala Madrid\", bağır fanlara \"Así, así\""}, {"time": 45.4, "text": "Benim hasımlar çok konuşur, ben de hepsine basi'm, basi’m"}, {"time": 48.73, "text": "Atara gidеr, basar ve gider, fazla zıplayan pazara gider"}, {"time": 52, "text": "Araya girеn araya gider, kurallar bayağı basit, basit"}, {"time": 55.27, "text": "Kurallar bayağı basit, basit"}, {"time": 56.99, "text": "Oldular bize fanatik"}, {"time": 58.73, "text": "Ayaklarda Asics, Asics"}, {"time": 60.25, "text": "Duramam ben, daha değil"}, {"time": 61.94, "text": "Kurallar basit, es, es"}, {"time": 63.58, "text": "Like Philip Morris, he, he"}, {"time": 65.21, "text": "Altımda moto’, es, es"}, {"time": 66.92, "text": "Peşimde polis, he, he"}, {"time": 70.16, "text": "Merak edersen test et"}, {"time": 71.7, "text": "İbne, tek ya da ekibinle (Pow)"}, {"time": 72.96, "text": "Oynat kızları klibinde"}, {"time": 74.46, "text": "Çünkü bi' tek orada siz’le"}, {"time": 76.25, "text": "Mermiler bedava, bon appétit"}, {"time": 78.21, "text": "Vallah \"Yemezler\" deme, yersin"}, {"time": 79.66, "text": "Top one benim, izleyeceksin"}, {"time": 81.24, "text": "Sen de o sahneden ineceksin (Pat)"}, {"time": 84.1, "text": "Her-her-her kombinimde Air Max"}, {"time": 85.75, "text": "Kavgaya giderken onu bağlıyorum"}, {"time": 87.5, "text": "0-6-7 fenomen"}, {"time": 89.02, "text": "Artık fanlara foto dağıtıyorum"}, {"time": 90.92, "text": "Yaptım eşofman koleksiyon"}, {"time": 92.74, "text": "Verdim dünkü sevgilime yol"}, {"time": 93.86, "text": "Patron bile hissetmiyo' patron"}, {"time": 95.56, "text": "Bizi dinliyo' yeni jenerasyon"}, {"time": 97.65, "text": "Kurallar bayağı basit, basit"}, {"time": 99.35, "text": "Oldular bize fanatik"}, {"time": 100.93, "text": "Ayaklarda Asics, Asics"}, {"time": 102.56, "text": "Duramam ben, daha değil"}, {"time": 104.27, "text": "Kurallar basit, es, es"}, {"time": 105.8, "text": "Like Philip Morris, he, he"}, {"time": 107.53, "text": "Altımda moto', es, es"}, {"time": 109.22, "text": "Peşimde polis, he, he"}, {"time": 114.15, "text": "(yaparsovunu—)"}],
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
Bi’ daha, bi' daha, bi' daha, bi’ daha, bi' daha
Waxy, bi' daha ver kaydı (Faça)
Yırtık pantolon Balmain
Oğlum, ne yaptığımı da sormayın, he
Maradona'dan formayım
On numara taşak, baba, formdayım, he
Gördüm yüzünü, şoktayım, he, ben
Gördüm ben bütün topları, he
Sıktın havaya kovanları sen
Barut kokmuyo', toplayın, he
Hep üç kişiden fazlayız, canım, ama değiliz çete, çete
İstanbul, Berlin, or'dan Bodrum, gelir avrodan keke keke
Konuşur bütün itler, geldim ben buralara ite ite
Baba da benim paşa da benim, kabul edice'n sike sike
İmzalar yeni, "¡Hala Madrid", bağır fanlara "Así, así"
Benim hasımlar çok konuşur, ben de hepsine basi'm, basi’m
Atara gidеr, basar ve gider, fazla zıplayan pazara gider
Araya girеn araya gider, kurallar bayağı basit, basit
Kurallar bayağı basit, basit
Oldular bize fanatik
Ayaklarda Asics, Asics
Duramam ben, daha değil
Kurallar basit, es, es
Like Philip Morris, he, he
Altımda moto’, es, es
Peşimde polis, he, he
Merak edersen test et
İbne, tek ya da ekibinle (Pow)
Oynat kızları klibinde
Çünkü bi' tek orada siz’le
Mermiler bedava, bon appétit
Vallah "Yemezler" deme, yersin
Top one benim, izleyeceksin
Sen de o sahneden ineceksin (Pat)
Her-her-her kombinimde Air Max
Kavgaya giderken onu bağlıyorum
0-6-7 fenomen
Artık fanlara foto dağıtıyorum
Yaptım eşofman koleksiyon
Verdim dünkü sevgilime yol
Patron bile hissetmiyo' patron
Bizi dinliyo' yeni jenerasyon
Kurallar bayağı basit, basit
Oldular bize fanatik
Ayaklarda Asics, Asics
Duramam ben, daha değil
Kurallar basit, es, es
Like Philip Morris, he, he
Altımda moto', es, es
Peşimde polis, he, he
(yaparsovunu—)`,
  },
  {
    id: "sorma",
    syncedLyrics: [{"time": 16.71, "text": "Su gibi akar saniyeler"}, {"time": 18, "text": "Benim kafamda dönüyo'sun sadece sen"}, {"time": 20.23, "text": "Seni dün dört duvarda katil eden"}, {"time": 22.07, "text": "Döner arkasını ve seni takip eder"}, {"time": 24.22, "text": "Bi' gün beni vurabil'ceğini tahmin ederdim"}, {"time": 26.8, "text": "Ama dedim ki \"Yok, daha neler\""}, {"time": 28.63, "text": "Çocuk, \"Bana bi' şey olmaz\" deme"}, {"time": 30.25, "text": "Annen gözyaşı dökerse çok fark eder (O-o-oh)"}, {"time": 32.22, "text": "Rüzgâr gibi seneler, çok değiştim"}, {"time": 34.36, "text": "İstemeden olsa da pislikleştim (A-ah, o-oh)"}, {"time": 36.52, "text": "Gide gele kalbimden hissizleştin (A-ah)"}, {"time": 38.58, "text": "Başkaydın ama sen herkesleştin (O-o-o-o-oh)"}, {"time": 40.43, "text": "Ne yaptıysam olmadı neyse geçtim"}, {"time": 42.42, "text": "Edindik tecrübe neyse gençtim"}, {"time": 44.63, "text": "Beni senden iten bi' şey vardı"}, {"time": 46.61, "text": "Ama ben yine de seni seçtim (U-u-uh)"}, {"time": 48.02, "text": "Bi' savaşın içindeydim, kimin kazandığını sorma (A-ah, o-oh)"}, {"time": 51.89, "text": "O savaştan çıktım, nasıl olduğumu sorma (A-ah, o-o-o-o-o-oh)"}, {"time": 54.02, "text": "Belki de vuran sendin ama fark etmez daha"}, {"time": 59.53, "text": "\"Kurtuldum\" derken kayboldum günahlarımla"}, {"time": 64.12, "text": "Bi' savaşın içindeydim, kimin kazandığını sorma"}, {"time": 68.2, "text": "O savaştan çıktım, nasıl olduğumu sorma"}, {"time": 71.13, "text": "Belki de vuran sendin ama fark etmez daha"}, {"time": 75.47, "text": "\"Kurtuldum\" derken (U-u-uh) kayboldum günahlarımla"}, {"time": 80.93, "text": "Bazen deliriyo' gibi hissediyorum"}, {"time": 82.74, "text": "Bu, yaralı kardeşini yerde görmek gibi"}, {"time": 84.88, "text": "Bazen nefes almak istemiyorum"}, {"time": 86.79, "text": "Değilim sizin gibi çok heyecanlı biri"}, {"time": 89.05, "text": "Beni soranlara seni gösteriyorum"}, {"time": 90.67, "text": "Beni benden alıp gittiğinden beri"}, {"time": 93.07, "text": "Nası' gittiysen geri dön, geri"}, {"time": 94.94, "text": "Nası' geçer bu zaman? Söylesin biri"}, {"time": 96.8, "text": "Sorarlar \"Neden değiştin?\" onlar, değişti tüm suratlar"}, {"time": 100.91, "text": "Yazılmış kader onla, neden?"}, {"time": 104.88, "text": "Toplar memurlar boş kovanlar, akrep eş yelkovanla"}, {"time": 109.57, "text": "Sorarlar katilimi, o sen"}, {"time": 112.78, "text": "U-u-uh, a-ah"}, {"time": 119.24, "text": "U-uh, a-ah (B-B-BIGBAT)"}, {"time": 122.85, "text": "U-u-u-u-u-uh (Alles gute LYNX)"}, {"time": 124.6, "text": "U-u-uh (A-A-Alo Waxy)"}, {"time": 126.83, "text": "(Deyjan, got the sauce, boy)"}],
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
    lyrics: `Su gibi akar saniyeler
Benim kafamda dönüyo'sun sadece sen
Seni dün dört duvarda katil eden
Döner arkasını ve seni takip eder
Bi' gün beni vurabil'ceğini tahmin ederdim
Ama dedim ki "Yok, daha neler"
Çocuk, "Bana bi' şey olmaz" deme
Annen gözyaşı dökerse çok fark eder (O-o-oh)
Rüzgâr gibi seneler, çok değiştim
İstemeden olsa da pislikleştim (A-ah, o-oh)
Gide gele kalbimden hissizleştin (A-ah)
Başkaydın ama sen herkesleştin (O-o-o-o-oh)
Ne yaptıysam olmadı neyse geçtim
Edindik tecrübe neyse gençtim
Beni senden iten bi' şey vardı
Ama ben yine de seni seçtim (U-u-uh)
Bi' savaşın içindeydim, kimin kazandığını sorma (A-ah, o-oh)
O savaştan çıktım, nasıl olduğumu sorma (A-ah, o-o-o-o-o-oh)
Belki de vuran sendin ama fark etmez daha
"Kurtuldum" derken kayboldum günahlarımla
Bi' savaşın içindeydim, kimin kazandığını sorma
O savaştan çıktım, nasıl olduğumu sorma
Belki de vuran sendin ama fark etmez daha
"Kurtuldum" derken (U-u-uh) kayboldum günahlarımla
Bazen deliriyo' gibi hissediyorum
Bu, yaralı kardeşini yerde görmek gibi
Bazen nefes almak istemiyorum
Değilim sizin gibi çok heyecanlı biri
Beni soranlara seni gösteriyorum
Beni benden alıp gittiğinden beri
Nası' gittiysen geri dön, geri
Nası' geçer bu zaman? Söylesin biri
Sorarlar "Neden değiştin?" onlar, değişti tüm suratlar
Yazılmış kader onla, neden?
Toplar memurlar boş kovanlar, akrep eş yelkovanla
Sorarlar katilimi, o sen
U-u-uh, a-ah
U-uh, a-ah (B-B-BIGBAT)
U-u-u-u-u-uh (Alles gute LYNX)
U-u-uh (A-A-Alo Waxy)
(Deyjan, got the sauce, boy)`,
  },
  {
    id: "hmdl",
    syncedLyrics: [{"time": 20.62, "text": "(Mehsah à la prod)"}, {"time": 21.48, "text": "Neu—"}, {"time": 22.63, "text": "Neuf, geh auf Profil, sacri—"}, {"time": 24.32, "text": "Trance in mei'm Block von Marihu—"}, {"time": 27.77, "text": "GT, mach' heut Geld mit—"}, {"time": 28.94, "text": "Für uns, Cho, nie wie—"}, {"time": 30.74, "text": "Cho, zéro-neuf, geh auf Profil, sacrifice"}, {"time": 33.1, "text": "Zieh' ein'n Zug in Trance in mei'm Block vom Marihu'"}, {"time": 35.66, "text": "Choya, im Parkhaus, fahr' GT, mach' heut Geld mit Artifice"}, {"time": 38.17, "text": "Das heißt für uns, Cho, nie wieder Habis"}, {"time": 40.63, "text": "Schweißgebadet wegen Stress, zulu op Audi, Bro, herres"}, {"time": 43.52, "text": "Wenn du fragst, wieso, Choya, ich nicht arbeite für ein'n Chef"}, {"time": 45.93, "text": "Komm' vom Block, sag, was ich seh'"}, {"time": 48.11, "text": "Fick Gericht, ich knie' vor Gott, nur Plädoyer, eh"}, {"time": 51.13, "text": "Bin mit Bande, Zéro-neuf-Ekip, sind nicht wie andren"}, {"time": 54.09, "text": "Police-Kontrolle, Choya, im Audi Performante"}, {"time": 56.6, "text": "Lenk', weil Iba3ash ist hinter uns"}, {"time": 58.43, "text": "Fick die AfD, weil die Lage kocht zum Siedepunkt, eh"}, {"time": 61.97, "text": "Ich liefer' Qualität aus Ghetto, bin am Boden, Choya, immer noch"}, {"time": 64.32, "text": "Mach's für Hip-Hop, Chaye, nicht für Klicks"}, {"time": 67.24, "text": "Bau' mir alles selber auf, geb' den Jüngeren Respekt"}, {"time": 69.56, "text": "Fick' Geld, fick' auf Hype, Cho, du weißt, wofür ich steh'"}, {"time": 72.22, "text": "Emanet in pantolon, beat'ler Mehsah à la prod"}, {"time": 74.83, "text": "Pardon, kafa is reset, 0-6-7 (Ah)"}, {"time": 77.21, "text": "Yaşıyorum, hamdullah, savaşıyorum, billah'"}, {"time": 79.76, "text": "Tüm çabam senin için 607"}, {"time": 81.89, "text": "CLTR ekip, Zéro-neuf, kardeşlere selam"}, {"time": 84.35, "text": "Gerekirse suçlarını ört, c'est la vie, yaşa, gör (Ah)"}, {"time": 87.51, "text": "İçindeyim ama bunu ben seçmedim"}, {"time": 89.66, "text": "Duasıyla annenin bur'dan kurtul ya da öl"}, {"time": 92.36, "text": "Karakterin satılık, söylesene, bedeli ne?"}, {"time": 94.74, "text": "0-6-7 çocukken sarıldı kefenine"}, {"time": 97.39, "text": "Koşarım ecelime, mesajım Azrail'ime"}, {"time": 100.01, "text": "Ya sen beni bul ya da ben geliyorum yerine"}, {"time": 103.78, "text": "Bugün ölsem n'olur? Kardeşler bakar aileme"}, {"time": 104.94, "text": "Hapisteler, doğru, yeminim tüm mahalleme"}, {"time": 107.58, "text": "(Sen) Sen, sen sevmesen de n'olur?"}, {"time": 110.09, "text": "Listelerde adım, oğlum, çekilin yolumdan"}, {"time": 112.84, "text": "Adımız dokuz da görmedik hiç sekiz"}, {"time": 115.22, "text": "Yalnızlıkla baş başayız, biliyoruz, tekiz"}, {"time": 118.18, "text": "Gökyüzü karanlık, benim kafa matiz"}, {"time": 120.09, "text": "Benim kafa hapis, görüntüde netiz"}, {"time": 122.27, "text": "(Açık) Açık tezgahlar, hızlı bereketler"}, {"time": 125.55, "text": "Kuzenlerim dar alanda çok şık hareketler"}, {"time": 127.89, "text": "Bütün sahte dostlarıma en koyudan renkler"}, {"time": 130.54, "text": "Onlar beni bekler, ben onlara gitmem"}, {"time": 133.5, "text": "Bütün dünya benim, senin cepte nothin'"}, {"time": 135.78, "text": "Konuşuyo' karılarım, hepsi fanatik"}, {"time": 138.12, "text": "Dostlarınız kıvrak ve çok atletik"}, {"time": 140.77, "text": "At, avrat, silah, parmak, tetik"}, {"time": 143.06, "text": "Tertemiz Prada, kirli eller bulaştı kana"}, {"time": 145.73, "text": "Yarı zamanlı müzik, yarı zamanlı tijara"}, {"time": 148.27, "text": "Yaktım sigara, AirPods'ta \"Luana\""}, {"time": 151.02, "text": "Gittim konuma, hayır, gece gitmedim mekâna"}, {"time": 153.31, "text": "34 plaka, RS7 dar sokakta (Mm-mm)"}, {"time": 155.79, "text": "Onlardan biri olsam da bana ters bakarlar (Ah-ah)"}, {"time": 158.17, "text": "Çocukken dahi pek dinleyememiştim masallar (Ah-ah)"}, {"time": 161.18, "text": "Tel örgülerde takılı kaldı uçurtmalar (Ah)"}, {"time": 163.21, "text": "Bi' bardak daha doldur dertlerime"}, {"time": 165.6, "text": "Yıllar geçti, geldi her şey üzerime"}, {"time": 168.29, "text": "Sen koymadın kendini ben yerine"}, {"time": 170.65, "text": "Kaybettim büyüdüğüm sokaklarda kendimi ben"}, {"time": 173.31, "text": "Bi' bardak daha doldur dertlerime"}, {"time": 175.68, "text": "Yıllar geçti, geldi her şey üzerime"}, {"time": 178.45, "text": "Sen koymadın kendini ben yerine"}, {"time": 180.69, "text": "Kaybettim büyüdüğüm sokaklarda kendimi ben"}, {"time": 184.28, "text": "Penceresiz kaldım, anne, duvarlar konuşmuyo'"}, {"time": 186.69, "text": "Başımda iki polis, \"Her şeyi konuş\" diyo'"}, {"time": 189.15, "text": "İşi ver, payı çöz, adam sat, yoldan dön"}, {"time": 191.98, "text": "Maalesef de, memur abi, böyle adam olunmuyo'"}, {"time": 195.22, "text": "Fark etmiyo' abi, kral, baba, dayı"}, {"time": 197, "text": "Demiştim ya \"Etten, kemikten en kral kabadayı\""}, {"time": 200.23, "text": "Evet, semtim Dereyolu, Okmeydanı"}, {"time": 202.07, "text": "Hepsi geldi üstümüze ama biri yıkamadı"}, {"time": 204.9, "text": "Hasım sahibiyiz, ondan mahkûm olduk semte"}, {"time": 206.7, "text": "Benim cami dışında başımı göremezsin yerde"}, {"time": 209.7, "text": "Değil kula, ettim sade Allah'ıma secde"}, {"time": 212.37, "text": "Sonu ölüm olsa bile sakın boyun eğme"}, {"time": 214.51, "text": "(B-B-BIGBAT)"}, {"time": 217, "text": "(A-A-Alo Waxy)"}],
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
    lyrics: `(Mehsah à la prod)
Neu—
Neuf, geh auf Profil, sacri—
Trance in mei'm Block von Marihu—
GT, mach' heut Geld mit—
Für uns, Cho, nie wie—
Cho, zéro-neuf, geh auf Profil, sacrifice
Zieh' ein'n Zug in Trance in mei'm Block vom Marihu'
Choya, im Parkhaus, fahr' GT, mach' heut Geld mit Artifice
Das heißt für uns, Cho, nie wieder Habis
Schweißgebadet wegen Stress, zulu op Audi, Bro, herres
Wenn du fragst, wieso, Choya, ich nicht arbeite für ein'n Chef
Komm' vom Block, sag, was ich seh'
Fick Gericht, ich knie' vor Gott, nur Plädoyer, eh
Bin mit Bande, Zéro-neuf-Ekip, sind nicht wie andren
Police-Kontrolle, Choya, im Audi Performante
Lenk', weil Iba3ash ist hinter uns
Fick die AfD, weil die Lage kocht zum Siedepunkt, eh
Ich liefer' Qualität aus Ghetto, bin am Boden, Choya, immer noch
Mach's für Hip-Hop, Chaye, nicht für Klicks
Bau' mir alles selber auf, geb' den Jüngeren Respekt
Fick' Geld, fick' auf Hype, Cho, du weißt, wofür ich steh'
Emanet in pantolon, beat'ler Mehsah à la prod
Pardon, kafa is reset, 0-6-7 (Ah)
Yaşıyorum, hamdullah, savaşıyorum, billah'
Tüm çabam senin için 607
CLTR ekip, Zéro-neuf, kardeşlere selam
Gerekirse suçlarını ört, c'est la vie, yaşa, gör (Ah)
İçindeyim ama bunu ben seçmedim
Duasıyla annenin bur'dan kurtul ya da öl
Karakterin satılık, söylesene, bedeli ne?
0-6-7 çocukken sarıldı kefenine
Koşarım ecelime, mesajım Azrail'ime
Ya sen beni bul ya da ben geliyorum yerine
Bugün ölsem n'olur? Kardeşler bakar aileme
Hapisteler, doğru, yeminim tüm mahalleme
(Sen) Sen, sen sevmesen de n'olur?
Listelerde adım, oğlum, çekilin yolumdan
Adımız dokuz da görmedik hiç sekiz
Yalnızlıkla baş başayız, biliyoruz, tekiz
Gökyüzü karanlık, benim kafa matiz
Benim kafa hapis, görüntüde netiz
(Açık) Açık tezgahlar, hızlı bereketler
Kuzenlerim dar alanda çok şık hareketler
Bütün sahte dostlarıma en koyudan renkler
Onlar beni bekler, ben onlara gitmem
Bütün dünya benim, senin cepte nothin'
Konuşuyo' karılarım, hepsi fanatik
Dostlarınız kıvrak ve çok atletik
At, avrat, silah, parmak, tetik
Tertemiz Prada, kirli eller bulaştı kana
Yarı zamanlı müzik, yarı zamanlı tijara
Yaktım sigara, AirPods'ta "Luana"
Gittim konuma, hayır, gece gitmedim mekâna
34 plaka, RS7 dar sokakta (Mm-mm)
Onlardan biri olsam da bana ters bakarlar (Ah-ah)
Çocukken dahi pek dinleyememiştim masallar (Ah-ah)
Tel örgülerde takılı kaldı uçurtmalar (Ah)
Bi' bardak daha doldur dertlerime
Yıllar geçti, geldi her şey üzerime
Sen koymadın kendini ben yerine
Kaybettim büyüdüğüm sokaklarda kendimi ben
Bi' bardak daha doldur dertlerime
Yıllar geçti, geldi her şey üzerime
Sen koymadın kendini ben yerine
Kaybettim büyüdüğüm sokaklarda kendimi ben
Penceresiz kaldım, anne, duvarlar konuşmuyo'
Başımda iki polis, "Her şeyi konuş" diyo'
İşi ver, payı çöz, adam sat, yoldan dön
Maalesef de, memur abi, böyle adam olunmuyo'
Fark etmiyo' abi, kral, baba, dayı
Demiştim ya "Etten, kemikten en kral kabadayı"
Evet, semtim Dereyolu, Okmeydanı
Hepsi geldi üstümüze ama biri yıkamadı
Hasım sahibiyiz, ondan mahkûm olduk semte
Benim cami dışında başımı göremezsin yerde
Değil kula, ettim sade Allah'ıma secde
Sonu ölüm olsa bile sakın boyun eğme
(B-B-BIGBAT)
(A-A-Alo Waxy)`,
  },
  {
    id: "geldigim_yer",
    syncedLyrics: [{"time": 6.37, "text": "(Alles gute LYNX)"}, {"time": 8.67, "text": "(Beyjan)"}, {"time": 11.52, "text": "0-6-7'de derlerdi kanak"}, {"time": 14.44, "text": "Yoktu param, bi' tek yanımda Allah"}, {"time": 17.14, "text": "Dua ediyo'dum elleri açarak"}, {"time": 19.35, "text": "\"Annemi gururlandırmak için kapılar aç\""}, {"time": 23.23, "text": "Geldiğim yer 607"}, {"time": 24.9, "text": "Annem ezanda seslenir \"Oğlum, hadi içeri\""}, {"time": 27.8, "text": "Şimdi büyüdüm, bak, kollarımda kelepçe"}, {"time": 30.39, "text": "Böyle olacağını hiç düşünmedim, bu suç benim"}, {"time": 32.81, "text": "Bitirmedim, saklı tuttum öfkemi"}, {"time": 35.16, "text": "Hep doluydu gözlerim, sinirden kırdım dişleri"}, {"time": 37.81, "text": "Sardı beni özlemin, geçti benden aşk işleri"}, {"time": 40.39, "text": "Yanlış duydun, affetmedim, tutunca siktim piçleri"}, {"time": 43.27, "text": "Anlamadım, büyü mü bu bela? Lanetim şu favela"}, {"time": 46.47, "text": "Kaçıyorum yinе, ayağımın altında pedal"}, {"time": 49.15, "text": "Sonu yok (Hah), bunun sonu yok (Ah)"}, {"time": 54.13, "text": "Mansur yabba dabba doo, yürüdüm dikenli yolu"}, {"time": 57.05, "text": "Kaderimin oyunu bu, gеçiyo'du boyumu"}, {"time": 59.64, "text": "Favelamda hiç umut yoktu"}, {"time": 63.05, "text": "Bi'kaçı öldü, bi'kaçı mapustu"}, {"time": 65.14, "text": "Var son bi' isteğim (Ah)"}, {"time": 67.76, "text": "Bur'da güneş doğmuyo', ellerimden kan damlıyo'"}, {"time": 70.56, "text": "Ve her anda tetikteyim (Ah)"}, {"time": 73.28, "text": "Neden bu pislikteyim? (Ah)"}, {"time": 75.97, "text": "Var son bi' isteğim (Ah)"}, {"time": 78.55, "text": "Bur'da güneş doğmuyo', ellerimden kan damlıyo'"}, {"time": 81.45, "text": "Ve her anda tetikteyim"}, {"time": 84.34, "text": "Neden bu pislikteyim?"}, {"time": 88.25, "text": "(0-6-7'de derlerdi kanak)"}, {"time": 90.69, "text": "(Ka-ka-ka-kanak)"}, {"time": 94.16, "text": "(Geldiğim yer 607)"}, {"time": 97.77, "text": "(Al-al, geldiğim yer 607)"}],
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
    lyrics: `(Alles gute LYNX)
(Beyjan)
0-6-7'de derlerdi kanak
Yoktu param, bi' tek yanımda Allah
Dua ediyo'dum elleri açarak
"Annemi gururlandırmak için kapılar aç"
Geldiğim yer 607
Annem ezanda seslenir "Oğlum, hadi içeri"
Şimdi büyüdüm, bak, kollarımda kelepçe
Böyle olacağını hiç düşünmedim, bu suç benim
Bitirmedim, saklı tuttum öfkemi
Hep doluydu gözlerim, sinirden kırdım dişleri
Sardı beni özlemin, geçti benden aşk işleri
Yanlış duydun, affetmedim, tutunca siktim piçleri
Anlamadım, büyü mü bu bela? Lanetim şu favela
Kaçıyorum yinе, ayağımın altında pedal
Sonu yok (Hah), bunun sonu yok (Ah)
Mansur yabba dabba doo, yürüdüm dikenli yolu
Kaderimin oyunu bu, gеçiyo'du boyumu
Favelamda hiç umut yoktu
Bi'kaçı öldü, bi'kaçı mapustu
Var son bi' isteğim (Ah)
Bur'da güneş doğmuyo', ellerimden kan damlıyo'
Ve her anda tetikteyim (Ah)
Neden bu pislikteyim? (Ah)
Var son bi' isteğim (Ah)
Bur'da güneş doğmuyo', ellerimden kan damlıyo'
Ve her anda tetikteyim
Neden bu pislikteyim?
(0-6-7'de derlerdi kanak)
(Ka-ka-ka-kanak)
(Geldiğim yer 607)
(Al-al, geldiğim yer 607)`,
  },
  {
    id: "aktiv",
    syncedLyrics: [{"time": 7.57, "text": "(DEXTAH)"}, {"time": 10.13, "text": "Bu piyasada kâr bol, eldiven Under Armour"}, {"time": 12.94, "text": "RS7 karbon, hızlı, Antoine Griezmann"}, {"time": 15.82, "text": "Bi' beladayım, annem, bana kızma"}, {"time": 17.79, "text": "Kafamın içinde ayrı bi' ekonomik kriz var"}, {"time": 20.26, "text": "Polis soru sorar sesi gerginleşerek"}, {"time": 22.7, "text": "Bense üflüyorum, paff paff, sakinleşerek"}, {"time": 24.92, "text": "Diyo'lar \"Özentilik mi ya da başka bi' şey mi?\""}, {"time": 27.74, "text": "Açıkçası ben görmedim çok bi' seçenek"}, {"time": 30.25, "text": "Yani sokaklar falan güzel, ederiz muhabbet"}, {"time": 32.73, "text": "Ve cümlelerin yarısında \"Allah'ım, sen affet\""}, {"time": 35.28, "text": "Yıl olmuş 2025, bu nasıl felaket?"}, {"time": 38.09, "text": "Hayatta kalanlara hediye plaket"}, {"time": 40.4, "text": "Sahadayım aktif, bi' gece beş, altımda Suzuki"}, {"time": 43.28, "text": "Kolay mı sandın sen, mon ami?"}, {"time": 44.76, "text": "Teslimatım mahalle, izliyorum hepsini"}, {"time": 47.29, "text": "Kaldılar arkada, mit Batu im Porsche Paname'"}, {"time": 49.79, "text": "Dedim ya sana kaç kere \"Peşimde bu bela\""}, {"time": 52.19, "text": "Atıyorum ekip otosunda a capella"}, {"time": 55.08, "text": "İzliyorum hepsini, anca boş laf, tantana"}, {"time": 57.17, "text": "067 sahada sanki Ousmane Dembélé"}, {"time": 60.3, "text": "Amına koy'im, yerim Pizza Napolist"}, {"time": 62.67, "text": "Spor yok, polisten kaçıp yakıyorum kalori"}, {"time": 66.15, "text": "Yanımda biggi baboli"}, {"time": 69.47, "text": "İçindeyiz barrio, göstereyim, follow me (Ya, ya)"}, {"time": 70.5, "text": "Deriz \"Allah'ım affet\", bugün de olmadık paket"}, {"time": 72.55, "text": "Eli silah tutan rapçiler için açık sahne"}, {"time": 75.08, "text": "Senin işin bahane, çünkü sen busun lale"}, {"time": 77.56, "text": "Bizi ağzı açık izliyo' hâlâ tüm mahalle (Tetik düşür)"}, {"time": 81.18, "text": "Elinden çok iş yapıyo' ağzın"}, {"time": 82.91, "text": "Tetik konuşuyo bende, ondan konuşmuyo' ağzım (Şşt)"}, {"time": 85.5, "text": "Allah bana düşmanın da iyisini versin"}, {"time": 87.96, "text": "Bize kahpe değil, delikanlı adam lazım"}, {"time": 90.36, "text": "Adam olmak istiyo'san durmalısın sözünde"}, {"time": 92.84, "text": "Beni hiçbi' abi, kral korkutamaz ölümle"}, {"time": 95.18, "text": "Yaşantılar kolpa, sizin emanetler dekor"}, {"time": 97.93, "text": "Kendin gibi kurusıkı oynatırsın klipte"}, {"time": 100.38, "text": "Pa-pa-pamuk şeker abisin, yalandan bi' adamsın"}, {"time": 103.01, "text": "Senin sözün orospu ve tükürdüğünü yalarsın"}, {"time": 105.29, "text": "He-he-herkes hakketiğini bulur, yaşattığını yaşar"}, {"time": 109.7, "text": "Dostunu sattıysan yarın karını da satarsın (Puşt)"}],
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
    lyrics: `(DEXTAH)
Bu piyasada kâr bol, eldiven Under Armour
RS7 karbon, hızlı, Antoine Griezmann
Bi' beladayım, annem, bana kızma
Kafamın içinde ayrı bi' ekonomik kriz var
Polis soru sorar sesi gerginleşerek
Bense üflüyorum, paff paff, sakinleşerek
Diyo'lar "Özentilik mi ya da başka bi' şey mi?"
Açıkçası ben görmedim çok bi' seçenek
Yani sokaklar falan güzel, ederiz muhabbet
Ve cümlelerin yarısında "Allah'ım, sen affet"
Yıl olmuş 2025, bu nasıl felaket?
Hayatta kalanlara hediye plaket
Sahadayım aktif, bi' gece beş, altımda Suzuki
Kolay mı sandın sen, mon ami?
Teslimatım mahalle, izliyorum hepsini
Kaldılar arkada, mit Batu im Porsche Paname'
Dedim ya sana kaç kere "Peşimde bu bela"
Atıyorum ekip otosunda a capella
İzliyorum hepsini, anca boş laf, tantana
067 sahada sanki Ousmane Dembélé
Amına koy'im, yerim Pizza Napolist
Spor yok, polisten kaçıp yakıyorum kalori
Yanımda biggi baboli
İçindeyiz barrio, göstereyim, follow me (Ya, ya)
Deriz "Allah'ım affet", bugün de olmadık paket
Eli silah tutan rapçiler için açık sahne
Senin işin bahane, çünkü sen busun lale
Bizi ağzı açık izliyo' hâlâ tüm mahalle (Tetik düşür)
Elinden çok iş yapıyo' ağzın
Tetik konuşuyo bende, ondan konuşmuyo' ağzım (Şşt)
Allah bana düşmanın da iyisini versin
Bize kahpe değil, delikanlı adam lazım
Adam olmak istiyo'san durmalısın sözünde
Beni hiçbi' abi, kral korkutamaz ölümle
Yaşantılar kolpa, sizin emanetler dekor
Kendin gibi kurusıkı oynatırsın klipte
Pa-pa-pamuk şeker abisin, yalandan bi' adamsın
Senin sözün orospu ve tükürdüğünü yalarsın
He-he-herkes hakketiğini bulur, yaşattığını yaşar
Dostunu sattıysan yarın karını da satarsın (Puşt)`,
  },
  {
    id: "bir_kere_daha",
    syncedLyrics: [{"time": 12.01, "text": "A-a-ah, a-a-ah (B-B-Big Bat)"}, {"time": 18.68, "text": "Bi' kere daha yolum düşmez sokağına"}, {"time": 21.59, "text": "Aramaz gözlerim seni"}, {"time": 23.45, "text": "Gidiyorum en uzağına-a-ah"}, {"time": 26.91, "text": "Bi' kere daha güvenmem anlattığın masala"}, {"time": 29.49, "text": "Elimde rüzgâr gibi gençliğim"}, {"time": 31.47, "text": "Al kızım, hediyem olsun sana"}, {"time": 34.49, "text": "Sen sarmadın yaramı"}, {"time": 36.96, "text": "Ben sardım sigaramı"}, {"time": 38.37, "text": "Yapmışım ben hatamı seni severek"}, {"time": 42.38, "text": "Gel yine delalım"}, {"time": 43.5, "text": "Gel, sensiz olmaz, hayır"}, {"time": 45.39, "text": "Sen, belki de hataydın"}, {"time": 47.25, "text": "Kaldım yalnız başıma"}, {"time": 49.79, "text": "Yağmurlar altında"}, {"time": 51.6, "text": "Bun'la baş edemem"}, {"time": 53.55, "text": "Her şeyde biraz sen"}, {"time": 55.57, "text": "Yalnız başıma"}, {"time": 57.1, "text": "Yağmurlar altında"}, {"time": 58.89, "text": "Bun'la baş edemem"}, {"time": 61.05, "text": "Her şeyde biraz sen"}, {"time": 63.85, "text": "Yalnız başıma"}, {"time": 65.06, "text": "Aklar düştü bir gecede saçıma"}, {"time": 66.72, "text": "Yastığım kokuyorken hâlâ sen hâlâ"}, {"time": 69.51, "text": "Sen hâl₺ dedim \"Bu sefer başka\""}, {"time": 72.77, "text": "Tam da kapılmıştım o aşka"}, {"time": 74.13, "text": "Yunuslar aldı on altı yaşta (Pa-ra-pa-pa)"}, {"time": 78.82, "text": "Sen sarmadın yaramı"}, {"time": 80.77, "text": "Ben sardım sigaramı"}, {"time": 82.62, "text": "Yapmışım ben hatamı seni severek"}, {"time": 86.44, "text": "Gel yine delalım"}, {"time": 87.84, "text": "Gel, sensiz olmaz, hayır"}, {"time": 89.73, "text": "Sen, belki de hataydın"}, {"time": 92.13, "text": "Kaldım yalnız başıma"}, {"time": 93.01, "text": "Yağmurlar altında"}, {"time": 96, "text": "Bun'la baş edemem"}, {"time": 98.34, "text": "Her şeyde biraz sen"}],
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
    lyrics: `A-a-ah, a-a-ah (B-B-Big Bat)
Bi' kere daha yolum düşmez sokağına
Aramaz gözlerim seni
Gidiyorum en uzağına-a-ah
Bi' kere daha güvenmem anlattığın masala
Elimde rüzgâr gibi gençliğim
Al kızım, hediyem olsun sana
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
Yalnız başıma
Aklar düştü bir gecede saçıma
Yastığım kokuyorken hâlâ sen hâlâ
Sen hâl₺ dedim "Bu sefer başka"
Tam da kapılmıştım o aşka
Yunuslar aldı on altı yaşta (Pa-ra-pa-pa)
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
    syncedLyrics: [{"time": 6.17, "text": "(E-Edokaleen)"}, {"time": 7.29, "text": "Brr-ra-pa-pa-ra-pa-pa-ra-pa"}, {"time": 9.23, "text": "Listede yok, sokaklarda milyon"}, {"time": 11.08, "text": "Pa-pa-pa-ra-pa-pa-ra-pa"}, {"time": 13.17, "text": "Tabii ki hızlıyız, kekem, biliyo'n"}, {"time": 15.12, "text": "Nokia telefon çalıyo', bratte"}, {"time": 16.63, "text": "Like Mbappé, koştur cadde"}, {"time": 18.97, "text": "Hâ-hâlâ bizden besleniyo' mahalle"}, {"time": 20.76, "text": "Yoksa ne işim var bur'da bu saatte?"}, {"time": 22.68, "text": "Kızım, ben'le geliceksen \"Tamam\" de"}, {"time": 24.69, "text": "Yanındakini de getir, Mansur ben'le"}, {"time": 26.6, "text": "Aslında işim olmaz sen'le"}, {"time": 28.48, "text": "Birazcık ****, biraz parti"}, {"time": 30.34, "text": "ERAY067, indir malzemeyi (Uh-uh, uh-uh)"}, {"time": 32.9, "text": "Çünkü eşit değildi şartlar (Ah-ah, ah-ah)"}, {"time": 34.73, "text": "607 lanetim"}, {"time": 36.51, "text": "Geçirtti her günüme yeni travma (A-ah)"}, {"time": 39.94, "text": "Kamera shoot, kuzenler shooter, yakalandın"}, {"time": 43.77, "text": "Brr-ra-pa-pa-ra-pa-pa-ra-pa"}, {"time": 45.72, "text": "Listede yok, sokaklarda milyon"}, {"time": 47.99, "text": "Pa-pa-pa-ra-pa-pa-ra-pa"}, {"time": 49.61, "text": "Tabii ki hızlıyız, kekem, biliyo'n"}, {"time": 51.91, "text": "Brr-ra-pa-pa-ra-pa-pa-ra-pa"}, {"time": 53.4, "text": "Uzaktan uzaktan bizi izliyo'n"}, {"time": 55.75, "text": "Pa-pa-pa-ra-pa-pa-ra-pa"}, {"time": 57.27, "text": "Sen de biliyo'n, sahada şampiyon"}, {"time": 58.95, "text": "İki kere iki dört, yere viskileri döktüm"}, {"time": 61.05, "text": "TMAX'in üstündeyim, maskeleri örttüm (He, he, he)"}, {"time": 63.05, "text": "İ-i-iki telefonum var, caddelere çöktüm"}, {"time": 64.9, "text": "Olanları boş ver, sen tam bi' götsün, lale (Grr, pa-pa-pa-pa)"}, {"time": 67.35, "text": "Mermilerle \"O Sen Olsan Bari\" (Hehehe)"}, {"time": 69.2, "text": "Ezberindeyim koca mahalle"}, {"time": 71.19, "text": "Bi' gün Girne'de, bi' gün Bali"}, {"time": 73.16, "text": "Bakarım aileme, Sadio Mané"}, {"time": 75.06, "text": "Koş gel (Koş lan)"}, {"time": 76.05, "text": "Mevzu var gado, mon cher"}, {"time": 77.3, "text": "Parlak montunu siki'm Moncler (Orospu çocuğu)"}, {"time": 79.96, "text": "Replika, kanar gözler"}, {"time": 81.78, "text": "Daha neler görücek benim gözler (Batuflex, phew-phew-phew)"}, {"time": 83.16, "text": "Daha fazla para için press yap"}, {"time": 84.84, "text": "Taşıyoruz mobilyacı gibi her gün eşya (Batuflex)"}, {"time": 86.77, "text": "Alıca'm bi' Porsche, kaplatıca'm fuşya"}, {"time": 88.69, "text": "Sonra toplanır etrafımda binlerce Eyşan (Batuflex)"}, {"time": 90.54, "text": "Parfüm kaliteli sürtüğün aksine"}, {"time": 92.49, "text": "Gidiyo'm Milano'ya, gidiyo'sun Taksim'e"}, {"time": 94.48, "text": "Bazen manitam bile \"Git,\" diyo, \"partile\""}, {"time": 96.43, "text": "Ceplerim dolu, ihtiyacım yok ki takdire"}, {"time": 98.75, "text": "Hakkımda konuşuyo'n, sikimde değil"}, {"time": 99.96, "text": "Elimde sigara, turluyorum, sikimde değil (Batuflex)"}, {"time": 102.04, "text": "Atıyo'lar yorum hep, sikimde değil"}, {"time": 103.78, "text": "Hayır, kadın düşmanı da değil pick me de değilim, ah (Batuflex)"}, {"time": 107.2, "text": "Kamera shoot, silahlar shoot, yakalandın"}, {"time": 111.01, "text": "Brr-ra-pa-pa-ra-pa-pa-ra-pa"}, {"time": 112.98, "text": "Listede yok, sokaklarda milyon"}, {"time": 115.44, "text": "Pa-pa-pa-ra-pa-pa-ra-pa"}, {"time": 116.81, "text": "Tabii ki hızlıyız, kekem, biliyo'n"}, {"time": 119.23, "text": "Brr-ra-pa-pa-ra-pa-pa-ra-pa"}, {"time": 120.73, "text": "Uzaktan uzaktan bizi izliyo'n"}, {"time": 123.06, "text": "Pa-pa-pa-ra-pa-pa-ra-pa"}, {"time": 124.63, "text": "Sen de biliyo'n, sahada şampiyon"}],
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
    lyrics: `(E-Edokaleen)
Brr-ra-pa-pa-ra-pa-pa-ra-pa
Listede yok, sokaklarda milyon
Pa-pa-pa-ra-pa-pa-ra-pa
Tabii ki hızlıyız, kekem, biliyo'n
Nokia telefon çalıyo', bratte
Like Mbappé, koştur cadde
Hâ-hâlâ bizden besleniyo' mahalle
Yoksa ne işim var bur'da bu saatte?
Kızım, ben'le geliceksen "Tamam" de
Yanındakini de getir, Mansur ben'le
Aslında işim olmaz sen'le
Birazcık ****, biraz parti
ERAY067, indir malzemeyi (Uh-uh, uh-uh)
Çünkü eşit değildi şartlar (Ah-ah, ah-ah)
607 lanetim
Geçirtti her günüme yeni travma (A-ah)
Kamera shoot, kuzenler shooter, yakalandın
Brr-ra-pa-pa-ra-pa-pa-ra-pa
Listede yok, sokaklarda milyon
Pa-pa-pa-ra-pa-pa-ra-pa
Tabii ki hızlıyız, kekem, biliyo'n
Brr-ra-pa-pa-ra-pa-pa-ra-pa
Uzaktan uzaktan bizi izliyo'n
Pa-pa-pa-ra-pa-pa-ra-pa
Sen de biliyo'n, sahada şampiyon
İki kere iki dört, yere viskileri döktüm
TMAX'in üstündeyim, maskeleri örttüm (He, he, he)
İ-i-iki telefonum var, caddelere çöktüm
Olanları boş ver, sen tam bi' götsün, lale (Grr, pa-pa-pa-pa)
Mermilerle "O Sen Olsan Bari" (Hehehe)
Ezberindeyim koca mahalle
Bi' gün Girne'de, bi' gün Bali
Bakarım aileme, Sadio Mané
Koş gel (Koş lan)
Mevzu var gado, mon cher
Parlak montunu siki'm Moncler (Orospu çocuğu)
Replika, kanar gözler
Daha neler görücek benim gözler (Batuflex, phew-phew-phew)
Daha fazla para için press yap
Taşıyoruz mobilyacı gibi her gün eşya (Batuflex)
Alıca'm bi' Porsche, kaplatıca'm fuşya
Sonra toplanır etrafımda binlerce Eyşan (Batuflex)
Parfüm kaliteli sürtüğün aksine
Gidiyo'm Milano'ya, gidiyo'sun Taksim'e
Bazen manitam bile "Git," diyo, "partile"
Ceplerim dolu, ihtiyacım yok ki takdire
Hakkımda konuşuyo'n, sikimde değil
Elimde sigara, turluyorum, sikimde değil (Batuflex)
Atıyo'lar yorum hep, sikimde değil
Hayır, kadın düşmanı da değil pick me de değilim, ah (Batuflex)
Kamera shoot, silahlar shoot, yakalandın
Brr-ra-pa-pa-ra-pa-pa-ra-pa
Listede yok, sokaklarda milyon
Pa-pa-pa-ra-pa-pa-ra-pa
Tabii ki hızlıyız, kekem, biliyo'n
Brr-ra-pa-pa-ra-pa-pa-ra-pa
Uzaktan uzaktan bizi izliyo'n
Pa-pa-pa-ra-pa-pa-ra-pa
Sen de biliyo'n, sahada şampiyon`,
  },
  {
    id: "paranoya",
    syncedLyrics: [{"time": 12.65, "text": "(Gezer on the beat)"}, {"time": 13.41, "text": "(Ge-Ge-Gezer on the beat)"}, {"time": 14.39, "text": "(Archie)"}, {"time": 15.58, "text": "Hayat güzel, yüksekte c'est ma vie-vie"}, {"time": 18.03, "text": "Coco Chanel, takılırım Neymar gibi"}, {"time": 20.56, "text": "Jacky Cola, viski ve yanında puro"}, {"time": 23.29, "text": "Kalbimde habibi, ateşlerde yandım puto"}, {"time": 25.25, "text": "Organize baba loco, he la, dört yanımda bela"}, {"time": 27.89, "text": "Ediyo'san merak sana göndereyim selam"}, {"time": 30.33, "text": "Instagram'a foto, altımda bi' moto'"}, {"time": 33.11, "text": "Param haram olsa da ailem der \"Helal\""}, {"time": 35.82, "text": "Ah yalan dünya, ah yalan dünya"}, {"time": 37.77, "text": "Bana bu kadar alkole para harcatan dünya"}, {"time": 40.92, "text": "Soytarıyı kral yapan dünya"}, {"time": 43.32, "text": "Benim mentalimi bi' kadınla mahveden, beni kahreden dünya"}, {"time": 47.09, "text": "Konuşma lütfen"}, {"time": 48.17, "text": "Bi' kez olsun benim gözlerime bak"}, {"time": 51.57, "text": "Sadece o geceyi hatırla"}, {"time": 54.08, "text": "Benden kalan tüm fotoğrafları yak"}, {"time": 56.66, "text": "Kafam dolu paranoya"}, {"time": 58.59, "text": "Tuttu paçamdan ah yalan dünya"}, {"time": 61.74, "text": "Pişirdi bizi bu favela"}, {"time": 64.34, "text": "Sür uzaklara, cataleya"}, {"time": 67.09, "text": "Gülümsemek yok bi' daha, yok"}, {"time": 68.94, "text": "Gülümsemek yok bi' daha"}, {"time": 72.08, "text": "İnan bana, başka çarem yok"}, {"time": 74.66, "text": "İnan bana, başka çarem yok"}, {"time": 76.61, "text": "Selamünaleyk', İstanbul okay"}, {"time": 78.9, "text": "Almanya disconnect, kes tas tıraş, abi"}, {"time": 81.49, "text": "Düştük bu yola bi' şey hesap etmeden"}, {"time": 84.15, "text": "Birimiz hepimiz için, oğlum, ne fark eder?"}, {"time": 86.75, "text": "Sokaklarım belalı, gezemezsin"}, {"time": 88.72, "text": "Ağzında yalanların, lan, tanı babaları"}, {"time": 91.62, "text": "Adidas forma, sağ belde Baretta"}, {"time": 94.4, "text": "İzliyorum arabadan hasımları"}, {"time": 96.33, "text": "S-s-senin ekip kaldıramaz, bur'da silahlarla dans"}, {"time": 98.96, "text": "Bana bi' kez döndü şans, onda da edemem (Pes)"}, {"time": 101.74, "text": "Bi' anda getirdik ses, bu ne ilk ne de son kez"}, {"time": 104.45, "text": "Sana payı veremem, veririm son nefes"}, {"time": 108.06, "text": "Denedim, denedim, denedim"}, {"time": 110.41, "text": "Bulamadım yolunu, bugün ölemedim"}, {"time": 113.28, "text": "Dokuz milim ödetir bedeli"}, {"time": 115.49, "text": "Vicdanıma söz geçiremedim"}, {"time": 118.1, "text": "Kafam dolu paranoya"}, {"time": 120.39, "text": "Tuttu paçamdan, ah yalan dünya"}, {"time": 122.9, "text": "Pişirdi bizi bu favela"}, {"time": 125.61, "text": "Sür uzaklara, cataleya"}, {"time": 128.2, "text": "Gülümsemek yok bi' daha, yok"}, {"time": 130.72, "text": "Gülümsemek yok bi' daha"}, {"time": 133.19, "text": "İnan bana, başka çarem yok"}, {"time": 135.86, "text": "İnan bana, başka çarem yok"}, {"time": 141.6, "text": "Başka çarem yok"}, {"time": 146.88, "text": "Başka çarem yok"}],
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
    lyrics: `(Gezer on the beat)
(Ge-Ge-Gezer on the beat)
(Archie)
Hayat güzel, yüksekte c'est ma vie-vie
Coco Chanel, takılırım Neymar gibi
Jacky Cola, viski ve yanında puro
Kalbimde habibi, ateşlerde yandım puto
Organize baba loco, he la, dört yanımda bela
Ediyo'san merak sana göndereyim selam
Instagram'a foto, altımda bi' moto'
Param haram olsa da ailem der "Helal"
Ah yalan dünya, ah yalan dünya
Bana bu kadar alkole para harcatan dünya
Soytarıyı kral yapan dünya
Benim mentalimi bi' kadınla mahveden, beni kahreden dünya
Konuşma lütfen
Bi' kez olsun benim gözlerime bak
Sadece o geceyi hatırla
Benden kalan tüm fotoğrafları yak
Kafam dolu paranoya
Tuttu paçamdan ah yalan dünya
Pişirdi bizi bu favela
Sür uzaklara, cataleya
Gülümsemek yok bi' daha, yok
Gülümsemek yok bi' daha
İnan bana, başka çarem yok
İnan bana, başka çarem yok
Selamünaleyk', İstanbul okay
Almanya disconnect, kes tas tıraş, abi
Düştük bu yola bi' şey hesap etmeden
Birimiz hepimiz için, oğlum, ne fark eder?
Sokaklarım belalı, gezemezsin
Ağzında yalanların, lan, tanı babaları
Adidas forma, sağ belde Baretta
İzliyorum arabadan hasımları
S-s-senin ekip kaldıramaz, bur'da silahlarla dans
Bana bi' kez döndü şans, onda da edemem (Pes)
Bi' anda getirdik ses, bu ne ilk ne de son kez
Sana payı veremem, veririm son nefes
Denedim, denedim, denedim
Bulamadım yolunu, bugün ölemedim
Dokuz milim ödetir bedeli
Vicdanıma söz geçiremedim
Kafam dolu paranoya
Tuttu paçamdan, ah yalan dünya
Pişirdi bizi bu favela
Sür uzaklara, cataleya
Gülümsemek yok bi' daha, yok
Gülümsemek yok bi' daha
İnan bana, başka çarem yok
İnan bana, başka çarem yok
Başka çarem yok
Başka çarem yok`,
  },
  {
    id: "alisamadim",
    syncedLyrics: [{"time": 7.92, "text": "(B-B-BIGBAT)"}, {"time": 11.16, "text": "Kanatlarım var, kurtuldum yalanlarından"}, {"time": 14.54, "text": "Zamanla insan vazgeçer yarınlarından"}, {"time": 19.07, "text": "Yaralarımla çıktım tüm savaşlarımdan"}, {"time": 22.84, "text": "Sana bir yürek ayırdım kalanlarımdan"}, {"time": 25.34, "text": "Onun isteği son model araba, benimse sadece kurtulmak yaradan"}, {"time": 29.16, "text": "Kızım, unuttun galiba, ben geliyorum kaybedenlerin olduğu diyardan"}, {"time": 32.88, "text": "Onu gördüğüm günden beri istesem de kurtulamıyorum ki beladan"}, {"time": 36.84, "text": "Hey-yeah, gözleri eladan, koynumda besledim yılanları"}, {"time": 42.28, "text": "Gözüme bak, söyle, sevmedin mi hiç beni?"}, {"time": 46.2, "text": "Yerine koyamadım asla başka birilerini"}, {"time": 50.16, "text": "Ne yazık bana, tanıyamamışım seni"}, {"time": 54.19, "text": "Yatamıyo'm hâlâ geceleri"}, {"time": 56.08, "text": "Alışamadım"}, {"time": 57.67, "text": "Sensiz yapamadım"}, {"time": 59.39, "text": "Bu benim suçum mu?"}, {"time": 61.57, "text": "Bu benim suçum mu?"}, {"time": 63.71, "text": "Hep seni aradım"}, {"time": 65.67, "text": "Sensiz yapamadım"}, {"time": 67.42, "text": "Bu benim suçum mu?"}, {"time": 69.44, "text": "Bu benim suçum mu? (Ah-ah-ah)"}, {"time": 73.87, "text": "İnatlarınla bıktırdın beni sevdadan (Ah-ah)"}, {"time": 77.9, "text": "Yakanda elim, ahım var, bunu unutma (Ah-ah)"}, {"time": 81.84, "text": "Eğer kolaysa at gitsin kalan ne varsa"}, {"time": 85.63, "text": "Ve hep palavra, duyduklarım hep palavra (Ah-ah)"}, {"time": 88.96, "text": "En güzel yaşlarımı aldın, bu aşkta sensin katil"}, {"time": 92.99, "text": "Hayallerimi dağıttın, bana beni ver kâfi"}, {"time": 97.11, "text": "Kalabalıkta yalnız, verdiğin sözler hani?"}, {"time": 100.66, "text": "Bu gecelik gel bari"}, {"time": 103.2, "text": "Alışamadım"}, {"time": 105.18, "text": "Sensiz yapamadım"}, {"time": 106.98, "text": "Bu benim suçum mu?"}, {"time": 108.97, "text": "Bu benim suçum mu?"}, {"time": 111.01, "text": "Hep seni aradım"}, {"time": 113.03, "text": "Sensiz yapamadım"}, {"time": 114.74, "text": "Bu benim suçum mu?"}, {"time": 144, "text": "Bu benim suçum mu?"}],
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
    lyrics: `(B-B-BIGBAT)
Kanatlarım var, kurtuldum yalanlarından
Zamanla insan vazgeçer yarınlarından
Yaralarımla çıktım tüm savaşlarımdan
Sana bir yürek ayırdım kalanlarımdan
Onun isteği son model araba, benimse sadece kurtulmak yaradan
Kızım, unuttun galiba, ben geliyorum kaybedenlerin olduğu diyardan
Onu gördüğüm günden beri istesem de kurtulamıyorum ki beladan
Hey-yeah, gözleri eladan, koynumda besledim yılanları
Gözüme bak, söyle, sevmedin mi hiç beni?
Yerine koyamadım asla başka birilerini
Ne yazık bana, tanıyamamışım seni
Yatamıyo'm hâlâ geceleri
Alışamadım
Sensiz yapamadım
Bu benim suçum mu?
Bu benim suçum mu?
Hep seni aradım
Sensiz yapamadım
Bu benim suçum mu?
Bu benim suçum mu? (Ah-ah-ah)
İnatlarınla bıktırdın beni sevdadan (Ah-ah)
Yakanda elim, ahım var, bunu unutma (Ah-ah)
Eğer kolaysa at gitsin kalan ne varsa
Ve hep palavra, duyduklarım hep palavra (Ah-ah)
En güzel yaşlarımı aldın, bu aşkta sensin katil
Hayallerimi dağıttın, bana beni ver kâfi
Kalabalıkta yalnız, verdiğin sözler hani?
Bu gecelik gel bari
Alışamadım
Sensiz yapamadım
Bu benim suçum mu?
Bu benim suçum mu?
Hep seni aradım
Sensiz yapamadım
Bu benim suçum mu?
Bu benim suçum mu?`,
  },
  {
    id: "mahalle",
    syncedLyrics: [{"time": 7.35, "text": "Ya-ah, ah-ah"}, {"time": 9.25, "text": "Uh-ah, ah"}, {"time": 11.96, "text": "Ah"}, {"time": 18.08, "text": "Turnusol gibi kanım artık, be kanka"}, {"time": 20.73, "text": "Hiçbi' şey kalmadı, hepsi kafamda (Uh-uh)"}, {"time": 23.32, "text": "Sakın kurtulursun ellerimden sanma (Uh-uh-uh)"}, {"time": 25.8, "text": "Cehenneme dek iki elim yakanda (Uh)"}, {"time": 28.63, "text": "Broski ist am Apparat (Uh-uh)"}, {"time": 30.22, "text": "Ner'de kaldın, mon ami? (Uh-uh)"}, {"time": 31.38, "text": "Hadi gelsin paralar ama (Uh-uh-uh)"}, {"time": 33.19, "text": "Ö-öbür-öbür tarafta var aşk"}, {"time": 35.32, "text": "Arada bi' kaçamak"}, {"time": 36.64, "text": "Keine Ahnung, was ich mach', ah-ah (Uh-uh)"}, {"time": 39.28, "text": "Bi' araba, b-b-beş kişi, Passat (Ah-ah)"}, {"time": 41.7, "text": "We are from the block, düşünürler gündüz gece (Hah)"}, {"time": 44.81, "text": "Eski dostlar kalmadı masamızda (Hah)"}, {"time": 47.05, "text": "Hamdullah, alles gut, alles okay"}, {"time": 50.04, "text": "Hayaller (Uh-uh) gerçekleşir, inan, çok istersen (Hah)"}, {"time": 56.38, "text": "Trust me, 0-6-7 benim"}, {"time": 58.96, "text": "Mahalle, mahalle"}, {"time": 64.26, "text": "Yine açıkta kaldı fatura"}, {"time": 66.63, "text": "Utancından baban saklar gözyaşını"}, {"time": 69.61, "text": "Mahalle, mahalle"}, {"time": 74.67, "text": "Bur'da durmadan biz verdik mücadele"}, {"time": 77.32, "text": "Puff, puff, pass out, bruder, kaç kere"}, {"time": 80.58, "text": "Tüm mahalle şok, benimleysen olur düşman çok"}, {"time": 83.2, "text": "Ama kaybetmezsin, bebek, kaybetmez Bodrum Block (Uh-uh-uh)"}, {"time": 85.89, "text": "Sağ koltukta prenses çekiyo' makeup vlog (Uh-uh-uh)"}, {"time": 88.45, "text": "Ben çekerim onun için siyah 9 Glock, sana değer"}, {"time": 92.32, "text": "Kaçıncı ihanet? Söyle, bu kaçıncı sefer?"}, {"time": 94.94, "text": "Her şey bi' yalandan ibaretmiş ulan meğer (Uh-uh-uh)"}, {"time": 97.93, "text": "Sana papatyalar, bana mermiler değer (Uh-uh-uh)"}, {"time": 100.33, "text": "Unutma, prenses, serseriler de sever (A-ah)"}, {"time": 102.84, "text": "Sence seçmeliyim hangisini? (Ah-ah-ah)"}, {"time": 104.52, "text": "Güneş belledim ekiplerin kırmızı mavisini, yok plaka (Ah-ah-ah)"}, {"time": 107.7, "text": "Block arası zig-zag, tiki taka"}, {"time": 110.6, "text": "İspata gerek yok, gerek var iki Glock'a"}, {"time": 113.61, "text": "(Anne, artık istemiyorum ateş etmek)"}, {"time": 115.9, "text": "(Ama şeytan solumdan geçiyo' faale)"}, {"time": 118.12, "text": "(Bu mahalle ge-getirdi bizi ne hâle)"}, {"time": 121.42, "text": "Era7capone, evet, yaşayan efsane"}, {"time": 125.45, "text": "Mahalle, mahalle (Ah-ah)"}, {"time": 130.9, "text": "Yine açıkta kaldı fatura (Ah-ah)"}, {"time": 134.13, "text": "Utancından baban saklar gözyaşını (Ah-ah)"}, {"time": 136.18, "text": "Mahalle, mahalle"}, {"time": 141.36, "text": "Bur'da durmadan biz verdik mücadele"}, {"time": 143.81, "text": "Puff, puff, pass out, bruder, kaç kere"}, {"time": 152.55, "text": "(MRLYN)"}],
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
    lyrics: `Ya-ah, ah-ah
Uh-ah, ah
Ah
Turnusol gibi kanım artık, be kanka
Hiçbi' şey kalmadı, hepsi kafamda (Uh-uh)
Sakın kurtulursun ellerimden sanma (Uh-uh-uh)
Cehenneme dek iki elim yakanda (Uh)
Broski ist am Apparat (Uh-uh)
Ner'de kaldın, mon ami? (Uh-uh)
Hadi gelsin paralar ama (Uh-uh-uh)
Ö-öbür-öbür tarafta var aşk
Arada bi' kaçamak
Keine Ahnung, was ich mach', ah-ah (Uh-uh)
Bi' araba, b-b-beş kişi, Passat (Ah-ah)
We are from the block, düşünürler gündüz gece (Hah)
Eski dostlar kalmadı masamızda (Hah)
Hamdullah, alles gut, alles okay
Hayaller (Uh-uh) gerçekleşir, inan, çok istersen (Hah)
Trust me, 0-6-7 benim
Mahalle, mahalle
Yine açıkta kaldı fatura
Utancından baban saklar gözyaşını
Mahalle, mahalle
Bur'da durmadan biz verdik mücadele
Puff, puff, pass out, bruder, kaç kere
Tüm mahalle şok, benimleysen olur düşman çok
Ama kaybetmezsin, bebek, kaybetmez Bodrum Block (Uh-uh-uh)
Sağ koltukta prenses çekiyo' makeup vlog (Uh-uh-uh)
Ben çekerim onun için siyah 9 Glock, sana değer
Kaçıncı ihanet? Söyle, bu kaçıncı sefer?
Her şey bi' yalandan ibaretmiş ulan meğer (Uh-uh-uh)
Sana papatyalar, bana mermiler değer (Uh-uh-uh)
Unutma, prenses, serseriler de sever (A-ah)
Sence seçmeliyim hangisini? (Ah-ah-ah)
Güneş belledim ekiplerin kırmızı mavisini, yok plaka (Ah-ah-ah)
Block arası zig-zag, tiki taka
İspata gerek yok, gerek var iki Glock'a
(Anne, artık istemiyorum ateş etmek)
(Ama şeytan solumdan geçiyo' faale)
(Bu mahalle ge-getirdi bizi ne hâle)
Era7capone, evet, yaşayan efsane
Mahalle, mahalle (Ah-ah)
Yine açıkta kaldı fatura (Ah-ah)
Utancından baban saklar gözyaşını (Ah-ah)
Mahalle, mahalle
Bur'da durmadan biz verdik mücadele
Puff, puff, pass out, bruder, kaç kere
(MRLYN)`,
  },
  {
    id: "tmax",
    syncedLyrics: [{"time": 8.76, "text": "(Edokaleen)"}, {"time": 16.23, "text": "Dokuz milim glock, üstümde var bi emanet"}, {"time": 19.15, "text": "Sizin flowlar rezalet, yaparım felaket"}, {"time": 21.56, "text": "Tam isabet, 067, tamamlanmış full paket"}, {"time": 24.47, "text": "Şirketler der \"Bu nası' cesaret?\""}, {"time": 26.21, "text": "Pafladım ofiste choco marrakesh"}, {"time": 28.52, "text": "Sizinkiler kalleş"}, {"time": 29.62, "text": "Verdim açık adres"}, {"time": 30.57, "text": "Bebe, gel, test et"}, {"time": 31.68, "text": "Otomatik Sig Sauer hasımlara"}, {"time": 33.87, "text": "Gerek yok kasılmana"}, {"time": 35.48, "text": "Her üfleyen dönüyo' aslana"}, {"time": 37.81, "text": "Paslıyo'm çocuklara"}, {"time": 39.78, "text": "Yorma bizi, uğraş onla bunla"}, {"time": 41.32, "text": "Kalash gelir kafana ve başlar savaş"}, {"time": 43.6, "text": "Derdin ne ki, bra, konumunda?"}, {"time": 45.15, "text": "Bir Tmax 25 plaka, benim dadaş"}, {"time": 47.52, "text": "Kolay mı sandın mon ami?"}, {"time": 49.21, "text": "Paralar getirdi, bu kolay değil"}, {"time": 51.24, "text": "Düşünsem en başa döner miyim söyle"}, {"time": 54.64, "text": "ERAY ve Mansur international"}, {"time": 56.58, "text": "Hedefi kaçırma ve kovala"}, {"time": 58.84, "text": "Arkamdan toplanır kovanlar"}, {"time": 60.36, "text": "Bu gece oldu olanlar"}, {"time": 62.3, "text": "Basarım Tmax Tmax"}, {"time": 63.85, "text": "Gaza basarım Tmax Tmax"}, {"time": 66.1, "text": "Suç ortak Tmax Tmax"}, {"time": 67.89, "text": "Suç ortağım Tmax Tmax"}, {"time": 70.42, "text": "Bum, silahlarla farfara"}, {"time": 72.35, "text": "Silahları doldur pikaplara"}, {"time": 74.34, "text": "Zum, kafa zum biraz, baba"}, {"time": 76.21, "text": "Uymadık bugün hiç planlara"}, {"time": 78.42, "text": "Mansur yabadabadu"}, {"time": 79.28, "text": "Hadi kara para bul"}, {"time": 80.19, "text": "Çekiyo'm doksana şut, gol, ah"}, {"time": 82.16, "text": "Bence tarafını seç"}, {"time": 83.03, "text": "Duyuyo'm üç el ateş"}, {"time": 84.06, "text": "Seni vurucak bi' keş"}, {"time": 85.36, "text": "Korkak çocuk, bana bulma bahane"}, {"time": 87.23, "text": "Bilerek yürüyoruz ateşe"}, {"time": 89.19, "text": "İçim gibi yanıyo' nevale"}, {"time": 90.81, "text": "Güvercinler uçurdum hevale pa-pa-pa"}, {"time": 94.26, "text": "Kelimelerini tart"}, {"time": 95.28, "text": "Var aramızda fark"}, {"time": 96.77, "text": "Silahım ediyo pa-pa-pa"}, {"time": 98.27, "text": "607, 067, baba"}, {"time": 100.27, "text": "ERAY ve Mansur international"}, {"time": 102.7, "text": "Hedefi kaçırma ve kovala"}, {"time": 104.98, "text": "Arkamdan toplanır kovanlar"}, {"time": 106.69, "text": "Bu gece oldu olanlar"}, {"time": 108.44, "text": "Basarım Tmax Tmax"}, {"time": 110.19, "text": "Gaza basarım Tmax Tmax"}, {"time": 112.1, "text": "Suç ortak Tmax Tmax"}, {"time": 114.51, "text": "Suç ortağım Tmax Tmax"}],
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
Dokuz milim glock, üstümde var bi emanet
Sizin flowlar rezalet, yaparım felaket
Tam isabet, 067, tamamlanmış full paket
Şirketler der "Bu nası' cesaret?"
Pafladım ofiste choco marrakesh
Sizinkiler kalleş
Verdim açık adres
Bebe, gel, test et
Otomatik Sig Sauer hasımlara
Gerek yok kasılmana
Her üfleyen dönüyo' aslana
Paslıyo'm çocuklara
Yorma bizi, uğraş onla bunla
Kalash gelir kafana ve başlar savaş
Derdin ne ki, bra, konumunda?
Bir Tmax 25 plaka, benim dadaş
Kolay mı sandın mon ami?
Paralar getirdi, bu kolay değil
Düşünsem en başa döner miyim söyle
ERAY ve Mansur international
Hedefi kaçırma ve kovala
Arkamdan toplanır kovanlar
Bu gece oldu olanlar
Basarım Tmax Tmax
Gaza basarım Tmax Tmax
Suç ortak Tmax Tmax
Suç ortağım Tmax Tmax
Bum, silahlarla farfara
Silahları doldur pikaplara
Zum, kafa zum biraz, baba
Uymadık bugün hiç planlara
Mansur yabadabadu
Hadi kara para bul
Çekiyo'm doksana şut, gol, ah
Bence tarafını seç
Duyuyo'm üç el ateş
Seni vurucak bi' keş
Korkak çocuk, bana bulma bahane
Bilerek yürüyoruz ateşe
İçim gibi yanıyo' nevale
Güvercinler uçurdum hevale pa-pa-pa
Kelimelerini tart
Var aramızda fark
Silahım ediyo pa-pa-pa
607, 067, baba
ERAY ve Mansur international
Hedefi kaçırma ve kovala
Arkamdan toplanır kovanlar
Bu gece oldu olanlar
Basarım Tmax Tmax
Gaza basarım Tmax Tmax
Suç ortak Tmax Tmax
Suç ortağım Tmax Tmax`,
  },
  {
    id: "anne",
    syncedLyrics: [{"time": 9.04, "text": "A-ah, a-ah"}, {"time": 13.6, "text": "A-a-ah, a-a-a-ah"}, {"time": 24.58, "text": "Denedim yine şansımı"}, {"time": 26.43, "text": "Kader ördü bana bütün oyunları"}, {"time": 28.69, "text": "Ulan kahpe hayat, bana bakmadın"}, {"time": 30.87, "text": "Sensizken bir gün güneş bile batmadı"}, {"time": 33.45, "text": "İstersen seve seve verirsin hakkımı"}, {"time": 36, "text": "Ya da s**** alırım lan aklını"}, {"time": 38.27, "text": "Bes-besmele çek almadan ağzına adımı"}, {"time": 40.82, "text": "Bur'da kaybetmek istemezsin son şansını"}, {"time": 42.45, "text": "Yine son durak favela"}, {"time": 44.67, "text": "Yakamı bırakmaz bela"}, {"time": 46.83, "text": "Belimi üşütür silah"}, {"time": 49.01, "text": "Bindirdim inada"}, {"time": 51.66, "text": "Kafa is depresif"}, {"time": 54.33, "text": "Gençliğim kayboldu, moruk, bu yolda"}, {"time": 56.67, "text": "Bizim atakların hepsi full kontra"}, {"time": 58.95, "text": "İnan bana"}, {"time": 61.74, "text": "Yüzümde maske var"}, {"time": 64.04, "text": "Ama bunu ben yapmadım anne"}, {"time": 66.4, "text": "Dokuz milim pa-pa-pa"}, {"time": 68.69, "text": "Ama ben patlatmadım anne"}, {"time": 71.08, "text": "Her günüm macera"}, {"time": 73.68, "text": "Eve hiç gelemedim anne"}, {"time": 76.05, "text": "Peşimi bırakmadı mahalle"}, {"time": 78.46, "text": "Affet, affet anne"}, {"time": 80.36, "text": "607, favela, getto in fellas"}, {"time": 82.79, "text": "Bi' tane binanın içinde dönüyo tüm finans"}, {"time": 85.42, "text": "Yaparım bi' alo, \"Kuzen, getir pikap\""}, {"time": 88.01, "text": "Pikapın içinde parçalanmış yedi silah"}, {"time": 90.26, "text": "Şimdi düştük ale, olmuşuz ambale"}, {"time": 92.66, "text": "Yaratıyo'm ciro, topluyorum tane tane"}, {"time": 95, "text": "Ne yaptıysam kurtulamadım, peşimde lanet"}, {"time": 97.32, "text": "Aşk mı, büyü mü, bilmece mi, yoksa kehanet?"}, {"time": 99.45, "text": "Kaçtıkça peşimde gölgem gibi"}, {"time": 101.95, "text": "Hiç tutmadı verdiği sözleri"}, {"time": 104.31, "text": "Vur göğsüme, vur, kızım, hançeri"}, {"time": 106.66, "text": "Zaten yaralıydı birkaç yerim"}, {"time": 109.25, "text": "Yabancı gibiyim şehrime"}, {"time": 111.46, "text": "Küstüm büyüdüğüm caddeye"}, {"time": 113.6, "text": "Ama bunlar senin için mama"}, {"time": 116.58, "text": "Gözyaşına dayanamam"}, {"time": 119.04, "text": "Yüzümde maske var"}, {"time": 121.5, "text": "Ama bunu ben yapmadım anne"}, {"time": 123.87, "text": "Dokuz milim pa-pa-pa"}, {"time": 126.26, "text": "Ama ben patlatmadım anne"}, {"time": 128.54, "text": "Her günüm macera"}, {"time": 131.15, "text": "Eve hiç gelemedim anne"}, {"time": 133.67, "text": "Peşimi bırakmadı mahalle"}, {"time": 136.08, "text": "Affet affet anne"}, {"time": 138.84, "text": "Yüzümde maske var"}, {"time": 142.97, "text": "Dokuz milim pa-pa-pa"}, {"time": 148.06, "text": "Her günüm macera"}, {"time": 150.49, "text": "Eve hiç gelemedim anne"}, {"time": 152.85, "text": "Peşimi bırakmadı mahalle"}, {"time": 156.16, "text": "Affet, affet, affet, ah"}, {"time": 160.26, "text": "Affet, affet anne, affet, affet anne, affet, affet, ah"}, {"time": 169.77, "text": "Affet, affet anne, affet, affet anne, affet, affet, ah"}],
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
    lyrics: `A-ah, a-ah
A-a-ah, a-a-a-ah
Denedim yine şansımı
Kader ördü bana bütün oyunları
Ulan kahpe hayat, bana bakmadın
Sensizken bir gün güneş bile batmadı
İstersen seve seve verirsin hakkımı
Ya da s**** alırım lan aklını
Bes-besmele çek almadan ağzına adımı
Bur'da kaybetmek istemezsin son şansını
Yine son durak favela
Yakamı bırakmaz bela
Belimi üşütür silah
Bindirdim inada
Kafa is depresif
Gençliğim kayboldu, moruk, bu yolda
Bizim atakların hepsi full kontra
İnan bana
Yüzümde maske var
Ama bunu ben yapmadım anne
Dokuz milim pa-pa-pa
Ama ben patlatmadım anne
Her günüm macera
Eve hiç gelemedim anne
Peşimi bırakmadı mahalle
Affet, affet anne
607, favela, getto in fellas
Bi' tane binanın içinde dönüyo tüm finans
Yaparım bi' alo, "Kuzen, getir pikap"
Pikapın içinde parçalanmış yedi silah
Şimdi düştük ale, olmuşuz ambale
Yaratıyo'm ciro, topluyorum tane tane
Ne yaptıysam kurtulamadım, peşimde lanet
Aşk mı, büyü mü, bilmece mi, yoksa kehanet?
Kaçtıkça peşimde gölgem gibi
Hiç tutmadı verdiği sözleri
Vur göğsüme, vur, kızım, hançeri
Zaten yaralıydı birkaç yerim
Yabancı gibiyim şehrime
Küstüm büyüdüğüm caddeye
Ama bunlar senin için mama
Gözyaşına dayanamam
Yüzümde maske var
Ama bunu ben yapmadım anne
Dokuz milim pa-pa-pa
Ama ben patlatmadım anne
Her günüm macera
Eve hiç gelemedim anne
Peşimi bırakmadı mahalle
Affet affet anne
Yüzümde maske var
Dokuz milim pa-pa-pa
Her günüm macera
Eve hiç gelemedim anne
Peşimi bırakmadı mahalle
Affet, affet, affet, ah
Affet, affet anne, affet, affet anne, affet, affet, ah
Affet, affet anne, affet, affet anne, affet, affet, ah`,
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

