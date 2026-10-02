import { Animation } from "@babylonjs/core/Animations/animation";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { Bone } from "@babylonjs/core/Bones/bone";
import { Skeleton } from "@babylonjs/core/Bones/skeleton";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Matrix, Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";

export const CHARACTER_ANIMATION_CLIP_IDS = [
  "anim_char_idle_loop",
  "anim_char_walk_loop",
  "anim_char_turn_in_place",
  "anim_char_sit_down",
  "anim_char_seated_idle_loop",
  "anim_char_stand_up",
] as const;

export type CharacterAnimationClipId =
  (typeof CHARACTER_ANIMATION_CLIP_IDS)[number];

export type CharacterJointName =
  | "root"
  | "pelvis"
  | "spine"
  | "chest"
  | "neck"
  | "head"
  | "leftUpperArm"
  | "leftLowerArm"
  | "leftHand"
  | "rightUpperArm"
  | "rightLowerArm"
  | "rightHand"
  | "leftUpperLeg"
  | "leftLowerLeg"
  | "leftFoot"
  | "rightUpperLeg"
  | "rightLowerLeg"
  | "rightFoot";

export interface CharacterAnimationClip {
  id: CharacterAnimationClipId;
  group: AnimationGroup;
  loop: boolean;
  fromFrame: number;
  toFrame: number;
}

export interface CharacterPrototypeMetrics {
  boneCount: number;
  meshCount: number;
  vertexCount: number;
  triangleCount: number;
  materialCount: number;
  clipCount: number;
}

export interface CharacterAnimationPrototype {
  root: TransformNode;
  skeleton: Skeleton;
  joints: Record<CharacterJointName, TransformNode>;
  meshes: Mesh[];
  material: StandardMaterial;
  clips: Map<CharacterAnimationClipId, CharacterAnimationClip>;
  metrics: CharacterPrototypeMetrics;
  applyStandingPose(): void;
  applySeatedPose(): void;
  dispose(): void;
}

interface PoseSnapshot {
  position: Vector3;
  rotation: Vector3;
}

const FPS = 60;
const BLEND_SPEED = 0.09;

function createJoint(
  scene: Scene,
  name: CharacterJointName,
  parent: TransformNode | null,
  position: Vector3,
): TransformNode {
  const joint = new TransformNode(`char-v0-joint-${name}`, scene);
  joint.parent = parent;
  joint.position.copyFrom(position);
  return joint;
}

function addBone(
  skeleton: Skeleton,
  name: CharacterJointName,
  joint: TransformNode,
  parent: Bone | null,
): Bone {
  const local = Matrix.Translation(
    joint.position.x,
    joint.position.y,
    joint.position.z,
  );
  const bone = new Bone(`char-v0-bone-${name}`, skeleton, parent, local);
  bone.linkTransformNode(joint);
  return bone;
}

function makePart(
  mesh: Mesh,
  parent: TransformNode,
  material: StandardMaterial,
  localPosition: Vector3,
  localRotation = Vector3.Zero(),
): Mesh {
  mesh.parent = parent;
  mesh.position.copyFrom(localPosition);
  mesh.rotation.copyFrom(localRotation);
  mesh.material = material;
  mesh.isPickable = false;
  mesh.checkCollisions = false;
  return mesh;
}

function makeRotationAnimation(
  group: AnimationGroup,
  target: TransformNode,
  suffix: string,
  keys: Array<[number, Vector3]>,
): void {
  const animation = new Animation(
    `${group.name}-${suffix}-rotation`,
    "rotation",
    FPS,
    Animation.ANIMATIONTYPE_VECTOR3,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );
  animation.enableBlending = true;
  animation.blendingSpeed = BLEND_SPEED;
  animation.setKeys(
    keys.map(([frame, value]) => ({
      frame,
      value: value.clone(),
    })),
  );
  group.addTargetedAnimation(animation, target);
}

function makePositionAnimation(
  group: AnimationGroup,
  target: TransformNode,
  suffix: string,
  keys: Array<[number, Vector3]>,
): void {
  const animation = new Animation(
    `${group.name}-${suffix}-position`,
    "position",
    FPS,
    Animation.ANIMATIONTYPE_VECTOR3,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );
  animation.enableBlending = true;
  animation.blendingSpeed = BLEND_SPEED;
  animation.setKeys(
    keys.map(([frame, value]) => ({
      frame,
      value: value.clone(),
    })),
  );
  group.addTargetedAnimation(animation, target);
}

