import type {
  Chapter0Ui,
  DialogueLine,
  DialogueOption,
} from "./Chapter0Ui";

export type DirectedControlMode = "locked" | "lookOnly" | "full";

export interface DirectedInputControl {
  readonly isLocomotionEnabled?: boolean;
  readonly isLookEnabled?: boolean;
  setLocomotionEnabled(enabled: boolean): void;
  setLookEnabled(enabled: boolean): void;
}

export type DirectedSequenceStep<T extends string = string> =
  | {
      type: "line";
      speaker?: string;
      text: string;
      completion?: () => Promise<void>;
      minDurationMs?: number;
      pauseAfterMs?: number;
      controlMode?: DirectedControlMode;
      action?: () => void | Promise<void>;
    }
  | {
      type: "pause";
      durationMs: number;
      controlMode?: DirectedControlMode;
    }
  | {
      type: "action" | "camera";
      run: () => void | Promise<void>;
      controlMode?: DirectedControlMode;
    }
  | {
      type: "choice";
      options: readonly DialogueOption<T>[];
      autoplayChoice?: T;
      controlMode?: DirectedControlMode;
    };

export interface DirectedStorySequence<T extends string = string> {
  id: string;
  controlMode?: DirectedControlMode;
  steps: readonly DirectedSequenceStep<T>[];
}

export interface DirectedSequenceResult<T extends string = string> {
  started: boolean;
  choice: T | null;
}

export interface StoryBeatDirectorOptions {
  delay?: (milliseconds: number) => Promise<void>;
  fastMode?: () => boolean;
}

const DEFAULT_DELAY = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export class StoryBeatDirector {
  private busy = false;
  private activeSequenceId: string | null = null;
  private readonly delay: (milliseconds: number) => Promise<void>;
  private readonly fastMode: () => boolean;

  constructor(
    private readonly ui: Pick<
      Chapter0Ui,
      "showAutoLine" | "hideDialogue" | "choose"
    >,
    private readonly input: DirectedInputControl,
    options: StoryBeatDirectorOptions = {},
  ) {
    this.delay = options.delay ?? DEFAULT_DELAY;
    this.fastMode = options.fastMode ?? (() => false);
  }

  get isBusy(): boolean {
    return this.busy;
  }

  get sequenceId(): string | null {
    return this.activeSequenceId;
  }

  async play<T extends string = string>(
    sequence: DirectedStorySequence<T>,
  ): Promise<DirectedSequenceResult<T>> {
    if (this.busy) {
      return { started: false, choice: null };
    }

    this.busy = true;
    this.activeSequenceId = sequence.id;
    const restoreLocomotion = this.input.isLocomotionEnabled ?? true;
    const restoreLook = this.input.isLookEnabled ?? true;
    let choice: T | null = null;

    try {
      for (const step of sequence.steps) {
        this.applyControlMode(step.controlMode ?? sequence.controlMode ?? "locked");

        if (step.type === "line") {
          await step.action?.();
          const line: DialogueLine = {
            speaker: step.speaker,
            text: step.text,
            minDurationMs: step.minDurationMs,
            pauseAfterMs: step.pauseAfterMs,
            completion: step.completion,
          };
          await this.ui.showAutoLine(line);
          continue;
        }

        if (step.type === "pause") {
          const duration = this.fastMode()
            ? Math.min(35, step.durationMs)
            : step.durationMs;
          await this.delay(Math.max(0, duration));
          continue;
        }

        if (step.type === "action" || step.type === "camera") {
          await step.run();
          continue;
        }

        if (step.type === "choice") {
          choice = await this.ui.choose(step.options, step.autoplayChoice);
        }
      }

      return { started: true, choice };
    } finally {
      this.ui.hideDialogue();
      this.input.setLookEnabled(restoreLook);
      this.input.setLocomotionEnabled(restoreLocomotion);
      this.activeSequenceId = null;
      this.busy = false;
    }
  }

  private applyControlMode(mode: DirectedControlMode): void {
    if (mode === "locked") {
      this.input.setLocomotionEnabled(false);
      this.input.setLookEnabled(false);
      return;
    }
    if (mode === "lookOnly") {
      this.input.setLocomotionEnabled(false);
      this.input.setLookEnabled(true);
      return;
    }
    this.input.setLocomotionEnabled(true);
    this.input.setLookEnabled(true);
  }
}
