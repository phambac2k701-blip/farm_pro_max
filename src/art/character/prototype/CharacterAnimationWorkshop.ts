import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Scene } from "@babylonjs/core/scene";

import { EngineAdapter } from "../../../engine/EngineAdapter";
import {
  CHARACTER_ANIMATION_CLIP_IDS,
  type CharacterAnimationClipId,
  createCharacterAnimationPrototype,
} from "./CharacterAnimationPrototype";
import {
  CharacterAnimationController,
  type CharacterSequenceReport,
} from "./CharacterAnimationController";

export const CHARACTER_ANIMATION_WORKSHOP_QUERY =
  "character-animation-v0";

export interface CharacterAnimationWorkshopDebug {
  scene: Scene;
  controller: CharacterAnimationController;
  rig: ReturnType<typeof createCharacterAnimationPrototype>;
  runSequence(): Promise<CharacterSequenceReport>;
}

const CLIP_KEYS = new Map<string, CharacterAnimationClipId>([
  ["Digit1", "anim_char_idle_loop"],
  ["Digit2", "anim_char_walk_loop"],
  ["Digit3", "anim_char_turn_in_place"],
  ["Digit4", "anim_char_sit_down"],
  ["Digit5", "anim_char_seated_idle_loop"],
  ["Digit6", "anim_char_stand_up"],
]);

function createHud(): HTMLElement {
  const existing = document.querySelector<HTMLElement>(
    "#character-workshop-hud",
  );
  if (existing) {
    return existing;
  }

  const hud = document.createElement("aside");
  hud.id = "character-workshop-hud";
  hud.innerHTML = [
    "<strong>Character Animation Prototype V0</strong>",
    '<span data-char-hud="state"></span>',
    '<span data-char-hud="sequence"></span>',
    '<span data-char-hud="metrics"></span>',
    "<small>1 Idle · 2 Walk · 3 Turn · 4 Sit · 5 Seated Idle · 6 Stand · Space sequence · R reset</small>",
  ].join("");
  document.body.appendChild(hud);
  return hud;
}

function updateHud(
  hud: HTMLElement,
  canvas: HTMLCanvasElement,
): void {
  const state = hud.querySelector<HTMLElement>('[data-char-hud="state"]');
  const sequence = hud.querySelector<HTMLElement>(
    '[data-char-hud="sequence"]',
  );
  const metrics = hud.querySelector<HTMLElement>(
    '[data-char-hud="metrics"]',
  );

  if (state) {
    state.textContent = "Clip: " + (canvas.dataset.characterClip ?? "none");
  }
  if (sequence) {
    sequence.textContent =
      "Sequence: " + (canvas.dataset.characterSequence ?? "idle");
  }
  if (metrics) {
    metrics.textContent =
      "Rig: " +
      (canvas.dataset.characterBones ?? "?") +
      " bones · " +
      (canvas.dataset.characterMeshes ?? "?") +
      " meshes · " +
      (canvas.dataset.characterVertices ?? "?") +
      " verts · " +
      (canvas.dataset.characterTriangles ?? "?") +
      " tris";
  }
}

