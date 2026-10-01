# CHAPTER 7 — HỒ SƠ NĂM CŨ
Production-ready narrative specification.

## 0. Chapter contract
- Time: 03:55–04:50.
- Primary locations: school records office, digitization room, archive corridor, restricted storage bay.
- Starting state: Ch6 complete; `knowledge_khang_state = true`; C35 discovered; KCR-F deferred.
- Primary question: nhà trường có chủ động làm sạch lịch sử 09 không?
- Player verbs: request, compare, search, inspect provenance, question, confront, verify.
- Narrative answer: administrative smoothing was deliberate, but it was motivated by fear of incomplete accusations rather than a secret conspiracy.
- Reframe: Vân is complicit in omission but is not the supernatural cause or mastermind.
- New question: chính xác chuyện gì đã xảy ra lúc 00:17 năm 2012?
- KCR rule: KCR-E is NOT triggered in this chapter. The chapter ends with access to the raw evidence packet, which becomes available for KCR-E in Ch8 after C33.

## 1. Entry conditions
Mandatory:
- `ch06_complete = true`.
- `knowledge_khang_state = true`.
- C22 and C27 discovered.

Recommended:
- C35 discovered.

## 2. Scene C7.1 — Records office opening
Entry:
- An returns to the school before dawn.

Objective:
- Find the official archive layer corresponding to Khang's restricted request.

Environmental setup:
- Digitization workstations powered down except one.
- Boxes arranged by year.
- Current anniversary schedule posted over older records notices.
- A plastic sign: `Chỉ scan bản được phép công bố`.

Player actions:
1. Enter digitization room.
2. Inspect queue list.
3. Search for `2012-10 / PA`.
4. Notice request has been marked `review required`.

Interactables:
- Archive terminal.
- Scanner.
- Intake tray.
- Restricted-box ledger.
- Shred bin with routine administrative scraps.

No supernatural event.

## 3. Scene C7.2 — Hạnh and the process
Character:
- HẠNH, records clerk.

Objective:
- Learn how an old record becomes a digitized official record.

Conversation topics:
- Khang's request.
- Anniversary digitization.
- Restricted boxes.
- `09` indexing.

Hạnh's key statements:
- `Bọn em không tự sửa nội dung. Nhưng khi scan thì phải đặt tên file và xếp vào mục.`
- `Mấy cái mẫu cũ dùng lại nhiều năm. Nhìn qua rất dễ tưởng 09 là tên một người.`

Agency:
- Hạnh is concerned about procedural accuracy.
- She refuses to release the restricted box without approval.

Player action:
- Ask to see the index, not the raw box.

Evidence:
- C28: archive account `09` points to a room-number style password hint.

Function:
- Shows institutional shortcut mechanics, not hacking mysticism.

Exit condition:
- Player understands the difference between physical archive and digitized index.

## 4. Scene C7.3 — The 09 index
Entry:
- C28 accessible.

Objective:
- Trace how the same 09 label persists over time.

Player actions:
1. Search `09`.
2. Sort by date.
3. Open records from 2012, 2016, 2021.
4. Inspect provenance fields.

Evidence:
- C29: storage box entry `09_0017_raw`.

Observation:
- Multiple files have different creation dates but same role category.
- Provenance points to PA/equipment material.

Important:
- The system does not say `09 is a role`.
- The player sees filenames, dates, and sources.

Optional evidence:
- C12: 2012 attendance/assignment sheet with 8 signatures + 09 mark.

Recovery:
- If C12 is missed here, it remains recoverable in Ch8 raw packet.

## 5. Scene C7.4 — Vân memo
Entry:
- C29 discovered.

Objective:
- Find out why the 2012 material was suppressed.

Player actions:
- Search for the `00:17` note.
- Pull a thin teacher-folder envelope from a drawer.

Evidence:
- C13: Vân memo.

Text:
`Không phát lại đoạn 00:17. Phần còn lại của chương trình không bị ảnh hưởng.`

Surface interpretation:
- Teacher edited an old broadcast.

