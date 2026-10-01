import { describe, expect, it, vi } from "vitest";

import {
  CH01_OPENING_COMPLETE_FACT,
  CH01_OPENING_STEP_FACT,
  ChapterOneOpeningController,
} from "../../../src/content/chapters/ch01/ChapterOneOpeningController";
import {
  CH01_PHOTO_INSPECTED_FACT,
  CH01_ROSTER_INSPECTED_FACT,
  ClassroomEvidenceController,
} from "../../../src/content/chapters/ch01/ClassroomEvidenceController";
import { CH01_EVIDENCE } from "../../../src/content/chapters/ch01/evidence";
import { EvidenceSystem } from "../../../src/evidence/EvidenceSystem";
import { GameState } from "../../../src/game/state/GameState";

describe("ChapterOneOpeningController", () => {
  it("persists message progression and awards C01 only on dismissal", () => {
    const state = new GameState();
    const evidence = new EvidenceSystem(state, CH01_EVIDENCE);
    const view = { show: vi.fn(), update: vi.fn(), hide: vi.fn() };
    const inputLock = {
      setLocomotionEnabled: vi.fn(),
      setLookEnabled: vi.fn(),
    };
    const opening = new ChapterOneOpeningController({
      state,
      evidence,
      view,
      inputLock,
    });

    expect(opening.start()).toBe(true);
    expect(state.getFact(CH01_OPENING_STEP_FACT)).toBe(1);
    expect(evidence.has("C01")).toBe(false);

    opening.update(1.1);
    expect(opening.currentStep).toBe(2);
    opening.update(1.25);
    expect(opening.currentStep).toBe(3);
    expect(opening.handleKey("KeyE")).toBe(true);

    expect(evidence.has("C01")).toBe(true);
    expect(state.getFact(CH01_OPENING_COMPLETE_FACT)).toBe(true);
    expect(inputLock.setLocomotionEnabled).toHaveBeenLastCalledWith(true);
    expect(inputLock.setLookEnabled).toHaveBeenLastCalledWith(true);
  });

  it("resumes a partial opening at the persisted step without replaying from zero", () => {
    const state = new GameState({
      facts: { [CH01_OPENING_STEP_FACT]: 2 },
    });
    const evidence = new EvidenceSystem(state, CH01_EVIDENCE);
    const view = { show: vi.fn(), update: vi.fn(), hide: vi.fn() };
    const opening = new ChapterOneOpeningController({
      state,
      evidence,
      view,
      inputLock: {
        setLocomotionEnabled: vi.fn(),
        setLookEnabled: vi.fn(),
      },
    });

    expect(opening.start()).toBe(true);
    expect(opening.currentStep).toBe(2);
    expect(view.show).toHaveBeenCalledWith(2);
  });
});

describe("ClassroomEvidenceController", () => {
  it("awards C03 on readable roster and C02 only after photo comparison", () => {
    const state = new GameState();
    const evidence = new EvidenceSystem(state, CH01_EVIDENCE);
    let rosterReading = false;
    let photoReading = false;
    const compared = vi.fn();
    const controller = new ClassroomEvidenceController({
      state,
      evidence,
      isRosterReading: () => rosterReading,
      isPhotoReading: () => photoReading,
      onCompared: compared,
    });

    expect(controller.markRosterReadable()).toBe(true);
    expect(state.getFact(CH01_ROSTER_INSPECTED_FACT)).toBe(true);
    expect(evidence.has("C03")).toBe(true);
    expect(controller.canCompare).toBe(false);

    controller.markPhotoReadable();
    expect(state.getFact(CH01_PHOTO_INSPECTED_FACT)).toBe(true);
    expect(controller.canCompare).toBe(true);

    expect(controller.handleKey("KeyC")).toBe(false);
    photoReading = true;
    expect(controller.handleKey("KeyC")).toBe(true);
    expect(evidence.has("C02")).toBe(true);
    expect(compared).toHaveBeenCalledTimes(1);
    expect(controller.handleKey("KeyC")).toBe(false);
  });

  it("keeps optional evidence independent of mandatory comparison flow", () => {
    const state = new GameState();
    const evidence = new EvidenceSystem(state, CH01_EVIDENCE);
    const controller = new ClassroomEvidenceController({
      state,
      evidence,
      isRosterReading: () => true,
      isPhotoReading: () => false,
    });

    controller.markRosterReadable();
    controller.markPhotoReadable();
    expect(evidence.has("C14")).toBe(false);
    expect(controller.handleKey("KeyC")).toBe(true);
    expect(evidence.has("C02")).toBe(true);
  });
});
