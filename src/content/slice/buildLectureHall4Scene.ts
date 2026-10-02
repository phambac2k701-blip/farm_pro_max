import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Material } from "@babylonjs/core/Materials/material";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { Scene } from "@babylonjs/core/scene";

import {
  buildClassroomPrefab,
  type ClassroomPrefabInstance,
} from "../../art/classroom/ClassroomPrefab";
import {
  CLASSROOM_ROOM,
} from "../../art/classroom/ClassroomProductionLayout";
import {
  createFloorModule,
  createWallModule,
} from "../../art/environment/EnvironmentKit";
import { createSignageV2 } from "../../art/signage/SignageV2";

export interface LectureHall4Classroom {
  building: "A" | "B";
  roomKey: string;
  visibleLabel?: string;
  prefab: ClassroomPrefabInstance;
}

export interface LectureHall4Scene {
  spawn: Vector3;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
  };
  classrooms: LectureHall4Classroom[];
}

export const LECTURE_HALL_4_LAYOUT = {
  bounds: {
    minX: -22.5,
    // Align the invisible player limit with the east/end wall of
    // the second playable classroom rather than leaving extra depth beyond it.
    maxX: 27.12,
    minZ: -24,
    maxZ: 29,
  },
  gate: {
    x: -16.35,
    z: 2.2,
    width: 6,
  },
  canteen: {
    x: -14.8,
    z: -11.5,
    width: 5.2,
    depth: 3.2,
  },
  courtyardTree: {
    x: -8.8,
    z: 3.6,
  },
  buildingA: {
    rootZ: 11.5,
  },
  buildingB: {
    rootZ: -5.5,
  },
} as const;

const ROOM_GAP = 0.02;
const ROOM_WORLD_WIDTH =
  CLASSROOM_ROOM.maxX - CLASSROOM_ROOM.minX;
const BUILDING_WEST_X = -6.3;
const BUILDING_BASE_Y = 0.8;
const UPPER_STOREY_HEIGHT = 3.45;
const TOTAL_STOREYS = 5;
const CONTINUATION_BAY_COUNT = 8;
const CONTINUATION_BAY_WIDTH = 8.4;
const PARAPET_HEIGHT = 1.15;
const PARAPET_THICKNESS = 0.2;
const STRUCTURAL_COLUMN_SIZE = 0.42;
const CORRIDOR_DEPTH = 2.5;
const ENTRY_STAIR_WIDTH = 2.35;
const SOUTH_CAMPUS_WALL_Z = -14.05;

const getBuildingRotationY = (building: "A" | "B"): number =>
  building === "A" ? 0 : Math.PI;

const roomRootX = (
  index: 0 | 1,
  building: "A" | "B",
): number => {
  const desiredMin =
    BUILDING_WEST_X + index * (ROOM_WORLD_WIDTH + ROOM_GAP);
  return building === "A"
    ? desiredMin - CLASSROOM_ROOM.minX
    : desiredMin + CLASSROOM_ROOM.maxX;
};

const getBuildingBodyZ = (
  building: "A" | "B",
  rootZ: number,
): { minZ: number; maxZ: number } =>
  building === "A"
    ? {
        minZ: rootZ + CLASSROOM_ROOM.minZ,
        maxZ: rootZ + CLASSROOM_ROOM.maxZ,
      }
    : {
        minZ: rootZ - CLASSROOM_ROOM.maxZ,
        maxZ: rootZ - CLASSROOM_ROOM.minZ,
      };

const getUpperStoreys = () =>
  Array.from({ length: TOTAL_STOREYS - 1 }, (_, index) => ({
    floorNumber: index + 2,
    suffix: String(index + 2).padStart(2, "0"),
    baseY:
      BUILDING_BASE_Y +
      CLASSROOM_ROOM.height +
      index * UPPER_STOREY_HEIGHT,
  }));

const BUILDING_ROOF_Y =
  BUILDING_BASE_Y +
  CLASSROOM_ROOM.height +
  (TOTAL_STOREYS - 1) * UPPER_STOREY_HEIGHT;

function readableMaterial(
  scene: Scene,
  name: string,
  diffuse: Color3,
  emissive: Color3,
): StandardMaterial {
  const material = new StandardMaterial(name, scene);
  material.diffuseColor = diffuse;
  material.emissiveColor = emissive;
  material.ambientColor = diffuse.scale(0.45);
  material.specularColor = new Color3(0.06, 0.06, 0.06);
  return material;
}

function createCampusMaterials(scene: Scene, prefix: string) {
  return {
    ground: readableMaterial(
      scene,
      `${prefix}-ground`,
      new Color3(0.64, 0.66, 0.61),
      new Color3(0.12, 0.12, 0.1),
    ),
    lane: readableMaterial(
      scene,
      `${prefix}-lane`,
      new Color3(0.48, 0.5, 0.51),
      new Color3(0.085, 0.085, 0.09),
    ),
    wall: readableMaterial(
      scene,
      `${prefix}-wall`,
      new Color3(0.82, 0.81, 0.72),
      new Color3(0.17, 0.17, 0.14),
    ),
    floor: readableMaterial(
      scene,
      `${prefix}-floor`,
      new Color3(0.67, 0.67, 0.61),
      new Color3(0.12, 0.12, 0.1),
    ),
    metal: readableMaterial(
      scene,
      `${prefix}-metal`,
      new Color3(0.4, 0.44, 0.45),
      new Color3(0.05, 0.055, 0.055),
    ),
    window: readableMaterial(
      scene,
      `${prefix}-window`,
      new Color3(0.31, 0.43, 0.48),
      new Color3(0.05, 0.07, 0.08),
    ),
  };
}

