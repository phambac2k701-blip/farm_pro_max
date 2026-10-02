import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import {
  buildLectureHall4Scene,
  LECTURE_HALL_4_LAYOUT,
} from "../../../src/content/slice/buildLectureHall4Scene";

describe("LectureHall4Scene", () => {
  it("builds the user-directed Giang Duong 4 footprint", () => {
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
    expect(scene.getTransformNodeByName("gd4-canteen-shelter-root")).not.toBeNull();
    expect(scene.getMeshByName("gd4-canteen-shelter-roof")).not.toBeNull();
    expect(scene.getMeshByName("gd4-canteen-shelter-post-left-back")).not.toBeNull();
    expect(scene.getMeshByName("gd4-canteen-shelter-post-right-front")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-canteen-sign-root")).toBeNull();
    expect(scene.getMeshByName("gd4-gate-post-south")).not.toBeNull();
    expect(scene.getMeshByName("gd4-gate-post-north")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-gate-approach-outer-limit")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-A-corridor-railing")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-B-corridor-railing")).not.toBeNull();
    expect(scene.getMeshByName("gd4-A-floor-02-slab")).not.toBeNull();
    expect(scene.getMeshByName("gd4-A-floor-03-slab")).not.toBeNull();
    expect(scene.getMeshByName("gd4-B-floor-02-slab")).not.toBeNull();
    expect(scene.getMeshByName("gd4-B-floor-03-slab")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-A-upper-railing-02")).not.toBeNull();
    expect(scene.getTransformNodeByName("gd4-B-upper-railing-03")).not.toBeNull();
    expect(scene.getMeshByName("gd4-A-foundation-plinth")).not.toBeNull();
    expect(scene.getMeshByName("gd4-B-foundation-plinth")).not.toBeNull();
    expect(scene.getMeshByName("gd4-A-continuation-foundation")).not.toBeNull();
    expect(scene.getMeshByName("gd4-parking-roof")).toBeNull();
    expect(scene.getMeshByName("gd4-A-continuation-floor-1")).not.toBeNull();
    expect(scene.getMeshByName("gd4-B-continuation-window-3-8")).not.toBeNull();
    expect(
      scene.getMeshByName("gd4-A-continuation-floor-1")?.checkCollisions,
    ).toBe(false);
    expect(scene.getMeshByName("gd4-city-block-1")).toBeNull();
    expect(scene.getMeshByName("gd4-background-card-west-south")).not.toBeNull();
    expect(scene.getMeshByName("gd4-background-card-north")).not.toBeNull();
    expect(scene.getMeshByName("gd4-background-card-north")?.isEnabled()).toBe(
      false,
    );
    expect(
      scene.getMeshByName("gd4-background-card-east")?.checkCollisions,
    ).toBe(false);
    expect(scene.getMeshByName("gd4-city-road-outside-gate")).not.toBeNull();

    for (const room of slice.classrooms) {
      expect(room.prefab.root.position.y).toBeCloseTo(0.6, 6);
    }
    expect(scene.getMeshByName("gd4-canteen-shelter-roof")?.getAbsolutePosition().y).toBeGreaterThan(
      2.8,
    );

    // The latest user correction keeps upper storeys visual-only.
    expect(slice.bounds.maxY).toBeLessThan(8);
    // Gate-to-building approach must stay compact rather than campus-scale.
    expect(slice.spawn.x).toBeGreaterThan(-16.5);
    expect(slice.spawn.x).toBeLessThan(-14);

    expect(slice.bounds.minX).toBeGreaterThan(LECTURE_HALL_4_LAYOUT.bounds.minX);
    expect(slice.bounds.maxX).toBeLessThan(LECTURE_HALL_4_LAYOUT.bounds.maxX);
    expect(slice.bounds.minZ).toBeGreaterThan(LECTURE_HALL_4_LAYOUT.bounds.minZ);
    expect(slice.bounds.maxZ).toBeLessThan(LECTURE_HALL_4_LAYOUT.bounds.maxZ);

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
