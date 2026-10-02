import type {
  CharacterAnimationClipId,
  CharacterAnimationPrototype,
} from "./CharacterAnimationPrototype";

export const CHARACTER_PROTOTYPE_SEQUENCE = [
  "anim_char_idle_loop",
  "anim_char_walk_loop",
  "anim_char_idle_loop",
  "anim_char_turn_in_place",
  "anim_char_idle_loop",
  "anim_char_sit_down",
  "anim_char_seated_idle_loop",
  "anim_char_stand_up",
  "anim_char_idle_loop",
] as const satisfies readonly CharacterAnimationClipId[];

export type CharacterAnimationSequenceStatus =
  | "idle"
  | "running"
  | "passed"
  | "failed";

export interface CharacterSequenceReport {
  status: CharacterAnimationSequenceStatus;
  history: CharacterAnimationClipId[];
  rootDrift: number;
  finalRootYaw: number;
  finalPelvisY: number;
}

export interface CharacterAnimationControllerOptions {
  onStateChange?: (clipId: CharacterAnimationClipId | null) => void;
  onSequenceStatus?: (status: CharacterAnimationSequenceStatus) => void;
  delay?: (milliseconds: number) => Promise<void>;
}

const DEFAULT_DELAY = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export class CharacterAnimationController {
  private currentClipId: CharacterAnimationClipId | null = null;
  private sequenceStatus: CharacterAnimationSequenceStatus = "idle";
  private history: CharacterAnimationClipId[] = [];
  private sequencePromise: Promise<CharacterSequenceReport> | null = null;
  private readonly delay: (milliseconds: number) => Promise<void>;

  constructor(
    readonly rig: CharacterAnimationPrototype,
    private readonly options: CharacterAnimationControllerOptions = {},
  ) {
    this.delay = options.delay ?? DEFAULT_DELAY;
  }

  get activeClipId(): CharacterAnimationClipId | null {
    return this.currentClipId;
  }

  get currentSequenceStatus(): CharacterAnimationSequenceStatus {
    return this.sequenceStatus;
  }

  get sequenceHistory(): readonly CharacterAnimationClipId[] {
    return this.history;
  }

  stop(): void {
    for (const clip of this.rig.clips.values()) {
      if (clip.group.isStarted) {
        clip.group.stop(true);
      }
    }
    this.setActiveClip(null);
  }

  resetStanding(): void {
    this.stop();
    this.rig.applyStandingPose();
    this.history = [];
    this.setSequenceStatus("idle");
  }

  resetSeated(): void {
    this.stop();
    this.rig.applySeatedPose();
    this.history = [];
    this.setSequenceStatus("idle");
  }

  playLoop(id: CharacterAnimationClipId): void {
    const clip = this.requireClip(id);
    if (!clip.loop) {
      throw new Error(`${id} is not a loop clip.`);
    }
    this.switchToClip(id);
    clip.group.start(true, 1, clip.fromFrame, clip.toFrame);
  }

  async playOneShot(id: CharacterAnimationClipId): Promise<void> {
    const clip = this.requireClip(id);
    if (clip.loop) {
      throw new Error(`${id} is not a one-shot clip.`);
    }

    this.switchToClip(id);
    await new Promise<void>((resolve) => {
      clip.group.onAnimationGroupEndObservable.addOnce(() => resolve());
      clip.group.start(false, 1, clip.fromFrame, clip.toFrame);
    });
  }

  async preview(id: CharacterAnimationClipId): Promise<void> {
    if (
      id === "anim_char_seated_idle_loop" ||
      id === "anim_char_stand_up"
    ) {
      this.resetSeated();
    } else {
      this.resetStanding();
    }

    const clip = this.requireClip(id);
    if (clip.loop) {
      this.playLoop(id);
      return;
    }
    await this.playOneShot(id);
  }

  runPrototypeSequence(): Promise<CharacterSequenceReport> {
    if (this.sequencePromise) {
      return this.sequencePromise;
    }

    this.sequencePromise = this.executePrototypeSequence().finally(() => {
      this.sequencePromise = null;
    });
    return this.sequencePromise;
  }

  private async executePrototypeSequence(): Promise<CharacterSequenceReport> {
    this.resetStanding();
    const initialRootX = this.rig.root.position.x;
    const initialRootZ = this.rig.root.position.z;
    this.history = [];
    this.setSequenceStatus("running");

    try {
      this.playLoop("anim_char_idle_loop");
      await this.delay(700);

      this.playLoop("anim_char_walk_loop");
      await this.delay(1100);

      this.playLoop("anim_char_idle_loop");
      await this.delay(550);

      await this.playOneShot("anim_char_turn_in_place");

      this.playLoop("anim_char_idle_loop");
      await this.delay(500);

      await this.playOneShot("anim_char_sit_down");

      this.playLoop("anim_char_seated_idle_loop");
      await this.delay(850);

      await this.playOneShot("anim_char_stand_up");

      this.playLoop("anim_char_idle_loop");
      await this.delay(400);

      const dx = this.rig.root.position.x - initialRootX;
      const dz = this.rig.root.position.z - initialRootZ;
      const rootDrift = Math.hypot(dx, dz);
      const finalRootYaw = this.rig.root.rotation.y;
      const finalPelvisY = this.rig.joints.pelvis.position.y;
      const historyMatches =
        this.history.length === CHARACTER_PROTOTYPE_SEQUENCE.length &&
        this.history.every(
          (id, index) => id === CHARACTER_PROTOTYPE_SEQUENCE[index],
        );
      const passed =
        historyMatches &&
        rootDrift < 0.001 &&
        Math.abs(finalPelvisY - 0.95) < 0.02 &&
        Math.abs(finalRootYaw - Math.PI / 2) < 0.03;

      this.setSequenceStatus(passed ? "passed" : "failed");
      return {
        status: this.sequenceStatus,
        history: [...this.history],
        rootDrift,
        finalRootYaw,
        finalPelvisY,
      };
    } catch (error) {
      this.setSequenceStatus("failed");
      throw error;
    }
  }

  dispose(): void {
    this.stop();
  }

  private requireClip(id: CharacterAnimationClipId) {
    const clip = this.rig.clips.get(id);
    if (!clip) {
      throw new Error(`Unknown character animation clip: ${id}`);
    }
    return clip;
  }

  private switchToClip(id: CharacterAnimationClipId): void {
    const next = this.requireClip(id);
    for (const clip of this.rig.clips.values()) {
      if (clip.id !== id && clip.group.isStarted) {
        clip.group.stop(true);
      }
    }
    if (next.group.isStarted) {
      next.group.stop(true);
    }
    this.history.push(id);
    this.setActiveClip(id);
  }

  private setActiveClip(id: CharacterAnimationClipId | null): void {
    this.currentClipId = id;
    this.options.onStateChange?.(id);
  }

  private setSequenceStatus(status: CharacterAnimationSequenceStatus): void {
    this.sequenceStatus = status;
    this.options.onSequenceStatus?.(status);
  }
}
