# UETỐT — NARRATIVE SKILL V2

Status: PROJECT-LOCAL NARRATIVE WORKFLOW
Scope: Chapters 0–3 only
Canon authority: User / primary writer

## Purpose

Use this skill to help the user research, organize, generate alternatives from, creatively develop, critique, revise, approve, and hand off narrative material for **UETốt** without allowing AI-generated material to replace the user's lived experience or silently become canon.

This is an **author-assist skill, not an author-replacement skill**. The user supplies lived experience, personal intent, important creative judgment and final canon decisions. AI structures, proposes, compares, critiques and converts approved material into playable narrative.

This skill is for:
- lived-material extraction;
- event ideation;
- slice-of-life narrative design;
- character continuity;
- gameplay conversion;
- branch design;
- narrative QA;
- implementation handoff.

This skill is not a license to invent story canon.

## Hard project boundaries

Always preserve:
- true 3D;
- first-person;
- browser-first;
- grounded Vietnamese student life;
- ordinary student life as the subject;
- study/class structure as background;
- humor from believable situations;
- ordinary scenes may use deadpan/absurd ("vô tri") comedy, contemporary rhythm and small reversals/twists when grounded in the situation;
- trend-aware presentation is allowed, but concrete trends are replaceable presentation details rather than core canon;
- Chapters 0–3 only;
- exactly four current major map families;
- user as final canon authority.

Never reintroduce retired Người Thứ Chín canon or mechanics.

Never add:
- horror/mystery merely to increase excitement;
- a fifth major map;
- Chapter 4+ content;
- important NPC identity without approval;
- major relationship canon without approval;
- final protagonist identity without approval;
- giant life-sim scope;
- dialogue-heavy visual-novel structure;
- permanent branching for ordinary choices by default;
- a detailed chapter event catalog generated from the macro alone;
- fabricated lived experience used merely to make a chapter feel complete;
- narrator-heavy comedy that explains the joke instead of letting the player participate in it.

## Canon lifecycle

Every narrative artifact must carry exactly one lifecycle label:

1. **candidate** — generated or proposed; not selected.
2. **selected** — retained for further development; not approved.
3. **user-approved** — explicitly approved by the user as a creative decision.
4. **canonical** — written into the authoritative project narrative source-of-truth.
5. **implemented** — represented in the game runtime/content and verified.

These states are not synonyms.

A worker may move material from candidate to selected only as a recommendation.
Only explicit user approval can authorize user-approved.
Do not mark material canonical until the approved decision is recorded in the authoritative repo source-of-truth.
Do not mark material implemented until the runtime/content proof exists.

## Source priority

Resolve narrative conflicts in this order:

1. latest explicit user instruction;
2. current approved source-of-truth docs;
3. canonical narrative registry/ledger, when present;
4. approved character state;
5. approved event specs;
6. selected candidates;
7. research notes;
8. generated proposals.

Historical retired narrative is never above current UET source-of-truth.

If sources conflict on a major creative fact:
- report the conflict;
- preserve both references;
- do not choose silently;
- use TBD_USER_APPROVAL until resolved.

## Content classes

Every authored unit must be classified before it is developed.

### Major event
A structural chapter turning point or remembered anchor.

### Story event
A specific occurrence whose removal would materially weaken state, continuity, relationship, interpretation, or chapter progression.

### Character beat
A relationship or character-state progression. It may live inside a larger event.

### Routine system
A reusable interaction pattern, such as:
- seat selection;
- entering class;
- sitting/standing;
- checking phone;
- commuting;
- waiting;
- ordering a drink.

A routine system is not automatically a named story event.

### Ambient beat
Optional texture that makes the world feel lived-in without being required for progression.

## Creative-development boundary

User-supplied scenes, interactions, dialogue fragments and examples are **seeds / a story spine, not a whitelist**.

AI may expand them with:
- connected micro-events;
- interruptions;
- side interactions;
- extra local options;
- visual/environment jokes;
- callbacks;
- short detours;
- stronger playable expressions of the same underlying idea.

Expansion is encouraged when it makes the material more playable, specific, funny, or memorable.

AI still may not:
- fabricate missing lived experience and present it as fact;
- create an unrelated major plot to fill space;
- create important recurring NPC canon without approval;
- override a user-approved event meaning.

