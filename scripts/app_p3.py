with open("src/App.tsx", "a", encoding="utf-8") as f:
    f.write('''
  // Keyboard listener for Spacebar play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        e.target instanceof HTMLElement &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) &&
        !isAuthModalOpen &&
        !isAdminHubOpen
      ) {
        e.preventDefault();
        toggleMasterPlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTimeSec, currentTrack, isAuthModalOpen, isAdminHubOpen]);

  // Spectrum animation (Bottom Dock)
  useEffect(() => {
    let animationFrameId: number;
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 50;
    canvas.height = 18;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, 50, 18);
      const data = audioEngine.getSpectrumData();

      const barCount = 7;
      const barWidth = 3.5;
      const gap = 3;

      for (let i = 0; i < barCount; i++) {
        const val = isPlaying ? data[i * 3] || 0 : Math.sin(Date.now() / 400 + i) * 5 + 6;
        const barHeight = Math.max(2, (val / 255) * 16);

        ctx.fillStyle = isPlaying ? "#e50914" : "#525252";
        ctx.fillRect(i * (barWidth + gap), 18 - barHeight, barWidth, barHeight);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Spectrum animation (Full Player)
  useEffect(() => {
    let animationFrameId: number;
    const canvas = fullSpectrumCanvasRef.current;
    if (!canvas || !isFullPlayerOpen) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 240;
    canvas.height = 36;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, 240, 36);
      const data = audioEngine.getSpectrumData();

      const barCount = 24;
      const barWidth = 5;
      const gap = 3;

      for (let i = 0; i < barCount; i++) {
        const val = isPlaying ? data[i] || 0 : Math.sin(Date.now() / 350 + i) * 10 + 12;
        const barHeight = Math.max(3, (val / 255) * 34);

        ctx.fillStyle = "#e50914";
        ctx.fillRect(i * (barWidth + gap), 36 - barHeight, barWidth, barHeight);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isFullPlayerOpen]);

  const filteredTracks = PLAYLIST.filter((track) => {
    if (activeCategory === "all") return true;
    return track.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-red-600 selection:text-white pb-28 font-mono">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="sticky top-0 z-40 h-16 w-full border-b border-white/[0.08] bg-[#0a0a0a]/92 backdrop-blur-xl">
        <div className="container flex h-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center bg-red-600 text-white font-black text-xs tracking-tighter shadow-md">
              067
            </div>
            <span className="font-mono text-sm font-bold tracking-tight text-white uppercase">
              ERAY067 <span className="text-neutral-600">/</span> MANSUR
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium text-neutral-400">
            <a href="#about" className="transition-colors hover:text-white">BİYOGRAFİ</a>
            <a href="#alliance" className="transition-colors hover:text-white">ALLIANCE</a>
            <a href="#discography" className="transition-colors hover:text-white">DİSKOGRAFİ</a>
            <a href="#news-section" className="transition-colors hover:text-white">HABERLER</a>
            <a href="#tour" className="transition-colors hover:text-white">KONSER TAKVİMİ</a>
          </nav>

          {/* Top Actions: Right Hub Drawer, Listen Together, Auth & Admin Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Topluluk & Playlist Button */}
            <button
              type="button"
              onClick={() => setIsRightDrawerOpen(true)}
              className="px-3 py-1.5 bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm"
              title="Çalma Listeleri & Topluluk Hub"
            >
              <ListMusic className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">TOPLULUK & LİSTELER</span>
            </button>

            {/* Birlikte Dinle Button */}
            <button
              type="button"
              onClick={() => setIsListenTogetherOpen(true)}
              className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold uppercase transition-all hidden md:flex items-center gap-1.5"
              title="Canlı Eşzamanlı Dinleme Odaları"
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>BİRLİKTE DİNLE</span>
            </button>

            {/* Discreet Admin Hub Trigger (Visible only if user is admin) */}
            {currentUser?.role === "admin" && (
              <button
                type="button"
                onClick={() => setIsAdminHubOpen(true)}
                className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500 text-yellow-300 hover:text-black border border-yellow-500/40 text-xs font-black uppercase transition-all flex items-center gap-1.5 shadow-md animate-pulse"
                title="Resmi Yönetici Paneli"
              >
                <span>👑 ADMİN HUB</span>
              </button>
            )}

            {/* User Account / Login Button */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("profile");
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 p-1 bg-white/5 border border-white/15 hover:border-white/40 transition-all"
                title="Profilim"
              >
                <img src={currentUser.avatar} alt={currentUser.displayName} className="h-6 w-6 object-cover" />
                <span className="text-xs font-bold text-white hidden sm:inline max-w-[90px] truncate">
                  {currentUser.displayName}
                </span>
              </button>
            ) : (
              <Button
                size="sm"
                className="rounded-none bg-white text-black hover:bg-neutral-200 font-mono text-xs font-black uppercase px-3.5 h-8"
                onClick={() => {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                }}
              >
                <User className="h-3.5 w-3.5 mr-1" /> GİRİŞ YAP
              </Button>
            )}

          </div>
        </div>
      </header>

      {/* 2. BRUTALIST CINEMATIC HERO */}
      <section className="relative w-full border-b border-white/[0.08] py-16 md:py-24 overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-neutral-400">
              <span className="h-2 w-2 bg-red-600 animate-pulse" />
              <span>OFFICIAL ARTIST HUB // CULTURE RECORDS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] break-words max-w-full">
              ERAY067 <br />
              <span className="text-neutral-500 font-light">&</span> MANSUR
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 font-light max-w-xl leading-relaxed">
              Almanya sokaklarından Türkiye'ye uzanan yeni nesil drill & rap hareketi. Frankfurt ve Ankara hattında sert 808 baslar, benzersiz flowlar ve milyonlarca dinlenen ortak başyapıtlar.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-none bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 shadow-lg shadow-red-600/30"
                onClick={() => playTrack(PLAYLIST[0])}
              >
                <Play className="h-4 w-4 mr-2 fill-current" /> ALLIANCE DİNLE
              </Button>

              <button
                type="button"
                onClick={() => setIsRightDrawerOpen(true)}
                className="px-6 py-3 border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <ListMusic className="h-4 w-4 text-red-500" /> ÇALMA LİSTELERİ & MİXLER
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative">
            <div className="relative border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
              <img
                src="/assets/images/alliance_cover.jpg"
                alt="ERAY067 x MANSUR ALLIANCE Cover"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block mb-1">
                  OFFICIAL JOINT ALBUM
                </span>
                <h3 className="text-2xl font-black text-white uppercase">ALLIANCE (2026)</h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  12 Parça • Orijinal Frankfurt & İstanbul Prodüksiyonları
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ABOUT / BIOGRAPHY SECTION */}
      <section id="about" className="py-20 border-b border-white/[0.08]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* ERAY067 Bio */}
            <div className="border border-white/10 bg-black/40 p-8 space-y-6">
              <div className="flex items-center gap-4">
                <img src="/assets/images/eray067_portrait.jpg" alt="ERAY067" className="h-20 w-20 object-cover border border-white/20" />
                <div>
                  <span className="text-xs text-red-500 font-bold uppercase tracking-widest block">SANATÇI PROFİLİ</span>
                  <h3 className="text-2xl font-black text-white">ERAY067</h3>
                  <p className="text-xs text-neutral-400">Frankfurt am Main, Almanya • Rapper / Söz Yazarı</p>
                </div>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                O Ses Rap şampiyonu olan ERAY067, Almanya drill kültürünü Türk rap sahnesine en otantik ve sert biçimde taşıyan öncü isimlerden biridir. G-WAGON, TMAX ve BRAPAP gibi hitleriyle milyonlarca dinlenmeye ulaşmıştır.
              </p>
            </div>

            {/* MANSUR Bio */}
            <div className="border border-white/10 bg-black/40 p-8 space-y-6">
              <div className="flex items-center gap-4">
                <img src="/assets/images/mansur_portrait.jpg" alt="MANSUR" className="h-20 w-20 object-cover border border-white/20" />
                <div>
                  <span className="text-xs text-red-500 font-bold uppercase tracking-widest block">PRODÜKTÖR & SANATÇI</span>
                  <h3 className="text-2xl font-black text-white">MANSUR</h3>
                  <p className="text-xs text-neutral-400">Ankara / Malatya • Prodüktör / Rapper</p>
                </div>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                Alliance projesinin beyni ve prodüktörü olan Mansur, melodik 808 basları ve akılda kalıcı nakaratlarıyla hit fabrikası haline gelmiştir. NAFİLE ve BİLEZİK PIRLANTA gibi parçaların arkasındaki imza prodüktördür.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 3D SHOWCASE / ALBUM SPOTLIGHT */}
      <section id="alliance" className="py-20 border-b border-white/[0.08]">
        <div className="container space-y-10">
          <div>
            <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">OFFICIAL DISCOGRAPHY SHOWCASE</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">ALLIANCE ALBÜM DENEYİMİ</h2>
          </div>
          <Character3DScrollShowcase onTrackSelect={(trackId) => {
            const tr = PLAYLIST.find((t) => t.id === trackId);
            if (tr) playTrack(tr);
          }} />
        </div>
      </section>
''')
print("Part 3 written")
