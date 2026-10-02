# UET không tệ — Narrative Research & Skill V2

Status: RESEARCH / METHODOLOGY / NARRATIVE-SYSTEM DESIGN ONLY
Date: 2026-10-02
Canon authority: User / primary writer
Worker branch: phase-v2/narrative-skill-v2-research

This report does not create story canon. Candidate, selected, approved, canonical, and implemented are separate states.

## Source-of-truth reviewed

- README.md
- docs/PROGRESS.md
- docs/PROJECT_MASTER_PLAN.md
- docs/GAMEPLAY.md
- docs/CONTENT_PIPELINE.md
- docs/design/CURRENT_STORY_MACRO.md
- docs/design/CURRENT_WORLD_MAP_SCOPE.md
- docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md
- docs/design/USER_APPROVAL_GATES.md
- docs/design/GAME_PIVOT_V2_DRAFT_NOTES.md
- docs/AI_COORDINATION.md
- Historical method-only references from the retired narrative branch:
  - docs/narrative/RESEARCH_AND_SKILL_AUDIT.md
  - docs/narrative/19_SKILL_TEST_RESULTS.md

Current repository status: there is **no approved detailed Ch0–Ch3 event set**. A speculative AI-generated event draft briefly existed on the coordinator integration branch but was removed after the user clarified that those events had never been discussed or approved. It must not be recovered as narrative source material.

# 1. Executive conclusion

UET không tệ should use a constraint-first, state-led, artifact-based narrative workflow with human canon approval.

The recommended unit is not “chapter prose.” It is an event candidate with explicit pre-state, narrative function, player verbs, spatial use, local branch behavior, post-state, continuity obligations, and production cost.

The recommended authoring loop is:

user-supplied lived material / explicit fictionalization permission
→ provenance-preserving lived-material extraction
→ current state snapshot
→ narrative-function analysis
→ smallest useful set of low-resolution alternatives when alternatives help
→ critique/red-team
→ user selection
→ gameplay conversion
→ continuity/knowledge check
→ user approval
→ scene/interaction writing
→ production spec
→ implementation QA

Do not use one-shot “write Chapter X” generation for canon-facing work.

Do not construct a detailed chapter event catalog from the macro alone. The macro defines direction; the user's lived material supplies the actual narrative substance.

The core design stance is: ordinary life becomes interesting through friction, timing, changing interpretation, relationships, repeated places, participatory comedy and small reversals — not through adding artificial mystery, horror, or oversized drama.

The desired comedic presentation can be deadpan/absurd ("vô tri") and trend-aware, but concrete trends should remain replaceable presentation details. A small twist should reframe a believable situation rather than manufacture mystery lore.

## Recommended content architecture

Use five distinct content classes:

1. Major event — chapter-level structural turn or memorable anchor.
2. Story event — a specific meaningful occurrence that changes state.
3. Character beat — relationship/character progression that may sit inside another event.
4. Routine system — reusable interaction pattern such as seat choice, commute, waiting, phone checking, ordering a drink, entering class.
5. Ambient beat — optional world moment that adds texture but is not required for progression.

Do not count routine systems as named story events merely because they are interactive.

A chapter should be measured by function coverage and remembered anchors, not by raw event count.

Do not set a default event-count target before real material and playable pacing exist.

Instead ask whether the chapter has the functions it actually needs: a clear entry/handoff when appropriate, memorable anchors, character/state progression, routine variation, continuity carry-out and a usable exit/reorientation. These are diagnostic functions, not slots that must each become separate events.

If two adjacent events use the same map, same actors, same verbs, same emotional function, and neither needs an independent state boundary, merge them. If the user's material naturally supports only a few strong events, do not inflate the chapter to satisfy a quota.

## Slice-of-life rule

A useful event generator for this project is:

routine × friction × social timing × relationship state × place familiarity

