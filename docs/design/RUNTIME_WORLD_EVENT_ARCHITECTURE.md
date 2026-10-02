# RUNTIME WORLD & EVENT ARCHITECTURE — UET KHÔNG TỆ

Status: **APPROVED PRODUCTION DIRECTION**
Date: 2026-10-02
Owner of final creative decisions: **User / primary writer**

## 1. Experience target

The game should feel like a small open world built around ordinary Vietnamese student life:
- free first-person movement inside authored spaces
- player-driven approach to events and interactions
- multiple local choices and reactions
- recurring people, places, habits and callbacks across chapters
- chapter stories that remain distinct while still forming one continuous life

The project takes inspiration from the feel of Vietnamese everyday-life narrative games, but must remain its own game, setting, structure and implementation.

## 2. Bounded-open-world rule

“Open world” here does not mean one giant permanently loaded simulation.

The intended architecture is:
- a small fixed set of major authored maps
- one major gameplay map active at a time
- local zones within that map activated at different fidelity levels
- event/state layers applied on top of reusable map geometry

Do not duplicate a whole map for each chapter, route or event state.

## 3. Four-map residency rule

Current major map scope remains:
1. Giảng đường 4
2. Giảng đường Xuân Thủy
3. Khu phố / phố trà đá
4. Hòa Lạc / khu quân sự

At runtime, only the currently visited major map should be resident at full gameplay fidelity.

Other major maps should be unloaded/disposed rather than kept hidden in the same live scene.

Inside the active map, use zone-level fidelity:
- **FULL** — current event/interior/nearby gameplay zone
- **NORMAL** — nearby traversable context
- **LIGHT** — visible but currently unimportant zones
- **BACKGROUND** — cards, impostors, simplified distant geometry or other non-gameplay representation

The player should perceive a coherent world even when the engine is simulating only the relevant part of it.

## 4. Event-over-map rule

Maps are reusable spatial foundations.

Chapter/event differences should normally be expressed through state such as:
- NPC presence and behavior
- props and interactables
- dialogue
- timetable/context
- doors and access state
- audio
- local lighting when justified
- event triggers and world facts

Do not create separate near-identical map copies only because the story state changed.

## 5. Branch-and-reconverge rule

Most ordinary choices should create a **micro-branch**:
1. player chooses an option
2. the game gives a distinct local reaction/consequence
3. the player may receive a joke, observation, small interaction or temporary inconvenience
4. the branch naturally reconverges into the prepared story path

Do not present ordinary alternatives as explicit “wrong choice” UI.

Prefer in-world soft gating:
- discomfort
- awkwardness
- lack of progress
- repeated low-value state
- a believable reason to reconsider
- environmental or social feedback

A non-primary option should still feel like real content, not a fake button.

## 6. Persistent-choice rule

Only decisions with clear long-term narrative value should create persistent facts or extended routes.

Examples of persistent state may include:
- relationship facts
- whether the protagonist helped or ignored someone
- whether something was learned, kept, lost or revealed
- a small number of major decision gates

Avoid multiplying permanent routes from every choice.

The event system should favor:
**many local variations + few persistent consequences + controlled reconvergence**.

## 7. Ending/terminal-outcome boundary

The architecture may support future major terminal outcomes or ending variants.

This document does **not** author or approve any concrete ending, Chapter 4+ content, final moral, future-life event or route.

Those remain under USER_APPROVAL_GATES.md.

## 8. Runtime asset classes

Optimize assets according to gameplay role:

### Static world
- merge or batch where useful
- reuse materials
- freeze static transforms where safe
- simplify distant architecture

### Repeated non-interactive assets
- prefer instances/thin instances or equivalent batching
- examples: desks, chairs, vegetation, repeated fixtures

### Event/interactable assets
- keep modular only when gameplay needs independent state, movement, animation or interaction

### Background-only content
- use 2D cards, impostors, simplified distant meshes or AI/authored perspective imagery
- do not build expensive unreachable 3D detail

## 9. Simulation-bubble rule

Spend CPU/GPU/content budget on what the player is currently experiencing.

NPCs, animation, interaction, collision and detail should degrade or sleep outside the relevant gameplay zone.

A future NPC implementation should distinguish at least:
- event/hero NPCs
- nearby ambient NPCs
- background crowd representation

Do not run full AI/animation/interaction logic for distant background population.

## 10. Production consequence

Performance optimization is part of content architecture, not a late polish task.

The approved Giảng đường 4 foundation establishes the current reference point:
- about 59 FPS in the final BAC-45 review
- 2549 meshes
- about 471k vertices
- clean runtime/console/network review

Next production work must preserve that baseline while applying these rules:
1. keep only the currently visited major map at full gameplay residency
2. use FULL / NORMAL / LIGHT / BACKGROUND fidelity by active-zone importance
3. batch/instance/merge repeated static content
4. keep collision and interaction only where gameplay needs them
5. use cards/impostors/simplified geometry for background-only content
6. add character/event cost only inside explicit approved budgets

This architecture does not authorize starting character, NPC/event or second-map production by itself.

The goal is not minimum visual quality.
The goal is minimum runtime cost for the intended visual and gameplay result.
