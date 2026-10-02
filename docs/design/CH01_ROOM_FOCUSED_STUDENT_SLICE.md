# CH01 Room-Focused Student Slice

Status: **DRAFT — NOT CANON — USER APPROVAL REQUIRED FOR NARRATIVE CONTENT**  
Date: 2026-10-02  
Working implementation branch: `phase-v2/foundation-hardening`  
Preserved checkpoint: `chapter-1-vertical-slice`

## 1. Direction

The next playable slice is no longer a dark-horror corridor route by default.

Its working role is a **small, dense, room-focused Vietnamese student-life slice** built around one classroom/main room. The player's ordinary student experience is the primary source of charm: arriving, finding a place, handling small objects, reading the room, dealing with awkward social moments, checking information, and reacting to mundane problems.

The uncanny layer exists only as a restrained interruption to an otherwise readable, familiar, lightly humorous baseline.

This document defines production direction, not final chapter canon. Exact dialogue, named characters, institutional identity, major beats, twist meaning, and final chapter order remain behind `USER_APPROVAL_GATES.md`.

## 2. Role of “Chapter 1”

`CH01` is currently a **working technical slice label**, not approval of a final canonical Chapter 1.

The slice should prove that the game can be fun and memorable before horror escalates:
- one believable room with enough density to reward looking around
- ordinary student-roleplay interactions
- short social/awkward micro-events
- environmental storytelling through everyday objects
- one or two subtle reality inconsistencies
- a clear contrast between normal baseline and event-driven uncanny state

The old Chapter 1 remains preserved as a technical/tonal prototype. Its gate → guard → old-wing → classroom → PA-room route is not automatically the structure of this new slice.

## 3. Reuse from the old build

Reuse existing generic technical/art assets where they fit the room:
- classroom desks
- classroom chairs
- teacher desk
- classroom shell/floor/walls/ceiling as a starting scaffold
- door/frame modules
- fluorescent fixture modules
- notice-board module
- cabinets/shelves
- socket/switch modules
- cable/conduit modules
- generic room-sign mount/signage system
- generic paper/document props
- phone presentation infrastructure
- interaction targeting/ownership
- inspection/camera choreography
- save/checkpoint infrastructure
- evidence/fact infrastructure only where it supports the new slice
- KCR/reality-change infrastructure as a reusable mechanism, not old narrative canon

Reuse is preferred to rebuilding equivalent props. Assets may be visually upgraded without changing their generic identity.

## 4. Presentation dropped from the old baseline

The following are **not** the new default presentation:
- near-black exterior/interior baseline
- night/rain mood as the whole-game visual identity
- constant fluorescent-horror tension
- large black-crushed areas where floors, doors or furniture disappear
- horror ambience carrying ordinary scenes
- a long corridor/PA-room investigation as the main early-game fantasy
- grime/decay suggesting an abandoned institution
- KCR visual treatment that makes the room difficult to read

Darkness may still be used for a justified event, but it must be authored as a state change that the player can notice because the normal state is clear.

## 5. Room interaction set

The implementation target is a **dense interaction sandbox**, not a large map.

Generic interaction slots that may proceed as non-canon prototypes:
- enter room and choose/find a usable seat
- sit/stand or move around a desk cluster
- inspect desk/chair/teacher-desk details
- check a generic timetable/room notice
- check phone/messages/announcements through placeholder content
- plug/unplug or inspect a generic charger/socket/laptop-area prop
- interact with books, paper, pen/pencil, bottle or backpack-scale clutter
- inspect the notice board and classroom sign
- interact with window/curtain/fan/light switch where technically justified
- small “before class starts” room-state changes
- optional object-state reactions after another interaction

Any final branded object, official notice, institutional wording, named class, named lecturer, or named important student remains `TBD_USER_APPROVAL_*`.

## 6. Humor and social beats

The slice should include short, recognizable student-life comedy without turning into a joke collection.

Working non-canon beat slots:
1. **Seat awkwardness** — the player approaches/uses a seat and realizes there is a minor social mismatch or someone has informally claimed it.
2. **Borrowed-item friction** — a tiny interaction around a pen, charger, paper, cable or similar ordinary object.
3. **Phone/group-chat timing** — a message arrives at an inconvenient or funny moment and changes how the player reads the room.
4. **Trying to look confident while confused** — navigation/interaction framing allows the player to act like they know what they are doing while environmental information quietly contradicts that confidence.
5. **Classroom background behavior** — small ambient reactions or placeholder chatter can make the room feel occupied/lived-in once NPC pipeline work begins.

Exact jokes, dialogue, named participants and canonical outcomes are **not approved here**. Use placeholders such as `TBD_USER_APPROVAL_DIALOGUE_A` and `TBD_USER_APPROVAL_SOCIAL_BEAT_A` during implementation.

## 7. Uncanny beats

The room gets at most one or two subtle early inconsistencies. They should be easy to miss, not “horror mode.”

Preferred technical shape:
- one **informational contradiction**: a schedule/notice/phone/class-list value changes or disagrees with another source
- one **physical continuity contradiction**: a generic object/seat/sign/route detail is different after knowledge/state changes

Working placeholders:
- `TBD_USER_APPROVAL_UNCANNY_BEAT_A`
- `TBD_USER_APPROVAL_UNCANNY_BEAT_B`

No jump-scare requirement. No final explanation of KCR. No major twist is approved by this document.

## 8. Lighting state model

