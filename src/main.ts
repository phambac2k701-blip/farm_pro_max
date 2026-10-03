import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";

import { hydrateClassroomProductionAssets } from "./art/classroom/ClassroomProductionAssets";
import { buildLectureHall4Scene } from "./content/slice/buildLectureHall4Scene";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#model-canvas");
  const status = document.querySelector<HTMLDivElement>("#status");

  if (!canvas) {
    throw new Error("Missing #model-canvas.");
  }

  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.82, 0.86, 0.89, 1);

  const lectureHall4 = buildLectureHall4Scene(scene);

  await hydrateClassroomProductionAssets(
    scene,
    new URL(import.meta.env.BASE_URL, window.location.origin).toString(),
    lectureHall4.classrooms.map((room) => ({
      prefix: `gd4-${room.roomKey}`,
      parent: room.prefab.assetParent,
    })),
  );

  const camera = new ArcRotateCamera(
    "gd4-model-camera",
    -Math.PI / 2.2,
    Math.PI / 3.1,
    72,
    new Vector3(5, 4.5, 2),
    scene,
  );
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 160;
  camera.wheelPrecision = 28;
  camera.panningSensibility = 90;
  camera.attachControl(canvas, true);

  if (status) {
    status.textContent = `Giảng đường 4 UET · ${scene.meshes.length} meshes`;
  }

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  const status = document.querySelector<HTMLDivElement>("#status");
  if (status) {
    status.textContent =
      error instanceof Error ? `Lỗi: ${error.message}` : "Không thể mở model.";
  }
});
