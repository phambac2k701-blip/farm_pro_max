# P0 và một mẫu P1 — bàn giao để đánh giá chất lượng

Ngày 03/10/2026. Nhánh `phase-v2/ch0-p1-quality-candidate-v0`, tạo từ checkpoint đã được giao `1a4e4171245ed7c8cd1d25ca34f0428791a7153e`. Commit bàn giao là commit chứa báo cáo này; xem `git log -1`. **Candidate, chưa nghiệm thu P1/Ch0, chưa canon/final; dừng trước P2–P7.** [Cửa vào](../../START_HERE.md).

**Điều chỉnh18:27:** người dùng cho phép tạm bỏ âm thanh. Bàn giao video không tiếng và URL `mute=1`; giữ audio đã làm để tiếp tục sau, không chờ review giọng/mix lần này. Yêu cầu audio final của toàn Ch0 vẫn còn.

## Mở bản chơi

Máy Windows được kiểm tra: `C:\Users\Dell\projects\farm_pro_max_p1`, nhánh candidate riêng. Có thể mở preview `http://127.0.0.1:5180/?sample=p1&mute=1` khi server còn chạy. Để khởi động lại:

```bash
npm ci
npm run build
npx vite preview --host 127.0.0.1 --port 5180
```

Mở `http://127.0.0.1:5180/?sample=p1&mute=1`, bấm **Bắt đầu mẫu · tạm tắt tiếng**. WASD đi, chuột nhìn, E vẫy/hỏi; 1–3 chỉ khi có lựa chọn; Esc thả chuột, click cảnh để tiếp tục, R chơi lại. Cuộc gọi tự chạy; trong cuộc gọi khóa đi/nhìn, sau cất máy trả cả hai. Khi vẫy/hỏi giữ quyền nhìn, tạm khóa di chuyển trong diễn xuất; kết mẫu trả quyền. Mẫu chỉ đánh dấu `p1Complete`, luôn `ch0Complete=false`.

Bản ZIP [ch0-p1-build.zip](../../../artifacts/ch0-p1-build.zip): giải nén toàn bộ, chạy `StartP1.cmd` trên Windows có Node.js, rồi mở URL port5181 in trên cửa sổ (thêm `&mute=1`). Không mở index.html bằng file://. Mac/Linux: `node serve.cjs`. Mở `/` không query để so greybox toàn chương; gameplay toàn chương còn giữ nguyên.

## Xem mẫu

- [Video chơi bằng input thông thường, không tiếng theo điều chỉnh mới](normal-input.webm).
- [Tay/điện thoại trong camera game](hand-phone.png), [tài xế](driver.png), [tài xế chỉ biển](driver-point.png), [góc phố](street.png), [xe chạy qua](bus-pass.png), [biển điểm dừng](stop.png).
- [Lần quay chính](normal-input.json), [nhánh hỏi “Sao anh biết?” không quay](why-normal-input.json), [nhánh tưởng vẫy ở đâu cũng dừng không quay](assumed-normal-input.json).
- [P0 đầu-cuối](p0-baseline.json), [kiểm focus và audio trên cửa sổ Chrome](focus-check.json), [kiểm replay/Esc/backend](additional-checks.json).

**Phương pháp:** AI gửi WASD/chuột/E/1–3 qua Playwright, đọc getter/dataset để quan sát và tìm hướng. Không gọi game action API, không teleport, không runtime autoplay/fast-mode. Đây là kiểm qua điều khiển thường bằng AI, **không phải playtest chủ quan của người thật**. Chưa thay bước người dùng chơi/nghiệm thu. Chrome quay chính headless,1280×720. Quay hình bằng recorder trình duyệt; âm được thu trực tiếp từ WebAudio sau gain/spatial mix, âm thu được giữ để tiếp tục sau, **không đưa vào video bàn giao theo chỉ đạo mới**. Không chèn voice/music offline. Video giữ cả màn nạp/Start và chuỗi gọi mẹ → vẫy xe → hỏi/chỉ biển liên tục, có bước kiểm focus/Esc/replay.

