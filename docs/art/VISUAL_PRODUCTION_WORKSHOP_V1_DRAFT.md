# VISUAL PRODUCTION WORKSHOP — CURRENT DIRECTION

Status: **ACTIVE — ALIGNED WITH ASSET PRODUCTION PIPELINE V2**
Date: 2026-10-02

Authoritative production references:
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
- `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`
- `docs/ASSET_PLAN.md`

## 1. Goal

Produce a believable browser-first 3D student-life game without wasting time turning the entire world into one giant reusable modular kit.

The current production model is:

> **four large authored maps + one reusable small-asset library**

## 2. Current major maps

Only these four large environment families are currently planned:

1. **Giảng đường 4**
2. **Giảng đường Xuân Thủy**
3. **Khu phố / phố trà đá**
4. **Hòa Lạc / khu quân sự**

Large maps are produced shell-first:
- blockout
- scale
- traversal
- major architecture
- collision
- lighting
- gameplay/social zones
- then detail dressing

Do not wait for a complete prop library before a large map becomes playable.

## 3. Reusable workshop scope

The workshop primarily produces smaller objects that can be placed into one or more of the four maps.

Examples:
- tarps / bạt
- plastic chairs
- tables/stools
- student desks/chairs
- teacher furniture
- doors/frames
- windows/frames
- fans
- AC units
- lights
- switches/sockets
- boards
- signs
- benches/bins
- bottles/cups
- backpacks
- books/notebooks
- laptops/chargers/cables
- street-side furniture
- food/drink props
- camp/military-living props
- plants/utility props

## 4. How an asset may be produced

A small asset may come from:

### A. Custom modeling
Use Blender or another approved 3D workflow when:
- exact proportions matter
- the asset is interacted with closely
- a suitable licensed asset does not exist
- the item strongly affects visual identity

### B. Existing online asset
Allowed when:
- source is known
- license is clear and compatible
- attribution is recorded if required
- modification is allowed when needed
- asset quality and style fit the project

### C. Generated / assisted production
Allowed for:
- references
- texture/material starting points
- model starting points
- production output when quality, cleanup and provenance are acceptable

Generated output is never accepted automatically; it must be reviewed and cleaned.

## 5. Reusable asset packaging

A production asset should have:
- stable asset ID
- master/source file where useful
- runtime GLB/glTF where appropriate
- meter-scale consistency
- correct origin/pivot
- reusable materials
- simple collision proxy when needed
- variants only when useful
- provenance/license notes
- target-map usage notes
- actual in-engine screenshot/review when visually important

## 6. Materials

Maintain a practical shared material library:
- painted plaster
- tile
- concrete
- painted metal
- stainless metal
- wood/laminate
- plastic
- glass
- fabric
- paper/cardboard
- asphalt/paving
- outdoor/street surfaces

Use base color, roughness, normal/AO where they add visible value.

Avoid unique heavyweight textures for every object.

## 7. Lighting

Lighting is authored primarily per major map, not packaged as one universal look.

Useful reusable lighting language:
- daytime classroom
- overcast/rainy daytime
- street daytime/evening
- fluorescent classroom/corridor
- Hòa Lạc outdoor/living areas
- night scenes only when a specific narrative event needs them

Normal gameplay remains readable.

## 8. Signage

Keep signage data-driven and reusable where possible:
- room numbers
- direction signs
- notices
- temporary posters
- schedules
- street/shop-like generic signs where approved

Requirements:
- Vietnamese text support
- correct orientation
- no mirrored back faces
- readable at intended distance

Official UET branding remains approval-gated.

## 9. Character/NPC production

Character work remains a separate reusable pipeline:
- base body/rig
- clothing variants
- hair/face variants
- locomotion
- idle
- sitting
- phone use
- typing
- talking/listening
- object interactions

Do not build many unique characters before a reusable base exists.

## 10. Review loop

For a major map:
1. run actual build
2. walk important routes
3. capture representative viewpoints
4. inspect scale/composition
5. inspect collision
6. inspect prop placement
7. inspect text/signage
8. check performance
9. list missing small assets
10. iterate

For a reusable small asset:
1. preview source/model
2. place it in a real target map
3. inspect up close and at gameplay distance
4. test collision/interactions if relevant
5. verify materials
6. verify provenance/license
7. approve or revise

## 11. Performance

Browser-first requirements:
- GLB/glTF-friendly
- material reuse
- repeated-object instancing where appropriate
- simple collision
- texture compression/reuse where useful
- load by map/zone
- no requirement to keep all four maps loaded simultaneously

## 12. Scope discipline

Do not:
- build a fifth major map without user approval
- build a massive speculative asset catalog
- decompose unique building shells purely for modularity
- duplicate small assets independently per map
- import uncertain-license assets
- polish invisible background detail before player-facing areas

## 13. Current production note

Giảng đường 4 is currently being updated on a separate environment/art branch.

This narrative/cleanup branch must not modify that active map implementation until the user says the big update is finished and ready for integration.
