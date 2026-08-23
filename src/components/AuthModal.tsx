import React, { useState, useRef } from "react";
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
  Settings,
  Upload,
  ArrowLeft,
  Globe
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
  initialMode?: "login" | "register" | "profile" | "forgot";
}

const GoogleLogo = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const AVATAR_PRESETS = [
  "/assets/images/eray_mansur_alliance.jpg",
  "/assets/images/eray067_portrait.jpg",
  "/assets/images/mansur_portrait.jpg",
  "/assets/images/alliance_cover.jpg",
  "/assets/images/g_wagon.jpg",
  "/assets/images/balmain.jpg"
];

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "profile" | "forgot" | "google_username">(initialMode);
  const currentUser = AuthService.getCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form: ONLY Username, Email, Password, Confirm Password
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Forgot Password form
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState<"email" | "code">("email");
  const [resetCodeInput, setResetCodeInput] = useState("");
  const [newResetPassword, setNewResetPassword] = useState("");
  const [newResetConfirm, setNewResetConfirm] = useState("");
  const [generatedCodeNotification, setGeneratedCodeNotification] = useState<string | null>(null);

  // Google Login flow
  const [googlePendingData, setGooglePendingData] = useState<{ email: string; name: string; avatar: string } | null>(null);
  const [googleUsernameInput, setGoogleUsernameInput] = useState("");

  // Settings / Profile Edit
  const [editDisplayName, setEditDisplayName] = useState(currentUser?.displayName || "");
  const [editBio, setEditBio] = useState(currentUser?.bio || "");
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || AVATAR_PRESETS[0]);
  const [editFavTrack, setEditFavTrack] = useState(currentUser?.favoriteTrackId || PLAYLIST[0].id);
  
  // Secure Password Change (Requires Old Password)
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Gallery/File Image Upload for Avatar
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Görsel boyutu en fazla 5MB olabilir.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setEditAvatar(reader.result as string);
          setSuccessMessage("Profil görseli galeriden başarıyla yüklendi!");
          setTimeout(() => setSuccessMessage(null), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleGoogleSimulatedClick = () => {
    const mockGoogleProfile = {
      email: "dinleyici_" + Math.floor(100 + Math.random() * 900) + "@gmail.com",
      name: "Google Dinleyicisi",
      avatar: AVATAR_PRESETS[0]
    };

    const res = AuthService.googleLogin(mockGoogleProfile);
    if (res.success && res.user) {
      setSuccessMessage("Google ile giriş başarılı!");
      if (onSuccess) onSuccess(res.user);
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 700);
    } else if (res.needsUsername) {
      setGooglePendingData(mockGoogleProfile);
      setGoogleUsernameInput(res.suggestedUsername || "");
      setMode("google_username");
    } else {
      setErrorMessage(res.error || "Google girişi başarısız.");
    }
  };

  const handleGoogleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googlePendingData) return;
    setErrorMessage(null);

    const res = AuthService.googleLogin({
      ...googlePendingData,
      customUsername: googleUsernameInput
    });

    if (res.success && res.user) {
      setSuccessMessage("Google hesabınız oluşturuldu ve giriş yapıldı!");
      if (onSuccess) onSuccess(res.user);
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 700);
    } else {
      setErrorMessage(res.error || "Bu kullanıcı adı kullanılamıyor.");
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

  const handleRequestForgotCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = AuthService.requestPasswordResetCode(forgotEmail);
    if (res.success && res.code) {
      setGeneratedCodeNotification(res.code);
      setForgotStep("code");
      setSuccessMessage(res.message);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newResetPassword !== newResetConfirm) {
      setErrorMessage("Yeni şifreler birbiriyle eşleşmiyor!");
      return;
    }

    const res = AuthService.resetPasswordWithCode(forgotEmail, resetCodeInput, newResetPassword);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        setMode("login");
        setForgotStep("email");
        setGeneratedCodeNotification(null);
        setSuccessMessage(null);
      }, 1500);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const ok = AuthService.updateProfile(currentUser.id, {
      displayName: editDisplayName.trim() || currentUser.username,
      bio: editBio.trim(),
      avatar: editAvatar,
      favoriteTrackId: editFavTrack
    });

    if (oldPasswordInput.trim() || newPasswordInput.trim()) {
      if (!oldPasswordInput.trim()) {
        setErrorMessage("Şifrenizi değiştirmek için lütfen mevcut (eski) şifrenizi girin!");
        return;
      }
      if (newPasswordInput !== newPasswordConfirm) {
        setErrorMessage("Yeni şifreler birbiriyle eşleşmiyor!");
        return;
      }
      const passRes = AuthService.changePasswordWithOld(currentUser.id, oldPasswordInput, newPasswordInput);
      if (!passRes.success) {
        setErrorMessage(passRes.message);
        return;
      }
      setOldPasswordInput("");
      setNewPasswordInput("");
      setNewPasswordConfirm("");
    }

    if (ok) {
      setErrorMessage(null);
      setSuccessMessage("Profil ayarlarınız başarıyla kaydedildi!");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-lg border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
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
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex gap-4">
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

            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Girişe Dön
              </button>
            )}
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
                  👑 ADMIN
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
          <div className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                  Kullanıcı Adı veya E-Posta:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="enes veya ornek@mail.com"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                  />
                  <User className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-neutral-400 uppercase">
                    Şifre:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setErrorMessage(null);
                    }}
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    Şifremi Unuttum?
                  </button>
                </div>
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
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest"
              >
                GİRİŞ YAP ➔
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] text-neutral-500 uppercase">VEYA</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Google Login Button with Official Google G Logo */}
            <button
              type="button"
              onClick={handleGoogleSimulatedClick}
              className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white text-xs font-bold uppercase transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99]"
            >
              <GoogleLogo />
              <span>GOOGLE İLE GİRİŞ YAP</span>
            </button>
          </div>
        )}

        {/* 2. REGISTER FORM: ONLY 4 FIELDS */}
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
              * Profil resmi, biyografi ve favori şarkınızı hesabınızı açtıktan sonra <strong>Hesap Ayarları</strong> bölümünden düzenleyebilirsiniz.
            </p>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest mt-2"
            >
              KAYIT OL ➔
            </Button>
          </form>
        )}

        {/* 3. GOOGLE USERNAME SELECTION FORM */}
        {!currentUser && mode === "google_username" && (
          <form onSubmit={handleGoogleUsernameSubmit} className="space-y-4">
            <div className="p-3 bg-red-950/30 border border-red-500/30 text-xs text-neutral-300 font-sans">
              Google hesabınız doğrulandı! Lütfen sitede size özel görünecek <strong>benzersiz kullanıcı adınızı</strong> belirleyin:
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                Benzersiz Kullanıcı Adı Seçin: *
              </label>
              <input
                type="text"
                required
                value={googleUsernameInput}
                onChange={(e) => setGoogleUsernameInput(e.target.value)}
                className="w-full bg-black border border-white/20 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none"
            >
              KULLANICI ADINI ONAYLA VE GİRİŞ YAP ➔
            </Button>
          </form>
        )}

        {/* 4. FORGOT PASSWORD */}
        {!currentUser && mode === "forgot" && (
          <div className="space-y-4">
            {forgotStep === "email" ? (
              <form onSubmit={handleRequestForgotCode} className="space-y-4">
                <p className="text-xs text-neutral-400 font-sans">
                  Kayıtlı e-posta adresinizi girin. E-postanıza 6 haneli güvenlik doğrulama kodu gönderilecektir.
                </p>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                    Kayıtlı E-Posta:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ornek@mail.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none"
                >
                  DOĞRULAMA KODU GÖNDER ➔
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                {generatedCodeNotification && (
                  <div className="p-3 bg-red-950/40 border border-red-500/40 text-xs font-bold text-red-300">
                    📧 Güvenlik Kodunuz: <span className="text-white text-sm font-black tracking-widest">{generatedCodeNotification}</span>
                  </div>
                )}
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                    6 Haneli Doğrulama Kodu: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: 784012"
                    value={resetCodeInput}
                    onChange={(e) => setResetCodeInput(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-3 font-bold tracking-widest focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                      Yeni Şifre: *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newResetPassword}
                      onChange={(e) => setNewResetPassword(e.target.value)}
                      className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1.5">
                      Yeni Şifre Tekrar: *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newResetConfirm}
                      onChange={(e) => setNewResetConfirm(e.target.value)}
                      className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none"
                >
                  ŞİFREYİ SIFIRLA VE KAYDET ➔
                </Button>
              </form>
            )}
          </div>
        )}

        {/* 5. SETTINGS & PROFILE EDIT */}
        {currentUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-4">
              <div className="relative h-16 w-16 border border-white/20 overflow-hidden shrink-0 aspect-square">
                <img
                  src={editAvatar}
                  alt={currentUser.displayName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-white truncate">{currentUser.displayName}</h3>
                <p className="text-xs text-neutral-400">@{currentUser.username}</p>
                <p className="text-[11px] text-neutral-500 truncate mt-0.5">{currentUser.bio}</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2 border-t border-white/10">
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

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase block">
                  Profil Resmi (Galeriden / Dosyalardan Seç veya Hazır Avatar Kullan):
                </label>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleAvatarFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full border-dashed border-red-500/40 hover:border-red-500 text-red-400 hover:text-white font-bold text-xs uppercase py-2.5 rounded-none flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" /> DOSYALARDAN / GALERİDEN RESİM YÜKLE
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
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

              <div className="border border-white/10 bg-black/40 p-3 space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block flex items-center gap-1">
                  <KeyRound className="h-3 w-3 text-red-500" /> ŞİFRE DEĞİŞTİR (GÜVENLİK İÇİN ESKİ ŞİFRE GEREKİR):
                </span>
                <div>
                  <input
                    type="password"
                    placeholder="Mevcut (Eski) Şifreniz"
                    value={oldPasswordInput}
                    onChange={(e) => setOldPasswordInput(e.target.value)}
                    className="w-full bg-black border border-white/15 text-white text-xs p-2 mb-2 focus:border-red-500 focus:outline-none"
                  />
                </div>
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
