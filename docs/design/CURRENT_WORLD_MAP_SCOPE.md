# CURRENT WORLD MAP SCOPE — UETỐT

Status: **APPROVED HIGH-LEVEL MAP SCOPE — DETAILS TBD**
Date: 2026-10-02
Owner: **User / primary writer**

## Core rule

For the current production scope, treat the game as having only **four major map/environment families**.

Do not keep expanding the world with new large environments unless the user explicitly adds one later.

The four current maps are:

1. **Giảng đường 4**
2. **Giảng đường Xuân Thủy**
3. **Khu phố / phố trà đá**
4. **Hòa Lạc / khu quân sự**

This is a high-level world-production scope, not approval of exact topology.

Runtime residency is defined separately in `docs/design/RUNTIME_WORLD_EVENT_ARCHITECTURE.md`:
- only the currently visited major map should be resident at full gameplay fidelity
- local zones may degrade to lighter simulation/rendering tiers
- chapter/event variants should reuse the same major map package whenever practical

## Map 01 — Giảng đường 4

Role:
- major recurring university-life location
- important from Chapter 2 onward
- supports classrooms, corridors, stairs, room transitions and ordinary student-life activity

Current production status:
- approved Giảng đường 4 foundation is complete
- source checkpoint: `phase-v2/gd4-geometry-corrections` @ `7ed178251ae47074e7276f379492953448296149`
- current integration/reconciliation work must preserve that map without additional polish

Production rule:
- keep the approved authored shell as the map foundation
- later chapter/event variants should layer state over this reusable map
- dress future approved gameplay needs with reusable props/assets
- keep repeated/static/background content optimized according to its runtime role

## Map 02 — Giảng đường Xuân Thủy

Role:
- major Chapter 0 environment
- supports the first university-contact / admission-confirmation / new-campus impression
- should visually communicate that everything is new to the protagonist

Production rule:
- first build the recognizable spatial frame
- validate traversal and composition
- add detail later using the reusable asset library

Exact final topology, official logos, official signage identity and institution-specific visual reproduction remain approval-gated.

## Map 03 — Khu phố / phố trà đá

Role:
- recurring ordinary-life social environment
- supports sitting, tea/drinks, food, chatting, waiting, meeting people and other low-stakes student-life scenes
- may appear across multiple chapters

Important clarification:
- this is a **street/neighborhood scene**
- it is **not a market scene**

Production rule:
- build street massing and the main walkable/social zones first
- add chairs, tables, tarps, drink/food props, signs, bins, plants, utility objects and clutter through the reusable asset pipeline

## Map 04 — Hòa Lạc / khu quân sự

Role:
- major Chapter 1 environment
- supports the military-training period and communal-life material

Production rule:
- build the large living/training spatial frame first
- add repeated beds, chairs, tables, tarps, storage, signs and other camp-life props through reusable asset packs
- exact event layout remains TBD until Chapter 1 detail is approved

## Relationship to current chapters

Current high-level relationship:

- **Chapter 0** → Giảng đường Xuân Thủy + city/street context as needed
- **Chapter 1** → Hòa Lạc / khu quân sự
- **Chapter 2** → Giảng đường 4 becomes the dominant recurring university map
- **Chapter 3** → Giảng đường 4 + khu phố/trà đá + other reuse of the same four-map set as needed
- **Chapter 4+** → locked; do not add new maps merely to support imaginary future chapters

## Large map vs reusable asset rule

The four maps are **large authored scene packages**.

Small/repeated items belong to a separate reusable-asset pipeline.

Examples of reusable items:
- bạt
- ghế
- bàn
- desks/chairs
- doors/windows
- fans/AC/lights
- signs
- bags/books/laptops
- bottles/cups
- street furniture
- camp-life props

Those assets may be:
- custom modeled
- generated/created with available production tools
- sourced from the internet when license/provenance is clear and shipping-compatible
- modified when the license permits it

Do not treat the four whole maps as entries in the small-asset library.

## Expansion rule

This four-map scope is temporary but authoritative for current planning.

A fifth major map is added only after explicit user approval.
