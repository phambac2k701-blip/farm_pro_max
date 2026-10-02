import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import type { Material } from "@babylonjs/core/Materials/material";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";

import { createSurfaceDecal } from "../../../../art/environment/DecalKit";
import {
  createCabinetModule,
  createConduitModule,
  createDoorFrameModule,
  createFittedDoorOpeningModule,
  createFluorescentFixtureModule,
  createNoticeBoardModule,
  createRailingModule,
  createSocketSwitchModule,
  createWindowFrameModule,
} from "../../../../art/environment/EnvironmentKit";
import {
  CLASSROOM_CHAIRS,
  CLASSROOM_DESKS,
  CLASSROOM_DOOR,
  CLASSROOM_ROOM,
  CLASSROOM_TEACHER_DESK,
  CLASSROOM_WINDOWS,
} from "../../../../art/classroom/ClassroomProductionLayout";
import { createProductionMaterialLibrary } from "../../../../art/materials/ProductionMaterialLibrary";
import { createSignageV2 } from "../../../../art/signage/SignageV2";
import type { ChapterOneCheckpointId } from "../state";

// User-approved working room-number examples only. Final building topology remains TBD_USER_APPROVAL.
export const CH01_WORKING_ROOM_SIGN_LABELS = {
  classroom: "P 202",
  adjacentRoom: "P 204",
} as const;

export interface ChapterOneDoorAssembly {
  hinge: TransformNode;
  leaf: Mesh;
  closedRotationY: number;
  openRotationY: number;
}

export interface ChapterOneProductionScene {
  spawn: Vector3;
  checkpoints: Record<ChapterOneCheckpointId, TransformNode>;
  gateCenter: Vector3;
  guardShelterCenter: Vector3;
  corridorCenter: Vector3;
  classroomCenter: Vector3;
  paRoomCenter: Vector3;
  sideEntranceDoor: ChapterOneDoorAssembly;
  classroomDoor: ChapterOneDoorAssembly;
  paRoomDoor: ChapterOneDoorAssembly;
  corridorExitDoor: ChapterOneDoorAssembly;
  studentDesks: TransformNode[];
  teacherDesk: TransformNode;
  paStations: TransformNode[];
  ninthPaStation: TransformNode;
  ninthPaStationCollider: Mesh;
  ninthHeadsetProp: Mesh;
  ninthCable: Mesh;
  paSpeakerProp: Mesh;
  paRoomLight: PointLight;
  paDeskLamp: PointLight;
  paKcrAccentLight: PointLight;
  paReentryZone: Mesh;
  guardKeyRack: Mesh;
  guardNotebook: Mesh;
  flashlight: Mesh;
  raincoat: Mesh;
  classroomDrawer: Mesh;
  drawerLabel09: Mesh;
  rosterProp: Mesh;
  classPhotoProp: Mesh;
  timetableProp: Mesh;
  paStationLabelsProp: Mesh;
  paIndexCardProp: Mesh;
  corridorPhotoBoard: Mesh;
  finalReflectionShoulder: Mesh;
  rosterInspectionAnchor: TransformNode;
  photoInspectionAnchor: TransformNode;
  timetableInspectionAnchor: TransformNode;
  paStationLabelsInspectionAnchor: TransformNode;
  paIndexCardInspectionAnchor: TransformNode;
  ninthHeadsetInspectionAnchor: TransformNode;
  corridorReturnZone: Mesh;
  insideOldWingZone: Mesh;
  classroomEntryZone: Mesh;
  paThresholdZone: Mesh;
}

interface BoxOptions {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
  material: Material;
  collisions?: boolean;
  pickable?: boolean;
}

function createMaterial(
  scene: Scene,
  name: string,
  diffuse: Color3,
  emissive?: Color3,
): StandardMaterial {
  const value = new StandardMaterial(name, scene);
  value.diffuseColor = diffuse;
  value.specularColor = new Color3(0.08, 0.08, 0.08);
  if (emissive) {
    value.emissiveColor = emissive;
  }
  return value;
}

function createBox(
  scene: Scene,
  name: string,
  options: BoxOptions,
): Mesh {
  const mesh = MeshBuilder.CreateBox(
    name,
    {
      width: options.width,
      height: options.height,
      depth: options.depth,
    },
    scene,
  );
  mesh.position.copyFrom(options.position);
  mesh.material = options.material;
  mesh.checkCollisions = options.collisions ?? false;
  mesh.isPickable = options.pickable ?? false;
  return mesh;
}

function createAnchor(
  scene: Scene,
  name: string,
  position: Vector3,
): TransformNode {
  const node = new TransformNode(name, scene);
  node.position.copyFrom(position);
  return node;
}

function createDoorAlongX(
  scene: Scene,
  name: string,
  hingePosition: Vector3,
  material: StandardMaterial,
  openRotationY: number,
): ChapterOneDoorAssembly {
  const hinge = createAnchor(scene, `${name}-hinge`, hingePosition);
  const leaf = createBox(scene, `${name}-leaf`, {
    width: 1.3,
    height: 2.35,
    depth: 0.075,
    position: Vector3.Zero(),
    material,
    collisions: true,
  });
  leaf.parent = hinge;
  leaf.position.set(0.65, 1.175, 0);
  hinge.rotation.y = openRotationY;

  return {
    hinge,
    leaf,
    closedRotationY: 0,
    openRotationY,
  };
}

function createDoorAlongZ(
  scene: Scene,
  name: string,
  hingePosition: Vector3,
  material: StandardMaterial,
  openRotationY: number,
): ChapterOneDoorAssembly {
  const hinge = createAnchor(scene, `${name}-hinge`, hingePosition);
  const leaf = createBox(scene, `${name}-leaf`, {
    width: 0.075,
    height: 2.35,
    depth: 1.38,
    position: Vector3.Zero(),
    material,
    collisions: true,
  });
  leaf.parent = hinge;
  leaf.position.set(0, 1.175, 0.69);
  hinge.rotation.y = openRotationY;

  return {
    hinge,
    leaf,
    closedRotationY: 0,
    openRotationY,
  };
}

function createChair(
  scene: Scene,
  name: string,
  root: TransformNode,
  material: StandardMaterial,
  position: Vector3,
): void {
  const seat = createBox(scene, `${name}-seat`, {
    width: 0.46,
    height: 0.07,
    depth: 0.45,
    position,
    material,
  });
  seat.parent = root;

  const back = createBox(scene, `${name}-back`, {
    width: 0.46,
    height: 0.5,
    depth: 0.06,
    position: position.add(new Vector3(0, 0.28, 0.22)),
    material,
  });
  back.parent = root;
}

