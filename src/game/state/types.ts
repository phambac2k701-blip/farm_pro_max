export type FactId = string;
export type EvidenceId = string;
export type ChapterId = string;

export type FactValue = boolean | number | string;

export interface GameStateSnapshot {
  chapterId: ChapterId;
  facts: Record<FactId, FactValue>;
  evidence: EvidenceId[];
}
