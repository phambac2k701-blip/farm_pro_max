# Chapter 1 BAC-31 Final Verification / Deployment Gate

Date: 2026-10-02  
Branch: `integration/narrative-v1.2`  
Final checkpoint ref: `chapter-1-vertical-slice`  
Gameplay checkpoint commit: `9e4918697663330e02bcfab226c2e823960dbab1`

## Result

**CHAPTER 1 VERTICAL SLICE COMPLETE**

BAC-22 through BAC-31 are complete. This checkpoint stops at the Chapter 2 boundary; no Chapter 2 gameplay is implemented or started.

## Automated gate

- 21/21 test files pass.
- 72/72 tests pass.
- TypeScript typecheck passes.
- Production Vite build passes.
- `git diff --check` passes.
- Chapter 1 production CI passed twice on gameplay commit `9e49186`: runs `36947214132` and `36947218814`.
- Main JS remains approximately 1.38 MB minified / 338 KB gzip and still triggers the known Vite chunk warning.

## Clean-save real-browser Chapter 1 gate

A fresh production save was removed before the run. The browser traversal then exercised the live Chapter 1 runtime and interaction/controller stack.
Verified path:

- opening phone completed and C01 awarded
- old-wing and classroom checkpoints reached
- roster inspection awarded C03
- class-photo comparison awarded C02
- drawer contradiction awarded C05
- PA labels awarded C04
- PA index card awarded C07
- optional C14 intentionally skipped and did not block progression
- KCR-A stayed hidden at ready state, then applied only after leave/re-entry
- ninth PA station restored and ninth-headset interaction executed
- climax completed at `ch01_climax_complete`
- final reflection armed and vanished only after sustained direct look
- final corridor exit completed Chapter 1
- resulting state is chapter `ch02`, checkpoint `ch01_complete`, with look/locomotion locked at the boundary

Full machine-readable evidence: `docs/playtest/ch01-bac31-full-playthrough.json`.

## Runtime / recovery / regression

BAC-30's same-build regression matrix covers clean, mid-Ch1, pre-KCR, ready-before-reentry, post-KCR, inspection reload, climax resume, chapter-end reload and corrupt-save recovery. It also covers repeated interact, Escape/cancel, focus loss, collision and representative screenshots.
Final BAC-31 browser audit:

- runtime exceptions: 0
- HTTP responses >= 400: 0
- console errors: 0
- AudioDirector after trusted input: ready, unlocked, 0 failed cues
- one non-blocking Chromium autoplay-policy warning is emitted while AudioContext is initialized before the first trusted gesture; audio then unlocks normally
- foreground RAF confirmation: 61 frames over approximately 1.013 seconds on the authorized desktop

## Presentation checkpoint

BAC-30 raised exposure/ambient/classroom practical lighting and entrance readability without changing the night/rain/fluorescent horror direction. The representative actual-build captures remain:

- `docs/playtest/ch01-vs-01-gate.png`
- `docs/playtest/ch01-vs-02-classroom.png`
- `docs/playtest/ch01-vs-03-pa-before-kcr.png`
- `docs/playtest/ch01-vs-04-pa-after-kcr.png`
- `docs/playtest/ch01-vs-05-boundary.png`

## Deployment

Successful GitHub Pages workflow run: `36949570331`  
Preview: https://phambac2k701-blip.github.io/farm_pro_max/

The first dispatch (`36949330514`) was blocked before any job step because the `github-pages` environment allowed only `main` and `prototype/bootstrap-3d`. The existing policies were preserved and `integration/narrative-v1.2` was added as an allowed deployment branch; the rerun then passed test, typecheck, build, artifact upload and Pages deployment.

Public-production smoke after deployment:
- HTTP 200
- `data-scene-ready="ch01-production-shell"`
- WebGL production backend active
- AudioDirector ready
- fatal-error UI hidden
- Chapter 1 runtime audio resources loaded from the Pages path

## Reusable Chapter 1 systems

- versioned SaveService + durable ChapterRuntime checkpoints
- InteractionSystem + InteractionBehaviorHost
- CameraDirector + reusable inspection controllers
- typed EvidenceSystem over GameState
- deterministic RealitySystem / KCR condition application
- AudioDirector with spatial/caption support
- Chapter 1 opening, climax and finale controllers

## Known non-blocking debt

- large main production JS chunk / no final code-splitting pass
- broad cross-browser and low-end hardware profiling remain incomplete
- desktop keyboard/mouse remains the production target for this slice
- save schema v2 has robust validation but no future migration design yet
- scene art is still primarily procedural/simple geometry and standard materials rather than final authored environment assets
- Chromium can emit the benign pre-gesture AudioContext autoplay warning described above

## Stop point

Do not begin Chapter 2 gameplay from this checkpoint. A new explicit instruction and next-phase plan are required before implementation resumes.