export async function bootstrapCharacterAnimationWorkshop(
  canvas: HTMLCanvasElement,
  fatalError: HTMLDivElement,
  interactionPrompt: HTMLDivElement,
  reticle: HTMLDivElement,
): Promise<void> {
  const engineAdapter = await EngineAdapter.create(canvas);
  const scene = new Scene(engineAdapter.engine);
  scene.clearColor.set(0.74, 0.79, 0.8, 1);

  const camera = new ArcRotateCamera(
    "char-v0-workshop-camera",
    -Math.PI * 0.25,
    1.16,
    3.7,
    new Vector3(0, 0.9, 0),
    scene,
  );
  camera.lowerRadiusLimit = 2.2;
  camera.upperRadiusLimit = 6;
  camera.wheelPrecision = 45;
  camera.attachControl(canvas, true);

  const hemi = new HemisphericLight(
    "char-v0-workshop-hemi",
    new Vector3(0, 1, 0),
    scene,
  );
  hemi.intensity = 1.05;

  const key = new DirectionalLight(
    "char-v0-workshop-key",
    new Vector3(-0.5, -1, 0.6),
    scene,
  );
  key.position.set(2.5, 4, -2);
  key.intensity = 0.65;

  const groundMaterial = new StandardMaterial(
    "char-v0-workshop-ground-material",
    scene,
  );
  groundMaterial.diffuseColor = new Color3(0.52, 0.54, 0.5);
  groundMaterial.specularColor = Color3.Black();

  const ground = MeshBuilder.CreateGround(
    "char-v0-workshop-ground",
    { width: 5, height: 5, subdivisions: 1 },
    scene,
  );
  ground.material = groundMaterial;
  ground.isPickable = false;

  const seatMaterial = new StandardMaterial(
    "char-v0-workshop-seat-material",
    scene,
  );
  seatMaterial.diffuseColor = new Color3(0.28, 0.3, 0.32);
  seatMaterial.specularColor = Color3.Black();

  const seatAnchor = new TransformNode("char-v0-seat-anchor", scene);
  seatAnchor.position.set(0, 0.5, 0);
  seatAnchor.rotation.y = Math.PI / 2;

  const seat = MeshBuilder.CreateBox(
    "char-v0-seat-debug",
    { width: 0.5, height: 0.08, depth: 0.44 },
    scene,
  );
  seat.parent = seatAnchor;
  seat.position.set(0, -0.04, 0);
  seat.material = seatMaterial;
  seat.isPickable = false;

  const seatBack = MeshBuilder.CreateBox(
    "char-v0-seat-back-debug",
    { width: 0.5, height: 0.5, depth: 0.05 },
    scene,
  );
  seatBack.parent = seatAnchor;
  seatBack.position.set(0, 0.23, -0.205);
  seatBack.material = seatMaterial;
  seatBack.isPickable = false;

  const forwardLine = MeshBuilder.CreateLines(
    "char-v0-forward-axis",
    {
      points: [
        new Vector3(0, 0.015, 0.2),
        new Vector3(0, 0.015, 1.1),
      ],
    },
    scene,
  );
  forwardLine.color = new Color3(0.18, 0.3, 0.38);
  forwardLine.isPickable = false;

  const rig = createCharacterAnimationPrototype(scene);
  const hud = createHud();

  const controller = new CharacterAnimationController(rig, {
    onStateChange: (id) => {
      canvas.dataset.characterClip = id ?? "none";
      updateHud(hud, canvas);
    },
    onSequenceStatus: (status) => {
      canvas.dataset.characterSequence = status;
      updateHud(hud, canvas);
    },
  });

  canvas.dataset.renderBackend = engineAdapter.backend;
  canvas.dataset.sceneReady = "character-animation-workshop-v0";
  canvas.dataset.currentMap = "character-animation-workshop";
  canvas.dataset.characterBones = String(rig.metrics.boneCount);
  canvas.dataset.characterMeshes = String(rig.metrics.meshCount);
  canvas.dataset.characterVertices = String(rig.metrics.vertexCount);
  canvas.dataset.characterTriangles = String(rig.metrics.triangleCount);
  canvas.dataset.characterMaterials = String(rig.metrics.materialCount);
  canvas.dataset.characterClips = String(rig.metrics.clipCount);
  canvas.dataset.characterSequence = "idle";
  canvas.dataset.characterClip = "none";
  interactionPrompt.hidden = true;
  reticle.hidden = true;
  fatalError.hidden = true;
  updateHud(hud, canvas);

  const runSequence = async (): Promise<CharacterSequenceReport> => {
    canvas.dataset.characterSequence = "running";
    updateHud(hud, canvas);
    try {
      const report = await controller.runPrototypeSequence();
      canvas.dataset.characterSequence = report.status;
      canvas.dataset.characterRootDrift = report.rootDrift.toFixed(6);
      canvas.dataset.characterFinalYaw = report.finalRootYaw.toFixed(6);
      canvas.dataset.characterFinalPelvisY = report.finalPelvisY.toFixed(6);
      canvas.dataset.characterHistory = report.history.join(">");
      updateHud(hud, canvas);
      return report;
    } catch (error) {
      canvas.dataset.characterSequence = "failed";
      updateHud(hud, canvas);
      throw error;
    }
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (controller.currentSequenceStatus === "running") {
      if (event.code === "Space") {
        event.preventDefault();
      }
      return;
    }

    if (event.code === "Space") {
      event.preventDefault();
      void runSequence().catch((error) => console.error(error));
      return;
    }
    if (event.code === "KeyR") {
      controller.resetStanding();
      canvas.dataset.characterSequence = "idle";
      updateHud(hud, canvas);
      return;
    }

    const clipId = CLIP_KEYS.get(event.code);
    if (clipId) {
      void controller.preview(clipId).catch((error) => console.error(error));
    }
  };
  window.addEventListener("keydown", onKeyDown);

  if (import.meta.env.DEV) {
    const debugWindow = window as typeof window & {
      __CHAR_ANIM_DEBUG__?: CharacterAnimationWorkshopDebug;
    };
    debugWindow.__CHAR_ANIM_DEBUG__ = {
      scene,
      controller,
      rig,
      runSequence,
    };
  }

  engineAdapter.run(() => {
    scene.render();
  });

  window.setTimeout(() => {
    void runSequence().catch((error) => console.error(error));
  }, 700);

  window.addEventListener(
    "beforeunload",
    () => {
      window.removeEventListener("keydown", onKeyDown);
      controller.dispose();
      rig.dispose();
      groundMaterial.dispose();
      seatMaterial.dispose();
      hud.remove();
      scene.dispose();
      engineAdapter.dispose();
    },
    { once: true },
  );

  if (rig.clips.size !== CHARACTER_ANIMATION_CLIP_IDS.length) {
    throw new Error("Character Prototype V0 clip registry is incomplete.");
  }
}
