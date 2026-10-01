import { describe, expect, it, vi } from "vitest";

import { GameState } from "../../src/game/state/GameState";
import {
  RealitySystem,
  type RealityRuleDefinition,
} from "../../src/reality/RealitySystem";

const rule: RealityRuleDefinition = {
  id: "shift_ch01_ninth_desk",
  requiredEvidence: ["ev_ch01_erased_ninth_line"],
  requiredFacts: {
    fact_ch01_left_classroom_after_clue: true,
  },
  appliedFactId: "reality_ch01_ninth_desk_applied",
};

describe("RealitySystem", () => {
  it("requires all knowledge conditions before a shift is ready", () => {
    const state = new GameState();
    const apply = vi.fn();
    const reality = new RealitySystem(state, [rule], {
      [rule.id]: apply,
    });

    expect(reality.isReady(rule.id)).toBe(false);
    expect(reality.apply(rule.id)).toBe(false);

    state.discoverEvidence("ev_ch01_erased_ninth_line");
    expect(reality.isReady(rule.id)).toBe(false);

    state.setFact("fact_ch01_left_classroom_after_clue", true);
    expect(reality.isReady(rule.id)).toBe(true);
  });

  it("applies a shift once and persists its resolved fact", () => {
    const state = new GameState({
      evidence: ["ev_ch01_erased_ninth_line"],
      facts: {
        fact_ch01_left_classroom_after_clue: true,
      },
    });
    const apply = vi.fn();
    const reality = new RealitySystem(state, [rule], {
      [rule.id]: apply,
    });

    expect(reality.apply(rule.id)).toBe(true);
    expect(apply).toHaveBeenCalledOnce();
    expect(state.getFact(rule.appliedFactId)).toBe(true);

    expect(reality.apply(rule.id)).toBe(false);
    expect(apply).toHaveBeenCalledOnce();
  });

  it("reapplies persisted world variants on scene bootstrap without mutating state", () => {
    const state = new GameState({
      evidence: ["ev_ch01_erased_ninth_line"],
      facts: {
        fact_ch01_left_classroom_after_clue: true,
        reality_ch01_ninth_desk_applied: true,
      },
    });
    const apply = vi.fn();
    const reality = new RealitySystem(state, [rule], {
      [rule.id]: apply,
    });

    expect(reality.syncApplied()).toBe(1);
    expect(apply).toHaveBeenCalledOnce();
    expect(reality.apply(rule.id)).toBe(false);
  });

  it("ignores unknown rule ids", () => {
    const state = new GameState();
    const reality = new RealitySystem(state, [rule]);

    expect(reality.isReady("missing")).toBe(false);
    expect(reality.apply("missing")).toBe(false);
  });
});
