with open("src/App.tsx", "a", encoding="utf-8") as f:
    f.write('''
      {/* 9. EXPANDABLE FULL PLAYER DRAWER */}
      {isFullPlayerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative max-h-[92vh] w-full max-w-4xl border border-white/10 bg-[#0d0d0d] p-6 md:p-8 flex flex-col shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block">
                  OFFICIAL STUDIO PLAYER
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white">{currentTrack.title}</h3>
                <p className="text-xs text-neutral-400 font-mono">{currentTrack.artist}</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 border border-white/10 p-1 font-mono text-xs">
                <button
                  type="button"
                  className={`px-3 py-1 uppercase font-bold transition-all ${
                    fullPlayerTab === "vinyl" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setFullPlayerTab("vinyl")}
                >
                  VİNİL PLAK
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 uppercase font-bold transition-all ${
                    fullPlayerTab === "video" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setFullPlayerTab("video")}
                >
                  VİDEO KLİP
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 uppercase font-bold transition-all ${
                    fullPlayerTab === "lyrics" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setFullPlayerTab("lyrics")}
                >
                  ŞARKI SÖZLERİ
                </button>
              </div>

              <button
                type="button"
                className="text-neutral-400 hover:text-white p-1"
                onClick={() => setIsFullPlayerOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto py-2">
              {fullPlayerTab === "vinyl" && (
                <div className="flex flex-col items-center justify-center py-6">
                  <VinylAlbumCard
                    title={currentTrack.title}
                    artist={currentTrack.artist}
                    coverImage={currentTrack.image}
                    isPlaying={isPlaying}
                    onPlayClick={toggleMasterPlay}
                  />
                  <div className="mt-4">
                    <canvas ref={fullSpectrumCanvasRef} className="h-9 w-60" />
                  </div>
                </div>
              )}

              {fullPlayerTab === "video" && (
                <div className="aspect-video w-full border border-white/10 bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1`}
                    title={currentTrack.title}
                    className="h-full w-full border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {fullPlayerTab === "lyrics" && (
                <div className="flex flex-col h-full max-h-[420px] font-mono px-2">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" /> RESMİ ŞARKI SÖZLERİ
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      Sözler şarkı akışıyla otomatik senkronize kayar
                    </span>
                  </div>

                  {/* Clean Spotify-style auto-scrolling lyrics */}
                  <div
                    ref={lyricsContainerRef}
                    className="flex-1 overflow-y-auto space-y-4 pr-3 text-center py-4 scroll-smooth"
                  >
                    {currentSyncedLyrics.map((line, idx) => {
                      const isActive = idx === activeLyricIndex && activeLyricIndex !== -1;
                      const isPast = activeLyricIndex !== -1 && idx < activeLyricIndex;

                      return (
                        <p
                          key={idx}
                          id={`lyric-line-${idx}`}
                          className={`text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer py-1 ${
                            isActive
                              ? "text-red-500 font-black scale-105 drop-shadow-[0_0_14px_rgba(255,42,85,0.7)]"
                              : isPast
                              ? "text-neutral-500 hover:text-neutral-300"
                              : "text-neutral-300 hover:text-white"
                          }`}
                          onClick={() => {
                            audioEngine.seekToSeconds(line.time);
                            setCurrentTimeSec(line.time);
                          }}
                          title="Bu satırdan çal"
                        >
                          {line.text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Scrubber & Controls */}
            <div className="border-t border-white/[0.08] pt-4 mt-4 space-y-4 font-mono">
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="w-10 text-right">{formatTime(currentTimeSec)}</span>
                
                <div className="relative flex-1 h-2 flex items-center group cursor-pointer">
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
                    className="absolute h-3.5 w-3.5 rounded-full bg-white border-2 border-red-600 shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>

                <span className="w-10">{formatTime(durationSec)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className={`p-2 transition-colors ${
                      isShuffle ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={toggleShuffle}
                    title="Karışık Çal"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="text-neutral-400 hover:text-white p-2"
                    onClick={handlePrevTrack}
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    className="h-11 w-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 shadow-lg"
                    onClick={toggleMasterPlay}
                  >
                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                  </button>
                  
                  <button
                    type="button"
                    className="text-neutral-400 hover:text-white p-2"
                    onClick={handleNextTrack}
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className={`p-2 transition-colors ${
                      repeatMode !== "off" ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={toggleRepeatMode}
                    title={`Tekrar Modu: ${repeatMode === "one" ? "Tek Şarkı" : repeatMode === "all" ? "Tüm Şarkılar" : "Kapalı"}`}
                  >
                    {repeatMode === "one" ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <Volume2 className="h-4 w-4 text-neutral-400" />
                  <div className="relative w-28 h-2 flex items-center group cursor-pointer">
                    <div className="absolute inset-0 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-75"
                        style={{ width: `${volumePct}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volumePct}
                      onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="absolute h-3.5 w-3.5 rounded-full bg-white border-2 border-red-600 shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                      style={{ left: `${volumePct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 10. AUTH & PROFILE MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={(u) => {
          setCurrentUser(u);
          triggerToast(`Hoş geldiniz, ${u.displayName}!`);
        }}
      />

      {/* 11. ADMIN HUB (SECRET DASHBOARD) */}
      <AdminHub
        isOpen={isAdminHubOpen}
        onClose={() => setIsAdminHubOpen(false)}
      />

      {/* 12. RIGHT SIDEBAR DRAWER (Playlists, Mixes, Chat/DM, Sync) */}
      <RightSidebarDrawer
        isOpen={isRightDrawerOpen}
        onClose={() => setIsRightDrawerOpen(false)}
        onTrackPlay={(t) => playTrack(t)}
        onOpenMixModal={() => setIsMixModalOpen(true)}
        onOpenListenTogether={() => setIsListenTogetherOpen(true)}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* 13. COMMUNITY MIX UPLOAD MODAL */}
      <CommunityMixModal
        isOpen={isMixModalOpen}
        onClose={() => setIsMixModalOpen(false)}
        onMixCreated={() => triggerToast("Mixiniz başarıyla yayınlandı!")}
      />

      {/* 14. LISTEN TOGETHER / SYNC ROOM MODAL */}
      <ListenTogetherModal
        isOpen={isListenTogetherOpen}
        onClose={() => setIsListenTogetherOpen(false)}
        onTrackPlay={(t) => playTrack(t)}
      />

      {/* 15. SONG COMMENTS & STATS DRAWER */}
      <SongCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        track={currentTrack}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 border border-white/20 bg-[#0d0d0d] px-4 py-3 font-mono text-xs text-white shadow-2xl animate-in slide-in-from-right duration-200">
          <span>// {toastMessage}</span>
        </div>
      )}

      {/* FOOTER */}
      <footer className="container mt-20 border-t border-white/[0.08] pt-10 text-xs font-mono text-neutral-500">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 ALLIANCE RECORDS / CULTURE RECORDS. TÜM HAKLARI SAKLIDIR.</p>
          <p>ERAY067 (FRANKFURT) × MANSUR (ANKARA / MALATYA)</p>
        </div>
      </footer>

    </div>
  );
}
''')
print("App.tsx is complete!")
