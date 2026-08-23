with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    content = f.read()

patch_code = """  private blobCache: Map<string, string> = new Map();

  private async _getPlayableAudioUrl(trackId: string): Promise<string> {
    const rawPath = `/assets/audio/${trackId}.mp4`;
    if (this.blobCache.has(trackId)) {
      return this.blobCache.get(trackId)!;
    }
    try {
      const res = await fetch(rawPath, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.type.includes("video") || blob.type.includes("audio") || blob.size > 50000) {
          const blobUrl = URL.createObjectURL(blob);
          this.blobCache.set(trackId, blobUrl);
          return blobUrl;
        }
      }
    } catch {
      // fallback to raw path
    }
    return rawPath;
  }

  private _resolveAudioPath(trackId: string): string {
    return `/assets/audio/${trackId}.mp4`;
  }

  public async loadTrack(track: Track) {
    this.currentTrack = track;
    const trim = SyncedLyricsService.getTrim(track.id);
    const startPosition = trim ? trim.startSec : 0;
    this.durationSec = trim && trim.endSec > 0 ? trim.endSec : (track.durationSec || 180);
    this.currentTimeSec = startPosition;

    if (this.audioEl) {
      const src = await this._getPlayableAudioUrl(track.id);
      if (this.audioEl.src !== src && !this.audioEl.src.endsWith(src)) {
        this.audioEl.src = src;
        this.audioEl.load();
      }
      this.audioEl.currentTime = startPosition;
    }
  }"""

content = content.replace("""  private _resolveAudioPath(trackId: string): string {
    return `/assets/audio/${trackId}.mp4`;
  }

  public loadTrack(track: Track) {
    this.currentTrack = track;
    const trim = SyncedLyricsService.getTrim(track.id);
    const startPosition = trim ? trim.startSec : 0;
    this.durationSec = trim && trim.endSec > 0 ? trim.endSec : (track.durationSec || 180);
    this.currentTimeSec = startPosition;

    if (this.audioEl) {
      const src = this._resolveAudioPath(track.id);
      if (this.audioEl.src !== src && !this.audioEl.src.endsWith(src)) {
        this.audioEl.src = src;
        this.audioEl.load();
      }
      this.audioEl.currentTime = startPosition;
    }
  }""", patch_code)

start_music_patch = """  public async startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.init();
    this.currentTrack = targetTrack;

    const trim = SyncedLyricsService.getTrim(targetTrack.id);
    this.durationSec = trim && trim.endSec > 0 ? trim.endSec : (targetTrack.durationSec || 180);

    if (this.audioEl) {
      const src = await this._getPlayableAudioUrl(targetTrack.id);
      const isSameSrc = this.audioEl.src.endsWith(src) || this.audioEl.src === src;
      if (!isSameSrc) {
        this.audioEl.src = src;
        this.audioEl.load();
      }

      // Check start position with trim
      if (trim && (this.audioEl.currentTime < trim.startSec || this.audioEl.currentTime >= trim.endSec)) {
        this.audioEl.currentTime = trim.startSec;
      }

      this.audioEl.volume = this.isMuted ? 0 : this.volume;
      this.audioEl
        .play()
        .then(() => {
          this.isPlayingMusic = true;
        })
        .catch((err) => {
          console.warn("[AudioEngine] Play request requires user interaction or buffering:", err);
        });
    }
  }"""

content = content.replace("""  public startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.init();
    this.currentTrack = targetTrack;

    const trim = SyncedLyricsService.getTrim(targetTrack.id);
    this.durationSec = trim && trim.endSec > 0 ? trim.endSec : (targetTrack.durationSec || 180);

    if (this.audioEl) {
      const src = this._resolveAudioPath(targetTrack.id);
      const isSameSrc = this.audioEl.src.endsWith(src) || this.audioEl.src === src;
      if (!isSameSrc) {
        this.audioEl.src = src;
        this.audioEl.load();
      }

      // Check start position with trim
      if (trim && (this.audioEl.currentTime < trim.startSec || this.audioEl.currentTime >= trim.endSec)) {
        this.audioEl.currentTime = trim.startSec;
      }

      this.audioEl.volume = this.isMuted ? 0 : this.volume;
      this.audioEl
        .play()
        .then(() => {
          this.isPlayingMusic = true;
        })
        .catch((err) => {
          console.warn("[AudioEngine] Play request requires user interaction or buffering:", err);
        });
    }
  }""", start_music_patch)

with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("src/audio/engine.ts updated with ngrok-bypass blob streaming for 100% public audio sync!")
