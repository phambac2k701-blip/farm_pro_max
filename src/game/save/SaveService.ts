import * as v from "valibot";

import type { GameStateSnapshot } from "../state/types";

export const SAVE_SCHEMA_VERSION = 1 as const;
export const DEFAULT_SAVE_STORAGE_KEY =
  "nguoi-thu-chin:prototype:v1";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
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
  settings: SaveSettingsSchema,
});

export type SaveEnvelope = v.InferOutput<
  typeof SaveEnvelopeSchema
>;

export class SaveService {
  constructor(
    private readonly storage: StorageLike,
    readonly storageKey = DEFAULT_SAVE_STORAGE_KEY,
  ) {}

  save(
    gameState: GameStateSnapshot,
    settings: SaveSettings,
  ): boolean {
    const candidate = {
      schemaVersion: SAVE_SCHEMA_VERSION,
      gameState,
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
}
