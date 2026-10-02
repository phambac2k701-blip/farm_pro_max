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

## Current intentional stop point
Milestone: **CHAPTER 1 VERTICAL SLICE COMPLETE**

- BAC-11 through BAC-21 remain frozen as Technical Prototype V1.
- BAC-22 through BAC-31 are complete and verified.
- Current branch: `integration/narrative-v1.2`.
- Final checkpoint ref: git tag `chapter-1-vertical-slice` (created on the final BAC-31 checkpoint commit).
- Preview: https://phambac2k701-blip.github.io/farm_pro_max/
- Chapter 1 final gate: `docs/production/CH01_BAC31_FINAL_GATE.md`.
- Machine-readable clean-playthrough evidence: `docs/playtest/ch01-bac31-full-playthrough.json`.
- BAC-30 presentation/recovery evidence: `docs/production/CH01_BAC30_REGRESSION.md`.
- Production narrative source of truth remains `docs/narrative/`.
- The implementation intentionally stops at the Chapter 2 boundary.
- **Do not start Chapter 2 gameplay automatically.** A new explicit user instruction and next-phase plan are required.
- Do not invent or rewrite canon during technical implementation. Narrative conflicts must be documented and resolved against the production package.

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
