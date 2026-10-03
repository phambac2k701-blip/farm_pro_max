import {
  CreateAudioEngineAsync,
  CreateSoundAsync,
  type AudioEngineV2,
  type StaticSound,
} from "@babylonjs/core/AudioV2";
import type { Node } from "@babylonjs/core/node";

export interface AudioSpatialDefinition {
  minDistance?: number;
  maxDistance?: number;
  rolloffFactor?: number;
  panningModel?: "equalpower" | "HRTF";
}

export interface AudioCueDefinition {
  file: string;
  loop?: boolean;
  volume?: number;
  maxInstances?: number;
  spatial?: AudioSpatialDefinition;
  caption?: string;
}

export type AudioManifest = Record<string, AudioCueDefinition>;

export interface AudioDirectorOptions {
  baseUrl: string;
  onCaption?: (caption: string) => void;
  masterVolume?: number;
}

export interface AudioSoundHandle {
  play(options?: { loop?: boolean; volume?: number }): void;
  stop(): void;
  dispose(): void;
  attach(node: Node): void;
  onEnded?(callback: () => void): () => void;
  setVolume(value: number, durationSeconds?: number): void;
}

export interface AudioBackend {
  unlockAsync(): Promise<void>;
  setPaused?(paused: boolean): Promise<void>;
  attachListener?(node: Node): void;
  setVolume(value: number, durationSeconds?: number): void;
  load(
    id: string,
    source: string,
    definition: AudioCueDefinition,
  ): Promise<AudioSoundHandle>;
  dispose(): void;
}

class BabylonSoundHandle implements AudioSoundHandle {
  constructor(private readonly sound: StaticSound) {}

  onEnded(callback: () => void): () => void {
    const observer = this.sound.onEndedObservable.add(callback);
    return () => { this.sound.onEndedObservable.remove(observer); };
  }

  play(options?: { loop?: boolean; volume?: number }): void {
    this.sound.play(options);
  }

  stop(): void {
    this.sound.stop();
  }

  dispose(): void {
    this.sound.dispose();
  }

  attach(node: Node): void {
    this.sound.spatial.attach(node);
  }

  setVolume(value: number, durationSeconds = 0): void {
    this.sound.setVolume(
      value,
      durationSeconds > 0 ? { duration: durationSeconds } : undefined,
    );
  }
}
export interface AudioPauseTransport {
  readonly state: string;
  pauseAsync(): Promise<void>;
  resumeAsync(): Promise<void>;
}

export async function synchronizeAudioPause(
  transport: AudioPauseTransport,
  paused: boolean,
): Promise<void> {
  // Avoid Babylon's cached no-op resume promise when a focus event repeats
  // while the context is already running. Resume only a suspended transport.
  if (paused && transport.state === "running") await transport.pauseAsync();
  else if (!paused && transport.state !== "running") await transport.resumeAsync();
}

class BabylonAudioBackend implements AudioBackend {
  private constructor(private readonly engine: AudioEngineV2) {}

  static async create(): Promise<BabylonAudioBackend> {
    const engine = await CreateAudioEngineAsync({
      disableDefaultUI: true,
      resumeOnInteraction: true,
      resumeOnPause: true,
    });
    return new BabylonAudioBackend(engine);
  }

  attachListener(node: Node): void {
    this.engine.listener.attach(node);
  }

  async setPaused(paused: boolean): Promise<void> {
    await synchronizeAudioPause(this.engine, paused);
  }

  async unlockAsync(): Promise<void> {
    // In Babylon 9.29 unlockAsync delegates to resumeAsync. Calling it on an
    // already-running context caches a fulfilled promise that survives pause.
    await synchronizeAudioPause(this.engine, false);
  }

  setVolume(value: number, durationSeconds = 0): void {
    this.engine.setVolume(
      value,
      durationSeconds > 0 ? { duration: durationSeconds } : undefined,
    );
  }

  async load(
    id: string,
    source: string,
    definition: AudioCueDefinition,
  ): Promise<AudioSoundHandle> {
    const spatial = definition.spatial;
    const sound = await CreateSoundAsync(
      id,
      source,
      {
        autoplay: false,
        loop: definition.loop ?? false,
        maxInstances: definition.maxInstances ?? 1,
        volume: definition.volume ?? 1,
        spatialEnabled: Boolean(spatial),
      },
      this.engine,
    );

    if (spatial) {
      sound.spatial.distanceModel = "linear";
      sound.spatial.minDistance = spatial.minDistance ?? 1;
      sound.spatial.maxDistance = spatial.maxDistance ?? 18;
      sound.spatial.rolloffFactor = spatial.rolloffFactor ?? 1;
      sound.spatial.panningEnabled = true;
      sound.spatial.panningModel = spatial.panningModel ?? "HRTF";
    }

    return new BabylonSoundHandle(sound);
  }

  dispose(): void {
    this.engine.dispose();
  }
}

export class AudioDirector {
  private readonly sounds = new Map<string, AudioSoundHandle>();
  private readonly failed = new Set<string>();
  private backend: AudioBackend | null;
  private initializationComplete = false;
  private disposed = false;

