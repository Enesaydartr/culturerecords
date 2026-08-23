with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update NewsSection in App.tsx
target_news = """      {/* 6. OFFICIAL NEWS SECTION */}
      <NewsSection
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />"""

replacement_news = """      {/* 6. OFFICIAL NEWS SECTION */}
      <NewsSection
        onUserProfileClick={(uid) => setViewingUserId(uid)}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />"""

if target_news in content:
    content = content.replace(target_news, replacement_news)

# 2. Update ListenTogetherModal in App.tsx
target_listen = """      {/* 14. LISTEN TOGETHER / SYNC ROOM MODAL */}
      <ListenTogetherModal
        isOpen={isListenTogetherOpen}
        onClose={() => setIsListenTogetherOpen(false)}
        onTrackPlay={(t) => playTrack(t)}
      />"""

replacement_listen = """      {/* 14. LISTEN TOGETHER / SYNC ROOM MODAL */}
      <ListenTogetherModal
        isOpen={isListenTogetherOpen}
        onClose={() => setIsListenTogetherOpen(false)}
        onTrackPlay={(t) => playTrack(t)}
        onUserProfileClick={(uid) => setViewingUserId(uid)}
      />"""

if target_listen in content:
    content = content.replace(target_listen, replacement_listen)

# 3. Update SongCommentsDrawer in App.tsx
target_comments = """      {/* 15. SONG COMMENTS & STATS DRAWER */}
      <SongCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        track={currentTrack}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />"""

replacement_comments = """      {/* 15. SONG COMMENTS & STATS DRAWER */}
      <SongCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        track={currentTrack}
        onUserProfileClick={(uid) => setViewingUserId(uid)}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />"""

if target_comments in content:
    content = content.replace(target_comments, replacement_comments)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx updated with all onUserProfileClick listeners!")
