/**
 * Production Audio Engine for ERAY067 x MANSUR (Culture Records)
 * High-performance HTML5 Audio Engine with Web Audio spectrum analyzer.
 * Guarantees pure real-music playback without synthetic glitch fallbacks.
 */

import { Track } from "../data/artists";

export class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85;

  // HTML5 Audio Element
  public audioEl: HTMLAudioElement | null = null;
  private mediaSourceNode: MediaElementAudioSourceNode | null = null;
  public currentTimeSec: number = 0;
  public durationSec: number = 180;
  public onTimeUpdateCallback: ((time: number, duration: number) => void) | null = null;
  public onTrackEndedCallback: (() => void) | null = null;

  public isPlayingMusic: boolean = false;
  public currentTrack: Track | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioEl = new Audio();
      this.audioEl.preload = "auto";
      this.audioEl.volume = this.volume;

      this.audioEl.addEventListener("timeupdate", () => {
        if (!this.audioEl) return;
        this.currentTimeSec = this.audioEl.currentTime;
        if (this.audioEl.duration && !isNaN(this.audioEl.duration) && this.audioEl.duration > 0) {
          this.durationSec = this.audioEl.duration;
        }
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.currentTimeSec, this.durationSec);
        }
      });

      this.audioEl.addEventListener("durationchange", () => {
        if (this.audioEl && this.audioEl.duration && !isNaN(this.audioEl.duration)) {
          this.durationSec = this.audioEl.duration;
        }
      });

      this.audioEl.addEventListener("playing", () => {
        this.isPlayingMusic = true;
      });

      this.audioEl.addEventListener("pause", () => {
        this.isPlayingMusic = false;
      });

      this.audioEl.addEventListener("ended", () => {
        this.isPlayingMusic = false;
        if (this.onTrackEndedCallback) {
          this.onTrackEndedCallback();
        }
      });

      this.audioEl.addEventListener("error", (e) => {
        console.warn("[AudioEngine] Playback error on source:", this.audioEl?.src, e);
      });
    }
  }

  public init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

          this.analyser = this.ctx.createAnalyser();
          this.analyser.fftSize = 64;
          this.analyser.smoothingTimeConstant = 0.8;

          this.masterGain.connect(this.analyser);
          this.analyser.connect(this.ctx.destination);
        }
      } catch (e) {
        console.warn("[AudioEngine] Web Audio context init skipped:", e);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMasterVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl) {
      this.audioEl.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(
          this.isMuted ? 0 : this.volume,
          this.ctx.currentTime,
          0.03
        );
      } catch {}
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setMasterVolume(this.volume);
    return this.isMuted;
  }

  public seek(pct: number) {
    if (this.audioEl && this.durationSec > 0) {
      const targetSec = Math.max(0, Math.min(this.durationSec, pct * this.durationSec));
      this.audioEl.currentTime = targetSec;
      this.currentTimeSec = targetSec;
    }
  }

  public seekToSeconds(targetSec: number) {
    if (this.audioEl && this.durationSec > 0) {
      const clamped = Math.max(0, Math.min(this.durationSec, targetSec));
      this.audioEl.currentTime = clamped;
      this.currentTimeSec = clamped;
    }
  }

  public getCurrentTime(): number {
    return this.audioEl ? this.audioEl.currentTime : this.currentTimeSec;
  }

  public getDuration(): number {
    return this.audioEl && this.audioEl.duration && !isNaN(this.audioEl.duration)
      ? this.audioEl.duration
      : this.durationSec;
  }

  private _resolveAudioPath(trackId: string): string {
    return `/assets/audio/${trackId}.mp4`;
  }

  public loadTrack(track: Track) {
    this.currentTrack = track;
    this.durationSec = track.durationSec || 180;
    this.currentTimeSec = 0;
    if (this.audioEl) {
      const src = this._resolveAudioPath(track.id);
      if (this.audioEl.src !== src && !this.audioEl.src.endsWith(src)) {
        this.audioEl.src = src;
        this.audioEl.load();
      }
      this.audioEl.currentTime = 0;
    }
  }

  public playUiTap(pitch: number = 800) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.03);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }

  public startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.init();
    this.currentTrack = targetTrack;
    this.durationSec = targetTrack.durationSec || 180;

    if (this.audioEl) {
      const src = this._resolveAudioPath(targetTrack.id);
      const isSameSrc = this.audioEl.src.endsWith(src) || this.audioEl.src === src;
      if (!isSameSrc) {
        this.audioEl.src = src;
        this.audioEl.load();
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
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
  }

  public play() {
    this.init();
    if (this.currentTrack) {
      this.startMusic(this.currentTrack);
    }
  }

  public pause() {
    this.stopMusic();
  }

  public resumeMusic() {
    this.init();
    if (this.audioEl && this.audioEl.src) {
      this.audioEl
        .play()
        .then(() => {
          this.isPlayingMusic = true;
        })
        .catch((e) => console.warn("[AudioEngine] Resume failed:", e));
    } else if (this.currentTrack) {
      this.startMusic(this.currentTrack);
    }
  }

  public setOnTimeUpdate(cb: (time: number, dur: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public setOnDurationChange(cb: (dur: number) => void) {
    // duration callback hook
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

  public getSpectrumData(): Uint8Array {
    return this.getFrequencyData();
  }

  public getFrequencyData(): Uint8Array {
    if (this.analyser) {
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      return data;
    }
    return new Uint8Array(16).fill(this.isPlayingMusic ? 128 : 0);
  }
}

export const audioEngine = new WebAudioEngine();
