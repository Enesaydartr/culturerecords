export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  role: "admin" | "user";
  favoriteTrackId?: string;
  createdAt: string;
  following: string[];
  followers: string[];
  friends: string[];
  likedTrackIds: string[];
  likedMixIds: string[];
}

const USERS_STORAGE_KEY = "eray_mansur_users_v4";
const SESSION_STORAGE_KEY = "eray_mansur_session_v4";
const PASSWORDS_KEY = "eray_mansur_passwords_v4";
const RESET_CODES_KEY = "eray_mansur_reset_codes_v4";

// Initial Authentic Accounts: Master Admin Enes & Official Artists ERAY067 and MANSUR
const INITIAL_USERS: UserProfile[] = [
  {
    id: "user_enes_admin",
    username: "enes",
    email: "enes@alliancerecords.com",
    displayName: "Enes",
    avatar: "/assets/images/eray_mansur_alliance.jpg",
    bio: "Alliance Records Kurucu & Baş Yönetici",
    role: "admin",
    favoriteTrackId: "bak_ne_dicem",
    createdAt: "2026-01-01T00:00:00.000Z",
    following: ["user_eray067", "user_mansur"],
    followers: [],
    friends: ["user_eray067", "user_mansur"],
    likedTrackIds: [],
    likedMixIds: []
  },
  {
    id: "user_eray067",
    username: "eray067",
    email: "eray@alliancerecords.com",
    displayName: "ERAY067",
    avatar: "/assets/images/eray067_portrait.jpg",
    bio: "O Ses Rap 2023 Şampiyonu • ALLIANCE • Frankfurt am Main",
    role: "admin",
    favoriteTrackId: "g_wagon",
    createdAt: "2026-01-01T00:00:00.000Z",
    following: ["user_enes_admin", "user_mansur"],
    followers: [],
    friends: ["user_enes_admin", "user_mansur"],
    likedTrackIds: [],
    likedMixIds: []
  },
  {
    id: "user_mansur",
    username: "mansur",
    email: "mansur@alliancerecords.com",
    displayName: "MANSUR",
    avatar: "/assets/images/mansur_portrait.jpg",
    bio: "ALLIANCE Producer & Rapper • Hitmaker",
    role: "admin",
    favoriteTrackId: "nafile",
    createdAt: "2026-01-01T00:00:00.000Z",
    following: ["user_enes_admin", "user_eray067"],
    followers: [],
    friends: ["user_enes_admin", "user_eray067"],
    likedTrackIds: [],
    likedMixIds: []
  }
];

const INITIAL_PASSWORDS: Record<string, string> = {
  enes: "enes7645",
  eray067: "alliance2026",
  mansur: "alliance2026"
};