True function:
- Confirms deliberate suppression of the incident audio without specifying motive.

Environmental detail:
- Memo is stored among routine event-program edits, not in a hidden safe.
- The mundane placement matters.

## 6. Scene C7.5 — Vân appears
Entry:
- Player attempts to open the restricted box after C13.

Scripted event:
- Vân enters from adjacent office carrying ordinary paperwork.
- She does not appear suddenly or as a horror cue.

Conversation design:
Opening line:
- `Em tìm cái hộp Khang xin hôm qua à?`

Player can ask:
1. `09 là gì?`
2. `Tại sao cắt đoạn 00:17?`
3. `Khang đang ở đâu?`
4. `Cô biết ai làm phần đó?`

Vân's behavior:
- Defensive about accusations.
- Precise about document provenance.
- Refuses to call 09 a person.

Key dialogue:
- `09 không phải tên.`
- pause.
- `Nó là cái ô bọn cô dùng cho phần việc không có trong danh sách.`

Important:
- This is the first direct human statement of the role, but the player has already earned it from evidence.

Character motivation:
- Vân believes releasing incomplete raw data can hurt former staff/students.

## 7. Scene C7.6 — The confrontation
Player objective:
- Test Vân's account against evidence.

Player can present evidence in authored order:
A. C13 memo.
B. C29 file label.
C. C21 multiple-name cross-reference.

Vân reactions:
- To A: `Đúng. Tôi yêu cầu dừng phát.`
- To B: `Mấy cái tên file đó là mẫu cũ.`
- To C: long pause; `Cái đó thì tôi không nghĩ còn ai giữ.`

Vân admission:
- She destroyed one duplicate paper list years earlier.
- She did not destroy the original event log because she believed it should remain available internally.

Evidence/state:
- `vân_confronted = true`.

Crucial thematic nuance:
- Vân's reasoning is not “protect the school at all costs”.
- It is “do not turn a contextless artifact into an accusation”.

Player can challenge:
- `Xóa nó có làm sự thật an toàn hơn không?`

Vân response:
- `Không. Nhưng giữ nguyên mọi thứ cũng không tự động làm nó đúng.`

No morality verdict.

## 8. Scene C7.7 — Access authorization
Entry:
- `vân_confronted = true` and player has presented at least two independent records.

Vân chooses to allow supervised access to the restricted box.

Interaction:
- She unlocks the cabinet.
- Hands An a paper inventory sheet.
- She remains in the room rather than disappearing.

Available:
- 2012 PA box.
- school map.
- raw-audio packet.
- activity sheet.

Do not yet open raw audio fully.

Optional evidence:
- C12 if not already discovered.

Character state:
- Vân has shifted from blocker to reluctant witness.

## 9. Scene C7.8 — Archive room pre-KCR seed
Player enters restricted bay.

Environmental storytelling:
- Box 2012 has an ordinary cardboard label.
- A small inventory slip reads `09_0017_raw`.
- The same label format appears on 2016 material.

Player notices:
- A terminal search result preview contains `09` but the contents are locked behind event-context validation.

This is not KCR-E.

Implementation state:
- `archive_packet_access_granted = true`.
- `raw_audio_unlocked = false` until Ch8 reconstructs the event context.

Audio:
- HVAC fan.
- Cardboard friction.
- No voices.

## 10. Scene C7.9 — Chapter close
Vân gives one final line before leaving:
- `Nếu em muốn biết 00:17 là gì, đừng bắt đầu bằng cái tên. Bắt đầu bằng việc ai đang ở đâu.`

This is foreshadow, not exposition dump.

End image:
- Archive box is open.
- On top is the school map with a stair route and a blank note line beside it.

End-of-chapter knowledge state:
- 09 is explicitly a duty/role label.
- The institution deliberately suppressed the 00:17 broadcast.
- Vân participated in that decision and later destroyed one duplicate contextless record.
- She has now allowed controlled access to the raw historical packet.
- Exact 2012 event remains unresolved.
- Khang's current state remains tied to the evidence system.

Transition to Ch8:
- Player begins reconstructing the event using map, witness testimony, and raw audio.

