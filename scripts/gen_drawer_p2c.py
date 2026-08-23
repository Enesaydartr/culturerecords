with open("src/components/RightSidebarDrawer.tsx", "a", encoding="utf-8") as f:
    f.write('''
        {/* TAB 3: CHAT, DM & USERS */}
        {activeTab === "chat" && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex border-b border-white/10 bg-black/60 text-xs">
              <button
                type="button"
                onClick={() => setChatSubTab("global")}
                className={`flex-1 py-2 text-center uppercase font-bold transition-all ${
                  chatSubTab === "global" ? "bg-white/10 text-white border-b-2 border-red-500" : "text-neutral-400 hover:text-white"
                }`}
              >
                Odalar
              </button>
              <button
                type="button"
                onClick={() => setChatSubTab("dm")}
                className={`flex-1 py-2 text-center uppercase font-bold transition-all ${
                  chatSubTab === "dm" ? "bg-white/10 text-white border-b-2 border-red-500" : "text-neutral-400 hover:text-white"
                }`}
              >
                Özel (DM)
              </button>
              <button
                type="button"
                onClick={() => setChatSubTab("users")}
                className={`flex-1 py-2 text-center uppercase font-bold transition-all ${
                  chatSubTab === "users" ? "bg-white/10 text-white border-b-2 border-red-500" : "text-neutral-400 hover:text-white"
                }`}
              >
                Kullanıcılar
              </button>
            </div>

            {chatSubTab === "global" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-2 border-b border-white/10 flex gap-1 bg-[#0d0d0d] overflow-x-auto text-[10px] font-bold">
                  {[
                    { id: "general", label: "🔥 Alliance Ana Salon" },
                    { id: "tour", label: "🎙️ Konser & Tur" },
                    { id: "mixes", label: "🎧 Beat & Mix" }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setGlobalRoom(r.id)}
                      className={`px-2.5 py-1 uppercase whitespace-nowrap transition-all border ${
                        globalRoom === r.id ? "bg-red-600 text-white border-red-500" : "border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {globalMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-2.5">
                      <img src={msg.senderAvatar} alt={msg.senderName} className="h-7 w-7 object-cover border border-white/20 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/5 p-2.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{msg.senderName}</span>
                          {msg.senderRole === "admin" && (
                            <span className="px-1 py-0.2 bg-red-600 text-white text-[8px] font-black uppercase">ADMIN</span>
                          )}
                          <span className="text-[9px] text-neutral-500 ml-auto">
                            {new Date(msg.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>

                        {msg.text && <p className="text-neutral-200 text-xs font-sans leading-relaxed">{msg.text}</p>}
                        
                        {msg.imageUrl && (
                          <img src={msg.imageUrl} alt="attachment" className="mt-2 max-h-40 object-contain border border-white/10" />
                        )}

                        {msg.trackId && (
                          <div
                            onClick={() => {
                              const tr = PLAYLIST.find((t) => t.id === msg.trackId);
                              if (tr && onTrackPlay) onTrackPlay(tr);
                            }}
                            className="mt-2 p-2 bg-red-950/40 border border-red-500/30 flex items-center justify-between gap-2 cursor-pointer hover:bg-red-600/30 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Music className="h-3.5 w-3.5 text-red-400 shrink-0" />
                              <span className="text-xs font-bold text-white truncate">{msg.trackTitle || "Şarkı"}</span>
                            </div>
                            <Play className="h-3.5 w-3.5 text-red-400 shrink-0" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendChatMessage} className="p-2.5 border-t border-white/10 bg-[#0d0d0d] space-y-2">
                  {showAttachMenu && (
                    <div className="p-2 border border-white/10 bg-black space-y-2 text-[10px]">
                      <div>
                        <label className="text-neutral-400 block mb-1">Görsel URL Yapıştır:</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={chatImageUrl}
                          onChange={(e) => setChatImageUrl(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/15 text-white p-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">Şarkı Ekle:</label>
                        <select
                          value={selectedShareTrackId}
                          onChange={(e) => setSelectedShareTrackId(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/15 text-white p-1 text-xs"
                        >
                          <option value="">(Şarkı Seçilmedi)</option>
                          {PLAYLIST.map((t) => (
                            <option key={t.id} value={t.id}>{t.title} — {t.artist}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className={`p-2 border transition-colors ${
                        showAttachMenu ? "bg-red-600 text-white border-red-500" : "bg-white/5 border-white/15 text-neutral-400 hover:text-white"
                      }`}
                      title="Görsel veya Şarkı Ekle"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Sohbete yazın..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      className="flex-1 bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                    />

                    <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none h-8 px-3">
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {chatSubTab === "dm" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedDmUser ? (
                  <>
                    <div className="p-2.5 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={selectedDmUser.avatar} alt={selectedDmUser.displayName} className="h-6 w-6 object-cover border border-white/20" />
                        <span className="text-xs font-bold text-white">{selectedDmUser.displayName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedDmUser(null)}
                        className="text-[10px] text-neutral-400 hover:text-white"
                      >
                        Kullanıcı Seç
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                      {dmThread.map((m) => {
                        const isMine = m.senderId === currentUser?.id;
                        return (
                          <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-2.5 text-xs font-sans ${isMine ? "bg-red-600 text-white" : "bg-white/10 text-neutral-200 border border-white/10"}`}>
                              {m.text && <p>{m.text}</p>}
                              {m.imageUrl && <img src={m.imageUrl} alt="attachment" className="mt-1.5 max-h-36 object-contain" />}
                              {m.trackId && (
                                <div
                                  onClick={() => {
                                    const tr = PLAYLIST.find((t) => t.id === m.trackId);
                                    if (tr && onTrackPlay) onTrackPlay(tr);
                                  }}
                                  className="mt-1.5 p-1.5 bg-black/40 border border-white/20 flex items-center gap-2 cursor-pointer"
                                >
                                  <Music className="h-3 w-3 text-red-300 shrink-0" />
                                  <span className="text-[10px] font-bold truncate">{m.trackTitle || "Şarkı"}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendChatMessage} className="p-2.5 border-t border-white/10 bg-[#0d0d0d] flex gap-2">
                      <input
                        type="text"
                        placeholder="Özel mesaj yazın..."
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
                        className="flex-1 bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                      />
                      <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none">
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="p-4 space-y-3 overflow-y-auto">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">MESAJLAŞMAK İÇİN KULLANICI SEÇİN:</span>
                    {AuthService.getAllUsers().filter((u) => u.id !== currentUser?.id).map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setSelectedDmUser(u);
                          if (currentUser) {
                            setDmThread(SocialService.getDirectMessages(currentUser.id, u.id));
                          }
                        }}
                        className="p-2.5 border border-white/10 bg-black/60 hover:border-red-500/40 flex items-center gap-3 cursor-pointer transition-all"
                      >
                        <img src={u.avatar} alt={u.displayName} className="h-8 w-8 object-cover border border-white/20" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{u.displayName}</h4>
                          <p className="text-[10px] text-neutral-400">@{u.username}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {chatSubTab === "users" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                  />
                  <Search className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
                </div>

                <div className="space-y-2 pt-2">
                  {searchedUsers.map((u) => (
                    <div key={u.id} className="p-3 border border-white/10 bg-black/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={u.avatar} alt={u.displayName} className="h-8 w-8 object-cover border border-white/20 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{u.displayName}</h4>
                          <p className="text-[10px] text-neutral-400">@{u.username}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDmUser(u);
                          setChatSubTab("dm");
                          if (currentUser) {
                            setDmThread(SocialService.getDirectMessages(currentUser.id, u.id));
                          }
                        }}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white text-white hover:text-black font-bold text-[10px] uppercase border border-white/20"
                      >
                        Mesaj Gönder
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
''')
print("RightSidebarDrawer.tsx completely written!")
