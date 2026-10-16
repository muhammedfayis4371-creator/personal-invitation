// Arabic Nasheed Audio Engine
// Track: "Arusat Al-Noor" (عروسة النور) by Muhammad Al-Muqit
// Lyrics: 'Ala jabini sa'adati wa afkari / Tajri al-hurufu bi-ashwaqin wa-azhari / Hadhihi Haya qad shara'at...

class WeddingAudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.listeners = new Set();
  }

  init() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio('/nasheed.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Nasheed audio error:', e);
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  async play() {
    this.init();
    if (!this.audio) return false;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio play prevented by browser policy:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  stop() {
    this.pause();
    if (this.audio) {
      this.audio.currentTime = 0;
    }
  }

  async toggle() {
    this.init();
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return await this.play();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.isPlaying);
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();
