# V2 Foundation Visual / Runtime Audit

Date: 2026-10-02  
Branch audited: `phase-v2/foundation-hardening` at draft base `f8cf7cb8c87e140434fbbecbbb77b0af7160f6d0`  
Preserved checkpoint: `chapter-1-vertical-slice` → `aed65649ddbcd910f0969c6aefa236f34d33edf3`

## Method

This audit was performed against the actual Babylon.js build on `VOSTRO-COREI7G13`, not from code or concept art.

- dedicated Vite server: `http://127.0.0.1:5174/`
- fresh Chrome profile with its own remote-debugging port
- production save cleared before runs
- trusted browser key input used for opening / traversal
- representative views captured directly from the rendered canvas
- runtime position, input, pointer-lock, console/network and frame timing sampled through the live build
- full clean runtime flow also traversed through KCR-A and the Chapter 1 boundary to capture post-KCR/boundary states

The existing Chapter 1 is evaluated only as a technical/tonal prototype. This audit does not promote its narrative or institutional identity to Game Pivot V2 canon.

## Screenshot evidence

The original broad audit used a temporary capture set across spawn, gate, guard, old-wing, corridor, classroom, PA-room and final-boundary viewpoints. The durable evidence retained for the latest approved room-focused direction is:

- before corrections: `docs/playtest/v2-room-corrections-before/`
- after corrections: `docs/playtest/v2-room-corrections-after/`

These retained captures cover the active classroom readability, furniture, signage and doorway corrections. The old whole-route dark prototype remains historical evidence only and no longer defines the target baseline.

## Collision / playable bounds

**High-severity reproduced defect.**

Starting from the clean initial spawn at approximately `(0, 0.009, -22.2)`, holding **S** crosses the rear edge of the authored ground almost immediately.

Observed samples:

- 0.0 s: Y ≈ 0.009, Z = -22.20
- 0.5 s: Y ≈ 0.009, Z ≈ -23.54
- 1.0 s: Y ≈ -0.93, Z ≈ -24.89
- 2.0 s: Y ≈ -4.03
- 4.0 s: Y ≈ -10.23
- 8.0 s: Y ≈ -22.63

The yard floor is only 16 m deep, centered at Z=-16, so its rear edge is Z=-24 while the spawn is already at Z=-22.2. There is no believable containment or runtime recovery when the player leaves it.

Required correction:
- continuous exterior support behind/around the spawn
- visible believable perimeter treatment rather than a naked invisible wall
- reachable-edge regression
- out-of-bounds recovery to the current durable checkpoint

## Input responsiveness

Baseline live stress results:

- W + continuous look delta: movement axes stayed `z=1` and position advanced continuously
- W+A and W+D both produced normalized diagonal axes and continuous displacement
- rapid direction switching returned cleanly to zero axes
- after document inspection cancel, locomotion/look returned to gameplay and W moved immediately
- ~60 FPS was observed during the initial fall/runtime audit

A pointer-lock lifecycle defect was reproduced:

1. W is held while pointer lock is active → axes = `{x:0,z:1}`
2. pointer lock exits → InputRouter clears pressed keys
3. pointer lock is immediately reacquired while W is still physically held → axes remain `{x:0,z:0}`
4. movement resumes only after a fresh keydown

This can present as a brief or persistent movement “hitch” after an unintended/transient pointer-lock loss. Window blur also clears key state; blur clearing is desirable for stuck-key safety and should remain.

A collision-response hardening pass is also warranted because horizontal motion and the ground-stick vertical vector are currently combined into a single `moveWithCollisions` call.

## Signage

**High-severity reproduced visual defect.**

Rendered screenshots show mirrored/reversed text on:
- school/gate sign
- classroom sign
- PA-room sign

The sign helper creates a single textured plane with `backFaceCulling = false`. Intended player viewpoints can therefore see the back of the texture, which renders mirrored text. The old-wing sign uses the same helper and is also orientation-risky.

Required correction:
- front-only text surface
- visible non-text backing/mount where the rear is reachable
- data-driven facing/orientation rather than relying on accidental plane winding
- regression coverage for expected sign face orientation

## Lighting / readability

The build is still substantially too dark even though the BAC-30 pass increased exposure.

Actual rendered findings:
- spawn/rear view contains large near-black regions with very weak floor/environment separation
- exterior geometry outside the local practical light disappears into black
- old-wing entrance is readable only because the central fluorescent strip is bright; side massing lacks separation
- corridor lower walls and floor merge into dark values over long stretches
- classroom desks are mostly silhouette; the room has poor depth separation and little clue/interactable hierarchy
- PA room pre-KCR is underlit; the station layout is readable only at close range
- PA room post-KCR changes are too subtle from the representative room view to provide a strong authored visual beat
- final boundary UI is readable, but the physical environment behind it is almost entirely lost