Đã kiểm native blur/focus trên Chrome cửa sổ riêng: tắt focus emulation **sau** navigation mới quan sát được blur thật. Sau đoạn kiểm ngắn, bật lại emulation để hoạt động desktop khác không ngắt toàn bản thu. Ghi rõ phương pháp trong JSON. Script không sửa trạng thái/camera/tiến trình game để vượt cảnh.

## P0: trạng thái nền và phần dùng lại

Đã inspect remote/HEAD/worktree thật. `main` vẫn README cũ, không chọn production. Windows coordinator local `4f8985f` cũ hơn remote `9c3efe9`; nhánh tài liệu `1a4e417` trên greybox `db0792a` có reconciliation mới và code Ch0 nên được chọn. Không merge coordinator cũ hoặc whole worker.

| Nền/nguồn | Kết quả kiểm / quyết định reuse |
| --- | --- |
| Greybox S01–S09/END | Input thường hoàn tất ask_staff trong61.11s ở nhịp kiểm tra nhanh; trace12mốc (kể cả trạng thái đầu rỗng), `ch0Complete=true`; lỗi page/request0; khoảng59.96–60.11FPS ở checkpoint. Không đánh giá pacing bằng tốc độ này; chưa full matrix tự tìm/theo nhóm/lỡ xe |
| PlayerController/InputRouter | Reuse WASD, mouse, collider, pointer lock, chủ quyền movement/look; không khôi phục auto-teleport. P1 chỉ bổ sung Esc rõ ràng và R reload trong phạm vi mẫu |
| InteractionSystem/StateMachine/BehaviorHost | Reuse target/prompt/E/range/priority/ownership; sequence không được khởi động lại khi E spam. Không xây interaction framework mới |
| StoryBeatDirector WIP | Đọc file thực trong greybox Windows, sao chép vào worktree riêng; thêm actual audio completion/SceneClock và sửa TS narrowing. Giữ nguyên bản WIP nguồn; không nhập toàn UI WIP |
| AudioDirector | Reuse backend/manifest/loop/spatial. Nối listener, ended cue, pause/resume. Đã tái hiện và sửa SDK resume cache khi unlock trên context đã running; guard ở cả unlock và focus-resume; regression test + kiểm browser |
| Animation `498cf6c` | Đọc proof mannequin6clip, không dùng mannequin làm NPC. Dùng glTF rig/AnimationGroup đang có trong Babylon; tạo3clip trên rig CC0. Gaze đặt sau animation evaluation để không bị clip ghi đè |
| Performance `f9d6b63` | Nhập riêng `ScenePerformanceSnapshot.ts`, đúng nghĩa `scene.getActiveMeshes().length`; không merge worker. Thêm frame percentile chỉ trong diagnostics mẫu |
| Event flow `a0af373` | ChoiceEventFlow đã có/trùng greybox; giữ nền, không dựng event service mới. Mẫu P1 chỉ có FSM boundary nhỏ, không mở khóa Ch1 |
| GD4 `7ed1782` | `buildLectureHall4Scene.ts` blob `c52b81ec0bc0ba1a8cb602ddab3973cfdce14238` trùng checkpoint duyệt; không sửa map/collision/assets GD4 |

Nền còn hạn chế: thoại Tiếp ở greybox, greybox thiếu audio/NPC/3D action; divider hành lang đòi đi vòng nhưng hướng dẫn chưa rõ; timer lên xe7s chưa gắn vào xe/cửa thật; chapter end đổi field chapterId nhưng chưa là quyền sản xuất Ch1; chưa save/resume/replay đầy đủ. P1 riêng không che những thiếu hụt này.

## WIP được bảo toàn

Worktree mới được tạo trên git common repo của coordinator: `C:\Users\Dell\projects\farm_pro_max_p1`. Worktree cũ không checkout/reset/clean/stash/merge. Audio local `phase-v2/audio-asset-library-v1` @ `409536b5eb8b34e2dc91647711a6509b111c4ed7`, có `assets/`, `docs/audio/`, `tools/audio_library/` untracked; catalog241KB đã đọc. Chọn đúng1 ambient CC0, không nhập toàn bộ WIP. Asset/canon status vẫn candidate.

