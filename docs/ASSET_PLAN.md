# Asset Plan

## Purpose
Keep visual quality high without producing uncontrolled asset volume.

## Asset categories

### A. Environment
- walls/floors/ceilings
- doors/windows
- corridor/classroom architecture
- stairs/railings
- large furniture

### B. Props
- desks/chairs
- books/notebooks
- cabinets
- electronics
- lamps
- archive boxes

### C. Narrative images
- class photographs
- documents
- notices
- diary pages
- maps
- screenshots/files
- posters

### D. Materials/decals
- grime
- stains
- cracks
- tape
- paper residue
- chalk
- handwriting
- labels/numbers

### E. FX
- rain
- dust
- fog
- light flicker
- subtle screen/noise effects

### F. Audio
Tracked separately but versioned as production assets.

## Generation strategy
Use AI image generation for:
- concept art
- scene references
- prop references
- narrative photographs/documents
- texture/decal candidates

Use 3D modeling or procedural geometry for:
- navigable architecture
- collision-critical objects
- hero props that must rotate/open/animate

AI-generated images must be reviewed for:
- perspective
- repeated artifacts
- incorrect anatomy/faces
- unreadable text
- cultural/location mismatch
- contradiction with the narrative bible

## First prototype asset budget
Do not build final chapter art yet.

Required:
- graybox hallway
- graybox classroom
- door
- teacher desk
- eight desk/chair sets plus ninth variant
- one hero book
- one inspection anchor setup
- placeholder wall/notice detail
- basic lighting
- one subtle reality-shift visual change

Optional only if time/performance allows:
- rain exterior view
- class photo placeholder
- simple school signage

## Fidelity rule
Spend detail where the camera gets close.

Priority:
1. book / hero evidence
2. nearby desk surfaces
3. classroom focal wall/board
4. corridor focal areas
5. distant background

## Runtime format direction
- GLB/glTF for 3D runtime assets
- optimized modern image formats where supported
- source/master assets kept separate from runtime-optimized output

## Asset manifest requirement
When production assets begin, maintain a manifest with:
- asset ID
- type
- source
- chapter/scene
- status
- runtime path
- variants
- rights/provenance notes if relevant
