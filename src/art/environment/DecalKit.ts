import { Color3 } from "@babylonjs/core/Maths/math.color";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import type { Scene } from "@babylonjs/core/scene";

export type SurfaceDecalKind =
  | "water-stain"
  | "dirt"
  | "scuff"
  | "tape-mark"
  | "shoe-mark"
  | "faded-notice"
  | "small-crack"
  | "edge-wear";

export interface SurfaceDecalOptions {
  position: Vector3;
  rotation: Vector3;
  width: number;
  height: number;
  kind: SurfaceDecalKind;
  alpha?: number;
}

const COLORS: Record<SurfaceDecalKind, Color3> = {
  "water-stain": new Color3(0.11, 0.13, 0.12),
  dirt: new Color3(0.09, 0.085, 0.07),
  scuff: new Color3(0.17, 0.17, 0.15),
  "tape-mark": new Color3(0.5, 0.46, 0.31),
  "shoe-mark": new Color3(0.07, 0.07, 0.065),
  "faded-notice": new Color3(0.58, 0.54, 0.4),
  "small-crack": new Color3(0.08, 0.085, 0.08),
  "edge-wear": new Color3(0.27, 0.26, 0.22),
};

export function createSurfaceDecal(
  scene: Scene,
  name: string,
  options: SurfaceDecalOptions,
): Mesh {
  const mesh = MeshBuilder.CreatePlane(
    name,
    { width: options.width, height: options.height },
    scene,
  );
  mesh.position.copyFrom(options.position);
  mesh.rotation.copyFrom(options.rotation);
  mesh.isPickable = false;

  const material = new StandardMaterial(`${name}-material`, scene);
  material.diffuseColor = COLORS[options.kind];
  material.emissiveColor = COLORS[options.kind].scale(0.04);
  material.specularColor = Color3.Black();
  material.alpha = options.alpha ?? 0.16;
  material.backFaceCulling = true;
  material.zOffset = -2;
  mesh.material = material;

  return mesh;
}
