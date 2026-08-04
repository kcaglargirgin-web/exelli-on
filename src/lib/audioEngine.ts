// Web Audio API Synthesizer for High-Tech UI SFX
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initCtx();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playBeep(880, 0.05, 'sine');
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public playBeep(freq = 440, duration = 0.08, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore audio context errors
    }
  }

  public playHover() {
    if (this.isMuted) return;
    this.playBeep(1200, 0.03, 'triangle');
  }

  public playClick() {
    if (this.isMuted) return;
    this.playBeep(600, 0.06, 'square');
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.playBeep(523.25, 0.08, 'sine');
    setTimeout(() => this.playBeep(659.25, 0.08, 'sine'), 80);
    setTimeout(() => this.playBeep(783.99, 0.12, 'sine'), 160);
  }
}

export const soundEngine = new SoundEngine();