  private constructor(
    backend: AudioBackend | null,
    private readonly manifest: AudioManifest,
    private readonly options: AudioDirectorOptions,
  ) {
    this.backend = backend;
  }

  static async create(
    manifest: AudioManifest,
    options: AudioDirectorOptions,
  ): Promise<AudioDirector> {
    const director = new AudioDirector(null, manifest, options);
    void director.initialize();
    return director;
  }

  static async forTest(
    manifest: AudioManifest,
    backend: AudioBackend,
    options: AudioDirectorOptions = { baseUrl: "http://test/" },
  ): Promise<AudioDirector> {
    const director = new AudioDirector(backend, manifest, options);
    await director.loadAll();
    director.initializationComplete = true;
    return director;
  }

  get isReady(): boolean {
    return (
      this.backend !== null &&
      this.initializationComplete &&
      !this.disposed
    );
  }

  get failedCueIds(): readonly string[] {
    return [...this.failed];
  }

  setMasterVolume(value: number, durationSeconds = 0): boolean {
    if (!this.backend || this.disposed) {
      return false;
    }
    try {
      this.backend.setVolume(
        Math.min(1, Math.max(0, value)),
        Math.max(0, durationSeconds),
      );
      return true;
    } catch {
      return false;
    }
  }

  restoreMasterVolume(durationSeconds = 0.2): boolean {
    return this.setMasterVolume(
      this.options.masterVolume ?? 0.9,
      durationSeconds,
    );
  }

  fadeCue(id: string, value: number, durationSeconds = 0.2): boolean {
    const sound = this.sounds.get(id);
    if (!sound || this.disposed) {
      return false;
    }
    try {
      sound.setVolume(
        Math.min(1, Math.max(0, value)),
        Math.max(0, durationSeconds),
      );
      return true;
    } catch {
      return false;
    }
  }

  async unlock(): Promise<boolean> {
    if (!this.isReady || !this.backend) {
      return false;
    }
    try {
      await this.backend.unlockAsync();
      return true;
    } catch {
      return false;
    }
  }

  play(id: string, node?: Node): boolean {
    if (this.disposed) {
      return false;
    }

    const sound = this.sounds.get(id);
    const definition = this.manifest[id];
    if (!sound || !definition) {
      return false;
    }

    try {
      if (node && definition.spatial) {
        sound.attach(node);
      }
      sound.play({
        loop: definition.loop ?? false,
        volume: definition.volume ?? 1,
      });
      if (definition.caption) {
        this.options.onCaption?.(definition.caption);
      }
      return true;
    } catch {
      return false;
    }
  }

  attachListener(node: Node): void { this.backend?.attachListener?.(node); }

  async setPaused(paused: boolean): Promise<boolean> {
    try { await this.backend?.setPaused?.(paused); return this.isReady; }
    catch { return false; }
  }

  playUntilEnd(id: string, node?: Node, signal?: AbortSignal): Promise<boolean> {
    const sound = this.sounds.get(id);
    if (!sound?.onEnded || signal?.aborted || this.manifest[id]?.loop) return Promise.resolve(false);
    return new Promise<boolean>((resolve) => {
      let settled = false;
      let remove = () => {};
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        remove();
        signal?.removeEventListener("abort", abort);
        resolve(ok);
      };
      const abort = () => { finish(false); sound.stop(); };
      remove = sound.onEnded!(() => finish(true));
      signal?.addEventListener("abort", abort, { once: true });
      if (!this.play(id, node)) finish(false);
    });
  }

  stop(id: string): boolean {
    const sound = this.sounds.get(id);
    if (!sound || this.disposed) {
      return false;
    }
    try {
      sound.stop();
      return true;
    } catch {
      return false;
    }
  }

  startAmbience(ids: readonly string[]): void {
    for (const id of ids) {
      const definition = this.manifest[id];
      if (definition?.loop) {
        this.play(id);
      }
    }
  }

  stopAll(ids?: readonly string[]): void {
    const selected = ids ?? [...this.sounds.keys()];
    for (const id of selected) {
      this.stop(id);
    }
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    for (const sound of this.sounds.values()) {
      try {
        sound.dispose();
      } catch {
        // Audio disposal must never block game teardown.
      }
    }
    this.sounds.clear();
    try {
      this.backend?.dispose();
    } catch {
      // Ignore browser audio teardown failures.
    }
  }

  private async initialize(): Promise<void> {
    try {
      const backend = await BabylonAudioBackend.create();
      if (this.disposed) {
        backend.dispose();
        return;
      }

      this.backend = backend;
      backend.setVolume(this.options.masterVolume ?? 0.9);
      await this.loadAll();

      if (!this.disposed) {
        this.initializationComplete = true;
      }
    } catch {
      this.initializationComplete = false;
    }
  }

  private async loadAll(): Promise<void> {
    if (!this.backend) {
      return;
    }

    await Promise.all(
      Object.entries(this.manifest).map(async ([id, definition]) => {
        try {
          const source = new URL(definition.file, this.options.baseUrl).toString();
          const sound = await this.backend!.load(id, source, definition);
          if (this.disposed) {
            sound.dispose();
            return;
          }
          this.sounds.set(id, sound);
        } catch {
          this.failed.add(id);
        }
      }),
    );
  }
}
