# GIẢNG ĐƯỜNG 4 — Layout V1

Status: **USER-DIRECTED SPATIAL LAYOUT — CURRENT PLAYABLE MAP**
Date: 2026-10-02
Branch: `phase-v2/giang-duong-4-map-shell`

## 1. Scope

This is the current playable world footprint while chapter/route narrative is still being rewritten.

The old Chapter 1 campus prototype is **retired from the current runtime**. Its technical checkpoint remains preserved by `chapter-1-vertical-slice`.

The active runtime now boots only the Giảng đường 4 slice.

## 2. Playable boundary

The user's yellow outline in the supplied sketch defines the **gameplay boundary**, not the visible end of the world.

Current implementation rules:
- north / south / east sides remain physically bounded
- the west campus wall opens at the gate
- the **gate itself is walk-through**
- a short playable apron continues outside the gate
- a second physical limit closes that apron farther outside
- visual world/background may continue beyond every gameplay boundary

The player may not leave the approved gameplay footprint, but the player should still see believable world continuation outside it.

## 3. Top-level map

From west to east:
- **Cổng** on the west side
- open approach/courtyard
- **Căn tin** in the lower-left area
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

A corridor runs along the classroom entrance side.
A railing separates the corridor edge from the adjacent open/vehicle area.

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
- KCR/event state
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
- Chapter 1 KCR/climax/finale scene flow

Reusable technical systems were retained where useful:
- player controller
- collision/safety
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
- **căn tin remains lower-left and close to the building cluster**, but it must not overlap the Tòa B footprint
- Tòa A and Tòa B are **multi-storey academic buildings visually**, not one-storey classroom sheds
- current massing target is **3 visible storeys**
- **only tầng 1 is playable** in the current slice
- tầng 2–3 are visual architecture only: slab, facade, windows, columns, upper corridor and railings
- do not create routes/NPCs/classroom gameplay on upper floors without later user approval
- the ground-floor slab/corridor of **Tòa A and Tòa B sits above campus ground level**; current working elevation is about 0.6 m
- shallow playable steps connect campus ground to the elevated ground-floor corridors
- **Căn tin remains at campus ground level**
- the review view for external massing should include the **canteen-side / canteen-corner view toward the buildings**, matching the user's sketch perspective
- do not stretch this into a large campus: Giảng đường 4 remains a compact bounded scene

The old Chapter 1 campus scale is not a reference for distances in this map.

## 11. Visual world continuation outside gameplay bounds

The yellow user boundary limits movement, not visibility.

Required presentation rules:
- outside the playable boundary, the player should still see **surrounding city/campus context**
- city/background geometry is visual-only and carries no gameplay collision
- the current blockout uses lightweight skyline massing rather than full explorable buildings
- Tòa A/B continue visually beyond the two playable rooms using lightweight facade/corridor bays
- those continuation bays imply the rest of a roughly 10-room floor without building full interiors
- continuation geometry has no interactions and no gameplay collision
- room numbers/content for those distant bays are not canon and should not be invented
- this visual background may later be replaced by authored skyline cards, impostors, distant meshes or other optimized techniques without changing gameplay bounds

## 12. Still TBD_USER_APPROVAL

Not decided by this document:
- final Tòa B room numbers
- final campus identity/logo/colors
- final chapter content
- NPC placement
- narrative routes
- KCR story usage
- any expansion outside the current Giảng đường 4 perimeter
