# Asset Provenance — Classroom V1

Status: **ACTIVE — PROJECT-AUTHORED ASSET SET**  
Date: 2026-10-02  
Scope: classroom production assets used by the room-focused student-life slice.

## 1. Provenance summary

No third-party 3D asset files are used by Classroom Asset Production V1.

All current classroom GLBs were generated from project-authored geometry/material definitions in:

`tools/classroom/generateClassroomAssets.mjs`

The generator runs offline with Babylon.js and `@babylonjs/serializers`. Babylon.js serializer package version currently used: `9.29.0`, license: **Apache-2.0**.

The generated GLBs themselves contain only geometry/material data authored for this project. There are:
- no ripped assets
- no branded/copyrighted product meshes
- no downloaded texture packs
- no external attribution obligations for the generated classroom asset geometry

## 2. Current authored asset inventory

| Asset | File | Approx. size | Source | License / rights | Modifications | Attribution |
| --- | --- | ---: | --- | --- | --- | --- |
| Student two-seat desk | `student-desk-v1.glb` | 68,456 B | Project-authored generator | Project-owned | Composite laminate top, round metal legs, braces, under-desk basket/slats, bag hook | None |
| Student chair | `student-chair-v1.glb` | 40,052 B | Project-authored generator | Project-owned | Composite seat/back, round metal frame, feet, support rails | None |
| Teacher desk | `teacher-desk-v1.glb` | 22,308 B | Project-authored generator | Project-owned | Larger top, frame, modesty panel, drawer pedestal, handle details | None |
| Classroom board | `classroom-board-v1.glb` | 7,704 B | Project-authored generator | Project-owned | Board surface, frame, marker tray | None |
| Ceiling fan | `ceiling-fan-v1.glb` | 13,056 B | Project-authored generator | Project-owned | Motor, canopy, downrod, three blades | None |
| Wall air-conditioner | `wall-ac-v1.glb` | 12,740 B | Project-authored generator | Project-owned | Housing, front lip, vent opening, louvers, indicator | None |
| Fluorescent fixture | `fluorescent-fixture-v1.glb` | 5,484 B | Project-authored generator | Project-owned | Housing, diffuser, end caps | None |

Files live under:

`public/assets/classroom/v1/`

## 3. Shipping suitability

These assets are suitable for shipping from a rights/provenance standpoint because:
- geometry is authored inside the project
- no uncertain-license source asset is embedded
- no trademarked branding is represented
- materials use authored numeric PBR parameters rather than copied textures
- source generation logic remains in the repository for reproducibility

Visual suitability is a separate review gate and still requires browser screenshots/runtime verification.

## 4. Runtime integration

Runtime code:
- `src/art/classroom/ClassroomProductionAssets.ts`
- `src/art/classroom/ClassroomProductionLayout.ts`

Integration model:
- each GLB loads once into an `AssetContainer`
- repeated desks/chairs/fans/fixtures are instantiated from reusable source containers
- scene-level wrapper nodes own placement rotation/position so imported glTF root conversion remains intact
- gameplay collision remains simple/invisible and separate from visual meshes

## 5. Current limitations

These are production-looking foundation assets, not final hero art.

Remaining potential upgrades:
- texture variation / subtle wear
- better edge treatment
- more nuanced laminate/metal response
- authored UV/texture pipeline if later justified
- additional classroom prop variants
- animation for ceiling fans
- future DCC-authored replacement meshes if higher fidelity is approved and performance allows

## 6. External asset policy

If an external asset is added later, this document must be updated **before** the asset is accepted into production with:
- exact source/provider
- author
- license text/name
- commercial-use status
- modification permission
- attribution requirement
- modification notes
- reason it is safe to ship

Unclear-license assets remain prohibited.
