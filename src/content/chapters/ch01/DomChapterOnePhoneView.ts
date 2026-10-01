import type { ChapterOnePhoneView } from "./ChapterOneOpeningController";

export class DomChapterOnePhoneView implements ChapterOnePhoneView {
  constructor(private readonly root: HTMLElement) {}

  show(step: number): void {
    this.root.hidden = false;
    this.render(step);
    window.requestAnimationFrame(() => {
      this.root.classList.add("visible");
    });
  }

  update(step: number): void {
    this.render(step);
  }

  hide(): void {
    this.root.classList.remove("visible");
    this.root.hidden = true;
  }

  private render(step: number): void {
    this.root.replaceChildren();

    const shell = document.createElement("div");
    shell.className = "phone-shell";

    const header = document.createElement("div");
    header.className = "phone-header";
    header.textContent = "00:17 · Khang";
    shell.append(header);

    const messages = [
      "Tao tìm thấy người thứ chín.",
      "Trường cũ. Phòng phát thanh.",
      "Đừng gọi ai.",
    ];

    for (let index = 0; index < Math.min(step, 3); index += 1) {
      const bubble = document.createElement("div");
      bubble.className = "phone-message";
      bubble.textContent = messages[index];
      shell.append(bubble);
    }

    if (step >= 2) {
      const photo = document.createElement("div");
      photo.className = "phone-photo-seed";
      photo.setAttribute(
        "aria-label",
        "Ảnh thu nhỏ có tám người và một mép vai bị cắt",
      );
      for (let index = 0; index < 9; index += 1) {
        const figure = document.createElement("span");
        figure.className =
          index === 8
            ? "phone-photo-figure cropped"
            : "phone-photo-figure";
        photo.append(figure);
      }
      shell.append(photo);
    }

    const battery = document.createElement("div");
    battery.className = "phone-battery";
    battery.textContent = "18%";
    shell.append(battery);

    if (step >= 3) {
      const hint = document.createElement("div");
      hint.className = "phone-dismiss";
      hint.textContent = "E · cất điện thoại";
      shell.append(hint);
    }

    this.root.append(shell);
  }
}
