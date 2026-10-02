# Session Continuity & Handoff

## Purpose

The repository is the project source of truth. New sessions should resume from the current student-life direction, not from retired narrative material.

## Fresh-session resume instruction

> Continue the student-life 3D game in GitHub repo `phambac2k701-blip/farm_pro_max`. Read `docs/PROGRESS.md`, `docs/PROJECT_MASTER_PLAN.md`, `docs/design/GAME_PIVOT_V2_DRAFT_NOTES.md`, and the relevant current production/art docs before changing anything. The previous narrative is retired and must not be restored as canon.

## Required resume sequence

1. Inspect current active branches and recent commits.
2. Read:
   - `README.md`
   - `docs/PROGRESS.md`
   - `docs/WORKING_RULES.md`
   - `docs/PROJECT_MASTER_PLAN.md`
   - `docs/design/GAME_PIVOT_V2_DRAFT_NOTES.md`
   - `docs/design/USER_APPROVAL_GATES.md`
   - `docs/design/P202_ROOM_FOCUSED_STUDENT_SLICE.md`
   - `docs/art/P202_GOLDEN_CLASSROOM_VISUAL_GUIDE.md`
   - `docs/art/VISUAL_PRODUCTION_WORKSHOP_V1_DRAFT.md`
   - current `docs/production/` files
   - `docs/TECHNICAL_REQUIREMENTS.md`
   - `docs/ARCHITECTURE.md`
   - `docs/GAMEPLAY.md`
   - `docs/ART_BIBLE.md`
   - `docs/AUDIO_BIBLE.md`
3. Inspect current implementation work before starting a new pass.
4. Respect all USER APPROVAL gates.
5. Do not invent the new nine-chapter outline before the user approves it.
6. Update `docs/PROGRESS.md` after meaningful milestones.

## Current state

Active creative direction:
- first-person 3D student-life narrative game
- fictional technology university in Hanoi
- current story planning covers university entry through the current second-year period
- approximately nine chapters is a target count only
- P202 is the first golden classroom/environment benchmark
- ordinary gameplay is bright/readable
- humor and lived student behavior are core

The old narrative package has been removed from the active tree.

## Technical continuity

Reusable foundations from earlier prototyping may remain when they are genuinely useful:
- engine/bootstrap
- player movement
- input
- collisions
- camera director
- interaction systems
- generic game state/events
- save/load
- audio infrastructure
- modular environment/material/signage systems
- tests/build/deployment

Story-specific runtime code should be generalized or removed as the new gameplay replaces it.

## End-of-session checkpoint

Before ending substantial work, record:
- current branch
- last completed task
- test/build status
- blockers
- exact next task
- important design/architecture decisions
- preview/deployment state

## New-information routing

- technical requirement → technical spec / ADR
- architecture decision → architecture / ADR
- narrative decision → current design/story document after user approval
- visual rule → Art Bible / visual guide
- audio rule → Audio Bible
- UX rule → UI/UX
- asset decision → asset plan/provenance
- current status → PROGRESS

## Anti-forgetting rules

- important decisions must not live only in chat
- Git history + current docs + task tracker are authoritative
- retired narrative files must not be recreated merely because old code/history references them
- distinguish reusable technical infrastructure from obsolete story content
- do not restart completed technical work unless verification shows a real regression
