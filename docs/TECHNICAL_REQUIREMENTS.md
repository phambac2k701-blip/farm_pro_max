# Technical Requirements

## Platform
Primary target: desktop browsers.

### Supported baseline
- Chromium-family modern browser
- Firefox modern browser
- Safari compatibility evaluated after prototype stability
- WebGPU preferred where available
- WebGL fallback required for broader support

## Stack
- TypeScript
- Vite
- Babylon.js
- Babylon.js glTF loader
- browser storage for early prototype saves
- test runner selected during bootstrap
- lightweight state management; do not add a heavy framework without demonstrated need

## Rendering
- physically plausible lighting where performance allows
- real-time shadows used selectively
- baked/texture-based detail preferred for static environment richness
- PBR materials
- glTF/GLB asset format
- texture compression strategy evaluated before vertical slice
- post-processing must be tunable and must never destroy readability

## First-person controller
Required:
- true mouse-look with pointer lock
- configurable sensitivity
- frame-rate independent movement
- acceleration/deceleration tuned for grounded feel
- stable collision response
- no camera jitter at rest
- no large bobbing that causes discomfort
- optional subtle breathing/sway only
- smooth FOV behavior
- clean pause/unlock behavior

Target feel:
- deliberate, human walking
- not competitive-FPS snappy
- not floaty
- not over-smoothed
- responsive start/stop
- camera rotation should preserve user input precision

## Collision/physics
Use the minimum physics complexity needed.
- static world collision
- character collision
- trigger volumes
- interaction ray/shape queries
- dynamic rigid-body physics only where gameplay needs it

Do not make every prop physically simulated.

## Interaction detection
- center-screen raycast or small cone query
- max distance per interaction category
- visibility/occlusion respected
- clear priority when multiple targets overlap
- target can expose interaction verbs/capabilities
- interaction state can disable locomotion and redirect camera

## Camera choreography
The camera service must support:
- gameplay camera mode
- authored focus/inspection mode
- smooth blend to target transform
- configurable easing/duration
- return to previous gameplay transform
- cancel-safe transitions
- FOV override
- look-at targeting
- limited head/eye-style offset when useful

No hard teleport between gameplay and inspect camera except emergency recovery.

## Interaction example: book
Technical requirements:
- authored inspection anchor
- focus lock
- player input mode switch
- book open animation
- page state
- readable content plane/UI
- page-turn transition
- sound events
- evidence trigger
- cancel/close transition
- world-state-dependent page variants supported

## World state
Must support:
- boolean facts
- enumerated facts
- evidence discovery
- chapter progression
- object variant selection
- scene variant selection
- conditional interactables
- one-time events
- persistent changes

World state must be data-driven, not scattered magic booleans across scene code.

## Knowledge Changes Reality
A reality shift is a state transition driven by knowledge/evidence, not arbitrary timer scripting.

Requirements:
- condition evaluation
- controlled reveal timing
- object spawn/hide/swap
- material/texture swap
- audio layer change
- lighting variation
- interaction availability change
- persistence after save/load

## Asset requirements
### Geometry
- environment authored in modular pieces
- scale uses consistent units
- collision meshes simpler than render meshes
- avoid unnecessary hidden geometry

### Textures
- consistent texel density by category
- high detail reserved for hero inspection props
- decals for grime, notices, stains, handwriting, cracks
- texture resolution budget defined before vertical slice

### Models
- GLB preferred for runtime
- authored source assets kept outside runtime path where appropriate
- asset naming convention required
- LOD only where profiling shows benefit

## Audio
- spatial ambience
- room tone
- interact SFX
- footsteps based on surface type eventually
- evidence audio playback
- dynamic ambience layers tied to world state

Audio must not depend on constant loud stingers.

## Performance targets
Prototype target:
- 60 FPS on a normal contemporary laptop at 1080p-equivalent viewport
- stable frame pacing prioritized over maximum visual effects
- no major stutter when entering interaction mode

Budgets will be measured and tightened after the graybox prototype.

## Loading
- initial bootstrap kept small
- chapter/scene assets loaded in groups
- hero interaction assets preloaded before interaction becomes available
- avoid loading all nine chapters at startup

## Save strategy
Prototype:
- local browser persistence

Save data must contain:
- save schema version
- chapter
- player/world checkpoint
- evidence state
- world facts
- settings

Migration strategy required before public release.

## Accessibility
Plan for:
- sensitivity setting
- FOV setting within safe design range
- motion/head-bob reduction
- subtitle/caption support
- text size/readability
- volume categories
- reduced flashes/flicker mode

## Security/privacy
Early build should require no account and collect no personal data.
Any future analytics/backend addition requires an explicit decision record.

## Browser deployment
- production build deployable as static web app if possible
- Vercel preview per meaningful branch/PR when pipeline is ready
- cache-busting/versioning for assets
- useful loading/error screen rather than blank canvas

## Verification
Every playable milestone must be checked for:
- runtime console errors
- broken asset requests
- controller regressions
- interaction soft-locks
- save corruption
- unacceptable frame drops
- browser resize/focus behavior