export const AuthService = {
  init(): void {
    try {
      if (!localStorage.getItem(USERS_STORAGE_KEY)) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      }
      if (!localStorage.getItem(PASSWORDS_KEY)) {
        localStorage.setItem(PASSWORDS_KEY, JSON.stringify(INITIAL_PASSWORDS));
      }
    } catch {
      // ignore
    }
  },

  getAllUsers(): UserProfile[] {
    this.init();
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  },

  getUserById(id: string): UserProfile | null {
    const users = this.getAllUsers();
    return users.find((u) => u.id === id) || null;
  },

  getUserByUsername(username: string): UserProfile | null {
    const users = this.getAllUsers();
    return users.find((u) => u.username.toLowerCase() === username.toLowerCase().trim()) || null;
  },

  getUserByEmail(email: string): UserProfile | null {
    const users = this.getAllUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  isUsernameAvailable(username: string): boolean {
    const clean = username.trim().toLowerCase();
    if (!clean || clean.length < 3) return false;
    return !this.getUserByUsername(clean);
  },

  getCurrentUser(): UserProfile | null {
    this.init();
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        const fresh = this.getUserById(parsed.id);
        return fresh || parsed;
      }
    } catch {
      // ignore
    }
    return null;
  },

  login(usernameOrEmail: string, pass: string): { success: boolean; error?: string; user?: UserProfile } {
    this.init();
    const clean = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    try {
      let user = this.getUserByUsername(clean);
      if (!user) {
        user = this.getUserByEmail(clean);
      }

      if (!user) {
        return { success: false, error: "Kullanıcı adı veya e-posta bulunamadı!" };
      }

      const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
      const expectedPass = passwords[user.username.toLowerCase()];

      if (!expectedPass || expectedPass !== cleanPass) {
        return { success: false, error: "Şifre hatalı!" };
      }

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user } }));
      return { success: true, user };
    } catch (e: any) {
      return { success: false, error: e.message || "Giriş yapılamadı." };
    }
  },

  register(data: {
    username: string;
    email: string;
    password: string;
    displayName?: string;
    avatar?: string;
    bio?: string;
    favoriteTrackId?: string;
  }): { success: boolean; error?: string; user?: UserProfile } {
    this.init();
    const cleanUsername = data.username.trim().toLowerCase();
    const cleanEmail = data.email.trim().toLowerCase();

    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: "Kullanıcı adı en az 3 karakter olmalıdır." };
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Geçerli bir e-posta adresi giriniz." };
    }
    if (!data.password || data.password.length < 4) {
      return { success: false, error: "Şifre en az 4 karakter olmalıdır." };
    }

    if (this.getUserByUsername(cleanUsername)) {
      return { success: false, error: "Bu kullanıcı adı zaten kullanılıyor!" };
    }
    if (this.getUserByEmail(cleanEmail)) {
      return { success: false, error: "Bu e-posta adresiyle kayıtlı bir hesap var!" };
    }

    const newUser: UserProfile = {
      id: "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      username: cleanUsername,
      email: cleanEmail,
      displayName: data.displayName?.trim() || cleanUsername,
      avatar: data.avatar || "/assets/images/eray_mansur_alliance.jpg",
      bio: data.bio || "ALLIANCE Dinleyicisi 🎧",
      role: "user",
      favoriteTrackId: data.favoriteTrackId || "bak_ne_dicem",
      createdAt: new Date().toISOString(),
      following: [],
      followers: [],
      friends: [],
      likedTrackIds: [],
      likedMixIds: []
    };

    try {
      const users = this.getAllUsers();
      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
      passwords[cleanUsername] = data.password.trim();
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
      window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: newUser } }));
      return { success: true, user: newUser };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // GOOGLE OAUTH INFRASTRUCTURE & JWT TOKEN DECODER
  decodeGoogleJwt(credentialJwt: string): { email: string; name: string; picture?: string; sub: string } | null {
    try {
      const base64Url = credentialJwt.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  },

  handleGoogleCredentialResponse(credentialJwt: string): {
    success: boolean;
    needsUsername?: boolean;
    suggestedUsername?: string;
    user?: UserProfile;
    error?: string;
  } {
    const payload = this.decodeGoogleJwt(credentialJwt);
    if (!payload || !payload.email) {
      return { success: false, error: "Geçersiz Google kimlik yanıtı." };
    }
    return this.googleLogin({
      email: payload.email,
      name: payload.name || payload.email.split("@")[0],
      avatar: payload.picture
    });
  },

  // GOOGLE LOGIN INTEGRATION (Requests unique username if first time)
  googleLogin(googleData: { email: string; name: string; avatar?: string; customUsername?: string }): {
    success: boolean;
    needsUsername?: boolean;
    suggestedUsername?: string;
    user?: UserProfile;
    error?: string;
  } {
    this.init();
    const cleanEmail = googleData.email.trim().toLowerCase();
    let existingUser = this.getUserByEmail(cleanEmail);

    if (existingUser) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existingUser));
      window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: existingUser } }));
      return { success: true, user: existingUser };
    }

    // New Google User: requires a unique username
    let desiredUsername = (googleData.customUsername || googleData.name.toLowerCase().replace(/[^a-z0-9_]/g, "")).trim();
    if (!desiredUsername) desiredUsername = cleanEmail.split("@")[0].replace(/[^a-z0-9_]/g, "");

    if (!googleData.customUsername && this.getUserByUsername(desiredUsername)) {
      // Suggest alternative
      const suggestion = desiredUsername + "_" + Math.floor(100 + Math.random() * 900);
      return {
        success: false,
        needsUsername: true,
        suggestedUsername: suggestion
      };
    }

    if (googleData.customUsername && this.getUserByUsername(desiredUsername)) {
      return { success: false, error: "Bu kullanıcı adı zaten alınmış, lütfen başka bir ad seçin." };
    }

    const newUser: UserProfile = {
      id: "google_user_" + Date.now(),
      username: desiredUsername,
      email: cleanEmail,
      displayName: googleData.name,
      avatar: googleData.avatar || "/assets/images/eray_mansur_alliance.jpg",
      bio: "Google ile katıldı 🎧",
      role: "user",
      favoriteTrackId: "bak_ne_dicem",
      createdAt: new Date().toISOString(),
      following: [],
      followers: [],
      friends: [],
      likedTrackIds: [],
      likedMixIds: []
    };

    const users = this.getAllUsers();
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
    passwords[desiredUsername] = "google_auth_oauth2";
    localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: newUser } }));
    return { success: true, user: newUser };
  },

  // FORGOT PASSWORD / RESET CODE FLOW
  requestPasswordResetCode(email: string): { success: boolean; code?: string; message: string } {
    this.init();
    const cleanEmail = email.trim().toLowerCase();
    const user = this.getUserByEmail(cleanEmail);

    if (!user) {
      return { success: false, message: "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı!" };
    }

    // Generate 6-digit secure code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const resetMap: Record<string, { code: string; expiresAt: number }> = JSON.parse(
        localStorage.getItem(RESET_CODES_KEY) || "{}"
      );
      resetMap[cleanEmail] = { code, expiresAt: Date.now() + 15 * 60 * 1000 }; // 15 mins expiry
      localStorage.setItem(RESET_CODES_KEY, JSON.stringify(resetMap));

      return {
        success: true,
        code,
        message: `6 haneli doğrulama kodunuz oluşturuldu: ${code} (E-posta kutunuzu kontrol edin)`
      };
    } catch {
      return { success: false, message: "Kod oluşturulurken hata oluştu." };
    }
  },

  resetPasswordWithCode(email: string, code: string, newPass: string): { success: boolean; message: string } {
    this.init();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();
    const cleanPass = newPass.trim();

    if (!cleanPass || cleanPass.length < 4) {
      return { success: false, message: "Yeni şifre en az 4 karakter olmalıdır." };
    }

    try {
      const resetMap: Record<string, { code: string; expiresAt: number }> = JSON.parse(
        localStorage.getItem(RESET_CODES_KEY) || "{}"
      );
      const record = resetMap[cleanEmail];

      if (!record || record.code !== cleanCode || Date.now() > record.expiresAt) {
        return { success: false, message: "Geçersiz veya süresi dolmuş doğrulama kodu!" };
      }

      const user = this.getUserByEmail(cleanEmail);
      if (!user) return { success: false, message: "Kullanıcı bulunamadı." };

      const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
      passwords[user.username.toLowerCase()] = cleanPass;
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));

      // Remove code after successful reset
      delete resetMap[cleanEmail];
      localStorage.setItem(RESET_CODES_KEY, JSON.stringify(resetMap));

      return { success: true, message: "Şifreniz başarıyla sıfırlandı! Şimdi yeni şifrenizle giriş yapabilirsiniz." };
    } catch {
      return { success: false, message: "Şifre sıfırlama işlemi başarısız." };
    }
  },

  // SECURE PASSWORD CHANGE (Requires Old Password)
  changePasswordWithOld(userId: string, oldPass: string, newPass: string): { success: boolean; message: string } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, message: "Kullanıcı bulunamadı." };

    const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
    const currentStoredPass = passwords[user.username.toLowerCase()];

    if (currentStoredPass !== oldPass.trim()) {
      return { success: false, message: "Mevcut (eski) şifrenizi hatalı girdiniz!" };
    }

    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: "Yeni şifre en az 4 karakter olmalıdır." };
    }

    passwords[user.username.toLowerCase()] = newPass.trim();
    localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
    return { success: true, message: "Şifreniz başarıyla güncellendi!" };
  },

  logout(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: null } }));
  },

  isFollowing(currentUserId: string, targetUserId: string): boolean {
    const user = this.getUserById(currentUserId);
    return !!(user && user.following && user.following.includes(targetUserId));
  },

  areMutualFollowers(userIdA: string, userIdB: string): boolean {
    if (!userIdA || !userIdB || userIdA === userIdB) return false;
    const userA = this.getUserById(userIdA);
    const userB = this.getUserById(userIdB);
    if (!userA || !userB) return false;
    const aFollowsB = !!(userA.following && userA.following.includes(userIdB));
    const bFollowsA = !!(userB.following && userB.following.includes(userIdA));
    return aFollowsB && bFollowsA;
  },

  toggleFollow(targetUserId: string, currentUserId: string): { isFollowing: boolean; targetFollowersCount: number } {
    this.init();
    const users = this.getAllUsers();
    const targetIdx = users.findIndex((u) => u.id === targetUserId);
    const currentIdx = users.findIndex((u) => u.id === currentUserId);

    if (targetIdx === -1 || currentIdx === -1) {
      return { isFollowing: false, targetFollowersCount: 0 };
    }

    const currentUser = users[currentIdx];
    const targetUser = users[targetIdx];

    currentUser.following = currentUser.following || [];
    targetUser.followers = targetUser.followers || [];

    const isAlreadyFollowing = currentUser.following.includes(targetUserId);

    if (isAlreadyFollowing) {
      currentUser.following = currentUser.following.filter((id) => id !== targetUserId);
      targetUser.followers = targetUser.followers.filter((id) => id !== currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    users[currentIdx] = currentUser;
    users[targetIdx] = targetUser;

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const session = this.getCurrentUser();
    if (session && session.id === currentUserId) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    }

    window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: currentUser } }));
    window.dispatchEvent(new CustomEvent("user-profile-updated", { detail: { userId: targetUserId } }));

    return {
      isFollowing: !isAlreadyFollowing,
      targetFollowersCount: targetUser.followers.length
    };
  },

  updateProfile(userId: string, updates: Partial<UserProfile>): boolean {
    try {
      const users = this.getAllUsers();
      const idx = users.findIndex((u) => u.id === userId);
      if (idx === -1) return false;

      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const current = this.getCurrentUser();
      if (current && current.id === userId) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(users[idx]));
      }

      window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: users[idx] } }));
      return true;
    } catch {
      return false;
    }
  },

  promoteToAdmin(targetUsername: string): { success: boolean; message: string } {
    const clean = targetUsername.trim().toLowerCase();
    const user = this.getUserByUsername(clean);
    if (!user) {
      return { success: false, message: `"${targetUsername}" adlı kullanıcı bulunamadı!` };
    }
    if (user.role === "admin") {
      return { success: false, message: `"${user.displayName}" zaten bir Admin!` };
    }

    const updated = this.updateProfile(user.id, { role: "admin" });
    if (updated) {
      return { success: true, message: `"${user.displayName}" (@${user.username}) başarıyla Admin yapıldı!` };
    }
    return { success: false, message: "Yetkilendirme sırasında hata oluştu." };
  },

  demoteAdmin(targetUsername: string): { success: boolean; message: string } {
    const clean = targetUsername.trim().toLowerCase();
    if (clean === "enes") {
      return { success: false, message: "Ana Süperadmin (enes) yetkisi kaldırılamaz!" };
    }
    const user = this.getUserByUsername(clean);
    if (!user) return { success: false, message: "Kullanıcı bulunamadı." };

    const updated = this.updateProfile(user.id, { role: "user" });
    return {
      success: updated,
      message: updated ? `"${user.displayName}" yöneticilik yetkisi alındı.` : "İşlem başarısız."
    };
  },

  searchUsers(query: string): UserProfile[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAllUsers();
    return this.getAllUsers().filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q) ||
        u.bio.toLowerCase().includes(q)
    );
  }
};
