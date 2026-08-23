with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Add helper methods if not present
methods_to_add = """
  public setOnTimeUpdate(cb: (time: number, dur: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public setOnDurationChange(cb: (dur: number) => void) {
    // duration callback
  }

  public setOnTrackEnded(cb: () => void) {
    this.onTrackEndedCallback = cb;
  }

  public setVolume(val: number) {
    this.setMasterVolume(val);
  }

  public resume() {
    this.resumeMusic();
  }
"""

if "public setOnTimeUpdate" not in content:
    # Insert right before private _startSynthFallback
    content = content.replace("private _startSynthFallback(track: Track)", methods_to_add + "\n  private _startSynthFallback(track: Track)")
    with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
        f.write(content)
    print("engine.ts updated with helper methods")
else:
    print("engine.ts already has helper methods")
