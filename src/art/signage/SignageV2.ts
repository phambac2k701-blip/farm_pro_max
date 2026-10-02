import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";

export type SignageVariant =
  | "building"
  | "room"
  | "notice"
  | "floor"
  | "schedule";

export interface SignageStyle {
  background: string;
  foreground: string;
  backingColor: Color3;
  fontFamily: string;
  fontWeight: number;
}

export interface SignageV2Options {
  text: string;
  position: Vector3;
  rotationY: number;
  width?: number;
  height?: number;
  variant?: SignageVariant;
  style?: Partial<SignageStyle>;
}

export interface SignageAssembly {
  root: TransformNode;
  face: Mesh;
  backing: Mesh;
}

const GENERIC_STYLE: SignageStyle = {
  background: "#d6d1bb",
  foreground: "#1e211f",
  backingColor: new Color3(0.16, 0.18, 0.17),
  fontFamily: "Arial, sans-serif",
  fontWeight: 650,
};

const VARIANT_SCALE: Record<SignageVariant, number> = {
  building: 0.28,
  room: 0.29,
  notice: 0.15,
  floor: 0.36,
  schedule: 0.13,
};

function resolveStyle(overrides?: Partial<SignageStyle>): SignageStyle {
  return {
    ...GENERIC_STYLE,
    ...overrides,
    backingColor:
      overrides?.backingColor?.clone() ?? GENERIC_STYLE.backingColor.clone(),
  };
}

function drawSignTexture(
  scene: Scene,
  name: string,
  text: string,
  variant: SignageVariant,
  style: SignageStyle,
): DynamicTexture {
  const texture = new DynamicTexture(
    `${name}-texture`,
    { width: 1024, height: 256 },
    scene,
    false,
  );
  const context = texture.getContext();
  context.fillStyle = style.background;
  context.fillRect(0, 0, 1024, 256);
  context.fillStyle = style.foreground;

  const preferredSize = Math.round(256 * VARIANT_SCALE[variant]);
  let fontSize = preferredSize;
  while (fontSize > 34) {
    context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    if (context.measureText(text).width <= 930) {
      break;
    }
    fontSize -= 3;
  }

  const textWidth = context.measureText(text).width;
  context.fillText(text, Math.max(47, (1024 - textWidth) / 2), 155, 930);
  texture.update(true);
  return texture;
}

export function createSignageV2(
  scene: Scene,
  name: string,
  options: SignageV2Options,
): SignageAssembly {
  const variant = options.variant ?? "room";
  const width = options.width ?? 1.8;
  const height = options.height ?? 0.42;
  const style = resolveStyle(options.style);

  const root = new TransformNode(`${name}-root`, scene);
  root.position.copyFrom(options.position);
  root.rotation.y = options.rotationY;

  const backing = MeshBuilder.CreateBox(
    `${name}-backing`,
    {
      width: width + 0.08,
      height: height + 0.08,
      depth: 0.065,
    },
    scene,
  );
  backing.parent = root;
  backing.isPickable = false;
  const backingMaterial = new StandardMaterial(
    `${name}-backing-material`,
    scene,
  );
  backingMaterial.diffuseColor = style.backingColor;
  backingMaterial.specularColor = new Color3(0.08, 0.08, 0.08);
  backing.material = backingMaterial;

  const face = MeshBuilder.CreatePlane(
    name,
    { width, height },
    scene,
  );
  face.parent = root;
  face.position.z = -0.034;
  face.isPickable = false;

  const faceMaterial = new StandardMaterial(`${name}-face-material`, scene);
  faceMaterial.backFaceCulling = true;
  const supportsCanvas =
    typeof document !== "undefined" ||
    typeof OffscreenCanvas !== "undefined";
  if (supportsCanvas) {
    faceMaterial.diffuseTexture = drawSignTexture(
      scene,
      name,
      options.text,
      variant,
      style,
    );
    faceMaterial.diffuseColor = Color3.White();
  } else {
    faceMaterial.diffuseColor = new Color3(0.78, 0.76, 0.67);
  }
  faceMaterial.emissiveColor = new Color3(0.035, 0.035, 0.03);
  faceMaterial.specularColor = Color3.Black();
  face.material = faceMaterial;

  return { root, face, backing };
}

export const TBD_USER_APPROVAL_INSTITUTIONAL_SIGNAGE_STYLE =
  "TBD_USER_APPROVAL_INSTITUTIONAL_SIGNAGE_STYLE";
