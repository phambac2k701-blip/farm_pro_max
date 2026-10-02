import { mkdir, writeFile } from "node:fs/promises";
import { NullEngine } from "@babylonjs/core/Engines/nullEngine.js";
import { Scene } from "@babylonjs/core/scene.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { GLTF2Export } from "@babylonjs/serializers/glTF/index.js";

const OUT = "public/assets/classroom/v1";
await mkdir(OUT, { recursive: true });

function pbr(scene, name, color, roughness, metallic = 0) {
  const m = new PBRMaterial(name, scene);
  m.albedoColor = Color3.FromHexString(color);
  m.roughness = roughness;
  m.metallic = metallic;
  return m;
}
function box(scene, name, size, position, material, rotation = Vector3.Zero()) {
  const m = MeshBuilder.CreateBox(name, {
    width: size.x, height: size.y, depth: size.z,
  }, scene);
  m.position.copyFrom(position);
  m.rotation.copyFrom(rotation);
  m.material = material;
  return m;
}
function cyl(scene, name, radius, height, position, material, rotation = Vector3.Zero(), tessellation = 16) {
  const m = MeshBuilder.CreateCylinder(name, {
    diameter: radius * 2, height, tessellation,
  }, scene);
  m.position.copyFrom(position);
  m.rotation.copyFrom(rotation);
  m.material = material;
  return m;
}
function barX(scene, name, length, radius, position, material) {
  return cyl(scene, name, radius, length, position, material, new Vector3(0, 0, Math.PI / 2));
}
function barZ(scene, name, length, radius, position, material) {
  return cyl(scene, name, radius, length, position, material, new Vector3(Math.PI / 2, 0, 0));
}
function merge(scene, name, parts) {
  const merged = Mesh.MergeMeshes(parts, true, true, undefined, true, true);
  if (!merged) throw new Error(`Failed to merge ${name}`);
  merged.name = name;
  merged.id = name;
  merged.position.set(0, 0, 0);
  return merged;
}
async function saveScene(name, build) {
  const engine = new NullEngine({ renderWidth: 64, renderHeight: 64, textureSize: 64 });
  const scene = new Scene(engine);
  scene.useRightHandedSystem = false;
  build(scene);
  const data = await GLTF2Export.GLBAsync(scene, name, { exportWithoutWaitingForScene: true });
  const value = data.files[`${name}.glb`];
  let buffer;
  if (value instanceof Blob) buffer = Buffer.from(await value.arrayBuffer());
  else if (value instanceof ArrayBuffer) buffer = Buffer.from(value);
  else if (ArrayBuffer.isView(value)) buffer = Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  else throw new Error(`Unsupported GLB payload for ${name}`);
  await writeFile(`${OUT}/${name}.glb`, buffer);
  console.log(`${name}.glb ${buffer.length} bytes`);
  scene.dispose();
  engine.dispose();
}

await saveScene("student-desk-v1", (scene) => {
  const wood = pbr(scene, "desk-laminate", "#B88755", 0.58, 0.02);
  const edge = pbr(scene, "desk-edge", "#6F4D31", 0.5, 0.03);
  const metal = pbr(scene, "desk-tube", "#5D676B", 0.34, 0.68);
  const dark = pbr(scene, "desk-dark", "#35393B", 0.42, 0.55);
  const parts = [];
  parts.push(box(scene, "top", new Vector3(1.5, 0.055, 0.62), new Vector3(0, 0.76, 0), wood));
  parts.push(box(scene, "front-edge", new Vector3(1.5, 0.035, 0.035), new Vector3(0, 0.735, -0.31), edge));
  parts.push(box(scene, "back-edge", new Vector3(1.5, 0.03, 0.03), new Vector3(0, 0.738, 0.31), edge));
  for (const x of [-0.66, 0.66]) for (const z of [-0.23, 0.23]) {
    parts.push(cyl(scene, `leg-${x}-${z}`, 0.026, 0.715, new Vector3(x, 0.3575, z), metal));
    parts.push(cyl(scene, `foot-${x}-${z}`, 0.031, 0.018, new Vector3(x, 0.009, z), dark));
  }
  parts.push(barX(scene, "front-rail", 1.32, 0.021, new Vector3(0, 0.64, -0.23), metal));
  parts.push(barX(scene, "rear-rail", 1.32, 0.021, new Vector3(0, 0.64, 0.23), metal));
  parts.push(barZ(scene, "left-lower-brace", 0.46, 0.018, new Vector3(-0.66, 0.28, 0), metal));
  parts.push(barZ(scene, "right-lower-brace", 0.46, 0.018, new Vector3(0.66, 0.28, 0), metal));
  parts.push(barX(scene, "basket-front", 1.18, 0.012, new Vector3(0, 0.51, -0.15), dark));
  parts.push(barX(scene, "basket-rear", 1.18, 0.012, new Vector3(0, 0.51, 0.15), dark));
  for (const x of [-0.48, -0.24, 0, 0.24, 0.48]) {
    parts.push(barZ(scene, `basket-slat-${x}`, 0.3, 0.008, new Vector3(x, 0.51, 0), dark));
  }
  const hook = MeshBuilder.CreateTorus("bag-hook", { diameter: 0.11, thickness: 0.014, tessellation: 16 }, scene);
  hook.position.set(0.72, 0.52, 0.18); hook.rotation.x = Math.PI / 2; hook.material = dark; parts.push(hook);
  merge(scene, "student-desk-v1", parts);
});

