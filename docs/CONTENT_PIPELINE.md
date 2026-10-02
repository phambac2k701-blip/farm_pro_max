# Content Pipeline

## Principle

A chapter or scene package should combine environment, assets, state, interactions, dialogue/audio, and approved narrative data without forcing rewrites of core engine systems.

## Environment pipeline

1. user-approved spatial description or reference
2. blockout
3. scale/proportion review
4. collision pass
5. gameplay-path test
6. lighting blockout
7. authored modular environment art
8. materials/textures
9. restrained decals/detail
10. prop dressing
11. optimization
12. real-browser playtest

## Interactable prop pipeline

1. gameplay purpose
2. expected player action
3. interaction/camera behavior
4. model/asset
5. interaction anchor(s)
6. animation where needed
7. synchronized sound
8. world/event-state wiring
9. readability/usability test
10. performance check

## Character/NPC pipeline

When NPC production begins:
1. role approved or explicitly placeholder
2. reusable rig/body base
3. visual variant
4. animation set
5. scene placement/schedule needs
6. dialogue/reaction state
7. performance/instancing strategy where appropriate
8. browser playtest

## Scene data

Each scene/zone should eventually declare:
- id
- asset bundle
- spawn points
- interactables
- audio ambience
- lighting preset
- NPC slots/states where needed
- local event conditions
- transition/exit targets

## Choice/event data

A gameplay event may declare:
- stable id
- trigger
- available actions
- local reaction/state changes
- whether the branch reconverges
- persistent facts only when genuinely needed
- follow-up event/scene

Small choices should not automatically become permanent route branches.

## Naming convention draft

- scenes/zones: `scene_<location>_<variant>`
- interactables: `int_<location>_<object>`
- events: `evt_<location>_<slug>`
- world facts: `fact_<domain>_<slug>`
- NPC placeholders: `npc_<role>_<index>`
- audio: `sfx_<category>_<slug>`, `amb_<location>_<slug>`
- textures: `tex_<asset>_<channel>`
- models: `mdl_<asset>_<variant>`

Final institutional and important-character names remain approval-gated.

## Runtime asset rule

Only optimized runtime files belong in runtime asset folders. High-resolution source/reference files should not silently bloat production bundles.

## Validation

Before marking content complete:
- loads without error
- collision is correct
- interactions can exit safely
- required local event progression cannot soft-lock
- choice/state behavior is reproducible from a clean save
- text is readable
- room scale and prop placement are visually reviewed
- performance remains acceptable
- external asset provenance is recorded
