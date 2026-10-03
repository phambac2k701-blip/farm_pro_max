# UETốt — rà soát sản xuất và kế hoạch hoàn thiện Ch0

Ngày đối chiếu: 03/10/2026. Người dùng là người duyệt cuối.

**Đã có hiệu lực:** ưu tiên toàn bộ Ch0 → người dùng chơi và nghiệm thu → mới lập kế hoạch Ch1. **Chờ duyệt:** các gói sản xuất, lựa chọn trình bày và phần AI bổ sung dưới đây. Lượt này chỉ chỉnh tài liệu, không đổi runtime, không merge.

[Cửa vào duy nhất](START_HERE.md). Tài liệu này tái sử dụng master plan để chứa bảng rà soát, khoảng trống và kế hoạch; không mở thêm bộ tài liệu song song.

## 1. Phạm vi và bằng chứng rà soát

Repo được đọc qua plugin GitHub và clone riêng tại `/workspace/scratch/200be3eef68c/farm_pro_max`. Workspace ban đầu không có repo. Clone ban đầu: `main` @ `471dd332c76d5dcce38810508fb578f642ac57b2`, status sạch, một worktree. Remote `origin`: `https://github.com/phambac2k701-blip/farm_pro_max.git`. Không có AGENTS.md trong cây nguồn điều phối/greybox đã kiểm tra; đã đọc WORKING_RULES và ADR-0001.

Nhánh tài liệu mới: `docs/ch0-production-reconciliation-20261003`, gốc greybox `db0792af7880a2b082c4f54d82781888929bf0b2`. Commit đó có parent `9c3efe9ada6a2e350deada6a16c2ddc8e83bfcc7`, nên giữ nguồn điều phối mới và code Ch0. Không chọn main, không merge/cherry-pick worker code trong lượt này.

| Nhánh quan sát được | Remote HEAD | Kết luận trong phạm vi rà soát |
| --- | --- | --- |
| `main` | `471dd332c76d5dcce38810508fb578f642ac57b2` | Chỉ README; hướng game cũ, không là bản sản xuất |
| `integration/uet-source-of-truth-reconciliation` | `9c3efe9ada6a2e350deada6a16c2ddc8e83bfcc7` | Nguồn điều phối/narrative trước chỉ đạo mới; chưa chứa code Ch0 |
| `phase-v2/ch0-script-layout-v0` | `c5c0af12ac3a141431dd0c7674cb0c598ed70a06` | Draft kịch bản; gốc chung `4f8985f`, không thay toàn bộ docs coordinator bằng nhánh này |
| `phase-v2/ch0-playable-greybox-v0` | `db0792af7880a2b082c4f54d82781888929bf0b2` | Có code Ch0 và ChoiceEventFlow; thiếu script trong cây dù báo cáo nói đã đọc nó |
| `phase-v2/character-animation-prototype-v0` | `498cf6c46c6cb981b43e190c778abc49df866cec` | Sáu clip mannequin, controller, workshop, test, ảnh/JSON; chưa là NPC Ch0 |
| `phase-v2/performance-foundation-v1` | `f9d6b63b7aff683b63ed9c00113653fac3e10ace` | Đã sửa nghĩa activeMeshes; có snapshot/regression, chưa tích hợp vào greybox |
| `phase-v2/event-flow-foundation-v1` | `a0af3735a60aa71fa33479850ac3963ae02dbc6a` | Foundation có docs/API/test; file code/test ChoiceEventFlow trùng greybox |
| `phase-v2/gd4-geometry-corrections` | `7ed178251ae47074e7276f379492953448296149` | Checkpoint đã duyệt; builder GD4 trùng code ở nhánh bàn giao |
| `phase-v2/classroom-asset-production-v1` | `b709607e014b85f0bc4dd578ccc040ab46bd45fa` | Đầu mối asset; greybox đã có 7 GLB, generator, loader, provenance |

Không quan sát thấy nhánh audio trên remote tại lần kiểm kê. AI_COORDINATION ghi WIP Windows `C:\Users\Dell\projects\farm_pro_max_audio`, candidate catalog `assets/audio/catalog/audio_candidates.json` và tooling `tools/audio_library/`; các file đó không có trong clone. **Chưa truy cập/đọc được**, không coi là thất lạc và không reset/clean. Các worktree Windows của coordinator/script/event/performance/animation cũng không truy cập được; status sạch của clone không chứng minh chúng sạch. Không có DOCX/PDF được tracked ở cây greybox; không có file ngoài repo được cung cấp/truy cập trong lượt này. Nguồn ngoài được draft dẫn chỉ là nghiên cứu của worker, chưa tái xác minh và chưa thay ký ức người dùng.

Đã đọc nguồn Ch0, script theo checkpoint, code runtime/world/UI/transition/bootstrap, interaction/state/save/camera/audio, generator/loader/provenance, báo cáo greybox và docs/evidence animation/performance/event-flow. Ảnh `uet-midroute.png` được xem: khối greybox và hộp thoại, không là bằng chứng NPC diễn xuất. Không chạy playtest thủ công mới trong lượt tài liệu; mọi kết quả browser cũ được gắn nguồn, không trình bày như phép đo mới.

## 2. Bảng hiệu lực tài liệu

Quy ước nguồn: C = coordinator `9c3efe9`; G = greybox `db0792a`; S = script `c5c0af1`; A = animation `498cf6c`; P = performance `f9d6b63`; E = event `a0af373`; R = lần rà soát trên nhánh tài liệu này. Các SHA đầy đủ ở bảng trên. “Hiện hành, đã duyệt” chỉ áp dụng phần có bằng chứng duyệt, không toàn bộ chi tiết trong file.

