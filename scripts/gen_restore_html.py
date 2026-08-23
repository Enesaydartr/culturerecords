import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

restore = {}
for track_id, item in data.items():
    if "lyrics" in item and item["lyrics"]:
        restore[f"eray_mansur_synced_lyrics_{track_id}"] = item["lyrics"]
    if "trim" in item and item["trim"]:
        restore[f"eray_mansur_trim_{track_id}"] = item["trim"]

html = f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Senkron Yükle</title></head>
<body style="background:#000;color:#0f0;font-family:monospace;padding:40px;">
<h1>Senkron Geri Yükleme</h1>
<pre id="log"></pre>
<script>
const d = {json.dumps(restore, ensure_ascii=False)};
const log = document.getElementById("log");
let count = 0;
Object.entries(d).forEach(([k, v]) => {{
  localStorage.setItem(k, JSON.stringify(v));
  count++;
  log.textContent += "✅ " + k + "\\n";
}});
log.textContent += "\\n🎉 TOPLAM " + count + " kayıt geri yüklendi!";
log.textContent += "\\nAna sayfaya yönlendiriliyorsunuz...";
setTimeout(() => window.location.href = "/#discography", 2000);
</script>
</body></html>
"""

with open("public/restore.html", "w", encoding="utf-8") as f:
    f.write(html)

print(f"public/restore.html created - {len(restore)} entries")
