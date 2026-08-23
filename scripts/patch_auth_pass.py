with open("src/services/authService.ts", "r", encoding="utf-8") as f:
    auth_content = f.read()

# Add changePassword if not present
if "changePassword(" not in auth_content:
    change_pass_code = """  changePassword(userId: string, newPassword: string): { success: boolean; message: string } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, message: "Kullanıcı bulunamadı." };
    if (!newPassword || newPassword.length < 4) {
      return { success: false, message: "Şifre en az 4 karakter olmalıdır." };
    }

    try {
      const passwords: Record<string, string> = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
      passwords[user.username.toLowerCase()] = newPassword.trim();
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
      return { success: true, message: "Şifreniz başarıyla değiştirildi!" };
    } catch {
      return { success: false, message: "Şifre güncellenemedi." };
    }
  },
"""
    auth_content = auth_content.replace("  searchUsers(query: string): UserProfile[] {", change_pass_code + "\n  searchUsers(query: string): UserProfile[] {")
    with open("src/services/authService.ts", "w", encoding="utf-8") as f:
        f.write(auth_content)
    print("changePassword added to authService.ts")
else:
    print("changePassword already exists")