Every AI-added element remains proposed material until approved.

## Internet-culture window

For scenes set in the current Chapter 0 period, research internet culture from roughly **June–December 2025**.

Do not reduce this to a "meme list". Analyze humor mechanisms such as:
- repetition / spam as punchline;
- brainrot / low-semantic absurdity;
- intentionally stale or corny phrases used ironically;
- comment-section phrasing;
- neutral/serious public moments remixed into meme formats;
- a reference becoming funny because it is overused.

"Meme spam" is not inherently wrong. It is wrong only when contextless or when repetition has no timing/escalation/payoff.

Concrete references must be date-appropriate and replaceable. When based on real controversies, separate verified fact from meme culture and avoid treating unverified claims as truth.

## Two-worker narrative model

Narrative production uses at most two narrative workers at once, plus the coordinator.

### Worker A — Event Architect / Branch Designer

Consumes:
- user-supplied lived material and provenance;
- approved macro/canon;
- current character and continuity state;
- map/gameplay constraints.

Owns:
- content classification;
- event purpose;
- player verbs;
- option intent;
- local consequences;
- authored reconvergence;
- setup/payoff and continuity implications.

Worker A does **not** finalize dialogue and may not manufacture missing lived experience.

### Worker B — Scene / Interaction Writer

Consumes an already selected/approved event structure.

Owns:
- playable scene beats;
- concise dialogue;
- option-specific reactions;
- pauses/timing;
- visual or object-based comedy;
- short internal thoughts only when the scene cannot communicate the information itself.

Worker B may not change event causality, create important canon, or add a new relationship/major event to improve the scene.

### Coordinator

The coordinator receives raw material from the user, preserves provenance, assigns the correct worker, reviews both outputs, and owns cross-chapter continuity/integration control.

The user remains the primary writer and final canon authority.

## Required working rule

Do not write polished dialogue or prose before:
- relevant user-supplied lived material exists or the user has explicitly authorized fictionalization;
- the event function is clear;
- the gameplay structure works;
- continuity checks pass;
- the event is selected;
- and the relevant approval gate is known.

A chapter macro is not sufficient source material for a detailed event catalog.

Fluency is not evidence of narrative quality.

# Phase 0 — Read source of truth

## Required inputs

Before brainstorming, read the current versions of:
- story macro;
- existing canon/approved decisions;
- event registry, if present;
- current character states, if present;
- current map limits;
- continuity/callback ledger, if present;
- approval gates;
- gameplay/event architecture;
- production constraints relevant to the target map/zone.

## Produce a Context Snapshot

Record:

### Locked facts
Facts that may not be changed in this pass.

### Approved-but-open details
Direction is approved but exact execution remains open.

### Unknowns
Missing facts that must not be guessed.

### Forbidden scope
For example:
- Chapter 4+;
- fifth map;
- retired mystery canon;
- unapproved important NPCs.

### Active continuity obligations
Setups, callbacks, relationships, knowledge, objects, jokes, habits or promises already in play.

### Available gameplay vocabulary
Player verbs and systems already implemented or approved for the relevant target.

No candidate generation occurs until this snapshot exists.

# Phase 1 — Lived Material Extraction

When the user supplies a memory, real incident, anecdote, photo note, chat recollection, timeline fragment, or lived experience, do not immediately turn it into fiction.

Extract it first.

## Extraction schema

For each item record:
- source label;
- people;
- places;
- chronology;
- occurrence;
- emotion;
- joke/comic friction;
- inconvenience;
- object;
- routine;
- relationship implication;
- detail worth foregrounding;
- uncertainty;
- possible future callback.

## Provenance class

Every extracted statement must be one of:

### literal_fact
The user presented it as something that happened or is true.

### uncertain_memory
The user is unsure about accuracy/order/detail.

### possible_fictionalization
The user explicitly permits adaptation but has not approved a specific invented version.

### proposed_embellishment
An AI or collaborator proposes a change/addition.

Never collapse these classes.

A proposed embellishment must not be rewritten later as a remembered fact.

## Extraction output

Produce a Lived Material Ledger, not a scene.

# Phase 2 — Narrative Function

