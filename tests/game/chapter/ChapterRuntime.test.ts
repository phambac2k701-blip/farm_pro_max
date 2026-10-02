import { describe, expect, it } from "vitest";

import { ChapterRuntime } from "../../../src/game/chapter/ChapterRuntime";
import { GameState } from "../../../src/game/state/GameState";

const TEST_CHECKPOINTS = [
  "start",
  "middle",
  "late",
  "complete",
] as const;
type TestCheckpoint = (typeof TEST_CHECKPOINTS)[number];
const COMPLETE_FACT = "test.chapter.complete";

function createRuntime(
  state = new GameState(),
  restoredCheckpoint: TestCheckpoint = "start",
): ChapterRuntime<TestCheckpoint> {
  return new ChapterRuntime({
    state,
    checkpoints: TEST_CHECKPOINTS,
    initialCheckpoint: "start",
    completeCheckpoint: "complete",
    completeFactId: COMPLETE_FACT,
    nextChapterId: "next",
    restoredCheckpoint,
  });
}

describe("ChapterRuntime", () => {
  it("starts at the authored initial checkpoint", () => {
    const runtime = createRuntime();

    expect(runtime.currentCheckpoint).toBe("start");
    expect(runtime.snapshot()).toEqual({ checkpointId: "start" });
  });

  it("advances checkpoints monotonically and idempotently", () => {
    const runtime = createRuntime();

    expect(runtime.reachCheckpoint("late")).toBe(true);
    expect(runtime.currentCheckpoint).toBe("late");
    expect(runtime.reachCheckpoint("middle")).toBe(false);
    expect(runtime.reachCheckpoint("late")).toBe(false);
    expect(runtime.hasReached("middle")).toBe(true);
    expect(runtime.hasReached("complete")).toBe(false);
  });

  it("restores a durable checkpoint without replaying earlier state", () => {
    const runtime = createRuntime(new GameState(), "late");

    expect(runtime.currentCheckpoint).toBe("late");
    expect(runtime.hasReached("middle")).toBe(true);
    expect(runtime.reachCheckpoint("middle")).toBe(false);
  });

  it("completes the chapter exactly once", () => {
    const state = new GameState();
    const runtime = createRuntime(state, "late");

    expect(runtime.completeChapter()).toBe(true);
    expect(runtime.currentCheckpoint).toBe("complete");
    expect(state.getFact(COMPLETE_FACT)).toBe(true);
    expect(state.chapterId).toBe("next");
    expect(runtime.completeChapter()).toBe(false);
  });
});
