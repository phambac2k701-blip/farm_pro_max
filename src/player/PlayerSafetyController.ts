import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export interface PlayableBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

export interface SafetyPlayer {
  getFeetPosition(): Vector3;
  teleport(feetPosition: Vector3): void;
}

export interface PlayerSafetyControllerOptions {
  player: SafetyPlayer;
  bounds: PlayableBounds;
  getRecoveryPosition: () => Vector3;
  recoveryCooldownSeconds?: number;
  onRecover?: (from: Vector3, to: Vector3) => void;
}

export function isOutsidePlayableBounds(
  position: Vector3,
  bounds: PlayableBounds,
): boolean {
  return (
    !Number.isFinite(position.x) ||
    !Number.isFinite(position.y) ||
    !Number.isFinite(position.z) ||
    position.x < bounds.minX ||
    position.x > bounds.maxX ||
    position.y < bounds.minY ||
    position.y > bounds.maxY ||
    position.z < bounds.minZ ||
    position.z > bounds.maxZ
  );
}

export class PlayerSafetyController {
  private cooldownRemaining = 0;

  constructor(private readonly options: PlayerSafetyControllerOptions) {}

  update(deltaSeconds: number): boolean {
    this.cooldownRemaining = Math.max(
      0,
      this.cooldownRemaining - Math.max(0, deltaSeconds),
    );

    const current = this.options.player.getFeetPosition();
    if (
      this.cooldownRemaining > 0 ||
      !isOutsidePlayableBounds(current, this.options.bounds)
    ) {
      return false;
    }

    const recovery = this.options.getRecoveryPosition().clone();
    this.options.player.teleport(recovery);
    this.cooldownRemaining =
      this.options.recoveryCooldownSeconds ?? 0.75;
    this.options.onRecover?.(current, recovery);
    return true;
  }
}