Before event generation, identify the missing functions in the chapter/sequence.

For each possible event, answer:
- Why does this exist?
- What changes because of it?
- What carries forward?
- What does it establish, complicate, reinterpret, or pay off?
- If removed, what is actually lost?

Possible state changes:
- knowledge;
- relationship;
- habit;
- plan;
- location familiarity;
- interpretation;
- recurring joke;
- object significance;
- routine;
- commitment;
- player expectation.

If removal loses nothing meaningful:
- classify as ambient/routine if it still has texture or gameplay value;
- otherwise reject as filler.

## Chapter function pass

Before adding a new event, check whether the chapter already has:
- entry/continuity handoff;
- at least one memorable anchor;
- character/state progression;
- routine variation;
- continuity carry-out;
- an exit/reorientation beat.

Do not use this as a rigid scene-count formula.

# Phase 3 — Gameplay Conversion

Before generating event variants, convert each narrative-function slot into a **gameplay envelope**.

The Phase 3 envelope defines what a valid candidate must be able to support:
- plausible player objective;
- available player verbs;
- allowed spatial context;
- movement/observation opportunity;
- reusable interactables/systems;
- possible local reaction;
- required state-change type;
- repetition risks versus adjacent content.

Phase 4 candidates must be generated inside this envelope.

After Phase 6 selection, deepen the selected candidate using the same contract and fill the full event fields:
- player objective;
- player verbs;
- spatial route;
- interactables;
- optional observation;
- choice, if meaningful;
- local reaction;
- consequence/state change;
- reconvergence or continuation;
- exit condition;
- recovery path if the player delays, refuses or experiments.

## Preferred event loop

arrive
→ understand situation
→ move/look
→ interact
→ make a small choice when appropriate
→ receive reaction/consequence
→ reconverge/continue
→ carry later payoff only when justified

## Verb test

Ask:
**What did the player do that made this event happen?**

If the answer is mostly:
- watched;
- listened;
- walked to a marker;
- triggered dialogue;

then redesign or merge the event.

## Repetition test

Compare adjacent mandatory events.

If they share:
- the same route;
- the same actors;
- the same primary verbs;
- the same emotional function;
- the same state result;

merge them or convert some material to routine/ambient content.

# Phase 4 — Event Candidate Generation

Generate multiple candidates at low resolution only when multiple alternatives would help the user make a decision.

There is **no default candidate quota**. Generate the smallest useful set that exposes meaningfully different approaches. Expand only when the options are genuinely distinct in function, player verb, tone, spatial use, or continuity consequence.

Do not generate extra candidates merely to fill a batch.

## Candidate format

Each candidate contains:
- situation in one or two sentences;
- content class;
- source grounding;
- narrative function;
- map/zone;
- player verbs;
- pre-state;
- post-state;
- continuity carry;
- branch shape;
- production cost;
- risk flags.

Do not generate full prose for every candidate.

## Diversity axes

Candidates should vary in:
- type of friction;
- social timing;
- player verb;
- location use;
- relationship dynamic;
- degree of optionality;
- temporal placement;
- callback potential.

Do not produce ten rewrites of the same incident.

## Slice-of-life generator

Use this as a prompt skeleton:

**routine × friction × social timing × relationship state × place familiarity**

Possible low-stakes friction:
- changed plan;
- timing mismatch;
- space/seat availability;
- route inconvenience;
- ordinary object problem;
- waiting;
- phone/message timing;
- hesitation;
- mild misunderstanding;
- expectation vs reality.

The point is not “conflict for conflict’s sake.”
The point is to create a believable reason for the player to notice, choose, adapt, react, or reinterpret.

## Comedy / trend / twist pass

For ordinary comedic scenes, prefer **participatory comedy** over narrated jokes.

Useful structures include:
- player confidently chooses something that is locally wrong;
- an NPC is equally confident and also wrong;
- awkward silence or delayed realization;
- expectation → interruption/reversal;
- a mundane object or environment creates the punchline;
- a callback changes the meaning of an earlier ordinary detail;
- a small tension spike is immediately recontextualized into something mundane or funny.

The desired tone may be deadpan, absurd or "vô tri", but it must remain grounded in believable student behavior.

