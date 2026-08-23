with open("src/components/AuthModal.tsx", "a", encoding="utf-8") as f:
    f.write('''
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

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleSimulatedClick}
              className="w-full p-3 bg-white/5 border border-white/20 hover:border-white text-white text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
            >
              <Chrome className="h-4 w-4 text-red-500" />
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
''')
print("AuthModal complete!")
