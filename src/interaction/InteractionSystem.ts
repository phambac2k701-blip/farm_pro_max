import "@babylonjs/core/Culling/ray";

import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";

import { InteractionStateMachine } from "./InteractionStateMachine";
import type {
  InteractableDefinition,
  InteractionPromptState,
} from "./types";

export interface InteractionCandidate {
  definition: InteractableDefinition;
  distance: number;
}

export type InteractionCancelRequestHandler = () => boolean;

export function selectInteractionCandidate(
  candidates: readonly InteractionCandidate[],
): InteractionCandidate | null {
  const valid = candidates.filter(
    ({ definition, distance }) =>
      Number.isFinite(distance) &&
      distance >= 0 &&
      distance <= definition.maxDistance,
  );

  valid.sort((a, b) => {
    const priorityDelta =
      (b.definition.priority ?? 0) - (a.definition.priority ?? 0);
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    const distanceDelta = a.distance - b.distance;
    if (Math.abs(distanceDelta) > 1e-6) {
      return distanceDelta;
    }

    return a.definition.id.localeCompare(b.definition.id);
  });

  return valid[0] ?? null;
}

export class InteractionSystem {
  private readonly registry = new Map<AbstractMesh, InteractableDefinition>();
  private target: InteractionCandidate | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private inputAttached = false;
  private cancelRequestHandler: InteractionCancelRequestHandler | null = null;

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.repeat) {
      return;
    }

    if (event.code === "KeyE") {
      if (this.tryInteract()) {
        event.preventDefault();
      }
      return;
    }

    if (event.code === "Escape" && this.requestCancel()) {
      event.preventDefault();
    }
  };

  private readonly onPointerLockChange = (): void => {
    if (
      this.stateMachine.activeInteraction &&
      this.canvas &&
      document.pointerLockElement !== this.canvas
    ) {
      this.requestCancel();
    }
  };

  constructor(
    private readonly scene: Scene,
    private readonly camera: Camera,
    private readonly stateMachine: InteractionStateMachine,
  ) {}

  register(
    mesh: AbstractMesh,
    definition: InteractableDefinition,
  ): () => void {
    this.registry.set(mesh, definition);
    mesh.isPickable = true;

    return () => {
      if (this.registry.get(mesh) === definition) {
        this.registry.delete(mesh);
      }
    };
  }

  attachInput(canvas: HTMLCanvasElement): void {
    if (this.inputAttached) {
      this.detachInput();
    }

    this.canvas = canvas;
    this.inputAttached = true;
    window.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("pointerlockchange", this.onPointerLockChange);
  }

  detachInput(): void {
    if (!this.inputAttached) {
      return;
    }

    window.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener(
      "pointerlockchange",
      this.onPointerLockChange,
    );
    this.canvas = null;
    this.inputAttached = false;
  }

  update(): InteractionCandidate | null {
    if (this.stateMachine.activeInteraction) {
      this.target = null;
      return null;
    }

    this.target = this.acquireTarget();
    return this.target;
  }

  get currentTarget(): InteractionCandidate | null {
    return this.target;
  }

  get promptState(): InteractionPromptState {
    if (!this.target || this.stateMachine.activeInteraction) {
      return {
        visible: false,
        text: "",
        interactableId: null,
      };
    }

    return {
      visible: true,
      text: this.target.definition.prompt,
      interactableId: this.target.definition.id,
    };
  }

  get activeInteraction(): InteractableDefinition | null {
    return this.stateMachine.activeInteraction;
  }

  tryInteract(): boolean {
    if (!this.target) {
      return false;
    }

    const entered = this.stateMachine.enter(this.target.definition);
    if (entered) {
      this.target = null;
    }
    return entered;
  }

  cancel(): boolean {
    return this.stateMachine.cancel();
  }

  setCancelRequestHandler(
    handler: InteractionCancelRequestHandler | null,
  ): void {
    this.cancelRequestHandler = handler;
  }

  requestCancel(): boolean {
    if (!this.stateMachine.activeInteraction) {
      return false;
    }

    if (this.cancelRequestHandler?.()) {
      return true;
    }

    return this.cancel();
  }

  dispose(): void {
    this.cancel();
    this.detachInput();
    this.registry.clear();
    this.cancelRequestHandler = null;
    this.target = null;
  }

  private acquireTarget(): InteractionCandidate | null {
    const hits =
      this.scene.multiPickWithRay(this.camera.getForwardRay()) ?? [];

    hits.sort((a, b) => a.distance - b.distance);
    const candidates: InteractionCandidate[] = [];

    for (const hit of hits) {
      if (!hit.hit || !hit.pickedMesh) {
        continue;
      }

      const definition = this.registry.get(hit.pickedMesh);
      if (definition) {
        candidates.push({
          definition,
          distance: hit.distance,
        });
        continue;
      }

      if (
        hit.pickedMesh.isPickable &&
        hit.pickedMesh.isVisible &&
        hit.pickedMesh.visibility > 0
      ) {
        break;
      }
    }

    return selectInteractionCandidate(candidates);
  }
}
