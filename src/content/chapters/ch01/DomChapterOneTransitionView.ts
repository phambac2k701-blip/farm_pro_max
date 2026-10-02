import type { ChapterOneTransitionView } from "./ChapterOneFinaleController";

export class DomChapterOneTransitionView
  implements ChapterOneTransitionView
{
  constructor(private readonly root: HTMLElement) {}

  show(): void {
    this.root.replaceChildren();

    const card = document.createElement("div");
    card.className = "chapter-transition-card";

    const eyebrow = document.createElement("div");
    eyebrow.className = "chapter-transition-eyebrow";
    eyebrow.textContent = "CHƯƠNG 1";
    card.append(eyebrow);

    const title = document.createElement("h1");
    title.textContent = "Người Thứ Chín";
    card.append(title);

    const status = document.createElement("p");
    status.textContent = "Ranh giới Chương 2";
    card.append(status);

    this.root.append(card);
    this.root.hidden = false;
    window.requestAnimationFrame(() => {
      this.root.classList.add("visible");
    });
  }

  hide(): void {
    this.root.classList.remove("visible");
    this.root.hidden = true;
  }
}
