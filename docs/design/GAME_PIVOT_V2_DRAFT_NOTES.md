# GAME PIVOT V2 — DRAFT NOTES

Status: **DRAFT — NOT CANON — WAITING FOR USER REVIEW**  
Owner of final narrative/canon decisions: **User / primary writer**  
Base technical checkpoint: `chapter-1-vertical-slice`  
Implementation status: **DESIGN ONLY — DO NOT START CHAPTER 2**

## 1. Purpose of the pivot

The project is pivoting from a mostly linear first-person psychological investigation/horror structure into a broader first-person narrative campus-life RPG / life-sim structure.

The new target experience is:

> A grounded, funny, ordinary student-life experience set at a fictional technology university in Hanoi, with an uncanny/scary layer that slowly grows inside familiar routines.

The game should feel lived-in before it feels frightening.

The previous Chapter 1 remains valuable as a technical and tonal prototype, but is not automatically the canon Chapter 1 of the new game.

## 2. What remains useful from the current Chapter 1

Keep and reuse the existing technical foundations where they remain appropriate:

- first-person movement and camera
- interaction targeting and interaction ownership
- inspection/camera choreography
- save/load and checkpoint state
- event sequencing
- evidence/state infrastructure where reusable
- deterministic KCR foundations
- audio direction infrastructure
- browser/WebGPU/WebGL deployment foundation

The old Chapter 1 should now be treated as:

- a technical proof-of-concept
- a first-person feel prototype
- a reusable systems source
- a reference for “familiar place, slightly wrong”

Do **not** assume its current narrative beats remain canon.

## 3. New high-level fantasy

The player experiences the POV of a student at a **fictional technology university in Hanoi**.

Placeholder working protagonist name: `Bắc`  
Placeholder university name: **TBD_USER_APPROVAL**

The player should experience recognizable student life:

- first day / first enrollment period
- getting lost on campus
- meeting classmates
- awkward social situations
- lectures and practical classes
- casual classroom conversations
- deadlines and coding assignments
- quizzes and attendance pressure
- commuting / traffic
- food, cafés, campus breaks
- late-night study sessions
- exams
- semester breaks / going home
- internship/job-search phases later in the game
- unexpected campus disruptions such as outages or schedule changes

These are examples and **not final chapter canon**.

## 4. Tone

Every major chapter/arc should contain humor.

Humor should come from believable student behavior rather than detached comedy scenes:

- awkward internal monologue
- failed attempts to look confident
- strange classmates
- social embarrassment
- class/group-chat banter
- procrastination
- exaggerated self-confidence immediately contradicted by reality
- contemporary student meme/trend energy where it can age gracefully

The game should feel raw, ordinary, funny, and recognizable.

Humor must not erase emotional sincerity.

## 5. Early chapter ideas — provisional only

### Chapter 1 — First day / enrollment

Possible themes:

- excitement entering a new university
- unfamiliar buildings and crowds
- new classmates
- social awkwardness
- curiosity and first impressions
- tutorial mechanics integrated naturally into finding rooms, checking the phone, talking to people, and navigating campus

The uncanny layer should be extremely light at first.

### Chapter 2 — First classes

Possible themes:

- settling into routine
- talking with classmates
- awkward attempts at socializing
- distinctive or strange classmates
- minor classroom comedy
- early assignments and class culture

### Chapter 3 — Deadline spiral

Possible themes:

- coding late at night
- growing workload
- sleep loss / fatigue
- complaining about assignments
- discovering shortcuts or questionable student habits
- attendance/quiz pressure as narrative texture
- procrastination and attempts to recover

The game may portray ethically questionable student behavior as part of the story, but should not turn it into a real-world cheating tutorial.

### Arc 4+ — Reality starts slipping

Daily-life simulation must continue even after the uncanny layer becomes stronger.

Possible ongoing life content:

- classes
- friends
- nighttime outings
- internships
- deadlines
- semester events
- weekends
- going home
- commuting
- ordinary campus frustrations

