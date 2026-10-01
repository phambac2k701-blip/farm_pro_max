# Testing and Playtest Strategy

## Why
This project can be technically “correct” while still feeling bad. Automated tests and real playtests are both required.

## Automated testing targets
Prioritize logic that can break deterministically:
- world-state updates
- evidence discovery
- reality-shift condition evaluation
- save serialization/deserialization
- chapter progression
- interaction state machine
- camera-state transitions where testable without rendering

## Runtime smoke tests
Every playable build should verify:
- engine starts
- scene loads
- player spawns
- pointer lock enters/exits
- player can move
- collision works
- interaction target can be acquired
- inspection can enter and exit
- no fatal console errors

## Manual game-feel pass
For movement:
- start/stop response
- diagonal speed
- wall sliding
- corners
- stairs/ramps
- mouse sensitivity
- low/high FPS behavior
- browser tab focus changes

For interaction:
- approach from different angles
- trigger at distance boundary
- spam interact
- cancel during camera blend
- lose browser focus during interaction
- exit and re-enter
- interact after world state changes

## Visual pass
- camera clipping
- shadow artifacts
- unreadable dark areas
- excessive post-processing
- texture blur/pop
- object scale
- evidence text readability

## Performance pass
Record:
- average FPS
- worst obvious hitch
- scene load duration
- major asset download size
- GPU-heavy effects

## Browser matrix
Prototype:
- Chrome/Chromium
- Firefox

Later:
- Edge
- Safari/macOS

## Screenshot/capture rule
Screenshots are evidence for visual regression and art direction, not a substitute for playing the build.

Capture:
- representative gameplay view
- hero interaction
- reality-shift before/after
- any visual bug being fixed

## Release gate for a chapter
A chapter is not “done” if:
- a required clue can soft-lock
- camera can get stuck
- save/load breaks its state
- browser refresh loses expected progress
- performance is visibly unstable in target hardware class
