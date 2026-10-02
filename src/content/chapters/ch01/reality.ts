import { Color3 } from "@babylonjs/core/Maths/math.color";

import type { EvidenceSystem } from "../../../evidence/EvidenceSystem";
import type { ChapterRuntime } from "../../../game/chapter/ChapterRuntime";
import type { GameState } from "../../../game/state/GameState";
import {
  RealitySystem,
  type RealityRuleDefinition,
} from "../../../reality/RealitySystem";
import type { ChapterOneProductionScene } from "./scene/buildChapterOneScene";
import type { ChapterOneCheckpointId } from "./state";

export const CH01_KCR_A_RULE_ID = "shift_ch01_pa_ninth_station";
export const CH01_KCR_A_READY_FACT = "ch01_kcr_a_ready";
export const CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT =
  "ch01_kcr_a_inside_pa_after_ready";
export const CH01_KCR_A_LEFT_PA_AFTER_READY_FACT =
  "ch01_kcr_a_left_pa_after_ready";
export const CH01_KCR_A_APPLIED_FACT =
  "reality_ch01_pa_ninth_station_applied";

export const CH01_KCR_A_RULE: RealityRuleDefinition = {
  id: CH01_KCR_A_RULE_ID,
  requiredEvidence: ["C03", "C07"],
  requiredFacts: {
    [CH01_KCR_A_LEFT_PA_AFTER_READY_FACT]: true,
  },
  appliedFactId: CH01_KCR_A_APPLIED_FACT,
};

export function applyChapterOneKcrAWorld(
  chapter: ChapterOneProductionScene,
): void {
  chapter.ninthPaStation.setEnabled(true);
  chapter.ninthPaStationCollider.checkCollisions = true;

  chapter.paRoomLight.intensity = 1.18;
  chapter.paDeskLamp.intensity = 0.72;
  chapter.paDeskLamp.diffuse = new Color3(0.94, 0.7, 0.42);
  chapter.paKcrAccentLight.intensity = 1.0;
  chapter.paKcrAccentLight.diffuse = new Color3(0.95, 0.6, 0.3);
}

export function createChapterOneRealitySystem(
  state: GameState,
  chapter: ChapterOneProductionScene,
): RealitySystem {
  return new RealitySystem(state, [CH01_KCR_A_RULE], {
    [CH01_KCR_A_RULE_ID]: () => {
      applyChapterOneKcrAWorld(chapter);
    },
  });
}

export interface ChapterOneRealityControllerOptions {
  state: GameState;
  evidence: EvidenceSystem;
  chapterRuntime: ChapterRuntime<ChapterOneCheckpointId>;
  reality: RealitySystem;
  onApplied?: () => void;
}

export class ChapterOneRealityController {
  constructor(
    private readonly options: ChapterOneRealityControllerOptions,
  ) {}

  get isKnowledgeReady(): boolean {
    return (
      this.options.evidence.has("C03") &&
      this.options.evidence.has("C07")
    );
  }

  get hasEnteredAfterReady(): boolean {
    return (
      this.options.state.getFact<boolean>(
        CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT,
      ) === true
    );
  }

  get hasLeftAfterReady(): boolean {
    return (
      this.options.state.getFact<boolean>(
        CH01_KCR_A_LEFT_PA_AFTER_READY_FACT,
      ) === true
    );
  }

  get isApplied(): boolean {
    return (
      this.options.state.getFact<boolean>(CH01_KCR_A_APPLIED_FACT) ===
      true
    );
  }

  syncReady(): boolean {
    if (!this.isKnowledgeReady) {
      return false;
    }

    const factChanged = this.options.state.setFact(
      CH01_KCR_A_READY_FACT,
      true,
    );
    const checkpointChanged =
      this.options.chapterRuntime.reachCheckpoint("ch01_kcr_ready");

    return factChanged || checkpointChanged;
  }

  markInsideAfterReady(): boolean {
    if (
      !this.isKnowledgeReady ||
      this.isApplied ||
      this.hasLeftAfterReady
    ) {
      return false;
    }

    this.syncReady();
    return this.options.state.setFact(
      CH01_KCR_A_INSIDE_PA_AFTER_READY_FACT,
      true,
    );
  }

  markLeftAfterReady(): boolean {
    if (
      !this.isKnowledgeReady ||
      !this.hasEnteredAfterReady ||
      this.isApplied
    ) {
      return false;
    }

    return this.options.state.setFact(
      CH01_KCR_A_LEFT_PA_AFTER_READY_FACT,
      true,
    );
  }

  tryApplyOnReentry(): boolean {
    if (
      !this.hasLeftAfterReady ||
      !this.options.reality.isReady(CH01_KCR_A_RULE_ID)
    ) {
      return false;
    }

    const applied = this.options.reality.apply(CH01_KCR_A_RULE_ID);
    if (!applied) {
      return false;
    }

    this.options.chapterRuntime.reachCheckpoint("ch01_kcr_applied");
    this.options.onApplied?.();
    return true;
  }

  restore(): number {
    this.syncReady();
    const restoredCount = this.options.reality.syncApplied();

    if (this.isApplied) {
      this.options.chapterRuntime.reachCheckpoint("ch01_kcr_applied");
    }

    return restoredCount;
  }
}