The problem is local composition, material response and practical-light distribution, not simply global exposure.

## Geometry / materials / clutter / repetition

The actual build confirms the documented art debt:
- primary environment shells are large boxes with flat faces
- doors, signs and fixtures lack frames/mounting detail
- guard area has only a minimal shell/desk/key rack/raincoat/flashlight arrangement
- classroom furniture repeats identical proportions with little secondary detail
- PA stations repeat strongly and read as a grid of primitive assemblies
- walls/floors have no authored surface breakup beyond flat material color
- there are almost no sockets, conduit, trim, thresholds, skirting, frames, edge wear, restrained stains or ordinary active-building clutter
- long empty wall runs and repeated furniture make spaces feel prototype-like rather than inhabited

The environment should remain an active university/school-like place, not an abandoned asylum. Detail should therefore be ordinary, restrained and reusable.

## Navigation readability

Strengths:
- the old-wing entrance axis is structurally clear
- corridor topology is simple and understandable
- classroom/PA-room doors are consistently located from the corridor

Weaknesses:
- darkness removes floor/wall/door separation
- mirrored signage actively harms room identification
- exterior playable limits are not visually communicated
- identical/repetitive surfaces provide few orientation landmarks

## Performance / runtime health

Baseline audit:
- approximately 60.3 FPS in the fresh-profile runtime sample
- no runtime exceptions during the fall reproduction
- no unexpected console issues in that sample
- no HTTP >=400 responses in that sample

The current scene is cheap primarily because it is simple; the V2 art pipeline must preserve browser budgets while adding visual quality through reuse, instancing, texture discipline and bounded lighting.

## Audit conclusion

The user-reported defects are grounded in the live build:

1. fall-out-of-world: **reproduced**
2. mirrored/reversed signage: **reproduced**
3. intermittent movement hitch: **pointer-lock held-key loss reproduced; normal W+mouse/diagonal/post-cancel movement otherwise responsive in the baseline audit**
4. scene too dark: **confirmed from actual screenshots**
5. graphics rough/unfinished: **confirmed from actual screenshots**

No USER APPROVAL creative decision is required to harden these foundations. All new generic visual systems must remain non-canon and institutional identity must remain `TBD_USER_APPROVAL_*`.

## 2026-10-02 direction supersession and classroom correction addendum

After the original runtime audit, the user changed the approved baseline direction. The earlier dark/night readability analysis above remains valid evidence about the preserved old prototype, but it **no longer defines the target look for new normal gameplay**.

Current approved baseline:
- ordinary student-life scenes are bright, readable and familiar
- darkness/uncanny lighting is reserved for specific authored twist/event states
- the next slice is room-focused rather than a full-school expansion
- generic classroom assets should be reused and improved through reusable modules

Durable before/after evidence for the latest classroom corrections:
- before: `docs/playtest/v2-room-corrections-before/`
- after: `docs/playtest/v2-room-corrections-after/`

Actual Chrome verification now confirms:
- room labels use the approved working examples `P 202` and `P 204`; final building topology/room map remain `TBD_USER_APPROVAL`
- student desks now use the reusable classroom desk module; chair back orientation is corrected and the repeated placement has restrained per-seat variation
- desk collision uses a low physical footprint instead of a tall invisible blocker
- classroom door opening now uses a reusable fitted-opening module with frame plus wall header infill
- the door leaf was resized to fit the inner frame in the closed state while remaining usable when open; both corridor-side and room-side views were captured
- the classroom normal-state lighting/material response is substantially brighter and no longer black-crushed

Measured classroom prototype values in the verified after build:
- exposure: `1.4`
- baseline ambient intensity: `1.15`
- classroom primary light intensity: `2.35`

These values are implementation tuning, not canon or final art direction constants.

Remaining art debt is still material: geometry is mostly procedural/simple, student clutter is sparse, daylight/window treatment is rudimentary, and no final institutional identity or character appearance has been introduced.

## Latest Chrome smoke — room-correction checkpoint

Final real-browser smoke after the room-focused corrections:
- backward traversal from clean spawn ran for ~4.8 s and stopped at `Z ≈ -31.166` with player `Y ≈ 0.01`; the previous fall-out-of-world path did not recur
- classroom door open: corridor → room traversal reached `X ≈ 2.86`
- classroom door open: room → corridor traversal reached `X ≈ 0.30`
- classroom door closed: traversal was blocked at `X ≈ 1.089` and did not pass through the leaf
- sampled runtime performance: ~`60.06 FPS`
- runtime exceptions: `0`
- console warning/error entries: `0`
- HTTP responses `>=400`: `0`

Machine-readable evidence: `docs/playtest/v2-room-corrections-after/runtime-smoke.json`.
