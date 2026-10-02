# Session Continuity & Handoff

## Purpose

The repository is the project source of truth.

New sessions must resume from the current **UET không tệ** student-life direction rather than retired narrative material.

## Fresh-session resume instruction

> Continue the **UET không tệ** project in GitHub repo `phambac2k701-blip/farm_pro_max`. Read `docs/PROGRESS.md`, `docs/PROJECT_MASTER_PLAN.md`, and `docs/design/CURRENT_STORY_MACRO.md` before making narrative decisions. Chapter 4+ is locked. Do not restore retired story canon. Check the active Giảng đường 4 art branch before touching environment work.

## Required resume sequence

1. Inspect current branches and recent commits.
2. Read:
   - `README.md`
   - `docs/PROGRESS.md`
   - `docs/WORKING_RULES.md`
   - `docs/PROJECT_MASTER_PLAN.md`
   - `docs/design/CURRENT_STORY_MACRO.md`
   - `docs/design/GAME_PIVOT_V2_DRAFT_NOTES.md`
   - `docs/design/USER_APPROVAL_GATES.md`
   - current P202/Giảng đường 4 production/art docs
   - `docs/GAMEPLAY.md`
   - `docs/ART_BIBLE.md`
   - `docs/AUDIO_BIBLE.md`
   - `docs/TECHNICAL_REQUIREMENTS.md`
   - `docs/ARCHITECTURE.md`
3. Inspect `phase-v2/classroom-asset-production-v1` before touching environment/map code.
4. Respect all USER APPROVAL gates.
5. Do not invent Chapter 4+.
6. Do not turn Chapter 3 into a finale.
7. Update `docs/PROGRESS.md` after meaningful milestones.

## Current creative direction

- title: **UET không tệ**
- UET student-life timeline in Hanoi
- open-ended story
- current approved macro only covers Chapters 0–3
- Chapter 4+ is future-life material and remains locked
- humor is core
- study is context/background, not the whole subject
- chapters must connect through people, places, habits, callbacks and payoffs
- vibe coding is an approved subtle Chapter 3 thread
- no mystery/uncanny layer is currently approved for the Chapter 0–3 macro

## Current macro

- Ch0: entering university / admission-confirmation / first Hanoi-UET impressions
- Ch1: military-training period
- Ch2: ordinary university life begins / Giảng đường 4 becomes important
- Ch3: broader everyday student life / subtle vibe-coding reflection
- Ch4+: `TBD_FUTURE_LIFE_CHAPTERS`

Detailed events are still pending user input.

## Parallel production rule

Narrative work and environment art are running in parallel.

Visible environment branch:
- `phase-v2/classroom-asset-production-v1`

The user reports a large Giảng đường 4 update in progress.

Do not modify that branch from narrative cleanup unless explicitly coordinating a merge/integration pass.

## Technical continuity

Reusable foundations may remain:
- engine/bootstrap
- player movement/input
- collision/safety
- camera director
- interaction systems
- generic game state/events
- save/load
- audio infrastructure
- modular environment/material/signage systems
- tests/build/deployment

Story-specific old runtime content should be generalized or removed later, after the active environment update is safe.

## End-of-session checkpoint

Record:
- current branch
- last completed task
- active art branch/head
- test/build status if code changed
- blockers
- exact next task
- important approved narrative decisions
- preview/deployment state

## Anti-forgetting rules

- important decisions must not live only in chat
- Git history + current docs are authoritative
- do not resurrect retired narrative because old code/history references it
- do not confuse current temporal endpoint with an ending
- do not force future-life chapters into existence
- foreground story details should have a reason/payoff
