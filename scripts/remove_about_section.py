with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove Biyografi link from nav
content = content.replace("""            <a href="#about" className="transition-colors hover:text-white">BİYOGRAFİ</a>
            <a href="#alliance" className="transition-colors hover:text-white">ALLIANCE</a>""", """            <a href="#alliance" className="transition-colors hover:text-white">ALLIANCE</a>""")

# 2. Remove the entire <section id="about" ...> block
about_section_to_remove = """      {/* 3. ABOUT / BIOGRAPHY SECTION */}
      <section id="about" className="py-20 border-b border-white/[0.08]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* ERAY067 Bio */}
            <div className="border border-white/10 bg-black/40 p-8 space-y-6">
              <div className="flex items-center gap-4">
                <img src="/assets/images/eray067_portrait.jpg" alt="ERAY067" className="h-20 w-20 object-cover border border-white/20" />
                <div>
                  <span className="text-xs text-red-500 font-bold uppercase tracking-widest block">SANATÇI PROFİLİ</span>
                  <h3 className="text-2xl font-black text-white">ERAY067</h3>
                  <p className="text-xs text-neutral-400">Frankfurt am Main, Almanya • Rapper / Söz Yazarı</p>
                </div>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                O Ses Rap şampiyonu olan ERAY067, Almanya drill kültürünü Türk rap sahnesine en otantik ve sert biçimde taşıyan öncü isimlerden biridir. G-WAGON, TMAX ve BRAPAP gibi hitleriyle milyonlarca dinlenmeye ulaşmıştır.
              </p>
            </div>

            {/* MANSUR Bio */}
            <div className="border border-white/10 bg-black/40 p-8 space-y-6">
              <div className="flex items-center gap-4">
                <img src="/assets/images/mansur_portrait.jpg" alt="MANSUR" className="h-20 w-20 object-cover border border-white/20" />
                <div>
                  <span className="text-xs text-red-500 font-bold uppercase tracking-widest block">PRODÜKTÖR & SANATÇI</span>
                  <h3 className="text-2xl font-black text-white">MANSUR</h3>
                  <p className="text-xs text-neutral-400">Ankara / Malatya • Prodüktör / Rapper</p>
                </div>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                Alliance projesinin beyni ve prodüktörü olan Mansur, melodik 808 basları ve akılda kalıcı nakaratlarıyla hit fabrikası haline gelmiştir. NAFİLE ve BİLEZİK PIRLANTA gibi parçaların arkasındaki imza prodüktördür.
              </p>
            </div>

          </div>
        </div>
      </section>"""

if about_section_to_remove in content:
    content = content.replace(about_section_to_remove, "")
    print("About section removed successfully")
else:
    print("Exact text match not found, inspecting...")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
