# Chapter 1 Narrative–Technical Gap Analysis

Status: **COMPLETE — implementation may be planned from this document**  
Narrative authority: `NAR-PRODUCTION-v1.2` / `NAR-CANON-v1.0`  
Technical baseline: `technical-prototype-v1`  
Working branch: `integration/narrative-v1.2`

## Scope and rules

This analysis maps the production Chapter 1 specification to the verified BAC-11→BAC-21 technical baseline. The production narrative package under `docs/narrative/*` wins over the historical `docs/NARRATIVE_BIBLE.md`. Stable prototype systems are reused rather than refactored without a concrete production requirement.

Chapter 1 must play from the 00:17 hook through KCR-A and the Khang/PA cliffhanger. The prototype Hero Book is **not** Chapter 1 canon content; only its reusable inspection/camera/state patterns survive where useful.

## Baseline disposition

| Prototype element | Disposition | Reason |
|---|---|---|
| `EngineAdapter` | KEEP AS-IS | Meets browser/WebGPU/WebGL baseline. |
| `PlayerController` / `InputRouter` | KEEP AS-IS | Verified movement, collision, pointer-lock and focus-loss behavior. |
| `InteractionSystem` / `InteractionStateMachine` | EXTEND | Core targeting/ownership is correct; production interactables need conditions/capabilities and more object behaviors. |
| `CameraDirector` | KEEP AS-IS | Correct ownership and cancel-safe authored focus/restore. |
| `GameState` / `GameEvents` | EXTEND | Storage model is adequate; Ch1 needs stable production facts/checkpoints and a small number of extra typed events only if cross-system coordination requires them. |
| `EvidenceSystem` | EXTEND | Registry/idempotence is correct; replace prototype evidence catalog with C01–C07 production definitions and recovery mapping. |
| `RealitySystem` | EXTEND | Deterministic rule/applier model is correct; replace prototype ninth-desk rule with narrative KCR-A and explicit re-entry timing. |
| `SaveService` | REFACTOR REQUIRED | Validation/versioning stays, but production save must include checkpoint/player position and safely version/migrate/reset schema changes. |
| `BookInspectionController` pattern | REPLACE CONTENT ONLY / EXTEND PATTERN | Controller proves tactile inspection, but Ch1 needs roster/index-card/photo/document inspection, not the prototype erased-line book. |
| `BookPropVisual` + prototype book content | REMOVE from Ch1 production | Not part of Ch1 production spec. May remain only as unused prototype history until cleanup is safe. |
| `PrototypeBookAudio` | REMOVE from final Ch1 | Procedural noise cannot carry production narrative beats. |
| `prototypeScene.ts` | REPLACE CONTENT ONLY | Primitive construction patterns are reusable; production layout must cover gate, shelter, corridor, classroom and PA room. |
| Prototype ninth desk/light shift | REMOVE | Conflicts with production KCR-A, which resolves a ninth chair/headset in the PA room. |

## Requirement map

