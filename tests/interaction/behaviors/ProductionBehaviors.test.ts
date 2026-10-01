import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { describe, expect, it, vi } from "vitest";

import type { InteractableDefinition } from "../../../src/interaction/types";
import {
  InteractionBehaviorHost,
  type InteractionBehavior,
  type InteractionBehaviorActions,
} from "../../../src/interaction/behaviors/InteractionBehaviorHost";
import {
  OpenableController,
  type OpenableAdapter,
} from "../../../src/interaction/behaviors/OpenableController";

class FakeInteraction {
  activeInteraction: InteractableDefinition | null = null;
  private handler: (() => boolean) | null = null;

  cancel(): boolean {
    if (!this.activeInteraction) {
      return false;
    }
    this.activeInteraction = null;
    return true;
  }

  setCancelRequestHandler(handler: (() => boolean) | null): void {
    this.handler = handler;
  }

  requestCancel(): boolean {
    if (this.handler?.()) {
      return true;
    }
    return this.cancel();
  }
}

const definition = (id: string): InteractableDefinition => ({
  id,
  prompt: id,
  maxDistance: 2,
});

describe("InteractionBehaviorHost", () => {
  it("enters and completes a registered behavior", () => {
    const interaction = new FakeInteraction();
    const enter = vi.fn();
    const exit = vi.fn();
    let actions: InteractionBehaviorActions | null = null;
    const behavior: InteractionBehavior = {
      enter(value) {
        actions = value;
        enter();
      },
      update() {},
      exit,
    };
    const host = new InteractionBehaviorHost(interaction);

    host.register("door", behavior);
    interaction.activeInteraction = definition("door");
    host.update(0);

    expect(enter).toHaveBeenCalledTimes(1);
    expect(actions).not.toBeNull();

    actions!.complete();
    host.update(0);

    expect(interaction.activeInteraction).toBeNull();
    expect(exit).toHaveBeenCalledWith("completed");
  });

  it("lets an active behavior defer Escape cancellation", () => {
    const interaction = new FakeInteraction();
    const requestCancel = vi.fn(() => true);
    const behavior: InteractionBehavior = {
      enter() {},
      update() {},
      requestCancel,
    };
    const host = new InteractionBehaviorHost(interaction);

    host.register("document", behavior);
    interaction.activeInteraction = definition("document");
    host.update(0);

    expect(interaction.requestCancel()).toBe(true);
    expect(requestCancel).toHaveBeenCalledTimes(1);
    expect(interaction.activeInteraction?.id).toBe("document");
  });
});

describe("OpenableController", () => {
  it("opens, closes, and restores deterministic stable transforms", () => {
    let applied = 0;
    const adapter: OpenableAdapter = {
      apply(value) {
        applied = value;
      },
    };
    const stable = vi.fn();
    const controller = new OpenableController({
      adapter,
      duration: 0.4,
      onStableState: stable,
    });
    const complete = vi.fn();
    const cancel = vi.fn();

    controller.enter({ complete, cancel });
    controller.update(0.2);
    expect(applied).toBeGreaterThan(0);
    expect(applied).toBeLessThan(1);

    controller.update(0.2);
    expect(applied).toBe(1);
    expect(controller.state).toBe("open");
    expect(complete).toHaveBeenCalledTimes(1);
    expect(stable).toHaveBeenLastCalledWith(true);

    controller.enter({ complete, cancel });
    controller.update(0.4);
    expect(applied).toBe(0);
    expect(controller.state).toBe("closed");
    expect(stable).toHaveBeenLastCalledWith(false);
  });

  it("rolls back an in-flight transition on cancel", () => {
    let applied = 0;
    const controller = new OpenableController({
      adapter: {
        apply(value) {
          applied = value;
        },
      },
      duration: 1,
    });
    const cancel = vi.fn();

    controller.enter({ complete: vi.fn(), cancel });
    controller.update(0.35);
    expect(applied).toBeGreaterThan(0);

    expect(controller.requestCancel()).toBe(true);
    expect(applied).toBe(0);
    expect(controller.state).toBe("closed");
    expect(cancel).toHaveBeenCalledTimes(1);
  });
});
