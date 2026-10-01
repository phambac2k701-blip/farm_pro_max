import type { EvidenceId } from "../game/state/types";
import type { GameState } from "../game/state/GameState";
import type { EvidenceDefinition } from "./types";

export class EvidenceSystem {
  private readonly definitions = new Map<
    EvidenceId,
    EvidenceDefinition
  >();

  constructor(
    private readonly state: GameState,
    definitions: readonly EvidenceDefinition[],
  ) {
    for (const definition of definitions) {
      if (this.definitions.has(definition.id)) {
        throw new Error(
          `Duplicate evidence definition: ${definition.id}`,
        );
      }
      this.definitions.set(definition.id, definition);
    }
  }

  discover(evidenceId: EvidenceId | undefined | null): boolean {
    if (!evidenceId || !this.definitions.has(evidenceId)) {
      return false;
    }

    return this.state.discoverEvidence(evidenceId);
  }

  has(evidenceId: EvidenceId): boolean {
    return (
      this.definitions.has(evidenceId) &&
      this.state.hasEvidence(evidenceId)
    );
  }

  get(evidenceId: EvidenceId): EvidenceDefinition | undefined {
    return this.definitions.get(evidenceId);
  }

  listDiscovered(): EvidenceDefinition[] {
    return this.state
      .listEvidence()
      .map((evidenceId) => this.definitions.get(evidenceId))
      .filter(
        (
          definition,
        ): definition is EvidenceDefinition => definition !== undefined,
      );
  }
}
