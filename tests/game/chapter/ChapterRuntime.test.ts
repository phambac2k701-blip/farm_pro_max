import { describe, expect, it } from "vitest";

import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
} from "../../../src/content/chapters/ch01/state";
import { ChapterRuntime } from "../../../src/game/chapter/ChapterRuntime";
import { GameState } from "../../../src/game/state/GameState";

function createRuntime(
  state = new GameState(),
  restoredCheckpoint = CH01_INITIAL_CHECKPOINT,
): ChapterRuntime<(typeof CH01_CHECKPOINTS)[number]> {
  return new ChapterRuntime({
    state,
    checkpoints: CH01_CHECKPOINTS,
    initialCheckpoint: CH01_INITIAL_CHECKPOINT,
    completeCheckpoint: CH01_COMPLETE_CHECKPOINT,
    completeFactId: CH01_COMPLETE_FACT,
    nextChapterId: "ch02",
    restoredCheckpoint,
  });
}

describe("ChapterRuntime", () => {
  it("starts at the authored initial checkpoint", () => {
    const runtime = createRuntime();

    expect(runtime.currentCheckpoint).toBe("ch01_gate");
    expect(runtime.snapshot()).toEqual({
      checkpointId: "ch01_gate",
    });
  });

  it("advances checkpoints monotonically and idempotently", () => {
    const runtime = createRuntime();

    expect(runtime.reachCheckpoint("ch01_classroom_pre_roster")).toBe(
      true,
    );
    expect(runtime.currentCheckpoint).toBe(
      "ch01_classroom_pre_roster",
    );

    expect(runtime.reachCheckpoint("ch01_inside_old_wing")).toBe(
      false,
    );
    expect(
      runtime.reachCheckpoint("ch01_classroom_pre_roster"),
    ).toBe(false);
    expect(runtime.currentCheckpoint).toBe(
      "ch01_classroom_pre_roster",
    );
    expect(runtime.hasReached("ch01_inside_old_wing")).toBe(true);
    expect(runtime.hasReached("ch01_pa_pre_c07")).toBe(false);
  });

  it("restores a durable checkpoint without replaying earlier state", () => {
    const runtime = createRuntime(
      new GameState(),
      "ch01_kcr_applied",
    );

    expect(runtime.currentCheckpoint).toBe("ch01_kcr_applied");
    expect(runtime.hasReached("ch01_kcr_ready")).toBe(true);
    expect(runtime.reachCheckpoint("ch01_kcr_ready")).toBe(false);
  });

  it("completes the chapter exactly once", () => {
    const state = new GameState();
    const runtime = createRuntime(state, "ch01_climax_complete");

    expect(runtime.completeChapter()).toBe(true);
    expect(runtime.currentCheckpoint).toBe("ch01_complete");
    expect(state.getFact(CH01_COMPLETE_FACT)).toBe(true);
    expect(state.chapterId).toBe("ch02");

    expect(runtime.completeChapter()).toBe(false);
  });
});
