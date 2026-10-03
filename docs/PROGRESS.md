# Tiến độ UETốt

**Đi vào [START_HERE](START_HERE.md) trước.** Cập nhật P0 + một mẫu P1 được phép ngày 03/10/2026. Không suy status sạch của checkout riêng thành status worktree khác.

## Hiện tại

- Nhánh candidate: `phase-v2/ch0-p1-quality-candidate-v0`, gốc checkpoint bàn giao `1a4e4171245ed7c8cd1d25ca34f0428791a7153e`.
- Phạm vi được phép: P0 và một mẫu P1 liên tục; không P2–P7/Ch1, không merge main/worker.
- Ưu tiên có hiệu lực: hoàn thiện Ch0 → người dùng chơi và nghiệm thu → lập kế hoạch Ch1.
- Dừng cho người dùng đánh giá hình/diễn xuất/input; audio tạm để sau của candidate. Canon, NPC final, P2–P7 và các tính năng tùy chọn **CHƯA DUYỆT**. [Evidence/cách mở](playtest/ch0-p1-quality-candidate-v0/README.md).

## Phân biệt mức hoàn thành

| Hạng mục | Có code | Có báo cáo chạy | Playtest thủ công kiểm chứng | Đủ chất lượng nghiệm thu |
| --- | --- | --- | --- | --- |
| Ch0 S01–S09, UI, transitions | Có ở greybox `db0792a` | Báo cáo cũ + P0 đầu-cuối ask_staff bằng WASD/chuột/E, không autoplay runtime | AI thao tác input thông thường; chưa human subjective playtest, chưa mọi route | Chưa; asset/NPC/audio/staging còn placeholder |
| ChoiceEventFlow | Có, code/test trùng event branch `a0af373` | Báo cáo worker và greybox consumer | Chưa chứng minh mọi tình huống manual | Chỉ là foundation; không là nghiệm thu Ch0 |
| Animation 6 clip mannequin | Có ở `498cf6c`, chưa trong Ch0 | Workshop proof + JSON/ảnh ở worker | Có báo cáo browser của worker; không là manual Ch0 | Prototype đạt phạm vi riêng, không NPC final |
| Performance tooling | File snapshot từ `f9d6b63` nhập riêng cho P1 | Có snapshot/frame percentiles trên bản chạy | Đo candidate riêng, không suy toàn Ch0 | Chưa có budget Ch0 trên bản final |
| GD4 | Có, builder trùng checkpoint `7ed1782` | Báo cáo đã duyệt BAC-45/integration | Checkpoint GD4 đã duyệt | Bảo toàn đúng phạm vi GD4, không dùng nghiệm thu Ch0 |
| SaveService/AudioDirector | Foundation; P1 nối audio và actual-ended cues/listener/pause | Tests + thu live audio riêng; video bàn giao không tiếng | Mẫu P1 được chạy, save/resume toàn Ch0 chưa nối | Chưa final voice/audio/mix/save |
| Audio candidate Windows | Đã đọc catalog241KB, cây/tooling untracked ở P0 | Một ambient CC0 được chọn riêng, không nhập toàn WIP | Bản thu âm riêng được giữ; âm thanh tạm để sau, chưa user duyệt | Bảo toàn WIP; candidate chưa final |
| Mẫu P1 riêng | Có model/rig/POV/xe/voice/subtitles + normal interaction | Có video/ảnh/normal-input/metrics và giới hạn | AI điều khiển input thường, user chưa đánh giá | Candidate, không nghiệm thu P1 hoặc Ch0 |

Ch0 browser evidence: [greybox report](playtest/ch0-playable-greybox-v0/README.md), đọc rõ autoplay. Snapshot tài liệu `1a4e417` không có phép đo mới; P0/P1 hiện có evidence riêng, đọc đúng phương pháp.

## Lịch sử lượt tài liệu và cập nhật P0/P1

Sáu mục đầu thuộc snapshot tài liệu `1a4e417`; giới hạn truy cập Windows ở thời điểm đó đã được giải quyết trong P0 bên dưới.

- [x] Kiểm repo/remote/HEAD/branch/worktree và scope truy cập; clone sạch, không WIP local; worktree Windows chưa truy cập.
- [x] Đọc và đối chiếu coordinator/script/greybox, animation/performance/event worker, asset và evidence.
- [x] Giữ code/runtime/asset và GD4; không tự restore PlayerSafetyController.
- [x] Thống nhất cửa vào và ưu tiên; sửa chỉ dẫn lỗi thời, gắn nhãn lịch sử đúng phạm vi.
- [x] Đưa script V0 đúng checkpoint vào nhánh tài liệu như draft, giữ user wording và provenance.
- [x] Lập bảng hiệu lực, ma trận cảnh, quy trình asset, P0–P7 và gate nghiệm thu.
- [x] Người dùng cho phép P0 và một mẫu P1; không duyệt toàn draft.
- [x] Inspect Windows, tạo worktree riêng; đọc WIP và chọn reuse cần thiết.
- [x] Chạy P0 S01–END bằng input thường; dựng/kiểm sample P1.
- [ ] Người dùng chọn hướng chất lượng candidate.
- [ ] P2–P7 chỉ tiếp tục khi được giao/duyệt; còn toàn Ch0 và nghiệm thu.

## Kết quả kỹ thuật lịch sử, không phải số đo Ch0

GD4 `7ed1782`: khoảng 59 FPS, 2549 meshes, khoảng 471k vertices. Integration `9c3efe9` ghi 15 file/51 test pass, typecheck/build/diff pass; WebGPU smoke 2549 meshes/470676 vertices, 60.27 RAF FPS/60.00 engine FPS, zero runtime/console/HTTP >=400. Nguồn: [integration evidence](playtest/integration-uet-reconciliation/runtime-smoke.json).

Đó là kết quả đúng checkpoint/máy/trạng thái cũ. Không sao chép thành gate Ch0 final. STOP “animation chưa bắt đầu” của snapshot trước đã được thay bằng tình trạng worker có proof; không là điểm dừng toàn dự án hiện nay.

## Bước tiếp theo

**Dừng sau mẫu P1 để người dùng đánh giá riêng hình ảnh, diễn xuất và cảm giác điều khiển; âm thanh tạm để sau theo chỉ đạo18:27.** Chỉ sau hướng chất lượng được chọn mới cập nhật phạm vi gói tiếp, không tự P2–P7/Ch1. Đọc [master plan](PROJECT_MASTER_PLAN.md#6-kế-hoạch-hoàn-thiện-toàn-bộ-ch0); không viết lại từ đầu.
