export type BookInspectionState =
  | "idle"
  | "opening"
  | "reading"
  | "page-turning"
  | "closing";

export type BookSoundCue =
  | "contact"
  | "cover-open"
  | "page-turn"
  | "cover-close";

export interface BookPageFace {
  heading: string;
  lines: string[];
}

export interface BookSpread {
  id: string;
  left: BookPageFace;
  right: BookPageFace;
  discoveryId?: string;
}

export interface BookInspectionVisual {
  setOpenProgress(progress: number): void;
  setPageTurnProgress(progress: number, direction: -1 | 1): void;
  showSpread(spread: BookSpread): void;
  reset(): void;
}

export interface BookInspectionAudio {
  play(cue: BookSoundCue): void;
}

export interface BookInspectionControllerOptions {
  visual: BookInspectionVisual;
  pages: readonly BookSpread[];
  audio?: BookInspectionAudio;
  onSpreadViewed?: (spread: BookSpread, index: number) => void;
  onClosed?: () => void;
  openDuration?: number;
  pageTurnDuration?: number;
  closeDuration?: number;
}

const clamp01 = (value: number): number =>
  Math.min(1, Math.max(0, value));

const smoothStep = (value: number): number => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

export class BookInspectionController {
  state: BookInspectionState = "idle";
  currentPageIndex = 0;

  private readonly visual: BookInspectionVisual;
  private readonly pages: readonly BookSpread[];
  private readonly audio?: BookInspectionAudio;
  private readonly onSpreadViewed?: (
    spread: BookSpread,
    index: number,
  ) => void;
  private readonly onClosed?: () => void;
  private readonly openDuration: number;
  private readonly pageTurnDuration: number;
  private readonly closeDuration: number;

  private elapsed = 0;
  private openProgress = 0;
  private closeStartProgress = 1;
  private pendingPageIndex = 0;
  private pageTurnDirection: -1 | 1 = 1;
  private inputAttached = false;

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (this.state === "idle") {
      return;
    }

    if (event.code === "Escape") {
      if (this.requestClose()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }

    if (this.state !== "reading" || event.repeat) {
      return;
    }

    if (event.code === "ArrowRight" || event.code === "PageDown") {
      if (this.nextPage()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }

    if (event.code === "ArrowLeft" || event.code === "PageUp") {
      if (this.previousPage()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  };

  constructor(options: BookInspectionControllerOptions) {
    if (options.pages.length === 0) {
      throw new Error("Book inspection requires at least one spread.");
    }

    this.visual = options.visual;
    this.pages = options.pages;
    this.audio = options.audio;
    this.onSpreadViewed = options.onSpreadViewed;
    this.onClosed = options.onClosed;
    this.openDuration = this.safeDuration(options.openDuration, 0.55);
    this.pageTurnDuration = this.safeDuration(
      options.pageTurnDuration,
      0.38,
    );
    this.closeDuration = this.safeDuration(options.closeDuration, 0.42);
  }

  start(): boolean {
    if (this.state !== "idle") {
      return false;
    }

    this.state = "opening";
    this.elapsed = 0;
    this.currentPageIndex = 0;
    this.pendingPageIndex = 0;
    this.openProgress = 0;
    this.visual.reset();
    this.visual.showSpread(this.pages[0]);
    this.visual.setOpenProgress(0);
    this.visual.setPageTurnProgress(0, 1);
    this.audio?.play("contact");
    this.audio?.play("cover-open");
    return true;
  }

  nextPage(): boolean {
    return this.beginPageTurn(this.currentPageIndex + 1);
  }

  previousPage(): boolean {
    return this.beginPageTurn(this.currentPageIndex - 1);
  }

  requestClose(): boolean {
    if (this.state === "idle") {
      return false;
    }

    if (this.state === "closing") {
      return true;
    }

    this.state = "closing";
    this.elapsed = 0;
    this.closeStartProgress = this.openProgress;
    this.visual.setPageTurnProgress(0, this.pageTurnDirection);
    this.audio?.play("cover-close");
    return true;
  }

  update(deltaSeconds: number): void {
    const delta = Math.max(0, deltaSeconds);

    switch (this.state) {
      case "idle":
      case "reading":
        return;

      case "opening": {
        this.elapsed += delta;
        const linear = clamp01(this.elapsed / this.openDuration);
        const eased = smoothStep(linear);
        this.openProgress = eased;
        this.visual.setOpenProgress(eased);

        if (linear >= 1) {
          this.state = "reading";
          this.elapsed = 0;
          this.openProgress = 1;
          this.visual.setOpenProgress(1);
          this.reportCurrentSpread();
        }
        return;
      }

      case "page-turning": {
        this.elapsed += delta;
        const linear = clamp01(this.elapsed / this.pageTurnDuration);
        this.visual.setPageTurnProgress(
          smoothStep(linear),
          this.pageTurnDirection,
        );

        if (linear >= 1) {
          this.currentPageIndex = this.pendingPageIndex;
          this.visual.showSpread(this.pages[this.currentPageIndex]);
          this.visual.setPageTurnProgress(0, this.pageTurnDirection);
          this.state = "reading";
          this.elapsed = 0;
          this.reportCurrentSpread();
        }
        return;
      }

      case "closing": {
        this.elapsed += delta;
        const linear = clamp01(this.elapsed / this.closeDuration);
        this.openProgress =
          this.closeStartProgress * (1 - smoothStep(linear));
        this.visual.setOpenProgress(this.openProgress);

        if (linear >= 1) {
          this.state = "idle";
          this.elapsed = 0;
          this.openProgress = 0;
          this.currentPageIndex = 0;
          this.pendingPageIndex = 0;
          this.visual.reset();
          this.onClosed?.();
        }
      }
    }
  }

  attachInput(): void {
    if (this.inputAttached) {
      return;
    }

    window.addEventListener("keydown", this.onKeyDown, true);
    this.inputAttached = true;
  }

  detachInput(): void {
    if (!this.inputAttached) {
      return;
    }

    window.removeEventListener("keydown", this.onKeyDown, true);
    this.inputAttached = false;
  }

  dispose(): void {
    this.detachInput();
    this.state = "idle";
    this.currentPageIndex = 0;
    this.visual.reset();
  }

  private beginPageTurn(targetIndex: number): boolean {
    if (
      this.state !== "reading" ||
      targetIndex < 0 ||
      targetIndex >= this.pages.length ||
      targetIndex === this.currentPageIndex
    ) {
      return false;
    }

    this.pendingPageIndex = targetIndex;
    this.pageTurnDirection =
      targetIndex > this.currentPageIndex ? 1 : -1;
    this.elapsed = 0;
    this.state = "page-turning";
    this.audio?.play("page-turn");
    return true;
  }

  private reportCurrentSpread(): void {
    this.onSpreadViewed?.(
      this.pages[this.currentPageIndex],
      this.currentPageIndex,
    );
  }

  private safeDuration(value: number | undefined, fallback: number): number {
    if (value === undefined || !Number.isFinite(value)) {
      return fallback;
    }

    return Math.max(0.001, value);
  }
}
