code = """import React, { useState, useEffect, useRef } from "react";
import { AuthService, UserProfile } from "@/services/authService";
import { PLAYLIST, Track, ALLBUMS } from "@/data/artists";
import { NewsService, NewsArticle } from "@/services/newsService";
import { MixService, CommunityMix } from "@/services/mixService";
import { SyncedLyricsService } from "@/services/syncedLyricsService";
import LyricsStudio from "@/components/LyricsStudio";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  X,
  UserPlus,
  Music,
  FileText,
  Newspaper,
  Mic2,
  Download,
  Upload,
  Trash2,
  Plus,
  Check,
  Search,
  Sparkles,
  Scissors,
  Layers
} from "lucide-react";

interface AdminHubProps {
  isOpen: boolean;
  onClose: () => void;
  onSongSelectedForEdit?: (trackId: string) => void;
}

export default function AdminHub({ isOpen, onClose }: AdminHubProps) {
  const currentUser = AuthService.getCurrentUser();
  const [activeTab, setActiveTab] = useState<"users" | "songs" | "news" | "studio" | "backup" | "moderation">("users");

  // Admin Promotion Form
  const [targetUsername, setTargetUsername] = useState("");
  const [adminActionMsg, setAdminActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [userList, setUserList] = useState<UserProfile[]>(AuthService.getAllUsers());
  const [searchUserQuery, setSearchUserQuery] = useState("");

  // News Form
  const [newsTitle, setNewsTitle] = useState("");
  const [newsExcerpt, setNewsExcerpt] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCover, setNewsCover] = useState("/assets/images/alliance_cover.jpg");
  const [newsTag, setNewsTag] = useState("DUYURU");
  const [newsList, setNewsList] = useState<NewsArticle[]>(NewsService.getAllNews());

  // Songs
  const [songList, setSongList] = useState<Track[]>(PLAYLIST);
  const [selectedStudioTrackId, setSelectedStudioTrackId] = useState<string>(PLAYLIST[0].id);

  // Mixes for Moderation
  const [communityMixes, setCommunityMixes] = useState<CommunityMix[]>(MixService.getAllMixes("newest"));

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setUserList(AuthService.getAllUsers());
    setNewsList(NewsService.getAllNews());
    setCommunityMixes(MixService.getAllMixes("newest"));
  }, [isOpen]);

  if (!isOpen || !currentUser || currentUser.role !== "admin") return null;

  // Promote User to Admin
  const handlePromoteAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUsername.trim()) return;

    const res = AuthService.promoteToAdmin(targetUsername.trim());
    if (res.success) {
      setAdminActionMsg({ type: "success", text: res.message });
      setUserList(AuthService.getAllUsers());
      setTargetUsername("");
    } else {
      setAdminActionMsg({ type: "error", text: res.message });
    }
    setTimeout(() => setAdminActionMsg(null), 4000);
  };

  // Demote Admin
  const handleDemoteAdmin = (username: string) => {
    if (!confirm(`${username} kullanıcısının yöneticilik yetkisini almak istiyor musunuz?`)) return;
    const res = AuthService.demoteAdmin(username);
    if (res.success) {
      setAdminActionMsg({ type: "success", text: res.message });
      setUserList(AuthService.getAllUsers());
    } else {
      setAdminActionMsg({ type: "error", text: res.message });
    }
    setTimeout(() => setAdminActionMsg(null), 4000);
  };

  // Create News
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    NewsService.createNews({
      title: newsTitle,
      excerpt: newsExcerpt || newsTitle,
      content: newsContent,
      coverImage: newsCover,
      tag: newsTag,
      authorName: currentUser.displayName,
      authorRole: "Alliance Baş Yönetici"
    });

    setNewsList(NewsService.getAllNews());
    setNewsTitle("");
    setNewsExcerpt("");
    setNewsContent("");
    alert("Haber başarıyla yayınlandı!");
  };

  // Delete News
  const handleDeleteNews = (id: string) => {
    if (!confirm("Bu haberi silmek istediğinize emin misiniz?")) return;
    NewsService.deleteNews(id);
    setNewsList(NewsService.getAllNews());
  };

  // Delete Mix
  const handleDeleteMix = (mixId: string) => {
    if (!confirm("Bu mixi topluluk vitrininden kaldırmak istediğinize emin misiniz?")) return;
    MixService.deleteMix(mixId);
    setCommunityMixes(MixService.getAllMixes("newest"));
  };

  // Backup Export
  const handleExportBackup = () => {
    const backupData = SyncedLyricsService.getAllBackupData();
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eray_mansur_tam_senkron_yedek_" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Tüm şarkı sözleri ve ayarlar JSON olarak indirildi!");
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        SyncedLyricsService.restoreAllBackupData(parsed);
        window.dispatchEvent(new CustomEvent("synced-lyrics-updated"));
        alert("Yedek başarıyla geri yüklendi!");
      } catch {
        alert("Geçersiz yedek dosyası!");
      }
    };
    reader.readAsText(file);
  };

  const filteredUsers = AuthService.searchUsers(searchUserQuery);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 font-mono overflow-hidden animate-in fade-in duration-200">
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImportBackup}
      />

      <div className="relative flex flex-col h-full max-h-[95vh] w-full max-w-6xl border border-red-500/30 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-red-600 text-white flex items-center justify-center font-black text-base shadow-lg">
              👑
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                ALLIANCE RESMİ YÖNETİM HUB (ADMIN PANEL)
              </h2>
              <p className="text-[11px] text-neutral-400">
                Giriş Yapan Yetkili: <strong className="text-white">{currentUser.displayName}</strong> (@{currentUser.username})
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-neutral-400 hover:text-white p-2 hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b border-white/10 bg-[#0a0a0a] text-xs">
          <button
            type="button"
            className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
              activeTab === "users" ? "bg-red-600 text-white shadow-md" : "border border-white/10 text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <UserPlus className="h-3.5 w-3.5 mr-1.5 inline" /> 1. Admin & Kullanıcılar
          </button>

          <button
            type="button"
            className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
              activeTab === "news" ? "bg-red-600 text-white shadow-md" : "border border-white/10 text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("news")}
          >
            <Newspaper className="h-3.5 w-3.5 mr-1.5 inline" /> 2. Haber Yayınla ({newsList.length})
          </button>

          <button
            type="button"
            className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
              activeTab === "studio" ? "bg-red-600 text-white shadow-md" : "border border-white/10 text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("studio")}
          >
            <Mic2 className="h-3.5 w-3.5 mr-1.5 inline" /> 3. Söz Senkron & Kırp
          </button>

          <button
            type="button"
            className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
              activeTab === "moderation" ? "bg-red-600 text-white shadow-md" : "border border-white/10 text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("moderation")}
          >
            <Layers className="h-3.5 w-3.5 mr-1.5 inline" /> 4. Mix Moderasyonu ({communityMixes.length})
          </button>

          <button
            type="button"
            className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
              activeTab === "backup" ? "bg-emerald-600 text-white shadow-md" : "border border-white/10 text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("backup")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5 inline" /> 5. Tam Yedekleme (JSON)
          </button>
        </div>

        {/* Action Status Banner */}
        {adminActionMsg && (
          <div className={`px-6 py-2 text-xs font-bold ${adminActionMsg.type === "success" ? "bg-emerald-950 text-emerald-300 border-b border-emerald-500/30" : "bg-red-950 text-red-300 border-b border-red-500/30"}`}>
            {adminActionMsg.text}
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: ADMIN & USER MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Promote Form */}
              <div className="border border-red-500/30 bg-red-950/20 p-5">
                <h3 className="text-xs font-black text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> KULLANICI ADI GİREREK YENİ ADMİN EKLE
                </h3>
                <p className="text-xs text-neutral-300 mb-4 font-sans">
                  Sistemdeki herhangi bir kayıtlı kullanıcının kullanıcı adını girerek tek tıkla <strong>Alliance Admin</strong> yetkisi verebilirsiniz.
                </p>

                <form onSubmit={handlePromoteAdmin} className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Kullanıcı adı girin (örn: drill_turk)"
                    value={targetUsername}
                    onChange={(e) => setTargetUsername(e.target.value)}
                    className="flex-1 min-w-[240px] bg-black border border-white/20 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-6 py-3 rounded-none tracking-widest shadow-md"
                  >
                    👑 ADMİN YAP & YETKİLENDİR
                  </Button>
                </form>
              </div>

              {/* User Directory List */}
              <div className="border border-white/10 bg-black/40 p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-neutral-300 uppercase">
                    KAYITLI KULLANICILAR ({filteredUsers.length})
                  </span>
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Kullanıcı ara..."
                      value={searchUserQuery}
                      onChange={(e) => setSearchUserQuery(e.target.value)}
                      className="w-full bg-black border border-white/20 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                    />
                    <Search className="h-3.5 w-3.5 text-neutral-500 absolute right-2.5 top-2.5" />
                  </div>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {filteredUsers.map((u) => {
                    const isAdmin = u.role === "admin";
                    return (
                      <div
                        key={u.id}
                        className={`flex items-center justify-between p-3 border ${
                          isAdmin ? "border-red-500/40 bg-red-950/15" : "border-white/10 bg-black/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={u.avatar} alt={u.displayName} className="h-9 w-9 object-cover border border-white/20" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-white truncate">{u.displayName}</span>
                              <span className="text-[10px] text-neutral-400">@{u.username}</span>
                              {isAdmin && (
                                <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-black uppercase">
                                  ADMIN
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-neutral-500 truncate">{u.bio}</p>
                          </div>
                        </div>

                        <div>
                          {isAdmin ? (
                            u.username !== "enes" && (
                              <button
                                type="button"
                                onClick={() => handleDemoteAdmin(u.username)}
                                className="text-[10px] text-neutral-400 hover:text-red-400 font-bold uppercase px-2 py-1 border border-white/10"
                              >
                                Yetkiyi Kaldır
                              </button>
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setTargetUsername(u.username);
                                AuthService.promoteToAdmin(u.username);
                                setUserList(AuthService.getAllUsers());
                              }}
                              className="text-[10px] bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white font-bold uppercase px-3 py-1 border border-red-500/30"
                            >
                              + Admin Yap
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NEWS MANAGEMENT */}
          {activeTab === "news" && (
            <div className="space-y-6">
              {/* News Publish Form */}
              <form onSubmit={handleCreateNews} className="border border-white/10 bg-black/60 p-5 space-y-4">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider">
                  YENİ HABER / DUYURU YAYINLA
                </h3>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                    Haber Başlığı:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: YENİ ALLIANCE TURNESİ İÇİN 2. ETAP AÇIKLANDI"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      Kategori / Etiket:
                    </label>
                    <select
                      value={newsTag}
                      onChange={(e) => setNewsTag(e.target.value)}
                      className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                    >
                      <option value="TURNELER & KONSERLER">TURNELER & KONSERLER</option>
                      <option value="YENİ VİDEO KLİP">YENİ VİDEO KLİP</option>
                      <option value="ALBÜM & STÜDYO">ALBÜM & STÜDYO</option>
                      <option value="ÖZEL RÖPORTAJ">ÖZEL RÖPORTAJ</option>
                      <option value="DUYURU">GENEL DUYURU</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      Kapak Resmi URL:
                    </label>
                    <input
                      type="text"
                      value={newsCover}
                      onChange={(e) => setNewsCover(e.target.value)}
                      className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                    Özet (Spot):
                  </label>
                  <input
                    type="text"
                    placeholder="Kısa özet..."
                    value={newsExcerpt}
                    onChange={(e) => setNewsExcerpt(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                    Haber Detay İçeriği:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Haber metnini girin..."
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-6 py-3 rounded-none"
                >
                  HABERİ YAYINLA ➔
                </Button>
              </form>

              {/* Existing News List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-neutral-400 uppercase block">
                  YAYINDAKİ HABERLER ({newsList.length})
                </span>
                {newsList.map((n) => (
                  <div key={n.id} className="flex items-center justify-between p-4 border border-white/10 bg-black/40 gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <img src={n.coverImage} alt={n.title} className="h-12 w-12 object-cover border border-white/20 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] text-red-500 font-bold uppercase">{n.tag}</span>
                        <h4 className="text-xs font-bold text-white truncate">{n.title}</h4>
                        <p className="text-[11px] text-neutral-500 truncate">{n.excerpt}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteNews(n.id)}
                      className="text-neutral-500 hover:text-red-400 p-2"
                      title="Haberi Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LYRICS SYNC & AUDIO TRIMMER STUDIO */}
          {activeTab === "studio" && (
            <div className="space-y-4">
              <div className="border border-white/10 bg-black p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">ŞARKI SÖZ SENKRONU & FİZİKSEL KIRPMA STÜDYOSU</h4>
                  <p className="text-[11px] text-neutral-400">Bu araç kullanıcılardan tamamen gizlenmiştir, sadece buradan yönetilir.</p>
                </div>
                <select
                  value={selectedStudioTrackId}
                  onChange={(e) => setSelectedStudioTrackId(e.target.value)}
                  className="bg-black border border-white/20 text-white text-xs font-bold p-2 uppercase"
                >
                  {PLAYLIST.map((t) => (
                    <option key={t.id} value={t.id}>{t.title} — {t.artist}</option>
                  ))}
                </select>
              </div>

              <div className="relative border border-white/10 h-[600px] overflow-hidden">
                <LyricsStudio
                  initialTrackId={selectedStudioTrackId}
                  onClose={() => setActiveTab("users")}
                  onSaved={() => alert("Sözler ve ayarlar kaydedildi!")}
                />
              </div>
            </div>
          )}

          {/* TAB 4: MIX MODERATION */}
          {activeTab === "moderation" && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-neutral-300 uppercase block">
                PAYLAŞILAN TOPLULUK MİXLERİ DENETİMİ ({communityMixes.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communityMixes.map((m) => (
                  <div key={m.id} className="border border-white/10 bg-black/60 p-4 flex gap-4 items-start">
                    <img src={m.coverImage} alt={m.title} className="h-16 w-16 object-cover border border-white/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{m.title}</h4>
                      <p className="text-[10px] text-neutral-400">Yapımcı: {m.creatorName}</p>
                      <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1">{m.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-400">
                        <span>❤️ {m.likesCount} Beğeni</span>
                        <span>🎧 {m.totalListens} Dinlenme</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteMix(m.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                      title="Mixi Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FULL JSON BACKUP & RESTORE */}
          {activeTab === "backup" && (
            <div className="border border-white/10 bg-black/60 p-6 space-y-6">
              <div>
                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-1">
                  SİSTEM VERİ YEDEKLEME VE GERİ YÜKLEME
                </h3>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Tüm şarkıların senkronize sözlerini, kırpma sürelerini ve özel ayarlarını tek bir JSON dosyası olarak diskinize indirebilir veya kaydedilmiş bir yedeği yükleyebilirsiniz.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase px-6 py-3 rounded-none shadow-md flex items-center gap-2"
                  onClick={handleExportBackup}
                >
                  <Download className="h-4 w-4" /> TÜM SENKRONLARI YEDEKLE (JSON İNDİR)
                </Button>

                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-bold text-xs uppercase px-6 py-3 rounded-none flex items-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" /> YEDEKTEN GERİ YÜKLE
                </Button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
"""

with open("src/components/AdminHub.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("AdminHub.tsx written successfully")
