const fs = require('fs');
const path = require('path');

// 1. AUTH SERVICE
const authServiceCode = `export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  role: "admin" | "user";
  favoriteTrackId?: string;
  createdAt: string;
  following: string[]; // user IDs
  followers: string[]; // user IDs
  friends: string[]; // user IDs
  likedTrackIds: string[];
  likedMixIds: string[];
}

const USERS_STORAGE_KEY = "eray_mansur_users_v2";
const SESSION_STORAGE_KEY = "eray_mansur_session_v2";
const PASSWORDS_KEY = "eray_mansur_passwords_v2";

const DEFAULT_USERS: UserProfile[] = [
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
    followers: ["user_eray067", "user_mansur", "user_fan1"],
    friends: ["user_eray067", "user_mansur"],
    likedTrackIds: ["bak_ne_dicem", "nafile", "brapap"],
    likedMixIds: ["mix_1"]
  },
  {
    id: "user_eray067",
    username: "eray067",
    email: "eray@alliancerecords.com",
    displayName: "ERAY067",
    avatar: "/assets/images/eray067_portrait.jpg",
    bio: "O Ses Rap Şampiyonu • ALLIANCE • Frankfurt am Main",
    role: "admin",
    favoriteTrackId: "g_wagon",
    createdAt: "2026-01-01T00:00:00.000Z",
    following: ["user_enes_admin", "user_mansur"],
    followers: ["user_enes_admin", "user_fan1"],
    friends: ["user_enes_admin", "user_mansur"],
    likedTrackIds: ["g_wagon", "tmax", "brapap"],
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
    followers: ["user_enes_admin", "user_eray067"],
    friends: ["user_enes_admin", "user_eray067"],
    likedTrackIds: ["nafile", "bilezik_pirlanta"],
    likedMixIds: []
  },
  {
    id: "user_fan1",
    username: "drill_turk",
    email: "drill@turk.com",
    displayName: "Can Drill",
    avatar: "/assets/images/alliance_cover.jpg",
    bio: "067 ve MANSUR ALLIANCE Fan Club Başkanı 🔥",
    role: "user",
    favoriteTrackId: "brapap",
    createdAt: "2026-02-10T12:00:00.000Z",
    following: ["user_enes_admin", "user_eray067"],
    followers: ["user_enes_admin"],
    friends: [],
    likedTrackIds: ["bak_ne_dicem", "brapap"],
    likedMixIds: ["mix_1"]
  }
];

const DEFAULT_PASSWORDS: Record<string, string> = {
  enes: "enes7645",
  eray067: "alliance2026",
  mansur: "alliance2026",
  drill_turk: "123456"
};

export const AuthService = {
  init(): void {
    try {
      if (!localStorage.getItem(USERS_STORAGE_KEY)) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      }
      if (!localStorage.getItem(PASSWORDS_KEY)) {
        localStorage.setItem(PASSWORDS_KEY, JSON.stringify(DEFAULT_PASSWORDS));
      }
    } catch {
      // ignore
    }
  },

  getAllUsers(): UserProfile[] {
    this.init();
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  },

  getUserById(id: string): UserProfile | null {
    const users = this.getAllUsers();
    return users.find((u) => u.id === id) || null;
  },

  getUserByUsername(username: string): UserProfile | null {
    const users = this.getAllUsers();
    return users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null;
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

  login(username: string, pass: string): { success: boolean; error?: string; user?: UserProfile } {
    this.init();
    const cleanUsername = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    try {
      const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
      const expectedPass = passwords[cleanUsername];

      if (!expectedPass || expectedPass !== cleanPass) {
        return { success: false, error: "Kullanıcı adı veya şifre hatalı!" };
      }

      const user = this.getUserByUsername(cleanUsername);
      if (!user) {
        return { success: false, error: "Kullanıcı profili bulunamadı." };
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
    displayName: string;
    avatar?: string;
    bio?: string;
    favoriteTrackId?: string;
  }): { success: boolean; error?: string; user?: UserProfile } {
    this.init();
    const cleanUsername = data.username.trim().toLowerCase();

    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: "Kullanıcı adı en az 3 karakter olmalıdır." };
    }
    if (!data.password || data.password.length < 4) {
      return { success: false, error: "Şifre en az 4 karakter olmalıdır." };
    }

    if (this.getUserByUsername(cleanUsername)) {
      return { success: false, error: "Bu kullanıcı adı zaten kullanılıyor!" };
    }

    const newUser: UserProfile = {
      id: \`user_\${Date.now()}_\${Math.random().toString(36).substring(2, 7)}\`,
      username: cleanUsername,
      email: data.email.trim(),
      displayName: data.displayName.trim() || cleanUsername,
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

  logout(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: null } }));
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
      return { success: false, message: \`"\${targetUsername}" adlı kullanıcı bulunamadı!\` };
    }
    if (user.role === "admin") {
      return { success: false, message: \`"\${user.displayName}" zaten bir Admin!\` };
    }

    const updated = this.updateProfile(user.id, { role: "admin" });
    if (updated) {
      return { success: true, message: \`"\${user.displayName}" (@\${user.username}) başarıyla Admin yapıldı!\` };
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
      message: updated ? \`"\${user.displayName}" yöneticilik yetkisi alındı.\` : "İşlem başarısız."
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
`;

fs.writeFileSync(path.resolve(__dirname, '../src/services/authService.ts'), authServiceCode, 'utf8');
console.log('authService.ts written successfully!');
