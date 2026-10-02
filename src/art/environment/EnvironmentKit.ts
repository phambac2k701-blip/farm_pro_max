import type { Material } from "@babylonjs/core/Materials/material";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";

export interface ModuleBoxOptions {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
  material: Material;
  collisions?: boolean;
}

function box(
  scene: Scene,
  name: string,
  options: ModuleBoxOptions,
  parent?: TransformNode,
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
  mesh.isPickable = false;
  if (parent) {
    mesh.parent = parent;
  }
  return mesh;
}

export function createWallModule(
  scene: Scene,
  name: string,
  options: ModuleBoxOptions,
): Mesh {
  return box(scene, name, { ...options, collisions: options.collisions ?? true });
}

export function createFloorModule(
  scene: Scene,
  name: string,
  options: Omit<ModuleBoxOptions, "height"> & { height?: number },
): Mesh {
  return box(scene, name, {
    ...options,
    height: options.height ?? 0.1,
    collisions: options.collisions ?? true,
  });
}

export function createCeilingModule(
  scene: Scene,
  name: string,
  options: Omit<ModuleBoxOptions, "height"> & { height?: number },
): Mesh {
  return box(scene, name, {
    ...options,
    height: options.height ?? 0.1,
  });
}

export function createPillarModule(
  scene: Scene,
  name: string,
  position: Vector3,
  material: Material,
  size = 0.34,
  height = 3.2,
): Mesh {
  return box(scene, name, {
    width: size,
    height,
    depth: size,
    position,
    material,
    collisions: true,
  });
}

export interface DoorFrameOptions {
  position: Vector3;
  rotationY?: number;
  width?: number;
  height?: number;
  depth?: number;
  trim?: number;
  material: Material;
}

export function createDoorFrameModule(
  scene: Scene,
  name: string,
  options: DoorFrameOptions,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY ?? 0;

  const width = options.width ?? 1.42;
  const height = options.height ?? 2.42;
  const depth = options.depth ?? 0.14;
  const trim = options.trim ?? 0.1;

  for (const x of [-width / 2, width / 2]) {
    box(
      scene,
      `${name}-jamb-${x < 0 ? "l" : "r"}`,
      {
        width: trim,
        height,
        depth,
        position: new Vector3(x, height / 2, 0),
        material: options.material,
        collisions: false,
      },
      root,
    );
  }
  box(
    scene,
    `${name}-header`,
    {
      width: width + trim,
      height: trim,
      depth,
      position: new Vector3(0, height - trim / 2, 0),
      material: options.material,
      collisions: false,
    },
    root,
  );

  return root;
}

export interface FittedDoorOpeningOptions {
  position: Vector3;
  rotationY?: number;
  openingWidth: number;
  wallHeight: number;
  doorHeight: number;
  wallDepth: number;
  trim?: number;
  frameMaterial: Material;
  wallMaterial: Material;
}

export function createFittedDoorOpeningModule(
  scene: Scene,
  name: string,
  options: FittedDoorOpeningOptions,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY ?? 0;

  const trim = options.trim ?? 0.1;
  const frame = createDoorFrameModule(scene, `${name}-frame`, {
    position: Vector3.Zero(),
    width: options.openingWidth + trim * 0.8,
    height: options.doorHeight + trim,
    depth: Math.max(options.wallDepth + 0.04, 0.14),
    trim,
    material: options.frameMaterial,
  });
  frame.parent = root;

  const infillHeight = Math.max(
    0,
    options.wallHeight - (options.doorHeight + trim),
  );
  if (infillHeight > 0) {
    box(
      scene,
      `${name}-header-infill`,
      {
        width: options.openingWidth,
        height: infillHeight,
        depth: options.wallDepth,
        position: new Vector3(
          0,
          options.doorHeight + trim + infillHeight / 2,
          0,
        ),
        material: options.wallMaterial,
        collisions: true,
      },
      root,
    );
  }

  return root;
}

export interface WindowFrameOptions extends DoorFrameOptions {
  glassMaterial?: Material;
}

