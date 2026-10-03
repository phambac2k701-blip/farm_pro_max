# UETốt — CHAPTER 0 SCRIPT / INTERACTION LAYOUT V0

Status: SELECTED WORKER DRAFT / NON-CANON / USER REVIEW REQUIRED
Lifecycle: selected recommendation only; no AI-added detail in this file is canonical by itself
Chapter: 0
Scope: narrative + script layout + interaction layout
Canon authority: User / primary writer
Bản sao rà soát: lấy nguyên nội dung worker tại `c5c0af12ac3a141431dd0c7674cb0c598ed70a06`; đây vẫn là **draft chờ duyệt**, không là final production spec.

Ưu tiên mới 03/10/2026: xem [START_HERE](../START_HERE.md) và [ma trận/kế hoạch](../PROJECT_MASTER_PLAN.md). Cuộc gọi mẹ cố định tự chạy, không bắt Tiếp từng câu; quyền camera/di chuyển do sequence giữ ngắn và trả rõ sau cất máy. Chi tiết cho xoay đầu nhẹ trong bản dưới là phương án cũ để tham khảo, không override chỉ đạo mới. S04 helper/S07 admin/S08 ATM và phương tiện/kết S09 vẫn chờ duyệt; code greybox không chứng minh canon. “Nghiệm thu” trong nhật ký tự phản biện là review bản viết của AI, không là người dùng nghiệm thu chương đã chơi.

Worker base: integration/uet-source-of-truth-reconciliation @ 4f8985f9abe12efd466b0caf342720d9554812af

## 1. Purpose

This document converts the current Chapter 0 story package into a playable first-person layout while preserving provenance and approval gates.

It is not a final screenplay.
It is not a production spec for final implementation.
It does not promote AI additions into canon.

The design target is:
- grounded Hanoi/UET student-life entry;
- curiosity + overload + humor;
- player-visible mistakes rather than narrated jokes;
- local micro-branches with authored reconvergence;
- concise, guarded-but-functional Bắc dialogue;
- no new major plot, no mystery, no Chapter 4+, no fifth major map.
## 2. Authoritative inputs read

Primary narrative inputs:
- docs/narrative/NARRATIVE_WORKER_ENTRYPOINT.md
- docs/narrative/UET_NARRATIVE_SKILL_V2.md
- docs/narrative/PROTAGONIST_CHARACTER_BIBLE_V0.md
- docs/narrative/CH0_LIVED_MATERIAL_LEDGER.md
- docs/narrative/CH0_STORY_PACKAGE_V0.md

Supporting source-of-truth:
- docs/design/NARRATIVE_EVENT_STYLE_V2.md
- docs/design/CURRENT_STORY_MACRO.md
- docs/design/CURRENT_WORLD_MAP_SCOPE.md
- docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md
- docs/design/USER_APPROVAL_GATES.md
- docs/AI_COORDINATION.md
- README.md
- docs/PROGRESS.md
- docs/PROJECT_MASTER_PLAN.md
- docs/GAMEPLAY.md
- docs/CONTENT_PIPELINE.md
- docs/SESSION_CONTINUITY.md
- docs/WORKING_RULES.md
- docs/DECISIONS/0001-browser-first-babylon.md

## 3. Context snapshot

### Locked / user-grounded facts and directions

- Protagonist name is Bắc.
- Bắc is intelligent, sharp, somewhat introverted depending on familiarity, socially functional with strangers, direct/blunt rather than polished, and naturally humorous.
- Chapter 0 begins around first arrival / first major Hanoi-UET contact.
- The bus mistake is grounded in user-recalled experience: Bắc waits roadside rather than at a marked stop and waves at buses that do not stop.
- A recurring Grab-driver seed replaces the old conductor-explains-the-rule version.
- The driver first approaches to offer a ride, realizes Bắc is new, then explains the bus-stop behavior / points toward the proper stop.
- The driver is approved to recur later, but identity/personality/appearance/relationship arc are not approved.
- The red-light micro-scene preserves the user-supplied line recorded in the lived-material ledger.
- At the proper stop, player inaction may cause a bus to leave; this is authored comedy, not failure.
- UET arrival uses a finding-the-correct-room / target-area structure with three accepted local approaches.
- The actual administrative interaction lacks sufficient lived detail and must remain bounded.
- Chapter 0 ends after the first UET visit and return trip toward the rented room.
- The return should show some learned familiarity rather than repeat the first bus mistake.
- After getting off near home, a "boy phố lướt qua" beat gives a quick ordinary-city sting.
- The flyby must remain an ordinary street beat rather than becoming a new plot.

### Approved-but-open details

- Exact scene dialogue.
- Exact timing of beats.
- Exact local branch presentation.
- Small connected micro-events that strengthen playability without changing chapter causality.
- Replaceable environmental texture around Xuân Thủy/Hanoi.
- Whether the optional helper-passenger idea survives.
- Exact ending rhythm after the flyby.

### Unknowns that must not be guessed as canon

- Exact mother dialogue and mother/Bắc conversational habits.
- Exact starting street.
- Exact bus route/number/operator.
- Exact story date inside the broad mid-to-late-2025 presentation window.
- Exact fare/payment rule on the bus Bắc uses.
- Whether the fare problem happened literally.
- Exact room/procedure for the UET administrative visit.
- Exact campus topology/signage.
- Exact rented-room location.
- Driver name, age, appearance, personality and later arc.
- Exact vehicle in the final flyby.
- Exact final Chapter 0 line.

### Forbidden scope

- New important NPC canon.
- Fifth major map.
- Chapter 4+ content.
- Permanent route split from ordinary mistakes.
- Mystery/horror escalation.
- Official UET visual branding or campus topology treated as approved.
- Fabricated lived experience presented as memory.
- Meme insertion that is not causally useful.

## 4. Research delta used in this pass

Research is environmental/contextual only and does not overwrite user memory.

### R-CH0-01 — UET address anchor

Official UET pages identify the University of Engineering and Technology at 144 Xuân Thủy, Cầu Giấy, Hà Nội.

Use:
- supports Xuân Thủy as a credible Chapter 0 place anchor;
- does not authorize a full canonical campus map;
- does not authorize official logos, exact signage, or institutional visual identity.

Source:
- https://uet.vnu.edu.vn/lien-he/

### R-CH0-02 — Metro texture in the 2025 window

Hanoi reported on 8 August 2025 that the elevated Nhổn–Cầu Giấy section of Metro Line 3.1 had been operating for one year, after commercial operation began on 8 August 2024.

Use:
- a visible/elevated-metro presence can be proposed as Xuân Thủy/Cầu Giấy environmental texture;
- only use it where the actual scene geography supports it;
- do not force a metro beat into a bus route whose exact path is still unknown.

Source:
- https://hanoi.gov.vn/tin-so-nganh/sau-1-nam-van-hanh-metro-nhon-ga-ha-noi-phuc-vu-tren-64-trieu-luot-khach-4250808215021297.htm

### R-CH0-03 — Bus payment reality in the 2025 window

A June 2025 Hanoi decision on interoperable public-transport ticketing explicitly described both electronic and cash payment for bus single fares. This is more useful than the earlier generic "cashless rollout" note.

Interpretation:
- cash still existed as a legitimate single-fare method in the 2025 transition;
- electronic public-transport payment also existed / was being rolled out;
- an ad-hoc person-to-person bank transfer to bus staff is not the same as using the official electronic-ticket system;
- therefore "Chuyển khoản được không ạ?" is a plausible new-user question, but "bus is universally cash-only" is not safe to state as fact.

Use in S04:
- staff rejects direct transfer to themselves;
- asks whether Bắc has cash or the supported electronic-ticket method;
- helper-passenger treatment remains fictionalized/proposed.

Sources:
- https://hanoi.gov.vn/tin-tuc-su-kien-noi-bat/thong-tin-chi-dao-dieu-hanh-cua-ubnd-thanh-pho-chu-tich-ubnd-thanh-pho-ha-noi-ngay-27-6-2025-42506271935017.htm
- https://hadong.hanoi.gov.vn/xay-dung-do-thi/ve-lien-thong-da-phuong-thuc-bat-dau-ap-dung-o-ha-noi-2809250629133018049.htm

### R-CH0-04 — Real UET 2025 admission workflow

Official UET material dated 24–27 August 2025 documents:
- direct admission at 144 Xuân Thủy;
- program/time-specific locations on 24 August 2025;
- students unable to attend that day being directed to room 104-E3 from 25 August until before 5 September 2025;
- after direct admission, students receiving admission/confirmation material plus instructions for online profile completion.

