export const CH01_CHECKPOINTS = [
  "ch01_gate",
  "ch01_inside_old_wing",
  "ch01_classroom_pre_roster",
  "ch01_classroom_post_c03",
  "ch01_pa_pre_c07",
  "ch01_kcr_ready",
  "ch01_kcr_applied",
  "ch01_climax_complete",
  "ch01_complete",
] as const;

export type ChapterOneCheckpointId =
  (typeof CH01_CHECKPOINTS)[number];

export const CH01_INITIAL_CHECKPOINT: ChapterOneCheckpointId =
  "ch01_gate";

export const CH01_COMPLETE_CHECKPOINT: ChapterOneCheckpointId =
  "ch01_complete";

export const CH01_COMPLETE_FACT = "ch01_complete";

const CH01_CHECKPOINT_SET = new Set<string>(CH01_CHECKPOINTS);

export function isChapterOneCheckpointId(
  value: string,
): value is ChapterOneCheckpointId {
  return CH01_CHECKPOINT_SET.has(value);
}
