import type { EvidenceSystem } from "../../../evidence/EvidenceSystem";
import type { GameState } from "../../../game/state/GameState";

export const CH01_ROSTER_INSPECTED_FACT = "ch01_roster_inspected";
export const CH01_PHOTO_INSPECTED_FACT = "ch01_photo_inspected";
export const CH01_CORRIDOR_BELL_FACT = "ch01_corridor_bell_triggered";

export interface ClassroomEvidenceControllerOptions {
  state: GameState;
  evidence: EvidenceSystem;
  isRosterReading: () => boolean;
  isPhotoReading: () => boolean;
  onCompared?: () => void;
}

export class ClassroomEvidenceController {
  constructor(
    private readonly options: ClassroomEvidenceControllerOptions,
  ) {}

  markRosterReadable(): boolean {
    this.options.state.setFact(CH01_ROSTER_INSPECTED_FACT, true);
    return this.options.evidence.discover("C03");
  }

  markPhotoReadable(): boolean {
    return this.options.state.setFact(CH01_PHOTO_INSPECTED_FACT, true);
  }

  get canCompare(): boolean {
    return (
      this.options.evidence.has("C03") &&
      this.options.state.getFact<boolean>(CH01_PHOTO_INSPECTED_FACT) ===
        true &&
      !this.options.evidence.has("C02")
    );
  }

  handleKey(code: string): boolean {
    if (
      code !== "KeyC" ||
      !this.canCompare ||
      (!this.options.isRosterReading() &&
        !this.options.isPhotoReading())
    ) {
      return false;
    }

    const discovered = this.options.evidence.discover("C02");
    if (discovered) {
      this.options.onCompared?.();
    }
    return discovered;
  }
}