Use in S07:
- supports a concrete research-based candidate instead of an empty placeholder;
- does **not** prove that Bắc's remembered day, room or exact procedure matched this public 2025 workflow;
- exact date/location/documents remain TBD_USER_APPROVAL.

Sources:
- https://uet.vnu.edu.vn/truong-dai-hoc-cong-nghe-dai-hoc-quoc-gia-ha-noi-san-sang-chao-don-tan-sinh-vien-k70-tai-ngay-hoi-nhap-hoc/
- https://uet.vnu.edu.vn/huong-dan-thu-tuc-nhap-hoc/

### R-CH0-05 — Internet-culture check: "67"

Vietnamese coverage in late 2025 confirms "67 / six-seven" as a widely circulated 2025 brainrot-style meme with deliberately unstable/no fixed meaning. Reporting also notes strong growth during 2025.

Use:
- confirms the style guide's reference is date-plausible;
- the mechanism is more useful than the token itself: meaningless repetition, social recognition, overuse becoming the joke.

Source:
- https://hoahoctro.tienphong.vn/giai-ma-67-trao-luu-kho-hieu-duoc-vinh-danh-tu-vung-cua-nam-2025-post1792065.tpo

### Research ruling

No concrete "67", "36", or stale catchphrase is inserted into mandatory Chapter 0 dialogue.
The current scenes are stronger when humor comes from action, delay, repetition, interrupted answers and wrong assumptions. Concrete meme tokens remain replaceable optional texture rather than causal story content.

## 5. Chapter-level playable arc

Chapter state progression:

new city, low familiarity
→ ordinary bus-rule mistake
→ learns one practical Hanoi rule
→ successfully boards / handles first transit friction
→ observes city rather than being told about it
→ reaches UET but lacks local spatial knowledge
→ chooses how to find the target
→ reaches bounded administrative objective
→ returns using newly learned behavior
→ "home" begins to feel like a usable reference point
→ city immediately reminds Bắc it is still slightly chaotic

Primary emotional rhythm:

ordinary family contact
→ confusion
→ deadpan correction
→ small competence gain
→ sensory breathing room
→ navigation uncertainty
→ local comic recovery
→ relief
→ quick final jolt
→ cut

No major persistent branch is required.

## 6. Recommended state model for the draft

These are narrative-state proposals, not approved runtime schema.

### High-value continuity state

CH0_KNOWS_MARKED_BUS_STOP_RULE
- write: after Grab-driver explanation and/or player reaches the proper stop;
- consume: return-trip behavior in CH0-S08;
- persistence beyond Chapter 0: TBD_USER_APPROVAL, only if later chapters actually use it.

### Event-local state only

CH0_WRONG_ROADSIDE_ATTEMPTS
- count only enough to control escalation/timing;
- do not persist.

CH0_MISSED_FIRST_VALID_BUS
- boolean for the optional inaction gag;
- do not persist unless a later callback is deliberately approved.

CH0_NAV_STRATEGY
- ask_staff / follow_students / self_navigate;
- only needed inside CH0-S06 for branch-specific reaction and reconvergence;
- no long-term route value currently.

CH0_HEARD_RED_LIGHT_LINE
- default: do not persist;
- promote only if the user later approves a callback.

CH0_NEEDS_RETURN_FARE
- event-local boolean used only if the helper-passenger S04 treatment is selected;
- write after the helper covers the first fare and Bắc still lacks a return-fare method;
- consume in CH0-S08 to trigger the ATM/cash-preparation micro-beat;
- clear after preparation;
- do not persist beyond Chapter 0.

## 7. Scene graph overview

CH0-S01 Mother call / handoff to player
→ CH0-S02 Wrong roadside bus attempts
→ CH0-S02A Grab-driver first encounter
→ CH0-S02B Red-light / roadside micro-slot
→ CH0-S03 Proper bus stop + boarding
→ CH0-S04 Fare/payment friction module
→ CH0-S05 Bus ride / Hanoi texture
→ CH0-S06 UET arrival + three-way navigation micro-branch
→ CH0-S07 Research-based administrative treatment / approval-sensitive
→ CH0-S08 Leave UET + learned return behavior
→ CH0-S09 Get off near home + boy-phố flyby
→ Chapter 0 end

The suffix beats are not new major story events. They are interaction/ambient subdivisions of the existing spine.

# 8. Nội dung truyện Chương 0 / kịch bản / bố cục tương tác có thể chơi được

Phần này là **bản Chương 0 thực sự để đọc và hình dung như một màn chơi**.

Quy ước:
- toàn bộ câu thoại mới vẫn ở trạng thái **đề xuất / đã chọn**, chưa tự động trở thành nội dung chính thức;
- câu thoại người dùng đã cung cấp phải được giữ nguyên;
- chỗ nào thiếu ký ức thật sẽ ghi rõ là dựa trên nghiên cứu hoặc cần người dùng duyệt;
- ưu tiên góc nhìn thứ nhất và quyền điều khiển của người chơi thay vì cutcảnh dài.

Ký hiệu:
- **MẸ / BẮC / TÀI XẾ / NHÂN VẬT NỀN / NHÂN VIÊN**: thoại nói ra;
- **[NGƯỜI CHƠI ĐIỀU KHIỂN]**: người chơi có quyền nhìn/đi/chọn;
- **[NHỊP]**: khoảng dừng có chủ ý;
- **[NGƯỜI CHƠI KHÔNG LÀM GÌ]**: phản ứng của thế giới khi người chơi đứng yên;
- **[ĐỀ XUẤT]**: phần AI phát triển thêm, chưa nội dung chính thức;
- **[TBD_USER_APPROVAL]**: cần người dùng quyết định trước khi chốt nội dung chính thức.

Bản mặc định dưới đây phải đọc liền được từ đầu đến cuối như một Chương 0 hoàn chỉnh.

## CH0-S01 — Cuộc gọi với mẹ / đứng một mình giữa Hà Nội

Nguồn:
- mở đầu do người dùng định hướng;
- thoại cụ thể dưới đây là **ĐỀ XUẤT**, vì người dùng chưa cung cấp nguyên văn cuộc gọi thật.

Trạng thái đầu cảnh:
- Bắc vừa lên Hà Nội;
- đang gọi điện với mẹ;
- chưa biết quy tắc phải đứng đúng điểm dừng xe buýt.

### Diễn biến

Chương mở ngay giữa cuộc gọi, không có đoạn kể tiểu sử dài.

Tiếng đường phố vào trước: tiếng động cơ, một tiếng còi ngắn, tiếng lốp lăn trên mặt đường. Điện thoại vẫn ở gần tai Bắc.

**MẸ:** "Đến nơi chưa con?"

**BẮC:** "Con đến rồi."

**MẸ:** "Thế giờ sang trường luôn à?"

**BẮC:** "Vâng. Con đang ngoài đường đây. Lát con đi."

Góc nhìn không bị khóa hoàn toàn. Người chơi có thể xoay đầu nhẹ nhìn trời, đường, xe cộ, người đi qua.

**MẸ:** "Có gì không biết thì hỏi người ta. Đừng tự mò xong lại đi vòng."

Bắc nhìn sang phía bên kia đường nửa giây.

**BẮC:** "Con biết rồi."

**MẸ:** "Biết thật không đấy?"

[NHỊP — khoảng 0,5 giây]

**BẮC:** "Chưa biết thì lát biết."

Câu này phải tự nhiên, hơi tỉnh, không cố làm punchline.

**MẸ:** "Ừ. Nhớ ăn uống."

**BẮC:** "Vâng. Con đi đã nhé."

**MẸ:** "Ừ, đi đi."

Cuộc gọi kết thúc.

[NHỊP — khoảng 1 giây]

Điện thoại vẫn ở trong tay Bắc. Không có lời dẫn bảo người chơi phải cảm thấy gì.

**[NGƯỜI CHƠI ĐIỀU KHIỂN — TOÀN PHẦN]**

Người chơi có thể:
- nhìn lên trời;
- nhìn dọc con đường;
- nhìn lại điện thoại;
- đi vài bước dọc vỉa hè.

Nếu người chơi đứng yên, thành phố vẫn tiếp tục: xe chạy, người đi, không ai tự đến hướng dẫn.

Một chiếc xe buýt tiến lại gần.

Khi người chơi nhìn về phía xe, tương tác hiện:

**[VẪY XE]**

Chuyển cảnh:
- người chơi vẫy hoặc để chiếc xe đầu tiên đi qua;
- CH0-S02 bắt đầu liền mạch, không cắt cảnh.

## CH0-S02 — Vẫy xe buýt sai chỗ

Nguồn:
- dựa trực tiếp trên ký ức người dùng;
- cách dàn dựng và nhịp là đề xuất.