function createGroundBox(
  scene: Scene,
  name: string,
  width: number,
  depth: number,
  x: number,
  z: number,
  material: Material,
  collisions = true,
  elevationY = 0,
): Mesh {
  return createFloorModule(scene, name, {
    width,
    depth,
    position: new Vector3(x, elevationY - 0.05, z),
    material,
    collisions,
  });
}

interface VisualBoxSpec {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
}

function createMergedVisualBoxes(
  scene: Scene,
  name: string,
  material: Material,
  boxes: readonly VisualBoxSpec[],
): Mesh {
  if (boxes.length === 0) {
    throw new Error(`Cannot build empty visual batch: ${name}`);
  }

  const parts = boxes.map((box, index) => {
    const part = MeshBuilder.CreateBox(
      `${name}-part-${index + 1}`,
      {
        width: box.width,
        height: box.height,
        depth: box.depth,
      },
      scene,
    );
    part.position.copyFrom(box.position);
    part.material = material;
    part.checkCollisions = false;
    part.isPickable = false;
    return part;
  });

  const merged = Mesh.MergeMeshes(
    parts,
    true,
    true,
    undefined,
    false,
    false,
  );
  if (!merged) {
    throw new Error(`Failed to merge visual batch: ${name}`);
  }

  merged.name = name;
  merged.material = material;
  merged.checkCollisions = false;
  merged.isPickable = false;
  merged.freezeWorldMatrix();
  return merged;
}

function createInvisibleCollider(
  scene: Scene,
  name: string,
  width: number,
  height: number,
  depth: number,
  position: Vector3,
): Mesh {
  const collider = MeshBuilder.CreateBox(
    name,
    { width, height, depth },
    scene,
  );
  collider.position.copyFrom(position);
  collider.checkCollisions = true;
  collider.isPickable = false;
  collider.visibility = 0;
  return collider;
}

function createPerimeter(scene: Scene): void {
  const materials = createCampusMaterials(scene, "gd4-boundary");
  const { minX, maxX, minZ, maxZ } = LECTURE_HALL_4_LAYOUT.bounds;
  const gate = LECTURE_HALL_4_LAYOUT.gate;
  const wallHeight = 1.25;
  const movementBlockerBottomY = -3;
  const movementBlockerTopY = 8;
  const movementBlockerHeight =
    movementBlockerTopY - movementBlockerBottomY;
  const movementBlockerCenterY =
    (movementBlockerTopY + movementBlockerBottomY) / 2;
  const thickness = 0.18;
  const gateHalf = gate.width / 2;

  createWallModule(scene, "gd4-boundary-north", {
    width: maxX - minX,
    height: wallHeight,
    depth: thickness,
    position: new Vector3(
      (minX + maxX) / 2,
      wallHeight / 2,
      maxZ,
    ),
    material: materials.metal,
    collisions: true,
  });
  const bStairCenterX = BUILDING_WEST_X + 1.65;
  const bStairHalfWidth = 1.7;
  const stairOpeningPadding = 0.15;
  const southOpeningMinX =
    bStairCenterX - bStairHalfWidth - stairOpeningPadding;
  const southOpeningMaxX =
    bStairCenterX + bStairHalfWidth + stairOpeningPadding;
  const southWestWidth = southOpeningMinX - minX;
  const southEastWidth = maxX - southOpeningMaxX;

  createWallModule(scene, "gd4-boundary-south-west", {
    width: southWestWidth,
    height: wallHeight,
    depth: thickness,
    position: new Vector3(
      minX + southWestWidth / 2,
      wallHeight / 2,
      SOUTH_CAMPUS_WALL_Z,
    ),
    material: materials.metal,
    collisions: true,
  });
  createWallModule(scene, "gd4-boundary-south-east", {
    width: southEastWidth,
    height: wallHeight,
    depth: thickness,
    position: new Vector3(
      southOpeningMaxX + southEastWidth / 2,
      wallHeight / 2,
      SOUTH_CAMPUS_WALL_Z,
    ),
    material: materials.metal,
    collisions: true,
  });
  const eastBoundary = MeshBuilder.CreateBox(
    "gd4-boundary-east",
    {
      width: thickness,
      height: movementBlockerHeight,
      depth: maxZ - minZ + 0.4,
    },
    scene,
  );
  eastBoundary.position.set(
    maxX,
    movementBlockerCenterY,
    (minZ + maxZ) / 2,
  );
  eastBoundary.checkCollisions = true;
  eastBoundary.isPickable = false;
  eastBoundary.visibility = 0;

  const lowerDepth =
    gate.z - gateHalf - SOUTH_CAMPUS_WALL_Z;
  const upperDepth = maxZ - (gate.z + gateHalf);
  createWallModule(scene, "gd4-campus-west-lower", {
    width: thickness,
    height: wallHeight,
    depth: lowerDepth,
    position: new Vector3(
      gate.x,
      wallHeight / 2,
      SOUTH_CAMPUS_WALL_Z + lowerDepth / 2,
    ),
    material: materials.metal,
    collisions: true,
  });
  createWallModule(scene, "gd4-campus-west-upper", {
    width: thickness,
    height: wallHeight,
    depth: upperDepth,
    position: new Vector3(
      gate.x,
      wallHeight / 2,
      gate.z + gateHalf + upperDepth / 2,
    ),
    material: materials.metal,
    collisions: true,
  });

  for (const [suffix, z] of [
    ["south", gate.z - gateHalf],
    ["north", gate.z + gateHalf],
  ] as const) {
    createWallModule(scene, `gd4-gate-post-${suffix}`, {
      width: 0.28,
      height: 2.25,
      depth: 0.28,
      position: new Vector3(gate.x, 1.125, z),
      material: materials.metal,
      collisions: true,
    });
  }

  const approachLength = gate.x - minX;
  const approachCenterX = (minX + gate.x) / 2;
  const marking = readableMaterial(
    scene,
    "gd4-gate-approach-marking-material",
    new Color3(0.9, 0.9, 0.84),
    new Color3(0.24, 0.24, 0.21),
  );

  for (const [suffix, z] of [
    ["south", gate.z - gateHalf],
    ["north", gate.z + gateHalf],
  ] as const) {
    createGroundBox(
      scene,
      `gd4-gate-approach-mark-${suffix}`,
      approachLength,
      0.12,
      approachCenterX,
      z,
      marking,
      false,
      0.025,
    );
    createInvisibleCollider(
      scene,
      `gd4-gate-approach-collider-${suffix}`,
      approachLength,
      wallHeight,
      0.12,
      new Vector3(approachCenterX, wallHeight / 2, z),
    );
  }

  createGroundBox(
    scene,
    "gd4-gate-approach-mark-outer-limit",
    0.12,
    gate.width,
    minX + 0.05,
    gate.z,
    marking,
    false,
    0.025,
  );
  createInvisibleCollider(
    scene,
    "gd4-gate-approach-collider-outer-limit",
    0.12,
    wallHeight,
    gate.width,
    new Vector3(minX + 0.05, wallHeight / 2, gate.z),
  );
}

