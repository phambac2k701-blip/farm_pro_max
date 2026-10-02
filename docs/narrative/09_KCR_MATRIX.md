# KCR MATRIX — PRODUCTION v1.1

| ID | Chapter | Before | Trigger | After | Player may notice | Audio | Lighting | Spatial/collision | Gameplay consequence | Narrative meaning | Foreshadow | Payoff |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| KCR-A | Ch1 | Radio room has 8 active stations | C03 + C07 | Ninth headset/chair exists | Count stations before/after leaving | One faint channel click | Desk lamp warms slightly | New chair collision | Inspect new station | Evidence begins to resolve omitted role physically | Wrong counts | Ch3 role/station inference |
| KCR-B | Ch5 | 2012 stair route looks like ordinary worn stairwell | `C15_discovered && phuong_testimony && player_at_historical_route` | Route acquires a fresh historical scrape / one additional step | Compare rail/step state against old route | Doubled footstep then silence | Brief tube dim | Barrier shifts; one step becomes traversable | Inspect route continuation | Place remembers repeated role-use after cross-source corroboration | Ch2 route marker, Ch3 footprint | Ch8 route reconstruction |
| KCR-C | Ch3 | Cabinet shows 8 official badges; C19 sits in hidden drawer | `C19_discovered && footprint_inspected && player_reenters_room` | Cabinet resolves a ninth role slot and hangs 09 badge in it | Compare cabinet before/after | Dry metal click | Stable room light; cabinet interior darker | New hook + compartment | Inspect new role compartment | Role becomes a spatially encoded assignment | C19, cable route | Ch4 multiple occupants |
| KCR-D | Ch6 | Rental desk holds ordinary archive materials; recorder appears inactive | `C22 && C26 && C27_full_playback` | Recorder activates as witness-anchor; papers settle into 8+1 pattern | Re-check recorder and desk arrangement | Motor hiss + Khang breath | Desk lamp hum changes | Desk layout mirrors radio room, no new route | `listen_live` available | Current investigation begins attaching to witness-state | Khang naming warning | Ch8 current-bearer confirmation |
| KCR-E | Ch8 | Archive terminal exposes 8 active folders; 09 search is partial/locked | `C33 && knowledge_2012_incident && route_reconstruction_valid` | Folder 09 becomes historical role directory | Refresh reveals role folder and date range | 2012 ventilation hum | Monitor brightness pulses once | No geometry change | Open role-history entries | Once event is coherent, archive can represent the role explicitly | C29, raw packet | Ch9 final witness decision |
| KCR-F | Ch9 | Hidden maintenance route is absent from wall/map | `khang_signal_found && knowledge_2012_incident && knowledge_khang_state && attempt_hidden_route` | Maintenance door and archive-core corridor exist | Door seam/handle becomes usable | Khang whisper + relay click | Exit light turns on | New door collision / route | Reach archive core | Current witness-state becomes geographically represented | C35, Ch8 reflection | Final archive encounter |
| KCR-G | Ch8 | Glass reflection shows only An | `knowledge_khang_state && role_history_compared` | Reflection briefly includes a second Ninth-position outline | Look back at glass after hearing Khang | Room tone drops; relay click remains | Backlight lowers slightly | No geometry change | Inspect witness state; test comparison | Ninth is a witness relation, not only a historical object | Ch4 repeated positions, Ch6 naming rule | Ch9 witness burden |
| KCR-H | Ch9 | Final packet has blank current-witness line | `evidence_complete && action_B_selected && witness_burden` | Blank line resolves to `09 — current witness: An`; Khang releases | Read packet before/after action | 00:17 tone then normal dawn ambience | Archive light returns to ordinary state | Radio-room ninth chair remains but is empty | Ending B state; save final branch | Preserving truth can assign its burden to the present witness | Blank signature line | Ending B |

## Operational notes
KCR is deterministic and state-driven. A KCR event never triggers from time alone.

`World representation` is broader than room geometry: a KCR manifestation may resolve physical space, object arrangement, archive/index state, a linked device/audio state, or an authored reflection. Each event must still use the exact before/trigger/after contract documented in this matrix.

### Required state keys
- `ch01_complete` … `ch09_complete`
- `knowledge_09_exists`
- `knowledge_09_is_role`
- `knowledge_multiple_occupants`
- `knowledge_2012_incident`
- `knowledge_khang_state`
- `khang_signal_found`
- `archive_packet_access_granted`
- `evidence_complete`
- `evidence_preserved`
- `evidence_shared`
- `vân_confronted`
- `phuong_testimony`
- `witness_burden`
- `action_B_selected`
- `action_C_selected`
- `procedural_containment`

### Trigger discipline
- KCR-A is established in Ch1 and persists.
- KCR-B is a Ch5 event and cannot occur from C15 alone.
- KCR-C is a Ch3 role-slot event; it does not introduce a named person.
- KCR-D is a Ch6 witness-anchor event; it does not open the final route.
- KCR-E is a Ch8 archive-resolution event and requires C33.
- C35 can be found in Ch6, but does not open KCR-F early.
- KCR-F is exclusively a Ch9 route event.
- KCR-G is a Ch8 interpretation-state event, not a separate physical room change.
- KCR-H is only the witness-designation ending transition.

## Escalation rule
Early: subtle wrong count/position.
Mid: unmistakable spatial evidence but still interpretable.
Late: direct route/state consequence affecting the ending decision.

## Anti-abuse rule
Do not implement KCR with random procedural generation, random prop shuffling, or undocumented hidden thresholds. Every visible change must map to a named state and a documented clue dependency.
