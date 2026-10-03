# Bàn giao phiên — UETốt

Đọc [START_HERE](START_HERE.md) trước; lịch sử và checkpoint ở [master plan](PROJECT_MASTER_PLAN.md#1-phạm-vi-và-bằng-chứng-rà-soát), tình trạng ở [PROGRESS](PROGRESS.md).

## Lệnh tiếp quản

Tiếp tục trên nhánh tài liệu `docs/ch0-production-reconciliation-20261003`, gốc greybox `db0792af7880a2b082c4f54d82781888929bf0b2`. Đây là docs-only review và kế hoạch **chờ người dùng duyệt**, không phải lệnh bắt đầu gameplay. Không mặc định main là production; không reset/clean/ghi đè WIP. Duyệt toàn Ch0 trước rồi người dùng chơi và nghiệm thu, sau đó mới lập kế hoạch Ch1.

## Kiểm tra trước khi sửa

```bash
git status --short --branch
git rev-parse HEAD
git remote -v
git worktree list
git log -5 --oneline
```

Đối chiếu remote heads mà không checkout worktree người khác. Đọc mọi modified/untracked có liên quan trước khi sửa. Tại phiên rà soát, worktree Windows/audio candidate chưa truy cập được; phải inspect thực tế nếu phiên sau có quyền truy cập, không suy rằng chúng sạch hoặc đã mất.

## Những gì phải giữ

- Macro Ch0–Ch3 và bốn họ map; Ch4+ khóa, không tự finale.
- GD4 checkpoint `7ed178251ae47074e7276f379492953448296149`; không chỉnh để phục vụ Ch0, không phục hồi controller tự teleport spawn.
- Tên Bắc/tính cách đã duyệt, driver tái xuất, ba cách tìm đường, câu chữ/chất liệu user và provenance từng mục.
- Script V0 là draft. Helper/admin/ATM đã có trong greybox không tự thành canon.
- Animation/performance có ở nhánh riêng, chưa nối Ch0; ChoiceEventFlow có trong greybox. Không merge toàn worker snapshot cũ vào nguồn mới.

## Sau khi được duyệt

Chỉ thực hiện phần kế hoạch/gói được duyệt. Rà soát code tái dùng và nhập file cần thiết có review; giữ thẩm quyền canon. Mỗi gói phải có hình/âm/diễn xuất/tương tác và kiểm cảnh thật; autoplay là bổ sung. Cập nhật PROGRESS, source SHA, evidence và hạn chế, không tạo prompt dài lặp lại docs.

## Điểm dừng hiện tại

Tài liệu đã chỉnh và kế hoạch Ch0 đã trình. **Chờ duyệt kế hoạch**, chưa gameplay mới, chưa Ch1, chưa merge main/coordinator/worker. Điểm dừng cũ của các worker không xóa gate canon nhưng không là lịch sản xuất hiện hành.
