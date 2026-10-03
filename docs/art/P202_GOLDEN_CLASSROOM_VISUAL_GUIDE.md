# P202 Golden Classroom Visual Guide

**THAM KHẢO KỸ THUẬT / SNAPSHOT TASK CŨ.** Không là lịch sản xuất hoặc tiêu chí nghiệm thu Ch0. Theo [START_HERE](../START_HERE.md) cho ưu tiên mới; không mở lại polish GD4/P202 để làm Ch0. Giữ đường dẫn và nội dung gốc để truy vết.

Status: **DRAFT — VISUAL DIRECTION UPDATE — NOT INSTITUTIONAL CANON**  
Date: 2026-10-02  
Applies to the P202 golden-classroom slice defined in `docs/design/P202_ROOM_FOCUSED_STUDENT_SLICE.md`.

## 1. Core visual rule

The baseline game should look like an **ordinary, readable Vietnamese student environment first**.

The player should be able to understand the room comfortably and notice everyday details without “dark dramatic grading.” Darkness and uncanny lighting are reserved for specific events so they have contrast and meaning.

Reference spirit only:
- local
- familiar
- playful
- readable
- everyday
- memorable through interactions and story

Do not copy assets, branding, layouts or specific visual designs from reference games.

## 2. Baseline lighting target

Normal-state lighting should be:
- classroom/daytime-friendly
- bright enough to read floor, walls, doors and furniture without strain
- evenly legible while still retaining depth and shadow
- driven by believable daylight and/or practical classroom fixtures
- suitable for ordinary conversation, humor and environmental observation
- stable by default

Good baseline behavior:
- desk surfaces are visibly different from the floor
- chair backs/legs do not disappear into shadow
- walls retain visible color instead of collapsing to near-black
- door frames and exits are obvious without UI arrows
- signs and notices can be read when the player approaches normally
- small props have usable silhouette/contrast
- corners may be dimmer, but never become unreadable voids

The baseline should not communicate “danger” just because the player is standing in a classroom.

## 3. Special-event lighting target

Unusual/darker lighting may appear only when an approved event justifies it.

Allowed event changes:
- subtle ambient-fill reduction
- localized color-temperature shift
- one fixture becoming slightly unstable
- one area becoming comparatively cooler/warmer
- selective emphasis on a changed object or information source
- modest contrast increase
- restrained reflection/highlight changes

Event lighting must still preserve:
- floor readability
- exit readability
- interactable silhouettes
- camera comfort
- non-strobing presentation

Avoid:
- whole-room near-black treatment
- rapid flicker
- repeated flash effects
- using darkness as the only way to signal “uncanny”
- permanent dark grading after an event ends

## 4. Color and mood language

### Normal state
Use words such as:
- ordinary
- lightly warm
- clean enough to feel active
- lived-in
- practical
- slightly mismatched
- student-used
- daylight-soft
- fluorescent-neutral
- local
- unpolished in a believable way, not abandoned

Color should come from normal objects and surfaces:
- off-white / pale painted walls
- muted classroom greens/blues/greys where generic
- warm wood/laminate desks
- painted metal
- paper/notice colors
- daylight or soft cool practical light
- small personal-object accents later when approved

No final institutional palette is approved. Any “official” color system remains `TBD_USER_APPROVAL_INSTITUTIONAL_COLOR_SYSTEM`.

### Uncanny state
Use words such as:
- slightly colder
- flatter or oddly directional
- one practical light behaving wrong
- familiar color losing a little warmth
- one reflective or informational surface drawing unusual attention
- ordinary geometry feeling subtly inconsistent

The event state should feel like a deviation from normal, not a separate dark-mode game.

## 5. What “too dark” means

A scene is too dark if any of these are true during ordinary gameplay:
- the player cannot distinguish floor from adjacent furniture at normal viewing distance
- desk/chair silhouettes merge into a black mass
- doorways are only readable because of the crosshair or prior memory
- signage disappears unless the player is extremely close
- wall color and material differences vanish
- large parts of the screen sit near black with no meaningful information
- the player must increase display brightness to understand navigation
- the lighting communicates danger/tension before the story asks for it
- screenshots require explanation to identify ordinary room structure

“Moody” is not an excuse for missing information.

## 6. What “student-life readable” means

A student-life room is readable when:
- the player immediately understands where people would sit, enter, stand and place belongings
- classroom furniture hierarchy is obvious
- there are visible everyday-use zones: seats, teacher area, notice/info area, power/charging area, door/threshold
- important props are discoverable by composition, not glowing game-object treatment
- the environment supports scanning other people/objects for social context
- small humor beats can be noticed visually
- the room still looks acceptable when nothing uncanny is happening

The player should be able to enjoy simply existing in the room.

## 7. Composition rules for the room-focused slice

Prefer:
- fewer, better-arranged assets over a large empty school
- clustered desk/chair arrangements that look used rather than perfectly procedural
- a visible teacher/front-of-room anchor
- an information/notice zone
- a power/socket/utility zone
- restrained personal clutter
- clear walking lanes
- believable negative space
- subtle asymmetry and imperfect alignment where appropriate

Avoid:
- repeating identical rows with no variation
- every prop centered on a grid
- huge empty wall/floor areas without function
- grime used as a substitute for detail
- excessive dramatic spotlights
- one-off hero assets before reusable room assets are strong

## 8. Normal vs twist-state browser review

Every meaningful lighting pass must be reviewed in the actual browser build with matched viewpoints.

Minimum matched views:
- room entry
- widest classroom overview
- one desk/chair close view
- teacher/front area
- notice/signage area
- one interaction close view

For each relevant view, compare:
- normal baseline
- special-event / uncanny state when that event exists

Review criteria:
- floor/furniture separation
- wall/door readability
- signage readability
- small-prop silhouette
- material color retention
- shadow detail
- exit readability
- whether the event state is visibly different without becoming unreadable

A code-level intensity change is not sufficient evidence.

## 9. Reuse and asset direction

Keep and improve useful generic classroom assets already present:
- classroom desk module
- classroom chair module
- teacher desk
- door/frame/opening modules
- notice board
- fluorescent fixtures
- cabinets/shelves
- switches/sockets
- conduit/cable modules
- generic signage mounts

Prefer fixing proportion, orientation, collision footprint and composition through the reusable module system rather than one-off scene patches.

The current room-number examples `P 202` and `P 204` are approved working labels only. Final A/B building topology, complete room-number map and institutional styling remain `TBD_USER_APPROVAL_*`.

## 10. Current browser evidence

Current room-foundation evidence:
- before: `docs/playtest/v2-room-corrections-before/`
- after: `docs/playtest/v2-room-corrections-after/`

The after captures verify the current prototype direction:
- classroom geometry and furniture are readable at normal viewing distance
- desk/chair orientation is corrected
- room-number signage reads `P 202` / `P 204`
- classroom door/frame/header fits the wall opening more cleanly
- normal lighting is bright/readable rather than dark by default

Current numerical lighting values are implementation tuning values, not canonical visual-brand constants.

## 11. Remaining visual debt

This pass does **not** make the room final art.

Still placeholder / future authored-asset work:
- many surfaces remain simple procedural geometry
- desk/chair geometry is functional modular art, not final authored GLB quality
- wall, ceiling and room details still need more everyday-life specificity
- personal/student clutter is sparse
- windows/daylight source treatment is still rudimentary
- institutional visual identity is intentionally absent
- character presence is not yet part of this visual pass

Future visual work should prioritize authored-looking repeated classroom assets and believable student-use detail before expanding map size.
