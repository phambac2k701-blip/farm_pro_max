import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

import { EngineAdapter } from "./engine/EngineAdapter";
import { PlayerController } from "./player/PlayerController";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  const fatalError = document.querySelector<HTMLDivElement>("#fatal-error");

  if (!canvas || !fatalError) {
    throw new Error("Required application DOM nodes are missing.");
  }

  try {
    const engineAdapter = await EngineAdapter.create(canvas);
    const scene = new Scene(engineAdapter.engine);
    scene.clearColor = new Color4(0.025, 0.028, 0.035, 1);

    const light = new HemisphericLight(
      "bootstrap-light",
      new Vector3(0.2, 1, -0.3),
      scene,
    );
    light.intensity = 0.85;

    const marker = MeshBuilder.CreateBox(
      "bootstrap-marker",
      { width: 1.4, height: 1.8, depth: 0.7 },
      scene,
    );
    marker.position.y = 0.9;
    marker.checkCollisions = true;

    const markerMaterial = new StandardMaterial("bootstrap-material", scene);
    markerMaterial.diffuseColor = new Color3(0.18, 0.2, 0.23);
    markerMaterial.roughness = 0.92;
    marker.material = markerMaterial;

    const ground = MeshBuilder.CreateGround(
      "bootstrap-ground",
      { width: 12, height: 12 },
      scene,
    );
    const groundMaterial = new StandardMaterial("ground-material", scene);
    groundMaterial.diffuseColor = new Color3(0.055, 0.06, 0.068);
    groundMaterial.roughness = 1;
    ground.material = groundMaterial;
    ground.checkCollisions = true;

    const player = PlayerController.create(scene, canvas, {
      spawn: new Vector3(0, 0, -5.5),
    });

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.controllerReady = "true";

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: { player: PlayerController };
      };
      debugWindow.__NTC_DEBUG__ = { player };
    }

    engineAdapter.run(() => {
      player.update(engineAdapter.engine.getDeltaTime() / 1000);

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