| Narrative requirement | Existing technical support | Gap | Required system/content | Reusable vs new | Asset dependency | Audio dependency | State / evidence / KCR | Save/load requirement | Test requirement | Risk |
|---|---|---|---|---|---|---|---|---|---|---|
| 00:17 phone hook; C01 message; three-message presentation | Interaction ownership, DOM UI layer, GameState | No phone presentation, timed message state, or resume-safe intro | Phone presentation + Ch1 opening state machine | New behavior composed with existing input/state | Phone screen UI; optional phone model | vibration + ambience duck only | C01; `ch01_intro_complete` | Reload after C01 must not replay incorrectly or lose message state | intro progression + resume tests; browser presentation smoke | Medium |
| School gate at 00:24; rain/night; half-open entrance | Player/collision/primitive scene construction | Current map begins in corridor; no exterior or entry flow | Production Ch1 scene composition with gate/shelter/old-wing entrance | Replace scene content; reuse builders/controller | gate, shelter, Vietnamese-school materials, rain VFX | rain, traffic, fluorescent shelter buzz | chapter start/checkpoint | Save at gate and after shelter route | spawn/collision/route tests + runtime smoke | Medium |
| Guard shelter; notebook/key rack/flashlight/raincoat; loose side latch | InteractionSystem | No openable, pickup, key attempt, or conditional door behavior | Openable behavior + lightweight pickup behavior + shelter content | New small shared object behaviors | key rack, notebook, flashlight, raincoat, latch/door | key/door/object one-shots | C05 seed may be observed here; entry facts | Persist picked items only if gameplay-relevant; persist door/checkpoint facts | repeated interact/cancel/idempotence | Medium |
| Corridor tutorial: inspect, door, drawer, pickup | InteractionSystem + CameraDirector + book pattern | Only one inspect interaction exists | Generic inspection session contract; door/drawer/openable behavior; pickup | New shared behavior layer, no per-object frameworks | doors, drawers, photos, timetable, trophy case | door/drawer/paper/footsteps | C14 optional | Save while objects open and after optional evidence | interaction ownership, cancel/focus-loss, restore | High because many first-use behaviors converge here |
| Doors throughout gate/corridor/classroom/PA room | Collision + interaction targeting | No runtime door state/hinge, lock condition, path blocker sync | `OpenableController` using Babylon TransformNode/animation and collider state | New shared behavior | door meshes/hinges | handle, latch, hinge, locked attempt | facts for permanently relevant door state only | Critical route doors restore deterministically | door collision/open-close spam/save tests | High |
| Tactile document inspection | CameraDirector + Book inspection state pattern | Book-specific page model/visual cannot represent loose documents cleanly | `DocumentInspectionController` or generalized inspection session with document view | Extend pattern, not Book controller itself | roster, index card, timetable, notebook textures | paper pickup/putdown | C03, C07, C14; discovery only after readable view | Evidence discoveries persist; reload returns to safe gameplay if saved during inspection | inspection enter/cancel/restore/discovery gating | High |
| Photo/document handling and roster/photo comparison | EvidenceSystem; CameraDirector | No photo inspection/alignment or compare action | Photo inspection + minimal evidence comparison interaction | New behavior composed over EvidenceSystem | C02 crop/photo, C03 roster | paper/photo handling | C02 depends on roster comparison; C03 mandatory | comparison result persisted as C02 | dependency test: C02 cannot be granted from photo alone unless recovery route used | High |
| Empty classroom; teacher desk/drawer; eight-name roster behind textbook | Current classroom primitives/furniture | Layout/content wrong; hero book occupies teacher desk; no drawer/document chain | Production classroom composition + drawer + roster placement | Replace content, reuse desk builders | classroom dressing, roster prop | room tone, drawer/paper | C03 mandatory | save before/after C03 | reachability, occlusion, duplicate discovery | Medium |
| First contradiction: reopen drawer and reveal label 09 after roster | GameState facts + interactable system | No state-conditional drawer content/variant | Conditional drawer reveal bound to C03 | Compose openable + GameState | 09 adhesive label/decal | fluorescent buzz pitch dip | C05 seed / `knowledge_09_exists` only when production rule says enough evidence | deterministic drawer variant after reload | before/after condition test | Low–Medium |
| Corridor return; one distant bell; optional C14 | GameState/event bus | No one-shot authored environmental beat | Chapter-scoped one-shot event | New Ch1 runtime behavior, not global scare framework | none beyond existing corridor | bell, ambience | one-time fact; C14 optional | no duplicate bell after reload | one-shot state test + runtime audio | Low |
| PA-room threshold/sign/scratched 09 | Scene primitives + InteractionSystem | No PA room or production sign/door | Production PA room scene/content | Replace scene content | sign, scratches, amplifier/radio desk | amplifier hum/rain bleed | path to C07 | checkpoint near PA room | reachability/collision | Medium |
| C07 index card `09 / 00:17 / KHÔNG PHÁT — LƯU NỘI BỘ` | EvidenceSystem + CameraDirector pattern | Evidence catalog and prop absent | Production evidence definition + document prop | Extend existing evidence; new content | index card texture/model | paper handling | C07 mandatory | persist C07 | discovery/readability/idempotence | Low |
| Eight chairs/headsets before KCR | Existing furniture composition | Prototype uses classroom desks instead | PA station builder / authored placement | New content helper or scene-local composition | chairs/headsets/console/cables | room hum | before-state for KCR-A | restore correct variant | snapshot test | Medium |
| KCR-A = C03 + C07, applied on leaving then returning; ninth chair/headset | RealitySystem + Babylon intersection triggers | Current rule uses wrong evidence/fact/location and ninth desk | Replace Ch1 reality content; explicit ready/applied/reentry facts; PA-room applier | Extend RealitySystem; reuse ActionManager trigger or equivalent | ninth chair/headset/cable; lamp variant | faint channel click; subtle lamp shift | `C03 && C07`; explicit reentry; `kcr_a_applied`; `knowledge_09_exists` | save before threshold, after threshold-before-return, after apply | before/after, idempotence, restore, player-not-looking path | High |
| Ninth headset proximity emits 2.5s breathing + chair scrape; unplugged | No spatial production audio; prototype WebAudio only | Need authored spatial one-shot and range trigger | AudioDirector + spatial emitter/trigger | New shared audio service using Babylon/WebAudio facilities | headset | authored breathing/chair recording | one-shot per intended visit policy; not evidence | save need not persist transient playback unless narrative one-shot | range/duplicate trigger + browser audio smoke | High |
| Lighting/audio state change during KCR | Reality applier can mutate light | No audio director/mix layer; prototype light is classroom | KCR applier coordinates PA light + audio state | Reuse RealitySystem; new AudioDirector | lamp/fluorescent assets | channel click, mix variation | tied only to applied KCR-A | restored from `kcr_a_applied` | deterministic restore test | Medium |
| Chapter climax: inspect headset → phone message → PA click → Khang live line | Interaction + CameraDirector + state | No sequence orchestration, phone overlay, PA source, subtitle/caption support | Chapter-scoped deterministic climax sequence; AudioDirector; subtitle surface | New Ch1 sequence composition, not broad scare framework | phone/PA speaker | authored Khang line, relay click, compression treatment | requires KCR-A and headset inspect; sets climax/checkpoint | reload after headset but before chapter end must resume safely without double-playing irreversible state | sequence ordering/cancel safety/runtime audio | High |
| Final glass-photo reflection extra shoulder, vanishes on direct look | Babylon rendering available | No reflection/conditional visual event | Authored screen/world representation using simple mesh/texture/visibility condition; no monster model | New scene-specific visual composed with state | photo board/glass/shoulder silhouette asset | no sting; rain + relay click | post-climax visual fact | transient visual can reset safely if checkpoint is before transition; chapter-end state persists | visual-state smoke, no direct monster exposure | Medium |
| Chapter end: corridor door opens → transition to Ch2 | GameState chapter ID/events | No chapter lifecycle/transition/checkpoint service | Minimal ChapterRuntime / chapter transition coordinator | New small lifecycle layer | loading/transition presentation | ambience carry/fade | `ch01_complete`; chapter=`ch02` | chapter-end save deterministic | prerequisite + transition tests | High |
| Save/load across all critical states | SaveService v1, GameState snapshot | No player checkpoint/position; invalid schema is reset-only; no migration decision for production schema | Save schema v2 with explicit migration/reset policy and checkpoint payload | Extend SaveService under Valibot | none | none | all mandatory evidence, KCR ready/applied, chapter checkpoint | new game; mid-Ch1; before/after evidence; after KCR; chapter end; corrupt save | full matrix regression | High |
| Recovery if optional interaction skipped | EvidenceSystem + free exploration | No authored recovery routing | Encode C02/C06-style recovery rules as content/state, keep C14 optional | New chapter content rules, not a generic hint framework unless playtest proves need | duplicate readable sources if specified | optional cue only | mandatory C01/C02/C03/C07 reachable; C14 optional | recovery state persists naturally | miss-optional playthrough | Medium |
| Evidence presentation/comparison | Minimal discovery toast | Toast alone is insufficient for Chapter 1 comparison flow | Restrained evidence viewer/compare affordance; world objects remain primary | Extend UI layer | photo/document thumbnails | UI SFX minimal | C02 comparison and evidence metadata | persist evidence only, not ephemeral UI state | comparison logic + accessibility/readability | Medium |
| Footsteps/rain/hum/paper/PA authored sound | Prototype procedural book audio only | Production sound architecture/assets absent | AudioDirector with ambience layers, one-shots, spatial emitters, duck/fade and captions for speech | New shared service; reuse Babylon/Web Audio capabilities | audio files | Required | world-state mix tied to Ch1/KCR | audio state reconstructs from checkpoint/facts | service unit tests + browser autoplay/resume/runtime audit | High |
| Vertical-slice environment presentation | Graybox only | Current material/lighting lacks Vietnamese-school specificity and production readability | Upgrade composition/materials/decals/lighting while retaining simple geometry where effective | Replace content only | modular school textures/decals/signage | ambience | none | scene is deterministic | screenshot/readability/perf audit | Medium–High |

