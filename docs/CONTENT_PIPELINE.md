# Content Pipeline

## Principle
A chapter is a package of scenes, assets, state definitions, evidence definitions, interaction data, audio, and narrative text. Content should be replaceable without rewriting core engine systems.

## Environment pipeline
1. concept/mood reference
2. scene blockout
3. collision pass
4. gameplay path test
5. lighting blockout
6. modular environment art
7. materials/textures
8. decals/detail
9. prop dressing
10. optimization
11. final lighting
12. playtest

## Interactable prop pipeline
1. narrative purpose
2. gameplay behavior
3. interaction storyboard
4. model/asset
5. interaction anchor(s)
6. animation
7. sound
8. evidence/world-state wiring
9. inspect readability test
10. performance check

## Generated imagery pipeline
When generated art is useful:
1. define art-bible constraints
2. generate reference/asset candidate
3. inspect for obvious artifacts
4. crop/clean/retouch as needed
5. convert/compress for runtime
6. name and version consistently
7. verify in actual game lighting
8. replace later if final-quality requirements demand it

## Scene data
Each scene should eventually declare:
- id
- asset bundle
- spawn points
- interactables
- audio ambience
- lighting preset
- reality variants
- chapter conditions

## Evidence content
Evidence definition should eventually declare:
- stable id
- title
- description
- media type
- source scene
- discovery condition
- journal representation
- tags/links
- world facts granted

## Naming convention draft
- scenes: `scene_<chapter>_<location>`
- interactables: `int_<location>_<object>`
- evidence: `ev_<chapter>_<slug>`
- world facts: `fact_<domain>_<slug>`
- audio: `sfx_<category>_<slug>`, `amb_<location>_<slug>`
- textures: `tex_<asset>_<channel>`

## Runtime asset rule
Only optimized runtime files belong in runtime asset folders.
High-resolution source/reference files should not silently bloat production bundles.

## Validation
Before marking content complete:
- loads without error
- collision is correct
- no inaccessible mandatory clue
- interaction can always exit
- evidence fires once as intended
- reality variant is reproducible from a clean save
- no unreadable hero text at target resolution
