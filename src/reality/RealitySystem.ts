import type {
  EvidenceId,
  FactId,
  FactValue,
} from "../game/state/types";
import type { GameState } from "../game/state/GameState";

export interface RealityRuleDefinition {
  id: string;
  requiredEvidence?: readonly EvidenceId[];
  requiredFacts?: Readonly<Record<FactId, FactValue>>;
  appliedFactId: FactId;
}

export type RealityApplier = () => void;

export type RealityApplierMap = Readonly<
  Record<string, RealityApplier | undefined>
>;

export class RealitySystem {
  private readonly rules = new Map<string, RealityRuleDefinition>();

  constructor(
    private readonly state: GameState,
    definitions: readonly RealityRuleDefinition[],
    private readonly appliers: RealityApplierMap = {},
  ) {
    for (const definition of definitions) {
      if (this.rules.has(definition.id)) {
        throw new Error(`Duplicate reality rule: ${definition.id}`);
      }
      this.rules.set(definition.id, definition);
    }
  }

  isReady(ruleId: string): boolean {
    const rule = this.rules.get(ruleId);
    if (!rule || this.state.getFact(rule.appliedFactId) === true) {
      return false;
    }

    for (const evidenceId of rule.requiredEvidence ?? []) {
      if (!this.state.hasEvidence(evidenceId)) {
        return false;
      }
    }

    for (const [factId, expected] of Object.entries(
      rule.requiredFacts ?? {},
    )) {
      if (!Object.is(this.state.getFact(factId), expected)) {
        return false;
      }
    }

    return true;
  }

  apply(ruleId: string): boolean {
    const rule = this.rules.get(ruleId);
    if (!rule || !this.isReady(ruleId)) {
      return false;
    }

    this.appliers[ruleId]?.();
    this.state.setFact(rule.appliedFactId, true);
    return true;
  }

  syncApplied(): number {
    let appliedCount = 0;

    for (const rule of this.rules.values()) {
      if (this.state.getFact(rule.appliedFactId) !== true) {
        continue;
      }

      this.appliers[rule.id]?.();
      appliedCount += 1;
    }

    return appliedCount;
  }
}
