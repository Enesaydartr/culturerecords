import json

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Format for localStorage seeding
seed_entries = {}
for track_id, item in data.items():
    if "lyrics" in item and item["lyrics"]:
        seed_entries[f"eray_mansur_synced_lyrics_{track_id}"] = item["lyrics"]
    if "trim" in item and item["trim"] is not None:
        seed_entries[f"eray_mansur_trim_{track_id}"] = item["trim"]

ts_content = """// Auto-generated localStorage Seed Data for All 33 Songs
export const LOCALSTORAGE_SEED_DATA: Record<string, any> = """ + json.dumps(seed_entries, indent=2, ensure_ascii=False) + """;

export function initializeLocalStorageSeed(): void {
  if (typeof window === "undefined") return;
  try {
    const SEED_VERSION = "eray_mansur_seed_v20260823";
    const alreadySeeded = localStorage.getItem(SEED_VERSION);
    
    // Always ensure all 33 songs have their lyrics in localStorage if missing
    Object.entries(LOCALSTORAGE_SEED_DATA).forEach(([key, value]) => {
      if (!alreadySeeded || !localStorage.getItem(key)) {
        localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
      }
    });

    localStorage.setItem(SEED_VERSION, "true");
    console.log("[Alliance] LocalStorage seed completed for all 33 tracks!");
  } catch (e) {
    console.warn("[Alliance] LocalStorage seed skipped:", e);
  }
}
"""

with open("src/data/seedData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Generated src/data/seedData.ts with all 33 songs seed entries!")
