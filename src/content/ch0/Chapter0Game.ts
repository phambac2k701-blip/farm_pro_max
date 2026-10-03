import type {
  InteractionBehavior,
  InteractionBehaviorActions,
} from "../../interaction/behaviors/InteractionBehaviorHost";
import type { PlayerController } from "../../player/PlayerController";
import {
  Chapter0Runtime,
  type Chapter0NavChoice,
  type Chapter0SceneId,
} from "./Chapter0Runtime";
import { Chapter0Ui, type DialogueSequence } from "./Chapter0Ui";
import {
  Chapter0World,
  type Chapter0ActionId,
  type Chapter0ZoneId,
} from "./Chapter0World";
import { SceneTransitionDirector } from "./SceneTransitionDirector";

export type Chapter0GameplayActionId =
  | Chapter0ActionId
  | "miss_outbound";

export type Chapter0AutoplayRoute =
  | "default"
  | "self-nav"
  | "missed-bus";

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
export class Chapter0ActionBehavior implements InteractionBehavior {
  private active = false;

  constructor(
    private readonly game: Chapter0Game,
    private readonly actionId: Chapter0ActionId,
  ) {}

  enter(actions: InteractionBehaviorActions): boolean {
    if (this.active) return false;
    this.active = true;
    void this.game.performAction(this.actionId).finally(() => {
      this.active = false;
      actions.complete();
    });
    return true;
  }

  update(): void {}

  requestCancel(): boolean {
    // Pointer-lock exits while dialogue buttons are focused. Keep ownership
    // until the authored action finishes instead of cancelling mid-dialogue.
    return this.active;
  }
}

