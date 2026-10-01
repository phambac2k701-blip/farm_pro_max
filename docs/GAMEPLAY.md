# Gameplay Specification

## Core loop
1. enter a location
2. observe
3. move freely in first person
4. notice points of interest
5. inspect meaningful objects
6. collect evidence or context
7. form/advance a hypothesis
8. unlock a new investigative path
9. revisit or continue
10. observe reality change as knowledge changes

## Movement feel
The player should feel like a person exploring cautiously, not an action hero.

Movement qualities:
- grounded
- smooth
- responsive
- low visual noise
- consistent speed
- believable stopping
- precise looking

Avoid:
- exaggerated head bob
- inertia that fights the player
- FPS-style weapon movement conventions
- constant sprinting
- motion blur that obscures clues

## Looking
Mouse look is unrestricted within ordinary first-person rules.

The player can:
- turn around
- look up/down
- inspect ceilings/floors
- look under or behind objects when level geometry permits

## Interaction language
The player should learn one consistent rule:
**look at something meaningful and use one primary interact action.**

The object and context determine what happens.

### Interaction categories
- inspect
- open/close
- pick up
- operate
- read
- listen
- place/use
- transition through door/entry

Avoid large radial menus unless a genuinely multi-action object needs them.

## Hero interactions
Important clues use authored micro-cinematics.

### Standard sequence
1. acquire target
2. enter interaction lock
3. camera moves naturally toward the object
4. hands/object animation may play if needed
5. object becomes manipulable/readable
6. evidence/event may trigger
7. player exits
8. camera returns naturally
9. locomotion unlocks

### Book example
- camera bends/leans toward table
- book shifts into readable position
- cover opens
- pages turn
- player can focus on a note
- discovery becomes evidence only when the relevant content is actually inspected
- closing restores control without snapping

## Investigation
The game should reward observation rather than pixel hunting.

Clues can be:
- physical object
- document
- photograph
- audio recording
- environmental inconsistency
- timeline contradiction
- changed architecture
- NPC-recorded testimony later if characters are added

## Evidence
Evidence is not automatically “the truth.”
Evidence is a recorded fact/artifact the player has found.

Evidence can:
- unlock journal entries
- satisfy reality-shift conditions
- connect to another clue
- contradict another item
- open a chapter route

## Hypotheses
The long-term system may allow players to connect evidence or select interpretations.

Important rule:
The game should not instantly grade every hypothesis as correct/incorrect.
Consequences and later evidence should reveal quality.

## Knowledge Changes Reality
The world may change after the player learns something.

Good shifts:
- subtle enough to create doubt
- materially meaningful to investigation
- persistent
- foreshadowed or retrospectively understandable

Bad shifts:
- random visual glitch with no narrative meaning
- frequent cheap scares
- changes so hidden that progression becomes guessing

## Fail states
The MVP should avoid traditional death/combat fail states.
Primary friction is deduction and exploration.

Soft-lock prevention is mandatory.
If the player misses a clue required for progress, there must be a discoverable path back to it.

## Chapter rhythm
Typical short chapter:
1. arrival / calm
2. first anomaly
3. investigation
4. contradiction
5. deeper access
6. reality shift
7. reveal
8. unresolved hook into next chapter

## Replay value
Replay comes from:
- understanding earlier foreshadowing
- alternate investigation order
- optional evidence
- changed interpretation
- possible later branching decisions

Do not rely on collectible spam.