| Tài liệu | Trạng thái | Phạm vi | Nguồn/branch/commit | Mâu thuẫn | Cách xử lý |
| --- | --- | --- | --- | --- | --- |
| README; START_HERE | Hiện hành theo chỉ đạo; START_HERE mới | Cửa vào, bản chơi | C/G → R | README main là game cũ; thiếu bản Ch0 | README nhánh này dẫn một cửa vào; không sửa main |
| WORKING_RULES | Hiện hành; quy tắc kỹ thuật còn phù hợp | Làm việc, chất lượng | C/G → R | “liên tục” có thể vượt bước duyệt; title TBD; chỉ một lớp học | Giới hạn theo task đã duyệt; UETốt; hoàn thành toàn Ch0 |
| PROJECT_MASTER_PLAN | Chỉ đạo đã có hiệu lực + kế hoạch chờ duyệt | Sản xuất Ch0 | C/G → R | Hoãn map Ch0; detailed material đều TBD | Thay nội dung hiện hành bằng rà soát và P0–P7; bản cũ còn trong git |
| PROGRESS; SESSION_CONTINUITY | Hiện hành; kết quả cũ là lịch sử | Trạng thái/bàn giao | C/G → R | animation “chưa bắt đầu”; bản GD4 được hiểu là hiện tại duy nhất | Ghi tồn tại code theo từng nhánh; tách báo cáo GD4 lịch sử |
| AI_COORDINATION | Hiện hành theo chỉ đạo mới | Điều phối/quyền sửa | C/G → R | Ch0–Ch3 song song, GD4/Ch2 trước, audio cuối; base 409536b cũ | Thay ưu tiên và bản đồ nhánh; audio cùng cảnh; không tự mở worker |
| USER_APPROVAL_GATES | Hiện hành; giữ ràng buộc canon | Thẩm quyền | C/G → R | Tên Bắc còn trong mục phải duyệt; “ending” nhập nhằng | Ghi tên đã duyệt; phân biệt kết chương/kết toàn game; không duyệt toàn draft |
| CURRENT_STORY_MACRO | Hiện hành, macro đã duyệt | Ch0–Ch3/Ch4+ | C/G → R | “đợi user cung cấp Ch0” đã cũ; open-ended dễ hiểu là không có mốc kết chương | Ch0 đã có ledger/draft; cần review phần mở; kết chương rõ, Ch4+ khóa |
| CURRENT_WORLD_MAP_SCOPE; GD4_LAYOUT | Hiện hành, phạm vi/checkpoint đã duyệt | Bốn họ map, GD4 | C/G; GD4 `7ed1782` | Greybox có vùng local dễ bị coi map mới | Giữ bốn họ map, GD4 bất biến; Xt/street greybox không là topology cuối |
| CONTENT_PIPELINE; ASSET_PRODUCTION_PIPELINE_V2 | Hiện hành về phương pháp; chi tiết Ch0 chờ duyệt | Map/prop/NPC | C/G → R | Xuân Thủy “chưa sản xuất” bỏ qua greybox; đặt model dễ bị coi xong | Ghi đúng mức greybox; quy trình sáu bước và hợp đồng asset tại §5 |
| RUNTIME_WORLD_EVENT_ARCHITECTURE | Hiện hành, định hướng kỹ thuật đã duyệt | Residency/zone/event | C/G → R | Policy dễ bị hiểu đã implemented; ending và stop cũ | Ghi độ lệch hide-vs-dispose; không tự cho phép gameplay; rõ kết chương |
| CH0_LIVED_MATERIAL_LEDGER | Hiện hành làm nguồn gốc; không phải toàn bộ canon | Ký ức, ý tưởng, câu chữ | C/G | Nhãn RAW không làm vô hiệu chi tiết user đã duyệt | Bảo toàn; xét provenance từng mục |
| CH0_STORY_PACKAGE_V0 | Đề xuất/chờ duyệt phần chi tiết | Spine Ch0 | C/G | Có phần accepted và phần hypothetical trong một file | Giữ nhãn; không suy toàn package đã duyệt |
| CH0_SCRIPT_LAYOUT_V0 | Đề xuất/chờ duyệt | Thoại, staging, nhánh | S → bản sao tài liệu ở R | Chưa có trong G; mở đầu khác yêu cầu mới; A helper/admin đã vào code | Đưa đúng file về để đọc; chú thích ưu tiên mới; không promote canon |
| PROTAGONIST_CHARACTER_BIBLE_V0 | Hiện hành phần tên/tính cách đã duyệt; phần khác chờ | Bắc | C/G → R | Header template trong khi tên/tính cách có duyệt | Sửa nhãn hỗn hợp; giữ mọi phần mở |
| NARRATIVE_EVENT_STYLE_V2; UET_NARRATIVE_SKILL_V2 | Hiện hành về quy tắc biên tập; không là lịch sản xuất | Narrative/nguồn/chi phí | C/G → R cho style | “Ch0 không cần final ending” chưa rõ | Style phân biệt mốc kết chương; không sửa repo-local skill |
| NARRATIVE_WORKER_ENTRYPOINT | Hiện hành cho lượt narrative được giao | Resume narrative | C/G → R | Entry không chỉ ưu tiên mới | Dẫn START_HERE trước; không tự viết lại draft |
| CH0_SCRIPT_LAYOUT_WORKER_PROMPT | Lịch sử nhiệm vụ V0 đã có deliverable | Handoff cũ | C/G → R | Đọc prompt cũ có thể viết lại từ đầu | Gắn nhãn đã có output; không xóa đường dẫn |
| CHARACTER_ANIMATION_PLAN_V1 | Tham khảo kỹ thuật/roadmap; proof đã có | Sáu clip/backlog | C/G → R; proof A | STOP V0 bị coi là STOP toàn dự án | Ghi proof ở A; final NPC chỉ theo gói đã duyệt; không gọi mannequin là final |
| CHARACTER_ANIMATION_PROTOTYPE_V0, evidence | Tham khảo kỹ thuật, báo cáo chạy | Prototype | A | Chưa nằm trong nhánh Ch0 | Trỏ checkpoint, review khi tích hợp; không import bootstrap cũ |
| PERFORMANCE_BUDGET_V1, snapshot/regression | Tham khảo kỹ thuật; ngưỡng provisional | Đo runtime | P | “activeMeshes” correction và baseline GD4 dễ áp Ch0 | Dùng nghĩa đã sửa; đo baseline Ch0 mới, không hứa FPS |
| CHOICE_EVENT_FLOW_V1 | Tham khảo kỹ thuật, có implementation | Event core | E; code/test G | Generic docs nói chưa UI, G đã có consumer | Phân biệt foundation và consumer Ch0; không merge toàn worker |
| AUDIO_BIBLE | Hiện hành về phương pháp; target Ch0 mới | Audio | C/G → R | Target P202; WIP parked thành hoãn tới cuối | Đổi mục tiêu sang Ch0 theo cảnh; WIP vẫn bảo toàn/chưa đọc |
| TESTING_AND_PLAYTEST | Hiện hành; bổ sung nghiệm thu Ch0 | Verification | C/G → R | Chưa đủ xử lý autoplay/đứng yên/nghiệm thu | Dẫn gate §8 và ma trận P0–P7; giữ tests kỹ thuật |
| GAMEPLAY; ART_BIBLE; PREBUILD_CHECKLIST | Hiện hành nguyên tắc; target cũ thay thế | Gameplay/art/checklist | C/G → R | Lớp P202/GD4 vẫn được ưu tiên; checklist chưa phân biệt greybox | Đổi target Ch0, cập nhật code đã có; không tick final |
| ARCHITECTURE; TECHNICAL_REQUIREMENTS; ADR-0001; classroom provenance | Tham khảo kỹ thuật hiện có | Code/shared asset | C/G | Các khả năng định hướng không đồng nghĩa nối Ch0 | Dùng code thật; 7 GLB reusable chưa là bộ Ch0 hoàn chỉnh |
| P202 docs; workshop draft; GAME_PIVOT_V2_DRAFT_NOTES | Tham khảo kỹ thuật / lịch sử pivot | Room/prototype/pivot | C/G → R banner | Tên current dễ override Ch0 | Đánh dấu phạm vi, dẫn cửa vào; giữ đường dẫn/không xóa nội dung |
| playtest Ch0 greybox | Lịch sử bằng chứng chạy tự động | Ba route | G → R chú thích | PASS dễ bị hiểu manual/final | Chỉ nhận autoplay; chưa nghiệm thu |
| DOCX/nguồn ngoài; audio catalog Windows | Chưa xác định / chưa truy cập | Material/candidate | Chỉ đường dẫn trong coordination | Không đủ nội dung để kết luận | Ghi thiếu; inspect trước khi dùng, không đoán |

