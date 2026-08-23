with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_modal = """      {/* 16. USER PROFILE MODAL */}
      <UserProfileModal
        isOpen={!!viewingUserId}
        onClose={() => setViewingUserId(null)}
        userId={viewingUserId}
        onTrackPlay={playTrack}
      />"""

replacement_modal = """      {/* 16. USER PROFILE MODAL */}
      <UserProfileModal
        isOpen={!!viewingUserId}
        onClose={() => setViewingUserId(null)}
        userId={viewingUserId}
        onTrackPlay={playTrack}
        onOpenDm={() => {
          setViewingUserId(null);
          setIsRightDrawerOpen(true);
        }}
      />"""

if target_modal in content:
    content = content.replace(target_modal, replacement_modal)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx updated with UserProfileModal onOpenDm handler!")
