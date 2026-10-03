# Tiến độ UETốt

**Đi vào [START_HERE](START_HERE.md) trước.** Snapshot rà soát 03/10/2026; không suy status clean của clone là status worktree Windows.

## Hiện tại

- Nhánh bàn giao: `docs/ch0-production-reconciliation-20261003`, gốc `db0792af7880a2b082c4f54d82781888929bf0b2`.
- Phạm vi lượt này: docs-only, trình kế hoạch toàn Ch0. Chưa triển khai gameplay mới; chưa merge; chưa Ch1.
- Ưu tiên có hiệu lực: hoàn thiện Ch0 → người dùng chơi và nghiệm thu → lập kế hoạch Ch1.
- Kế hoạch và creative choices: **CHỜ DUYỆT**, xem [master plan](PROJECT_MASTER_PLAN.md).

## Phân biệt mức hoàn thành

| Hạng mục | Có code | Có báo cáo chạy | Playtest thủ công kiểm chứng | Đủ chất lượng nghiệm thu |
| --- | --- | --- | --- | --- |
| Ch0 S01–S09, UI, transitions | Có ở greybox `db0792a` | Báo cáo autoplay 3 route và ảnh | Chưa có báo cáo đủ trong nguồn đọc | Chưa; asset/NPC/audio/staging còn placeholder |
| ChoiceEventFlow | Có, code/test trùng event branch `a0af373` | Báo cáo worker và greybox consumer | Chưa chứng minh mọi tình huống manual | Chỉ là foundation; không là nghiệm thu Ch0 |
| Animation 6 clip mannequin | Có ở `498cf6c`, chưa trong Ch0 | Workshop proof + JSON/ảnh ở worker | Có báo cáo browser của worker; không là manual Ch0 | Prototype đạt phạm vi riêng, không NPC final |
| Performance tooling | Có ở `f9d6b63`, chưa trong Ch0 | Báo cáo/test worker | Chưa đo Ch0 bằng tooling này | Chưa có budget Ch0 trên bản final |
| GD4 | Có, builder trùng checkpoint `7ed1782` | Báo cáo đã duyệt BAC-45/integration | Checkpoint GD4 đã duyệt | Bảo toàn đúng phạm vi GD4, không dùng nghiệm thu Ch0 |
| SaveService/AudioDirector | Foundation có | Tests/báo cáo cũ theo phạm vi | Ch0 bootstrap chưa nối | Chưa đạt save/audio Ch0 |
| Audio candidate Windows | Chưa truy cập được | Chỉ có mô tả WIP trong docs cũ | Chưa | Bảo toàn, không kết luận final |

Ch0 browser evidence: [greybox report](playtest/ch0-playable-greybox-v0/README.md), đọc rõ autoplay. Lượt docs không có phép đo/playtest thủ công mới.

## Đã làm trong lượt rà soát

- [x] Kiểm repo/remote/HEAD/branch/worktree và scope truy cập; clone sạch, không WIP local; worktree Windows chưa truy cập.
- [x] Đọc và đối chiếu coordinator/script/greybox, animation/performance/event worker, asset và evidence.
- [x] Giữ code/runtime/asset và GD4; không tự restore PlayerSafetyController.
- [x] Thống nhất cửa vào và ưu tiên; sửa chỉ dẫn lỗi thời, gắn nhãn lịch sử đúng phạm vi.
- [x] Đưa script V0 đúng checkpoint vào nhánh tài liệu như draft, giữ user wording và provenance.
- [x] Lập bảng hiệu lực, ma trận cảnh, quy trình asset, P0–P7 và gate nghiệm thu.
- [ ] Người dùng duyệt kế hoạch Ch0/creative slots liên quan.
- [ ] P0–P7 triển khai và nghiệm thu theo kế hoạch được duyệt.

## Kết quả kỹ thuật lịch sử, không phải số đo Ch0

GD4 `7ed1782`: khoảng 59 FPS, 2549 meshes, khoảng 471k vertices. Integration `9c3efe9` ghi 15 file/51 test pass, typecheck/build/diff pass; WebGPU smoke 2549 meshes/470676 vertices, 60.27 RAF FPS/60.00 engine FPS, zero runtime/console/HTTP >=400. Nguồn: [integration evidence](playtest/integration-uet-reconciliation/runtime-smoke.json).

Đó là kết quả đúng checkpoint/máy/trạng thái cũ. Không sao chép thành gate Ch0 final. STOP “animation chưa bắt đầu” của snapshot trước đã được thay bằng tình trạng worker có proof; không là điểm dừng toàn dự án hiện nay.

## Bước tiếp theo

**Dừng để người dùng duyệt [kế hoạch](PROJECT_MASTER_PLAN.md#6-kế-hoạch-hoàn-thiện-toàn-bộ-ch0).** Không tự bắt đầu P0 code, không Ch1. Khi được duyệt, inspect lại WIP/remote rồi tiếp tục gói đã duyệt, không viết lại từ đầu.
