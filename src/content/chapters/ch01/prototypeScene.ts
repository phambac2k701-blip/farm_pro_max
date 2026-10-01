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

import { BookPropVisual } from "../../../interaction/inspection/BookPropVisual";

export interface ChapterOnePrototypeScene {
  spawn: Vector3;
  corridorCenter: Vector3;
  classroomCenter: Vector3;
  studentDesks: TransformNode[];
  ninthDesk: TransformNode;
  teacherDesk: TransformNode;
  realityTransitionZone: Mesh;
  classroomLight: PointLight;
  book: Mesh;
  bookAnchor: TransformNode;
  bookCameraAnchor: TransformNode;
  bookVisual: BookPropVisual;
}

interface BoxSpec {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
  material: StandardMaterial;
  collisions?: boolean;
}

function material(
  scene: Scene,
  name: string,
  color: Color3,
): StandardMaterial {
  const value = new StandardMaterial(name, scene);
  value.diffuseColor = color;
  value.roughness = 0.92;
  return value;
}

function box(scene: Scene, name: string, spec: BoxSpec): Mesh {
  const mesh = MeshBuilder.CreateBox(
    name,
    {
      width: spec.width,
      height: spec.height,
      depth: spec.depth,
    },
    scene,
  );
  mesh.position.copyFrom(spec.position);
  mesh.material = spec.material;
  mesh.checkCollisions = spec.collisions ?? false;
  return mesh;
}

function createDesk(
  scene: Scene,
  name: string,
  position: Vector3,
  deskMaterial: StandardMaterial,
  metalMaterial: StandardMaterial,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);

  const top = box(scene, `${name}-top`, {
    width: 1.15,
    height: 0.08,
    depth: 0.62,
    position: new Vector3(0, 0.78, 0),
    material: deskMaterial,
  });
  top.parent = root;

  const blocker = box(scene, `${name}-collider`, {
    width: 1.15,
    height: 2.2,
    depth: 0.62,
    position: new Vector3(0, 1.1, 0),
    material: metalMaterial,
    collisions: true,
  });
  blocker.isVisible = false;
  blocker.isPickable = false;
  blocker.parent = root;

  const legOffsets = [
    [-0.48, -0.24],
    [0.48, -0.24],
    [-0.48, 0.24],
    [0.48, 0.24],
  ] as const;

  for (const [x, z] of legOffsets) {
    const leg = box(scene, `${name}-leg-${x}-${z}`, {
      width: 0.045,
      height: 0.74,
      depth: 0.045,
      position: new Vector3(x, 0.37, z),
      material: metalMaterial,
    });
    leg.parent = root;
  }

  const chairSeat = box(scene, `${name}-chair-seat`, {
    width: 0.44,
    height: 0.06,
    depth: 0.42,
    position: new Vector3(0, 0.45, -0.72),
    material: deskMaterial,
  });
  chairSeat.parent = root;

  const chairBack = box(scene, `${name}-chair-back`, {
    width: 0.44,
    height: 0.48,
    depth: 0.05,
    position: new Vector3(0, 0.71, -0.91),
    material: deskMaterial,
  });
  chairBack.parent = root;

  return root;
}

