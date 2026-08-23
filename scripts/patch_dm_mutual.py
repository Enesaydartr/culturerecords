with open("src/components/RightSidebarDrawer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add Lock icon import if missing
if "Lock," not in content:
    content = content.replace("import {\n  X,", "import {\n  X,\n  Lock,")

# State for forcing re-render when follow changes
if "const [followUpdateTrigger, setFollowUpdateTrigger] = useState(0);" not in content:
    content = content.replace("  const currentUser = AuthService.getCurrentUser();", "  const currentUser = AuthService.getCurrentUser();\n  const [followUpdateTrigger, setFollowUpdateTrigger] = useState(0);")

# Listen to follow-state-changed or user-profile-updated
hook_code = """  useEffect(() => {
    const handleProfileUpdate = () => setFollowUpdateTrigger((p) => p + 1);
    window.addEventListener("user-profile-updated", handleProfileUpdate);
    window.addEventListener("auth-state-changed", handleProfileUpdate);
    return () => {
      window.removeEventListener("user-profile-updated", handleProfileUpdate);
      window.removeEventListener("auth-state-changed", handleProfileUpdate);
    };
  }, []);"""

if "window.addEventListener(\"user-profile-updated\"" not in content:
    content = content.replace("  useEffect(() => {\n    scrollToBottom();\n  }, [globalMessages, dmThread]);", "  useEffect(() => {\n    scrollToBottom();\n  }, [globalMessages, dmThread]);\n\n" + hook_code)

# DM Thread section replacement
target_dm_block = """                    <form onSubmit={handleSendChatMessage} className="p-2.5 border-t border-white/10 bg-[#0d0d0d] flex gap-2">
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
                    </form>"""

replacement_dm_block = """                    {/* Mutual follow check */}
                    {currentUser && selectedDmUser && !AuthService.areMutualFollowers(currentUser.id, selectedDmUser.id) ? (
                      <div className="p-3.5 bg-red-950/40 border border-red-500/40 text-center space-y-2 m-2">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-red-400">
                          <Lock className="h-4 w-4" />
                          <span>Karşılıklı Takip Gerekli</span>
                        </div>
                        <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                          Özel mesaj gönderebilmek için her iki kullanıcının da birbirini takip etmesi gerekmektedir.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (currentUser && selectedDmUser) {
                              AuthService.toggleFollow(selectedDmUser.id, currentUser.id);
                              setFollowUpdateTrigger((p) => p + 1);
                            }
                          }}
                          className={`px-3 py-1.5 font-bold text-xs uppercase transition-all shadow-md ${
                            currentUser.following?.includes(selectedDmUser.id)
                              ? "bg-white/10 text-neutral-300 hover:bg-red-600/30"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {currentUser.following?.includes(selectedDmUser.id)
                            ? "✓ Sen Takip Ediyorsun (Onun Takip Etmesi Bekleniyor)"
                            : `+ ${selectedDmUser.displayName} Takip Et`}
                        </button>
                      </div>
                    ) : (
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
                    )}"""

if target_dm_block in content:
    content = content.replace(target_dm_block, replacement_dm_block)

# User list action buttons replacement (add 1-click Follow button)
target_user_buttons = """                      <button
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
                      </button>"""

replacement_user_buttons = """                      <div className="flex items-center gap-1.5 shrink-0">
                        {currentUser && currentUser.id !== u.id && (
                          <button
                            type="button"
                            onClick={() => {
                              AuthService.toggleFollow(u.id, currentUser.id);
                              setFollowUpdateTrigger((p) => p + 1);
                            }}
                            className={`px-2 py-1 font-bold text-[10px] uppercase transition-all ${
                              currentUser.following?.includes(u.id)
                                ? "bg-emerald-600 text-white"
                                : "bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40"
                            }`}
                          >
                            {currentUser.following?.includes(u.id) ? "✓ Takipte" : "+ Takip"}
                          </button>
                        )}
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
                          Mesaj
                        </button>
                      </div>"""

if target_user_buttons in content:
    content = content.replace(target_user_buttons, replacement_user_buttons)

with open("src/components/RightSidebarDrawer.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("RightSidebarDrawer.tsx updated with mutual follow DM verification and user follow button!")
