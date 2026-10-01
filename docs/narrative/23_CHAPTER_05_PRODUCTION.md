# CHAPTER 5 — CHUYẾN XE CUỐI
Production-ready narrative specification.

## 0. Chapter contract
- Time: 02:15–03:00.
- Primary locations: school exit, retired guard's neighborhood/tea stop, old bus stop, Phương's small alumni/printing work area, school stairwell return.
- Starting state: Ch4 complete; `knowledge_multiple_occupants = true`.
- Primary question: công chúng còn nhớ gì về 09 và đêm 2012?
- Player verbs: travel, interview, compare testimony, inspect route, observe behavior, corroborate.
- Narrative answer: public memory preserves the role/incident unevenly; different people remember different occupants.
- Reframe: the institution did not need every person to knowingly lie. Role-memory itself created fragmented truth.
- New question: Khang disappeared after reconstructing the same pattern; where is he now?
- KCR event: KCR-B occurs only after C15 is understood and An returns to the school stair route.

## 1. Entry conditions
Mandatory:
- `ch04_complete = true`.
- `knowledge_multiple_occupants = true`.
- C17 or equivalent midpoint state completed.

The route/contact note in Khang's cross-reference sheet identifies Phương and a former security witness.

## 2. Scene C5.1 — Leave the school
Entry:
- Player exits photo corridor.

Objective:
- Follow the 2012 route into present-day public space.

Player actions:
1. Check Khang's contact note.
2. Inspect a simple route sketch showing school gate -> old bus stop.
3. Leave school through main side entrance.

Environmental storytelling:
- School anniversary posters overlap old activity posters.
- New digitization notices cover part of the old bulletin board.
- A paper corner repeatedly peels off, revealing the older `09` mark underneath.

Audio:
- Rain softens.
- Traffic becomes clearer.
- No music.

Character state:
- An is no longer looking for a singular missing student.
- His objective has shifted to corroborating how real people remember the role.

Exit condition:
- Player reaches the former security witness meeting point.

## 3. Scene C5.2 — Lộc's memory
Location:
- Small tea stop near Lộc's home/work route. No combat or stealth.

Character:
- LỘC, retired security guard.

Player objective:
- Ask about the 2012 night and the after-hours stair route.

Conversation design:
- Lộc does not dump the whole story.
- He answers based on what he remembers and what he is uncomfortable saying.

Player-selectable topics:
1. `00:17`.
2. `Phòng phát thanh`.
3. `Cầu thang`.
4. `09`.

Agency:
- Lộc refuses to identify a person from memory if An asks too directly.
- He will only say: `Tao nhớ có một đứa chạy ngược cầu thang. Nó không nằm trong danh sách trực.`

Mandatory evidence:
- C15: security log / Lộc note.

C15 text:
`00:16 — nghe tiếng chạy cầu thang.`
`00:18 — một học sinh ôm tay xuống phòng y tế.`
`Có một người quay lại lấy máy ghi âm.`

Important:
- Lộc does not name Minh yet.
- He remembers action, not administrative identity.

Optional evidence:
- C24: bus ticket from Phương dated the next morning.

Environmental storytelling:
- Lộc keeps old keys in a tin but refuses to hand over school keys.
- He keeps a folded photocopy of old security logs separate from official records.

Audio:
- Tea cups.
- Passing motorbikes.
- Distant bus braking.

Exit condition:
- Player inspects C15 and hears the phrase `quay lại lấy máy ghi âm`.

## 4. Scene C5.3 — Bus stop route
Entry:
- C15 discovered.

Objective:
- Map the physical route from school stairwell to the old public exit point.

Player actions:
1. Walk to bus stop.
2. Compare old route notes against current street layout.
3. Inspect shelter glass, curb and faded wayfinding.

Environmental storytelling:
- The route has been redeveloped but old pavement boundaries remain.
- A school festival poster board from years earlier survives under new ads.
- A metal rail bears a recent-looking scratch that does not match current traffic wear.

No KCR yet.

Audio:
- Bus engine idle.
- Rain gutter flow.
- Crosswalk beep.

Optional evidence:
- C24 if not acquired at Lộc's meeting.