function addStandingNeutralTracks(
  group: AnimationGroup,
  joints: Record<CharacterJointName, TransformNode>,
  toFrame: number,
): void {
  const neutral = Vector3.Zero();
  const names: CharacterJointName[] = [
    "leftUpperArm",
    "leftLowerArm",
    "leftHand",
    "rightUpperArm",
    "rightLowerArm",
    "rightHand",
    "leftUpperLeg",
    "leftLowerLeg",
    "leftFoot",
    "rightUpperLeg",
    "rightLowerLeg",
    "rightFoot",
  ];

  for (const name of names) {
    makeRotationAnimation(group, joints[name], name, [
      [0, neutral],
      [toFrame, neutral],
    ]);
  }
}

function buildClips(
  scene: Scene,
  joints: Record<CharacterJointName, TransformNode>,
): Map<CharacterAnimationClipId, CharacterAnimationClip> {
  const clips = new Map<CharacterAnimationClipId, CharacterAnimationClip>();
  const register = (
    id: CharacterAnimationClipId,
    loop: boolean,
    toFrame: number,
    author: (group: AnimationGroup) => void,
  ): void => {
    const group = new AnimationGroup(id, scene);
    author(group);
    group.normalize(0, toFrame);
    clips.set(id, {
      id,
      group,
      loop,
      fromFrame: 0,
      toFrame,
    });
  };

  register("anim_char_idle_loop", true, 60, (group) => {
    addStandingNeutralTracks(group, joints, 60);
    makePositionAnimation(group, joints.pelvis, "pelvis", [
      [0, new Vector3(0, 0.95, 0)],
      [30, new Vector3(0, 0.956, 0)],
      [60, new Vector3(0, 0.95, 0)],
    ]);
    makeRotationAnimation(group, joints.chest, "chest", [
      [0, new Vector3(0, 0, 0)],
      [30, new Vector3(0.012, 0.008, 0.006)],
      [60, new Vector3(0, 0, 0)],
    ]);
    makeRotationAnimation(group, joints.leftUpperArm, "left-upper-arm", [
      [0, new Vector3(0.015, 0, -0.025)],
      [30, new Vector3(-0.01, 0, -0.04)],
      [60, new Vector3(0.015, 0, -0.025)],
    ]);
    makeRotationAnimation(group, joints.rightUpperArm, "right-upper-arm", [
      [0, new Vector3(-0.015, 0, 0.025)],
      [30, new Vector3(0.01, 0, 0.04)],
      [60, new Vector3(-0.015, 0, 0.025)],
    ]);
  });

  register("anim_char_walk_loop", true, 40, (group) => {
    makePositionAnimation(group, joints.pelvis, "pelvis", [
      [0, new Vector3(0, 0.95, 0)],
      [10, new Vector3(0, 0.965, 0)],
      [20, new Vector3(0, 0.95, 0)],
      [30, new Vector3(0, 0.965, 0)],
      [40, new Vector3(0, 0.95, 0)],
    ]);
    makeRotationAnimation(group, joints.chest, "chest", [
      [0, Vector3.Zero()],
      [10, new Vector3(0, 0.05, 0)],
      [20, Vector3.Zero()],
      [30, new Vector3(0, -0.05, 0)],
      [40, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.leftUpperArm, "left-upper-arm", [
      [0, Vector3.Zero()],
      [10, new Vector3(0.42, 0, -0.02)],
      [20, Vector3.Zero()],
      [30, new Vector3(-0.42, 0, -0.02)],
      [40, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.rightUpperArm, "right-upper-arm", [
      [0, Vector3.Zero()],
      [10, new Vector3(-0.42, 0, 0.02)],
      [20, Vector3.Zero()],
      [30, new Vector3(0.42, 0, 0.02)],
      [40, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.leftUpperLeg, "left-upper-leg", [
      [0, Vector3.Zero()],
      [10, new Vector3(-0.52, 0, 0)],
      [20, Vector3.Zero()],
      [30, new Vector3(0.52, 0, 0)],
      [40, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.rightUpperLeg, "right-upper-leg", [
      [0, Vector3.Zero()],
      [10, new Vector3(0.52, 0, 0)],
      [20, Vector3.Zero()],
      [30, new Vector3(-0.52, 0, 0)],
      [40, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.leftLowerLeg, "left-lower-leg", [
      [0, Vector3.Zero()],
      [10, new Vector3(0.34, 0, 0)],
      [20, Vector3.Zero()],
      [30, new Vector3(0.1, 0, 0)],
      [40, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.rightLowerLeg, "right-lower-leg", [
      [0, Vector3.Zero()],
      [10, new Vector3(0.1, 0, 0)],
      [20, Vector3.Zero()],
      [30, new Vector3(0.34, 0, 0)],
      [40, Vector3.Zero()],
    ]);
    for (const name of [
      "leftLowerArm",
      "leftHand",
      "rightLowerArm",
      "rightHand",
      "leftFoot",
      "rightFoot",
    ] as CharacterJointName[]) {
      makeRotationAnimation(group, joints[name], name, [
        [0, Vector3.Zero()],
        [40, Vector3.Zero()],
      ]);
    }
  });

  register("anim_char_turn_in_place", false, 45, (group) => {
    addStandingNeutralTracks(group, joints, 45);
    makePositionAnimation(group, joints.pelvis, "pelvis", [
      [0, new Vector3(0, 0.95, 0)],
      [22, new Vector3(0, 0.94, 0)],
      [45, new Vector3(0, 0.95, 0)],
    ]);
    makeRotationAnimation(group, joints.root, "root", [
      [0, Vector3.Zero()],
      [15, new Vector3(0, Math.PI * 0.16, 0)],
      [30, new Vector3(0, Math.PI * 0.36, 0)],
      [45, new Vector3(0, Math.PI / 2, 0)],
    ]);
    makeRotationAnimation(group, joints.leftUpperLeg, "left-upper-leg", [
      [0, Vector3.Zero()],
      [22, new Vector3(-0.08, 0, 0)],
      [45, Vector3.Zero()],
    ]);
    makeRotationAnimation(group, joints.rightUpperLeg, "right-upper-leg", [
      [0, Vector3.Zero()],
      [22, new Vector3(0.06, 0, 0)],
      [45, Vector3.Zero()],
    ]);
  });

  register("anim_char_sit_down", false, 50, (group) => {
    makePositionAnimation(group, joints.pelvis, "pelvis", [
      [0, new Vector3(0, 0.95, 0)],
      [24, new Vector3(0, 0.78, 0)],
      [50, new Vector3(0, 0.62, 0)],
    ]);
    for (const name of ["leftUpperLeg", "rightUpperLeg"] as const) {
      makeRotationAnimation(group, joints[name], name, [
        [0, Vector3.Zero()],
        [24, new Vector3(-0.7, 0, 0)],
        [50, new Vector3(-1.45, 0, 0)],
      ]);
    }
    for (const name of ["leftLowerLeg", "rightLowerLeg"] as const) {
      makeRotationAnimation(group, joints[name], name, [
        [0, Vector3.Zero()],
        [24, new Vector3(0.65, 0, 0)],
        [50, new Vector3(1.45, 0, 0)],
      ]);
    }
    makeRotationAnimation(group, joints.chest, "chest", [
      [0, Vector3.Zero()],
      [24, new Vector3(0.18, 0, 0)],
      [50, new Vector3(0.06, 0, 0)],
    ]);
    for (const [name, sign] of [
      ["leftUpperArm", -1],
      ["rightUpperArm", 1],
    ] as Array<[CharacterJointName, number]>) {
      makeRotationAnimation(group, joints[name], name, [
        [0, Vector3.Zero()],
        [24, new Vector3(0.12, 0, sign * 0.04)],
        [50, new Vector3(0.02, 0, sign * 0.02)],
      ]);
    }
  });

  register("anim_char_seated_idle_loop", true, 60, (group) => {
    makePositionAnimation(group, joints.pelvis, "pelvis", [
      [0, new Vector3(0, 0.62, 0)],
      [30, new Vector3(0, 0.625, 0)],
      [60, new Vector3(0, 0.62, 0)],
    ]);
    for (const name of ["leftUpperLeg", "rightUpperLeg"] as const) {
      makeRotationAnimation(group, joints[name], name, [
        [0, new Vector3(-1.45, 0, 0)],
        [60, new Vector3(-1.45, 0, 0)],
      ]);
    }
    for (const name of ["leftLowerLeg", "rightLowerLeg"] as const) {
      makeRotationAnimation(group, joints[name], name, [
        [0, new Vector3(1.45, 0, 0)],
        [60, new Vector3(1.45, 0, 0)],
      ]);
    }
    makeRotationAnimation(group, joints.chest, "chest", [
      [0, new Vector3(0.06, 0, 0)],
      [30, new Vector3(0.075, 0.01, 0)],
      [60, new Vector3(0.06, 0, 0)],
    ]);
    makeRotationAnimation(group, joints.leftUpperArm, "left-upper-arm", [
      [0, new Vector3(0.02, 0, -0.02)],
      [30, new Vector3(0.035, 0, -0.035)],
      [60, new Vector3(0.02, 0, -0.02)],
    ]);
    makeRotationAnimation(group, joints.rightUpperArm, "right-upper-arm", [
      [0, new Vector3(0.02, 0, 0.02)],
      [30, new Vector3(0.035, 0, 0.035)],
      [60, new Vector3(0.02, 0, 0.02)],
    ]);
  });

  register("anim_char_stand_up", false, 50, (group) => {
    makePositionAnimation(group, joints.pelvis, "pelvis", [
      [0, new Vector3(0, 0.62, 0)],
      [26, new Vector3(0, 0.79, 0)],
      [50, new Vector3(0, 0.95, 0)],
    ]);
    for (const name of ["leftUpperLeg", "rightUpperLeg"] as const) {
      makeRotationAnimation(group, joints[name], name, [
        [0, new Vector3(-1.45, 0, 0)],
        [26, new Vector3(-0.68, 0, 0)],
        [50, Vector3.Zero()],
      ]);
    }
    for (const name of ["leftLowerLeg", "rightLowerLeg"] as const) {
      makeRotationAnimation(group, joints[name], name, [
        [0, new Vector3(1.45, 0, 0)],
        [26, new Vector3(0.65, 0, 0)],
        [50, Vector3.Zero()],
      ]);
    }
    makeRotationAnimation(group, joints.chest, "chest", [
      [0, new Vector3(0.06, 0, 0)],
      [24, new Vector3(0.16, 0, 0)],
      [50, Vector3.Zero()],
    ]);
    for (const name of [
      "leftUpperArm",
      "rightUpperArm",
      "leftLowerArm",
      "rightLowerArm",
      "leftHand",
      "rightHand",
      "leftFoot",
      "rightFoot",
    ] as CharacterJointName[]) {
      makeRotationAnimation(group, joints[name], name, [
        [0, Vector3.Zero()],
        [50, Vector3.Zero()],
      ]);
    }
  });

  return clips;
}

export function createCharacterAnimationPrototype(
  scene: Scene,
): CharacterAnimationPrototype {
  const root = createJoint(scene, "root", null, Vector3.Zero());
  const joints = {} as Record<CharacterJointName, TransformNode>;
  joints.root = root;
  joints.pelvis = createJoint(
    scene,
    "pelvis",
    root,
    new Vector3(0, 0.95, 0),
  );

  joints.spine = createJoint(scene, "spine", joints.pelvis, new Vector3(0, 0.13, 0));
  joints.chest = createJoint(scene, "chest", joints.spine, new Vector3(0, 0.24, 0));
  joints.neck = createJoint(scene, "neck", joints.chest, new Vector3(0, 0.22, 0));
  joints.head = createJoint(scene, "head", joints.neck, new Vector3(0, 0.12, 0));

  joints.leftUpperArm = createJoint(
    scene,
    "leftUpperArm",
    joints.chest,
    new Vector3(0.23, 0.13, 0),
  );
  joints.leftLowerArm = createJoint(
    scene,
    "leftLowerArm",
    joints.leftUpperArm,
    new Vector3(0, -0.3, 0),
  );
  joints.leftHand = createJoint(
    scene,
    "leftHand",
    joints.leftLowerArm,
    new Vector3(0, -0.25, 0),
  );
  joints.rightUpperArm = createJoint(
    scene,
    "rightUpperArm",
    joints.chest,
    new Vector3(-0.23, 0.13, 0),
  );
  joints.rightLowerArm = createJoint(
    scene,
    "rightLowerArm",
    joints.rightUpperArm,
    new Vector3(0, -0.3, 0),
  );
  joints.rightHand = createJoint(
    scene,
    "rightHand",
    joints.rightLowerArm,
    new Vector3(0, -0.25, 0),
  );

  joints.leftUpperLeg = createJoint(
    scene,
    "leftUpperLeg",
    joints.pelvis,
    new Vector3(0.13, -0.08, 0),
  );
  joints.leftLowerLeg = createJoint(
    scene,
    "leftLowerLeg",
    joints.leftUpperLeg,
    new Vector3(0, -0.41, 0),
  );
  joints.leftFoot = createJoint(
    scene,
    "leftFoot",
    joints.leftLowerLeg,
    new Vector3(0, -0.38, 0),
  );
  joints.rightUpperLeg = createJoint(
    scene,
    "rightUpperLeg",
    joints.pelvis,
    new Vector3(-0.13, -0.08, 0),
  );
  joints.rightLowerLeg = createJoint(
    scene,
    "rightLowerLeg",
    joints.rightUpperLeg,
    new Vector3(0, -0.41, 0),
  );
  joints.rightFoot = createJoint(
    scene,
    "rightFoot",
    joints.rightLowerLeg,
    new Vector3(0, -0.38, 0),
  );

  const skeleton = new Skeleton(
    "char-v0-procedural-skeleton",
    "char-v0-procedural-skeleton",
    scene,
  );
  const bones = new Map<CharacterJointName, Bone>();
  const bind = (
    name: CharacterJointName,
    parentName: CharacterJointName | null,
  ): void => {
    const bone = addBone(
      skeleton,
      name,
      joints[name],
      parentName ? (bones.get(parentName) ?? null) : null,
    );
    bones.set(name, bone);
  };

  bind("root", null);
  bind("pelvis", "root");
  bind("spine", "pelvis");
  bind("chest", "spine");
  bind("neck", "chest");
  bind("head", "neck");
  bind("leftUpperArm", "chest");
  bind("leftLowerArm", "leftUpperArm");
  bind("leftHand", "leftLowerArm");
  bind("rightUpperArm", "chest");
  bind("rightLowerArm", "rightUpperArm");
  bind("rightHand", "rightLowerArm");
  bind("leftUpperLeg", "pelvis");
  bind("leftLowerLeg", "leftUpperLeg");
  bind("leftFoot", "leftLowerLeg");
  bind("rightUpperLeg", "pelvis");
  bind("rightLowerLeg", "rightUpperLeg");
  bind("rightFoot", "rightLowerLeg");

  const material = new StandardMaterial("char-v0-debug-material", scene);
  material.diffuseColor = new Color3(0.68, 0.72, 0.76);
  material.specularColor = new Color3(0.08, 0.08, 0.08);

  const meshes: Mesh[] = [];
  meshes.push(
    makePart(
      MeshBuilder.CreateSphere(
        "char-v0-head",
        { diameter: 0.22, segments: 8 },
        scene,
      ),
      joints.head,
      material,
      new Vector3(0, 0.07, 0),
    ),
  );
  meshes.push(
    makePart(
      MeshBuilder.CreateBox(
        "char-v0-torso",
        { width: 0.38, height: 0.42, depth: 0.18 },
        scene,
      ),
      joints.spine,
      material,
      new Vector3(0, 0.14, 0),
    ),
  );
  meshes.push(
    makePart(
      MeshBuilder.CreateBox(
        "char-v0-pelvis",
        { width: 0.3, height: 0.18, depth: 0.18 },
        scene,
      ),
      joints.pelvis,
      material,
      new Vector3(0, -0.03, 0),
    ),
  );

  for (const side of ["left", "right"] as const) {
    const upperArm =
      side === "left" ? joints.leftUpperArm : joints.rightUpperArm;
    const lowerArm =
      side === "left" ? joints.leftLowerArm : joints.rightLowerArm;
    const hand = side === "left" ? joints.leftHand : joints.rightHand;
    const upperLeg =
      side === "left" ? joints.leftUpperLeg : joints.rightUpperLeg;
    const lowerLeg =
      side === "left" ? joints.leftLowerLeg : joints.rightLowerLeg;
    const foot = side === "left" ? joints.leftFoot : joints.rightFoot;

    meshes.push(
      makePart(
        MeshBuilder.CreateCylinder(
          `char-v0-${side}-upper-arm`,
          { height: 0.3, diameter: 0.075, tessellation: 6 },
          scene,
        ),
        upperArm,
        material,
        new Vector3(0, -0.15, 0),
      ),
    );
    meshes.push(
      makePart(
        MeshBuilder.CreateCylinder(
          `char-v0-${side}-lower-arm`,
          { height: 0.25, diameter: 0.065, tessellation: 6 },
          scene,
        ),
        lowerArm,
        material,
        new Vector3(0, -0.125, 0),
      ),
    );
    meshes.push(
      makePart(
        MeshBuilder.CreateSphere(
          `char-v0-${side}-hand`,
          { diameter: 0.09, segments: 6 },
          scene,
        ),
        hand,
        material,
        new Vector3(0, -0.045, 0),
      ),
    );
    meshes.push(
      makePart(
        MeshBuilder.CreateCylinder(
          `char-v0-${side}-upper-leg`,
          { height: 0.41, diameter: 0.1, tessellation: 6 },
          scene,
        ),
        upperLeg,
        material,
        new Vector3(0, -0.205, 0),
      ),
    );
    meshes.push(
      makePart(
        MeshBuilder.CreateCylinder(
          `char-v0-${side}-lower-leg`,
          { height: 0.38, diameter: 0.085, tessellation: 6 },
          scene,
        ),
        lowerLeg,
        material,
        new Vector3(0, -0.19, 0),
      ),
    );
    meshes.push(
      makePart(
        MeshBuilder.CreateBox(
          `char-v0-${side}-foot`,
          { width: 0.11, height: 0.06, depth: 0.24 },
          scene,
        ),
        foot,
        material,
        new Vector3(0, -0.03, 0.08),
      ),
    );
  }

  const restPose = new Map<CharacterJointName, PoseSnapshot>();
  for (const name of Object.keys(joints) as CharacterJointName[]) {
    restPose.set(name, {
      position: joints[name].position.clone(),
      rotation: joints[name].rotation.clone(),
    });
  }

  const applyStandingPose = (): void => {
    for (const [name, pose] of restPose) {
      joints[name].position.copyFrom(pose.position);
      joints[name].rotation.copyFrom(pose.rotation);
    }
  };

  const applySeatedPose = (): void => {
    applyStandingPose();
    joints.pelvis.position.y = 0.62;
    joints.leftUpperLeg.rotation.x = -1.45;
    joints.rightUpperLeg.rotation.x = -1.45;
    joints.leftLowerLeg.rotation.x = 1.45;
    joints.rightLowerLeg.rotation.x = 1.45;
    joints.chest.rotation.x = 0.06;
  };

  const clips = buildClips(scene, joints);
  const vertexCount = meshes.reduce(
    (total, mesh) => total + mesh.getTotalVertices(),
    0,
  );
  const triangleCount = meshes.reduce(
    (total, mesh) => total + Math.floor(mesh.getTotalIndices() / 3),
    0,
  );
  const materialCount = new Set(
    meshes.map((mesh) => mesh.material?.uniqueId).filter(Boolean),
  ).size;

  const metrics: CharacterPrototypeMetrics = {
    boneCount: skeleton.bones.length,
    meshCount: meshes.length,
    vertexCount,
    triangleCount,
    materialCount,
    clipCount: clips.size,
  };

  return {
    root,
    skeleton,
    joints,
    meshes,
    material,
    clips,
    metrics,
    applyStandingPose,
    applySeatedPose,
    dispose(): void {
      for (const clip of clips.values()) {
        clip.group.dispose();
      }
      skeleton.dispose();
      root.dispose(false, true);
      material.dispose();
    },
  };
}
