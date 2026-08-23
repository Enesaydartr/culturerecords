with open("src/components/SongCommentsDrawer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add onUserProfileClick to props
content = content.replace("  onOpenAuthModal?: () => void;\n}", "  onOpenAuthModal?: () => void;\n  onUserProfileClick?: (userId: string) => void;\n}")
content = content.replace("export default function SongCommentsDrawer({ isOpen, onClose, track, onOpenAuthModal }: SongCommentsDrawerProps)", "export default function SongCommentsDrawer({ isOpen, onClose, track, onOpenAuthModal, onUserProfileClick }: SongCommentsDrawerProps)")

# Make comment author clickable to view profile
target_author = """                  <div className="flex items-center gap-2 min-w-0">
                    <img src={c.userAvatar} alt={c.userDisplayName} className="h-6 w-6 object-cover border border-white/20 shrink-0" />
                    <span className="text-xs font-bold text-white truncate">{c.userDisplayName}</span>
                    {c.userRole === "admin" && (
                      <span className="px-1 py-0.2 bg-red-600 text-white text-[8px] font-black uppercase">ADMIN</span>
                    )}
                  </div>"""

replacement_author = """                  <button
                    type="button"
                    onClick={() => onUserProfileClick && onUserProfileClick(c.userId)}
                    className="flex items-center gap-2 min-w-0 text-left hover:opacity-80 transition-opacity"
                    title="Kullanıcı Profilini Görüntüle"
                  >
                    <img src={c.userAvatar || "/assets/images/alliance_cover.jpg"} alt={c.userDisplayName} className="h-6 w-6 object-cover border border-white/20 shrink-0 aspect-square" />
                    <span className="text-xs font-bold text-white truncate hover:underline">{c.userDisplayName}</span>
                    {c.userRole === "admin" && (
                      <span className="px-1 py-0.2 bg-red-600 text-white text-[8px] font-black uppercase">ADMIN</span>
                    )}
                  </button>"""

if target_author in content:
    content = content.replace(target_author, replacement_author)

with open("src/components/SongCommentsDrawer.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("SongCommentsDrawer.tsx updated with profile click")
