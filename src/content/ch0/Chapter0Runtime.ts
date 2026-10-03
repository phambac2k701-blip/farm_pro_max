import { ChoiceEventFlow, type EventDefinition } from "../../game/events/ChoiceEventFlow";
import { ChapterRuntime } from "../../game/chapter/ChapterRuntime";
import { GameState } from "../../game/state/GameState";

export type Chapter0SceneId =
  | "CH0-S01"
  | "CH0-S02"
  | "CH0-S02A"
  | "CH0-S02B"
  | "CH0-S03"
  | "CH0-S04"
  | "CH0-S05"
  | "CH0-S06"
  | "CH0-S07"
  | "CH0-S08"
  | "CH0-S09"
  | "CH0-END";

export type Chapter0NavChoice =
  | "ask_staff"
  | "follow_students"
  | "self_navigate";

export interface Chapter0Snapshot {
  sceneId: Chapter0SceneId;
  wrongBusAttempts: number;
  missedFirstValidBus: boolean;
  needsReturnFare: boolean;
  returnFarePrepared: boolean;
  navChoice: Chapter0NavChoice | null;
  complete: boolean;
}

const CHECKPOINTS: readonly Chapter0SceneId[] = [
  "CH0-S01",
  "CH0-S02",
  "CH0-S02A",
  "CH0-S02B",
  "CH0-S03",
  "CH0-S04",
  "CH0-S05",
  "CH0-S06",
  "CH0-S07",
  "CH0-S08",
  "CH0-S09",
  "CH0-END",
];

type NavNode =
  | "choose"
  | "staff_reaction"
  | "students_reaction"
  | "self_reaction"
  | "reconverged"
  | "complete";

const NAV_DEFINITION: EventDefinition<NavNode, Chapter0NavChoice> = {
  id: "evt_ch0_find_admin_area",
  initialNodeId: "choose",
  nodes: [
    {
      id: "choose",
      type: "choice",
      choices: [
        { id: "ask_staff", nextNodeId: "staff_reaction" },
        { id: "follow_students", nextNodeId: "students_reaction" },
        { id: "self_navigate", nextNodeId: "self_reaction" },
      ],
    },
    { id: "staff_reaction", type: "stage", nextNodeId: "reconverged" },
    { id: "students_reaction", type: "stage", nextNodeId: "reconverged" },
    { id: "self_reaction", type: "stage", nextNodeId: "reconverged" },
    { id: "reconverged", type: "stage", nextNodeId: "complete" },
    { id: "complete", type: "complete" },
  ],
};

export class Chapter0Runtime {
  readonly state: GameState;
  readonly chapter: ChapterRuntime<Chapter0SceneId>;
  private readonly navigation: ChoiceEventFlow<NavNode, Chapter0NavChoice>;
  private wrongBusAttempts = 0;
  private missedFirstValidBus = false;
  private needsReturnFare = false;
  private returnFarePrepared = false;
  private navChoice: Chapter0NavChoice | null = null;

  constructor(state = new GameState({ chapterId: "ch00" })) {
    this.state = state;
    this.chapter = new ChapterRuntime({
      state,
      checkpoints: CHECKPOINTS,
      initialCheckpoint: "CH0-S01",
      completeCheckpoint: "CH0-END",
      completeFactId: "fact_ch0_complete",
      nextChapterId: "ch01",
    });
    this.navigation = new ChoiceEventFlow({
      definition: NAV_DEFINITION,
      state,
    });
  }

  get sceneId(): Chapter0SceneId {
    return this.chapter.currentCheckpoint;
  }

  finishMotherCall(): boolean {
    return this.chapter.reachCheckpoint("CH0-S02");
  }

  recordWrongBusAttempt(): number {
    if (this.sceneId !== "CH0-S02") {
      return this.wrongBusAttempts;
    }
    this.wrongBusAttempts += 1;
    if (this.wrongBusAttempts >= 2) {
      this.chapter.reachCheckpoint("CH0-S02A");
    }
    return this.wrongBusAttempts;
  }

  finishDriverEncounter(): boolean {
    if (this.sceneId !== "CH0-S02A") {
      return false;
    }
    this.state.setFact("fact_ch0_knows_marked_bus_stop_rule", true);
    return this.chapter.reachCheckpoint("CH0-S02B");
  }

  finishRedLightBeat(): boolean {
    if (this.sceneId !== "CH0-S02B") {
      return false;
    }
    return this.chapter.reachCheckpoint("CH0-S03");
  }

  missFirstValidBus(): boolean {
    if (this.sceneId !== "CH0-S03" || this.missedFirstValidBus) {
      return false;
    }
    this.missedFirstValidBus = true;
    return true;
  }

  boardOutboundBus(): boolean {
    if (this.sceneId !== "CH0-S03") {
      return false;
    }
    return this.chapter.reachCheckpoint("CH0-S04");
  }

  resolveFareWithHelper(): boolean {
    if (this.sceneId !== "CH0-S04") {
      return false;
    }
    this.needsReturnFare = true;
    return this.chapter.reachCheckpoint("CH0-S05");
  }

  arriveAtUet(): boolean {
    if (this.sceneId !== "CH0-S05") {
      return false;
    }
    return this.chapter.reachCheckpoint("CH0-S06");
  }

  chooseNavigation(choice: Chapter0NavChoice): boolean {
    if (this.sceneId !== "CH0-S06" || this.navChoice !== null) {
      return false;
    }
    if (this.navigation.status === "idle") {
      this.navigation.trigger();
    }
    this.navigation.selectChoice(choice);
    this.navChoice = choice;
    return true;
  }

  completeNavigationBranch(): boolean {
    if (this.sceneId !== "CH0-S06" || this.navChoice === null) {
      return false;
    }
    while (!this.navigation.isCompleted) {
      this.navigation.advance();
    }
    return this.chapter.reachCheckpoint("CH0-S07");
  }

  completeAdministrativeBeat(): boolean {
    if (this.sceneId !== "CH0-S07") {
      return false;
    }
    return this.chapter.reachCheckpoint("CH0-S08");
  }

  prepareReturnFare(): boolean {
    if (this.sceneId !== "CH0-S08" || !this.needsReturnFare) {
      return false;
    }
    this.returnFarePrepared = true;
    return true;
  }

  boardReturnBus(): boolean {
    if (this.sceneId !== "CH0-S08") {
      return false;
    }
    if (this.needsReturnFare && !this.returnFarePrepared) {
      return false;
    }
    return this.chapter.reachCheckpoint("CH0-S09");
  }

  finishChapter(): boolean {
    if (this.sceneId !== "CH0-S09") {
      return false;
    }
    return this.chapter.completeChapter();
  }

  snapshot(): Chapter0Snapshot {
    return {
      sceneId: this.sceneId,
      wrongBusAttempts: this.wrongBusAttempts,
      missedFirstValidBus: this.missedFirstValidBus,
      needsReturnFare: this.needsReturnFare,
      returnFarePrepared: this.returnFarePrepared,
      navChoice: this.navChoice,
      complete: this.state.getFact("fact_ch0_complete") === true,
    };
  }
}
