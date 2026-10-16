// Ambient Wedding Audio Engine using Web Audio API
// Synthesizes a soothing, sacred acoustic ambient nasheed melody (pentatonic oud/harp harmony)
// Guarantees zero CORS failures, works offline, and produces a gentle, peaceful atmosphere.

class WeddingAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.listeners = new Set();
    this.notes = [
      220.00, // A3
      246.94, // B3
      261.63, // C4
      293.66, // D4
      329.63, // E4
      349.23, // F4
      392.00, // G4
      440.00, // A4
      493.88, // B4
      523.25, // C5
    ];
    this.melodySequence = [
      { note: 220, dur: 1.8, delay: 0 },
      { note: 261.63, dur: 1.5, delay: 0.6 },
      { note: 329.63, dur: 2.2, delay: 1.2 },
      { note: 392.00, dur: 2.0, delay: 2.0 },
      { note: 329.63, dur: 1.5, delay: 2.8 },
      { note: 293.66, dur: 2.5, delay: 3.6 },
      { note: 261.63, dur: 1.8, delay: 4.8 },
      { note: 246.94, dur: 2.2, delay: 5.6 },
      { note: 220.00, dur: 3.5, delay: 6.6 },
    ];
    this.loopTime = 8000;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  playTone(freq, duration, timeOffset = 0, type = 'sine') {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime + timeOffset;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft, warm acoustic wood timbre
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      // Gentle attack and slow exponential decay
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.2);
    } catch (e) {
      console.warn("Audio node error", e);
    }
  }

  playHarmony() {
    if (!this.audioCtx || !this.isPlaying) return;
    
    // Play the peaceful melodic phrase
    this.melodySequence.forEach(item => {
      this.playTone(item.note, item.dur, item.delay, 'sine');
      // Subtle octave resonance for warm harp/duff feel
      if (item.delay % 2 === 0) {
        this.playTone(item.note * 0.5, item.dur * 1.2, item.delay + 0.05, 'triangle');
      }
    });

    // Gentle warm sub-bass drone
    this.playTone(110.0, 7.5, 0, 'sine');
  }

  async toggle() {
    this.init();
    if (!this.audioCtx) return false;

    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playHarmony();
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        this.playHarmony();
      }
    }, this.loopTime);
    this.notify();
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.isPlaying);
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();
