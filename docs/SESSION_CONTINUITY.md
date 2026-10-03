# Bàn giao phiên — UETốt

Đọc [START_HERE](START_HERE.md) trước; lịch sử và checkpoint ở [master plan](PROJECT_MASTER_PLAN.md#1-phạm-vi-và-bằng-chứng-rà-soát), tình trạng ở [PROGRESS](PROGRESS.md).

## Lệnh tiếp quản

Tiếp quản nhánh `phase-v2/ch0-p1-quality-candidate-v0`, được tạo từ checkpoint tài liệu `1a4e4171245ed7c8cd1d25ca34f0428791a7153e`. P0 + một mẫu P1 đã được cho phép. Đọc [evidence và cách mở](playtest/ch0-p1-quality-candidate-v0/README.md), chờ đánh giá chất lượng mẫu trước gói tiếp. Không bắt đầu lại từ main hoặc merge cả worker. Toàn Ch0 phải được người dùng chơi/nghiệm thu rồi mới lập kế hoạch Ch1.

## Kiểm tra trước khi sửa

```bash
git status --short --branch
git rev-parse HEAD
git remote -v
git worktree list
git log -5 --oneline
```

Đối chiếu remote heads mà không checkout worktree người khác. Đọc mọi modified/untracked có liên quan trước khi sửa. Trong P0 đã truy cập Windows, tạo worktree riêng `C:\Users\Dell\projects\farm_pro_max_p1`. WIP Ui.ts/StoryBeatDirector.ts ở greybox và audio untracked còn nguyên; hash/HEAD được ghi trong evidence. Mỗi phiên vẫn phải inspect lại trạng thái mới.

## Những gì phải giữ

- Macro Ch0–Ch3 và bốn họ map; Ch4+ khóa, không tự finale.
- GD4 checkpoint `7ed178251ae47074e7276f379492953448296149`; không chỉnh để phục vụ Ch0, không phục hồi controller tự teleport spawn.
- Tên Bắc/tính cách đã duyệt, driver tái xuất, ba cách tìm đường, câu chữ/chất liệu user và provenance từng mục.
- Script V0 là draft. Helper/admin/ATM đã có trong greybox không tự thành canon.
- Animation prototype còn ở nhánh riêng; P1 chỉ lấy snapshot performance `f9d6b63`, đọc/cải chính StoryBeatDirector WIP trong bản sao riêng; audio nối ở sample. ChoiceEventFlow vẫn có trong greybox. Không merge toàn worker snapshot cũ vào nguồn mới.

## Sau khi được duyệt

Chỉ thực hiện phần kế hoạch/gói được duyệt. Rà soát code tái dùng và nhập file cần thiết có review; giữ thẩm quyền canon. Mỗi gói phải có hình/âm/diễn xuất/tương tác và kiểm cảnh thật; autoplay là bổ sung. Cập nhật PROGRESS, source SHA, evidence và hạn chế, không tạo prompt dài lặp lại docs.

## Điểm dừng hiện tại

**Dừng sau mẫu P1:** người dùng đánh giá hình ảnh, diễn xuất và điều khiển; âm thanh tạm để sau theo chỉ đạo18:27. P2–P7 chưa bắt đầu; canon, ngoại hình NPC và tính năng tùy chọn chưa mặc nhiên được duyệt. Không merge main/coordinator/worker.
