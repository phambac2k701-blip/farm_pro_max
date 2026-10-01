# Session Continuity & Handoff

## Why this file exists
Long ChatGPT sessions can become unwieldy. Conversation context is not the project database.
This repository must contain everything needed to resume work in a fresh chat.

## Fresh-chat resume command
In a new conversation, tell the agent:

> Continue the Người Thứ Chín project in GitHub repo phambac2k701-blip/farm_pro_max. Read README.md, docs/SESSION_CONTINUITY.md, docs/PROGRESS.md, docs/WORKING_RULES.md, docs/PROJECT_MASTER_PLAN.md, docs/TECHNICAL_REQUIREMENTS.md, docs/ARCHITECTURE.md, docs/GAMEPLAY.md, then inspect open PRs/branches and Linear project P-BAC-1. Resume from the first unfinished item; do not redo completed work.

## Required resume sequence
1. Inspect repository default branch, open PRs, active implementation branch, and recent commits.
2. Read:
   - README.md
   - docs/SESSION_CONTINUITY.md
   - docs/PROGRESS.md
   - docs/WORKING_RULES.md
   - docs/PROJECT_MASTER_PLAN.md
   - docs/TECHNICAL_REQUIREMENTS.md
   - docs/ARCHITECTURE.md
   - docs/GAMEPLAY.md
   - docs/ART_BIBLE.md
   - docs/TESTING_AND_PLAYTEST.md
   - relevant docs/DECISIONS/*
   - current docs/superpowers/plans/*
3. Inspect Linear project `P-BAC-1` and active issues.
4. Check the most recent implementation commit and tests before writing new code.
5. Resume from the first unchecked or in-progress task.
6. Update `docs/PROGRESS.md` whenever a meaningful milestone is completed.

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

## Anti-forgetting rules
- Never leave an important design decision only in chat.
- Never rely on “I remember what I did last time.”
- Git history + PROGRESS.md + Linear are authoritative.
- If chat memory conflicts with repo state, trust repo state.
- If plan and implementation conflict, write a ruling in progress/ADR before continuing.
- Do not repeat completed work unless verification shows it is actually missing.

## Context compaction strategy
When context becomes large:
- stop re-reading entire history
- read only the relevant spec + current task brief + progress checkpoint
- use commit history for completed implementation details
- keep detailed logs in repo, not in the conversation

## Project identity
Working title: **Người Thứ Chín**
Type: browser-first true-3D first-person psychological investigation game.
Core mechanic: **Knowledge Changes Reality**.
Primary stack: TypeScript + Vite + Babylon.js.
Primary target: desktop web.
