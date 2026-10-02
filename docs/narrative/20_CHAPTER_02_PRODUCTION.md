# CHAPTER 2 — PHÒNG PHÁT THANH
Production-ready narrative specification.

## 0. Chapter contract
- Time: 00:36–01:05.
- Primary locations: old radio room, corridor, equipment closet, stairwell threshold.
- Starting state: `ch01_complete = true`; KCR-A is active; An has seen the ninth chair/headset.
- Primary question: 09 trong hệ thống âm thanh là gì?
- Player verbs: observe, compare, rewind, inspect, trace, test.
- Narrative answer: 09 is used as an operational/archive category tied to after-hours work.
- Reframe: the strange audio can have a mundane recording-chain explanation; the important anomaly is the recurrence of the 09 category.
- New question: who physically performed 09 duty?
- KCR rule: no new KCR event in this chapter. Ch2 prepares evidence used by KCR-B later.

## 1. Entry conditions
Mandatory:
- `ch01_complete`.
- C03 and C07 discovered.
- KCR-A active.

If the player saved immediately after Ch1, the ninth chair/headset state persists.

## 2. Scene C2.1 — Re-enter the PA room
Entry:
- Player follows the corridor toward the `PHÒNG PHÁT THANH` sign.

Objective:
- Determine why the archive card reads `09 / 00:17`.

Player actions:
1. Open the PA room door.
2. Approach the console.
3. Pick up the C07 index card only if not already pinned in the evidence UI.
4. Inspect the current timetable.
5. Rotate the timetable/legacy card to compare handwriting and timestamps.

Interactables:
- PA console.
- Tape/index drawer.
- Wall timetable.
- Ninth chair and headset from KCR-A.
- Old recorder.
- Unlabelled mixer strip with adhesive residue.

Mandatory evidence:
- C07 is already known and is re-confirmed by the interaction.

Optional evidence:
- C14: `00:17 — kiểm tra thiết bị, khóa nguồn` with handwritten `09`.

Environmental storytelling:
- Eight clean channel labels are typed/laminated.
- One channel strip has a rectangular adhesive outline.
- Cable bundles are wrapped with old masking tape: `đồ đạc / đêm`.
- The ninth headset is plugged into a wall route that does not correspond to a numbered channel.

Audio:
- Rain outside.
- Fluorescent hum.
- Low transformer buzz from the console.
- No music.

Lighting:
- Neutral fluorescent overhead.
- Small warmer indicator lamp near the old recorder.

Character knowledge update:
- An moves from `there may be an omitted person` toward `09 may be a function/category`.
- He still assumes that a specific human must have occupied that function.

Exit condition:
- Player compares C07 and the timetable, or explicitly examines both within 3m of the same console.

## 3. Scene C2.2 — Three recordings
Entry:
- C2.1 complete.

Objective:
- Establish whether 00:17 is a one-off timestamp or a recurring operational marker.

Player action loop:
1. Take a cassette from the legacy drawer.
2. Insert into recorder.
3. Play.
4. Scrub to the marked timestamp.
5. Eject.
6. Repeat with the other two clips.

Recordings:
- 2012 / 00:17.
- 2016 / 00:17.
- 2021 / 00:17.

Important audio design:
- The voices, room acoustics and equipment noises differ across years.
- A relay click and a similar low fluorescent room tone recur at roughly the same relative timestamp.
- The recordings are not supernatural duplicates.

Evidence:
- C08 becomes discovered after the player has listened to all three and used the compare marker interaction.

UI/state behaviour:
- Timeline markers can be compared side by side.
- The game does not say `same sound detected`.
- The player can replay any clip.

Optional support:
- C14 causes a non-verbal haptic/cursor cue on the `00:17` markers after the player has viewed two clips but has not performed compare.

Recovery path if player misses C08:
- The third clip remains available.
- On the second failed compare attempt, the compare action becomes available from the recorder timeline.
- Ch3 contains a redundant operational-role clue, so no progression state remains blocked.

Hypothesis impact:
- H1 `one erased student`: weakened.
- H2 `technical corruption only`: weakened because the recurrence is cross-year.
- H3 `09 is a recurring function/category`: strengthened strongly.
- H4 `supernatural`: remains possible but unnecessary to explain the recordings.

Exit condition:
- Player identifies the recurring 00:17 marker.

## 4. Scene C2.3 — Trace the cable route
Entry:
- C08 discovered.

Objective:
- Discover how after-hours audio reaches the old recorder without using the official eight-station workflow.

Player actions:
1. Follow cable from mixer.
2. Inspect wall junction.
3. Pull aside a loose cable tie.
4. Open equipment closet.
5. Inspect recent repair staple.
6. Follow the line to the stairwell threshold.

Interactables:
- Cable bundle.
- Junction box.
- Equipment closet.
- Old maintenance tag.
- Floor route marker.

Mandatory evidence:
- Environmental observation tied to C14 if C14 was missed earlier.

Optional observation, not a new registry clue:
- Dust outline of a removed recorder stand.
- Scrape mark where equipment was repeatedly moved.

Scripted event:
- Player gently pulls the cable.
- Relay clicks once.
- PA speaker activates for under one second.
- No voice.
- The event cannot repeat on demand.

Lighting:
- Closet is darker and more directional than corridor.
- Opening the cabinet exposes a narrow light leak from a damaged ceiling panel.

Audio:
- Cable movement produces rubber/plastic creak.
- Fluorescent hum dips for less than one second when relay clicks.

Narrative meaning:
- 09 was embedded in a real workflow, not merely in a corrupted archive label.

Exit condition:
- Player reaches the stairwell route marker and can interact with the door.

## 5. Scene C2.4 — Optional maintenance tag
Entry:
- C2.3 complete.

Optional objective:
- Inspect the back of the old recorder.

