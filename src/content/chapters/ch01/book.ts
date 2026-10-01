import type { BookSpread } from "../../../interaction/inspection/BookInspectionController";

export const CH01_BOOK_INTERACTION_ID = "int_classroom_hero_book";

export const CH01_BOOK_SPREADS: readonly BookSpread[] = [
  {
    id: "attendance-cover",
    left: {
      heading: "SỔ TRỰC LỚP",
      lines: ["Phòng 10A", "Tuần 03", "Bản ghi cũ"],
    },
    right: {
      heading: "GHI CHÉP",
      lines: [
        "Tám dòng vẫn còn rõ.",
        "Giấy đã ố ở mép.",
        "Mực cùng một màu.",
      ],
    },
  },
  {
    id: "erased-ninth-line",
    left: {
      heading: "DANH SÁCH",
      lines: [
        "01 — có mặt",
        "02 — có mặt",
        "03 — có mặt",
        "04 — có mặt",
        "05 — có mặt",
        "06 — có mặt",
        "07 — có mặt",
        "08 — có mặt",
      ],
    },
    right: {
      heading: "DÒNG CUỐI",
      lines: [
        "Có vết tẩy ở vị trí thứ chín.",
        "Mực cũ vẫn hằn dưới mặt giấy.",
        "Không còn đọc được tên.",
      ],
    },
    discoveryId: "ev_ch01_erased_ninth_line",
  },
] as const;
