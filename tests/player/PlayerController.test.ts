import { describe, expect, it } from "vitest";

import {
  InputRouter,
  calculateMovementAxes,
} from "../../src/player/InputRouter";
import { PlayerController } from "../../src/player/PlayerController";

describe("calculateMovementAxes", () => {
  it("normalizes diagonal movement", () => {
    const axes = calculateMovementAxes({
      forward: true,
      backward: false,
      left: false,
      right: true,
    });

    expect(Math.hypot(axes.x, axes.z)).toBeCloseTo(1, 6);
    expect(axes.x).toBeCloseTo(Math.SQRT1_2, 6);
    expect(axes.z).toBeCloseTo(Math.SQRT1_2, 6);
  });

  it("cancels opposing movement inputs", () => {
    const axes = calculateMovementAxes({
      forward: true,
      backward: true,
      left: true,
      right: true,
    });

    expect(axes).toEqual({ x: 0, z: 0 });
  });
});

describe("PlayerController locomotion state", () => {
  it("can disable and restore locomotion without losing input state", () => {
    const input = new InputRouter();
    input.setKeyState("KeyW", true);

    const controller = new PlayerController({
      camera: {} as never,
      input,
      movementSpeed: 2.6,
      mouseSensitivity: 0.0022,
    });

    expect(controller.isLocomotionEnabled).toBe(true);
    expect(input.getMovementAxes().z).toBe(1);

    controller.setLocomotionEnabled(false);
    expect(controller.isLocomotionEnabled).toBe(false);
    expect(input.getMovementAxes().z).toBe(1);

    controller.setLocomotionEnabled(true);
    expect(controller.isLocomotionEnabled).toBe(true);
  });
});