function createCanteen(scene: Scene): void {
  const materials = createCampusMaterials(scene, "gd4-canteen-shelter");
  const c = LECTURE_HALL_4_LAYOUT.canteen;
  const root = new TransformNode("gd4-canteen-shelter-root", scene);
  root.position.set(c.x, 0, c.z);

  // Tuck the shelter against the west perimeter wall while keeping
  // the whole roof safely south of the gate mouth. Local +Z rotates toward
  // +X, so the open/service side still faces Tòa B.
  root.rotation.y = Math.PI / 2;

  const createShelterBox = (
    name: string,
    width: number,
    height: number,
    depth: number,
    x: number,
    y: number,
    z: number,
    material: Material,
    collisions = false,
  ): Mesh => {
    const mesh = MeshBuilder.CreateBox(
      name,
      { width, height, depth },
      scene,
    );
    mesh.parent = root;
    mesh.position.set(x, y, z);
    mesh.material = material;
    mesh.checkCollisions = collisions;
    mesh.isPickable = false;
    return mesh;
  };

  const postInsetX = 0.3;
  const postInsetZ = 0.28;
  const postSize = 0.16;
  const rearPostHeight = 3.05;
  const frontPostHeight = 2.66;

  for (const [xLabel, x] of [
    ["left", -c.width / 2 + postInsetX],
    ["right", c.width / 2 - postInsetX],
  ] as const) {
    for (const [zLabel, z, height] of [
      ["back", -c.depth / 2 + postInsetZ, rearPostHeight],
      ["front", c.depth / 2 - postInsetZ, frontPostHeight],
    ] as const) {
      createShelterBox(
        `gd4-canteen-shelter-post-${xLabel}-${zLabel}`,
        postSize,
        height,
        postSize,
        x,
        height / 2,
        z,
        materials.metal,
        true,
      );
    }
  }

  const roofWallOverhang = 0.04;
  const roofOpenOverhang = 0.5;
  const roof = createShelterBox(
    "gd4-canteen-shelter-roof",
    c.width + roofWallOverhang + roofOpenOverhang,
    0.16,
    c.depth + roofWallOverhang + roofOpenOverhang,
    (roofWallOverhang - roofOpenOverhang) / 2,
    2.88,
    (roofOpenOverhang - roofWallOverhang) / 2,
    materials.metal,
    false,
  );
  roof.rotation.x = 0.12;

  // Back panel and two short side panels keep the stall visually enclosed
  // like the user's sketch while leaving the service/front side open.
  createShelterBox(
    "gd4-canteen-shelter-back-wall",
    c.width - 0.45,
    1.9,
    0.12,
    0,
    1.15,
    -c.depth / 2 + 0.12,
    materials.wall,
    true,
  );

  for (const [suffix, x] of [
    ["left", -c.width / 2 + 0.12],
    ["right", c.width / 2 - 0.12],
  ] as const) {
    createShelterBox(
      `gd4-canteen-shelter-side-wall-${suffix}`,
      0.12,
      1.75,
      1.65,
      x,
      1.12,
      -0.48,
      materials.wall,
      true,
    );
  }

  createShelterBox(
    "gd4-canteen-shelter-counter",
    c.width - 0.8,
    0.95,
    0.55,
    0,
    0.475,
    c.depth / 2 - 0.58,
    materials.wall,
    true,
  );

  root.metadata = {
    role: "canteen-shelter",
    servingDirection: "toward-building-b",
    canonicalName: false,
    placement: "inner-right-corner",
    roofType: "sloped-overhang",
  };
}

