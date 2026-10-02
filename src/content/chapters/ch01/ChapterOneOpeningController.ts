import type { EvidenceSystem } from "../../../evidence/EvidenceSystem";
import type { GameState } from "../../../game/state/GameState";

export const CH01_OPENING_STEP_FACT = "ch01_opening_step";
export const CH01_OPENING_COMPLETE_FACT = "ch01_opening_complete";

export interface ChapterOnePhoneView {
  show(step: number): void;
  update(step: number): void;
  hide(): void;
}

export interface ChapterOneOpeningLock {
  setLocomotionEnabled(enabled: boolean): void;
  setLookEnabled(enabled: boolean): void;
}

export interface ChapterOneOpeningControllerOptions {
  state: GameState;
  evidence: EvidenceSystem;
  view: ChapterOnePhoneView;
  inputLock: ChapterOneOpeningLock;
}

export class ChapterOneOpeningController {
  private active = false;
  private elapsed = 0;
  private step = 0;

  constructor(
    private readonly options: ChapterOneOpeningControllerOptions,
  ) {
    const restoredStep =
      options.state.getFact<number>(CH01_OPENING_STEP_FACT) ?? 0;
    this.step = Math.min(3, Math.max(0, restoredStep));
  }

  get isActive(): boolean {
    return this.active;
  }

  get currentStep(): number {
    return this.step;
  }

  start(): boolean {
    if (
      this.options.state.getFact<boolean>(
        CH01_OPENING_COMPLETE_FACT,
      ) === true ||
      this.options.evidence.has("C01")
    ) {
      this.options.view.hide();
      return false;
    }

    this.active = true;
    this.options.inputLock.setLocomotionEnabled(false);
    this.options.inputLock.setLookEnabled(false);

    if (this.step === 0) {
      this.advanceTo(1);
    }

    this.options.view.show(this.step);
    return true;
  }

  update(deltaSeconds: number): void {
    if (!this.active || this.step >= 3) {
      return;
    }

    this.elapsed += Math.max(0, deltaSeconds);
    const threshold = this.step === 1 ? 1.1 : 1.25;

    if (this.elapsed >= threshold) {
      this.elapsed = 0;
      this.advanceTo(this.step + 1);
    }
  }

  handleKey(code: string): boolean {
    if (
      !this.active ||
      this.step < 3 ||
      !["KeyE", "Enter", "Space"].includes(code)
    ) {
      return false;
    }

    this.complete();
    return true;
  }

  complete(): boolean {
    if (!this.active) {
      return false;
    }

    this.options.evidence.discover("C01");
    this.options.state.setFact(CH01_OPENING_COMPLETE_FACT, true);
    this.options.view.hide();
    this.options.inputLock.setLookEnabled(true);
    this.options.inputLock.setLocomotionEnabled(true);
    this.active = false;
    return true;
  }

  dispose(): void {
    if (this.active) {
      this.options.view.hide();
      this.options.inputLock.setLookEnabled(true);
      this.options.inputLock.setLocomotionEnabled(true);
      this.active = false;
    }
  }

  private advanceTo(step: number): void {
    this.step = Math.min(3, Math.max(1, step));
    this.options.state.setFact(CH01_OPENING_STEP_FACT, this.step);
    this.options.view.update(this.step);
  }
}