function createHeadset(
  scene: Scene,
  name: string,
  root: TransformNode,
  material: StandardMaterial,
  position: Vector3,
): void {
  const band = MeshBuilder.CreateTorus(
    `${name}-band`,
    {
      diameter: 0.24,
      thickness: 0.025,
      tessellation: 20,
    },
    scene,
  );
  band.position.copyFrom(position);
  band.rotation.x = Math.PI / 2;
  band.material = material;
  band.parent = root;
  band.isPickable = false;

  for (const x of [-0.11, 0.11]) {
    const cup = createBox(scene, `${name}-cup-${x}`, {
      width: 0.045,
      height: 0.1,
      depth: 0.07,
      position: position.add(new Vector3(x, -0.04, 0)),
      material,
    });
    cup.parent = root;
  }
}

function createPaStation(
  scene: Scene,
  index: number,
  position: Vector3,
  wood: StandardMaterial,
  metal: StandardMaterial,
  plastic: StandardMaterial,
  includeDesk = true,
): TransformNode {
  const root = createAnchor(
    scene,
    index === 9 ? "pa-station-ninth" : `pa-station-${index}`,
    position,
  );

  if (includeDesk) {
    const desk = createBox(scene, `pa-station-${index}-desk`, {
      width: 1.05,
      height: 0.08,
      depth: 0.62,
      position: new Vector3(0, 0.78, 0),
      material: wood,
      collisions: true,
    });
    desk.parent = root;

    const panel = createBox(scene, `pa-station-${index}-panel`, {
      width: 0.82,
      height: 0.08,
      depth: 0.34,
      position: new Vector3(0, 0.84, 0),
      material: metal,
    });
    panel.parent = root;

    const label = createBox(scene, `pa-station-${index}-label`, {
      width: 0.18,
      height: 0.08,
      depth: 0.015,
      position: new Vector3(0.38, 0.83, -0.32),
      material: plastic,
    });
    label.parent = root;
  }

  createChair(
    scene,
    `pa-station-${index}-chair`,
    root,
    wood,
    new Vector3(0, 0.46, -0.76),
  );
  createHeadset(
    scene,
    `pa-station-${index}-headset`,
    root,
    plastic,
    new Vector3(0, 0.98, -0.73),
  );

  return root;
}

function createTextSign(
  scene: Scene,
  name: string,
  text: string,
  position: Vector3,
  rotationY: number,
  width = 1.8,
): Mesh {
  return createSignageV2(scene, name, {
    text,
    position,
    rotationY,
    width,
    height: 0.42,
    variant:
      name.includes("school") || name.includes("old-wing")
        ? "building"
        : "room",
  }).face;
}

function createFluorescentFixture(
  scene: Scene,
  name: string,
  position: Vector3,
  material: StandardMaterial,
): void {
  createBox(scene, name, {
    width: 1.3,
    height: 0.04,
    depth: 0.12,
    position,
    material,
  });
}

