import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export type CameraDirectorState =
  | "gameplay"
  | "blending"
  | "inspection"
  | "restoring";

export interface CameraLike {
  position: Vector3;
  rotation: Vector3;
  fov: number;
}

export interface CameraAnchor {
  position: Vector3;
  rotation: Vector3;
  fov?: number;
}

export interface CameraTransitionOptions {
  duration?: number;
}

export interface LookLock {
  setLookEnabled(enabled: boolean): void;
}

interface CameraSnapshot {
  position: Vector3;
  rotation: Vector3;
  fov: number;
}
interface CameraTransition {
  from: CameraSnapshot;
  to: CameraSnapshot;
  elapsed: number;
  duration: number;
}

const MIN_DURATION = 0.001;

function cloneSnapshot(camera: CameraLike): CameraSnapshot {
  return {
    position: camera.position.clone(),
    rotation: camera.rotation.clone(),
    fov: camera.fov,
  };
}

function snapshotFromAnchor(
  anchor: CameraAnchor,
  fallbackFov: number,
): CameraSnapshot {
  return {
    position: anchor.position.clone(),
    rotation: anchor.rotation.clone(),
    fov: anchor.fov ?? fallbackFov,
  };
}

function shortestAngle(from: number, to: number): number {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

function smoothStep(value: number): number {
  return value * value * (3 - 2 * value);
}
export class CameraDirector {
  state: CameraDirectorState = "gameplay";

  private gameplaySnapshot: CameraSnapshot | null = null;
  private inspectionSnapshot: CameraSnapshot | null = null;
  private transition: CameraTransition | null = null;

  constructor(
    private readonly camera: CameraLike,
    private readonly lookLock?: LookLock,
  ) {}

  focus(
    anchor: CameraAnchor,
    options: CameraTransitionOptions = {},
  ): boolean {
    if (this.state !== "gameplay") {
      return false;
    }

    this.gameplaySnapshot = cloneSnapshot(this.camera);
    this.inspectionSnapshot = snapshotFromAnchor(
      anchor,
      this.camera.fov,
    );
    this.transition = {
      from: cloneSnapshot(this.camera),
      to: this.clone(this.inspectionSnapshot),
      elapsed: 0,
      duration: this.duration(options.duration, 0.45),
    };
    this.state = "blending";
    this.lookLock?.setLookEnabled(false);
    return true;
  }

  restore(options: CameraTransitionOptions = {}): boolean {
    if (this.state === "gameplay" || !this.gameplaySnapshot) {
      return false;
    }

    if (this.state === "restoring") {
      return true;
    }
    this.transition = {
      from: cloneSnapshot(this.camera),
      to: this.clone(this.gameplaySnapshot),
      elapsed: 0,
      duration: this.duration(options.duration, 0.35),
    };
    this.state = "restoring";
    return true;
  }

  cancel(options: CameraTransitionOptions = {}): boolean {
    if (this.state === "gameplay") {
      return false;
    }

    if (this.state === "restoring") {
      return true;
    }

    return this.restore({
      duration: options.duration ?? 0.22,
    });
  }

  update(deltaSeconds: number): void {
    if (this.state === "gameplay") {
      return;
    }

    if (this.state === "inspection") {
      if (this.inspectionSnapshot) {
        this.apply(this.inspectionSnapshot);
      }
      return;
    }

    if (!this.transition) {
      return;
    }

    this.transition.elapsed += Math.max(0, deltaSeconds);
    const linear = Math.min(
      1,
      this.transition.elapsed / this.transition.duration,
    );
    const eased = smoothStep(linear);
    this.applyInterpolated(
      this.transition.from,
      this.transition.to,
      eased,
    );
    if (linear < 1) {
      return;
    }

    this.apply(this.transition.to);
    this.transition = null;

    if (this.state === "blending") {
      this.state = "inspection";
      return;
    }

    this.state = "gameplay";
    this.inspectionSnapshot = null;
    this.gameplaySnapshot = null;
    this.lookLock?.setLookEnabled(true);
  }

  private apply(snapshot: CameraSnapshot): void {
    this.camera.position.copyFrom(snapshot.position);
    this.camera.rotation.copyFrom(snapshot.rotation);
    this.camera.fov = snapshot.fov;
  }

  private applyInterpolated(
    from: CameraSnapshot,
    to: CameraSnapshot,
    amount: number,
  ): void {
    Vector3.LerpToRef(
      from.position,
      to.position,
      amount,
      this.camera.position,
    );

    this.camera.rotation.set(
      from.rotation.x + shortestAngle(from.rotation.x, to.rotation.x) * amount,
      from.rotation.y + shortestAngle(from.rotation.y, to.rotation.y) * amount,
      from.rotation.z + shortestAngle(from.rotation.z, to.rotation.z) * amount,
    );
    this.camera.fov = from.fov + (to.fov - from.fov) * amount;
  }
  private clone(snapshot: CameraSnapshot): CameraSnapshot {
    return {
      position: snapshot.position.clone(),
      rotation: snapshot.rotation.clone(),
      fov: snapshot.fov,
    };
  }

  private duration(value: number | undefined, fallback: number): number {
    if (value === undefined || !Number.isFinite(value)) {
      return fallback;
    }

    return Math.max(MIN_DURATION, value);
  }
}
