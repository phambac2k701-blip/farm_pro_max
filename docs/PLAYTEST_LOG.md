# Technical Prototype V1 Playtest Log

Date: 2026-10-01  
Branch: `prototype/bootstrap-3d`  
Milestone: `TECHNICAL PROTOTYPE V1 COMPLETE`  
Preview: https://phambac2k701-blip.github.io/farm_pro_max/  
GitHub Pages workflow run: `36881182705`

## Automated gate

- `npm test`: 33/33 tests pass across 11 test files.
- `npm run typecheck`: pass.
- `npm run build`: pass.
- GitHub Pages deployment workflow reran install/test/typecheck/build and deployed successfully.
- `git diff --check`: pass before checkpoint work.

## Clean-save runtime smoke

Clean localStorage booted successfully with:
- WebGPU selected on the verification machine.
- scene state `ch01-prototype` ready.
- controller ready.
- no fatal-error UI.
- no evidence and no ninth desk before discovery.

Representative screenshot: `docs/playtest/tech-prototype-v1-01-hallway.png`.

## Movement and camera

- Forward movement from the corridor spawn changed player feet from approximately `[0, 0.009, -6.2]` to `[0, 0.009, 2.034]`.
- Corridor end-wall collision stopped the player near `z=7.5865`, with Y remaining approximately `0.009`.
- Canvas click acquired pointer lock.
- Mouse movement changed camera rotation from `[0, 0, 0]` to approximately `[0.2156, 0.6798, 0]`.
- After the ninth-desk variant was active, walking into the new desk collider stopped the player near `z=2.3865`, again with Y approximately `0.009`; no desk-climbing regression was observed.

## Interaction and inspection

- Center-screen targeting resolved the hero book as `int_classroom_hero_book`.
- Prompt rendered `E · Xem cuốn sổ`.
- E entered interaction.
- Camera reached `inspection` state.
- Book reached `reading` state.
- locomotion and look were disabled during inspection.
- Page 1 and page 2 rendered readable upright Vietnamese text.
- Escape returned book to `idle`, camera to `gameplay`, restored look/locomotion, hid inspection controls and restored the reticle.

Representative screenshots:
- `docs/playtest/tech-prototype-v1-02-book-page1.png`
- `docs/playtest/tech-prototype-v1-03-evidence.png`

## Evidence and reality shift

- Page 1 produced no evidence.
- Page 2 resolved `erased-ninth-line` and discovered exactly `ev_ch01_erased_ninth_line`.
- Repeated visits remained idempotent at one evidence item.
- Leaving the classroom through the controlled transition after the clue set the revisit fact and applied `shift_ch01_ninth_desk`.
- Ninth desk became enabled.
- classroom light intensity changed from `1.0` to `0.72` with a cooler tone.
- no explicit “reality changed” popup/text was rendered.

Representative screenshot: `docs/playtest/tech-prototype-v1-04-reality-shift.png`.

## Save/load and invalid-data recovery

Local runtime:
- autosave produced schema version 1 with Chapter 1 facts/evidence/settings.
- reload hydrated evidence and both reality facts.
- `RealitySystem.syncApplied()` restored the ninth desk and 0.72 classroom light immediately.
- corrupted JSON was cleared and the game booted clean with default state and no fatal error.

Deployed production preview:
- a valid schema-v1 localStorage save reloaded with `saveLoaded=true` and `realityShift=shift_ch01_ninth_desk`.
- corrupted JSON reloaded with `saveLoaded=false`, cleared storage, and no fatal error.

## Console and network

Local development smoke:
- browser page errors: none.
- console: Babylon/Vite informational logs only.
- HAR: 89 requests, 0 responses with HTTP status >= 400.

GitHub Pages production preview:
- browser page errors: none.
- console: Babylon WebGPU engine informational logs only.
- HAR: 21 requests, 0 responses with HTTP status >= 400.
- preview screenshot: `docs/playtest/tech-prototype-v1-05-deployed-preview.png`.

## Performance sample

Headless Chrome on the verification machine:
- requestAnimationFrame sample: ~60.3 FPS over ~2 seconds.
- FCP: ~104 ms.
- TTFB: ~3.3 ms.
- CLS: ~0.01.

These are smoke-level local measurements, not a performance guarantee for low-end hardware or real-world networks.

## Findings resolved during BAC-21

No Critical or Important gameplay defects were found.

Deployment findings:
1. Vercel CLI had an invalid/stale local token, and the connected Vercel tool did not expose a usable deploy action for this account.
2. GitHub Pages was used as the preview fallback.
3. Initial Pages run failed before execution because Pages was not yet enabled.
4. After enablement, the `github-pages` environment initially rejected `prototype/bootstrap-3d`; a deployment branch policy for that branch was added.
5. Final workflow run `36881182705` passed all verification/build steps and deployed successfully.

## Known non-blocking limitations

- Main production JavaScript chunk is approximately 1.36 MB minified / 332 KB gzip and still triggers Vite's 500 KB chunk warning. Code splitting is deferred until a content/vertical-slice phase makes loading strategy meaningful.
- Environment, book mesh, lighting, and audio are prototype/graybox quality, not production assets.
- Book SFX are procedural placeholders; perceptual audio quality was not evaluated in headless verification.
- Runtime smoke was performed in Chromium/WebGPU. WebGL fallback is covered by automated tests but has not received a full manual cross-browser playtest.
- Save schema v1 safely rejects unsupported/invalid data but has no migration framework yet.
- Input scope is desktop keyboard/mouse only; gamepad/mobile/accessibility input is not part of this prototype gate.
- Performance numbers above come from the verification machine and should not be treated as low-end-device targets.
