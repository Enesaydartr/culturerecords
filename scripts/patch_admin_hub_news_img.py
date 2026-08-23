with open("src/components/AdminHub.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add ref for news image upload
if "const newsImageFileInputRef = useRef<HTMLInputElement>(null);" not in content:
    content = content.replace("const fileInputRef = useRef<HTMLInputElement>(null);", """const fileInputRef = useRef<HTMLInputElement>(null);
  const newsImageFileInputRef = useRef<HTMLInputElement>(null);

  const handleNewsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewsCover(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };""")

# Add file upload button to news cover field
target_news_cover = """                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      Kapak Resmi URL:
                    </label>
                    <input
                      type="text"
                      value={newsCover}
                      onChange={(e) => setNewsCover(e.target.value)}
                      className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                    />
                  </div>"""

replacement_news_cover = """                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                      Kapak Resmi (Galeriden / Dosyadan Seç veya URL):
                    </label>
                    <input
                      type="file"
                      ref={newsImageFileInputRef}
                      accept="image/*"
                      onChange={handleNewsImageUpload}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newsCover}
                        onChange={(e) => setNewsCover(e.target.value)}
                        className="flex-1 bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                      />
                      <Button
                        type="button"
                        onClick={() => newsImageFileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="border-dashed border-red-500/40 text-red-400 hover:text-white text-[10px] uppercase font-bold px-2.5"
                      >
                        <Upload className="h-3 w-3 mr-1" /> Dosya Seç
                      </Button>
                    </div>
                  </div>"""

if target_news_cover in content:
    content = content.replace(target_news_cover, replacement_news_cover)
    print("News image upload added to AdminHub")

with open("src/components/AdminHub.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("AdminHub updated")
