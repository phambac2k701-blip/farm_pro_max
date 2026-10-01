import { Scene } from "@babylonjs/core/scene";

import { CameraDirector } from "./camera/CameraDirector";
import {
  CH01_OPENING_COMPLETE_FACT,
  ChapterOneOpeningController,
} from "./content/chapters/ch01/ChapterOneOpeningController";
import {
  CH01_CORRIDOR_BELL_FACT,
  ClassroomEvidenceController,
} from "./content/chapters/ch01/ClassroomEvidenceController";
import { DomChapterOnePhoneView } from "./content/chapters/ch01/DomChapterOnePhoneView";
import { CH01_EVIDENCE } from "./content/chapters/ch01/evidence";
import {
  CH01_FLASHLIGHT_PICKED_FACT,
  CH01_INTERACTION_IDS,
} from "./content/chapters/ch01/interactions";
import { buildChapterOneScene } from "./content/chapters/ch01/scene/buildChapterOneScene";
import {
  CH01_CHECKPOINTS,
  CH01_COMPLETE_CHECKPOINT,
  CH01_COMPLETE_FACT,
  CH01_INITIAL_CHECKPOINT,
  isChapterOneCheckpointId,
} from "./content/chapters/ch01/state";
import { EngineAdapter } from "./engine/EngineAdapter";
import { EvidenceSystem } from "./evidence/EvidenceSystem";
import { ChapterRuntime } from "./game/chapter/ChapterRuntime";
import { SaveService } from "./game/save/SaveService";
import { GameState } from "./game/state/GameState";
import { InteractionBehaviorHost } from "./interaction/behaviors/InteractionBehaviorHost";
import {
  createHingedOpenableAdapter,
  createSlidingOpenableAdapter,
  OpenableController,
} from "./interaction/behaviors/OpenableController";
import { PickupController } from "./interaction/behaviors/PickupController";
import { InteractionStateMachine } from "./interaction/InteractionStateMachine";
import { InteractionSystem } from "./interaction/InteractionSystem";
import { DocumentInspectionController } from "./interaction/inspection/DocumentInspectionController";
import { InspectionOverlayView } from "./interaction/inspection/InspectionOverlayView";
import { PhotoInspectionController } from "./interaction/inspection/PhotoInspectionController";
import { PlayerController } from "./player/PlayerController";
import "./style.css";

