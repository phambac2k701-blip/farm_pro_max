# Progress

Last updated: 2026-10-01

## Current phase
**CHAPTER 1 PRODUCTION VERTICAL SLICE — IMPLEMENTATION ACTIVE**

## Current branch
`integration/narrative-v1.2` (continues from the clean Technical Prototype V1 checkpoint plus the frozen narrative handoff)

## Current status
**Technical Prototype V1 is frozen and complete. Narrative integration planning is complete. BAC-22 through BAC-25 are complete. BAC-25 passed real keyboard/mouse runtime verification, save/reload verification, local automated gates and remote CI. BAC-26 is now the active implementation focus.**

Completed production planning:
- Narrative–Technical Gap Analysis: `docs/production/CH01_NARRATIVE_TECHNICAL_GAP_ANALYSIS.md`
- Chapter 1 architecture: `docs/production/CH01_PRODUCTION_ARCHITECTURE.md`
- dependency-ordered implementation plan: `docs/production/CH01_VERTICAL_SLICE_IMPLEMENTATION_PLAN.md`
- Linear milestone: **CHAPTER 1 VERTICAL SLICE**
- Linear execution issues: BAC-22 through BAC-31

Current implementation focus: **BAC-26 Production AudioDirector and Chapter 1 audio assets**.

The authorized execution path is BAC-22 → BAC-31. After BAC-31, record **CHAPTER 1 VERTICAL SLICE COMPLETE** and STOP. Do not start Chapter 2 gameplay.

Technical Prototype V1 branch: `prototype/bootstrap-3d`
Technical Prototype V1 checkpoint: tag `technical-prototype-v1`
Existing preview: https://phambac2k701-blip.github.io/farm_pro_max/

## Connected execution environment
- GitHub: Full Access
- Linear: Full Access
- Figma: Full Access
- Vercel: connected, but preview deploy was unavailable during BAC-21 because the local CLI token was invalid; GitHub Pages is the verified preview target
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
- [x] BAC-20 — Save and load prototype state
- [x] BAC-21 — Preview deployment and full playtest gate

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

## BAC-20 reuse-first review
- Existing codebase: `GameState.snapshot()` already produces the chapter/facts/evidence payload, and browser `localStorage` is sufficient for prototype persistence.
- Babylon.js: no engine-level save primitive is a better fit for this domain state.
- External library review: Zod and Valibot are both MIT-licensed runtime schema libraries. Valibot is dependency-free and highly tree-shakeable, so it gives robust validation without a hand-written type-guard layer or a large bundle cost.
- Decision: add Valibot only beneath `SaveService` for untrusted storage validation. `SaveService` remains the game-owned abstraction; storage remains injected/testable.

## BAC-20 implementation record
Implemented:
- versioned `SaveService` with injected storage interface
- Valibot runtime schema validation for untrusted persisted JSON
- chapter/facts/evidence/settings persistence
- safe invalid JSON / invalid schema / unsupported-version recovery
- save hydration before gameplay systems are constructed
- autosave on fact, evidence, and chapter changes
- reality variant restoration through `RealitySystem.syncApplied()`

Verification:
- RED verified before implementation: `SaveService` module missing
- 33/33 total automated tests pass
- TypeScript typecheck passes
- production Vite build passes
- browser autosave writes schemaVersion 1 with Chapter 1 facts/evidence/settings
- full browser reload restores evidence and the ninth-desk applied facts
- ninth desk and cooler 0.72 classroom light are reapplied immediately after reload
- corrupted localStorage is cleared safely and the game boots clean with default state

## BAC-21 implementation record
Completed:
- full automated test/typecheck/production-build gate
- clean-save browser smoke
- movement, pointer-lock camera, collision, interaction, camera inspection, page navigation, evidence and reality-shift playtest
- save/load and corrupted-save recovery in both local runtime and deployed production preview
- console/page-error inspection
- local and deployed HAR checks
- representative screenshots and `docs/PLAYTEST_LOG.md`
- GitHub Pages preview deployment with branch-scoped environment policy
- final handoff/checkpoint documentation

Verification:
- 33/33 automated tests pass across 11 test files
- TypeScript typecheck passes
- production Vite build passes
- final GitHub Pages workflow run `36881182705` passed install/test/typecheck/build/configure/upload/deploy
- local runtime: no page errors; HAR 89 requests / 0 HTTP >=400
- deployed preview: no page errors; HAR 21 requests / 0 HTTP >=400
- deployed preview boots WebGPU with no fatal state
- production preview save hydration restores `shift_ch01_ninth_desk`
- production preview corrupt-save recovery clears invalid data and boots clean
- local RAF smoke sample measured ~60.3 FPS over ~2 seconds
- no Critical or Important gameplay regressions remained at checkpoint

Known non-blocking limitations:
- main production JS chunk remains ~1.36 MB minified / ~332 KB gzip and triggers Vite's chunk-size warning
- environment/book/material/audio remain prototype quality
- manual runtime verification was Chromium/WebGPU; WebGL fallback is automated-test covered but not fully cross-browser playtested
- save schema v1 has validation/versioning but no migration path
- desktop keyboard/mouse only
- low-end hardware/network performance not yet profiled
- Vercel preview was unavailable because the local token was invalid; verified preview uses GitHub Pages

Verification evidence: `docs/PLAYTEST_LOG.md`
Handoff: `docs/TECHNICAL_PROTOTYPE_V1_HANDOFF.md`
Preview: https://phambac2k701-blip.github.io/farm_pro_max/

