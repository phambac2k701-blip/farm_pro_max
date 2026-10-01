# CHAPTER 8 — ĐÊM ĐÓ
Production-ready narrative specification.

## 0. Chapter contract
- Time: 04:50–05:35.
- Primary locations: restricted archive bay, temporary evidence table, school map table, PA playback station, glass/mirror corridor.
- Starting state: Ch7 complete; `archive_packet_access_granted = true`; C13/C29/C31 established; C33 not yet established.
- Primary question: chuyện gì thực sự xảy ra lúc 00:17 ngày 12/10/2012?
- Player verbs: lay out, align timestamps, replay, compare, place, cross-reference, listen, verify.
- Narrative answer: Phương was injured in the stairwell; Minh, the unlisted Ninth occupant, recorded the event; Vân stopped the broadcast; the 09 role absorbed responsibility that should have had a named owner.
- Reframe: the institutional omission did not invent a nonexistent person. It separated real work, witness, and responsibility from a stable name.
- New question: what does preserving this truth do to the current witness?
- KCR events: KCR-E and KCR-G.

## 1. Entry conditions
Mandatory:
- `ch07_complete = true`.
- `archive_packet_access_granted = true`.
- C29 and C31 available.

## 2. Scene C8.1 — Build the evidence table
Entry:
- Player enters restricted archive bay.

Objective:
- Reconstruct the 2012 event using physical artifacts rather than reading a summary.

Player actions:
1. Place 2012 roster on left side of table.
2. Place security note on center.
3. Place school map on right.
4. Place `09_0017_raw` card near the audio player.
5. Open the testimony panel recorded from Phương.

Interactables:
- paperweight;
- magnetic clips;
- transparent timestamp strips;
- old map;
- raw audio terminal.

Gameplay rule:
- The table accepts objects in multiple orderings, but only the correct set of timestamps highlights a valid reconstruction route.
- No single puzzle answer is hidden behind a pixel hunt.

Environmental storytelling:
- Archive boxes have ordinary wear.
- One corner of the map has a crease from repeated folding.
- The same stairwell is marked on maintenance documentation and later memory notes.

## 3. Scene C8.2 — Recover C12
Entry:
- Evidence table active.

Objective:
- Compare formal attendance with actual physical activity.

Evidence:
- C12: 2012 attendance/assignment sheet.

Observation:
- Eight signatures.
- `09` mark appears in a work/assignment column rather than in the student-name list.

Character inference:
- The role existed inside the official paperwork as a placeholder for activity, while personal attribution was absent.

If C12 was already found in Ch7:
- This interaction recontextualizes it; do not award duplicate evidence.

## 4. Scene C8.3 — Reconstruct the route
Entry:
- C12 + C15 available.

Objective:
- Put the 00:17 incident in physical space.

Player action:
1. Align the school map.
2. Place 00:12 marker at the radio room.
3. Place 00:17 marker at the stairwell.
4. Place 00:18 marker at the return path.
5. Place 00:24 marker at the PA room.

Expected reconstruction:
- 00:12 Phương begins carrying equipment.
- 00:17 injury at stairwell.
- 00:18 a person returns for the recorder.
- 00:24 Vân returns/stops broadcast.

Validation:
- The map highlights the route only when the order is chronologically valid.
- Incorrect marker placement can be corrected without failure state.

No KCR yet.

## 5. Scene C8.4 — Phương's testimony becomes precise
Entry:
- Map reconstruction reaches 00:17.

Objective:
- Compare human memory with the route.

Mandatory evidence/state:
- C32: Phương testimony.

Dialogue/transcript:
`Minh ở đó. Nó cầm máy ghi âm.`
`Tao nhớ rõ vì lúc ấy nó không biết phải làm gì.`
`Nhưng tao không nhớ ai đã gọi nó là 09. Cái đó hình như có từ trước.`

Critical distinction:
- Phương remembers Minh as a person.
- She does not claim Minh invented the role.

Hypothesis impact:
- H3 gains named historical occupant without collapsing the role into one person.

## 6. Scene C8.5 — Open raw audio
Entry:
- Route markers valid.
- C32 available.

Player action:
- Activate raw audio packet.
- Scrub around 00:16:42–00:18:22.

Evidence:
- C33: raw 2012 audio.

