# Architecture

## Design goal

Keep game code modular enough that student-life content, locations, NPCs and future chapters can grow without turning every scene into custom one-off code.

## High-level modules

### AppBootstrap
Responsibilities:
- create canvas
- select rendering backend
- initialize engine/services
- load initial scene/zone
- own fatal/loading states

### EngineAdapter
Responsibilities:
- Babylon engine initialization
- WebGPU attempt
- WebGL fallback
- resize lifecycle
- render loop lifecycle

### GameState
Responsibilities:
- authoritative runtime facts
- scene/chapter progression
- persistent local choices where required
- serializable save snapshot

State changes must flow through explicit APIs rather than arbitrary direct mutation.

### Scene / Zone Director
Responsibilities:
- scene/zone load/unload
- spawn points
- transition coordination
- scene-scoped resources
- authored presentation variants

The world does not need to be one giant seamless scene.

### PlayerController
Responsibilities:
- movement input
- mouse look
- collision locomotion
- gameplay camera transform
- interaction availability handoff

PlayerController must not contain story logic.

### Movement-boundary safety

Current active-map rule:
- normal playable limits are enforced by authored physical colliders
- the approved GD4 runtime does **not** use an automatic PlayerSafety/respawn controller
- do not teleport the player to spawn as a generic response to ordinary boundary contact
- if a future map needs explicit soft-lock/fall recovery, design it as a separate approved requirement and regression-test it against normal collision behavior

### CameraDirector
Responsibilities:
- gameplay camera
- authored interaction choreography
- seated/inspection camera states
- blending
- FOV overrides
- safe cancel/restore

### InteractionSystem
Responsibilities:
- target detection
- interaction selection
- prompt state
- enter/exit
- interaction ownership

### Interactable data
May describe:
- id
- range
- prompt
- interaction type
- required/blocked facts
- resulting event
- authored anchor(s)

### Shared behavior controllers
Reusable behaviors should cover:
- open/close
- pickup/place
- sit/stand
- inspect/read
- phone/device presentation
- generic camera-owned interactions

Do not create separate frameworks for every object.

### Event / Sequence layer
Responsibilities:
- scene-local event state
- triggers
- short choice branches
- reconvergence
- authored dialogue/reactions
- persistent fact writes only when needed

### Optional discovery/context registry
The earlier EvidenceSystem can be reused or generalized if future gameplay needs durable discovered information.

It is not a required narrative pillar of the new project.

### Conditional variant system
The earlier RealitySystem may be reused as a generic conditional-variant mechanism for object, lighting, audio, device or interaction changes.

Its old story rules are retired.

### AudioDirector
Responsibilities:
- ambience
- one-shots
- spatial emitters
- dialogue/device playback
- authored mix changes

### SaveService
Responsibilities:
- serialize
- validate
- version
- persist
- load
- recover safely from invalid data

### UI layer
Responsibilities:
- reticle
- interaction prompt
- dialogue/subtitles
- phone/device UI when required
- contextual guidance
- pause/settings
- loading/errors

## Event model

Prefer typed events for cross-system communication.

Examples:
- `interaction.entered`
- `interaction.exited`
- `world.fact.changed`
- `event.started`
- `event.completed`
- `scene.loaded`
- `player.seated`
- `player.stood`

Avoid a global untyped event soup.

## Data-driven content

Scene/chapter data should define only what the concrete gameplay needs:
- world/event facts
- interactable conditions
- NPC/event slots
- scene transitions
- optional persistent choices
- presentation variants

Unique scripts are acceptable for genuinely unique sequences, but repeated classroom behavior should be reusable.

## Modular environment architecture

P202 should become a reusable golden classroom rather than a hardcoded one-off level.

Preferred layers:
- authored GLB/GLTF visual assets
- reusable room/furniture modules
- data-driven room numbering/signage
- scene-level placement/configuration
- simple collision proxies
- repeated furniture instancing where appropriate

Later classroom variants should reuse the same asset foundation.

## Proposed source direction

```text
src/
  app/
  engine/
  game/
    state/
    events/
    save/
    sequence/
  player/
  camera/
  interaction/
    behaviors/
    inspection/
  scene/
    zones/
    transitions/
  audio/
  art/
    environment/
    materials/
    signage/
  ui/
  content/
    scenes/
    chapters/
assets/
  runtime/
tests/
docs/
```

Existing legacy-derived directories may remain temporarily while extraction/generalization is in progress. New code should follow the current product direction rather than copy old story naming.

## Architectural constraints

- no story rules in low-level rendering/controller code
- no direct localStorage access outside SaveService
- no scene-specific conditions in PlayerController
- no interactable independently seizes the camera without CameraDirector
- persistent state changes flow through GameState
- player input ownership must always restore cleanly
- scene transitions must leave the player at valid collision-safe positions
- final institutional/narrative identity must not leak into generic engine modules

## Failure recovery

At minimum:
- invalid save does not crash bootstrap
- missing optional asset produces a diagnosable warning
- failed critical scene load produces a visible error state
- exiting an interaction has a route back to gameplay
- losing browser focus clears unsafe input
- out-of-bounds movement recovers safely
