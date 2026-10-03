export interface DialogueLine {
  speaker?: string;
  text: string;
  minDurationMs?: number;
  pauseAfterMs?: number;
  completion?: () => Promise<void>;
}

export interface DialogueOption<T extends string = string> {
  id: T;
  label: string;
}

export interface DialogueSequence<T extends string = string> {
  lines: readonly DialogueLine[];
  options?: readonly DialogueOption<T>[];
  autoplayChoice?: T;
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export class Chapter0Ui {
  private readonly objective: HTMLDivElement;
  private readonly dialogue: HTMLElement;
  private readonly speaker: HTMLDivElement;
  private readonly text: HTMLParagraphElement;
  private readonly controls: HTMLDivElement;
  private readonly debug: HTMLDivElement;
  private readonly ending: HTMLDivElement;
  private autoplay = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.objective = document.createElement("div");
    this.objective.id = "ch0-objective";
    document.body.append(this.objective);

    this.dialogue = document.createElement("section");
    this.dialogue.id = "ch0-dialogue";
    this.dialogue.hidden = true;
    this.dialogue.innerHTML = [
      '<div class="ch0-dialogue-card">',
      '<div class="ch0-dialogue-speaker"></div>',
      '<p class="ch0-dialogue-text"></p>',
      '<div class="ch0-dialogue-controls"></div>',
      "</div>",
    ].join("");
    document.body.append(this.dialogue);

    this.speaker = this.dialogue.querySelector<HTMLDivElement>(
      ".ch0-dialogue-speaker",
    )!;
    this.text = this.dialogue.querySelector<HTMLParagraphElement>(
      ".ch0-dialogue-text",
    )!;
    this.controls = this.dialogue.querySelector<HTMLDivElement>(
      ".ch0-dialogue-controls",
    )!;

    this.debug = document.createElement("div");
    this.debug.id = "ch0-debug";
    this.debug.hidden = !import.meta.env.DEV;
    document.body.append(this.debug);

    this.ending = document.createElement("div");
    this.ending.id = "ch0-ending";
    this.ending.hidden = true;
    this.ending.innerHTML = [
      "<div>",
      "<small>UETỐT · PLAYABLE GREYBOX V0</small>",
      "<h1>HẾT CHAPTER 0</h1>",
      "<p>Nhấn R để chơi lại.</p>",
      "</div>",
    ].join("");
    document.body.append(this.ending);
  }

  setAutoplay(enabled: boolean): void {
    this.autoplay = enabled;
    document.body.dataset.ch0Autoplay = String(enabled);
  }

  setObjective(text: string): void {
    this.objective.textContent = text;
    this.objective.hidden = text.length === 0;
  }

  setDebug(text: string): void {
    this.debug.textContent = text;
  }

  async play<T extends string = string>(
    sequence: DialogueSequence<T>,
  ): Promise<T | null> {
    this.dialogue.hidden = false;
    this.dialogue.classList.add("visible");

    if (document.pointerLockElement === this.canvas) {
      document.exitPointerLock();
    }

    for (const line of sequence.lines) {
      this.speaker.textContent = line.speaker ?? "";
      this.speaker.hidden = !line.speaker;
      this.text.textContent = line.text;
      await this.awaitContinue();
    }

    let result: T | null = null;
    if (sequence.options && sequence.options.length > 0) {
      result = await this.awaitChoice(
        sequence.options,
        sequence.autoplayChoice,
      );
    }

    this.dialogue.classList.remove("visible");
    this.dialogue.hidden = true;
    this.controls.replaceChildren();
    return result;
  }

  async showAutoLine(line: DialogueLine): Promise<void> {
    this.dialogue.hidden = false;
    this.dialogue.classList.add("visible", "ch0-dialogue-auto");
    this.speaker.textContent = line.speaker ?? "";
    this.speaker.hidden = !line.speaker;
    this.text.textContent = line.text;
    this.controls.replaceChildren();
    if (line.completion) await line.completion();
    else await wait(Math.max(line.minDurationMs ?? 0, 900 + line.text.length * 24));
    if (line.pauseAfterMs) await wait(line.pauseAfterMs);
  }

  hideDialogue(): void {
    this.dialogue.classList.remove("visible", "ch0-dialogue-auto");
    this.dialogue.hidden = true;
    this.controls.replaceChildren();
  }

  choose<T extends string>(options: readonly DialogueOption<T>[], autoplayChoice?: T): Promise<T | null> {
    return this.play({ lines: [], options, autoplayChoice });
  }

  showEnding(): void {
    this.setObjective("");
    this.ending.hidden = false;
    this.ending.classList.add("visible");
  }

  dispose(): void {
    this.objective.remove();
    this.dialogue.remove();
    this.debug.remove();
    this.ending.remove();
  }

  private async awaitContinue(): Promise<void> {
    if (this.autoplay) {
      this.controls.textContent = "AUTOPLAY";
      await wait(45);
      return;
    }

    await new Promise<void>((resolve) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Tiếp";
      this.controls.replaceChildren(button);

      const finish = (): void => {
        window.removeEventListener("keydown", onKeyDown);
        resolve();
      };
      const onKeyDown = (event: KeyboardEvent): void => {
        if (event.code === "Enter" || event.code === "Space") {
          event.preventDefault();
          finish();
        }
      };

      button.addEventListener("click", finish, { once: true });
      window.addEventListener("keydown", onKeyDown);
      button.focus();
    });
  }

  private async awaitChoice<T extends string>(
    options: readonly DialogueOption<T>[],
    autoplayChoice?: T,
  ): Promise<T> {
    if (this.autoplay) {
      await wait(45);
      return (
        options.find((option) => option.id === autoplayChoice)?.id ??
        options[0]!.id
      );
    }

    return new Promise<T>((resolve) => {
      const finish = (value: T): void => {
        window.removeEventListener("keydown", onKeyDown);
        resolve(value);
      };
      const onKeyDown = (event: KeyboardEvent): void => {
        const index = Number(event.key) - 1;
        const option = options[index];
        if (Number.isInteger(index) && option) {
          event.preventDefault();
          finish(option.id);
        }
      };

      const buttons = options.map((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = `${index + 1}. ${option.label}`;
        button.addEventListener(
          "click",
          () => finish(option.id),
          { once: true },
        );
        return button;
      });

      this.controls.replaceChildren(...buttons);
      window.addEventListener("keydown", onKeyDown);
      buttons[0]?.focus();
    });
  }
}
