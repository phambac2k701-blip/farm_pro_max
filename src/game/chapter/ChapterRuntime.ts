import type { GameState } from "../state/GameState";

export interface ChapterRuntimeOptions<TCheckpoint extends string> {
  state: GameState;
  checkpoints: readonly TCheckpoint[];
  initialCheckpoint: TCheckpoint;
  completeCheckpoint: TCheckpoint;
  completeFactId: string;
  nextChapterId: string;
  restoredCheckpoint?: TCheckpoint;
}

export interface ChapterRuntimeSnapshot<TCheckpoint extends string> {
  checkpointId: TCheckpoint;
}

export class ChapterRuntime<TCheckpoint extends string> {
  private readonly checkpointIndex = new Map<TCheckpoint, number>();
  private current: TCheckpoint;

  constructor(
    private readonly options: ChapterRuntimeOptions<TCheckpoint>,
  ) {
    if (options.checkpoints.length === 0) {
      throw new Error("ChapterRuntime requires at least one checkpoint.");
    }

    options.checkpoints.forEach((checkpoint, index) => {
      if (this.checkpointIndex.has(checkpoint)) {
        throw new Error(`Duplicate chapter checkpoint: ${checkpoint}`);
      }
      this.checkpointIndex.set(checkpoint, index);
    });

    this.assertKnown(options.initialCheckpoint);
    this.assertKnown(options.completeCheckpoint);

    const restored =
      options.restoredCheckpoint ?? options.initialCheckpoint;
    this.assertKnown(restored);
    this.current = restored;
  }

  get currentCheckpoint(): TCheckpoint {
    return this.current;
  }

  reachCheckpoint(checkpoint: TCheckpoint): boolean {
    this.assertKnown(checkpoint);

    const currentIndex = this.checkpointIndex.get(this.current)!;
    const targetIndex = this.checkpointIndex.get(checkpoint)!;

    if (targetIndex <= currentIndex) {
      return false;
    }

    this.current = checkpoint;
    return true;
  }

  hasReached(checkpoint: TCheckpoint): boolean {
    this.assertKnown(checkpoint);
    return (
      this.checkpointIndex.get(this.current)! >=
      this.checkpointIndex.get(checkpoint)!
    );
  }

  completeChapter(): boolean {
    if (
      this.options.state.getFact(this.options.completeFactId) === true &&
      this.options.state.chapterId === this.options.nextChapterId &&
      this.current === this.options.completeCheckpoint
    ) {
      return false;
    }

    this.reachCheckpoint(this.options.completeCheckpoint);
    this.options.state.setFact(this.options.completeFactId, true);
    this.options.state.setChapter(this.options.nextChapterId);
    return true;
  }

  snapshot(): ChapterRuntimeSnapshot<TCheckpoint> {
    return {
      checkpointId: this.current,
    };
  }

  private assertKnown(checkpoint: TCheckpoint): void {
    if (!this.checkpointIndex.has(checkpoint)) {
      throw new Error(`Unknown chapter checkpoint: ${checkpoint}`);
    }
  }
}