Examples of friction categories, not canon:
- timing mismatch;
- seat/space availability;
- changed plan;
- transport or route inconvenience;
- forgotten/missing ordinary object;
- phone/message timing;
- social hesitation;
- waiting;
- misunderstanding with low stakes;
- expectation vs reality.

The event becomes meaningful when it changes knowledge, relationship, routine, interpretation, plan, or remembered context.

### Professional support for the slice-of-life approach

Research did not reveal a credible professional rule saying ordinary-life narrative needs artificial high stakes. The useful pattern is the opposite: make interaction, space, structure, and timing carry meaning.

- **A Short Hike — GDC 2020:** the postmortem explicitly frames a compelling open world built under small scope/scale constraints, including writing and expectation-setting. For this project, that supports making a bounded four-map world feel rich through density and reuse rather than map/event inflation.
  Source: https://gdcvault.com/play/1028679/Independent-Games-Summit-Crafting-A
- **Narrative Experience First: Fragments of Him — GDC Europe 2016:** the session describes many small interaction-design decisions used to keep the player involved and amplify story. Its published slides also prioritize play → show → tell, warn that choice workload escalates quickly, and recommend interactions that fit character and world.
  Sources: https://www.gdcvault.com/play/1023839/Narrative-Experience-First-Interaction-Design and https://media.gdcvault.com/gdceurope2016/presentations/Haggis_Mata_NarrativeExperienceFirst.pdf
- **Comedy Through Patterns — GDC 2025:** the session argues that game comedy comes from structure and is supported across level design, music, and narrative design, not merely from funny lines. That matches UET không tệ's requirement that humor emerge from situations, timing, movement, and recurring patterns.
  Source: https://gdcvault.com/play/1035068/Independent-Games-Summit-Comedy-Through
- **Narrative approach to level design — GDC:** the professional framing treats space and pacing as part of the narrative experience. This supports using recurring GD4/street/camp locations as narrative instruments rather than neutral containers.
  Source: https://www.gdcvault.com/play/1024302/Level-Design-Workshop-A-Narrative

Project inference from these sources:
- routine becomes interesting when the player participates in its variation;
- repeated places can accumulate familiarity, social context and callbacks;
- humor should be structured into situations and interaction timing;
- small-scale content can be compelling without multiplying locations or dramatic stakes.

### Event-density research conclusion

No trustworthy source found gives a universal “N scenes/events per chapter” rule for interactive narrative. Professional material instead treats pacing as a relationship among gameplay, space, interaction, assets, narrative beats and player attention.

Therefore this project should use **no fixed event-count heuristic**. Event density must emerge from user material, narrative function and measured runtime pacing once playable chapter material exists.

# 2. Skills researched

The table below separates repository facts from project-specific adoption judgment.

