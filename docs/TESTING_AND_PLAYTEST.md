# Testing and Playtest Strategy

Nghiệm thu toàn Ch0: [START_HERE](START_HERE.md), [gate cuối](PROJECT_MASTER_PLAN.md#8-nghiệm-thu-cuối-và-điểm-dừng) và từng gói P0–P7. Autoplay chỉ bổ sung, không thay manual và user acceptance. Các view P202 là tham khảo room-level, không đủ kiểm Ch0 street/bus/UET/flyby.

## Why

This project can be technically correct while still feeling wrong. Automated tests and real browser playtests are both required.

## Automated testing targets

Prioritize deterministic logic:
- world/event-state updates
- save serialization/deserialization
- chapter/scene progression
- interaction state machine
- camera-state transitions
- sit/stand state when introduced
- choice/reconvergence logic
- zone transitions
- input recovery/focus handling

## Runtime smoke tests

Every playable build should verify:
- engine starts
- scene loads
- player spawns
- pointer lock enters/exits
- movement works
- collision works
- interaction targets can be acquired
- authored interactions can enter and exit
- no fatal console errors
- required runtime assets load

## Manual game-feel pass

Movement:
- start/stop response
- diagonal speed
- wall sliding
- corners
- classroom aisles
- stairs/ramps when present
- sensitivity
- low/high FPS behavior
- browser focus changes

Interaction:
- approach from different angles
- trigger at distance boundary
- repeated interact input
- cancel during camera blend
- lose browser focus during interaction
- exit and re-enter
- sit/stand recovery when present
- interact after local event-state changes

## Visual pass

- camera clipping
- shadow artifacts
- unreadable dark areas
- excessive post-processing
- texture blur/pop
- object scale
- desk/chair spacing
- door/window fit
- signage orientation
- text readability
- visible placeholder/procedural geometry that should have been upgraded

## P202 review views

At minimum capture:
- entrance looking in
- front looking back
- back looking front
- teacher/board area
- desk/chair overview
- desk/chair close-up
- window areas
- door open/closed
- any bug being fixed

## Performance pass

Record:
- average FPS
- obvious hitching
- scene load duration
- major asset download size
- expensive repeated geometry/materials
- draw-call/instancing issues when relevant

## Browser matrix

Primary prototype:
- Chrome/Chromium
- Firefox when practical

Later:
- Edge
- Safari/macOS

## Screenshot rule

Screenshots are visual regression evidence, not a substitute for actually playing the build.

## Release gate for a playable scene/chapter

It is not done if:
- required progression can soft-lock
- camera can get stuck
- input becomes stuck
- save/load breaks required state
- browser refresh loses expected progress
- assets fail to load
- performance is visibly unstable on target hardware
- the room is technically complete but visually not reviewed
