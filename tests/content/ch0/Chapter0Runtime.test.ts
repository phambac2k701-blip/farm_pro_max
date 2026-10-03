import { describe, expect, it } from "vitest";

import {
  Chapter0Runtime,
  type Chapter0NavChoice,
} from "../../../src/content/ch0/Chapter0Runtime";

function reachNavigation(runtime: Chapter0Runtime): void {
  runtime.finishMotherCall();
  runtime.recordWrongBusAttempt();
  runtime.recordWrongBusAttempt();
  runtime.finishDriverEncounter();
  runtime.finishRedLightBeat();
  runtime.boardOutboundBus();
  runtime.resolveFareWithHelper();
  runtime.arriveAtUet();
}

function completeFromNavigation(
  runtime: Chapter0Runtime,
  choice: Chapter0NavChoice,
): void {
  expect(runtime.chooseNavigation(choice)).toBe(true);
  expect(runtime.completeNavigationBranch()).toBe(true);
  expect(runtime.completeAdministrativeBeat()).toBe(true);
  expect(runtime.prepareReturnFare()).toBe(true);
  expect(runtime.boardReturnBus()).toBe(true);
  expect(runtime.finishChapter()).toBe(true);
}

describe("Chapter0Runtime", () => {
  it("completes the default playable route start to end", () => {
    const runtime = new Chapter0Runtime();

    reachNavigation(runtime);
    completeFromNavigation(runtime, "ask_staff");

    expect(runtime.snapshot()).toMatchObject({
      sceneId: "CH0-END",
      navChoice: "ask_staff",
      complete: true,
      returnFarePrepared: true,
    });
    expect(runtime.state.chapterId).toBe("ch01");
    expect(runtime.state.getFact("fact_ch0_complete")).toBe(true);
  });

  it("supports one missed-bus beat without blocking progression", () => {
    const runtime = new Chapter0Runtime();

    runtime.finishMotherCall();
    runtime.recordWrongBusAttempt();
    runtime.recordWrongBusAttempt();
    runtime.finishDriverEncounter();
    runtime.finishRedLightBeat();

    expect(runtime.missFirstValidBus()).toBe(true);
    expect(runtime.missFirstValidBus()).toBe(false);
    expect(runtime.sceneId).toBe("CH0-S03");
    expect(runtime.boardOutboundBus()).toBe(true);
    expect(runtime.sceneId).toBe("CH0-S04");
  });

  it.each<Chapter0NavChoice>([
    "ask_staff",
    "follow_students",
    "self_navigate",
  ])("keeps %s local then reconverges at S07", (choice) => {
    const runtime = new Chapter0Runtime();
    reachNavigation(runtime);

    expect(runtime.chooseNavigation(choice)).toBe(true);
    expect(runtime.snapshot().navChoice).toBe(choice);
    expect(runtime.completeNavigationBranch()).toBe(true);
    expect(runtime.sceneId).toBe("CH0-S07");
  });

  it("requires return-fare preparation after the helper treatment", () => {
    const runtime = new Chapter0Runtime();
    reachNavigation(runtime);

    runtime.chooseNavigation("follow_students");
    runtime.completeNavigationBranch();
    runtime.completeAdministrativeBeat();

    expect(runtime.boardReturnBus()).toBe(false);
    expect(runtime.sceneId).toBe("CH0-S08");
    expect(runtime.prepareReturnFare()).toBe(true);
    expect(runtime.boardReturnBus()).toBe(true);
  });
});
