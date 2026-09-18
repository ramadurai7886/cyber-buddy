/**
 * Calming Audio Ambience Generator
 * Uses native Web Audio API to produce soft, harmonic therapeutic tones (432Hz)
 * Works 100% offline with zero external audio assets.
 */

class CalmingAudioEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playCalmChime(frequency: number = 432, duration: number = 2.5): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Smooth attack & soft exponential release
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Gracefully ignore if audio not allowed by browser autoplay policy
    }
  }

  playBreathTone(phase: 'Inhale' | 'Hold' | 'Exhale' | 'Rest'): void {
    switch (phase) {
      case 'Inhale':
        this.playCalmChime(396, 2.0); // Calming grounding tone
        break;
      case 'Hold':
        this.playCalmChime(432, 1.5); // Peaceful balance tone
        break;
      case 'Exhale':
        this.playCalmChime(360, 2.5); // Gentle release tone
        break;
      case 'Rest':
        this.playCalmChime(288, 1.5); // Deep rest tone
        break;
    }
  }
}

export const calmingAudio = new CalmingAudioEngine();