Greybox Windows @ `db0792a`: `Chapter0Ui.ts` modified, `StoryBeatDirector.ts` untracked. Hash SHA256 nguồn được ghi để đối chiếu cuối:

- UI: `2E772B2D936BA098A2BCF0A2ABD1C25718E5B64CE68476A516C9CE64EED59D17`.
- Director: `7079DEAB02D4FD68F688013EB9F898BE5DB9C3BF6A4897CE9BBFFC09F4FF065D`.

Các worktree animation/performance/event/script/classroom/narrative đã inspect theo task; không tự cập nhật nhánh của họ. Clone local sạch ở lúc bắt đầu không được dùng để suy rằng Windows sạch. Không có DOCX/PDF ngoài repo nào được cung cấp để kiểm nội dung trong P0; không nhận đã đọc chúng.

## Kết quả và giới hạn

Kết quả số đo cuối nằm trong các JSON được liên kết, không lấy FPS lịch sử GD4 thay Ch0. Máy VOSTRO-COREI7G13, i7-1355U/Intel Iris Xe, Chrome1280×720, production build, WebGPU; fallback WebGL được kiểm riêng trong smoke3giây (chưa chạy toàn tuyến trên fallback). Test/typecheck/build/asset validator và diff/link checks ghi trong `additional-checks.json`. Build còn warning chunk >500KB; chưa tối ưu bundle rộng ngoài mẫu.

Số đo frame toàn lượt: video có quay p50/p95/p99 =16.8/20.6/24.2ms; lượt không quay =16.7/17/17.5ms. Snapshot khoảng60FPS,321mesh,43,805vertex,216–221drawcall. Đây là số đo mẫu trên máy/browser đã nêu, không cam kết FPS trên mọi máy. Video quay trước cập nhật URL mute/review label; gameplay giữ nguyên. Bản tắt tiếng mới đã smoke cả hai backend.

| Mảng người dùng cần đánh giá | Đã xem/chơi được | Còn candidate/giới hạn |
| --- | --- | --- |
| Hình ảnh | Human mesh/rig CC0 có mặt/bàn tay, phone đọc được, helmet/scooter/bus, phố ngắn có vật liệu/ánh sáng/bóng trong camera game | Base superhero còn quá lực lưỡng; áo/viền/giày chưa thiết kế tốt; phố/xe còn đơn giản và lặp, chưa nhận diện Hà Nội. **Không gọi việc thêm bevel/chi tiết khối là art cuối** |
| Giọng/âm thanh — tạm hoãn đánh giá | Thoại Việt có audio thật và phụ đề theo ended cue; ambient phố, máy xe HRTF/range, cue tắt máy; thu live trong video | TTS thiếu diễn cảm, Bắc/driver cùng NamMinh; chưa casting/voice release/mix final. Ambient HCM là candidate, không khẳng định ghi âm Hà Nội |
| Diễn xuất | Idle/talk/point, nhìn về người chơi; chỉ biển thật trong3D, tay vẫy/cất máy; xe chạy qua thật | Không lip-sync/face blendshape, body/hand motion còn cứng; driver chưa bước tới/rời đi (ngoài mẫu được giao); hướng/style NPC final cần chọn |
| Điều khiển | Cuộc gọi tự chạy không Tiếp; giao quyền rõ; E/choice/review; không nâng `ch0Complete`; đứng yên/đi lùi/E spam/focus/replay được kiểm theo JSON | Mẫu khóa đi trong wave/talk; collider chỉ giới hạn đoạn phố, NPC/scooter chưa solid. Chưa mọi tình huống/camera/input của toàn chương, chưa human feel test |

WebGPU trước sửa bị canvas trống: face/source mang UV0–3 và color0–2, vượt8vertex buffers. Generator bỏ lớp không dùng, giữ texture/UV cần, xuất lại rig/clip; validator chặn >8attributes và thiếu external texture. Đã kiểm lại ảnh thật/console. Phần này là lỗi tích hợp đã sửa, không là lý do gọi candidate đạt art cuối.