| Candidate | Identity / activity | Strengths relevant to UET không tệ | Main mismatch | Verdict |
| --- | --- | --- | --- | --- |
| narrastory/story-architect-skill | MIT; created 2026-07-31; 3 stars; 1 visible commit at audit; novel/serial-oriented | source-of-truth order, proposal vs canon, character knowledge, timeline, thread/payoff tracking, lint/context packs | prose/novel-first lifecycle, scene-writing assumptions, too much manuscript scaffolding | ADAPT |
| Stanestane/narrative-design-skills | created 2026-09-01; 0 stars; no repository license detected; very new | player verbs, choice intention, branch cost, objective/state change, production-scope thinking | quest vocabulary, combat/reward examples, immature, licensing unclear | CONCEPTS ONLY |
| fcsouza/agent-skills | GPL-3.0; pushed 2026-09-08; 20 stars / 2 forks at audit | coherence registry, lore/timeline checks, “orphan quest” detection, prerequisites/state | broad game-dev bundle, faction/economy/combat assumptions, GPL copying risk | CONCEPTS ONLY |
| myshenoy/skills-open-source game-narrative | MIT fork; fork snapshot is stale while parent repo is active; 0 stars | NPC agency, writing from character outward, reactive dialogue value, player-imagination concepts | strongly deduction/mystery-oriented; most of the skill is irrelevant to current macro | CONCEPTS ONLY |
| sb-dev/narrative-production-skills | MIT; created 2026-08-25; updated 2026-09-28; 1 star; 5 visible commits | selected != approved, planned != canonical, explicit belief/secret/uncertain state, evaluation without rewrite, upstream-root-cause revision | prose/screenplay examples remain medium-generic; not gameplay-first by default | ADAPT STRONGLY |
| inkle/ink | MIT; mature since 2016; ~4.9k stars; maintained in 2026 | branch/rejoin, explicit variables, conditional content, visit tracking, compact narrative flow | scripting engine, not a full narrative-design method; not a Babylon dependency recommendation | ADOPT CONCEPTS |
| Yarn Spinner | MIT; mature since 2015; ~2.8k stars; pushed 2026-10-01 | explicit variable storage, dialogue state, single-source-of-truth guidance, node-based content | dialogue-centric and engine-specific integrations; project should not become a VN | ADAPT CONCEPTS |
| Failbetter QBN / storylets + Emily Short storylet analysis | long-running professional methodology | atomic content with prerequisites + effects, storylets, branch-to-state, reusable routines, episodic content, recurring loops | text-heavy examples and quality/resource abstractions can over-systematize a small 3D game | ADAPT STRONGLY |
| Owlcat “Etudes and Actors” GDC 2026 | professional production talk on highly branched RPG state | hierarchical sub-state model, conflict-aware activation, reducing uncontrolled global-variable sprawl | designed for huge RPG reactivity; overkill if copied literally | CONCEPTS ONLY |
| Long-form LLM planning / critique research | Re3 2022; CritiCS 2024; StoryWriter/DOME 2025; MAGNET/ATLAS and ConStory-Bench 2026 | planning before prose, state injection, multiple candidates, critics, character-agent simulation, contradiction detection | research optimizes long prose, not first-person event gameplay; automated scores cannot become canon authority | ADAPT METHODS |

## Candidate details and source URLs

### narrastory/story-architect-skill
Source: https://github.com/narrastory/story-architect-skill

What it does well:
- explicit source-of-truth ordering;
- proposals are not silently promoted to canon;
- timeline, canon, knowledge-state and thread ledgers;
- context packs reduce unrelated context;
- lint/status tooling encourages deterministic checks.

What does not fit:
- assumes fiction manuscript/scene lifecycle;
- optimizes toward prose output;
- genre/worldbuilding scaffolds can encourage unnecessary expansion.

Project use:
Borrow state ownership, knowledge tracking, thread/payoff checks and context minimization. Do not copy its novel project layout wholesale.

### Stanestane/narrative-design-skills
Sources:
- https://github.com/Stanestane/narrative-design-skills
- https://github.com/Stanestane/narrative-design-skills/blob/main/skills/design-quest-structure/SKILL.md
- https://github.com/Stanestane/narrative-design-skills/blob/main/skills/design-player-choice/SKILL.md

Strong fit:
- “what does the player actually do?”;
- choice is defined by player intention and feedback, not number of branches;
- production cost and reconvergence are first-class.

Weak fit:
- much of the vocabulary assumes quests, rewards and common RPG objective grammars;
- repository is too new to treat as a proven production standard;
- no repository license was detected at audit time.

Use only the generic design concepts.

### fcsouza/agent-skills
Sources:
- https://github.com/fcsouza/agent-skills
- https://github.com/fcsouza/agent-skills/blob/main/skills/quest-narrative-coherence/SKILL.md

Strong fit:
- load current world state before content creation;
- detect contradictions against character/timeline/location state;
- register authored units instead of leaving them as free text;
- reject disconnected “cool content.”

Weak fit:
- quest, faction, progression and reward assumptions are stronger than this project needs;
- GPL-3.0 means do not copy skill text into project docs.

Use its registry/coherence idea only.