### Normal classroom state
- bright enough for comfortable navigation without eye strain
- desk tops, chair silhouettes, floor edges, doorways and wall details readable at a glance
- daylight/classroom-practical balance rather than horror contrast
- neutral-to-warm ordinary room feel with soft cool fluorescent influence where appropriate
- enough local contrast for depth, but no intentional black crush
- signage and small interactable silhouettes readable without a flashlight-like presentation
- lighting should support humor and social observation, not signal danger

### Special-event / uncanny state
- triggered only by authored narrative state
- may shift color temperature, practical-light balance, ambient fill, local contrast or one fixture's stability
- may become darker than normal, but the room must remain navigable
- one or two local lighting changes are preferred over a global “everything turns black” treatment
- no rapid strobe; any flicker is subtle, sparse and event-linked
- returning to normal should visibly restore the ordinary baseline

The intended contrast is: **ordinary room first → something is slightly wrong**, not **dark room → darker room**.

## 9. Spatial scope

The first slice should remain concentrated around:
- one main classroom/room
- its immediate threshold/door area
- only the minimum adjacent space needed for entry/exit/loading or a short transition

Do not expand into a full school/campus map for this slice.

A canonical campus topology is explicitly out of scope and remains `TBD_USER_APPROVAL_CAMPUS_MAP`.

## 10. Production priorities

Priority order for the next implementation phase:
1. establish the bright readable classroom baseline
2. reuse and visually consolidate existing classroom assets
3. make the room feel occupied by believable student-life props and interaction density
4. harden controls/collision needed inside this room
5. create generic social/humor interaction hooks
6. add only the minimum event-state machinery needed for one subtle informational and/or physical contradiction
7. verify before/after lighting and interaction readability in the actual browser build

## 11. Acceptance for the room-focused slice

The slice is ready for user review when:
- the room is comfortable to read in its default state
- the player can understand floor, furniture, exits and interaction targets without darkness obscuring them
- reused desks/chairs/classroom props feel intentionally arranged rather than like a test grid
- at least several ordinary interactions make the room worth exploring
- social/humor hooks exist as placeholders without inventing important NPC canon
- uncanny state changes are clearly distinguishable from normal because the normal state is genuinely ordinary
- no institutional identity or major narrative canon has been silently introduced
- runtime remains browser-friendly and responsive

## 12. Next implementation tasks

Dependency order:
1. **Bright baseline classroom composition pass** — strip dark-by-default assumptions and establish readable normal lighting.
2. **Room asset reuse/layout pass** — reuse desks/chairs/teacher desk/notice board/fixtures/cabinet/sign mount and improve spatial composition.
3. **Room collision + input hardening** — finish only the control/safety work necessary for a reliable room-focused slice.
4. **Student-life interaction layer** — generic seat, desk, phone, notice, socket/charger and small-prop interactions.
5. **Micro-event framework** — generic non-canon hooks for awkward/social/humor events using `TBD_USER_APPROVAL_*`.
6. **Uncanny state hook** — one informational and one optional physical contradiction slot, both still awaiting narrative approval.
7. **Normal-vs-event lighting controller** — event-local lighting changes rather than global dark baseline.
8. **Actual-browser visual/regression review** — same camera angles for normal/event states, readability, controls, console/network and performance.

## 13. User approval required next

Before this technical slice becomes canonical narrative content, user approval is required for:
- whether this is actually canonical Chapter 1
- exact first-day/classroom story premise
- exact social/humor beats and dialogue
- important NPC identities/roles
- protagonist final name/look/personality details
- exact uncanny contradiction(s)
- any school/university name, logo, colors, slogan or recognizable institutional identity
- final room/campus relationship and canonical map topology

## 14. Latest retained-room correction checkpoint

The latest user playtest corrections are now part of the implementation direction for any retained classroom shell:
- visible ordinary room labels use the approved working examples `P 202` and `P 204`; complete building topology remains `TBD_USER_APPROVAL`
- classroom desks and chairs are solved through reusable environment modules rather than one-off geometry; current pass fixes chair orientation, floor alignment, collision footprint and overly perfect placement
- the corridor-to-classroom doorway uses a reusable fitted-opening convention so frame, header infill and leaf dimensions agree with the wall opening
- the normal classroom presentation is bright/readable by default; darker/KCR lighting is treated as an event state

These corrections are technical/presentation decisions only. They do not approve a canonical university, room map, chapter premise, important character or final uncanny event.


## 14. Classroom production layout override — 2026-10-02

This section is the current spatial source of truth for the production classroom pass.

Latest user-directed layout:
- **10 student rows**
- **3 separated desks per row**
- **30 desks total**
- **2 seats per desk** (approximately 60 student seats)
- each row reads left / center / right across the room
- desks remain separated by believable walking lanes
- students sit behind the desks and face the front board
- the classroom footprint is intentionally larger and the ceiling noticeably higher than the earlier prototype room

Current implementation orientation:
- board/front = +X
- rows progress from the rear toward +X
- each desk's long edge runs across the room (Z axis)
- chairs sit on the rear side of each desk relative to the board
- from the back row looking toward the board, the main entrance is on the **left wall**, close to the front wall
- the teacher desk is shifted to the **right side**, aligned with the inner/right desk column
- the board is enlarged and kept flat/aligned to the front wall

These are spatial/layout approvals only. Teacher identity, exact teaching behavior, institutional identity, and narrative meaning remain behind the existing USER APPROVAL gates.
