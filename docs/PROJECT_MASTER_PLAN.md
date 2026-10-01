# Project Master Plan

## Product definition
**Người Thứ Chín** is a browser-first 3D first-person psychological investigation game told in short chapters. The player explores realistic Vietnamese locations, inspects objects through tactile micro-cinematic interactions, collects evidence, forms hypotheses, and discovers that new knowledge can physically alter previously explored spaces.

## Product pillars

### 1. Presence
The player must feel physically present in the location.
- true 3D space
- free first-person look
- grounded walking
- believable camera acceleration/deceleration
- spatial audio
- convincing lighting and scale

### 2. Tactile investigation
Important clues are not merely UI cards.
The player approaches, focuses, reaches, opens, turns, reads, listens, rotates, or otherwise inspects them.

### 3. Knowledge Changes Reality
Discoveries modify world state.
The player may revisit a room and notice a changed object, new door, missing photograph, extra desk, altered note, or different sound.

### 4. Familiar unease
Horror comes from ordinary places becoming subtly wrong.
The design avoids relying on constant jumpscares.

### 5. Short, dense chapters
Each chapter should be compact enough to polish heavily.
Exploration density is valued over map size.

---

# Production phases

## Phase 0 — Pre-production and foundations
### Goal
Remove ambiguity before code volume grows.

### Deliverables
- game vision
- story premise and mystery rules
- gameplay spec
- technical requirements
- architecture
- art bible
- audio direction
- interaction language
- content pipeline
- save/state strategy
- testing/playtest strategy
- roadmap/issues

### Exit criteria
- one coherent technical stack
- one coherent gameplay loop
- prototype scope no larger than one small location cluster
- no unresolved decision that would invalidate the controller, interaction architecture, or content format

---

## Phase 1 — Movement prototype
### Goal
Prove the game feels good before building story content.

### Prototype environment
- one hallway
- one classroom
- one door
- one desk
- one interactable book

### Systems
- pointer lock
- mouse look
- keyboard movement
- sprint decision documented; disabled initially unless it improves feel
- crouch decision documented; not required for first prototype
- collision
- stairs/ramp tolerance if used
- head motion restrained and optional
- camera smoothing
- FOV settings
- pause/escape behavior

### Exit criteria
- stable movement
- no obvious camera jitter
- no clipping through walls
- acceptable feel at 60 FPS target
- mouse sensitivity adjustable
- interaction prompt is readable but unobtrusive

---

## Phase 2 — Interaction prototype
### Goal
Prove an object can feel physically inspectable.

### Hero interaction: book
Flow:
1. player approaches desk
2. reticle/prompt subtly indicates interactability
3. player activates interaction
4. locomotion is suspended
5. camera eases to an authored inspection anchor
6. book enters inspect state
7. opening animation plays
8. page content becomes legible
9. player can advance pages
10. evidence can be discovered
11. exit reverses or blends out
12. control returns without camera snap

### Required interaction primitives
- focus target
- camera blend
- object animation
- interaction lock
- audio cue
- readable overlay/support UI
- conditional content by world state
- cancel/exit

### Exit criteria
The book interaction is polished enough to represent the interaction standard for the rest of the game.

---

## Phase 3 — Investigation loop
### Goal
Make the game more than walking.

### Systems
- evidence registry
- evidence acquisition
- case journal
- evidence detail view
- hypothesis graph/data model
- discovery conditions
- chapter objective state
- persistent world facts

### Exit criteria
The player can discover a clue, see it recorded, and have that knowledge unlock or alter another investigation opportunity.

---

## Phase 4 — Reality shift
### Goal
Prove the signature mechanic.

### Prototype example
Initial state:
- classroom contains 8 student desks
- old class photo shows 8 recognized students

Knowledge event:
- player discovers archived attendance evidence indicating a ninth seat/student record

Shift:
- after a controlled transition/revisit, classroom contains a ninth desk
- a new notebook exists at that desk
- sound/lighting changes subtly
- no explicit “world changed” popup

### Exit criteria
The player can notice the change without the game explaining it directly.

---

## Phase 5 — Vertical slice: Chapter 1
### Location scope
- exterior arrival
- school corridor
- classroom
- stair landing
- broadcast/archive room or equivalent final room

### Content
- opening hook
- 3–5 meaningful interactables
- 2–3 evidence items
- one audio clue
- one reality shift
- one chapter-ending reveal

### Exit criteria
A new player can play from start to chapter end without developer intervention.

---

## Phase 6 — Production systems
- save/load
- chapter state
- settings
- localization-ready text pipeline
- content authoring format
- asset streaming/preloading
- analytics only if intentionally chosen
- accessibility settings
- robust error handling

---

## Phase 7 — Chapters 2–9
Each chapter gets its own spec and implementation plan.
Do not build all chapters in one giant content branch.

---

## Phase 8 — Polish
- performance profiling
- loading transitions
- lighting pass
- sound pass
- animation pass
- interaction consistency pass
- narrative continuity pass
- accessibility pass
- browser compatibility pass

---

# Backlog priority order

## P0
- movement/camera feel
- collision
- interaction framework
- saveable world state
- evidence system
- reality-shift mechanic
- performance

## P1
- advanced lighting
- authored camera choreography
- UI polish
- audio occlusion/positioning
- chapter tooling
- automated asset validation

## P2
- controller/gamepad support
- optional advanced graphics settings
- mobile experimentation
- cloud saves
- accounts
- social features

## Explicitly out of MVP
- multiplayer
- open city
- combat
- procedural world generation
- full NPC simulation
- mobile-first controls
- live service backend
