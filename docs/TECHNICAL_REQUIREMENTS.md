# Technical Requirements

## Platform

Primary target: desktop browsers.

Supported baseline:
- modern Chromium-family browser
- Firefox modern browser
- Safari compatibility evaluated after implementation stability
- WebGPU preferred where available
- WebGL fallback required

## Stack

- TypeScript
- Vite
- Babylon.js
- Babylon.js glTF loader
- browser storage for current saves
- automated test runner
- lightweight state management; avoid heavy frameworks without demonstrated need

## Rendering

- physically plausible lighting where performance allows
- PBR materials
- GLB/glTF runtime assets
- selective real-time shadows
- texture/detail reuse
- post-processing must remain readable and tunable
- ordinary student-life scenes should not rely on dark presentation

## First-person controller

Required:
- pointer-lock mouse look
- configurable sensitivity
- frame-rate independent movement
- grounded start/stop feel
- stable collisions
- no camera jitter at rest
- restrained optional head motion
- smooth FOV behavior
- clean pause/unlock behavior
- focus/pointer-lock loss recovery
- no sticky movement input

## Collision / safety

Use minimum complexity needed:
- static world collision
- character collision
- trigger volumes
- interaction ray queries
- separate simple collision meshes when visual assets become complex
- player recovery if they escape the authored playable space

Do not physically simulate every classroom prop.

## Interaction detection

- center-screen raycast or small cone query
- per-interaction max distance
- visibility/occlusion respected
- deterministic target priority
- explicit interaction ownership
- locomotion/look may be disabled during authored interactions and must restore reliably

## Camera choreography

Camera service must support:
- gameplay mode
- authored focus/inspection mode
- smooth blend
- configurable easing/duration
- exact restoration
- cancel-safe transitions
- FOV overrides
- sitting/standing camera states when implemented

## Student-life interaction requirements

The architecture should be able to support:
- seat selection
- sit / stand
- doors and windows
- phone use
- desk and classroom-object inspection
- paper/book/laptop/charger interactions
- short dialogue/reaction sequences
- local choice branches and reconvergence
- zone/scene transitions

Implement concrete features only when an approved sequence needs them.

## World / event state

Must support:
- boolean/number/string facts
- chapter/scene progression
- local event progression
- object/scene variants
- conditional interactions
- one-time events
- optional persistent player choices
- future relationship/NPC state if required

State must be data-driven rather than scattered scene booleans.

## Conditional presentation

The engine may support authored changes to:
- objects
- materials
- lighting
- audio
- UI/device state
- interaction availability

Such changes are generic technical capability. They do not define story canon by themselves.

## Asset requirements

### Geometry
- consistent meter-based scale
- reusable modular assets
- simpler collision geometry where useful
- avoid unnecessary hidden geometry
- repeated furniture should use instancing/thin instances where appropriate

### Models
- GLB preferred at runtime
- authored source assets stored separately where appropriate
- clear naming conventions
- LOD only where profiling justifies it

### Textures/materials
- consistent texel density by category
- detail concentrated near player-facing assets
- material reuse encouraged
- texture compression/atlasing evaluated for browser performance

## Audio

Support:
- spatial ambience
- room tone
- interaction SFX
- phone/device audio
- dialogue/voice playback when required
- dynamic ambience for authored event states

## Performance targets

Current target:
- approximately 60 FPS on a normal contemporary laptop at a 1080p-equivalent viewport
- stable frame pacing prioritized over maximum effects
- no major hitch entering interactions
- classroom repetition optimized sensibly

Measure and tighten budgets as real assets enter production.

## Loading / zones

- keep bootstrap small
- load assets in scene/zone groups
- preload interaction-critical assets
- do not load the entire future campus/chapter set at startup
- support modular scene transitions so the world can feel connected without being one giant runtime scene

## Save strategy

Current save data should support:
- schema version
- current scene/chapter/checkpoint
- relevant world/event facts
- persistent choices where approved
- settings

Migration strategy required before public release.

## Accessibility

Plan for:
- sensitivity
- FOV
- reduced head motion
- subtitles/captions
- readable text sizing
- audio categories
- reduced flashing/flicker
- good contrast in both ordinary and special-event lighting

## Security/privacy

Current build requires no account and should collect no personal data.

Any future analytics/backend addition requires an explicit decision.

## Browser deployment

- static deployment where possible
- versioned/cache-safe assets
- useful loading/error state
- preview deployment for meaningful playable milestones

## Verification

Every playable milestone must check:
- console/runtime errors
- broken asset requests
- controller/input regressions
- collision and out-of-bounds behavior
- interaction soft-locks
- save-state corruption
- performance hitches
- browser resize/focus behavior
- actual visual quality in the running build