function createVehicleLanes(scene: Scene): void {
  const materials = createCampusMaterials(scene, "gd4-lanes");
  const laneMat = materials.lane;

  // Compact approach: from the west gate the building mass is visible immediately.
  createGroundBox(
    scene,
    "gd4-lane-gate-approach",
    11.5,
    8.5,
    -11.2,
    2.2,
    laneMat,
    true,
  );

  // Vehicle lane above Building A.
  createGroundBox(
    scene,
    "gd4-lane-north",
    39,
    6.4,
    10.4,
    22.5,
    laneMat,
    true,
  );

  // Vehicle lane between Building A and Building B.
  createGroundBox(
    scene,
    "gd4-lane-middle",
    39,
    6.0,
    10.4,
    2.5,
    laneMat,
    true,
  );

  // East-side connector lane remains inside the yellow playable perimeter.
  createGroundBox(
    scene,
    "gd4-lane-east-connector",
    5.2,
    40,
    30.7,
    3,
    laneMat,
    true,
  );
}

function createBuildingCorridor(
  scene: Scene,
  building: "A" | "B",
  rootZ: number,
): void {
  const materials = createCampusMaterials(
    scene,
    `gd4-${building}-corridor`,
  );
  const minX = BUILDING_WEST_X;
  const maxX =
    BUILDING_WEST_X + ROOM_WORLD_WIDTH * 2 + ROOM_GAP;
  const width = maxX - minX;
  const centerX = (minX + maxX) / 2;
  const body = getBuildingBodyZ(building, rootZ);
  const corridorSide = building === "A" ? 1 : -1;
  const corridorFaceZ =
    corridorSide > 0 ? body.maxZ : body.minZ;
  const corridorZ =
    corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2);
  const outerEdgeZ =
    corridorFaceZ + corridorSide * CORRIDOR_DEPTH;
  const parapetY =
    BUILDING_BASE_Y + PARAPET_HEIGHT / 2;

  // Keep the visible corridor slab flush with the building ends. The old
  // +0.6 m overhang read as an accidental white plate inside the corridor.
  createGroundBox(
    scene,
    `gd4-${building}-corridor-floor`,
    width,
    CORRIDOR_DEPTH,
    centerX,
    corridorZ,
    materials.floor,
    true,
    BUILDING_BASE_Y,
  );

  // Fill the whole void below the elevated ground-floor corridor.
  createWallModule(
    scene,
    `gd4-${building}-corridor-plinth`,
    {
      width,
      height: BUILDING_BASE_Y,
      depth: CORRIDOR_DEPTH,
      position: new Vector3(
        centerX,
        BUILDING_BASE_Y / 2,
        corridorZ,
      ),
      material: materials.wall,
      collisions: true,
    },
  );

  // Stairs now enter from the west end of the corridor, so the front
  // parapet can run as one clean uninterrupted wall all the way east.
  const eastJoinX = LECTURE_HALL_4_LAYOUT.bounds.maxX + 0.08;
  const edgeLength = eastJoinX - minX;
  const edgeCenterX = minX + edgeLength / 2;
  createWallModule(scene, `gd4-${building}-corridor-parapet`, {
    width: edgeLength,
    height: PARAPET_HEIGHT,
    depth: PARAPET_THICKNESS,
    position: new Vector3(
      edgeCenterX,
      parapetY,
      outerEdgeZ,
    ),
    material: materials.wall,
    collisions: true,
  });

  // One true corner pier, continuous from the ground-floor slab to roof.
  // Upper-floor batches deliberately skip this same outer corner so the
  // pier never doubles up into a visible bump.
  const cornerColumnHeight =
    BUILDING_ROOF_Y - BUILDING_BASE_Y;
  createWallModule(
    scene,
    `gd4-${building}-corridor-corner-column`,
    {
      width: STRUCTURAL_COLUMN_SIZE,
      height: cornerColumnHeight,
      depth: STRUCTURAL_COLUMN_SIZE,
      position: new Vector3(
        minX,
        BUILDING_BASE_Y + cornerColumnHeight / 2,
        outerEdgeZ,
      ),
      material: materials.wall,
      collisions: true,
    },
  );
}

