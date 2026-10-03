export interface TransitionInputLock {
  setLocomotionEnabled(enabled: boolean): void;
  setLookEnabled(enabled: boolean): void;
}

export interface SceneTransitionOptions {
  coverMs?: number;
  revealMs?: number;
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export class SceneTransitionDirector {
  private busy = false;

  constructor(
    private readonly overlay: HTMLElement,
    private readonly input: TransitionInputLock,
  ) {
    this.overlay.hidden = false;
    this.overlay.classList.add("ch0-blink-transition");
    this.overlay.classList.remove("visible");
    this.overlay.replaceChildren();
  }
  get isBusy(): boolean {
    return this.busy;
  }

  async run(
    duringCover: () => void | Promise<void>,
    options: SceneTransitionOptions = {},
  ): Promise<boolean> {
    if (this.busy) {
      return false;
    }

    this.busy = true;
    const coverMs = Math.max(80, options.coverMs ?? 190);
    const revealMs = Math.max(80, options.revealMs ?? 210);

    this.overlay.style.setProperty("--ch0-cover-ms", `${coverMs}ms`);
    this.overlay.style.setProperty("--ch0-reveal-ms", `${revealMs}ms`);
    this.input.setLocomotionEnabled(false);
    this.input.setLookEnabled(false);

    this.overlay.classList.add("visible");
    await sleep(coverMs);
    try {
      await duringCover();
      await sleep(35);
      this.overlay.classList.remove("visible");
      await sleep(revealMs);
      return true;
    } finally {
      this.overlay.classList.remove("visible");
      this.input.setLookEnabled(true);
      this.input.setLocomotionEnabled(true);
      this.busy = false;
    }
  }

  dispose(): void {
    this.overlay.classList.remove("visible", "ch0-blink-transition");
    this.overlay.removeAttribute("style");
    this.overlay.hidden = true;
    this.busy = false;
  }
}
