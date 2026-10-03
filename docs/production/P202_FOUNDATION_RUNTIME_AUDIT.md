# P202 Foundation Runtime Audit

**THAM KHẢO KỸ THUẬT / SNAPSHOT TASK CŨ.** Không là lịch sản xuất hoặc tiêu chí nghiệm thu Ch0. Theo [START_HERE](../START_HERE.md) cho ưu tiên mới; không mở lại polish GD4/P202 để làm Ch0. Giữ đường dẫn và nội dung gốc để truy vết.

Date: 2026-10-02
Status: **CURRENT TECHNICAL EVIDENCE**

## Scope

This audit retains only findings useful to the current student-life P202 production direction.

The old story route is not part of this document.

## Verified reusable fixes

Actual browser testing previously confirmed the need for and/or implementation of:
- player out-of-bounds recovery
- pointer-lock/focus input clearing and responsiveness checks
- non-mirrored room signage
- fitted classroom door/frame conventions
- brighter classroom baseline
- improved desk/chair orientation and collision footprint

These lessons remain valid for P202.

## Current visual baseline

Normal classroom gameplay should be:
- bright
- readable
- ordinary
- suitable for student-life interactions

Dark or unusual presentation is event-specific only.

## Current room evidence

Durable before/after classroom captures remain under:
- `docs/playtest/v2-room-corrections-before/`
- `docs/playtest/v2-room-corrections-after/`

These are useful for comparing:
- classroom readability
- furniture placement
- signage
- doorway fit

## Known remaining art debt

The room is not final production art yet.

Remaining priorities include:
- authored/imported GLB-quality classroom furniture
- better wall/floor/ceiling material detail
- window/daylight treatment
- ceiling fans
- AC
- ordinary student clutter
- stronger classroom-specific architectural detail
- final asset provenance
- later NPC/character presence

## Performance principle

The earlier prototype held roughly 60 FPS on the checked development laptop while geometry was simple.

As production assets are added:
- reuse materials
- instance repeated furniture
- keep collision simpler than render geometry
- avoid unnecessary unique textures
- verify real-browser frame pacing after meaningful visual passes

## Verification rule

Do not approve room art from code alone.

Every meaningful P202 pass should:
1. run the real browser build
2. walk the room
3. inspect collision/input
4. capture representative views
5. check console/network errors
6. compare visual quality
7. record remaining debt
