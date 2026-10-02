# Asset Plan

## Purpose

Keep visual production focused around the current **four major maps** while building a separate reusable library for smaller objects.

Authoritative references:
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
- `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`

## Two production layers

### Layer A — Major maps

Current approved high-level map set:
1. Giảng đường 4
2. Giảng đường Xuân Thủy
3. Khu phố / phố trà đá
4. Hòa Lạc / khu quân sự

Large maps are authored as scene-level environments.

For them, prioritize:
- overall shell/frame
- scale
- traversal
- major openings
- stairs/corridors/roads
- collision
- lighting blockout
- gameplay/social zones

Only after that should the scene receive dense prop dressing.

Do not require a whole large environment to be decomposed into dozens of small reusable modules before production can move forward.

### Layer B — Reusable assets

Small/repeated assets are produced separately and reused across the four maps.

Examples:
- bạt / tarps
- ghế nhựa / chairs
- tables
- classroom desks/chairs
- doors/frames
- windows/frames
- fans
- air conditioners
- lights
- boards
- signs/sign mounts
- bins/benches/stools
- bottles/cups
- backpacks
- books/notebooks
- laptops
- chargers/cables
- food/drink props
- street furniture
- camp/military-living props
- plants and ordinary utility objects

## Sourcing options

For a reusable asset, choose the most practical route:

### Custom
- Blender/authored modeling
- suitable when exact proportions, interaction or visual identity matter

### Existing online asset
Allowed when:
- source is known
- license is compatible
- attribution requirements are recorded
- modification is permitted when needed
- final asset is appropriate for shipping

### Generated/assisted asset
May be used when the available production tooling can create a useful base/reference/output.

Generated assets still require:
- visual review
- cleanup
- scale/origin checking
- license/provenance notes when relevant
- real-engine testing

Do not use uncertain-license ripped assets.

## Reusable asset packaging standard

Each reusable production asset should have:
- stable asset ID
- source/master file where appropriate
- runtime GLB/glTF when appropriate
- consistent meter scale
- sensible origin/pivot
- reusable materials
- simple collision proxy when needed
- variants only when useful
- source/license/provenance metadata
- scene usage notes
- in-engine visual check

## Major-map production order

For each of the four major maps:

1. reference/user description
2. blockout / shell
3. scale and traversal test
4. major architecture/openings
5. collision/player safety
6. daylight/practical-light blockout
7. gameplay/social anchors
8. reusable-asset dressing
9. material/surface pass
10. secondary clutter/decals
11. optimization
12. actual-browser review

## Iteration rule

Preferred loop:

**map shell → walk/playtest → identify missing objects → produce/source reusable asset → place it → playtest again**

Avoid:
- building a huge speculative asset library first
- fully polishing small props before map scale is correct
- embedding separate copies of the same prop into every map
- expanding beyond the four-map scope without approval

## Current map relationship

- Giảng đường 4: active production on the separate environment branch
- Giảng đường Xuân Thủy: planned for Chapter 0
- Khu phố / phố trà đá: planned recurring social-life scene
- Hòa Lạc / khu quân sự: planned for Chapter 1

## Runtime/performance

- GLB/glTF preferred
- reuse materials/textures
- instance repeated props when appropriate
- simple collision meshes
- load by map/zone rather than all environments at startup
- optimize based on real profiling, not speculation

## Asset manifest

Track:
- asset ID
- type
- custom / external / generated
- source
- license
- modifications
- runtime path
- maps/scenes used in
- status
- variants
- attribution/provenance notes
