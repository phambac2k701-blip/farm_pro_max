# Pre-Build Checklist

## Status
**PRE-BUILD PREPARATION ONLY. Do not interpret this file as authorization to start implementation.**

Build begins only after the user explicitly gives the start command in the fresh chat.

## Product
- [x] True 3D first-person direction confirmed
- [x] Browser-first target confirmed
- [x] Investigation/non-combat focus confirmed
- [x] Knowledge Changes Reality mechanic defined
- [x] Approximate 9-chapter structure documented

## Technical
- [x] Babylon.js + TypeScript + Vite selected for prototype
- [x] WebGPU preferred / WebGL fallback documented
- [x] Core architecture documented
- [x] movement/camera requirements documented
- [x] interaction requirements documented
- [x] state/save direction documented
- [x] testing/playtest rules documented
- [x] current docs verified against current Babylon.js documentation via Context7

## Creative
- [x] Art bible
- [x] Narrative bible
- [x] Audio bible
- [x] UI/UX bible
- [x] Asset plan
- [x] initial visual concept generated

## Operations
- [x] GitHub connected with Full Access
- [x] Linear connected with Full Access
- [x] Figma connected with Full Access
- [x] Vercel connected with Full Access
- [x] Remote Desktop Commander connected with Full Access
- [x] remote development device verified online
- [x] session continuity/resume protocol documented
- [x] continuous-execution rules documented
- [x] progress/checkpoint file exists
- [x] Linear roadmap/project exists

## Branch state
- `main` — stable baseline
- `phase-0-foundation` — pre-production documentation
- `prototype/bootstrap-3d` — prepared implementation branch; gameplay implementation has not started

## Build start command
In a fresh chat, a suitable explicit command is:

> Start building the Người Thứ Chín project now. Read the repository checkpoint first, then execute the current implementation plan continuously. Do not redo completed preparation work and do not stop for routine confirmation between planned tasks.

## First build task after authorization
**BAC-11 — Bootstrap browser 3D application**

First steps:
1. create minimal TypeScript/Vite project scaffolding
2. create test harness
3. write the first failing engine-selection/bootstrap test
4. verify RED
5. implement minimum EngineAdapter
6. verify GREEN
7. production build
8. update progress
9. continue to the next planned task

## New-information rule
Whenever implementation reveals a new constraint, bug, story requirement, asset requirement, or architectural decision:
1. implement/fix it if it belongs to the current approved task;
2. update the relevant spec or ADR;
3. update `docs/PROGRESS.md`;
4. create/update Linear work if follow-up remains;
5. continue from the next actionable item.

The repository must always be sufficient to reconstruct project state without relying on chat history.
