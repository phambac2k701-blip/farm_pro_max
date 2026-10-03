# ASSET PRODUCTION PIPELINE V2 — UETỐT

Cập nhật ưu tiên 03/10/2026: hoàn thiện tình huống Ch0, không mở full asset library/Ch1–Ch3. [START_HERE](../START_HERE.md); [hợp đồng metadata và sáu bước thực thi](../PROJECT_MASTER_PLAN.md#5-asset-và-tự-động-hóa-theo-cảnh). Đặt model chưa là nối gameplay; NPC/âm thanh/diễn xuất phải đi cùng cảnh. Nội dung cuối vẫn qua approval gates.

Status: **CURRENT APPROVED PRODUCTION DIRECTION**
Date: 2026-10-02
Owner of final creative decisions: **User / primary writer**

## 1. Core production rule

The game currently needs only a small number of **large authored environments**.

Do not force every large environment into the reusable asset-library pipeline.

Instead, split production into two layers:

1. **Major scene / environment production**
   - build the large location as a playable scene shell/frame first
   - validate scale, traversal and composition
   - then dress/detail it with reusable assets

2. **Reusable asset production**
   - model/source the smaller repeated objects separately
   - package them cleanly for reuse across scenes
   - examples: tarps, plastic chairs, tables, fans, doors, windows, signs, bags, bottles, street furniture and similar props

The large scene provides the spatial identity.
The reusable asset library provides the detail density.

Runtime performance classes are defined in `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`.
In particular:
- static world content may be merged/batched and frozen where safe
- repeated non-interactive assets should prefer instancing/batching where appropriate
- event/interactable objects stay modular only when gameplay needs independent state
- background-only content should use lightweight representation instead of unreachable expensive 3D

## 2. Current major environment set

The current planned environment scope is intentionally small.

### Scene A — Giảng đường 4

Status:
- approved foundation complete at `7ed178251ae47074e7276f379492953448296149`
- current integration work must preserve that implementation without extra polish

Role:
- important recurring university-life environment from Chapter 2 onward
- contains the current approved building/corridor/classroom foundation

Production rule:
- treat the overall Giảng đường 4 map as a major scene package
- reuse/batch repeated static content according to runtime role
- do not require the whole building to be broken into tiny reusable asset modules

### Scene B — Xuân Thủy main university / lecture-building context

Status:
- local Ch0 uet greybox exists at `db0792a`; final Xuân Thủy topology/art production is not complete and the new Ch0 plan awaits user approval

Role:
- important to the early university-entry / admission-confirmation material

Production rule:
- first establish the recognizable playable spatial frame
- detail it later with reusable asset packs
- exact final topology and official-brand treatment remain approval-gated

### Scene C — Student street / phố trà đá

Status:
- local Ch0 street greybox exists at `db0792a`; the full recurring street map remains high-level, not final production

Role:
- ordinary student-life street
- place for tea, sitting, talking, food/drink and recurring everyday social scenes
- this is a **street/neighborhood scene**, not a market scene

Production rule:
- build the street massing, walkable route and social seating zones first
- populate it later with reusable street-life props

### Scene D — Hòa Lạc / military-training environment

Status:
- planned at high level only

Role:
- supports the military-training chapter

Production rule:
- establish the large training/living environment shell first
- add repeated beds, tarps, chairs, tables, storage, training props, signage and ordinary camp-life details through reusable asset packs

## 3. What counts as a major scene

A major scene is a location whose large-scale geometry and spatial arrangement are important to the experience.

Examples:
- a whole lecture-building map
- a street block
- a military-training/living area

Major scenes should be produced in passes:

1. reference / user direction
2. blockout / shell
3. scale and traversal review
4. doors, stairs, windows and major openings
5. collision and player-safety pass
6. lighting/daylight blockout
7. gameplay anchors / interaction zones
8. reusable-asset dressing
9. materials and surface pass
10. secondary clutter / decals
11. optimization
12. real-browser review

Do not delay a major scene merely because every prop is not finished.

## 4. What belongs in the reusable asset pipeline

Reusable assets are smaller objects or modules that can appear multiple times or across multiple scenes.

Examples:
- bạt / tarps
- ghế nhựa / chairs
- tables
- student desks/chairs
- doors and frames
- windows and frames
- fans
- air conditioners
- lights
- notice boards
- signs/sign mounts
- bins
- benches
- stools
- bottles/cups
- backpacks
- books/notebooks
- laptops/chargers/cables
- food/drink props
- street-side furniture
- simple utility objects
- military-training/living props

A reusable asset should have:
- stable asset ID
- consistent scale
- sensible origin/pivot
- reusable material setup
- simple collision proxy where needed
- runtime GLB/glTF when appropriate
- provenance/license metadata if externally sourced
- a quick in-engine validation scene or placement test

## 5. Reusable asset production flow

For a new reusable asset:

1. identify concrete gameplay/scene need
2. decide custom Blender model vs licensed external source
3. create or adapt geometry
4. clean scale/origin/pivot
5. create/assign reusable materials
6. create simple collision when needed
7. prepare variants only if they provide real reuse value
8. export runtime GLB/glTF
9. add metadata/provenance
10. test in the actual scene
11. optimize only if profiling shows a need
12. add to the shared asset library

Do not create an asset merely because it might be useful someday.

## 6. Large-scene source-of-truth rule

For major environments, the scene layout itself is the source of truth.

Do not split a whole building into dozens of independent library assets unless those pieces are genuinely reused.

Use reusable modules where they naturally help:
- doors
- windows
- furniture
- utilities
- repeated architectural pieces
- signs
- props

But the unique large spatial frame may remain authored as one scene-level model/package.

## 7. Iteration rule

Production should alternate:

**scene shell → playtest → identify missing detail → create reusable asset → dress scene → playtest again**

This is preferred over:
- building a giant asset library before gameplay
- fully polishing props before the scene scale is correct
- duplicating the same prop separately inside each large map

## 8. Fidelity rule

Prioritize visible quality by player proximity and recurrence.

Highest value:
- objects the player touches/uses
- repeated seating/furniture
- doors/windows
- strong silhouette objects
- social-space props
- objects that appear in multiple chapters

Lower priority:
- distant background detail
- inaccessible geometry
- unique tiny props with no gameplay or visual value

## 9. Browser-performance rule

Keep the pipeline browser-first:
- GLB/glTF runtime assets
- material reuse
- repeated-object instancing where appropriate
- simple collision proxies
- texture reuse/compression where useful
- avoid unnecessary unique high-resolution textures
- scene/zone loading rather than loading every large environment at startup

## 10. Approval boundary

This document approves the **production method and current four-environment scope at high level**.

It does not automatically approve:
- exact map topology
- official UET branding
- exact signage/labels
- hero prop design
- NPC design
- final scene dressing
- exact event placement

Those remain subject to the relevant user approval gates.
