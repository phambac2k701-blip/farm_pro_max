# Architecture

## Design goal
Keep game code modular enough that content production can grow without turning each chapter into custom one-off scripts.

## High-level modules

### AppBootstrap
Responsibilities:
- create canvas
- select rendering backend
- initialize engine
- initialize services
- load initial scene/chapter
- own fatal error/loading states

### EngineAdapter
Responsibilities:
- Babylon engine initialization
- WebGPU attempt
- fallback rendering path
- resize lifecycle
- render loop lifecycle

### GameState
Responsibilities:
- authoritative runtime facts
- evidence ownership
- chapter state
- serialized save snapshot

Must expose explicit read/write APIs rather than direct arbitrary mutation.

### SceneDirector
Responsibilities:
- scene load/unload
- spawn points
- transition coordination
- scene-scoped resources
- controlled reality-shift application

### PlayerController
Responsibilities:
- movement input
- mouse look
- collision locomotion
- gameplay camera transform
- interaction availability handoff

PlayerController must not contain narrative logic.

### CameraDirector
Responsibilities:
- gameplay camera
- inspection camera choreography
- blend state
- focus targets
- temporary FOV overrides
- safe cancellation/restore

### InteractionSystem
Responsibilities:
- target detection
- interaction selection
- prompt state
- entering/exiting interactions
- interaction lock ownership

### Interactable
Data contract should describe:
- id
- range
- prompt
- interaction type
- required facts
- blocked facts
- resulting events
- authored anchor(s)

### InspectionController
Responsibilities:
- inspect-mode input
- prop animation state
- page/photo/object manipulation
- exit/cancel
- evidence discovery callbacks

### EvidenceSystem
Responsibilities:
- register evidence definitions
- mark discoveries
- expose evidence metadata
- emit discovery event

### RealitySystem
Responsibilities:
- evaluate knowledge conditions
- apply world variants
- coordinate visual/audio/state changes
- persist resolved changes

### AudioDirector
Responsibilities:
- ambience layers
- one-shots
- spatial emitters
- world-state mix changes
- evidence playback

### SaveService
Responsibilities:
- serialize
- validate
- version
- persist
- load
- recover from invalid data safely

### UI Layer
Responsibilities:
- reticle
- interaction prompt
- pause/settings
- journal/evidence UI
- loading/errors

The UI must not become the primary way to experience hero clues.

---

# Event model
Prefer explicit typed events for cross-system communication.

Examples:
- `evidence.discovered`
- `interaction.entered`
- `interaction.exited`
- `world.fact.changed`
- `reality.shift.ready`
- `reality.shift.applied`
- `scene.loaded`

Avoid a global untyped event soup.

# Data-driven content
Chapter-specific data should define:
- evidence
- world facts
- interactable conditions
- reality shift rules
- chapter objectives/checkpoints

Core systems interpret data.
Chapter scripts should be reserved for genuinely unique sequences.

# Proposed source layout
```text
src/
  app/
    bootstrap/
    config/
  engine/
    EngineAdapter.ts
  game/
    state/
    events/
    save/
  player/
    PlayerController.ts
    InputRouter.ts
  camera/
    CameraDirector.ts
  interaction/
    InteractionSystem.ts
    types.ts
    inspection/
  evidence/
    EvidenceSystem.ts
  reality/
    RealitySystem.ts
  scene/
    SceneDirector.ts
  audio/
    AudioDirector.ts
  ui/
  content/
    chapters/
assets/
  runtime/
tests/
docs/
```

# Architectural constraints
- no narrative rules inside low-level rendering code
- no direct localStorage access outside SaveService
- no chapter-specific conditions hardcoded in PlayerController
- no interactable should independently seize camera without CameraDirector
- no system should mutate world facts silently
- every persistent state change must flow through GameState

# Failure recovery
At minimum:
- invalid save does not crash bootstrap
- missing optional asset produces a diagnosable warning
- failed critical scene load produces an error screen with retry
- exiting inspect mode always has a route back to gameplay
- losing browser focus releases or safely handles pointer lock
