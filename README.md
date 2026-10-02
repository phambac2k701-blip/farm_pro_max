# UET không tệ

Browser-first true-3D first-person student-life narrative game set around a UET student timeline in Hanoi.

## Current project identity

**UET không tệ** is the active project identity.

The current direction is grounded student life: ordinary movement, friends, food, classes as context, recurring places, humor, routines, small incidents and longer continuity across chapters.

Retired story identities/mechanics are historical only and are not current source-of-truth.

## Current story macro

Only the following macro is approved:

- **Chapter 0** — entering university / admission-confirmation period / first Hanoi-UET impressions
- **Chapter 1** — first-year military-training period
- **Chapter 2** — ordinary university life begins; Giảng đường 4 becomes important
- **Chapter 3** — broader everyday student life; subtle vibe-coding reflection
- **Chapter 4+** — **LOCKED / TBD**

Do not invent Chapter 4+, a finale, or detailed chapter canon without user approval.

## Current major-map scope

Exactly four major map families are in current planning scope:

1. **Giảng đường 4**
2. **Giảng đường Xuân Thủy**
3. **Khu phố / phố trà đá**
4. **Hòa Lạc / khu quân sự**

Do not add a fifth major map without explicit user approval.

## Runtime / production architecture

- bounded-open-world feel rather than one giant permanently loaded simulation
- only the currently visited major map is resident at full gameplay fidelity
- active-map zone fidelity: **FULL / NORMAL / LIGHT / BACKGROUND**
- chapter/event variants reuse the same map through state layers instead of near-duplicate map copies
- ordinary choices create local micro-branches and normally reconverge
- only major decisions justify persistent long-term route state
- repeated/static/background assets are instanced, batched, merged, simplified or card-based according to gameplay role

See:
- `docs/design/CURRENT_STORY_MACRO.md`
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
- `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`
- `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`

## Giảng đường 4 checkpoint

The approved Giảng đường 4 implementation is preserved from:

- branch: `phase-v2/gd4-geometry-corrections`
- commit: `7ed178251ae47074e7276f379492953448296149`
- layout source: `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`

BAC-45 approved runtime baseline:
- about **59 FPS**
- **2549 meshes**
- about **471k vertices**
- runtime / console / network clean

The automatic player safety/respawn controller was intentionally removed from the active runtime after it caused unwanted teleport-to-spawn behavior. Physical map colliders remain the movement-boundary mechanism.

## Stack

- TypeScript
- Vite
- Babylon.js
- WebGPU preferred
- WebGL fallback

## Resume order

Before continuing work, read:

1. `README.md`
2. `docs/PROGRESS.md`
3. `docs/PROJECT_MASTER_PLAN.md`
4. `docs/SESSION_CONTINUITY.md`
5. `docs/design/CURRENT_STORY_MACRO.md`
6. `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
7. `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`
8. `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`
9. `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`
10. relevant technical/art/gameplay docs

The user remains the final narrative and production authority for new canon, Chapter 4+, major-map expansion, important characters and persistent routes.
