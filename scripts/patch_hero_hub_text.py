with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_p = """            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-xl leading-relaxed">
              Ham sokak enerjisi, sert 808 ritimleri ve tavizsiz bir vizyon. İki ayrı gücün tek bir ortak manifestoda buluştuğu resmi ses ve topluluk platformu.
            </p>"""

replacement_p = """            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-xl leading-relaxed">
              ERAY067 ve MANSUR dinleyicilerinin tek bir çatı altında buluştuğu ortak platform. En yeni parçalar, canlı senkron dinleme odaları, özel miksler ve sokak kültürünün resmi adresi.
            </p>"""

if target_p in content:
    content = content.replace(target_p, replacement_p)
    print("Hero text updated to listener hub text")
else:
    print("target_p not found")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
