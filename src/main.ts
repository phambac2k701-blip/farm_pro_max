import { Scene } from "@babylonjs/core/scene";

import { CameraDirector } from "./camera/CameraDirector";
import { buildChapterOneScene } from "./content/chapters/ch01/scene/buildChapterOneScene";
import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
  isChapterOneCheckpointId,
} from "./content/chapters/ch01/state";
import { EngineAdapter } from "./engine/EngineAdapter";
import { ChapterRuntime } from "./game/chapter/ChapterRuntime";
import { SaveService } from "./game/save/SaveService";
import { GameState } from "./game/state/GameState";
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
    const chapter = buildChapterOneScene(scene);
    const spawn =
      chapter.checkpoints[chapterRuntime.currentCheckpoint]?.position.clone() ??
      chapter.spawn.clone();
    const player = PlayerController.create(scene, canvas, {
      spawn,
      mouseSensitivity: settings.mouseSensitivity,
    });
    const interactionState = new InteractionStateMachine(player);
    const interaction = new InteractionSystem(
      scene,
      player.camera,
      interactionState,
    );
    const cameraDirector = new CameraDirector(player.camera, player);
    interaction.attachInput(canvas);

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

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.controllerReady = "true";
    canvas.dataset.sceneReady = "ch01-production-shell";
    canvas.dataset.saveLoaded = loadedSave ? "true" : "false";
    canvas.dataset.chapterCheckpoint = chapterRuntime.currentCheckpoint;
    canvas.dataset.paStationCount = String(chapter.paStations.length);
    canvas.dataset.ninthPaStationEnabled = String(
      chapter.ninthPaStation.isEnabled(),
    );

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: {
          player: PlayerController;
          chapter: typeof chapter;
          interaction: InteractionSystem;
          cameraDirector: CameraDirector;
          gameState: GameState;
          chapterRuntime: ChapterRuntime<(typeof CH01_CHECKPOINTS)[number]>;
        };
      };
      debugWindow.__NTC_DEBUG__ = {
        player,
        chapter,
        interaction,
        cameraDirector,
        gameState,
        chapterRuntime,
      };
    }

    engineAdapter.run(() => {
      const deltaSeconds = engineAdapter.engine.getDeltaTime() / 1000;

      player.update(deltaSeconds);
      cameraDirector.update(deltaSeconds);
      interaction.update();

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;
      reticle.hidden =
        interaction.activeInteraction !== null ||
        cameraDirector.state !== "gameplay";

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
        for (const unsubscribe of unsubscribeAutosave) {
          unsubscribe();
        }
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
