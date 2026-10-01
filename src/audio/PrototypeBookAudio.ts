import type {
  BookInspectionAudio,
  BookSoundCue,
} from "../interaction/inspection/BookInspectionController";

export class PrototypeBookAudio implements BookInspectionAudio {
  private context: AudioContext | null = null;

  play(cue: BookSoundCue): void {
    try {
      const context = this.ensureContext();
      if (!context) {
        return;
      }

      void context.resume().catch(() => undefined);
      this.playNoiseCue(context, cue);
    } catch {
      // Prototype SFX must never block or crash interaction flow.
    }
  }

  dispose(): void {
    if (!this.context) {
      return;
    }

    void this.context.close().catch(() => undefined);
    this.context = null;
  }

  private ensureContext(): AudioContext | null {
    if (this.context) {
      return this.context;
    }

    const AudioContextConstructor =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextConstructor) {
      return null;
    }

    this.context = new AudioContextConstructor();
    return this.context;
  }

  private playNoiseCue(
    context: AudioContext,
    cue: BookSoundCue,
  ): void {
    const settings = {
      contact: { duration: 0.045, gain: 0.025, cutoff: 900 },
      "cover-open": { duration: 0.16, gain: 0.04, cutoff: 650 },
      "page-turn": { duration: 0.11, gain: 0.025, cutoff: 1800 },
      "cover-close": { duration: 0.09, gain: 0.045, cutoff: 520 },
    }[cue];

    const frameCount = Math.max(
      1,
      Math.floor(context.sampleRate * settings.duration),
    );
    const buffer = context.createBuffer(
      1,
      frameCount,
      context.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let index = 0; index < data.length; index += 1) {
      const envelope = 1 - index / data.length;
      data[index] = (Math.random() * 2 - 1) * envelope;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const now = context.currentTime;

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(settings.cutoff, now);
    gain.gain.setValueAtTime(settings.gain, now);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + settings.duration,
    );

    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(now);
  }
}
