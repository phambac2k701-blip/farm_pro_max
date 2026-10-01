# CHAPTER 9 — NGƯỜI THỨ CHÍN
Production-ready narrative specification.

## 0. Chapter contract
- Time: 05:35–06:20.
- Primary locations: archive-core route, hidden maintenance door, final archive room, radio-room echo state, school exit.
- Starting state: Ch8 complete; 2012 incident understood; `knowledge_khang_state = true`; KCR-G active; C35 discovered.
- Primary question: Khang là Người Thứ Chín hiện tại, vậy An phải làm gì với sự thật đã được khôi phục?
- Player verbs: enter, compare, preserve, copy, sign, refuse, destroy, choose, return.
- Narrative answer: the Ninth is a recurring responsibility/witness role, and Khang is the current bearer. An's final decision determines whether evidence is preserved without a new named bearer, transferred to An, or suppressed.
- Final reframe: making an omitted responsibility visible carries a burden onto whoever insists on witnessing it.
- KCR-F and KCR-H occur only under explicit final-state conditions.

## 1. Entry conditions
Mandatory:
- `ch08_complete = true`.
- `knowledge_2012_incident = true`.
- `knowledge_khang_state = true`.
- C35 discovered.

## 2. Scene C9.1 — Find the absent door
Entry:
- Player returns to the PA/equipment corridor.

Objective:
- Locate the route mentioned by Khang: a door absent from the normal map.

Player actions:
1. Compare C35 wording with the physical corridor.
2. Inspect the old wall map.
3. Match cable route from Ch2/Ch8.
4. Examine a blank wall segment where a maintenance access should logically be.

Pre-KCR state:
- Wall is continuous.
- No usable door.

Environmental storytelling:
- Old paint boundary suggests maintenance work occurred here.
- Floor has two generations of cable brackets.
- Current school map skips the service corridor.

No KCR yet.

Exit condition:
- Player has compared C35 with the wall map and inspected the relevant maintenance seam.

## 3. Scene C9.2 — KCR-F: route becomes geographically real
Trigger:
- C35 discovered.
- `knowledge_2012_incident = true`.
- `knowledge_khang_state = true`.
- Player attempts the hidden maintenance seam.

Before state:
- Continuous wall.
- Route terminates.

After state:
- A narrow maintenance door is present with an ordinary metal handle.
- Door label is not `09`; it carries a faded facilities code.
- Behind it is the archive-core corridor.

No transition animation.

Audio:
- PA relay click.
- Khang's voice, very quiet: `Tao ở đây.`

Lighting:
- Exit light over the newly visible door turns on.
- Other hallway lighting unchanged.

Spatial consequence:
- Door collision exists only after trigger.
- Route is stable across save/load.

Narrative meaning:
- Current witness-state is now geographically represented.

## 4. Scene C9.3 — Archive-core approach
Entry:
- KCR-F active.

Objective:
- Find Khang and the final archive packet.

Player actions:
1. Walk the maintenance corridor.
2. Inspect room numbers and old service labels.
3. Follow a faint audio signal.
4. Open final archive door using the `PA` key from C26.

Environmental storytelling:
- Corridor is narrower and more utilitarian than public school spaces.
- No occult symbols.
- Old cable routing creates physical continuity with Ch2/Ch3.

Audio:
- Dripping pipe.
- Amplifier bleed.
- No music.

Exit condition:
- Archive-core door opened.

## 5. Scene C9.4 — Khang in the Ninth-state
Location:
- Final archive room.

Objective:
- Establish Khang's physical condition and communicate with him.

Presentation:
- Khang is not a transparent ghost.
- He is physically present in an ordinary school service space, but the room's geometry and documents continuously arrange around his position.
- His face is visible.
- He does not appear injured beyond fatigue/dehydration appropriate to the night.

Player interaction:
- Approach.
- Speak authored prompts, not dialogue-tree skill checks.

Khang's key dialogue:
- `Tao không bị bắt.`
- `Tao chỉ không tìm được đường ra như trước nữa.`
- `Mỗi lần mày gọi đúng tên tao, chỗ này lại dễ tìm tao hơn.`
- `Nhưng nếu chỗ này cần tao để tồn tại, thì nó sẽ lại cần một người khác.`

Narrative rule:
- Khang does not explain the ontology of KCR.
- He explains his experience only.

Character state:
- Khang understands he is the current bearer but does not know whether the role has always worked this way.

## 6. Scene C9.5 — The final archive packet
Entry:
- Khang interaction complete.

Objective:
- Inspect the final packet and determine what is actually being preserved.

Interactables:
- 2012 roster.
- Raw audio reference.
- 09 role-history sheet.
- Current witness form.
- Blank signature line.
- Evidence-copy drive.

Mandatory evidence:
- C36: final archive packet with blank current-witness line.

C36 visible text:
`NGƯỜI PHỤ TRÁCH HIỆN TẠI: __________________`
A faint legacy stamp beside it:
`09`

Player can inspect front/back.

Narrative meaning:
- The institution's paperwork can preserve the role, but current continuity expects a named witness.

## 7. Scene C9.6 — Compare everything
Entry:
- C36 opened.

