with open("src/components/ui/character-3d-scroll-showcase.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_slide = """  {
    title: "CLTR SOUND",
    subtitle: "Waxy & Culture Records Prodüksiyonu",
    tag: "MÜZİKAL MİMARİ",
    body: "Sert 808 basları, karanlık melodileri ve Waxy'nin üst düzey mix & mastering mühendisliğiyle ALLIANCE, Türk drill ve sokak rap sahnesine yeni bir standart getirdi.",
    accent: "text-neutral-100"
  }"""

# Remove with preceding comma
if ",\n" + target_slide in content:
    content = content.replace(",\n" + target_slide, "")
    print("Removed CLTR SOUND slide with comma")
elif target_slide in content:
    content = content.replace(target_slide, "")
    print("Removed CLTR SOUND slide")

with open("src/components/ui/character-3d-scroll-showcase.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("File updated successfully!")
