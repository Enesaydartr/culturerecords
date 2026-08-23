/**
 * High-Performance Web Audio API Synthesis & Music Sequencer Engine
 * Apple Fluid Audio Architecture: Instant response on pointerdown (<5ms latency),
 * Polyphonic Drill/Trap backing track generator, interactive Soundboard & Synth stems.
 */

class AppleDrillAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.isMuted = false;
    this.volume = 0.8;
    
    // Sequencer state
    this.isPlayingMusic = false;
    this.currentTrackData = null;
    this.stepIndex = 0;
    this.tempoBpm = 140;
    this.nextNoteTime = 0;
    this.timerId = null;
    this.lookahead = 25.0; // ms
    this.scheduleAheadTime = 0.1; // seconds

    // Visualizer data
    this.frequencyData = new Uint8Array(32);
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMasterVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setMasterVolume(this.volume);
    return this.isMuted;
  }

  // Instant Apple-style UI tap haptic click (<2ms)
  playUiTap(pitch = 800) {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  // 1. Heavy 808 Sub-Bass (with pitch glide)
  play808(freq = 43.65, time = null, duration = 0.8, slideTo = null) {
    this.init();
    const t = time || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const distortion = this.ctx.createWaveShaper();

    distortion.curve = this._distortionCurve(25);
    distortion.oversample = '2x';

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.5, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.04);
    
    if (slideTo) {
      osc.frequency.setValueAtTime(freq, t + 0.2);
      osc.frequency.exponentialRampToValueAtTime(slideTo, t + 0.35);
    }

    gain.gain.setValueAtTime(0.9, t);
    gain.gain.setValueAtTime(0.85, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(distortion);
    distortion.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  // 2. Punchy Drill Kick
  playKick(time = null) {
    this.init();
    const t = time || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(36, t + 0.09);

    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // 3. Drill Snare with metallic snap
  playSnare(time = null) {
    this.init();
    const t = time || this.ctx.currentTime;

    // Body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.08);
    oscGain.gain.setValueAtTime(0.7, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.12);

    // Noise Snap
    const bufSize = Math.floor(this.ctx.sampleRate * 0.18);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.75, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, t + 0.18);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.18);
  }

  // 4. Closed Hi-Hat
  playHiHat(time = null, volume = 0.5) {
    this.init();
    const t = time || this.ctx.currentTime;
    const bufSize = Math.floor(this.ctx.sampleRate * 0.04);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
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

  // 5. Melodic Trap Synth Chord / Lead
  playSynthNote(freq, time = null, duration = 0.4, type = 'sawtooth') {
    this.init();
    const t = time || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + duration);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  // 6. Voice / Soundboard Shouts
  playVox(type) {
    this.init();
    const now = this.ctx.currentTime;
    if (type === 'vox_067') {
      // High energetic robotic "067" formant
      this.playSynthNote(349.23, now, 0.25, 'sawtooth');
      this.playSynthNote(523.25, now + 0.08, 0.35, 'square');
      this.play808(55, now, 0.4);
    } else if (type === 'vox_mansur') {
      // Warm resonant "Mansur"
      this.playSynthNote(220, now, 0.3, 'sawtooth');
      this.playSynthNote(293.66, now + 0.1, 0.4, 'triangle');
    } else if (type === 'vox_nafile') {
      // Melody hook chord (Fm - Db - Eb - Cm)
      this.playSynthNote(174.61, now, 0.5, 'sawtooth');
      this.playSynthNote(261.63, now, 0.5, 'triangle');
      this.playSynthNote(349.23, now, 0.5, 'sine');
    } else if (type === 'vox_brapap') {
      // Gun-cock & drill double punch
      this.playKick(now);
      this.playSnare(now + 0.08);
      this.playSnare(now + 0.16);
      this.play808(45, now + 0.16, 0.6);
    } else if (type === 'slide_808') {
      this.play808(43.65, now, 1.0, 87.31);
    } else if (type === 'rimshot') {
      this.playSynthNote(800, now, 0.05, 'triangle');
      this.playHiHat(now, 0.8);
    }
  }

  /* ==========================================================================
     DRILL BEAT SEQUENCER (Continuous Playback for Selected Song)
     ========================================================================== */
  startMusic(track) {
    this.init();
    this.stopMusic();
    this.currentTrackData = track;
    this.tempoBpm = parseInt(track.bpm) || 140;
    this.isPlayingMusic = true;
    this.stepIndex = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;

    // Determine root frequencies based on song Key
    this.rootFreq = this._keyToFreq(track.key);

    this._scheduler();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  _scheduler() {
    if (!this.isPlayingMusic) return;

    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this._scheduleStep(this.stepIndex, this.nextNoteTime);
      this._advanceStep();
    }

    this.timerId = setTimeout(() => this._scheduler(), this.lookahead);
  }

  _advanceStep() {
    const secondsPerBeat = 60.0 / this.tempoBpm;
    const secondsPer16th = secondsPerBeat / 4.0;
    this.nextNoteTime += secondsPer16th;
    this.stepIndex = (this.stepIndex + 1) % 32; // 2 bars of 16ths
  }

  _scheduleStep(step, time) {
    const barStep = step % 16;
    const baseF = this.rootFreq || 43.65; // F1 default

    // 1. Kick Pattern (Drill UK/TR syncopation: steps 0, 8, 11, 24, 27)
    if (step === 0 || step === 8 || step === 11 || step === 16 || step === 24 || step === 27) {
      this.playKick(time);
    }

    // 2. Snare Pattern (Standard 3rd beat on step 6 & 22)
    if (step === 6 || step === 22) {
      this.playSnare(time);
    }

    // 3. 808 Sub-Bass Pattern with glides
    if (step === 0) {
      this.play808(baseF, time, 0.9);
    } else if (step === 8) {
      this.play808(baseF, time, 0.7);
    } else if (step === 16) {
      this.play808(baseF * 1.25, time, 0.8, baseF * 1.5); // Minor 3rd glide
    } else if (step === 24) {
      this.play808(baseF * 0.89, time, 0.8); // Drop down
    }

    // 4. Hi-Hat Drill Rolls
    // Regular 8th notes + random 16th/32nd triplets
    if (step % 2 === 0) {
      this.playHiHat(time, 0.45);
    }
    // Drill rolls on steps 13, 14, 15, 29, 30, 31
    if (step === 13 || step === 14 || step === 15 || step === 29 || step === 30 || step === 31) {
      this.playHiHat(time, 0.6);
      this.playHiHat(time + 0.04, 0.4);
    }

    // 5. Melodic Chords / Arpeggio
    if (step % 4 === 0) {
      const chordOffsets = [1, 1.189, 1.498, 1.781]; // Minor triad + 7th
      const chordNote = baseF * 4 * chordOffsets[(step / 4) % chordOffsets.length];
      this.playSynthNote(chordNote, time, 0.35, 'sawtooth');
    }
  }

  getSpectrumData() {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData);
    }
    return this.frequencyData;
  }

  _keyToFreq(keyStr = 'F Minor') {
    const map = {
      'F Minor': 43.65,
      'C# Minor': 34.65,
      'G Minor': 49.00,
      'A Minor': 55.00,
      'D Minor': 36.71,
      'E Minor': 41.20,
      'B Minor': 61.74,
      'G# Minor': 51.91,
      'C Minor': 32.70,
      'D# Minor': 38.89
    };
    return map[keyStr] || 43.65;
  }

  _distortionCurve(k = 20) {
    const n = 22050;
    const curve = new Float32Array(n);
    const deg = Math.PI / 180;
    for (let i = 0; i < n; ++i) {
      const x = (i * 2) / n - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

// Global Export
window.appleDrillAudio = new AppleDrillAudioEngine();
