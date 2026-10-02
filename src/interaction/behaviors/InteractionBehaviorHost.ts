import type { InteractableDefinition } from "../types";
import type {
  InteractionCancelRequestHandler,
  InteractionSystem,
} from "../InteractionSystem";

export type InteractionBehaviorExitReason = "completed" | "cancelled";

export interface InteractionBehaviorActions {
  complete(): boolean;
  cancel(): boolean;
}

export interface InteractionBehavior {
  enter(actions: InteractionBehaviorActions): boolean | void;
  update(deltaSeconds: number): void;
  requestCancel?(): boolean;
  exit?(reason: InteractionBehaviorExitReason): void;
  dispose?(): void;
}

interface InteractionSource {
  readonly activeInteraction: InteractableDefinition | null;
  cancel(): boolean;
  setCancelRequestHandler(
    handler: InteractionCancelRequestHandler | null,
  ): void;
}

export class InteractionBehaviorHost {
  private readonly behaviors = new Map<string, InteractionBehavior>();
  private activeId: string | null = null;
  private pendingExitReason: InteractionBehaviorExitReason | null = null;

  constructor(
    private readonly interaction: InteractionSource | InteractionSystem,
  ) {
    this.interaction.setCancelRequestHandler(
      this.handleCancelRequest,
    );
  }

  register(id: string, behavior: InteractionBehavior): () => void {
    if (this.behaviors.has(id)) {
      throw new Error(`Interaction behavior already registered: ${id}`);
    }

    this.behaviors.set(id, behavior);
    return () => {
      if (this.activeId === id) {
        this.pendingExitReason = "cancelled";
        this.interaction.cancel();
        this.syncActiveInteraction();
      }
      const current = this.behaviors.get(id);
      if (current === behavior) {
        current.dispose?.();
        this.behaviors.delete(id);
      }
    };
  }

  update(deltaSeconds: number): void {
    this.syncActiveInteraction();

    for (const behavior of new Set(this.behaviors.values())) {
      behavior.update(deltaSeconds);
    }

    this.syncActiveInteraction();
  }

  dispose(): void {
    this.interaction.setCancelRequestHandler(null);

    if (this.activeId) {
      this.pendingExitReason = "cancelled";
      this.interaction.cancel();
      this.syncActiveInteraction();
    }

    for (const behavior of new Set(this.behaviors.values())) {
      behavior.dispose?.();
    }

    this.behaviors.clear();
  }

  private readonly handleCancelRequest = (): boolean => {
    if (!this.activeId) {
      return false;
    }

    const behavior = this.behaviors.get(this.activeId);
    return behavior?.requestCancel?.() ?? false;
  };

  private syncActiveInteraction(): void {
    const currentId = this.interaction.activeInteraction?.id ?? null;
    if (currentId === this.activeId) {
      return;
    }

    if (this.activeId) {
      const previous = this.behaviors.get(this.activeId);
      previous?.exit?.(this.pendingExitReason ?? "cancelled");
    }

    this.activeId = currentId;
    this.pendingExitReason = null;

    if (!currentId) {
      return;
    }

    const behavior = this.behaviors.get(currentId);
    if (!behavior) {
      this.pendingExitReason = "cancelled";
      this.interaction.cancel();
      this.syncActiveInteraction();
      return;
    }

    const actions: InteractionBehaviorActions = {
      complete: () => this.finish(currentId, "completed"),
      cancel: () => this.finish(currentId, "cancelled"),
    };
    const entered = behavior.enter(actions);

    if (entered === false) {
      this.pendingExitReason = "cancelled";
      this.interaction.cancel();
      this.syncActiveInteraction();
    }
  }

  private finish(
    id: string,
    reason: InteractionBehaviorExitReason,
  ): boolean {
    if (this.activeId !== id) {
      return false;
    }

    this.pendingExitReason = reason;
    const cancelled = this.interaction.cancel();
    this.syncActiveInteraction();
    return cancelled;
  }
}
