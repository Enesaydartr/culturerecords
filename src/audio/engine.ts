/**
 * Hybrid Audio Engine for ERAY067 × MANSUR
 * Seamlessly plays real audio files (MP4/M4A/MP3/WebM) with real-time waveform spectrum analysis,
 * with Web Audio API beat synthesizer fallback.
 */

import { Track } from "../data/artists";
import { SyncedLyricsService } from "../services/syncedLyricsService";

export class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85;

  // HTML5 Audio Element for Real Music Playback
  private audioEl: HTMLAudioElement | null = null;
  private mediaSourceNode: MediaElementAudioSourceNode | null = null;
  public currentTimeSec: number = 0;
  public durationSec: number = 180;
  public onTimeUpdateCallback: ((time: number, duration: number) => void) | null = null;
  public onTrackEndedCallback: (() => void) | null = null;

  // Sequencer fallback state
  public isPlayingMusic: boolean = false;
  public currentTrack: Track | null = null;
  private stepIndex: number = 0;
  private tempoBpm: number = 140;
  private nextNoteTime: number = 0;
  private timerId: number | null = null;
  private rootFreq: number = 43.65;
  private frequencyData: Uint8Array = new Uint8Array(32);

  constructor() {
    if (typeof window !== "undefined") {
      this.audioEl = new Audio();
      this.audioEl.crossOrigin = "anonymous";
      this.audioEl.volume = this.volume;

      this.audioEl.addEventListener("timeupdate", () => {
        if (!this.audioEl) return;
        this.currentTimeSec = this.audioEl.currentTime;
        this.durationSec = this.audioEl.duration || this.durationSec;
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.currentTimeSec, this.durationSec);
        }
      });

      this.audioEl.addEventListener("ended", () => {
        this.isPlayingMusic = false;
        if (this.onTrackEndedCallback) {
          this.onTrackEndedCallback();
        }
      });
    }
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Connect HTML5 audio element to analyser node for real audio spectrum visualization
      if (this.audioEl && !this.mediaSourceNode) {
        try {
          this.mediaSourceNode = this.ctx.createMediaElementSource(this.audioEl);
          this.mediaSourceNode.connect(this.masterGain);
        } catch (e) {
          // In case of CORS or already connected
        }
      }
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMasterVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl) {
      this.audioEl.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume,
        this.ctx.currentTime,
        0.03
      );
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
      this.audioEl.currentTime = Math.max(0, Math.min(this.durationSec, targetSec));
      this.currentTimeSec = this.audioEl.currentTime;
    }
  }

  public getCurrentTime(): number {
    return this.audioEl ? this.audioEl.currentTime : this.currentTimeSec;
  }

  public getDuration(): number {
    return this.audioEl && this.audioEl.duration ? this.audioEl.duration : this.durationSec;
  }

  public loadTrack(track: Track) {
    this.currentTrack = track;
    this.durationSec = track.durationSec || 180;
    this.currentTimeSec = 0;
    const audioCandidates = [
      `/assets/audio/${track.id}.mp4`,
      `/assets/audio/${track.id}.m4a`,
      `/assets/audio/${track.id}.mp3`,
      `/assets/audio/${track.id}.webm`
    ];
    if (this.audioEl) {
      this.audioEl.src = audioCandidates[0];
      this.audioEl.currentTime = 0;
    }
  }

  public playUiTap(pitch: number = 800) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.03);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  public startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.init();
    this.stopMusic();
    this.currentTrack = targetTrack;
    this.isPlayingMusic = true;
    this.durationSec = targetTrack.durationSec || 180;
    this.currentTimeSec = 0;

    // Check possible audio file sources
    const audioCandidates = [
      `/assets/audio/${targetTrack.id}.mp4`,
      `/assets/audio/${targetTrack.id}.m4a`,
      `/assets/audio/${targetTrack.id}.mp3`,
      `/assets/audio/${targetTrack.id}.webm`
    ];

    if (this.audioEl) {
      let candidateIndex = 0;

      const tryNextSource = () => {
        if (!this.audioEl) return;
        if (candidateIndex < audioCandidates.length) {
          const src = audioCandidates[candidateIndex++];
          this.audioEl.src = src;
          this.audioEl.play().catch(() => {
            tryNextSource();
          });
        } else {
          // Fallback to Web Audio synthesizer beat generator
          this._startSynthFallback(targetTrack);
        }
      };

      tryNextSource();
    } else {
      this._startSynthFallback(targetTrack);
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public play() {
    this.init();
    if (this.currentTrack) {
      if (this.audioEl && this.audioEl.src && this.audioEl.src !== window.location.href) {
        this.isPlayingMusic = true;
        this.audioEl.play().catch(() => {
          if (this.currentTrack) this._startSynthFallback(this.currentTrack);
        });
      } else {
        this.startMusic(this.currentTrack);
      }
    }
  }

  public pause() {
    this.stopMusic();
  }

  public resumeMusic() {
    this.isPlayingMusic = true;
    if (this.audioEl && this.audioEl.src) {
      this.audioEl.play().catch(() => {
        if (this.currentTrack) this._startSynthFallback(this.currentTrack);
      });
    } else if (this.currentTrack) {
      this._startSynthFallback(this.currentTrack);
    }
  }

  
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

  private _startSynthFallback(track: Track) {
    this.tempoBpm = track.bpm || 140;
    this.stepIndex = 0;
    if (this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.05;
    }
    this.rootFreq = this._keyToFreq(track.key);
    this._scheduler();
  }

  private _scheduler() {
    if (!this.isPlayingMusic || !this.ctx) return;

    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      this._scheduleStep(this.stepIndex, this.nextNoteTime);
      this._advanceStep();
    }

    this.timerId = window.setTimeout(() => this._scheduler(), 25.0);
  }

  private _advanceStep() {
    const secondsPerBeat = 60.0 / this.tempoBpm;
    const secondsPer16th = secondsPerBeat / 4.0;
    this.nextNoteTime += secondsPer16th;
    this.stepIndex = (this.stepIndex + 1) % 32;
  }

  private _scheduleStep(step: number, time: number) {
    const baseF = this.rootFreq || 43.65;
    if (step === 0 || step === 8 || step === 11 || step === 16 || step === 24 || step === 27) {
      this.playKick(time);
    }
    if (step === 6 || step === 22) {
      this.playSnare(time);
    }
    if (step === 0) {
      this.play808(baseF, time, 0.9);
    } else if (step === 16) {
      this.play808(baseF * 1.25, time, 0.8, baseF * 1.5);
    }
    if (step % 2 === 0) {
      this.playHiHat(time, 0.45);
    }
  }

  public play808(freq: number = 43.65, time: number | null = null, duration: number = 0.8, slideTo: number | null = null) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * 1.5, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.04);

    if (slideTo) {
      osc.frequency.setValueAtTime(freq, t + 0.2);
      osc.frequency.exponentialRampToValueAtTime(slideTo, t + 0.35);
    }

    gain.gain.setValueAtTime(0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  public playKick(time: number | null = null) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(36, t + 0.09);

    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  public playSnare(time: number | null = null) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.08);
    oscGain.gain.setValueAtTime(0.7, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  public playHiHat(time: number | null = null, volume: number = 0.5) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time || this.ctx.currentTime;
    const bufSize = Math.floor(this.ctx.sampleRate * 0.04);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(9000, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.04);
  }

  public getSpectrumData(): Uint8Array {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData as Uint8Array<ArrayBuffer>);
    }
    return this.frequencyData;
  }

  private _keyToFreq(keyStr: string = "F Minor"): number {
    const map: Record<string, number> = {
      "F Minor": 43.65,
      "C# Minor": 34.65,
      "G Minor": 49.0,
      "A Minor": 55.0,
      "D Minor": 36.71,
      "E Minor": 41.2,
      "B Minor": 61.74,
      "G# Minor": 51.91,
      "C Minor": 32.7,
      "D# Minor": 38.89,
    };
    return map[keyStr] || 43.65;
  }
}

export const audioEngine = new WebAudioEngine();