## C01–C07 Chapter 1 clue ownership

| Clue | Ch1 status | Production implementation |
|---|---|---|
| C01 Khang message | Mandatory | Phone opening; discovered after player reads the message sequence. |
| C02 image/photo contradiction | Mandatory | Phone image establishes cropped ninth position; classroom roster/photo comparison confirms it. Recovery may be reconstructed from C03 + later photo evidence as documented, but Ch1 normal path should award C02 through the comparison beat. |
| C03 2012 eight-name roster | Mandatory | Tactile document in classroom; replaces prototype hero-book clue. |
| C04 desk labels 1–8 | Global mandatory clue located in radio-room evidence chain | Ch1 may visually establish eight stations without over-explaining; do not accidentally advance later role conclusions. If C04 is formally discovered in Ch1, keep wording exactly within clue-graph intent. |
| C05 label 09 | Mandatory in graph / seeded in Ch1 | Guard hook and classroom drawer can seed/reinforce it. Do not turn it into proof that 09 is a person. |
| C06 Minh notebook note | Optional, payoff later | **Do not introduce Minh's name or exact 2012 incident in Ch1.** Mystery architecture forbids this early. |
| C07 PA index card 09 / 00:17 | Mandatory | Tactile card at PA threshold/room; KCR-A threshold source. |

