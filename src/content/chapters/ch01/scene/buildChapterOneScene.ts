import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";

import type { ChapterOneCheckpointId } from "../state";

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
  studentDesks: TransformNode[];
  teacherDesk: TransformNode;
  paStations: TransformNode[];
  ninthPaStation: TransformNode;
  ninthCable: Mesh;
  paRoomLight: PointLight;
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
  paIndexCardProp: Mesh;
  corridorPhotoBoard: Mesh;
  rosterInspectionAnchor: TransformNode;
  photoInspectionAnchor: TransformNode;
  timetableInspectionAnchor: TransformNode;
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
  material: StandardMaterial;
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
    depth: 1.3,
    position: Vector3.Zero(),
    material,
    collisions: true,
  });
  leaf.parent = hinge;
  leaf.position.set(0, 1.175, 0.65);
  hinge.rotation.y = openRotationY;

  return {
    hinge,
    leaf,
    closedRotationY: 0,
    openRotationY,
  };
}

function createDesk(
  scene: Scene,
  name: string,
  position: Vector3,
  wood: StandardMaterial,
  metal: StandardMaterial,
): TransformNode {
  const root = createAnchor(scene, name, position);

  const top = createBox(scene, `${name}-top`, {
    width: 1.1,
    height: 0.08,
    depth: 0.6,
    position: new Vector3(0, 0.78, 0),
    material: wood,
  });
  top.parent = root;

  const blocker = createBox(scene, `${name}-collider`, {
    width: 1.1,
    height: 2.1,
    depth: 0.6,
    position: new Vector3(0, 1.05, 0),
    material: metal,
    collisions: true,
  });
  blocker.parent = root;
  blocker.isVisible = false;

  for (const [x, z] of [
    [-0.46, -0.23],
    [0.46, -0.23],
    [-0.46, 0.23],
    [0.46, 0.23],
  ] as const) {
    const leg = createBox(scene, `${name}-leg-${x}-${z}`, {
      width: 0.04,
      height: 0.72,
      depth: 0.04,
      position: new Vector3(x, 0.36, z),
      material: metal,
    });
    leg.parent = root;
  }

  return root;
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
  const sign = MeshBuilder.CreatePlane(
    name,
    { width, height: 0.42 },
    scene,
  );
  sign.position.copyFrom(position);
  sign.rotation.y = rotationY;
  sign.isPickable = false;

  const signMaterial = new StandardMaterial(`${name}-material`, scene);
  signMaterial.backFaceCulling = false;
  signMaterial.diffuseColor = new Color3(0.78, 0.78, 0.68);
  signMaterial.emissiveColor = new Color3(0.05, 0.05, 0.04);

  const supportsCanvas =
    typeof document !== "undefined" ||
    typeof OffscreenCanvas !== "undefined";

  if (supportsCanvas) {
    const texture = new DynamicTexture(
      `${name}-texture`,
      { width: 768, height: 180 },
      scene,
      false,
    );
    const context = texture.getContext();
    context.fillStyle = "#d8d2b7";
    context.fillRect(0, 0, 768, 180);
    context.fillStyle = "#20211f";
    context.font = "600 54px Arial";
    const textWidth = context.measureText(text).width;
    context.fillText(text, Math.max(24, (768 - textWidth) / 2), 108);
    texture.update(false);
    signMaterial.diffuseTexture = texture;
  }

  sign.material = signMaterial;
  return sign;
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
  scene.clearColor = new Color4(0.016, 0.022, 0.03, 1);\n  scene.imageProcessingConfiguration.exposure = 1.2;

  const plaster = createMaterial(
    scene,
    "ch01-mat-aged-plaster",
    new Color3(0.42, 0.4, 0.31),
  );
  const lowerWall = createMaterial(
    scene,
    "ch01-mat-lower-wall",
    new Color3(0.12, 0.24, 0.21),
  );
  const wetConcrete = createMaterial(
    scene,
    "ch01-mat-wet-concrete",
    new Color3(0.055, 0.065, 0.07),
  );
  wetConcrete.specularColor = new Color3(0.28, 0.31, 0.34);

  const tile = createMaterial(
    scene,
    "ch01-mat-tile",
    new Color3(0.11, 0.12, 0.105),
  );
  const wood = createMaterial(
    scene,
    "ch01-mat-old-wood",
    new Color3(0.2, 0.135, 0.075),
  );
  const metal = createMaterial(
    scene,
    "ch01-mat-painted-metal",
    new Color3(0.09, 0.12, 0.13),
  );
  const plastic = createMaterial(
    scene,
    "ch01-mat-aged-plastic",
    new Color3(0.43, 0.42, 0.36),
  );
  const paper = createMaterial(
    scene,
    "ch01-mat-paper",
    new Color3(0.72, 0.68, 0.53),
  );
  const fluorescent = createMaterial(
    scene,
    "ch01-mat-fluorescent",
    new Color3(0.75, 0.82, 0.78),
    new Color3(0.34, 0.39, 0.36),
  );
  const fadedBlue = createMaterial(
    scene,
    "ch01-mat-faded-blue",
    new Color3(0.12, 0.2, 0.25),
  );

  // Exterior approach and half-open gate.
  createBox(scene, "ch01-yard-ground", {
    width: 18,
    height: 0.1,
    depth: 16,
    position: new Vector3(0, -0.05, -16),
    material: wetConcrete,
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
    Math.PI,
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
    Math.PI,
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

  createBox(scene, "ch01-corridor-end-wall", {
    width: 3,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(0, 1.6, 14),
    material: plaster,
    collisions: true,
  });

  const classroomDoor = createDoorAlongZ(
    scene,
    "ch01-classroom-door",
    new Vector3(1.48, 0, -0.2),
    fadedBlue,
    Math.PI * 0.5,
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
    "PHÒNG HỌC CŨ",
    new Vector3(1.43, 2.55, 0.5),
    -Math.PI / 2,
    1.5,
  );
  createTextSign(
    scene,
    "ch01-pa-room-sign",
    "PHÒNG PHÁT THANH",
    new Vector3(1.43, 2.55, 9.2),
    -Math.PI / 2,
    1.85,
  );

  // Classroom.
  createBox(scene, "ch01-classroom-floor", {
    width: 8,
    height: 0.1,
    depth: 7,
    position: new Vector3(5.5, -0.05, 0.5),
    material: tile,
    collisions: true,
  });
  createBox(scene, "ch01-classroom-ceiling", {
    width: 8,
    height: 0.1,
    depth: 7,
    position: new Vector3(5.5, 3.2, 0.5),
    material: plaster,
  });
  createBox(scene, "ch01-classroom-right-wall", {
    width: 0.12,
    height: 3.2,
    depth: 7,
    position: new Vector3(9.5, 1.6, 0.5),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-classroom-front-wall", {
    width: 8,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(5.5, 1.6, -3),
    material: plaster,
    collisions: true,
  });
  createBox(scene, "ch01-classroom-back-wall", {
    width: 8,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(5.5, 1.6, 4),
    material: plaster,
    collisions: true,
  });

  const studentDesks: TransformNode[] = [];
  const classroomColumns = [4.2, 6.8];
  const classroomRows = [-1.7, -0.25, 1.2, 2.65];
  for (let row = 0; row < classroomRows.length; row += 1) {
    for (let column = 0; column < classroomColumns.length; column += 1) {
      studentDesks.push(
        createDesk(
          scene,
          `ch01-student-desk-${row + 1}-${column + 1}`,
          new Vector3(
            classroomColumns[column],
            0,
            classroomRows[row],
          ),
          wood,
          metal,
        ),
      );
    }
  }

  const teacherDesk = createDesk(
    scene,
    "ch01-teacher-desk",
    new Vector3(7.6, 0, 3.2),
    wood,
    metal,
  );

  const classroomDrawer = createBox(scene, "ch01-classroom-drawer", {
    width: 0.62,
    height: 0.18,
    depth: 0.48,
    position: new Vector3(7.6, 0.58, 3.18),
    material: wood,
    pickable: true,
  });
  const drawerLabel09 = createBox(scene, "ch01-drawer-label-09", {
    width: 0.18,
    height: 0.012,
    depth: 0.09,
    position: new Vector3(0.18, 0.105, -0.05),
    material: paper,
    pickable: true,
  });
  drawerLabel09.parent = classroomDrawer;
  drawerLabel09.setEnabled(false);

  const rosterProp = createBox(scene, "ch01-roster-prop", {
    width: 0.34,
    height: 0.018,
    depth: 0.48,
    position: new Vector3(7.35, 0.84, 3.15),
    material: paper,
    pickable: true,
  });
  const classPhotoProp = createBox(scene, "ch01-class-photo-prop", {
    width: 0.62,
    height: 0.42,
    depth: 0.018,
    position: new Vector3(8.95, 1.55, 1.1),
    material: paper,
    pickable: true,
  });
  classPhotoProp.rotation.y = -Math.PI / 2;

  const rosterInspectionAnchor = createAnchor(
    scene,
    "ch01-roster-inspection-anchor",
    new Vector3(7.35, 1.62, 2.45),
  );
  rosterInspectionAnchor.rotation.set(0.62, 0, 0);

  const photoInspectionAnchor = createAnchor(
    scene,
    "ch01-photo-inspection-anchor",
    new Vector3(8.15, 1.55, 1.1),
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

  const paIndexCardProp = createBox(scene, "ch01-pa-index-card-prop", {
    width: 0.34,
    height: 0.02,
    depth: 0.22,
    position: new Vector3(3.0, 0.86, 8.1),
    material: paper,
    pickable: true,
  });

  const corridorPhotoBoard = createBox(scene, "ch01-corridor-photo-board", {
    width: 0.06,
    height: 1.2,
    depth: 2.1,
    position: new Vector3(-1.42, 1.65, 9.3),
    material: wood,
    pickable: true,
  });

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
    width: 1.8,
    height: 2.4,
    depth: 1.8,
    position: new Vector3(2.3, 1.2, 0.45),
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

  // Low, practical fluorescent lighting.
  const ambience = new HemisphericLight(
    "ch01-night-ambient",
    new Vector3(0.2, 1, -0.15),
    scene,
  );
  ambience.intensity = 0.5;
  ambience.diffuse = new Color3(0.48, 0.56, 0.62);
  ambience.groundColor = new Color3(0.075, 0.085, 0.09);

  const shelterLight = new PointLight(
    "ch01-shelter-light",
    new Vector3(-4.4, 2.45, -15.7),
    scene,
  );
  shelterLight.intensity = 1.0;
  shelterLight.range = 9.5;
  shelterLight.diffuse = new Color3(0.74, 0.8, 0.69);
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
    light.intensity = index === 2 ? 0.68 : 0.9;
    light.range = 8.5;
    light.diffuse = new Color3(0.66, 0.76, 0.7);
    createFluorescentFixture(
      scene,
      `ch01-corridor-fluorescent-${index + 1}`,
      new Vector3(0, 3.08, z),
      fluorescent,
    );
  }

  const classroomLight = new PointLight(
    "ch01-classroom-light",
    new Vector3(5.5, 2.75, 0.5),
    scene,
  );
  classroomLight.intensity = 0.95;
  classroomLight.range = 10;
  classroomLight.diffuse = new Color3(0.7, 0.76, 0.68);

  const paRoomLight = new PointLight(
    "ch01-pa-room-light",
    new Vector3(5.5, 2.65, 9.5),
    scene,
  );
  paRoomLight.intensity = 0.85;
  paRoomLight.range = 10;
  paRoomLight.diffuse = new Color3(0.65, 0.71, 0.67);

  const checkpointPositions: Record<ChapterOneCheckpointId, Vector3> = {
    ch01_gate: new Vector3(0, 0.01, -22.2),
    ch01_inside_old_wing: new Vector3(0, 0.01, -6.7),
    ch01_classroom_pre_roster: new Vector3(2.3, 0.01, 0.45),
    ch01_classroom_post_c03: new Vector3(2.3, 0.01, 0.45),
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
    classroomCenter: new Vector3(5.5, 0, 0.5),
    paRoomCenter: new Vector3(5.5, 0, 9.5),
    sideEntranceDoor,
    classroomDoor,
    paRoomDoor,
    studentDesks,
    teacherDesk,
    paStations,
    ninthPaStation,
    ninthCable,
    paRoomLight,
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
    paIndexCardProp,
    corridorPhotoBoard,
    rosterInspectionAnchor,
    photoInspectionAnchor,
    timetableInspectionAnchor,
    corridorReturnZone,
    insideOldWingZone,
    classroomEntryZone,
    paThresholdZone,
  };
}