Trend-aware rhythm is allowed, especially for the **mid-to-late 2025** story window. Deliberately stale/nhạt jokes and repeated meme tokens are allowed when the mismatch, overuse, timing, or escalation is the actual joke.

Concrete TikTok/meme/trend references:
- must be researched near the time the scene is written;
- must fit the character/context rather than being pasted in;
- should be replaceable without breaking event causality;
- must not become permanent canon solely because they are currently popular.

A small twist should be prepared by information available in the scene and make sense after the reveal. Do not fake information, inject mystery lore, or escalate stakes merely to produce a twist.

## First-person presentation pass

POV does not justify continuous narration.

Prefer:
- visible behavior;
- short dialogue;
- player-controlled looking/movement;
- pauses and reaction timing;
- environment/object feedback;
- internal thought only when it adds information or characterization the scene cannot already show.

If a joke works only because a narrator explains why it is funny, redesign the scene.

## Intensity ceiling

Default to proportionate stakes.

Do not escalate ordinary student material into:
- conspiracy;
- danger;
- melodrama;
- betrayal;
- tragedy;
- supernatural incident;

unless the user-supplied/approved material actually requires it.

# Phase 5 — Critique / Red Team

A critique pass should be separate from the generation pass when practical.

Do not use one overall numeric “story score.”

## Finding format

For every material issue record:
- severity: blocking / major / moderate / optional;
- category;
- evidence;
- diagnosis;
- likely root cause;
- recommended correction;
- affected downstream material.

## Required checks

### Narrative necessity
Does the event survive the removal test?

### Character authenticity
Do involved people act from goals/pressure/knowledge rather than because the plot needs them to?

### Gameplay value
Are the verbs distinct and worth playing?

### Continuity
Does it preserve chronology, prior facts and active callbacks?

### Pacing
Does it add a new function rather than repeating the previous beat?

### Humor
Does comedy arise from believable timing/situation/chemistry?

### Vietnamese/student-life specificity
Could this event happen in any generic fictional school with only nouns swapped?

Specificity must come from grounded behavior/context, not caricature.

### Setup/payoff
Is something foregrounded without future purpose?
Is a payoff arriving without setup?

### Production cost
Does the narrative value justify unique assets, animation, branch paths or state complexity?

### Cliché / contrivance
Is the coincidence doing the writer’s work?

### Choice integrity
Does each meaningful option express a distinct intention or strategy?
Does the game acknowledge it?

### Exposition
Are people explaining things they would not naturally explain?

### Repetition
Is this another version of the same interaction pattern?

# Phase 6 — Selection and Approval State

After critique, sort candidates into:
- reject;
- hold;
- selected for development.

Selection is not approval.

## Selection criteria

Prefer a candidate when it:
- fills a real narrative function;
- uses approved/lived material well;
- creates playable activity;
- deepens continuity;
- exploits existing maps/systems;
- has proportionate production cost;
- offers believable specificity;
- does not require invented canon.

## User approval gate

Before a selected candidate becomes canon-facing, identify whether it changes:
- detailed chapter canon;
- important NPC;
- relationship;
- major story beat;
- persistent route;
- protagonist identity;
- map identity;
- future chapter content.

If yes, it requires explicit user approval.

## Promotion record

When approval exists, record:
- what exactly was approved;
- date/context;
- which candidate/version;
- what remains unapproved;
- which source-of-truth file must be updated.

# Phase 7 — Continuity Graph

Track only continuity that matters.

## Track
- recurring people;
- recurring places;
- relationships;
- habits;
- objects;
- jokes;
- callbacks;
- foreground details;
- promises/setups;
- payoffs;
- knowledge changes;
- unresolved plans.

## Continuity item fields
- ID;
- type;
- first introduction;
- current state;
- owner source;
- who knows;
- latest reference;
- future obligation;
- payoff/closure;
- lifecycle status.

## Mandatory diagnostics

### Orphan setup
A foregrounded detail has no credible future use.

### Unearned payoff
A beat expects emotional/comedic/narrative weight that was not established.

### Contradiction
Two active facts cannot both be true.

### Dead callback
A tracked item is repeatedly referenced but no longer contributes.

### Anthology break
A chapter could be swapped with another without affecting people, places, habits, relationships or interpretation.