Không lấy tên V2/V3 hoặc mtime làm tiêu chí. Không merge whole worker branch: các nhánh kỹ thuật có snapshot docs cũ/thiếu narrative mới và có chỉnh `main.ts`/`style.css` riêng. Nguồn R chỉ có hiệu lực trên nhánh bàn giao cho tới khi người dùng quyết định tích hợp; các nhánh cũ không tự cập nhật.

## 3. Những chỉ dẫn đã điều chỉnh

- Thay ưu tiên đồng thời Ch0–Ch3 và GD4/Ch2 trước bằng hoàn thiện toàn Ch0. Macro Ch1–Ch3 vẫn giữ để bảo toàn hướng truyện, không là lịch sản xuất.
- Thay audio “để cuối” bằng thiết kế/chọn/đồng bộ âm thanh trong mỗi cảnh. Có thể tạm trong gói đang làm, không qua gate cuối nếu placeholder quan trọng.
- Sửa “animation chưa bắt đầu” thành “proof ở A, chưa nối Ch0”. Event core đã có trong G; performance ở P. Không nhập nhằng tồn tại remote với đã tích hợp.
- STOP của reconciliation/animation worker là lịch sử đúng phạm vi. Điểm dừng **hiện tại**: bàn giao docs và chờ duyệt kế hoạch Ch0. Các gate canon/final character còn hiệu lực.
- Hạ tài liệu pivot, P202 và báo cáo GD4 xuống đúng phạm vi; không dùng nội dung cũ làm nguồn Ch0. Bảo toàn topology GD4 và việc loại bỏ tự teleport spawn.
- Định nghĩa hoàn thành thêm diễn xuất/âm thanh/asset và người dùng nghiệm thu. Autoplay chỉ chứng minh đường chuyển state, không chứng minh di chuyển tới target, quan sát, hướng dẫn dễ hiểu hoặc cảm giác chơi.
- Thoại cố định như gọi mẹ tự chạy có nhịp; không bắt Tiếp từng câu. Thêm voice đơn thuần không sửa được hành động thiếu. Chi tiết control ở §4.
- Nguồn Ch0 đã tồn tại; không yêu cầu người dùng kể lại từ đầu. Chỉ review phần mở cụ thể tại §7. Giữ nguyên câu người dùng và phân biệt nghiên cứu/AI với ký ức.

## 4. Ch0 như một màn chơi

Mã cảnh lấy từ script S và `src/content/ch0/Chapter0Runtime.ts`. Cột “còn thiếu” là yêu cầu/đề xuất sản xuất, **chưa triển khai**. Có code ≠ đã chạy ≠ đã playtest thủ công ≠ đủ nghiệm thu.

Bằng chứng chung: G có báo cáo headless autoplay default/self-nav/missed-bus về CH0-END và ảnh. Đó là báo cáo chạy trước lượt này, chưa có báo cáo chơi thủ công toàn chương hoặc người dùng nghiệm thu. **Mọi cảnh dưới đây chưa đạt chất lượng nghiệm thu.**

