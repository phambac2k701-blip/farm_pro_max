import { GameEvents } from "../events/GameEvents";
import type {
  ChapterId,
  EvidenceId,
  FactId,
  FactValue,
  GameStateSnapshot,
} from "./types";

export interface GameStateOptions {
  events?: GameEvents;
  chapterId?: ChapterId;
  facts?: Readonly<Record<FactId, FactValue>>;
  evidence?: readonly EvidenceId[];
}

export class GameState {
  readonly events: GameEvents;

  private currentChapterId: ChapterId;
  private readonly facts = new Map<FactId, FactValue>();
  private readonly evidence = new Set<EvidenceId>();

  constructor(options: GameStateOptions = {}) {
    this.events = options.events ?? new GameEvents();
    this.currentChapterId = options.chapterId ?? "ch01";

    for (const [factId, value] of Object.entries(options.facts ?? {})) {
      this.facts.set(factId, value);
    }

    for (const evidenceId of options.evidence ?? []) {
      this.evidence.add(evidenceId);
    }
  }

  get chapterId(): ChapterId {
    return this.currentChapterId;
  }

  getFact<T extends FactValue = FactValue>(factId: FactId): T | undefined {
    return this.facts.get(factId) as T | undefined;
  }

  setFact(factId: FactId, value: FactValue): boolean {
    const previous = this.facts.get(factId);
    if (Object.is(previous, value)) {
      return false;
    }

    this.facts.set(factId, value);
    this.events.emit({
      type: "fact-changed",
      factId,
      previous,
      value,
    });
    return true;
  }

  hasEvidence(evidenceId: EvidenceId): boolean {
    return this.evidence.has(evidenceId);
  }

  discoverEvidence(evidenceId: EvidenceId): boolean {
    if (this.evidence.has(evidenceId)) {
      return false;
    }

    this.evidence.add(evidenceId);
    this.events.emit({
      type: "evidence-discovered",
      evidenceId,
    });
    return true;
  }

  listEvidence(): EvidenceId[] {
    return [...this.evidence];
  }

  setChapter(chapterId: ChapterId): boolean {
    if (chapterId === this.currentChapterId) {
      return false;
    }

    const previous = this.currentChapterId;
    this.currentChapterId = chapterId;
    this.events.emit({
      type: "chapter-changed",
      previous,
      chapterId,
    });
    return true;
  }

  snapshot(): GameStateSnapshot {
    return {
      chapterId: this.currentChapterId,
      facts: Object.fromEntries(this.facts),
      evidence: [...this.evidence],
    };
  }
}