export function createWindowFrameModule(
  scene: Scene,
  name: string,
  options: WindowFrameOptions,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY ?? 0;

  const width = options.width ?? 1.8;
  const height = options.height ?? 1.2;
  const depth = options.depth ?? 0.1;
  const trim = options.trim ?? 0.08;

  for (const x of [-width / 2, width / 2]) {
    box(scene, `${name}-side-${x < 0 ? "l" : "r"}`, {
      width: trim,
      height,
      depth,
      position: new Vector3(x, 0, 0),
      material: options.material,
    }, root);
  }
  for (const y of [-height / 2, height / 2]) {
    box(scene, `${name}-rail-${y < 0 ? "b" : "t"}`, {
      width,
      height: trim,
      depth,
      position: new Vector3(0, y, 0),
      material: options.material,
    }, root);
  }
  box(scene, `${name}-mullion`, {
    width: trim * 0.7,
    height,
    depth,
    position: Vector3.Zero(),
    material: options.material,
  }, root);
  if (options.glassMaterial) {
    box(scene, `${name}-glass`, {
      width: width - trim * 1.5,
      height: height - trim * 1.5,
      depth: 0.018,
      position: new Vector3(0, 0, depth * 0.08),
      material: options.glassMaterial,
    }, root);
  }
  return root;
}

export interface RailingOptions {
  position: Vector3;
  rotationY?: number;
  length: number;
  height?: number;
  material: Material;
  collisions?: boolean;
  postSpacing?: number;
}

export function createRailingModule(
  scene: Scene,
  name: string,
  options: RailingOptions,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY ?? 0;

  const height = options.height ?? 1.08;
  const spacing = options.postSpacing ?? 1.6;
  const postCount = Math.max(2, Math.ceil(options.length / spacing) + 1);
  for (let i = 0; i < postCount; i += 1) {
    const x = -options.length / 2 + (options.length * i) / (postCount - 1);
    box(scene, `${name}-post-${i + 1}`, {
      width: 0.07,
      height,
      depth: 0.07,
      position: new Vector3(x, height / 2, 0),
      material: options.material,
      collisions: options.collisions ?? true,
    }, root);
  }
  for (const [suffix, y] of [["top", height], ["mid", height * 0.55]] as const) {
    box(scene, `${name}-${suffix}-rail`, {
      width: options.length,
      height: 0.07,
      depth: 0.07,
      position: new Vector3(0, y, 0),
      material: options.material,
      collisions: options.collisions ?? true,
    }, root);
  }
  return root;
}

export interface StairOptions {
  position: Vector3;
  rotationY?: number;
  width?: number;
  steps?: number;
  rise?: number;
  run?: number;
  material: Material;
}

export function createStairModule(
  scene: Scene,
  name: string,
  options: StairOptions,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY ?? 0;

  const steps = options.steps ?? 4;
  const rise = options.rise ?? 0.17;
  const run = options.run ?? 0.3;
  for (let i = 0; i < steps; i += 1) {
    box(scene, `${name}-step-${i + 1}`, {
      width: options.width ?? 1.8,
      height: rise * (i + 1),
      depth: run,
      position: new Vector3(
        0,
        (rise * (i + 1)) / 2,
        run * i,
      ),
      material: options.material,
      collisions: true,
    }, root);
  }
  return root;
}

export function createFluorescentFixtureModule(
  scene: Scene,
  name: string,
  position: Vector3,
  housing: Material,
  lamp: Material,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  box(scene, `${name}-housing`, {
    width: 1.42,
    height: 0.08,
    depth: 0.18,
    position: Vector3.Zero(),
    material: housing,
  }, root);
  box(scene, `${name}-lamp`, {
    width: 1.24,
    height: 0.025,
    depth: 0.09,
    position: new Vector3(0, -0.05, 0),
    material: lamp,
  }, root);
  return root;
}

export interface DeskMaterials {
  top: Material;
  frame: Material;
}

export function createClassroomDeskModule(
  scene: Scene,
  name: string,
  position: Vector3,
  materials: DeskMaterials,
  scale = 1,
  rotationY = 0,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  root.rotation.y = rotationY;
  box(scene, `${name}-top`, {
    width: 1.12 * scale,
    height: 0.055,
    depth: 0.58 * scale,
    position: new Vector3(0, 0.76 * scale, 0),
    material: materials.top,
  }, root);
  const collider = box(scene, `${name}-collider`, {
    width: 1.02 * scale,
    height: 0.72 * scale,
    depth: 0.5 * scale,
    position: new Vector3(0, 0.36 * scale, 0),
    material: materials.frame,
    collisions: true,
  }, root);
  collider.isVisible = false;
  for (const x of [-0.47, 0.47]) {
    for (const z of [-0.22, 0.22]) {
      box(scene, `${name}-leg-${x}-${z}`, {
        width: 0.045,
        height: 0.72 * scale,
        depth: 0.045,
        position: new Vector3(x * scale, 0.36 * scale, z * scale),
        material: materials.frame,
      }, root);
    }
  }
  box(scene, `${name}-crossbar`, {
    width: 0.86 * scale,
    height: 0.04,
    depth: 0.04,
    position: new Vector3(0, 0.26 * scale, 0.23 * scale),
    material: materials.frame,
  }, root);
  return root;
}

