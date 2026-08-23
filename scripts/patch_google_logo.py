with open("src/components/AuthModal.tsx", "r", encoding="utf-8") as f:
    content = f.read()

google_svg_code = """const GoogleLogo = () => (
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
"""

if "const GoogleLogo = () => (" not in content:
    content = content.replace("const AVATAR_PRESETS = [", google_svg_code + "\nconst AVATAR_PRESETS = [")

# Replace Globe icon with GoogleLogo in the button
target_button = """            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleSimulatedClick}
              className="w-full p-3 bg-white/5 border border-white/20 hover:border-white text-white text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
            >
              <Globe className="h-4 w-4 text-red-500" />
              <span>GOOGLE İLE GİRİŞ YAP</span>
            </button>"""

replacement_button = """            {/* Google Login Button with Official Google G Logo */}
            <button
              type="button"
              onClick={handleGoogleSimulatedClick}
              className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white text-xs font-bold uppercase transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99]"
            >
              <GoogleLogo />
              <span>GOOGLE İLE GİRİŞ YAP</span>
            </button>"""

if target_button in content:
    content = content.replace(target_button, replacement_button)

with open("src/components/AuthModal.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("AuthModal updated with official Google 4-color SVG logo")
