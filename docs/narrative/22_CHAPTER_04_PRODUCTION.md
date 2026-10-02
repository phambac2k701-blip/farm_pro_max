# CHAPTER 4 — TẤM ẢNH
Production-ready narrative specification.

## 0. Chapter contract
- Time: 01:38–02:15.
- Primary locations: former classroom/photo corridor, archive scan station, alumni storage cabinet.
- Starting state: Ch3 complete; KCR-C active; An has a credible role hypothesis.
- Primary question: Ai là người ở vị trí 09 trong các bức ảnh?
- Player verbs: compare, zoom, inspect front/back, rotate, align, annotate, cross-reference.
- Narrative answer: different real people occupied the same Ninth role in different years.
- Reframe: contradictory photographs are locally authentic, not forged copies.
- Major midpoint reveal: there was not one erased Ninth person.
- New question: why did the institution preserve one label for multiple people?

## 1. Entry conditions
Mandatory:
- `ch03_complete = true`.
- C19 discovered.
- KCR-C active.

Recommended but not mandatory:
- C20.
- C14.

## 2. Scene C4.1 — Photo corridor inventory
Entry:
- Player exits the former club/equipment classroom.

Objective:
- Find all historical group photos tied to the radio room.

Player actions:
1. Search photo corridor board.
2. Open two wall frames.
3. Pull out a lower storage tray.
4. Place selected photos on a comparison surface.

Interactables:
- 2012 photo.
- 2016 photo.
- 2021 scanned print.
- Frame backs.
- Event captions.
- Hanging rail with dust outlines.

Mandatory evidence:
- C09: 2012 photo.
- C10: 2016 photo.
- C11 may remain optional if the 2021 scan is not found, but the three-year pattern gives the strongest read.

Environmental storytelling:
- Each photo has a different paper stock and frame age.
- The same room background appears in all three.
- The far-right spatial position is consistent.

Audio:
- Corridor ambience.
- Rain through louvre windows.
- Distant electrical transformer.

Exit condition:
- At least two photos are placed in the comparison area.

## 3. Scene C4.2 — 2012 photograph
Entry:
- C09 selected.

Objective:
- Determine whether the cropped figure can be identified from the photo itself.

Player actions:
1. Zoom into the right edge.
2. Pan across mixer and chair position.
3. Flip photo.
4. Inspect caption.

Observation:
- Eight named faces are clearly present.
- At far right, shoulder/hand occupies the old Ninth spatial position.
- Face is outside crop.

Back inscription:
- `Đêm hội — phòng phát thanh — 2012`.
- Photographer initials only.

No direct identity reveal.

Hypothesis impact:
- H1 remains plausible.
- H3 gains stronger spatial evidence.

## 4. Scene C4.3 — 2016 photograph
Entry:
- C09 inspected.

Objective:
- Test whether the same person occupies the same position four years later.

Player action:
- Retrieve the 2016 image from the lower tray.
- Place beside 2012 image.
- Align room landmarks.

Evidence:
- C10.

Observation:
- Same room angle.
- Same physical Ninth position.
- Different human face/body in that position.
- Caption still uses a generic club label, not a person-specific label.

Scripted micro-beat:
- The player can toggle a transparent alignment overlay.
- The overlay is an implementation aid, not a magical scan.

No KCR occurs.

Hypothesis impact:
- H1 `one erased student` becomes internally strained.
- H2 `photo forgery` remains possible only until back/caption evidence is checked.

Exit condition:
- Player inspects photo back and alignment.

## 5. Scene C4.4 — 2021 scan
Entry:
- C10 has been inspected.

Objective:
- Determine whether the recurrence is a two-person anomaly or a persistent role.

Player actions:
1. Open the scanned 2021 image on the archive laptop.
2. Compare filenames and metadata.
3. Pan to the Ninth position.
4. Inspect scan notes.

Evidence:
- C11 optional but strongly recommended.
- C18 optional metadata clue.

Observation:
- Third face occupies same spatial position.
- Filename pattern includes `09` even though the displayed group list contains different names.

Optional metadata:
- `album_09_2021_scan.jpg`.
- Metadata notes show a common folder naming convention rather than corruption.

Recovery if C11 missed:
- C21 cross-reference sheet later contains the 2021 occupant.
- The midpoint reveal still works from 2012 + 2016 + cross-reference evidence.

## 6. Scene C4.5 — Khang cross-reference sheet
Entry:
- At least C10 inspected.

Objective:
- Understand why Khang wrote multiple names beside 09.

Player action:
- Open Khang's copied folder on the archive scan station.
- Rotate/select rows.
- Compare against the photo years.

Mandatory evidence:
- C21.

Visible rows:
- `Minh — 09 — 2012`.
- `Duy — 09 — 2016`.
- `My — 09? — 2025`.
- Note: `Không phải tên. Là chỗ trống.`

Important interaction:
- The player can click each name and see linked evidence, but the system does not auto-solve the conclusion.

Character knowledge update:
- An now has sufficient evidence to set `knowledge_multiple_occupants = true`.
- An's internal model changes from `one person was erased` to `a role was repeatedly occupied by different people`.

## 7. Scene C4.6 — Khang voice note 2
Entry:
- C21 opened.

Player action:
- Play Khang voice note stored beside the cross-reference sheet.

Mandatory evidence:
- C17.

Transcript:
> “Không phải một người. Nhưng cũng không hẳn là nhiều người. Tao nghĩ nó là cái vị trí giữa hai thứ đó.”

Audio design:
- Khang sounds tired, focused, not frightened.
- No supernatural processing.
- A tiny room-tone click at the end links to the archive hardware but does not become a new KCR.

