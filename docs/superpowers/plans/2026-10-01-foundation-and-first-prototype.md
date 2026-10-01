# Foundation and First Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first browser-playable 3D prototype proving smooth first-person movement, tactile book inspection, one evidence discovery, and one knowledge-driven reality shift.

**Architecture:** Babylon.js renders the 3D world. Core gameplay is split into player, camera, interaction, evidence, reality, scene, and save modules. Chapter content is data-driven where practical, and the first prototype remains intentionally small: hallway + classroom + one book.

**Tech Stack:** TypeScript, Vite, Babylon.js, glTF/GLB, browser storage, automated TypeScript tests, Vercel preview.

**Spec:** `docs/PROJECT_MASTER_PLAN.md`, `docs/TECHNICAL_REQUIREMENTS.md`, `docs/ARCHITECTURE.md`, `docs/GAMEPLAY.md`

## Global Constraints
- Desktop browser first.
- True 3D first-person control.
- WebGPU preferred, WebGL fallback required.
- No combat in MVP.
- Movement and camera feel are P0.
- Important interactions use smooth camera choreography.
- Persistent state must flow through GameState/SaveService.
- First prototype contains only enough environment to prove the loop.

## Review Focus
1. Pointer-lock loss must not leave controls stuck.
2. Interaction cancel during camera blend must safely return control.
3. Overlapping interactables must choose a deterministic target.
4. Save data with an invalid/old shape must fail safely.
5. Reality shift must reproduce correctly after reload.

---

