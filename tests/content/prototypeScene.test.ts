import { NullEngine } from "@babylonjs/core/Engines/nullEngine";
import { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import { buildChapterOnePrototypeScene } from "../../src/content/chapters/ch01/prototypeScene";

describe("chapter one prototype scene", () => {
  it("builds the expected graybox landmarks", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    const prototype = buildChapterOnePrototypeScene(scene);

    expect(prototype.studentDesks).toHaveLength(8);
    expect(prototype.book.name).toBe("hero-book");
    expect(prototype.bookAnchor.position.equals(prototype.book.position)).toBe(
      true,
    );
    expect(prototype.spawn.z).toBeLessThan(-5);

    scene.dispose();
    engine.dispose();
  });

  it("marks structural geometry for collision", () => {
    const engine = new NullEngine();
    const scene = new Scene(engine);

    buildChapterOnePrototypeScene(scene);
    const colliders = scene.meshes.filter((mesh) => mesh.checkCollisions);

    expect(colliders.map((mesh) => mesh.name)).toEqual(
      expect.arrayContaining([
        "corridor-floor",
        "corridor-left-wall",
        "classroom-floor",
        "classroom-right-wall",
        "classroom-back-wall",
      ]),
    );
    expect(colliders.length).toBeGreaterThan(15);

    scene.dispose();
    engine.dispose();
  });
});
