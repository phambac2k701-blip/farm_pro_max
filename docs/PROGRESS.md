# Progress

Last updated: 2026-10-01

## Current phase
**Prototype implementation — browser 3D bootstrap complete**

## Current branch
`prototype/bootstrap-3d`

## Current status
Implementation is active. **BAC-11 through BAC-14 are complete** and the next executable task is **BAC-15 — Interaction targeting and state machine**.

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
- [ ] BAC-15 — Interaction targeting and state machine
- [ ] BAC-16 — CameraDirector inspection choreography
- [ ] BAC-17 — Hero book inspection interaction
- [ ] BAC-18 — Investigation discovery system
- [ ] BAC-19 — Knowledge-driven world shift prototype
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

## Exact next task
**BAC-15 — Interaction targeting and state machine**

Required next steps:
1. write failing tests for deterministic target selection, range rejection, and locomotion locking;
2. implement typed interactable metadata and center-screen target acquisition;
3. add prompt state plus interaction enter/exit ownership;
4. make cancel safe and restore locomotion reliably;
5. wire the hero book as the first target and run runtime smoke;
6. commit and continue to BAC-16.

## Resume rule
Start from the first unchecked implementation item above. Verify the latest commit/tests before changing code. Update this file after every meaningful milestone.
