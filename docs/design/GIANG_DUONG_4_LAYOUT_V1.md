# GIẢNG ĐƯỜNG 4 — Layout V1

Status: **USER-DIRECTED SPATIAL LAYOUT — CURRENT PLAYABLE MAP**
Date: 2026-10-02
Branch: `phase-v2/gd4-geometry-corrections`

## 1. Scope

This is the approved Giảng đường 4 playable-world footprint for **UETốt**. Detailed chapter/event content remains separately approval-gated.

The old Chapter 1 campus prototype is **retired from the current runtime**. Its technical checkpoint remains preserved by `chapter-1-vertical-slice`.

The active runtime now boots only the Giảng đường 4 slice.

## 2. Playable boundary

The user's yellow outline in the supplied sketch defines the **gameplay boundary**, not the visible end of the world.

Current implementation rules:
- north / south / east sides remain physically bounded
- the west campus wall opens at the gate
- the **gate itself is walk-through**
- a short playable apron continues outside the gate
- the old visible gate-approach railings/barriers are retired; thin light ground markings communicate the apron edges while invisible colliders enforce movement
- a second invisible physical limit closes that apron farther outside
- the east gameplay limit is aligned to the end wall of the second playable classroom at **x = 27.12**; its invisible blocker spans **y = -3..8** so the player cannot climb over or fall under it
- automatic safety/respawn recovery is intentionally **not used** in the active runtime; normal limits are enforced by physical colliders only
- visual world/background may continue beyond every gameplay boundary

The player may not leave the approved gameplay footprint, but the player should still see believable world continuation outside it.

## 3. Top-level map

From west to east:
- **Cổng** on the west side
- open approach/courtyard
- a **canteen shelter / lán bán hàng** tucked into the inner-right campus corner, clearly clear of the gate mouth
- **Tòa A** in the upper/right area
- **Tòa B** below Tòa A
- vehicle lanes around and between the buildings

Working map intent follows the user's sketch rather than the old campus layout.

## 4. Tòa A

Tòa A is visually a longer academic building. A typical floor should read as having **around 10 classroom bays**, but the current playable slice only builds the **first 2 classrooms as full interiors**.

Current approved playable room labels:
- `P 101`
- `P 102`

After those two rooms, the building continues with a **visual-only facade/corridor continuation**. Those later bays do not have full interiors, interaction logic or gameplay collision in this slice.

Both rooms reuse the same production classroom prefab:
- 10 rows × 3 desks
- 2 chairs per desk
- approximately 60 student seats
- large front board
- teacher desk on the right side
- main room entrance on the left wall near the front, according to the latest classroom correction

Tòa A is the user-corrected asymmetric case: when walking in from the gate, its classroom entrance/corridor side is on the **left / +Z side**. **This orientation/flip rule is A-only; Tòa B keeps its current orientation and must not be flipped.** Exterior metal railings are retired on **both A and B**. Ground, upper-storey and continuation corridor edges use wall-colored solid parapets plus larger masonry columns/piers instead.

## 5. Tòa B

Tòa B follows the same rule: the floor visually continues for roughly **10 classroom bays**, while only the **first 2 classrooms are fully playable** in this slice.

The two playable rooms reuse the same production classroom prefab. The remaining visible bays are facade-only continuation geometry with no full room interior.

Final room numbers for the two playable Tòa B rooms are **not yet user-approved**.

Implementation placeholders:
- `B-TBD-1`
- `B-TBD-2`

No visible fake room number is rendered for these two rooms yet.

## 6. Vehicle lanes

Current blockout contains:
- a compact lane/approach from the gate
- a lane above Tòa A
- a lane between Tòa A and Tòa B
- an east-side connector lane

There is **no dedicated parking-shelter structure** in the current source-of-truth. The earlier parking-shelter blockout was removed after user correction.

These are structural circulation surfaces only. Final road markings, vehicles and traffic logic are not yet authored.

## 7. Reuse policy

The production classroom is now a reusable prefab.

Future chapters/routes may reuse the same room shell and asset set while changing:
- room state
- props
- NPCs
- notices/messages
- timetable
- dialogue
- chapter/event state
- lighting state

Do not rebuild a separate duplicate classroom unless the room is intentionally a different architectural type.

## 8. Retired old scene

The following old prototype content is no longer instantiated by `src/main.ts`:
- old school approach
- guard shelter
- old-wing facade
- old corridor route
- old standalone classroom placement
- PA-room route
- retired old story-specific chapter/climax/finale scene flow

Reusable technical systems were retained where useful:
- player controller
- physical collision
- interaction system
- door behavior
- Signage V2
- environment modules
- material helpers
- classroom GLB library

The old prototype source remains recoverable from the preserved tag while migration is stabilized.

## 9. Current runtime identifiers

- map dataset: `giang-duong-4`
- scene ready dataset: `lecture-hall-4-slice`
- classroom count: `4`
- production classroom asset roots: `408`

## 10. Latest user correction — compact multi-storey massing

User-supplied plan/elevation sketches are the current spatial reference for this blockout.