## Pipeline đã dùng, đủ vòng cho mẫu

| Bước | Công cụ/đầu vào → đầu ra | Tự động và kiểm tay / cách từ chối |
| --- | --- | --- |
| Nhu cầu cảnh | Draft hiện có →27cue/slot mẹ/POV/hail/driver/stop trong `script.json` + catalog | Giữ câu gốc; không thêm nhân vật/beat. Người dùng review giọng/style, không auto-canon |
| Tạo/chọn | Quaternius/Kenney CC0 + Blender5.1.1 `buildP1Candidates.py`; audio WIP1cue/Freesound1cue + `generateP1Voice.py` edge-tts7.2.8 →GLB/MP3/provenance | Tạo hình nhân vật từ mesh licensed, props authored; không mặc định gen AI mọi asset. Input pack gốc là dependency, không cần xây thư viện mới |
| Kiểm tra | `validateP1Assets.cjs`: file/hash/URI/clip/stream/voice-draft coverage → danh sách lỗi | Lỗi thiếu/empty/hash/URI/clip/stream làm command exit1. Kiểm ảnh/tay/gaze/áo bắt buộc; geometry hợp lệ không tự đạt chất lượng |
| Nạp/đặt | `LoadAssetContainerAsync`, runtime anchor và camera local metadata → hình trong scene/light/shadow | Thiếu asset/audio chặn nút Start + báo fatal, không giả hoàn tất; xem trong camera thật và ghi mismatch |
| Nối hành vi | Reuse interaction + AnimationGroup + AudioDirector/StoryBeatDirector → hạ phone, bus path, point cue, choice reaction | Đồ nền không khai là gameplay-connected; scooter chỉ context. Có world action, không dùng chữ kể thay hành động |
| Kiểm cảnh thật | Ordinary input script, ảnh/video/live audio, snapshots → evidence/quality review | Autoplay runtime không dùng. Lỗi critical sửa rồi chạy lại; candidate xấu phải thay nguồn/model/casting phù hợp, không tăng khối rồi gọi final |

## Công sức và việc còn chờ

Mốc tạo nhánh 07:36UTC; P0 baseline file07:54UTC (khoảng18phút). Phiên thực thi đầu hoạt động tới khoảng08:59UTC rồi bị ngắt; tiếp tục10:53UTC. Ghi nhận khoảng **2–3giờ thời gian phiên hoạt động với AI/công cụ** gồm kiểm nền, asset/audio, code, xử lý WebGPU/UV và focus/audio, quay/đo/đóng gói; không cộng quãng hết token/phiên ngắt, không quy thành giờ nhân công. JSON có timestamp riêng của từng phép chạy; đây không là hẹn ngày xong game.

Hướng cụ thể để người dùng chọn sau khi xem:

1. **Giữ stylized nhẹ:** giữ pipeline/hành vi, thay body/trang phục/giày phù hợp người thường, polish gesture/grip/light/street và mix. Ước lượng P1 đạt hướng đó8–20giờ hữu ích, giả định tìm được mesh/rig tương thích có quyền dùng.
2. **Tăng chất lượng nhân vật/diễn xuất:** chọn base/rig/trang phục mới hoặc nguồn asset khác; giọng tự thu/diễn viên hoặc công cụ expressive được chốt. Ước lượng20–40giờ cho P1/retest, chưa tính chờ nguồn/thu/duyệt. Clip/body TTS hiện tại chỉ là mẫu để chứng minh giới hạn công cụ.

Xin đánh giá riêng **hình ảnh, diễn xuất, cảm giác điều khiển** (audio tạm để sau): phần nào giữ, chỉnh hoặc thay. Đây chưa là duyệt toàn thoại/NPC/canon. Ngồi/đứng, nhường lối, ví/vé/ATM đã phân loại tại [master plan](../../PROJECT_MASTER_PLAN.md#phân-loại-tính-năng-sau-p0--không-mặc-nhiên-duyệt-mọi-đề-xuất); không triển khai chúng ở P1. P2–P7 và toàn Ch0 còn phía trước; nghiệm thu Ch0 xong mới lập kế hoạch Ch1.