## NARRATIVE HANDOFF IMPORT
- Imported production narrative: `NAR-PRODUCTION-v1.2`.
- Source baseline: `bcbruh/cottruyen@808cbb7` plus coherence repairs documented in `docs/narrative/NARRATIVE_HANDOFF_METADATA.md`.
- Production source of truth: `docs/narrative/`.
- Old `docs/NARRATIVE_BIBLE.md` is retained only as superseded foundation context.

## NEXT CHECKPOINT
Continue the dependency-ordered Chapter 1 vertical-slice plan. Do not redo completed integration/gap analysis or BAC-22→BAC-25. Start BAC-26 Production AudioDirector/audio assets next; BAC-27 remains blocked until BAC-26 is complete.


## BAC-22 production record
Implemented:
- stable Chapter 1 production checkpoint IDs from `ch01_gate` through `ch01_complete`
- reusable monotonic `ChapterRuntime` with safe restore and idempotent completion
- production SaveService schema v2 with explicit checkpoint payload
- new production save key `nguoi-thu-chin:production:v2`
- explicit reset of incompatible Technical Prototype V1 saves instead of migrating prototype-only evidence/reality state
- bootstrap wiring so autosaves include the durable Chapter 1 checkpoint
- dedicated Chapter 1 production CI workflow for test/typecheck/build verification

Verification:
- GitHub Actions run `36905157371` completed successfully
- 12/12 test files pass
- 38/38 tests pass
- TypeScript typecheck passes
- production Vite build passes
- main bundle remains approximately 1.36 MB minified / 333 KB gzip; existing non-blocking chunk-size warning remains
- remote browser runtime verification was unavailable during BAC-22 because the authorized desktop device was offline; BAC-22 changed state/persistence only and the automated gate covered the new behavior. Browser traversal verification is required during BAC-23 and later full gates.

Decision:
- schema v1 is intentionally reset, not migrated, because it can contain the non-production Hero Book evidence ID and prototype ninth-classroom-desk KCR state. Carrying those into production would violate the frozen narrative handoff.


## BAC-23 production record
Implemented:
- typed production scene shell for gate, guard shelter, side entrance, corridor, classroom and PA room
- durable checkpoint anchors plus trigger-zone references
- eight PA stations in the before-state and disabled ninth station variant
- Vietnamese-school signage, worn primitive materials, low fluorescent/night lighting
- production bootstrap no longer depends on the Technical Prototype Hero Book or prototype ninth-desk KCR content
- browser-smoke metadata for production scene readiness and station counts

Verification:
- Chapter 1 production scene tests cover required refs, checkpoint anchors, before-state station count, hidden ninth variant, production props and collision mesh presence
- Linear BAC-23 is Done
- later Chapter 1 CI runs include this scene shell in test/typecheck/build/browser boot smoke

## BAC-24 production record
Implemented:
- InteractionBehaviorHost under existing InteractionSystem ownership
- shared OpenableController for hinged doors and linear drawers
- InspectionSession composed with CameraDirector
- DocumentInspectionController and PhotoInspectionController
- lightweight PickupController
- runtime wiring for side entrance, classroom door, PA door, classroom drawer, roster, class photo and flashlight

Verification:
- production behavior and inspection tests pass
- Linear BAC-24 is Done
- existing InteractionSystem and CameraDirector regression tests remain in the green Chapter 1 CI gate

## BAC-25 implementation record
Implemented:
- production Chapter 1 evidence catalog C01/C02/C03/C04/C05/C07/C14
- resume-safe 00:17 opening phone sequence and phone UI
- C01 awarded only after the player dismisses the completed message sequence
- classroom roster tactile inspection awards C03
- class-photo inspection plus explicit compare action awards C02
- 09 drawer label reveal and C05 discovery after the roster contradiction
- optional C14 timetable inspection without progression dependency
- one-shot corridor-return bell state fact
- checkpoint progression through old wing, classroom and PA threshold
- restrained evidence notification using the existing DOM UI layer

Automated verification:
- CI run `36910173879` succeeded after the BAC-25 integration commits
- 16 test files / 52 tests pass in that gate
- TypeScript typecheck passes
- production build passes
- headless browser boot smoke passes
- ChapterOneOpeningController and ClassroomEvidenceController have dedicated tests for resume, idempotence, compare gating and optional-clue independence

Runtime verification:
- real Chrome keyboard interaction completed on Windows at 125% display scale
- opening phone awards C01 and restores look/locomotion
- checkpoint progression reaches old wing, classroom pre-roster, post-C03 and PA pre-C07
- roster inspection awards C03; photo + explicit C comparison awards C02
- reopening the drawer after C03 reveals 09 and awards C05
- C14 was deliberately skipped and did not block PA-threshold progression
- repeated drawer interaction remained evidence-idempotent
- Escape restored gameplay camera/locomotion; blur cleared held movement input
- save/reload preserved C01/C02/C03/C05, opening completion, 09 reveal and `ch01_pa_pre_c07`
- runtime discovered a 125%-DPI interaction targeting bug; `InteractionSystem` now uses `camera.getForwardRay()` + `multiPickWithRay()` instead of render-pixel screen coordinates
- roster/photo inspection footers now expose the C comparison input
- Chapter 1 production lighting received a readability pass while retaining the night/rain tone
- local gate: 16 test files / 52 tests pass; TypeScript typecheck and production build pass
- final remote Chapter 1 CI run `36915394107` passed on commit `6f2c0fc1a1e0d7ecfc90820b5ae4bbfd2538ae96`
- Linear BAC-25 is Done
