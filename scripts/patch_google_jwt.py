with open("src/services/authService.ts", "r", encoding="utf-8") as f:
    content = f.read()

target_str = "  // GOOGLE LOGIN INTEGRATION (Requests unique username if first time)"

jwt_helper = """  // GOOGLE OAUTH INFRASTRUCTURE & JWT TOKEN DECODER
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
"""

if "decodeGoogleJwt(" not in content:
    content = content.replace(target_str, jwt_helper + "\n" + target_str)

with open("src/services/authService.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("authService.ts updated with Google OAuth JWT decoder & infrastructure!")
