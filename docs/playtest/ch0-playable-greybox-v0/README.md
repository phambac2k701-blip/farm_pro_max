# Chapter 0 Playable Greybox V0 — browser evidence

Date: 2026-10-03
Branch: `phase-v2/ch0-playable-greybox-v0`
Implementation base: coordinator remote `9c3efe9`
Narrative source read: `phase-v2/ch0-script-layout-v0` @ `c5c0af1`

## Browser verification

Chrome headless was launched against the live Vite dev server with a dedicated profile and a 12 s virtual-time budget.

Autoplay routes use the same `Chapter0Game.performAction()` API reached by manual E interactions.

Verified routes:
- `default`: PASS → `CH0-END`, complete=true, nav=`ask_staff`, missedBus=false
- `self-nav`: PASS → `CH0-END`, complete=true, nav=`self_navigate`, missedBus=false
- `missed-bus`: PASS → `CH0-END`, complete=true, nav=`follow_students`, missedBus=true

Screenshots:
- `default-route.png`
- `self-nav-route.png`
- `missed-bus-route.png`
- `street-midroute.png`
- `bus-midroute.png`
- `uet-midroute.png`

## Scope / authority notes

This is a playable greybox, not final canon or final art.

The helper-passenger fare treatment, administrative procedure details, exact campus layout, ATM placement, recurring-driver identity/appearance/personality, and final flyby vehicle remain replaceable / approval-sensitive where the narrative sources say so.

The Chapter 0 spaces are authored as local transition zones and do not add a fifth major map to the current four-map world scope.

The blink transition is a short dip-to-black. It intentionally avoids a white flash/strobe treatment.

Final default-route Chrome logging check:
- browser exit: 0
- JavaScript console lines: 0
- fatal error element: hidden and empty
- autoplay status: passed
