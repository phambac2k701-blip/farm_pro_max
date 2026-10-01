import { describe, expect, it, vi } from "vitest";

import { GameEvents } from "../../../src/game/events/GameEvents";
import { GameState } from "../../../src/game/state/GameState";

describe("GameState", () => {
  it("stores facts and emits only meaningful fact changes", () => {
    const events = new GameEvents();
    const onFactChanged = vi.fn();
    events.on("fact-changed", onFactChanged);
    const state = new GameState({ events });

    expect(state.getFact("fact_power_on")).toBeUndefined();
    expect(state.setFact("fact_power_on", true)).toBe(true);
    expect(state.getFact("fact_power_on")).toBe(true);
    expect(state.setFact("fact_power_on", true)).toBe(false);
    expect(state.setFact("fact_power_on", false)).toBe(true);

    expect(onFactChanged).toHaveBeenCalledTimes(2);
    expect(onFactChanged).toHaveBeenNthCalledWith(1, {
      type: "fact-changed",
      factId: "fact_power_on",
      previous: undefined,
      value: true,
    });
    expect(onFactChanged).toHaveBeenNthCalledWith(2, {
      type: "fact-changed",
      factId: "fact_power_on",
      previous: true,
      value: false,
    });
  });

  it("discovers evidence idempotently and emits one discovery event", () => {
    const events = new GameEvents();
    const onEvidence = vi.fn();
    events.on("evidence-discovered", onEvidence);
    const state = new GameState({ events });

    expect(state.discoverEvidence("ev_ch01_attendance")).toBe(true);
    expect(state.hasEvidence("ev_ch01_attendance")).toBe(true);
    expect(state.discoverEvidence("ev_ch01_attendance")).toBe(false);
    expect(state.listEvidence()).toEqual(["ev_ch01_attendance"]);

    expect(onEvidence).toHaveBeenCalledOnce();
    expect(onEvidence).toHaveBeenCalledWith({
      type: "evidence-discovered",
      evidenceId: "ev_ch01_attendance",
    });
  });

  it("tracks chapter changes and can unsubscribe event handlers", () => {
    const events = new GameEvents();
    const onChapter = vi.fn();
    const unsubscribe = events.on("chapter-changed", onChapter);
    const state = new GameState({ events, chapterId: "ch01" });

    expect(state.chapterId).toBe("ch01");
    expect(state.setChapter("ch02")).toBe(true);
    expect(state.setChapter("ch02")).toBe(false);
    unsubscribe();
    expect(state.setChapter("ch03")).toBe(true);

    expect(onChapter).toHaveBeenCalledOnce();
    expect(onChapter).toHaveBeenCalledWith({
      type: "chapter-changed",
      previous: "ch01",
      chapterId: "ch02",
    });
  });
});
