import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it, vi } from "vitest";

import { CH01_CLIMAX_COMPLETE_FACT } from "../../../src/content/chapters/ch01/ChapterOneClimaxController";
import {
  CH01_FINAL_EXIT_OPENED_FACT,
  CH01_FINAL_REFLECTION_ARMED_FACT,
  CH01_FINAL_REFLECTION_VANISHED_FACT,
  ChapterOneFinaleController,
} from "../../../src/content/chapters/ch01/ChapterOneFinaleController";
import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
} from "../../../src/content/chapters/ch01/state";
import { ChapterRuntime } from "../../../src/game/chapter/ChapterRuntime";
import { GameState } from "../../../src/game/state/GameState";

function createHarness(
  state: GameState,
  restoredCheckpoint = CH01_INITIAL_CHECKPOINT,
) {
  const engine = new NullEngine();
  const scene = new Scene(engine);
  const reflection = MeshBuilder.CreatePlane(
    "reflection",
    { size: 0.5 },
    scene,
  );
  reflection.position.set(0, 1.5, 0);
  reflection.computeWorldMatrix(true);
  reflection.setEnabled(false);

  let cameraPosition = new Vector3(0, 1.5, -2);
  let cameraForward = new Vector3(1, 0, 0);
  const view = { show: vi.fn(), hide: vi.fn() };
  const inputLock = {
    setLocomotionEnabled: vi.fn(),
    setLookEnabled: vi.fn(),
  };
  const onReflectionVanish = vi.fn();
  const onComplete = vi.fn();
  const chapterRuntime = new ChapterRuntime({
    state,
    checkpoints: CH01_CHECKPOINTS,
    initialCheckpoint: CH01_INITIAL_CHECKPOINT,
    completeCheckpoint: CH01_COMPLETE_CHECKPOINT,
    completeFactId: CH01_COMPLETE_FACT,
    nextChapterId: "ch02",
    restoredCheckpoint,
  });
  const controller = new ChapterOneFinaleController({
    state,
    chapterRuntime,
    reflection,
    view,
    inputLock,
    getCameraPosition: () => cameraPosition,
    getCameraForward: () => cameraForward,
    onReflectionVanish,
    onComplete,
  });

  return {
    engine,
    scene,
    reflection,
    controller,
    chapterRuntime,
    view,
    inputLock,
    onReflectionVanish,
    onComplete,
    setCamera(position: Vector3, forward: Vector3) {
      cameraPosition = position;
      cameraForward = forward;
    },
  };
}

describe("ChapterOneFinaleController", () => {
  it("keeps the reflection hidden until the climax is complete and the player is near", () => {
    const state = new GameState();
    const h = createHarness(state);

    h.controller.restore();
    h.controller.update(0.1);
    expect(h.reflection.isEnabled()).toBe(false);
    expect(state.getFact(CH01_FINAL_REFLECTION_ARMED_FACT)).toBeUndefined();

    state.setFact(CH01_CLIMAX_COMPLETE_FACT, true);
    h.setCamera(new Vector3(0, 1.5, -6), new Vector3(0, 0, 1));
    h.controller.update(0.1);
    expect(h.reflection.isEnabled()).toBe(false);

    h.setCamera(new Vector3(0, 1.5, -2), new Vector3(1, 0, 0));
    h.controller.update(0.1);
    expect(state.getFact(CH01_FINAL_REFLECTION_ARMED_FACT)).toBe(true);
    expect(h.reflection.isEnabled()).toBe(true);

    h.scene.dispose();
    h.engine.dispose();
  });

  it("vanishes only after a sustained direct look and fires the relay hook once", () => {
    const state = new GameState({
      facts: { [CH01_CLIMAX_COMPLETE_FACT]: true },
    });
    const h = createHarness(state);

    h.controller.update(0.1);
    expect(h.controller.isReflectionArmed).toBe(true);

    h.setCamera(new Vector3(0, 1.5, -2), new Vector3(0, 0, 1));
    for (let index = 0; index < 4; index += 1) {
      h.controller.update(0.1);
    }
    expect(h.controller.isReflectionVanished).toBe(false);
    expect(h.reflection.isEnabled()).toBe(true);

    h.controller.update(0.1);
    expect(state.getFact(CH01_FINAL_REFLECTION_VANISHED_FACT)).toBe(true);
    expect(h.reflection.isEnabled()).toBe(false);
    expect(h.onReflectionVanish).toHaveBeenCalledOnce();

    h.controller.update(1);
    expect(h.onReflectionVanish).toHaveBeenCalledOnce();

    h.scene.dispose();
    h.engine.dispose();
  });

  it("completes Chapter 1 only after the climax and transitions to the Ch2 boundary once", () => {
    const state = new GameState();
    const h = createHarness(state);

    expect(h.controller.completeChapter()).toBe(false);

    state.setFact(CH01_CLIMAX_COMPLETE_FACT, true);
    expect(h.controller.completeChapter()).toBe(true);
    expect(state.getFact(CH01_FINAL_EXIT_OPENED_FACT)).toBe(true);
    expect(state.getFact(CH01_COMPLETE_FACT)).toBe(true);
    expect(state.chapterId).toBe("ch02");
    expect(h.chapterRuntime.currentCheckpoint).toBe("ch01_complete");
    expect(h.view.show).toHaveBeenCalledOnce();
    expect(h.inputLock.setLocomotionEnabled).toHaveBeenLastCalledWith(false);
    expect(h.inputLock.setLookEnabled).toHaveBeenLastCalledWith(false);
    expect(h.onComplete).toHaveBeenCalledOnce();

    expect(h.controller.completeChapter()).toBe(false);
    expect(h.onComplete).toHaveBeenCalledOnce();

    h.scene.dispose();
    h.engine.dispose();
  });

  it("restores a complete save directly at the boundary without replaying the reflection", () => {
    const state = new GameState({
      chapterId: "ch02",
      facts: {
        [CH01_CLIMAX_COMPLETE_FACT]: true,
        [CH01_COMPLETE_FACT]: true,
        [CH01_FINAL_REFLECTION_ARMED_FACT]: true,
      },
    });
    const h = createHarness(state, "ch01_climax_complete");

    h.controller.restore();

    expect(h.chapterRuntime.currentCheckpoint).toBe("ch01_complete");
    expect(h.reflection.isEnabled()).toBe(false);
    expect(h.view.show).toHaveBeenCalledOnce();
    expect(h.onReflectionVanish).not.toHaveBeenCalled();

    h.scene.dispose();
    h.engine.dispose();
  });
});
