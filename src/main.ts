import { Scene } from "@babylonjs/core/scene";

import { hydrateClassroomProductionAssets } from "./art/classroom/ClassroomProductionAssets";
import { buildLectureHall4Scene } from "./content/slice/buildLectureHall4Scene";
import { EngineAdapter } from "./engine/EngineAdapter";
import { InteractionBehaviorHost } from "./interaction/behaviors/InteractionBehaviorHost";
import {
  createHingedOpenableAdapter,
  OpenableController,
} from "./interaction/behaviors/OpenableController";
import { InteractionStateMachine } from "./interaction/InteractionStateMachine";
import { InteractionSystem } from "./interaction/InteractionSystem";
import { PlayerController } from "./player/PlayerController";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  const fatalError = document.querySelector<HTMLDivElement>("#fatal-error");
  const interactionPrompt =
    document.querySelector<HTMLDivElement>("#interaction-prompt");
  const reticle = document.querySelector<HTMLDivElement>("#reticle");

  if (!canvas || !fatalError || !interactionPrompt || !reticle) {
    throw new Error("Required application DOM nodes are missing.");
  }

  for (const selector of [
    "#inspection-overlay",
    "#phone-overlay",
    "#evidence-notification",
    "#subtitle",
    "#chapter-transition",
  ]) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      element.hidden = true;
      element.classList.remove("visible");
    }
  }

  try {
    const engineAdapter = await EngineAdapter.create(canvas);
    const scene = new Scene(engineAdapter.engine);
    const slice = buildLectureHall4Scene(scene);

    const classroomAssets = await hydrateClassroomProductionAssets(
      scene,
      new URL(import.meta.env.BASE_URL, window.location.origin).toString(),
      slice.classrooms.map((room) => ({
        prefix: `gd4-${room.roomKey}`,
        parent: room.prefab.assetParent,
      })),
    );

    const player = PlayerController.create(scene, canvas, {
      spawn: slice.spawn,
      mouseSensitivity: 0.0022,
      movementSpeed: 3.1,
    });
    player.camera.rotation.y = Math.PI / 2;

    const roomRuntime = slice.classrooms.map((room) => {
      const prefix = room.prefab.root.name.replace(/-root$/, "");
      return {
        room,
        furnitureColliders: room.prefab.root
          .getChildMeshes(false)
          .filter(
            (mesh) =>
              mesh.name.includes("-desk-") ||
              mesh.name.includes("-chair-") ||
              mesh.name.endsWith("-teacher-collider"),
          ),
        localLights: scene.lights.filter((light) =>
          light.name.startsWith(`${prefix}-light-`),
        ),
        active: true,
      };
    });

    const ROOM_ACTIVE_RADIUS = 14.5;
    const updateRoomActivity = (): void => {
      const feet = player.getFeetPosition();
      const activeKeys: string[] = [];

      for (const entry of roomRuntime) {
        const roomCenter =
          entry.room.prefab.activityAnchor.getAbsolutePosition();
        const dx = feet.x - roomCenter.x;
        const dz = feet.z - roomCenter.z;
        const active =
          dx * dx + dz * dz <= ROOM_ACTIVE_RADIUS * ROOM_ACTIVE_RADIUS;

        if (entry.active !== active) {
          entry.active = active;
          entry.room.prefab.assetParent.setEnabled(active);
          entry.furnitureColliders.forEach((mesh) => {
            mesh.checkCollisions = active;
          });
          entry.localLights.forEach((light) => light.setEnabled(active));
        }

        if (active) {
          activeKeys.push(entry.room.roomKey);
        }
      }

      canvas.dataset.activeRooms = activeKeys.join(",");
    };
    updateRoomActivity();

    const interactionState = new InteractionStateMachine(player);
    const interaction = new InteractionSystem(
      scene,
      player.camera,
      interactionState,
    );
    const behaviorHost = new InteractionBehaviorHost(interaction);
    interaction.attachInput(canvas);

    const doorControllers = new Map<string, OpenableController>();
    for (const room of slice.classrooms) {
      const interactionId = `gd4-door-${room.roomKey}`;
      const controller = new OpenableController({
        adapter: createHingedOpenableAdapter(
          room.prefab.door.hinge,
          room.prefab.door.closedRotationY,
          room.prefab.door.openRotationY,
        ),
        duration: 0.38,
        initiallyOpen: false,
      });

      interaction.register(room.prefab.door.leaf, {
        id: interactionId,
        prompt: room.visibleLabel
          ? `E · Mở ${room.visibleLabel}`
          : "E · Mở phòng học",
        maxDistance: 2.2,
        priority: 10,
      });
      behaviorHost.register(interactionId, controller);
      doorControllers.set(room.roomKey, controller);
    }

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.sceneReady = "lecture-hall-4-slice";
    canvas.dataset.classroomAssets =
      `ready:${classroomAssets.roots.length}`;
    canvas.dataset.classroomCount = String(slice.classrooms.length);
    canvas.dataset.currentMap = "giang-duong-4";
    canvas.dataset.controllerReady = "true";
    fatalError.hidden = true;

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: {
          player: PlayerController;
          slice: typeof slice;
          interaction: InteractionSystem;
          behaviorHost: InteractionBehaviorHost;
          doorControllers: Map<string, OpenableController>;
        };
      };
      debugWindow.__NTC_DEBUG__ = {
        player,
        slice,
        interaction,
        behaviorHost,
        doorControllers,
      };
    }

    engineAdapter.run(() => {
      const deltaSeconds = engineAdapter.engine.getDeltaTime() / 1000;
      updateRoomActivity();
      player.update(deltaSeconds);
      behaviorHost.update(deltaSeconds);
      interaction.update();

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;
      reticle.hidden = interaction.activeInteraction !== null;

      canvas.dataset.interactionTarget = prompt.interactableId ?? "";
      canvas.dataset.interactionActive =
        interaction.activeInteraction?.id ?? "";

      if (import.meta.env.DEV) {
        const feet = player.getFeetPosition();
        canvas.dataset.playerFeet =
          `${feet.x.toFixed(3)},${feet.y.toFixed(3)},${feet.z.toFixed(3)}`;
      }

      scene.render();
    });

    window.addEventListener(
      "beforeunload",
      () => {
        interaction.dispose();
        behaviorHost.dispose();
        player.dispose();
        classroomAssets.sourceContainers.forEach((container) =>
          container.dispose(),
        );
        scene.dispose();
        engineAdapter.dispose();
      },
      { once: true },
    );
  } catch (error) {
    console.error(error);
    fatalError.hidden = false;
    fatalError.textContent =
      error instanceof Error ? error.message : String(error);
  }
}

void bootstrap();
