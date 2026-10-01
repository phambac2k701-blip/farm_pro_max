import { describe, expect, it } from "vitest";

import { CH01_BOOK_SPREADS } from "../../src/content/chapters/ch01/book";
import { CH01_EVIDENCE } from "../../src/content/chapters/ch01/evidence";
import { EvidenceSystem } from "../../src/evidence/EvidenceSystem";
import { GameState } from "../../src/game/state/GameState";
import {
  BookInspectionController,
  type BookInspectionVisual,
} from "../../src/interaction/inspection/BookInspectionController";

function createVisual(): BookInspectionVisual {
  return {
    setOpenProgress: () => undefined,
    setPageTurnProgress: () => undefined,
    showSpread: () => undefined,
    reset: () => undefined,
  };
}

describe("book evidence integration", () => {
  it("discovers only the relevant spread and remains idempotent", () => {
    const state = new GameState();
    const evidence = new EvidenceSystem(state, CH01_EVIDENCE);
    const controller = new BookInspectionController({
      visual: createVisual(),
      pages: CH01_BOOK_SPREADS,
      openDuration: 0.01,
      pageTurnDuration: 0.01,
      onSpreadViewed: (spread) => {
        evidence.discover(spread.discoveryId);
      },
    });

    controller.start();
    controller.update(0.01);

    expect(state.listEvidence()).toEqual([]);

    controller.nextPage();
    controller.update(0.01);

    expect(state.listEvidence()).toEqual([
      "ev_ch01_erased_ninth_line",
    ]);

    controller.previousPage();
    controller.update(0.01);
    controller.nextPage();
    controller.update(0.01);

    expect(state.listEvidence()).toEqual([
      "ev_ch01_erased_ninth_line",
    ]);
    expect(evidence.listDiscovered()).toEqual([
      CH01_EVIDENCE[0],
    ]);
  });
});
