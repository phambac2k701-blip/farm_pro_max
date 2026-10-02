# Project Master Plan

## Product definition

The project is now a **browser-first true-3D first-person student-life narrative game** set at a fictional technology university in Hanoi.

The primary material comes from grounded university-life experiences: entering university, learning the campus, classrooms, classmates, awkward social moments, study routines, deadlines, commuting, food, breaks, projects, exams, and the gradual change from a new student into a more experienced one.

The current narrative scope should be built from experiences covering **the beginning of university through the protagonist's current second-year period**. Later years are not to be invented merely to fill a roadmap. If the project continues in the future, later student-life material may be added when there is enough lived, observed, researched, or intentionally fictionalized material to support it.

The previous narrative framework is retired and is not project canon.

## Product pillars

### 1. Lived student presence
- true 3D first-person space
- grounded movement and camera
- believable room scale
- ordinary Vietnamese student-life detail
- environments should feel inhabited before they feel dramatic

### 2. Student-life interaction
Gameplay should make ordinary actions enjoyable:
- entering class
- finding or changing seats
- sitting and standing
- checking a phone
- interacting with bags, books, laptops, papers, chargers and classroom equipment
- talking or reacting to classmates
- navigating routine university spaces

### 3. Humor from believable situations
Humor should come from awkwardness, classmates, internal reactions, timing, procrastination, misunderstandings and everyday student behavior rather than detached comedy scenes.

### 4. Player agency with controlled production scope
Small choices may create short alternate reactions or micro-events and then converge back into the main scene when appropriate.

Major branching is reserved for decisions that genuinely justify long-term consequences.

The game should feel responsive without requiring every small choice to create a permanently separate timeline.

### 5. Modular world production
Build the world as reusable modules and scene zones:
- classroom prefab / golden classroom
- corridor modules
- stairs / transition zones
- parking or campus-life zones
- reusable props and furniture
- later room variants created from shared assets rather than rebuilding from zero

### 6. Secondary uncanny layer
Uncanny, altered-reality or psychologically strange material may still exist, but its final role, rules and explanation are **not yet canon**.

Normal gameplay remains bright, readable and ordinary. Any strange presentation should be event-specific.

## Current structural target

The project may still use approximately **nine chapters**, but the old nine-chapter outline has been removed.

The new nine-chapter structure must be designed from the real student-life timeline before chapter-level implementation begins.

Do not invent Chapter 4–9 merely to satisfy the number nine.

## Current production focus

1. finish the P202 classroom as the first reusable "golden room"
2. establish the classroom asset/prefab pipeline
3. build the first polished student-life gameplay sequence inside P202
4. establish reusable NPC, dialogue, phone and micro-event foundations only as needed
5. prove a modular zone transition outside the classroom
6. only then expand to additional rooms/areas
7. design the full chapter structure before chapter-by-chapter narrative production

## Preserved technical foundations

The following systems from earlier development remain reusable where they fit:
- Babylon.js / TypeScript / Vite runtime
- WebGPU with WebGL fallback
- first-person controller
- collision and safety recovery
- interaction targeting/state ownership
- camera choreography
- openable/pickup/inspection behaviors
- save/load and world-state infrastructure
- audio director
- generic event/state architecture
- modular environment/material/signage work
- testing/build/deployment infrastructure

Legacy story-specific content is not preserved merely because the systems that hosted it are reusable.

## Approval rule

The user is the primary writer and final narrative authority.

Final chapter structure, major story beats, important characters, institutional identity, major twists, endings and any final explanation of the uncanny layer require explicit user approval.
