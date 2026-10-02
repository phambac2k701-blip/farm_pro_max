import type { EvidenceDefinition } from "../../../evidence/types";

export const CH01_EVIDENCE: readonly EvidenceDefinition[] = [
  {
    id: "C01",
    chapterId: "ch01",
    title: "Tin nhắn 00:17",
    summary:
      "Khang nhắn: “Tao tìm thấy người thứ chín.” rồi chỉ về trường cũ, phòng phát thanh.",
    source: "phone-khang-message",
  },
  {
    id: "C02",
    chapterId: "ch01",
    title: "Ảnh thu nhỏ bị cắt",
    summary:
      "Tám người nằm trọn trong khung; mép phải còn một vị trí thứ chín bị cắt.",
    source: "phone-image-and-class-photo-comparison",
  },
  {
    id: "C03",
    chapterId: "ch01",
    title: "Danh sách năm 2012",
    summary: "Danh sách chính thức chỉ có tám tên.",
    source: "classroom-roster",
  },
  {
    id: "C04",
    chapterId: "ch01",
    title: "Nhãn bàn 1–8",
    summary:
      "Phòng phát thanh có tám vị trí được đánh số từ 1 đến 8; không có số 9.",
    source: "pa-room-stations",
  },
  {
    id: "C05",
    chapterId: "ch01",
    title: "Nhãn 09",
    summary:
      "Một nhãn 09 cũ nằm dưới lớp nhãn mới trong ngăn kéo.",
    source: "classroom-drawer",
  },
  {
    id: "C07",
    chapterId: "ch01",
    title: "Thẻ chỉ mục 09 / 00:17",
    summary: "09 / 00:17 / KHÔNG PHÁT — LƯU NỘI BỘ",
    source: "pa-index-card",
  },
  {
    id: "C14",
    chapterId: "ch01",
    title: "Thời khóa biểu cũ",
    summary: "Một khung 00:17 vẫn còn trên thời khóa biểu năm 2012.",
    source: "corridor-timetable",
  },
] as const;

/**
 * Historical Technical Prototype V1 evidence retained only so the frozen
 * prototype interaction test remains reproducible. Production bootstrap
 * must use CH01_EVIDENCE instead.
 */
export const CH01_PROTOTYPE_EVIDENCE: readonly EvidenceDefinition[] = [
  {
    id: "ev_ch01_erased_ninth_line",
    chapterId: "ch01",
    title: "Dòng thứ chín bị tẩy",
    summary:
      "Một dòng ghi chép thứ chín từng tồn tại trong sổ trực lớp.",
    source: "hero-book",
  },
] as const;
