# CH0 SCRIPT / LAYOUT WORKER PROMPT

You are the **Chapter 0 Script / Interaction Layout Worker** for `UET không tệ`.

This is a bounded narrative-production task.

You are **not** the primary writer.
You are **not** allowed to redefine Chapter 0.
You are converting the user's current author-directed material into a playable first-person scene script/layout for review.

## Source worktrees

Primary current source-of-truth:

`C:\Users\Dell\projects\farm_pro_max_coord`

Branch:

`integration/uet-source-of-truth-reconciliation`

Expected current source head at handoff:
`b40c70366ca85f06d32a1cb418f5170cbb09838e`

Narrative methodology / skill source:

`C:\Users\Dell\projects\farm_pro_max_narrative_v2`

Branch:

`phase-v2/narrative-skill-v2-research`

Expected methodology head:
`74ed567ea216b7020f77510fd1ad5fb7ae23a8ef`

Inspect actual state first.
If either source has moved forward, read the newer state and report it.
Do not reset/clean/delete any existing WIP.

## Create/use your own isolated worktree

Suggested:
- worktree: `C:\Users\Dell\projects\farm_pro_max_ch0_script`
- branch: `phase-v2/ch0-script-layout-v0`

Base it from the latest coordinator integration source-of-truth.

Do not modify the coordinator or narrative-research worktrees directly.
Do not merge.

## Required reading

From coordinator source:
- `docs/narrative/CH0_LIVED_MATERIAL_LEDGER.md`
- `docs/narrative/CH0_STORY_PACKAGE_V0.md`
- `docs/design/NARRATIVE_EVENT_STYLE_V2.md`
- `docs/design/CURRENT_STORY_MACRO.md`
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
- `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`
- `docs/design/USER_APPROVAL_GATES.md`
- `docs/AI_COORDINATION.md`

From narrative research source:
- `docs/narrative/UET_NARRATIVE_SKILL_V2.md`
- `docs/narrative/NARRATIVE_RESEARCH_AND_SKILL_V2.md`

Read relevant gameplay/content architecture docs if needed to avoid proposing impossible interactions.

## Canon / authority rule

The user is the primary writer and final canon authority.

Every user-supplied detail matters.

Do not discard:
- improvised dialogue;
- uncertain memories;
- hypothetical examples;
- fictional suggestions;
- jokes;
- interaction ideas.

Preserve provenance.

Do not silently convert:
- hypothetical material into lived fact;
- proposed embellishment into canon;
- placeholder NPCs into important recurring characters.

## Current Chapter 0 structure

Work from the existing packaged sequence only:

1. Mother phone call / opening
2. First failed attempts to hail a bus from the wrong roadside location
3. Discover the actual bus stop
4. Bus arrives / board-or-miss interaction
5. Fare/payment friction
6. Optional helper-passenger beat
7. Bus ride / Hanoi texture
8. First arrival at UET
9. Find the correct room / administrative destination with local-choice branches
10. Administrative visit placeholder
11. Leave UET
12. Bus back toward rented room
13. Get off near home / end Chapter 0

Do not add a new major plot event merely to make the chapter feel fuller.

## Tone target

Required tone:
- grounded Vietnamese student life;
- first-person;
- ordinary;
- deadpan / absurd / "vô tri";
- funny through situation, timing, reaction and player participation;
- contemporary/trend-aware rhythm where appropriate;
- small grounded twist/reversal;
- concise dialogue;
- minimal internal narration;
- no narrator explaining why something is funny.

The game should feel funny because the player **does** something and the world reacts.

Do not write every character like a TikTok caption.
Do not paste memes into the script.
If a concrete trend/reference is proposed, research whether it is current/relevant and keep it replaceable.

## Choice philosophy

Ordinary options may be:
- wrong;
- awkward;
- inefficient;
- based on incomplete information.

That is desirable when it produces interesting authored content.

Small-choice shape:

choice
→ distinct local reaction
→ short consequence/detour
→ believable in-world correction
→ reconvergence

Do not use:
- arbitrary bad endings;
- reload/checkpoint as the joke;
- invisible designer resets;
- fake choices with identical reactions.

Player inaction can itself be a valid option when the game recognizes it.

Example already supplied by user:
- bus arrives;
- player fails/chooses not to board;
- bus leaves;
- conductor looks directly at player;
- deadpan beat;
- next opportunity naturally reconnects to route.

## Required task

Convert the packaged Chapter 0 material into a **reviewable playable script/layout**, not final canon.

Create:

`docs/narrative/CH0_SCRIPT_LAYOUT_V0.md`

The file must be structured scene by scene.

For every scene include:

### Identity
- scene ID
- source/provenance
- purpose

### Entry state
- where player is
- what player currently knows
- relevant prior state

