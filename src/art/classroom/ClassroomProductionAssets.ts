import "@babylonjs/loaders/glTF/index.js";

import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader";
import type { AssetContainer } from "@babylonjs/core/assetContainer";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";

import {
  CLASSROOM_AC,
  CLASSROOM_BOARD,
  CLASSROOM_CHAIRS,
  CLASSROOM_DESKS,
  CLASSROOM_FANS,
  CLASSROOM_FIXTURES,
  CLASSROOM_TEACHER_DESK,
  type ClassroomPlacement,
} from "./ClassroomProductionLayout";

interface LoadedClassroomAssets {
  desk: AssetContainer;
  chair: AssetContainer;
  teacherDesk: AssetContainer;
  board: AssetContainer;
  fan: AssetContainer;
  ac: AssetContainer;
  fixture: AssetContainer;
}

function assetUrl(baseUrl: string, fileName: string): string {
  return new URL(`assets/classroom/v1/${fileName}`, baseUrl).toString();
}

async function loadAssets(
  scene: Scene,
  baseUrl: string,
): Promise<LoadedClassroomAssets> {
  const [desk, chair, teacherDesk, board, fan, ac, fixture] =
    await Promise.all([
      LoadAssetContainerAsync(assetUrl(baseUrl, "student-desk-v1.glb"), scene),
      LoadAssetContainerAsync(assetUrl(baseUrl, "student-chair-v1.glb"), scene),
      LoadAssetContainerAsync(assetUrl(baseUrl, "teacher-desk-v1.glb"), scene),
      LoadAssetContainerAsync(assetUrl(baseUrl, "classroom-board-v1.glb"), scene),
      LoadAssetContainerAsync(assetUrl(baseUrl, "ceiling-fan-v1.glb"), scene),
      LoadAssetContainerAsync(assetUrl(baseUrl, "wall-ac-v1.glb"), scene),
      LoadAssetContainerAsync(
        assetUrl(baseUrl, "fluorescent-fixture-v1.glb"),
        scene,
      ),
    ]);
  return { desk, chair, teacherDesk, board, fan, ac, fixture };
}

function instantiate(
  scene: Scene,
  container: AssetContainer,
  name: string,
  placement: ClassroomPlacement,
): TransformNode {
  const entries = container.instantiateModelsToScene(
    (sourceName) => `${name}-${sourceName}`,
    false,
  );
  if (entries.rootNodes.length === 0) {
    throw new Error(`Classroom asset "${name}" produced no root node.`);
  }

  const placementRoot = new TransformNode(name, scene);
  placementRoot.position.set(placement.x, placement.y, placement.z);
  placementRoot.rotation.y = placement.rotationY;
  entries.rootNodes.forEach((root) => {
    root.parent = placementRoot;
  });
  return placementRoot;
}

export interface ClassroomProductionAssetResult {
  roots: TransformNode[];
  sourceContainers: AssetContainer[];
}

export async function hydrateClassroomProductionAssets(
  scene: Scene,
  baseUrl: string,
): Promise<ClassroomProductionAssetResult> {
  const assets = await loadAssets(scene, baseUrl);
  const roots: TransformNode[] = [];

  CLASSROOM_DESKS.forEach((placement) => {
    roots.push(
      instantiate(
        scene,
        assets.desk,
        `classroom-desk-r${placement.row}-c${placement.column}`,
        placement,
      ),
    );
  });

  CLASSROOM_CHAIRS.forEach((placement) => {
    roots.push(
      instantiate(
        scene,
        assets.chair,
        `classroom-chair-r${placement.row}-c${placement.column}-${placement.seat}`,
        placement,
      ),
    );
  });

  roots.push(
    instantiate(
      scene,
      assets.teacherDesk,
      "classroom-teacher-desk-visual",
      CLASSROOM_TEACHER_DESK,
    ),
    instantiate(scene, assets.board, "classroom-board-visual", CLASSROOM_BOARD),
    instantiate(scene, assets.ac, "classroom-wall-ac-visual", CLASSROOM_AC),
  );

  CLASSROOM_FANS.forEach((placement, index) => {
    roots.push(
      instantiate(
        scene,
        assets.fan,
        `classroom-ceiling-fan-${index + 1}`,
        placement,
      ),
    );
  });

  CLASSROOM_FIXTURES.forEach((placement, index) => {
    roots.push(
      instantiate(
        scene,
        assets.fixture,
        `classroom-light-fixture-${index + 1}`,
        placement,
      ),
    );
  });

  return {
    roots,
    sourceContainers: Object.values(assets),
  };
}
