# Bắt đầu tại đây — UETốt

Cập nhật theo chỉ đạo người dùng 03/10/2026. **Thứ tự sản xuất đã duyệt. P0 và một mẫu P1 được phép thực hiện; P2–P7 và canon/final chưa được duyệt.**

## Hiện đang làm gì?

Hoàn thiện **toàn bộ Chương 0**, rồi người dùng chơi và nghiệm thu, mới tiếp tục Ch1. Lượt hiện tại xác minh P0 và dựng đúng một mẫu P1 liên tục: gọi mẹ → giao quyền → vẫy xe chạy qua → tài xế chỉ điểm dừng. Dừng để người dùng đánh giá chất lượng mẫu; chưa P2–P7, chưa Ch1.

## Nhánh và bản chơi

| Vai trò | Nhánh / checkpoint |
| --- | --- |
| Mẫu chơi hiện hành, candidate | `phase-v2/ch0-p1-quality-candidate-v0`; gốc bàn giao đã duyệt `1a4e4171245ed7c8cd1d25ca34f0428791a7153e`, mở `?sample=p1` |
| Bàn giao tài liệu gốc, có cùng code greybox | `docs/ch0-production-reconciliation-20261003`, gốc `db0792af7880a2b082c4f54d82781888929bf0b2` |
| Bản chơi Ch0 hiện có, chưa nghiệm thu | `phase-v2/ch0-playable-greybox-v0` @ `db0792af7880a2b082c4f54d82781888929bf0b2` |
| Nguồn điều phối trước lần này | `integration/uet-source-of-truth-reconciliation` @ `9c3efe9ada6a2e350deada6a16c2ddc8e83bfcc7` |
| Kịch bản draft đã được kiểm kê | `phase-v2/ch0-script-layout-v0` @ `c5c0af12ac3a141431dd0c7674cb0c598ed70a06` |