Objective:
- Give the player one final authored synthesis opportunity without a summary monologue.

Player action:
- Place four evidence cards on the final table:
  1. official eight-member record;
  2. 2012 incident audio;
  3. multiple-occupant role history;
  4. Khang current-state evidence.

The table highlights only connections the player has actually established.

Required knowledge state:
- `evidence_complete = true` if all mandatory evidence families have been acquired.

Optional completeness:
- C10/C11/C18/C20/C24/C25 improve confidence but cannot change the canonical solution.

## 8. Scene C9.7 — Final decision setup
Khang says:
- `Có ba cách. Nhưng không có cách nào làm mọi thứ như cũ.`

This is the only explicit framing of the final choice.

The player is presented with three concrete actions, plus a fourth conditional administrative path:

### Action A — Preserve historical context, do not stabilize a new bearer
- Preserve the 2012 event, role history, and contextual archive.
- Keep the current-witness line blank.
- Deliberately exclude the live/current-witness linkage from becoming a stable official record.
- Set: `evidence_preserved = true`; `current_witness_link_preserved = false`; `witness_burden = false`; `evidence_shared = historical_only`.
- Khang can return because the present bearer-link is allowed to collapse, but proof of his current Ninth-state becomes unstable/unverifiable.

### Action B — Accept current witness designation
- Sign current line as An.
- Preserve the full historical **and present-day witness** evidence chain.
- Release Khang from the current bearer position.
- Set: `evidence_preserved = true`; `current_witness_link_preserved = true`; `witness_burden = true`; `evidence_shared = limited`.
- Triggers KCR-H.
- Unlike Action A, the current KCR/witness evidence remains coherent and verifiable because An has accepted the designation.

### Action C — Remove the final stabilizing evidence
- Destroy or withhold the final packet needed to bind the role to the present.
- Set: `evidence_preserved = false`; `current_witness_link_preserved = false`; `witness_burden = false`.
- Khang can leave through the unstable route, but the full mechanism cannot be proved.

### Action D — Clean-record procedure (conditional)
Visible only if:
- `vân_confronted = true`.
- `evidence_complete = false`.
- player has explicitly chosen procedural containment in Ch7.

Action:
- Return packet to official archive.
- Mark duplicate as removed.
- Preserve only non-controversial summary.
- Set: `evidence_preserved = incomplete`; `witness_burden = false`.

No moral UI language such as `good/bad`.

## 9. Scene C9.8 — KCR-H for witness designation
Trigger:
- Action B selected.
- `evidence_complete = true`.
- `witness_burden = true`.

Before:
- Current-witness line blank.
- Khang still occupies the visible Ninth-state.

Player action:
- Sign name.
- Lift pen.
- Look back at the packet.

After:
- The blank line changes to `09 — current witness: An`.
- Khang becomes fully physically present outside the role-state.
- The ninth chair in the radio room is now empty but remains in place.

Audio:
- 00:17 room tone.
- One relay click.
- Then normal dawn ambience.

Lighting:
- Archive light becomes ordinary daylight-balanced fluorescent.

Spatial consequence:
- The archive room returns to normal geometry.
- No human body disappears.

Narrative meaning:
- The role has been preserved by assigning its burden to a current witness.

## 10. Scene C9.9 — Ending A: “Đủ hồ sơ”
Trigger:
- Action A.
- Core evidence complete.
- Khang located.
- No personal witness designation.

Resolution:
- An stores a contextualized historical archive copy.
- The role is explicitly described as an unassigned recurring duty position rather than a person.
- Khang returns to ordinary space because the current bearer-link is not stabilized or reassigned.
- Cost: live-signal attribution and some present-day Khang/Ninth-state records lose stable identity, so the historical truth is preserved while the current phenomenon is no longer fully provable.

Final image:
- Eight official seats.
- A ninth work station remains folded/unoccupied.
- Archive text lists `09 — vị trí công việc không gắn tên`.

Final knowledge state:
- The historical truth is preserved without inventing a singular Ninth person.
- Khang survives.
- The player gives up stable proof of Khang's present-day Ninth-state.
- The ontology of KCR remains unresolved.

## 11. Scene C9.10 — Ending B: “Người ghi tên”
Trigger:
- Action B.

Resolution:
- Khang returns.
- The complete current witness/KCR evidence remains stable and attributable.
- An becomes the current witness designation.
- No one comments that An is “crazy” or special.
- The archive system treats the designation as ordinary.

Final image:
- One old photo now has a blank space where An should be, but nobody reacts to it.
- A ninth chair remains in the radio room.

Final knowledge state:
- An understands the cost of documentation.
- Khang is free from the current anchor.
- The role survives as a witness burden.

## 12. Scene C9.11 — Ending C: “Không ai là người thứ chín”
Trigger:
- Action C.

Resolution:
- Khang escapes through the unstable route before it closes.
- The school returns to eight visible stations.
- One anonymous raw audio copy remains outside the official archive.

Final image:
- Empty radio room with eight seats.
- On the floor, a single unlabeled 00:17 recorder file remains on the player's copied device.