async function bootstrap(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  const fatalError = document.querySelector<HTMLDivElement>("#fatal-error");
  const interactionPrompt =
    document.querySelector<HTMLDivElement>("#interaction-prompt");
  const inspectionOverlay =
    document.querySelector<HTMLElement>("#inspection-overlay");
  const phoneOverlay =
    document.querySelector<HTMLElement>("#phone-overlay");
  const evidenceNotification =
    document.querySelector<HTMLDivElement>("#evidence-notification");
  const reticle = document.querySelector<HTMLDivElement>("#reticle");

  if (
    !canvas ||
    !fatalError ||
    !interactionPrompt ||
    !inspectionOverlay ||
    !phoneOverlay ||
    !evidenceNotification ||
    !reticle
  ) {
    throw new Error("Required application DOM nodes are missing.");
  }

  try {
    const saveService = new SaveService(window.localStorage);
    const loadedSave = saveService.load();
    const settings = {
      mouseSensitivity:
        loadedSave?.settings.mouseSensitivity ?? 0.0022,
    };
    const gameState = new GameState(loadedSave?.gameState);
    const evidence = new EvidenceSystem(gameState, CH01_EVIDENCE);
    const restoredCheckpoint =
      loadedSave &&
      isChapterOneCheckpointId(loadedSave.checkpoint.checkpointId)
        ? loadedSave.checkpoint.checkpointId
        : CH01_INITIAL_CHECKPOINT;
    const chapterRuntime = new ChapterRuntime({
      state: gameState,
      checkpoints: CH01_CHECKPOINTS,
      initialCheckpoint: CH01_INITIAL_CHECKPOINT,
      completeCheckpoint: CH01_COMPLETE_CHECKPOINT,
      completeFactId: CH01_COMPLETE_FACT,
      nextChapterId: "ch02",
      restoredCheckpoint,
    });

    const persistSave = (): void => {
      const saved = saveService.save(
        gameState.snapshot(),
        chapterRuntime.snapshot(),
        settings,
      );
      canvas.dataset.saveStatus = saved ? "saved" : "failed";
      canvas.dataset.chapterCheckpoint = chapterRuntime.currentCheckpoint;
    };
    const unsubscribeAutosave = [
      gameState.events.on("fact-changed", persistSave),
      gameState.events.on("evidence-discovered", persistSave),
      gameState.events.on("chapter-changed", persistSave),
    ];

    let evidenceTimer: number | null = null;
    const unsubscribeEvidenceNotice = gameState.events.on(
      "evidence-discovered",
      ({ evidenceId }) => {
        const definition = evidence.get(evidenceId);
        if (!definition) {
          return;
        }
        evidenceNotification.textContent =
          `Đã ghi nhận · ${definition.title}\n${definition.summary}`;
        evidenceNotification.hidden = false;
        evidenceNotification.classList.add("visible");
        if (evidenceTimer !== null) {
          window.clearTimeout(evidenceTimer);
        }
        evidenceTimer = window.setTimeout(() => {
          evidenceNotification.classList.remove("visible");
          evidenceNotification.hidden = true;
          evidenceTimer = null;
        }, 3200);
      },
    );

    const engineAdapter = await EngineAdapter.create(canvas);
    const scene = new Scene(engineAdapter.engine);
    const chapter = buildChapterOneScene(scene);
    const spawn =
      chapter.checkpoints[chapterRuntime.currentCheckpoint]?.position.clone() ??
      chapter.spawn.clone();
    const player = PlayerController.create(scene, canvas, {
      spawn,
      mouseSensitivity: settings.mouseSensitivity,
    });
    const interactionState = new InteractionStateMachine(player);
    const interaction = new InteractionSystem(
      scene,
      player.camera,
      interactionState,
    );
    const cameraDirector = new CameraDirector(player.camera, player);
    const behaviorHost = new InteractionBehaviorHost(interaction);
    let classroomEvidence: ClassroomEvidenceController | null = null;

    const registerDoor = (
      id: string,
      prompt: string,
      door: typeof chapter.sideEntranceDoor,
    ): OpenableController => {
      const controller = new OpenableController({
        adapter: createHingedOpenableAdapter(
          door.hinge,
          door.closedRotationY,
          door.openRotationY,
        ),
        duration: 0.42,
        initiallyOpen: true,
      });
      interaction.register(door.leaf, {
        id,
        prompt,
        maxDistance: 2.1,
        priority: 8,
      });
      behaviorHost.register(id, controller);
      return controller;
    };

    const sideDoor = registerDoor(
      CH01_INTERACTION_IDS.sideEntranceDoor,
      "E · Cửa hông",
      chapter.sideEntranceDoor,
    );
    const classroomDoor = registerDoor(
      CH01_INTERACTION_IDS.classroomDoor,
      "E · Cửa phòng học",
      chapter.classroomDoor,
    );
    const paDoor = registerDoor(
      CH01_INTERACTION_IDS.paRoomDoor,
      "E · Cửa phòng phát thanh",
      chapter.paRoomDoor,
    );

    const drawerClosed = chapter.classroomDrawer.position.clone();
    const drawerOpen = drawerClosed.add(
      chapter.classroomDrawer.forward.scale(-0.34),
    );
    const drawer = new OpenableController({
      adapter: createSlidingOpenableAdapter(
        chapter.classroomDrawer,
        drawerClosed,
        drawerOpen,
      ),
      duration: 0.32,
      onStableState(open) {
        if (!open || !classroomEvidence || !evidence.has("C03")) {
          return;
        }
        chapter.drawerLabel09.setEnabled(true);
        evidence.discover("C05");
      },
    });
    interaction.register(chapter.classroomDrawer, {
      id: CH01_INTERACTION_IDS.classroomDrawer,
      prompt: "E · Mở ngăn kéo",
      maxDistance: 1.7,
      priority: 9,
    });
    behaviorHost.register(CH01_INTERACTION_IDS.classroomDrawer, drawer);

    const rosterView = new InspectionOverlayView(inspectionOverlay, {
      eyebrow: "Tài liệu · phòng học cũ",
      title: "Danh sách lớp · 2012",
      body:
        "Danh sách có tám dòng tên.\nMép giấy đã ố, phần cuối không có dòng thứ chín.",
      footer: "C · so sánh sau khi đã xem ảnh lớp   ·   Esc · đặt tài liệu xuống",
    });
    const rosterInspection = new DocumentInspectionController({
      cameraDirector,
      anchor: () => ({
        position: chapter.rosterInspectionAnchor.position,
        rotation: chapter.rosterInspectionAnchor.rotation,
        fov: 0.7,
      }),
      view: rosterView,
      onReadable: () => {
        canvas.dataset.inspectionReadable = "roster";
        classroomEvidence?.markRosterReadable();
        chapterRuntime.reachCheckpoint("ch01_classroom_post_c03");
        persistSave();
      },
    });
    interaction.register(chapter.rosterProp, {
      id: CH01_INTERACTION_IDS.roster,
      prompt: "E · Xem danh sách",
      maxDistance: 1.65,
      priority: 12,
    });
    behaviorHost.register(CH01_INTERACTION_IDS.roster, rosterInspection);

    const photoView = new InspectionOverlayView(inspectionOverlay, {
      eyebrow: "Ảnh lớp",
      title: "Ảnh tập thể cũ",
      body:
        "Khung hình bị cắt sát ở mép phải.\nMột khoảng vai áo còn sót lại ngoài hàng người.",
      footer: "C · so sánh sau khi đã xem danh sách   ·   Esc · hạ ảnh xuống",
    });
    const photoInspection = new PhotoInspectionController({
      cameraDirector,
      anchor: () => ({
        position: chapter.photoInspectionAnchor.position,
        rotation: chapter.photoInspectionAnchor.rotation,
        fov: 0.68,
      }),
      view: photoView,
      onReadable: () => {
        canvas.dataset.inspectionReadable = "class-photo";
        classroomEvidence?.markPhotoReadable();
      },
    });
    interaction.register(chapter.classPhotoProp, {
      id: CH01_INTERACTION_IDS.classPhoto,
      prompt: "E · Xem ảnh lớp",
      maxDistance: 1.8,
      priority: 11,
    });
    behaviorHost.register(
      CH01_INTERACTION_IDS.classPhoto,
      photoInspection,
    );

    const timetableView = new InspectionOverlayView(inspectionOverlay, {
      eyebrow: "Hành lang · 2012",
      title: "Thời khóa biểu cũ",
      body:
        "Ở mép cuối bảng vẫn còn một dòng viết tay: 00:17 · kiểm tra thiết bị ban đêm.",
      footer: "Esc · rời mắt",
    });
    const timetableInspection = new DocumentInspectionController({
      cameraDirector,
      anchor: () => ({
        position: chapter.timetableInspectionAnchor.position,
        rotation: chapter.timetableInspectionAnchor.rotation,
        fov: 0.72,
      }),
      view: timetableView,
      onReadable: () => {
        canvas.dataset.inspectionReadable = "timetable";
        evidence.discover("C14");
      },
    });
    interaction.register(chapter.timetableProp, {
      id: CH01_INTERACTION_IDS.timetable,
      prompt: "E · Xem thời khóa biểu",
      maxDistance: 1.8,
      priority: 9,
    });
    behaviorHost.register(
      CH01_INTERACTION_IDS.timetable,
      timetableInspection,
    );

    classroomEvidence = new ClassroomEvidenceController({
      state: gameState,
      evidence,
      isRosterReading: () => rosterInspection.state === "reading",
      isPhotoReading: () => photoInspection.state === "reading",
      onCompared: () => {
        canvas.dataset.lastComparison = "C02";
      },
    });

    const opening = new ChapterOneOpeningController({
      state: gameState,
      evidence,
      view: new DomChapterOnePhoneView(phoneOverlay),
      inputLock: player,
    });

    const flashlightPickup = new PickupController({
      mesh: chapter.flashlight,
      alreadyPicked: () =>
        gameState.getFact<boolean>(CH01_FLASHLIGHT_PICKED_FACT) === true,
      onPickup: () => {
        gameState.setFact(CH01_FLASHLIGHT_PICKED_FACT, true);
        canvas.dataset.lastPickup = "flashlight";
      },
    });
    flashlightPickup.restorePicked(
      gameState.getFact<boolean>(CH01_FLASHLIGHT_PICKED_FACT) === true,
    );
    interaction.register(chapter.flashlight, {
      id: CH01_INTERACTION_IDS.flashlight,
      prompt: "E · Nhặt đèn pin",
      maxDistance: 1.6,
      priority: 10,
    });
    behaviorHost.register(
      CH01_INTERACTION_IDS.flashlight,
      flashlightPickup,
    );

    const onChapterKeyDown = (event: KeyboardEvent): void => {
      if (opening.handleKey(event.code)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      if (classroomEvidence?.handleKey(event.code)) {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", onChapterKeyDown, true);
    interaction.attachInput(canvas);
    opening.start();

    chapter.drawerLabel09.setEnabled(evidence.has("C03"));
    if (evidence.has("C03")) {
      chapterRuntime.reachCheckpoint("ch01_classroom_post_c03");
    }

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.controllerReady = "true";
    canvas.dataset.sceneReady = "ch01-production-shell";
    canvas.dataset.behaviorHostReady = "true";
    canvas.dataset.saveLoaded = loadedSave ? "true" : "false";
    canvas.dataset.chapterCheckpoint = chapterRuntime.currentCheckpoint;
    canvas.dataset.evidenceCount = String(evidence.listDiscovered().length);
    canvas.dataset.openingComplete = String(
      gameState.getFact<boolean>(CH01_OPENING_COMPLETE_FACT) === true,
    );
    canvas.dataset.paStationCount = String(chapter.paStations.length);
    canvas.dataset.ninthPaStationEnabled = String(
      chapter.ninthPaStation.isEnabled(),
    );

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: {
          player: PlayerController;
          chapter: typeof chapter;
          interaction: InteractionSystem;
          behaviorHost: InteractionBehaviorHost;
          cameraDirector: CameraDirector;
          gameState: GameState;
          evidence: EvidenceSystem;
          chapterRuntime: ChapterRuntime<(typeof CH01_CHECKPOINTS)[number]>;
          opening: ChapterOneOpeningController;
          classroomEvidence: ClassroomEvidenceController;
          sideDoor: OpenableController;
          classroomDoor: OpenableController;
          paDoor: OpenableController;
          drawer: OpenableController;
          rosterInspection: DocumentInspectionController;
          photoInspection: PhotoInspectionController;
          timetableInspection: DocumentInspectionController;
        };
      };
      debugWindow.__NTC_DEBUG__ = {
        player,
        chapter,
        interaction,
        behaviorHost,
        cameraDirector,
        gameState,
        evidence,
        chapterRuntime,
        opening,
        classroomEvidence,
        sideDoor,
        classroomDoor,
        paDoor,
        drawer,
        rosterInspection,
        photoInspection,
        timetableInspection,
      };
    }

    engineAdapter.run(() => {
      const deltaSeconds = engineAdapter.engine.getDeltaTime() / 1000;

      player.update(deltaSeconds);
      cameraDirector.update(deltaSeconds);
      behaviorHost.update(deltaSeconds);
      opening.update(deltaSeconds);
      interaction.update();

      const feet = player.getFeetPosition();
      const nearXZ = (x: number, z: number, radius: number): boolean => {
        const dx = feet.x - x;
        const dz = feet.z - z;
        return dx * dx + dz * dz <= radius * radius;
      };

      if (
        chapterRuntime.currentCheckpoint === "ch01_gate" &&
        nearXZ(
          chapter.insideOldWingZone.position.x,
          chapter.insideOldWingZone.position.z,
          1.35,
        ) &&
        chapterRuntime.reachCheckpoint("ch01_inside_old_wing")
      ) {
        persistSave();
      }

      if (
        !chapterRuntime.hasReached("ch01_classroom_pre_roster") &&
        nearXZ(
          chapter.classroomEntryZone.position.x,
          chapter.classroomEntryZone.position.z,
          1.4,
        ) &&
        chapterRuntime.reachCheckpoint("ch01_classroom_pre_roster")
      ) {
        persistSave();
      }

      if (
        evidence.has("C03") &&
        !chapterRuntime.hasReached("ch01_pa_pre_c07") &&
        nearXZ(
          chapter.paThresholdZone.position.x,
          chapter.paThresholdZone.position.z,
          1.4,
        ) &&
        chapterRuntime.reachCheckpoint("ch01_pa_pre_c07")
      ) {
        persistSave();
      }

      if (
        evidence.has("C03") &&
        gameState.getFact<boolean>(CH01_CORRIDOR_BELL_FACT) !== true &&
        nearXZ(
          chapter.corridorReturnZone.position.x,
          chapter.corridorReturnZone.position.z,
          1.4,
        )
      ) {
        gameState.setFact(CH01_CORRIDOR_BELL_FACT, true);
        canvas.dataset.corridorBell = "triggered";
      }

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;
      reticle.hidden =
        opening.isActive ||
        interaction.activeInteraction !== null ||
        cameraDirector.state !== "gameplay";

      canvas.dataset.interactionTarget = prompt.interactableId ?? "";
      canvas.dataset.interactionActive =
        interaction.activeInteraction?.id ?? "";
      canvas.dataset.cameraState = cameraDirector.state;
      canvas.dataset.drawerState = drawer.state;
      canvas.dataset.chapterCheckpoint = chapterRuntime.currentCheckpoint;
      canvas.dataset.evidenceCount = String(evidence.listDiscovered().length);
      canvas.dataset.openingActive = String(opening.isActive);
      canvas.dataset.drawerLabel09Enabled = String(
        chapter.drawerLabel09.isEnabled(),
      );

      if (import.meta.env.DEV) {
        canvas.dataset.playerFeet =
          `${feet.x.toFixed(3)},${feet.y.toFixed(3)},${feet.z.toFixed(3)}`;
      }

      scene.render();
    });

    window.addEventListener(
      "beforeunload",
      () => {
        for (const unsubscribe of unsubscribeAutosave) {
          unsubscribe();
        }
        unsubscribeEvidenceNotice();
        if (evidenceTimer !== null) {
          window.clearTimeout(evidenceTimer);
        }
        window.removeEventListener("keydown", onChapterKeyDown, true);
        opening.dispose();
        behaviorHost.dispose();
        interaction.dispose();
        player.dispose();
        scene.dispose();
        engineAdapter.dispose();
      },
      { once: true },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown engine startup error.";
    fatalError.hidden = false;
    fatalError.textContent = `Không thể khởi động đồ họa 3D: ${message}`;
    throw error;
  }
}

void bootstrap();
