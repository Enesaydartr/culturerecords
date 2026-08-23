with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_text = """                <p className="text-xs text-neutral-400 font-mono mt-1">
                  12 Parça • Orijinal Frankfurt & İstanbul Prodüksiyonları
                </p>"""

replacement_text = """                <p className="text-xs text-neutral-400 font-mono mt-1">
                  8 Parça
                </p>"""

if target_text in content:
    content = content.replace(target_text, replacement_text)
    print("Replaced with: 8 Parça")
else:
    print("Target text not found exactly, check formatting")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
