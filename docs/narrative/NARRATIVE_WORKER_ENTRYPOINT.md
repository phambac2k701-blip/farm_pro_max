# UETốt — NARRATIVE WORKER ENTRYPOINT

Status: ACTIVE PROJECT-LOCAL ENTRYPOINT

Use this file to start any narrative worker pass.

## 1. Read first

1. `docs/narrative/UET_NARRATIVE_SKILL_V2.md`
2. `docs/narrative/PROTAGONIST_CHARACTER_BIBLE_V0.md`
3. target chapter lived-material ledger
4. target chapter story package
5. `docs/design/NARRATIVE_EVENT_STYLE_V2.md`
6. `docs/design/CURRENT_STORY_MACRO.md`
7. `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
8. `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`
9. `docs/design/USER_APPROVAL_GATES.md`
10. `docs/AI_COORDINATION.md`

For Chapter 0:
- `docs/narrative/CH0_LIVED_MATERIAL_LEDGER.md`
- `docs/narrative/CH0_STORY_PACKAGE_V0.md`

## 2. Reconstruct context from repo

Do not rely on a giant external prompt.

Build a context snapshot from the files above:
- locked facts;
- approved but open details;
- unknowns;
- forbidden scope;
- active continuity;
- current character state;
- available gameplay vocabulary;
- provenance of source material.

## 3. Perform the requested pass

For a Chapter 0 script/layout pass:
- write the actual playable story inside the layout, including concrete dialogue, actions, reactions, timing and scene progression;
- do not stop at event architecture or placeholders;
- creatively develop the existing spine;
- use user material as seeds, not a whitelist;
- preserve provenance;
- obey Bắc's Character Bible;
- research only where useful;
- keep trend/humor work date-appropriate;
- design playable first-person beats, options, inaction and reconvergence;
- do not self-promote proposals to canon.

## 4. Self-review before reporting

Run the self-review/revision loop defined in `UET_NARRATIVE_SKILL_V2.md`.

Fix issues that are within worker authority.
Leave approval-sensitive decisions as `TBD_USER_APPROVAL`.

## 5. Output

For the current Chapter 0 pass, create/update:

`docs/narrative/CH0_SCRIPT_LAYOUT_V0.md`

Use an isolated branch/worktree.

Commit and push that branch.

Do not merge.

Final report should be concise:
- branch + HEAD;
- artifact path;
- important AI expansions;
- research additions;
- unresolved approvals;
- strongest/weakest remaining beat;
- readiness for user review.
