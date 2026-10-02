# P202 Room-Focused Student Slice

Status: **DRAFT — NOT CANON — USER APPROVAL REQUIRED FOR NARRATIVE CONTENT**  
Date: 2026-10-02  
Working production focus: P202 golden classroom

## 1. Direction

Its working role is a **small, dense, room-focused Vietnamese student-life slice** built around one classroom/main room. The player's ordinary student experience is the primary source of charm: arriving, finding a place, handling small objects, reading the room, dealing with awkward social moments, checking information, and reacting to mundane problems.

This document defines room-level production direction, not detailed chapter canon. Exact dialogue, important characters, chapter events, official branding assets, and final room-to-building topology remain behind `USER_APPROVAL_GATES.md`.

## 2. Role of P202

P202 is a **production/gameplay proving room**. It must not be mistaken for the whole current Giảng đường 4 map or assigned to a final story beat until the active environment update is reviewed.

It should prove that a single classroom can support believable student-life roleplay, polished interactions, short social/comedic moments, and reusable production systems before the project expands its world.

## 3. Reusable foundations

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
- generic fact/event infrastructure where useful
- conditional presentation/state infrastructure where useful

Reuse is preferred to rebuilding equivalent props. Assets may be visually upgraded without changing their generic identity.

## 4. Presentation baseline

Normal P202 presentation should be bright, ordinary, readable and active.

Avoid making the room depend on near-black lighting, abandoned-building grime, constant tension effects, or other presentation that conflicts with the student-life baseline.

Special-event lighting may exist later, but only when an approved event needs it.

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

## 7. Event-state hooks

Generic room state changes may be supported technically when a later approved scene needs them.

No special narrative event is canon in this document.

## 8. Lighting state model

### Normal classroom state
- bright enough for comfortable navigation without eye strain
- desk tops, chair silhouettes, floor edges, doorways and wall details readable at a glance
- daylight/classroom-practical balance rather than dramatic contrast
- neutral-to-warm ordinary room feel with soft cool fluorescent influence where appropriate
- enough local contrast for depth, but no intentional black crush
- signage and small interactable silhouettes readable without a flashlight-like presentation
- lighting should support humor and social observation, not signal danger

### Optional authored event state
- triggered only by authored narrative state
- may shift color temperature, practical-light balance, ambient fill, local contrast or one fixture's stability
- may become darker than normal, but the room must remain navigable
- one or two local lighting changes are preferred over a global “everything turns black” treatment
- no rapid strobe; any flicker is subtle, sparse and event-linked
- returning to normal should visibly restore the ordinary baseline

Normal classroom presentation remains the reference state. Any alternate state must be scene-specific and user-approved.

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
6. add event-state machinery only when an approved gameplay sequence needs it
7. verify lighting and interaction readability in the actual browser build

## 11. Acceptance for the room-focused slice

The slice is ready for user review when:
- the room is comfortable to read in its default state
- the player can understand floor, furniture, exits and interaction targets without darkness obscuring them
- reused desks/chairs/classroom props feel intentionally arranged rather than like a test grid
- at least several ordinary interactions make the room worth exploring
- social/humor hooks exist as placeholders without inventing important NPC canon
- no unapproved official branding or detailed narrative canon has been silently introduced
- runtime remains browser-friendly and responsive

## 12. Next implementation tasks

Dependency order:
1. **Bright baseline classroom composition pass** — strip dark-by-default assumptions and establish readable normal lighting.
2. **Room asset reuse/layout pass** — reuse desks/chairs/teacher desk/notice board/fixtures/cabinet/sign mount and improve spatial composition.
3. **Room collision + input hardening** — finish only the control/safety work necessary for a reliable room-focused slice.
4. **Student-life interaction layer** — generic seat, desk, phone, notice, socket/charger and small-prop interactions.
5. **Micro-event framework** — generic non-canon hooks for awkward/social/humor events using `TBD_USER_APPROVAL_*`.
6. **Optional event-state hook** — add only when an approved scene needs it.
7. **Normal-vs-event lighting controller** — keep event-local rather than dark-by-default.
8. **Actual-browser visual/regression review** — same camera angles for normal/event states, readability, controls, console/network and performance.

## 13. User approval required next

Before this technical slice becomes canonical narrative content, user approval is required for:
- which approved chapter/event ultimately uses this room
- exact first-day/classroom story premise
- exact social/humor beats and dialogue
- important NPC identities/roles
- protagonist final name/look/personality details
- official UET logo/colors/insignia/slogan or other branded visual identity
- final room/campus relationship and canonical map topology

## 14. Latest retained-room correction checkpoint

The latest user playtest corrections are now part of the implementation direction for any retained classroom shell:
- visible ordinary room labels use the approved working examples `P 202` and `P 204`; complete building topology remains `TBD_USER_APPROVAL`
- classroom desks and chairs are solved through reusable environment modules rather than one-off geometry; current pass fixes chair orientation, floor alignment, collision footprint and overly perfect placement
- the corridor-to-classroom doorway uses a reusable fitted-opening convention so frame, header infill and leaf dimensions agree with the wall opening
- the normal classroom presentation is bright/readable by default; any altered lighting is treated as a specific event state

These corrections are technical/presentation decisions only. They do not approve the final room-to-building topology, detailed chapter premise, important character, or official branded visual identity.


## 15. Relationship to current Giảng đường 4 production

The user has approved UET as the story setting/context and reports that a larger Giảng đường 4 map update is currently being produced on the parallel art branch.

Until that update lands and is reviewed:
- treat this P202 document as a room-level technical reference
- do not assume P202 defines the whole building
- do not force the Giảng đường 4 map to preserve obsolete room topology
- reuse interaction/asset lessons where compatible
