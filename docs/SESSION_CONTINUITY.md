# Session Continuity & Handoff

## Purpose

The repository is the project source of truth.

All new sessions must resume from the current **UET không tệ** direction. Retired story packages/mechanics may remain only as explicitly historical material and must not be treated as current canon.

## Fresh-session resume instruction

> Continue the **UET không tệ** project in `phambac2k701-blip/farm_pro_max`. Read the current source-of-truth docs first. Preserve the approved Giảng đường 4 checkpoint. Chapter 4+ is locked. Do not restore retired story canon or the removed automatic player respawn system.

## Required resume sequence

1. Inspect current branch and recent commits.
2. Read:
   - `README.md`
   - `docs/PROGRESS.md`
   - `docs/PROJECT_MASTER_PLAN.md`
   - `docs/SESSION_CONTINUITY.md`
   - `docs/design/CURRENT_STORY_MACRO.md`
   - `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
   - `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`
   - `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`
   - `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`
   - `docs/GAMEPLAY.md`
   - `docs/ARCHITECTURE.md`
   - `docs/TECHNICAL_REQUIREMENTS.md`
   - other relevant current production docs
3. Respect `docs/design/USER_APPROVAL_GATES.md`.
4. Do not invent Chapter 4+.
5. Do not add a fifth major map without explicit approval.
6. Do not alter the approved GD4 topology unless the user explicitly reopens it.
7. Update `docs/PROGRESS.md` after meaningful milestones.

## Current identity

- title: **UET không tệ**
- true-3D first-person student-life narrative game
- UET student timeline in Hanoi
- grounded ordinary-life baseline
- humor and continuity are core
- study is context/background, not the whole game
- story is open-ended

## Current chapter macro

- **Ch0** — entering university / admission-confirmation / first Hanoi-UET impressions
- **Ch1** — first-year military-training period
- **Ch2** — ordinary university life begins / Giảng đường 4 becomes important
- **Ch3** — broader everyday student life / subtle vibe-coding reflection
- **Ch4+** — `LOCKED / TBD`

Detailed events remain approval-gated.

## Current major-map scope

Exactly four:
1. Giảng đường 4
2. Giảng đường Xuân Thủy
3. Khu phố / phố trà đá
4. Hòa Lạc / khu quân sự

## Runtime/world-event rules

- bounded-open-world architecture
- one currently visited major map at full gameplay residency
- local zone fidelity: **FULL / NORMAL / LIGHT / BACKGROUND**
- reuse maps through chapter/event state layers
- ordinary choice = local micro-branch, normally reconverging
- persistent long-term routes only for major decisions
- repeated/static/background assets should be instanced, batched, merged, simplified or card-based by role

## Giảng đường 4 checkpoint

Approved implementation:
- branch: `phase-v2/gd4-geometry-corrections`
- commit: `7ed178251ae47074e7276f379492953448296149`
- layout: `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`

Approved baseline:
- about 59 FPS
- 2549 meshes
- about 471k vertices
- runtime / console / network clean

The automatic `PlayerSafetyController` recovery path is intentionally removed. Normal movement boundaries use authored physical colliders. Do not restore the old controller merely because historical code/docs referenced it.

## Integration checkpoint

Narrative/production cleanup input:
- `cleanup/remove-legacy-story-v1`
- `82394dab70a4a48988a65286230251f3a7a79b9c`

Current integration branch:
- `integration/uet-source-of-truth-reconciliation`

The integration branch starts from the final GD4 commit and reconciles current docs/direction onto that implementation.

Integration gate:
- 15/15 test files, 51/51 tests pass
- typecheck/build/`git diff --check` pass
- fresh Chrome/WebGPU smoke clean
- 2549 meshes / 470676 vertices
- 60.27 RAF FPS / 60.00 engine FPS in the integration smoke
- no meaningful regression from BAC-45
- evidence: `docs/playtest/integration-uet-reconciliation/`

## Explicit non-goals until new user instruction

Do not:
- start character production
- start NPC/event production
- start Giảng đường Xuân Thủy or any other second map
- polish GD4 further
- create Chapter 4+
- invent new story canon
- merge integration to main/default branch

## End-of-session checkpoint

Before handing off:
- record current branch + commit
- record gate status
- record any approved ruling
- record runtime/performance comparison if code/runtime changed
- leave the repo in a clean or explicitly documented state