await saveScene("student-chair-v1", (scene) => {
  const wood = pbr(scene, "chair-laminate", "#B88755", 0.6, 0.02);
  const edge = pbr(scene, "chair-edge", "#6F4D31", 0.52, 0.02);
  const metal = pbr(scene, "chair-tube", "#606A6E", 0.34, 0.7);
  const dark = pbr(scene, "chair-foot", "#34383A", 0.45, 0.5);
  const parts = [];
  parts.push(box(scene, "seat", new Vector3(0.46, 0.05, 0.44), new Vector3(0, 0.46, 0), wood));
  parts.push(box(scene, "seat-front-edge", new Vector3(0.46, 0.03, 0.03), new Vector3(0, 0.445, 0.22), edge));
  parts.push(box(scene, "back-panel", new Vector3(0.44, 0.32, 0.035), new Vector3(0, 0.79, -0.19), wood, new Vector3(-0.08, 0, 0)));
  for (const x of [-0.18, 0.18]) for (const z of [-0.17, 0.17]) {
    parts.push(cyl(scene, `leg-${x}-${z}`, 0.018, 0.43, new Vector3(x, 0.215, z), metal));
    parts.push(cyl(scene, `foot-${x}-${z}`, 0.023, 0.016, new Vector3(x, 0.008, z), dark));
  }
  for (const x of [-0.18, 0.18]) {
    parts.push(cyl(scene, `back-upright-${x}`, 0.018, 0.62, new Vector3(x, 0.61, -0.18), metal));
  }
  parts.push(barX(scene, "under-seat-front", 0.36, 0.014, new Vector3(0, 0.39, 0.17), metal));
  parts.push(barX(scene, "under-seat-rear", 0.36, 0.014, new Vector3(0, 0.39, -0.17), metal));
  parts.push(barX(scene, "back-lower-rail", 0.36, 0.013, new Vector3(0, 0.62, -0.19), metal));
  merge(scene, "student-chair-v1", parts);
});

await saveScene("teacher-desk-v1", (scene) => {
  const wood = pbr(scene, "teacher-laminate", "#9B6A3D", 0.55, 0.02);
  const edge = pbr(scene, "teacher-edge", "#65452E", 0.48, 0.02);
  const metal = pbr(scene, "teacher-frame", "#596267", 0.32, 0.72);
  const drawer = pbr(scene, "teacher-drawer", "#7A5435", 0.58, 0.02);
  const dark = pbr(scene, "teacher-handle", "#313638", 0.32, 0.78);
  const parts = [];
  parts.push(box(scene, "top", new Vector3(1.72, 0.06, 0.78), new Vector3(0, 0.79, 0), wood));
  parts.push(box(scene, "front-edge", new Vector3(1.72, 0.04, 0.035), new Vector3(0, 0.76, -0.39), edge));
  for (const x of [-0.75, 0.75]) for (const z of [-0.31, 0.31]) parts.push(cyl(scene, `leg-${x}-${z}`, 0.028, 0.74, new Vector3(x, 0.37, z), metal));
  parts.push(box(scene, "modesty", new Vector3(1.38, 0.4, 0.035), new Vector3(0, 0.48, 0.31), wood));
  parts.push(box(scene, "pedestal", new Vector3(0.42, 0.62, 0.54), new Vector3(0.52, 0.34, -0.02), drawer));
  parts.push(box(scene, "drawer-line-1", new Vector3(0.39, 0.014, 0.015), new Vector3(0.52, 0.44, -0.297), dark));
  parts.push(box(scene, "drawer-line-2", new Vector3(0.39, 0.014, 0.015), new Vector3(0.52, 0.24, -0.297), dark));
  parts.push(barX(scene, "lower-frame", 1.46, 0.02, new Vector3(0, 0.18, 0.31), metal));
  merge(scene, "teacher-desk-v1", parts);
});