### Lần thứ nhất

Xe buýt tới.

Nếu người chơi bấm **[VẪY XE]**, Bắc giơ tay.

Xe chạy qua.

Không có tiếng phanh.
Không có hiệu ứng thất bại.
Nó đơn giản là không dừng.

Bắc hạ tay.

[NHỊP — khoảng 0,7 giây]

**BẮC:** "Ơ?"

Người chơi có thể quay đầu nhìn theo xe.

Nếu người chơi không bấm gì, xe vẫn đi qua và cơ hội sau vẫn xuất hiện.

### Lần thứ hai

Một chiếc khác xuất hiện sau một khoảng ngắn.

Nút tương tác **[VẪY XE]** hiện lại.

Nếu người chơi vẫy, Bắc ra dấu rõ hơn.

Xe vẫn đi.

Bắc nhìn theo lâu hơn lần trước.

**BẮC:** "Không phải xe à..."

Bắc nhìn phía sau rồi nhìn phía trước.

**[NGƯỜI CHƠI ĐIỀU KHIỂN]**

Người chơi có thể:
- đứng nguyên chỗ;
- nhìn quanh tìm biển;
- xem điện thoại;
- đi vài bước;
- thử vẫy thêm một xe.

Không có giao diện nói "bạn đứng sai chỗ".

Nếu người chơi tự tìm thấy điểm dừng trước khi tài xế tới, cuộc gặp tài xế vẫn diễn ra nhưng đổi thoại:

**TÀI XẾ:** "Em đi đâu đấy? Lên anh chở."

**BẮC:** "Em đi buýt. Điểm dừng kia đúng không anh?"

Tài xế nhìn theo hướng Bắc chỉ.

**TÀI XẾ:** "Ừ, đúng rồi."

[NHỊP]

**TÀI XẾ:** "Mới lên Hà Nội à?"

**BẮC:** "Vâng."

**TÀI XẾ:** "Thế ra đấy đứng. Xe vào điểm mới đón."

**BẮC:** "Vâng, em cảm ơn."

Như vậy trò chơi công nhận việc người chơi đã tự quan sát ra đáp án.

### Lần thứ ba — chỉ xuất hiện nếu người chơi vẫn cố vẫy tại chỗ cũ

Xe thứ ba tới.

Bắc vẫy.

Nó lại đi qua.

[NHỊP — khoảng 1 giây]

Bắc giữ tay lơ lửng một nhịp rồi mới hạ xuống.

Không cần thoại.

Ngay sau đó nghe tiếng một xe máy/xe công nghệ chậm lại gần.

CH0-S02A bắt đầu trong cùng không gian.

## CH0-S02A — Lần đầu gặp tài xế Grab

Nguồn:
- chức năng nhân vật xuất hiện lặp lại và việc tài xế là người chỉ cách bắt xe buýt đã được người dùng duyệt;
- tên, tuổi, ngoại hình, tính cách cụ thể và hành trình nhân vật sau này vẫn TBD_USER_APPROVAL;
- thoại dưới đây là đề xuất.

Tài xế dừng ở khoảng cách nói chuyện bình thường, tư thế giống một người đang kiếm khách chứ không phải "NHÂN VẬT NỀN quan trọng".

**TÀI XẾ:** "Em đi đâu đấy? Lên anh chở."

Bắc nhìn tài xế rồi nhìn lại đường.

### Nhánh A — trả lời thẳng

**BẮC:** "Em đi xe buýt."

Tài xế nhìn vị trí Bắc đang đứng.

**TÀI XẾ:** "Xe buýt?"

[NHỊP — 0,5 giây]

**TÀI XẾ:** "Thế em đứng đây làm gì?"

**BẮC:** "Bắt xe."

Tài xế nhìn Bắc rồi nhìn mặt đường.

**TÀI XẾ:** "Mới lên Hà Nội à?"

Người chơi chọn một trong ba câu:

- **"Vâng. Em mới lên."**
- **"Sao anh biết?"**
- **"Em tưởng đứng đâu vẫy nó cũng dừng."**

#### A1 — "Vâng. Em mới lên."

**TÀI XẾ:** "Anh đoán thế. Xe buýt phải ra điểm dừng."

Tài xế chỉ xuống phía trước.

**TÀI XẾ:** "Thấy cái biển kia không? Ra đấy."

**BẮC:** "À. Bảo sao."

#### A2 — "Sao anh biết?"

Tài xế nhìn lại đúng chỗ Bắc vừa đứng vẫy xe.

**TÀI XẾ:** "Vì người quen đường không đứng đây vẫy xe buýt."

Bắc nhìn đường rồi nhìn lại tài xế.

**BẮC:** "Hợp lý."

Tài xế chỉ về điểm dừng.

**TÀI XẾ:** "Ra cái biển kia. Xe vào điểm dừng thì hẵng lên."

#### A3 — "Em tưởng đứng đâu vẫy nó cũng dừng."

**TÀI XẾ:** "Không. Xe buýt phải vào điểm dừng."

Tài xế chỉ.

**TÀI XẾ:** "Cái biển kia kìa."

Bắc nhìn theo.

**BẮC:** "À. Bảo sao."

Tài xế giữ cách nói thực dụng, chưa gán tính cách hài hước cố định.

### Nhánh B — Bắc đã chủ động hỏi trước

Nếu người chơi đã nhìn quanh tìm điểm dừng:

**BẮC:** "Anh ơi, điểm xe buýt ở đâu nhỉ?"

Tài xế chỉ.

**TÀI XẾ:** "Kia kìa. Em đứng lệch hẳn rồi."

**BẮC:** "Em đang tìm đây."

**TÀI XẾ:** "Ừ, ra kia là đúng."

### Kết cảnh

Dù đi nhánh nào:

**BẮC:** "Vâng, em cảm ơn anh."

**TÀI XẾ:** "Ừ."

Tài xế đi tiếp.

Không có:
- "hẹn gặp lại";
- nhạc báo nhân vật quan trọng;
- lời thoại báo trước việc sẽ tái ngộ.

Trạng thái:
- CH0_KNOWS_MARKED_BUS_STOP_RULE = true.

**[NGƯỜI CHƠI ĐIỀU KHIỂN — TOÀN PHẦN]**

Bắc đi về phía điểm dừng vừa được chỉ.

## CH0-S02B — Đèn đỏ / câu chuyện lọt vào tai

Nguồn:
- câu thoại chính do người dùng cung cấp;
- bối cảnh xung quanh là đề xuất.

Cảnh này chỉ là không khí nền sự kiện nhỏ trên đường tới điểm dừng.

Người chơi phải dừng chờ đèn đỏ cùng vài người khác.

Hai NHÂN VẬT NỀN gần đó đang nói chuyện từ trước khi Bắc tới.

Nếu người chơi nhìn về phía họ:

**NGƯỜI 1:** "Tôi nổi tiếng, đẹp trai, nhà giàu, tôi có gì không tốt?"

NHÂN VẬT NỀN 2 quay sang.

[NHỊP — khoảng 1 giây]

Đèn chuyển xanh.

NHÂN VẬT NỀN 2 nhìn đèn thay vì trả lời.

**NGƯỜI 2:** "Đi."

NHÂN VẬT NỀN 2 bước qua đường.

NHÂN VẬT NỀN 1 đi theo, vẫn không nhận được câu trả lời.

Không có lời dẫn giải thích trò gây cười.

Nếu người chơi không nhìn:
- câu thoại vẫn có thể nghe lệch từ bên cạnh;
- không có thông tin quan trọng bị mất.

Nếu người chơi đứng chắn dòng người sau khi đèn xanh:

**NGƯỜI PHÍA SAU:** "Bạn ơi."

Chỉ cần vậy để Bắc/người chơi tự tránh sang.

Không cần lưu dài hạn trạng thái trừ khi sau này người dùng muốn biến câu này thành gợi nhắc lại.

Chuyển:
- điểm dừng xe buýt hiện ra;
- CH0-S03.

## CH0-S03 — Đến đúng điểm dừng / có lên hay không

Nguồn:
- lối chơi idea do người dùng đề xuất.

Bắc tới đúng điểm dừng.

**[NGƯỜI CHƠI ĐIỀU KHIỂN]**

Người chơi có thể:
- nhìn biển điểm dừng;
- nhìn người đang chờ;
- đứng sát hoặc lùi một chút;
- chờ xe.

Một chiếc xe buýt tới và dừng.

Cửa mở.

Tương tác hiện:

**[LÊN XE]**

### Nhánh 1 — lên ngay

Bắc bước lên theo dòng người.

