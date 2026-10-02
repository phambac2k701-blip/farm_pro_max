# Performance Budget V1

Status: **development foundation / provisional guardrails**
Date: 2026-10-02

## Purpose

This document defines how new runtime work is measured before optimization decisions are made.

The core rule is:

> Preserve visual quality where the player looks and interacts; reduce cost where the player will not notice the difference.

This is a measurement and production policy, not a license to lower quality everywhere and not a hardware requirement specification.

## Reference baseline

Current approved integration evidence for Giảng đường 4 records approximately:

- 60.27 RAF FPS
- 60.00 Babylon engine FPS
- 2549 total meshes
- 153 active meshes in the integration foreground sample
- 470676 vertices
- WebGPU backend
- zero runtime exceptions, console errors, or HTTP >= 400 requests

The older final BAC-45 review is approximately 59 FPS / 2549 meshes / 471k vertices.

These values are reference evidence from the current development machine and scene. They are not universal target-hardware guarantees.

## Snapshot metrics

src/performance/ScenePerformanceSnapshot.ts supports:

- RAF FPS sampled across multiple animation frames
- Babylon engine FPS via engine.getFps()
- total scene meshes
- active meshes, including object-renderer active meshes
- total vertices
- active indices
- active triangles when active indices form complete triangles
- material count
- texture count
- animation-group count
- skeleton count
- draw calls sampled from Babylon SceneInstrumentation
- rendering backend: WebGPU / WebGL / unknown
- engine description

Interpret FPS and draw calls as frame/sample measurements, not immutable scene properties.

A meaningful comparison should use the same camera position, browser state, viewport, backend, scene state, and measurement procedure.

## Regression comparison policy

src/performance/PerformanceRegression.ts compares a baseline snapshot with a candidate snapshot and returns structured deltas plus optional warnings.

Thresholds are caller-configured. No threshold in the utility is a canonical hardware requirement.

Suggested development guardrails for feature work may start with values such as:

- RAF or engine FPS drop: investigate around 5 FPS or more
- active mesh growth: investigate unexpected jumps rather than a fixed universal count
- vertices: compare against the intended visual gain and zone residency
- draw calls: investigate material/object proliferation and lost instancing
- animation groups / skeletons: verify that only relevant characters are active

These are deliberately provisional review triggers. They should be adjusted after repeated evidence on representative hardware.

## Major-map residency

Only one major map should be resident at full gameplay fidelity.

The current four-map production architecture should not evolve into loading every major environment at startup.

When moving between major maps:

- unload or strongly reduce no-longer-relevant scene resources
- retain only state/data needed for continuity
- preload the next interaction-critical group when useful
- avoid holding full visual, collision, animation, and NPC simulation for distant maps

## Zone fidelity

Within the active major map, use four runtime fidelity classes.

### FULL

For the player's immediate interaction space:

- highest useful visible detail
- active interaction
- necessary collision
- hero/event NPC logic
- full relevant animation
- high-value audio/lighting effects

### NORMAL

For nearby visible space:

- production-quality visuals
- reduced interaction/simulation where not needed
- ordinary ambient NPCs
- selective collision
- normal animation only where perceptible

### LIGHT

For peripheral or transitional space:

- simplified geometry/material state
- reduced or sleeping gameplay logic
- limited animation updates
- collision only for meaningful boundaries
- cheaper shadows/effects where visually acceptable

### BACKGROUND

For distant or unreachable content:

- LOD mesh, impostor, card, or authored background representation
- no expensive interaction logic
- no full NPC AI
- no unnecessary collision
- no full-rate character animation

Zone changes should be data-driven and hysteresis-aware where needed to avoid rapid oscillation at boundaries.

## Repeated assets

Repeated non-interactive assets should prefer:

- Babylon instances
- thin instances when independent node behavior is unnecessary
- shared materials
- batch-friendly asset organization

Typical candidates include chairs, desks, vegetation, fixtures, repeated windows, lamps, bins, and similar dressing.

Do not preserve thousands of independent render objects merely because authoring created them separately.

## Static architecture