function createBuildingMassing(
  scene: Scene,
  building: "A" | "B",
  rootZ: number,
): void {
  const materials = createCampusMaterials(
    scene,
    `gd4-${building}-massing`,
  );
  const minX = BUILDING_WEST_X;
  const maxX =
    BUILDING_WEST_X + ROOM_WORLD_WIDTH * 2 + ROOM_GAP;
  const width = maxX - minX;
  const centerX = (minX + maxX) / 2;
  const body = getBuildingBodyZ(building, rootZ);
  const bodyDepth = body.maxZ - body.minZ;
  const bodyCenterZ = (body.minZ + body.maxZ) / 2;
  const corridorSide = building === "A" ? 1 : -1;
  const corridorFaceZ =
    corridorSide > 0 ? body.maxZ : body.minZ;
  const corridorZ =
    corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2);
  const outerFaceZ =
    corridorSide > 0 ? body.minZ : body.maxZ;
  const corridorOuterZ =
    corridorFaceZ + corridorSide * CORRIDOR_DEPTH;

  createWallModule(
    scene,
    `gd4-${building}-foundation-plinth`,
    {
      width,
      height: BUILDING_BASE_Y,
      depth: bodyDepth,
      position: new Vector3(
        centerX,
        BUILDING_BASE_Y / 2,
        bodyCenterZ,
      ),
      material: materials.floor,
      collisions: true,
    },
  );

  const upperFloors: VisualBoxSpec[] = [];
  const upperWalls: VisualBoxSpec[] = [];
  const upperWindows: VisualBoxSpec[] = [];
  const sideParapetDepth =
    Math.abs(corridorOuterZ - corridorFaceZ) +
    PARAPET_THICKNESS;

  for (const storey of getUpperStoreys()) {
    const floorY = storey.baseY;

    upperFloors.push(
      {
        width,
        height: 0.14,
        depth: bodyDepth,
        position: new Vector3(centerX, floorY, bodyCenterZ),
      },
      {
        width,
        height: 0.12,
        depth: CORRIDOR_DEPTH,
        position: new Vector3(
          centerX,
          floorY + 0.01,
          corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2),
        ),
      },
    );

    upperWalls.push({
      width,
      height: 3.2,
      depth: 0.16,
      position: new Vector3(
        centerX,
        floorY + 1.62,
        outerFaceZ,
      ),
    });

    const windowCount = 8;
    const windowWidth = width / windowCount - 0.62;
    for (let i = 0; i < windowCount; i += 1) {
      upperWindows.push({
        width: windowWidth,
        height: 1.35,
        depth: 0.045,
        position: new Vector3(
          minX + width * ((i + 0.5) / windowCount),
          floorY + 1.72,
          outerFaceZ - corridorSide * 0.095,
        ),
      });
    }

    upperWalls.push(
      {
        width,
        height: PARAPET_HEIGHT,
        depth: PARAPET_THICKNESS,
        position: new Vector3(
          centerX,
          floorY + PARAPET_HEIGHT / 2,
          corridorOuterZ,
        ),
      },
      {
        width: PARAPET_THICKNESS,
        height: PARAPET_HEIGHT,
        depth: sideParapetDepth,
        position: new Vector3(
          minX,
          floorY + PARAPET_HEIGHT / 2,
          (corridorFaceZ + corridorOuterZ) / 2,
        ),
      },
    );
  }

  upperFloors.push({
    width,
    height: 0.14,
    depth: CORRIDOR_DEPTH,
    position: new Vector3(
      centerX,
      BUILDING_ROOF_Y,
      corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2),
    ),
  });

  const continuousColumnHeight =
    BUILDING_ROOF_Y - BUILDING_BASE_Y;
  const continuousColumnY =
    BUILDING_BASE_Y + continuousColumnHeight / 2;

  // A single full-height skin on each blank end facade hides the old
  // storey-by-storey slab edges, keeping the side faces flat and smooth.
  for (const x of [minX, maxX]) {
    upperWalls.push({
      width: 0.28,
      height: BUILDING_ROOF_Y,
      depth: bodyDepth + 0.06,
      position: new Vector3(
        x,
        BUILDING_ROOF_Y / 2,
        bodyCenterZ,
      ),
    });
  }

  for (let i = 0; i <= 8; i += 1) {
    const x = minX + (width * i) / 8;
    upperWalls.push({
      width: STRUCTURAL_COLUMN_SIZE,
      height: continuousColumnHeight,
      depth: STRUCTURAL_COLUMN_SIZE,
      position: new Vector3(
        x,
        continuousColumnY,
        corridorFaceZ + corridorSide * 0.1,
      ),
    });
    // i=0 is the explicit ground-to-roof corner pier created by
    // createBuildingCorridor; skip it here to avoid a doubled bump.
    if (i > 0) {
      upperWalls.push({
        width: STRUCTURAL_COLUMN_SIZE,
        height: continuousColumnHeight,
        depth: STRUCTURAL_COLUMN_SIZE,
        position: new Vector3(
          x,
          continuousColumnY,
          corridorOuterZ,
        ),
      });
    }
  }

  const floorBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-upper-floor-batch`,
    materials.floor,
    upperFloors,
  );
  floorBatch.metadata = {
    role: "upper-storey-floor-batch",
    totalStoreys: TOTAL_STOREYS,
    corridorRoofCapped: true,
    visualOnly: true,
  };

  const wallBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-upper-masonry-batch`,
    materials.wall,
    upperWalls,
  );
  wallBatch.metadata = {
    role: "upper-storey-masonry-batch",
    totalStoreys: TOTAL_STOREYS,
    treatment: "solid-parapet-and-continuous-columns",
    parapetHeight: PARAPET_HEIGHT,
    columnsContinuousToRoof: true,
    visualOnly: true,
  };

  const windowBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-upper-window-batch`,
    materials.window,
    upperWindows,
  );
  windowBatch.metadata = {
    role: "upper-storey-window-batch",
    totalStoreys: TOTAL_STOREYS,
    visualOnly: true,
  };

  createFloorModule(scene, `gd4-${building}-roof-slab`, {
    width: width + 0.04,
    depth: bodyDepth + 0.04,
    height: 0.18,
    position: new Vector3(
      centerX,
      BUILDING_ROOF_Y,
      bodyCenterZ,
    ),
    material: materials.floor,
    collisions: false,
  });

  const stairSteps = 5;
  const stairRun = 0.42;
  const stairRise = BUILDING_BASE_Y / stairSteps;

  // The entrance stair is at the WEST END of the corridor and climbs
  // straight east into it. This replaces the old stair that incorrectly
  // approached the corridor from its front face.
  for (let i = 0; i < stairSteps; i += 1) {
    const stepHeight = stairRise * (i + 1);
    const stepCenterX =
      minX - stairRun * (stairSteps - i - 0.5);
    const step = MeshBuilder.CreateBox(
      `gd4-${building}-entry-step-${i + 1}`,
      {
        width: stairRun + 0.015,
        height: stepHeight,
        depth: ENTRY_STAIR_WIDTH,
      },
      scene,
    );
    step.position.set(
      stepCenterX,
      stepHeight / 2,
      corridorZ,
    );
    step.material = materials.floor;
    step.checkCollisions = false;
    step.isPickable = false;
  }

  const rampLength = stairRun * stairSteps;
  const ramp = MeshBuilder.CreateBox(
    `gd4-${building}-entry-ramp-collider`,
    {
      width: rampLength,
      height: 0.08,
      depth: ENTRY_STAIR_WIDTH,
    },
    scene,
  );
  ramp.position.set(
    minX - rampLength / 2,
    BUILDING_BASE_Y / 2,
    corridorZ,
  );
  ramp.rotation.z = Math.atan2(BUILDING_BASE_Y, rampLength);
  ramp.material = materials.floor;
  ramp.visibility = 0;
  ramp.isPickable = false;
  ramp.checkCollisions = true;
}

function createBuildingContinuation(
  scene: Scene,
  building: "A" | "B",
  rootZ: number,
): void {
  const materials = createCampusMaterials(
    scene,
    `gd4-${building}-continuation`,
  );
  const actualEndX =
    BUILDING_WEST_X + ROOM_WORLD_WIDTH * 2 + ROOM_GAP;
  const startX = actualEndX - 0.04;
  const length =
    CONTINUATION_BAY_COUNT * CONTINUATION_BAY_WIDTH + 0.04;
  const centerX = startX + length / 2;
  const body = getBuildingBodyZ(building, rootZ);
  const bodyDepth = body.maxZ - body.minZ;
  const corridorSide = building === "A" ? 1 : -1;
  const corridorFaceZ =
    corridorSide > 0 ? body.maxZ : body.minZ;
  const outerFaceZ =
    corridorSide > 0 ? body.minZ : body.maxZ;
  const corridorOuterZ =
    corridorFaceZ + corridorSide * CORRIDOR_DEPTH;

  createWallModule(
    scene,
    `gd4-${building}-continuation-foundation`,
    {
      width: length,
      height: BUILDING_BASE_Y,
      depth: bodyDepth,
      position: new Vector3(
        centerX,
        BUILDING_BASE_Y / 2,
        (body.minZ + body.maxZ) / 2,
      ),
      material: materials.floor,
      collisions: false,
    },
  );

  createWallModule(
    scene,
    `gd4-${building}-continuation-corridor-plinth`,
    {
      width: length,
      height: BUILDING_BASE_Y,
      depth: CORRIDOR_DEPTH,
      position: new Vector3(
        centerX,
        BUILDING_BASE_Y / 2,
        corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2),
      ),
      material: materials.wall,
      collisions: false,
    },
  );

  const floorLevels = [
    {
      floorNumber: 1,
      suffix: "01",
      baseY: BUILDING_BASE_Y,
    },
    ...getUpperStoreys(),
  ];
  const floors: VisualBoxSpec[] = [];
  const walls: VisualBoxSpec[] = [];
  const doors: VisualBoxSpec[] = [];
  const windows: VisualBoxSpec[] = [];

  for (const storey of floorLevels) {
    const floorY = storey.baseY;

    floors.push(
      {
        width: length,
        height: 0.12,
        depth: bodyDepth,
        position: new Vector3(
          centerX,
          floorY,
          (body.minZ + body.maxZ) / 2,
        ),
      },
      {
        width: length,
        height: 0.1,
        depth: CORRIDOR_DEPTH,
        position: new Vector3(
          centerX,
          floorY,
          corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2),
        ),
      },
    );

    walls.push(
      {
        width: length,
        height: 3.2,
        depth: 0.14,
        position: new Vector3(
          centerX,
          floorY + 1.62,
          outerFaceZ,
        ),
      },
      {
        width: length,
        height: 3.2,
        depth: 0.12,
        position: new Vector3(
          centerX,
          floorY + 1.62,
          corridorFaceZ,
        ),
      },
      {
        width: length,
        height: PARAPET_HEIGHT,
        depth: PARAPET_THICKNESS,
        position: new Vector3(
          centerX,
          floorY + PARAPET_HEIGHT / 2,
          corridorOuterZ,
        ),
      },
    );

    for (let bay = 0; bay < CONTINUATION_BAY_COUNT; bay += 1) {
      const bayCenterX =
        startX + CONTINUATION_BAY_WIDTH * (bay + 0.5);

      doors.push({
        width: 1.0,
        height: 2.05,
        depth: 0.035,
        position: new Vector3(
          bayCenterX - CONTINUATION_BAY_WIDTH * 0.23,
          floorY + 1.03,
          corridorFaceZ + corridorSide * 0.08,
        ),
      });

      windows.push({
        width: Math.min(
          2.35,
          CONTINUATION_BAY_WIDTH * 0.34,
        ),
        height: 1.15,
        depth: 0.035,
        position: new Vector3(
          bayCenterX + CONTINUATION_BAY_WIDTH * 0.16,
          floorY + 1.75,
          corridorFaceZ + corridorSide * 0.08,
        ),
      });
    }
  }

  floors.push({
    width: length,
    height: 0.12,
    depth: CORRIDOR_DEPTH,
    position: new Vector3(
      centerX,
      BUILDING_ROOF_Y,
      corridorFaceZ + corridorSide * (CORRIDOR_DEPTH / 2),
    ),
  });

  const continuousColumnHeight =
    BUILDING_ROOF_Y - BUILDING_BASE_Y;
  const continuousColumnY =
    BUILDING_BASE_Y + continuousColumnHeight / 2;
  for (let bayEdge = 0; bayEdge <= CONTINUATION_BAY_COUNT; bayEdge += 1) {
    const x = startX + CONTINUATION_BAY_WIDTH * bayEdge;
    walls.push(
      {
        width: STRUCTURAL_COLUMN_SIZE,
        height: continuousColumnHeight,
        depth: STRUCTURAL_COLUMN_SIZE,
        position: new Vector3(
          x,
          continuousColumnY,
          corridorFaceZ + corridorSide * 0.08,
        ),
      },
      {
        width: STRUCTURAL_COLUMN_SIZE,
        height: continuousColumnHeight,
        depth: STRUCTURAL_COLUMN_SIZE,
        position: new Vector3(
          x,
          continuousColumnY,
          corridorOuterZ,
        ),
      },
    );
  }

  const floorBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-continuation-floor-batch`,
    materials.floor,
    floors,
  );
  floorBatch.metadata = {
    role: "continuation-floor-batch",
    totalStoreys: TOTAL_STOREYS,
    bayCount: CONTINUATION_BAY_COUNT,
    baySpacing: CONTINUATION_BAY_WIDTH,
    startX,
    corridorRoofCapped: true,
    visualOnly: true,
  };

  const wallBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-continuation-masonry-batch`,
    materials.wall,
    walls,
  );
  wallBatch.metadata = {
    role: "continuation-masonry-batch",
    totalStoreys: TOTAL_STOREYS,
    bayCount: CONTINUATION_BAY_COUNT,
    baySpacing: CONTINUATION_BAY_WIDTH,
    treatment: "solid-parapet-and-continuous-columns",
    parapetHeight: PARAPET_HEIGHT,
    columnsContinuousToRoof: true,
    visualOnly: true,
  };

  const doorBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-continuation-door-batch`,
    materials.metal,
    doors,
  );
  doorBatch.metadata = {
    role: "continuation-door-batch",
    totalStoreys: TOTAL_STOREYS,
    bayCount: CONTINUATION_BAY_COUNT,
    baySpacing: CONTINUATION_BAY_WIDTH,
    visualOnly: true,
  };

  const windowBatch = createMergedVisualBoxes(
    scene,
    `gd4-${building}-continuation-window-batch`,
    materials.window,
    windows,
  );
  windowBatch.metadata = {
    role: "continuation-window-batch",
    totalStoreys: TOTAL_STOREYS,
    bayCount: CONTINUATION_BAY_COUNT,
    baySpacing: CONTINUATION_BAY_WIDTH,
    visualOnly: true,
  };

  createFloorModule(
    scene,
    `gd4-${building}-continuation-roof`,
    {
      width: length + 0.3,
      depth: bodyDepth + 0.3,
      height: 0.16,
      position: new Vector3(
        centerX,
        BUILDING_ROOF_Y,
        (body.minZ + body.maxZ) / 2,
      ),
      material: materials.floor,
      collisions: false,
    },
  );
}

