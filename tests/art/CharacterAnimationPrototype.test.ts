import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import {
  CHARACTER_ANIMATION_CLIP_IDS,
  createCharacterAnimationPrototype,
} from "../../src/art/character/prototype/CharacterAnimationPrototype";
import { CHARACTER_PROTOTYPE_SEQUENCE } from "../../src/art/character/prototype/CharacterAnimationController";

function vectorComponents(value: unknown): [number, number, number] | null {
  if (!(value instanceof Vector3)) {
    return null;
  }
  return [value.x, value.y, value.z];
}

describe("Character Animation Prototype V0", () => {
  it("builds a lightweight 18-bone humanoid mannequin with one material", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    const rig = createCharacterAnimationPrototype(scene);

    expect(rig.metrics.boneCount).toBe(18);
    expect(rig.metrics.meshCount).toBe(15);
    expect(rig.metrics.materialCount).toBe(1);
    expect(rig.metrics.clipCount).toBe(6);
    expect(rig.metrics.vertexCount).toBeGreaterThan(0);
    expect(rig.metrics.triangleCount).toBeGreaterThan(0);
    expect(rig.metrics.vertexCount).toBeLessThan(2000);
    expect(rig.metrics.triangleCount).toBeLessThan(3000);

    expect(rig.skeleton.bones.map((bone) => bone.name)).toEqual([
      "char-v0-bone-root",
      "char-v0-bone-pelvis",
      "char-v0-bone-spine",
      "char-v0-bone-chest",
      "char-v0-bone-neck",
      "char-v0-bone-head",
      "char-v0-bone-leftUpperArm",
      "char-v0-bone-leftLowerArm",
      "char-v0-bone-leftHand",
      "char-v0-bone-rightUpperArm",
      "char-v0-bone-rightLowerArm",
      "char-v0-bone-rightHand",
      "char-v0-bone-leftUpperLeg",
      "char-v0-bone-leftLowerLeg",
      "char-v0-bone-leftFoot",
      "char-v0-bone-rightUpperLeg",
      "char-v0-bone-rightLowerLeg",
      "char-v0-bone-rightFoot",
    ]);

    expect(rig.root.position.asArray()).toEqual([0, 0, 0]);
    expect(rig.root.scaling.asArray()).toEqual([1, 1, 1]);
    expect(rig.joints.pelvis.position.y).toBeCloseTo(0.95, 6);

    for (const mesh of rig.meshes) {
      mesh.computeWorldMatrix(true);
    }
    const maxY = Math.max(
      ...rig.meshes.map(
        (mesh) => mesh.getBoundingInfo().boundingBox.maximumWorld.y,
      ),
    );
    const minY = Math.min(
      ...rig.meshes.map(
        (mesh) => mesh.getBoundingInfo().boundingBox.minimumWorld.y,
      ),
    );
    expect(maxY - minY).toBeGreaterThan(1.65);
    expect(maxY - minY).toBeLessThan(1.9);

    rig.dispose();
    scene.dispose();
    engine.dispose();
  });

  it("registers exactly the six approved clips with correct loop semantics", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const rig = createCharacterAnimationPrototype(scene);

    expect([...rig.clips.keys()]).toEqual([...CHARACTER_ANIMATION_CLIP_IDS]);
    expect(
      Object.fromEntries(
        [...rig.clips].map(([id, clip]) => [id, clip.loop]),
      ),
    ).toEqual({
      anim_char_idle_loop: true,
      anim_char_walk_loop: true,
      anim_char_turn_in_place: false,
      anim_char_sit_down: false,
      anim_char_seated_idle_loop: true,
      anim_char_stand_up: false,
    });

    for (const clip of rig.clips.values()) {
      expect(clip.group.targetedAnimations.length).toBeGreaterThan(0);
      if (!clip.loop) {
        continue;
      }

      for (const targeted of clip.group.targetedAnimations) {
        const keys = targeted.animation.getKeys();
        expect(keys.length).toBeGreaterThanOrEqual(2);
        expect(vectorComponents(keys[0]?.value)).toEqual(
          vectorComponents(keys.at(-1)?.value),
        );
      }
    }

    rig.dispose();
    scene.dispose();
    engine.dispose();
  });

  it("keeps gameplay root translation out of all six clips", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const rig = createCharacterAnimationPrototype(scene);

    for (const clip of rig.clips.values()) {
      const rootTracks = clip.group.targetedAnimations.filter(
        (targeted) => targeted.target === rig.root,
      );
      for (const targeted of rootTracks) {
        expect(targeted.animation.targetProperty).not.toBe("position");
      }
    }

    const turn = rig.clips.get("anim_char_turn_in_place");
    const turnRootRotation = turn?.group.targetedAnimations.find(
      (targeted) =>
        targeted.target === rig.root &&
        targeted.animation.targetProperty === "rotation",
    );
    expect(turnRootRotation).toBeDefined();

    rig.dispose();
    scene.dispose();
    engine.dispose();
  });

  it("shares a stable seated foundation between sit, seated idle and stand", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    const rig = createCharacterAnimationPrototype(scene);

    rig.applySeatedPose();
    expect(rig.root.position.asArray()).toEqual([0, 0, 0]);
    expect(rig.joints.pelvis.position.y).toBeCloseTo(0.62, 6);
    expect(rig.joints.leftUpperLeg.rotation.x).toBeCloseTo(-1.45, 6);
    expect(rig.joints.rightUpperLeg.rotation.x).toBeCloseTo(-1.45, 6);
    expect(rig.joints.leftLowerLeg.rotation.x).toBeCloseTo(1.45, 6);
    expect(rig.joints.rightLowerLeg.rotation.x).toBeCloseTo(1.45, 6);

    rig.applyStandingPose();
    expect(rig.root.position.asArray()).toEqual([0, 0, 0]);
    expect(rig.joints.pelvis.position.y).toBeCloseTo(0.95, 6);
    expect(rig.joints.leftUpperLeg.rotation.x).toBeCloseTo(0, 6);
    expect(rig.joints.leftLowerLeg.rotation.x).toBeCloseTo(0, 6);

    rig.dispose();
    scene.dispose();
    engine.dispose();
  });

  it("advances the turn one-shot to a clean completion", async () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);
    new FreeCamera("char-v0-test-camera", new Vector3(0, 1, -3), scene);
    const rig = createCharacterAnimationPrototype(scene);
    const turn = rig.clips.get("anim_char_turn_in_place");
    expect(turn).toBeDefined();

    turn?.group.start(false, 1, 0, 45);
    for (let frame = 0; frame < 60; frame += 1) {
      scene.render();
      await new Promise((resolve) => setTimeout(resolve, 16));
    }

    expect(turn?.group.isStarted).toBe(false);
    expect(rig.root.position.asArray()).toEqual([0, 0, 0]);
    expect(rig.root.rotation.y).toBeCloseTo(Math.PI / 2, 3);

    rig.dispose();
    scene.dispose();
    engine.dispose();
  });

  it("locks the required automatic proof sequence and nothing beyond it", () => {
    expect([...CHARACTER_PROTOTYPE_SEQUENCE]).toEqual([
      "anim_char_idle_loop",
      "anim_char_walk_loop",
      "anim_char_idle_loop",
      "anim_char_turn_in_place",
      "anim_char_idle_loop",
      "anim_char_sit_down",
      "anim_char_seated_idle_loop",
      "anim_char_stand_up",
      "anim_char_idle_loop",
    ]);
    expect(new Set(CHARACTER_PROTOTYPE_SEQUENCE)).toEqual(
      new Set(CHARACTER_ANIMATION_CLIP_IDS),
    );
  });
});
