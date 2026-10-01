# Chapter 1 Production Architecture

Status: APPROVED FOR IMPLEMENTATION PLANNING
Narrative: NAR-PRODUCTION-v1.2
Depends on: CH01_NARRATIVE_TECHNICAL_GAP_ANALYSIS.md

## Goal
Implement Chapter 1 as a playable vertical slice while preserving the verified Technical Prototype V1 systems. New infrastructure is limited to requirements actually exercised by Chapter 1.

## Reuse-first review
Keep EngineAdapter, PlayerController/InputRouter, InteractionSystem/InteractionStateMachine, CameraDirector, GameState/GameEvents, EvidenceSystem, RealitySystem and SaveService as the game-owned boundaries.

Current Babylon.js 9.x documentation confirms that Babylon already provides the primitives needed for transform animation/easing, spatial audio and async asset loading. Chapter 1 therefore does not justify a tween library, separate audio engine or generic asset framework. Valibot remains the save validation dependency.

## ChapterRuntime
Add a small chapter lifecycle coordinator. It owns the durable Chapter 1 checkpoint, translates persistent state into a safe resume point, exposes idempotent checkpoint/chapter completion APIs, and coordinates chapter-scoped one-shot facts. It is not a quest engine and does not own evidence, audio or rendering.

Proposed files:
- src/game/chapter/ChapterRuntime.ts
- src/content/chapters/ch01/state.ts

Minimum durable checkpoints are gate, inside old wing, classroom before/after C03, PA room before C07, KCR ready, KCR applied, climax complete and chapter complete.

## Save schema v2
SaveService remains the only browser storage boundary. Schema v2 adds checkpoint identity and safe player resume data while retaining GameStateSnapshot and settings.

Do not serialize camera blends, active door tween frames or inspection animation progress. If a save occurs during an inspection, reload at the nearest safe checkpoint with persistent facts/evidence intact.

Prototype schema v1 is pre-production. Either migrate it deterministically to a safe Chapter 1 checkpoint or explicitly reset it with a documented version reason. Never silently reinterpret v1 as v2.

## Production scene composition
Replace the prototype scene content with a typed Chapter 1 production builder covering:
1. gate exterior;
2. guard shelter;
3. old-wing side entrance;
4. corridor;
5. former classroom;
6. PA room threshold/interior.

Reuse primitive/furniture construction patterns until authored GLB assets materially improve presentation. The builder returns typed references to interaction anchors, doors, drawers, documents, PA stations, trigger volumes, lights, photo board and KCR variant nodes. Narrative logic stays outside the builder.

## Interaction behavior composition
InteractionSystem keeps target acquisition. InteractionStateMachine keeps exclusive ownership and locomotion locking.

Add a thin behavior coordinator mapping interactable IDs to behavior objects. A behavior has enter, update, cancel and optional dispose hooks. This avoids a large ID switch in main.ts without replacing the existing interaction system.

## Openable behavior
One shared OpenableController covers hinged doors and linear drawers through transform adapters. Use Babylon transform animation/easing or deterministic delta-time interpolation. It must be spam-safe, support locked predicates, synchronize collision blockers, and restore only narratively persistent open/closed states.

No rigid-body physics dependency is needed.

## Inspection behavior
Reuse the lifecycle proven by BookInspectionController and CameraDirector, but do not turn the Book controller into a universal framework.

Add:
- a small generic inspection session for camera ownership and safe enter/exit;
- DocumentInspectionController for roster, timetable, index card and notebook;
- PhotoInspectionController for phone/class photos and authored compare framing.

Evidence is granted only after the relevant content is actually readable/inspected. Cancel and focus loss must always return to gameplay cleanly.

## Pickup behavior
Chapter 1 needs only a lightweight tutorial pickup for objects such as flashlight/raincoat/key-like props. No inventory grid and no physics carry system. Persist only items that affect progression.

## Evidence and comparison
Replace the prototype evidence catalog with production Chapter 1 definitions aligned to C01-C07. EvidenceSystem remains the idempotent persistence boundary.

Add a small authored comparison controller for explicit comparisons such as roster plus photo leading to C02. It may read evidence/inspection state but must not auto-infer later conclusions.

## AudioDirector
Chapter 1 requires a real audio boundary because sound carries narrative beats.

Responsibilities:
- unlock/resume browser audio on user gesture;
- ambience layers for rain, traffic, fluorescent hum and PA room tone;
- one-shots for vibration, latch/door, drawer, paper/photo, bell and relay/channel click;
- spatial emitters for PA/headset;
- authored speech playback with subtitle callback;
- fades/ducking and state-based mix;
- disposal.

Use Babylon/Web Audio under this API. Procedural noise is not acceptable as final narrative audio.

A small typed Chapter 1 audio manifest is sufficient; do not build a full-game asset framework.

## Chapter-scoped sequences
Only two ordered sequences justify dedicated controllers:
- opening phone sequence;
- post-KCR headset climax.

Implement small deterministic ChapterOneOpeningController and ChapterOneClimaxController. Persist irreversible steps only, and resume at safe steps after reload. Do not add a generic cinematic timeline system.

## KCR-A
Reuse RealitySystem.

Production readiness: C03 discovered AND C07 discovered.
Reveal timing: after the player leaves and re-enters the PA room.

Persist separate ready and applied facts. The applier enables the ninth chair/headset, correct collision, authored PA light state, audio mix state and ninth-headset interaction. It must be idempotent, and RealitySystem.syncApplied() must reconstruct the after-state on load.

No popup announces the shift.

## Final reflection beat
The extra shoulder is an authored representational effect, not a monster/character. Prefer a simple photo-board/reflection texture or overlay variant gated by post-climax state and view direction. Avoid real-time planar reflection infrastructure unless presentation testing proves it necessary.

## Chapter transition
Completion sets ch01_complete, changes GameState chapter to ch02, writes the chapter-complete checkpoint, and reaches a transition/end-card/loading boundary. This proves the Chapter 2 handoff but does not implement Chapter 2 gameplay.

## UI boundaries
Allowed Chapter 1 UI:
- phone presentation;
- captions/subtitles;
- evidence notification;
- compact evidence/compare view;
- prompts;
- pause/settings/loading/error surfaces.

World inspection remains primary. Do not explain KCR rules with UI.

## Persistent vs transient state
Persistent: chapter/checkpoint, evidence, knowledge facts, progression-relevant door/item state, irreversible opening/climax steps, KCR ready/applied, chapter complete.

Transient: camera blend progress, current openable animation fraction, ordinary audio playback cursor, prompt/reticle state, temporary reflection visibility and inspect zoom.

## Failure recovery
- invalid save returns to safe new game;
- save during inspection resumes at safe checkpoint;
- optional clue misses cannot softlock;
- noncritical audio failure reports a warning/caption path without blocking progression;
- critical scene asset failure surfaces a diagnosable error;
- pointer-lock/focus loss uses existing cancellation safety;
- every interaction behavior has a guaranteed route back to gameplay.

## Testing
Logic/state tests cover ChapterRuntime, save v2, openables, inspection lifecycle, comparison dependencies, KCR-A and opening/climax sequencing.

Runtime verification covers collision/reachability, door blockers, camera restore, document/photo readability, audio unlock/spatial playback, KCR before/after, critical save/reload points, optional-clue miss path, full Chapter 1 playthrough and console/network audit.

## Explicit non-goals
No combat AI, dialogue tree framework, generic quest engine, scare framework, cinematic timeline package, full inventory, all-chapter loader, all-game hypothesis system, random KCR or monster model for the Ninth.

This architecture is intentionally only as large as Chapter 1 requires.
