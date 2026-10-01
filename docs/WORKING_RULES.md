# Working Rules

## Purpose
This file is the execution contract for any agent or future session working on this game.

## Source of truth
1. GitHub repository content is authoritative.
2. Chat context is temporary and must never be the only place where a major decision exists.
3. Every meaningful architecture, story, gameplay, art, or production decision must be written to `docs/`.
4. `docs/PROGRESS.md` is the first file to read when resuming work.

## Resume protocol
Before making changes:
1. Read `README.md`.
2. Read `docs/PROGRESS.md`.
3. Read `docs/PROJECT_MASTER_PLAN.md`.
4. Read the relevant spec for the current task.
5. Read all applicable ADRs in `docs/DECISIONS/`.
6. Check the branch and recent commits.
7. Continue from the first unfinished checklist item. Do not restart completed work.

## Execution behavior
- Work continuously through the current plan until a genuine blocker, destructive action, security-sensitive action, or external approval is required.
- Do not stop after completing a single small item if the plan has more actionable work.
- Prefer small commits with one clear purpose.
- Use tests for gameplay/system logic wherever practical.
- For visual/game-feel work, verification must include a real running build and a playtest pass, not only unit tests.
- If a plan turns out to be wrong, make the smallest ruling that still satisfies the spec, document it, and continue.

## Quality bar
The game must prioritize:
- smooth first-person camera and movement
- tactile, cinematic interactions
- atmosphere and visual fidelity
- understandable investigation logic
- stable performance
- consistent art direction
- no obvious “AI-generated patchwork” in code, UI, art, or writing

## Definition of done for a feature
A feature is not complete until:
- intended behavior is implemented
- tests/checks pass
- the feature has been exercised in a real build
- major edge cases are considered
- documentation is updated when the behavior changes architecture or gameplay
- `docs/PROGRESS.md` is updated

## Autonomous art rule
The agent may generate concept art, texture references, prop references, UI references, and temporary production assets when needed. Generated assets must follow `docs/ART_BIBLE.md`, and final assets should be reviewed for visual consistency before shipping.

## Playtest rule
For each playable milestone:
1. run the game
2. inspect movement and camera feel
3. interact with every newly added object
4. capture screenshots when visual comparison helps
5. check console/runtime errors
6. fix obvious regressions immediately
7. record remaining issues in progress/issue tracking

## Scope discipline
Do not expand the game simply because a feature is technically possible.
The MVP exists to prove:
- first-person movement feels good
- interaction feels good
- investigation loop is compelling
- “Knowledge Changes Reality” works
- one short chapter can look and sound polished

## Naming
Working title: **Người Thứ Chín**.
Repository name may remain `farm_pro_max` until renaming is intentionally decided.
