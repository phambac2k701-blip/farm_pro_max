# Session Continuity & Handoff

## Why this file exists
Long ChatGPT sessions can become unwieldy. Conversation context is not the project database.
This repository must contain everything needed to resume work in a fresh chat.

## Fresh-chat resume command
In a new conversation, the user can say:

> Continue the Người Thứ Chín project in GitHub repo phambac2k701-blip/farm_pro_max. Read docs/SESSION_CONTINUITY.md and docs/PROGRESS.md first, then the required project docs. Do not redo completed preparation work. Do not start implementation unless I explicitly tell you to start building.

When the user is ready to build, a suitable command is:

> Start building the Người Thứ Chín project now. Read the repository checkpoint first, then execute the current implementation plan continuously. Do not stop for routine confirmation between planned tasks.

## Required resume sequence
1. Inspect repository default branch, open PRs, `prototype/bootstrap-3d`, and recent commits.
2. Read:
   - README.md
   - docs/SESSION_CONTINUITY.md
   - docs/PROGRESS.md
   - docs/WORKING_RULES.md
   - docs/PREBUILD_CHECKLIST.md
   - docs/PROJECT_MASTER_PLAN.md
   - docs/TECHNICAL_REQUIREMENTS.md
   - docs/ARCHITECTURE.md
   - docs/GAMEPLAY.md
   - docs/NARRATIVE_BIBLE.md (legacy foundation pointer)
   - docs/narrative/NARRATIVE_HANDOFF_METADATA.md
   - docs/narrative/00_NARRATIVE_STATUS.md
   - docs/narrative/04_CANON_STORY.md
   - docs/narrative/08_CLUE_GRAPH.md
   - docs/narrative/09_KCR_MATRIX.md
   - docs/narrative/10_CHAPTER_BIBLE.md
   - docs/narrative/11_CHAPTER_01_VERTICAL_SLICE.md
   - docs/narrative/18_IMPLEMENTATION_HANDOFF.md
   - docs/narrative/28_FULL_GAME_NARRATIVE_AUDIT.md
   - docs/ART_BIBLE.md
   - docs/AUDIO_BIBLE.md
   - docs/UI_UX.md
   - docs/ASSET_PLAN.md
   - docs/CONTENT_PIPELINE.md
   - docs/TESTING_AND_PLAYTEST.md
   - docs/TECHNICAL_PROTOTYPE_V1_HANDOFF.md
   - docs/PLAYTEST_LOG.md
   - relevant docs/DECISIONS/*
   - current docs/superpowers/plans/*
3. Inspect Linear project `P-BAC-1` and active issues.
4. Trust `docs/PROGRESS.md` for whether implementation has started.
5. If build has not been explicitly authorized yet, remain at the pre-build checkpoint.
6. If `docs/PROGRESS.md` marks an intentional STOP POINT, do not execute the next unchecked plan task automatically.
7. After a new explicit user instruction, create/refresh the next-phase plan before resuming execution.
8. Update `docs/PROGRESS.md` after every meaningful milestone.

## Current active checkpoint
Milestone: **GAME PIVOT V2 — GIẢNG ĐƯỜNG 4 PLAYABLE MAP FOUNDATION**

Historical preserved checkpoint:
- BAC-11 through BAC-21 remain frozen as Technical Prototype V1.
- BAC-22 through BAC-31 remain complete and preserved by tag `chapter-1-vertical-slice`.
- Do not alter/delete that tag.

Current active branch:
- `phase-v2/gd4-geometry-corrections`

Current runtime source of truth:
- `docs/design/GIANG_DUONG_4_LAYOUT_V1.md`
- `docs/PROGRESS.md`
- Linear issue `BAC-45`

Current user-directed spatial rules:
- runtime boots **Giảng đường 4**, not the retired old Chapter 1 campus
- yellow sketch outline = **gameplay boundary**, not visual world boundary
- west gate is **walk-through**; its short exterior apron uses light ground markings plus invisible movement colliders, with no visible approach railing/barrier
- the canteen is a **ground-level shelter/stall in the inner-right campus corner**, now pushed essentially flush against the west perimeter wall while remaining clear of the gate mouth; it keeps four posts, a sloped overhanging roof, partial back/side walls, open side facing Tòa B, and no sign/branding
- Tòa A/B ground-floor slabs + corridors are elevated **0.8 m**, and the former void under each corridor is filled with a solid plinth
- each building entrance uses **5 visible west-end steps**, backed by an invisible smooth ramp collider for movement
- A/B are visually **5-storey academic buildings**, but only tầng 1 is playable; do not reduce visible storeys for performance
- corridor orientation/flip is **A-only**: A entrance/corridor side is left/+Z when walking in from the gate; **B keeps its current orientation and must not be flipped**
- exterior metal railings are retired on **both A and B**, including ground floor, upper floors and continuation; use wall-colored solid parapets + larger masonry columns/piers
- front + exposed side parapets use the same **1.15 m** height; exposed side faces are solid, and structural columns run continuously from base to roof with no surplus top-floor posts
- Tòa B has no broad south/front yard: the south perimeter runs about **0.13 m** from the parapet, with only local clearance needed for the approved west-end stair access
- A/B ground-floor parapets extend to and slightly overlap the invisible east gameplay boundary so there is no see-through gap
- east playable limit remains invisible collision only; it is aligned to the end wall of the second playable classroom at **x = 27.12** and uses a tall blocker spanning **y = -3..8**, so the player cannot climb over or fall under it
- playable→continuation seam overlaps slightly and continuation bay spacing remains about **8.4 m**, preserving the open near view and natural perspective compression farther away
- upper-floor and continuation visual-only geometry is merged/batched by material for performance while preserving all 5 visible storeys
- each floor visually implies around **10 classroom bays**
- only the **first 2 classrooms per building** are full playable interiors in this slice
- remaining bays are lightweight visual-only continuation facade/corridor geometry with no interior/interactions/gameplay collision
- Tòa A playable labels: `P 101`, `P 102`
- Tòa B playable labels remain `TBD_USER_APPROVAL`
- no dedicated parking-shelter structure
- outside gameplay bounds, do **not** use 3D city blocks; keep lightweight 2D background-card slots for future user/AI-authored perspective images, disabled until approved art is assigned
- the production classroom prefab remains reusable across future work
- old Người Thứ Chín/KCR/Chapter 1 narrative material in this branch is **stale legacy for the current pivot**; do not use it to invent new story, and do not delete it project-wide during GD4 cleanup
- do not invent final university identity, campus canon, final protagonist/NPC cast, chapter canon, twist, ending or KCR explanation without explicit user approval

BAC-45 completion / runtime evidence:
- user manual review/acceptance: **approved 2026-10-02**
- final review: `docs/playtest/gd4-geometry-corrections-review/`
- fresh Chrome/WebGPU: **0 runtime exceptions, 0 console errors, 0 HTTP >=400**
- east movement blocker: aligned at x=27.12, invisible, collision-enabled, vertical span y=-3..8; direct runtime collision pass with no climb/fall-through
- the old automatic safety/respawn recovery subsystem was removed from active runtime and source/tests after it caused unwanted teleport-to-spawn behavior
- final approved runtime: **2549 meshes / 470676 vertices**, **59.84 RAF FPS / 60.05 engine FPS**
- full repository gate: **15/15 test files, 51/51 tests pass**; typecheck/build/`git diff --check` pass
- final runtime evidence: `runtime-final-approved.json`; stale/intermediate runtime evidence is not authoritative

**STOP POINT — BAC-45 / Giảng đường 4 is user-approved and finalized in this checkpoint. Keep this commit local unless push is explicitly requested, then stop.** Do not resume old Chapter 2/KCR work. The anticipated next phase is a male + female character base, but do **not** start it until the user explicitly instructs it.

## End-of-session checkpoint
Before ending a long work session, update `docs/PROGRESS.md` with:
- current branch
- last completed task
- tests/build status
- current blocker, if any
- exact next task
- important rulings/architecture changes
- relevant Linear issue IDs
- preview/deployment URL if one exists

## New-information routing
When something new appears during implementation:
- technical requirement → relevant technical spec
- architectural decision → ADR
- story/continuity change → Narrative Bible
- visual rule → Art Bible
- audio rule → Audio Bible
- UX rule → UI/UX Bible
- new asset → Asset Plan/manifest
- pending work → Linear
- current state → PROGRESS.md

## Anti-forgetting rules
- Never leave an important design decision only in chat.
- Never rely on “I remember what I did last time.”
- Git history + PROGRESS.md + Linear are authoritative.
- If chat memory conflicts with repo state, trust repo state.
- If plan and implementation conflict, write a ruling in progress/ADR before continuing.
- Do not repeat completed work unless verification shows it is actually missing.
- From BAC-18 onward, apply the reuse-first implementation rule in `docs/WORKING_RULES.md` before creating any subsystem/helper/effect/controller/utility.
- Do not revisit BAC-11 through BAC-17 unless verification finds a real regression or architectural blocker.

## Context compaction strategy
When context becomes large:
- stop re-reading entire chat history;
- read only the progress checkpoint, relevant spec, and current task brief;
- use commit history for completed implementation details;
- keep detailed logs in repo, not in the conversation.

## Project identity
Working title: **Người Thứ Chín**
Type: browser-first true-3D first-person psychological investigation game.
Core mechanic: **Knowledge Changes Reality**.
Primary stack: TypeScript + Vite + Babylon.js.
Primary target: desktop web.