Necessary transcript:
`00:16:42 room hum.`
`00:17:03 metal impact.`
`Phương: “Đau…”`
`Minh: “Đừng đứng dậy.”`
`Vân, distant: “Tắt mic đi.”`
`Minh: “Nhưng phải ghi lại.”`
`Vân: “Không phải lúc này.”`
`00:18:12 Minh, farther from mic: “Đóng cửa đi.”`
`00:18:15 several footsteps.`
`00:18:22 recording ends.`

Player action:
- The player can isolate voice segments and compare them with known evidence.
- No waveform puzzle is required to understand the transcript.

Narrative consequence:
- Exact 2012 event becomes reconstructable.
- The `Đóng cửa đi.` phrase pays off the unexplained Chapter 2 PA bleed; matching timbre/recording damage identifies that earlier anomaly as degraded archival audio, not a new speaker.

## 7. Scene C8.6 — KCR-E: archive folder resolves
Trigger:
- C33 established.
- C32 and C12 already linked to C33.
- `knowledge_2012_incident = true`.

Before state:
- Archive terminal shows eight active folders.
- Search for `09` returns partial/hidden result.

After state:
- Folder `09` becomes visible in the archive navigation.
- File `09_0017_raw` becomes linked to a specific historical event entry.
- A 09 folder contains records from 2012, not a single person's file.

Player-visible manifestation:
- No animation except a small index cursor refresh.
- Player can now open the role history without breaking the menu.

Audio:
- Low room tone includes a faint 2012 ventilation hum.

Lighting:
- Monitor brightness pulses once.

Spatial:
- No geometry change.

Gameplay consequence:
- Player gains access to the historical role sequence and a current witness designation preview.

Narrative meaning:
- Once the event is coherently understood, the archive can finally record the role as a historical object.

## 8. Scene C8.7 — What 09 actually carried
Entry:
- KCR-E active.

Objective:
- Compare role functions against historical evidence.

Player actions:
- Open role-history entries for 2012, 2016, 2021.
- Compare `after-hours operator`, `unofficial witness`, `evidence holder`, `responsibility without formal attribution`.

Important revelation:
- The same functions recur under different people.
- The institution kept the work stable while names changed.

No philosophical monologue.

## 9. Scene C8.8 — Accepting Khang's state
Entry:
- Role history reconstructed.
- C35 from Ch6 available.

Objective:
- Determine whether Khang is currently occupying the same witness-role.

Player action:
1. Play a live signal from the archive speaker.
2. Compare voice with known Khang recording.
3. Use the player's own evidence map to link Khang -> current 09 role.

Signal:
Khang: `Mày đã biết nó là cái gì rồi.`
Pause.
`Đừng để nó cần một cái tên nữa.`

Character knowledge update:
- `knowledge_khang_state = true` is now explicitly confirmed, not merely suspected.
- `witness_burden = understood` becomes true.

No explicit supernatural explanation.

## 10. Scene C8.9 — KCR-G: reflection recontextualizes witness
Trigger:
- `knowledge_khang_state = true`.
- `knowledge_2012_incident = true`.
- Player has compared Khang signal with role history.

Before state:
- Glass corridor reflection shows only An.

Player action:
- Walk past a glass cabinet.
- Stop.
- Look back at the reflection.

After state:
- Reflection briefly contains a second human outline occupying the exact Ninth spatial position behind An.
- When An turns directly, nothing is there.
- Looking back at the glass restores the extra outline for 2–3 seconds.

No chase.
No direct character model.

Audio:
- All room tone drops out for roughly one second.
- A 00:17 relay click remains.

Lighting:
- Backlight from corridor is reduced slightly.

Gameplay consequence:
- Player can now inspect a `witness` note in the evidence state panel.
- The next chapter's archive-core route becomes conditionally reachable.

Narrative meaning:
- The Ninth is not just a historical slot. It can attach to the current person who becomes its strongest witness.

## 11. Scene C8.10 — Chapter close
Player returns to archive table.

End visual:
- The evidence table now has a completed 2012 chain.
- The current witness line remains blank.
- Khang's name is not printed on the archive packet.

End audio:
- One current Khang signal: `An, đừng ghi tên tao vào đây.`
- Then silence.

End-of-chapter knowledge state:
- 2012 event is understood.
- Minh is confirmed as the 2012 Ninth occupant.
- 09 is a recurring institutional role across years.
- Khang is the current bearer/witness-anchor.
- KCR can respond to a coherent evidence set.
- The player's next problem is not identifying the Ninth's historical identity but deciding what to do with the living witness-state.

Transition to Ch9:
- The unresolved current-witness line and C35 route point to the archive core.

