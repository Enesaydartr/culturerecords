code = """\"use client\";

import React, { useState, useEffect, useRef } from \"react\";

interface SlideData {
  title: string;
  subtitle: string;
  tag: string;
  body: string;
  accent: string;
}

const ERAY_SLIDES: SlideData[] = [
  {
    title: \"ERAY067\",
    subtitle: \"Eray Ünal • 2003 Frankfurt am Main\",
    tag: \"KİMLİK & KÖKEN\",
    body: \"Aslen Tokat Erbaalı bir ailenin çocuğu olarak Frankfurt am Main'de büyüdü. Avrupa sokak kültürünü ve sert German Drill ritmini Türkçe rap sahnesine taşıdı.\",
    accent: \"text-red-500\"
  },
  {
    title: \"067\",
    subtitle: \"Frankfurt Kökleri & Sokak Sadakati\",
    tag: \"DURUŞ\",
    body: \"Mahlasındaki '067', Frankfurt'un alan kodunu ve köklerine bağlılığını temsil eder. Tavizsiz söz yazımı ve çift zamanlı akıcı flow tekniğiyle dikkat çekti.\",
    accent: \"text-red-500\"
  },
  {
    title: \"O SES RAP\",
    subtitle: \"Sefo Takımı • 2025 Şampiyonluğu\",
    tag: \"MİHENK TAŞI\",
    body: \"O Ses Türkiye Rap sahnesinde sergilediği teknik üstünlük ve sahne karizmasıyla jüri ve halk oylamasında sezonun tartışmasız şampiyonu oldu.\",
    accent: \"text-neutral-100\"
  },
  {
    title: \"AVRUPA HATTI\",
    subtitle: \"German Drill & Türkçe Sokak Lirizmi\",
    tag: \"MÜZİKAL DİL\",
    body: \"Almanya gettolarının sert altyapılarını Türk sokak realizmiyle birleştirdi. Frankfurt ile İstanbul arasında bağımsız bir rap köprüsü kurdu.\",
    accent: \"text-red-500\"
  },
  {
    title: \"CLTR\",
    subtitle: \"Mansur ile Kardeşlik & Ortak Vizyon\",
    tag: \"BİRLİKTELİK\",
    body: \"Mansur ile stüdyoda kurduğu organik kimya, Türk rap müziğinde iki kardeş gibi kenetlenen ve listeleri domine eden güçlü bir ikili doğurdu.\",
    accent: \"text-red-500\"
  }
];

const MANSUR_SLIDES: SlideData[] = [
  {
    title: \"MANSUR\",
    subtitle: \"Ahmet Mansur Şahin • 2002 Ankara (Malatya)\",
    tag: \"KİMLİK & KÖKEN\",
    body: \"2002 yılında Ankara'da dünyaya geldi. Aslen Malatyalı olan sanatçı, çocukluk ve gençliğini Ankara gettolarında, Malatya'nın içten dokusuyla harmanlayarak büyüdü.\",
    accent: \"text-neutral-100\"
  },
  {
    title: \"DÖNÜŞÜM\",
    subtitle: \"Sağlık Eğitiminden Tam Zamanlı Müziğe\",
    tag: \"KARARLILIK\",
    body: \"Sağlık Bilimleri alanındaki üniversite eğitimini tamamladıktan sonra mesleki kariyeri geride bırakıp tüm odağını profesyonel müziğe yöneltti.\",
    accent: \"text-neutral-100\"
  },
  {
    title: \"VOKAL MİMARI\",
    subtitle: \"Karakteristik Ses & Sokak Melankolisi\",
    tag: \"SES İMZASI\",
    body: \"Ankara'nın soğuk ayazından beslenen sokak gerçeklerini Malatya melankolisiyle harmanladı. Kendine has buğulu ses tonuyla dönemin en aranan nakarat mimarı oldu.\",
    accent: \"text-red-500\"
  },
  {
    title: \"ORGANİK GERÇEKLİK\",
    subtitle: \"Yapaylıktan Uzak Samimi Lirizm\",
    tag: \"ANLATI\",
    body: \"Şarkılarında hiçbir yapay süslemeye yer vermeden doğrudan kendi yaşanmışlıklarını ve sokak mücadelesini anlatarak dinleyicisiyle sağlam bir bağ kurdu.\",
    accent: \"text-neutral-100\"
  },
  {
    title: \"ALLIANCE\",
    subtitle: \"Culture Records Çatısında Yeni Dönem\",
    tag: \"ORTAK VİZYON\",
    body: \"ERAY067 ile birlikte Culture Records (CLTR) oluşumunu büyüterek ortak albüm projeleri ve kapalı gişe turnelerle rap sahnesinin merkezine yerleştiler.\",
    accent: \"text-neutral-100\"
  }
];

const ALLIANCE_SLIDES: SlideData[] = [
  {
    title: \"ALLIANCE\",
    subtitle: \"Orijinal Plan & Erken Çıkış Kararı\",
    tag: \"ALBÜM HİKAYESİ\",
    body: \"ALLIANCE albümünün normal şartlarda Eylül 2026'da yayınlanması planlanmıştı. Ancak dinleyicilerden gelen olağanüstü talep ve sabırsız beklenti üzerine albüm 31 Temmuz 2026'da erkene çekilerek paylaşıldı.\",
    accent: \"text-red-500\"
  },
  {
    title: \"DİNLEYİCİ İRADESİ\",
    subtitle: \"Sokağın Sesine Tavizsiz Yanıt\",
    tag: \"ERKEN YAYIN\",
    body: \"Stüdyoda ortaya çıkan saf kimya ve sokağın baskısı tüm takvimleri geride bıraktı. ERAY067 ve Mansur, dinleyicinin isteğini ön planda tutarak albümü bekletmeden dijital platformlara sundu.\",
    accent: \"text-red-500\"
  },
  {
    title: \"EYLÜLDE YENİ ALBÜM\",
    subtitle: \"İkinci Büyük Sürpriz Yolda\",
    tag: \"GELECEK VİZYONU\",
    body: \"ALLIANCE'ın erkene çekilmesiyle boşluk oluşmadı: Eylül ayında Culture Records çatısı altında dinleyicileri bambaşka yepyeni bir stüdyo albümü projesi daha bekliyor!\",
    accent: \"text-amber-400\"
  },
  {
    title: \"8 ORTAK ŞAHESER\",
    subtitle: \"Albümün Güçlü Parça Listesi\",
    tag: \"PARÇALAR & İŞBİRLİKLERİ\",
    body: \"Albüm; 'bak ne dicem', Contra düetli 'gücüm yok', 'NAFİLE', 'bilezik pırlanta', Yung Ouzo düetli 'olm was rap mep', Reder düetli 'yesler', 'sofi' ve 'outro (selam götürün)' ile 8 başyapıttan oluşuyor.\",
    accent: \"text-red-500\"
  },
  {
    title: \"CLTR SOUND\",
    subtitle: \"Waxy & Culture Records Prodüksiyonu\",
    tag: \"MÜZİKAL MİMARİ\",
    body: \"Sert 808 basları, karanlık melodileri ve Waxy'nin üst düzey mix & mastering mühendisliğiyle ALLIANCE, Türk drill ve sokak rap sahnesine yeni bir standart getirdi.\",
    accent: \"text-neutral-100\"
  }
];

export default function Character3DScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeChar, setActiveChar] = useState<\"eray\" | \"mansur\" | \"alliance\">(\"eray\");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const erayFramesRef = useRef<HTMLImageElement[]>([]);
  const mansurFramesRef = useRef<HTMLImageElement[]>([]);
  const allianceFramesRef = useRef<HTMLImageElement[]>([]);

  const TOTAL_FRAMES = 72;

  const renderFrame = (char: \"eray\" | \"mansur\" | \"alliance\", frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext(\"2d\");
    if (!ctx) return;

    canvas.width = 540;
    canvas.height = 800;
    ctx.clearRect(0, 0, 540, 800);

    let frameList: HTMLImageElement[];
    if (char === \"eray\") {
      frameList = erayFramesRef.current;
    } else if (char === \"mansur\") {
      frameList = mansurFramesRef.current;
    } else {
      frameList = allianceFramesRef.current;
    }

    const img = frameList[frameIdx % TOTAL_FRAMES];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = \"high\";
      ctx.drawImage(img, 0, 0, 540, 800);
    }
  };

  useEffect(() => {
    const firstEray = new Image();
    firstEray.src = `/assets/videos/frames/eray/frame_000.webp`;
    firstEray.onload = () => renderFrame(\"eray\", 0);
    erayFramesRef.current[0] = firstEray;

    const firstMansur = new Image();
    firstMansur.src = `/assets/videos/frames/mansur/frame_000.webp`;
    mansurFramesRef.current[0] = firstMansur;

    const firstAlliance = new Image();
    firstAlliance.src = `/assets/videos/frames/alliance/frame_000.webp`;
    allianceFramesRef.current[0] = firstAlliance;

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const numStr = String(i).padStart(3, \"0\");

      const imgEray = new Image();
      imgEray.src = `/assets/videos/frames/eray/frame_${numStr}.webp`;
      erayFramesRef.current[i] = imgEray;

      const imgMansur = new Image();
      imgMansur.src = `/assets/videos/frames/mansur/frame_${numStr}.webp`;
      mansurFramesRef.current[i] = imgMansur;

      const imgAlliance = new Image();
      imgAlliance.src = `/assets/videos/frames/alliance/frame_${numStr}.webp`;
      allianceFramesRef.current[i] = imgAlliance;
    }

    renderFrame(\"eray\", 0);
  }, []);

  useEffect(() => {
    renderFrame(activeChar, currentFrame);
  }, [currentFrame, activeChar]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      if (progress < 0.333) {
        setActiveChar(\"eray\");
        const subProgress = progress / 0.333;
        const frameIdx = Math.floor(subProgress * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIdx);
      } else if (progress < 0.666) {
        setActiveChar(\"mansur\");
        const subProgress = (progress - 0.333) / 0.333;
        const frameIdx = Math.floor(subProgress * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIdx);
      } else {
        setActiveChar(\"alliance\");
        const subProgress = (progress - 0.666) / 0.334;
        // User requirement: \"ilk saniyelerde hızlı ilerlesin sonra yavaşlasın\" (fast at first, then decelerating curve)
        const easedProgress = Math.pow(subProgress, 0.55);
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(easedProgress * (TOTAL_FRAMES - 1)));
        setCurrentFrame(frameIdx);
      }
    };

    window.addEventListener(\"scroll\", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener(\"scroll\", handleScroll);
  }, []);

  let slides: SlideData[];
  let localProgress: number;

  if (activeChar === \"eray\") {
    slides = ERAY_SLIDES;
    localProgress = scrollProgress / 0.333;
  } else if (activeChar === \"mansur\") {
    slides = MANSUR_SLIDES;
    localProgress = (scrollProgress - 0.333) / 0.333;
  } else {
    slides = ALLIANCE_SLIDES;
    localProgress = (scrollProgress - 0.666) / 0.334;
  }

  localProgress = Math.max(0, Math.min(1, localProgress));

  const activeSlideIndex = Math.min(
    slides.length - 1,
    Math.max(0, Math.floor(localProgress * slides.length))
  );

  const activeSlide = slides[activeSlideIndex];
  const slideSegmentProgress = (localProgress * slides.length) - activeSlideIndex;
  
  let slideOpacity = 1.0;
  if (slideSegmentProgress < 0.18) {
    slideOpacity = slideSegmentProgress / 0.18;
  } else if (slideSegmentProgress > 0.82) {
    slideOpacity = (1.0 - slideSegmentProgress) / 0.18;
  }

  const translateY = (0.5 - slideSegmentProgress) * 12;

  return (
    <section ref={containerRef} className=\"relative min-h-[1200vh] w-full bg-[#080808] border-t border-b border-white/[0.08]\">
      
      {/* Sticky Fullscreen Stage */}
      <div className=\"sticky top-0 z-20 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8\">
        
        {/* Subtle Architectural Lighting */}
        <div className=\"absolute inset-0 flex items-center justify-center pointer-events-none\">
          <div className={`h-[500px] w-[500px] rounded-full blur-[140px] transition-all duration-700 ${
            activeChar === \"alliance\" ? \"bg-red-950/40\" : \"bg-neutral-900/60\"
          }`} />
        </div>

        <div className=\"container max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center\">
          
          {/* LEFT: 3D MODEL / GRAMOPHONE (Transparent, Raw, Borderless) */}
          <div className=\"relative flex flex-col items-center justify-center select-none\">
            
            {/* Top Minimal Tracker */}
            <div className=\"mb-2 flex items-center gap-2.5\">
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                activeChar === \"alliance\" ? \"bg-amber-400\" : \"bg-red-600\"
              }`} />
              <span className=\"font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400\">
                {activeChar === \"eray\" && \"ERAY067 // FRANKFURT\"}
                {activeChar === \"mansur\" && \"MANSUR // ANKARA\"}
                {activeChar === \"alliance\" && \"ALLIANCE // ALBUM EXPERIENCE\"}
              </span>
            </div>

            {/* Canvas */}
            <div className=\"relative flex h-[380px] w-[260px] sm:h-[460px] sm:w-[320px] md:h-[540px] md:w-[380px] items-center justify-center\">
              <div className=\"absolute bottom-4 h-10 w-52 rounded-full bg-black/95 blur-2xl pointer-events-none\" />

              <canvas
                ref={canvasRef}
                className=\"relative z-10 h-full w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.98)]\"
              />
            </div>

            {/* Stage indicator pills */}
            <div className=\"mt-3 flex items-center gap-2 font-mono text-[10px] font-bold\">
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === \"eray\" ? \"border-red-500 bg-red-950/60 text-white\" : \"border-white/10 text-neutral-600\"
              }`}>
                01. ERAY067
              </span>
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === \"mansur\" ? \"border-red-500 bg-red-950/60 text-white\" : \"border-white/10 text-neutral-600\"
              }`}>
                02. MANSUR
              </span>
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === \"alliance\" ? \"border-amber-500 bg-amber-950/60 text-amber-300\" : \"border-white/10 text-neutral-600\"
              }`}>
                03. ALLIANCE
              </span>
            </div>

          </div>

          {/* RIGHT: BOLD EDITORIAL TYPOGRAPHY (Single Statement Reveal) */}
          <div className=\"relative flex flex-col justify-center items-start select-none min-h-[300px] max-w-full overflow-hidden\">
            
            <div
              key={`${activeChar}_${activeSlideIndex}`}
              className=\"space-y-3.5 transition-all duration-150 ease-out max-w-full\"
              style={{
                opacity: Math.max(0.02, slideOpacity),
                transform: `translateY(${translateY}px)`
              }}
            >
              {/* Category Tag */}
              <div className=\"flex items-center gap-2\">
                <span className=\"font-mono text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-neutral-500\">
                  {activeSlide.tag}
                </span>
              </div>

              {/* Bold Title */}
              <h2 className=\"text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight break-words max-w-full\">
                {activeSlide.title}
              </h2>

              {/* Subtitle */}
              <p className=\"text-xs sm:text-sm font-mono font-medium text-neutral-400 tracking-wide\">
                {activeSlide.subtitle}
              </p>

              {/* Body */}
              <p className=\"text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light pt-1 max-w-xl break-words\">
                {activeSlide.body}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
"""

with open("src/components/ui/character-3d-scroll-showcase.tsx", "w", encoding="utf-8") as f:
    f.write(code)

print("character-3d-scroll-showcase.tsx updated with ALLIANCE section, green screen removed video frames and nonlinear curve!")
