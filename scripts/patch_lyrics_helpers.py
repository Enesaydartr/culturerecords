with open("src/services/syncedLyricsService.ts", "r", encoding="utf-8") as f:
    content = f.read()

helpers = """  // Restore backup data
  restoreAllBackupData(data: Record<string, any>): boolean {
    return this.importBackupData(data) > 0;
  },

  // Export to standard LRC format
  exportLrc(lines: SyncedLine[]): string {
    return lines
      .map((line) => {
        const m = Math.floor(line.time / 60);
        const s = Math.floor(line.time % 60);
        const ms = Math.floor((line.time % 1) * 100);
        const timeTag = `[${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}]`;
        return `${timeTag} ${line.text}`;
      })
      .join("\\n");
  },

  // Parse standard LRC format
  parseLrc(lrcText: string): SyncedLine[] {
    const lines = lrcText.split("\\n");
    const result: SyncedLine[] = [];
    const lrcRegex = /\\[(\\d{2}):(\\d{2})(?:\\.(\\d{2,3}))?\\](.*)/;

    for (const raw of lines) {
      const match = raw.match(lrcRegex);
      if (match) {
        const min = parseInt(match[1], 10);
        const sec = parseInt(match[2], 10);
        const frac = match[3] ? parseFloat("0." + match[3]) : 0;
        const time = min * 60 + sec + frac;
        const text = match[4].trim();
        result.push({ time, text });
      }
    }
    return result.sort((a, b) => a.time - b.time);
  },
"""

content = content.replace("  // Export all current lyrics & trims into a backup JSON object", helpers + "\n  // Export all current lyrics & trims into a backup JSON object")

with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Added helper methods restoreAllBackupData, exportLrc, parseLrc!")