export class Chapter0Game {
  readonly runtime = new Chapter0Runtime();
  private actionBusy = false;
  private autoplay = false;
  private boardingElapsed = 0;
  private disposed = false;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly player: PlayerController,
    readonly world: Chapter0World,
    private readonly ui: Chapter0Ui,
    private readonly transition: SceneTransitionDirector,
  ) {}

  setAutoplay(enabled: boolean): void {
    this.autoplay = enabled;
    this.ui.setAutoplay(enabled);
  }

  async start(): Promise<void> {
    this.player.setLocomotionEnabled(false);
    this.player.setLookEnabled(false);
    this.syncPresentation();

    await this.ui.play({
      lines: [
        { speaker: "MẸ", text: "Đến nơi chưa con?" },
        { speaker: "BẮC", text: "Con đến rồi." },
        { speaker: "MẸ", text: "Thế giờ sang trường luôn à?" },
        { speaker: "BẮC", text: "Vâng. Con đang ngoài đường đây. Lát con đi." },
        { speaker: "MẸ", text: "Có gì không biết thì hỏi người ta. Đừng tự mò xong lại đi vòng." },
        { speaker: "BẮC", text: "Con biết rồi." },
        { speaker: "MẸ", text: "Biết thật không đấy?" },
        { speaker: "BẮC", text: "Chưa biết thì lát biết." },
        { speaker: "MẸ", text: "Ừ. Nhớ ăn uống." },
        { speaker: "BẮC", text: "Vâng. Con đi đã nhé." },
      ],
    });
    if (this.disposed) return;
    this.runtime.finishMotherCall();
    this.player.setLookEnabled(true);
    this.player.setLocomotionEnabled(true);
    this.syncPresentation();
  }

  update(deltaSeconds: number): void {
    if (this.disposed) return;

    this.world.update(deltaSeconds);
    this.syncDatasets();

    const snapshot = this.runtime.snapshot();
    if (
      !this.autoplay &&
      !this.actionBusy &&
      snapshot.sceneId === "CH0-S03" &&
      !snapshot.missedFirstValidBus
    ) {
      this.boardingElapsed += Math.max(0, deltaSeconds);
      if (this.boardingElapsed >= 7) {
        this.boardingElapsed = 0;
        void this.performAction("miss_outbound");
      }
    } else if (snapshot.sceneId !== "CH0-S03") {
      this.boardingElapsed = 0;
    }
  }

  async performAction(actionId: Chapter0GameplayActionId): Promise<boolean> {
    if (this.actionBusy || this.disposed) return false;
    this.actionBusy = true;
    try {
      return await this.performActionInternal(actionId);
    } finally {
      this.actionBusy = false;
      this.syncDatasets();
    }
  }

  async runAutoplay(route: Chapter0AutoplayRoute): Promise<void> {
    this.setAutoplay(true);
    this.canvas.dataset.autoplayRoute = route;
    this.canvas.dataset.autoplayStatus = "running";

    const run = async (action: Chapter0GameplayActionId): Promise<void> => {
      const ok = await this.performAction(action);
      if (!ok) {
        throw new Error(
          `Chapter 0 autoplay action failed: ${action} at ${this.runtime.sceneId}`,
        );
      }
      await sleep(35);
    };

    try {
      await run("hail_bus");
      await run("hail_bus");
      await run("talk_driver");
      await run("observe_red_light");
      if (route === "missed-bus") {
        await run("miss_outbound");
      }
      await run("board_outbound");
      await run("resolve_fare");
      await run("finish_ride_uet");

      if (route === "self-nav") {
        await run("nav_self");
        await run("open_wrong_room");
      } else if (route === "missed-bus") {
        await run("nav_students");
      } else {
        await run("nav_staff");
      }

      await run("complete_admin");
      await run("prepare_return_fare");
      await run("board_return");
      await run("finish_ride_home");

      if (!this.runtime.snapshot().complete) {
        throw new Error("Chapter 0 autoplay reached the end without completion.");
      }
      this.canvas.dataset.autoplayStatus = "passed";
    } catch (error) {
      this.canvas.dataset.autoplayStatus = "failed";
      throw error;
    }
  }

  dispose(): void {
    this.disposed = true;
    this.ui.dispose();
    this.transition.dispose();
    this.world.dispose();
  }

  private async performActionInternal(
    actionId: Chapter0GameplayActionId,
  ): Promise<boolean> {
    switch (actionId) {
      case "hail_bus":
        return this.hailBus();
      case "talk_driver":
        return this.talkDriver();
      case "observe_red_light":
        return this.redLightBeat();
      case "miss_outbound":
        return this.missOutboundBus();
      case "board_outbound":
        return this.boardOutboundBus();
      case "resolve_fare":
        return this.resolveFare();
      case "finish_ride_uet":
        return this.finishRideToUet();
      case "nav_staff":
        return this.navigationBranch("ask_staff");
      case "nav_students":
        return this.navigationBranch("follow_students");
      case "nav_self":
        return this.navigationBranch("self_navigate");
      case "open_wrong_room":
        return this.finishSelfNavigation();
      case "complete_admin":
        return this.completeAdmin();
      case "prepare_return_fare":
        return this.prepareReturnFare();
      case "board_return":
        return this.boardReturnBus();
      case "finish_ride_home":
        return this.finishRideHome();
    }
  }

  private async hailBus(): Promise<boolean> {
    if (this.runtime.sceneId !== "CH0-S02") return false;
    const attempt = this.runtime.recordWrongBusAttempt();
    await this.dialogue({
      lines:
        attempt === 1
          ? [
              { text: "Chiếc xe buýt chạy thẳng qua. Không hề có tiếng phanh." },
              { speaker: "BẮC", text: "Ơ?" },
            ]
          : [
              { text: "Bắc vẫy rõ hơn. Xe vẫn chạy qua." },
              { speaker: "BẮC", text: "Không phải xe à..." },
            ],
    });
    this.syncPresentation();
    return true;
  }

  private async talkDriver(): Promise<boolean> {
    if (this.runtime.sceneId !== "CH0-S02A") return false;

    const choice = await this.dialogue<"new" | "why" | "assumed">({
      lines: [
        { speaker: "TÀI XẾ", text: "Em đi đâu đấy? Lên anh chở." },
        { speaker: "BẮC", text: "Em đi xe buýt." },
        { speaker: "TÀI XẾ", text: "Xe buýt?" },
        { speaker: "TÀI XẾ", text: "Thế em đứng đây làm gì?" },
        { speaker: "BẮC", text: "Bắt xe." },
        { speaker: "TÀI XẾ", text: "Mới lên Hà Nội à?" },
      ],
      options: [
        { id: "new", label: "Vâng. Em mới lên." },
        { id: "why", label: "Sao anh biết?" },
        { id: "assumed", label: "Em tưởng đứng đâu vẫy nó cũng dừng." },
      ],
      autoplayChoice: "new",
    });

    const reactions: Record<"new" | "why" | "assumed", DialogueSequence> = {
      new: {
        lines: [
          { speaker: "TÀI XẾ", text: "Anh đoán thế. Xe buýt phải ra điểm dừng." },
          { speaker: "TÀI XẾ", text: "Thấy cái biển kia không? Ra đấy." },
          { speaker: "BẮC", text: "À. Bảo sao." },
        ],
      },
      why: {
        lines: [
          { speaker: "TÀI XẾ", text: "Vì người quen đường không đứng đây vẫy xe buýt." },
          { speaker: "BẮC", text: "Hợp lý." },
          { speaker: "TÀI XẾ", text: "Ra cái biển kia. Xe vào điểm dừng thì hẵng lên." },
        ],
      },
      assumed: {
        lines: [
          { speaker: "TÀI XẾ", text: "Không. Xe buýt phải vào điểm dừng." },
          { speaker: "TÀI XẾ", text: "Cái biển kia kìa." },
          { speaker: "BẮC", text: "À. Bảo sao." },
        ],
      },
    };
    await this.dialogue(reactions[choice ?? "new"]);
    await this.dialogue({
      lines: [
        { speaker: "BẮC", text: "Vâng, em cảm ơn anh." },
        { speaker: "TÀI XẾ", text: "Ừ." },
      ],
    });

    this.runtime.finishDriverEncounter();
    this.syncPresentation();
    return true;
  }

  private async redLightBeat(): Promise<boolean> {
    if (this.runtime.sceneId !== "CH0-S02B") return false;
    await this.dialogue({
      lines: [
        {
          speaker: "NGƯỜI 1",
          text: "Tôi nổi tiếng, đẹp trai, nhà giàu, tôi có gì không tốt?",
        },
        { text: "Đèn chuyển xanh. Người bên cạnh nhìn đèn thay vì trả lời." },
        { speaker: "NGƯỜI 2", text: "Đi." },
      ],
    });
    this.runtime.finishRedLightBeat();
    this.boardingElapsed = 0;
    this.syncPresentation();
    return true;
  }

  private async missOutboundBus(): Promise<boolean> {
    if (!this.runtime.missFirstValidBus()) return false;
    await this.dialogue({
      lines: [
        { speaker: "NHÂN VIÊN", text: "Có lên không em?" },
        { text: "Cửa đóng. Chiếc xe buýt chạy đi." },
        { speaker: "BẮC", text: "Rồi." },
        { text: "Khoảng chờ được nén lại. Một chiếc xe khác tới." },
      ],
    });
    this.syncPresentation();
    return true;
  }

  private async boardOutboundBus(): Promise<boolean> {
    if (!this.runtime.boardOutboundBus()) return false;
    await this.transition.run(() => {
      this.world.activateZone("bus");
      this.world.setPhase(this.runtime.sceneId);
      this.player.teleport(this.world.spawns.busEntry);
      this.player.camera.rotation.set(0, 0, 0);
    });
    this.syncPresentation();
    return true;
  }

  private async resolveFare(): Promise<boolean> {
    if (this.runtime.sceneId !== "CH0-S04") return false;

    // Selected narrative draft treatment only. It stays replaceable until the
    // user approves the exact fare/payment memory as canon.
    await this.dialogue({
      lines: [
        { speaker: "NHÂN VIÊN", text: "Vé em." },
        { speaker: "BẮC", text: "Chuyển khoản được không ạ?" },
        {
          speaker: "NHÂN VIÊN",
          text: "Không chuyển khoản trực tiếp cho cô/chú được. Em có tiền mặt hoặc thẻ vé điện tử không?",
        },
        { speaker: "BẮC", text: "Em không mang tiền mặt." },
        { speaker: "NHÂN VIÊN", text: "Thẻ vé?" },
        { speaker: "BẮC", text: "Em chưa có." },
        {
          speaker: "HÀNH KHÁCH",
          text: "Bạn chuyển khoản được đúng không? Thế để tôi trả giúp. Bạn chuyển tôi.",
        },
        { speaker: "BẮC", text: "Ừ, thế được. Cảm ơn bạn." },
        { speaker: "BẮC", text: "Xong rồi." },
        { speaker: "HÀNH KHÁCH", text: "Ừ." },
      ],
    });
    this.runtime.resolveFareWithHelper();
    this.syncPresentation();
    return true;
  }

  private async finishRideToUet(): Promise<boolean> {
    if (!this.runtime.arriveAtUet()) return false;
    await this.transition.run(() => {
      this.world.activateZone("uet");
      this.world.setPhase(this.runtime.sceneId);
      this.player.teleport(this.world.spawns.uetEntry);
      this.player.camera.rotation.set(0, 0, 0);
    });
    this.syncPresentation();
    return true;
  }

  private async navigationBranch(choice: Chapter0NavChoice): Promise<boolean> {
    if (!this.runtime.chooseNavigation(choice)) return false;

    if (choice === "ask_staff") {
      await this.dialogue({
        lines: [
          { speaker: "BẮC", text: "Chú ơi, cho em hỏi chỗ làm thủ tục nhập học đi hướng nào ạ?" },
          { speaker: "NHÂN VIÊN", text: "Em đi thẳng vào trong, qua sảnh rồi hỏi tiếp bàn phía trong nhé." },
          { speaker: "BẮC", text: "Phía trong là bên nào ạ?" },
          { speaker: "NHÂN VIÊN", text: "Cứ đi thẳng đã. Vào đến sảnh sẽ có người chỉ." },
          { speaker: "BẮC", text: "Vâng, em cảm ơn chú." },
        ],
      });
      this.runtime.completeNavigationBranch();
      this.syncPresentation();
      return true;
    }

    if (choice === "follow_students") {
      await this.dialogue({
        lines: [
          { speaker: "SINH VIÊN 1", text: "Bạn cũng đi làm thủ tục à?" },
          { speaker: "BẮC", text: "Ừ." },
          { speaker: "SINH VIÊN 1", text: "Bạn biết chỗ không?" },
          { speaker: "BẮC", text: "Tôi đang đi theo mấy bạn mà." },
          { speaker: "SINH VIÊN 2", text: "Bọn tôi cũng đang tìm." },
          { speaker: "BẮC", text: "À. Thế là cả đám cùng không biết." },
          { speaker: "SINH VIÊN 1", text: "Chờ tí, để hỏi." },
          { speaker: "NHÂN VIÊN", text: "Bên kia em nhé." },
        ],
      });
      this.runtime.completeNavigationBranch();
      this.syncPresentation();
      return true;
    }

    await this.dialogue({
      lines: [
        { text: "Bắc nhìn biển, kiểm tra điện thoại rồi tự đi." },
        { text: "Một cánh cửa phía trước trông có vẻ hợp lý." },
      ],
    });
    this.world.enableOnly(["open_wrong_room"]);
    this.ui.setObjective("Tự tìm · thử kiểm tra căn phòng phía trước");
    return true;
  }

  private async finishSelfNavigation(): Promise<boolean> {
    if (
      this.runtime.sceneId !== "CH0-S06" ||
      this.runtime.snapshot().navChoice !== "self_navigate"
    ) {
      return false;
    }

    await this.dialogue({
      lines: [
        { text: "Bắc mở cửa. Mấy người trong phòng cùng nhìn ra." },
        { speaker: "NGƯỜI TRONG PHÒNG", text: "Em tìm phòng nào đấy?" },
        { speaker: "BẮC", text: "Em tìm chỗ làm thủ tục nhập học ạ." },
        { speaker: "NGƯỜI TRONG PHÒNG", text: "Không phải phòng này. Em ra ngoài, đi bên kia." },
        { speaker: "BẮC", text: "Vâng. Em xin lỗi." },
      ],
    });
    this.runtime.completeNavigationBranch();
    this.syncPresentation();
    return true;
  }

  private async completeAdmin(): Promise<boolean> {
    if (this.runtime.sceneId !== "CH0-S07") return false;

    await this.dialogue({
      lines: [
        { speaker: "NHÂN VIÊN", text: "Em làm thủ tục nhập học đúng không?" },
        { speaker: "BẮC", text: "Vâng ạ." },
        { speaker: "NHÂN VIÊN", text: "Em đưa giấy tờ nhập học để kiểm tra nhé." },
        { speaker: "BẮC", text: "Vâng." },
        { text: "Nhân viên kiểm tra thông tin. Bắc có thể nhìn quanh trong lúc chờ." },
        { speaker: "NHÂN VIÊN", text: "Bắc đúng không?" },
        { speaker: "BẮC", text: "Vâng." },
        { speaker: "NHÂN VIÊN", text: "Được rồi. Em cầm mấy giấy này về, phần hồ sơ trực tuyến thì làm theo hướng dẫn nhé." },
        { speaker: "BẮC", text: "Phần trực tuyến em về làm được ạ?" },
        { speaker: "NHÂN VIÊN", text: "Ừ. Nhớ làm trước hạn." },
        { speaker: "BẮC", text: "Vâng, em cảm ơn." },
      ],
    });

    this.runtime.completeAdministrativeBeat();
    this.syncPresentation();

    if (this.runtime.snapshot().needsReturnFare) {
      this.world.enableOnly(["prepare_return_fare"]);
      this.ui.setObjective("Ra về · chuẩn bị tiền vé cho chuyến về");
    }
    return true;
  }

  private async prepareReturnFare(): Promise<boolean> {
    if (!this.runtime.prepareReturnFare()) return false;
    await this.dialogue({
      lines: [
        { speaker: "BẮC", text: "À, rút tiền đã." },
        { text: "ATM được trừu tượng hóa; không có PIN, ngân hàng hay dữ liệu thật." },
      ],
    });
    this.world.enableOnly(["board_return"]);
    this.ui.setObjective("Ra điểm dừng · lên xe buýt về");
    return true;
  }

  private async boardReturnBus(): Promise<boolean> {
    if (!this.runtime.boardReturnBus()) {
      if (
        this.runtime.sceneId === "CH0-S08" &&
        this.runtime.snapshot().needsReturnFare
      ) {
        this.ui.setObjective("Chuẩn bị tiền vé trước khi lên xe về");
      }
      return false;
    }

    await this.transition.run(() => {
      this.world.activateZone("bus");
      this.world.setPhase(this.runtime.sceneId);
      this.player.teleport(this.world.spawns.busEntry);
      this.player.camera.rotation.set(0, 0, 0);
    });
    this.syncPresentation();
    return true;
  }

  private async finishRideHome(): Promise<boolean> {
    if (this.runtime.sceneId !== "CH0-S09") return false;

    await this.transition.run(() => {
      this.world.activateZone("street");
      this.world.enableOnly([]);
      this.player.teleport(this.world.spawns.streetHome);
      this.player.camera.rotation.set(0, Math.PI / 2, 0);
    });

    await this.dialogue({
      lines: [
        { speaker: "BẮC", text: "Đến rồi. Đến nhà rồi. Xuống thôi." },
        { text: "Xe buýt rời đi. Âm thanh đường phố mở rộng trở lại." },
      ],
    });
    this.world.triggerFlyby();
    await sleep(this.autoplay ? 90 : 950);
    await this.dialogue({
      lines: [
        { text: "Một phương tiện lướt nhanh qua rồi biến mất. Không va chạm, không chase, không mystery." },
      ],
    });

    this.runtime.finishChapter();
    this.syncPresentation();
    this.ui.showEnding();
    return true;
  }

  private async dialogue<T extends string = string>(
    sequence: DialogueSequence<T>,
  ): Promise<T | null> {
    this.player.setLookEnabled(false);
    try {
      return await this.ui.play(sequence);
    } finally {
      this.player.setLookEnabled(true);
    }
  }

  private syncPresentation(): void {
    const sceneId = this.runtime.sceneId;
    this.world.setPhase(sceneId);
    this.ui.setObjective(this.objectiveFor(sceneId));
    this.syncDatasets();
  }

  private syncDatasets(): void {
    const snapshot = this.runtime.snapshot();
    this.canvas.dataset.ch0Scene = snapshot.sceneId;
    this.canvas.dataset.currentMap = `zone-ch0-${this.world.zoneId}`;
    this.canvas.dataset.ch0Complete = String(snapshot.complete);
    this.canvas.dataset.ch0MissedBus = String(snapshot.missedFirstValidBus);
    this.canvas.dataset.ch0NavChoice = snapshot.navChoice ?? "";
    this.ui.setDebug(
      [
        `scene=${snapshot.sceneId}`,
        `zone=${this.world.zoneId}`,
        `missedBus=${snapshot.missedFirstValidBus}`,
        `nav=${snapshot.navChoice ?? "-"}`,
        `complete=${snapshot.complete}`,
      ].join(" · "),
    );
  }

  private objectiveFor(sceneId: Chapter0SceneId): string {
    const labels: Record<Chapter0SceneId, string> = {
      "CH0-S01": "Cuộc gọi với mẹ",
      "CH0-S02": "Quan sát đường · thử vẫy xe buýt",
      "CH0-S02A": "Nói chuyện với tài xế vừa dừng lại",
      "CH0-S02B": "Đi về điểm dừng · chờ đèn đỏ",
      "CH0-S03": "Xe đã dừng · chủ động lên xe",
      "CH0-S04": "Xử lý tiền vé",
      "CH0-S05": "Đi xe buýt · chuẩn bị xuống gần UET",
      "CH0-S06": "Tìm chỗ làm thủ tục: hỏi · đi theo · tự tìm",
      "CH0-S07": "Hoàn thành thủ tục nhập học (placeholder)",
      "CH0-S08": "Rời UET · chuẩn bị chuyến xe về",
      "CH0-S09": "Chuyến về · xuống gần phòng trọ",
      "CH0-END": "",
    };
    return labels[sceneId];
  }
}
