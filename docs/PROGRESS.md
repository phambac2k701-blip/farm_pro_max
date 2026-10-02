# Progress

Last updated: 2026-10-02

## Current phase

**UET KHÔNG TỆ — GD4 + NARRATIVE/PRODUCTION RECONCILIATION**

## Current branch

`integration/uet-source-of-truth-reconciliation`

Integration inputs:
- approved Giảng đường 4 checkpoint: `phase-v2/gd4-geometry-corrections` @ `7ed178251ae47074e7276f379492953448296149`
- narrative/production cleanup checkpoint: `cleanup/remove-legacy-story-v1` @ `82394dab70a4a48988a65286230251f3a7a79b9c`

This branch starts from the approved GD4 checkpoint. The reconciliation pass updates docs/source-of-truth without redesigning or polishing GD4.

## Current product identity

Approved current title:

**UET không tệ**

Current direction:
- first-person 3D student-life narrative game
- UET student timeline in Hanoi
- grounded ordinary student-life tone
- humor and believable situations
- study/class structure as context rather than the entire subject
- recurring people/places/habits across chapters
- open-ended timeline

Retired project identities/mechanics are not current source-of-truth.

## Current story macro

Authoritative source:
- `docs/design/CURRENT_STORY_MACRO.md`

Approved only at high level:
- **Ch0** — entering university / admission confirmation / first Hanoi-UET impressions
- **Ch1** — first-year military-training period
- **Ch2** — ordinary university life begins; Giảng đường 4 becomes important
- **Ch3** — broader everyday student life; subtle vibe-coding reflection
- **Ch4+** — **LOCKED / TBD**

Do not invent Chapter 4+, an ending, or new detailed story canon during technical/production work.

## Current major-map scope

Authoritative source:
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`

Exactly four current major map families:
1. **Giảng đường 4**
2. **Giảng đường Xuân Thủy**
3. **Khu phố / phố trà đá**
4. **Hòa Lạc / khu quân sự**

Do not add a fifth major map without user approval.

## Runtime/world-event architecture

Authoritative source:
- `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`

Current production rules:
- bounded-open-world feel
- only the currently visited major map is resident at full gameplay fidelity
- active-map zones use **FULL / NORMAL / LIGHT / BACKGROUND** fidelity
- chapter/event differences normally layer state over reusable maps
- ordinary choices create local micro-branches and normally reconverge
- only major/high-value decisions create persistent long-term route state
- repeated/static/background assets are instanced, batched, merged, simplified or card-based according to gameplay role

## Giảng đường 4 — approved implementation

Authoritative layout:
- `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`

Approved checkpoint:
- branch: `phase-v2/gd4-geometry-corrections`
- commit: `7ed178251ae47074e7276f379492953448296149`

Locked integration rulings:
- do not redesign or further polish GD4 in this reconciliation pass
- preserve final canteen/building/parapet/stair/boundary geometry
- preserve 5-storey visual massing with only tầng 1 playable
- preserve visual-only continuation and lightweight background-card strategy
- preserve physical collision limits, including the tall invisible east blocker
- preserve removal of automatic player respawn/safety recovery

Final BAC-45 baseline:
- about **59 FPS**
- **2549 meshes**
- about **471k vertices**
- runtime exceptions: 0
- console errors: 0
- HTTP >=400: 0

## PlayerSafetyController ruling

The approved GD4 commit intentionally deleted:
- `src/player/PlayerSafetyController.ts`
- `tests/player/PlayerSafetyController.test.ts`

Reason:
- the automatic recovery path caused unwanted teleport-to-spawn behavior during normal boundary contact
- GD4 now relies on authored physical colliders for normal playable limits

Integration rule:
- do **not** restore this controller merely because older technical docs or branches referenced it
- only introduce a future recovery system if a concrete current gameplay need is approved and it can be implemented without normal-contact teleport regression

## Reconciliation scope

This pass may:
- replace retired narrative source-of-truth docs with the approved UET direction
- rename/reframe old room-production docs where the cleanup branch already established current terminology
- remove obsolete narrative/playtest documents that only describe retired story canon
- retain generic/reusable technical code even if it originated during the retired project direction

This pass must not:
- start character production
- start NPC/event implementation
- start another map
- polish GD4
- invent Chapter 4+
- invent new story canon
- merge to main/default branch

## Current integration verification

Final integration gate:
- full tests: **15/15 files, 51/51 tests pass**
- typecheck: pass
- production build: pass
- `git diff --check`: pass
- fresh Chrome/WebGPU GD4 smoke: pass
- document title / viewport identity: **UET không tệ**
- runtime exceptions: **0**
- console errors: **0**
- HTTP >=400: **0**
- integration runtime: **2549 meshes / 470676 vertices**
- integration foreground sample: **60.27 RAF FPS / 60.00 engine FPS**
- BAC-45 comparison: **0 mesh delta, -336 vertices, no meaningful FPS regression**
- evidence: `docs/playtest/integration-uet-reconciliation/runtime-smoke.json` and `gd4-smoke.png`

The removal of `PlayerSafetyController` causes no test/type/build/browser regression and remains the approved runtime state.

## Final source-of-truth set

Primary:
- `README.md`
- `docs/PROGRESS.md`
- `docs/PROJECT_MASTER_PLAN.md`
- `docs/SESSION_CONTINUITY.md`
- `docs/design/CURRENT_STORY_MACRO.md`
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
- `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`
- `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`
- `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`

Supporting:
- `docs/GAMEPLAY.md`
- `docs/ARCHITECTURE.md`
- `docs/TECHNICAL_REQUIREMENTS.md`
- `docs/CONTENT_PIPELINE.md`
- `docs/ART_BIBLE.md`
- `docs/AUDIO_BIBLE.md`
- `docs/UI_UX.md`
- `docs/TESTING_AND_PLAYTEST.md`
- `docs/WORKING_RULES.md`

## Character animation planning checkpoint

Approved roadmap:
- `docs/art/CHARACTER_ANIMATION_PLAN_V1.md`

The next planned prototype is a lightweight stick-figure/mannequin animation test. It is not a protagonist or canon NPC.

Prototype V0 is intentionally limited to six clips:
1. Idle
2. Walk
3. Turn In Place
4. Sit Down
5. Seated Idle
6. Stand Up

Required proof sequence:
`Idle -> Walk -> Idle -> Turn -> Idle -> Sit Down -> Seated Idle -> Stand Up -> Idle`

The wider animation list is backlog only and must not be mass-produced before V0 is proven. Approved external animation/motion resources should be stored locally in the project when licensing permits, with provenance recorded; runtime must not depend on third-party animation URLs/CDNs.

## STOP POINT

The animation roadmap is documented, but implementation has not started. Wait for the user's explicit instruction before creating the stick-figure rig or six Prototype V0 clips.
