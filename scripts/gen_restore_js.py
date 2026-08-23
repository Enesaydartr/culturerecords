import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Build localStorage restore entries
restore = {}
for track_id, item in data.items():
    if "lyrics" in item and item["lyrics"]:
        restore[f"eray_mansur_synced_lyrics_{track_id}"] = item["lyrics"]
    if "trim" in item and item["trim"]:
        restore[f"eray_mansur_trim_{track_id}"] = item["trim"]

js_code = "// Senkron Geri Yükleme - Tarayıcı Konsoluna Yapıştırın\n"
js_code += "(() => {\n"
js_code += f"  const d = {json.dumps(restore, ensure_ascii=False)};\n"
js_code += """  Object.entries(d).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
  window.dispatchEvent(new CustomEvent("synced-lyrics-updated"));
  console.log("✅ " + Object.keys(d).length + " senkron kaydı geri yüklendi!");
  alert("✅ Tüm senkronlar geri yüklendi! Sayfa yenilenecek.");
  location.reload();
})();"""

with open("scripts/restore_console.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"Generated restore script with {len(restore)} entries")
print(f"File size: {len(js_code)} bytes")
