import type {
  ChapterId,
  EvidenceId,
  FactId,
  FactValue,
} from "../state/types";

export interface GameEventMap {
  "fact-changed": {
    type: "fact-changed";
    factId: FactId;
    previous: FactValue | undefined;
    value: FactValue;
  };
  "evidence-discovered": {
    type: "evidence-discovered";
    evidenceId: EvidenceId;
  };
  "chapter-changed": {
    type: "chapter-changed";
    previous: ChapterId;
    chapterId: ChapterId;
  };
}

export type GameEventType = keyof GameEventMap;
export type GameEvent = GameEventMap[GameEventType];
export type GameEventHandler<K extends GameEventType> = (
  event: GameEventMap[K],
) => void;

export class GameEvents {
  private readonly handlers = new Map<
    GameEventType,
    Set<(event: GameEvent) => void>
  >();

  on<K extends GameEventType>(
    type: K,
    handler: GameEventHandler<K>,
  ): () => void {
    let listeners = this.handlers.get(type);
    if (!listeners) {
      listeners = new Set();
      this.handlers.set(type, listeners);
    }

    const listener = handler as (event: GameEvent) => void;
    listeners.add(listener);

    return () => {
      listeners?.delete(listener);
      if (listeners?.size === 0) {
        this.handlers.delete(type);
      }
    };
  }

  emit<K extends GameEventType>(event: GameEventMap[K]): void {
    const listeners = this.handlers.get(event.type);
    if (!listeners) {
      return;
    }

    for (const handler of [...listeners]) {
      handler(event);
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}
