with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports for UserProfileModal and AddToPlaylistModal + Menu icon
content = content.replace('import NewsSection from "@/components/NewsSection";', """import NewsSection from "@/components/NewsSection";
import UserProfileModal from "@/components/UserProfileModal";
import AddToPlaylistModal from "@/components/AddToPlaylistModal";""")

content = content.replace("ShieldCheck\n} from \"lucide-react\";", "ShieldCheck,\n  Menu,\n  Plus\n} from \"lucide-react\";")

# Add state variables
state_injection = """  // Additional modals
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const [playlistModalTrack, setPlaylistModalTrack] = useState<Track | null>(null);
"""
content = content.replace("  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);", "  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);\n" + state_injection)

# Replace Header actions (Remove wide TOPLULUK & LISTELER, put sleek menu on far right)
header_target = """            {/* Topluluk & Playlist Button */}
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
            )}"""

header_replacement = """            {/* Birlikte Dinle Button */}
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
                className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/15 hover:border-white/40 transition-all"
                title="Profilim & Ayarlar"
              >
                <img
                  src={currentUser.avatar || "/assets/images/eray_mansur_alliance.jpg"}
                  alt={currentUser.displayName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
                  }}
                  className="h-6 w-6 object-cover border border-white/20"
                />
                <span className="text-xs font-bold text-white max-w-[90px] truncate">
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

            {/* SLEEK MENU BUTTON ON THE FAR RIGHT */}
            <button
              type="button"
              onClick={() => setIsRightDrawerOpen(true)}
              className="p-2 bg-red-600/20 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white transition-all shadow-sm flex items-center justify-center"
              title="Çalma Listeleri, Mixler & Topluluk Menüsü"
            >
              <Menu className="h-4 w-4" />
            </button>"""

if header_target in content:
    content = content.replace(header_target, header_replacement)
    print("Header actions updated")
else:
    print("Header target not found")

# Add "Listeye Ekle" button to Discography cards
discography_card_target = """                    <button
                      type="button"
                      onClick={() => {
                        playTrack(track);
                        setIsCommentsDrawerOpen(true);
                      }}
                      className="p-2 text-neutral-500 hover:text-white transition-colors"
                      title="Yorumlar & Sohbet"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>"""

discography_card_replacement = """                    <button
                      type="button"
                      onClick={() => setPlaylistModalTrack(track)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Çalma Listesine Ekle"
                    >
                      <Plus className="h-4 w-4" />
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
                    </button>"""

if discography_card_target in content:
    content = content.replace(discography_card_target, discography_card_replacement)
    print("AddToPlaylist button added to discography cards")

# Add AddToPlaylist and UserProfileModal renders at bottom of App.tsx
modals_target = """      {/* 15. SONG COMMENTS & STATS DRAWER */}
      <SongCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        track={currentTrack}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />"""

modals_replacement = """      {/* 15. SONG COMMENTS & STATS DRAWER */}
      <SongCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        track={currentTrack}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* 16. USER PROFILE MODAL */}
      <UserProfileModal
        isOpen={!!viewingUserId}
        onClose={() => setViewingUserId(null)}
        userId={viewingUserId}
        onTrackPlay={playTrack}
      />

      {/* 17. ADD TO PLAYLIST MODAL */}
      <AddToPlaylistModal
        isOpen={!!playlistModalTrack}
        onClose={() => setPlaylistModalTrack(null)}
        track={playlistModalTrack}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />"""

if modals_target in content:
    content = content.replace(modals_target, modals_replacement)
    print("New modals rendered in App.tsx")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx patch completed!")
