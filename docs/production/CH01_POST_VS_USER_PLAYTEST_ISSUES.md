# Chapter 1 Post-Vertical-Slice User Playtest Issues

Status: **USER-REPORTED — REPRODUCTION / TRIAGE REQUIRED**  
Source checkpoint: `chapter-1-vertical-slice` / BAC-31 complete  
Purpose: preserve issues observed by the user after the formal BAC-31 gate.

These findings are not all the same type. Some are gameplay bugs, some are presentation/readability defects, and some are known unfinished art debt.

## 1. Out-of-bounds fall near starting area

User report:

- from the initial Chapter 1 starting area, moving backward/outward can leave the authored ground
- the player can fall below the world / out of the playable space
- exterior boundaries are insufficiently contained

Classification: **Gameplay / world-boundary bug**  
Priority: **High**

Expected follow-up:

- reproduce from clean spawn
- inspect all reachable exterior edges
- add believable playable-space containment
- add out-of-bounds failsafe restoring the latest safe checkpoint if player Y/world position becomes impossible
- verify no ordinary player movement can fall out of the map

Do not “fix” only by moving the spawn forward.

## 2. Mirrored / reversed room signage

User report:

- some Vietnamese room/classroom labels appear reversed or mirrored in-game
- the issue may depend on viewing angle / which side of a text plane is visible

Classification: **Visual/UI world-signage bug**  
Priority: **High**

Audit all visible DynamicTexture/text-plane signage, including at minimum:

- school/gate sign
- old-wing sign
- classroom sign
- PA/broadcast-room sign
- any other runtime-generated text planes

Expected result:

- player-facing text is readable from all intended gameplay viewpoints
- back faces must not expose mirrored text

## 3. Intermittent movement/input hitch

User report:

- movement sometimes feels “stuck” or briefly unresponsive
- issue can be noticed while moving and looking around

Classification: **Input / control responsiveness bug candidate**  
Priority: **High — reproduction required**

Reproduction matrix should include:

- hold W while continuously moving mouse
- W+A and W+D while looking
- rapid direction changes
- movement immediately after interaction enter/cancel
- pointer-lock loss/regain
- focus loss/regain
- collision-heavy traversal

Inspect:

- key-state clearing
- pointer-lock lifecycle
- InteractionSystem ownership
- CameraDirector ownership
- frame delta/clamping
- collision response
- accidental locomotion lock

Acceptance target: sustained WASD + mouse traversal feels continuously responsive during a multi-minute manual playtest.

## 4. Scene is still too dark

User report:

- current lighting remains too dark
- some areas lose environment readability
- player can struggle to read navigation, geometry, and interactable space

Classification: **Presentation / readability defect**  
Priority: **High**

This is not a request to make the scene look like daytime.

Expected direction:

- preserve night / rain / fluorescent mood
- improve local readability by area
- avoid large regions collapsing into black
- guide the eye with practical lighting
- inspect exterior, corridor, classroom, PA room before KCR, PA room after KCR, and chapter-end boundary separately

## 5. Visual quality remains rough / unfinished

User report:

- graphics currently look substantially unfinished
- environment still feels too simple and low-detail

Classification: **Known art-production debt, not a logic bug**

This matches the BAC-31 debt already recorded in `CH01_BAC31_FINAL_GATE.md`:

> scene art is still primarily procedural/simple geometry and standard materials rather than final authored environment assets

Follow-up belongs to a dedicated visual-production/art phase rather than a small bug-fix pass.

Areas to improve later include:

- authored/modular environment meshes
- better materials/PBR workflow
- believable surface variation
- doors/windows/frames
- furniture proportions/details
- PA equipment
- guard-area detail
- signage mounting
- cables/conduits
- restrained clutter
- decals/wear
- exterior depth
- stronger lighting composition

## 6. Subtle lighting instability / environmental effects

User suggestion:

- occasional light instability/flicker could improve atmosphere
- stronger environmental effects may help the scene feel less static

Classification: **Optional visual/atmosphere enhancement, not a bug**

Guardrail:

- use authored, restrained fluorescent instability
- do not add constant random strobing
- preserve gameplay readability
- keep the direction “real place, slightly wrong”

## 7. Required real-build visual audit

Before claiming the visual/presentation problems are resolved, the implementation agent should:

1. open the actual Chapter 1 build in Chrome on the authorized desktop
2. play from a clean save
3. capture representative screenshots
4. evaluate the actual rendered build rather than code alone
5. compare before/after viewpoints
6. document remaining art debt honestly

Representative viewpoints should include:

- spawn forward/backward
- gate / guard area
- old-wing entrance
- corridor
- classroom
- classroom signage
- PA-room signage
- PA room before KCR
- PA room after KCR
- final boundary

## 8. Relationship to the Game Pivot V2

The larger game-direction pivot does **not** erase these findings.

The `chapter-1-vertical-slice` checkpoint should remain preserved as a completed technical milestone, while these issues remain useful as:

- engine/control hardening input
- art-pipeline requirements
- lighting/readability lessons
- signage-system requirements
- world-boundary requirements

Any systems reused by the new Game Pivot V2 should avoid carrying these defects forward.