### myshenoy/skills-open-source
Source:
https://github.com/myshenoy/skills-open-source/blob/main/game-narrative/SKILL.md

Strong fit:
- NPCs should have goals independent of the protagonist;
- write character reactions from their agenda rather than from plot convenience;
- reactive dialogue should earn its place.

Weak fit:
- search/deduction/mystery architecture dominates the skill;
- current Chapters 0–3 explicitly reject mystery injection.

Use NPC-agency and dialogue-value checks only.

### sb-dev/narrative-production-skills
Source:
https://github.com/sb-dev/narrative-production-skills

Strong fit:
- planned, canonical, belief, secret, uncertain and superseded are distinct;
- selection is not approval;
- evaluation diagnoses instead of silently rewriting;
- revision targets the highest upstream cause and preserves unaffected approved work;
- project structure grows only when needed.

Weak fit:
- medium-generic story production needs a gameplay/spatial pass before use here.

This is the best methodology source to adapt for governance and revision.

### ink
Source:
https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md

Useful concepts:
- explicit named content units;
- branch and join;
- conditionals based on prior visits/state;
- persistent and temporary variables;
- reconvergence without erasing local response.

Do not import ink as a dependency merely because the methodology is useful.

### Yarn Spinner
Sources:
- https://docs.yarnspinner.dev/components/variable-storage
- https://docs.yarnspinner.dev/3.1/write-yarn-scripts/scripting-fundamentals/logic-and-variables

Useful concept:
Narrative variables need one authoritative owner. The current project already has GameState/save/event architecture, so narrative design should describe state semantics instead of creating a second competing state system.

### Storylets / QBN
Sources:
- https://www.failbettergames.com/news/storynexus-developer-diary-2-fewer-spreadsheets-less-swearing
- https://www.failbettergames.com/news/new-narrative-structures
- https://emshort.blog/2019/11/29/storylets-you-want-them/
- https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/

Most useful transfer:
An authored unit has prerequisites and effects; short content can branch locally then return to a shared state. Repeating calendars/routines can vary over time without every repetition becoming a unique main event.

This is especially relevant to classes, commuting, waiting, tea/drinks and recurring GD4 use.

### Owlcat Etudes
Source:
https://schedule.gdconf.com/session/etudes-and-actors-owlcats-tooling-for-highly-branched-narrative/914145

Takeaway:
Large narrative projects suffer when hundreds or thousands of independent global variables become ad-hoc. Owlcat describes hierarchical sub-states that activate/deactivate with conflict handling.

Project adaptation:
Use namespaces and owner domains for facts, plus event-local state and chapter state. Do not build a heavyweight Etude clone for four maps and Chapters 0–3.

### AI story-generation research
Sources:
- Re3: https://aclanthology.org/2022.emnlp-main.296/
- Dramatron evaluation: https://deepmind.google/research/publications/13609/
- CritiCS: https://aclanthology.org/2024.emnlp-main.1046/
- StoryWriter: https://arxiv.org/abs/2506.16445
- DOME: https://aclanthology.org/2025.naacl-long.63/
- Character simulation: https://aclanthology.org/2025.in2writing-1.9/
- MAGNET/ATLAS: https://arxiv.org/abs/2607.00918
- ConStory-Bench: https://aclanthology.org/2026.findings-acl.410/

Evidence pattern:
Long-form generation repeatedly benefits from explicit planning, repeated injection of current state, staged generation, critics/revision, memory/state tracking, and character-grounded simulation. 2026 work also shows contradiction detection remains necessary because long outputs still accumulate consistency bugs.

Project implication:
Use AI as candidate generator, critic, continuity checker and spec writer. Do not let an LLM free-run a chapter and treat fluent output as evidence of canon consistency.

# 3. Recommended methodology

## ADOPT
- explicit source-of-truth read before brainstorming;
- planned != canonical;
- selected != approved;
- one authoritative owner for each persistent fact;
- event preconditions/effects;
- micro-branch + local reaction + reconvergence;
- setup/payoff ledger;
- character knowledge boundaries;
- evaluation before revision.

