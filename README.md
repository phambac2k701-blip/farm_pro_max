# UETốt

Game 3D góc nhìn thứ nhất về đời sống sinh viên UET tại Hà Nội. TypeScript, Vite, Babylon.js; ưu tiên WebGPU, có WebGL fallback.

**Bắt đầu tại [docs/START_HERE.md](docs/START_HERE.md).** Đây là cửa vào duy nhất để biết nguồn hiện hành, bản chơi, trạng thái và việc tiếp theo.

Ưu tiên người dùng ngày 03/10/2026: **hoàn thiện toàn bộ Ch0 → người dùng chơi và nghiệm thu → mới lập kế hoạch Ch1**. Đã được phép thực hiện P0 và một mẫu P1; hiện dừng để người dùng đánh giá mẫu, chưa P2–P7.

Ch0 đã có greybox chạy tiến trình, chưa hoàn thiện về hình ảnh, NPC, diễn xuất, âm thanh và kiểm thử thủ công. Draft kịch bản không tự trở thành canon vì đã được dùng trong code.

`main` tại checkpoint rà soát chỉ có README cũ. Dùng nhánh và commit được ghi trong START_HERE, không mặc định default branch là bản sản xuất.

## Chạy bản Ch0 hiện có

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Mẫu candidate hiện hành: nhánh `phase-v2/ch0-p1-quality-candidate-v0`, mở URL Vite với `?sample=p1&mute=1`. Gọi mẹ tự chạy; âm thanh tạm để sau theo chỉ đạo mới; WASD/chuột/E, 1–3 chỉ khi có lựa chọn, R chơi lại. [Video/ảnh/kết quả](docs/playtest/ch0-p1-quality-candidate-v0/README.md).

Để so nền greybox toàn chương, mở `/` không query, không thêm `autoplay`. WASD để đi, chuột để nhìn sau khi click canvas, E tương tác; bản cũ còn nút Tiếp/Enter/Space cho thoại; 1–3 chọn câu trả lời; R chơi lại sau màn kết. Đây là hành vi hiện tại, không phải thiết kế thoại cuối.

Kiểm tra logic: `npm test`; kiểu dữ liệu: `npm run typecheck`; build: `npm run build`.

Nguồn thẩm quyền từng mảng, giới hạn bốn họ map, Ch4+ bị khóa và checkpoint GD4 đã duyệt đều được dẫn từ START_HERE. Không tự merge vào main hoặc nhánh người khác.
