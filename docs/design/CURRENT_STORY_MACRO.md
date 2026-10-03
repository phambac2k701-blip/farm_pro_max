# CURRENT STORY MACRO — UETỐT

Status: **APPROVED MACRO DIRECTION — CHAPTER DETAILS STILL TBD**
Date: 2026-10-02
Narrative owner: **User / primary writer**

## 1. Project title and identity

Approved current title:

> **UETốt**

The project follows the timeline of a UET student.

The title is intentionally playful/self-aware. It should not be treated as an official UET slogan or as institutional branding.

Approved setting identity at this stage:
- UET student-life context
- Hanoi
- real student-life texture may be used as story material

Still not approved by default:
- official logo use
- official color system
- official insignia
- copied official visual identity
- exact full campus master map
- any claim that the game is officially affiliated with UET

## 2. Narrative scope

The game is an **open-ended student-life timeline**, not a closed retrospective story.

Cập nhật sản xuất 03/10/2026: [START_HERE](../START_HERE.md). Ch0 phải có tiến trình và mốc kết thúc chương rõ; open-ended không có nghĩa chương không kết thúc. Điều này không cho phép viết finale toàn game hoặc Ch4+.

The current authored timeline only goes as far as the creator's current lived/student-life material.

Do not manufacture a finale merely because the current build reaches the latest known chapter.

Future chapters may be added later as the creator gains more lived experience or deliberately approves new fictionalized material.

## 3. Current chapter macro

Only Chapters 0–3 currently have an approved macro direction.

### Chapter 0 — Intro / entering university

Final chapter title: **TBD**

Approved content direction:
- protagonist comes from far away and arrives in Hanoi for university
- first visit / first major contact with UET
- confirmation/admission paperwork
- main Xuân Thủy area / main lecture-building context
- everything feels new: roads, traffic, metro, people, school, food, movement through the city
- tone is curiosity + overload + humor
- this is an intro/prologue-like chapter, but it still needs real narrative and gameplay value

Important production note:
- this chapter's main lecture-building/location is **not automatically the current Giảng đường 4 map**

### Chapter 1 — Military-training period

Final chapter title: **TBD**

Approved content direction:
- first-year military-training period
- approximately 45 days as the current remembered scale
- communal life, routine, people, discipline, awkwardness, comedy, small memorable moments
- this chapter should not become an isolated side-story: people, habits, jokes, memories or relationships from it should be able to carry forward

Detailed event list: **TBD_USER_APPROVAL**

### Chapter 2 — University life actually begins

Final chapter title: **TBD**

Approved content direction:
- normal university life begins after military training
- the protagonist's expectation of university collides with the real daily experience
- Giảng đường 4 becomes an important current location
- contrast with the earlier Xuân Thủy/main-campus impression is useful
- everyday friction such as narrow approaches, traffic, cramped movement and recognizable surroundings can support humor
- study/class schedules provide structure, but **studying itself must not dominate the story**

Detailed event list: **TBD_USER_APPROVAL**

### Chapter 3 — Everyday student life / present-day self begins to appear

Final chapter title: **TBD**

Approved content direction:
- focus broadens into ordinary student life rather than only classes
- friends, movement, food, chats, habits, small incidents and routine can carry the chapter
- studying remains background/context rather than the sole subject
- the protagonist develops a visible interest in **vibe coding**
- vibe coding should act as a subtle reflection of the creator's present self
- the meta layer should be understated: observant players may notice the connection without the game explicitly announcing that the protagonist is creating the game they are playing

Detailed event list: **TBD_USER_APPROVAL**

## 4. Chapter 4 and beyond

**LOCKED / NOT DESIGNED YET**

Do not:
- write Chapter 4 as a finale
- add a retrospective ending
- make the protagonist summarize the meaning of the whole university experience
- close the title's meaning with a final moral
- invent Chapters 4+ simply to complete a chapter count

Use the placeholder:

`TBD_FUTURE_LIFE_CHAPTERS`

The current timeline is intentionally open.

## 5. Narrative-linkage rule

Chapters must feel like consecutive parts of one life, not an anthology of unrelated student episodes.

For every chapter, answer:
1. What from the previous chapter continues into this one?
2. What does this chapter establish that can matter later?
3. Which people/places/habits become more meaningful through repetition?
4. Which foreground details deserve later payoff?

Preferred continuity:
- recurring people
- recurring places
- recurring jokes
- changed interpretations of familiar locations
- relationships that evolve
- habits that become routine
- small details that gain meaning later

## 6. Foreground/payoff rule

Not every background object needs symbolic meaning.

However:

> **Anything the game deliberately foregrounds should have a reason to be foregrounded.**

A foreground detail may pay off through:
- character development
- relationship development
- comedy
- later context
- emotional memory
- gameplay consequence
- future foreshadowing

Avoid meaningless "mystery bait" or details that look important but exist only to mislead without purpose.

## 7. Character rule

People the protagonist meaningfully meets should have some role in the protagonist's life.

That role does not need to be dramatic.

A character may matter because they:
- become a friend
- introduce another person
- create a recurring joke
- change a habit
- help the protagonist learn the city/school
- become part of a routine
- cause a small but memorable event
- later reappear in a different context

Do not force every NPC into a large arc. Background population can remain background.

## 8. Study-vs-life balance

Study is important because the protagonist is a student, but it is primarily **story structure/background**.

Use academic life to create context:
- where the protagonist must be
- when people meet
- why plans change
- why a group chat becomes active
- why the protagonist is tired/busy/free
- why a location matters

Do not turn the game into a sequence of lectures, assignments and exams unless a specific academic event is narratively interesting.

## 9. Humor rule

Humor remains core.

Preferred humor:
- awkward timing
- deadpan internal reactions
- expectation vs reality
- friend-group behavior
- traffic/commuting friction
- small misunderstandings
- student routines
- jokes that emerge naturally from the situation

Avoid detached comedy scenes that could be removed without changing the characters or world.

## 10. Current map relationship

Current world-map source of truth:
- `docs/design/CURRENT_WORLD_MAP_SCOPE.md`

The current story intentionally reuses only four major map families:

- **Chapter 0** → Giảng đường Xuân Thủy as the main university-entry environment; khu phố/city context may support the feeling of arriving in a new city
- **Chapter 1** → Hòa Lạc / khu quân sự
- **Chapter 2** → Giảng đường 4 becomes the main recurring university-life environment
- **Chapter 3** → Giảng đường 4 + khu phố / phố trà đá become recurring everyday-life spaces

This mapping is high level only.

Do not add new large maps merely because a scene could theoretically use one. Reuse the four-map set unless the user explicitly expands the scope.

## 11. Current production relationship

The larger **Giảng đường 4** foundation has landed and has been user-approved.

Approved implementation checkpoint:
- branch: `phase-v2/gd4-geometry-corrections`
- commit: `7ed178251ae47074e7276f379492953448296149`

Narrative planning must treat that reviewed topology as the current map foundation rather than redesigning it.

P202 documents remain room-level technical references only. They do not override the approved Giảng đường 4 layout source-of-truth.

## 12. Next narrative task

Do **not** expand the macro further yet.

Current step after the 2026-10-03 user instruction:
- Ch0 material already exists in the lived-material ledger and story package, with script V0 as a draft; do not ask the user to provide it again
- review only unresolved specifics and the proposed complete-Ch0 plan in PROJECT_MASTER_PLAN
- complete the whole Ch0 after plan approval and obtain manual user acceptance
- only then plan Ch1 using the proven workflow; Ch1–Ch3 macro remains context, not parallel production authorization

Chapter 4+ remains locked.
