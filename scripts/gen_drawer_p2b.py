with open("src/components/RightSidebarDrawer.tsx", "a", encoding="utf-8") as f:
    f.write('''
        {/* TAB 2: COMMUNITY MIXES */}
        {activeTab === "mixes" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <button
              type="button"
              onClick={() => {
                if (onOpenMixModal) onOpenMixModal();
              }}
              className="w-full p-3 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Sparkles className="h-4 w-4" /> KENDİ MİXİNİ OLUŞTUR & PAYLAŞ ➔
            </button>

            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">SIRALA:</span>
              <div className="flex gap-1 text-[10px] font-bold">
                {[
                  { id: "popular", label: "En Popüler" },
                  { id: "liked", label: "En Beğenilen" },
                  { id: "newest", label: "En Yeni" }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setMixSort(s.id as any)}
                    className={`px-2 py-1 transition-all ${
                      mixSort === s.id ? "bg-white text-black font-black" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {mixes.map((m) => {
                const isLiked = MixService.isMixLikedBy(m.id, currentUser?.id);
                return (
                  <div key={m.id} className="border border-white/10 bg-black/60 p-3 space-y-2.5 group">
                    <div className="flex gap-3 items-start">
                      <div className="relative h-16 w-16 aspect-square shrink-0 border border-white/20 overflow-hidden">
                        <img src={m.coverImage} alt={m.title} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            MixService.incrementMixListen(m.id);
                            if (m.usedTrackIds.length > 0) {
                              const tr = PLAYLIST.find((t) => t.id === m.usedTrackIds[0]);
                              if (tr && onTrackPlay) onTrackPlay(tr);
                            }
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                        >
                          <Play className="h-6 w-6 fill-current" />
                        </button>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white line-clamp-1">{m.title}</h4>
                        <p className="text-[10px] text-neutral-400">Remixer: <strong className="text-neutral-300">{m.creatorName}</strong></p>
                        <p className="text-[10px] text-neutral-500 line-clamp-2 mt-0.5">{m.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
                      <span className="text-[9px] text-neutral-500 uppercase">Kullanılan Şarkılar:</span>
                      {m.usedTrackIds.map((tid) => {
                        const tr = PLAYLIST.find((t) => t.id === tid);
                        if (!tr) return null;
                        return (
                          <button
                            key={tid}
                            type="button"
                            onClick={() => onTrackPlay && onTrackPlay(tr)}
                            className="px-1.5 py-0.5 bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-[9px] font-bold flex items-center gap-1 transition-all"
                            title="Orijinal şarkıyı çal"
                          >
                            <Music className="h-2.5 w-2.5" />
                            <span>{tr.title}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!currentUser) {
                              if (onOpenAuthModal) onOpenAuthModal();
                              return;
                            }
                            MixService.toggleLikeMix(m.id, currentUser.id);
                          }}
                          className={`flex items-center gap-1 font-bold ${isLiked ? "text-red-500" : "hover:text-white"}`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                          <span>{m.likesCount}</span>
                        </button>
                        <span className="flex items-center gap-1">
                          <Headphones className="h-3.5 w-3.5" />
                          <span>{m.totalListens}</span>
                        </span>
                      </div>
                      <span className="text-neutral-500">{new Date(m.createdAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
''')
