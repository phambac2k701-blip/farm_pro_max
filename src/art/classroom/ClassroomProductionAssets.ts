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
  parent?: TransformNode,
): TransformNode {
  const entries = container.instantiateModelsToScene(
    (sourceName) => `${name}-${sourceName}`,
    false,
  );
  if (entries.rootNodes.length === 0) {
    throw new Error(`Classroom asset "${name}" produced no root node.`);
  }

  const placementRoot = new TransformNode(name, scene);
  placementRoot.parent = parent ?? null;
  placementRoot.position.set(placement.x, placement.y, placement.z);
  placementRoot.rotation.y = placement.rotationY;
  entries.rootNodes.forEach((root) => {
    root.parent = placementRoot;
  });
  return placementRoot;
}

export interface ClassroomAssetInstance {
  parent?: TransformNode;
  prefix: string;
}

export interface ClassroomProductionAssetResult {
  roots: TransformNode[];
  sourceContainers: AssetContainer[];
}

function instantiateClassroomAssetSet(
  scene: Scene,
  assets: LoadedClassroomAssets,
  instance: ClassroomAssetInstance,
): TransformNode[] {
  const roots: TransformNode[] = [];
  const prefix = instance.prefix;
  const parent = instance.parent;

  CLASSROOM_DESKS.forEach((placement) => {
    roots.push(
      instantiate(
        scene,
        assets.desk,
        `${prefix}-desk-r${placement.row}-c${placement.column}`,
        placement,
        parent,
      ),
    );
  });

  CLASSROOM_CHAIRS.forEach((placement) => {
    roots.push(
      instantiate(
        scene,
        assets.chair,
        `${prefix}-chair-r${placement.row}-c${placement.column}-${placement.seat}`,
        placement,
        parent,
      ),
    );
  });

  roots.push(
    instantiate(
      scene,
      assets.teacherDesk,
      `${prefix}-teacher-desk-visual`,
      CLASSROOM_TEACHER_DESK,
      parent,
    ),
    instantiate(
      scene,
      assets.board,
      `${prefix}-board-visual`,
      CLASSROOM_BOARD,
      parent,
    ),
    instantiate(
      scene,
      assets.ac,
      `${prefix}-wall-ac-visual`,
      CLASSROOM_AC,
      parent,
    ),
  );

  CLASSROOM_FANS.forEach((placement, index) => {
    roots.push(
      instantiate(
        scene,
        assets.fan,
        `${prefix}-ceiling-fan-${index + 1}`,
        placement,
        parent,
      ),
    );
  });

  CLASSROOM_FIXTURES.forEach((placement, index) => {
    roots.push(
      instantiate(
        scene,
        assets.fixture,
        `${prefix}-light-fixture-${index + 1}`,
        placement,
        parent,
      ),
    );
  });

  return roots;
}

export async function hydrateClassroomProductionAssets(
  scene: Scene,
  baseUrl: string,
  instances: ClassroomAssetInstance[] = [{ prefix: "classroom" }],
): Promise<ClassroomProductionAssetResult> {
  const assets = await loadAssets(scene, baseUrl);
  const roots = instances.flatMap((instance) =>
    instantiateClassroomAssetSet(scene, assets, instance),
  );

  return {
    roots,
    sourceContainers: Object.values(assets),
  };
}
