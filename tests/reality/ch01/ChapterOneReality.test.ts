import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it, vi } from "vitest";

import { CH01_EVIDENCE } from "../../../src/content/chapters/ch01/evidence";
import {
  CH01_KCR_A_APPLIED_FACT,
  CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT,
  CH01_KCR_A_LEFT_PA_AFTER_READY_FACT,
  CH01_KCR_A_READY_FACT,
  ChapterOneRealityController,
  createChapterOneRealitySystem,
} from "../../../src/content/chapters/ch01/reality";
import { buildChapterOneScene } from "../../../src/content/chapters/ch01/scene/buildChapterOneScene";
import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
  type ChapterOneCheckpointId,
} from "../../../src/content/chapters/ch01/state";
import { EvidenceSystem } from "../../../src/evidence/EvidenceSystem";
import { ChapterRuntime } from "../../../src/game/chapter/ChapterRuntime";
import { GameState } from "../../../src/game/state/GameState";

function createRuntime(
  state: GameState,
  restoredCheckpoint: ChapterOneCheckpointId = CH01_INITIAL_CHECKPOINT,
) {
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

function createController(
  state: GameState,
  scene: Scene,
  restoredCheckpoint: ChapterOneCheckpointId = CH01_INITIAL_CHECKPOINT,
  onApplied = vi.fn(),
) {
  const chapter = buildChapterOneScene(scene);
  const evidence = new EvidenceSystem(state, CH01_EVIDENCE);
  const chapterRuntime = createRuntime(state, restoredCheckpoint);
  const reality = createChapterOneRealitySystem(state, chapter);
  const controller = new ChapterOneRealityController({
    state,
    evidence,
    chapterRuntime,
    reality,
    onApplied,
  });
  return {
    chapter,
    evidence,
    chapterRuntime,
    controller,
    onApplied,
  };
}

describe("Chapter 1 KCR-A", () => {
  it("requires C03 and C07, then an inside -> leave -> re-entry sequence", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const state = new GameState();
    const { evidence, chapterRuntime, controller, onApplied } =
      createController(state, scene);

    evidence.discover("C03");
    expect(controller.isKnowledgeReady).toBe(false);
    expect(controller.syncReady()).toBe(false);
    expect(controller.markInsideAfterReady()).toBe(false);

    evidence.discover("C07");
    expect(controller.isKnowledgeReady).toBe(true);
    expect(controller.syncReady()).toBe(true);
    expect(state.getFact(CH01_KCR_A_READY_FACT)).toBe(true);
    expect(chapterRuntime.currentCheckpoint).toBe("ch01_kcr_ready");

    expect(controller.tryApplyOnReentry()).toBe(false);
    expect(controller.markInsideAfterReady()).toBe(true);
    expect(
      state.getFact(CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT),
    ).toBe(true);
    expect(controller.tryApplyOnReentry()).toBe(false);

    expect(controller.markLeftAfterReady()).toBe(true);
    expect(
      state.getFact(CH01_KCR_A_LEFT_PA_AFTER_READY_FACT),
    ).toBe(true);
    expect(controller.tryApplyOnReentry()).toBe(true);

    expect(state.getFact(CH01_KCR_A_APPLIED_FACT)).toBe(true);
    expect(chapterRuntime.currentCheckpoint).toBe("ch01_kcr_applied");
    expect(onApplied).toHaveBeenCalledOnce();
    expect(controller.tryApplyOnReentry()).toBe(false);

    scene.dispose();
    engine.dispose();
  });

  it("does not count an earlier PA visit as the required post-ready leave", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const state = new GameState({ evidence: ["C07"] });
    const { evidence, controller } = createController(state, scene);

    expect(controller.markInsideAfterReady()).toBe(false);
    evidence.discover("C03");
    expect(controller.syncReady()).toBe(true);

    expect(controller.markLeftAfterReady()).toBe(false);
    expect(controller.markInsideAfterReady()).toBe(true);
    expect(controller.markLeftAfterReady()).toBe(true);

    scene.dispose();
    engine.dispose();
  });

  it("restores a ready-before-reentry save without revealing the ninth station early", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const state = new GameState({
      evidence: ["C03", "C07"],
      facts: {
        [CH01_KCR_A_READY_FACT]: true,
        [CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT]: true,
        [CH01_KCR_A_LEFT_PA_AFTER_READY_FACT]: true,
      },
    });
    const { chapter, chapterRuntime, controller } = createController(
      state,
      scene,
      "ch01_kcr_ready",
    );

    expect(controller.restore()).toBe(0);
    expect(chapter.ninthPaStation.isEnabled()).toBe(false);
    expect(chapterRuntime.currentCheckpoint).toBe("ch01_kcr_ready");

    expect(controller.tryApplyOnReentry()).toBe(true);
    expect(chapter.ninthPaStation.isEnabled()).toBe(true);
    expect(chapter.ninthPaStationCollider.checkCollisions).toBe(true);

    scene.dispose();
    engine.dispose();
  });

  it("reapplies the persisted ninth station and warm desk lamp after reload", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const state = new GameState({
      evidence: ["C03", "C07"],
      facts: {
        [CH01_KCR_A_READY_FACT]: true,
        [CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT]: true,
        [CH01_KCR_A_LEFT_PA_AFTER_READY_FACT]: true,
        [CH01_KCR_A_APPLIED_FACT]: true,
      },
    });
    const { chapter, chapterRuntime, controller, onApplied } =
      createController(state, scene, "ch01_kcr_ready");

    expect(controller.restore()).toBe(1);
    expect(chapter.ninthPaStation.isEnabled()).toBe(true);
    expect(chapter.ninthPaStationCollider.checkCollisions).toBe(true);
    expect(chapter.paDeskLamp.intensity).toBeCloseTo(0.2, 6);
    expect(chapter.paDeskLamp.diffuse.r).toBeCloseTo(0.9, 6);
    expect(chapterRuntime.currentCheckpoint).toBe("ch01_kcr_applied");
    expect(onApplied).not.toHaveBeenCalled();

    scene.dispose();
    engine.dispose();
  });
});