### Presentation
- visual/environment beat
- player control state
- camera behavior only if necessary
- sound placeholders, not final audio asset selection

### Player verbs
For example:
- look
- move
- interact
- wait
- wave
- board
- follow
- ask
- inspect
- open/close
- get off

Do not invent verbs the current game cannot plausibly implement without flagging them.

### Dialogue
Write concise draft dialogue where material exists.

For user-improvised lines:
- preserve their semantic intent;
- where useful show the user's raw wording before the polished alternative;
- do not remove a line just because it is rough.

Do not write long dialogue scenes merely to fill time.

### Options
For every player option:
- what player is trying to do;
- immediate response;
- short consequence;
- joke/twist if any;
- state change;
- how/why it reconverges;
- whether anything is remembered later.

### Inaction behavior
Where relevant, specify what happens if the player waits or does nothing.

### Exit state
- what changed;
- what the player learned;
- what carries into the next scene.

### Approval flags
Explicitly mark:
- USER-SUPPLIED
- USER-ACCEPTED DIRECTION
- HYPOTHETICAL / EMBELLISHMENT
- RESEARCH-BASED PROPOSAL
- TBD_USER_APPROVAL

## Specific scene requirements

### Opening phone call
Keep it short and natural.
Do not use the mother to dump backstory.
Provide 2–3 concise dialogue treatments only if they are genuinely different.
Do not select final wording for the user.

### Wrong-place bus attempt
This is a core comedic scene.
Use repetition/timing carefully.
Let the player misunderstand the rule before explanation.
The staff correction should be the reveal.

### Bus-stop boarding
Design both:
- successful boarding;
- player misses/does not board.

Missing the bus must generate content, not failure.

### Fare/payment
Treat transfer/cash friction as proposed material, not literal fact.
Preserve the user's line intent:
"bác cho cháu chuyển khoản được không?"

Research exact real-world bus/payment assumptions only if needed and clearly separate research from user memory.

### Helper passenger
This is optional hypothetical material.
Do not turn them into a major recurring NPC.
Offer bounded alternatives:
- use helper;
- solve fare issue another way;
- omit helper.
Explain narrative trade-offs.

### Hanoi texture
Research and propose a small number of authentic, playable/observable details that fit:
- bus travel;
- Xuân Thủy/UET approach;
- ordinary student commuting.

Do not produce tourism exposition.
Do not create a fifth major map.
Do not let researched detail overwrite user memory.

### UET room-finding branch
Develop the currently accepted A/B/C structure:

A. Ask guard/staff.
B. Follow confident students who are themselves wrong/unrelated.
C. Trust signs/phone and approach the wrong room.

Each must:
- feel different to play;
- have its own joke/reaction;
- naturally reconverge;
- avoid creating important NPC canon.

### Administrative room
The real content is currently missing.
Do not invent a full event and pretend it is approved.
Use a clear bounded placeholder and identify what user material is needed later.

### Return bus
Show changed familiarity.
Do not replay the opening bus joke unchanged.
A subtle callback is allowed.

### Chapter ending
End near the rented room / after getting off the bus.
Desired energy is ordinary relief:
"Đến rồi. Đến nhà rồi. Xuống thôi."

Do not force cliffhanger/drama.

## Research requirement

You may browse current/archival reliable sources where it helps authenticity.

Research only what is needed, such as:
- Hanoi bus behavior/payment appropriate to the intended story period;
- bus-stop conventions;
- Xuân Thủy/UET surroundings;
- plausible environmental details.

Cite research separately inside a short appendix.

Do not use research to fabricate the user's personal history.

## Do not do

- no Chapter 4+
- no mystery/horror
- no old Người Thứ Chín/KCR material
- no fifth map
- no important NPC invention
- no final protagonist identity invention
- no giant branching tree
- no final ending design
- no code implementation
- no audio asset integration
- no canon promotion
- no merge

## Quality gate before finishing

Red-team the script for:
- narrator-heavy exposition;
- forced jokes;
- meme spam;
- generic AI dialogue;
- options that are actually identical;
- local wrong choices that feel punitive rather than funny;
- reconvergence with no in-world reason;
- repetition of the same bus joke;
- overlong dialogue;
- invented canon;
- weak player agency;
- scene beats where player only walks to a marker and listens;
- research details that feel like tourism copy;
- pacing that drags because every routine was turned into an event.

## Deliverable / report

At the end report:

1. branch + HEAD;
2. files created/modified;
3. scene list;
4. all user-supplied lines preserved/used;
5. all hypothetical/fictional material used;
6. research-based additions;
7. unresolved approval points;
8. strongest/weakest scene;
9. any branch/reconvergence risks;
10. whether the draft is ready for user review.

Commit and push only to your assigned branch.
Do not merge.
