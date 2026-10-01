import type {
  ChapterId,
  EvidenceId,
} from "../game/state/types";

export interface EvidenceDefinition {
  id: EvidenceId;
  chapterId: ChapterId;
  title: string;
  summary: string;
  source: string;
}
