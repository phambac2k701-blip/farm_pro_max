# UI / UX Bible

## Principle

The player should spend attention on the 3D world, not on a permanent HUD.

## Default gameplay HUD

Keep minimal:
- small center reticle only when useful
- interaction prompt only when a valid target exists
- short contextual objective/hint only when needed
- no health/ammo HUD for the current non-combat direction
- no permanent minimap requirement

## Interaction prompt

Prompts must:
- be readable
- appear consistently
- avoid covering the object/person
- communicate the primary action clearly
- disappear cleanly when the target is lost or interaction begins

## Interaction / seated states

When an authored interaction owns the camera or player:
- control ownership must be obvious
- cancel/exit must be reliable where cancellation is allowed
- camera transitions must not snap unnecessarily
- sit/stand transitions should return the player to a stable valid position

## Phone

The phone is a likely high-value student-life interface for:
- messages
- announcements
- timetable/class information where approved
- short notifications
- story/context delivery

Do not overload it before concrete gameplay needs are approved.

## Dialogue / choices

Choices should:
- be concise
- fit the situation
- avoid presenting every small interaction as a dramatic moral decision
- support short local branches where appropriate
- clearly restore control after the exchange

## Objectives and guidance

Prefer believable guidance:
- environmental cues
- NPC reactions
- protagonist thoughts
- phone information
- contextual prompts

Use explicit markers only when they improve clarity more than they damage immersion.

## Pause/settings

Before public release:
- resume
- sensitivity
- FOV
- motion/head-bob reduction
- audio categories
- subtitle/text settings
- graphics preset where useful
- save/return controls

## Typography

Prioritize:
- Vietnamese readability
- correct accents/diacritics
- comfortable phone/document reading
- clear hierarchy
- no mirrored or reversed in-world text

## Accessibility

- scalable/readable text
- keyboard operability for menus
- sufficient contrast in normal and event lighting
- interaction cues not dependent on color alone
- reduced-flash/flicker option when effects are introduced

## Current P202 UI scope

Keep the first classroom gameplay UI small:
- loading/error state
- reticle
- interaction prompt
- contextual short guidance
- subtitles/dialogue when required
- phone presentation only when the approved sequence needs it
- clean pointer-lock/pause handling
