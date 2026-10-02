# Visual Production Pipeline V1

Status: **ACTIVE FOUNDATION — CLASSROOM PASS V1**  
Date: 2026-10-02  
Scope: reusable browser-first environment asset production for **Người Thứ Chín**.

## 1. Asset folders

```text
public/
  assets/
    classroom/
      v1/
src/
  art/
    classroom/
    environment/
    materials/
    signage/
tools/
  classroom/
docs/
  art/
  playtest/
```

Runtime-ready GLB files live under `public/assets/<family>/<version>/`. Source/generation logic lives under `tools/` or a future DCC-source folder. Scene layout/orchestration stays under `src/`; generated binary assets must not become the source of layout truth.

## 2. Naming

Use lowercase kebab-case for authored files:

`<asset-family>-<variant>-v<major>.glb`

Examples:
- `student-desk-v1.glb`
- `student-chair-v1.glb`
- `teacher-desk-v1.glb`
- `ceiling-fan-v1.glb`

Runtime node names may add deterministic placement identifiers such as `classroom-desk-r3-c2`.

## 3. GLB / glTF workflow

Current classroom V1 workflow:
1. author reusable geometry in the repository generation script
2. use Babylon.js NullEngine + serializer offline
3. export binary GLB into `public/assets/classroom/v1/`
4. load each GLB once into an `AssetContainer`
5. instantiate reusable models into the runtime scene
6. keep collision proxies separate from visual geometry
7. validate in the actual Chrome build

Future DCC-authored Blender/Maya assets may replace generated sources without changing the runtime contract.

## 4. Scale, axes, pivots

- world unit = **1 metre**
- Babylon scene uses Y-up
- reusable asset local origin should sit at the logical floor/base center unless the object has a functional hinge pivot
- furniture GLBs should export near world origin
- placement orientation belongs to a scene-level wrapper so glTF root conversion transforms are preserved
- doors use explicit hinge origins rather than center pivots
- visual meshes and collision meshes may use different geometry

## 5. PBR convention

Prefer PBR for production-facing reusable assets.

Material families:
- painted plaster
- light interior wall
- classroom tile/floor
- wood/laminate
- painted/structural metal
- plastic
- glass
- paper/cardboard

Default targets:
- non-metals: metallic ~= 0
- painted/laminate surfaces: medium-high roughness
- metal frames: higher metallic with controlled roughness
- glass: low roughness + alpha/transmission approximation appropriate to browser budget

Avoid one unique heavyweight material per repeated asset.

## 6. Texture convention

V1 classroom assets are intentionally texture-light and rely on material response/geometry. When textures are introduced:
- prefer reusable 1K or lower textures for repeated props unless a close-up proves otherwise
- base-color textures use sRGB
- normal/roughness/AO are linear
- reuse texture sets across variants
- pack channels where the deployment path benefits
- add KTX2/Basis compression only after runtime/deployment verification

## 7. Collision meshes

Visual GLB geometry does **not** define gameplay collision by default.

Use simple collision proxies:
- desk: one approximate body collider
- chair: one seat/body collider
- teacher desk/cabinet: simple box proxy
- door: fitted leaf/frame collision
- walls/floors: authored shell collision

Collision proxies must be invisible and named predictably.

## 8. LOD policy

Do not add LOD automatically.

Add an LOD only when:
- the asset is visible at materially different distances
- profiling shows geometry cost matters
- switching does not create obvious classroom pop

For a single room, instancing/reuse is preferred over premature LOD complexity.

## 9. Instancing policy

Repeated classroom furniture:
- load each GLB once
- instantiate from one `AssetContainer`
- deterministic placement data owns row/column layout
- use thin instances only if profiling proves normal instancing insufficient and individual transforms/interactions are unnecessary

Current classroom V1 uses ordinary model instantiation to retain simple per-placement transform ownership.

## 10. Lighting asset conventions

Lighting fixtures are split into:
- visible fixture asset
- runtime light source(s)

Do not bake one point light into every repeated fixture GLB.

Normal classroom baseline:
- bright/readable
- practical/daylight balance
- no default horror grading

Uncanny lighting is an event state layered later.

## 11. Character / animation future compatibility

Environment assets must not block later humanoid use.

Future character pipeline should support:
- humanoid GLB
- reusable rig
- locomotion/idle/sitting/talking/phone/typing states
- first-person body/hands
- optional full-body cinematic/reflection rendering

Final protagonist/NPC appearance remains `TBD_USER_APPROVAL`.

## 12. Provenance

Every external asset requires:
- source URL/provider
- license
- author if required
- attribution requirements
- modification notes
- shipping suitability

Project-authored assets must still be listed in the relevant provenance document so the absence of external licensing is explicit.

## 13. Browser budget

Classroom pass targets:
- repeated furniture via reusable GLBs/instances
- no per-desk unique textures
- avoid heavyweight post-processing
- no runtime asset-generation work
- all GLBs must return HTTP 200 with no runtime exceptions
- representative room traversal should remain smooth on the authorized test device

Track:
- GLB byte sizes
- scene mesh/instance count
- FPS during actual browser traversal
- JS bundle growth
- console/network failures

## 14. Review gate

A production asset is not accepted from code inspection alone.

For each meaningful pass:
1. launch the real Chrome build
2. capture matched viewpoints
3. inspect scale/orientation/floor alignment/clipping
4. inspect spacing and navigation
5. inspect material response and lighting
6. check collision
7. check console/network
8. record remaining placeholder debt

Current classroom evidence:
- before: `docs/playtest/classroom-asset-pass-before/`
- latest 5×3 correction: `docs/playtest/classroom-asset-pass-5x3-clean/`
