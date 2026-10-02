# Chapter 1 BAC-30 Presentation / Recovery / Regression Pass

Date: 2026-10-02  
Branch: `integration/narrative-v1.2`

## Scope

BAC-30 is a bounded stabilization pass on the finished Chapter 1 path. It does not add new narrative beats or Chapter 2 gameplay.

## Presentation changes

- Corrected the production dynamic-sign texture orientation and the gate-facing school sign so Vietnamese signage is readable.
- Raised scene exposure from 1.2 to 1.3 and ambient night light from 0.50 to 0.68.
- Added a practical exterior entrance fluorescent light and expanded its useful range.
- Increased classroom practical light readability and modestly lifted tile/wood/metal values.
- Retained the night/rain/fluorescent palette; the goal is readability, not daylight.
- Added an empty data favicon so clean browser smoke no longer produces favicon 404 console/network noise.

Representative captures:

- `docs/playtest/ch01-vs-01-gate.png`
- `docs/playtest/ch01-vs-02-classroom.png`
- `docs/playtest/ch01-vs-03-pa-before-kcr.png`
- `docs/playtest/ch01-vs-04-pa-after-kcr.png`
- `docs/playtest/ch01-vs-05-boundary.png`

## Save / recovery matrix

Real Chromium runtime restores were executed against SaveService schema v2.

| State | Result |
| --- | --- |
| clean new game | PASS — ch01_gate, opening active, no fatal state |
| mid-Ch1 | PASS — checkpoint restored, opening skipped, gameplay input restored |
| pre-KCR | PASS — C03 without C07 does not ready/apply KCR; ninth station hidden |
| ready before re-entry | PASS — C03+C07 ready state restored; ninth station remains hidden |
| post-KCR | PASS — ninth station/collision/world variant restored |
| during inspection reload | PASS — active roster inspection is discarded safely; camera/input return to gameplay |
| climax resume | PASS — saved climax step resumes without restarting the opening/KCR |
| chapter end | PASS — ch02 boundary restored; Ch1 content does not replay |
| corrupt save | PASS — invalid storage is cleared; game boots at clean ch01_gate |

C14 was deliberately absent from the mandatory recovery states and never blocked progression.

## Interaction / input regression

Real browser input checks:

- repeated E input while opening the classroom drawer did not duplicate the interaction or C05
- Escape during an in-flight drawer close rolled back to the stable open state and restored input ownership
- browser blur while W was held cleared movement; X/Z position remained stable after focus loss
- corridor wall collision stopped the player body at approximately x=-1.0865 instead of penetrating the wall
- reload from a live roster inspection restored camera state to `gameplay`, interaction to idle, locomotion/look to enabled, and hid the inspection overlay

## Browser / network / performance smoke

Fresh Chrome profile, clean new-game reload:

- scene ready: `ch01-production-shell`
- fatal state: none
- AudioDirector ready with 0 failed cues
- runtime exceptions: 0
- HTTP responses >= 400: 0
- console warnings/errors collected by the audit: 0
- RAF sample: 121 frames over ~2.015s, approximately 60.06 FPS on the authorized desktop

The dev-server resource count/transfer size is not a production payload measurement. Production build size remains tracked separately.

## Automated gate

- 21 test files pass
- 72 tests pass
- TypeScript typecheck passes
- production Vite build passes
- `git diff --check` passes

Known non-blocking debt:
- main production JS remains approximately 1.38 MB minified / 338 KB gzip and triggers Vite's 500 KB warning
- low-end hardware and broad cross-browser performance remain outside this single-machine BAC-30 gate and are carried to the final verification/debt record
