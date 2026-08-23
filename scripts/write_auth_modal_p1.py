with open("src/components/AuthModal.tsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState, useRef } from "react";
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
  Chrome
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
  initialMode?: "login" | "register" | "profile" | "forgot";
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
''')
print("AuthModal P1 written")
