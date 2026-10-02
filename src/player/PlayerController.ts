import "@babylonjs/core/Collisions/collisionCoordinator";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Scene } from "@babylonjs/core/scene";

import { InputRouter } from "./InputRouter";

export interface PlayerControllerOptions {
  camera: FreeCamera;
  input: InputRouter;
  body?: AbstractMesh;
  movementSpeed?: number;
  mouseSensitivity?: number;
  eyeHeight?: number;
  groundStickSpeed?: number;
}

export interface CreatePlayerControllerOptions {
  spawn?: Vector3;
  movementSpeed?: number;
  mouseSensitivity?: number;
  eyeHeight?: number;
}

const MAX_PITCH = Math.PI * 0.49;

export class PlayerController {
  readonly camera: FreeCamera;
  readonly input: InputRouter;

  private readonly body?: AbstractMesh;
  private readonly movementSpeed: number;
  private mouseSensitivity: number;
  private readonly eyeHeight: number;
  private readonly groundStickSpeed: number;
  private locomotionEnabled = true;
  private lookEnabled = true;

  constructor(options: PlayerControllerOptions) {
    this.camera = options.camera;
    this.input = options.input;
    this.body = options.body;
    this.movementSpeed = options.movementSpeed ?? 2.6;
    this.mouseSensitivity = options.mouseSensitivity ?? 0.0022;
    this.eyeHeight = options.eyeHeight ?? 1.65;
    this.groundStickSpeed = options.groundStickSpeed ?? 3;
  }

  static create(
    scene: Scene,
    canvas: HTMLCanvasElement,
    options: CreatePlayerControllerOptions = {},
  ): PlayerController {
    const eyeHeight = options.eyeHeight ?? 1.65;
    const spawn = options.spawn?.clone() ?? new Vector3(0, 0, -5.5);

    scene.collisionsEnabled = true;

    const body = MeshBuilder.CreateBox(
      "player-collision-body",
      { size: 0.2 },
      scene,
    );
    body.position.copyFrom(spawn);
    body.isVisible = false;
    body.isPickable = false;
    body.checkCollisions = true;
    body.ellipsoid = new Vector3(0.35, 0.9, 0.35);
    body.ellipsoidOffset = new Vector3(0, 0.9, 0);

    const camera = new FreeCamera(
      "gameplay-camera",
      spawn.add(new Vector3(0, eyeHeight, 0)),
      scene,
    );
    camera.minZ = 0.05;
    camera.fov = (75 * Math.PI) / 180;
    camera.inertia = 0;
    scene.activeCamera = camera;

    const input = new InputRouter();
    input.attach(canvas);

    return new PlayerController({
      camera,
      input,
      body,
      movementSpeed: options.movementSpeed,
      mouseSensitivity: options.mouseSensitivity,
      eyeHeight,
    });
  }

  get isLocomotionEnabled(): boolean {
    return this.locomotionEnabled;
  }

  get isLookEnabled(): boolean {
    return this.lookEnabled;
  }

  get collisionBody(): AbstractMesh | undefined {
    return this.body;
  }

  setLocomotionEnabled(enabled: boolean): void {
    this.locomotionEnabled = enabled;
  }

  setLookEnabled(enabled: boolean): void {
    this.lookEnabled = enabled;
    if (!enabled) {
      this.input.consumeLookDelta();
    }
  }

  setMouseSensitivity(radiansPerPixel: number): void {
    this.mouseSensitivity = Math.min(
      0.01,
      Math.max(0.0001, radiansPerPixel),
    );
  }

  update(deltaSeconds: number): void {
    const safeDelta = Math.min(Math.max(deltaSeconds, 0), 0.1);
    this.updateLook();

    if (!this.body) {
      return;
    }

    if (this.locomotionEnabled) {
      const axes = this.input.getMovementAxes();
      const yaw = this.camera.rotation.y;
      const forward = new Vector3(Math.sin(yaw), 0, Math.cos(yaw));
      const right = new Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
      const horizontalMovement = forward
        .scale(axes.z)
        .addInPlace(right.scale(axes.x))
        .scaleInPlace(this.movementSpeed * safeDelta);

      if (horizontalMovement.lengthSquared() > 0) {
        this.body.moveWithCollisions(horizontalMovement);
      }
    }

    this.body.moveWithCollisions(
      new Vector3(0, -this.groundStickSpeed * safeDelta, 0),
    );

    this.syncCameraToBody();
  }

  teleport(feetPosition: Vector3): void {
    if (this.body) {
      this.body.position.copyFrom(feetPosition);
      this.body.computeWorldMatrix(true);
    } else {
      this.camera.position.copyFrom(feetPosition);
    }

    this.syncCameraToBody();
    this.input.clearTransientInput();
  }

  getFeetPosition(): Vector3 {
    if (this.body) {
      return this.body.position.clone();
    }

    return this.camera.position.subtract(new Vector3(0, this.eyeHeight, 0));
  }

  dispose(): void {
    this.input.detach();
    this.body?.dispose();
    this.camera.dispose();
  }

  private syncCameraToBody(): void {
    if (!this.body) {
      return;
    }

    this.camera.position.copyFrom(this.body.position);
    this.camera.position.y += this.eyeHeight;
  }

  private updateLook(): void {
    const delta = this.input.consumeLookDelta();
    if (!this.lookEnabled) {
      return;
    }

    this.camera.rotation.y += delta.x * this.mouseSensitivity;
    this.camera.rotation.x = Math.min(
      MAX_PITCH,
      Math.max(
        -MAX_PITCH,
        this.camera.rotation.x + delta.y * this.mouseSensitivity,
      ),
    );
  }
}
