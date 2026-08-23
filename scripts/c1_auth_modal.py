code = """import React, { useState } from "react";
import { AuthService, UserProfile } from "@/services/authService";
import { PLAYLIST } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  LogOut, 
  Edit3, 
  Check, 
  Camera, 
  Music 
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
  initialMode?: "login" | "register" | "profile";
}

const AVATAR_PRESETS = [
  "/assets/images/eray_mansur_alliance.jpg",
  "/assets/images/eray067_portrait.jpg",
  "/assets/images/mansur_portrait.jpg",
  "/assets/images/alliance_cover.jpg",
  "/assets/images/g_wagon.jpg",
  "/assets/images/balmain.jpg"
];

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "profile">(initialMode);
  const currentUser = AuthService.getCurrentUser();

  // Login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDisplayName, setRegDisplayName] = useState("");
  const [regAvatar, setRegAvatar] = useState(AVATAR_PRESETS[0]);
  const [regBio, setRegBio] = useState("");
  const [regFavTrack, setRegFavTrack] = useState(PLAYLIST[0].id);

  // Profile Edit
  const [editDisplayName, setEditDisplayName] = useState(currentUser?.displayName || "");
  const [editBio, setEditBio] = useState(currentUser?.bio || "");
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || AVATAR_PRESETS[0]);
  const [editFavTrack, setEditFavTrack] = useState(currentUser?.favoriteTrackId || PLAYLIST[0].id);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = AuthService.login(loginUsername, loginPassword);
    if (res.success && res.user) {
      setSuccessMessage("Giriş başarılı!");
      if (onSuccess) onSuccess(res.user);
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 700);
    } else {
      setErrorMessage(res.error || "Giriş başarısız.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = AuthService.register({
      username: regUsername,
      email: regEmail,
      password: regPassword,
      displayName: regDisplayName,
      avatar: regAvatar,
      bio: regBio,
      favoriteTrackId: regFavTrack
    });

    if (res.success && res.user) {
      setSuccessMessage("Hesabınız başarıyla oluşturuldu!");
      if (onSuccess) onSuccess(res.user);
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 800);
    } else {
      setErrorMessage(res.error || "Kayıt oluşturulamadı.");
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const ok = AuthService.updateProfile(currentUser.id, {
      displayName: editDisplayName,
      bio: editBio,
      avatar: editAvatar,
      favoriteTrackId: editFavTrack
    });
    if (ok) {
      setSuccessMessage("Profil bilgileriniz güncellendi!");
      setTimeout(() => setSuccessMessage(null), 2500);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    onClose();
  };

  const favTrackObj = PLAYLIST.find((t) => t.id === (currentUser?.favoriteTrackId || editFavTrack));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-lg border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Tabs */}
        {!currentUser ? (
          <div className="flex border-b border-white/10 pb-4 mb-6 gap-3">
            <button
              type="button"
              className={`text-xs uppercase font-black tracking-wider pb-1 transition-all ${
                mode === "login"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-neutral-500 hover:text-white"
              }`}
              onClick={() => {
                setMode("login");
                setErrorMessage(null);
              }}
            >
              GİRİŞ YAP
            </button>
            <button
              type="button"
              className={`text-xs uppercase font-black tracking-wider pb-1 transition-all ${
                mode === "register"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-neutral-500 hover:text-white"
              }`}
              onClick={() => {
                setMode("register");
                setErrorMessage(null);
              }}
            >
              KAYIT OL
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-black text-white tracking-wider">
                HESABIM // PROFİL
              </span>
              {currentUser.role === "admin" && (
                <span className="px-2 py-0.5 bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase">
                  👑 ALLIANCE ADMIN
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 font-bold"
            >
              <LogOut className="h-3.5 w-3.5" /> Çıkış
            </button>
          </div>
        )}

        {/* Error / Success Banners */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold">
            ⚠ {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            ✓ {successMessage}
          </div>
        )}

        {/* LOGIN FORM */}
        {!currentUser && mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                Kullanıcı Adı:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="örn: enes veya drill_turk"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                />
                <User className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                Şifre:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                />
                <Lock className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest mt-2"
            >
              GİRİŞ YAP ➔
            </Button>
          </form>
        )}

        {/* REGISTER FORM */}
        {!currentUser && mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Kullanıcı Adı:
                </label>
                <input
                  type="text"
                  required
                  placeholder="kullanici_adi"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Görünen İsim:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ad Soyad veya Takma Ad"
                  value={regDisplayName}
                  onChange={(e) => setRegDisplayName(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  E-Posta:
                </label>
                <input
                  type="email"
                  required
                  placeholder="ornek@mail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Şifre:
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1.5">
                Profil Avatarı Seçin:
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_PRESETS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRegAvatar(av)}
                    className={`h-10 w-10 border overflow-hidden transition-all ${
                      regAvatar === av ? "border-red-500 scale-110 shadow-md" : "border-white/20 opacity-60"
                    }`}
                  >
                    <img src={av} alt="avatar" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                Biyografi:
              </label>
              <input
                type="text"
                placeholder="Kendinizi tanıtın..."
                value={regBio}
                onChange={(e) => setRegBio(e.target.value)}
                className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                En Sevdiğin Şarkı:
              </label>
              <select
                value={regFavTrack}
                onChange={(e) => setRegFavTrack(e.target.value)}
                className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
              >
                {PLAYLIST.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} — {t.artist}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest mt-2"
            >
              KAYIT OL & ALLIANCE'A KATIL
            </Button>
          </form>
        )}

        {/* LOGGED IN USER PROFILE VIEW & EDIT */}
        {currentUser && (
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-4">
              <div className="relative h-16 w-16 border border-white/20 overflow-hidden shrink-0">
                <img src={currentUser.avatar} alt={currentUser.displayName} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-white truncate">{currentUser.displayName}</h3>
                <p className="text-xs text-neutral-400">@{currentUser.username}</p>
                <p className="text-[11px] text-neutral-500 truncate mt-0.5">{currentUser.bio}</p>
              </div>
            </div>

            {/* Pinned Favorite Track */}
            {favTrackObj && (
              <div className="border border-red-500/30 bg-red-950/20 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-9 w-9 bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <Music className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                      FAVORİ ŞARKI
                    </span>
                    <p className="text-xs font-bold text-white truncate">{favTrackObj.title}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-neutral-300 uppercase block">
                PROFİL BİLGİLERİNİ GÜNCELLE
              </span>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Görünen İsim:
                </label>
                <input
                  type="text"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Biyografi:
                </label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1.5">
                  Avatar Değiştir:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_PRESETS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(av)}
                      className={`h-10 w-10 border overflow-hidden transition-all ${
                        editAvatar === av ? "border-red-500 scale-110 shadow-md" : "border-white/20 opacity-60"
                      }`}
                    >
                      <img src={av} alt="avatar" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Favori Şarkı:
                </label>
                <select
                  value={editFavTrack}
                  onChange={(e) => setEditFavTrack(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                >
                  {PLAYLIST.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — {t.artist}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase py-3 rounded-none tracking-wider"
              >
                DEĞİŞİKLİKLERİ KAYDET
              </Button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
"""

with open("src/components/AuthModal.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("AuthModal.tsx written successfully")
