import { describe, expect, it, vi } from "vitest";

import { EvidenceSystem } from "../../src/evidence/EvidenceSystem";
import type { EvidenceDefinition } from "../../src/evidence/types";
import { GameState } from "../../src/game/state/GameState";

const definitions: readonly EvidenceDefinition[] = [
  {
    id: "ev_ch01_erased_ninth_line",
    chapterId: "ch01",
    title: "Dòng thứ chín bị tẩy",
    summary: "Một dòng ghi chép thứ chín từng tồn tại trong sổ trực lớp.",
    source: "hero-book",
  },
  {
    id: "ev_ch01_margin_mark",
    chapterId: "ch01",
    title: "Ký hiệu ở lề",
    summary: "Một ký hiệu nhỏ lặp lại ở mép trang.",
    source: "hero-book",
  },
];

describe("EvidenceSystem", () => {
  it("registers definitions and discovers known evidence idempotently", () => {
    const state = new GameState();
    const onDiscovered = vi.fn();
    state.events.on("evidence-discovered", onDiscovered);
    const evidence = new EvidenceSystem(state, definitions);

    expect(evidence.discover("ev_ch01_erased_ninth_line")).toBe(true);
    expect(evidence.discover("ev_ch01_erased_ninth_line")).toBe(false);
    expect(state.listEvidence()).toEqual(["ev_ch01_erased_ninth_line"]);
    expect(onDiscovered).toHaveBeenCalledOnce();

    expect(evidence.get("ev_ch01_erased_ninth_line")).toEqual(definitions[0]);
    expect(evidence.listDiscovered()).toEqual([definitions[0]]);
  });

  it("rejects unknown evidence ids without mutating game state", () => {
    const state = new GameState();
    const evidence = new EvidenceSystem(state, definitions);

    expect(evidence.discover("ev_unknown")).toBe(false);
    expect(state.listEvidence()).toEqual([]);
    expect(evidence.get("ev_unknown")).toBeUndefined();
  });

  it("ignores an absent discovery id from an irrelevant inspected page", () => {
    const state = new GameState();
    const evidence = new EvidenceSystem(state, definitions);

    expect(evidence.discover(undefined)).toBe(false);
    expect(evidence.listDiscovered()).toEqual([]);
  });

  it("hydrates lookup from evidence already present in GameState", () => {
    const state = new GameState({
      evidence: ["ev_ch01_margin_mark"],
    });
    const evidence = new EvidenceSystem(state, definitions);

    expect(evidence.has("ev_ch01_margin_mark")).toBe(true);
    expect(evidence.listDiscovered()).toEqual([definitions[1]]);
  });
});