function createCityBackdrop(scene: Scene): void {
  const cardMaterial = (
    name: string,
    color: Color3,
  ): StandardMaterial => {
    const material = readableMaterial(
      scene,
      name,
      color,
      color.scale(0.28),
    );
    material.disableLighting = true;
    material.backFaceCulling = false;
    return material;
  };

  const cards = [
    {
      name: "west-south",
      position: new Vector3(-30.5, 5.6, -11),
      width: 17,
      height: 11,
      rotationY: Math.PI / 2,
      color: new Color3(0.49, 0.53, 0.55),
      textureSlot: "TBD_USER_AI_BG_WEST_SOUTH",
    },
    {
      name: "west-north",
      position: new Vector3(-30.5, 5.9, 16),
      width: 18,
      height: 11.8,
      rotationY: Math.PI / 2,
      color: new Color3(0.56, 0.56, 0.53),
      textureSlot: "TBD_USER_AI_BG_WEST_NORTH",
    },
    {
      name: "north",
      position: new Vector3(3, 6.4, 36),
      width: 34,
      height: 12.8,
      rotationY: Math.PI,
      color: new Color3(0.45, 0.5, 0.52),
      textureSlot: "TBD_USER_AI_BG_NORTH",
    },
    {
      name: "east",
      position: new Vector3(43, 6.6, 3),
      width: 35,
      height: 13.2,
      rotationY: -Math.PI / 2,
      color: new Color3(0.52, 0.53, 0.5),
      textureSlot: "TBD_USER_AI_BG_EAST",
    },
    {
      name: "south",
      position: new Vector3(4, 5.8, -32),
      width: 36,
      height: 11.6,
      rotationY: 0,
      color: new Color3(0.46, 0.5, 0.51),
      textureSlot: "TBD_USER_AI_BG_SOUTH",
    },
  ] as const;

  cards.forEach((card) => {
    const plane = MeshBuilder.CreatePlane(
      `gd4-background-card-${card.name}`,
      {
        width: card.width,
        height: card.height,
        sideOrientation: 2,
      },
      scene,
    );
    plane.position.copyFrom(card.position);
    plane.rotation.y = card.rotationY;
    plane.material = cardMaterial(
      `gd4-background-card-material-${card.name}`,
      card.color,
    );
    plane.checkCollisions = false;
    plane.isPickable = false;
    plane.metadata = {
      role: "future-ai-background-card",
      textureSlot: card.textureSlot,
      replaceableByUserArt: true,
      placeholderEnabled: false,
    };
    // Keep the lightweight card slots in the scene graph, but do not show
    // temporary solid-color placeholders. They become visible only after
    // user-approved AI/authored background art is assigned.
    plane.setEnabled(false);
  });

  const outsideRoad = createGroundBox(
    scene,
    "gd4-city-road-outside-gate",
    16,
    8,
    LECTURE_HALL_4_LAYOUT.bounds.minX - 7.5,
    LECTURE_HALL_4_LAYOUT.gate.z,
    readableMaterial(
      scene,
      "gd4-city-road-material",
      new Color3(0.43, 0.45, 0.46),
      new Color3(0.055, 0.055, 0.06),
    ),
    false,
  );
  outsideRoad.isPickable = false;
}

