import type { CameraAnchor } from "../../camera/CameraDirector";
import { CameraDirector } from "../../camera/CameraDirector";
import type {
  InteractionBehavior,
  InteractionBehaviorActions,
  InteractionBehaviorExitReason,
} from "../behaviors/InteractionBehaviorHost";

export type InspectionSessionState =
  | "idle"
  | "focusing"
  | "reading"
  | "restoring";

export interface InspectionView {
  show(): void;
  hide(): void;
}

export interface InspectionSessionOptions {
  cameraDirector: CameraDirector;
  anchor: CameraAnchor | (() => CameraAnchor);
  view: InspectionView;
  focusDuration?: number;
  restoreDuration?: number;
  onReadable?: () => void;
}

export class InspectionSession implements InteractionBehavior {
  state: InspectionSessionState = "idle";

  private actions: InteractionBehaviorActions | null = null;
  private readableNotified = false;

  constructor(private readonly options: InspectionSessionOptions) {}

  enter(actions: InteractionBehaviorActions): boolean {
    if (
      this.state !== "idle" ||
      this.options.cameraDirector.state !== "gameplay"
    ) {
      return false;
    }

    const anchor =
      typeof this.options.anchor === "function"
        ? this.options.anchor()
        : this.options.anchor;

    this.actions = actions;
    this.readableNotified = false;
    this.options.view.hide();

    if (
      !this.options.cameraDirector.focus(anchor, {
        duration: this.options.focusDuration ?? 0.38,
      })
    ) {
      this.actions = null;
      return false;
    }

    this.state = "focusing";
    return true;
  }

  update(_deltaSeconds: number): void {
    if (
      this.state === "focusing" &&
      this.options.cameraDirector.state === "inspection"
    ) {
      this.state = "reading";
      this.options.view.show();
      if (!this.readableNotified) {
        this.readableNotified = true;
        this.options.onReadable?.();
      }
      return;
    }

    if (
      this.state === "restoring" &&
      this.options.cameraDirector.state === "gameplay"
    ) {
      this.state = "idle";
      this.options.view.hide();
      const actions = this.actions;
      this.actions = null;
      actions?.complete();
    }
  }

  requestCancel(): boolean {
    if (this.state === "idle") {
      return false;
    }

    if (this.state !== "restoring") {
      this.options.view.hide();
      this.options.cameraDirector.cancel({
        duration: this.options.restoreDuration ?? 0.28,
      });
      this.state = "restoring";
    }

    return true;
  }

  exit(reason: InteractionBehaviorExitReason): void {
    if (reason === "cancelled" && this.state !== "idle") {
      this.options.view.hide();
      this.options.cameraDirector.cancel({
        duration: this.options.restoreDuration ?? 0.2,
      });
    }

    if (reason === "completed") {
      this.state = "idle";
      this.options.view.hide();
    }

    this.actions = null;
  }

  dispose(): void {
    this.options.view.hide();
    this.options.cameraDirector.cancel({ duration: 0.001 });
    this.actions = null;
    this.state = "idle";
  }
}