### Task 1: Bootstrap the web 3D application

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/engine/EngineAdapter.ts`
- Test: bootstrap test/smoke path selected during setup

**Interfaces:**
- Produces: `EngineAdapter.create(canvas): Promise<EngineAdapter>`
- Produces: `engineAdapter.run(render: () => void): void`

- [x] Install minimal dependencies and scripts.
- [x] Add bootstrap test/check that fails before implementation.
- [x] Implement canvas/engine initialization.
- [x] Attempt WebGPU and provide fallback.
- [x] Add resize handling.
- [x] Run tests/build.
- [x] Commit.

### Task 2: Add typed game state and events

**Files:**
- Create: `src/game/state/GameState.ts`
- Create: `src/game/state/types.ts`
- Create: `src/game/events/GameEvents.ts`
- Test: `tests/game/state/GameState.test.ts`

**Interfaces:**
- Produces: fact/evidence read/write APIs
- Produces: typed change events

- [x] Write failing tests for fact/evidence mutation.
- [x] Implement minimal typed store.
- [x] Verify duplicate evidence handling.
- [x] Verify change event emission.
- [x] Run tests.
- [x] Commit.

### Task 3: Build the first-person controller

**Files:**
- Create: `src/player/InputRouter.ts`
- Create: `src/player/PlayerController.ts`
- Create/Modify: prototype scene bootstrap
- Test: unit tests for movement-vector calculation and state transitions

**Interfaces:**
- Consumes: engine/scene lifecycle.
- Produces: gameplay camera transform and locomotion enable/disable API.

- [x] Test normalized movement input.
- [x] Test locomotion enable/disable state.
- [x] Implement pointer-lock input.
- [x] Implement grounded movement and collision.
- [x] Add sensitivity config.
- [x] Add safe focus/pointer-lock loss behavior.
- [x] Playtest movement in graybox.
- [x] Commit.

### Task 4: Build the graybox classroom and hallway

**Files:**
- Create: `src/content/chapters/ch01/prototypeScene.ts`
- Create: runtime graybox assets or primitive construction
- Add collision metadata

**Interfaces:**
- Produces: spawn point, classroom, desk, book anchor location.

- [x] Build minimal hallway/classroom geometry.
- [x] Add static collision.
- [x] Add practical lighting placeholder.
- [x] Verify scale.
- [x] Walk every reachable area.
- [x] Verify no wall clipping/soft-lock.
- [x] Commit.

### Task 5: Create interaction targeting and interaction state machine

**Files:**
- Create: `src/interaction/types.ts`
- Create: `src/interaction/InteractionSystem.ts`
- Create: `src/interaction/InteractionStateMachine.ts`
- Test: `tests/interaction/InteractionSystem.test.ts`

**Interfaces:**
- Consumes: PlayerController, scene meshes.
- Produces: current target, prompt state, enter/exit interaction events.

- [x] Test deterministic target selection.
- [x] Test max-range rejection.
- [x] Test locomotion lock on interaction.
- [x] Implement center-screen picking.
- [x] Implement prompt state.
- [x] Implement safe cancel.
- [x] Run tests and runtime smoke test.
- [x] Commit.

### Task 6: Implement CameraDirector

**Files:**
- Create: `src/camera/CameraDirector.ts`
- Test: `tests/camera/CameraDirector.test.ts`

**Interfaces:**
- Consumes: gameplay camera and authored interaction anchors.
- Produces: `focus(anchor, options)`, `restore()`, `cancel()`.

- [x] Test state transitions gameplay → blending → inspection → restoring.
- [x] Test cancel during blend.
- [x] Implement transform/FOV interpolation.
- [x] Ensure restore has no visible hard snap in runtime.
- [x] Commit.

### Task 7: Implement the hero book interaction

**Files:**
- Create: `src/interaction/inspection/BookInspectionController.ts`
- Create: book interaction content definition
- Create/import: temporary book asset and animation
- Test: state tests where practical

**Interfaces:**
- Consumes: CameraDirector, InteractionSystem.
- Produces: book open/page/close states and discovery callback.

- [x] Create temporary book prop.
- [x] Author inspection anchor.
- [x] Blend camera down toward desk.
- [x] Animate book opening.
- [x] Add page navigation.
- [x] Add paper/book SFX placeholder.
- [x] Ensure cancel works at every phase.
- [x] Playtest repeatedly from different approach angles.
- [x] Commit.

### Task 8: Add evidence system

**Files:**
- Create: `src/evidence/EvidenceSystem.ts`
- Create: `src/evidence/types.ts`
- Create: `src/content/chapters/ch01/evidence.ts`
- Test: `tests/evidence/EvidenceSystem.test.ts`

**Interfaces:**
- Consumes: GameState.
- Produces: evidence discovery and lookup.

- [x] Write failing discovery/idempotency tests.
- [x] Implement evidence registry.
- [x] Wire book page discovery.
- [x] Add minimal evidence UI notification/journal entry.
- [x] Verify only relevant page triggers evidence.
- [x] Commit.

### Task 9: Add reality-shift system

**Files:**
- Create: `src/reality/RealitySystem.ts`
- Create: `src/content/chapters/ch01/reality.ts`
- Test: `tests/reality/RealitySystem.test.ts`

**Interfaces:**
- Consumes: GameState facts/evidence.
- Produces: world-variant application.

- [x] Test knowledge condition evaluation.
- [x] Test idempotent shift application.
- [x] Add 8-desk → 9-desk classroom variant.
- [x] Add one subtle audio/lighting difference.
- [x] Trigger only after required evidence and controlled revisit/transition.
- [x] Verify the game never displays an explicit “reality changed” popup.
- [x] Commit.

### Task 10: Add save/load

**Files:**
- Create: `src/game/save/SaveService.ts`
- Test: `tests/game/save/SaveService.test.ts`

**Interfaces:**
- Consumes/produces: serialized GameState snapshot.

- [x] Test roundtrip.
- [x] Test invalid data recovery.
- [x] Add schema version.
- [x] Persist chapter/evidence/facts/settings.
- [x] Verify reality shift survives reload.
- [x] Commit.

### Task 11: Build preview and playtest gate

**Files:**
- Modify: package scripts/config
- Create: `docs/PLAYTEST_LOG.md`
- Add deployment config only if needed

**Interfaces:**
- Produces: reproducible build and preview.

- [x] Run full automated test suite.
- [x] Run production build.
- [x] Launch playable build.
- [x] Check console/network errors.
- [x] Play full prototype from clean save.
- [x] Capture representative screenshots.
- [x] Record movement/interaction/performance findings.
- [x] Fix Critical/Important findings.
- [x] Deploy preview.
- [x] Update `docs/PROGRESS.md`.
- [x] Commit.

> **INTENTIONAL STOP POINT AFTER TASK 11:** `TECHNICAL PROTOTYPE V1 COMPLETE`. Task 12 must not start automatically; wait for a new explicit user instruction/handoff.

### Task 12: Foundation review

**Files:**
- Update docs and progress only as findings require.

**Interfaces:**
- Consumes: all prototype systems.
- Produces: reviewed foundation ready for Chapter 1 vertical-slice planning.

- [ ] Review architecture against actual prototype.
- [ ] Remove unnecessary dependencies/abstractions.
- [ ] Confirm interaction pattern is reusable.
- [ ] Confirm performance is viable.
- [ ] Record rulings and deferred minors.
- [ ] Open/refresh PR with evidence and test results.