| Cảnh / mục tiêu | Hành động người chơi | Phản ứng thế giới cần thấy | NPC/asset cần | Âm thanh/hiệu ứng | Điều kiện kết thúc | Code hiện có / phần còn thiếu |
| --- | --- | --- | --- | --- | --- | --- |
| S01: mở đầu thân quen, giao quyền | Theo cuộc gọi; sau đó nhìn/đi | Điện thoại cất; xe/người vẫn chuyển động | Tay/điện thoại; mẹ chỉ giọng | Thoại + phố; nhịp tự chạy | Cất máy xong, trả đủ quyền | `start()` + UI có thoại; khóa cả đi/nhìn và chờ Tiếp. Thiếu voice, tay/máy, cue trả quyền, staging |
| S02: hiểu nhầm bắt xe | Vẫy khi xe tới, nhìn theo, có thể tự tìm stop | Xe đi qua không phanh; công nhận tự phát hiện | Bus ngoài, tay vẫy, biển stop | Engine/traffic/pan theo xe | Gặp driver/đi đúng stop theo spine | Đếm hai `hail_bus`; bus là khối đứng yên, passage chỉ chữ. Không vẫy sẽ không tiến; tự phát hiện chưa nối |
| S02A: gặp tài xế, hiểu luật | Tiếp cận/nói, lựa chọn câu nếu hữu ích | Tài xế tới/chỉ biển/rời đi; reaction khác | Driver final được duyệt, xe công nghệ | Voice, máy xe, chỉ hướng | Đã biết stop, đi tiếp | Có 3 câu trả lời + fact; NPC hộp tĩnh. Thiếu tiếp cận/point/look/exit và nhánh đã biết |
| S02B: chờ đèn, nghe câu người dùng | Quan sát/chờ/đi khi xanh; ambient có thể bỏ qua | Đèn đổi, hai người quay/đi; người sau nhắc nếu chắn | Đèn, hai NPC nền, luồng người | Thoại không gian và traffic | Tới stop; không bắt nghe hết | E “Chờ đèn đỏ” rồi đọc chữ. Thiếu đèn đổi, người qua đường; hiện là checkpoint bắt buộc |
| S03: chủ động lên xe hoặc lỡ | Tới cửa; lên trong window; có thể đứng yên | Xe tới, cửa mở/đóng; staff nhìn; xe khác tới | Bus/door, staff, stop | Phanh, khí/cửa, voice nhắc | Lên một chuyến hợp lệ | Timer 7s từ phase, không dựa xe tới/player thấy; một lần miss. Xe/cửa/rời đi/nhìn đều chữ; cần window rõ và cơ hội lại |
| S04: xử lý tiền vé | Kiểm tra ví/máy; xác nhận phương án duyệt | Staff/hành khách trao đổi, thanh toán và phản hồi | Ví, máy, ticket; helper nếu duyệt | Voice, giấy/ví, device cue | Vé giải quyết; trạng thái chuyến về nhất quán | `resolveFareWithHelper()` luôn chọn helper; helper không có model. Chỉ thoại, chưa thao tác ví/máy/trao vé; A chưa canon |
| S05: đi xe, thở và quan sát | Nhìn ngoài, ngồi/đứng nếu giữ, nhường lối, chuẩn bị xuống | Bus di chuyển; người xuống; thông báo stop | Cabin/seats/grab rail, crowd gần, cảnh ngoài | Engine/interior, stop cue, inertia nhẹ | Đến UET, xuống rõ vị trí | Cabin khối + E marker teleport dip-black. Thiếu ngoài cửa sổ/chuyển động/ngồi/nhường và arrival thật |
| S06-A: hỏi đường | Hỏi rồi tự đi/quan sát | Staff chỉ; gọi sửa khi sai | Guide, biển và junction | Voice/chỉ hướng, ambience sân | Thực sự tới vùng thủ tục | Hỏi xong `completeNavigationBranch()` ngay. Chưa có đường đi/đích theo nhánh |
| S06-B: theo nhóm | Theo di chuyển; có thể tách/đến muộn | Nhóm rẽ, mất tự tin, hỏi lại, quay đầu | Nhóm NPC tái dùng rig; mobile/sign | Voice, chân, pause có mục đích | Nhận thông tin và tới cùng đích | Group là một hộp; lời thoại diễn ra ngay, nhánh hội tụ ngay; chưa theo đường/đợi/chạy lại |
| S06-C: tự tìm | Đọc biển/máy; mở/đóng cửa hoặc tự sửa trước | Cánh cửa quay, mọi người nhìn; biển đúng hiện rõ | Openable door, phòng nhìn được, NPC gaze | Bản lề/voice; không sting giải thích joke | Tự đi tới đích sau correction | Có target `open_wrong_room`, code chỉ kể “mở/cùng nhìn”; thiếu interior/gaze/close và đi tới đích |
| S07: hoàn tất việc tại trường | Đưa giấy; quan sát khi chờ; nhận/xem hướng dẫn | Staff nhận/check/trả giấy | Desk có thể tái dùng; giấy, tay, staff | Paper/desk, voice, silence 2–3s | Nhận xác nhận công việc cụ thể đã duyệt | E đọc thoại rồi complete; admin target là bàn, không có staff/giấy. Ký ức/thủ tục chưa đủ, A nghiên cứu còn chờ duyệt |
| S08: về bằng điều đã học | Đi ra/đúng stop; chuẩn bị vé nếu cần; lên | Không lặp joke cũ; routine trả vé rõ | Reuse stop/bus; ATM chỉ nếu A được duyệt | Footstep, boarding/fare, ambience đổi | Lên xe về với state hợp lệ | Có gate tiền/ATM và board; ATM chỉ chữ. Thiếu walk-out, hand callback phù hợp, routine vé thật |
| S09: xuống gần trọ, flyby, kết chương | Nhận stop, xuống; hướng về nhà | Xe đi khỏi; phương tiện lướt; camera phản ứng rồi kết | Reuse đường/bus; flyby vehicle final | Engine pan + camera nhẹ đồng bộ + cut/fade | Mốc kết Ch0 rõ; R/replay | Có khối flyby chạy x 27 đơn vị/s; không audio/camera reaction. Kể lại flyby bằng chữ; vị trí/vehicle/kết còn chờ |

### Quyền camera/input và nhịp — đề xuất thực thi

- **S01 theo chỉ đạo mới:** đoạn gọi mẹ tự chạy; choreography giữ người trên vỉa hè, tạm khóa di chuyển và điều khiển camera trong cuộc gọi ngắn; phụ đề tự chạy theo nhịp. Kết cuộc gọi/cất máy xong trả nhìn và đi trong một beat rõ. Phương án cho xoay đầu nhẹ trong draft S chưa là yêu cầu khóa. Không có lựa chọn cần bấm ở cuộc gọi.
- **S02/S03/S05/S06/S08:** phần quan sát, chờ, theo nhóm, tìm đường giữ tự do nhìn/đi. Khóa ngắn chỉ lúc lên/xuống, chạm cửa, nhận/đưa đồ nếu animation cần; dialog cố định không mặc định khóa camera. Chỉ dừng ở lựa chọn thật; reaction có visible cue.
- **S07:** khóa tay/di chuyển khi trao giấy, mở nhìn quanh trong khoảng staff kiểm tra; code hiện tại `dialogue()` khóa look nên chưa đạt.
- **S09:** chuyển quyền có chủ đích trong bước xuống; flyby reaction ngắn rồi hồi input hoặc chuyển màn kết, không để khóa treo. Cường độ/timing đo trong cảnh thật, hỗ trợ giảm camera motion.
- Dùng `CameraDirector`, `InteractionStateMachine`, `InteractionBehaviorHost`, `SceneTransitionDirector` hiện có trước. Lock có chủ sở hữu, cleanup trên lỗi/blur/cancel/dispose; tránh `finally` của một sequence mở khóa khi owner khác vẫn còn cần. Đây là khoảng trống cần test, chưa kết luận có regression đã tái hiện.
- Không ép chọn thoại cho mọi câu; không thêm minigame để đủ thao tác. Đứng yên ở S02 phải còn xe và phản ứng/nudge hợp lý, không phải bắt hai E để trigger câu chuyện; S02B không khóa vì lỡ câu nền.

