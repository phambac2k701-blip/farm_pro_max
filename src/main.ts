import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Scene } from "@babylonjs/core/scene";

import {
  Chapter0ActionBehavior,
  Chapter0Game,
  type Chapter0AutoplayRoute,
} from "./content/ch0/Chapter0Game";
import { Chapter0Ui } from "./content/ch0/Chapter0Ui";
import { Chapter0World } from "./content/ch0/Chapter0World";
import { SceneTransitionDirector } from "./content/ch0/SceneTransitionDirector";
import { EngineAdapter } from "./engine/EngineAdapter";
import { InteractionBehaviorHost } from "./interaction/behaviors/InteractionBehaviorHost";
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
  const transitionOverlay =
    document.querySelector<HTMLDivElement>("#chapter-transition");

  if (
    !canvas ||
    !fatalError ||
    !interactionPrompt ||
    !reticle ||
    !transitionOverlay
  ) {
    throw new Error("Required Chapter 0 application DOM nodes are missing.");
  }

  for (const selector of [
    "#inspection-overlay",
    "#phone-overlay",
    "#evidence-notification",
    "#subtitle",
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
    scene.clearColor = new Color4(0.68, 0.71, 0.73, 1);

    const world = new Chapter0World(scene);
    const player = PlayerController.create(scene, canvas, {
      spawn: world.spawns.streetStart,
      mouseSensitivity: 0.0022,
      movementSpeed: 3.2,
    });
    const interactionState = new InteractionStateMachine(player);
    const interaction = new InteractionSystem(
      scene,
      player.camera,
      interactionState,
    );
    const behaviorHost = new InteractionBehaviorHost(interaction);
    const ui = new Chapter0Ui(canvas);
    const transition = new SceneTransitionDirector(
      transitionOverlay,
      player,
    );
    const game = new Chapter0Game(
      canvas,
      player,
      world,
      ui,
      transition,
    );

    for (const target of world.interactionTargets) {
      interaction.register(target.mesh, {
        id: `ch0-action-${target.actionId}`,
        prompt: target.prompt,
        maxDistance: target.maxDistance,
        priority: 20,
      });
      behaviorHost.register(
        `ch0-action-${target.actionId}`,
        new Chapter0ActionBehavior(game, target.actionId),
      );
    }
    interaction.attachInput(canvas);

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.sceneReady = "chapter-0-playable-greybox-v0";
    canvas.dataset.currentMap = "zone-ch0-street";
    canvas.dataset.controllerReady = "true";
    canvas.dataset.ch0Complete = "false";
    fatalError.hidden = true;

    const autoplayParam = new URLSearchParams(window.location.search).get(
      "autoplay",
    );
    const routeParam = new URLSearchParams(window.location.search).get(
      "route",
    );
    const autoplay = autoplayParam === "1" || autoplayParam === "true";
    const route: Chapter0AutoplayRoute =
      routeParam === "self-nav" || routeParam === "missed-bus"
        ? routeParam
        : "default";

    const restart = (event: KeyboardEvent): void => {
      if (
        event.code === "KeyR" &&
        canvas.dataset.ch0Complete === "true"
      ) {
        window.location.reload();
      }
    };
    window.addEventListener("keydown", restart);

    engineAdapter.run(() => {
      const deltaSeconds = engineAdapter.engine.getDeltaTime() / 1000;
      player.update(deltaSeconds);
      behaviorHost.update(deltaSeconds);
      interaction.update();
      game.update(deltaSeconds);

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;
      reticle.hidden =
        interaction.activeInteraction !== null ||
        document.querySelector("#ch0-dialogue.visible") !== null;

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

    if (autoplay) {
      game.setAutoplay(true);
    }
    await game.start();
    if (autoplay) {
      await game.runAutoplay(route);
    }

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __UET_CH0__?: {
          game: Chapter0Game;
          player: PlayerController;
          world: Chapter0World;
          interaction: InteractionSystem;
        };
      };
      debugWindow.__UET_CH0__ = {
        game,
        player,
        world,
        interaction,
      };
    }

    window.addEventListener(
      "beforeunload",
      () => {
        window.removeEventListener("keydown", restart);
        interaction.dispose();
        behaviorHost.dispose();
        game.dispose();
        player.dispose();
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

if (new URLSearchParams(location.search).get("sample") === "p1") {
  void import("./content/ch0/p1/P1Game").then(m => m.bootstrapP1()).catch(error => {
    console.error(error);
    const fatal = document.querySelector<HTMLElement>("#fatal-error");
    if (fatal) { fatal.hidden = false; fatal.textContent = String(error); }
  });
} else {
  void bootstrap();
}