## ADAPT
- storylets into spatial 3D event units;
- quest player-verbs into ordinary student-life verbs;
- character-agent simulation into candidate generation only;
- hierarchical state into lightweight namespaces;
- AI critics into project-specific red-team passes.

## REJECT
- one-shot chapter generation;
- mandatory Hero’s Journey / Three-Act / Save the Cat;
- combat/reward/XP quest templates;
- giant branching trees;
- life-sim completeness;
- mystery/horror structures for Chapters 0–3;
- dialogue-heavy visual-novel flow;
- automatic canon promotion;
- numeric “overall story quality” scores used as authority;
- worldbuilding that creates fifth-map pressure.

# 4. AI story-generation workflow

## Single-pass generation

Prompt once → write a chapter is unsuitable for canon work.

Failure modes:
- constraints get diluted over long output;
- AI fills missing facts with plausible inventions;
- character knowledge leaks;
- prose fluency hides weak gameplay;
- repeated “walk + talk” scenes look acceptable on paper;
- setup/payoff obligations are forgotten;
- draft wording can be mistaken for approved facts;
- production cost is invisible.

Use single-pass only for disposable exploratory samples, never as an approval shortcut.

## Recommended staged pipeline

1. Build a source pack from current source-of-truth only.
2. Extract lived material into fact/uncertainty/proposed-fiction fields.
3. Snapshot chapter/world/character state.
4. List missing narrative functions before generating scenes.
5. Build a gameplay envelope for each function: allowed map/zone, available verbs, spatial affordances, reusable systems, and repetition risks.
6. Generate only the smallest useful set of low-resolution alternatives inside those gameplay envelopes, not prose.
7. Run a red-team pass against each candidate.
8. Eliminate contradiction, filler, fifth-map creep and duplicated gameplay.
9. Present surviving candidates to the user for selection.
10. Worker A deepens selected candidates into full gameplay/event structure.
11. Run continuity + character-knowledge checks.
12. User approves, revises or rejects the event structure.
13. Worker B writes scene/interaction presentation inside the approved structure: concise dialogue, timing, option-specific reactions and visual/object comedy.
14. User approval remains required for any new canon-sensitive dialogue/detail introduced during scene writing.
15. Promote approved facts to canonical source-of-truth records.
16. Convert canonical event to implementation spec.
17. After implementation, run narrative QA against actual runtime behavior.

## Generate alternatives → select deliberately

Recommended only when multiple alternatives would materially help the user compare directions. Keep the set small and low resolution.

Good candidate format:
- one-sentence situation;
- narrative function;
- player verbs;
- map/zone;
- pre-state;
- post-state;
- continuity carry;
- production cost;
- risk flags.

Do not generate six fully written scenes. That multiplies prose debt and makes selection emotionally biased toward whichever draft sounds most polished.

## Constraint-first generation

Required.

Candidate generation input should include:
- current chapter;
- allowed maps;
- active character knowledge/goals;
- existing callbacks/setups;
- required state change;
- available player verbs;
- production limits;
- forbidden canon.

“Write an interesting event” is too unconstrained.

## State-led generation

Strongly recommended.

Every meaningful event defines:
- state before;
- pressure/friction;
- player participation;
- state after.

If nothing changes, classify it as routine/ambient or reject it as filler.

## Character-agent simulation

Use selectively.

Good use:
Give each involved NPC a current goal, pressure, knowledge set, and relationship state; simulate likely reactions; then convert the useful interaction into an authored event candidate.

Bad use:
Let autonomous agents invent new life history, relationships, secrets, or major events.

Simulation output is proposed material only.

## Retrieval-grounded generation

Required for every canon-facing pass.

Retrieve only the source pack relevant to the current event. Too much unrelated context can hide the constraints that matter.

## Narrative red-team

Use a separate pass/agent that did not generate the candidate when practical.

