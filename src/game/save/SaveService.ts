import * as v from "valibot";

import type { GameStateSnapshot } from "../state/types";

export const SAVE_SCHEMA_VERSION = 2 as const;
export const DEFAULT_SAVE_STORAGE_KEY =
  "nguoi-thu-chin:production:v2";
export const LEGACY_SAVE_STORAGE_KEY =
  "nguoi-thu-chin:prototype:v1";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface SaveCheckpoint {
  checkpointId: string;
}

export interface SaveSettings {
  mouseSensitivity: number;
}

const FactValueSchema = v.union([
  v.boolean(),
  v.number(),
  v.string(),
]);

const GameStateSnapshotSchema = v.object({
  chapterId: v.string(),
  facts: v.record(v.string(), FactValueSchema),
  evidence: v.array(v.string()),
});

const SaveCheckpointSchema = v.object({
  checkpointId: v.pipe(v.string(), v.minLength(1)),
});

const SaveSettingsSchema = v.object({
  mouseSensitivity: v.pipe(
    v.number(),
    v.minValue(0.0001),
    v.maxValue(0.01),
  ),
});

const SaveEnvelopeSchema = v.object({
  schemaVersion: v.literal(SAVE_SCHEMA_VERSION),
  gameState: GameStateSnapshotSchema,
  checkpoint: SaveCheckpointSchema,
  settings: SaveSettingsSchema,
});

export type SaveEnvelope = v.InferOutput<
  typeof SaveEnvelopeSchema
>;

export class SaveService {
  constructor(
    private readonly storage: StorageLike,
    readonly storageKey = DEFAULT_SAVE_STORAGE_KEY,
    private readonly legacyStorageKey = LEGACY_SAVE_STORAGE_KEY,
  ) {}

  save(
    gameState: GameStateSnapshot,
    checkpoint: SaveCheckpoint,
    settings: SaveSettings,
  ): boolean {
    const candidate = {
      schemaVersion: SAVE_SCHEMA_VERSION,
      gameState,
      checkpoint,
      settings,
    };
    const result = v.safeParse(SaveEnvelopeSchema, candidate);

    if (!result.success) {
      return false;
    }

    try {
      this.storage.setItem(
        this.storageKey,
        JSON.stringify(result.output),
      );
      return true;
    } catch {
      return false;
    }
  }

  load(): SaveEnvelope | null {
    let raw: string | null;

    try {
      raw = this.storage.getItem(this.storageKey);
    } catch {
      return null;
    }

    if (raw === null) {
      this.resetLegacyPrototypeSave();
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      const result = v.safeParse(SaveEnvelopeSchema, parsed);

      if (!result.success) {
        this.clear();
        return null;
      }

      return result.output;
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    try {
      this.storage.removeItem(this.storageKey);
    } catch {
      // Storage may be unavailable; clearing is best-effort.
    }
  }

  private resetLegacyPrototypeSave(): void {
    if (this.legacyStorageKey === this.storageKey) {
      return;
    }

    try {
      if (this.storage.getItem(this.legacyStorageKey) !== null) {
        this.storage.removeItem(this.legacyStorageKey);
      }
    } catch {
      // Prototype saves are intentionally reset for the production schema.
    }
  }
}
