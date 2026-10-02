# AI COORDINATION — UET KHÔNG TỆ

Last updated: 2026-10-02

## Purpose

This file is the cross-conversation coordination source of truth for parallel AI work.

When a new ChatGPT conversation is opened for this project, read this file together with:
- `docs/PROGRESS.md`
- `docs/SESSION_CONTINUITY.md`
- relevant lane-specific source-of-truth docs

The user is final authority for project direction, canon, approvals and major scope changes.

The coordinating assistant acts as producer/integration controller:
- assigns lanes
- prevents overlapping file ownership
- reviews branch results
- decides integration order
- resolves cross-lane conflicts
- does not let worker lanes merge each other

## Shared base checkpoint

Current parallel-work base:
`409536b5eb8b34e2dc91647711a6509b111c4ed7`

Commit:
`docs: define character animation prototype roadmap`

## Active / planned AI lanes

### Lane 1 — Character Animation Prototype V0
Status: ACTIVE

Worktree:
`C:\Users\Dell\projects\farm_pro_max`

Branch:
`phase-v2/character-animation-prototype-v0`

Ownership:
- `src/art/character/prototype/*`
- `src/main.ts` while workshop wiring is in progress
- `src/style.css` while workshop HUD styling is in progress

Current scope:
- procedural stickman/mannequin
- humanoid skeleton/rig
- exactly six V0 clips
- playback/state sequence
- browser workshop/proof
- tests/performance/evidence before commit

### Lane 2 — Performance / Optimization Foundation V1
Status: WORKTREE CREATED; implementation not yet observed

Worktree:
`C:\Users\Dell\projects\farm_pro_max_perf`

Branch:
`phase-v2/performance-foundation-v1`

Ownership:
- new performance utility modules
- performance-specific tests
- `docs/performance/*`

Must not edit:
- `src/main.ts`
- `src/style.css`
- character prototype files
- event-flow files
- GD4 geometry
- `docs/PROGRESS.md`
- `docs/SESSION_CONTINUITY.md`

Purpose:
reusable measurement/regression tooling and performance-budget policy, not runtime redesign.

### Lane 3 — Event / Choice Flow Foundation V1
Status: ACTIVE / early implementation observed

Worktree:
`C:\Users\Dell\projects\farm_pro_max_event`

Branch:
`phase-v2/event-flow-foundation-v1`

Observed WIP:
- `src/game/events/ChoiceEventFlow.ts`

Ownership:
- generic typed event/choice-flow core
- event-flow tests
- `docs/design/CHOICE_EVENT_FLOW_V1.md`

Must not edit:
- character prototype/workshop files
- `src/main.ts`
- `src/style.css`
- GD4 geometry
- narrative canon
- `docs/PROGRESS.md`
- `docs/SESSION_CONTINUITY.md`

Purpose:
branch-and-reconverge technical foundation using existing GameState/Event systems.

### Lane 4 — Audio Asset Library V1
Status: PLANNED; worktree not yet created at last check

Planned worktree:
`C:\Users\Dell\projects\farm_pro_max_audio`

Planned branch:
`phase-v2/audio-asset-library-v1`

Ownership:
- candidate audio library
- audio metadata/catalog
- `docs/audio/*`
- audio candidate asset folders

Purpose:
read project needs, shortlist roughly 3–5 suitable candidates per sound type, download legally usable candidates locally, label provenance/license/context, and leave all candidates pending user review.

Must not:
- implement playback/runtime integration
- edit character/performance/event lanes
- edit `src/main.ts` or `src/style.css`
- mark any candidate APPROVED_FINAL without user approval
- edit `docs/PROGRESS.md` or `docs/SESSION_CONTINUITY.md`

## Coordination rules

1. Every worker lane gets its own branch; parallel coding lanes should use separate worktrees.
2. A worker may commit and push only its own branch.
3. A worker must not merge another worker branch.
4. A worker must not merge into main/default/integration unless explicitly assigned by the coordinator.
5. Do not checkout/reset/clean another lane's worktree.
6. Avoid overlapping file ownership; if overlap becomes necessary, STOP and escalate to the coordinator.
7. Runtime benchmarks are not authoritative while other heavy build/browser jobs are consuming the same machine.
8. Major user-approved decisions must be written into repo source-of-truth docs, not left only in chat memory.
9. Worker completion means: gates pass, commit, push, report, STOP.
10. Integration happens only after coordinator review of each finished branch.

## Integration protocol

When a lane reports complete, the coordinator should verify:
- branch and remote HEAD
- clean worktree
- diff/file ownership
- tests/typecheck/build/diff-check
- browser/runtime evidence when relevant
- performance regression when relevant
- source-of-truth compliance
- no invented canon or unapproved scope

Then decide integration order based on dependency/conflict risk.

Do not assume all parallel branches can be merged blindly.
