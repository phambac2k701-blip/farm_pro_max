# CHARACTER ANIMATION PLAN V1 — UETỐT

Tình trạng 03/10/2026: Prototype V0 đã có code/6 clip/proof ở `phase-v2/character-animation-prototype-v0` @ `498cf6c46c6cb981b43e190c778abc49df866cec`; chưa tích hợp Ch0, không là NPC final. [START_HERE](../START_HERE.md) và kế hoạch Ch0 quyết định thứ tự mới. STOP V0 bên dưới là giới hạn task prototype cũ; vẫn giữ gate duyệt final look và chỉ mở rộng clip theo tình huống/gói được duyệt, không mass-produce backlog.

Status: **APPROVED ROADMAP / PROTOTYPE-FIRST**
Date: 2026-10-02

## 1. Purpose

Build the character-animation foundation before spending time on final character art.

The first implementation must use a lightweight stick-figure / mannequin-style test character so the project can validate:
- skeleton hierarchy
- animation import/export
- clip playback
- loop vs one-shot behavior
- state transitions
- scale/orientation in Babylon.js
- browser performance

This prototype is not the protagonist and is not a canon NPC.

## 2. Prototype V0 — build these six first

Only these six animations are approved for the first implementation pass:

1. **Idle**
   - loop
   - neutral standing pose

2. **Walk**
   - loop
   - in-place locomotion for the first prototype

3. **Turn In Place**
   - one-shot
   - initial proof may use one authored turn direction; left/right variants can be added later

4. **Sit Down**
   - one-shot
   - standing to seated transition

5. **Seated Idle**
   - loop
   - neutral sitting pose

6. **Stand Up**
   - one-shot
   - seated to standing transition

Required first test sequence:

`Idle -> Walk -> Idle -> Turn -> Idle -> Sit Down -> Seated Idle -> Stand Up -> Idle`

The purpose of V0 is to prove the animation pipeline, not animation quantity.

## 3. Prototype movement rules

For V0:
- prefer in-place animation instead of root-motion locomotion
- gameplay/controller movement owns world translation
- the animation rig should not drift away from its gameplay root
- sit/stand should work from an authored seat anchor
- loops must transition cleanly without visible snapping
- one-shot actions must report/allow a reliable completion transition
- animation names and clip boundaries must remain stable for later code reuse

Do not create a large animation state machine before these six clips work cleanly.

## 4. Future animation backlog — do not build yet

After V0 is proven, expand only when a real gameplay/event need appears.

### Locomotion / orientation
- walk backward
- turn left
- turn right
- short reposition/step
- optional faster walk only if gameplay needs it

### Social / attention
- head/look turn
- look-at-player idle
- talk idle
- listening idle
- small acknowledgement/nod
- point / directional gesture
- simple hand gesture variants

### Student-life object interaction
- pick up object
- put down object
- hold/carry object
- use phone while standing
- use phone while seated
- open/use laptop when a real event requires it
- interact with bag/backpack when that asset exists

### Classroom / everyday actions
- sit with small posture variation
- stand waiting
- lean/rest only when justified by a scene
- simple reach toward desk/board/door
- classroom writing/reading only when a real event needs it

### Future transport actions
Do not build these until the relevant vehicle gameplay exists:
- bicycle mount/dismount
- bicycle riding
- Cub-style motorbike mount/dismount
- riding posture

The backlog is a reminder, not an order to mass-produce animation.

## 5. Asset storage / download rule

If an external animation, motion source, mocap clip or rig resource is approved for production:
- download/store the approved source locally for the project when its license allows redistribution/storage
- do not depend on a third-party runtime URL or CDN for shipped gameplay
- keep runtime-ready animation assets in the appropriate project asset bundle
- keep high-resolution/master/source material outside the runtime bundle when appropriate
- record source, author/provider, license and modification notes
- do not ship uncertain-license or ripped motion data

## 6. Initial naming convention

Recommended stable clip IDs:
- `anim_char_idle_loop`
- `anim_char_walk_loop`
- `anim_char_turn_in_place`
- `anim_char_sit_down`
- `anim_char_seated_idle_loop`
- `anim_char_stand_up`

Future clips should follow the same `anim_char_<action>` pattern unless the project later adopts a more specific convention.

## 7. V0 completion gate

The six-animation stick-figure prototype is complete only when:
- all six clips load in the browser
- loop clips loop cleanly
- one-shot clips terminate cleanly
- the required test sequence can run without visible state deadlock
- the character keeps correct meter scale and orientation
- there is no obvious root drift
- browser console/runtime remain clean
- performance impact is recorded
- evidence/screenshots or a short runtime review artifact are saved
- tests/typecheck/build pass

After V0 passes, STOP and review before making final male/female character bodies or expanding the backlog.