### Khoảng trống hệ thống liên cảnh

`Chapter0World` dựng cả street/bus/uet rồi `setEnabled()` vùng không dùng: có giảm hiển thị, chưa dispose/lazy-resident đúng policy map. Ch0 `main.ts` không tạo `AudioDirector`, `SaveService`, `CameraDirector` cho choreography; foundation tồn tại không có nghĩa đã nối.

`Chapter0Runtime` giữ attempts/missed/fare/nav trong field local; GameState snapshot hiện không bao phủ chúng. `completeChapter()` đổi `chapterId` sang ch01, nhưng Ch1 chưa chạy. P0/P6 phải phân biệt đã kết Ch0 và quyền bắt đầu Ch1. R hiện là reload, không là resume checkpoint. Save/restore cần xử lý phase + nhánh + money gate + vị trí hợp lệ + input/audio owner, không chỉ thêm nút lưu.

## 5. Asset và tự động hóa theo cảnh

### Hợp đồng tích hợp cho từng asset

Đây là **đề xuất checklist metadata**, chưa có manifest/validator Ch0 được triển khai. Lưu cùng file catalog của bộ asset khi P1/P2 bắt đầu, không tạo registry service mới. Mỗi record phải có:

`id, file, status, role(background/interactable/character), source, author, license, attribution, modifications, unitMeters, dimensions, forward/up, pivot, materials/textures, collisionProxy, interactionAnchors, rig/clipIds, audioCueIds, sceneIds, placements(position/rotation/scale), reviewEvidence`.

Từng trường không áp dụng ghi `not_applicable`; chưa có ghi `missing`, không bịa file. Mét, Y-up; hướng forward phải được khai báo và kiểm ở loader, vì glTF conversion khác authoring. Không hardcode một dấu Z cho mọi asset. NPC thêm skeleton/root/retarget/seat/gaze/hand anchor; prop tương tác thêm axis/hinge/grip + khoảng dùng; đồ nền bỏ collision/behavior nếu không cần. Placement phải có transform thực tế từ scene đã review, không dùng bảng dưới như tọa độ final.

### Danh sách phục vụ Ch0

ID mới dưới đây là **đề xuất**, file mới chưa tồn tại. Vị trí là slot/zone cần dùng; P1/P2 phải bổ sung transform kiểm chứng.

| Asset/nhóm | Loại, cảnh và slot | File/mức có hiện tại | Điểm cần nối hoặc kiểm |
| --- | --- | --- | --- |
| `mdl_ch0_phone`, tay/ví/giấy/vé | Interactable, S01/04/07/08, tay POV/bàn | Chưa có bộ final; inspection/pickup foundation có | Grip/cất máy/trao giấy; trạng thái và âm thanh, không chỉ model |
| `mdl_ch0_bus_exterior` | Xe diễn xuất, S02/03/08/09, lane/stop | Hộp trong Chapter0World | Đúng scale cửa, pivot, path, boarding anchor, staff gaze; collision tách |
| `mdl_ch0_bus_interior` | Major local set chuyển tiếp, S04/05/09 | Cabin/seats procedural greybox | Window/cửa/hành lang, rail/seat/exit anchor; nối ngồi nếu giữ |
| Stop/đèn/biển/curb/storefront | Background + interactable chọn lọc, street S02/02B/03/08 | Hộp/biển chưa đọc được | Readability và khoảng nhìn; traffic/wait cues; không dựng chợ |
| Bộ Xuân Thủy | Scene shell, S06/07/08, entry/junction/wrong room/admin/exit | Divider/bounds/bàn khối | Landmark/đường đi/ngưỡng cửa, topology chờ duyệt; không đổi GD4 |
| Bàn/ghế/đèn/quạt/AC/bảng | Nền hoặc prop theo nhu cầu S06/07 | 7 GLB `public/assets/classroom/v1/` | Loader không tự nối gameplay; teacher desk có thể dùng admin desk; fan hiện static |
| `npc_ch0_driver` | Hero/event, S02A, điểm dừng gần người chơi | NPC hộp; animation mannequin ở A | Final look cần duyệt; approach/point/turn/exit, vehicle pose nếu cần |
| Staff bus/helper/guide/admin | Event, S03/04/06/07 | Một số hộp, helper/admin thiếu | Reuse body/rig; ticket/hand/gaze/timing; helper phụ thuộc chọn A |
| Nhóm sinh viên/phòng sai/người đèn đỏ | Ambient/event, S02B/06 | Group hộp, nhiều slot chưa có | Walk/turn/look/seated, route waiting; nền không cần toàn AI |
| `mdl_ch0_flyby_vehicle` | Event, S09, lane tách người chơi | Hộp di chuyển có | Vehicle/design duyệt, path/pivot, audio pan/camera cue; không tai nạn |
| Cue/ambience/voice Ch0 | Audio, theo toàn bộ scene IDs | Ch01 legacy WAV; WIP candidate chưa đọc | Provenance + nghe thử; không dùng khang_climax/kcr làm canon UET; final voice/mix cần kiểm |

Không coi tất cả cần gen AI. Prop đơn giản tái dùng/procedural/DCC; bus/body/rig có thể chọn pack có license; AI phù hợp concept/material/reference, chỉ là runtime model khi cleanup/rig/license đạt. Ưu tiên gần mắt, vật người chơi chạm và NPC diễn xuất; xa dùng instances/cards. Không cần mô phỏng cả thành phố hay full bus simulator.

### Quy trình sáu bước