Không có âm thanh "success".

Chuyển thẳng sang S04.

### Nhánh 2 — người chơi chần chừ

Nếu người chơi chưa bấm ngay, nhân viên nhắc tự nhiên:

**NHÂN VIÊN:** "Có lên không em?"

Tương tác vẫn mở thêm một khoảng ngắn.

Nếu người chơi lên:

**BẮC:** "Có ạ."

Bắc bước lên.

Nếu người chơi vẫn không làm gì:

Cửa đóng.

Nhân viên nhìn thẳng Bắc qua cửa.

[NHỊP — khoảng 0,8 giây]

Xe buýt chạy đi.

Bắc nhìn theo.

[NHỊP — khoảng 0,8 giây]

**BẮC:** "Rồi."

Không hiện màn hình thất bại.

Khoảng chờ được nén lại. Một xe hợp lệ khác tới sau thời gian ngắn.

Lần sau tương tác rộng hơn để người chơi lên.

Nếu người chơi cố tình không lên lần nữa, trò chơi không lặp trò gây cười vô hạn. Sau một lần miss có authored reaction, các lần sau chỉ là người chơi thử hệ thống.

## CH0-S04 — Tiền vé / "chuyển khoản được không?"

Nguồn:
- người dùng đã đề xuất vướng mắc về thanh toán;
- hành khách trả hộ là giả định/chi tiết hư cấu đề xuất;
- tuyến và cơ chế vé cụ thể chưa nội dung chính thức.

Nghiên cứu cho thấy năm 2025 Hà Nội có cả vé lượt thanh toán bằng tiền mặt và hệ thống vé điện tử. Vì vậy cảnh này không được khẳng định "toàn bộ xe buýt chỉ nhận tiền mặt".

### Phương án dựng cảnh A — đề xuất mạnh nhất: không chuyển khoản trực tiếp cho nhân viên, hành khách trả hộ

Bắc vừa lên xe.

Nhân viên tới kiểm tra/thu vé.

**NHÂN VIÊN:** "Vé em."

Bắc lấy điện thoại.

**BẮC:** "Chuyển khoản được không ạ?"

Nhân viên nhìn điện thoại rồi nhìn Bắc.

**NHÂN VIÊN:** "Không chuyển khoản trực tiếp cho cô/chú được. Em có tiền mặt hoặc thẻ vé điện tử không?"

Bắc mở ví.

[NHỊP]

Bắc kiểm tra thêm một túi nữa dù lần đầu gần như đã đủ kết luận.

**BẮC:** "Em không mang tiền mặt."

**NHÂN VIÊN:** "Thẻ vé?"

**BẮC:** "Em chưa có."

Nhân viên thở nhẹ, không biến thành nhân vật cáu gắt quá mức.

**NHÂN VIÊN:** "Lần sau chuẩn bị trước nhé. Lên xe rồi mới hỏi thế này là khó cho người ta."

Bắc không cãi.

**BẮC:** "Vâng. Em mới đi lần đầu."

Một hành khách gần đó nghe được.

**HÀNH KHÁCH:** "Bạn chuyển khoản được đúng không?"

Bắc quay sang.

**BẮC:** "Được."

**HÀNH KHÁCH:** "Thế để tôi trả giúp. Bạn chuyển tôi."

[NHỊP — 0,4 giây]

Bắc nhìn nhân viên rồi nhìn hành khách.

**BẮC:** "Ừ, thế được. Cảm ơn bạn."

Hành khách thanh toán tiền vé bằng phương thức hợp lệ.

**NHÂN VIÊN:** "Hai bạn xử lý nhanh nhé."

Người chơi có tương tác điện thoại ngắn:
- quét/chuyển khoản cho hành khách;
- xác nhận hoàn tất.

Không dùng tên ngân hàng, số tài khoản hay dữ liệu cá nhân thật.

**BẮC:** "Xong rồi."

Hành khách kiểm tra điện thoại.

**HÀNH KHÁCH:** "Ừ."

Bắc cất điện thoại.

Không có đoạn làm quen dài.
Không hỏi trường nào, quê đâu.
Không biến hành khách thành nhân vật xuất hiện lặp lại.

Nếu Phương án dựng cảnh A được duyệt:
- đặt CH0_NEEDS_RETURN_FARE = true;
- S08 phải xử lý việc Bắc cần chuẩn bị cách trả tiền cho chuyến về.

### Phương án dựng cảnh B — không dùng hành khách trả hộ

Giữ mở đầu:

**BẮC:** "Chuyển khoản được không ạ?"

**NHÂN VIÊN:** "Không chuyển khoản trực tiếp. Em dùng tiền mặt hoặc phương thức vé điện tử của hệ thống."

Phần giải quyết sau đó phải dựa đúng tuyến/ngày/dịch vụ được người dùng chốt:
- nếu phương thức vé điện tử hợp lệ thì nhân viên hướng dẫn mức tối thiểu;
- nếu không thì cần cách giải quyết khác được người dùng duyệt.

Hiện tại Phương án dựng cảnh A mạnh hơn về nhịp truyện vì câu hỏi "chuyển khoản" được đảo lại một cách đời thường: không chuyển cho nhân viên được, nhưng lại chuyển cho người vừa trả hộ.

Trạng thái:
- vẫn TBD_USER_APPROVAL_HELPER_PASSENGER.

## CH0-S05 — Ngồi trên xe / Hà Nội bắt đầu thành một nơi thật

Nguồn:
- hướng cấu trúc do người dùng cho phép;
- chi tiết không khí môi trường là nghiên cứu-dựa trên và có thể thay.

Sau S04, quyền điều khiển quay lại.

Xe buýt chuyển bánh khi Bắc còn đang cất điện thoại.

Góc nhìn/body dịch nhẹ theo quán tính.

Nếu người chơi đang đứng:
- Bắc bám tay vịn;
- không cần thoại.

Nếu có ghế trống và người chơi nhìn vào:
- hiện **[NGỒI]**.

Đây chỉ là lựa chọn biểu đạt, không tạo tuyến.

Nếu người chơi ngồi cạnh cửa sổ:
- bên ngoài chi tiết không khí nổi bật hơn.

Nếu người chơi đứng:
- hành khách, cửa xe, chuyển động gần nổi bật hơn.

Nếu Phương án dựng cảnh A đã dùng hành khách trả hộ, người đó không tự bắt chuyện tiếp.

Sự im lặng này có chủ ý: giúp nhau một việc không tự động tạo quan hệ.

### Chi tiết bên ngoài

Người chơi có thể nhìn ra cửa sổ.

Chỉ dùng vài chi tiết rõ:
- xe máy, ô tô, xe buýt đan dày;
- mặt tiền cửa hàng và biển;
- nhịp dừng/chạy của giao thông;
- cảm giác khu vực thay đổi dần khi tiến gần Xuân Thủy/Cầu Giấy.

Có thể dùng chi tiết metro trên cao nếu tuyến cuối cùng thực sự nhìn thấy:
- đoạn trên cao Nhổn–Cầu Giấy đã vận hành từ 08/08/2024;
- nên xuất hiện năm 2025 là hợp lý;
- nếu tuyến không đi qua góc nhìn đó thì bỏ.

Không để nhân vật tự dưng đọc bài thuyết minh về metro.

### Một nhịp nhỏ trong xe

Tới một điểm dừng, người xuống xe chen qua.

**HÀNH KHÁCH:** "Cho mình xuống với."

Người chơi cần tránh sang.

Nếu người chơi chắn quá lâu:

**HÀNH KHÁCH:** "Bạn ơi, cho mình qua."

Bắc nhường.

**BẮC:** "À, xin lỗi."

Không cần biến mọi thứ thành trò gây cười; nhịp này làm xe buýt có cảm giác thật.

### Chuẩn bị xuống gần UET

Cue điểm dừng vang lên.

Người chơi có thể:
- đứng dậy nếu đang ngồi;
- đi gần cửa;
- nhìn ra ngoài lần cuối.

Không chốt tên điểm dừng cụ thể khi tuyến còn chưa duyệt.

Xe buýt dừng.

Bắc xuống.

Âm thanh ngoài đường mở rộng.

CH0-S06 bắt đầu.

## CH0-S06 — Lần đầu vào UET / tìm chỗ cần đến

Nguồn:
- cấu trúc ba hướng tìm đường đã được người dùng chấp nhận;
- bố cục không gian, phòng và biển cụ thể chưa nội dung chính thức.

### Nhịp nhìn đầu tiên

Bắc rời khu vực xe buýt.

**[NGƯỜI CHƠI ĐIỀU KHIỂN — TOÀN PHẦN]**