It must actively search for:
- coincidence;
- filler;
- contradiction;
- fake choice;
- exposition;
- character acting for plot;
- knowledge leak;
- setup without payoff;
- payoff without setup;
- duplicated gameplay;
- map-scope creep;
- generic AI dialogue;
- forced sentimentality;
- unapproved canon.

# 5. Narrative Skill V2 specification

The operational specification is in:
docs/narrative/UET_NARRATIVE_SKILL_V2.md

Architecture summary:

Phase 0 — Source-of-truth intake
Phase 1 — Lived Material Extraction
Phase 2 — Narrative Function
Phase 3 — Gameplay Conversion
Phase 4 — Event Candidate Generation
Phase 5 — Critique / Red Team
Phase 6 — Selection and Approval State
Phase 7 — Continuity Graph
Phase 8 — Character Knowledge State
Phase 9 — Branch Design
Phase 10 — Production Spec
Phase 11 — Narrative QA

The skill must stop rather than invent an important missing fact.

The skill must not treat “selected” as “user-approved.”

The skill must not make prose quality a substitute for event/gameplay quality.

# 6. Event-generation template

Minimum candidate schema:

Identity
- event ID: provisional until approved
- lifecycle state: candidate / selected / user-approved / canonical / implemented
- chapter
- map / zone
- content class

Source grounding
- literal facts used
- uncertain memories used
- approved fictionalization
- proposed embellishment
- forbidden assumptions

Narrative function
- why this event exists
- what changes
- what carries forward
- what is lost if removed

Pre-state
- world state
- involved character states
- player knowledge
- active setup/callbacks

Playable structure
- player objective
- player verbs
- spatial route
- interactables
- optional observations
- choice / no choice
- local reactions
- reconvergence
- exit condition

Post-state
- state writes
- persistent facts
- relationship/knowledge change
- callback/payoff obligations

Production
- required actors
- props
- animation
- UI
- audio
- unique asset cost
- performance/zone implications

Risk flags
- filler
- contrivance
- fake choice
- exposition
- repetition
- map creep
- unapproved canon

# 7. Character-state template

For every important recurring NPC:

Identity status
- placeholder / user-approved / canonical

Objective state
- current goal
- current pressure
- routine/obligation
- immediate plan

Knowledge state
- knows
- believes but is wrong/uncertain
- suspects
- does not know
- must not know yet

Relationship state
- current view of protagonist
- trust/familiarity
- unresolved friction
- shared history already established

Behavior constraints
- what this person would plausibly do
- what would require new justification
- what this person will refuse or prioritize over helping protagonist

Continuity
- last meaningful appearance
- open promise/setup
- next approved obligation

All unknowns remain unknown. Do not “complete” a character sheet by invention.

# 8. Continuity ledger template

Track one row per meaningful continuity item.

Fields:
- continuity ID
- type: person / place / relationship / habit / object / joke / callback / setup / payoff / knowledge / promise
- introduced in
- current status
- owner source
- who knows it
- last referenced
- expected future use
- payoff requirement
- expiration/closure
- approval status

Required checks:
- orphan setup: foregrounded but no planned/approved payoff;
- unearned payoff: payoff has no prior setup;
- dead callback: repeatedly tracked but no longer useful;
- contradiction: incompatible facts both active;
- knowledge leak: character reacts to unavailable information;
- anthology break: chapter has no meaningful carry-in/carry-out.

# 9. Narrative QA / red-team checklist

## Source / canon
- source-of-truth read before generation;
- no retired Người Thứ Chín canon imported;
- no Chapter 4+ leakage;
- no important NPC invented as canon;
- no fifth map;
- selected != approved != canonical;
- uncertain memory is not stated as fact.

## Narrative function
- event has a distinct function;
- removal test passes;
- change is visible in state, interpretation, relationship, knowledge or plan;
- anchor and transition beats are not confused with filler.