Required geometry relationship:
- the route from **cổng → Tòa A/B is short and compact**; the buildings must be readable soon after entering the gate
- the **canteen shelter sits in the inner-right campus corner with clear separation from the gate mouth** and is pushed almost flush against the west perimeter wall, rather than floating away from it
- Tòa A and Tòa B are **multi-storey academic buildings visually**, not one-storey classroom sheds
- current massing target is **5 visible storeys** for both Tòa A and Tòa B
- **only tầng 1 is playable** in the current slice
- tầng 2–5 are visual architecture only: slab, facade, windows, columns, upper corridor and edge treatment
- do not create routes/NPCs/classroom gameplay on upper floors without later user approval
- the ground-floor slab/corridor of **Tòa A and Tòa B sits above campus ground level**; final corrected working elevation is **0.8 m**
- the void beneath each ground-floor corridor is filled with a solid plinth so the slab does not read as floating
- each building uses **5 evenly rising visible west-end steps**, backed by an invisible smooth ramp collider, to transition naturally from campus ground to the corridor
- both A and B use a **solid wall-colored parapet + masonry columns/piers**; no exterior black metal railing remains on ground, upper or continuation levels
- front and exposed side parapets use the same corrected **1.15 m** height and read as smooth solid masonry; the exposed ground-floor side face is fully closed
- structural corridor columns run **continuously from the 0.8 m base to the roof line** instead of restarting at each storey; corner/end columns are included, and the top corridor slab caps them so no surplus posts protrude above tầng 5
- each ground-floor parapet extends to and slightly overlaps the invisible east gameplay boundary so there is no visual slit between building edge treatment and boundary
- on Tòa B's south/front side there is **no broad front yard**: the south perimeter wall sits about 0.13 m from the parapet, with only the local clearance needed around the approved west-end stair access
- the **canteen shelter remains at campus ground level**, is tucked tightly into the inner corner with its roof nearly flush to the west and south perimeter edges, uses four support posts, a visibly sloped overhanging roof, partial back/side walls, and an open/service side facing toward Tòa B
- the review view for external massing should include the **canteen-side / canteen-corner view toward the buildings**, matching the user's sketch perspective
- do not stretch this into a large campus: Giảng đường 4 remains a compact bounded scene

The old Chapter 1 campus scale is not a reference for distances in this map.

## 11. Visual world continuation outside gameplay bounds

The yellow user boundary limits movement, not visibility.

Required presentation rules:
- outside the playable boundary, the player should still see **surrounding city/campus context**
- city/background presentation is visual-only and carries no gameplay collision
- **do not use 3D city/building blocks for the surrounding background**
- current foundation uses lightweight **2D background cards/planes** with replaceable texture slots; placeholder cards stay **disabled/invisible until user-approved AI/authored art is assigned**
- Tòa A/B continue visually beyond the two playable rooms using lightweight facade/corridor bays
- upper-storey and continuation visual-only boxes are **merged/batched by material** to cut draw-call/active-mesh cost while preserving all 5 visible storeys
- those continuation bays imply the rest of a roughly 10-room floor without building full interiors
- continuation geometry has no interactions and no gameplay collision
- the first continuation bay overlaps the playable-building edge slightly so no visible seam/gap opens between the real rooms and the visual-only extension
- continuation bays are intentionally wider/spaced out near the playable edge; natural 3D perspective makes them compress visually with distance instead of starting as an unnaturally dense wall of doors/windows
- the east movement limit is an **invisible collision boundary**; it must not render as a black/opaque blocker
- room numbers/content for those distant bays are not canon and should not be invented
- the intended production path is to replace those placeholder cards with **user/AI-authored 2D images that fake depth/perspective**, without changing gameplay bounds or adding 3D city massing

## 12. Final geometry/performance verification

Final correction evidence is stored in `docs/playtest/gd4-geometry-corrections-review/`.

Verified on fresh foreground Chrome / WebGPU after user acceptance:
- user manual playtest: **approved 2026-10-02**
- runtime exceptions: **0**
- console errors: **0**
- HTTP responses >=400: **0**
- invisible east boundary collision: pass; blocker spans y=-3..8 and stops the player before its x=27.03 inner face
- unwanted teleport-to-spawn behavior: resolved by removing the obsolete automatic safety/respawn recovery subsystem
- scene geometry: **2549 meshes / 470676 vertices**
- final approved runtime sample: **59.84 RAF FPS / 60.05 engine FPS**
- full repository gate: **15 test files / 51 tests pass**, typecheck pass, production build pass, `git diff --check` pass
- latest corrections preserve all 5 visible storeys while keeping the scene around the 60 FPS target
- full visible-storey count remains **5** for both buildings
- authoritative runtime evidence: `docs/playtest/gd4-geometry-corrections-review/runtime-final-approved.json`

The retired old story-specific implementation is intentionally not mass-deleted from generic/reusable runtime code. This map pass removed only obsolete GD4/WIP geometry paths.

## 13. Still TBD_USER_APPROVAL

Not decided by this document:
- final Tòa B room numbers
- final campus identity/logo/colors
- final chapter content
- NPC placement
- narrative routes
- any expansion outside the current Giảng đường 4 perimeter
