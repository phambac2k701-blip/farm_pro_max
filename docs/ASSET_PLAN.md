# Asset Plan

## Purpose

Reach believable visual quality without producing uncontrolled asset volume.

The project should build a reusable modular asset library, beginning with P202.

## Asset categories

### A. Environment
- walls/floors/ceilings
- doors/frames
- windows/frames
- corridor/classroom architecture
- stairs/railings
- large furniture

### B. Classroom props
- student desks
- student chairs
- teacher desk
- board
- fans
- air conditioner
- lighting fixtures
- sockets/switches/conduits
- cabinets/shelves
- notice boards

### C. Student-life props
- backpacks
- books/notebooks
- pens/paper
- bottles
- laptops
- chargers/cables
- phones or generic device props where needed
- ordinary classroom clutter

### D. Materials/decals
- painted plaster
- tile
- concrete
- metal
- laminate/wood
- plastic
- glass
- paper/fabric
- restrained scuffs/tape/wear/dirt

### E. Characters
Future reusable pipeline:
- base body/rig
- clothing variants
- hair/face variation
- sitting
- phone use
- talking/listening
- typing
- classroom idle/locomotion

### F. Audio
Tracked separately but versioned as production assets.

## Production strategy

Use Blender/authored 3D or properly licensed external assets for visible production objects.

Procedural geometry remains useful for:
- blockout
- collision proxies
- simple invisible helpers
- fast technical prototypes

Do not stop at primitive boxes for player-facing production assets when better authored geometry is required.

## External assets

Free assets may be used when their license is clear and compatible.

For every external production asset, record:
- source
- license
- modifications
- attribution requirements
- runtime path
- shipping suitability

Do not use assets with unclear permission.

## Golden classroom target

P202 should establish the first reusable classroom kit:
- classroom shell
- approximately 10 rows × 3 desks
- two chairs per desk
- teacher zone
- board
- windows
- door
- AC
- ceiling fans
- lighting
- believable material response
- a small set of ordinary props

## Fidelity rule

Spend detail where the player gets close.

Priority:
1. desk/chair and immediate seat area
2. teacher/board area
3. door/window/fan/AC assets
4. ordinary interactive props
5. room shell/materials
6. distant/background detail

## Runtime format

- GLB/glTF preferred for 3D runtime
- source/master assets kept separately from runtime-optimized output
- collision meshes may be simpler than render meshes
- repeated furniture should use instancing/thin instances where appropriate
- texture reuse/compression should be evaluated against browser performance

## Asset manifest

Maintain:
- asset ID
- type
- source
- scene/usage
- status
- runtime path
- variants
- rights/provenance notes