Exit condition:
- Player reaches Phương's work area shown by contact information.

## 5. Scene C5.4 — Phương's account
Location:
- Small print/photocopy/alumni-help counter near the bus route.

Character:
- PHƯƠNG.

Player objective:
- Ask what she remembers about the 2012 night and the person in the Ninth position.

Conversation design:
Topics:
1. `tai nạn`.
2. `Minh`.
3. `09`.
4. `Khang`.

Phương initially redirects to practical questions about school paperwork.

Mandatory evidence:
- C32 is not collected yet in the global graph until Ch8; here the conversation prepares it.
- The scene can award a testimony state `phuong_testimony = true` without claiming the final identity proof.

Phương's key dialogue:
- `Tao nhớ Minh ở đó.`
- `Nó cầm máy ghi âm.`
- `Nhưng có lúc tao xem ảnh của những năm sau, tao lại nhớ một đứa khác đứng đúng chỗ đó.`

This is deliberately uncomfortable rather than paradoxical.

Player action:
- An can show the 2012 photo from his evidence UI.
- Phương identifies the room, not a face.

Optional evidence:
- C24 bus ticket confirms Phương left the next morning.

Character agency:
- Phương refuses to speculate about blame.
- She says: `Tao không nhớ ai đã nghĩ ra cái 09.`

Exit condition:
- Player asks both `Minh` and `09` topics.

## 6. Scene C5.5 — Cross-source comparison
Entry:
- `phuong_testimony = true` and C15 acquired.

Objective:
- Compare three representations of the same night.

Player actions:
1. Lay C15 security note beside the 2012 photo.
2. Link the stair route on the current map.
3. Compare Phương's statement in the evidence UI.

Observation:
- C15 confirms a person returned for the recorder.
- Phương remembers Minh at the location.
- The photo shows a human in the old Ninth spatial position.

Hypothesis impact:
- H3 role model becomes stronger.
- H2 `public rumor only` weakens.
- The core problem becomes attribution, not occurrence.

No exact `00:17` event reconstruction yet.

## 7. Scene C5.6 — Optional alumni memory cluster
Optional objective:
- Access a current alumni group chat via a public terminal/old printout.

Evidence:
- C25.

Content:
Three separate messages from different years:
- `“Năm tao trực cũng có 09.”`
- `“09 là người ngồi đầu bàn bên phải mà?”`
- `“Không, 09 là phần việc đêm. Tao làm.”`

Function:
- Demonstrates role-memory disagreement directly.

Recovery:
- If missed, the same distinction is articulated by Lộc and Phương in different words.

## 8. Scene C5.7 — Return to the school
Entry:
- C15 + `phuong_testimony = true`.

Objective:
- Check the physical stair route now that two independent human accounts point to it.

Player action:
- Return to school.
- Follow the same stairwell path indicated by Lộc.

Before-state:
- Rail appears clean except for ordinary wear.
- Route is physically blocked by a maintenance barrier halfway down.

## 9. Scene C5.8 — KCR-B: the stair remembers
Trigger:
- C15 discovered.
- `phuong_testimony = true`.
- Player reaches the 2012 route location.

Before:
- No distinct historical damage visible.
- Maintenance barrier blocks the lowest section.

After:
- A fresh-looking scrape appears on the same rail segment corresponding to the 2012 return path.
- The maintenance barrier has shifted enough to expose one additional step.
- A shoe-sized dust interruption runs across the step.

No teleportation.
No ghost body.

Audio:
- One doubled footstep echo.
- Then complete silence for 1.2 seconds.
- Normal building ambience resumes.

Lighting:
- One tube light above the rail briefly dims.
- No color shift.

Gameplay consequence:
- Player can now inspect the physical route continuation needed for Ch8.
- The barrier is not removed permanently everywhere; only this exact route state changes.

Narrative meaning:
- The place begins to resolve the repeated role through remembered action, not merely through a label.

## 10. Scene C5.9 — Chapter close
Player reaches the newly exposed step.

Environmental detail:
- Under the step is a shallow recess with old adhesive residue where a cable guide had once been mounted.
- No new major evidence ID is awarded.

