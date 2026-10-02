import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { describe, expect, it, vi } from "vitest";

import {
  isOutsidePlayableBounds,
  PlayerSafetyController,
} from "../../src/player/PlayerSafetyController";

const bounds = {
  minX: -9.5,
  maxX: 10,
  minY: -2.5,
  maxY: 6,
  minZ: -33,
  maxZ: 14.5,
};

describe("PlayerSafetyController", () => {
  it("treats impossible vertical or world positions as out of bounds", () => {
    expect(isOutsidePlayableBounds(new Vector3(0, 0, -22), bounds)).toBe(false);
    expect(isOutsidePlayableBounds(new Vector3(0, -3, -22), bounds)).toBe(true);
    expect(isOutsidePlayableBounds(new Vector3(0, 0, -34), bounds)).toBe(true);
    expect(
      isOutsidePlayableBounds(new Vector3(Number.NaN, 0, 0), bounds),
    ).toBe(true);
  });

  it("recovers to the provided durable checkpoint exactly once", () => {
    let feet = new Vector3(0, -4, -25);
    const teleport = vi.fn((next: Vector3) => {
      feet = next.clone();
    });
    const onRecover = vi.fn();
    const controller = new PlayerSafetyController({
      player: {
        getFeetPosition: () => feet.clone(),
        teleport,
      },
      bounds,
      getRecoveryPosition: () => new Vector3(0, 0.01, -22.2),
      onRecover,
    });

    expect(controller.update(1 / 60)).toBe(true);
    expect(teleport).toHaveBeenCalledTimes(1);
    expect(feet).toEqual(new Vector3(0, 0.01, -22.2));
    expect(onRecover).toHaveBeenCalledTimes(1);
    expect(controller.update(1 / 60)).toBe(false);
  });
});
