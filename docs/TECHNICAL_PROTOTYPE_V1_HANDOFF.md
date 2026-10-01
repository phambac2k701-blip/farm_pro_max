# Technical Prototype V1 Handoff

Status: **TECHNICAL PROTOTYPE V1 COMPLETE**  
Stop point: **intentional — do not continue execution without a new user instruction**  
Branch: `prototype/bootstrap-3d`  
Checkpoint tag to create on final commit: `technical-prototype-v1`  
Preview: https://phambac2k701-blip.github.io/farm_pro_max/

## Systems working now

- Babylon.js engine bootstrap with WebGPU preference and WebGL fallback path.
- first-person keyboard movement, pointer-lock look, grounded collision, focus-loss safety.
- hallway/classroom graybox with reusable primitive/furniture construction.
- deterministic center-screen interaction targeting and interaction ownership.
- reusable camera inspection choreography with smooth focus/restore/cancel.
- hero-book inspection flow with opening, page navigation, close/cancel, readable dynamic pages and placeholder SFX.
- typed GameState + event bus.
- evidence registry/discovery composed over GameState.
- knowledge-driven RealitySystem with data-driven conditions and persisted application facts.
- controlled Babylon intersection trigger for the 8-desk → 9-desk reality variant.
- versioned SaveService with Valibot validation, autosave, reload restoration and corrupted-save recovery.
- GitHub Pages preview workflow with test/typecheck/build gate.

## Still prototype-only

- all environment geometry, desk/book visuals, materials, lighting and audio.
- the single hallway/classroom scene and one book interaction.
- the single evidence clue and single reality-shift rule.
- DOM prompt/notification styling.
- localStorage persistence and schema-v1 reset-on-invalid policy.
- performance/loading setup for the very small prototype content set.

These prove the technical loop; they are not final Chapter 1 content.

## Reusable for Chapter 1

Keep and compose these shared systems:
- `EngineAdapter`
- `PlayerController` / `InputRouter`
- `InteractionSystem` / `InteractionStateMachine`
- `CameraDirector`
- `GameState` / `GameEvents`
- `EvidenceSystem`
- `RealitySystem`
- `SaveService`
- shared scene/furniture construction patterns
- reusable object behavior composition pattern demonstrated by `BookInspectionController`

New object behaviors such as Photo, Drawer, Door, Pickup, Cassette or Laptop should compose the shared interaction/camera/state/audio systems rather than introduce separate object frameworks.

Scripted horror events should remain compositions of Trigger + Camera/Screen FX + Audio + Lighting + World/Reality changes, not a dedicated scare framework.

## Known technical debt / limitations

- main production JS chunk remains ~1.36 MB minified / ~332 KB gzip; code splitting/loading strategy is deferred.
- WebGL fallback is automated-test verified but not manually cross-browser playtested.
- authored/spatial audio pipeline is not yet production-ready; current book audio is placeholder.
- save schema has validation/versioning but no migrations.
- no asset streaming/manifest-driven production loading yet.
- no gamepad/mobile input work.
- low-end hardware performance has not been profiled.
- current preview is GitHub Pages because the local Vercel token was invalid during BAC-21 verification.

See `docs/PLAYTEST_LOG.md` for the verification evidence.

## Do not continue without a new handoff

Until the user supplies a new narrative/content/production instruction, do **not**:
- create BAC-22;
- start Chapter 1 production;
- write or expand narrative;
- expand the map;
- add new mechanics or object types;
- replace graybox assets with speculative content;
- start Task 12 / foundation-review work automatically;
- refactor BAC-11→21 systems merely for cleanup;
- change architecture to fit a new library.

The next session should first read `docs/SESSION_CONTINUITY.md`, `docs/PROGRESS.md`, this handoff, and the relevant bibles/specs, then wait for the user's explicit next-phase instruction.