Trong vài giây không ai nói gì.

Người chơi thấy:
- sinh viên đi lại có mục đích;
- người đứng chờ hoặc xem điện thoại;
- các tòa/biển có thông tin cục bộ nhưng không đủ để người mới nhìn một phát hiểu toàn bộ khuôn viên.

Mục tiêu:

**TÌM CHỖ LÀM THỦ TỤC**

Không hiện số phòng cụ thể nếu chưa được duyệt.

Môi trường cho thấy ba cách:

A. hỏi guard/nhân viên;
B. đi theo một nhóm sinh viên trông rất tự tin;
C. tự đọc biển/xem điện thoại.

### CH0-S06-A — Hỏi người có vẻ biết

Bắc tới gần guard/nhân viên.

**BẮC:** "Chú ơi, cho em hỏi chỗ làm thủ tục nhập học đi hướng nào ạ?"

Cách xưng hô sẽ chỉnh theo NHÂN VẬT NỀN cuối cùng.

Nhân viên chỉ vào trong.

**NHÂN VIÊN/BẢO VỆ:** "Em đi thẳng vào trong, qua sảnh rồi hỏi tiếp bàn phía trong nhé."

Bắc nhìn hướng đó. Có vài lối đủ khiến người mới vẫn chưa chắc.

**BẮC:** "Phía trong là bên nào ạ?"

Nhân viên chỉ rõ hơn.

**NHÂN VIÊN/BẢO VỆ:** "Cứ đi thẳng đã. Vào đến sảnh sẽ có người chỉ."

**BẮC:** "Vâng, em cảm ơn chú."

**[NGƯỜI CHƠI ĐIỀU KHIỂN]**

Người chơi tự đi.

Ở junction sau có:
- dấu hiệu hướng dẫn tạm;
- vài sinh viên khác đang hỏi đường;
- đường tới vùng đích chung.

Nếu người chơi lại đi nhầm, nhân viên gọi từ sau:

**NHÂN VIÊN/BẢO VỆ:** "Em ơi, bên kia."

Bắc quay lại.

**BẮC:** "Vâng."

Không có quest reset.

### CH0-S06-B — Đi theo nhóm trông rất tự tin

Một nhóm sinh viên đi nhanh, dứt khoát, trông như biết đường.

Người chơi đi theo.

Không mở thoại ngay.

Nhóm rẽ một lần.
Rẽ lần nữa.

Một người chậm lại, xem điện thoại.

Người khác nhìn biển.

Độ tự tin bắt đầu đáng nghi.

Một sinh viên phát hiện Bắc đi theo.

**SINH VIÊN 1:** "Bạn cũng đi làm thủ tục à?"

**BẮC:** "Ừ."

**SINH VIÊN 1:** "Bạn biết chỗ không?"

[NHỊP]

**BẮC:** "Tôi đang đi theo mấy bạn mà."

Cả nhóm dừng.

[NHỊP — khoảng 0,6 giây]

**SINH VIÊN 2:** "Bọn tôi cũng đang tìm."

Bắc nhìn Student 2 rồi nhìn hành lang.

**BẮC:** "À. Thế là cả đám cùng không biết."

Student 1 cười nhẹ.

**SINH VIÊN 1:** "Chờ tí, để hỏi."

Một người hỏi nhân viên gần đó.

**NHÂN VIÊN GẦN ĐÓ:** "Bên kia em nhé."

Cả nhóm quay lại.

Người chơi có thể:
- đi cùng;
- hoặc tự tách ra sau khi đã biết hướng.

Tất cả hội tụ lại vì cuối cùng nhận cùng một thông tin.

Không ai được đặt tên hay biến thành xuất hiện lặp lại NHÂN VẬT NỀN.

### CH0-S06-C — Tự tìm bằng biển / điện thoại

Người chơi không hỏi ai.

Bắc kiểm tra biển/điện thoại rồi đi.

Nhánh này cho người chơi quyền điều khiển nhiều nhất và cũng dễ nhầm nhất.

Người chơi tới một cửa/phòng trông có vẻ hợp lý.

Tương tác:

**[MỞ CỬA]**

Bắc mở.

Mấy người trong phòng cùng nhìn ra.

Không có điểm nhấn âm thanh.

[NHỊP — khoảng 1 giây]

Một người hỏi:

**NGƯỜI TRONG PHÒNG:** "Em tìm phòng nào đấy?"

**BẮC:** "Em tìm chỗ làm thủ tục nhập học ạ."

NHÂN VẬT NỀN chỉ ra ngoài.

**NGƯỜI TRONG PHÒNG:** "Không phải phòng này. Em ra ngoài, đi bên kia."

**BẮC:** "Vâng. Em xin lỗi."

Bắc đóng cửa.

[NHỊP — khoảng 0,5 giây]

Từ góc mới, dấu hiệu đúng dễ thấy hơn.

Không có narrator nói "nhầm phòng".

Nếu người chơi chỉ tới gần nhưng không mở cửa, biển gần đó có thể giúp tự sửa trước khi trò gây cười xảy ra.

### Hội tụ lại S06

Ba cách khác nhau ở:
- ý định người chơi;
- reaction;
- một detour;
- một trò gây cười cục bộ.

Không khác nhau ở:
- tuyến lâu dài;
- mối quan hệ;
- kết quả Chương.

Tất cả tới cùng khu làm thủ tục.

## CH0-S07 — Làm thủ tục / phương án dựng cảnh dựa trên nghiên cứu, chưa nội dung chính thức

Nguồn:
- người dùng chưa cung cấp ký ức chi tiết về cuộc làm thủ tục;
- tài liệu UET tháng 8/2025 mô tả quy trình nhập học thực tế;
- vì vậy đây là **PHƯƠNG ÁN DỰNG CẢNH ĐỀ XUẤT DỰA TRÊN NGHIÊN CỨU**, không phải khẳng định đây chính xác là việc người dùng đã trải qua.

Nghiên cứu anchor:
- 24/08/2025 có lịch nhập học trực tiếp theo chương trình/thời gian;
- trường hợp không tới ngày đó có hướng dẫn tới phòng 104-E3 từ 25/08 đến trước 05/09;
- sau nhập học trực tiếp, sinh viên nhận giấy tờ/hướng dẫn và tiếp tục phần hồ sơ trực tuyến.

Không khóa:
- ngày cụ thể;
- phòng cụ thể;
- ngành/chương trình;
- danh tính nhân viên;
- loại giấy tờ chính xác của Bắc.

### Phương án dựng cảnh A — ngắn, cụ thể, giấy tờ không chiếm trọng tâm

Bắc tới bàn làm thủ tục.

Nhân viên ngẩng lên.

**NHÂN VIÊN:** "Em làm thủ tục nhập học đúng không?"

**BẮC:** "Vâng ạ."

**NHÂN VIÊN:** "Em đưa giấy tờ nhập học để kiểm tra nhé."

**BẮC:** "Vâng."

Tên giấy tờ được giữ ở mức chung vì ký ức thật chưa có.

Bắc đưa giấy.

Nhân viên kiểm tra thông tin trong danh sách/hệ thống.

[NHỊP — khoảng 2–3 giây]

Đây là một trong số ít khoảng im lặng của chương.

Người chơi có thể nhìn:
- bàn;
- chồng giấy;
- những sinh viên đang chờ;
- không gian xung quanh.

Nhân viên tìm thấy thông tin.

**NHÂN VIÊN:** "Bắc đúng không?"

**BẮC:** "Vâng."

**NHÂN VIÊN:** "Được rồi."

Nhân viên trả/đưa lại phần giấy tờ liên quan.

**NHÂN VIÊN:** "Được rồi. Em cầm mấy giấy này về, phần hồ sơ trực tuyến thì làm theo hướng dẫn nhé."

Bắc nhìn giấy rồi nhìn nhân viên.

**BẮC:** "Phần trực tuyến em về làm được ạ?"

**NHÂN VIÊN:** "Ừ. Nhớ làm trước hạn."

**BẮC:** "Vâng, em cảm ơn."

Quyền điều khiển trả lại.

Có thể có tương tác:
- **[XEM GIẤY HƯỚNG DẪN]**.

Chỉ hiện thông tin chung/được duyệt, không tự bịa giấy tờ 2025 cụ thể.

Không làm minitrò chơi điền form.

Không có monologue giới thiệu trường.

Hồi đáp vừa đủ:
- Bắc tìm được đúng chỗ;
- việc chính của chuyến đi được giải quyết.

Nếu người dùng nói phương án dựng cảnh này không giống ký ức thật:
- không cố giữ;
- thay S07 bằng tư liệu trải nghiệm thật người dùng cung cấp.

