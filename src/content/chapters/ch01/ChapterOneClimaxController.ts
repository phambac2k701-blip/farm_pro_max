import type { ChapterRuntime } from "../../../game/chapter/ChapterRuntime";
import type { GameState } from "../../../game/state/GameState";
import { CH01_KCR_A_APPLIED_FACT } from "./reality";
import type { ChapterOneCheckpointId } from "./state";

export const CH01_NINTH_HEADSET_INSPECTED_FACT =
  "ch01_ninth_headset_inspected";
export const CH01_HEADSET_PROXIMITY_CUE_PLAYED_FACT =
  "ch01_headset_proximity_cue_played";
export const CH01_CLIMAX_STEP_FACT = "ch01_climax_step";
export const CH01_CLIMAX_COMPLETE_FACT = "ch01_climax_complete";

export type ChapterOneClimaxStep = 0 | 1 | 2 | 3 | 4 | 5;

export interface ChapterOneClimaxPhoneView {
  show(): void;
  hide(): void;
}

export interface ChapterOneClimaxInputLock {
  setLocomotionEnabled(enabled: boolean): void;
  setLookEnabled(enabled: boolean): void;
}

export interface ChapterOneClimaxControllerOptions {
  state: GameState;
  chapterRuntime: ChapterRuntime<ChapterOneCheckpointId>;
  view: ChapterOneClimaxPhoneView;
  inputLock: ChapterOneClimaxInputLock;
  playPhoneVibration?: () => void;
  playRelayClick?: () => void;
  playKhangLine?: () => void;
  onComplete?: () => void;
}

export class ChapterOneClimaxController {
  private active = false;
  private elapsed = 0;
  private step: ChapterOneClimaxStep;

  constructor(
    private readonly options: ChapterOneClimaxControllerOptions,
  ) {
    const restored =
      options.state.getFact<number>(CH01_CLIMAX_STEP_FACT) ?? 0;
    this.step = clampStep(restored);

    if (
      options.state.getFact<boolean>(CH01_CLIMAX_COMPLETE_FACT) ===
      true
    ) {
      this.step = 5;
    }
  }

  get isActive(): boolean {
    return this.active;
  }

  get currentStep(): ChapterOneClimaxStep {
    return this.step;
  }

  get isComplete(): boolean {
    return (
      this.step === 5 ||
      this.options.state.getFact<boolean>(
        CH01_CLIMAX_COMPLETE_FACT,
      ) === true
    );
  }

  start(): boolean {
    if (
      this.isComplete ||
      this.options.state.getFact<boolean>(CH01_KCR_A_APPLIED_FACT) !==
        true
    ) {
      return false;
    }

    if (this.step > 0) {
      return this.resume();
    }

    this.active = true;
    this.elapsed = 0;
    this.advanceTo(1);
    this.lockForPhone();
    this.options.view.show();
    this.options.playPhoneVibration?.();
    return true;
  }

  resume(): boolean {
    if (
      this.isComplete ||
      this.step === 0 ||
      this.options.state.getFact<boolean>(CH01_KCR_A_APPLIED_FACT) !==
        true
    ) {
      return false;
    }

    this.active = true;
    this.elapsed = 0;

    if (this.step === 1) {
      this.lockForPhone();
      this.options.view.show();
    } else {
      this.releasePhoneLock();
      this.options.view.hide();
    }

    return true;
  }

  handleKey(code: string): boolean {
    if (
      !this.active ||
      this.step !== 1 ||
      !["KeyE", "Enter", "Space", "Escape"].includes(code)
    ) {
      return false;
    }

    this.options.view.hide();
    this.releasePhoneLock();
    this.elapsed = 0;
    this.advanceTo(2);
    return true;
  }

  update(deltaSeconds: number): void {
    if (!this.active || this.step === 1 || this.step === 5) {
      return;
    }

    this.elapsed += Math.min(0.1, Math.max(0, deltaSeconds));

    if (this.step === 2 && this.elapsed >= 1.15) {
      this.elapsed = 0;
      this.advanceTo(3);
      this.options.playRelayClick?.();
      return;
    }

    if (this.step === 3 && this.elapsed >= 0.45) {
      this.elapsed = 0;
      this.advanceTo(4);
      this.options.playKhangLine?.();
      return;
    }

    if (this.step === 4 && this.elapsed >= 2.4) {
      this.complete();
    }
  }

  complete(): boolean {
    if (this.isComplete) {
      return false;
    }

    this.active = false;
    this.elapsed = 0;
    this.advanceTo(5);
    this.options.state.setFact(CH01_CLIMAX_COMPLETE_FACT, true);
    this.options.chapterRuntime.reachCheckpoint("ch01_climax_complete");
    this.options.view.hide();
    this.releasePhoneLock();
    this.options.onComplete?.();
    return true;
  }

  dispose(): void {
    this.options.view.hide();
    this.releasePhoneLock();
    this.active = false;
  }

  private advanceTo(step: ChapterOneClimaxStep): void {
    this.step = step;
    this.options.state.setFact(CH01_CLIMAX_STEP_FACT, step);
  }

  private lockForPhone(): void {
    this.options.inputLock.setLocomotionEnabled(false);
    this.options.inputLock.setLookEnabled(false);
  }

  private releasePhoneLock(): void {
    this.options.inputLock.setLookEnabled(true);
    this.options.inputLock.setLocomotionEnabled(true);
  }
}

function clampStep(value: number): ChapterOneClimaxStep {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(5, Math.max(0, Math.trunc(value))) as ChapterOneClimaxStep;
}