Không có một bản đã tích hợp mọi worker. `main` @ `471dd33` chỉ có README cũ. Snapshot nhánh và giới hạn truy cập nằm trong [báo cáo/kế hoạch](PROJECT_MASTER_PLAN.md#1-phạm-vi-và-bằng-chứng-rà-soát).

## Đọc nguồn nào?

| Mảng | Nguồn có thẩm quyền / cách sử dụng |
| --- | --- |
| Ưu tiên, kế hoạch Ch0, khoảng trống và bảng tài liệu | [PROJECT_MASTER_PLAN](PROJECT_MASTER_PLAN.md); P0 + một mẫu P1 được phép; phần còn lại **đề xuất chờ duyệt** |
| Tình trạng và bằng chứng | [PROGRESS](PROGRESS.md), code tại checkpoint được ghi; test/code không đồng nghĩa nghiệm thu |
| Duyệt canon | [USER_APPROVAL_GATES](design/USER_APPROVAL_GATES.md); người dùng quyết định cuối |
| Macro và bốn họ map | [CURRENT_STORY_MACRO](design/CURRENT_STORY_MACRO.md), [CURRENT_WORLD_MAP_SCOPE](design/CURRENT_WORLD_MAP_SCOPE.md) |
| Chất liệu Ch0 và Bắc | [ledger](narrative/CH0_LIVED_MATERIAL_LEDGER.md), [hồ sơ Bắc](narrative/PROTAGONIST_CHARACTER_BIBLE_V0.md); xét từng mục, không áp một nhãn cho cả file |
| Kịch bản để duyệt | [story package](narrative/CH0_STORY_PACKAGE_V0.md), [script layout V0](narrative/CH0_SCRIPT_LAYOUT_V0.md); đề xuất của AI vẫn là đề xuất |
| Kỹ thuật, asset | [CONTENT_PIPELINE](CONTENT_PIPELINE.md), [pipeline V2](art/ASSET_PRODUCTION_PIPELINE_V2.md), [runtime/event](design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md); quy trình thực thi Ch0 ở master plan |
| Làm việc và bàn giao | [WORKING_RULES](WORKING_RULES.md), [AI_COORDINATION](AI_COORDINATION.md), [SESSION_CONTINUITY](SESSION_CONTINUITY.md) |
| GD4 đã duyệt, giữ nguyên | [GIANG_DUONG_4_LAYOUT_V1](design/GIANG_DUONG_4_LAYOUT_V1.md), code checkpoint `7ed178251ae47074e7276f379492953448296149` |

Khi mâu thuẫn: chỉ đạo người dùng mới nhất → quyết định đã duyệt trong đúng phạm vi → nguồn chất liệu → draft → tham khảo kỹ thuật/lịch sử. Ngày sửa và tên V2/V3 không chứng minh đã duyệt. Implementation là bằng chứng hành vi, không là bằng chứng duyệt canon.

## Ch0 có gì, thiếu gì?

Có nền greybox S01–S09 và lần chạy đầu-cuối bằng input thông thường ở P0. Có mẫu P1 riêng với thoại tự chạy theo audio kết thúc thật, POV tay/điện thoại, xe chạy trong 3D, model/rig tài xế candidate, gaze/gesture, lựa chọn draft và âm thanh phố/xe/giọng Việt. Mẫu không báo hoàn tất Ch0. [Bản chơi, video, ảnh, số đo và giới hạn](playtest/ch0-p1-quality-candidate-v0/README.md).

Phần còn lại của toàn Ch0 vẫn thiếu cảnh/asset/NPC/diễn xuất/âm thanh, xe/cửa/giấy tờ thật, checkpoint lưu/tải và kiểm tất cả nhánh. Hình/giọng/diễn xuất P1 là candidate, còn cần người dùng đánh giá; chưa nghiệm thu. [Ma trận từng cảnh](PROJECT_MASTER_PLAN.md#4-ch0-như-một-màn-chơi).

## Việc tiếp theo và duyệt

Người dùng đánh giá mẫu riêng theo **hình ảnh, diễn xuất, cảm giác điều khiển (âm thanh tạm để sau theo chỉ đạo18:27)**. Chưa tự đổi candidate thành canon hoặc tiếp tục gói khác. Các quyết định tiền vé/admin/kết chương ở [master plan §7](PROJECT_MASTER_PLAN.md#7-quyết-định-thật-sự-cần-người-dùng-duyệt) để dành trước gói tương ứng; không yêu cầu duyệt lại tên Bắc, tài xế tái xuất, ba cách tìm đường.

## Chạy và tiếp tục phiên sau

Trong checkout riêng của nhánh candidate: `npm ci`, `npm run build`, `npx vite preview --host 127.0.0.1 --port 5180`, mở `http://127.0.0.1:5180/?sample=p1&mute=1`. Máy Windows đã kiểm tra: `C:\Users\Dell\projects\farm_pro_max_p1`. Bấm **Bắt đầu mẫu · tạm tắt tiếng**; WASD/chuột/E, 1–3 chỉ ở lựa chọn, R chơi lại. Mở `/` không query để so greybox nguyên tuyến. Điều khiển/kiểm tra ở [README](../README.md#chạy-bản-ch0-hiện-có). Autoplay bổ sung: `?autoplay=1&route=default`, `self-nav`, `missed-bus`; không dùng chúng để nghiệm thu cảm giác chơi.

Trước khi sửa: kiểm tra `git status --short --branch`, `git rev-parse HEAD`, `git remote -v`, `git worktree list`, remote heads; đọc và bảo toàn modified/untracked. Không checkout/reset/clean worktree người khác. Không phục hồi controller tự teleport về spawn. Chuyển vùng có chủ đích không phải hệ thống tự respawn.

## Khi nào được sang Ch1?

Chỉ sau [nghiệm thu cuối Ch0](PROJECT_MASTER_PLAN.md#8-nghiệm-thu-cuối-và-điểm-dừng): chơi thủ công toàn chương, bằng chứng hình/video, không placeholder quan trọng, ổn định tiến trình/input/audio/NPC/hiệu năng, người dùng chơi và chấp nhận. Khi đó mới dùng quy trình đã kiểm chứng để **lập kế hoạch Ch1**; macro Ch1 không tự cho phép triển khai.
