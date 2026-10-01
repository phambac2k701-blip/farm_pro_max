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

- [ ] Install minimal dependencies and scripts.
- [ ] Add bootstrap test/check that fails before implementation.
- [ ] Implement canvas/engine initialization.
- [ ] Attempt WebGPU and provide fallback.
- [ ] Add resize handling.
- [ ] Run tests/build.
- [ ] Commit.

### Task 2: Add typed game state and events

**Files:**
- Create: `src/game/state/GameState.ts`
- Create: `src/game/state/types.ts`
- Create: `src/game/events/GameEvents.ts`
- Test: `tests/game/state/GameState.test.ts`

**Interfaces:**
- Produces: fact/evidence read/write APIs
- Produces: typed change events

- [ ] Write failing tests for fact/evidence mutation.
- [ ] Implement minimal typed store.
- [ ] Verify duplicate evidence handling.
- [ ] Verify change event emission.
- [ ] Run tests.
- [ ] Commit.

### Task 3: Build the first-person controller

**Files:**
- Create: `src/player/InputRouter.ts`
- Create: `src/player/PlayerController.ts`
- Create/Modify: prototype scene bootstrap
- Test: unit tests for movement-vector calculation and state transitions

**Interfaces:**
- Consumes: engine/scene lifecycle.
- Produces: gameplay camera transform and locomotion enable/disable API.

- [ ] Test normalized movement input.
- [ ] Test locomotion enable/disable state.
- [ ] Implement pointer-lock input.
- [ ] Implement grounded movement and collision.
- [ ] Add sensitivity config.
- [ ] Add safe focus/pointer-lock loss behavior.
- [ ] Playtest movement in graybox.
- [ ] Commit.

### Task 4: Build the graybox classroom and hallway

**Files:**
- Create: `src/content/chapters/ch01/prototypeScene.ts`
- Create: runtime graybox assets or primitive construction
- Add collision metadata

**Interfaces:**
- Produces: spawn point, classroom, desk, book anchor location.

- [ ] Build minimal hallway/classroom geometry.
- [ ] Add static collision.
- [ ] Add practical lighting placeholder.
- [ ] Verify scale.
- [ ] Walk every reachable area.
- [ ] Verify no wall clipping/soft-lock.
- [ ] Commit.

### Task 5: Create interaction targeting and interaction state machine

**Files:**
- Create: `src/interaction/types.ts`
- Create: `src/interaction/InteractionSystem.ts`
- Create: `src/interaction/InteractionStateMachine.ts`
- Test: `tests/interaction/InteractionSystem.test.ts`

**Interfaces:**
- Consumes: PlayerController, scene meshes.
- Produces: current target, prompt state, enter/exit interaction events.

- [ ] Test deterministic target selection.
- [ ] Test max-range rejection.
- [ ] Test locomotion lock on interaction.
- [ ] Implement center-screen picking.
- [ ] Implement prompt state.
- [ ] Implement safe cancel.
- [ ] Run tests and runtime smoke test.
- [ ] Commit.

### Task 6: Implement CameraDirector

**Files:**
- Create: `src/camera/CameraDirector.ts`
- Test: `tests/camera/CameraDirector.test.ts`

**Interfaces:**
- Consumes: gameplay camera and authored interaction anchors.
- Produces: `focus(anchor, options)`, `restore()`, `cancel()`.

- [ ] Test state transitions gameplay → blending → inspection → restoring.
- [ ] Test cancel during blend.
- [ ] Implement transform/FOV interpolation.
- [ ] Ensure restore has no visible hard snap in runtime.
- [ ] Commit.

### Task 7: Implement the hero book interaction

**Files:**
- Create: `src/interaction/inspection/BookInspectionController.ts`
- Create: book interaction content definition
- Create/import: temporary book asset and animation
- Test: state tests where practical

**Interfaces:**
- Consumes: CameraDirector, InteractionSystem.
- Produces: book open/page/close states and discovery callback.

- [ ] Create temporary book prop.
- [ ] Author inspection anchor.
- [ ] Blend camera down toward desk.
- [ ] Animate book opening.
- [ ] Add page navigation.
- [ ] Add paper/book SFX placeholder.
- [ ] Ensure cancel works at every phase.
- [ ] Playtest repeatedly from different approach angles.
- [ ] Commit.

### Task 8: Add evidence system

**Files:**
- Create: `src/evidence/EvidenceSystem.ts`
- Create: `src/evidence/types.ts`
- Create: `src/content/chapters/ch01/evidence.ts`
- Test: `tests/evidence/EvidenceSystem.test.ts`

**Interfaces:**
- Consumes: GameState.
- Produces: evidence discovery and lookup.

- [ ] Write failing discovery/idempotency tests.
- [ ] Implement evidence registry.
- [ ] Wire book page discovery.
- [ ] Add minimal evidence UI notification/journal entry.
- [ ] Verify only relevant page triggers evidence.
- [ ] Commit.

### Task 9: Add reality-shift system

**Files:**
- Create: `src/reality/RealitySystem.ts`
- Create: `src/content/chapters/ch01/reality.ts`
- Test: `tests/reality/RealitySystem.test.ts`

**Interfaces:**
- Consumes: GameState facts/evidence.
- Produces: world-variant application.

- [ ] Test knowledge condition evaluation.
- [ ] Test idempotent shift application.
- [ ] Add 8-desk → 9-desk classroom variant.
- [ ] Add one subtle audio/lighting difference.
- [ ] Trigger only after required evidence and controlled revisit/transition.
- [ ] Verify the game never displays an explicit “reality changed” popup.
- [ ] Commit.

### Task 10: Add save/load

**Files:**
- Create: `src/game/save/SaveService.ts`
- Test: `tests/game/save/SaveService.test.ts`

**Interfaces:**
- Consumes/produces: serialized GameState snapshot.

- [ ] Test roundtrip.
- [ ] Test invalid data recovery.
- [ ] Add schema version.
- [ ] Persist chapter/evidence/facts/settings.
- [ ] Verify reality shift survives reload.
- [ ] Commit.

### Task 11: Build preview and playtest gate

**Files:**
- Modify: package scripts/config
- Create: `docs/PLAYTEST_LOG.md`
- Add deployment config only if needed

**Interfaces:**
- Produces: reproducible build and preview.

- [ ] Run full automated test suite.
- [ ] Run production build.
- [ ] Launch playable build.
- [ ] Check console/network errors.
- [ ] Play full prototype from clean save.
- [ ] Capture representative screenshots.
- [ ] Record movement/interaction/performance findings.
- [ ] Fix Critical/Important findings.
- [ ] Deploy preview.
- [ ] Update `docs/PROGRESS.md`.
- [ ] Commit.

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