export function buildChapterOneScene(
  scene: Scene,
): ChapterOneProductionScene {
  scene.clearColor = new Color4(0.17, 0.22, 0.25, 1);
  scene.imageProcessingConfiguration.exposure = 1.4;

  const plaster = createMaterial(
    scene,
    "ch01-mat-aged-plaster",
    new Color3(0.58, 0.56, 0.46),
  );
  const lowerWall = createMaterial(
    scene,
    "ch01-mat-lower-wall",
    new Color3(0.22, 0.33, 0.29),
  );
  const wetConcrete = createMaterial(
    scene,
    "ch01-mat-wet-concrete",
    new Color3(0.16, 0.18, 0.19),
  );
  wetConcrete.specularColor = new Color3(0.28, 0.31, 0.34);

  const tile = createMaterial(
    scene,
    "ch01-mat-tile",
    new Color3(0.28, 0.29, 0.27),
  );
  const wood = createMaterial(
    scene,
    "ch01-mat-old-wood",
    new Color3(0.36, 0.24, 0.13),
  );
  const metal = createMaterial(
    scene,
    "ch01-mat-painted-metal",
    new Color3(0.2, 0.24, 0.25),
  );
  const plastic = createMaterial(
    scene,
    "ch01-mat-aged-plastic",
    new Color3(0.52, 0.51, 0.45),
  );
  const paper = createMaterial(
    scene,
    "ch01-mat-paper",
    new Color3(0.72, 0.68, 0.53),
  );
  const fluorescent = createMaterial(
    scene,
    "ch01-mat-fluorescent",
    new Color3(0.84, 0.9, 0.86),
    new Color3(0.48, 0.54, 0.5),
  );
  const fadedBlue = createMaterial(
    scene,
    "ch01-mat-faded-blue",
    new Color3(0.2, 0.31, 0.36),
  );
  const v2Materials = createProductionMaterialLibrary(scene, "ch01-v2-mat");

  // Exterior approach and half-open gate.
  createBox(scene, "ch01-yard-ground", {
    width: 18,
    height: 0.1,
    depth: 24,
    position: new Vector3(0, -0.05, -20),
    material: wetConcrete,
    collisions: true,
  });
  createRailingModule(scene, "ch01-v2-rear-railing", {
    position: new Vector3(0, 0, -31.55),
    length: 17.2,
    material: v2Materials.paintedMetal,
    collisions: true,
  });
  createRailingModule(scene, "ch01-v2-west-railing", {
    position: new Vector3(-8.65, 0, -20),
    rotationY: Math.PI / 2,
    length: 23.1,
    material: v2Materials.paintedMetal,
    collisions: true,
  });
  createRailingModule(scene, "ch01-v2-east-railing", {
    position: new Vector3(8.65, 0, -20),
    rotationY: Math.PI / 2,
    length: 23.1,
    material: v2Materials.paintedMetal,
    collisions: true,
  });

  createBox(scene, "ch01-gate-left", {
    width: 4.7,
    height: 2.4,
    depth: 0.12,
    position: new Vector3(-4.65, 1.2, -20),
    material: metal,
    collisions: true,
  });
  const gateRight = createBox(scene, "ch01-gate-right-half-open", {
    width: 3.9,
    height: 2.4,
    depth: 0.12,
    position: new Vector3(4.25, 1.2, -19.1),
    material: metal,
    collisions: true,
  });
  gateRight.rotation.y = -0.42;

  createTextSign(
    scene,
    "ch01-school-sign",
    "TRƯỜNG THPT CŨ",
    new Vector3(-2.3, 2.9, -19.92),
    0,
    2.7,
  );

  // Guard shelter.
  createBox(scene, "ch01-guard-floor", {
    width: 3.4,
    height: 0.1,
    depth: 3.2,
    position: new Vector3(-4.4, 0, -15.7),
    material: tile,
    collisions: true,
  });
  createBox(scene, "ch01-guard-back-wall", {
    width: 3.4,
    height: 2.7,
    depth: 0.1,
    position: new Vector3(-4.4, 1.35, -14.15),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-guard-left-wall", {
    width: 0.1,
    height: 2.7,
    depth: 3.2,
    position: new Vector3(-6.05, 1.35, -15.7),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-guard-roof", {
    width: 3.5,
    height: 0.12,
    depth: 3.3,
    position: new Vector3(-4.4, 2.72, -15.7),
    material: fadedBlue,
  });
  const guardDesk = createBox(scene, "ch01-guard-desk", {
    width: 1.7,
    height: 0.75,
    depth: 0.72,
    position: new Vector3(-4.35, 0.375, -14.8),
    material: wood,
    collisions: true,
  });

  const guardNotebook = createBox(scene, "ch01-guard-notebook", {
    width: 0.42,
    height: 0.025,
    depth: 0.58,
    position: guardDesk.position.add(new Vector3(-0.35, 0.4, 0)),
    material: paper,
    pickable: true,
  });
  const guardKeyRack = createBox(scene, "ch01-guard-key-rack", {
    width: 1.25,
    height: 0.55,
    depth: 0.05,
    position: new Vector3(-4.35, 1.55, -14.22),
    material: wood,
    pickable: true,
  });
  const flashlight = createBox(scene, "ch01-flashlight", {
    width: 0.24,
    height: 0.08,
    depth: 0.08,
    position: guardDesk.position.add(new Vector3(0.42, 0.43, 0.05)),
    material: metal,
    pickable: true,
  });
  const raincoat = createBox(scene, "ch01-raincoat", {
    width: 0.8,
    height: 1.15,
    depth: 0.06,
    position: new Vector3(-5.72, 1.35, -15),
    material: fadedBlue,
    pickable: true,
  });

  // Old-wing facade, side entrance and corridor.
  createBox(scene, "ch01-old-wing-front-left", {
    width: 7.2,
    height: 3.3,
    depth: 0.12,
    position: new Vector3(-5.1, 1.65, -8),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-old-wing-front-right", {
    width: 7.2,
    height: 3.3,
    depth: 0.12,
    position: new Vector3(5.1, 1.65, -8),
    material: plaster,
    collisions: true,
  });
  const sideEntranceDoor = createDoorAlongX(
    scene,
    "ch01-side-entrance-door",
    new Vector3(-0.65, 0, -8),
    fadedBlue,
    -Math.PI * 0.48,
  );
  createTextSign(
    scene,
    "ch01-old-wing-sign",
    "DÃY NHÀ CŨ",
    new Vector3(2.3, 2.65, -7.93),
    0,
    1.7,
  );

  createBox(scene, "ch01-corridor-floor", {
    width: 3,
    height: 0.1,
    depth: 22,
    position: new Vector3(0, -0.05, 3),
    material: tile,
    collisions: true,
  });
  createBox(scene, "ch01-corridor-ceiling", {
    width: 3,
    height: 0.1,
    depth: 22,
    position: new Vector3(0, 3.2, 3),
    material: plaster,
  });
  createBox(scene, "ch01-corridor-left-wall", {
    width: 0.12,
    height: 3.2,
    depth: 22,
    position: new Vector3(-1.5, 1.6, 3),
    material: lowerWall,
    collisions: true,
  });

  // Right wall split around classroom and PA room doorways.
  for (const [name, z, depth] of [
    ["a", -4.1, 7.8],
    ["b", 4.85, 7.3],
    ["c", 11.95, 4.1],
  ] as const) {
    createBox(scene, `ch01-corridor-right-wall-${name}`, {
      width: 0.12,
      height: 3.2,
      depth,
      position: new Vector3(1.5, 1.6, z),
      material: lowerWall,
      collisions: true,
    });
  }

  createBox(scene, "ch01-corridor-end-wall-left", {
    width: 0.85,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(-1.075, 1.6, 14),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-corridor-end-wall-right", {
    width: 0.85,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(1.075, 1.6, 14),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-corridor-end-wall-header", {
    width: 1.3,
    height: 0.85,
    depth: 0.12,
    position: new Vector3(0, 2.775, 14),
    material: plaster,
    collisions: true,
  });

  const corridorExitDoor = createDoorAlongX(
    scene,
    "ch01-corridor-exit-door",
    new Vector3(-0.65, 0, 13.94),
    fadedBlue,
    -Math.PI * 0.5,
  );
  corridorExitDoor.hinge.rotation.y = corridorExitDoor.closedRotationY;

  const classroomDoor = createDoorAlongX(
    scene,
    "ch01-classroom-door",
    new Vector3(
      CLASSROOM_DOOR.centerX - CLASSROOM_DOOR.width / 2,
      0,
      CLASSROOM_DOOR.z - 0.06,
    ),
    fadedBlue,
    -Math.PI * 0.5,
  );
  const paRoomDoor = createDoorAlongZ(
    scene,
    "ch01-pa-room-door",
    new Vector3(1.48, 0, 8.5),
    fadedBlue,
    Math.PI * 0.5,
  );

  createTextSign(
    scene,
    "ch01-classroom-sign",
    CH01_WORKING_ROOM_SIGN_LABELS.classroom,
    new Vector3(
      CLASSROOM_DOOR.centerX,
      3.12,
      CLASSROOM_DOOR.z - 0.075,
    ),
    0,
    0.95,
  );
  createTextSign(
    scene,
    "ch01-pa-room-sign",
    CH01_WORKING_ROOM_SIGN_LABELS.adjacentRoom,
    new Vector3(1.43, 2.55, 9.2),
    Math.PI / 2,
    0.95,
  );

  createDoorFrameModule(scene, "ch01-v2-side-entrance-frame", {
    position: new Vector3(0, 0, -7.92),
    width: 1.55,
    height: 2.48,
    material: v2Materials.paintedMetal,
  });
  createFittedDoorOpeningModule(scene, "ch01-v2-classroom-door-opening", {
    position: new Vector3(
      CLASSROOM_DOOR.centerX,
      0,
      CLASSROOM_DOOR.z,
    ),
    rotationY: 0,
    openingWidth: CLASSROOM_DOOR.width,
    wallHeight: CLASSROOM_ROOM.height,
    doorHeight: CLASSROOM_DOOR.height,
    wallDepth: 0.12,
    frameMaterial: v2Materials.paintedMetal,
    wallMaterial: v2Materials.interiorWallLight,
  });
  // Close the obsolete corridor-side classroom opening from the old layout.
  createBox(scene, "ch01-classroom-old-door-infill", {
    width: 0.12,
    height: 3.2,
    depth: 1.46,
    position: new Vector3(1.5, 1.6, 0.5),
    material: lowerWall,
    collisions: true,
  });
  createFittedDoorOpeningModule(scene, "ch01-v2-pa-door-opening", {
    position: new Vector3(1.5, 0, 9.2),
    rotationY: Math.PI / 2,
    openingWidth: 1.4,
    wallHeight: 3.2,
    doorHeight: 2.35,
    wallDepth: 0.12,
    frameMaterial: v2Materials.paintedMetal,
    wallMaterial: lowerWall,
  });
  createNoticeBoardModule(
    scene,
    "ch01-v2-corridor-notice-board",
    new Vector3(-1.43, 1.65, 1.9),
    -Math.PI / 2,
    v2Materials.woodLaminate,
    v2Materials.paperCardboard,
  );
  createConduitModule(
    scene,
    "ch01-v2-corridor-conduit",
    new Vector3(-1.43, 2.35, 5.0),
    0,
    5.6,
    v2Materials.paintedMetal,
  );

  // Classroom — bright, room-focused student-life production shell.
  const classroomWidth = CLASSROOM_ROOM.maxX - CLASSROOM_ROOM.minX;
  const classroomDepth = CLASSROOM_ROOM.maxZ - CLASSROOM_ROOM.minZ;
  const classroomWall = v2Materials.interiorWallLight;
  const classroomFloor = v2Materials.interiorFloorLight;
  const classroomCeiling = v2Materials.interiorCeilingLight;

  createBox(scene, "ch01-classroom-floor", {
    width: classroomWidth,
    height: 0.1,
    depth: classroomDepth,
    position: new Vector3(
      CLASSROOM_ROOM.centerX,
      -0.05,
      CLASSROOM_ROOM.centerZ,
    ),
    material: classroomFloor,
    collisions: true,
  });
  createBox(scene, "ch01-classroom-ceiling", {
    width: classroomWidth,
    height: 0.12,
    depth: classroomDepth,
    position: new Vector3(
      CLASSROOM_ROOM.centerX,
      CLASSROOM_ROOM.height,
      CLASSROOM_ROOM.centerZ,
    ),
    material: classroomCeiling,
  });

  createBox(scene, "ch01-classroom-front-wall", {
    width: 0.12,
    height: CLASSROOM_ROOM.height,
    depth: classroomDepth,
    position: new Vector3(
      CLASSROOM_ROOM.maxX,
      CLASSROOM_ROOM.height / 2,
      CLASSROOM_ROOM.centerZ,
    ),
    material: classroomWall,
    collisions: true,
  });

  // The corridor wall remains the classroom rear wall below 3.2 m.
  // Fill the higher classroom volume above the existing corridor shell.
  createBox(scene, "ch01-classroom-rear-upper-wall", {
    width: 0.12,
    height: CLASSROOM_ROOM.height - 3.2,
    depth: classroomDepth,
    position: new Vector3(
      CLASSROOM_ROOM.minX,
      3.2 + (CLASSROOM_ROOM.height - 3.2) / 2,
      CLASSROOM_ROOM.centerZ,
    ),
    material: classroomWall,
    collisions: true,
  });

  const createClassroomSidePanel = (
    name: string,
    startX: number,
    endX: number,
    bottomY: number,
    topY: number,
    z: number,
  ): void => {
    if (endX <= startX || topY <= bottomY) {
      return;
    }
    createBox(scene, name, {
      width: endX - startX,
      height: topY - bottomY,
      depth: 0.12,
      position: new Vector3(
        (startX + endX) / 2,
        (bottomY + topY) / 2,
        z,
      ),
      material: classroomWall,
      collisions: true,
    });
  };

  const largeLeft = CLASSROOM_WINDOWS.largeLeft;
  const teacherLeft = CLASSROOM_WINDOWS.teacherLeft;
  const largeLeftMinX = largeLeft.centerX - largeLeft.width / 2;
  const largeLeftMaxX = largeLeft.centerX + largeLeft.width / 2;
  const largeLeftBottom = largeLeft.centerY - largeLeft.height / 2;
  const largeLeftTop = largeLeft.centerY + largeLeft.height / 2;
  const teacherLeftMinX = teacherLeft.centerX - teacherLeft.width / 2;
  const teacherLeftMaxX = teacherLeft.centerX + teacherLeft.width / 2;
  const teacherLeftBottom = teacherLeft.centerY - teacherLeft.height / 2;
  const teacherLeftTop = teacherLeft.centerY + teacherLeft.height / 2;

  createClassroomSidePanel(
    "ch01-classroom-left-wall-rear",
    CLASSROOM_ROOM.minX,
    largeLeftMinX,
    0,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-left-wall-large-window-lower",
    largeLeftMinX,
    largeLeftMaxX,
    0,
    largeLeftBottom,
    CLASSROOM_ROOM.minZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-left-wall-large-window-upper",
    largeLeftMinX,
    largeLeftMaxX,
    largeLeftTop,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-left-wall-middle",
    largeLeftMaxX,
    teacherLeftMinX,
    0,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-left-wall-teacher-window-lower",
    teacherLeftMinX,
    teacherLeftMaxX,
    0,
    teacherLeftBottom,
    CLASSROOM_ROOM.minZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-left-wall-teacher-window-upper",
    teacherLeftMinX,
    teacherLeftMaxX,
    teacherLeftTop,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-left-wall-front",
    teacherLeftMaxX,
    CLASSROOM_ROOM.maxX,
    0,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.minZ,
  );

  const rearRight = CLASSROOM_WINDOWS.rearRight;
  const rearRightMinX = rearRight.centerX - rearRight.width / 2;
  const rearRightMaxX = rearRight.centerX + rearRight.width / 2;
  const rearRightBottom = rearRight.centerY - rearRight.height / 2;
  const rearRightTop = rearRight.centerY + rearRight.height / 2;
  const classroomDoorMinX =
    CLASSROOM_DOOR.centerX - CLASSROOM_DOOR.width / 2;
  const classroomDoorMaxX =
    CLASSROOM_DOOR.centerX + CLASSROOM_DOOR.width / 2;
  createClassroomSidePanel(
    "ch01-classroom-right-wall-rear",
    CLASSROOM_ROOM.minX,
    rearRightMinX,
    0,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-right-wall-window-lower",
    rearRightMinX,
    rearRightMaxX,
    0,
    rearRightBottom,
    CLASSROOM_ROOM.maxZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-right-wall-window-upper",
    rearRightMinX,
    rearRightMaxX,
    rearRightTop,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-right-wall-mid",
    rearRightMaxX,
    classroomDoorMinX,
    0,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-right-wall-door-header",
    classroomDoorMinX,
    classroomDoorMaxX,
    CLASSROOM_DOOR.height,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ,
  );
  createClassroomSidePanel(
    "ch01-classroom-right-wall-front",
    classroomDoorMaxX,
    CLASSROOM_ROOM.maxX,
    0,
    CLASSROOM_ROOM.height,
    CLASSROOM_ROOM.maxZ,
  );

  createWindowFrameModule(scene, "ch01-classroom-window-large-left", {
    position: new Vector3(
      largeLeft.centerX,
      largeLeft.centerY,
      largeLeft.z + 0.01,
    ),
    width: largeLeft.width,
    height: largeLeft.height,
    depth: 0.13,
    material: v2Materials.paintedMetal,
    glassMaterial: v2Materials.glass,
  });
  createWindowFrameModule(scene, "ch01-classroom-window-teacher-left", {
    position: new Vector3(
      teacherLeft.centerX,
      teacherLeft.centerY,
      teacherLeft.z + 0.01,
    ),
    width: teacherLeft.width,
    height: teacherLeft.height,
    depth: 0.13,
    material: v2Materials.paintedMetal,
    glassMaterial: v2Materials.glass,
  });
  createWindowFrameModule(scene, "ch01-classroom-window-rear-right", {
    position: new Vector3(
      rearRight.centerX,
      rearRight.centerY,
      rearRight.z - 0.01,
    ),
    rotationY: Math.PI,
    width: rearRight.width,
    height: rearRight.height,
    depth: 0.13,
    material: v2Materials.paintedMetal,
    glassMaterial: v2Materials.glass,
  });

  const daylightPanel = createMaterial(
    scene,
    "ch01-classroom-daylight-panel",
    new Color3(0.68, 0.79, 0.86),
    new Color3(0.44, 0.56, 0.62),
  );
  daylightPanel.disableLighting = true;
  for (const [name, windowData, zOffset] of [
    ["large-left", largeLeft, -0.09],
    ["teacher-left", teacherLeft, -0.09],
    ["rear-right", rearRight, 0.09],
  ] as const) {
    createBox(scene, `ch01-classroom-daylight-${name}`, {
      width: windowData.width * 0.94,
      height: windowData.height * 0.9,
      depth: 0.025,
      position: new Vector3(
        windowData.centerX,
        windowData.centerY,
        windowData.z + zOffset,
      ),
      material: daylightPanel,
    });
  }

  // Colliders and anchors follow the shared layout; GLB visuals hydrate in main.ts.
  const studentDesks: TransformNode[] = [];
  CLASSROOM_DESKS.forEach((placement, index) => {
    const root = createAnchor(
      scene,
      `ch01-student-desk-${index + 1}`,
      new Vector3(placement.x, placement.y, placement.z),
    );
    root.rotation.y = placement.rotationY;
    const collider = createBox(
      scene,
      `ch01-student-desk-${index + 1}-collider`,
      {
        width: 1.44,
        height: 0.7,
        depth: 0.54,
        position: new Vector3(0, 0.35, 0),
        material: v2Materials.paintedMetal,
        collisions: true,
      },
    );
    collider.parent = root;
    collider.isVisible = false;
    studentDesks.push(root);
  });

  CLASSROOM_CHAIRS.forEach((placement, index) => {
    const root = createAnchor(
      scene,
      `ch01-student-chair-${index + 1}`,
      new Vector3(placement.x, placement.y, placement.z),
    );
    root.rotation.y = placement.rotationY;
    const collider = createBox(
      scene,
      `ch01-student-chair-${index + 1}-collider`,
      {
        width: 0.42,
        height: 0.46,
        depth: 0.42,
        position: new Vector3(0, 0.23, 0),
        material: v2Materials.paintedMetal,
        collisions: true,
      },
    );
    collider.parent = root;
    collider.isVisible = false;
  });

  const teacherDesk = createAnchor(
    scene,
    "ch01-teacher-desk",
    new Vector3(
      CLASSROOM_TEACHER_DESK.x,
      CLASSROOM_TEACHER_DESK.y,
      CLASSROOM_TEACHER_DESK.z,
    ),
  );
  teacherDesk.rotation.y = CLASSROOM_TEACHER_DESK.rotationY;
  const teacherDeskCollider = createBox(scene, "ch01-teacher-desk-collider", {
    width: 1.65,
    height: 0.72,
    depth: 0.72,
    position: new Vector3(0, 0.36, 0),
    material: v2Materials.paintedMetal,
    collisions: true,
  });
  teacherDeskCollider.parent = teacherDesk;
  teacherDeskCollider.isVisible = false;

  createCabinetModule(
    scene,
    "ch01-v2-classroom-cabinet",
    new Vector3(CLASSROOM_ROOM.maxX - 1.0, 0, CLASSROOM_ROOM.maxZ - 0.28),
    v2Materials.paintedMetal,
    v2Materials.woodLaminate,
  );
  createNoticeBoardModule(
    scene,
    "ch01-v2-classroom-notice-board",
    new Vector3(CLASSROOM_ROOM.centerX, 1.7, CLASSROOM_ROOM.maxZ - 0.09),
    Math.PI,
    v2Materials.woodLaminate,
    v2Materials.paperCardboard,
  );
  createSocketSwitchModule(
    scene,
    "ch01-v2-classroom-switch",
    new Vector3(2.25, 1.22, CLASSROOM_ROOM.minZ + 0.07),
    0,
    v2Materials.plastic,
  );
  createConduitModule(
    scene,
    "ch01-v2-classroom-conduit",
    new Vector3(2.25, 2.15, CLASSROOM_ROOM.minZ + 0.07),
    Math.PI / 2,
    2.0,
    v2Materials.paintedMetal,
  );

  const classroomDrawer = createBox(scene, "ch01-classroom-drawer", {
    width: 0.06,
    height: 0.2,
    depth: 0.42,
    position: new Vector3(
      CLASSROOM_TEACHER_DESK.x - 0.38,
      0.48,
      CLASSROOM_TEACHER_DESK.z + 0.24,
    ),
    material: wood,
    pickable: true,
  });
  const drawerLabel09 = createBox(scene, "ch01-drawer-label-09", {
    width: 0.014,
    height: 0.09,
    depth: 0.16,
    position: new Vector3(-0.037, 0.02, 0.1),
    material: paper,
    pickable: true,
  });
  drawerLabel09.parent = classroomDrawer;
  drawerLabel09.setEnabled(false);

  const rosterProp = createBox(scene, "ch01-roster-prop", {
    width: 0.4,
    height: 0.018,
    depth: 0.5,
    position: new Vector3(
      CLASSROOM_TEACHER_DESK.x - 0.1,
      0.84,
      CLASSROOM_TEACHER_DESK.z,
    ),
    material: paper,
    pickable: true,
  });
  const classPhotoProp = createBox(scene, "ch01-class-photo-prop", {
    width: 0.62,
    height: 0.42,
    depth: 0.018,
    position: new Vector3(CLASSROOM_ROOM.maxX - 0.07, 1.68, 3.05),
    material: paper,
    pickable: true,
  });
  classPhotoProp.rotation.y = Math.PI / 2;

  const rosterInspectionAnchor = createAnchor(
    scene,
    "ch01-roster-inspection-anchor",
    new Vector3(
      CLASSROOM_TEACHER_DESK.x - 0.95,
      1.58,
      CLASSROOM_TEACHER_DESK.z,
    ),
  );
  rosterInspectionAnchor.rotation.set(0.56, -Math.PI / 2, 0);

  const photoInspectionAnchor = createAnchor(
    scene,
    "ch01-photo-inspection-anchor",
    new Vector3(CLASSROOM_ROOM.maxX - 0.95, 1.68, 3.05),
  );
  photoInspectionAnchor.rotation.set(0, Math.PI / 2, 0);

  const timetableInspectionAnchor = createAnchor(
    scene,
    "ch01-timetable-inspection-anchor",
    new Vector3(-0.62, 1.62, 4.5),
  );
  timetableInspectionAnchor.rotation.set(0, -Math.PI / 2, 0);

  const timetableProp = createBox(scene, "ch01-timetable-prop", {
    width: 0.72,
    height: 0.52,
    depth: 0.018,
    position: new Vector3(-1.42, 1.62, 4.5),
    material: paper,
    pickable: true,
  });
  timetableProp.rotation.y = Math.PI / 2;

  // PA room.
  createBox(scene, "ch01-pa-room-floor", {
    width: 8,
    height: 0.1,
    depth: 6,
    position: new Vector3(5.5, -0.05, 9.5),
    material: tile,
    collisions: true,
  });
  createBox(scene, "ch01-pa-room-ceiling", {
    width: 8,
    height: 0.1,
    depth: 6,
    position: new Vector3(5.5, 3.2, 9.5),
    material: plaster,
  });
  createBox(scene, "ch01-pa-room-right-wall", {
    width: 0.12,
    height: 3.2,
    depth: 6,
    position: new Vector3(9.5, 1.6, 9.5),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-pa-room-front-wall", {
    width: 8,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(5.5, 1.6, 6.5),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-pa-room-back-wall", {
    width: 8,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(5.5, 1.6, 12.5),
    material: plaster,
    collisions: true,
  });

  createCabinetModule(
    scene,
    "ch01-v2-pa-cabinet",
    new Vector3(2.15, 0, 12.18),
    v2Materials.paintedMetal,
    v2Materials.woodLaminate,
  );
  createSocketSwitchModule(
    scene,
    "ch01-v2-pa-switch",
    new Vector3(2.15, 1.2, 6.57),
    0,
    v2Materials.plastic,
  );
  createFluorescentFixtureModule(
    scene,
    "ch01-v2-pa-fixture-a",
    new Vector3(4.2, 3.08, 9.4),
    v2Materials.paintedMetal,
    fluorescent,
  );
  createFluorescentFixtureModule(
    scene,
    "ch01-v2-pa-fixture-b",
    new Vector3(6.8, 3.08, 9.4),
    v2Materials.paintedMetal,
    fluorescent,
  );

  const paStations: TransformNode[] = [];
  const paColumns = [3.0, 4.7, 6.4, 8.1];
  const paRows = [8.15, 10.55];
  let stationIndex = 1;
  for (const z of paRows) {
    for (const x of paColumns) {
      paStations.push(
        createPaStation(
          scene,
          stationIndex,
          new Vector3(x, 0, z),
          wood,
          metal,
          plastic,
          true,
        ),
      );
      stationIndex += 1;
    }
  }

  const ninthPaStation = createPaStation(
    scene,
    9,
    new Vector3(8.6, 0, 11.65),
    wood,
    metal,
    plastic,
    false,
  );
  ninthPaStation.rotation.y = -0.22;
  const ninthPaStationCollider = createBox(
    scene,
    "ch01-ninth-pa-chair-collider",
    {
      width: 0.58,
      height: 1.12,
      depth: 0.62,
      position: new Vector3(0, 0.56, -0.76),
      material: metal,
      collisions: true,
    },
  );
  ninthPaStationCollider.parent = ninthPaStation;
  ninthPaStationCollider.isVisible = false;

  const ninthHeadsetBand = scene.getMeshByName(
    "pa-station-9-headset-band",
  ) as Mesh | null;
  if (!ninthHeadsetBand) {
    throw new Error("Ninth PA headset mesh was not created.");
  }
  ninthHeadsetBand.isPickable = false;

  const ninthHeadsetProp = createBox(
    scene,
    "ch01-ninth-headset-interaction-proxy",
    {
      width: 0.42,
      height: 0.34,
      depth: 0.34,
      position: new Vector3(0, 0.96, -0.73),
      material: plastic,
      pickable: true,
    },
  );
  ninthHeadsetProp.parent = ninthPaStation;
  ninthHeadsetProp.visibility = 0.001;

  const ninthHeadsetInspectionAnchor = createAnchor(
    scene,
    "ch01-ninth-headset-inspection-anchor",
    new Vector3(7.78, 1.45, 10.82),
  );
  ninthHeadsetInspectionAnchor.rotation.set(0.18, 0.56, 0);

  ninthPaStation.setEnabled(false);

  const ninthCable = MeshBuilder.CreateCylinder(
    "ch01-hidden-ninth-cable",
    { height: 1.15, diameter: 0.018, tessellation: 10 },
    scene,
  );
  ninthCable.position.set(8.85, 0.12, 11.9);
  ninthCable.rotation.z = Math.PI / 2;
  ninthCable.material = metal;
  ninthCable.isPickable = false;

  const paStationLabelsProp = createBox(
    scene,
    "ch01-pa-station-labels-prop",
    {
      width: 0.22,
      height: 0.1,
      depth: 0.025,
      position: new Vector3(2.58, 0.87, 7.83),
      material: plastic,
      pickable: true,
    },
  );

  const paIndexCardProp = createBox(scene, "ch01-pa-index-card-prop", {
    width: 0.34,
    height: 0.02,
    depth: 0.22,
    position: new Vector3(3.0, 0.86, 8.1),
    material: paper,
    pickable: true,
  });

  const paStationLabelsInspectionAnchor = createAnchor(
    scene,
    "ch01-pa-station-labels-inspection-anchor",
    new Vector3(2.55, 1.52, 7.2),
  );
  paStationLabelsInspectionAnchor.rotation.set(0.38, 0, 0);

  const paIndexCardInspectionAnchor = createAnchor(
    scene,
    "ch01-pa-index-card-inspection-anchor",
    new Vector3(3.0, 1.5, 7.45),
  );
  paIndexCardInspectionAnchor.rotation.set(0.55, 0, 0);

  const paSpeakerProp = createBox(scene, "ch01-pa-speaker", {
    width: 0.42,
    height: 0.52,
    depth: 0.16,
    position: new Vector3(9.34, 2.25, 9.35),
    material: metal,
  });
  paSpeakerProp.rotation.y = -Math.PI / 2;

  const corridorPhotoBoard = createBox(scene, "ch01-corridor-photo-board", {
    width: 0.06,
    height: 1.2,
    depth: 2.1,
    position: new Vector3(-1.42, 1.65, 9.3),
    material: wood,
    pickable: true,
  });

  const reflectionMaterial = createMaterial(
    scene,
    "ch01-mat-final-reflection",
    new Color3(0.11, 0.13, 0.14),
    new Color3(0.025, 0.03, 0.032),
  );
  reflectionMaterial.alpha = 0.34;
  reflectionMaterial.backFaceCulling = false;
  reflectionMaterial.disableLighting = true;

  const finalReflectionShoulder = MeshBuilder.CreatePlane(
    "ch01-final-reflection-shoulder",
    { width: 0.28, height: 0.52 },
    scene,
  );
  finalReflectionShoulder.position.set(-1.36, 1.58, 10.02);
  finalReflectionShoulder.rotation.y = Math.PI / 2;
  finalReflectionShoulder.material = reflectionMaterial;
  finalReflectionShoulder.isPickable = false;
  finalReflectionShoulder.setEnabled(false);

  const corridorReturnZone = createBox(scene, "ch01-corridor-return-zone", {
    width: 2.4,
    height: 2.4,
    depth: 1.2,
    position: new Vector3(0, 1.2, 5.8),
    material: plastic,
  });
  corridorReturnZone.isVisible = false;
  corridorReturnZone.isPickable = false;

  const insideOldWingZone = createBox(scene, "ch01-inside-old-wing-zone", {
    width: 2.4,
    height: 2.4,
    depth: 1.2,
    position: new Vector3(0, 1.2, -6.6),
    material: plastic,
  });
  insideOldWingZone.isVisible = false;
  insideOldWingZone.isPickable = false;

  const classroomEntryZone = createBox(scene, "ch01-classroom-entry-zone", {
    width: 2.4,
    height: 2.6,
    depth: 2.2,
    position: new Vector3(
      CLASSROOM_DOOR.centerX - 0.8,
      1.3,
      CLASSROOM_DOOR.z - 0.95,
    ),
    material: plastic,
  });
  classroomEntryZone.isVisible = false;
  classroomEntryZone.isPickable = false;

  const paThresholdZone = createBox(scene, "ch01-pa-threshold-zone", {
    width: 1.8,
    height: 2.4,
    depth: 1.8,
    position: new Vector3(0.35, 1.2, 8.8),
    material: plastic,
  });
  paThresholdZone.isVisible = false;
  paThresholdZone.isPickable = false;

  const paReentryZone = createBox(scene, "ch01-pa-reentry-zone", {
    width: 1.3,
    height: 2.4,
    depth: 1.4,
    position: new Vector3(1.9, 1.2, 9.15),
    material: plastic,
  });
  paReentryZone.isVisible = false;
  paReentryZone.isPickable = false;

  createSurfaceDecal(scene, "ch01-v2-guard-water-stain", {
    position: new Vector3(-4.95, 1.25, -14.205),
    rotation: new Vector3(0, 0, 0),
    width: 0.72,
    height: 0.9,
    kind: "water-stain",
    alpha: 0.14,
  });
  createSurfaceDecal(scene, "ch01-v2-corridor-scuff", {
    position: new Vector3(-1.435, 0.55, 3.0),
    rotation: new Vector3(0, -Math.PI / 2, 0),
    width: 1.2,
    height: 0.3,
    kind: "scuff",
    alpha: 0.15,
  });
  createSurfaceDecal(scene, "ch01-v2-classroom-tape-mark", {
    position: new Vector3(CLASSROOM_ROOM.maxX - 0.065, 1.72, -1.8),
    rotation: new Vector3(0, Math.PI / 2, 0),
    width: 0.46,
    height: 0.12,
    kind: "tape-mark",
    alpha: 0.16,
  });
  createSurfaceDecal(scene, "ch01-v2-classroom-edge-wear", {
    position: new Vector3(11.5, 0.62, CLASSROOM_ROOM.maxZ - 0.065),
    rotation: new Vector3(0, Math.PI, 0),
    width: 0.72,
    height: 0.18,
    kind: "edge-wear",
    alpha: 0.1,
  });
  createSurfaceDecal(scene, "ch01-v2-pa-small-crack", {
    position: new Vector3(7.2, 2.15, 12.435),
    rotation: new Vector3(0, Math.PI, 0),
    width: 0.5,
    height: 0.22,
    kind: "small-crack",
    alpha: 0.14,
  });

  // Bright, ordinary baseline. Uncanny/darker changes belong to authored events.
  const ambience = new HemisphericLight(
    "ch01-baseline-ambient",
    new Vector3(0.2, 1, -0.15),
    scene,
  );
  ambience.intensity = 1.15;
  ambience.diffuse = new Color3(0.78, 0.8, 0.76);
  ambience.groundColor = new Color3(0.26, 0.28, 0.26);

  const entranceLight = new PointLight(
    "ch01-entrance-light",
    new Vector3(0, 3.1, -18.3),
    scene,
  );
  entranceLight.intensity = 1.45;
  entranceLight.range = 19;
  entranceLight.diffuse = new Color3(0.76, 0.82, 0.76);
  createFluorescentFixture(
    scene,
    "ch01-entrance-fluorescent",
    new Vector3(0, 3.0, -18.3),
    fluorescent,
  );

  const exteriorFill = new PointLight(
    "ch01-v2-exterior-fill",
    new Vector3(0, 1.55, -26.0),
    scene,
  );
  exteriorFill.intensity = 0.78;
  exteriorFill.range = 15;
  exteriorFill.diffuse = new Color3(0.58, 0.66, 0.7);

  const shelterLight = new PointLight(
    "ch01-shelter-light",
    new Vector3(-4.4, 2.45, -15.7),
    scene,
  );
  shelterLight.intensity = 1.45;
  shelterLight.range = 11.5;
  shelterLight.diffuse = new Color3(0.82, 0.84, 0.72);
  createFluorescentFixture(
    scene,
    "ch01-shelter-fluorescent",
    new Vector3(-4.4, 2.63, -15.7),
    fluorescent,
  );

  for (const [index, z] of [-5.5, 1.5, 8.5, 12.4].entries()) {
    const light = new PointLight(
      `ch01-corridor-light-${index + 1}`,
      new Vector3(0, 2.75, z),
      scene,
    );
    light.intensity = index === 2 ? 1.18 : index === 3 ? 1.28 : 1.35;
    light.range = 10.2;
    light.diffuse = new Color3(0.76, 0.82, 0.76);
    createFluorescentFixture(
      scene,
      `ch01-corridor-fluorescent-${index + 1}`,
      new Vector3(0, 3.08, z),
      fluorescent,
    );
  }

  const classroomLight = new PointLight(
    "ch01-classroom-light",
    new Vector3(CLASSROOM_ROOM.centerX, 3.35, CLASSROOM_ROOM.centerZ),
    scene,
  );
  classroomLight.intensity = 1.65;
  classroomLight.range = 18;
  classroomLight.diffuse = new Color3(0.94, 0.93, 0.84);

  for (const [index, position] of [
    new Vector3(4.45, 2.95, -1.55),
    new Vector3(4.45, 2.95, 2.55),
    new Vector3(8.55, 2.95, -1.55),
    new Vector3(8.55, 2.95, 2.55),
  ].entries()) {
    const practical = new PointLight(
      `ch01-v2-classroom-practical-${index + 1}`,
      position,
      scene,
    );
    practical.intensity = 0.72;
    practical.range = 8.8;
    practical.diffuse = new Color3(0.9, 0.92, 0.84);
  }

  for (const [index, position] of [
    new Vector3(largeLeft.centerX, 2.4, CLASSROOM_ROOM.minZ + 0.42),
    new Vector3(teacherLeft.centerX, 2.5, CLASSROOM_ROOM.minZ + 0.42),
    new Vector3(rearRight.centerX, 2.5, CLASSROOM_ROOM.maxZ - 0.42),
  ].entries()) {
    const daylight = new PointLight(
      `ch01-v2-classroom-daylight-fill-${index + 1}`,
      position,
      scene,
    );
    daylight.intensity = index === 0 ? 1.05 : 0.72;
    daylight.range = index === 0 ? 11.5 : 8.5;
    daylight.diffuse = new Color3(0.7, 0.82, 0.9);
  }

  const paRoomLight = new PointLight(
    "ch01-pa-room-light",
    new Vector3(5.5, 2.65, 9.5),
    scene,
  );
  paRoomLight.intensity = 1.75;
  paRoomLight.range = 13;
  paRoomLight.diffuse = new Color3(0.8, 0.82, 0.76);

  const paDeskLamp = new PointLight(
    "ch01-pa-desk-lamp",
    new Vector3(6.4, 1.25, 10.45),
    scene,
  );
  paDeskLamp.intensity = 0.45;
  paDeskLamp.range = 6;
  paDeskLamp.diffuse = new Color3(0.84, 0.72, 0.52);

  const paWallPractical = new PointLight(
    "ch01-v2-pa-wall-practical",
    new Vector3(2.4, 2.05, 10.8),
    scene,
  );
  paWallPractical.intensity = 0.72;
  paWallPractical.range = 6.4;
  paWallPractical.diffuse = new Color3(0.78, 0.8, 0.73);

  const paKcrAccentLight = new PointLight(
    "ch01-v2-pa-kcr-accent",
    new Vector3(8.45, 1.35, 11.45),
    scene,
  );
  paKcrAccentLight.intensity = 0.02;
  paKcrAccentLight.range = 6.5;
  paKcrAccentLight.diffuse = new Color3(0.82, 0.62, 0.38);

  const checkpointPositions: Record<ChapterOneCheckpointId, Vector3> = {
    ch01_gate: new Vector3(0, 0.01, -22.2),
    ch01_inside_old_wing: new Vector3(0, 0.01, -6.7),
    ch01_classroom_pre_roster: new Vector3(
      CLASSROOM_DOOR.centerX - 0.8,
      0.01,
      CLASSROOM_DOOR.z - 0.95,
    ),
    ch01_classroom_post_c03: new Vector3(
      CLASSROOM_DOOR.centerX - 0.8,
      0.01,
      CLASSROOM_DOOR.z - 0.95,
    ),
    ch01_pa_pre_c07: new Vector3(0.35, 0.01, 8.8),
    ch01_kcr_ready: new Vector3(0.35, 0.01, 8.8),
    ch01_kcr_applied: new Vector3(2.35, 0.01, 9.15),
    ch01_climax_complete: new Vector3(2.35, 0.01, 9.15),
    ch01_complete: new Vector3(0, 0.01, 13.1),
  };

  const checkpoints = Object.fromEntries(
    Object.entries(checkpointPositions).map(([id, position]) => [
      id,
      createAnchor(scene, `checkpoint-${id}`, position),
    ]),
  ) as Record<ChapterOneCheckpointId, TransformNode>;

  return {
    spawn: checkpoints.ch01_gate.position.clone(),
    checkpoints,
    gateCenter: new Vector3(0, 0, -20),
    guardShelterCenter: new Vector3(-4.4, 0, -15.7),
    corridorCenter: new Vector3(0, 0, 3),
    classroomCenter: new Vector3(CLASSROOM_ROOM.centerX, 0, CLASSROOM_ROOM.centerZ),
    paRoomCenter: new Vector3(5.5, 0, 9.5),
    sideEntranceDoor,
    classroomDoor,
    paRoomDoor,
    corridorExitDoor,
    studentDesks,
    teacherDesk,
    paStations,
    ninthPaStation,
    ninthPaStationCollider,
    ninthHeadsetProp,
    ninthCable,
    paSpeakerProp,
    paRoomLight,
    paDeskLamp,
    paKcrAccentLight,
    paReentryZone,
    guardKeyRack,
    guardNotebook,
    flashlight,
    raincoat,
    classroomDrawer,
    drawerLabel09,
    rosterProp,
    classPhotoProp,
    timetableProp,
    paStationLabelsProp,
    paIndexCardProp,
    corridorPhotoBoard,
    finalReflectionShoulder,
    rosterInspectionAnchor,
    photoInspectionAnchor,
    timetableInspectionAnchor,
    paStationLabelsInspectionAnchor,
    paIndexCardInspectionAnchor,
    ninthHeadsetInspectionAnchor,
    corridorReturnZone,
    insideOldWingZone,
    classroomEntryZone,
    paThresholdZone,
  };
}
