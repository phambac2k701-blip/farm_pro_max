import { describe, expect, it, vi } from "vitest";

import {
  selectInteractionCandidate,
  type InteractionCandidate,
} from "../../src/interaction/InteractionSystem";
import { InteractionStateMachine } from "../../src/interaction/InteractionStateMachine";
import type { InteractableDefinition } from "../../src/interaction/types";

const definition = (
  id: string,
  maxDistance = 2,
  priority = 0,
): InteractableDefinition => ({
  id,
  prompt: `Inspect ${id}`,
  maxDistance,
  priority,
});

describe("selectInteractionCandidate", () => {
  it("selects deterministically by priority, distance, then id", () => {
    const candidates: InteractionCandidate[] = [
      { definition: definition("zeta", 3, 1), distance: 1 },
      { definition: definition("beta", 3, 2), distance: 1.2 },
      { definition: definition("alpha", 3, 2), distance: 1.2 },
    ];

    expect(selectInteractionCandidate(candidates)?.definition.id).toBe(
      "alpha",
    );
  });

  it("rejects candidates beyond their own max range", () => {
    const candidates: InteractionCandidate[] = [
      { definition: definition("far", 1.5, 10), distance: 1.51 },
      { definition: definition("near", 2, 0), distance: 1.8 },
    ];

    expect(selectInteractionCandidate(candidates)?.definition.id).toBe("near");
  });
});

describe("InteractionStateMachine", () => {
  it("locks locomotion while active and restores it on cancel", () => {
    const locomotion = {
      setLocomotionEnabled: vi.fn(),
    };
    const machine = new InteractionStateMachine(locomotion);

    expect(machine.enter(definition("book"))).toBe(true);
    expect(machine.activeInteraction?.id).toBe("book");
    expect(locomotion.setLocomotionEnabled).toHaveBeenLastCalledWith(false);

    expect(machine.cancel()).toBe(true);
    expect(machine.activeInteraction).toBeNull();
    expect(locomotion.setLocomotionEnabled).toHaveBeenLastCalledWith(true);
  });
});
