with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_dock_icons = """            <button
              type="button"
              onClick={() => setIsCommentsDrawerOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Şarkı Yorumları"
            >
              <MessageSquare className="h-4 w-4" />
            </button>"""

replacement_dock_icons = """            <button
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
            </button>"""

if target_dock_icons in content:
    content = content.replace(target_dock_icons, replacement_dock_icons)
    print("AddToPlaylist added to bottom dock")

# Wire RightSidebarDrawer onUserProfileClick
content = content.replace("<RightSidebarDrawer\n        isOpen={isRightDrawerOpen}", "<RightSidebarDrawer\n        isOpen={isRightDrawerOpen}\n        onUserProfileClick={(uid) => setViewingUserId(uid)}")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("App.tsx updated")