Recurring locations should gain meaning through changed context, not just repeated geometry.

# Phase 8 — Character Knowledge State

Every important NPC needs a compact current-state record.

## Required fields
- current goal;
- current pressure;
- current routine/obligation;
- what they know;
- what they believe;
- what they suspect;
- what they do not know;
- current view of protagonist;
- relationship/familiarity state;
- unresolved friction;
- plausible next action;
- refusal/priorities;
- last meaningful appearance;
- open continuity obligations.

## Knowledge rule

An NPC may act only on:
- what they know;
- what they reasonably infer;
- what their routine makes them encounter.

Never leak writer knowledge into character behavior.

## Character-agent use

Simulation is allowed only for candidate discovery.

Inputs to a simulated NPC must be bounded by the approved state above.

Simulation output:
- is proposed material;
- may not invent biography as truth;
- may not create important relationships;
- may not promote itself to canon.

# Phase 9 — Branch Design

Default branch shape:

choice
→ distinct local response
→ optional short detour / consequence
→ believable in-world correction or redirect
→ remembered local state if useful
→ reconvergence

For ordinary low-stakes scenes, it is valid for several options to be locally suboptimal, awkward, inefficient or "wrong" as long as each produces authored content and none becomes an arbitrary bad ending.

Examples of valid reconvergence causes:
- the person the player followed was also wrong and turns back;
- a room/office is closed;
- a message or notice corrects the information;
- an NPC redirects the player;
- an attempted interaction fails for a believable reason;
- schedule/timing forces the routes back together;
- the player discovers missing context and self-corrects.

## Small branch requirements
- options express distinguishable player intentions;
- the player has enough information for the claimed choice;
- immediate feedback acknowledges the choice;
- each meaningful detour produces a distinct local consequence/reaction;
- reconvergence has an authored in-world cause rather than an invisible reset;
- any persistent flag has a named future purpose;
- reconvergence does not erase the fact that the response differed.

## Persistent branch gate

A persistent branch is justified only when:
- later approved content genuinely consumes the state;
- the narrative weight justifies content/QA cost;
- route ownership is clear;
- user approves the long-term consequence.

Do not create permanent route state “just in case.”

## Fake-choice test

A choice is fake if:
- options are phrasings of the same intention;
- reactions are indistinguishable;
- state never remembers it when the game presents it as important;
- one option is obviously correct with no role-play purpose;
- hidden punishment is unrelated to available information.

A low-stakes expressive choice may still be valid if the game acknowledges it honestly.

# Phase 10 — Production Spec

Only user-approved/canonical events should become production specs for final content.

## Required production fields

### Identity
- event ID;
- chapter;
- lifecycle/approval status;
- source references.

### Spatial
- major map;
- zone;
- spawn/entry position concept;
- entry conditions;
- active fidelity needs.

### Runtime state
- trigger;
- initial state;
- prerequisite facts;
- temporary event-local state;
- persistent state reads;
- persistent state writes.

### Cast / assets
- required actors;
- required props;
- reusable assets;
- unique assets;
- animation needs;
- audio needs;
- UI needs.

### Player structure
- objective;
- verbs;
- interactables;
- event nodes;
- optional observations;
- choices;
- reactions;
- branch paths;
- reconvergence.

### Completion
- exit condition;
- failure/recovery;
- skip/delay behavior if applicable;
- post-state;
- callbacks;
- future payoff obligation.

### Production risk
- unique asset cost;
- animation complexity;
- state/QA complexity;
- map dependency;
- performance zone impact.

Do not embed unapproved dialogue as if final.

# Phase 11 — Narrative QA

Run QA at two moments:
1. before implementation handoff;
2. after implementation against actual runtime behavior.

## Canon QA
- current source-of-truth used;
- no retired story contamination;
- no Chapter 4+ leakage;
- no fifth-map creep;
- no unapproved important identity/relationship;
- lifecycle labels are correct.

## Chronology QA
- event order works;
- travel/time assumptions are possible;
- routines and callbacks occur in plausible order.

## Knowledge QA
- no character reacts to unavailable information;
- player information matches the decision being asked;
- secret/uncertain/objective truth are not conflated.