### Rời khu làm thủ tục

Bắc bước ra.

Người chơi đi lại qua phần không gian vừa mới khiến mình lạc.

Cùng một chỗ nhưng đã bớt khó hiểu một chút.

Đó là phần mang sang sau thật của cảnh.

CH0-S08 bắt đầu khi Bắc ra về.

## CH0-S08 — Rời UET / lần này không bắt xe kiểu cũ nữa

Nguồn:
- người dùng định hướng chuyến về;
- gợi nhắc lại việc bắt xe buýt là đề xuất;
- nhịp nhỏ chuẩn bị tiền phát triển từ tính liên tục S04.

### Ra ngoài

Bắc cất giấy tờ rồi rời khu làm thủ tục.

**[NGƯỜI CHƠI ĐIỀU KHIỂN — TOÀN PHẦN]**

Đường ra được trình bày gọn hơn lúc vào.

Trò chơi không bắt người chơi giải lại puzzle tìm đường y hệt.

Ra gần đường, một xe xe buýt chạy qua tầm nhìn.

Trong một khoảnh khắc rất ngắn, tay Bắc bắt đầu nhấc lên theo phản xạ.

Bắc nhìn thấy điểm dừng thật.

Tay dừng giữa chừng.

Không có narrator.

Bắc đổi hướng đi về điểm dừng.

Nếu người chơi đã tự đi thẳng đúng điểm dừng thì bỏ animation nửa-vẫy này.

### Nếu S04 dùng hành khách trả hộ

Trạng thái:
- CH0_NEEDS_RETURN_FARE = true.

Nghiên cứu UET cho thấy khu Xuân Thủy có ATM, nhưng vị trí chính xác chưa nội dung chính thức.

Trên đường ra, người chơi nhìn thấy ATM/biển ATM hợp lý.

Tương tác hiện.

**BẮC:** "À, rút tiền đã."

Người chơi thực hiện tương tác rút tiền được trừu tượng hóa.

Không hiện:
- PIN;
- ngân hàng;
- số tiền thật;
- dữ liệu tài chính.

Nhịp này chỉ tồn tại nếu cần giải tính liên tục cho tiền vé chuyến về.

Nếu S04 không dùng người giúp/tiền mặt vướng mắc thì bỏ toàn bộ đoạn ATM.

### Lên xe buýt về

Xe tới.

Lần này:
- không lặp trò gây cười "xe có dừng không";
- không tutorial dài;
- không bắt miss xe buýt lần nữa.

**[LÊN XE]**

Bắc lên.

Nếu phương án dựng cảnh thanh toán cuối cùng dùng tiền mặt:

**NHÂN VIÊN:** "Vé em."

Bắc đưa tiền.

Nhân viên xử lý.

Không ai nói câu giải thích "giờ em biết đi xe buýt rồi".

Sự thay đổi được thể hiện bằng việc mọi thứ vận hành trơn tru.

Nếu người dùng duyệt phương thức vé điện tử thì thay bằng tương tác tương ứng.

### Chuyến về

Chuyến xe về được nén nhanh hơn S05.

Một ít city movement.

Sau đó tiến gần điểm dừng gần phòng trọ.

CH0-S09.

## CH0-S09 — "Đến nhà rồi" / boy-phố lướt qua / hết Chương 0

Nguồn:
- kết cảnh do người dùng định hướng;
- chi tiết boy-phố do người dùng cung cấp;
- phương tiện cụ thể và câu cuối vẫn phụ thuộc phê duyệt.

Xe buýt giảm tốc ở điểm Bắc nhận ra là chỗ xuống gần trọ.

Bên ngoài vẫn mới, nhưng ít nhất một điểm dừng đã trở thành nơi Bắc nhận được.

Giữ wording người dùng:

**BẮC:** "Đến rồi. Đến nhà rồi. Xuống thôi."

Người chơi đi ra cửa và xuống xe.

### Nhịp thở ngắn

Xe buýt rời đi.

Khoảng một giây:
- âm thanh đường phố mở rộng;
- Bắc đứng lại trên đường;
- task chính của ngày gần như xong.

**[NGƯỜI CHƠI ĐIỀU KHIỂN]**

Người chơi có thể quay về hướng phòng trọ.

Ngay sau đó, một phương tiện lao nhanh qua vùng đường gần đó.

Nguyên tắc:
- đủ nhanh/ồn để giật mình;
- không đủ sát để biến thành tai nạn;
- phương tiện chính xác TBD_USER_APPROVAL;
- "boy phố" là energy của khoảnh khắc, không phải nhân vật mới.

Âm thanh và hình ảnh tới gần như đồng thời.

View của Bắc giật theo hướng xe vừa lướt.

[NHỊP — khoảng 0,8 giây]

Không chase.
Không góc nhìn ominous.
Không mystery điểm nhấn.

Xe đã đi mất.

### Kết cảnh đề xuất — cắt đen gây cười đột ngột

Bắc nhìn hướng trống thêm một nhịp.

Sau đó quay lại hướng "nhà".

Cắt đen.

**HẾT CHAPTER 0**

Đây là kết cảnh V0 được đề xuất vì:
- nhịp city-chaos rơi đúng;
- không cần bịa chính xác ngoại thất phòng trọ;
- kết bằng hành động/nhịp thay vì bài học đạo lý.

### Kết cảnh thay thế — đi thêm một đoạn

Nếu người dùng muốn kết mềm hơn:

Sau flyby:
- trả quyền điều khiển hoàn toàn;
- người chơi đi vài giây về hướng trọ;
- ambience ổn định lại;
- mờ dần trước khi phải lộ địa chỉ/phòng chính xác.

Không có độc thoại suy ngẫm.

### Trạng thái cuối Chương 0

Bắc:
- biết một quy tắc đi xe buýt thực tế;
- đã gặp xuất hiện lặp lại tài xế một cách rất bình thường;
- có chút familiarity đầu tiên với Xuân Thủy/UET;
- hoàn tất task UET đầu tiên trong phương án dựng cảnh được chọn;
- bắt đầu xem điểm dừng gần trọ như một mốc "về nhà".

Bắc không biến thành người khác chỉ sau một ngày.

Chương kết bằng việc "biết hơn một chút", không phải một bài học cuộc đời.

# 8A. Kiểm tra nhịp toàn Chương 0

Nhịp dự kiến, không khóa runtime:
1. gọi mẹ — yên, thân quen;
2. bắt xe buýt sai — chủ động nhưng rối;
3. tài xế Grab — xã hội điều chỉnh + hài;
4. đèn đỏ — không khí nền Hanoi;
5. đúng điểm dừng / có thể miss xe buýt — nhịp tương tác;
6. tiền vé — vướng mắc xã hội/thực dụng;
7. xe buýt ride — hạ nhịp;
8. tìm đường UET — lối chơi nhánh chính;
9. thủ tục — cách giải quyết thực dụng;
10. quay về — gợi nhắc lại + competence;
11. flyby — dấu chấm cuối.

Không cảnh nào cần cutcảnh dài để hoạt động.

# 9. Bộ tương tác theo từng cảnh

S01:
- nhìn;
- xem điện thoại;
- di chuyển.

S02:
- nhìn;
- chờ;
- vẫy xe;
- xem điện thoại;
- tự quan sát tìm điểm dừng.

S02A:
- nói chuyện/trả lời;
- nhìn theo hướng tài xế chỉ;
- di chuyển.

S02B:
- nhìn/nghe;
- chờ đèn;
- đi cùng dòng người.

S03:
- nhìn điểm dừng;
- chờ;
- lên xe;
- không làm gì để kích hoạt missed-xe buýt gag.

S04:
- nói chuyện;
- kiểm tra ví/điện thoại;
- nếu Phương án dựng cảnh A được duyệt: hành khách trả hộ + Bắc chuyển khoản lại;
- phương thức thanh toán cuối vẫn phụ thuộc tuyến/ngày/dịch vụ được duyệt.

S05:
- nhìn ra ngoài;
- ngồi/đứng;
- tránh đường cho hành khách;
- chuẩn bị xuống.

S06:
- quan sát;
- hỏi đường;
- đi theo;
- xem biển/điện thoại;
- mở/đóng cửa;
- tự điều hướng.

S07:
- tới bàn;
- nói chuyện;
- đưa giấy tờ chung;
- xem hướng dẫn;
- chính xác quy trình/ngày/địa điểm vẫn phụ thuộc phê duyệt.

S08:
- đi ra điểm dừng;
- nếu CH0_NEEDS_RETURN_FARE active thì có tương tác ATM/rút tiền;
- chờ;
- lên xe;
- hoàn thành tiền vé routine đã học.

