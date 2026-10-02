# FULL-GAME NARRATIVE AUDIT — v1.2

## Scope
Covers Ch1 baseline + production-ready Ch2–Ch9, core canon, timeline, mystery architecture, clue graph, KCR matrix, endings, characters, implementation handoff, red-team constraints, and the v1.2 coherence repairs.

## 1. Baseline preservation
PASS.
- Ch1 vertical slice remains the baseline.
- Core mystery direction is unchanged.
- Canonical 2012 event is unchanged.
- No old/Gemini canon was reintroduced.

## 2. Production completeness
PASS.
Ch2–Ch9 each have:
- scene-by-scene flow;
- entry/exit conditions;
- player objective;
- mandatory/optional evidence;
- interactables/player actions;
- clue dependencies;
- recovery path;
- character knowledge state;
- environmental storytelling;
- audio/lighting beats;
- scripted events;
- KCR before/trigger/after;
- hypothesis impact;
- foreshadow/payoff;
- end knowledge state;
- transition;
- production acceptance tests;
- post-chapter QA/continuity audit.

## 3. Continuity ledger audit
### Canonical timeline
PASS.
No production chapter changes the historical event order.

### Perceived/player knowledge timeline
PASS.
Knowledge increases in this order:
1. 09 contradiction.
2. 09 operational category.
3. physical role/station.
4. multiple occupants.
5. public-memory divergence.
6. Khang current witness-state.
7. deliberate record smoothing.
8. 2012 event reconstruction + final witness implication.
9. ending decision.

### Official record
PASS.
Eight-member official record remains distinct from role artifacts.

### Public story
PASS.
Public memory remains partial and inconsistent without requiring mass deception.

## 4. Clue graph audit
PASS.
- 36 global clue IDs referenced by Ch2–Ch9 are valid.
- No production chapter introduces an unregistered major clue.
- Mandatory clues have recovery paths.
- Optional clues never create a unique canonical truth.
- Major reveals have more than one evidence path.

## 5. KCR audit
PASS after trigger corrections.
### KCR-A
Ch1 established and persistent.

### KCR-B
Requires documentary + human corroboration + exact route location.

### KCR-C
Requires physical role evidence; no named identity.

### KCR-D
Requires Khang's archive trail and full warning recording.

### KCR-E
Requires the actual decisive 2012 raw audio C33; cannot trigger in Ch7.

### KCR-F
C35 is a seed in Ch6; route appears only in Ch9 after current-bearer and historical-event knowledge.

### KCR-G
Requires confirmed current-bearer state and role-history comparison.

### KCR-H
Only witness-designation Action B can resolve the current witness line.

## 6. Character agency audit
PASS.
- An initiates investigation, makes evidence choices, and owns the final burden decision.
- Khang has his own hypothesis, mistakes, and consequence.
- Vân pursues contextual integrity and can resist An.
- Phương controls what she is willing to remember/discuss.
- Lộc protects his memory boundary and does not become a clue dispenser.
- Hạnh protects procedural accuracy.

## 7. Mystery fairness audit
PASS.
The player can predict the major structural insight before final confirmation:
- 09 is a role.
- multiple people occupied it.
- records are locally truthful but globally misleading.
- Khang is affected by the same role-state.

## 8. Twist fairness audit
PASS.
Midpoint:
- Setup: different people in same photo position.
- Assumption: photo error/erased person.
- Reveal: multiple occupants.
- Recontextualization: identity conflict is role continuity.
- Consequence: player changes evidence strategy.

Late reveal:
- Setup: Khang disappears while researching.
- Assumption: abduction/cover-up.
- Reveal: current witness-state.
- Recontextualization: messages are inside-system signals.
- Consequence: player becomes potential bearer.

Final reframe:
- Setup: blank current-witness line.
- Assumption: administrative formality.
- Reveal: the role needs a current witness.
- Recontextualization: the entire game has been about who bears responsibility.
- Consequence: ending changes based on the player's concrete preservation choice.

## 9. Theme audit
PASS.
The theme is not carried by speeches. It is represented through:
- unnamed work;
- archive labels;
- selective memory;
- administrative smoothing;
- witness burden;
- choice to preserve, assign, or erase evidence.

## 10. Vietnamese specificity audit
PASS.
The mystery depends on a school ecosystem containing:
- class photos;
- activity/club structures;
- formal vs informal duty;
- paper and digitized records;
- anniversary archive cleanup;
- institutional face-saving concerns;
- alumni memory;
- social reluctance to reopen embarrassing events.
A location swap to a generic Western school would require substantive narrative changes.

## 11. Horror audit
PASS.
The horror progression is:
wrong count -> wrong position -> recurring role -> human-memory contradiction -> witness-state -> spatial consequence -> final responsibility.
No gore, combat, monster chase, or constant jumpscare is required.

## 12. Gameplay audit
PASS.
The player repeatedly does meaningful actions:
compare -> inspect -> trace -> listen -> align -> corroborate -> reconstruct -> preserve/assign/withhold.
The narrative therefore cannot be reproduced faithfully as a prose synopsis alone.

## 13. Ending audit
PASS after tradeoff repair.
A: preserves historical/context truth and releases Khang by allowing the present witness-link to collapse; stable proof of Khang's current Ninth-state is sacrificed.
B: preserves the complete historical + present witness chain by assigning An as current witness; Khang is released and the proof remains coherent at a personal burden cost.
C: release through incomplete evidence.
D: procedural clean-record containment.
No morality score and no strictly dominant A-over-B outcome.

## 14. Red-team closure
Existing red-team set contains 38 adversarial questions. The production refinements address the only trigger-timing contradictions found during Ch5–Ch9 expansion.

Remaining risk is production presentation, not core causality:
- KCR must stay concrete.
- documents must remain short enough to inspect in play.
- Ch5/Ch6 pacing must avoid repeated investigation loops.

## 15. Contradictions / coherence issues resolved
1. KCR-B over-broad trigger -> cross-source corroboration.
2. KCR-F early seed vs late route -> separate `khang_signal_found` and route trigger states.
3. KCR-E chapter placement -> moved to Ch8 with C33.
4. KCR-H preservation-only implication -> narrowed to witness-designation action B.
5. Ch6 pre-record/live causality -> recording ends before An speaks; causal reply moved to the live post-KCR-D signal.
6. Ch2 orphan PA anomaly -> `Đóng cửa đi.` now pays off in C33 as 2012 archival bleed.
7. Ending A/B dominance problem -> A sacrifices stable present-state proof; B preserves it by taking witness burden.
8. KCR definition too geometry-specific -> broadened to linked authored representations while keeping deterministic triggers.

## 16. Final verdict
CORE NARRATIVE: READY.
PRODUCTION NARRATIVE CH2–CH9: READY FOR IMPLEMENTATION HANDOFF AFTER v1.2 COHERENCE REPAIR.

This is a narrative production specification, not the final implemented game. Implementation still requires engine-side interaction, audio, assets, save/load state, and QA execution against the documented contracts.
