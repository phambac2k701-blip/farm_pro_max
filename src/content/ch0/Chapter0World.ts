import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

import type { Chapter0SceneId } from "./Chapter0Runtime";

export type Chapter0ZoneId = "street" | "bus" | "uet";

export type Chapter0ActionId =
  | "hail_bus"
  | "talk_driver"
  | "observe_red_light"
  | "board_outbound"
  | "resolve_fare"
  | "finish_ride_uet"
  | "nav_staff"
  | "nav_students"
  | "nav_self"
  | "open_wrong_room"
  | "complete_admin"
  | "prepare_return_fare"
  | "board_return"
  | "finish_ride_home";

export interface Chapter0InteractionTarget {
  actionId: Chapter0ActionId;
  mesh: AbstractMesh;
  prompt: string;
  maxDistance: number;
}

const ACTION_PROMPTS: Record<Chapter0ActionId, string> = {
  hail_bus: "E · Vẫy xe",
  talk_driver: "E · Nói chuyện",
  observe_red_light: "E · Chờ đèn đỏ",
  board_outbound: "E · Lên xe",
  resolve_fare: "E · Xử lý tiền vé",
  finish_ride_uet: "E · Chuẩn bị xuống",
  nav_staff: "E · Hỏi nhân viên",
  nav_students: "E · Đi theo nhóm sinh viên",
  nav_self: "E · Tự tìm bằng biển / điện thoại",
  open_wrong_room: "E · Mở cửa",
  complete_admin: "E · Làm thủ tục",
  prepare_return_fare: "E · Rút tiền trước khi về",
  board_return: "E · Lên xe về",
  finish_ride_home: "E · Xuống gần phòng trọ",
};

export class Chapter0World {
  readonly spawns = {
    streetStart: new Vector3(0, 0.02, -6),
    streetBusStop: new Vector3(11, 0.02, -4),
    streetHome: new Vector3(-11, 0.02, -5),
    busEntry: new Vector3(0, 0.02, -6),
    uetEntry: new Vector3(0, 0.02, -7),
    uetExit: new Vector3(0, 0.02, 5),
  } as const;

  private readonly roots: Record<Chapter0ZoneId, TransformNode>;
  private readonly targets = new Map<Chapter0ActionId, Chapter0InteractionTarget>();
  private currentZone: Chapter0ZoneId = "street";
  private flybyVehicle: AbstractMesh | null = null;
  private flybyActive = false;
  private flybyElapsed = 0;

  constructor(private readonly scene: Scene) {
    this.roots = {
      street: new TransformNode("ch0-zone-street", scene),
      bus: new TransformNode("ch0-zone-bus", scene),
      uet: new TransformNode("ch0-zone-uet", scene),
    };

    const light = new HemisphericLight(
      "ch0-greybox-light",
      new Vector3(0.2, 1, -0.3),
      scene,
    );
    light.intensity = 0.82;

    this.buildStreet();
    this.buildBus();
    this.buildUet();
    this.activateZone("street");
    this.setPhase("CH0-S01");
  }

  get zoneId(): Chapter0ZoneId {
    return this.currentZone;
  }

  get interactionTargets(): readonly Chapter0InteractionTarget[] {
    return [...this.targets.values()];
  }

  activateZone(zone: Chapter0ZoneId): void {
    this.currentZone = zone;
    for (const [id, root] of Object.entries(this.roots) as [
      Chapter0ZoneId,
      TransformNode,
    ][]) {
      root.setEnabled(id === zone);
    }
  }

  setPhase(sceneId: Chapter0SceneId): void {
    for (const target of this.targets.values()) {
      target.mesh.setEnabled(false);
    }

    const enabled: Chapter0ActionId[] = [];
    if (sceneId === "CH0-S02") enabled.push("hail_bus");
    if (sceneId === "CH0-S02A") enabled.push("talk_driver");
    if (sceneId === "CH0-S02B") enabled.push("observe_red_light");
    if (sceneId === "CH0-S03") enabled.push("board_outbound");
    if (sceneId === "CH0-S04") enabled.push("resolve_fare");
    if (sceneId === "CH0-S05") enabled.push("finish_ride_uet");
    if (sceneId === "CH0-S06") {
      enabled.push("nav_staff", "nav_students", "nav_self");
    }
    if (sceneId === "CH0-S07") enabled.push("complete_admin");
    if (sceneId === "CH0-S08") {
      enabled.push("prepare_return_fare", "board_return");
    }
    if (sceneId === "CH0-S09") enabled.push("finish_ride_home");

    for (const actionId of enabled) {
      this.targets.get(actionId)?.mesh.setEnabled(true);
    }
  }

  enableOnly(actionIds: readonly Chapter0ActionId[]): void {
    for (const target of this.targets.values()) {
      target.mesh.setEnabled(actionIds.includes(target.actionId));
    }
  }

