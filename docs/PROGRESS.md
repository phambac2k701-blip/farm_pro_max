# Progress

Last updated: 2026-10-01

## Current phase
**Prototype implementation — browser 3D bootstrap complete**

## Current branch
`prototype/bootstrap-3d`

## Current status
Implementation is active. **BAC-11 through BAC-19 are complete** and the next executable task is **BAC-20 — Save and load prototype state**.

The pre-build documentation remains authoritative for product/architecture direction. Continue implementation task-by-task without returning to completed preparation work.

## Connected execution environment
- GitHub: Full Access
- Linear: Full Access
- Figma: Full Access
- Vercel: Full Access
- Context7: available for current documentation
- Remote Desktop Commander: Full Access
- Remote device: `VOSTRO-COREI7G13`

## Confirmed project direction
- true 3D first-person psychological investigation game
- desktop web browser first
- Babylon.js + TypeScript + Vite
- WebGPU preferred; WebGL fallback required
- investigation/exploration, not combat
- core mechanic: **Knowledge Changes Reality**
- approximately 9 chapters
- smooth movement/camera and tactile micro-cinematic interactions are P0
- GitHub is source of truth; Linear tracks work

## Completed preparation
- [x] Phase 0 documentation set
- [x] ADR-0001: browser-first Babylon.js
- [x] detailed first-prototype implementation plan
- [x] Linear project `P-BAC-1`
- [x] implementation issues created
- [x] foundation PR #1 opened
- [x] prototype implementation branch prepared

## Prototype implementation progress
- [x] BAC-11 — Bootstrap browser 3D application
- [x] BAC-12 — Typed game state and event model
- [x] BAC-13 — First-person controller and camera feel
- [x] BAC-14 — Graybox hallway and classroom
- [x] BAC-15 — Interaction targeting and state machine
- [x] BAC-16 — CameraDirector inspection choreography
- [x] BAC-17 — Hero book inspection interaction
- [x] BAC-18 — Investigation discovery system
- [x] BAC-19 — Knowledge-driven world shift prototype
- [ ] BAC-20 — Save and load prototype state
- [ ] BAC-21 — Preview deployment and full playtest gate

## BAC-11 implementation record
Implemented:
- Vite + TypeScript application scaffold
- Babylon.js `EngineAdapter.create(canvas)`
- WebGPU initialization via `WebGPUEngine.initAsync()`
- automatic WebGL `Engine` fallback
- resize listener lifecycle
- render-loop run/stop/dispose lifecycle
- minimal visible 3D smoke scene
- fatal startup error surface
- Vitest harness and engine-selection tests

Verification:
- RED verified before implementation: EngineAdapter module missing
- GREEN: 2/2 engine fallback tests pass
- TypeScript typecheck passes
- production Vite build passes
- Chrome runtime smoke passes
- runtime selected `webgpu` on the checked device
- canvas rendered at a non-zero backing size
- no fatal startup state and no Vite error overlay

Current dependency baseline:
- `@babylonjs/core ^9.29.0`
- `@babylonjs/loaders ^9.29.0`
- `vite ^8.3.2`
- `typescript ^7.0.2`
- `vitest ^5.0.3`

Known non-blocking finding:
- current bootstrap main chunk is approximately 1.28 MB minified / 312 KB gzip and triggers Vite's 500 KB chunk warning.
- Do not optimize prematurely during BAC-12; revisit code splitting/loading strategy before the vertical-slice performance gate unless growth makes it urgent earlier.

## BAC-12 implementation record
Implemented:
- typed boolean/number/string world facts
- idempotent evidence discovery
- chapter state changes
- typed event bus with unsubscribe support
- serializable state snapshot

Verification:
- RED verified before implementation: GameEvents/GameState modules missing
- GREEN: 5/5 total tests pass
- TypeScript typecheck passes
- production Vite build passes

## BAC-13 implementation record
Implemented:
- normalized WASD/arrow movement input without diagonal speed boost
- pointer-lock mouse input with accumulated look deltas
- focus/pointer-lock loss input clearing
- grounded frame-rate-independent collision movement
- configurable/clamped mouse sensitivity
- locomotion and look enable/disable APIs for future interactions
- gameplay FreeCamera wired into the live bootstrap scene

Verification:
- 8/8 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- browser runtime smoke passes on WebGPU
- forward movement reached the obstacle and collision stopped the player before penetration
- locomotion lock held position while movement input was active

## BAC-14 implementation record
Implemented:
- dedicated Chapter 1 hallway/classroom graybox scene
- collision-enabled floors, corridor/classroom walls, and furniture blockers
- eight student desk/chair sets, teacher desk, hero book, and stable book anchor
- authored corridor spawn plus classroom/corridor reference points
- practical placeholder ambient, corridor, and classroom lighting
- dev runtime metadata for scene readiness and inspection

Verification:
- 10/10 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- browser runtime loads the Chapter 1 prototype on WebGPU with no fatal state
- live movement passes through the classroom doorway and traverses the room
- real-time collision stops at the classroom outer wall near x=9.09
- furniture collider refinement prevents the player ellipsoid from climbing onto desk tops

## BAC-15 implementation record
Implemented:
- typed interactable definitions and prompt state
- deterministic candidate selection by priority, distance, then stable id
- per-interactable max-range rejection
- center-screen Babylon multi-pick with visible geometry occlusion
- interaction state machine with locomotion ownership
- safe cancel on Escape or pointer-lock loss
- minimal reticle/prompt UI and hero-book registration

