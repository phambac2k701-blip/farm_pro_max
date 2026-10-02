import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Material } from "@babylonjs/core/Materials/material";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import type { Scene } from "@babylonjs/core/scene";

import {
  createCeilingModule,
  createFittedDoorOpeningModule,
  createFloorModule,
  createWallModule,
  createWindowFrameModule,
} from "../environment/EnvironmentKit";
import { createSignageV2 } from "../signage/SignageV2";
import {
  CLASSROOM_CHAIRS,
  CLASSROOM_DESKS,
  CLASSROOM_DOOR,
  CLASSROOM_ROOM,
  CLASSROOM_TEACHER_DESK,
  CLASSROOM_WINDOWS,
} from "./ClassroomProductionLayout";

export interface ClassroomDoorAssembly {
  hinge: TransformNode;
  leaf: Mesh;
  closedRotationY: number;
  openRotationY: number;
}

export interface ClassroomPrefabInstance {
  root: TransformNode;
  door: ClassroomDoorAssembly;
  assetParent: TransformNode;
  activityAnchor: TransformNode;
}

export interface ClassroomPrefabOptions {
  name: string;
  roomLabel?: string;
  position: Vector3;
  rotationY?: number;
}

function readableMaterial(
  scene: Scene,
  name: string,
  diffuse: Color3,
  emissive: Color3,
): StandardMaterial {
  const material = new StandardMaterial(name, scene);
  material.diffuseColor = diffuse;
  material.emissiveColor = emissive;
  material.ambientColor = diffuse.scale(0.4);
  material.specularColor = new Color3(0.08, 0.08, 0.08);
  return material;
}

function createReadableClassroomMaterials(scene: Scene, prefix: string) {
  const wall = readableMaterial(
    scene,
    `${prefix}-wall`,
    new Color3(0.8, 0.79, 0.69),
    new Color3(0.16, 0.16, 0.13),
  );
  const floor = readableMaterial(
    scene,
    `${prefix}-floor`,
    new Color3(0.48, 0.5, 0.46),
    new Color3(0.08, 0.08, 0.07),
  );
  const ceiling = readableMaterial(
    scene,
    `${prefix}-ceiling`,
    new Color3(0.88, 0.87, 0.79),
    new Color3(0.16, 0.16, 0.14),
  );
  const metal = readableMaterial(
    scene,
    `${prefix}-metal`,
    new Color3(0.38, 0.43, 0.44),
    new Color3(0.03, 0.035, 0.035),
  );
  const glass = readableMaterial(
    scene,
    `${prefix}-glass`,
    new Color3(0.48, 0.64, 0.72),
    new Color3(0.08, 0.11, 0.13),
  );
  glass.alpha = 0.34;
  glass.backFaceCulling = false;
  return { wall, floor, ceiling, metal, glass };
}

function createBox(
  scene: Scene,
  name: string,
  width: number,
  height: number,
  depth: number,
  position: Vector3,
  material: Material,
  parent: TransformNode,
  collisions = false,
): Mesh {
  const mesh = MeshBuilder.CreateBox(name, { width, height, depth }, scene);
  mesh.position.copyFrom(position);
  mesh.material = material;
  mesh.parent = parent;
  mesh.checkCollisions = collisions;
  mesh.isPickable = false;
  return mesh;
}

function createPanel(
  scene: Scene,
  root: TransformNode,
  name: string,
  startX: number,
  endX: number,
  bottomY: number,
  topY: number,
  z: number,
  material: Material,
): void {
  if (endX <= startX || topY <= bottomY) return;
  createBox(
    scene,
    name,
    endX - startX,
    topY - bottomY,
    0.12,
    new Vector3((startX + endX) / 2, (bottomY + topY) / 2, z),
    material,
    root,
    true,
  );
}

