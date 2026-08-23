with open("src/App.tsx", "a", encoding="utf-8") as f:
    f.write('''
      {/* 5. DISCOGRAPHY SECTION */}
      <section id="discography" className="py-20 border-b border-white/[0.08]">
        <div className="container space-y-10">
          
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">OFFICIAL RELEASES</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase">DİSKOGRAFİ & PARÇALAR</h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
              {[
                { id: "all", label: "TÜMÜ" },
                { id: "alliance", label: "ALLIANCE" },
                { id: "hits", label: "HİTLER" },
                { id: "collab", label: "DÜETLER" }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id as any)}
                  className={`px-4 py-2 border transition-all ${
                    activeCategory === c.id
                      ? "bg-white text-black border-white"
                      : "border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tracks List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTracks.map((track) => {
              const isCurrent = currentTrack.id === track.id;
              const stats = PlaylistService.getSongStats(track.id, currentUser?.id);

              return (
                <div
                  key={track.id}
                  className={`p-4 border transition-all flex items-center justify-between gap-4 group ${
                    isCurrent
                      ? "border-red-500 bg-red-950/20 shadow-lg"
                      : "border-white/10 bg-black/40 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative h-14 w-14 aspect-square border border-white/20 overflow-hidden shrink-0">
                      <img src={track.image} alt={track.title} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => playTrack(track)}
                        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                          isCurrent && isPlaying ? "opacity-100 text-red-500" : "opacity-0 group-hover:opacity-100 text-white"
                        }`}
                      >
                        {isCurrent && isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}
                      </button>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-white truncate group-hover:text-red-400 transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                      
                      {/* Stats line: Likes & Listens */}
                      <div className="flex items-center gap-3 text-[10px] text-neutral-500 mt-1">
                        <span>❤️ {stats.likesCount.toLocaleString("tr-TR")}</span>
                        <span>🎧 {stats.totalListens.toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentUser) {
                          setAuthModalMode("login");
                          setIsAuthModalOpen(true);
                          return;
                        }
                        PlaylistService.toggleLikeSong(track.id, currentUser.id);
                      }}
                      className={`p-2 transition-colors ${stats.isLikedByMe ? "text-red-500" : "text-neutral-500 hover:text-white"}`}
                      title="Beğen"
                    >
                      <Heart className={`h-4 w-4 ${stats.isLikedByMe ? "fill-current" : ""}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playTrack(track);
                        setIsCommentsDrawerOpen(true);
                      }}
                      className="p-2 text-neutral-500 hover:text-white transition-colors"
                      title="Yorumlar & Sohbet"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. OFFICIAL NEWS SECTION */}
      <NewsSection
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* 7. TOUR DATES / CONCERT SCHEDULE */}
      <section id="tour" className="py-20 border-b border-white/[0.08]">
        <div className="container space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">LIVE IN CONCERT</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase">2026 TURNE TAKVİMİ</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bubilet Resmi Gişe Entegrasyonu</span>
            </div>
          </div>

          <div className="space-y-3">
            {liveConcerts.map((concert) => (
              <div
                key={concert.id}
                className="p-5 border border-white/10 bg-black/40 hover:border-red-500/40 transition-all flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-[220px]">
                  <div className="h-12 w-12 bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center font-mono">
                    <span className="text-[10px] text-red-500 font-bold uppercase">{concert.date.split(" ")[1]}</span>
                    <span className="text-sm font-black text-white">{concert.date.split(" ")[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white uppercase">{concert.city}</h4>
                    <p className="text-xs text-neutral-400">{concert.venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {concert.time}</span>
                  <span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase">
                    ✓ SATIŞTA
                  </span>
                </div>

                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  <Ticket className="h-4 w-4" /> BİLET AL ➔
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FIXED BOTTOM AUDIO PLAYER DOCK */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#0a0a0a]/96 backdrop-blur-2xl px-4 py-3">
        <div className="container flex items-center justify-between gap-4">
          
          {/* Left: Track Info & Likes */}
          <div
            className="flex items-center gap-3.5 min-w-0 max-w-[240px] cursor-pointer group"
            onClick={() => setIsFullPlayerOpen(true)}
          >
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="h-12 w-12 aspect-square object-cover border border-white/10 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                {currentTrack.title}
              </p>
              <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1.5 flex-1 max-w-xl px-2">
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                className={`p-1.5 transition-colors ${
                  isShuffle ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleShuffle}
                title="Karışık Çal"
              >
                <Shuffle className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                onClick={handlePrevTrack}
                title="Önceki Şarkı"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-transform active:scale-95 shadow-md"
                onClick={toggleMasterPlay}
                title={isPlaying ? "Duraklat (Space)" : "Oynat (Space)"}
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                onClick={handleNextTrack}
                title="Sonraki Şarkı"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <button
                type="button"
                className={`p-1.5 transition-colors ${
                  repeatMode !== "off" ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleRepeatMode}
                title={`Tekrar Modu: ${repeatMode === "one" ? "Tek Şarkı" : repeatMode === "all" ? "Tüm Şarkılar" : "Kapalı"}`}
              >
                {repeatMode === "one" ? <Repeat1 className="h-3.5 w-3.5" /> : <Repeat className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* DUAL-COLOR PROGRESS BAR */}
            <div className="flex items-center gap-3 w-full font-mono text-[11px] text-neutral-400">
              <span className="w-8 text-right">{formatTime(currentTimeSec)}</span>
              
              <div className="relative flex-1 h-1.5 flex items-center group cursor-pointer">
                <div className="absolute inset-0 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-75"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progressPercent}
                  onChange={handleScrubberChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div
                  className="absolute h-3 w-3 rounded-full bg-white border border-red-600 shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              <span className="w-8">{formatTime(durationSec)}</span>
            </div>

          </div>

          {/* Right: Like, Comments, Volume & Maximize */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
            
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                  return;
                }
                PlaylistService.toggleLikeSong(currentTrack.id, currentUser.id);
              }}
              className={`p-1.5 transition-colors ${currentStats.isLikedByMe ? "text-red-500" : "text-neutral-400 hover:text-white"}`}
              title="Şarkıyı Beğen"
            >
              <Heart className={`h-4 w-4 ${currentStats.isLikedByMe ? "fill-current" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setIsCommentsDrawerOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Şarkı Yorumları"
            >
              <MessageSquare className="h-4 w-4" />
            </button>

            <canvas ref={spectrumCanvasRef} className="h-4 w-10" />
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                onClick={toggleMute}
                title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4 text-neutral-400" />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={volumePct}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                className="w-16 h-1 cursor-pointer appearance-none bg-white/20 accent-red-600"
              />
            </div>

            <button
              type="button"
              className="text-neutral-400 hover:text-white transition-colors p-1.5"
              onClick={() => setIsFullPlayerOpen(true)}
              title="Genişlet"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

        </div>
      </aside>
''')
print("Part 4 written")
