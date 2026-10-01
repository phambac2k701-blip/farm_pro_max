# ADR-0001: Browser-first 3D with Babylon.js

Date: 2026-10-01
Status: Accepted for prototype

## Context
The game must support true first-person movement in real 3D space:
- walk through rooms/hallways
- freely look around
- inspect objects
- use authored camera transitions
- remain easy to distribute as a link

A 2D/2.5D approach cannot satisfy the required spatial freedom.

## Decision
Use Babylon.js with TypeScript for the initial browser-first prototype.

Preferred rendering:
- WebGPU when supported
- WebGL fallback for compatibility

Runtime assets:
- glTF/GLB

## Why
Babylon.js provides a mature browser 3D stack covering:
- real-time rendering
- cameras
- collision/physics integration
- picking
- animation
- glTF loading
- post-processing
- audio integration paths
- WebGPU support

The browser-first architecture preserves the project's strongest distribution advantage: the player can open a link and play.

## Consequences
Positive:
- no native install required for first builds
- rapid sharing/deployment
- TypeScript codebase is well suited to agent-assisted development
- full 3D first-person gameplay remains possible

Costs:
- tighter performance/asset budgets than a native-only build
- browser/device variance
- some advanced rendering features may need fallbacks
- careful loading/compression strategy required

## Revisit trigger
Re-evaluate the engine if the prototype cannot achieve:
- stable target performance
- acceptable camera/controller feel
- required visual quality
- reliable interaction complexity

Do not switch engines based only on fear or preference; switch only with measured prototype evidence.
