import type { ChapterOneClimaxPhoneView } from "./ChapterOneClimaxController";

export class DomChapterOneClimaxPhoneView
  implements ChapterOneClimaxPhoneView
{
  constructor(private readonly root: HTMLElement) {}

  show(): void {
    this.root.replaceChildren();

    const shell = document.createElement("div");
    shell.className = "phone-shell";

    const header = document.createElement("div");
    header.className = "phone-header";
    header.textContent = "Khang";
    shell.append(header);

    const bubble = document.createElement("div");
    bubble.className = "phone-message";
    bubble.textContent = "Đừng để nó thành người.";
    shell.append(bubble);

    const hint = document.createElement("div");
    hint.className = "phone-dismiss";
    hint.textContent = "E · cất điện thoại";
    shell.append(hint);

    this.root.append(shell);
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