Narrative function:
- Confirms the player's emerging interpretation rather than presenting a new plot fact from nowhere.

## 8. Scene C4.7 — Midpoint comparison wall
Entry:
- C17 discovered.

Objective:
- Perform the player's own comparison before the game moves on.

Player action:
1. Place 2012, 2016 and 2021 images side by side.
2. Mark the same spatial location in each.
3. Link each to its corresponding name in C21.
4. Confirm the evidence set.

System response:
- `knowledge_multiple_occupants = true` becomes persistent.
- Evidence registry marks `role continuity across generations` as established.

No cinematic speech explains the twist.

Environmental beat:
- After the player closes the comparison view, the physical photo wall now has a small blank slot between frames. It is not a KCR event; it was simply hidden by stacked frames and becomes visible when the storage tray is removed.

## 9. Scene C4.8 — Midpoint reveal beat
The player steps back from the photos.

An's authored reaction is minimal:
- “Không phải một người.”

No voiceover explanation follows.

A phone notification appears from an unknown number.
Text:
`Mày thấy rồi.`

The message disappears after a few seconds if not opened.

Important:
- This message is not attributed to Khang yet.
- It is not sufficient to trigger KCR.
- It is a pressure beat, not a reveal shortcut.

## 10. Scene C4.9 — Chapter close
Objective:
- Decide what this contradiction means before leaving.

Player can inspect one final object:
- a blank label holder on the photo board.

Environmental storytelling:
- The blank holder is the same dimensions as a role label, not a student nameplate.
- It has two screw holes matching the 09 cabinet hook from Ch3.

End-of-chapter knowledge state:
- Multiple real people occupied 09.
- The Ninth is a persistent role/position, not a single erased student.
- Different photos can be authentic while disagreeing about identity.
- Khang independently reached the same conclusion.
- The reason the role persists is unresolved.
- The reason 2012 matters is unresolved.

Transition to Ch5:
- C21 contains a contact note for a former student involved in the 2012 night.
- The player follows the route into current public space to determine what people remember.

## 11. Evidence map
| Evidence | Required | Dependency | Function | Recovery |
|---|---|---|---|---|
| C09 | Yes | Ch1/Ch3 context | First physical Ninth photo | Recovered from corridor board until collected |
| C10 | Yes | C09 | Second occupant breaks singular identity | Mandatory comparison state |
| C11 | No | C10 | Third-generation recurrence | C21 names the third occupant if missed |
| C18 | No | C10 | Confirms filename convention | Not required |
| C21 | Yes | C10/C18 | Maps names to same 09 role | Stored copy remains on archive station |
| C17 | Yes | C21 | Khang's midpoint statement | Can be replayed once discovered |

## 12. Clue dependencies
C09 -> C10 -> C21 -> C17.
C11 and C18 strengthen the chain but do not gate the midpoint.
C19 from Ch3 provides the physical role token that makes the photo comparison meaningful.

Recovery path:
- If C11 is missed, C21 still contains the 2025 name row and the role mapping.
- If the player does not inspect photo backs, the visual room alignment still provides the second proof path.
- If the player ignores C17, the midpoint knowledge state still activates after the evidence comparison is completed.

## 13. Character knowledge state
### An
Start: `09 is a physical role.`
End: `multiple people occupied the role across years`.
Unknown: why the role exists; why Khang is disappearing.

### Khang
His prior hypothesis has now been shown to the player as an artifact. The player knows he recognized the role pattern before An.

### Vân
Still off-screen. Her reluctance to use a person's name for 09 remains an indirect foreshadow.

## 14. KCR state
No new KCR event.
KCR-C remains active.
`knowledge_multiple_occupants` becomes true after the comparison wall interaction.

## 15. Hypothesis impact
H1 `one erased person`: broken as the best explanatory model.
H2 `photo forgery/corruption`: largely broken by independent backs, years, and room alignment.
H3 `institutional role`: strongest model.
H4 `supernatural duplicate`: remains possible only as an explanation for later physical changes, not for the photo contradiction itself.

## 16. Foreshadow/payoff
Pays off:
- Ch3 physical role hypothesis.
- Ch1/Ch2 wrong-count motif.
- Khang's warning that sources may disagree.

Foreshadows:
- Multiple people -> Ch5 public memory split.
- Role label without name -> Ch7 institutional logic.
- `between person and many people` -> Ch6/Ch9 Khang witness-state.

## 17. Production acceptance tests
- The player can independently discover the midpoint without hearing C17.
- The 2012 and 2016 photos use different people but identical spatial position.
- The game never claims a photo is false merely because names differ.
- The midpoint does not require the player to read long documents.
- `knowledge_multiple_occupants` survives save/load.
- No new supernatural geometry is introduced in Ch4.

## 18. Post-Chapter QA + continuity audit
### Plot logic
PASS. Different people occupying a repeated station explains the photographic contradiction without changing canonical events.

### Character motivation
PASS. An is testing the role hypothesis generated by the previous chapter; Khang's prior research drives the evidence path.

### Mystery fairness
PASS. The midpoint is inferable from independent visual and metadata evidence.

### Clue dependencies
PASS. C09 -> C10 -> C21/C17 is redundant enough; C11/C18 are optional reinforcement.

### Timeline
PASS. 2012/2016/2021 dates remain historical evidence, not retcons.

### KCR continuity
PASS. No KCR added. KCR-C remains the last spatial transformation.

### Theme
PASS. The central theme becomes concrete through the gap between a person and a reusable institutional slot.

### Continuity result
NO CONTRADICTION FOUND.
