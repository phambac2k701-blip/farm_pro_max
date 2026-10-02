import { describe, expect, it, vi } from "vitest";

import {
  CH01_CLIMAX_COMPLETE_FACT,
  CH01_CLIMAX_STEP_FACT,
  ChapterOneClimaxController,
} from "../../../src/content/chapters/ch01/ChapterOneClimaxController";
import { CH01_KCR_A_APPLIED_FACT } from "../../../src/content/chapters/ch01/reality";
import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
} from "../../../src/content/chapters/ch01/state";
import { ChapterRuntime } from "../../../src/game/chapter/ChapterRuntime";
import { GameState } from "../../../src/game/state/GameState";

function createRuntime(state: GameState) {
  return new ChapterRuntime({
    state,
    checkpoints: CH01_CHECKPOINTS,
    initialCheckpoint: CH01_INITIAL_CHECKPOINT,
    completeCheckpoint: CH01_COMPLETE_CHECKPOINT,
    completeFactId: CH01_COMPLETE_FACT,
    nextChapterId: "ch02",
  });
}

function advance(
  controller: ChapterOneClimaxController,
  seconds: number,
): void {
  let remaining = seconds;
  while (remaining > 0) {
    const delta = Math.min(0.05, remaining);
    controller.update(delta);
    remaining -= delta;
  }
}

function createHarness(state: GameState) {
  const events: string[] = [];
  const view = { show: vi.fn(), hide: vi.fn() };
  const inputLock = {
    setLocomotionEnabled: vi.fn(),
    setLookEnabled: vi.fn(),
  };
  const chapterRuntime = createRuntime(state);
  const controller = new ChapterOneClimaxController({
    state,
    chapterRuntime,
    view,
    inputLock,
    playPhoneVibration: () => events.push("vibration"),
    playRelayClick: () => events.push("relay"),
    playKhangLine: () => events.push("khang"),
    onComplete: () => events.push("complete"),
  });
  return {
    controller,
    chapterRuntime,
    events,
    view,
    inputLock,
  };
}

describe("ChapterOneClimaxController", () => {
  it("does not start before KCR-A is applied", () => {
    const state = new GameState();
    const { controller } = createHarness(state);

    expect(controller.start()).toBe(false);
    expect(controller.currentStep).toBe(0);
  });

  it("plays phone -> silence -> relay -> Khang in deterministic order", () => {
    const state = new GameState({
      facts: { [CH01_KCR_A_APPLIED_FACT]: true },
    });
    const {
      controller,
      chapterRuntime,
      events,
      view,
      inputLock,
    } = createHarness(state);

    expect(controller.start()).toBe(true);
    expect(controller.currentStep).toBe(1);
    expect(events).toEqual(["vibration"]);
    expect(view.show).toHaveBeenCalledOnce();
    expect(inputLock.setLookEnabled).toHaveBeenLastCalledWith(false);
    expect(inputLock.setLocomotionEnabled).toHaveBeenLastCalledWith(false);

    expect(controller.handleKey("KeyE")).toBe(true);
    expect(controller.currentStep).toBe(2);
    expect(view.hide).toHaveBeenCalled();
    expect(inputLock.setLookEnabled).toHaveBeenLastCalledWith(true);
    expect(inputLock.setLocomotionEnabled).toHaveBeenLastCalledWith(true);

    advance(controller, 1.14);
    expect(events).toEqual(["vibration"]);
    advance(controller, 0.02);
    expect(controller.currentStep).toBe(3);
    expect(events).toEqual(["vibration", "relay"]);

    advance(controller, 0.46);
    expect(controller.currentStep).toBe(4);
    expect(events).toEqual(["vibration", "relay", "khang"]);

    advance(controller, 2.41);
    expect(controller.currentStep).toBe(5);
    expect(controller.isComplete).toBe(true);
    expect(state.getFact(CH01_CLIMAX_COMPLETE_FACT)).toBe(true);
    expect(chapterRuntime.currentCheckpoint).toBe(
      "ch01_climax_complete",
    );
    expect(events).toEqual([
      "vibration",
      "relay",
      "khang",
      "complete",
    ]);
    expect(controller.complete()).toBe(false);
  });

  it("resumes from a persisted step without replaying finished beats", () => {
    const state = new GameState({
      facts: {
        [CH01_KCR_A_APPLIED_FACT]: true,
        [CH01_CLIMAX_STEP_FACT]: 3,
      },
    });
    const { controller, events, view } = createHarness(state);

    expect(controller.resume()).toBe(true);
    expect(controller.currentStep).toBe(3);
    expect(events).toEqual([]);
    expect(view.show).not.toHaveBeenCalled();

    advance(controller, 0.46);
    expect(events).toEqual(["khang"]);
    advance(controller, 2.41);
    expect(events).toEqual(["khang", "complete"]);
  });

  it("clamps a large focus-gap delta instead of skipping climax beats", () => {
    const state = new GameState({
      facts: { [CH01_KCR_A_APPLIED_FACT]: true },
    });
    const { controller, events } = createHarness(state);

    expect(controller.start()).toBe(true);
    expect(controller.handleKey("KeyE")).toBe(true);

    controller.update(10);

    expect(controller.currentStep).toBe(2);
    expect(events).toEqual(["vibration"]);
  });

  it("does not restart after the climax has completed", () => {
    const state = new GameState({
      facts: {
        [CH01_KCR_A_APPLIED_FACT]: true,
        [CH01_CLIMAX_STEP_FACT]: 5,
        [CH01_CLIMAX_COMPLETE_FACT]: true,
      },
    });
    const { controller } = createHarness(state);

    expect(controller.start()).toBe(false);
    expect(controller.resume()).toBe(false);
    expect(controller.isComplete).toBe(true);
  });
});