## Chapter lifecycle and checkpoints required

Minimum durable checkpoints:
1. `ch01_gate`
2. `ch01_inside_old_wing`
3. `ch01_classroom_pre_roster`
4. `ch01_classroom_post_c03`
5. `ch01_pa_pre_c07`
6. `ch01_kcr_ready` (C03 + C07, before re-entry)
7. `ch01_kcr_applied`
8. `ch01_climax_complete`
9. `ch01_complete`

A save taken during an inspection should restore to the nearest safe world checkpoint with the already-earned persistent evidence/facts intact rather than attempting to serialize camera/animation mid-frame.

## NARRATIVE_IMPLEMENTATION_CONFLICTS

### NIC-CH01-001 — Prototype KCR content conflicts with production KCR-A
- Narrative requirement: C03 + C07 resolve a ninth chair/headset in the PA room after leave/re-entry.
- Technical constraint: prototype Ch1 currently resolves a ninth classroom desk from `ev_ch01_erased_ninth_line` after a classroom transition.
- Blocker level: **not a blocker; production content replacement required**.
- Technical resolution preserving intent: keep `RealitySystem` and its idempotent/applied-fact model; replace only rule definitions, trigger facts and applier content.
- Tradeoff: existing prototype-specific tests/content must be replaced with production KCR-A tests.
- Recommendation: remove prototype rule from production bootstrap; retain generic system unchanged unless a concrete API gap appears.

### NIC-CH01-002 — Save schema v1 lacks production checkpoint payload
- Narrative requirement: deterministic resume before/after evidence, KCR, inspection and chapter end.
- Technical constraint: schema v1 stores chapter/facts/evidence/settings only.
- Blocker level: **planning blocker for production save work, not a canon conflict**.
- Technical resolution preserving intent: introduce schema v2 with checkpoint/player transform (or checkpoint spawn reference) and explicit v1 handling. Prefer a documented one-time v1 reset for the pre-production prototype unless migration is trivial and tested.
- Tradeoff: prototype saves may be invalidated once, but no public release contract exists yet.
- Recommendation: version explicitly; never silently reinterpret v1 as v2.

### NIC-CH01-003 — C04 location wording versus Ch1 production presentation
- Narrative requirement: clue graph locates C04 at the radio room as desk labels 1–8; Ch1 scene 1.7 presents eight chairs/headsets and a hidden ninth cable.
- Technical constraint: none.
- Blocker level: **none**.
- Resolution: visually label the eight PA stations in Ch1 and keep the observation narrow. Do not use it to reveal `knowledge_09_is_role`; that remains a later conclusion.
- Tradeoff: none if evidence metadata distinguishes observation from interpretation.
- Recommendation: implement as environmental/registered evidence only if needed for clue-ledger consistency.

No canon rewrite is recommended. No v1.2 coherence repair is affected.

## Architecture conclusions from the gap

Chapter 1 genuinely requires:
- a minimal chapter lifecycle/runtime with durable checkpoints;
- production scene composition for gate → shelter → corridor → classroom → PA room;
- shared openable behavior for doors/drawers;
- tactile document/photo inspection composed with `CameraDirector` and `InteractionSystem`;
- a minimal photo/evidence comparison interaction;
- a lightweight pickup behavior for tutorial objects;
- an `AudioDirector` (ambience, one-shot, spatial emitters, mix/state restoration);
- chapter-scoped deterministic sequence orchestration for the opening and climax;
- production KCR-A content on the existing `RealitySystem`;
- SaveService schema v2/checkpoint support;
- a restrained evidence/compare UI.

Chapter 1 does **not** justify:
- a general scare framework;
- a dialogue tree framework;
- a full quest engine;
- a general cinematic timeline framework;
- loading all future chapters;
- an all-purpose asset-management framework before profiling proves need;
- a new global state library;
- a physics engine for doors/props.

## Reuse-first decisions

Use existing game-owned abstractions as the boundary. Prefer Babylon built-ins for transform animation, collision, action/observable triggers and spatial audio primitives. Any external dependency must be justified against current Babylon.js 9.x capabilities and licensed/maintained status before adoption.

The next deliverable is the Chapter 1 production architecture and dependency-ordered implementation plan. Production code must not start until those are complete.