## 12. Evidence map
| Evidence/state | Required | Dependency | Function | Recovery |
|---|---|---|---|---|
| C12 | Yes before full reconstruction | C03/Ch7 packet | Formal eight + 09 work marker | Always in 2012 packet |
| C32 | Yes | Phương interaction | Human memory identifies Minh | Dialogue can be replayed |
| C33 | Yes | C32 + valid route reconstruction | Definitive 2012 audio | Raw packet remains until read |
| `knowledge_2012_incident` | Yes | C12 + C15 + C32 + C33 | Opens historical truth | Cannot be skipped in main path |
| `knowledge_khang_state` | Yes | C35 + role history + voice comparison | Current bearer state | Signal interaction repeatable |

## 13. Clue dependencies
C12 -> route reconstruction -> C32 -> C33 -> `knowledge_2012_incident` -> KCR-E.
C35 -> role history -> voice comparison -> `knowledge_khang_state` -> KCR-G.

Recovery:
- If C12 was missed in Ch7, it is physically included in the opened 2012 packet here.
- If the player skips testimony details, replay is available before raw audio.
- If the player does not inspect Khang's live signal, the signal repeats once after returning to the archive table.

## 14. Character knowledge state
### An
Start: `institution smoothed the record; Khang is current bearer`.
End: `2012 event is known; Khang is the current witness-anchor; preserving the role may affect the present witness`.

### Phương
Her memory is now corroborated by independent security/audio evidence.

### Vân
Her past decision is confirmed as intentional suppression but not malicious fabrication.

### Khang
Confirmed alive, state-bound, asking not to be stabilized by his personal name.

## 15. KCR state
### KCR-E
Trigger: coherent 2012 event reconstruction + C33.
Effect: historical 09 role folder becomes accessible.

### KCR-G
Trigger: `knowledge_khang_state = true` + explicit role comparison.
Effect: reflection reveals current witness relation.

## 16. Hypothesis impact
H1 `one erased student`: impossible.
H2 `cover-up only`: insufficient.
H3 `recurring role with reality effect`: confirmed as best operational model.
H4 `Khang abducted`: broken.
New final hypothesis: the role persists by attaching to people who become its strongest witness, while exact ontology remains unresolved.

## 17. Foreshadow/payoff
Pays off:
- Ch2 unscheduled `Đóng cửa đi.` PA bleed.
- Ch5 route and C15.
- Ch7 Vân memo and restricted packet.
- Ch6 C35 and C27.
- Ch4 multi-occupant reveal.

Foreshadows:
- Blank current-witness line -> Ch9 final choice.
- Khang's request not to be named -> witness-burden branch.
- Reflection outline -> final reframe, not a monster reveal.

## 18. Production acceptance tests
- Player can reconstruct the event without guessing a hidden password.
- C33 is not required to be found in a different chapter than its packet location.
- KCR-E changes archive access, not historical facts.
- KCR-G never spawns a persistent generic ghost.
- Khang remains alive and verbally identifiable.
- The player can understand the role without being told its metaphysical ontology.
- The `Đóng cửa đi.` phrase and degraded voice treatment match the Ch2 PA event closely enough to function as a fair retrospective payoff.

## 19. Post-Chapter QA + continuity audit
### Plot logic
PASS. The 2012 event follows directly from the timeline and independent evidence.

### Character motivation
PASS. Khang's current state is the result of his own investigation, not an arbitrary disappearance.

### Mystery fairness
PASS. The exact event can be reconstructed from map + security + testimony + raw audio.

### Clue dependencies
PASS. C12/C15/C32/C33 form a multi-source path; recovery exists.

### Timeline
PASS. 00:12, 00:17, 00:18, 00:24 are consistent with canonical timeline.

### KCR continuity
PASS after two trigger corrections: KCR-E now occurs only after C33; KCR-G follows confirmed current-bearer knowledge.

### Gameplay
PASS. Player physically constructs the event instead of reading a synopsis.

### Theme
PASS. Responsibility is separated from identity in a concrete archival action.

### Continuity result
ISSUES FOUND AND RESOLVED:
1. KCR-E was previously placed in Ch7 but required C33 from Ch8. Moved operational trigger to Ch8.
2. KCR-G previously used a loose “acceptance” trigger. Production definition now requires explicit evidence comparison and `knowledge_khang_state`.
3. KCR-F remains deferred to Ch9 because C35 is only a route seed at this point.
