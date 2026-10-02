# P202 Current Issues / Requirements

Status: **ACTIVE USER-DIRECTED CLASSROOM REQUIREMENTS**
Date: 2026-10-02

This file contains only issues still relevant to the current student-life project.

## 1. P202 / P204 signage

Current working room-number examples:
- `P 202`
- `P 204`

Requirements:
- readable from intended viewpoints
- no mirrored/reversed text
- reusable/data-driven signage
- final building names and campus numbering topology remain approval-gated

## 2. Classroom scale/layout

P202 should feel substantially larger than the earlier prototype room.

Current user-described baseline:
- higher ceiling
- approximately 10 desk rows
- 3 desk columns across the room
- 2 chairs per desk
- comfortable walking lanes
- front board
- teacher desk facing students
- no teaching podium/platform
- teacher/front-area layout should follow the user-approved room description

Exact final dimensions remain subject to visual/playtest adjustment.

## 3. Desk/chair quality

Requirements:
- believable university-classroom proportions
- correct seat/back orientation
- floor alignment
- no clipping/interpenetration
- sensible collision footprint
- repeated placement should not feel like an artificial test grid
- player-facing production assets should move beyond simple primitive-box quality

Use reusable authored/imported assets where appropriate.

## 4. Door fit

The corridor-to-classroom door/frame must:
- fit the wall opening cleanly
- look correct in open and closed states
- have correct hinge/pivot behavior
- avoid visible large gaps
- avoid collision snags
- use reusable door/frame conventions

## 5. Windows

Current room description includes:
- a higher window on the teacher-left wall/front zone
- a similar-height window toward the rear-right area
- a larger glass window section on the left/entrance-side wall

Placement must be reviewed in the actual room, not inferred only from code.

## 6. Classroom utilities

Required baseline assets:
- air conditioner
- ceiling fans
- classroom lighting fixtures

These should fit the room scale and not look like placeholder boxes in final player-facing views.

## 7. Lighting

Normal classroom state:
- bright
- readable
- ordinary student-life feel
- visible floor/furniture/door/window separation
- no dark-horror baseline

Any special-event lighting is authored separately and does not define ordinary P202 presentation.

## 8. Input / player safety

Retain the useful hardening work:
- clear stuck input on focus/pointer-lock transitions
- sustained WASD + mouse should remain responsive
- collision should not cause obvious movement hitching
- player must not be able to fall permanently out of the authored space
- recovery should return the player to a valid point

## 9. Asset-production requirement

The classroom must visibly progress beyond a procedural prototype.

Allowed:
- custom Blender assets
- properly licensed free assets
- modified licensed assets where permitted
- reusable GLB/glTF modules
- simple procedural geometry for invisible collision/helpers/blockout

External production assets require provenance/license notes.

## 10. Verification

Review in the actual browser build:
- entrance looking in
- front looking back
- back looking front
- teacher/board area
- desk/chair overview and close-up
- window placement
- AC/fans
- door open/closed
- room signage
- movement through aisles

Do not close a visual issue from code inspection alone.
