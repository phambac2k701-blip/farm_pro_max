# Điều phối AI — UETốt

Cửa vào: [START_HERE](START_HERE.md). Ưu tiên có hiệu lực 03/10/2026: **toàn Ch0 → người dùng chơi/nghiệm thu → lập kế hoạch Ch1**. Kế hoạch P0–P7 còn chờ duyệt. Lượt này docs-only, không gameplay mới.

## Vai trò và giới hạn

Người dùng là người duyệt canon/nhận diện/scope cuối. Coordinator kiểm nguồn, phân quyền file khi có task được giao, review kết quả và điều phối tích hợp. Không tự mở worker hoặc giao làm Ch1–Ch3. Nếu người dùng giao nhiều lane sau này, giới hạn cũ tối đa 2 worker + 1 coordinator còn giữ; giới hạn này không tự cho phép khởi động lane.

Mọi người bắt đầu từ START_HERE và task đã duyệt. Narrative đi tiếp [entrypoint](narrative/NARRATIVE_WORKER_ENTRYPOINT.md); không dùng prompt dài thay repo source. Draft/đề xuất AI không là canon, kể cả đã code. [USER_APPROVAL_GATES](design/USER_APPROVAL_GATES.md) vẫn giữ.

## Bản đồ nhánh và WIP

Bảng HEAD đầy đủ và bằng chứng ở [master plan §1](PROJECT_MASTER_PLAN.md#1-phạm-vi-và-bằng-chứng-rà-soát); tình trạng integration ở [PROGRESS](PROGRESS.md). Không tiếp tục dùng base chung `409536b` của đợt worker cũ như production mới.

| Lane/checkpoint | Trạng thái quan sát | Khi cần dùng |
| --- | --- | --- |
| Coordinator `9c3efe9` | Nguồn docs trước lượt rà soát | Giữ provenance/canon đã có |
| Script `c5c0af1` | Draft V0 đã có; bản sao tài liệu ở nhánh bàn giao | Review phần còn mở, không viết lại từ đầu |
| Greybox `db0792a` | Có code Ch0; không final | Base nhánh bàn giao và production sau duyệt |
| Animation `498cf6c` | Worker committed/pushed; 6 clip prototype | Review chọn file reuse cho P1/P4; final rig/skin chưa có |
| Performance `f9d6b63` | Worker committed/pushed, correction activeMeshes đúng | Review nhập module/test cho baseline Ch0; không nhập docs cũ |
| Event `a0af373` | Worker committed/pushed; code/test đã trùng G | Reuse consumer hiện có, không redo foundation |
| Audio Windows `phase-v2/audio-asset-library-v1` | PARKED WIP được docs ghi; không có remote branch trong lần kiểm kê | Inspect candidate tree/catalog/tooling trước khi dùng; lên kế hoạch audio cùng cảnh |

Đường dẫn audio được ghi trước đây: `C:\Users\Dell\projects\farm_pro_max_audio`, `assets/audio/catalog/audio_candidates.json`, `tools/audio_library/`. Chưa truy cập được trong phiên này, không khẳng định đã đọc. Không reset/clean/xóa WIP.

Audio không phải điều kiện để viết draft, nhưng **âm thanh/diễn xuất là phần của mỗi tình huống được hoàn thiện**, không trì hoãn tích hợp hết tới cuối. Candidate cần provenance/license/nghe thử và gate phù hợp trước APPROVED_FINAL. Không dùng asset cốt truyện cũ như thoại UET.

## Quy tắc branch/file

1. Chỉ sửa/commit/push nhánh task của mình. Không merge main/default/coordinator/worker khác khi chưa được giao rõ.
2. Không checkout/reset/clean worktree khác; không ghi đè uncommitted changes. Inspect git status/HEAD/remote/worktree trước.
3. Runtime shared `src/main.ts`, `src/style.css`, camera/input và docs shared cần một owner trong mỗi gói; nếu có worker thì thống nhất trước khi sửa chồng.
4. Review implementation có sẵn, code Babylon, license/provenance trước khi xây mới; foundation không đồng nghĩa nối gameplay.
5. Không import whole worker branch vì snapshot docs/entrypoint có thể cũ hoặc thiếu narrative mới. Review diff, chọn phần cần và giữ docs có thẩm quyền.
6. Benchmark phải ghi hardware/backend/scene/camera/sample, không đo dưới tải build/browser nặng đồng thời rồi coi là baseline.
7. Worker nếu được giao sau này bàn giao gates/commit/evidence rồi dừng đúng task; STOP đó không chặn toàn kế hoạch được người dùng duyệt.

## Protocol tích hợp sau duyệt

Inspect branch/local/remote HEAD và WIP → xem ownership/diff → test/typecheck/build → manual/browser/evidence/performance đúng phạm vi → đối chiếu canon → quyết định tích hợp. Không blind merge. Không thay đổi GD4 đã duyệt hoặc restore auto spawn recovery.

Mẫu handoff ngắn: task/gói được duyệt, nhánh+SHA, file sửa, source đọc, phần proposal, kiểm chứng, blockers/approval còn lại. Dẫn START_HERE; không lặp cả bộ quy tắc trong từng prompt.

## Điểm dừng

Chờ người dùng duyệt kế hoạch Ch0 và creative slots theo gói. Chưa triển khai gameplay mới, chưa Ch1. Các ưu tiên cũ “event Ch0–Ch3 trước”, “GD4/Ch2 trước vì map có”, “audio cuối” được thay thế bởi chỉ đạo mới; bản lịch sử còn trong git.