## Character
- NPC has an agenda beyond serving protagonist;
- reaction follows known goals/pressure;
- no knowledge leak;
- dialogue adds information, character truth, tension, humor or consequence;
- no forced sentimental speech.

## Gameplay
- player does more than walk and watch;
- primary verbs are explicit;
- repeated adjacent events do not use the same verb pattern without variation;
- choice has distinct intention/feedback if presented as meaningful;
- local branches reconverge without erasing acknowledgment;
- failure/recovery does not soft-lock.

## Slice-of-life
- interest comes from credible micro-friction, timing, routine variation or chemistry;
- no artificial mystery/drama inserted to “make it interesting”;
- humor belongs to the situation/characters;
- repeated places gain changed context;
- low-stakes choices receive proportionate consequences.

## Continuity
- carry-in from prior chapter checked;
- carry-out to later chapter identified where needed;
- setups/payoffs balanced;
- character knowledge table updated;
- recurring joke/object/habit does not become meaningless noise.

## Production
- uses one of four approved map families;
- unique assets are justified;
- event does not duplicate a routine system that should be reusable;
- branch cost matches narrative importance;
- event fits FULL/NORMAL/LIGHT/BACKGROUND runtime model;
- no speculative system built for one weak beat.

# 10. Current event-set status / audit boundary

There is currently **no approved detailed Ch0–Ch3 event set**.

A detailed event catalog must not be reconstructed from the macro or recovered from any speculative AI-generated draft that was created without user discussion.

Therefore this report does not fabricate an event-by-event audit. The valid input for future event construction is user-supplied lived material plus explicitly approved fictionalization.

## What can be audited safely from current macro

### Chapter 0
Current approved functions:
- arrival/new-city orientation;
- first major UET contact;
- admission-confirmation context;
- curiosity + overload + humor;
- establish details/people/habits that can carry later.

Risks when the event set is authored:
- too many separate “first time seeing X” events;
- city travel becoming sightseeing exposition;
- treating admission paperwork as gameplay by itself;
- adding a fifth environment instead of staging through Xuân Thủy/street context.

### Chapter 1
Current approved functions:
- communal routine;
- discipline/awkwardness/comedy;
- remembered 45-day scale without simulating every day;
- produce carry-forward relationships/habits/jokes.

Likely system candidates:
- repeated schedule/routine beats;
- waiting/formation/communal actions;
- recurring environmental routines.

Risk:
turning each day/routine repetition into a named story event.

### Chapter 2
Current approved functions:
- university life “actually begins”;
- expectation vs reality;
- Giảng đường 4 becomes familiar;
- daily friction, friends, movement and classes as context.

Likely routine-system candidates:
- entering classroom;
- seat choice;
- sit/stand;
- checking phone/messages;
- moving between building zones.

Risk:
classroom sequences become repeated walk → dialogue → sit → cutscene patterns.

### Chapter 3
Current approved functions:
- broaden beyond class;
- deepen friendships/habits;
- use GD4 + street/tea environment as recurring places;
- introduce vibe coding subtly without meta exposition.

Risk:
vibe coding becomes explicit creator commentary instead of one ordinary interest among other routines.

## Category errors to catch when the real event set appears

Likely routine/system candidates:
- seat selection;
- commuting/traversal loops;
- phone checking;
- ordering drinks;
- waiting;
- entering classroom.

Likely ambient-beat candidates:
- one-off observations that do not change state;
- background conversations;
- small environmental reactions;
- optional street/classroom texture.

Core-event candidates should survive the removal test and produce a durable state/interpretation/relationship change.

## Event-density recommendation

Do not protect a large event count just because a draft already lists it.

For each chapter:
1. mark every entry as major event / story event / character beat / routine system / ambient beat;
2. group entries with the same function and verb profile;
3. merge redundant mandatory events;
4. move texture-only material to ambient pools;
5. turn repeated interactions into reusable systems;
6. require at least one remembered anchor and one continuity bridge;
7. run the chapter in outline form and look for long stretches with no state change.