S09:
- xuống xe;
- nhìn/phản ứng với flyby;
- có thể đi thêm một đoạn nếu chọn kết cảnh mềm.

Kết luận về lặp verb:
- các cảnh xe buýt cùng có chờ/lên xe nhưng chức năng narrative khác nhau;
- S06 cố ý đổi nhịp sang observation/navigation/xã hội choice để chương không thành một chuỗi "đứng chờ xe".

# 10. Tính liên tục đề xuất từ Chương 0

## CONT-CH0-01 — Quy tắc điểm dừng xe buýt

Loại:
- kiến thức/routine mới học.

Gieo từ trước:
- Bắc đứng sai chỗ vẫy xe.

Hồi đáp:
- tài xế chỉ đúng;
- Bắc lên xe đúng;
- chuyến về S08 diễn ra trơn tru hơn.

Không cần kéo sang chương sau trừ khi sau này có gợi nhắc lại thật.

## CONT-CH0-02 — Mầm nhân vật tài xế Grab xuất hiện lặp lại

Loại:
- xuất hiện lặp lại person.

Đã được duyệt:
- chức năng xuất hiện lặp lại;
- sẽ xuất hiện lại.

Chưa duyệt:
- tên;
- tuổi;
- ngoại hình;
- tính cách;
- mối quan hệ hành trình nhân vật.

Quy tắc:
- lần đầu phải trông như một cuộc gặp bình thường;
- không được báo trước bằng lời "sẽ còn gặp lại".

## CONT-CH0-03 — Ấn tượng đầu tiên về Xuân Thủy/UET

Loại:
- familiarity với địa điểm.

Trước S06:
- gần như bằng 0.

Sau S06/S07:
- chỉ tăng lên mức "biết dùng chỗ này hơn một chút".

Không tự biến thành emotional attachment lớn.

## CONT-CH0-04 — Câu ở đèn đỏ

Loại:
- không khí nền trò gây cười.

Mặc định:
- không tạo nghĩa vụ gợi nhắc lại.

Chỉ nâng cấp thành gợi nhắc lại nếu người dùng duyệt sau.

## CONT-CH0-05 — Nhận ra điểm dừng gần trọ

Loại:
- routine/địa điểm familiarity.

Chức năng:
- giúp kết cảnh có cảm giác Bắc đã có ít nhất một mốc quen.

Không suy ra:
- địa chỉ;
- neighborhood;
- layout phòng;
- mức độ gắn bó cảm xúc.

## CONT-CH0-06 — CH0_NEEDS_RETURN_FARE

Loại:
- trạng thái cục bộ.

Chỉ tồn tại nếu Phương án dựng cảnh A của S04 được duyệt.

Ghi:
- sau khi hành khách trả hộ và Bắc vẫn chưa có phương thức tiền vé cho chuyến về.

Dùng:
- S08.

Xóa:
- sau tương tác chuẩn bị tiền/phương thức vé.

Không persist qua Chương 0.

# 11. Kiểm tra tính nhất quán của Bắc

Bản này giữ các điểm đã được hồ sơ nhân vật khóa:
- Bắc vẫn nói chuyện bình thường với người lạ;
- hướng nội không bị viết thành im lặng;
- không overshare đời tư;
- câu nói ngắn, thẳng, tự nhiên;
- humor chủ yếu tới từ nhịp, quan sát và tình huống;
- không có monologue quá trau chuốt;
- không biến Bắc thành "nhân vật chính lúc nào cũng có câu đáp hoàn hảo".

Các phần vẫn chưa khóa:
- mức slang;
- mức chửi thề;
- cách xưng hô chính xác với nhân viên/người lớn;
- reaction khi bị mắng;
- nhịp nói cụ thể với mẹ;
- có dùng trào lưu mạng/stale trò gây cười chủ động hay không.

Vì vậy thoại V0 đủ để nghiệm thu nhưng chưa phải cuối khóa giọng thoại.

## tài xế Grab

Chỉ dùng knowledge/goal tối thiểu:
- thấy một người có thể là khách;
- tới mời;
- sau đó mới biết Bắc mới lên Hà Nội;
- chỉ cách bắt xe buýt.

Không tự gán:
- tính cách lớn;
- backstory;
- chemistry dài hạn.

## Nhân vật nền

Sinh viên/nhân viên/hành khách:
- chỉ phục vụ cảnh cục bộ;
- không tên;
- không biography;
- không tự tạo mối quan hệ.

# 12. Kiểm tra nhánh và hội tụ lại

## Vẫy xe buýt sai chỗ

Nhánh:
- vẫy tiếp;
- nhìn quanh;
- tự tìm thấy stop.

Hội tụ lại:
- tài xế encounter + tới đúng stop.

Điểm quan trọng:
- nếu người chơi tự phát hiện stop, thoại phải công nhận điều đó.

## Lên xe buýt

Nhánh:
- lên ngay;
- chần chừ;
- miss một chuyến.

Hội tụ lại:
- chuyến tiếp theo.

Không bad kết cảnh.

## Tìm đường ở UET

Nhánh:
- hỏi nhân viên;
- đi theo sinh viên;
- tự tìm.

Hội tụ lại:
- cùng tới đích area nhờ thông tin trong thế giới.

Không permanent tuyến.

## Kết cảnh

Hai phương án dựng cảnh:
- đột ngột cut;
- đi thêm một đoạn ngắn.

Đây là khác biệt presentation, không phải hai kết cảnh narrative khác nhau.

# 13. Kỷ luật chi phí sản xuất

Ưu tiên tái sử dụng:
- primary tương tác;
- look đíching;
- điện thoại inđặc tảt;
- thoại/reaction trạng thái;
- wait/boarding trigger;
- cục bộ nhánh cờ trạng thái;
- door tương tác;
- hội tụ lại trong phạm vi sự kiện.

Unique content đáng chi:
- Grab-tài xế encounter;
- xe buýt pass / missed-xe buýt presentation;
- wrong-phòng hình ảnh reaction;
- boy-phố flyby âm thanh/hình ảnh điểm nhấn.

Tránh:
- toàn bộ xe buýt simulator;
- toàn bộ chính thức khuôn viên bố cục không gian;
- unique animation cho mọi NHÂN VẬT NỀN nền;
- lưu dài hạn trạng thái cho trò gây cười một lần;
- bureaucracy minitrò chơi lớn khi tư liệu trải nghiệm thật còn thiếu.

# 14. Nhật ký tự phản biện và tự sửa — lượt đào sâu nội dung truyện

Bản này được nghiệm thu lại theo UET_NARRATIVE_SKILL_V2 sau khi viết toàn bộ câu chuyện.

Câu hỏi nghiệm thu chính:
**Đọc từ đầu tới cuối đã thấy Chương 0 thực sự xảy ra chưa, hay vẫn chỉ là dàn ý?**

## Phát hiện 1 — bản nháp cũ vẫn thiên về dàn ý

Mức độ:
- blocking đối với deliverable người dùng yêu cầu.

Vấn đề:
- Section 8 cũ chủ yếu nói purpose, nhánh shape và intent;
- nhiều cảnh chưa có action/thoại/reaction đủ để đọc như truyện.

Đã sửa:
- viết lại Section 8 thành một playable story liền mạch;
- S01–S09 đều có staging cụ thể;
- thêm thực tế thoại đề xuất;
- thêm nhịp;
- thêm người chơi-điều khiển window;
- thêm inaction behavior;
- thêm transition.

## Phát hiện 2 — một nhánh S02 từng vẫn chỉ nói "thoại sẽ đổi"

Mức độ:
- moderate.

Vấn đề:
- nếu người chơi tự tìm ra stop trước tài xế thì bản nháp cũ chỉ nói tài xế sẽ phản ứng khác, chưa viết thật.

Đã sửa:
- viết toàn bộ thoại nhánh riêng;
- tài xế xác nhận điểm dừng;
- vẫn tự nhiên phát hiện Bắc là người mới;
- không bắt người chơi đã biết đáp án phải giả vờ ngu.

## Phát hiện 3 — tài xế từng bị viết quá có tính cách

Mức độ:
- major.

Vấn đề:
- có version cho tài xế trò gây cười khá rõ;
- dễ lén nội dung chính thức hóa tính cách trêu chọc/hài hước.

Đã sửa:
- bỏ trò gây cười tính cách-defining;
- tài xế giữ thực dụng/conversational;
- hài tới từ chính tình huống: ride-hailing tài xế là người dạy Bắc cách bắt xe buýt.

## Phát hiện 4 — S04 cần độ chân thực và cách giải quyết thật

Mức độ:
- major.