  triggerFlyby(): void {
    if (!this.flybyVehicle) return;
    this.flybyVehicle.position.set(-18, 0.65, 1.8);
    this.flybyVehicle.setEnabled(true);
    this.flybyElapsed = 0;
    this.flybyActive = true;
  }

  update(deltaSeconds: number): void {
    if (!this.flybyActive || !this.flybyVehicle) return;
    this.flybyElapsed += Math.max(0, deltaSeconds);
    this.flybyVehicle.position.x += deltaSeconds * 27;
    if (this.flybyElapsed >= 1.45) {
      this.flybyActive = false;
      this.flybyVehicle.setEnabled(false);
    }
  }

  dispose(): void {
    Object.values(this.roots).forEach((root) => root.dispose(false, true));
  }

  private material(name: string, color: Color3): StandardMaterial {
    const material = new StandardMaterial(name, this.scene);
    material.diffuseColor = color;
    material.specularColor = Color3.Black();
    return material;
  }

  private box(
    name: string,
    root: TransformNode,
    size: { width: number; height: number; depth: number },
    position: Vector3,
    material: StandardMaterial,
    collide = false,
  ): AbstractMesh {
    const mesh = MeshBuilder.CreateBox(name, size, this.scene);
    mesh.parent = root;
    mesh.position.copyFrom(position);
    mesh.material = material;
    mesh.checkCollisions = collide;
    mesh.isPickable = false;
    return mesh;
  }

  private registerAction(
    actionId: Chapter0ActionId,
    mesh: AbstractMesh,
    maxDistance = 2.8,
  ): void {
    mesh.isPickable = true;
    this.targets.set(actionId, {
      actionId,
      mesh,
      prompt: ACTION_PROMPTS[actionId],
      maxDistance,
    });
  }

  private addBounds(
    root: TransformNode,
    width: number,
    depth: number,
    material: StandardMaterial,
  ): void {
    this.box(
      `${root.name}-ground`,
      root,
      { width, height: 0.2, depth },
      new Vector3(0, -0.1, 0),
      material,
      true,
    );
    const wallMaterial = this.material(
      `${root.name}-bound-mat`,
      new Color3(0.16, 0.17, 0.18),
    );
    const wallHeight = 2.6;
    const thickness = 0.25;
    for (const [name, pos, size] of [
      ["north", new Vector3(0, wallHeight / 2, depth / 2), { width, height: wallHeight, depth: thickness }],
      ["south", new Vector3(0, wallHeight / 2, -depth / 2), { width, height: wallHeight, depth: thickness }],
      ["east", new Vector3(width / 2, wallHeight / 2, 0), { width: thickness, height: wallHeight, depth }],
      ["west", new Vector3(-width / 2, wallHeight / 2, 0), { width: thickness, height: wallHeight, depth }],
    ] as const) {
      const wall = this.box(
        `${root.name}-bound-${name}`,
        root,
        size,
        pos,
        wallMaterial,
        true,
      );
      wall.visibility = 0.15;
    }
  }

  private npc(
    name: string,
    root: TransformNode,
    position: Vector3,
    material: StandardMaterial,
  ): AbstractMesh {
    const body = this.box(
      name,
      root,
      { width: 0.65, height: 1.65, depth: 0.45 },
      position.add(new Vector3(0, 0.825, 0)),
      material,
      true,
    );
    return body;
  }

  private buildStreet(): void {
    const root = this.roots.street;
    const ground = this.material("ch0-street-ground-mat", new Color3(0.3, 0.31, 0.32));
    const prop = this.material("ch0-street-prop-mat", new Color3(0.52, 0.52, 0.48));
    const busMat = this.material("ch0-bus-placeholder-mat", new Color3(0.19, 0.37, 0.49));
    const npcMat = this.material("ch0-npc-placeholder-mat", new Color3(0.55, 0.45, 0.35));
    this.addBounds(root, 48, 18, ground);

    this.box("ch0-street-curb", root, { width: 44, height: 0.18, depth: 2.2 }, new Vector3(0, 0.09, -3.7), prop, true);

    const passingBus = this.box(
      "ch0-passing-bus",
      root,
      { width: 4.4, height: 2.6, depth: 2.1 },
      new Vector3(0, 1.3, 2),
      busMat,
    );
    this.registerAction("hail_bus", passingBus, 12);

    const driver = this.npc("npc_grab_driver_recurring", root, new Vector3(2.5, 0, -1.4), npcMat);
    this.registerAction("talk_driver", driver);

    const redLight = this.box(
      "ch0-red-light-pole",
      root,
      { width: 0.3, height: 2.6, depth: 0.3 },
      new Vector3(6.5, 1.3, -1),
      prop,
    );
    this.registerAction("observe_red_light", redLight, 3.5);

    const stop = this.box(
      "ch0-bus-stop-sign",
      root,
      { width: 0.65, height: 2.3, depth: 0.18 },
      new Vector3(12, 1.15, -1.2),
      prop,
      true,
    );
    const outbound = this.box(
      "ch0-outbound-bus-door",
      root,
      { width: 1.2, height: 2.2, depth: 0.2 },
      new Vector3(14.3, 1.1, 0.2),
      busMat,
    );
    this.registerAction("board_outbound", outbound, 3.2);

    this.flybyVehicle = this.box(
      "ch0-boy-pho-flyby-placeholder",
      root,
      { width: 1.9, height: 0.8, depth: 0.7 },
      new Vector3(-18, 0.65, 1.8),
      npcMat,
    );
    this.flybyVehicle.setEnabled(false);

    // Keep the stop visible as orientation even when boarding is inactive.
    stop.isPickable = false;
  }

