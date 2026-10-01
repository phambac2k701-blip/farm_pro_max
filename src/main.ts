import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { Scene } from "@babylonjs/core/scene";

import { PrototypeBookAudio } from "./audio/PrototypeBookAudio";
import { CameraDirector } from "./camera/CameraDirector";
import {
  CH01_BOOK_INTERACTION_ID,
  CH01_BOOK_SPREADS,
} from "./content/chapters/ch01/book";
import { CH01_EVIDENCE } from "./content/chapters/ch01/evidence";
import { buildChapterOnePrototypeScene } from "./content/chapters/ch01/prototypeScene";
import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
  isChapterOneCheckpointId,
} from "./content/chapters/ch01/state";
import {
  applyChapterOneNinthDeskVariant,
  CH01_NINTH_DESK_SHIFT_ID,
  CH01_REALITY_RULES,
  CH01_REVISIT_AFTER_CLUE_FACT,
} from "./content/chapters/ch01/reality";
import { EngineAdapter } from "./engine/EngineAdapter";
import { EvidenceSystem } from "./evidence/EvidenceSystem";
import { ChapterRuntime } from "./game/chapter/ChapterRuntime";
import { SaveService } from "./game/save/SaveService";
import { GameState } from "./game/state/GameState";
import { InteractionStateMachine } from "./interaction/InteractionStateMachine";
import { InteractionSystem } from "./interaction/InteractionSystem";
import { BookInspectionController } from "./interaction/inspection/BookInspectionController";
import { PlayerController } from "./player/PlayerController";
import { RealitySystem } from "./reality/RealitySystem";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  const fatalError = document.querySelector<HTMLDivElement>("#fatal-error");
  const interactionPrompt =
    document.querySelector<HTMLDivElement>("#interaction-prompt");
  const bookControls =
    document.querySelector<HTMLDivElement>("#book-inspection-controls");
  const evidenceNotification =
    document.querySelector<HTMLDivElement>("#evidence-notification");
  const reticle = document.querySelector<HTMLDivElement>("#reticle");

  if (
    !canvas ||
    !fatalError ||
    !interactionPrompt ||
    !bookControls ||
    !evidenceNotification ||
    !reticle
  ) {
    throw new Error("Required application DOM nodes are missing.");
  }

  try {
    const saveService = new SaveService(window.localStorage);
    const loadedSave = saveService.load();
    const settings = {
      mouseSensitivity:
        loadedSave?.settings.mouseSensitivity ?? 0.0022,
    };
    const gameState = new GameState(loadedSave?.gameState);
    const restoredCheckpoint =
      loadedSave &&
      isChapterOneCheckpointId(loadedSave.checkpoint.checkpointId)
        ? loadedSave.checkpoint.checkpointId
        : CH01_INITIAL_CHECKPOINT;
    const chapterRuntime = new ChapterRuntime({
      state: gameState,
      checkpoints: CH01_CHECKPOINTS,
      initialCheckpoint: CH01_INITIAL_CHECKPOINT,
      completeCheckpoint: CH01_COMPLETE_CHECKPOINT,
      completeFactId: CH01_COMPLETE_FACT,
      nextChapterId: "ch02",
      restoredCheckpoint,
    });

    const engineAdapter = await EngineAdapter.create(canvas);
    const scene = new Scene(engineAdapter.engine);
    const chapter = buildChapterOnePrototypeScene(scene);
    const player = PlayerController.create(scene, canvas, {
      spawn: chapter.spawn,
      mouseSensitivity: settings.mouseSensitivity,
    });
    const interactionState = new InteractionStateMachine(player);
    const interaction = new InteractionSystem(
      scene,
      player.camera,
      interactionState,
    );
    const cameraDirector = new CameraDirector(player.camera, player);
    const evidence = new EvidenceSystem(gameState, CH01_EVIDENCE);
    const reality = new RealitySystem(gameState, CH01_REALITY_RULES, {
      [CH01_NINTH_DESK_SHIFT_ID]: () => {
        applyChapterOneNinthDeskVariant(chapter);
        canvas.dataset.realityShift = CH01_NINTH_DESK_SHIFT_ID;
      },
    });
    reality.syncApplied();

    const playerBody = player.collisionBody;
    if (!playerBody) {
      throw new Error("Player collision body is required for reality triggers.");
    }

    playerBody.actionManager =
      playerBody.actionManager ?? new ActionManager(scene);
    playerBody.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnIntersectionEnterTrigger,
          parameter: chapter.realityTransitionZone,
        },
        () => {
          if (!evidence.has("ev_ch01_erased_ninth_line")) {
            return;
          }

          gameState.setFact(CH01_REVISIT_AFTER_CLUE_FACT, true);
          reality.apply(CH01_NINTH_DESK_SHIFT_ID);
        },
      ),
    );

    const bookAudio = new PrototypeBookAudio();
    const bookInspection = new BookInspectionController({
      visual: chapter.bookVisual,
      pages: CH01_BOOK_SPREADS,
      audio: bookAudio,
      onSpreadViewed: (spread) => {
        canvas.dataset.bookSpread = spread.id;
        canvas.dataset.bookDiscoveryCandidate =
          spread.discoveryId ?? "";
        evidence.discover(spread.discoveryId);
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

    const persistSave = (): void => {
      const saved = saveService.save(
        gameState.snapshot(),
        chapterRuntime.snapshot(),
        settings,
      );
      canvas.dataset.saveStatus = saved ? "saved" : "failed";
    };
    const unsubscribeAutosave = [
      gameState.events.on("fact-changed", persistSave),
      gameState.events.on("evidence-discovered", persistSave),
      gameState.events.on("chapter-changed", persistSave),
    ];
    canvas.dataset.saveLoaded = loadedSave ? "true" : "false";

    let evidenceHideTimer: number | undefined;
    const unsubscribeEvidence = gameState.events.on(
      "evidence-discovered",
      ({ evidenceId }) => {
        const definition = evidence.get(evidenceId);
        if (!definition) {
          return;
        }

        if (evidenceHideTimer !== undefined) {
          window.clearTimeout(evidenceHideTimer);
        }

        evidenceNotification.hidden = false;
        evidenceNotification.textContent =
          `Manh mối mới · ${definition.title}\n${definition.summary}`;
        window.requestAnimationFrame(() => {
          evidenceNotification.classList.add("visible");
        });

        evidenceHideTimer = window.setTimeout(() => {
          evidenceNotification.classList.remove("visible");
          window.setTimeout(() => {
            evidenceNotification.hidden = true;
          }, 220);
        }, 2800);

        canvas.dataset.evidenceLast = evidenceId;
        canvas.dataset.evidenceCount = String(
          evidence.listDiscovered().length,
        );
      },
    );

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
          gameState: GameState;
          chapterRuntime: ChapterRuntime<(typeof CH01_CHECKPOINTS)[number]>;
          evidence: EvidenceSystem;
          reality: RealitySystem;
        };
      };
      debugWindow.__NTC_DEBUG__ = {
        player,
        chapter,
        interaction,
        cameraDirector,
        bookInspection,
        gameState,
        chapterRuntime,
        evidence,
        reality,
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
        unsubscribeEvidence();
        for (const unsubscribe of unsubscribeAutosave) {
          unsubscribe();
        }
        if (evidenceHideTimer !== undefined) {
          window.clearTimeout(evidenceHideTimer);
        }
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