await saveScene("classroom-board-v1", (scene) => {
  const board = pbr(scene, "board-surface", "#E7E6D8", 0.78, 0);
  const frame = pbr(scene, "board-frame", "#8B9092", 0.3, 0.75);
  const tray = pbr(scene, "board-tray", "#6F7578", 0.34, 0.7);
  const parts = [];
  parts.push(box(scene, "surface", new Vector3(5.4, 1.5, 0.035), Vector3.Zero(), board));
  parts.push(box(scene, "frame-top", new Vector3(5.52, 0.055, 0.07), new Vector3(0, 0.775, 0), frame));
  parts.push(box(scene, "frame-bottom", new Vector3(5.52, 0.055, 0.07), new Vector3(0, -0.775, 0), frame));
  parts.push(box(scene, "frame-left", new Vector3(0.055, 1.6, 0.07), new Vector3(-2.735, 0, 0), frame));
  parts.push(box(scene, "frame-right", new Vector3(0.055, 1.6, 0.07), new Vector3(2.735, 0, 0), frame));
  parts.push(box(scene, "marker-tray", new Vector3(3.8, 0.055, 0.18), new Vector3(0, -0.84, -0.06), tray));
  merge(scene, "classroom-board-v1", parts);
});

await saveScene("ceiling-fan-v1", (scene) => {
  const metal = pbr(scene, "fan-metal", "#7C8588", 0.36, 0.7);
  const blade = pbr(scene, "fan-blade", "#D8D6C9", 0.58, 0.08);
  const dark = pbr(scene, "fan-dark", "#4B5153", 0.4, 0.6);
  const parts = [];
  parts.push(cyl(scene, "downrod", 0.022, 0.46, new Vector3(0, 0.27, 0), metal));
  parts.push(cyl(scene, "canopy", 0.11, 0.08, new Vector3(0, 0.5, 0), metal));
  parts.push(cyl(scene, "motor", 0.16, 0.22, new Vector3(0, 0, 0), dark));
  for (let i=0;i<3;i++) {
    const a=i*Math.PI*2/3;
    const b=box(scene,`blade-${i}`,new Vector3(0.17,0.025,1.08),new Vector3(Math.sin(a)*0.56,-0.11,Math.cos(a)*0.56),blade);
    b.rotation.y=a;
    parts.push(b);
  }
  merge(scene, "ceiling-fan-v1", parts);
});

await saveScene("wall-ac-v1", (scene) => {
  const shell = pbr(scene, "ac-shell", "#F2F0E7", 0.48, 0.02);
  const seam = pbr(scene, "ac-seam", "#C6C7C0", 0.55, 0.02);
  const dark = pbr(scene, "ac-vent", "#4A4F50", 0.48, 0.15);
  const parts = [];
  parts.push(box(scene, "housing", new Vector3(1.16, 0.34, 0.24), Vector3.Zero(), shell));
  parts.push(box(scene, "front-lip", new Vector3(1.08, 0.055, 0.035), new Vector3(0,-0.12,-0.13), seam));
  parts.push(box(scene, "vent-dark", new Vector3(0.98, 0.075, 0.025), new Vector3(0,-0.08,-0.135), dark));
  for(let i=0;i<8;i++) {
    const x=-0.42+i*0.12;
    parts.push(box(scene,`louver-${i}`,new Vector3(0.012,0.07,0.045),new Vector3(x,-0.08,-0.152),seam,new Vector3(0.15,0,0)));
  }
  parts.push(box(scene, "indicator", new Vector3(0.055,0.018,0.012), new Vector3(0.43,0.095,-0.127), dark));
  merge(scene, "wall-ac-v1", parts);
});

await saveScene("fluorescent-fixture-v1", (scene) => {
  const housing = pbr(scene, "fixture-housing", "#90989A", 0.34, 0.68);
  const lamp = pbr(scene, "fixture-diffuser", "#F4FFF6", 0.28, 0.02);
  lamp.emissiveColor = Color3.FromHexString("#BFD7C7");
  lamp.emissiveIntensity = 1.35;
  const parts = [];
  parts.push(box(scene, "housing", new Vector3(1.42,0.085,0.24), Vector3.Zero(), housing));
  parts.push(box(scene, "diffuser", new Vector3(1.24,0.028,0.13), new Vector3(0,-0.055,0), lamp));
  parts.push(box(scene, "end-left", new Vector3(0.06,0.07,0.2), new Vector3(-0.67,-0.01,0), housing));
  parts.push(box(scene, "end-right", new Vector3(0.06,0.07,0.2), new Vector3(0.67,-0.01,0), housing));
  merge(scene, "fluorescent-fixture-v1", parts);
});

console.log("classroom asset production complete");