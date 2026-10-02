# CHARACTER ANIMATION PROTOTYPE V0 — UET KHÔNG TỆ

Status: **IMPLEMENTED / VERIFIED**
Date: 2026-10-02
Branch: `phase-v2/character-animation-prototype-v0`

## Purpose

This is a lightweight procedural mannequin used only to validate the character-animation pipeline.

It is **not**:
- the protagonist
- a canon NPC
- a final male/female body
- a character-art direction
- permission to start NPC/event production

The approved scope is exactly six animation clips from `CHARACTER_ANIMATION_PLAN_V1.md`.

## Technical approach

The prototype is authored procedurally in TypeScript/Babylon.js.

Runtime structure:
- a real Babylon `Skeleton` with 18 linked bones
- one `TransformNode` joint per bone
- 15 rigid debug body meshes parented to those joints
- one shared simple material
- six Babylon `AnimationGroup` clips
- a small playback controller for loop/one-shot ownership and the required sequence
- a dedicated browser workshop selected with:
  - `?workshop=character-animation-v0`

The rigid-part mannequin is intentional for V0. It validates hierarchy, pivots, clip playback and transitions without introducing weighted skinning, final body topology or a larger character framework.

## Coordinate / scale convention

- Babylon world up: **+Y**
- character forward: **+Z**
- gameplay/animation root: local **(0, 0, 0)**
- approximate standing height: **~1.75 m**
- root translation is not animated by any V0 clip
- the gameplay/controller layer remains owner of world translation
- the turn proof rotates root orientation around +Y without translating it
- workshop turn direction: **+90°**
- sit/stand uses an authored debug seat anchor; the gameplay root stays fixed

## Rig hierarchy

```text
root
└─ pelvis
   ├─ spine
   │  └─ chest
   │     ├─ neck
   │     │  └─ head
   │     ├─ leftUpperArm
   │     │  └─ leftLowerArm
   │     │     └─ leftHand
   │     └─ rightUpperArm
   │        └─ rightLowerArm
   │           └─ rightHand
   ├─ leftUpperLeg
   │  └─ leftLowerLeg
   │     └─ leftFoot
   └─ rightUpperLeg
      └─ rightLowerLeg
         └─ rightFoot
```

Bone count: **18**

## Mannequin runtime cost

Character-only metrics:
- meshes: **15**
- vertices: **873**
- triangles: **1152**
- materials: **1**
- bones: **18**
- animation clips: **6**

Workshop total, including debug ground/seat/forward marker:
- meshes: **19**
- vertices: **927**

## Six approved clips

| Clip ID | Mode | V0 status |
| --- | --- | --- |
| `anim_char_idle_loop` | loop | pass |
| `anim_char_walk_loop` | loop / in-place | pass |
| `anim_char_turn_in_place` | one-shot | pass |
| `anim_char_sit_down` | one-shot | pass |
| `anim_char_seated_idle_loop` | loop | pass |
| `anim_char_stand_up` | one-shot | pass |

No seventh clip was added.

Loop tests verify matching start/end values for every targeted animation track. Turn one-shot is also exercised under a real scene-render clock and terminates cleanly.

## Required sequence

Verified browser sequence:

`Idle -> Walk -> Idle -> Turn -> Idle -> Sit Down -> Seated Idle -> Stand Up -> Idle`

Recorded runtime history:

`anim_char_idle_loop>anim_char_walk_loop>anim_char_idle_loop>anim_char_turn_in_place>anim_char_idle_loop>anim_char_sit_down>anim_char_seated_idle_loop>anim_char_stand_up>anim_char_idle_loop`

Result:
- sequence: **pass**
- state deadlock: **none**
- root X/Z drift: **0**
- final root yaw: **1.570796 rad**
- final standing pelvis sample: **0.954603 m** while the final Idle breathing loop was active
- standing foundation pelvis Y: **0.95 m**

## Workshop controls

- `1` — Idle
- `2` — Walk
- `3` — Turn In Place
- `4` — Sit Down
- `5` — Seated Idle
- `6` — Stand Up
- `Space` — run the complete required sequence
- `R` — reset to standing

The workshop also auto-runs the proof sequence on load.

Input that would interrupt a running auto-sequence is ignored until that sequence finishes, keeping one-shot ownership deterministic.

## Browser / performance proof

Fresh Chrome / WebGPU workshop:
- runtime exceptions: **0**
- console errors: **0**
- HTTP >=400: **0**
- empty/debug workshop baseline: **60.02 RAF FPS**
- mannequin Idle active: **60.01 RAF FPS**
- measured RAF delta: **-0.01 FPS**

GD4 regression smoke after adding the workshop route:
- map: **Giảng đường 4**
- meshes: **2549**
- vertices: **470676**
- RAF: **60.31 FPS**
- engine: **60.02 FPS**
- mesh delta vs integration baseline: **0**
- vertex delta vs integration baseline: **0**
- runtime exceptions: **0**
- console errors: **0**
- HTTP >=400: **0**

Final repository verification:
- full tests: **16/16 files, 57/57 tests pass**
- typecheck: **pass**
- production build: **pass**
- `git diff --check`: **pass**
- production main bundle: **~1,719.25 kB / 417.28 kB gzip**
- Vite chunk-size warning remains non-blocking

The prototype does not modify GD4 topology or instantiate the mannequin in normal GD4 runtime.

## Evidence

Stored under:
- `docs/playtest/character-animation-prototype-v0/runtime-proof.json`
- `docs/playtest/character-animation-prototype-v0/workshop-sequence-pass.png`
- `docs/playtest/character-animation-prototype-v0/workshop-seated-idle.png`
- `docs/playtest/character-animation-prototype-v0/workshop-final-idle.png`
- `docs/playtest/character-animation-prototype-v0/gd4-regression.json`
- `docs/playtest/character-animation-prototype-v0/gd4-regression.png`

## Asset provenance

No external character model, rig, animation or mocap asset is used.

The mannequin geometry, rig and six clips are project-authored procedurally in:
- `src/art/character/prototype/CharacterAnimationPrototype.ts`

Playback/workshop code:
- `src/art/character/prototype/CharacterAnimationController.ts`
- `src/art/character/prototype/CharacterAnimationWorkshop.ts`

There is no runtime CDN or third-party animation dependency.

## Known V0 limitations

Intentional prototype limitations:
- rigid segmented mannequin, not weighted/skinned final character mesh
- no IK or foot-lock solver
- one turn direction only
- no root-motion locomotion
- simple authored seat anchor, not gameplay seating framework
- no face, hair, outfit, backpack or vehicle actions
- no NPC logic, dialogue or gameplay event wiring

These are not blockers for V0 and must not be expanded inside this task.

## Stop rule

Prototype V0 ends after this six-clip proof passes all repository/browser gates.

Do not continue into:
- final male/female bodies
- protagonist art
- canon NPCs
- additional animations
- crowd systems
- gameplay events
- a second map

without a new explicit user instruction.
