import { Color3 } from "@babylonjs/core/Maths/math.color";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { Scene } from "@babylonjs/core/scene";

export interface ProductionMaterialLibrary {
  plaster: PBRMaterial;
  paintedWall: PBRMaterial;
  tile: PBRMaterial;
  concrete: PBRMaterial;
  woodLaminate: PBRMaterial;
  paintedMetal: PBRMaterial;
  plastic: PBRMaterial;
  glass: PBRMaterial;
  paperCardboard: PBRMaterial;
  wetExterior: PBRMaterial;
  interiorWallLight: PBRMaterial;
  interiorFloorLight: PBRMaterial;
  interiorCeilingLight: PBRMaterial;
}

interface MaterialPreset {
  albedo: Color3;
  metallic: number;
  roughness: number;
}

function createPbr(
  scene: Scene,
  name: string,
  preset: MaterialPreset,
): PBRMaterial {
  const material = new PBRMaterial(name, scene);
  material.albedoColor = preset.albedo;
  material.metallic = preset.metallic;
  material.roughness = preset.roughness;
  material.environmentIntensity = 0.55;
  return material;
}

export function createProductionMaterialLibrary(
  scene: Scene,
  prefix = "v2-mat",
): ProductionMaterialLibrary {
  const plaster = createPbr(scene, `${prefix}-plaster`, {
    albedo: new Color3(0.62, 0.6, 0.53),
    metallic: 0,
    roughness: 0.92,
  });
  const paintedWall = createPbr(scene, `${prefix}-painted-wall`, {
    albedo: new Color3(0.28, 0.39, 0.35),
    metallic: 0,
    roughness: 0.84,
  });
  const tile = createPbr(scene, `${prefix}-tile`, {
    albedo: new Color3(0.31, 0.32, 0.29),
    metallic: 0,
    roughness: 0.58,
  });
  const concrete = createPbr(scene, `${prefix}-concrete`, {
    albedo: new Color3(0.25, 0.26, 0.26),
    metallic: 0,
    roughness: 0.96,
  });
  const woodLaminate = createPbr(scene, `${prefix}-wood-laminate`, {
    albedo: new Color3(0.4, 0.27, 0.14),
    metallic: 0,
    roughness: 0.62,
  });
  const paintedMetal = createPbr(scene, `${prefix}-painted-metal`, {
    albedo: new Color3(0.22, 0.27, 0.28),
    metallic: 0.34,
    roughness: 0.58,
  });
  const plastic = createPbr(scene, `${prefix}-plastic`, {
    albedo: new Color3(0.44, 0.46, 0.43),
    metallic: 0,
    roughness: 0.48,
  });
  const glass = createPbr(scene, `${prefix}-glass`, {
    albedo: new Color3(0.42, 0.5, 0.52),
    metallic: 0,
    roughness: 0.12,
  });
  glass.alpha = 0.34;
  glass.backFaceCulling = false;

  const paperCardboard = createPbr(scene, `${prefix}-paper-cardboard`, {
    albedo: new Color3(0.69, 0.64, 0.49),
    metallic: 0,
    roughness: 0.9,
  });
  const wetExterior = createPbr(scene, `${prefix}-wet-exterior`, {
    albedo: new Color3(0.075, 0.085, 0.09),
    metallic: 0.04,
    roughness: 0.32,
  });
  wetExterior.environmentIntensity = 0.78;

  const interiorWallLight = createPbr(scene, `${prefix}-interior-wall-light`, {
    albedo: new Color3(0.76, 0.76, 0.68),
    metallic: 0,
    roughness: 0.88,
  });
  interiorWallLight.environmentIntensity = 0.72;

  const interiorFloorLight = createPbr(scene, `${prefix}-interior-floor-light`, {
    albedo: new Color3(0.46, 0.47, 0.43),
    metallic: 0,
    roughness: 0.56,
  });
  interiorFloorLight.environmentIntensity = 0.78;

  const interiorCeilingLight = createPbr(scene, `${prefix}-interior-ceiling-light`, {
    albedo: new Color3(0.83, 0.83, 0.77),
    metallic: 0,
    roughness: 0.9,
  });
  interiorCeilingLight.environmentIntensity = 0.7;

  return {
    plaster,
    paintedWall,
    tile,
    concrete,
    woodLaminate,
    paintedMetal,
    plastic,
    glass,
    paperCardboard,
    wetExterior,
    interiorWallLight,
    interiorFloorLight,
    interiorCeilingLight,
  };
}
