import type { InteractableDefinition } from "./types";

export interface LocomotionLock {
  setLocomotionEnabled(enabled: boolean): void;
}

export class InteractionStateMachine {
  private active: InteractableDefinition | null = null;

  constructor(private readonly locomotion: LocomotionLock) {}

  get activeInteraction(): InteractableDefinition | null {
    return this.active;
  }

  enter(definition: InteractableDefinition): boolean {
    if (this.active) {
      return false;
    }

    this.active = definition;
    this.locomotion.setLocomotionEnabled(false);
    return true;
  }

  cancel(): boolean {
    if (!this.active) {
      return false;
    }

    this.active = null;
    this.locomotion.setLocomotionEnabled(true);
    return true;
  }

  complete(): boolean {
    return this.cancel();
  }
}
