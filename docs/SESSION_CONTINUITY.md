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
   - docs/NARRATIVE_BIBLE.md
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

## Current intentional stop point
Milestone: **TECHNICAL PROTOTYPE V1 COMPLETE**

- BAC-11 through BAC-21 are complete.
- Branch: `prototype/bootstrap-3d`.
- Preview: https://phambac2k701-blip.github.io/farm_pro_max/
- Final checkpoint ref: git tag `technical-prototype-v1` (created on the final checkpoint commit).
- Verification evidence: `docs/PLAYTEST_LOG.md`.
- Handoff: `docs/TECHNICAL_PROTOTYPE_V1_HANDOFF.md`.
- There is no active implementation task after BAC-21.
- Task 12 in the old foundation plan is intentionally **not started** at this checkpoint.
- Do not create BAC-22, start Chapter 1, write new narrative/content, expand the map, add mechanics, or begin a production phase until the user supplies a new explicit instruction/handoff.

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
