import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { describe, expect, it, vi } from "vitest";

import { CameraDirector } from "../../../src/camera/CameraDirector";
import { InspectionSession } from "../../../src/interaction/inspection/InspectionSession";

describe("InspectionSession", () => {
  it("focuses, becomes readable, then restores before completing", () => {
    const camera = {
      position: new Vector3(0, 1.6, 0),
      rotation: new Vector3(0, 0, 0),
      fov: 1.1,
    };
    const lookLock = {
      setLookEnabled: vi.fn(),
    };
    const director = new CameraDirector(camera, lookLock);
    const view = {
      show: vi.fn(),
      hide: vi.fn(),
    };
    const onReadable = vi.fn();
    const complete = vi.fn();
    const session = new InspectionSession({
      cameraDirector: director,
      anchor: {
        position: new Vector3(1, 1.2, 2),
        rotation: new Vector3(0.2, 0.5, 0),
        fov: 0.72,
      },
      view,
      focusDuration: 0.2,
      restoreDuration: 0.2,
      onReadable,
    });

    expect(
      session.enter({ complete, cancel: vi.fn() }),
    ).toBe(true);

    director.update(0.2);
    session.update(0);
    expect(session.state).toBe("reading");
    expect(view.show).toHaveBeenCalledTimes(1);
    expect(onReadable).toHaveBeenCalledTimes(1);
    expect(complete).not.toHaveBeenCalled();

    expect(session.requestCancel()).toBe(true);
    expect(session.state).toBe("restoring");
    director.update(0.2);
    session.update(0);

    expect(session.state).toBe("idle");
    expect(complete).toHaveBeenCalledTimes(1);
    expect(camera.position).toEqual(new Vector3(0, 1.6, 0));
    expect(camera.rotation).toEqual(new Vector3(0, 0, 0));
    expect(camera.fov).toBeCloseTo(1.1, 6);
    expect(lookLock.setLookEnabled).toHaveBeenLastCalledWith(true);
  });

  it("does not enter while another camera transition owns the camera", () => {
    const camera = {
      position: Vector3.Zero(),
      rotation: Vector3.Zero(),
      fov: 1,
    };
    const director = new CameraDirector(camera);
    director.focus({
      position: new Vector3(1, 1, 1),
      rotation: Vector3.Zero(),
    });

    const session = new InspectionSession({
      cameraDirector: director,
      anchor: {
        position: new Vector3(2, 1, 2),
        rotation: Vector3.Zero(),
      },
      view: {
        show() {},
        hide() {},
      },
    });

    expect(
      session.enter({
        complete: vi.fn(),
        cancel: vi.fn(),
      }),
    ).toBe(false);
  });
});
