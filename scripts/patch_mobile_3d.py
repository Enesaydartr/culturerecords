with open("src/components/ui/character-3d-scroll-showcase.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the JSX render structure for complete mobile responsiveness
old_jsx = """    <section ref={containerRef} className="relative min-h-[1200vh] w-full bg-[#080808] border-t border-b border-white/[0.08]">
      
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 z-20 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Architectural Lighting */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`h-[500px] w-[500px] rounded-full blur-[140px] transition-all duration-700 ${
            activeChar === "alliance" ? "bg-red-950/40" : "bg-neutral-900/60"
          }`} />
        </div>

        <div className="container max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
          
          {/* LEFT: 3D MODEL / GRAMOPHONE (Transparent, Raw, Borderless) */}
          <div className="relative flex flex-col items-center justify-center select-none">
            
            {/* Top Minimal Tracker */}
            <div className="mb-2 flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                activeChar === "alliance" ? "bg-amber-400" : "bg-red-600"
              }`} />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                {activeChar === "eray" && "ERAY067 // FRANKFURT"}
                {activeChar === "mansur" && "MANSUR // ANKARA"}
                {activeChar === "alliance" && "ALLIANCE // ALBUM EXPERIENCE"}
              </span>
            </div>

            {/* Canvas */}
            <div className="relative flex h-[380px] w-[260px] sm:h-[460px] sm:w-[320px] md:h-[540px] md:w-[380px] items-center justify-center">
              <div className="absolute bottom-4 h-10 w-52 rounded-full bg-black/95 blur-2xl pointer-events-none" />

              <canvas
                ref={canvasRef}
                className="relative z-10 h-full w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.98)]"
              />
            </div>

            {/* Stage indicator pills */}
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] font-bold">
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === "eray" ? "border-red-500 bg-red-950/60 text-white" : "border-white/10 text-neutral-600"
              }`}>
                01. ERAY067
              </span>
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === "mansur" ? "border-red-500 bg-red-950/60 text-white" : "border-white/10 text-neutral-600"
              }`}>
                02. MANSUR
              </span>
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === "alliance" ? "border-amber-500 bg-amber-950/60 text-amber-300" : "border-white/10 text-neutral-600"
              }`}>
                03. ALLIANCE
              </span>
            </div>

          </div>

          {/* RIGHT: BOLD EDITORIAL TYPOGRAPHY (Single Statement Reveal) */}
          <div className="relative flex flex-col justify-center items-start select-none min-h-[300px] max-w-full overflow-hidden">
            
            <div
              key={`${activeChar}_${activeSlideIndex}`}
              className="space-y-3.5 transition-all duration-150 ease-out max-w-full"
              style={{
                opacity: Math.max(0.02, slideOpacity),
                transform: `translateY(${translateY}px)`
              }}
            >
              {/* Category Tag */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-neutral-500">
                  {activeSlide.tag}
                </span>
              </div>

              {/* Bold Title */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight break-words max-w-full">
                {activeSlide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm font-mono font-medium text-neutral-400 tracking-wide">
                {activeSlide.subtitle}
              </p>

              {/* Body */}
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light pt-1 max-w-xl break-words">
                {activeSlide.body}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>"""

new_jsx = """    <section ref={containerRef} className="relative min-h-[1200vh] w-full bg-[#080808] border-t border-b border-white/[0.08]">
      
      {/* Sticky Fullscreen Stage (Optimized for Mobile Height & Bottom Player Dock Clearance) */}
      <div className="sticky top-0 z-20 flex h-[100dvh] w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-0 pt-2 sm:pt-4">
        
        {/* Subtle Architectural Lighting */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] rounded-full blur-[100px] sm:blur-[140px] transition-all duration-700 ${
            activeChar === "alliance" ? "bg-red-950/40" : "bg-neutral-900/60"
          }`} />
        </div>

        <div className="container max-w-7xl mx-auto relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-3 sm:gap-6 lg:gap-16 items-center justify-center max-h-full">
          
          {/* TOP (MOBILE) / LEFT (DESKTOP): 3D MODEL / GRAMOPHONE */}
          <div className="relative flex flex-col items-center justify-center select-none shrink-0">
            
            {/* Top Minimal Tracker */}
            <div className="mb-1 sm:mb-2 flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                activeChar === "alliance" ? "bg-amber-400" : "bg-red-600"
              }`} />
              <span className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                {activeChar === "eray" && "ERAY067 // FRANKFURT"}
                {activeChar === "mansur" && "MANSUR // ANKARA"}
                {activeChar === "alliance" && "ALLIANCE // ALBUM EXPERIENCE"}
              </span>
            </div>

            {/* Canvas - Responsive scaled for mobile screens */}
            <div className="relative flex h-[180px] w-[130px] sm:h-[260px] sm:w-[190px] md:h-[380px] md:w-[270px] lg:h-[520px] lg:w-[370px] items-center justify-center">
              <div className="absolute bottom-2 h-6 w-36 sm:h-10 sm:w-52 rounded-full bg-black/95 blur-xl pointer-events-none" />

              <canvas
                ref={canvasRef}
                className="relative z-10 h-full w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.98)]"
              />
            </div>

            {/* Stage indicator pills */}
            <div className="mt-1.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] font-bold">
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === "eray" ? "border-red-500 bg-red-950/60 text-white" : "border-white/10 text-neutral-600"
              }`}>
                01. ERAY067
              </span>
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === "mansur" ? "border-red-500 bg-red-950/60 text-white" : "border-white/10 text-neutral-600"
              }`}>
                02. MANSUR
              </span>
              <span className={`px-2 py-0.5 border transition-all ${
                activeChar === "alliance" ? "border-amber-500 bg-amber-950/60 text-amber-300" : "border-white/10 text-neutral-600"
              }`}>
                03. ALLIANCE
              </span>
            </div>

          </div>

          {/* BOTTOM (MOBILE) / RIGHT (DESKTOP): BOLD EDITORIAL TYPOGRAPHY */}
          <div className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left select-none max-w-xl px-2 overflow-hidden">
            
            <div
              key={`${activeChar}_${activeSlideIndex}`}
              className="space-y-1.5 sm:space-y-3 transition-all duration-150 ease-out max-w-full"
              style={{
                opacity: Math.max(0.02, slideOpacity),
                transform: `translateY(${translateY}px)`
              }}
            >
              {/* Category Tag */}
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="font-mono text-[9px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-neutral-500">
                  {activeSlide.tag}
                </span>
              </div>

              {/* Bold Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight break-words max-w-full">
                {activeSlide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-sm font-mono font-medium text-neutral-400 tracking-wide">
                {activeSlide.subtitle}
              </p>

              {/* Body */}
              <p className="text-xs sm:text-base lg:text-lg text-neutral-300 leading-relaxed font-light pt-0.5 sm:pt-1 break-words">
                {activeSlide.body}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>"""

if old_jsx in content:
    content = content.replace(old_jsx, new_jsx)
    print("Replaced 3D showcase JSX with mobile optimized layout")
else:
    print("old_jsx not found, searching...")

with open("src/components/ui/character-3d-scroll-showcase.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("character-3d-scroll-showcase.tsx patched!")