function buildClassrooms(scene: Scene): LectureHall4Classroom[] {
  const result: LectureHall4Classroom[] = [];

  const definitions = [
    {
      building: "A" as const,
      roomKey: "A-101",
      visibleLabel: "P 101",
      index: 0 as const,
      rootZ: LECTURE_HALL_4_LAYOUT.buildingA.rootZ,
    },
    {
      building: "A" as const,
      roomKey: "A-102",
      visibleLabel: "P 102",
      index: 1 as const,
      rootZ: LECTURE_HALL_4_LAYOUT.buildingA.rootZ,
    },
    {
      building: "B" as const,
      roomKey: "B-TBD-1",
      visibleLabel: undefined,
      index: 0 as const,
      rootZ: LECTURE_HALL_4_LAYOUT.buildingB.rootZ,
    },
    {
      building: "B" as const,
      roomKey: "B-TBD-2",
      visibleLabel: undefined,
      index: 1 as const,
      rootZ: LECTURE_HALL_4_LAYOUT.buildingB.rootZ,
    },
  ];

  for (const def of definitions) {
    const prefab = buildClassroomPrefab(scene, {
      name: `gd4-room-${def.roomKey}`,
      roomLabel: def.visibleLabel,
      position: new Vector3(
        roomRootX(def.index, def.building),
        BUILDING_BASE_Y,
        def.rootZ,
      ),
      rotationY: getBuildingRotationY(def.building),
    });
    result.push({
      building: def.building,
      roomKey: def.roomKey,
      visibleLabel: def.visibleLabel,
      prefab,
    });
  }

  return result;
}