  private buildBus(): void {
    const root = this.roots.bus;
    const ground = this.material("ch0-bus-floor-mat", new Color3(0.28, 0.29, 0.31));
    const wall = this.material("ch0-bus-wall-mat", new Color3(0.48, 0.5, 0.52));
    const npcMat = this.material("ch0-bus-npc-mat", new Color3(0.46, 0.39, 0.34));
    this.addBounds(root, 8, 18, ground);

    for (const x of [-2.4, 2.4]) {
      for (const z of [-3, 0, 3]) {
        this.box(
          `ch0-bus-seat-${x}-${z}`,
          root,
          { width: 1.3, height: 0.85, depth: 1.2 },
          new Vector3(x, 0.425, z),
          wall,
          true,
        );
      }
    }

    const staff = this.npc("ch0-bus-staff", root, new Vector3(0.8, 0, -1.5), npcMat);
    this.registerAction("resolve_fare", staff, 2.8);

    const uetExit = this.box(
      "ch0-bus-ride-uet-marker",
      root,
      { width: 1.4, height: 2.1, depth: 0.25 },
      new Vector3(0, 1.05, 6.8),
      wall,
    );
    this.registerAction("finish_ride_uet", uetExit, 3.5);

    const homeExit = this.box(
      "ch0-bus-ride-home-marker",
      root,
      { width: 1.4, height: 2.1, depth: 0.25 },
      new Vector3(0, 1.05, 6.8),
      wall,
    );
    this.registerAction("finish_ride_home", homeExit, 3.5);
  }

  private buildUet(): void {
    const root = this.roots.uet;
    const ground = this.material("ch0-uet-ground-mat", new Color3(0.32, 0.33, 0.34));
    const wall = this.material("ch0-uet-wall-mat", new Color3(0.62, 0.61, 0.57));
    const npcMat = this.material("ch0-uet-npc-mat", new Color3(0.43, 0.48, 0.41));
    const prop = this.material("ch0-uet-prop-mat", new Color3(0.37, 0.41, 0.46));
    this.addBounds(root, 30, 20, ground);

    this.box("ch0-uet-corridor-divider", root, { width: 10, height: 2.4, depth: 0.25 }, new Vector3(0, 1.2, 2.5), wall, true);

    const staff = this.npc("ch0-uet-guide-staff", root, new Vector3(-6, 0, -2), npcMat);
    this.registerAction("nav_staff", staff);

    const students = this.box(
      "ch0-uet-student-group",
      root,
      { width: 2.4, height: 1.65, depth: 0.8 },
      new Vector3(0, 0.825, -1.8),
      npcMat,
      true,
    );
    this.registerAction("nav_students", students, 3.2);

    const sign = this.box(
      "ch0-uet-wayfinding-placeholder",
      root,
      { width: 1.8, height: 1.3, depth: 0.15 },
      new Vector3(6, 1.5, -1.5),
      prop,
    );
    this.registerAction("nav_self", sign, 3.6);

    const wrongDoor = this.box(
      "ch0-uet-wrong-room-door",
      root,
      { width: 1.1, height: 2.2, depth: 0.18 },
      new Vector3(7, 1.1, 4.5),
      prop,
    );
    this.registerAction("open_wrong_room", wrongDoor, 2.6);

    const admin = this.box(
      "ch0-uet-admin-desk-placeholder",
      root,
      { width: 3.2, height: 1, depth: 1.1 },
      new Vector3(0, 0.5, 7),
      wall,
      true,
    );
    this.registerAction("complete_admin", admin, 2.8);

    const atm = this.box(
      "ch0-uet-atm-placeholder",
      root,
      { width: 1.1, height: 1.9, depth: 0.7 },
      new Vector3(-7, 0.95, 5.6),
      prop,
      true,
    );
    this.registerAction("prepare_return_fare", atm, 2.6);

    const returnBus = this.box(
      "ch0-uet-return-bus-door",
      root,
      { width: 1.3, height: 2.2, depth: 0.25 },
      new Vector3(8.5, 1.1, 7),
      prop,
    );
    this.registerAction("board_return", returnBus, 3.2);
  }
}