Vấn đề:
- câu "không chuyển khoản, phải tiền mặt" dễ bị hiểu sai thành rule toàn hệ thống;
- bản nháp cũ chưa giải quyết cảnh đủ cụ thể.

Nghiên cứu:
- năm 2025 Hà Nội có cả tiền mặt và vé điện tử cho xe buýt.

Đã sửa:
- nhân viên từ chối chuyển khoản trực tiếp cho cá nhân, không khẳng định toàn hệ thống tiền mặt-only;
- hỏi tiền mặt/e-ticket;
- viết đầy đủ người giúp-hành khách phương án dựng cảnh;
- vẫn giữ phương án khác nếu người dùng không muốn người giúp.

## Phát hiện 5 — hành khách trả hộ tạo lỗ hổng về tính liên tục cho chuyến về

Mức độ:
- major.

Vấn đề:
- nếu Bắc không có tiền mặt/e-ticket lúc đi thì không thể tự nhiên có tiền lúc về.

Đã sửa:
- thêm CH0_NEEDS_RETURN_FARE;
- S08 có có điều kiện chuẩn bị nhịp;
- ATM presence ở khu Xuân Thủy có nguồn công khai support;
- chính xác ATM địa điểm vẫn không nội dung chính thức.

## Phát hiện 6 — S07 không có tư liệu trải nghiệm thật nhưng không thể để trống

Mức độ:
- major.

Vấn đề:
- người dùng yêu cầu thực tế story;
- để S07 là "TBD admin" khiến chương vẫn thủng;
- bịa như ký ức thật thì vi phạm provenance.

Đã sửa:
- nghiên cứu official UET 2025 admission workflow;
- viết Phương án dựng cảnh A ngắn, đọc được;
- giữ chính xác ngày/phòng/giấy tờ ở trạng thái cần người dùng duyệt;
- nếu ký ức thật khác thì thay cảnh.

## Phát hiện 7 — một số câu quá "văn vẻ quá mức"

Mức độ:
- moderate.

Đã sửa:
- rút gọn câu Bắc với nhóm sinh viên;
- làm thoại nhân viên S07 bình thường hơn;
- làm reaction ở ATM thực dụng hơn;
- bỏ những câu tồn tại chủ yếu để chứng minh nhân vật "thông minh/hài".

## Phát hiện 8 — nguy cơ nhét trào lưu mạng cho có

Mức độ:
- lựa chọnal nhưng liên quan style.

Nghiên cứu:
- "67 / six-seven" phù hợp window 2025 và là kiểu brainrot không có nghĩa ổn định.

Ruling:
- không nhét 67/36/bó tay chấm com vào mandatory thoại;
- chỉ lấy cơ chế humor: repetition, awkward silence, overconfidence, interruption.

## Phát hiện 9 — đoạn mở đầu ven đường có nguy cơ dày quá

Mức độ:
- moderate.

Đã giữ giới hạn:
- lần vẫy xe buýt thứ ba là lựa chọnal;
- red-light là không khí nền/skippable;
- thoại tài xế ngắn;
- missed-xe buýt gag chỉ authored một lần.

# 15. Ma trận phần còn cần người dùng duyệt

## Thoại / nhân vật

Cần người dùng duyệt:
- toàn bộ thoại cuộc gọi mẹ;
- cách xưng hô gia đình;
- sắc thái cuối của tài xế Grab;
- dùng thương hiệu Grab thật hay hư cấu hóa ride-hailing;
- tên/tuổi/ngoại hình/tính cách/hành trình nhân vật của tài xế;
- mức slang/chửi thề/xưng hô nhân viên của Bắc.

## Xe buýt / thanh toán

Cần người dùng duyệt:
- story ngày và tuyến/dịch vụ nếu muốn khóa độ chân thực;
- giữ hay bỏ tiền vé vướng mắc;
- có dùng hành khách trả hộ Phương án dựng cảnh A không;
- người giúp có chắc chỉ one-off không;
- có dùng S08 ATM/chuẩn bị hồi đáp không;
- thanh toán method cuối của chuyến về.

## UET

Cần người dùng duyệt:
- building/phòng/quy trình;
- ba nhánh S06 có giữ đủ cả ba không;
- cuối thoại từng nhánh;
- S07 Phương án dựng cảnh A có giống ký ức thật đủ để giữ không;
- ngày/địa điểm/giấy tờ cụ thể;
- official logo/signage/bố cục không gian nếu sau này dùng.

## Không khí nền / kết cảnh

Cần người dùng duyệt:
- context xung quanh câu red-light, còn câu người dùng cung cấp giữ nguyên;
- phương tiện boy-phố;
- đột ngột cut hay đi thêm một đoạn ngắn;
- giữ câu "Đến rồi. Đến nhà rồi. Xuống thôi." ở dạng spoken/internal như thế nào.

## An toàn ở mức bản nháp

Có thể giữ trong bản nháp mà chưa cần nội dung chính thức decision mới:
- nhỏ-nhánh + hội tụ lại;
- một missed-xe buýt gag;
- red-light skippable;
- wrong-phòng silence;
- không có permanent tuyến Ch0;
- nền NHÂN VẬT NỀN không tên;
- xe buýt-stop rule được hồi đáp ở chuyến về.

# 16. Phần mạnh nhất / yếu nhất còn lại

## Mạnh nhất

CH0-S02 → CH0-S02A.

Vì:
- bám tư liệu trải nghiệm thật;
- người chơi thật sự tham gia;
- mistake rất đời thường;
- tài xế xuất hiện vì lý do hợp lý;
- cảnh kết thúc bằng một kiến thức thực dụng mới.

Mạnh thứ hai:
- S06 ba nhánh tìm đường, đặc biệt wrong-phòng tuyến.

Vì:
- lựa chọn khác nhau thật về ý định;
- reaction khác nhau;
- hội tụ lại có nguyên nhân trong thế giới;
- hình ảnh hài không cần narrator.

## Yếu nhất

CH0-S07.

Lý do:
- giờ đã là cảnh đọc được, không còn placeholder;
- nhưng vẫn dựa trên quy trình UET 2025 công khai thay vì ký ức trải nghiệm thật người dùng;
- ngày/phòng/giấy tờ chưa xác nhận;
- khả năng sửa sau người dùng nghiệm thu cao nhất.

Rủi ro thứ hai:
- S04 hành khách trả hộ.

Lý do:
- giải quyết cảnh khá gọn;
- nhưng vẫn là fictional chi tiết hư cấu đề xuất;
- nếu người dùng thấy quá tiện thì phải thay.

Rủi ro sản xuất chính:
- file này không phải nguồn có thẩm quyền cho chính xác Xuân Thủy bố cục không gian;
- triển khai không được biến các đường/phòng/ATM tạm thời thành chính thức khuôn viên tái dựng.

# 17. Kết luận mức sẵn sàng

## Đã sẵn sàng

V0 này đủ để người dùng đọc và nghiệm thu như **nội dung truyện Chương 0 thật**.

Người dùng có thể đọc và đánh giá:
- Bắc nói gì;
- NHÂN VẬT NỀN nói gì;
- người chơi được điều khiển lúc nào;
- khoảng im lặng rơi ra sao;
- không làm gì thì chuyện gì xảy ra;
- từng nhánh phản ứng thế nào;
- chương đi từ cuộc gọi mẹ tới flyby cuối như thế nào.

Nó không còn là "khung để sau này mới viết truyện".

## Chưa sẵn sàng

Chưa phải:
- detailed nội dung chính thức đã người dùng duyệt;
- cuối thoại lock;
- cuối xây dựng tính cách của nhân vật quan trọng;
- cuối sản xuất đặc tả;
- nguồn có thẩm quyền cho chính xác khuôn viên bố cục không gian;
- cuối lịch sử/sự thật trải nghiệm ở S04/S07.

## Thứ tự nghiệm thu đề xuất cho người dùng

1. S01 — Bắc + mẹ có đúng quan hệ thật không?
2. S02/S02A — thoại với tài xế Grab có đúng chất không?
3. S04 — giữ hành khách trả hộ, thay cách giải quyết, hay bỏ tiền vé rắc rối?
4. S06 — nhánh nào đúng trò chơi nhất?
5. S07 — ký ức thật khác nghiên cứu phương án dựng cảnh ở đâu?
6. S09 — đột ngột cut hay đi thêm vài giây?

Sau khi người dùng chốt:
- cập nhật ledger/story package;
- chỉ sửa phần bị ảnh hưởng;
- nâng cấp đúng nội dung được duyệt;
- sau đó mới tạo ra hướng tới triển khai sự kiện đặc tả.
