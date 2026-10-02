# VISUAL PRODUCTION WORKSHOP V1 — DRAFT

Status: **APPROVED FOR P202 CLASSROOM ASSET PRODUCTION — broader campus expansion still approval/scope controlled**  
Purpose: establish a reusable art-production pipeline capable of supporting the larger campus-life game.

> **2026-10-02 direction update:** use `P202_GOLDEN_CLASSROOM_VISUAL_GUIDE.md` for the current slice. Baseline student-life scenes are bright, ordinary and readable; dark/uncanny lighting is reserved for specific narrative events. Prior night/dark/tension presentation is historical prototype evidence, not the default visual target.

## 1. Goal

Move away from primary-player-facing scenes being dominated by procedural boxes + flat StandardMaterial placeholders.

Target:

> High-quality indie first-person student-life game with believable Vietnamese environments, strong lighting, reusable assets, consistent materials, and production-safe browser performance. Any unusual/uncanny layer is secondary and event-specific.

This is not a one-scene beautification task.

It is a reusable asset workshop for the whole game.

## 2. Workshop outputs

The workshop should ultimately produce:

- Art Direction Bible
- asset taxonomy
- modular environment kits
- prop library
- material/PBR library
- decal library
- lighting presets
- signage system
- character/NPC pipeline
- rigging/animation library
- VFX/weather library
- optimization standards
- asset review/checklist
- before/after screenshot workflow

## 3. Environment modular kit

Provisional asset families:

### Architecture

- walls
- corners
- pillars
- floor modules
- ceilings
- stairs
- railings
- doors
- door frames
- windows
- window frames
- corridor modules
- classroom shells
- office shells
- rest/common-area modules
- campus exterior modules

### Classroom / academic props

- student desks
- chairs
- teacher desk
- boards
- projectors/screens
- speakers
- fans
- fluorescent fixtures
- wall clocks
- sockets/switches
- cable/conduit sets
- shelves/cabinets
- notice boards
- signage mounts

### Campus-life props

- benches
- bins
- vending/food props
- café/canteen furniture
- outdoor seating
- bicycles / parked-vehicle proxies where appropriate
- backpacks/books/laptops
- generic student belongings
- plants/trees
- street/campus utility props

### Home/dorm/rented-room props

- bed
- desk
- chair
- wardrobe
- shelves
- laptop/PC setup
- charging cables
- fan
- lighting
- ordinary clutter

Exact hero props and recognizable brand-like objects require license/identity review.

## 4. Material library

Create reusable physically believable materials where the runtime budget allows:

- painted plaster
- aged wall paint
- tile
- concrete
- painted metal
- stainless metal
- wood/laminate
- plastic
- glass
- fabric
- paper/cardboard
- wet exterior surfaces

Where practical use:

- base color/albedo
- roughness
- normal
- ambient occlusion
- controlled surface variation

Avoid unique heavyweight textures for every object.

## 5. Decal / wear system

Reusable restrained decals:

- water stains
- dirt accumulation
- scuffs
- shoe marks
- tape residue
- faded notices
- mild paint wear
- edge grime
- small cracks where appropriate

Do not turn every surface into abandoned-dark/tension grime.

The world is an active university first and an uncanny space second.

## 6. Lighting workshop

Develop reusable lighting language for:

- daytime classroom
- cloudy/rainy daytime
- evening campus
- night corridor
- dorm/room
- computer/deadline sequence
- uncanny/KCR shifts

Lighting goals:

- readable navigation
- strong local contrast
- believable practical fixtures
- controlled darkness
- minimal black crush
- restrained bloom
- authored rather than random flicker

Fluorescent instability may be used subtly when narratively appropriate.

## 7. Signage system

Build a reusable system for:

- room signs
- classroom labels
- floor markers
- building labels
- notice boards
- temporary notices
- event posters
- schedules

Requirements:

- correct text orientation from player-facing angles
- Vietnamese text support
- no mirrored back faces
- style variants
- data-driven text where useful

Final institutional logo/name/identity assets remain behind USER APPROVAL GATES.

## 8. Character / NPC pipeline

Future workshop scope:

- stylized-realistic or realistic character target to be approved
- base body system
- clothing system
- hair
- face variation
- rig
- locomotion
- idle animation
- sitting
- phone use
- talking/listening
- typing
- classroom behavior
- object interaction

Avoid building many unique characters before a reusable base pipeline exists.

## 9. Protagonist body / animation

Future target:

- first-person body awareness
- hands/arms when appropriate
- sitting
- typing
- phone use
- opening doors
- carrying/using props
- authored interaction animations
- optional full-body visibility in approved cinematic/reflection contexts

Final protagonist appearance requires user approval.

## 10. VFX / atmosphere

Possible reusable systems:

- rain
- wetness cues
- subtle mist where appropriate
- screen-space or particle dust only where justified
- fluorescent/light instability
- screen/monitor glow
- restrained uncanny special-event effects

Effects must support gameplay readability.

## 11. Performance standards

The workshop must remain browser-first.

Required production principles:

- glTF/GLB-friendly pipeline
- instancing/thin instances for repetition where appropriate
- texture reuse/atlasing where useful
- compressed textures if supported by deployment path
- LOD only where it earns its complexity
- sensible draw-call budgets
- lazy/area loading as the world grows
- collision meshes separated from visual complexity where useful

Visual quality must not be accepted if it destroys target performance.

## 12. Visual review loop

Do not approve art from code inspection alone.

For every meaningful environment pass:

1. launch actual build
2. capture agreed representative viewpoints
3. compare before/after
4. inspect geometry/material/lighting/readability
5. inspect clipping/collision
6. inspect text orientation
7. verify performance
8. iterate

Store representative evidence under `docs/playtest/` or a later dedicated visual-review path.

## 13. Asset licensing / provenance

Every external production asset must have:

- source
- license
- modification notes where relevant
- attribution requirements if any
- clear suitability for shipping

Do not import uncertain-license assets into production.

## 14. Approval gates

Final versions of the following require user approval:

- university identity
- logo
- canonical signage style
- campus master layout
- protagonist design
- important NPC designs
- uniforms
- major environment art-direction changes

Generic technical kits and placeholders may proceed before approval.

## 15. Current status

This workshop is approved for the current P202 classroom production pass. Do not interpret that approval as authorization to build the entire campus or finalize institutional identity.
