import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import {
  CLASSROOM_CHAIRS,
  CLASSROOM_DESKS,
  CLASSROOM_ROOM,
} from "../../../src/art/classroom/ClassroomProductionLayout";
import { CH01_CHECKPOINTS } from "../../../src/content/chapters/ch01/state";
import {
  buildChapterOneScene,
  CH01_WORKING_ROOM_SIGN_LABELS,
} from "../../../src/content/chapters/ch01/scene/buildChapterOneScene";

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
      1.4,
      6,
    );
    const entranceLight = scene.getLightByName("ch01-entrance-light");
    expect(entranceLight?.intensity).toBeCloseTo(1.45, 6);
    expect(entranceLight?.range).toBeCloseTo(19, 6);
    expect(scene.getLightByName("ch01-baseline-ambient")?.intensity).toBeCloseTo(
      1.15,
      6,
    );
    expect(scene.getLightByName("ch01-classroom-light")?.intensity).toBeCloseTo(
      1.65,
      6,
    );
    expect(scene.getTransformNodeByName("ch01-school-sign-root")?.rotation.y).toBe(0);
    expect(scene.getTransformNodeByName("ch01-old-wing-sign-root")?.rotation.y).toBe(0);
    expect(scene.getTransformNodeByName("ch01-classroom-sign-root")?.rotation.y).toBeCloseTo(0, 6);
    expect(scene.getTransformNodeByName("ch01-pa-room-sign-root")?.rotation.y).toBeCloseTo(Math.PI / 2, 6);
    expect(scene.getMeshByName("ch01-school-sign-backing")).not.toBeNull();
    expect(scene.getMeshByName("ch01-school-sign")?.material?.backFaceCulling).toBe(true);
    expect(CH01_WORKING_ROOM_SIGN_LABELS).toEqual({
      classroom: "P 202",
      adjacentRoom: "P 204",
    });
    expect(
      scene.getMeshByName(
        "ch01-v2-classroom-door-opening-header-infill",
      )?.checkCollisions,
    ).toBe(true);
    expect(chapter.studentDesks).toHaveLength(30);
    expect(CLASSROOM_DESKS).toHaveLength(30);
    expect(CLASSROOM_CHAIRS).toHaveLength(60);
    expect(new Set(CLASSROOM_DESKS.map((desk) => desk.row)).size).toBe(10);
    for (const row of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const desks = CLASSROOM_DESKS.filter((desk) => desk.row === row);
      expect(desks).toHaveLength(3);
      expect(desks[1]!.z - desks[0]!.z).toBeGreaterThan(2);
      expect(desks[2]!.z - desks[1]!.z).toBeGreaterThan(2);
      expect(
        desks.every((desk) => desk.rotationY === Math.PI / 2),
      ).toBe(true);
    }
    expect(CLASSROOM_ROOM.maxX - CLASSROOM_ROOM.minX).toBeGreaterThan(16);
    expect(CLASSROOM_ROOM.height).toBeCloseTo(4.2, 6);
    expect(
      scene.getMeshByName("ch01-student-desk-1-collider")?.isVisible,
    ).toBe(false);
    expect(
      scene.getMeshByName("ch01-student-desk-30-collider")?.checkCollisions,
    ).toBe(true);
    expect(
      scene.getMeshByName("ch01-student-chair-60-collider")?.checkCollisions,
    ).toBe(true);

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
    expect(chapter.paRoomLight.intensity).toBeCloseTo(1.75, 6);
    expect(chapter.paDeskLamp.intensity).toBeCloseTo(0.45, 6);
    expect(chapter.paKcrAccentLight.intensity).toBeCloseTo(0.02, 6);

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
        "ch01-classroom-front-wall",
        "ch01-classroom-left-wall-front",
        "ch01-classroom-right-wall-front",
        "ch01-student-desk-30-collider",
        "ch01-student-chair-60-collider",
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