export function createClassroomChairModule(
  scene: Scene,
  name: string,
  position: Vector3,
  materials: DeskMaterials,
  rotationY = 0,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  root.rotation.y = rotationY;
  box(scene, `${name}-seat`, {
    width: 0.44,
    height: 0.055,
    depth: 0.43,
    position: new Vector3(0, 0.45, 0),
    material: materials.top,
    collisions: true,
  }, root);
  box(scene, `${name}-back`, {
    width: 0.44,
    height: 0.48,
    depth: 0.045,
    position: new Vector3(0, 0.73, -0.2),
    material: materials.top,
  }, root);
  for (const x of [-0.18, 0.18]) {
    for (const z of [-0.17, 0.17]) {
      box(scene, `${name}-leg-${x}-${z}`, {
        width: 0.035,
        height: 0.43,
        depth: 0.035,
        position: new Vector3(x, 0.215, z),
        material: materials.frame,
      }, root);
    }
  }
  return root;
}

export function createTeacherDeskModule(
  scene: Scene,
  name: string,
  position: Vector3,
  materials: DeskMaterials,
): TransformNode {
  return createClassroomDeskModule(scene, name, position, materials, 1.22);
}

export function createNoticeBoardModule(
  scene: Scene,
  name: string,
  position: Vector3,
  rotationY: number,
  frame: Material,
  board: Material,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  root.rotation.y = rotationY;
  box(scene, `${name}-board`, {
    width: 1.65,
    height: 0.92,
    depth: 0.045,
    position: Vector3.Zero(),
    material: board,
  }, root);
  for (const [suffix, x, y, w, h] of [
    ["top", 0, 0.48, 1.76, 0.06],
    ["bottom", 0, -0.48, 1.76, 0.06],
    ["left", -0.85, 0, 0.06, 1.02],
    ["right", 0.85, 0, 0.06, 1.02],
  ] as const) {
    box(scene, `${name}-frame-${suffix}`, {
      width: w,
      height: h,
      depth: 0.07,
      position: new Vector3(x, y, -0.02),
      material: frame,
    }, root);
  }
  return root;
}

export function createSocketSwitchModule(
  scene: Scene,
  name: string,
  position: Vector3,
  rotationY: number,
  material: Material,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  root.rotation.y = rotationY;
  box(scene, `${name}-plate`, {
    width: 0.16,
    height: 0.11,
    depth: 0.022,
    position: Vector3.Zero(),
    material,
  }, root);
  box(scene, `${name}-switch`, {
    width: 0.045,
    height: 0.06,
    depth: 0.015,
    position: new Vector3(0, 0, -0.018),
    material,
  }, root);
  return root;
}

export function createConduitModule(
  scene: Scene,
  name: string,
  position: Vector3,
  rotationY: number,
  length: number,
  material: Material,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  root.rotation.y = rotationY;
  box(scene, `${name}-run`, {
    width: 0.035,
    height: 0.035,
    depth: length,
    position: Vector3.Zero(),
    material,
  }, root);
  return root;
}

export function createCabinetModule(
  scene: Scene,
  name: string,
  position: Vector3,
  material: Material,
  shelfMaterial: Material,
): TransformNode {
  const root = new TransformNode(name, scene);
  root.position.copyFrom(position);
  box(scene, `${name}-body`, {
    width: 1.05,
    height: 1.65,
    depth: 0.42,
    position: new Vector3(0, 0.825, 0),
    material,
    collisions: true,
  }, root);
  for (const y of [0.48, 0.93, 1.38]) {
    box(scene, `${name}-shelf-${y}`, {
      width: 0.94,
      height: 0.035,
      depth: 0.37,
      position: new Vector3(0, y, -0.015),
      material: shelfMaterial,
    }, root);
  }
  return root;
}
