import type { InspectionView } from "./InspectionSession";

export interface InspectionOverlayContent {
  eyebrow?: string;
  title: string;
  body: string;
  footer?: string;
}

export class InspectionOverlayView implements InspectionView {
  constructor(
    private readonly element: HTMLElement,
    private readonly content: InspectionOverlayContent,
  ) {}

  show(): void {
    this.element.replaceChildren();

    if (this.content.eyebrow) {
      const eyebrow = document.createElement("div");
      eyebrow.className = "inspection-eyebrow";
      eyebrow.textContent = this.content.eyebrow;
      this.element.append(eyebrow);
    }

    const title = document.createElement("h2");
    title.textContent = this.content.title;
    this.element.append(title);

    const body = document.createElement("p");
    body.textContent = this.content.body;
    this.element.append(body);

    if (this.content.footer) {
      const footer = document.createElement("div");
      footer.className = "inspection-footer";
      footer.textContent = this.content.footer;
      this.element.append(footer);
    }

    this.element.hidden = false;
    window.requestAnimationFrame(() => {
      this.element.classList.add("visible");
    });
  }

  hide(): void {
    this.element.classList.remove("visible");
    this.element.hidden = true;
  }
}
