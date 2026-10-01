import type { EvidenceDefinition } from "../../../evidence/types";

export const CH01_EVIDENCE: readonly EvidenceDefinition[] = [
  {
    id: "ev_ch01_erased_ninth_line",
    chapterId: "ch01",
    title: "Dòng thứ chín bị tẩy",
    summary:
      "Một dòng ghi chép thứ chín từng tồn tại trong sổ trực lớp.",
    source: "hero-book",
  },
] as const;