## Motivation QA
- character behavior follows goals/pressure/relationship;
- no NPC exists only to deliver exposition or help the protagonist.

## Event QA
- content class is correct;
- routine is not mislabeled as major event;
- removal test passes for mandatory story events;
- mandatory sequence has verb variety;
- pacing contains state change or reinterpretation;
- no duplicate function survives merely because it was already drafted.

## Slice-of-life QA
- ordinary life remains credible;
- humor comes from situation/chemistry/timing;
- friction stays proportionate;
- repeated places change in meaning/familiarity;
- sentiment is earned rather than announced.

## Production QA
- approved four-map scope only;
- event reuses existing systems where practical;
- unique content cost matches narrative value;
- branch complexity is proportionate;
- event cannot soft-lock;
- runtime presentation still communicates the intended state change.

## Dialogue QA
- line earns its place;
- avoids generic AI warmth, summary language and forced profundity;
- avoids characters explaining shared knowledge unnaturally;
- preserves Vietnamese/student context without turning into stereotype;
- keeps meta/vibe-coding understated in Chapter 3.

# Revision Protocol

When QA finds a problem, repair the highest upstream cause with the smallest sufficient scope.

Examples:
- weak line, sound event → revise line only;
- weak scene behavior, sound event function → revise interaction/scene structure;
- unmotivated event → revise event function before dialogue;
- continuity break → repair the earliest incorrect state write or assumption;
- weak chapter pacing → merge/reorder affected event units;
- premise/source conflict → stop and reopen the approved upstream decision only with user involvement.

Do not page-one rewrite unaffected approved content.

After revision:
- rerun relevant continuity checks;
- verify preserved constraints;
- report downstream changes;
- keep lifecycle state accurate.

# Chapter Event Density Pass

Do not optimize for maximum event count.

For every chapter event registry:

1. classify each entry;
2. group entries by narrative function;
3. group entries by player-verb pattern;
4. identify merge candidates;
5. identify routine-system candidates;
6. identify ambient-beat candidates;
7. identify missing anchor/function;
8. identify long mandatory stretches with no state change;
9. identify production-heavy beats with low narrative value;
10. identify continuity carry-in/carry-out.

There is **no target event count per chapter**.

A chapter is correct when its required functions, memorable anchors, continuity obligations and runtime pacing are satisfied. It may be short or long. Event count must emerge from user material and playable pacing, not from a planning quota.

# Context Pack for an AI Worker

Before event work, provide only:

## Project constraints
Current chapter scope, four-map rule, approval gates, current narrative-event style, humor/twist rules, and author-assist boundary.

## Target scope
Chapter, map/zone, purpose of this pass.

## Current state
Relevant world facts, character states, player knowledge and runtime systems.

## Continuity
Only active callbacks/setups/habits/relationships relevant to the target.

## Source material
User-supplied facts and their provenance classes.

## Output contract
Candidate generation / critique / selection / spec / QA.

Do not load the entire retired narrative package into the context.

# Output Contracts

## Exploration mode
Return low-resolution candidates only.
Do not write canon prose.

## Critique mode
Return findings and corrections.
Do not silently rewrite.

## Revision mode
Return only bounded changes plus preservation checks.

## Production-spec mode
Return structured implementation handoff only for approved material.

## QA mode
Return blockers/majors/moderates/optional findings with evidence.

# Stop Conditions

Stop candidate development and mark TBD_USER_APPROVAL when:
- detailed event generation would require lived material the user has not supplied or authorized for fictionalization;
- an important missing fact would materially alter the event;
- an important NPC identity/relationship must be invented;
- a fifth major map appears necessary;
- Chapter 4+ is implicated;
- a major persistent route is required;
- source-of-truth conflicts cannot be resolved;
- a candidate relies on uncertain memory as literal fact.

The correct response to missing canon is not to make plausible canon.

# Final Rule

The system exists to make the user a stronger author, not to replace the user.

AI may:
- extract;
- propose;
- compare;
- critique;
- simulate bounded reactions;
- detect continuity errors;
- convert approved ideas into playable specs.

AI may not:
- self-approve;
- silently canonize;
- invent lived experience;
- use polished prose to smuggle in new facts;
- override the user’s final narrative authority.