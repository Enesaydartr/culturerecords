with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_section_title = """          <div>
            <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">OFFICIAL DISCOGRAPHY SHOWCASE</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">ALLIANCE ALBÜM DENEYİMİ</h2>
          </div>"""

replacement_section_title = """          <div>
            <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">BİYOGRAFİ & ALBÜM HİKAYESİ</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">SANATÇILAR HAKKINDA BİLGİLER</h2>
          </div>"""

if target_section_title in content:
    content = content.replace(target_section_title, replacement_section_title)
    print("Section header updated to SANATÇILAR HAKKINDA BİLGİLER")
else:
    print("Target section title not found, checking...")

# Also update the nav link in Header if desired
content = content.replace('<a href="#alliance" className="transition-colors hover:text-white">ALLIANCE</a>', '<a href="#alliance" className="transition-colors hover:text-white">SANATÇILAR HAKKINDA</a>')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("App.tsx updated!")
