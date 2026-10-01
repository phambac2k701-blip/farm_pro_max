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

## Continuous execution authorization
The user has explicitly requested continuous end-to-end execution for this project.

This means:
- when one planned task is completed, immediately continue to the next actionable task;
- do not pause merely to ask “should I continue?”;
- do not require confirmation for ordinary reversible development work already covered by the project plan;
- keep `docs/PROGRESS.md` current so a future session can resume from the first unfinished item;
- if chat context is compacted or a fresh conversation is used, re-read the repository checkpoint and continue instead of reconstructing from memory;
- use connected tools autonomously when they are relevant: GitHub, Linear, Figma, Vercel, Context7, image generation, and Remote Desktop Commander.

This authorization does **not** override platform/runtime limits. A ChatGPT turn may end even when work remains. Therefore every meaningful milestone must leave a recoverable repository checkpoint.

Stop only for:
- a genuinely irreversible/destructive operation;
- a security-sensitive action not already authorized;
- a required credential/consent the tools cannot obtain autonomously;
- a technical blocker where proceeding would be blind guessing;
- a platform/runtime/tool limit that ends the active execution.

## Execution behavior
- Work continuously through the current plan until a genuine blocker, destructive action, security-sensitive action, or external approval is required.
- Do not stop after completing a single small item if the plan has more actionable work.
- Prefer small commits with one clear purpose.
- Use tests for gameplay/system logic wherever practical.
- For visual/game-feel work, verification must include a real running build and a playtest pass, not only unit tests.
- If a plan turns out to be wrong, make the smallest ruling that still satisfies the spec, document it, and continue.


## Reuse-first implementation rule (effective from BAC-18)
Before writing any new subsystem, helper, effect, controller, or utility, perform a short implementation review in this order:
1. inspect reusable components/patterns already present in this codebase;
2. check whether Babylon.js already provides the required API/feature;
3. consult current documentation through Context7 when API behavior/version details matter;
4. check suitable maintained open-source/library implementations before deciding to build from scratch.

Prefer reuse and composition over reimplementation, especially for:
- tween/easing/animation;
- camera blend and camera shake;
- post-processing, glitch, noise, blur, chromatic aberration, vignette;
- spatial audio and audio sequencing;
- timeline/sequence/event orchestration;
- finite-state-machine/state helpers;
- interaction helpers;
- asset loading/management;
- save/schema utilities;
- UI transitions.

Constraints:
- do not change the current architecture merely to fit a library;
- do not add a heavy dependency when Babylon.js or existing code already solves the problem cleanly;
- only use third-party/open-source code with a clear compatible license;
- do not copy external code blindly; understand and adapt the implementation;
- do not refactor stable BAC-11 through BAC-17 code unless a real regression, architectural blocker, or clearly material benefit is demonstrated;
- `InteractionSystem`, `CameraDirector`, `GameState`, `RealitySystem`, and other game-core abstractions remain owned by Người Thứ Chín; third-party libraries may sit below these abstractions when useful;
- object-specific behaviors such as Book, Photo, Drawer, Door, Pickup, Cassette, and Laptop must compose shared systems rather than create separate per-object frameworks;
- scripted horror events must compose Trigger + Camera/Screen FX + Audio + Lighting + World/Reality changes rather than introduce a dedicated scare framework.

When an external solution is adopted, record a short reason, license/maintenance check, and trade-off in the relevant technical document or progress checkpoint.

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
