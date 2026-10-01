# Progress

Last updated: 2026-10-01

## Current phase
**Prototype implementation — browser 3D bootstrap complete**

## Current branch
`prototype/bootstrap-3d`

## Current status
Implementation is active. **BAC-11, BAC-12, and BAC-13 are complete** and the next executable task is **BAC-14 — Graybox hallway and classroom**.

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
- [ ] BAC-14 — Graybox hallway and classroom
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

## Exact next task
**BAC-14 — Graybox hallway and classroom**

Required next steps:
1. build the hallway/classroom graybox as a dedicated Chapter 1 prototype scene;
2. add static collision and practical placeholder lighting;
3. define spawn, desk layout, teacher desk, and book anchor location;
4. walk every reachable area and verify scale/collision;
5. run tests/typecheck/build and browser runtime smoke;
6. commit and continue to BAC-15.

## Resume rule
Start from the first unchecked implementation item above. Verify the latest commit/tests before changing code. Update this file after every meaningful milestone.