The mystery/scary layer should invade ordinary life instead of replacing it.

## 6. Uncanny / scary direction

Do not turn the project into a generic haunted-house exploration game.

Target feeling:

> Familiar routines become subtly wrong.

Potential channels for KCR / uncanny changes:

- room numbers
- schedules
- phone messages
- class lists
- signage
- NPC memory/awareness
- classroom/campus routes
- documents
- audio
- reflections
- physical layout
- saved memories / contradictory recollections

Possible larger twist direction:

The protagonist may eventually access a hidden/third layer of reality connected to the university.

The cause should remain ambiguous until the user approves the final narrative explanation. Fatigue, stress, perception, institutional history, and actual supernatural/metaphysical causes may all be possible interpretations during development.

## 7. Sensory stress sequences

The game can use sensory design during intense academic-pressure scenes:

- narrowed attention
- environmental sound compression
- keyboard/fan/laptop noise becoming dominant
- controlled heartbeat-like audio
- brief visual fatigue / blinking motifs
- music intensity rising
- UI pressure
- time pressure

Use these sparingly and with gameplay readability preserved.

Do not rely on constant flashing or aggressive horror effects.

## 8. Sensitive themes

If later chapters deal with severe stress, burnout, despair, or other mental-health themes, they should be handled as character/narrative material rather than spectacle.

Do not use self-harm as a joke, reward, mechanic, or graphic scene.

Private/adult-coded humor, if kept at all, must remain non-explicit and imply rather than depict sexual activity.

## 9. Characters

Future target:

- actual 3D NPCs rather than static props
- reusable rig/animation system
- schedules and locations
- dialogue/reaction states
- interaction states
- social relationship state where needed

The protagonist should eventually have a 3D body suitable for:

- visible first-person hands/body where appropriate
- sitting
- phone use
- typing/coding
- opening doors
- carrying objects
- other authored interactions
- optional third-person/cinematic/reflection shots where appropriate

Exact protagonist appearance requires user approval.

## 10. World structure

Move away from a purely chapter-corridor structure toward a linked campus-life world.

The first new vertical slice should stay small and dense rather than attempting an entire university.

Possible first-slice locations:

- campus entrance / approach
- one main academic building
- one classroom
- corridor / stair / common area
- food/café or student rest area
- room/dorm/rented-room home base
- one exterior route

Final map topology requires user approval before becoming canon.

## 11. New core systems likely required

Provisional architecture targets:

- WorldTime / Calendar
- Day/semester progression
- Timetable / class schedule
- EventScheduler
- NPC schedule/lifecycle
- dialogue system
- social/relationship state where needed
- activities / quest system
- phone system
- messaging / announcements
- campus location/world-state system
- persistent day-state save structure
- expanded KCR capable of changing both physical and informational reality

This list is provisional and should be validated by a dedicated technical design phase before implementation.

## 12. Naming / real-world references

Do not use real university names, logos, official slogans, campus maps, uniforms, or other identifiable institutional branding as canon without explicit approval.

The intended setting is a **fictional technology university in Hanoi**, inspired by the broad texture of Vietnamese student life rather than an exact reproduction of a specific real institution.

## 13. Narrative authority

The user is the primary writer / final narrative authority.

AI may:

- organize notes
- propose options
- check continuity
- identify technical requirements
- draft non-canon alternatives
- help implement approved material

AI must not silently promote draft story ideas into canon.

Major chapter content, twists, endings, major character decisions, and institutional identity require explicit user approval.

## 14. Current stop condition

Do not begin Chapter 2 from the old narrative.

Do not implement the new story yet.

Next intended design deliverables, only after user approval:

1. GAME PIVOT V2 specification
2. TECHNICAL REQUIREMENTS V2
3. VISUAL PRODUCTION WORKSHOP V1
4. new chapter/semester structure
5. new vertical-slice scope