For static architecture:

- merge meshes when they share compatible material/render behavior and no independent gameplay state is required
- freeze transforms/world matrices when safe
- avoid merging across boundaries that need independent culling, loading, interaction, animation, or material variation
- keep authored source assets separate from runtime optimization decisions

Merging is not automatically better; measure draw-call reduction against culling and iteration cost.

## Distant visuals

Distant content should progressively use:

- LOD geometry
- impostors
- billboard/card representations
- simplified silhouettes
- baked or authored background imagery where appropriate

Do not spend foreground geometry/texture cost on unreachable details the player cannot perceive.

## Collision

Render geometry and collision geometry should be treated as separate budgets.

Prefer:

- simple boxes/capsules/convex proxies
- authored boundary colliders
- collision only where traversal or gameplay requires it

Do not enable detailed collision on decorative clutter or distant background assets.

## NPC simulation bubble

Future NPC work should distinguish at least:

- hero/event NPCs
- nearby ambient NPCs
- background crowd representation

Only NPCs inside the relevant simulation bubble should run full behavior, interaction, collision, and animation.

Outside the bubble:

- lower update frequency
- sleep behavior/state machines
- disable unnecessary collision
- replace distant crowds with lightweight representation when appropriate

## Animation policy

Character animation should be budgeted by relevance.

Use:

- full-rate animation for player-relevant nearby characters
- reduced update frequency for peripheral characters when visually acceptable
- sleep/disable animation for out-of-zone characters
- shared rigs/clips where production allows
- explicit measurement of animation groups and skeletons per feature

Do not keep every skeleton and animation graph hot merely because the character exists in scene data.

## Texture and material budget

Prefer:

- shared reusable materials
- consistent texel density by role
- compressed textures where browser support and visual quality justify it
- atlas/reuse strategies when they reduce state changes without harming authoring quality
- high-resolution texture detail primarily on close, recurring, player-facing assets

Investigate:

- unnecessary unique material clones
- duplicate textures
- oversized textures on distant props
- alpha/transparency where opaque rendering would work
- expensive shader variants with no visible benefit

Exact memory/texture limits should be established later from measured production assets and representative hardware rather than guessed now.

## Loading and unloading

Runtime content should be grouped so that scene/zone resources can be loaded and released intentionally.

Prefer:

- preload only interaction-critical upcoming content
- lazy-load optional or later content
- release unused textures/meshes/containers when their zone or major map is no longer resident
- avoid startup dependency on future chapter/map assets

Loading policy must be evaluated for both memory and hitching.

## Bundle and code splitting

The current task does not change application bundling.

As runtime systems grow, evaluate:

- dynamic imports for large feature systems
- route/scene-specific code chunks
- lazy registration of tooling/debug-only features
- asset-manifest separation by major map or content group

Do this only when bundle analysis shows a meaningful benefit; do not fragment code blindly.

## Review workflow for every substantial feature

For character, NPC, vegetation, vehicle, event, or map work:

1. capture a comparable baseline snapshot
2. add the feature in its intended runtime state
3. capture a candidate snapshot from the same representative view/state
4. compare structured deltas
5. inspect warnings using task-appropriate configured thresholds
6. verify browser console/runtime/network cleanliness
7. optimize only where measured cost is unjustified
8. retain visual quality in player-visible and interactive areas
9. record evidence for material regressions or major wins

## Current optimization opportunities — not implemented here

The current architecture and evidence suggest future profiling opportunities:

- repeated classroom/environment objects should continue moving toward instancing/thin instancing where independent behavior is not needed
- static architecture may contain merge/batching opportunities
- distant building/background geometry can use stronger LOD/card strategies as environments expand
- collision can remain simpler than visual meshes
- future NPC systems need a strict simulation bubble
- future character animation needs throttling/sleep outside relevant zones
- material/texture uniqueness should be watched as production art replaces placeholders
- major-map lazy residency/unloading must remain enforced as the other maps arrive
- later bundle analysis may justify code splitting

None of those optimizations are performed by Performance Foundation V1. This lane adds measurement and policy only.
