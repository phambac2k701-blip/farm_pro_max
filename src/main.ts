import { Scene } from "@babylonjs/core/scene";

import { PrototypeBookAudio } from "./audio/PrototypeBookAudio";
import { CameraDirector } from "./camera/CameraDirector";
import {
  CH01_BOOK_INTERACTION_ID,
  CH01_BOOK_SPREADS,
} from "./content/chapters/ch01/book";
import { buildChapterOnePrototypeScene } from "./content/chapters/ch01/prototypeScene";
import { EngineAdapter } from "./engine/EngineAdapter";
import { InteractionStateMachine } from "./interaction/InteractionStateMachine";
import { InteractionSystem } from "./interaction/InteractionSystem";
import { BookInspectionController } from "./interaction/inspection/BookInspectionController";
import { PlayerController } from "./player/PlayerController";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  const fatalError = document.querySelector<HTMLDivElement>("#fatal-error");
  const interactionPrompt =
    document.querySelector<HTMLDivElement>("#interaction-prompt");
  const bookControls =
    document.querySelector<HTMLDivElement>("#book-inspection-controls");
  const reticle = document.querySelector<HTMLDivElement>("#reticle");

  if (
    !canvas ||
    !fatalError ||
    !interactionPrompt ||
    !bookControls ||
    !reticle
  ) {
    throw new Error("Required application DOM nodes are missing.");
  }

  try {
    const engineAdapter = await EngineAdapter.create(canvas);
    const scene = new Scene(engineAdapter.engine);
    const chapter = buildChapterOnePrototypeScene(scene);
    const player = PlayerController.create(scene, canvas, {
      spawn: chapter.spawn,
    });
    const interactionState = new InteractionStateMachine(player);
    const interaction = new InteractionSystem(
      scene,
      player.camera,
      interactionState,
    );
    const cameraDirector = new CameraDirector(player.camera, player);
    const bookAudio = new PrototypeBookAudio();
    const bookInspection = new BookInspectionController({
      visual: chapter.bookVisual,
      pages: CH01_BOOK_SPREADS,
      audio: bookAudio,
      onSpreadViewed: (spread) => {
        canvas.dataset.bookSpread = spread.id;
        canvas.dataset.bookDiscoveryCandidate =
          spread.discoveryId ?? "";
      },
      onClosed: () => {
        if (
          interaction.activeInteraction?.id ===
          CH01_BOOK_INTERACTION_ID
        ) {
          interaction.cancel();
        }
      },
    });

    interaction.register(chapter.book, {
      id: CH01_BOOK_INTERACTION_ID,
      prompt: "E · Xem cuốn sổ",
      maxDistance: 1.8,
      priority: 10,
    });
    interaction.attachInput(canvas);
    bookInspection.attachInput();

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.controllerReady = "true";
    canvas.dataset.sceneReady = "ch01-prototype";

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: {
          player: PlayerController;
          chapter: typeof chapter;
          interaction: InteractionSystem;
          cameraDirector: CameraDirector;
          bookInspection: BookInspectionController;
        };
      };
      debugWindow.__NTC_DEBUG__ = {
        player,
        chapter,
        interaction,
        cameraDirector,
        bookInspection,
      };
    }

    let previousInteractionId: string | null = null;

    engineAdapter.run(() => {
      const deltaSeconds = engineAdapter.engine.getDeltaTime() / 1000;
      const activeInteractionId =
        interaction.activeInteraction?.id ?? null;

      if (activeInteractionId !== previousInteractionId) {
        if (activeInteractionId === CH01_BOOK_INTERACTION_ID) {
          cameraDirector.focus(
            {
              position: chapter.bookCameraAnchor.position,
              rotation: chapter.bookCameraAnchor.rotation,
              fov: 0.72,
            },
            { duration: 0.48 },
          );
        } else if (activeInteractionId === null) {
          if (
            bookInspection.state !== "idle" &&
            bookInspection.state !== "closing"
          ) {
            bookInspection.requestClose();
          }

          if (cameraDirector.state !== "gameplay") {
            cameraDirector.restore({ duration: 0.34 });
          }
        }

        previousInteractionId = activeInteractionId;
      }

      if (
        activeInteractionId === null &&
        (
          cameraDirector.state === "restoring" ||
          bookInspection.state !== "idle"
        )
      ) {
        player.setLocomotionEnabled(false);
      }

      player.update(deltaSeconds);
      cameraDirector.update(deltaSeconds);

      if (
        activeInteractionId === CH01_BOOK_INTERACTION_ID &&
        cameraDirector.state === "inspection" &&
        bookInspection.state === "idle"
      ) {
        bookInspection.start();
      }

      bookInspection.update(deltaSeconds);

      if (
        activeInteractionId === null &&
        cameraDirector.state === "gameplay" &&
        bookInspection.state === "idle"
      ) {
        player.setLocomotionEnabled(true);
      }

      interaction.update();

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;

      const bookControlsVisible =
        bookInspection.state === "reading" ||
        bookInspection.state === "page-turning";
      bookControls.hidden = !bookControlsVisible;
      bookControls.textContent = bookControlsVisible
        ? `← / → đổi trang · Esc đóng · ${bookInspection.currentPageIndex + 1}/${CH01_BOOK_SPREADS.length}`
        : "";

      reticle.hidden =
        activeInteractionId !== null ||
        cameraDirector.state !== "gameplay";

      canvas.dataset.interactionTarget = prompt.interactableId ?? "";
      canvas.dataset.interactionActive =
        interaction.activeInteraction?.id ?? "";
      canvas.dataset.bookState = bookInspection.state;
      canvas.dataset.bookPage = String(
        bookInspection.currentPageIndex,
      );

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
        bookInspection.dispose();
        bookAudio.dispose();
        interaction.dispose();
        player.dispose();
        scene.dispose();
        engineAdapter.dispose();
      },
      { once: true },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown engine startup error.";
    fatalError.hidden = false;
    fatalError.textContent = `Không thể khởi động đồ họa 3D: ${message}`;
    throw error;
  }
}

void bootstrap();