| Bước | Công cụ/script hiện có | Đầu vào → đầu ra | Tự động được | Kiểm hình/người dùng | Lỗi và xử lý |
| --- | --- | --- | --- | --- | --- |
| 1. Nhu cầu cảnh | Script + matrix §4, Chapter0Runtime/World và CONTENT_PIPELINE | Scene/action/reaction → slot + checklist metadata | Đối chiếu ID/scene/file bằng script nhỏ sau P1; **chưa có validator chung** | Người dùng duyệt hero/canon/topology; AI không tự lấp missing | Ghi missing slot/approval, chặn final gói liên quan |
| 2. Tạo/chọn | `tools/classroom/generateClassroomAssets.mjs`; file GLB có sẵn; DCC/nguồn licensed khi cần | Slot/spec → candidate GLB/texture/rig/audio | Classroom generator chạy `node tools/classroom/generateClassroomAssets.mjs`; chỉ xuất đúng 7 prop, không gen bus/NPC | Silhouette/đồng nhất chất lượng; NPC look duyệt trước final | Không rõ license hoặc sai hướng: candidate rejected, giữ nguồn, sửa/chọn lại |
| 3. Kiểm tra | Classroom tests/provenance; animation workshop ở A; audio authoring Python chỉ legacy | Candidate + metadata → kết quả scale/pivot/material/rig/cue | Chạy existing tests; thêm kiểm file/anchor cần thật trong gói, kiểm budget/log | Đặt cạnh người/cửa, thử ngồi/trao/turn; nghe và kiểm license | Báo ID/file/reason/evidence; quarantine candidate, không lặng lẽ APPROVED_FINAL |
| 4. Nạp/đặt | `LoadAssetContainerAsync` và wrapper pattern ClassroomProductionAssets; EnvironmentKit/MaterialLibrary/SignageV2 | Asset đã kiểm + slot transform → instance trong scene | Load một lần, instantiate/batch đồ nền, lookup ID/transform | Kiểm trong đúng vị trí/camera/ánh sáng, chữ và collider | Load/anchor fail: log ID+URL, màn retry hoặc giữ checkpoint; không vượt scene với asset critical missing |
| 5. Nối hành vi | InteractionSystem/BehaviorHost; Openable/Pickup/Inspection; ChoiceEventFlow; CameraDirector; AudioDirector | Instance + action/anchors/cues + event state → reaction hoàn chỉnh | Bật/tắt theo phase, cues theo beat, binding IDs; reuse controller thay framework mỗi đồ | Test tay/cửa/nhìn/âm khớp; mỗi lựa chọn có phản ứng thấy được | State/cue fail có fallback recover input và retry; ghi issue, chặn final nếu trọng yếu |
| 6. Kiểm trong cảnh thật | `npm test`, typecheck/build; browser play; performance ở P sau review | Cảnh playable → ảnh/video/log/metrics và trạng thái đạt/chưa | Smoke/autoplay và log/metric bổ sung | Manual approach/action/miss/wait/leave/retry; người dùng xem final | Ticket ID/scene/steps/expected/actual/clip; sửa trong đúng gói, không đánh dấu xong bằng autoplay |

Generator viết vào thư mục asset hiện có: chạy ở branch gói riêng, inspect trước, không ghi đè WIP. Audio WIP `tools/audio_library/` chưa kiểm được nên không kê là script sẵn chạy. `generate_ch01_audio.py`/`process_khang_voice.py` không là pipeline thoại Ch0 tự động; chỉ tái dùng xử lý tín hiệu sau audit. Không chuyển asset candidate thành final bằng trạng thái tải thành công.

## 6. Kế hoạch hoàn thiện toàn bộ Ch0

**ĐỀ XUẤT CHỜ DUYỆT.** Thực thi trực tiếp tuần tự bởi coordinator; không tự mở agent/worker mới. Mỗi gói đi qua đủ asset, gameplay, NPC, thoại, audio, camera, kiểm cảnh; hạ tầng làm cùng gói cần nó. P1 là thử quy trình, mục tiêu bàn giao cuối vẫn P7 toàn chương.

Giả định ước lượng: một người + AI, desktop browser, tái dùng foundations và asset licensed/DCC phù hợp, bộ rig tái dùng, tối đa ba micro-branch đã có, không exact campus master reconstruction, không multiplayer/physics traffic/full transport sim. Khoảng là **giờ làm hữu ích**, không là giờ chạy AI hay lời hứa lịch. Thời gian chờ duyệt/tìm license/thu voice không nằm trong khoảng. Chưa đo chất lượng NPC/asset cuối nên phải ước lượng lại sau P1.

