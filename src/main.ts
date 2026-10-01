import { Scene } from "@babylonjs/core/scene";

import { buildChapterOnePrototypeScene } from "./content/chapters/ch01/prototypeScene";
import { EngineAdapter } from "./engine/EngineAdapter";
import { InteractionStateMachine } from "./interaction/InteractionStateMachine";
import { InteractionSystem } from "./interaction/InteractionSystem";
import { PlayerController } from "./player/PlayerController";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  const fatalError = document.querySelector<HTMLDivElement>("#fatal-error");
  const interactionPrompt =
    document.querySelector<HTMLDivElement>("#interaction-prompt");

  if (!canvas || !fatalError || !interactionPrompt) {
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

    interaction.register(chapter.book, {
      id: "int_classroom_hero_book",
      prompt: "E · Xem cuốn sổ",
      maxDistance: 1.8,
      priority: 10,
    });
    interaction.attachInput(canvas);

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.controllerReady = "true";
    canvas.dataset.sceneReady = "ch01-prototype";

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: {
          player: PlayerController;
          chapter: typeof chapter;
          interaction: InteractionSystem;
        };
      };
      debugWindow.__NTC_DEBUG__ = { player, chapter, interaction };
    }
    engineAdapter.run(() => {
      player.update(engineAdapter.engine.getDeltaTime() / 1000);
      interaction.update();

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;
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