Evidence:
- C14, if not already collected.
- Wording: `Kiểm tra thiết bị đêm — phụ trách: 09`.
- No personal name.
- Handwriting differs from the C07 card.

Function:
- Independent administrative evidence that 09 is a duty label.

Recovery:
- If missed, the same functional wording appears later in the Ch3 storage inventory. This is deliberate redundancy, not a duplicate mandatory clue.

## 6. Scene C2.5 — Current schedule vs legacy schedule
Entry:
- C2.2 complete.

Objective:
- Compare the modern schedule against the legacy 00:17 record.

Player action:
- Open current 2026 schedule panel on the wall.
- Pull down the old schedule sheet behind it.
- Compare time slots.

Observation:
- 2026 schedule has no 00:17 broadcast.
- Legacy material includes the slot as maintenance/equipment work.

No automatic exposition.

Character knowledge:
- An now has enough evidence to articulate, privately or in journal terms: `09 là tên của một vị trí công việc, không giống tên một người.`
- This does not yet become canonical player knowledge `knowledge_09_is_role` until Ch3/Ch4 evidence converges.

Exit condition:
- Player returns the sheets to the wall or leaves the room.

## 7. Scene C2.6 — Unscheduled PA line
Entry:
- The player exits toward corridor after the schedule comparison.

Scripted event:
- PA speaker clicks on.
- A calm male voice, compressed and distant: `Đóng cửa đi.`
- It lasts less than two seconds.
- It is not voiced as Khang.

Ambiguity at this point:
- Could be old bleed from a recording chain.
- Could be a current signal.
- The player cannot resolve this yet.

Production truth / payoff contract:
- This exact degraded phrase is archival bleed from the 2012 recording chain.
- C33 in Chapter 8 must contain the matching `Đóng cửa đi.` line.
- Do not identify the source in Chapter 2.
- Do not later reassign this line to Khang or an unrelated speaker.

Lighting:
- One fluorescent tube goes dark for 1.5 seconds.
- No room geometry changes.

Player response:
- Inspect speaker.
- Inspect console.
- Nothing indicates a current source.

Do not replay automatically.

## 8. Scene C2.7 — Chapter close
Objective:
- Follow the old route marker far enough to establish the next location.

Visual:
- Corridor has eight hooks.
- The ninth position is a clean rectangular patch where a label used to be.
- Stairwell door has a faded equipment sticker.

Audio:
- Relay click exactly at 00:17.
- Rain becomes dominant again.

End-of-chapter knowledge state:
- `09` is probably an operational/archive category.
- `00:17` recurs across years.
- The identity of the role occupant is still unknown.
- After-hours work used a physical route through the old stair/equipment area.

Transition:
- Player follows the route into the former radio club/equipment classroom.
- Chapter 3 begins with the physical question: why is there a ninth station?

## 9. Mandatory/optional evidence map
| Evidence | Required | Dependencies | Function | Recovery |
|---|---|---|---|---|
| C07 | Yes | Ch1 | 09 / 00:17 anchor | Already mandatory in Ch1 |
| C08 | Yes for Ch2 full completion | C07 + three recordings | Recurring 00:17 signature | Compare UI after failed attempt; Ch3 redundancy |
| C14 | No | C07 | Connects 00:17 to maintenance role | Recorder rear tag; later inventory |

## 10. Character knowledge state
### An
Start: `09 may be an erased person`.
End: `09 behaves like a recurring operational category; someone must occupy it`.
Unknown: why the category can appear physically.

### Khang
No new direct knowledge shown. His previous notes remain absent/past-state material.

### Vân
No active scene. Her earlier precise wording `vị trí` remains foreshadow.

## 11. KCR state
No new KCR event.
KCR-A remains active throughout.
The player must not trigger KCR-B by merely crossing the stairwell threshold.

## 12. Foreshadow/payoff
Foreshadows:
- C14 -> C15/C16.
- Recurrent 00:17 -> Ch8 event reconstruction.
- Cable route -> Ch5 public-memory route / Ch8 canonical route.
- Unnamed duty label -> Ch3 physical station / Ch4 multiple occupants.

Pays off:
- Ch1 question `what is 09?` gets a concrete operational answer without revealing the final role ontology.

## 13. Production acceptance tests
- Player can complete the chapter without reading a long document.
- The three recordings are distinguishable by year and timing markers.
- No automatic text popup states the solution.
- C08 can be missed temporarily without soft-lock.
- KCR-A survives save/load.
- No KCR-B occurs from entering the stairwell alone.
- The male PA line cannot be mistaken for a direct Khang message by voice direction alone.

## 14. Post-Chapter QA + continuity audit
### Plot logic
PASS. Audio recurrence and cable routing are causally connected to a repeated operational duty.

### Character motivation
PASS. An remains driven by finding Khang and understanding Khang's clue, not by arbitrary curiosity.

### Mystery fairness
PASS. The player can infer an operational role without being told it is the final answer.

### Clue dependencies
PASS. C08 depends on C07 and three recordings; C14 is redundant and recoverable.

### Timeline
PASS. 2012/2016/2021 material supports role recurrence and does not alter canonical events.

### Location logic
PASS. PA room -> equipment closet -> stair threshold is physically coherent.

### KCR continuity
PASS. No new KCR trigger introduced.

### Gameplay
PASS. Compare/rewind/trace are actual player actions that create knowledge.

### Repetition
PASS. No `find clue -> reality change` beat added.

### Continuity result
NO CONTRADICTION FOUND.

### Watchpoint
The male PA line must remain unexplained in Chapter 2 but later match C33 exactly as degraded 2012 archival bleed. If the phrase or speaker-source changes, update C08/C33, the evidence catalog, foreshadow/payoff matrix and Decision Log together.
