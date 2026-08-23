with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Mobile Header Enhancements
target_header_birlikte = """            {/* Birlikte Dinle Button */}
            <button
              type="button"
              onClick={() => setIsListenTogetherOpen(true)}
              className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold uppercase transition-all hidden md:flex items-center gap-1.5"
              title="Canlı Eşzamanlı Dinleme Odaları"
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>BİRLİKTE DİNLE</span>
            </button>"""

replacement_header_birlikte = """            {/* Birlikte Dinle Button (Responsive Desktop + Mobile) */}
            <button
              type="button"
              onClick={() => setIsListenTogetherOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Canlı Eşzamanlı Dinleme Odaları"
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline">BİRLİKTE DİNLE</span>
            </button>"""

if target_header_birlikte in content:
    content = content.replace(target_header_birlikte, replacement_header_birlikte)

# 2. Hero Buttons Mobile Responsive (Full width on mobile, auto on desktop)
target_hero_btns = """            <div className="flex flex-wrap items-center gap-4 pt-4">
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
            </div>"""

replacement_hero_btns = """            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <Button
                size="lg"
                className="rounded-none bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-3.5 shadow-lg shadow-red-600/30 w-full sm:w-auto text-center justify-center active:scale-[0.98]"
                onClick={() => playTrack(PLAYLIST[0])}
              >
                <Play className="h-4 w-4 mr-2 fill-current" /> ALLIANCE DİNLE
              </Button>

              <button
                type="button"
                onClick={() => setIsRightDrawerOpen(true)}
                className="px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 w-full sm:w-auto bg-black/40 active:scale-[0.98]"
              >
                <ListMusic className="h-4 w-4 text-red-500" /> ÇALMA LİSTELERİ & MİXLER
              </button>
            </div>"""

if target_hero_btns in content:
    content = content.replace(target_hero_btns, replacement_hero_btns)

# 3. Mobile Optimized Bottom Dock Player
target_dock = """      {/* 8. FIXED BOTTOM AUDIO PLAYER DOCK */}
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
              onClick={() => setPlaylistModalTrack(currentTrack)}
              className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors"
              title="Çalma Listesine Ekle"
            >
              <Plus className="h-4 w-4" />
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
              onClick={() => setIsFullPlayerOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Tam Ekran Şarkı Sözü Oynatıcısı"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

          </div>

        </div>
      </aside>"""

replacement_dock = """      {/* 8. FIXED BOTTOM AUDIO PLAYER DOCK (FULLY RESPONSIVE MOBILE + DESKTOP) */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#0a0a0a]/96 backdrop-blur-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-2xl safe-area-pb">
        
        {/* Mobile Top Edge Progress Bar */}
        <div className="sm:hidden absolute top-0 left-0 right-0 h-1 bg-neutral-800">
          <div
            className="h-full bg-red-600 transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="container flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Track Info & Artwork (Click to Open Lyrics) */}
          <div
            className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 max-w-[150px] sm:max-w-[240px] cursor-pointer group shrink-0"
            onClick={() => setIsFullPlayerOpen(true)}
            title="Şarkı Sözlerini & Detayları Aç"
          >
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="h-10 w-10 sm:h-12 sm:w-12 aspect-square object-cover border border-white/10 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                {currentTrack.title}
              </p>
              <p className="text-[10px] sm:text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1 flex-1 max-w-xl px-1 sm:px-2">
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                className={`p-1 sm:p-1.5 transition-colors hidden sm:block ${
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
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-transform active:scale-95 shadow-md shrink-0"
                onClick={toggleMasterPlay}
                title={isPlaying ? "Duraklat" : "Oynat"}
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
                className={`p-1 sm:p-1.5 transition-colors hidden sm:block ${
                  repeatMode !== "off" ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleRepeatMode}
                title={`Tekrar Modu: ${repeatMode === "one" ? "Tek Şarkı" : repeatMode === "all" ? "Tüm Şarkılar" : "Kapalı"}`}
              >
                {repeatMode === "one" ? <Repeat1 className="h-3.5 w-3.5" /> : <Repeat className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Desktop Scrubber Bar */}
            <div className="hidden sm:flex items-center gap-3 w-full font-mono text-[11px] text-neutral-400">
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

          {/* Right: Actions (Like, Add to Playlist, Comments, Lyrics Modal Trigger) */}
          <div className="flex items-center gap-1.5 sm:gap-3 font-mono text-xs shrink-0">
            
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
              onClick={() => setPlaylistModalTrack(currentTrack)}
              className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors"
              title="Çalma Listesine Ekle"
            >
              <Plus className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsCommentsDrawerOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Şarkı Yorumları"
            >
              <MessageSquare className="h-4 w-4" />
            </button>

            <div className="hidden md:flex items-center gap-2">
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
              onClick={() => setIsFullPlayerOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Şarkı Sözlerini & Senkronu Aç"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

          </div>

        </div>
      </aside>"""

if target_dock in content:
    content = content.replace(target_dock, replacement_dock)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx mobile responsiveness updated!")