| Gói | Phạm vi, file được sửa | Phụ thuộc | Kết quả chơi được | Tiêu chí đạt | Kiểm chứng | Khoảng |
| --- | --- | --- | --- | --- | --- | --- |
| P0 — khóa phạm vi thực thi và baseline | Inspect WIP/refs; ledger/package/script phần user chốt; tests Ch0/ChoiceEventFlow; review file riêng A/P. Chưa rewrite toàn kiến trúc | Người dùng duyệt kế hoạch; các creative slot có thể chốt theo gói | Bản greybox hiện có chạy tay được để so; hợp đồng scene/asset đã cụ thể | Đúng source/HEAD; không overwrite docs mới bởi branch cũ; vấn đề input/state/navigation ghi được; bản baseline với hardware/backend | Chạy tests/typecheck/build; manual baseline từ đầu; record console/network/FPS; diff GD4 bằng 0 | 4–8h |
| P1 — mở đầu và thử pipeline đủ vòng | S01–S02/S02A: Chapter0Game/Ui/World, CameraDirector khi cần, AudioDirector binding, asset/rig gần mắt; test control | P0; thoại mẹ/driver và visual mẫu ở §7 | Gọi mẹ tự chạy → giao quyền → vẫy xe thấy xe đi → driver chỉ stop | Không Tiếp từng câu; phone/tay/driver/xe/sound thật; không chặn người tự phát hiện; cùng art direction | Video control handoff; chơi đứng yên/đi lệch/vẫy/không vẫy/blur/E spam; capture errors; user review mẫu chất lượng | 16–32h |
| P2 — đường tới stop và lên xe | S02B–S03: street set final theo nhu cầu, signal/ambient NPC, bus door/path/window/staff; cùng files Ch0 + reusable behaviors + tests | P1; môi trường street mẫu chấp nhận | Đi qua đèn → xe tới → lên hoặc lỡ → chuyến khác | Câu user giữ nguyên; ambient bỏ lỡ không khóa; timer bắt đầu theo cơ hội thực; xe/cửa/gaze thật; không loop joke vô hạn | Manual lên ngay/chậm/đứng xa/bỏ đi/quay lại/miss hai lần; video cue; âm thanh và motion đúng nhịp | 12–24h |
| P3 — vé và chuyến đi | S04–S05: cabin/seats/rail, fare state, phone/wallet, crowd/stop cue; AudioDirector, interaction seat nếu giữ; tests | P2; chốt S04 A/B, voice/rig pack | Người chơi xử lý vé rồi có khoảng nhìn/đi/ngồi, thấy xe chạy, tới UET | Helper có hình nếu A; thao tác có phản hồi; không narrate moving bus; thanh toán nhất quán chuyến về; không motion quá mạnh | Manual hai cách ngồi/đứng nếu giữ, chặn lối/nhường, dừng trước cue/đến cửa; headphone/mute/subtitles; memory/error metrics | 16–32h |
| P4 — Xuân Thủy và ba cách tìm đường | S06-A/B/C: map shell/dressing/collider/light/sign; group route/gaze; openable door/interior; tests Ch0/world event | P0 topology duyệt, P3; dùng cùng rig/cue contract P1 | Thực sự hỏi rồi đi, theo nhóm rồi quay, hoặc mở phòng sai và tự sửa | Ba cách đã duyệt giữ đủ; không hội tụ chỉ sau thoại; dẫn tới cùng đích bằng không gian; không làm GD4 thành Xuân Thủy | Chơi cả ba từ entry; tách nhóm/đứng chắn/đi sai/cửa không mở/quay lại; video door/gaze/sign; profiler cảnh đông | 20–40h |
| P5 — hoàn tất công việc và chuyến về | S07–S08: admin staff/desk/paper/inspection, waiting/look; walk-out/fare/ATM nếu duyệt; tests continuity | P4; S07 và phương án tiền vé đã duyệt | Đưa giấy → staff check → nhận hướng dẫn → tự ra stop và lên xe về | Task rõ, không bureaucracy minigame; xem quanh được khi chờ; tiền về không tự xuất hiện; callback không ép người làm đúng diễn sai | Manual bỏ ngang trước/sau trao giấy, xem giấy/trở lại, thử lên khi thiếu vé; check idempotence/locks/audio cleanup | 12–24h |
| P6 — kết chương, replay và checkpoint | S09, SceneTransitionDirector, Chapter0Ui/Runtime, SaveService và bootstrap nối restore; flyby/audio/camera; tests save/input | P3–P5; chốt vehicle/cut | Từ xe xuống gần trọ → flyby → màn kết Ch0; replay; resume qua mốc an toàn | Không chase/horror/finale; mất focus/loading fail hồi control; không Ch1 tự chạy; local fields được restore nhất quán; storage lỗi có cách chơi tiếp | Manual end/replay 2 lần, reload các checkpoint street/bus/uet/return, save hỏng/unavailable; test trạng thái tiền/branch/owner và audio không nhân đôi | 12–24h |
| P7 — toàn chương tới nghiệm thu | Chỉ sửa lỗi/polish trong phạm vi Ch0 và shared module bị ảnh hưởng; update progress/evidence, không mở chapter | P1–P6 đạt, creative decisions chốt | Ch0 final candidate đầu-cuối và mọi local route | Toàn gate §8; không placeholder critical; hạn chế nhỏ được user chấp nhận | Manual full routes + robustness matrix; release build Chrome/WebGPU và WebGL fallback; metrics/error/network/video; user chơi nghiệm thu | 16–32h |

Tổng cộng **108–216 giờ hữu ích**; dự phòng khoảng 20–30% cho cleanup/retarget/voice/rework: khoảng **130–280 giờ**, cần đánh giá lại sau P1. Nếu cần dựng nhân vật/xe/topology chính xác từ đầu hoặc cinematic lip sync cao hơn, dừng để cập nhật phạm vi/ước lượng; không âm thầm hạ chất lượng cuối xuống mannequin.

### Thứ tự và kiểm soát nghiệm thu

- [ ] Người dùng duyệt kế hoạch và phương án cần cho P1; ghi rõ phần duyệt, không “approved all” cho cả draft.
- [ ] P0 dựng baseline; review chỉ file reuse A/P cần dùng, tránh merge whole worker.
- [ ] P1 chứng minh một tình huống đủ hình/âm/interaction; user xem mẫu chất lượng, cập nhật ước lượng.
- [ ] P2–P5 lần lượt nối các tình huống thành toàn chương; mỗi gói có nhánh riêng/commit/evidence và checklist đạt.
- [ ] P6 hoàn tất kết chương/replay/restore; lưu ở mốc an toàn, không serialise giữa animation chưa xong. Đề xuất checkpoint S02 sau call, S04 vào bus, S06 entry UET, S08 sau admin và terminal Ch0; tiền/nhánh theo checkpoint phải khôi phục đủ.
- [ ] P7 nghiệm thu toàn bộ Ch0; người dùng chơi và chấp nhận; chỉ sau đó mới lập kế hoạch Ch1.

Không cần chờ full prop library trước map, nhưng không bỏ NPC/audio sang cuối. Gói downstream chỉ làm sau dependency đạt; phần thiếu canon có thể dùng candidate trong môi trường kỹ thuật, không ship hoặc gọi final.

## 7. Quyết định thật sự cần người dùng duyệt

Không hỏi lại tên Bắc/tính cách core, driver có tái xuất, spine bus/UET/return, ba cách tìm đường hoặc câu đèn đỏ. Các quyết định dưới đây là **phần mở**, có phương án cụ thể:

