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
   - relevant docs/DECISIONS/*
   - current docs/superpowers/plans/*
3. Inspect Linear project `P-BAC-1` and active issues.
4. Trust `docs/PROGRESS.md` for whether implementation has started.
5. If build has not been explicitly authorized yet, remain at the pre-build checkpoint.
6. After explicit build authorization, resume from the first unchecked implementation task.
7. Update `docs/PROGRESS.md` after every meaningful milestone.

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
