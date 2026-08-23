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
  Music,
  KeyRound,
  Settings
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

  // Register form: ONLY Username, Email, Password, Confirm Password
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Settings / Profile Edit
  const [editDisplayName, setEditDisplayName] = useState(currentUser?.displayName || "");
  const [editBio, setEditBio] = useState(currentUser?.bio || "");
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || AVATAR_PRESETS[0]);
  const [editFavTrack, setEditFavTrack] = useState(currentUser?.favoriteTrackId || PLAYLIST[0].id);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

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

    const cleanUser = regUsername.trim().toLowerCase();
    const cleanEmail = regEmail.trim();

    if (!cleanUser || cleanUser.length < 3) {
      setErrorMessage("Kullanıcı adı en az 3 karakter olmalıdır.");
      return;
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setErrorMessage("Şifre en az 4 karakter olmalıdır.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Girdiğiniz şifreler birbiriyle eşleşmiyor!");
      return;
    }

    const res = AuthService.register({
      username: cleanUser,
      email: cleanEmail,
      password: regPassword,
      displayName: cleanUser,
      avatar: AVATAR_PRESETS[0],
      bio: "ALLIANCE Dinleyicisi 🎧",
      favoriteTrackId: "bak_ne_dicem"
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

    // Profile updates
    const ok = AuthService.updateProfile(currentUser.id, {
      displayName: editDisplayName.trim() || currentUser.username,
      bio: editBio.trim(),
      avatar: editAvatar,
      favoriteTrackId: editFavTrack
    });

    // Password update if provided
    if (newPasswordInput.trim()) {
      if (newPasswordInput !== newPasswordConfirm) {
        setErrorMessage("Yeni şifreler birbiriyle eşleşmiyor!");
        return;
      }
      const passRes = AuthService.changePassword(currentUser.id, newPasswordInput);
      if (!passRes.success) {
        setErrorMessage(passRes.message);
        return;
      }
      setNewPasswordInput("");
      setNewPasswordConfirm("");
    }

    if (ok) {
      setErrorMessage(null);
      setSuccessMessage("Profil ayarlarınız başarıyla güncellendi!");
      setTimeout(() => setSuccessMessage(null), 3000);
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
          <div className="flex border-b border-white/10 pb-4 mb-6 gap-4">
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
              <Settings className="h-4 w-4 text-red-500" />
              <span className="text-xs uppercase font-black text-white tracking-wider">
                HESAP AYARLARI & PROFİL
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
              <LogOut className="h-3.5 w-3.5" /> Çıkış Yap
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

        {/* 1. LOGIN FORM */}
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
                  placeholder="Kullanıcı adınızı girin"
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

        {/* 2. REGISTER FORM: ONLY USERNAME, EMAIL, PASSWORD, PASSWORD CONFIRM */}
        {!currentUser && mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                Kullanıcı Adı: *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Örn: alliance_fan"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                />
                <User className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                E-Posta: *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="ornek@mail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                />
                <Mail className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                  Şifre: *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                  />
                  <Lock className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                  Şifre Tekrar: *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                  />
                  <Lock className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-neutral-500 font-sans">
              * Profil resmi, biyografi ve favori şarkı gibi detayları hesabınızı açtıktan sonra <strong>Ayarlar</strong> bölümünden istediğiniz zaman düzenleyebilirsiniz.
            </p>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest mt-2"
            >
              KAYIT OL ➔
            </Button>
          </form>
        )}

        {/* 3. SETTINGS & PROFILE EDIT (FOR LOGGED IN USER) */}
        {currentUser && (
          <div className="space-y-6">
            
            {/* User Info Header Card */}
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-4">
              <div className="relative h-16 w-16 border border-white/20 overflow-hidden shrink-0 aspect-square">
                <img src={currentUser.avatar} alt={currentUser.displayName} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-white truncate">{currentUser.displayName}</h3>
                <p className="text-xs text-neutral-400">@{currentUser.username}</p>
                <p className="text-[11px] text-neutral-500 truncate mt-0.5">{currentUser.bio}</p>
              </div>
            </div>

            {/* Pinned Favorite Song */}
            {favTrackObj && (
              <div className="border border-red-500/30 bg-red-950/20 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <Music className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-red-400 font-bold uppercase tracking-wider block">
                      FAVORİ ŞARKI
                    </span>
                    <p className="text-xs font-bold text-white truncate">{favTrackObj.title} — {favTrackObj.artist}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile & Account Settings Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-neutral-300 uppercase block">
                PROFİL VE HESAP AYARLARI
              </span>

              {/* Display Name */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Görünen İsim (Takma Ad):
                </label>
                <input
                  type="text"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Biyografi:
                </label>
                <input
                  type="text"
                  placeholder="Kendinizi tanıtın..."
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1.5">
                  Profil Resmi (Avatar) Seç:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_PRESETS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(av)}
                      className={`h-10 w-10 border overflow-hidden transition-all aspect-square ${
                        editAvatar === av ? "border-red-500 scale-110 shadow-md ring-2 ring-red-500" : "border-white/20 opacity-60"
                      }`}
                    >
                      <img src={av} alt="avatar" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorite Track */}
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  En Sevdiğin Şarkı:
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

              {/* Change Password (Optional) */}
              <div className="border border-white/10 bg-black/40 p-3 space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block flex items-center gap-1">
                  <KeyRound className="h-3 w-3 text-red-500" /> ŞİFRE DEĞİŞTİR (İSTEĞE BAĞLI):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="password"
                    placeholder="Yeni Şifre"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Yeni Şifre Tekrar"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3 rounded-none tracking-wider shadow-md"
              >
                AYARLARI VE DEĞİŞİKLİKLERİ KAYDET
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
print("AuthModal.tsx updated with clean 4-field register form and settings!")
