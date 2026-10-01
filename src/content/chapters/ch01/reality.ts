import type { RealityRuleDefinition } from "../../../reality/RealitySystem";
import type { ChapterOnePrototypeScene } from "./prototypeScene";

export const CH01_NINTH_DESK_SHIFT_ID =
  "shift_ch01_ninth_desk";
export const CH01_REVISIT_AFTER_CLUE_FACT =
  "fact_ch01_left_classroom_after_clue";
export const CH01_NINTH_DESK_APPLIED_FACT =
  "reality_ch01_ninth_desk_applied";

export const CH01_REALITY_RULES: readonly RealityRuleDefinition[] = [
  {
    id: CH01_NINTH_DESK_SHIFT_ID,
    requiredEvidence: ["ev_ch01_erased_ninth_line"],
    requiredFacts: {
      [CH01_REVISIT_AFTER_CLUE_FACT]: true,
    },
    appliedFactId: CH01_NINTH_DESK_APPLIED_FACT,
  },
] as const;

export function applyChapterOneNinthDeskVariant(
  chapter: ChapterOnePrototypeScene,
): void {
  chapter.ninthDesk.setEnabled(true);

  chapter.classroomLight.intensity = 0.72;
  chapter.classroomLight.diffuse.set(0.74, 0.8, 0.9);
}
