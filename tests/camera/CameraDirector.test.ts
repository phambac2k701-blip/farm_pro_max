import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { describe, expect, it, vi } from "vitest";

import {
  CameraDirector,
  type CameraAnchor,
  type CameraLike,
} from "../../src/camera/CameraDirector";

function createCamera(): CameraLike {
  return {
    position: new Vector3(0, 1.65, 0),
    rotation: new Vector3(0, 0, 0),
    fov: 1.2,
  };
}

const anchor: CameraAnchor = {
  position: new Vector3(1, 1.3, 2),
  rotation: new Vector3(0.45, 0.2, 0),
  fov: 0.9,
};

describe("CameraDirector", () => {
  it("blends to inspection and restores the exact gameplay camera", () => {
    const camera = createCamera();
    const lookLock = { setLookEnabled: vi.fn() };
    const director = new CameraDirector(camera, lookLock);

    expect(director.focus(anchor, { duration: 1 })).toBe(true);
    expect(director.state).toBe("blending");
    expect(lookLock.setLookEnabled).toHaveBeenLastCalledWith(false);

    director.update(0.5);
    expect(camera.position.equals(anchor.position)).toBe(false);

    director.update(0.5);
    expect(director.state).toBe("inspection");
    expect(camera.position.equalsWithEpsilon(anchor.position, 1e-6)).toBe(true);
    expect(camera.fov).toBeCloseTo(anchor.fov ?? 0, 6);

    expect(director.restore({ duration: 1 })).toBe(true);
    expect(director.state).toBe("restoring");
    director.update(1);

    expect(director.state).toBe("gameplay");
    expect(camera.position.equalsWithEpsilon(new Vector3(0, 1.65, 0), 1e-6))
      .toBe(true);
    expect(camera.rotation.equalsWithEpsilon(Vector3.Zero(), 1e-6)).toBe(true);
    expect(camera.fov).toBeCloseTo(1.2, 6);
    expect(lookLock.setLookEnabled).toHaveBeenLastCalledWith(true);
  });

  it("cancels safely during the focus blend", () => {
    const camera = createCamera();
    const lookLock = { setLookEnabled: vi.fn() };
    const director = new CameraDirector(camera, lookLock);

    director.focus(anchor, { duration: 1 });
    director.update(0.25);
    const partial = camera.position.clone();

    expect(partial.equals(new Vector3(0, 1.65, 0))).toBe(false);
    expect(director.cancel({ duration: 0.2 })).toBe(true);
    expect(director.state).toBe("restoring");

    director.update(0.2);

    expect(director.state).toBe("gameplay");
    expect(camera.position.equalsWithEpsilon(new Vector3(0, 1.65, 0), 1e-6))
      .toBe(true);
    expect(lookLock.setLookEnabled).toHaveBeenLastCalledWith(true);
  });

  it("treats repeated cancel during restore as safe and idempotent", () => {
    const camera = createCamera();
    const lookLock = { setLookEnabled: vi.fn() };
    const director = new CameraDirector(camera, lookLock);

    director.focus(anchor, { duration: 0.1 });
    director.update(0.1);
    director.restore({ duration: 0.5 });
    director.update(0.2);

    expect(director.state).toBe("restoring");
    expect(director.cancel({ duration: 0.1 })).toBe(true);
    expect(director.state).toBe("restoring");

    director.update(0.3);

    expect(director.state).toBe("gameplay");
    expect(camera.position.equalsWithEpsilon(new Vector3(0, 1.65, 0), 1e-6))
      .toBe(true);
    expect(lookLock.setLookEnabled).toHaveBeenLastCalledWith(true);
  });
});
