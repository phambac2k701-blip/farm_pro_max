# Progress

Last updated: 2026-10-02

## Current phase

**STUDENT-LIFE REFOUNDATION — LEGACY STORY PURGE + P202 GOLDEN CLASSROOM**

## Current cleanup branch

`cleanup/remove-legacy-story-v1`

Base: `phase-v2/foundation-hardening`.

## Current product direction

- browser-first true-3D first-person student-life narrative game
- fictional technology university in Hanoi
- ordinary, bright, readable university life is the baseline
- humor and believable student behavior are core
- narrative material is being rebuilt from the beginning of university through the protagonist's current second-year period
- approximately nine chapters remains a structural target only; the new chapter contents have not been approved
- later-year material should not be invented merely to fill the outline
- strange/uncanny material may exist as a secondary layer, but its final rules and meaning are not yet canon

## Legacy narrative status

The previous story package has been retired.

Removed from the active tree:
- the complete old `docs/narrative/` production package
- the old `docs/NARRATIVE_BIBLE.md`
- obsolete earlier prototype production/final-gate documents
- obsolete old prototype/vertical-slice screenshot evidence

The old story must not be treated as canon or used as the basis for new chapter planning.

Git history may still contain historical versions, but they are not active project source-of-truth content.

## What is intentionally reused

Reusable technical/art infrastructure remains valuable:
- TypeScript + Vite + Babylon.js
- WebGPU preferred / WebGL fallback
- first-person movement and input
- collision and safety recovery
- interaction targeting/state ownership
- camera choreography
- save/load and typed state/events
- openable/pickup/inspection behavior infrastructure
- AudioDirector
- modular environment kit
- PBR material foundation
- signage system
- testing/build/deployment infrastructure

Legacy story-specific runtime wiring is to be removed or generalized only when doing so does not destroy the active P202 production work.

## Current environment target

P202 is the first **golden classroom**:
- larger room and higher ceiling
- approximately 10 rows × 3 desks
- 2 chairs per desk
- teacher desk facing students
- front board
- specified window layout
- AC
- ceiling fans
- brighter ordinary classroom baseline
- real/reusable production assets rather than only primitive boxes

## Current narrative status

No new nine-chapter canon is locked yet.

The next narrative task is:
1. map the student's real/grounded timeline from university entry through the current second-year period
2. identify meaningful phases/events
3. group those into a nine-chapter macro structure
4. only then design chapter-level events

Do not implement final chapter beats before that macro structure is approved.

## Immediate production order

1. complete P202 asset/layout correction
2. freeze P202 golden-room baseline
3. finish legacy runtime-content extraction/generalization as needed
4. design the approved nine-chapter macro structure
5. implement the first polished P202 student-life gameplay sequence
6. expand systems/assets only when concrete gameplay requires them

## Approval gates

User approval remains required for:
- chapter canon/order
- major story beats
- important NPC identities/roles
- protagonist final identity/look
- institutional identity
- major route decisions
- uncanny/mystery explanation
- endings

## Existing preview

Current preview infrastructure remains GitHub Pages. Preview content may lag the new direction until the active implementation branch is updated and deployed.
