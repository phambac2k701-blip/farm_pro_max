# IMPLEMENTATION HANDOFF — NARRATIVE PRODUCTION v1.1

## Narrative source of truth
Read in order:
1. `00_NARRATIVE_STATUS.md`
2. `01_CORE_PILLARS.md`
3. `04_CANON_STORY.md`
4. `06_CANONICAL_TIMELINE.md`
5. `07_MYSTERY_ARCHITECTURE.md`
6. `08_CLUE_GRAPH.md`
7. `09_KCR_MATRIX.md`
8. `10_CHAPTER_BIBLE.md`
9. `11_CHAPTER_01_VERTICAL_SLICE.md`
10. `20_CHAPTER_02_PRODUCTION.md` … `27_CHAPTER_09_PRODUCTION.md`
11. `12_ENDINGS.md`
12. `14_NARRATIVE_QA.md`
15. `15_DECISION_LOG.md`

## Core GameState
- `ch01_complete` … `ch09_complete`
- `knowledge_09_exists`
- `knowledge_09_is_role`
- `knowledge_multiple_occupants`
- `knowledge_2012_incident`
- `knowledge_khang_state`
- `khang_signal_found`
- `archive_packet_access_granted`
- `raw_audio_unlocked`
- `evidence_complete`
- `evidence_preserved`
- `evidence_shared`
- `vân_confronted`
- `phuong_testimony`
- `witness_burden`
- `current_witness_link_preserved`
- `action_B_selected`
- `action_C_selected`
- `procedural_containment`
- `ending_state`

## Evidence progression states
- Ch1: `knowledge_09_exists`
- Ch2: recurring `00:17` operational pattern established
- Ch3: `knowledge_09_is_role`
- Ch4: `knowledge_multiple_occupants`
- Ch5: `phuong_testimony`, KCR-B route state
- Ch6: `khang_signal_found`, `knowledge_khang_state` (current bearer)
- Ch7: `vân_confronted`, `archive_packet_access_granted`
- Ch8: `knowledge_2012_incident`, `raw_audio_unlocked`, KCR-E/G
- Ch9: `evidence_complete`, final action state, ending

## KCR triggers
### KCR-A
`discovered(C03) && discovered(C07)`
Ch1, persistent afterward.

### KCR-B
`discovered(C15) && phuong_testimony && player_at_historical_route`
Ch5 only.

### KCR-C
`discovered(C19) && footprint_inspected && player_reenters_room`
Ch3 only.

### KCR-D
`discovered(C22) && discovered(C26) && full_playback(C27)`
Ch6 only.

### KCR-E
`discovered(C33) && knowledge_2012_incident && route_reconstruction_valid`
Ch8 only.

### KCR-F
`khang_signal_found && knowledge_2012_incident && knowledge_khang_state && attempt_hidden_route`
Ch9 only. Discovery of C35 in Ch6 is a seed, not a trigger.

### KCR-G
`knowledge_khang_state && role_history_compared`
Ch8 only.

### KCR-H
`evidence_complete && action_B_selected && witness_burden`
Ch9 only.

## Chapter implementation rules
- Every mandatory clue has a redundant/recovery path.
- Optional clues never define a unique ending.
- KCR state is explicit and save/load persistent.
- No KCR state changes on elapsed time alone.
- No random prop shuffling.
- Do not spawn a generic ghost model as the Ninth.
- No supernatural effect may contradict the canonical timeline.
- Every chapter production file is authoritative for scene flow.

## Final choice implementation
Action A: preserve historical/context evidence, do not stabilize the present witness linkage; set `evidence_preserved = true`, `current_witness_link_preserved = false`, `witness_burden = false`. Khang is released, but current-state proof becomes unstable/unverifiable; Ending A.
Action B: sign current witness and preserve the complete historical + present-day chain; set `evidence_preserved = true`, `current_witness_link_preserved = true`, `witness_burden = true`; release Khang; triggers KCR-H and Ending B.
Action C: remove final stabilizing evidence; set `evidence_preserved = false`, `current_witness_link_preserved = false`; release Khang through unresolved route; Ending C.
Action D: available only with Vân/procedural state + incomplete evidence; keep `current_witness_link_preserved = false`; cleaned public record; Ending D.

## Asset categories
Locations: school gate, corridor, classroom, PA room, equipment classroom, records office, restricted archive bay, bus stop, Phương's print/alumni counter, rental room, maintenance corridor, archive core.

Props: desk, chair, headset, badge 09, roster, timetable, notebook, photos, archive boxes, recorder, phone, laptop, keys, evidence table, map, magnetic clips, current witness form.

Audio: rain, fluorescent hum, fan, relay click, 2012 raw recording, PA bleed, Khang voice notes, bus ambience, archive HVAC, deliberate silence.

## QA requirements
- Every KCR has before/after snapshot test.
- Every KCR has save/load regression test.
- Every chapter transition has explicit prerequisites.
- Every mandatory clue has a recovery route.
- Every ending has deterministic state predicates.
- Pre-recorded evidence must never causally answer a live line spoken after recording; the Ch6 naming response occurs only through the post-KCR-D live signal.
- Ending A and B must preserve different information: A preserves historical context but not stable current-state attribution; B preserves the full current-witness chain by assigning witness burden.
- Chapter 2–9 scene IDs are stable: `C2.1` through `C9.13`.
- Any narrative change affecting clue dependency, character knowledge, timeline or KCR must update its owning document and Decision Log.
