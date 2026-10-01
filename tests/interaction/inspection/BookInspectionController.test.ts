import { describe, expect, it, vi } from "vitest";

import {
  BookInspectionController,
  type BookInspectionVisual,
  type BookSpread,
} from "../../../src/interaction/inspection/BookInspectionController";

const pages: BookSpread[] = [
  {
    id: "cover-spread",
    left: { heading: "Sổ trực lớp", lines: ["Tuần 03"] },
    right: { heading: "Ghi chép", lines: ["Tám dòng còn rõ."] },
  },
  {
    id: "erased-line",
    left: { heading: "Danh sách", lines: ["1 2 3 4 5 6 7 8"] },
    right: { heading: "Dòng cuối", lines: ["Có dấu vết bị tẩy."] },
    discoveryId: "ev_ch01_erased_line",
  },
];

function createVisual(): BookInspectionVisual {
  return {
    setOpenProgress: vi.fn(),
    setPageTurnProgress: vi.fn(),
    showSpread: vi.fn(),
    reset: vi.fn(),
  };
}

describe("BookInspectionController", () => {
  it("opens into readable state and reports the viewed spread", () => {
    const visual = createVisual();
    const onSpreadViewed = vi.fn();
    const controller = new BookInspectionController({
      visual,
      pages,
      onSpreadViewed,
      openDuration: 0.5,
    });

    expect(controller.start()).toBe(true);
    expect(controller.state).toBe("opening");

    controller.update(0.25);
    expect(controller.state).toBe("opening");

    controller.update(0.25);
    expect(controller.state).toBe("reading");
    expect(controller.currentPageIndex).toBe(0);
    expect(visual.showSpread).toHaveBeenLastCalledWith(pages[0]);
    expect(onSpreadViewed).toHaveBeenCalledWith(pages[0], 0);
  });

  it("turns pages and only reports the destination after the turn finishes", () => {
    const visual = createVisual();
    const onSpreadViewed = vi.fn();
    const controller = new BookInspectionController({
      visual,
      pages,
      onSpreadViewed,
      openDuration: 0.1,
      pageTurnDuration: 0.2,
    });

    controller.start();
    controller.update(0.1);
    onSpreadViewed.mockClear();

    expect(controller.nextPage()).toBe(true);
    expect(controller.state).toBe("page-turning");
    expect(controller.currentPageIndex).toBe(0);

    controller.update(0.1);
    expect(onSpreadViewed).not.toHaveBeenCalled();

    controller.update(0.1);
    expect(controller.state).toBe("reading");
    expect(controller.currentPageIndex).toBe(1);
    expect(visual.showSpread).toHaveBeenLastCalledWith(pages[1]);
    expect(onSpreadViewed).toHaveBeenCalledWith(pages[1], 1);
    expect(controller.nextPage()).toBe(false);
  });

  it("closes safely when cancelled during opening", () => {
    const visual = createVisual();
    const onClosed = vi.fn();
    const controller = new BookInspectionController({
      visual,
      pages,
      onClosed,
      openDuration: 1,
      closeDuration: 0.2,
    });

    controller.start();
    controller.update(0.25);
    vi.mocked(visual.reset).mockClear();
    expect(controller.requestClose()).toBe(true);
    expect(controller.state).toBe("closing");

    controller.update(0.2);

    expect(controller.state).toBe("idle");
    expect(onClosed).toHaveBeenCalledOnce();
    expect(visual.reset).toHaveBeenCalledOnce();
  });

  it("can cancel safely during a page turn", () => {
    const visual = createVisual();
    const controller = new BookInspectionController({
      visual,
      pages,
      openDuration: 0.1,
      pageTurnDuration: 1,
      closeDuration: 0.2,
    });

    controller.start();
    controller.update(0.1);
    controller.nextPage();
    controller.update(0.25);

    expect(controller.requestClose()).toBe(true);
    expect(controller.state).toBe("closing");
    controller.update(0.2);

    expect(controller.state).toBe("idle");
    expect(controller.currentPageIndex).toBe(0);
  });
});
