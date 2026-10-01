# Chapter 1 Vertical Slice Implementation Plan

Status: READY FOR LINEAR ISSUE CREATION
Narrative: NAR-PRODUCTION-v1.2
Architecture: docs/production/CH01_PRODUCTION_ARCHITECTURE.md
Gap analysis: docs/production/CH01_NARRATIVE_TECHNICAL_GAP_ANALYSIS.md

## Execution order
BAC-22 → BAC-23 → BAC-24 → BAC-25 → BAC-26 → BAC-27 → BAC-28 → BAC-29 → BAC-30 → BAC-31.

Tasks may overlap only where dependencies are already satisfied. Do not start Chapter 2 gameplay.

## BAC-22 — Production chapter state, checkpoints and save v2

Purpose: establish deterministic Chapter 1 lifecycle and persistence before content depends on it.

Files/systems:
- src/game/chapter/ChapterRuntime.ts
- src/content/chapters/ch01/state.ts
- src/game/save/SaveService.ts
- tests/game/chapter/*
- tests/game/save/*

Narrative coverage:
- chapter start/end state;
- all critical Ch1 checkpoints;
- save/load requirements around evidence/KCR/inspection/chapter end.

Dependencies: Technical Prototype V1 only.

Implementation:
1. Define stable Ch1 checkpoint IDs and progression facts.
2. Add ChapterRuntime with idempotent checkpoint and completion APIs.
3. Extend save envelope to schema v2 with checkpoint/safe resume data.
4. Decide and document v1 migration/reset behavior.
5. Preserve existing corrupt-save recovery.
6. Add safe resume semantics for saves taken during inspection.

Tests:
- checkpoint monotonic/idempotent behavior;
- v2 roundtrip;
- v1 handling;
- corrupt/unsupported save;
- mid-inspection safe resume representation;
- chapter completion state.

Runtime verification:
- new game boots at gate checkpoint;
- seeded v2 save restores expected checkpoint/state.

Definition of Done:
- tests/typecheck/build pass;
- no silent v1 reinterpretation;
- durable Ch1 state IDs documented;
- docs/PROGRESS.md and Linear updated.

## BAC-23 — Production Chapter 1 scene shell and traversal

Purpose: replace the prototype corridor/classroom-only map with the production Ch1 route.

Files/systems:
- src/content/chapters/ch01/scene/*
- bootstrap/main composition
- tests/content/ch01 scene tests

Narrative coverage:
- Scene 1.1 gate;
- Scene 1.2 guard shelter;
- Scene 1.3 corridor;
- Scene 1.4 classroom;
- Scene 1.7 PA room threshold/interior.

Dependencies: BAC-22.

Implementation:
1. Build typed scene references for gate, shelter, side entrance, corridor, classroom, PA room.
2. Create collision-safe route and authored spawn/checkpoint anchors.
3. Add eight visible PA stations and before-KCR ninth variant nodes disabled.
4. Add base rain-night lighting and Vietnamese-school signage/material cues.
5. Remove prototype Hero Book and ninth-desk content from the production bootstrap path.
6. Keep primitive geometry acceptable where presentation remains readable.

Tests:
- all critical refs exist;
- expected before-state counts;
- KCR variant disabled by default;
- spawn/checkpoint anchors valid.

Runtime verification:
- walk gate → shelter → side entrance → corridor → classroom → PA room;
- no wall/furniture collision trap;
- pointer-lock/movement unchanged.

Definition of Done:
- route is fully traversable;
- no prototype book is required for progression;
- no broken collision;
- tests/typecheck/build/browser smoke pass.

## BAC-24 — Shared production interaction behaviors

Purpose: support Ch1 tactile gameplay without object-specific frameworks.

Files/systems:
- src/interaction/behaviors/InteractionBehaviorHost.ts
- src/interaction/behaviors/OpenableController.ts
- src/interaction/inspection/InspectionSession.ts
- src/interaction/inspection/DocumentInspectionController.ts
- src/interaction/inspection/PhotoInspectionController.ts
- src/interaction/behaviors/PickupController.ts
- tests/interaction/*

Narrative coverage:
- doors;
- drawer;
- document inspection;
- photo inspection;
- tutorial pickup.

Dependencies: BAC-22, BAC-23.

Implementation:
1. Add thin ID→behavior coordinator under existing InteractionSystem ownership.
2. Implement spam-safe hinged/linear openable behavior and collision sync.
3. Implement inspection session using CameraDirector focus/restore.
4. Add readable document/photo adapters.
5. Add lightweight pickup behavior with optional persistent fact.
6. Guarantee Escape/focus-loss cancellation routes.

Tests:
- behavior enter/update/cancel ownership;
- door/drawer open-close spam;
- locked predicate;
- inspection discovery only after readable state;
- cancel/restore;
- pickup idempotence.

Runtime verification:
- interact with at least one door, drawer, document, photo and pickup;
- camera returns exactly;
- locomotion never deadlocks.

Definition of Done:
- no large ID switch in main;
- existing interaction/camera regression tests pass;
- new behaviors work in browser.

## BAC-25 — Opening phone and classroom evidence flow C01/C02/C03/C05/C14

Purpose: turn the first half of Ch1 into a real investigation flow.

Files/systems:
- src/content/chapters/ch01/evidence.ts
- src/content/chapters/ch01/ChapterOneOpeningController.ts
- phone UI/presentation
- classroom interactable wiring
- evidence comparison controller/UI
- tests/content/ch01/*

Narrative coverage:
- 00:17 message;
- “Trường cũ. Phòng phát thanh.”;
- “Đừng gọi ai.”;
- phone image;
- C01, C02, C03, C05 seed/reveal, optional C14;
- roster/photo comparison;
- corridor bell one-shot;
- recovery if optional clue is skipped.

Dependencies: BAC-24.

Implementation:
1. Replace prototype evidence catalog with production Ch1 definitions.
2. Implement resume-safe phone opening sequence and C01.
3. Implement classroom roster C03 and photo handling.
4. Implement authored roster/photo comparison for C02.
5. Reveal 09 drawer label only after the intended roster beat.
6. Implement C14 as optional evidence with no progression gate.
7. Add corridor return bell as a one-shot state fact.
8. Ensure mandatory path never depends on C14.

Tests:
- C01 sequence resume;
- C02 dependency/recovery behavior;
- C03 idempotence;
- conditional 09 reveal;
- optional clue miss path;
- one-shot bell fact.

Runtime verification:
- clean play from gate through classroom contradiction;
- intentionally skip C14 and continue;
- repeated document/photo interaction produces no duplicates.

Definition of Done:
- first contradiction is player-caused and readable;
- no popup substitutes for tactile inspection;
- tests/typecheck/build/runtime smoke pass.

## BAC-26 — Production AudioDirector and Chapter 1 audio assets

Purpose: replace procedural prototype audio with an authored, state-aware audio layer.

Files/systems:
- src/audio/AudioDirector.ts
- src/content/chapters/ch01/audio.ts
- assets/runtime/audio/ch01/*
- caption/subtitle hooks
- tests/audio/*

Narrative coverage:
- rain;
- traffic;
- fluorescent hum;
- room tone;
- footsteps baseline;
- door/drawer/paper;
- phone vibration;
- corridor bell;
- PA/amplifier hum;
- KCR channel click;
- headset breathing/chair scrape;
- relay click;
- Khang climax line.

Dependencies: BAC-23; can be developed after BAC-24 but must be complete before BAC-28 closes.

Implementation:
1. Use Babylon/Web Audio under a game-owned AudioDirector.
2. Handle browser unlock/resume on first user action.
3. Support ambience layers, one-shots, spatial emitters, fades/ducking and disposal.
4. Add typed Ch1 audio manifest.
5. Integrate authored/licensed audio files; record license/source metadata where applicable.
6. Provide captions for speech and critical authored clues.
7. Remove PrototypeBookAudio from production path.

Tests:
- manifest lookup/error behavior;
- state/mix changes;
- duplicate one-shot guard where required;
- spatial emitter registration/disposal;
- noncritical missing file does not block progression.

Runtime verification:
- audio unlock works;
- rain/hum layering is stable;
- spatial headset/PA localization works;
- no constant horror drone;
- no procedural placeholder remains for narrative-critical final Ch1 beats.

Definition of Done:
- authored/licensed assets are present or an explicit blocking dependency is documented;
- captions exist for Khang speech;
- browser audio smoke passes.

## BAC-27 — PA-room investigation, C07 and deterministic KCR-A

Purpose: implement the central Chapter 1 knowledge-to-reality change exactly as narrative specifies.

Files/systems:
- src/content/chapters/ch01/reality.ts
- PA-room interactables/content
- RealitySystem wiring
- tests/reality/ch01/*

Narrative coverage:
- eight stations before;
- scratched 09;
- hidden cable;
- C07 index card;
- C03 + C07 threshold;
- leave/re-enter reveal;
- ninth chair/headset;
- subtle lighting/audio change.

Dependencies: BAC-25; BAC-26 audio interface available.

Implementation:
1. Implement C07 tactile index-card inspection.
2. Set KCR-A ready only from C03 + C07.
3. Require controlled PA-room leave/re-entry for application.
4. Replace prototype ninth-desk rule with ninth chair/headset applier.
5. Synchronize collision, light and audio state.
6. Use RealitySystem.syncApplied() on load.
7. Keep shift unannounced and deterministic.

Tests:
- before C03/C07 not ready;
- each single clue insufficient;
- ready after both;
- no apply until re-entry;
- apply once;
- restore applied state after reload;
- no duplicate evidence/KCR.

Runtime verification:
- count eight before;
- collect threshold;
- leave without watching room;
- return to nine;
- save/reload before-ready, ready-before-reentry and after-applied.

Definition of Done:
- KCR-A matches matrix and Ch1 spec exactly;
- no classroom ninth-desk production shift remains;
- tests/typecheck/build/browser smoke pass.

## BAC-28 — Ninth-headset interaction and Chapter 1 climax

Purpose: deliver the authored chapter climax after KCR-A.

Files/systems:
- src/content/chapters/ch01/ChapterOneClimaxController.ts
- ninth-headset interaction
- phone/PA presentation
- subtitles
- tests/content/ch01/climax*

Narrative coverage:
- 2.5-second breathing + chair scrape near unplugged headset;
- inspect headset;
- Khang message “Đừng để nó thành người.”;
- PA click;
- Khang: “An? Mày tới rồi à?”;
- no exposition.

Dependencies: BAC-26, BAC-27.

Implementation:
1. Add spatial proximity cue for ninth headset.
2. Add inspect interaction gated on KCR-A.
3. Implement deterministic step sequence for message → PA click → Khang line.
4. Persist irreversible climax step/checkpoint safely.
5. Ensure reload cannot duplicate or softlock the sequence.
6. Preserve normal camera/interaction ownership.

Tests:
- prerequisite gating;
- sequence order;
- resume from safe checkpoint;
- cancellation/focus-loss handling;
- no double-complete.

Runtime verification:
- full sequence plays with authored audio/captions;
- interaction ownership returns cleanly;
- no hard camera snap.

Definition of Done:
- climax is playable and not a cutscene-only replacement for investigation;
- audio/state behavior matches narrative.

## BAC-29 — Final reflection beat and Chapter 1 transition boundary

Purpose: close Ch1 with the specified visual/audio hook and a deterministic transition to the Ch2 boundary.

Files/systems:
- photo-board/reflection content
- chapter completion wiring
- transition/end-card/loading boundary
- tests/content/ch01/transition*

Narrative coverage:
- extra shoulder in glass reflection;
- vanishes on direct look;
- rain + relay click;
- corridor-door exit condition;
- ch01_complete;
- handoff to Ch2 without implementing Ch2.

Dependencies: BAC-28.

Implementation:
1. Implement authored shoulder/reflection representation without a monster model.
2. Gate it after climax and make direct-look disappearance deterministic.
3. Complete chapter only through the corridor-door exit.
4. Set ch01_complete, chapter ch02 and chapter-complete checkpoint.
5. Show transition/end-card/loading boundary only.

Tests:
- visual gate fact;
- chapter prerequisite;
- transition idempotence;
- save/load chapter-end state.

Runtime verification:
- final image/audio beat reads correctly;
- transition occurs once;
- reloading complete save does not replay Ch1 incorrectly.

Definition of Done:
- Chapter 1 has a strong authored close;
- no Ch2 gameplay created.

## BAC-30 — Vertical-slice presentation, recovery and regression pass

Purpose: raise the implemented chapter from functional production flow to vertical-slice presentation and close systemic edge cases.

Files/systems:
- Ch1 materials/lighting/decals/signage;
- audio mix;
- evidence/compare UI;
- save/checkpoint tuning;
- regression tests/docs.

Narrative coverage:
- “real Vietnamese school, slightly wrong”;
- readable evidence;
- subtle KCR;
- no haunted-house/occult/monster drift.

Dependencies: BAC-29.

Implementation:
1. Improve school-specific composition/material readability with bounded asset work.
2. Tune fluorescent/rain/room audio mix and silence dropouts.
3. Ensure evidence UI remains restrained.
4. Run save/reload matrix: new game, mid-Ch1, pre-KCR, ready-pre-reentry, post-KCR, during/after inspection, climax, chapter-end, corrupt save.
5. Run miss-optional, repeat-interact, Escape/cancel, focus-loss and collision edge cases.
6. Fix discovered regressions and rerun affected gates.

Tests:
- full automated suite;
- added regression cases for every fixed bug.

Runtime verification:
- representative screenshots;
- console/network audit;
- performance smoke on target desktop browser.

Definition of Done:
- no Critical/Important Ch1 regression remains;
- no progression softlock;
- presentation meets vertical-slice bar without uncontrolled polish scope.

## BAC-31 — Full Chapter 1 verification, deploy and clean checkpoint

Purpose: prove the complete vertical slice end-to-end and stop at a recoverable milestone.

Files/systems:
- docs/PLAYTEST_CH01_VERTICAL_SLICE.md
- docs/PROGRESS.md
- docs/SESSION_CONTINUITY.md
- architecture/ADR updates if required
- deployment workflow only if necessary

Narrative coverage:
- full Ch1 00:17 hook → investigation → contradiction → evidence → KCR-A → climax → transition.

Dependencies: BAC-30.

Required playtest gate:
1. clean new-game playthrough;
2. normal exploration;
3. miss optional clues;
4. repeated interact spam;
5. Escape/cancel during interactions;
6. save/reload before clue;
7. save/reload after clue;
8. save/reload after KCR;
9. collision edge cases;
10. pointer-lock/focus-loss;
11. chapter-end transition;
12. console/network audit.

Verification:
- all tests pass;
- typecheck pass;
- production build pass;
- deployed preview succeeds;
- clean-save full Ch1 playthrough succeeds;
- screenshots/logs saved;
- Linear updated.

Checkpoint:
- write CHAPTER 1 VERTICAL SLICE COMPLETE;
- record branch, final commit, preview URL, test/build/runtime evidence, known non-blocking issues, new reusable systems, technical debt and Ch2 lessons;
- create a clean milestone tag if appropriate;
- STOP.

## Global Definition of Done

Chapter 1 is complete only when:
- the production narrative flow is playable start to finish;
- mandatory clues are reachable and optional clues cannot softlock;
- KCR-A is deterministic, correct and persistent;
- movement/camera/interactions retain the Technical Prototype V1 quality floor;
- no interaction ownership deadlock, camera restore bug, broken collision, duplicate evidence or duplicate KCR application remains;
- narrative-critical audio is authored rather than procedural placeholder;
- save/load passes every critical state;
- build/runtime/deploy/playtest gates pass;
- docs and Linear are current;
- final commit is clean.

After BAC-31: STOP. Do not start Chapter 2.
