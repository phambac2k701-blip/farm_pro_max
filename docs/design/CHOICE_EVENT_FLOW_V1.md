# CHOICE EVENT FLOW V1

Status: **TECHNICAL FOUNDATION V1 — NON-CANON**
Date: 2026-10-02

## Purpose

This module provides a small typed runtime for choice-driven gameplay events.

Its production goal is:

**many local variations + few persistent consequences + controlled reconvergence**

It is infrastructure only. It does not define canon events, dialogue, NPC identities, UI, maps or chapter macro.

## Core model

An event definition is a directed graph of authored nodes.

V1 has three node kinds:

- `choice` — exposes authored options
- `stage` — represents local event-owned state such as a reaction or short micro-branch
- `complete` — terminal event state

A normal low-stakes flow can be:

`start choice -> reaction A -> reconverged stage -> complete`

or:

`start choice -> reaction B -> reconverged stage -> complete`

Both reactions are real authored states, but they do not need separate long-term routes.

## Branch-and-reconverge

Branch-and-reconverge means alternatives can temporarily diverge while still sharing later authored content.

Definitions point directly from one node to another.

The runtime does not precompute every possible route through the graph.

Reconvergence is represented by multiple nodes targeting the same later node rather than duplicating that later content.

This keeps authored content growth proportional to the nodes and choices actually written.

## Micro-branch

A micro-branch is a short local divergence.

Typical later uses may include:

- a different nearby NPC reaction
- a prop state visible for a short period
- a local animation or staging change
- a different observation or dialogue fragment
- a temporary inconvenience
- a small gameplay detour

A micro-branch should normally reconverge unless there is a specific reason to keep it separate.

The runtime does not label a micro-branch as correct or incorrect.

## Persistent fact

Persistent world state remains owned by `GameState`.

`ChoiceEventFlow` does not create a second persistent store.

In V1, persistent changes are allowed only through an option's explicit `persistentEffects`.

Selecting an option without `persistentEffects` cannot create a persistent `GameState` fact through this framework.

Effects call the existing `GameState.setFact()` API, preserving the existing fact event behavior and snapshot ownership.

## Major branch

A major branch is a content decision, not a special automatic runtime mode.

If a user-approved event genuinely needs a long-lived route difference, its definition may:

1. set an explicit persistent fact on the relevant option
2. transition to a different authored node/path
3. let later gameplay/content query the persistent fact when required

V1 intentionally does not create a route manager, ending manager or branching campaign tree.

Major branch content remains approval-gated.

## No technical wrong choice

There is no `wrongChoice`, `correctChoice`, score or hidden answer field in the data model.

Soft gating belongs to gameplay/content.

Examples of later content-level soft gating may include:

- an NPC reaction
- environmental feedback
- discomfort or inconvenience
- no useful progress
- a believable reason to reconsider
- another interaction becoming available

Those reactions can be represented as ordinary local stages and world presentation.

The framework itself does not decide that an option is wrong.

## Runtime API

`ChoiceEventFlow` is created with:

- an `EventDefinition`
- the existing `GameState`
- optionally a small restored event snapshot

Important operations:

- `trigger()` — enters the authored initial node once
- `getAvailableChoices()` — returns options only when the current node is a choice node
- `selectChoice(id)` — deterministically follows the selected authored edge and applies only its explicit persistent effects
- `advance()` — moves a stage node to its single authored next node
- `snapshot()` — returns event-local status and current node
- `currentNodeId` / `getCurrentNode()` — expose local event state to future presentation systems

Completed events do not trigger again in the same runtime or from a restored completed snapshot.

## Deterministic transition result

Each transition reports:

- event ID
- previous node
- next node
- cause: trigger, choice or advance
- persistent fact IDs that actually changed
- resulting event status

Given the same event definition, event-local snapshot, `GameState` and chosen option, the transition target is authored and deterministic.

V1 contains no random route selection.

## Event-local state versus GameState

Event-local state:

- idle / active / completed status
- current event node
- temporary branch/reaction position

Persistent `GameState`:

- chapter state already owned by `GameState`
- explicitly authored long-lived facts
- other existing durable state owned by current project systems

A reaction stage must not be copied into `GameState` merely because it exists.

Promote state to a persistent fact only when later gameplay truly needs to remember it.

## Future consumers

Future systems can consume event state without owning it.

Examples:

- NPC state can query `currentNodeId` or react to transition results
- props can enable/disable local presentation from the active node
- dialogue can choose authored lines from the active node
- animation/camera staging can respond to a node transition
- map/world layers can query persistent `GameState` facts for durable consequences

Those systems remain separate.

3. multiple branches may target one shared reconvergence node
4. the runtime stores only the current node, not a generated route tree
5. no route permutations are enumerated or cached
6. persistent facts are opt-in instead of automatic for every choice
7. major long-term divergence remains a deliberate content decision

A sequence of repeated two-way micro-branches therefore needs only the authored choice nodes, branch stages and shared reconvergence targets rather than every combination of prior choices.

## Definition validation

Construction rejects malformed definitions such as:

- empty event IDs
- empty or duplicate node IDs
- unknown initial nodes
- unknown transition targets
- choice nodes with no choices
- duplicate choice IDs inside one node
- one option writing the same persistent fact more than once
- invalid restored snapshots

Runtime selection also rejects an unknown choice or operations that do not match the current node kind.

## Naming and fixtures

Production naming should follow the current content pipeline conventions.

Tests and technical fixtures in this foundation use explicit non-canon IDs such as:

- `evt_test_branch_reconverge`
- `evt_test_linear_reconvergence`
- `fact_test_choice_persistent`

No fixture in this foundation is story canon.

## Integration points left for later

The following are intentionally not implemented here:

- event trigger discovery from world/interactions
- choice UI
- dialogue authoring/playback
- NPC reaction implementation
- prop/world presentation binding
- event snapshot persistence inside `SaveService`
- chapter-specific event registry
- major-route content
- analytics/debug visualization
- visual scripting

Those integrations should be added only when a concrete gameplay slice needs them.

## Relationship to existing systems

V1 reuses:

- `GameState.setFact()` for persistent effects
- `GameState.snapshot()` as the existing persistent world-state owner
- the existing event emission inside `GameState`
- the local-runtime/snapshot pattern already demonstrated by `ChapterRuntime`

It does not modify `GameEvents`, `GameState`, `ChapterRuntime` or `SaveService` in this foundation.
