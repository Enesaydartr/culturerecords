with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace 067 red box with brand_logo.png
target_logo = """            <div className="flex h-7 w-7 items-center justify-center bg-red-600 text-white font-black text-xs tracking-tighter shadow-md">
              067
            </div>"""

replacement_logo = """            <img
              src="/assets/images/brand_logo.png"
              alt="ERAY067 x MANSUR Logo"
              className="h-8 w-auto object-contain shrink-0 drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
              }}
            />"""

if target_logo in content:
    content = content.replace(target_logo, replacement_logo)
    print("Logo replaced with brand_logo.png")
else:
    print("target_logo not found")

# 2. Replace the hero paragraph
target_hero_text = """            <p className="text-lg md:text-xl text-neutral-400 font-light max-w-xl leading-relaxed">
              Almanya sokaklarından Türkiye'ye uzanan yeni nesil drill & rap hareketi. Frankfurt ve Ankara hattında sert 808 baslar, benzersiz flowlar ve milyonlarca dinlenen ortak başyapıtlar.
            </p>"""

replacement_hero_text = """            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-xl leading-relaxed">
              Ham sokak enerjisi, sert 808 ritimleri ve tavizsiz bir vizyon. İki ayrı gücün tek bir ortak manifestoda buluştuğu resmi ses ve topluluk platformu.
            </p>"""

if target_hero_text in content:
    content = content.replace(target_hero_text, replacement_hero_text)
    print("Hero text updated to punchy complementary manifesto")
else:
    print("target_hero_text not found")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx updated!")
