import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode";

import type {
  InteractionBehavior,
  InteractionBehaviorActions,
  InteractionBehaviorExitReason,
} from "./InteractionBehaviorHost";

export type OpenableState =
  | "closed"
  | "opening"
  | "open"
  | "closing";

export interface OpenableAdapter {
  apply(progress: number): void;
  setStableCollisionState?(open: boolean): void;
}

export interface OpenableControllerOptions {
  adapter: OpenableAdapter;
  duration?: number;
  isLocked?: () => boolean;
  onLocked?: () => void;
  onStableState?: (open: boolean) => void;
  initiallyOpen?: boolean;
}

export function createHingedOpenableAdapter(
  hinge: TransformNode,
  closedRotationY: number,
  openRotationY: number,
): OpenableAdapter {
  return {
    apply(progress) {
      hinge.rotation.y =
        closedRotationY +
        (openRotationY - closedRotationY) * progress;
    },
  };
}

export function createSlidingOpenableAdapter(
  node: TransformNode,
  closedPosition: Vector3,
  openPosition: Vector3,
): OpenableAdapter {
  return {
    apply(progress) {
      node.position.copyFrom(
        Vector3.Lerp(closedPosition, openPosition, progress),
      );
    },
  };
}

export class OpenableController implements InteractionBehavior {
  private progress: number;
  private startOpen: boolean;
  private targetOpen: boolean;
  private actions: InteractionBehaviorActions | null = null;
  private readonly duration: number;

  constructor(private readonly options: OpenableControllerOptions) {
    const initiallyOpen = options.initiallyOpen ?? false;
    this.progress = initiallyOpen ? 1 : 0;
    this.startOpen = initiallyOpen;
    this.targetOpen = initiallyOpen;
    this.duration = Math.max(0.05, options.duration ?? 0.45);
    this.options.adapter.apply(this.progress);
    this.options.adapter.setStableCollisionState?.(initiallyOpen);
  }

  get state(): OpenableState {
    if (this.progress <= 0) {
      return "closed";
    }
    if (this.progress >= 1) {
      return "open";
    }
    return this.targetOpen ? "opening" : "closing";
  }

  get isOpen(): boolean {
    return this.progress >= 1;
  }

  enter(actions: InteractionBehaviorActions): boolean {
    if (this.actions) {
      return false;
    }

    this.actions = actions;

    if (this.options.isLocked?.()) {
      this.options.onLocked?.();
      this.actions.complete();
      this.actions = null;
      return true;
    }

    this.startOpen = this.isOpen;
    this.targetOpen = !this.startOpen;
    return true;
  }

  update(deltaSeconds: number): void {
    if (!this.actions) {
      return;
    }

    const direction = this.targetOpen ? 1 : -1;
    this.progress = Math.min(
      1,
      Math.max(
        0,
        this.progress +
          (direction * Math.max(0, deltaSeconds)) / this.duration,
      ),
    );

    this.options.adapter.apply(smoothStep(this.progress));

    const finished =
      (this.targetOpen && this.progress >= 1) ||
      (!this.targetOpen && this.progress <= 0);

    if (!finished) {
      return;
    }

    this.options.adapter.apply(this.targetOpen ? 1 : 0);
    this.options.adapter.setStableCollisionState?.(this.targetOpen);
    this.options.onStableState?.(this.targetOpen);

    const actions = this.actions;
    this.actions = null;
    actions.complete();
  }

  requestCancel(): boolean {
    if (!this.actions) {
      return false;
    }

    this.restore(this.startOpen);
    const actions = this.actions;
    this.actions = null;
    actions.cancel();
    return true;
  }

  exit(reason: InteractionBehaviorExitReason): void {
    if (reason === "cancelled" && this.actions) {
      this.restore(this.startOpen);
    }
    this.actions = null;
  }

  restore(open: boolean): void {
    this.progress = open ? 1 : 0;
    this.startOpen = open;
    this.targetOpen = open;
    this.options.adapter.apply(this.progress);
    this.options.adapter.setStableCollisionState?.(open);
  }
}

function smoothStep(value: number): number {
  return value * value * (3 - 2 * value);
}