Verification:
- RED verified before implementation: interaction modules missing
- 13/13 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- browser runtime finds the hero book and shows the expected prompt
- enter locks locomotion and cancel restores it
- simulated pointer-lock loss cancels safely and restores locomotion
- runtime picking required the Babylon `@babylonjs/core/Culling/ray` side-effect import; added after browser smoke exposed the modular-runtime requirement

## BAC-16 implementation record
Implemented:
- reusable `CameraDirector` with gameplay, blending, inspection, and restoring states
- authored camera transform/FOV focus targets
- eased position interpolation and shortest-angle rotation interpolation
- exact gameplay camera snapshot preservation and restoration
- safe cancel during both focus and restore phases
- Chapter 1 book inspection camera anchor wired into the live interaction flow
- look lock during cinematic camera ownership and locomotion lock during restore

Verification:
- RED verified before implementation: CameraDirector module missing
- 16/16 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- runtime focus reaches the authored book camera anchor exactly
- inspection FOV reaches 0.86 and look/locomotion remain locked
- cancel blends back to the pre-inspection position, rotation, and FOV
- gameplay look and locomotion are restored after the camera returns

## BAC-17 implementation record
Implemented:
- tested `BookInspectionController` state machine for open/read/page-turn/close/cancel
- temporary two-page 3D book rig with animated cover and page-turn hinge
- authored Chapter 1 book spreads with a relevant ninth-line discovery candidate
- dynamic page textures with readable Vietnamese text in browser runtime
- minimal page navigation controls and inspection reticle suppression
- non-blocking procedural paper/book SFX placeholder hooks
- camera framing tuned for readable close inspection
- headless-safe texture capability fallback so NullEngine tests remain valid

Verification:
- RED verified before implementation: `BookInspectionController` module missing
- 20/20 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- page 2 resolves to `erased-ninth-line` and exposes only `ev_ch01_erased_ninth_line` as the discovery candidate
- Escape closes the book, restores gameplay camera, hides controls, restores reticle, look, and locomotion
- hero book target acquisition passes from front, left, and right approach positions
- browser visual smoke confirmed readable upright page text after UV and camera-framing refinement

## BAC-18 reuse-first review
- Existing codebase: `GameState.discoverEvidence()` already owns idempotent evidence state and emits `evidence-discovered`; `GameEvents` already supplies subscription/unsubscribe behavior.
- Babylon.js review: Tags and scene Observables are useful for scene-object metadata and engine/input/render events, but they do not replace domain-level persistent investigation state.
- External library review: XState is maintained and MIT-licensed, but adding a state/orchestration dependency for a small evidence metadata registry would duplicate the existing `GameState` abstraction and increase surface area without a clear benefit.
- Decision: no new dependency. BAC-18 will compose a thin typed metadata registry over `GameState` and reuse its event bus; UI feedback will use the existing DOM/CSS layer.

## BAC-18 implementation record
Implemented:
- typed evidence metadata registry layered over the existing `GameState`
- rejection of unknown/absent evidence IDs without state mutation
- idempotent discovery delegated to `GameState.discoverEvidence()`
- Chapter 1 evidence definition for the erased ninth line
- book spread discovery wired through the existing `onSpreadViewed` callback
- restrained DOM/CSS clue notification using the existing UI layer
- discovered-evidence lookup via `EvidenceSystem.listDiscovered()`

Verification:
- RED verified before implementation: evidence modules missing
- 25/25 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- first book spread produces no evidence
- relevant second spread discovers exactly `ev_ch01_erased_ninth_line`
- repeated visits remain idempotent with evidence count fixed at 1
- runtime metadata and notification text resolve the discovered clue correctly

## BAC-19 reuse-first review
- Existing codebase: `GameState` already owns evidence/facts and serialization-ready state; RealitySystem should evaluate those facts rather than introduce another store or FSM.
- Babylon.js: reuse `ActionManager.OnIntersectionEnterTrigger` + `ExecuteCodeAction` for the controlled doorway/corridor transition instead of creating a custom trigger framework. Babylon Animation/Easing are available if a timed property transition becomes necessary.
- External library review: `@tweenjs/tween.js` is MIT-licensed and suitable for generic tweening, but adding it here would duplicate Babylon capabilities for a shift that can be applied while the player is outside the room.
- Decision: no new dependency. Apply the world variant during the controlled corridor transition after knowledge is acquired, so the changed room is already stable when revisited.

## BAC-19 implementation record
Implemented:
- data-driven `RealitySystem` with evidence/fact condition evaluation
- idempotent world-variant application with persisted applied facts
- `syncApplied()` path for restoring persisted world variants after load
- hidden ninth desk variant composed from the existing shared desk builder
- subtle classroom light intensity/color shift
- Babylon `ActionManager.OnIntersectionEnterTrigger` transition zone reused for the controlled exit/revisit moment
- no reality-change popup or dedicated scare framework

Verification:
- RED verified before implementation: `RealitySystem` module missing
- 29/29 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- transition zone has no effect before required evidence
- after evidence, crossing the controlled corridor transition sets the revisit fact and applies the shift exactly once
- ninth desk becomes enabled and classroom light changes from 1.0 to 0.72 with a cooler diffuse tone
- no explicit “reality changed” UI text is rendered

## Exact next task
**BAC-20 — Save and load prototype state**

Required next steps:
1. perform reuse-first review for storage/schema validation;
2. write failing save roundtrip and invalid-data recovery tests;
3. add schema versioning and persist chapter/evidence/facts/settings;
4. load state before gameplay systems are constructed;
5. autosave meaningful GameState changes;
6. verify the ninth-desk reality shift survives a browser reload;
7. commit and continue to BAC-21.

## Resume rule
Start from the first unchecked implementation item above. Verify the latest commit/tests before changing code. Update this file after every meaningful milestone.
