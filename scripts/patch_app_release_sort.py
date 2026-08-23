with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add sort state variable
state_target = "const [activeCategory, setActiveCategory] = useState<\"all\" | \"alliance\" | \"hits\" | \"collab\">(\"all\");"
state_replacement = """const [activeCategory, setActiveCategory] = useState<\"all\" | \"alliance\" | \"hits\" | \"collab\">(\"all\");
  const [trackSortOrder, setTrackSortOrder] = useState<\"newest\" | \"oldest\" | \"popular\">(\"newest\");"""

content = content.replace(state_target, state_replacement)

# Update filteredTracks logic
filter_target = """  const filteredTracks = PLAYLIST.filter((track) => {
    if (activeCategory === "all") return true;
    return track.category === activeCategory;
  });"""

filter_replacement = """  const filteredTracks = PLAYLIST.filter((track) => {
    if (activeCategory === "all") return true;
    return track.category === activeCategory;
  }).sort((a, b) => {
    if (trackSortOrder === "newest") {
      return new Date(b.releaseDate || "2024-01-01").getTime() - new Date(a.releaseDate || "2024-01-01").getTime();
    } else if (trackSortOrder === "oldest") {
      return new Date(a.releaseDate || "2024-01-01").getTime() - new Date(b.releaseDate || "2024-01-01").getTime();
    } else {
      const statsA = PlaylistService.getSongStats(a.id);
      const statsB = PlaylistService.getSongStats(b.id);
      return statsB.totalListens - statsA.totalListens;
    }
  });"""

content = content.replace(filter_target, filter_replacement)

# Update Discography header with Category + Sort controls
discography_controls_target = """            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
              {[
                { id: "all", label: "TÜMÜ" },
                { id: "alliance", label: "ALLIANCE" },
                { id: "hits", label: "HİTLER" },
                { id: "collab", label: "DÜETLER" }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id as any)}
                  className={`px-4 py-2 border transition-all ${
                    activeCategory === c.id
                      ? "bg-white text-black border-white"
                      : "border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>"""

discography_controls_replacement = """            {/* Category Filter & Release Date Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5 text-xs font-mono font-bold">
                {[
                  { id: "all", label: "TÜMÜ" },
                  { id: "alliance", label: "ALLIANCE" },
                  { id: "hits", label: "HİTLER" },
                  { id: "collab", label: "DÜETLER" }
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id as any)}
                    className={`px-3.5 py-1.5 border transition-all ${
                      activeCategory === c.id
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Release Date & Popularity Sorting */}
              <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setTrackSortOrder("newest")}
                  className={`px-2.5 py-1 transition-all ${
                    trackSortOrder === "newest" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Yayınlanma Tarihine Göre (En Yeni ➔ En Eski)"
                >
                  📅 En Yeni
                </button>
                <button
                  type="button"
                  onClick={() => setTrackSortOrder("oldest")}
                  className={`px-2.5 py-1 transition-all ${
                    trackSortOrder === "oldest" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Yayınlanma Tarihine Göre (En Eski ➔ En Yeni)"
                >
                  ⏳ En Eski
                </button>
                <button
                  type="button"
                  onClick={() => setTrackSortOrder("popular")}
                  className={`px-2.5 py-1 transition-all ${
                    trackSortOrder === "popular" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="En Çok Dinlenenler"
                >
                  🔥 Popüler
                </button>
              </div>
            </div>"""

content = content.replace(discography_controls_target, discography_controls_replacement)

# Add Release Date Badge to each Track Card
track_badge_target = """                      {/* Stats line: Likes & Listens */}
                      <div className="flex items-center gap-3 text-[10px] text-neutral-500 mt-1">
                        <span>❤️ {stats.likesCount.toLocaleString("tr-TR")}</span>
                        <span>🎧 {stats.totalListens.toLocaleString("tr-TR")}</span>
                      </div>"""

track_badge_replacement = """                      {/* Stats line: Release Date, Likes & Listens */}
                      <div className="flex items-center gap-2.5 text-[10px] text-neutral-400 mt-1">
                        <span className="text-red-400 font-bold">📅 {track.releaseYear || track.releaseDate?.split("-")[0]}</span>
                        <span className="text-neutral-600">•</span>
                        <span>❤️ {stats.likesCount.toLocaleString("tr-TR")}</span>
                        <span className="text-neutral-600">•</span>
                        <span>🎧 {stats.totalListens.toLocaleString("tr-TR")}</span>
                      </div>"""

content = content.replace(track_badge_target, track_badge_replacement)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx updated with release date sorting and badges!")
