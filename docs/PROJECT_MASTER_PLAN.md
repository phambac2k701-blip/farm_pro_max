# Project Master Plan

## Product definition

**UET không tệ** is a browser-first true-3D first-person student-life narrative game following the timeline of a UET student in Hanoi.

The game is grounded in lived/observed student experience. It should feel like one continuing life rather than a collection of disconnected episodes.

The current story scope reaches from entering university through the creator/protagonist's current second-year-era material. It is intentionally open-ended.

Future chapters may be added later. Do not fabricate later university years merely to complete a fixed chapter count or create a premature ending.

## Current approved macro

The current macro is documented in `docs/design/CURRENT_STORY_MACRO.md`.

Approved only at high level:
- Chapter 0 — entering university / first Hanoi-UET impressions / admission-confirmation period
- Chapter 1 — military-training period
- Chapter 2 — normal university life begins; Giảng đường 4 becomes a major location
- Chapter 3 — broader everyday student life; vibe coding begins to reflect the creator's present self
- Chapter 4+ — locked / future life / not designed

Detailed scenes/events remain TBD until the user supplies and approves them.

## Product pillars

### 1. Lived student presence
- true 3D first-person space
- grounded movement and camera
- believable environment scale
- ordinary Vietnamese student-life detail
- places should grow more meaningful through repeated use

### 2. One continuous life
Chapters must link to each other through:
- recurring people
- recurring places
- evolving habits
- callbacks
- jokes
- relationships
- foreground details that later pay off

Avoid anthology-like chapters that could be shuffled without changing anything.

### 3. Student-life interaction
Gameplay should make ordinary actions enjoyable:
- arriving somewhere
- finding/changing a seat
- sitting/standing
- checking a phone
- interacting with bags, books, laptops, papers, chargers and classroom equipment
- talking/reacting to people
- commuting/navigating student-life spaces
- using ordinary routines as gameplay context

### 4. Humor from believable situations
Humor should come from awkwardness, timing, expectation-vs-reality, friends, commuting friction, misunderstandings and recognizable student behavior.

### 5. Study as background structure
Academic life matters, but it should not dominate the whole game.

Use classes, schedules, assignments and exams as context for:
- where people meet
- why they move
- why they are tired/busy/free
- why a place matters
- why a joke or conflict happens

### 6. Foreground details should matter
Background can simply make the world feel alive.

Anything deliberately foregrounded by camera, dialogue, interaction or repeated emphasis should have a reason to matter later through character, comedy, emotion, gameplay or continuity.

### 7. Player agency with controlled production scope
Small choices may create short alternate reactions/micro-events and then reconverge.

Major branching is reserved for decisions that genuinely justify long-term production cost.

### 8. Modular world production
Build the world as reusable modules/zones:
- Giảng đường 4 map and room modules
- classroom prefabs
- corridors/stairs/transitions
- campus/commuting/food/student-life locations
- reusable props/furniture
- later variants built from shared assets

## Current production focus

Narrative and art are running in parallel.

Art/environment:
- active visible branch: `phase-v2/classroom-asset-production-v1`
- user reports a larger Giảng đường 4 map update is currently in progress
- do not interfere with that branch from narrative cleanup

Narrative:
- maintain current macro for Chapters 0–3
- do not design Chapter 4+
- next task is detailed Chapter 0 material after user provides it

Technical foundations remain reusable where they fit:
- Babylon.js / TypeScript / Vite
- WebGPU with WebGL fallback
- first-person controller
- collision/safety recovery
- interaction targeting/state ownership
- camera choreography
- generic save/state/event architecture
- audio director
- modular environment/material/signage foundations
- testing/build/deployment infrastructure

## Identity boundaries

Approved:
- project title: **UET không tệ**
- UET student-life setting/context

Not automatically approved:
- official UET logo
- official visual identity/colors
- insignia
- copied official signage system
- full canonical campus map
- any implication of official UET affiliation

## Approval rule

The user is the primary writer and final narrative authority.

Detailed chapter content, important characters, major relationship arcs, future chapters, major routes, endings, protagonist final identity/appearance, and official-brand visual use require explicit approval.
