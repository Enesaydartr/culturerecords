with open("src/components/RightSidebarDrawer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Drawer Header
target_header = """        {/* Top Header */}
        <div className="p-4 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-red-600 text-white flex items-center justify-center font-black text-xs">
              ⚡
            </div>
            <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
              ALLIANCE TOPLULUK & PLAYLIST
            </span>
          </div>"""

replacement_header = """        {/* Top Header */}
        <div className="p-4 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/images/brand_logo.png"
              alt="Logo"
              className="h-7 w-auto object-contain shrink-0 drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
              }}
            />
            <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
              CLTR TOPLULUĞU & LİSTELER
            </span>
          </div>"""

if target_header in content:
    content = content.replace(target_header, replacement_header)
    print("Drawer header updated to CLTR TOPLULUĞU & LİSTELER")

# 2. Make Playlist owner clickable
target_pl_owner = "<p className=\"text-[10px] text-neutral-400\">{pl.trackIds.length} Parça • {pl.ownerName}</p>"
replacement_pl_owner = """<p className="text-[10px] text-neutral-400">{pl.trackIds.length} Parça • <button type="button" onClick={(e) => { e.stopPropagation(); onUserProfileClick && onUserProfileClick(pl.ownerId); }} className="text-neutral-300 font-bold hover:text-red-400 hover:underline">{pl.ownerName}</button></p>"""
if target_pl_owner in content:
    content = content.replace(target_pl_owner, replacement_pl_owner)

# 3. Make Mix creator clickable
target_mix_creator = "<p className=\"text-[10px] text-neutral-400\">Remixer: <strong className=\"text-neutral-300\">{m.creatorName}</strong></p>"
replacement_mix_creator = """<p className="text-[10px] text-neutral-400">Remixer: <button type="button" onClick={() => onUserProfileClick && onUserProfileClick(m.creatorId)} className="text-neutral-200 font-bold hover:text-red-400 hover:underline">{m.creatorName}</button></p>"""
if target_mix_creator in content:
    content = content.replace(target_mix_creator, replacement_mix_creator)

# 4. Make Chat sender clickable
target_chat_sender = """                    <div key={msg.id} className="flex items-start gap-2.5">
                      <img src={msg.senderAvatar} alt={msg.senderName} className="h-7 w-7 object-cover border border-white/20 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/5 p-2.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{msg.senderName}</span>"""

replacement_chat_sender = """                    <div key={msg.id} className="flex items-start gap-2.5">
                      <button type="button" onClick={() => onUserProfileClick && onUserProfileClick(msg.senderId)} className="shrink-0">
                        <img src={msg.senderAvatar || "/assets/images/alliance_cover.jpg"} alt={msg.senderName} className="h-7 w-7 object-cover border border-white/20 aspect-square hover:opacity-80 transition-opacity" />
                      </button>
                      <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/5 p-2.5">
                        <div className="flex items-center gap-2 mb-1">
                          <button type="button" onClick={() => onUserProfileClick && onUserProfileClick(msg.senderId)} className="text-xs font-bold text-white hover:text-red-400 hover:underline">
                            {msg.senderName}
                          </button>"""

if target_chat_sender in content:
    content = content.replace(target_chat_sender, replacement_chat_sender)

# 5. Make user search list clickable to view profile as well
target_user_row = """                      <div className="flex items-center gap-3 min-w-0">
                        <img src={u.avatar} alt={u.displayName} className="h-8 w-8 object-cover border border-white/20 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{u.displayName}</h4>
                          <p className="text-[10px] text-neutral-400">@{u.username}</p>
                        </div>
                      </div>"""

replacement_user_row = """                      <button
                        type="button"
                        onClick={() => onUserProfileClick && onUserProfileClick(u.id)}
                        className="flex items-center gap-3 min-w-0 text-left hover:opacity-80 transition-opacity"
                        title="Profili Gör"
                      >
                        <img src={u.avatar || "/assets/images/alliance_cover.jpg"} alt={u.displayName} className="h-8 w-8 object-cover border border-white/20 shrink-0 aspect-square" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate hover:underline">{u.displayName}</h4>
                          <p className="text-[10px] text-neutral-400">@{u.username}</p>
                        </div>
                      </button>"""

if target_user_row in content:
    content = content.replace(target_user_row, replacement_user_row)

with open("src/components/RightSidebarDrawer.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("RightSidebarDrawer.tsx fully updated with logo, CLTR TOPLULUĞU title and clickable user profiles!")
