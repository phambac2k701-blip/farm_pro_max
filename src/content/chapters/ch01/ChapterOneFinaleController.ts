import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Vector3 } from "@babylonjs/core/Maths/math.vector";

import type { ChapterRuntime } from "../../../game/chapter/ChapterRuntime";
import type { GameState } from "../../../game/state/GameState";
import { CH01_CLIMAX_COMPLETE_FACT } from "./ChapterOneClimaxController";
import {
  CH01_COMPLETE_FACT,
  type ChapterOneCheckpointId,
} from "./state";

export const CH01_FINAL_REFLECTION_ARMED_FACT =
  "ch01_final_reflection_armed";
export const CH01_FINAL_REFLECTION_VANISHED_FACT =
  "ch01_final_reflection_vanished";
export const CH01_FINAL_EXIT_OPENED_FACT =
  "ch01_final_exit_opened";

export interface ChapterOneTransitionView {
  show(): void;
  hide(): void;
}

export interface ChapterOneFinaleInputLock {
  setLocomotionEnabled(enabled: boolean): void;
  setLookEnabled(enabled: boolean): void;
}

export interface ChapterOneFinaleControllerOptions {
  state: GameState;
  chapterRuntime: ChapterRuntime<ChapterOneCheckpointId>;
  reflection: AbstractMesh;
  view: ChapterOneTransitionView;
  inputLock: ChapterOneFinaleInputLock;
  getCameraPosition: () => Vector3;
  getCameraForward: () => Vector3;
  onReflectionVanish?: () => void;
  onComplete?: () => void;
}

const ARM_DISTANCE = 4.5;
const DIRECT_LOOK_DOT = 0.982;
const MIN_VISIBLE_SECONDS = 0.45;

export class ChapterOneFinaleController {
  private armedElapsed = 0;

  constructor(
    private readonly options: ChapterOneFinaleControllerOptions,
  ) {}

  get isClimaxComplete(): boolean {
    return (
      this.options.state.getFact<boolean>(
        CH01_CLIMAX_COMPLETE_FACT,
      ) === true
    );
  }

  get isReflectionArmed(): boolean {
    return (
      this.options.state.getFact<boolean>(
        CH01_FINAL_REFLECTION_ARMED_FACT,
      ) === true
    );
  }

  get isReflectionVanished(): boolean {
    return (
      this.options.state.getFact<boolean>(
        CH01_FINAL_REFLECTION_VANISHED_FACT,
      ) === true
    );
  }

  get isComplete(): boolean {
    return (
      this.options.state.getFact<boolean>(CH01_COMPLETE_FACT) === true ||
      this.options.state.chapterId === "ch02"
    );
  }

  get canExit(): boolean {
    return this.isClimaxComplete && !this.isComplete;
  }

  restore(): void {
    if (this.isComplete) {
      this.options.chapterRuntime.completeChapter();
      this.options.reflection.setEnabled(false);
      this.showBoundary();
      return;
    }

    this.options.view.hide();
    this.options.reflection.setEnabled(
      this.isClimaxComplete &&
        this.isReflectionArmed &&
        !this.isReflectionVanished,
    );
  }

  update(deltaSeconds: number): void {
    if (this.isComplete) {
      this.options.reflection.setEnabled(false);
      return;
    }

    if (!this.isClimaxComplete || this.isReflectionVanished) {
      this.options.reflection.setEnabled(false);
      return;
    }

    const cameraPosition = this.options.getCameraPosition();
    const reflectionPosition =
      this.options.reflection.getAbsolutePosition();
    const toReflection = reflectionPosition.subtract(cameraPosition);
    const distance = toReflection.length();

    if (!this.isReflectionArmed) {
      if (distance > ARM_DISTANCE) {
        this.options.reflection.setEnabled(false);
        return;
      }

      this.options.state.setFact(
        CH01_FINAL_REFLECTION_ARMED_FACT,
        true,
      );
      this.armedElapsed = 0;
      this.options.reflection.setEnabled(true);
      return;
    }

    this.options.reflection.setEnabled(true);
    this.armedElapsed += Math.min(0.1, Math.max(0, deltaSeconds));
    if (
      this.armedElapsed < MIN_VISIBLE_SECONDS ||
      distance <= 0.001
    ) {
      return;
    }

    const forward = this.options.getCameraForward().normalize();
    const direction = toReflection.normalize();
    if (VectorDot(forward, direction) < DIRECT_LOOK_DOT) {
      return;
    }

    this.options.state.setFact(
      CH01_FINAL_REFLECTION_VANISHED_FACT,
      true,
    );
    this.options.reflection.setEnabled(false);
    this.options.onReflectionVanish?.();
  }

  completeChapter(): boolean {
    if (!this.canExit) {
      return false;
    }

    this.options.state.setFact(CH01_FINAL_EXIT_OPENED_FACT, true);
    this.options.chapterRuntime.completeChapter();
    this.options.reflection.setEnabled(false);
    this.showBoundary();
    this.options.onComplete?.();
    return true;
  }

  private showBoundary(): void {
    this.options.inputLock.setLocomotionEnabled(false);
    this.options.inputLock.setLookEnabled(false);
    this.options.view.show();
  }
}

function VectorDot(a: Vector3, b: Vector3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
