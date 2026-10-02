import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import { CH01_CHECKPOINTS } from "../../../src/content/chapters/ch01/state";
import { buildChapterOneScene } from "../../../src/content/chapters/ch01/scene/buildChapterOneScene";

describe("Chapter 1 production scene shell", () => {
  it("builds every required production zone and checkpoint anchor", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    const chapter = buildChapterOneScene(scene);

    expect(chapter.spawn.z).toBeLessThan(chapter.gateCenter.z);
    expect(chapter.guardShelterCenter.z).toBeGreaterThan(
      chapter.gateCenter.z,
    );
    expect(chapter.corridorCenter.z).toBeGreaterThan(-8);
    expect(chapter.classroomCenter.x).toBeGreaterThan(
      chapter.corridorCenter.x,
    );
    expect(chapter.paRoomCenter.z).toBeGreaterThan(
      chapter.classroomCenter.z,
    );

    for (const checkpoint of CH01_CHECKPOINTS) {
      expect(chapter.checkpoints[checkpoint]).toBeDefined();
      expect(chapter.checkpoints[checkpoint].name).toBe(
        `checkpoint-${checkpoint}`,
      );
    }

    expect(scene.imageProcessingConfiguration.exposure).toBeCloseTo(
      1.3,
      6,
    );
    const entranceLight = scene.getLightByName("ch01-entrance-light");
    expect(entranceLight?.intensity).toBeCloseTo(0.82, 6);
    expect(entranceLight?.range).toBeCloseTo(16, 6);
    expect(scene.getLightByName("ch01-night-ambient")?.intensity).toBeCloseTo(
      0.68,
      6,
    );
    expect(scene.getLightByName("ch01-classroom-light")?.intensity).toBeCloseTo(
      1.35,
      6,
    );
    expect(scene.getMeshByName("ch01-school-sign")?.rotation.y).toBe(0);

    scene.dispose();
    engine.dispose();
  });

  it("starts with eight PA stations and the ninth variant hidden", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    const chapter = buildChapterOneScene(scene);

    expect(chapter.paStations).toHaveLength(8);
    expect(chapter.paStations.every((station) => station.isEnabled())).toBe(
      true,
    );
    expect(chapter.ninthPaStation.isEnabled()).toBe(false);
    expect(chapter.ninthPaStationCollider.checkCollisions).toBe(true);
    expect(chapter.ninthCable.isEnabled()).toBe(true);
    expect(chapter.paReentryZone.isVisible).toBe(false);
    expect(chapter.paRoomLight.intensity).toBeCloseTo(0.85, 6);
    expect(chapter.paDeskLamp.intensity).toBeCloseTo(0.12, 6);

    scene.dispose();
    engine.dispose();
  });

  it("provides production interaction props without a hero book", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    const chapter = buildChapterOneScene(scene);

    expect(chapter.guardNotebook.isPickable).toBe(true);
    expect(chapter.guardKeyRack.isPickable).toBe(true);
    expect(chapter.flashlight.isPickable).toBe(true);
    expect(chapter.classroomDrawer.isPickable).toBe(true);
    expect(chapter.rosterProp.isPickable).toBe(true);
    expect(chapter.classPhotoProp.isPickable).toBe(true);
    expect(chapter.timetableProp.isPickable).toBe(true);
    expect(chapter.paStationLabelsProp.isPickable).toBe(true);
    expect(chapter.paIndexCardProp.isPickable).toBe(true);
    expect(chapter.ninthHeadsetProp.isPickable).toBe(true);
    expect(chapter.paSpeakerProp.isPickable).toBe(false);
    expect(chapter.corridorExitDoor.leaf.checkCollisions).toBe(true);
    expect(chapter.corridorExitDoor.leaf.isPickable).toBe(false);
    expect(chapter.finalReflectionShoulder.isEnabled()).toBe(false);
    expect(chapter.paStationLabelsInspectionAnchor).toBeDefined();
    expect(chapter.paIndexCardInspectionAnchor).toBeDefined();
    expect(chapter.ninthHeadsetInspectionAnchor).toBeDefined();
    expect(scene.getMeshByName("hero-book")).toBeNull();

    scene.dispose();
    engine.dispose();
  });

  it("marks floors, walls, furniture and open door leaves for collision", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    buildChapterOneScene(scene);
    const colliders = scene.meshes
      .filter((mesh) => mesh.checkCollisions)
      .map((mesh) => mesh.name);

    expect(colliders).toEqual(
      expect.arrayContaining([
        "ch01-yard-ground",
        "ch01-corridor-floor",
        "ch01-corridor-left-wall",
        "ch01-classroom-floor",
        "ch01-classroom-right-wall",
        "ch01-pa-room-floor",
        "ch01-pa-room-right-wall",
        "ch01-side-entrance-door-leaf",
        "ch01-classroom-door-leaf",
        "ch01-pa-room-door-leaf",
        "ch01-corridor-exit-door-leaf",
      ]),
    );
    expect(colliders.length).toBeGreaterThan(25);

    scene.dispose();
    engine.dispose();
  });
});
