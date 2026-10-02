# Gameplay Specification

## Current gameplay thesis

The player should feel like they are **living through university life in first person**, not walking through a level built only to deliver exposition.

Ordinary actions are allowed to carry gameplay value.

## Baseline loop

A typical student-life sequence may involve:

1. arrive in a familiar place
2. understand the immediate situation
3. move and look around naturally
4. interact with people or ordinary objects
5. make one or more small choices
6. receive believable reactions/consequences
7. continue the routine or objective
8. occasionally encounter a larger narrative or uncanny event

The exact story beats are not yet canon.

## Movement and camera

Movement should be:
- grounded
- smooth
- responsive
- precise in classrooms and corridors
- comfortable for long first-person sessions
- resistant to input sticking, clipping and out-of-bounds falls

Avoid exaggerated head bob, excessive inertia and effects that make ordinary navigation tiring.

## Interaction language

Primary rule:

**look at a meaningful object/person and use one clear primary interaction.**

Reusable interaction categories:
- inspect
- sit / stand
- open / close
- pick up / place
- use / operate
- read
- check phone
- talk / respond
- transition between authored zones

Important interactions may use short camera/animation choreography, but the game should return control cleanly.

## Small-choice structure

Not every choice needs a permanent route.

For low-stakes choices:
- allow the player to try alternatives
- give each alternative a distinct reaction, joke, inconvenience or small consequence
- when needed, guide the player naturally back toward the state required for the main narrative to continue

Avoid obvious invisible walls in choice design when a believable in-world consequence can redirect the player.

## Major-choice structure

Only decisions with sufficient narrative weight should create long-term state or route divergence.

The exact major route system is not yet approved.

## Student-life systems to validate gradually

Potential reusable systems:
- seat interaction
- classroom routine state
- phone/messages
- dialogue/reaction state
- NPC presence/schedules where useful
- timetable/calendar later if justified
- classroom props and personal items
- modular scene/zone transitions
- persistent choice/world-state flags

Do not implement a giant life-sim framework before concrete gameplay needs it.

## Fail states

Routine student-life sequences should prefer recoverable consequences over traditional death/fail screens.

A wrong low-stakes choice can:
- create an awkward interaction
- waste time
- trigger a funny response
- force the player to reconsider
- redirect to another valid action

Soft-lock prevention remains mandatory.

## Strange / uncanny gameplay

The project may later use altered information, changed objects, contradictory spaces or other uncanny events.

These are secondary to the student-life baseline and must be authored for specific scenes.

Do not make ordinary rooms permanently dark, distorted or horror-coded by default.

## Current gameplay proof target

The first proof target is a **single polished classroom experience in P202**.

It should prove:
- believable movement at classroom scale
- useful desk/chair interactions
- natural first-person roleplay
- at least one polished social or situational gameplay sequence
- smooth camera/control ownership
- reusable foundations for later classroom scenes

Exact event dialogue and chapter canon require user approval before being treated as final.
