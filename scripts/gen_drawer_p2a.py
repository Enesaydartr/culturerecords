with open("src/components/RightSidebarDrawer.tsx", "a", encoding="utf-8") as f:
    f.write('''
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col font-mono text-xs z-10 animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-red-600 text-white flex items-center justify-center font-black text-xs">
              ⚡
            </div>
            <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
              ALLIANCE TOPLULUK & PLAYLIST
            </span>
          </div>

          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1 hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-black text-[11px] font-bold">
          <button
            type="button"
            className={`py-3 text-center uppercase transition-all border-b-2 flex flex-col items-center gap-1 ${
              activeTab === "playlists"
                ? "border-red-500 text-red-400 bg-red-600/10"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("playlists")}
          >
            <ListMusic className="h-4 w-4" />
            <span>Listeler</span>
          </button>

          <button
            type="button"
            className={`py-3 text-center uppercase transition-all border-b-2 flex flex-col items-center gap-1 ${
              activeTab === "mixes"
                ? "border-red-500 text-red-400 bg-red-600/10"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("mixes")}
          >
            <Disc3 className="h-4 w-4" />
            <span>Mixler</span>
          </button>

          <button
            type="button"
            className={`py-3 text-center uppercase transition-all border-b-2 flex flex-col items-center gap-1 ${
              activeTab === "chat"
                ? "border-red-500 text-red-400 bg-red-600/10"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Sohbet</span>
          </button>

          <button
            type="button"
            className="py-3 text-center uppercase transition-all border-b-2 border-transparent text-emerald-400 hover:text-white flex flex-col items-center gap-1"
            onClick={() => {
              if (onOpenListenTogether) {
                onClose();
                onOpenListenTogether();
              }
            }}
          >
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Birlikte</span>
          </button>
        </div>

        {/* TAB 1: PLAYLISTS */}
        {activeTab === "playlists" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isCreatingPlaylist ? (
              <button
                type="button"
                onClick={() => setIsCreatingPlaylist(true)}
                className="w-full p-3 bg-red-600/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Plus className="h-4 w-4" /> YENİ ÇALMA LİSTESİ OLUŞTUR
              </button>
            ) : (
              <form onSubmit={handleCreatePlaylist} className="border border-red-500/30 bg-red-950/20 p-3 space-y-2">
                <span className="text-[10px] font-bold text-red-400 uppercase">YENİ LİSTE ADI:</span>
                <input
                  type="text"
                  required
                  placeholder="Örn: Frankfurt Drill Seçkisi"
                  value={newPlaylistTitle}
                  onChange={(e) => setNewPlaylistTitle(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                />
                <div className="flex gap-2 pt-1">
                  <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none flex-1">
                    Oluştur
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsCreatingPlaylist(false)} className="border-white/20 text-neutral-400 text-xs uppercase rounded-none">
                    İptal
                  </Button>
                </div>
              </form>
            )}

            {activePlaylist ? (
              <div className="space-y-4 border border-white/10 bg-black/60 p-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <button
                    type="button"
                    onClick={() => setActivePlaylistId(null)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                  >
                    ← Tüm Listelere Dön
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Bu çalma listesini silmek istediğinize emin misiniz?")) {
                        PlaylistService.deletePlaylist(activePlaylist.id);
                        setActivePlaylistId(null);
                      }
                    }}
                    className="text-neutral-500 hover:text-red-400"
                    title="Listeyi Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img src={activePlaylist.coverImage} alt={activePlaylist.title} className="h-14 w-14 object-cover border border-white/20 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-white truncate">{activePlaylist.title}</h3>
                    <p className="text-[10px] text-neutral-400">{activePlaylist.trackIds.length} Şarkı • Sahibi: {activePlaylist.ownerName}</p>
                    <p className="text-[10px] text-neutral-500 line-clamp-1">{activePlaylist.description}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 px-2.5 py-1.5 text-[10px] text-neutral-400 flex items-center gap-1.5">
                  <GripVertical className="h-3 w-3 text-red-500 shrink-0" />
                  <span>Şarkıların sırasını değiştirmek için <strong>tutun ve sürükleyin</strong>.</span>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {activePlaylist.trackIds.map((trackId, idx) => {
                    const tr = PLAYLIST.find((t) => t.id === trackId);
                    if (!tr) return null;
                    return (
                      <div
                        key={tr.id}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(activePlaylist.id, idx)}
                        className={`flex items-center justify-between p-2 border bg-black/80 cursor-grab active:cursor-grabbing transition-all ${
                          draggedIndex === idx ? "border-red-500 bg-red-600/10 opacity-50" : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <GripVertical className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                          <span className="text-[10px] font-bold text-neutral-500 w-4">{idx + 1}</span>
                          <img src={tr.image} alt={tr.title} className="h-6 w-6 object-cover shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{tr.title}</p>
                            <p className="text-[9px] text-neutral-500 truncate">{tr.artist}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onTrackPlay && onTrackPlay(tr)}
                            className="p-1 text-red-400 hover:text-white"
                            title="Çal"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => PlaylistService.removeTrackFromPlaylist(activePlaylist.id, tr.id)}
                            className="p-1 text-neutral-600 hover:text-red-400"
                            title="Listeden Çıkar"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  ÇALMA LİSTELERİ ({playlists.length})
                </span>

                {playlists.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => setActivePlaylistId(pl.id)}
                    className="p-3 border border-white/10 bg-black/60 hover:border-red-500/40 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={pl.coverImage} alt={pl.title} className="h-12 w-12 object-cover border border-white/20 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-red-400 truncate">{pl.title}</h4>
                        <p className="text-[10px] text-neutral-400">{pl.trackIds.length} Parça • {pl.ownerName}</p>
                        <p className="text-[9px] text-neutral-500 line-clamp-1">{pl.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-white shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
''')
