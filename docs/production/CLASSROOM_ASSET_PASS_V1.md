# Classroom Asset Production Pass V1

Status: **IN PROGRESS — LAYOUT CORRECTION VERIFIED — DETAIL PASS PAUSED BY USER**  
Date: 2026-10-02  
Branch: `phase-v2/classroom-asset-production-v1`  
Linear: `BAC-44`

## 1. Purpose

Move the room-focused student-life classroom beyond the prior box-prototype presentation while keeping the current bright/readable direction and all USER APPROVAL gates.

This pass does **not** authorize:
- Chapter 2
- final university identity
- final campus map
- protagonist final design
- important NPC canon
- major story canon

## 2. Current authoritative classroom layout

The active user-directed layout is:
- **10 student rows**
- **3 separated desks per row**
- **30 desks total**
- **2 chairs per desk / approximately 60 seats**
- students sit behind each desk and face the front board
- clear walking lanes remain between desk columns and rows
- classroom is intentionally larger and higher-ceilinged than the old prototype

Current orientation:
- board/front = +X
- rows progress from rear toward +X
- desk long edge runs across Z
- from the back row looking toward the board, the main entrance is on the **left wall**, close to the front wall
- teacher desk is on the **right side**, aligned with the inner/right desk column
- front board is enlarged and kept flat/aligned to the front wall

These are spatial/layout approvals only. Institutional identity, teacher identity and narrative meaning remain non-canon unless separately approved.

## 3. Room shell currently implemented

Current working dimensions:
- X: 1.5 → 18.2 m
- Z: -4.8 → 5.8 m
- approximate footprint: **16.7 × 10.6 m**
- ceiling height: **4.2 m**

Current room shell includes:
- bright interior wall/floor/ceiling material presets
- new left-wall main entrance near the front
- obsolete rear/corridor classroom opening infilled
- fitted reusable door opening/frame/header
- large upper glass section plus high windows from the current workshop draft
- reusable notice board/cabinet/utility geometry
- wall AC
- ceiling fans
- authored fluorescent fixture visuals
- practical/daylight fill lighting

No additional detail pass should proceed until the latest door/teacher/board correction remains stable under user review.

## 4. Produced classroom assets

Project-authored GLBs:
- `student-desk-v1.glb`
- `student-chair-v1.glb`
- `teacher-desk-v1.glb`
- `classroom-board-v1.glb`
- `ceiling-fan-v1.glb`
- `wall-ac-v1.glb`
- `fluorescent-fixture-v1.glb`

Source generator:
- `tools/classroom/generateClassroomAssets.mjs`

Runtime:
- `src/art/classroom/ClassroomProductionAssets.ts`
- `src/art/classroom/ClassroomProductionLayout.ts`

External 3D assets imported: **none**.

See `docs/art/ASSET_PROVENANCE_CLASSROOM_V1.md`.

## 5. Browser evidence

Pre-production classroom:
- `docs/playtest/classroom-asset-pass-before/`

Latest spatial correction review:
- `docs/playtest/classroom-layout-fix-review/`

Latest real-browser review confirms:
- 30 desks / 60 chairs are instantiated from the shared 10×3 layout
- main entrance is on the left wall near the front
- teacher desk is on the right side at the front
- board is materially larger and flat on the front wall
- bright/readable baseline remains active
- classroom asset layer reports `ready:102`
- runtime exceptions: 0
- console warning/error log entries during capture: 0
- HTTP responses >=400 during capture: 0

## 6. Technical fixes made during the pass

- glTF placement uses an outer Babylon `TransformNode` wrapper so imported root conversion transforms are preserved
- room layout is centralized in `ClassroomProductionLayout.ts`
- visual GLBs and invisible collision proxies are separated
- repeated assets load once through `AssetContainer` and instantiate into deterministic placements
- player safety X bound was expanded to cover the larger room
- classroom door opening/frame/leaf/sign share one layout source
- obsolete corridor-side classroom opening is collision-infilled
- teacher evidence/inspection props follow the teacher-desk position
- regression locks the 10×3 density and shipping GLB inventory

## 7. Current verification

Verified at this correction checkpoint:
- full repository tests: **23/23 test files, 78/78 tests pass**
- TypeScript typecheck: pass
- production Vite build: pass
- `git diff --check`: pass after Markdown whitespace cleanup
- Chrome GLB load: all seven authored classroom files load
- Chrome fatal state: none
- Chrome runtime exceptions: 0
- Chrome console errors during layout review: 0
- Chrome HTTP >=400 during layout review: 0
- browser scene reports 30 student desks
- board/teacher/door coordinates match the shared layout source

The **Classroom Asset Production Pass V1 is not complete**. The user explicitly paused additional detail work after the latest spatial corrections.

## 8. Remaining placeholder / art debt

Still not final:
- no student/NPC characters
- no final institutional color/branding
- no final timetable/notice content
- limited texture variation
- no ceiling-fan animation yet
- classroom micro-clutter remains sparse
- some preserved technical-prototype evidence props may be reworked later
- external approach/adjacent-space treatment for the relocated main classroom entrance is not final
- final authored detail/polish pass is intentionally paused

## 9. User approval / next step

Immediate next step is **user review of the corrected spatial layout**, especially:
- main entrance placement
- teacher-desk placement
- board size/alignment

Do not add another classroom-detail pass until that layout review is accepted.

Still protected by USER APPROVAL:
- final university identity
- logo
- official campus/building map
- final protagonist
- important NPC cast
- final canonical chapter beats / twist / ending

Do not close BAC-44 yet.
