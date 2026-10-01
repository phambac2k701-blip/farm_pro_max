import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";

import type {
  InteractionBehavior,
  InteractionBehaviorActions,
} from "./InteractionBehaviorHost";

export interface PickupControllerOptions {
  mesh: AbstractMesh;
  alreadyPicked?: () => boolean;
  onPickup?: () => void;
}

export class PickupController implements InteractionBehavior {
  private pendingActions: InteractionBehaviorActions | null = null;

  constructor(private readonly options: PickupControllerOptions) {}

  enter(actions: InteractionBehaviorActions): boolean {
    if (this.options.alreadyPicked?.()) {
      actions.complete();
      return true;
    }

    this.options.mesh.setEnabled(false);
    this.options.onPickup?.();
    this.pendingActions = actions;
    return true;
  }

  update(): void {
    if (!this.pendingActions) {
      return;
    }

    const actions = this.pendingActions;
    this.pendingActions = null;
    actions.complete();
  }

  requestCancel(): boolean {
    return false;
  }

  restorePicked(picked: boolean): void {
    this.options.mesh.setEnabled(!picked);
  }
}
