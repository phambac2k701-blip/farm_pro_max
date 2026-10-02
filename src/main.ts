import { Scene } from "@babylonjs/core/scene";

import { AudioDirector } from "./audio/AudioDirector";
import { CameraDirector } from "./camera/CameraDirector";
import {
  CH01_HEADSET_PROXIMITY_CUE_PLAYED_FACT,
  CH01_NINTH_HEADSET_INSPECTED_FACT,
  ChapterOneClimaxController,
} from "./content/chapters/ch01/ChapterOneClimaxController";
import {
  CH01_OPENING_COMPLETE_FACT,
  ChapterOneOpeningController,
} from "./content/chapters/ch01/ChapterOneOpeningController";
import {
  CH01_CORRIDOR_BELL_FACT,
  ClassroomEvidenceController,
} from "./content/chapters/ch01/ClassroomEvidenceController";
import { DomChapterOneClimaxPhoneView } from "./content/chapters/ch01/DomChapterOneClimaxPhoneView";
import { DomChapterOnePhoneView } from "./content/chapters/ch01/DomChapterOnePhoneView";
import {
  CH01_AMBIENCE_IDS,
  CH01_AUDIO,
  CH01_AUDIO_IDS,
} from "./content/chapters/ch01/audio";
import { CH01_EVIDENCE } from "./content/chapters/ch01/evidence";
import {
  CH01_FLASHLIGHT_PICKED_FACT,
  CH01_INTERACTION_IDS,
} from "./content/chapters/ch01/interactions";
import {
  ChapterOneRealityController,
  createChapterOneRealitySystem,
} from "./content/chapters/ch01/reality";
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
  const subtitle = document.querySelector<HTMLDivElement>("#subtitle");
  const reticle = document.querySelector<HTMLDivElement>("#reticle");

  if (
    !canvas ||
    !fatalError ||
    !interactionPrompt ||
    !inspectionOverlay ||
    !phoneOverlay ||
    !evidenceNotification ||
    !subtitle ||
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

    let subtitleTimer: number | null = null;
    const audio = await AudioDirector.create(CH01_AUDIO, {
      baseUrl: new URL(import.meta.env.BASE_URL, window.location.origin).toString(),
      masterVolume: 0.9,
      onCaption(caption) {
        subtitle.textContent = caption;
        subtitle.hidden = false;
        if (subtitleTimer !== null) {
          window.clearTimeout(subtitleTimer);
        }
        subtitleTimer = window.setTimeout(() => {
          subtitle.hidden = true;
          subtitle.textContent = "";
          subtitleTimer = null;
        }, 3400);
      },
    });

    const reality = createChapterOneRealitySystem(
      gameState,
      chapter,
    );
    const chapterReality = new ChapterOneRealityController({
      state: gameState,
      evidence,
      chapterRuntime,
      reality,
      onApplied: () => {
        audio.play(
          CH01_AUDIO_IDS.kcrChannelClick,
          chapter.ninthPaStation,
        );
        canvas.dataset.kcrApplied = "true";
        persistSave();
      },
    });
    chapterReality.restore();

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
        onStableState: () => {
          audio.play(CH01_AUDIO_IDS.door, door.leaf);
        },
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
        audio.play(CH01_AUDIO_IDS.drawer, chapter.classroomDrawer);
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
        audio.play(CH01_AUDIO_IDS.paper, chapter.rosterProp);
        classroomEvidence?.markRosterReadable();
        chapterRuntime.reachCheckpoint("ch01_classroom_post_c03");
        chapterReality.syncReady();
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
        audio.play(CH01_AUDIO_IDS.paper, chapter.classPhotoProp);
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
        audio.play(CH01_AUDIO_IDS.paper, chapter.timetableProp);
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

    const paStationLabelsView = new InspectionOverlayView(
      inspectionOverlay,
      {
        eyebrow: "Phòng phát thanh",
        title: "Nhãn vị trí",
        body:
          "Tám vị trí đang dùng được đánh số từ 1 đến 8. Không có nhãn số 9.",
        footer: "Esc · rời mắt",
      },
    );
    const paStationLabelsInspection = new DocumentInspectionController({
      cameraDirector,
      anchor: () => ({
        position: chapter.paStationLabelsInspectionAnchor.position,
        rotation: chapter.paStationLabelsInspectionAnchor.rotation,
        fov: 0.72,
      }),
      view: paStationLabelsView,
      onReadable: () => {
        canvas.dataset.inspectionReadable = "pa-station-labels";
        evidence.discover("C04");
      },
    });
    interaction.register(chapter.paStationLabelsProp, {
      id: CH01_INTERACTION_IDS.paStationLabels,
      prompt: "E · Xem nhãn vị trí",
      maxDistance: 1.65,
      priority: 10,
    });
    behaviorHost.register(
      CH01_INTERACTION_IDS.paStationLabels,
      paStationLabelsInspection,
    );

    const paIndexCardView = new InspectionOverlayView(
      inspectionOverlay,
      {
        eyebrow: "Phòng phát thanh · thẻ chỉ mục",
        title: "09 / 00:17",
        body: "KHÔNG PHÁT — lưu nội bộ.",
        footer: "Esc · đặt thẻ xuống",
      },
    );
    const paIndexCardInspection = new DocumentInspectionController({
      cameraDirector,
      anchor: () => ({
        position: chapter.paIndexCardInspectionAnchor.position,
        rotation: chapter.paIndexCardInspectionAnchor.rotation,
        fov: 0.68,
      }),
      view: paIndexCardView,
      onReadable: () => {
        canvas.dataset.inspectionReadable = "pa-index-card";
        audio.play(CH01_AUDIO_IDS.paper, chapter.paIndexCardProp);
        evidence.discover("C07");
        chapterReality.syncReady();
        chapterReality.markInsideAfterReady();
        persistSave();
      },
    });
    interaction.register(chapter.paIndexCardProp, {
      id: CH01_INTERACTION_IDS.paIndexCard,
      prompt: "E · Xem thẻ 09 / 00:17",
      maxDistance: 1.7,
      priority: 12,
    });
    behaviorHost.register(
      CH01_INTERACTION_IDS.paIndexCard,
      paIndexCardInspection,
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

    const climax = new ChapterOneClimaxController({
      state: gameState,
      chapterRuntime,
      view: new DomChapterOneClimaxPhoneView(phoneOverlay),
      inputLock: player,
      playPhoneVibration: () => {
        audio.play(CH01_AUDIO_IDS.phoneVibration);
      },
      playRelayClick: () => {
        audio.play(CH01_AUDIO_IDS.relayClick, chapter.paSpeakerProp);
      },
      playKhangLine: () => {
        audio.play(CH01_AUDIO_IDS.khangClimax, chapter.paSpeakerProp);
      },
      onComplete: () => {
        canvas.dataset.climaxComplete = "true";
        persistSave();
      },
    });

    const ninthHeadsetView = new InspectionOverlayView(
      inspectionOverlay,
      {
        eyebrow: "Phòng phát thanh · vị trí thứ chín",
        title: "Tai nghe",
        body:
          "Tai nghe nằm trên ghế. Dây jack không nối vào bất kỳ ổ nào.",
        footer: "Esc · rời tai nghe",
      },
    );
    const ninthHeadsetInspection = new DocumentInspectionController({
      cameraDirector,
      anchor: () => ({
        position: chapter.ninthHeadsetInspectionAnchor.position,
        rotation: chapter.ninthHeadsetInspectionAnchor.rotation,
        fov: 0.64,
      }),
      view: ninthHeadsetView,
      onReadable: () => {
        canvas.dataset.inspectionReadable = "ninth-headset";
        gameState.setFact(CH01_NINTH_HEADSET_INSPECTED_FACT, true);
      },
      onClosed: () => {
        if (
          gameState.getFact<boolean>(
            CH01_NINTH_HEADSET_INSPECTED_FACT,
          ) === true
        ) {
          climax.start();
        }
      },
    });
    interaction.register(chapter.ninthHeadsetProp, {
      id: CH01_INTERACTION_IDS.ninthHeadset,
      prompt: "E · Xem tai nghe thứ chín",
      maxDistance: 1.45,
      priority: 14,
    });
    behaviorHost.register(
      CH01_INTERACTION_IDS.ninthHeadset,
      ninthHeadsetInspection,
    );

    let audioStarted = false;
    const startAudio = async (): Promise<void> => {
      if (audioStarted) {
        return;
      }
      const shouldVibrate = opening.isActive;
      const unlocked = await audio.unlock();
      if (!unlocked) {
        return;
      }

      audioStarted = true;
      audio.startAmbience(CH01_AMBIENCE_IDS);
      audio.play(CH01_AUDIO_IDS.paHum, chapter.paStations[0]);
      if (shouldVibrate) {
        audio.play(CH01_AUDIO_IDS.phoneVibration);
      }
      canvas.dataset.audioUnlocked = "true";
      window.removeEventListener("pointerdown", onAudioGesture, true);
      window.removeEventListener("keydown", onAudioGesture, true);
    };
    const onAudioGesture = (): void => {
      void startAudio();
    };
    window.addEventListener("pointerdown", onAudioGesture, true);
    window.addEventListener("keydown", onAudioGesture, true);

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

      if (climax.handleKey(event.code)) {
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
    climax.resume();

    chapter.drawerLabel09.setEnabled(evidence.has("C03"));
    if (evidence.has("C03")) {
      chapterRuntime.reachCheckpoint("ch01_classroom_post_c03");
    }

    canvas.dataset.renderBackend = engineAdapter.backend;
    canvas.dataset.audioReady = String(audio.isReady);
    canvas.dataset.audioFailedCues = String(audio.failedCueIds.length);
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
    canvas.dataset.kcrReady = String(chapterReality.isKnowledgeReady);
    canvas.dataset.kcrLeftAfterReady = String(
      chapterReality.hasLeftAfterReady,
    );
    canvas.dataset.kcrApplied = String(chapterReality.isApplied);

    if (import.meta.env.DEV) {
      const debugWindow = window as typeof window & {
        __NTC_DEBUG__?: {
          player: PlayerController;
          audio: AudioDirector;
          chapter: typeof chapter;
          interaction: InteractionSystem;
          behaviorHost: InteractionBehaviorHost;
          cameraDirector: CameraDirector;
          gameState: GameState;
          evidence: EvidenceSystem;
          reality: typeof reality;
          chapterReality: ChapterOneRealityController;
          chapterRuntime: ChapterRuntime<(typeof CH01_CHECKPOINTS)[number]>;
          opening: ChapterOneOpeningController;
          climax: ChapterOneClimaxController;
          classroomEvidence: ClassroomEvidenceController;
          sideDoor: OpenableController;
          classroomDoor: OpenableController;
          paDoor: OpenableController;
          drawer: OpenableController;
          rosterInspection: DocumentInspectionController;
          photoInspection: PhotoInspectionController;
          timetableInspection: DocumentInspectionController;
          paStationLabelsInspection: DocumentInspectionController;
          paIndexCardInspection: DocumentInspectionController;
          ninthHeadsetInspection: DocumentInspectionController;
        };
      };
      debugWindow.__NTC_DEBUG__ = {
        player,
        audio,
        chapter,
        interaction,
        behaviorHost,
        cameraDirector,
        gameState,
        evidence,
        reality,
        chapterReality,
        chapterRuntime,
        opening,
        climax,
        classroomEvidence,
        sideDoor,
        classroomDoor,
        paDoor,
        drawer,
        rosterInspection,
        photoInspection,
        timetableInspection,
        paStationLabelsInspection,
        paIndexCardInspection,
        ninthHeadsetInspection,
      };
    }

    let footstepElapsed = 0;

    engineAdapter.run(() => {
      const deltaSeconds = engineAdapter.engine.getDeltaTime() / 1000;

      player.update(deltaSeconds);
      cameraDirector.update(deltaSeconds);
      behaviorHost.update(deltaSeconds);
      opening.update(deltaSeconds);
      climax.update(deltaSeconds);
      interaction.update();

      const movement = player.input.getMovementAxes();
      const moving =
        player.isLocomotionEnabled &&
        cameraDirector.state === "gameplay" &&
        (Math.abs(movement.x) > 0.05 || Math.abs(movement.z) > 0.05);
      if (moving && audioStarted) {
        footstepElapsed -= deltaSeconds;
        if (footstepElapsed <= 0) {
          audio.play(CH01_AUDIO_IDS.footstep);
          footstepElapsed = 0.56;
        }
      } else {
        footstepElapsed = 0;
      }

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
        audio.play(CH01_AUDIO_IDS.corridorBell, chapter.corridorPhotoBoard);
        canvas.dataset.corridorBell = "triggered";
      }

      if (
        chapterReality.isKnowledgeReady &&
        !chapterReality.isApplied
      ) {
        if (
          !chapterReality.hasEnteredAfterReady &&
          nearXZ(
            chapter.paReentryZone.position.x,
            chapter.paReentryZone.position.z,
            0.72,
          ) &&
          chapterReality.markInsideAfterReady()
        ) {
          persistSave();
        }

        if (
          chapterReality.hasEnteredAfterReady &&
          !chapterReality.hasLeftAfterReady &&
          nearXZ(
            chapter.paThresholdZone.position.x,
            chapter.paThresholdZone.position.z,
            0.82,
          ) &&
          chapterReality.markLeftAfterReady()
        ) {
          persistSave();
        }

        if (
          chapterReality.hasLeftAfterReady &&
          nearXZ(
            chapter.paReentryZone.position.x,
            chapter.paReentryZone.position.z,
            0.72,
          ) &&
          chapterReality.tryApplyOnReentry()
        ) {
          persistSave();
        }
      }

      if (
        chapterReality.isApplied &&
        audioStarted &&
        gameState.getFact<boolean>(
          CH01_HEADSET_PROXIMITY_CUE_PLAYED_FACT,
        ) !== true
      ) {
        const headsetPosition =
          chapter.ninthHeadsetProp.getAbsolutePosition();
        if (
          nearXZ(headsetPosition.x, headsetPosition.z, 1.0) &&
          audio.play(
            CH01_AUDIO_IDS.headsetBreathingChair,
            chapter.ninthHeadsetProp,
          )
        ) {
          gameState.setFact(
            CH01_HEADSET_PROXIMITY_CUE_PLAYED_FACT,
            true,
          );
        }
      }

      const prompt = interaction.promptState;
      interactionPrompt.hidden = !prompt.visible;
      interactionPrompt.textContent = prompt.text;
      reticle.hidden =
        opening.isActive ||
        (climax.isActive && climax.currentStep === 1) ||
        interaction.activeInteraction !== null ||
        cameraDirector.state !== "gameplay";

      canvas.dataset.interactionTarget = prompt.interactableId ?? "";
      canvas.dataset.interactionActive =
        interaction.activeInteraction?.id ?? "";
      canvas.dataset.cameraState = cameraDirector.state;
      canvas.dataset.drawerState = drawer.state;
      canvas.dataset.chapterCheckpoint = chapterRuntime.currentCheckpoint;
      canvas.dataset.evidenceCount = String(evidence.listDiscovered().length);
      canvas.dataset.audioReady = String(audio.isReady);
      canvas.dataset.audioFailedCues = String(audio.failedCueIds.length);
      canvas.dataset.openingActive = String(opening.isActive);
      canvas.dataset.kcrReady = String(chapterReality.isKnowledgeReady);
      canvas.dataset.kcrEnteredAfterReady = String(
        chapterReality.hasEnteredAfterReady,
      );
      canvas.dataset.kcrLeftAfterReady = String(
        chapterReality.hasLeftAfterReady,
      );
      canvas.dataset.kcrApplied = String(chapterReality.isApplied);
      canvas.dataset.climaxStep = String(climax.currentStep);
      canvas.dataset.climaxComplete = String(climax.isComplete);
      canvas.dataset.headsetCuePlayed = String(
        gameState.getFact<boolean>(
          CH01_HEADSET_PROXIMITY_CUE_PLAYED_FACT,
        ) === true,
      );
      canvas.dataset.ninthPaStationEnabled = String(
        chapter.ninthPaStation.isEnabled(),
      );
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
        if (subtitleTimer !== null) {
          window.clearTimeout(subtitleTimer);
        }
        window.removeEventListener("pointerdown", onAudioGesture, true);
        window.removeEventListener("keydown", onAudioGesture, true);
        window.removeEventListener("keydown", onChapterKeyDown, true);
        audio.dispose();
        climax.dispose();
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