1. **Thoại/diễn xuất/diện mạo để sản xuất P1:** review S01 và S02A trong script hiện có (giữ voice Bắc tự nhiên, không trau chuốt). Đề xuất gọi mẹ tự chạy như chỉ đạo mới; giọng Việt có phụ đề cho thoại trọng yếu, không cần lip sync điện ảnh, nhưng NPC phải gaze/gesture đúng cue. Visual đề xuất người có tỷ lệ thực, stylized nhẹ với PBR/readable light; xem một mẫu driver và POV hands/phone trước batch. Phương án realism cao có chi phí retarget/face lớn hơn. Driver chưa cần tên mới; logo Grab thật hay trang phục xe công nghệ hư cấu cần chốt, đề xuất hư cấu visual trong khi giữ chức năng người dùng.
2. **S04 và tiền vé chuyến về:** A — helper vô danh trả hộ, Bắc thao tác điện thoại trả lại, S08 chuẩn bị tiền; đây là AI phát triển từ ví dụ user, code hiện dùng A nhưng chưa được xem là canon. B — staff hướng dẫn một phương thức vé hợp lệ theo tuyến/ngày được chốt, không helper; phải xác định cách giải quyết trước sản xuất. Đề xuất A nếu user muốn giữ reversal đời thường; ATM chỉ giữ khi cần continuity, không là minigame ngân hàng. Không tự khẳng định mọi bus cash-only.
3. **S07 và frame Xuân Thủy:** A — dùng cảnh ngắn draft: đưa giấy chung → staff check 2–3s → trả hướng dẫn → ra về; không khóa ngày/phòng/loại giấy khi chưa xác nhận. B — thay đúng phần này bằng chi tiết người dùng nhớ. Đề xuất A như phương án hư cấu được nhận diện để chương có task hoàn chỉnh; nếu user yêu cầu chính xác hồi ức thì B. Topology đề xuất chỉ khu entry/junction/phòng sai/admin/exit cần chơi, nhận diện Xuân Thủy qua reference được duyệt, không dựng master campus/official logo. Tuyến/ngày có thể để không nêu trong game; nếu nêu phải chốt và kiểm nguồn.
4. **S09:** đề xuất xe máy chạy trong lane cách người chơi, engine pan + camera reaction ngắn → nhìn lại hướng về trọ → cắt đen/màn kết; giữ câu user “Đến rồi. Đến nhà rồi. Xuống thôi.” như lời Bắc. Phương án khác: sau flyby trao quyền đi thêm vài giây rồi fade. Cả hai là kết Ch0, không kết toàn game; không chốt địa chỉ trọ, tai nạn hay nhân vật boy-phố quan trọng.

Duyệt kế hoạch không tự duyệt ngoại hình/thoại/canon toàn script. Câu đèn đỏ giữ nguyên; phần nền mới của AI vẫn ghi proposal và người dùng có thể review trong mẫu cảnh. Mọi quyết định ở đây đều có thể được duyệt theo gói để không bắt người dùng chốt toàn bộ ngoại hình mọi NPC trước P0.

## 8. Nghiệm thu cuối và điểm dừng

Phải có đủ, không dùng phép cộng test pass để thay nghiệm thu:

- [ ] Chơi **thủ công** từ cuộc gọi đến màn kết Ch0, gồm đường hỏi staff, theo nhóm, tự tìm/phòng sai và ít nhất một chuyến lỡ; không gọi debug performAction để vượt đoạn khó.
- [ ] Người chưa biết kịch bản hiểu mục tiêu qua cảnh/cue/NPC/UI vừa đủ. Có khoảng quan sát/thở/phản ứng; không liên tục đọc hộp thoại.
- [ ] Đứng yên/không vẫy; tự tìm stop sớm; đi sai/rời target; bỏ lỡ ambient; lỡ bus; bỏ nhóm; quay lại cửa; retry; E spam đều có đường tiếp tục hợp lý, không soft-lock.
- [ ] Không kẹt camera/input/pointer-lock, sau blur/ESC/loading error/save restore/cancel/replay. Lock được trả đúng owner; state/cue không chạy hai lần hoặc nhảy sai.
- [ ] Hình NPC/approach/gaze/point/door/paper/vehicle, thoại/cue/ambience/camera/chuyển cảnh khớp; không còn chữ kể thay hành động thiết yếu. Subtitles/mute và audio unlock đầu phiên hoạt động.
- [ ] Không mannequin/greybox/voice tạm/cue thiếu/model nền critical ở vị trí người chơi thấy và dùng. Asset có metadata/licensing và reviewEvidence; thất bại load critical được báo/retry, không che bằng im lặng.
- [ ] Tiến trình checkpoint/reload/replay không làm mất trạng thái tiền/nhánh; save hỏng/unavailable xử lý được; chưa tự mở Ch1. Nếu thực tế chương quá ngắn để cần resume, chỉ bỏ đề xuất save sau review thời lượng với người dùng, không mặc định có foundation là xong.
- [ ] Release build không có exception/console error hoặc network >=400 liên quan game chưa giải quyết; mọi ngoại lệ nhỏ có issue và được chấp nhận.
- [ ] Đo Ch0 thật ở street/board/bus/UET crowd/door/admin/flyby: hardware/browser/version/viewport/backend/commit/camera/state và số sample, FPS/frame time/hitch/load/memory/draw calls/mesh/vertex/texture/skeleton. Performance tool P sau review; `activeMeshes = scene.getActiveMeshes().length`, không cộng object renderer.
- [ ] GD4 builder/collision checkpoint giữ nguyên, không phục hồi PlayerSafetyController tự teleport; baseline 59–60 FPS của GD4 là lịch sử trên máy cũ, không phải số đo Ch0 hay bảo đảm mọi máy. Chốt ngưỡng Ch0 sau baseline P0/P1; tạm mục tiêu cảm giác mượt 60 FPS trên máy test được ghi, không che stutter bằng FPS trung bình.
- [ ] Có video full manual + clip các nhánh/ảnh trước-sau + log/runtime/metrics; danh sách hạn chế còn lại ghi mức độ và tác động. Autoplay vẫn chạy như kiểm tra bổ sung.
- [ ] **Người dùng chơi thử và chấp nhận Ch0.** Không coordinator/AI tự ký nghiệm thu cuối.

**Điểm dừng lượt này:** tài liệu và kế hoạch đã chuẩn bị để người dùng duyệt. Không triển khai gameplay mới hoặc Ch1. Sau nghiệm thu Ch0 mới dùng workflow đã kiểm chứng lập kế hoạch Ch1; không tự viết finale hoặc Ch4+.