export function buildLectureHall4Scene(
  scene: Scene,
): LectureHall4Scene {
  const materials = createCampusMaterials(scene, "gd4-ground");
  const { minX, maxX, minZ, maxZ } = LECTURE_HALL_4_LAYOUT.bounds;

  scene.clearColor.set(0.72, 0.78, 0.78, 1);
  scene.imageProcessingConfiguration.exposure = 1.0;
  scene.imageProcessingConfiguration.contrast = 1.02;

  createGroundBox(
    scene,
    "gd4-playable-ground",
    maxX - minX,
    maxZ - minZ,
    (minX + maxX) / 2,
    (minZ + maxZ) / 2,
    materials.ground,
    true,
  );

  createPerimeter(scene);
  createVehicleLanes(scene);
  createCanteen(scene);

  const classrooms = buildClassrooms(scene);
  createBuildingCorridor(
    scene,
    "A",
    LECTURE_HALL_4_LAYOUT.buildingA.rootZ,
  );
  createBuildingMassing(
    scene,
    "A",
    LECTURE_HALL_4_LAYOUT.buildingA.rootZ,
  );
  createBuildingContinuation(
    scene,
    "A",
    LECTURE_HALL_4_LAYOUT.buildingA.rootZ,
  );
  createBuildingCorridor(
    scene,
    "B",
    LECTURE_HALL_4_LAYOUT.buildingB.rootZ,
  );
  createBuildingMassing(
    scene,
    "B",
    LECTURE_HALL_4_LAYOUT.buildingB.rootZ,
  );
  createBuildingContinuation(
    scene,
    "B",
    LECTURE_HALL_4_LAYOUT.buildingB.rootZ,
  );
  createCityBackdrop(scene);

  const ambient = new HemisphericLight(
    "gd4-ambient",
    new Vector3(0.15, 1, 0.2),
    scene,
  );
  ambient.intensity = 0.78;
  ambient.diffuse = new Color3(1, 0.99, 0.94);
  ambient.groundColor = new Color3(0.62, 0.64, 0.6);

  const sun = new DirectionalLight(
    "gd4-daylight-sun",
    new Vector3(-0.35, -1, 0.28),
    scene,
  );
  sun.position.set(-18, 28, -12);
  sun.intensity = 0.72;
  sun.diffuse = new Color3(1, 0.97, 0.88);

  const gateSign = createSignageV2(scene, "gd4-gate-sign", {
    text: "GIẢNG ĐƯỜNG 4",
    position: new Vector3(
      LECTURE_HALL_4_LAYOUT.gate.x + 0.25,
      2.45,
      LECTURE_HALL_4_LAYOUT.gate.z,
    ),
    rotationY: Math.PI / 2,
    width: 2.8,
    height: 0.65,
    variant: "building",
  });
  gateSign.root.rotation.y = Math.PI / 2;

  return {
    spawn: new Vector3(-15.25, 0.01, 2.2),
    bounds: {
      minX,
      maxX,
      minY: -2.5,
      maxY: 7,
      minZ,
      maxZ,
    },
    classrooms,
  };
}
