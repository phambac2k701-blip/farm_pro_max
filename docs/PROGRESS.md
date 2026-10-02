# Progress

Last updated: 2026-10-02

## Current phase

**UET KHÔNG TỆ — NARRATIVE REFOUNDATION + GIẢNG ĐƯỜNG 4 PARALLEL ART PRODUCTION**

## Current narrative/cleanup branch

`cleanup/remove-legacy-story-v1`

This branch is intentionally separated from the active environment/art branch so narrative cleanup does not interfere with the user's reported big Giảng đường 4 update.

## Parallel art branch

Current local WIP branch verified on 2026-10-02:
- `phase-v2/gd4-geometry-corrections`
- committed base HEAD: `a7c6737085e77a72e390d30446d9d2c7c3505cdb`
- working tree contains uncommitted Giảng đường 4 geometry/review work

Do not checkout, reset, clean, overwrite, rebase or otherwise disturb that WIP from this narrative branch.

Reconcile narrative/production docs with the Giảng đường 4 implementation only after the active map work is explicitly reported complete.

## Current product identity

Approved:
- title: **UET không tệ**
- first-person 3D student-life narrative game
- UET student timeline in Hanoi
- humor and believable student behavior are core
- study is important context/background, not the only subject
- story is open-ended and may continue in future years

Not automatically approved:
- official UET logo/colors/insignia
- copied official institutional visual identity
- full canonical campus master map
- implication of official UET affiliation

## Current story macro

Authoritative current macro:
- `docs/design/CURRENT_STORY_MACRO.md`

Approved high-level direction:

### Chapter 0
- entering university
- admission-confirmation period
- first major contact with the Xuân Thủy/main-campus context
- new city, roads, traffic, metro, people, food, school
- protagonist comes from far away
- curiosity + overload + humor

### Chapter 1
- first-year military-training period
- approximately 45 days as current remembered scale
- communal life, routine, people, discipline, comedy
- chapter must carry relationships/details forward rather than become an isolated side-story

### Chapter 2
- ordinary university life actually begins
- Giảng đường 4 becomes an important location
- expectation vs reality
- everyday commuting/traffic/spatial friction can support humor
- study/class timetable provides structure but should not dominate the narrative

### Chapter 3
- broader everyday student life
- friends, movement, food, chats, habits, small incidents and routine
- vibe coding appears as a subtle reflection of the creator's current self
- the meta connection should remain understated

### Chapter 4+
- **LOCKED / NOT DESIGNED**
- do not write a finale
- do not add retrospective closure
- do not invent future-life chapters merely to satisfy a chapter count

Placeholder: `TBD_FUTURE_LIFE_CHAPTERS`

## Narrative continuity rule

Chapters must feel like one life, not an anthology.

Every chapter should identify:
- what carries in from the previous chapter
- what is being established for later
- which people/places/habits recur
- which foreground details deserve payoff

Background may simply create life.

Foreground emphasis should have a reason.

## Approved runtime/world-event architecture

Authoritative source:
- `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`

Approved direction:
- bounded-open-world feel rather than one giant permanently loaded simulation
- exactly one currently visited major map at full gameplay residency
- zone fidelity tiers inside the active map: FULL / NORMAL / LIGHT / BACKGROUND
- chapter/event state layered over reusable maps instead of duplicating maps per route
- ordinary choices create meaningful local reactions/micro-branches and usually reconverge
- only a small number of high-value decisions justify persistent long-term route state
- static/repeated/background content should be merged, instanced, simplified or card-based according to gameplay role
- distant NPC/collision/animation/interaction work should sleep or degrade outside the active simulation bubble
- future terminal outcomes/endings may be technically supported, but no concrete ending or Chapter 4+ content is approved by this architecture decision

## Legacy narrative status

The previous story package has been retired and removed from the active narrative source of truth.

Reusable technical/art infrastructure remains valuable where generic:
- TypeScript + Vite + Babylon.js
- WebGPU/WebGL foundation
- first-person movement/input
- collision/safety recovery
- interaction/camera systems
- generic save/state/events
- AudioDirector
- modular environment/material/signage foundations
- testing/build/deployment infrastructure

Story-specific runtime wiring should be removed or generalized only when doing so will not disrupt the active Giảng đường 4 production work.

## Current environment relationship

Current large-map scope:
1. Giảng đường 4
2. Giảng đường Xuân Thủy
3. Khu phố / phố trà đá
4. Hòa Lạc / khu quân sự

Source of truth:
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`
- `docs/art/ASSET_PRODUCTION_PIPELINE_V2.md`

Large maps are produced as authored scene shells first. Smaller repeated items such as bạt, ghế, bàn, doors, windows, fans, bags, bottles, signs and similar props are produced/sourced separately and then used for scene dressing.

The active art branch is currently moving toward the larger Giảng đường 4 map. Do not touch or reconcile that implementation until the user reports the big update is finished.

## Current asset-production order

1. keep Giảng đường 4 production isolated on the active art branch
2. keep the current four-map scope fixed
3. for future large maps, build shell/scale/traversal first
4. create/source small reusable assets only when a real map needs them
5. external assets are allowed only with clear source/license/provenance
6. integrate/reconcile Giảng đường 4 only after the user says the big update is complete

## Immediate narrative order

1. keep the current macro fixed at Chapters 0–3
2. wait for detailed Chapter 0 material from the user
3. organize Chapter 0 into scenes/events
4. identify links/payoffs into Chapters 1–3
5. repeat chapter-by-chapter only after user input
6. keep Chapter 4+ locked

## Existing preview

Current GitHub Pages preview may lag the new narrative/art direction until the active implementation branch is updated and deployed.
