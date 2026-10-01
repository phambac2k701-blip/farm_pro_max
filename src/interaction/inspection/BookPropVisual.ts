import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode";

import type {
  BookInspectionVisual,
  BookPageFace,
  BookSpread,
} from "./BookInspectionController";

export interface BookPropVisualParts {
  frontCoverHinge: TransformNode;
  turningPageHinge: TransformNode;
  turningPage: AbstractMesh;
  leftPage: AbstractMesh;
  rightPage: AbstractMesh;
  leftTexture?: DynamicTexture;
  rightTexture?: DynamicTexture;
}

const COVER_OPEN_ANGLE = Math.PI * 0.98;

export class BookPropVisual implements BookInspectionVisual {
  constructor(private readonly parts: BookPropVisualParts) {
    this.reset();
  }

  setOpenProgress(progress: number): void {
    const t = Math.min(1, Math.max(0, progress));
    this.parts.frontCoverHinge.rotation.z = COVER_OPEN_ANGLE * t;

    const pageVisibility = Math.min(
      1,
      Math.max(0, (t - 0.2) / 0.6),
    );
    this.parts.leftPage.visibility = pageVisibility;
    this.parts.rightPage.visibility = pageVisibility;
  }

  setPageTurnProgress(progress: number, direction: -1 | 1): void {
    const t = Math.min(1, Math.max(0, progress));
    const visible = t > 0 && t < 1;

    this.parts.turningPage.visibility = visible ? 1 : 0;
    this.parts.turningPageHinge.rotation.z =
      direction === 1
        ? Math.PI * t
        : Math.PI * (1 - t);
  }

  showSpread(spread: BookSpread): void {
    if (this.parts.leftTexture) {
      this.drawPage(this.parts.leftTexture, spread.left);
    }
    if (this.parts.rightTexture) {
      this.drawPage(this.parts.rightTexture, spread.right);
    }
  }

  reset(): void {
    this.parts.frontCoverHinge.rotation.z = 0;
    this.parts.turningPageHinge.rotation.z = 0;
    this.parts.turningPage.visibility = 0;
    this.parts.leftPage.visibility = 0;
    this.parts.rightPage.visibility = 0;
  }

  private drawPage(
    texture: DynamicTexture,
    page: BookPageFace,
  ): void {
    const context = texture.getContext();
    const size = texture.getSize();
    const width = size.width;
    const height = size.height;

    context.fillStyle = "#e7dfc7";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#2a2924";
    context.font = "600 42px Arial";
    context.fillText(page.heading, 34, 58);

    context.font = "28px Arial";
    let y = 112;

    for (const line of page.lines) {
      y = this.drawWrappedLine(
        context,
        line,
        34,
        y,
        width - 68,
        38,
      );
      y += 10;
    }

    texture.update(false);
  }

  private drawWrappedLine(
    context: ReturnType<DynamicTexture["getContext"]>,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ): number {
    const words = text.split(/\s+/);
    let line = "";

    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (
        line &&
        context.measureText(candidate).width > maxWidth
      ) {
        context.fillText(line, x, y);
        y += lineHeight;
        line = word;
      } else {
        line = candidate;
      }
    }

    if (line) {
      context.fillText(line, x, y);
      y += lineHeight;
    }

    return y;
  }
}