## 11. Evidence map
| Evidence/state | Required | Dependency | Function | Recovery |
|---|---|---|---|---|
| C28 | Yes | Ch6 archive trail | 09 index/account convention | Terminal search remains available |
| C29 | Yes | C28 | Cross-year raw file naming | Restricted box index |
| C13 | Yes | C29 | Deliberate suppression evidence | Teacher folder remains accessible |
| C31 | Yes via dialogue | C13/confrontation | Vân confirms role existed | Conversation persists until completed |
| C12 | No | C03 context | Eight signatures + 09 mark | Included in Ch8 packet |

## 12. Character knowledge state
### An
Start: `Khang is current bearer; role exists`.
End: `institution intentionally smoothed the record; raw evidence still exists`.
Unknown: what exactly happened at 00:17 and whether the suppression was justified.

### Vân
Knows:
- the 2012 event occurred;
- 09 was an unofficial role;
- she stopped the broadcast;
- duplicate contextless material was destroyed.
Does not understand KCR as a system.

### Hạnh
Knows procedural archive rules and legacy templates.
Does not know the supernatural significance.

### Khang
Not directly present.

## 13. KCR state
No new KCR.
- KCR-D remains active from Ch6.
- KCR-B remains active from Ch5.
- C35 has been discovered but KCR-F is deferred.
- KCR-E is explicitly deferred until C33 is recovered in Ch8.

## 14. Hypothesis impact
H3 `institutional role`: confirmed at human/documentary level.
H2 `institutional cover-up only`: strengthened but incomplete because KCR remains unexplained.
Vân-as-mastermind hypothesis: weakened.
New model: mundane institutional omission created the conditions; KCR may be a separate consequence of unresolved evidence.

## 15. Foreshadow/payoff
Pays off:
- Ch4 multiple occupants.
- Ch6 restricted request.
- Vân's precise language.

Foreshadows:
- C29 -> Ch8 raw packet.
- Vân's line about location -> Ch8 physical reconstruction.
- Duplicate destruction -> Ending D/record-preservation tension.

## 16. Production acceptance tests
- Vân cannot become a chase villain.
- The player can understand the administrative smoothing without agreeing with it.
- C13 and C31 are independently grounded.
- `archive_packet_access_granted` survives save/load.
- C12 can be postponed to Ch8 without blocking chapter completion.
- No KCR-E appears here.
- The terminal preview does not magically reveal the 2012 event.

## 17. Post-Chapter QA + continuity audit
### Plot logic
PASS. The digitization process, restricted request, memo and Vân confrontation form a plausible administrative chain.

### Character motivation
PASS. Vân's behavior is consistent with protecting contextual integrity while remaining personally culpable for omission.

### Mystery fairness
PASS. The player already knows 09 is a role from earlier evidence before Vân confirms it.

### Clue dependencies
PASS. C28 -> C29 -> C13 -> C31 is coherent; C12 is redundant/recoverable.

### Timeline
PASS. No historical events are changed.

### Location logic
PASS. Archive office and restricted storage are reachable within the existing school footprint.

### KCR continuity
ISSUE FOUND AND RESOLVED:
- Existing Chapter Bible placed KCR-E in Ch7 after `knowledge_2012_incident`, but existing KCR matrix defined KCR-E as triggered by C33, which is only available in Ch8.
- Root cause: chapter-level reveal was written one step earlier than the clue threshold.
- Minimal repair: Ch7 grants archive access but cannot confirm the incident. KCR-E moves to Ch8 after the raw audio identity proof C33.
- Affected files: Ch7 production spec, Ch8 production spec, `09_KCR_MATRIX.md`, `10_CHAPTER_BIBLE.md`, `15_DECISION_LOG.md`, `18_IMPLEMENTATION_HANDOFF.md`.

### Gameplay
PASS. Search/provenance/confrontation are actions with state consequences.

### Theme
PASS. The chapter shows that omission can be produced by ordinary administrative reasoning.

### Continuity result
NO OTHER CONTRADICTION FOUND.
