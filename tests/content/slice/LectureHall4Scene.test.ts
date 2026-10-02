import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import {
  buildLectureHall4Scene,
  LECTURE_HALL_4_LAYOUT,
} from "../../../src/content/slice/buildLectureHall4Scene";

describe("LectureHall4Scene", () => {
  it("builds the latest user-directed Giang Duong 4 footprint", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    const slice = buildLectureHall4Scene(scene);

    expect(slice.classrooms).toHaveLength(4);
    expect(
      slice.classrooms.map((room) => [
        room.building,
        room.roomKey,
        room.visibleLabel ?? null,
      ]),
    ).toEqual([
      ["A", "A-101", "P 101"],
      ["A", "A-102", "P 102"],
      ["B", "B-TBD-1", null],
      ["B", "B-TBD-2", null],
    ]);

    expect(scene.getMeshByName("gd4-playable-ground")).not.toBeNull();
    expect(scene.getMeshByName("gd4-lane-north")).not.toBeNull();
    expect(scene.getMeshByName("gd4-lane-middle")).not.toBeNull();

    const shelterRoot = scene.getTransformNodeByName(
      "gd4-canteen-shelter-root",
    );
    expect(shelterRoot).not.toBeNull();
    expect(shelterRoot?.position.x).toBeCloseTo(
      LECTURE_HALL_4_LAYOUT.canteen.x,
      6,
    );
    expect(shelterRoot?.position.z).toBeCloseTo(
      LECTURE_HALL_4_LAYOUT.canteen.z,
      6,
    );
    const shelterRoof = scene.getMeshByName("gd4-canteen-shelter-roof");
    expect(shelterRoof).not.toBeNull();
    shelterRoof?.computeWorldMatrix(true);
    const canteenWestWallGap = Math.abs(
      (shelterRoof?.getBoundingInfo().boundingBox.minimumWorld.x ?? 0) -
        LECTURE_HALL_4_LAYOUT.gate.x,
    );
    expect(canteenWestWallGap).toBeLessThan(0.12);
    const canteenSouthWallGap = Math.abs(
      (shelterRoof?.getBoundingInfo().boundingBox.minimumWorld.z ?? 0) -
        -14.05,
    );
    expect(canteenSouthWallGap).toBeLessThan(0.12);
    expect(scene.getMeshByName("gd4-canteen-shelter-post-left-back")).not.toBeNull();
    expect(scene.getMeshByName("gd4-canteen-shelter-post-right-front")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-canteen-sign-root")).toBeNull();

    expect(scene.getMeshByName("gd4-gate-post-south")).not.toBeNull();
    expect(scene.getMeshByName("gd4-gate-post-north")).not.toBeNull();
    expect(scene.getMeshByName("gd4-gate-approach-mark-south")).not.toBeNull();
    const gateOuterCollider = scene.getMeshByName(
      "gd4-gate-approach-collider-outer-limit",
    );
    expect(gateOuterCollider?.visibility).toBe(0);
    expect(gateOuterCollider?.checkCollisions).toBe(true);

    for (const building of ["A", "B"] as const) {
      const parapet = scene.getMeshByName(
        `gd4-${building}-corridor-parapet`,
      );
      expect(parapet).not.toBeNull();
      parapet?.computeWorldMatrix(true);
      expect(
        parapet?.getBoundingInfo().boundingBox.maximumWorld.x ?? 0,
      ).toBeGreaterThanOrEqual(LECTURE_HALL_4_LAYOUT.bounds.maxX);

      expect(
        scene.getMeshByName(`gd4-${building}-upper-floor-batch`),
      ).not.toBeNull();
      expect(
        scene.getMeshByName(`gd4-${building}-upper-masonry-batch`)
          ?.metadata?.totalStoreys,
      ).toBe(5);
      const upperMasonry = scene.getMeshByName(
        `gd4-${building}-upper-masonry-batch`,
      );
      expect(upperMasonry?.metadata?.treatment).toBe(
        "solid-parapet-and-continuous-columns",
      );
      expect(upperMasonry?.metadata?.columnsContinuousToRoof).toBe(true);
      expect(upperMasonry?.metadata?.parapetHeight).toBeCloseTo(1.15, 6);
      const corridorPlinth = scene.getMeshByName(
        `gd4-${building}-corridor-plinth`,
      );
      expect(corridorPlinth).not.toBeNull();
      corridorPlinth?.computeWorldMatrix(true);
      expect(
        corridorPlinth?.getBoundingInfo().boundingBox.minimumWorld.y ?? 1,
      ).toBeCloseTo(0, 6);
      expect(
        corridorPlinth?.getBoundingInfo().boundingBox.maximumWorld.y ?? 0,
      ).toBeCloseTo(0.8, 6);
      const cornerColumn = scene.getMeshByName(
        `gd4-${building}-corridor-corner-column`,
      );
      expect(cornerColumn).not.toBeNull();
      cornerColumn?.computeWorldMatrix(true);
      expect(
        cornerColumn?.getBoundingInfo().boundingBox.maximumWorld.y ?? 0,
      ).toBeGreaterThan(18.7);
      expect(
        scene.getMeshByName(`gd4-${building}-foundation-plinth`),
      ).not.toBeNull();
      for (let step = 1; step <= 5; step += 1) {
        expect(
          scene.getMeshByName(`gd4-${building}-entry-step-${step}`),
        ).not.toBeNull();
      }
      const corridorFloor = scene.getMeshByName(
        `gd4-${building}-corridor-floor`,
      );
      const topStep = scene.getMeshByName(
        `gd4-${building}-entry-step-5`,
      );
      corridorFloor?.computeWorldMatrix(true);
      topStep?.computeWorldMatrix(true);
      expect(
        topStep?.getBoundingInfo().boundingBox.maximumWorld.x ?? 0,
      ).toBeLessThanOrEqual(
        (corridorFloor?.getBoundingInfo().boundingBox.minimumWorld.x ?? 0) +
          0.02,
      );
      expect(
        scene.getMeshByName(`gd4-${building}-entry-landing`),
      ).toBeNull();

      const continuationFloorBatch = scene.getMeshByName(
        `gd4-${building}-continuation-floor-batch`,
      );
      expect(continuationFloorBatch).not.toBeNull();
      expect(continuationFloorBatch?.metadata?.totalStoreys).toBe(5);
      expect(continuationFloorBatch?.metadata?.bayCount).toBe(8);
      expect(continuationFloorBatch?.metadata?.baySpacing).toBeCloseTo(
        8.4,
        6,
      );
      const continuationMasonry = scene.getMeshByName(
        `gd4-${building}-continuation-masonry-batch`,
      );
      expect(continuationMasonry?.metadata?.treatment).toBe(
        "solid-parapet-and-continuous-columns",
      );
      expect(continuationMasonry?.metadata?.columnsContinuousToRoof).toBe(
        true,
      );
      expect(continuationMasonry?.metadata?.parapetHeight).toBeCloseTo(
        1.15,
        6,
      );
    }

    const southBoundaryEast = scene.getMeshByName(
      "gd4-boundary-south-east",
    );
    const southBoundaryWest = scene.getMeshByName(
      "gd4-boundary-south-west",
    );
    const bParapet = scene.getMeshByName("gd4-B-corridor-parapet");
    expect(southBoundaryEast).not.toBeNull();
    expect(southBoundaryWest).not.toBeNull();
    expect(scene.getMeshByName("gd4-boundary-south")).toBeNull();
    southBoundaryEast?.computeWorldMatrix(true);
    bParapet?.computeWorldMatrix(true);
    const southWallToBParapetGap =
      (bParapet?.getBoundingInfo().boundingBox.minimumWorld.z ?? 0) -
      (southBoundaryEast?.getBoundingInfo().boundingBox.maximumWorld.z ?? 0);
    expect(southWallToBParapetGap).toBeGreaterThanOrEqual(0);
    expect(southWallToBParapetGap).toBeLessThan(0.25);

    const aFoundation = scene.getMeshByName("gd4-A-foundation-plinth");
    const aContinuation = scene.getMeshByName(
      "gd4-A-continuation-foundation",
    );
    aFoundation?.computeWorldMatrix(true);
    aContinuation?.computeWorldMatrix(true);
    expect(
      aContinuation?.getBoundingInfo().boundingBox.minimumWorld.x ?? 0,
    ).toBeLessThan(
      aFoundation?.getBoundingInfo().boundingBox.maximumWorld.x ?? 0,
    );

    const eastBoundary = scene.getMeshByName("gd4-boundary-east");
    expect(eastBoundary?.visibility).toBe(0);
    expect(eastBoundary?.checkCollisions).toBe(true);
    eastBoundary?.computeWorldMatrix(true);
    expect(
      eastBoundary?.getBoundingInfo().boundingBox.minimumWorld.y ?? 0,
    ).toBeLessThanOrEqual(-3);
    expect(
      eastBoundary?.getBoundingInfo().boundingBox.maximumWorld.y ?? 0,
    ).toBeGreaterThanOrEqual(8);
    expect(scene.getTransformNodeByName("gd4-building-A-sign-root")).toBeNull();
    expect(scene.getTransformNodeByName("gd4-building-B-sign-root")).toBeNull();
    expect(scene.getMeshByName("gd4-city-block-1")).toBeNull();
    expect(scene.getMeshByName("gd4-background-card-west-south")).not.toBeNull();
    expect(scene.getMeshByName("gd4-background-card-north")?.isEnabled()).toBe(
      false,
    );
    expect(
      scene.getMeshByName("gd4-background-card-east")?.checkCollisions,
    ).toBe(false);
    expect(scene.getMeshByName("gd4-city-road-outside-gate")).not.toBeNull();

    const aRoom = scene.getTransformNodeByName("gd4-room-A-101-root");
    const bRoom = scene.getTransformNodeByName("gd4-room-B-TBD-1-root");
    expect(aRoom?.position.y).toBeCloseTo(0.8, 6);
    expect(bRoom?.position.y).toBeCloseTo(0.8, 6);
    expect(aRoom?.rotation.y).toBeCloseTo(0, 6);
    expect(bRoom?.rotation.y).toBeCloseTo(Math.PI, 6);

    expect(slice.bounds.maxY).toBeLessThan(8);
    expect(slice.spawn.x).toBeGreaterThan(-16.5);
    expect(slice.spawn.x).toBeLessThan(-14);
    expect(slice.bounds.minX).toBe(LECTURE_HALL_4_LAYOUT.bounds.minX);
    expect(slice.bounds.maxX).toBe(LECTURE_HALL_4_LAYOUT.bounds.maxX);
    expect(slice.bounds.minZ).toBe(LECTURE_HALL_4_LAYOUT.bounds.minZ);
    expect(slice.bounds.maxZ).toBe(LECTURE_HALL_4_LAYOUT.bounds.maxZ);

    scene.dispose();
    engine.dispose();
  });

  it("does not instantiate the retired Chapter 1 campus prototype", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    buildLectureHall4Scene(scene);

    const names = scene.meshes.map((mesh) => mesh.name);
    expect(names.some((name) => name.includes("ch01-school"))).toBe(false);
    expect(names.some((name) => name.includes("ch01-guard"))).toBe(false);
    expect(names.some((name) => name.includes("ch01-old-wing"))).toBe(false);
    expect(names.some((name) => name.includes("ch01-pa-"))).toBe(false);

    scene.dispose();
    engine.dispose();
  });
});
