import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
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
  createRailingModule,
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
    maxX: 29.4,
    minZ: -24,
    maxZ: 29,
  },
  gate: {
    x: -16.35,
    z: 2.2,
    width: 6,
  },
  canteen: {
    x: -13.05,
    z: -4.55,
    width: 5.2,
    depth: 3.2,
  },
  courtyardTree: {
    x: -8.8,
    z: 3.6,
  },
  buildingA: {
    rootZ: 14,
  },
  buildingB: {
    rootZ: -11,
  },
} as const;

const ROOM_GAP = 0.3;
const ROOM_WORLD_WIDTH =
  CLASSROOM_ROOM.maxX - CLASSROOM_ROOM.minX;
const BUILDING_WEST_X = -6.3;
const BUILDING_BASE_Y = 0.6;

const roomRootX = (index: 0 | 1): number => {
  const desiredMin =
    BUILDING_WEST_X + index * (ROOM_WORLD_WIDTH + ROOM_GAP);
  return desiredMin + CLASSROOM_ROOM.maxX;
};

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

function createPerimeter(scene: Scene): void {
  const materials = createCampusMaterials(scene, "gd4-boundary");
  const { minX, maxX, minZ, maxZ } = LECTURE_HALL_4_LAYOUT.bounds;
  const gate = LECTURE_HALL_4_LAYOUT.gate;
  const wallHeight = 1.25;
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
  createWallModule(scene, "gd4-boundary-south", {
    width: maxX - minX,
    height: wallHeight,
    depth: thickness,
    position: new Vector3(
      (minX + maxX) / 2,
      wallHeight / 2,
      minZ,
    ),
    material: materials.metal,
    collisions: true,
  });
  createWallModule(scene, "gd4-boundary-east", {
    width: thickness,
    height: wallHeight,
    depth: maxZ - minZ,
    position: new Vector3(
      maxX,
      wallHeight / 2,
      (minZ + maxZ) / 2,
    ),
    material: materials.metal,
    collisions: true,
  });

  const lowerDepth = gate.z - gateHalf - minZ;
  const upperDepth = maxZ - (gate.z + gateHalf);
  createWallModule(scene, "gd4-campus-west-lower", {
    width: thickness,
    height: wallHeight,
    depth: lowerDepth,
    position: new Vector3(
      gate.x,
      wallHeight / 2,
      minZ + lowerDepth / 2,
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
  for (const [suffix, z] of [
    ["south", gate.z - gateHalf],
    ["north", gate.z + gateHalf],
  ] as const) {
    createRailingModule(scene, `gd4-gate-approach-${suffix}`, {
      position: new Vector3(approachCenterX, 0, z),
      length: approachLength,
      height: 1.05,
      material: materials.metal,
      collisions: true,
      postSpacing: 1.3,
    });
  }
  createRailingModule(scene, "gd4-gate-approach-outer-limit", {
    position: new Vector3(minX + 0.05, 0, gate.z),
    rotationY: Math.PI / 2,
    length: gate.width,
    height: 1.05,
    material: materials.metal,
    collisions: true,
    postSpacing: 1.1,
  });
}

function createCanteen(scene: Scene): void {
  const materials = createCampusMaterials(scene, "gd4-canteen-shelter");
  const c = LECTURE_HALL_4_LAYOUT.canteen;
  const root = new TransformNode("gd4-canteen-shelter-root", scene);
  root.position.set(c.x, 0, c.z);

  const targetX =
    BUILDING_WEST_X + ROOM_WORLD_WIDTH;
  const targetZ =
    LECTURE_HALL_4_LAYOUT.buildingB.rootZ - CLASSROOM_ROOM.maxZ;
  root.rotation.y = Math.atan2(
    targetX - c.x,
    targetZ - c.z,
  );

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

  const postHeight = 2.85;
  const postSize = 0.16;
  const postInset = 0.28;

  for (const [xLabel, x] of [
    ["left", -c.width / 2 + postInset],
    ["right", c.width / 2 - postInset],
  ] as const) {
    for (const [zLabel, z] of [
      ["back", -c.depth / 2 + postInset],
      ["front", c.depth / 2 - postInset],
    ] as const) {
      createShelterBox(
        `gd4-canteen-shelter-post-${xLabel}-${zLabel}`,
        postSize,
        postHeight,
        postSize,
        x,
        postHeight / 2,
        z,
        materials.metal,
        true,
      );
    }
  }

  const roofOverhang = 0.48;
  createShelterBox(
    "gd4-canteen-shelter-roof",
    c.width + roofOverhang * 2,
    0.16,
    c.depth + roofOverhang * 2,
    0,
    postHeight + 0.08,
    0,
    materials.metal,
    false,
  );

  // Simple serving counter under the canopy. The open/service side is local +Z.
  createShelterBox(
    "gd4-canteen-shelter-counter",
    c.width - 0.7,
    0.9,
    0.55,
    0,
    0.45,
    c.depth / 2 - 0.62,
    materials.wall,
    true,
  );

  root.metadata = {
    role: "canteen-shelter",
    servingDirection: "toward-building-b",
    canonicalName: false,
    placement: "against-gate-wall-corner",
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
    6.6,
    10.4,
    25,
    laneMat,
    true,
  );

  // Vehicle lane between Building A and Building B.
  createGroundBox(
    scene,
    "gd4-lane-middle",
    39,
    9.2,
    10.4,
    1.1,
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
  const corridorZ =
    rootZ - CLASSROOM_ROOM.maxZ - 1.25;

  createGroundBox(
    scene,
    `gd4-${building}-corridor-floor`,
    maxX - minX + 0.6,
    2.5,
    (minX + maxX) / 2,
    corridorZ,
    materials.floor,
    true,
    BUILDING_BASE_Y,
  );

  const stairCenterX = minX + 1.65;
  const stairGapMaxX = stairCenterX + 1.65;
  const railingLength = maxX - stairGapMaxX + 0.2;
  createRailingModule(scene, `gd4-${building}-corridor-railing`, {
    position: new Vector3(
      stairGapMaxX + railingLength / 2,
      BUILDING_BASE_Y,
      corridorZ - 1.18,
    ),
    length: railingLength,
    height: 1.05,
    material: materials.metal,
    collisions: true,
    postSpacing: 1.5,
  });

  const sign = createSignageV2(scene, `gd4-building-${building}-sign`, {
    text: `TÒA ${building}`,
    position: new Vector3(
      maxX - 1.6,
      BUILDING_BASE_Y + 3.15,
      rootZ - CLASSROOM_ROOM.maxZ - 0.12,
    ),
    rotationY: Math.PI,
    width: 2.0,
    height: 0.55,
    variant: "building",
  });
  sign.root.rotation.y = Math.PI;
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

  const bodyMinZ = rootZ - CLASSROOM_ROOM.maxZ;
  const bodyMaxZ = rootZ - CLASSROOM_ROOM.minZ;
  const bodyDepth = bodyMaxZ - bodyMinZ;
  const bodyCenterZ = (bodyMinZ + bodyMaxZ) / 2;
  const corridorOuterZ = bodyMinZ - 2.15;

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

  const upperStoreys = [
    { baseY: BUILDING_BASE_Y + CLASSROOM_ROOM.height, suffix: "02" },
    { baseY: BUILDING_BASE_Y + CLASSROOM_ROOM.height + 3.45, suffix: "03" },
  ] as const;

  for (const storey of upperStoreys) {
    const floorY = storey.baseY;

    createFloorModule(
      scene,
      `gd4-${building}-floor-${storey.suffix}-slab`,
      {
        width,
        depth: bodyDepth,
        height: 0.14,
        position: new Vector3(centerX, floorY, bodyCenterZ),
        material: materials.floor,
        collisions: false,
      },
    );

    createFloorModule(
      scene,
      `gd4-${building}-corridor-${storey.suffix}-slab`,
      {
        width,
        depth: 2.25,
        height: 0.12,
        position: new Vector3(
          centerX,
          floorY + 0.01,
          bodyMinZ - 1.12,
        ),
        material: materials.floor,
        collisions: false,
      },
    );

    createWallModule(
      scene,
      `gd4-${building}-outer-wall-${storey.suffix}`,
      {
        width,
        height: 3.2,
        depth: 0.16,
        position: new Vector3(
          centerX,
          floorY + 1.62,
          bodyMaxZ,
        ),
        material: materials.wall,
        collisions: false,
      },
    );

    for (const side of [
      { suffix: "west", x: minX },
      { suffix: "east", x: maxX },
    ] as const) {
      createWallModule(
        scene,
        `gd4-${building}-end-${side.suffix}-${storey.suffix}`,
        {
          width: 0.16,
          height: 3.2,
          depth: bodyDepth,
          position: new Vector3(
            side.x,
            floorY + 1.62,
            bodyCenterZ,
          ),
          material: materials.wall,
          collisions: false,
        },
      );
    }

    for (let i = 0; i <= 8; i += 1) {
      const x = minX + (width * i) / 8;
      createWallModule(
        scene,
        `gd4-${building}-column-${storey.suffix}-${i + 1}`,
        {
          width: 0.18,
          height: 3.2,
          depth: 0.18,
          position: new Vector3(
            x,
            floorY + 1.62,
            bodyMinZ - 0.08,
          ),
          material: materials.wall,
          collisions: false,
        },
      );
    }

    const windowCount = 8;
    const windowWidth = width / windowCount - 0.62;
    for (let i = 0; i < windowCount; i += 1) {
      createWallModule(
        scene,
        `gd4-${building}-window-${storey.suffix}-${i + 1}`,
        {
          width: windowWidth,
          height: 1.35,
          depth: 0.045,
          position: new Vector3(
            minX + width * ((i + 0.5) / windowCount),
            floorY + 1.72,
            bodyMaxZ + 0.095,
          ),
          material: materials.window,
          collisions: false,
        },
      );
    }

    createRailingModule(
      scene,
      `gd4-${building}-upper-railing-${storey.suffix}`,
      {
        position: new Vector3(
          centerX,
          floorY + 0.03,
          corridorOuterZ,
        ),
        length: width,
        height: 1.05,
        material: materials.metal,
        collisions: false,
        postSpacing: 1.45,
      },
    );
  }

  createFloorModule(scene, `gd4-${building}-roof-slab`, {
    width: width + 0.35,
    depth: bodyDepth + 0.35,
    height: 0.18,
    position: new Vector3(
      centerX,
      BUILDING_BASE_Y + CLASSROOM_ROOM.height + 6.95,
      bodyCenterZ,
    ),
    material: materials.floor,
    collisions: false,
  });

  // Three shallow steps raise the playable ground-floor corridor by 0.6 m.
  for (let i = 0; i < 3; i += 1) {
    const stepHeight = BUILDING_BASE_Y * ((i + 1) / 3);
    const step = MeshBuilder.CreateBox(
      `gd4-${building}-entry-step-${i + 1}`,
      {
        width: 3.0,
        height: stepHeight,
        depth: 0.62,
      },
      scene,
    );
    step.position.set(
      minX + 1.65,
      stepHeight / 2,
      bodyMinZ - 2.15 + i * 0.55,
    );
    step.material = materials.floor;
    step.checkCollisions = false;
    step.isPickable = false;
  }

  // Invisible sloped collision surface keeps first-person movement smooth
  // while the visible geometry still reads as real entrance steps.
  const rampLength = 2.35;
  const ramp = MeshBuilder.CreateBox(
    `gd4-${building}-entry-ramp-collider`,
    {
      width: 3.0,
      height: 0.08,
      depth: rampLength,
    },
    scene,
  );
  ramp.position.set(
    minX + 1.65,
    BUILDING_BASE_Y / 2,
    bodyMinZ - 1.95 + rampLength / 2,
  );
  ramp.rotation.x = -Math.atan2(BUILDING_BASE_Y, rampLength);
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
  const bayCount = 8;
  const bayWidth = 4.2;
  const startX = actualEndX + 0.35;
  const length = bayCount * bayWidth;
  const centerX = startX + length / 2;
  const bodyMinZ = rootZ - CLASSROOM_ROOM.maxZ;
  const bodyMaxZ = rootZ - CLASSROOM_ROOM.minZ;
  const bodyDepth = bodyMaxZ - bodyMinZ;
  const corridorOuterZ = bodyMinZ - 2.15;

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
        (bodyMinZ + bodyMaxZ) / 2,
      ),
      material: materials.floor,
      collisions: false,
    },
  );

  for (let storey = 0; storey < 3; storey += 1) {
    const floorY = BUILDING_BASE_Y + storey * 3.45;

    createFloorModule(
      scene,
      `gd4-${building}-continuation-floor-${storey + 1}`,
      {
        width: length,
        depth: bodyDepth,
        height: 0.12,
        position: new Vector3(centerX, floorY, (bodyMinZ + bodyMaxZ) / 2),
        material: materials.floor,
        collisions: false,
      },
    );

    createFloorModule(
      scene,
      `gd4-${building}-continuation-corridor-${storey + 1}`,
      {
        width: length,
        depth: 2.25,
        height: 0.1,
        position: new Vector3(centerX, floorY, bodyMinZ - 1.12),
        material: materials.floor,
        collisions: false,
      },
    );

    createWallModule(
      scene,
      `gd4-${building}-continuation-outer-${storey + 1}`,
      {
        width: length,
        height: 3.2,
        depth: 0.14,
        position: new Vector3(
          centerX,
          floorY + 1.62,
          bodyMaxZ,
        ),
        material: materials.wall,
        collisions: false,
      },
    );

    createWallModule(
      scene,
      `gd4-${building}-continuation-corridor-wall-${storey + 1}`,
      {
        width: length,
        height: 3.2,
        depth: 0.12,
        position: new Vector3(
          centerX,
          floorY + 1.62,
          bodyMinZ,
        ),
        material: materials.wall,
        collisions: false,
      },
    );

    for (let bay = 0; bay < bayCount; bay += 1) {
      const bayCenterX = startX + bayWidth * (bay + 0.5);

      createWallModule(
        scene,
        `gd4-${building}-continuation-door-${storey + 1}-${bay + 1}`,
        {
          width: 0.95,
          height: 2.05,
          depth: 0.035,
          position: new Vector3(
            bayCenterX - 0.8,
            floorY + 1.03,
            bodyMinZ - 0.08,
          ),
          material: materials.metal,
          collisions: false,
        },
      );

      createWallModule(
        scene,
        `gd4-${building}-continuation-window-${storey + 1}-${bay + 1}`,
        {
          width: 1.65,
          height: 1.15,
          depth: 0.035,
          position: new Vector3(
            bayCenterX + 0.65,
            floorY + 1.75,
            bodyMinZ - 0.08,
          ),
          material: materials.window,
          collisions: false,
        },
      );
    }

    createRailingModule(
      scene,
      `gd4-${building}-continuation-railing-${storey + 1}`,
      {
        position: new Vector3(
          centerX,
          floorY + 0.03,
          corridorOuterZ,
        ),
        length,
        height: 1.05,
        material: materials.metal,
        collisions: false,
        postSpacing: 1.5,
      },
    );
  }

  createFloorModule(
    scene,
    `gd4-${building}-continuation-roof`,
    {
      width: length + 0.3,
      depth: bodyDepth + 0.3,
      height: 0.16,
      position: new Vector3(
        centerX,
        BUILDING_BASE_Y + 3 * 3.45,
        (bodyMinZ + bodyMaxZ) / 2,
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
        roomRootX(def.index),
        BUILDING_BASE_Y,
        def.rootZ,
      ),
      rotationY: Math.PI,
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
      minX: minX + 0.35,
      maxX: maxX - 0.35,
      minY: -2.5,
      maxY: 7,
      minZ: minZ + 0.35,
      maxZ: maxZ - 0.35,
    },
    classrooms,
  };
}