Phone event:
- No message arrives.
- This restraint is intentional after the KCR beat.

End-of-chapter knowledge state:
- Public memory preserves the existence of 09 inconsistently.
- Multiple people remember the same function from their own time.
- Phương remembers Minh in 2012, but the full event remains unreconstructed.
- The physical stair route now reacts to converged evidence.
- Khang's disappearance increasingly looks connected to the role-state rather than a normal kidnapping.

Transition to Ch6:
- Khang's archive material includes enough personal traces for An to return to his rental room.
- The player now investigates Khang directly rather than the school's public memory.

## 11. Evidence map
| Evidence/state | Required | Dependency | Function | Recovery |
|---|---|---|---|---|
| C15 | Yes | Ch4 state | Independent witness to 2012 route/action | Lộc keeps duplicate copy; interaction persists |
| C24 | No | Phương contact | Confirms next-morning departure | Not required |
| C25 | No | C15 | Public-memory plurality | Reconstructed by Lộc + Phương |
| `phuong_testimony` | Yes | C15/contact | Human corroboration | Dialogue remains available until completed |

## 12. Character knowledge state
### An
Start: `multiple people occupied 09`.
End: `multiple people remember the role differently; the 2012 route is physically reactive when independently corroborated`.
Unknown: Khang's exact condition.

### Phương
Knows she was injured and remembers Minh.
Does not know why 09 persisted.

### Lộc
Knows the practical after-hours route and remembers an unnamed actor returning for a recorder.
Will not speculate beyond his memory.

### Khang
Off-screen. The player's evidence now overlaps with the same route Khang was researching.

## 13. KCR state
KCR-B triggers only after both an independent action record (C15) and a human corroboration (`phuong_testimony`) converge at the historical route.

This resolves the existing matrix ambiguity by making the trigger evidence-based, not location-only.

## 14. Hypothesis impact
H1 `one erased student`: no longer explanatory.
H2 `ordinary cover-up`: still partially viable for the records but cannot explain the rail state.
H3 `institutional role with reality effect`: strongest.
H4 `Khang is merely hiding`: weakened after route evidence and his earlier voice notes.

## 15. Foreshadow/payoff
Pays off:
- Ch2 route marker.
- Ch3 physical role footprint.
- Ch4 multiple occupants.

Foreshadows:
- Repeated route use -> Ch8 event reconstruction.
- Human memory of Minh -> Ch8 C32/C33.
- Khang researching same route -> Ch6 current bearer state.

## 16. Production acceptance tests
- Lộc cannot reveal Minh's complete identity before Ch8.
- Phương cannot reveal the full 2012 event before Ch8.
- C15 is independently understandable without trusting any single character.
- KCR-B does not trigger just because the player walks upstairs.
- The physical route after KCR-B is stable across save/load.
- Optional C25 does not become mandatory progression.
- No chase sequence is introduced at the bus stop.

## 17. Post-Chapter QA + continuity audit
### Plot logic
PASS. Present-day testimony follows directly from the 2012 route and explains why public memory differs.

### Character motivation
PASS. Lộc protects his own memory boundary; Phương avoids being reduced to the accident; An seeks corroboration rather than spectacle.

### Mystery fairness
PASS. Multiple sources converge on role/use without revealing the full 2012 event.

### Clue dependencies
PASS. C15 + `phuong_testimony` are independent enough to support KCR-B.

### Timeline
PASS. No historical timestamp is changed.

### Location logic
PASS. School -> public route -> Phương -> school return is motivated by evidence dependency.

### KCR continuity
PASS after trigger refinement. KCR-B now requires cross-source corroboration at the historical route.

### Theme
PASS. Different memories are shown as partial, role-shaped recollections rather than universal lies.

### Continuity result
ISSUE FOUND AND RESOLVED:
- Old KCR matrix implied C15 alone could trigger KCR-B.
- Production version requires C15 + `phuong_testimony` + return to route.
- Root cause: chapter bible treated the human corroboration as flavor rather than state logic.
- Resolution: update KCR matrix, implementation handoff, chapter bible, and Decision Log in the final synchronization pass.
