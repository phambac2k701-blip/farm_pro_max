import type {
  InteractionBehavior,
  InteractionBehaviorActions,
  InteractionBehaviorExitReason,
} from "../behaviors/InteractionBehaviorHost";
import {
  InspectionSession,
  type InspectionSessionOptions,
} from "./InspectionSession";

export type PhotoInspectionControllerOptions = InspectionSessionOptions;

export class PhotoInspectionController implements InteractionBehavior {
  private readonly session: InspectionSession;

  constructor(options: PhotoInspectionControllerOptions) {
    this.session = new InspectionSession(options);
  }

  get state() {
    return this.session.state;
  }

  enter(actions: InteractionBehaviorActions): boolean {
    return this.session.enter(actions);
  }

  update(deltaSeconds: number): void {
    this.session.update(deltaSeconds);
  }

  requestCancel(): boolean {
    return this.session.requestCancel();
  }

  exit(reason: InteractionBehaviorExitReason): void {
    this.session.exit(reason);
  }

  dispose(): void {
    this.session.dispose();
  }
}
