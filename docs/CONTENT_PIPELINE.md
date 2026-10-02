# Content Pipeline

## Principle

Content production is split between:

1. **major authored maps**
2. **reusable smaller assets**
3. scene/chapter/event logic layered on top

Current world-map source of truth:
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`

Current asset-production source of truth:
- `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`

## Major-map pipeline

For Giảng đường 4, Giảng đường Xuân Thủy, khu phố/trà đá and Hòa Lạc:

1. user-approved reference/direction
2. build blockout / scene shell
3. validate scale and traversal
4. establish major architecture/routes
5. collision and player-safety pass
6. lighting/daylight blockout
7. identify gameplay/social anchors
8. identify which smaller assets are missing
9. produce/source those reusable assets separately
10. dress/detail the map
11. material/surface pass
12. secondary clutter/decals
13. optimization
14. real-browser playtest

The map does **not** wait for the entire prop library to be finished.

## Reusable-asset pipeline

For smaller items such as bạt, ghế, bàn, doors, windows, fans, signs, bags, bottles, laptops and other repeated objects:

1. identify a real scene/gameplay need
2. choose custom model vs licensed online asset vs generated/assisted production
3. model/adapt/clean the asset
4. normalize meter scale
5. fix origin/pivot
6. assign reusable materials
7. create simple collision if needed
8. export runtime GLB/glTF where appropriate
9. record provenance/license/source
10. test inside a real target map
11. create variants only when useful
12. add to the shared asset library

Do not manufacture speculative assets with no concrete scene need.

## Online sourcing rule

Existing internet assets may be used when:
- the source is known
- the license is clear
- shipping use is allowed
- attribution is recorded if required
- modification terms are respected

Do not use uncertain-license or ripped assets.

## Generated/assisted production rule

Generated or tool-assisted assets may be used as:
- references
- blockout aids
- model/texture starting points
- production assets when quality/provenance are acceptable

Every generated output must still be reviewed in-engine.

## Interactable prop pipeline

For an interactable asset:
1. gameplay purpose
2. expected player action
3. interaction/camera behavior
4. model/source choice
5. interaction anchor(s)
6. animation where needed
7. synchronized sound
8. event/world-state wiring
9. usability test
10. performance check

## Character/NPC pipeline

When NPC production begins:
1. role approved or explicitly placeholder
2. reusable rig/body base
3. visual variant
4. animation set
5. scene placement/schedule needs
6. dialogue/reaction state
7. performance strategy
8. browser playtest

## Scene data

A playable scene/zone may declare:
- map ID
- local zone ID
- asset bundle
- spawn points
- interactables
- audio ambience
- lighting preset
- NPC slots/states
- local event conditions
- transition/exit targets

## Choice/event data

A gameplay event may declare:
- stable ID
- trigger
- available actions
- local reactions
- whether the branch reconverges
- persistent facts only when genuinely needed
- follow-up scene/event

Small choices should not automatically become permanent route branches.

## Naming convention draft

- major maps: `map_<location>`
- zones: `zone_<map>_<area>`
- reusable models: `mdl_<asset>_<variant>`
- interactables: `int_<location>_<object>`
- events: `evt_<location>_<slug>`
- world facts: `fact_<domain>_<slug>`
- NPC placeholders: `npc_<role>_<index>`
- audio: `sfx_<category>_<slug>`, `amb_<location>_<slug>`
- textures: `tex_<asset>_<channel>`

## Runtime asset rule

Only optimized runtime files belong in runtime asset folders.

High-resolution sources, Blender masters and references should stay outside runtime bundles.

## Validation

Before a map/content pass is complete:
- loads without error
- collision/traversal works
- interactions exit safely
- progression cannot soft-lock
- text/signage is readable
- room/street scale is visually reviewed
- external asset provenance is recorded
- performance is checked in the actual browser build