export function buildChapterOnePrototypeScene(
  scene: Scene,
): ChapterOnePrototypeScene {
  scene.clearColor = new Color4(0.025, 0.028, 0.035, 1);

  const wall = material(scene, "mat-wall", new Color3(0.48, 0.49, 0.46));
  const floor = material(scene, "mat-floor", new Color3(0.11, 0.12, 0.115));
  const ceiling = material(
    scene,
    "mat-ceiling",
    new Color3(0.34, 0.35, 0.33),
  );
  const wood = material(scene, "mat-desk", new Color3(0.24, 0.18, 0.12));
  const metal = material(scene, "mat-metal", new Color3(0.11, 0.12, 0.13));
  const boardMaterial = material(
    scene,
    "mat-board",
    new Color3(0.055, 0.12, 0.095),
  );
  const bookMaterial = material(
    scene,
    "mat-book",
    new Color3(0.16, 0.035, 0.04),
  );

  box(scene, "corridor-floor", {
    width: 3,
    height: 0.1,
    depth: 16,
    position: new Vector3(0, -0.05, 0),
    material: floor,
    collisions: true,
  });
  box(scene, "corridor-ceiling", {
    width: 3,
    height: 0.1,
    depth: 16,
    position: new Vector3(0, 3.25, 0),
    material: ceiling,
  });
  box(scene, "corridor-left-wall", {
    width: 0.12,
    height: 3.2,
    depth: 16,
    position: new Vector3(-1.5, 1.6, 0),
    material: wall,
    collisions: true,
  });
  box(scene, "corridor-right-wall-a", {
    width: 0.12,
    height: 3.2,
    depth: 9.4,
    position: new Vector3(1.5, 1.6, -3.3),
    material: wall,
    collisions: true,
  });
  box(scene, "corridor-right-wall-b", {
    width: 0.12,
    height: 3.2,
    depth: 5.4,
    position: new Vector3(1.5, 1.6, 5.3),
    material: wall,
    collisions: true,
  });
  box(scene, "corridor-end-wall-a", {
    width: 3,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(0, 1.6, -8),
    material: wall,
    collisions: true,
  });
  box(scene, "corridor-end-wall-b", {
    width: 3,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(0, 1.6, 8),
    material: wall,
    collisions: true,
  });

  box(scene, "classroom-floor", {
    width: 8,
    height: 0.1,
    depth: 8,
    position: new Vector3(5.5, -0.05, 3),
    material: floor,
    collisions: true,
  });
  box(scene, "classroom-ceiling", {
    width: 8,
    height: 0.1,
    depth: 8,
    position: new Vector3(5.5, 3.25, 3),
    material: ceiling,
  });
  box(scene, "classroom-right-wall", {
    width: 0.12,
    height: 3.2,
    depth: 8,
    position: new Vector3(9.5, 1.6, 3),
    material: wall,
    collisions: true,
  });
  box(scene, "classroom-front-wall", {
    width: 8,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(5.5, 1.6, -1),
    material: wall,
    collisions: true,
  });
  box(scene, "classroom-back-wall", {
    width: 8,
    height: 3.2,
    depth: 0.12,
    position: new Vector3(5.5, 1.6, 7),
    material: wall,
    collisions: true,
  });

  box(scene, "classroom-board", {
    width: 4.4,
    height: 1.25,
    depth: 0.05,
    position: new Vector3(5.7, 1.85, 6.91),
    material: boardMaterial,
  });

  box(scene, "door-frame-top", {
    width: 0.18,
    height: 0.3,
    depth: 1.35,
    position: new Vector3(1.48, 2.95, 2),
    material: metal,
  });
  box(scene, "door-frame-a", {
    width: 0.18,
    height: 2.9,
    depth: 0.12,
    position: new Vector3(1.48, 1.45, 1.36),
    material: metal,
  });
  box(scene, "door-frame-b", {
    width: 0.18,
    height: 2.9,
    depth: 0.12,
    position: new Vector3(1.48, 1.45, 2.64),
    material: metal,
  });

  const studentDesks: TransformNode[] = [];
  const columns = [4.25, 6.75];
  const rows = [-0.15, 1.45, 3.05, 4.65];

  for (let row = 0; row < rows.length; row += 1) {
    for (let column = 0; column < columns.length; column += 1) {
      studentDesks.push(
        createDesk(
          scene,
          `student-desk-${row + 1}-${column + 1}`,
          new Vector3(columns[column], 0, rows[row]),
          wood,
          metal,
        ),
      );
    }
  }

  const ninthDesk = createDesk(
    scene,
    "student-desk-ninth",
    new Vector3(5.5, 0, 3.05),
    wood,
    metal,
  );
  ninthDesk.setEnabled(false);

  const teacherDesk = createDesk(
    scene,
    "teacher-desk",
    new Vector3(5.6, 0, 5.75),
    wood,
    metal,
  );

  const realityTransitionZone = MeshBuilder.CreateBox(
    "reality-transition-zone",
    { width: 1.1, height: 2.4, depth: 1.2 },
    scene,
  );
  realityTransitionZone.position.set(0.72, 1.2, 2);
  realityTransitionZone.isVisible = false;
  realityTransitionZone.isPickable = false;
  realityTransitionZone.checkCollisions = false;

  const book = box(scene, "hero-book", {
    width: 0.24,
    height: 0.035,
    depth: 0.34,
    position: new Vector3(5.25, 0.84, 5.68),
    material: bookMaterial,
    collisions: false,
  });
  book.isPickable = true;

  const frontCoverHinge = new TransformNode(
    "hero-book-front-cover-hinge",
    scene,
  );
  frontCoverHinge.position.set(5.13, 0.86, 5.68);

  const frontCover = box(scene, "hero-book-front-cover", {
    width: 0.24,
    height: 0.025,
    depth: 0.34,
    position: Vector3.Zero(),
    material: bookMaterial,
  });
  frontCover.parent = frontCoverHinge;
  frontCover.position.set(0.12, 0, 0);
  frontCover.isPickable = false;

  const paperMaterial = material(
    scene,
    "mat-book-paper",
    new Color3(0.88, 0.84, 0.72),
  );

  const supportsCanvasTexture =
    typeof document !== "undefined" ||
    typeof OffscreenCanvas !== "undefined";

  let leftTexture: DynamicTexture | undefined;
  let rightTexture: DynamicTexture | undefined;
  let leftPageMaterial: StandardMaterial = paperMaterial;
  let rightPageMaterial: StandardMaterial = paperMaterial;

  if (supportsCanvasTexture) {
    leftTexture = new DynamicTexture(
      "hero-book-left-page-texture",
      { width: 512, height: 512 },
      scene,
      false,
    );
    leftTexture.vScale = -1;
    leftTexture.vOffset = 1;

    rightTexture = new DynamicTexture(
      "hero-book-right-page-texture",
      { width: 512, height: 512 },
      scene,
      false,
    );
    rightTexture.vScale = -1;
    rightTexture.vOffset = 1;

    leftPageMaterial = new StandardMaterial(
      "mat-book-left-page",
      scene,
    );
    leftPageMaterial.diffuseTexture = leftTexture;
    leftPageMaterial.specularColor = Color3.Black();
    leftPageMaterial.backFaceCulling = false;

    rightPageMaterial = new StandardMaterial(
      "mat-book-right-page",
      scene,
    );
    rightPageMaterial.diffuseTexture = rightTexture;
    rightPageMaterial.specularColor = Color3.Black();
    rightPageMaterial.backFaceCulling = false;
  }

  const leftPage = MeshBuilder.CreateGround(
    "hero-book-left-page",
    { width: 0.23, height: 0.33 },
    scene,
  );
  leftPage.position.set(5.005, 0.89, 5.68);
  leftPage.material = leftPageMaterial;
  leftPage.isPickable = false;

  const rightPage = MeshBuilder.CreateGround(
    "hero-book-right-page",
    { width: 0.23, height: 0.33 },
    scene,
  );
  rightPage.position.set(5.255, 0.89, 5.68);
  rightPage.material = rightPageMaterial;
  rightPage.isPickable = false;

  const turningPageHinge = new TransformNode(
    "hero-book-turning-page-hinge",
    scene,
  );
  turningPageHinge.position.set(5.13, 0.895, 5.68);

  const turningPage = MeshBuilder.CreateGround(
    "hero-book-turning-page",
    { width: 0.23, height: 0.33 },
    scene,
  );
  turningPage.parent = turningPageHinge;
  turningPage.position.set(0.115, 0, 0);
  turningPage.material = paperMaterial;
  turningPage.isPickable = false;

  const bookVisual = new BookPropVisual({
    frontCoverHinge,
    turningPageHinge,
    turningPage,
    leftPage,
    rightPage,
    leftTexture,
    rightTexture,
  });

  const bookAnchor = new TransformNode("hero-book-anchor", scene);
  bookAnchor.position.copyFrom(book.position);

  const bookCameraAnchor = new TransformNode(
    "hero-book-camera-anchor",
    scene,
  );
  bookCameraAnchor.position.set(5.25, 1.38, 5.05);
  bookCameraAnchor.rotation.set(0.66, 0, 0);

  const ambience = new HemisphericLight(
    "prototype-ambient-light",
    new Vector3(0.15, 1, -0.2),
    scene,
  );
  ambience.intensity = 0.42;

  const corridorLight = new PointLight(
    "corridor-light",
    new Vector3(0, 2.75, -1.5),
    scene,
  );
  corridorLight.intensity = 0.75;
  corridorLight.range = 9;
  corridorLight.diffuse = new Color3(0.78, 0.82, 0.86);

  const classroomLight = new PointLight(
    "classroom-light",
    new Vector3(5.5, 2.8, 2.8),
    scene,
  );
  classroomLight.intensity = 1.0;
  classroomLight.range = 10;
  classroomLight.diffuse = new Color3(0.92, 0.88, 0.78);

  return {
    spawn: new Vector3(0, 0.01, -6.2),
    corridorCenter: new Vector3(0, 0, 0),
    classroomCenter: new Vector3(5.5, 0, 3),
    studentDesks,
    ninthDesk,
    teacherDesk,
    realityTransitionZone,
    classroomLight,
    book,
    bookAnchor,
    bookCameraAnchor,
    bookVisual,
  };
}