The objective is not fewer events. It is fewer named events that are pretending to be meaningful while actually being routine repetition.

# 11. Recommended next narrative task

Do **not** create a Ch0–Ch3 event registry yet.

Exact next action:

Run **Lived Material Capture** with the user, beginning with Chapter 0.

The user may recall material loosely, incompletely or out of order. Capture it without forcing it into a scene. Record:
- what the user remembers as fact;
- what is uncertain;
- people/places involved;
- chronology if known;
- emotion/reaction;
- funny or awkward friction;
- mundane objects/routines;
- details the user wants preserved;
- places where the user explicitly permits fictionalization.

Only after enough material exists for a meaningful narrative function should Worker A create low-resolution event alternatives. Do not generate missing life experiences merely to fill a chapter.

Worker B should not write final scene/dialogue until an event structure has been selected/approved.

# Research conclusion

The older project skill research was directionally correct on planned != canon, continuity, setup/payoff, player agency and NPC agency. It is incomplete for the current UET direction because it was built around a retired mystery structure.

Narrative Skill V2 should keep the governance/continuity discipline, replace clue/mystery logic with slice-of-life friction + routine variation + recurring-place meaning, and make gameplay conversion a mandatory gate before approval.

The strongest combined architecture is:

human-owned source of truth
+ author-assist rather than author replacement
+ lived-material provenance
+ constraint-first event generation
+ participatory deadpan/trend-aware comedy when appropriate
+ small grounded twists/reversals
+ storylet-style preconditions/effects
+ character knowledge/goal state
+ player-verb conversion
+ locally wrong/suboptimal options with authored consequence and believable reconvergence
+ explicit lifecycle states
+ two-worker split: event architecture first, scene/dialogue second
+ red-team/continuity lint
+ targeted upstream revision
+ production handoff
+ post-implementation narrative QA

No external skill should be copied wholesale into the project.

# Sources researched

GitHub / skill repositories:
- https://github.com/narrastory/story-architect-skill
- https://github.com/Stanestane/narrative-design-skills
- https://github.com/fcsouza/agent-skills
- https://github.com/myshenoy/skills-open-source
- https://github.com/sb-dev/narrative-production-skills
- https://github.com/inkle/ink
- https://github.com/YarnSpinnerTool/YarnSpinner

Professional / interactive narrative methodology:
- https://www.failbettergames.com/news/storynexus-developer-diary-2-fewer-spreadsheets-less-swearing
- https://www.failbettergames.com/news/new-narrative-structures
- https://www.failbettergames.com/news/fallen-london-writer-guidelines-part-i
- https://emshort.blog/2019/11/29/storylets-you-want-them/
- https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/
- https://schedule.gdconf.com/session/etudes-and-actors-owlcats-tooling-for-highly-branched-narrative/914145
- https://www.gdcvault.com/play/1026461/Letting-Go-A-Florence
- https://gdcvault.com/play/1028679/Independent-Games-Summit-Crafting-A
- https://www.gdcvault.com/play/1023839/Narrative-Experience-First-Interaction-Design
- https://media.gdcvault.com/gdceurope2016/presentations/Haggis_Mata_NarrativeExperienceFirst.pdf
- https://gdcvault.com/play/1035068/Independent-Games-Summit-Comedy-Through
- https://www.gdcvault.com/play/1024302/Level-Design-Workshop-A-Narrative

AI-assisted story generation / consistency:
- https://aclanthology.org/2022.emnlp-main.296/
- https://deepmind.google/research/publications/13609/
- https://aclanthology.org/2024.emnlp-main.1046/
- https://arxiv.org/abs/2506.16445
- https://aclanthology.org/2025.naacl-long.63/
- https://aclanthology.org/2025.in2writing-1.9/
- https://arxiv.org/abs/2607.00918
- https://aclanthology.org/2026.findings-acl.410/

Repository metadata dates/stars/licenses were checked on 2026-10-02 and should be treated as time-sensitive research metadata.