function createDoor(
  scene: Scene,
  root: TransformNode,
  name: string,
  material: Material,
): ClassroomDoorAssembly {
  const hinge = new TransformNode(`${name}-hinge`, scene);
  hinge.parent = root;
  hinge.position.set(
    CLASSROOM_DOOR.centerX - CLASSROOM_DOOR.width / 2,
    0,
    CLASSROOM_DOOR.z - 0.065,
  );

  const leaf = createBox(
    scene,
    `${name}-leaf`,
    CLASSROOM_DOOR.width - 0.05,
    CLASSROOM_DOOR.height,
    0.075,
    new Vector3(
      CLASSROOM_DOOR.width / 2,
      CLASSROOM_DOOR.height / 2,
      0,
    ),
    material,
    hinge,
    true,
  );
  leaf.isPickable = true;

  return {
    hinge,
    leaf,
    closedRotationY: 0,
    openRotationY: -Math.PI * 0.48,
  };
}

export function buildClassroomPrefab(
  scene: Scene,
  options: ClassroomPrefabOptions,
): ClassroomPrefabInstance {
  const { name } = options;
  const materials = createReadableClassroomMaterials(scene, name);
  const root = new TransformNode(`${name}-root`, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY ?? 0;

  const assetParent = new TransformNode(`${name}-asset-parent`, scene);
  assetParent.parent = root;

  const activityAnchor = new TransformNode(
    `${name}-activity-anchor`,
    scene,
  );
  activityAnchor.parent = root;
  activityAnchor.position.set(
    CLASSROOM_ROOM.centerX,
    0,
    CLASSROOM_ROOM.centerZ,
  );

  const width = CLASSROOM_ROOM.maxX - CLASSROOM_ROOM.minX;
  const depth = CLASSROOM_ROOM.maxZ - CLASSROOM_ROOM.minZ;

  createFloorModule(scene, `${name}-floor`, {
    width,
    depth,
    position: new Vector3(CLASSROOM_ROOM.centerX, -0.05, CLASSROOM_ROOM.centerZ),
    material: materials.floor,
    collisions: true,
  }).parent = root;

  createCeilingModule(scene, `${name}-ceiling`, {
    width,
    depth,
    position: new Vector3(
      CLASSROOM_ROOM.centerX,
      CLASSROOM_ROOM.height,
      CLASSROOM_ROOM.centerZ,
    ),
    material: materials.ceiling,
  }).parent = root;

  createWallModule(scene, `${name}-front-wall`, {
    width: 0.12,
    height: CLASSROOM_ROOM.height,
    depth,
    position: new Vector3(
      CLASSROOM_ROOM.maxX,
      CLASSROOM_ROOM.height / 2,
      CLASSROOM_ROOM.centerZ,
    ),
    material: materials.wall,
    collisions: true,
  }).parent = root;

  createWallModule(scene, `${name}-rear-wall`, {
    width: 0.12,
    height: CLASSROOM_ROOM.height,
    depth,
    position: new Vector3(
      CLASSROOM_ROOM.minX,
      CLASSROOM_ROOM.height / 2,
      CLASSROOM_ROOM.centerZ,
    ),
    material: materials.wall,
    collisions: true,
  }).parent = root;

  const outer = CLASSROOM_WINDOWS.largeLeft;
  const outerMinX = outer.centerX - outer.width / 2;
  const outerMaxX = outer.centerX + outer.width / 2;
  const outerBottom = outer.centerY - outer.height / 2;
  const outerTop = outer.centerY + outer.height / 2;

  createPanel(scene, root, `${name}-outer-rear`,
    CLASSROOM_ROOM.minX, outerMinX, 0, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ, materials.wall);
  createPanel(scene, root, `${name}-outer-low`,
    outerMinX, outerMaxX, 0, outerBottom,
    CLASSROOM_ROOM.minZ, materials.wall);
  createPanel(scene, root, `${name}-outer-high`,
    outerMinX, outerMaxX, outerTop, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ, materials.wall);
  createPanel(scene, root, `${name}-outer-front`,
    outerMaxX, CLASSROOM_ROOM.maxX, 0, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ, materials.wall);

  const corridorWindow = CLASSROOM_WINDOWS.rearRight;
  const cwMinX = corridorWindow.centerX - corridorWindow.width / 2;
  const cwMaxX = corridorWindow.centerX + corridorWindow.width / 2;
  const cwBottom = corridorWindow.centerY - corridorWindow.height / 2;
  const cwTop = corridorWindow.centerY + corridorWindow.height / 2;
  const doorMinX = CLASSROOM_DOOR.centerX - CLASSROOM_DOOR.width / 2;
  const doorMaxX = CLASSROOM_DOOR.centerX + CLASSROOM_DOOR.width / 2;

  createPanel(scene, root, `${name}-corridor-rear`,
    CLASSROOM_ROOM.minX, cwMinX, 0, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ, materials.wall);
  createPanel(scene, root, `${name}-corridor-window-low`,
    cwMinX, cwMaxX, 0, cwBottom,
    CLASSROOM_ROOM.maxZ, materials.wall);
  createPanel(scene, root, `${name}-corridor-window-high`,
    cwMinX, cwMaxX, cwTop, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ, materials.wall);
  createPanel(scene, root, `${name}-corridor-mid`,
    cwMaxX, doorMinX, 0, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ, materials.wall);
  createPanel(scene, root, `${name}-door-header`,
    doorMinX, doorMaxX, CLASSROOM_DOOR.height, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ, materials.wall);
  createPanel(scene, root, `${name}-corridor-front`,
    doorMaxX, CLASSROOM_ROOM.maxX, 0, CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ, materials.wall);

  const frame = createFittedDoorOpeningModule(scene, `${name}-door-opening`, {
    position: new Vector3(CLASSROOM_DOOR.centerX, 0, CLASSROOM_DOOR.z),
    openingWidth: CLASSROOM_DOOR.width,
    wallHeight: CLASSROOM_ROOM.height,
    doorHeight: CLASSROOM_DOOR.height,
    wallDepth: 0.12,
    frameMaterial: materials.metal,
    wallMaterial: materials.wall,
  });
  frame.parent = root;

  const door = createDoor(scene, root, `${name}-door`, materials.metal);

  if (options.roomLabel) {
    const sign = createSignageV2(scene, `${name}-sign`, {
      text: options.roomLabel,
      position: new Vector3(
        CLASSROOM_DOOR.centerX,
        3.08,
        CLASSROOM_DOOR.z - 0.075,
      ),
      rotationY: 0,
      width: 0.82,
      height: 0.34,
      variant: "room",
    });
    sign.root.parent = root;
  }

  for (const [suffix, w] of [
    ["outer", CLASSROOM_WINDOWS.largeLeft],
    ["corridor", CLASSROOM_WINDOWS.rearRight],
  ] as const) {
    const wf = createWindowFrameModule(scene, `${name}-window-${suffix}`, {
      position: new Vector3(
        w.centerX,
        w.centerY,
        w.z + (suffix === "outer" ? 0.01 : -0.01),
      ),
      rotationY: suffix === "corridor" ? Math.PI : 0,
      width: w.width,
      height: w.height,
      depth: 0.13,
      material: materials.metal,
      glassMaterial: materials.glass,
    });
    wf.parent = root;
  }

  CLASSROOM_DESKS.forEach((placement, i) => {
    const c = createBox(
      scene, `${name}-desk-${i + 1}-collider`,
      1.44, 0.7, 0.54,
      new Vector3(placement.x, 0.35, placement.z),
      materials.metal, root, true,
    );
    c.rotation.y = placement.rotationY;
    c.isVisible = false;
  });

  CLASSROOM_CHAIRS.forEach((placement, i) => {
    const c = createBox(
      scene, `${name}-chair-${i + 1}-collider`,
      0.42, 0.46, 0.42,
      new Vector3(placement.x, 0.23, placement.z),
      materials.metal, root, true,
    );
    c.rotation.y = placement.rotationY;
    c.isVisible = false;
  });

  const teacher = createBox(
    scene, `${name}-teacher-collider`,
    1.65, 0.72, 0.72,
    new Vector3(CLASSROOM_TEACHER_DESK.x, 0.36, CLASSROOM_TEACHER_DESK.z),
    materials.metal, root, true,
  );
  teacher.rotation.y = CLASSROOM_TEACHER_DESK.rotationY;
  teacher.isVisible = false;

  for (const [i, p] of [
    new Vector3(6.0, 3.25, 0.5),
    new Vector3(13.8, 3.25, 0.5),
  ].entries()) {
    const light = new PointLight(`${name}-light-${i + 1}`, p, scene);
    light.parent = root;
    light.intensity = 0.78;
    light.range = 11.5;
    light.diffuse = new Color3(0.94, 0.93, 0.85);
  }

  return { root, door, assetParent, activityAnchor };
}
