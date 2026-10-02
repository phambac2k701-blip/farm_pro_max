# Gameplay Specification

## Current gameplay thesis

The player should feel like they are **living through university life in first person**, not walking through a level built only to deliver exposition.

Ordinary actions are allowed to carry gameplay value.

## Baseline loop

A typical student-life sequence may involve:

1. arrive in a place
2. understand the immediate situation
3. move and look around naturally
4. interact with people or ordinary objects
5. make one or more small choices
6. receive believable reactions/consequences
7. continue the routine or objective
8. reach a larger social, personal, or narrative event when the scene calls for it

Exact scene/event details remain user-approval-gated.

## Movement and camera

Movement should be:
- grounded
- smooth
- responsive
- precise in classrooms/corridors
- comfortable for long first-person sessions
- resistant to stuck input, clipping and out-of-bounds falls

Avoid exaggerated head bob, excessive inertia and tiring camera effects.

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

Important interactions may use short camera/animation choreography, but the game must return control cleanly.

## Small-choice structure

Not every choice needs a permanent route.

For low-stakes choices:
- allow the player to try alternatives
- give alternatives distinct reactions, jokes, inconveniences or small consequences
- when needed, guide the player naturally back toward the state required for the main narrative to continue

Prefer believable in-world consequences over obvious invisible choice walls.

## Long-term choices

Only decisions with sufficient narrative weight should create expensive long-term route divergence.

The exact long-term route system remains TBD.

## Student-life systems to validate gradually

Potential reusable systems:
- seat interaction
- classroom routine state
- phone/messages
- dialogue/reaction state
- NPC presence/schedules where useful
- timetable/calendar when justified
- classroom/student props
- modular scene/zone transitions
- persistent choice/world-state flags

Do not implement a giant life-sim framework before concrete scenes need it.

## Academic-life rule

Study is a background structure, not the sole gameplay subject.

Classes, schedules, assignments and exams may create:
- timing pressure
- reasons to travel
- social situations
- group interactions
- routine
- jokes
- changes of plan

Do not turn the game into a study simulator unless a specific academic activity is genuinely interesting to play.

## Current narrative-gameplay boundary

The approved Chapter 0–3 macro is grounded student life.

Do not add unrelated mystery/special-event content into those chapters unless the user later approves it.

Generic conditional-state technology may remain in the engine, but content should be driven by approved student-life scenes, character continuity, humor and personal development.

## Current environment/gameplay proof target

The room-level proof target is still a polished classroom/student-life interaction set.

The active art branch is simultaneously expanding toward a larger Giảng đường 4 map.

Therefore:
- build reusable room interactions
- avoid assuming the final building topology until the art update lands
- integrate gameplay with the map rather than forcing the map to fit an old scene script

The first classroom gameplay should prove:
- believable movement at classroom scale
- useful desk/chair interaction
- natural first-person roleplay
- polished social/situational micro-events
- smooth camera/control ownership
- reusable foundations for later student-life scenes

Exact dialogue and detailed chapter events require user approval.
