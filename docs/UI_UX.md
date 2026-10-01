# UI / UX Bible

## Principle
The player should spend attention on the world, not on HUD.

## Default gameplay HUD
Keep minimal:
- small center reticle only when useful
- interaction prompt only when a valid target exists
- no permanent objective list
- no minimap
- no health/ammo HUD because the MVP has no combat

## Interaction prompt
Prompt must:
- be readable
- appear consistently
- avoid covering the inspected object
- communicate the primary action only
- disappear cleanly when target is lost or interaction starts

## Inspection mode
When inspecting an object:
- locomotion is locked
- camera movement is intentionally constrained
- the object remains the visual focus
- controls for next page/rotate/exit appear only if needed
- exit is always obvious and reliable

## Evidence/journal
Journal is support, not the primary gameplay surface.

It may contain:
- discovered evidence
- images/documents
- audio entries
- connected notes/hypotheses later

It must not:
- automatically solve every contradiction
- replace physical inspection
- flood the player with tutorial text

## Pause/settings
Required before public release:
- resume
- sensitivity
- FOV
- motion/head-bob reduction
- audio categories
- subtitle/text settings
- graphics preset where needed
- save/return controls

## Diegetic direction
Where useful, UI may resemble:
- laptop/archive interface
- case file
- phone
- document folders

But usability outranks diegetic styling.

## Motion
UI transitions should be restrained and fast.
Do not use large floating/elastic animation that clashes with the game tone.

## Typography
Prioritize:
- Vietnamese readability
- clear accents/diacritics
- comfortable document reading
- distinguishable handwriting only when it is an in-world asset, not core UI text

## Accessibility
- scalable/readable text
- keyboard operability for menus
- contrast sufficient for dark scenes
- interaction cues must not rely on color alone

## Prototype UI
First prototype needs only:
- loading/error state
- center reticle
- interaction prompt
- minimal evidence discovery feedback
- pause/unlock handling

Everything else is deferred until interaction feel is proven.