Final knowledge state:
- Player knows enough to suspect the truth but cannot fully prove the mechanism.
- Khang survives.
- Public record remains incomplete.

## 13. Scene C9.12 — Ending D: “Bản ghi sạch”
Trigger:
- Action D.

Resolution:
- Official archive retains a cleaned summary.
- Duplicate contextual evidence is removed.
- Khang is not fully resolved by the archive-state during the ending.

Final image:
- Anniversary page with eight names.
- Footnote: `kiểm tra thiết bị 00:17`.
- No explicit KCR event.

Final knowledge state:
- An knows what was omitted but chose containment.
- The institution remains capable of recreating the same role.

## 14. Scene C9.13 — Exit / epilogue beat
All endings return control briefly to An at the school gate at dawn.

No narration explains the moral.

Shared audio:
- Street traffic.
- Birds.
- School gate vibration.

Ending-specific visual:
- A: school noticeboard lists `09 — vị trí hỗ trợ`.
- B: An's phone shows no contact-name for Khang for one second, then returns.
- C: copied recorder file shows `00:17_raw` with no source path.
- D: anniversary poster hangs perfectly straight except one bottom corner that keeps lifting.

## 15. Evidence / dependency map
| Evidence/state | Required | Dependency | Function | Recovery |
|---|---|---|---|---|
| C35 | Yes | Ch6 | Current-route signal | Replayed at archive terminal |
| C36 | Yes | Ch8 understanding | Final choice object | Cannot be permanently missed |
| `evidence_complete` | Yes for A/B | All mandatory evidence families | Determines full-truth ending eligibility | Mandatory path repairs missing optional clues |
| `vân_confronted` | Conditional | Ch7 | Enables Ending D branch | Only required for D |

## 16. Character knowledge state
### An
Start: `2012 event known; Khang current bearer`.
End varies by ending:
- A: understands truth and preserves it without taking role.
- B: understands truth and accepts witness burden.
- C: understands truth incompletely and prioritizes release over institutional proof.
- D: understands truth but chooses procedural containment.

### Khang
Start: current bearer.
End: free in A/B/C; unresolved in D.

### Vân
A/B: becomes a reluctant witness to the preserved record.
C: does not know the full outcome.
D: receives cleaned archive state.

## 17. KCR state
### KCR-F
New trigger:
`khang_signal_found && knowledge_2012_incident && knowledge_khang_state && attempt_hidden_route`

### KCR-H
New trigger:
`evidence_complete && witness_burden == true && action_B_selected`

KCR-H does not trigger on Action A, C, or D.

## 18. Hypothesis impact
Final hypothesis is not a new mystery theory; it is a synthesis:
- The Ninth is a recurring institutional role.
- The role became entangled with evidence and witness.
- Khang is the current bearer.
- The institution's omission is human and procedural.
- KCR remains ontologically ambiguous but operationally deterministic.

## 19. Foreshadow/payoff
Pays off:
- 00:17 recurrence.
- 09 badge/role.
- multiple occupants.
- Vân's omission.
- Khang's warning not to stabilize him by name.
- blank current-witness line.

Final payoff:
- `Real places, slightly wrong` resolves as ordinary spaces adapting around the same social role.
- The title `Người Thứ Chín` resolves as a function/witness relation, not a single monster identity.

## 20. Production acceptance tests
- All endings are reachable through explicit state combinations.
- Ending A and Ending B are not dominance-equivalent: A frees Khang while sacrificing stable proof of the present witness-state; B preserves that complete proof by assigning the burden to An.
- No ending depends on hidden morality score.
- Action B is the only path that triggers KCR-H.
- KCR-F cannot occur before Ch9.
- Khang is not killed to create a final twist.
- The final image does not explain the metaphysics.
- Ending C preserves enough evidence to make the story emotionally legible without preserving institutional proof.
- Ending D is only available when the player actually chose the Vân/procedural path and lacks complete evidence.
- Save/load at final choice preserves branch state exactly.

## 21. Post-Chapter QA + continuity audit
### Plot logic
PASS. Final route, Khang state, archive packet and ending actions form a closed causal chain.

### Character motivation
PASS. Khang wants release; An wants truth/Khang; Vân wants contextual control.

### Mystery fairness
PASS. The player receives enough evidence before the final choice to understand the operational model.

### Clue dependencies
PASS. C35 seeds the route; C36 is the final state object; optional evidence cannot create a false canon.

### Timeline
PASS. Dawn exit follows the accumulated 00:17 investigation and remains after the 2012 reconstruction.

### KCR continuity
PASS after trigger rewrite. KCR-F is now gated by present-bearer knowledge plus explicit route attempt. KCR-H is gated by the witness-designation choice.

### Gameplay
PASS. Final outcome is produced by the player's evidence-preservation action, not by watching a cutscene.

### Theme
PASS. Every ending demonstrates a distinct consequence of deciding what to record, assign, or erase. A/B now carry a concrete informational tradeoff: historical preservation without present attribution versus complete preservation with witness burden.

### Horror
PASS. The final horror is social/physical continuity, not a monster reveal.

### Continuity result
NO NEW CONTRADICTION FOUND AFTER TRIGGER REFINEMENT.
