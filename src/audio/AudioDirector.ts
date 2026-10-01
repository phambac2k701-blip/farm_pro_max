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
  setVolume(value: number, durationSeconds?: number): void;
}

export interface AudioBackend {
  unlockAsync(): Promise<void>;
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

  async unlockAsync(): Promise<void> {
    await this.engine.unlockAsync();
    if (this.engine.state !== "running") {
      await this.engine.resumeAsync();
    }
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
  private disposed = false;

  private constructor(
    private readonly backend: AudioBackend | null,
    private readonly manifest: AudioManifest,
    private readonly options: AudioDirectorOptions,
  ) {}

  static async create(
    manifest: AudioManifest,
    options: AudioDirectorOptions,
  ): Promise<AudioDirector> {
    let backend: AudioBackend | null = null;
    try {
      backend = await BabylonAudioBackend.create();
      backend.setVolume(options.masterVolume ?? 0.9);
    } catch {
      return new AudioDirector(null, manifest, options);
    }

    const director = new AudioDirector(backend, manifest, options);
    await director.loadAll();
    return director;
  }

  static async forTest(
    manifest: AudioManifest,
    backend: AudioBackend,
    options: AudioDirectorOptions = { baseUrl: "http://test/" },
  ): Promise<AudioDirector> {
    const director = new AudioDirector(backend, manifest, options);
    await director.loadAll();
    return director;
  }
  get isReady(): boolean {
    return this.backend !== null && !this.disposed;
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
    if (!this.backend || this.disposed) {
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

  private async loadAll(): Promise<void> {
    if (!this.backend) {
      return;
    }

    await Promise.all(
      Object.entries(this.manifest).map(async ([id, definition]) => {
        try {
          const source = new URL(definition.file, this.options.baseUrl).toString();
          const sound = await this.backend!.load(id, source, definition);
          this.sounds.set(id, sound);
        } catch {
          this.failed.add(id);
        }
      }),
    );
  }
}
