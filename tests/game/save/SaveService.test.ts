import { describe, expect, it } from "vitest";

import {
  LEGACY_SAVE_STORAGE_KEY,
  SAVE_SCHEMA_VERSION,
  SaveService,
  type StorageLike,
} from "../../../src/game/save/SaveService";
import { GameState } from "../../../src/game/state/GameState";

class MemoryStorage implements StorageLike {
  readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

describe("SaveService", () => {
  it("roundtrips versioned game state, checkpoint and settings", () => {
    const storage = new MemoryStorage();
    const service = new SaveService(storage);
    const state = new GameState({
      chapterId: "ch01",
      facts: {
        knowledge_09_exists: true,
      },
      evidence: ["C03"],
    });

    service.save(
      state.snapshot(),
      {
        checkpointId: "ch01_classroom_post_c03",
      },
      {
        mouseSensitivity: 0.0028,
      },
    );

    const loaded = service.load();

    expect(loaded).toEqual({
      schemaVersion: SAVE_SCHEMA_VERSION,
      gameState: state.snapshot(),
      checkpoint: {
        checkpointId: "ch01_classroom_post_c03",
      },
      settings: {
        mouseSensitivity: 0.0028,
      },
    });
  });

  it("recovers safely from invalid JSON by clearing the bad entry", () => {
    const storage = new MemoryStorage();
    const service = new SaveService(storage);
    storage.setItem(service.storageKey, "{ definitely not json");

    expect(service.load()).toBeNull();
    expect(storage.getItem(service.storageKey)).toBeNull();
  });

  it("rejects unsupported schema versions", () => {
    const storage = new MemoryStorage();
    const service = new SaveService(storage);
    storage.setItem(
      service.storageKey,
      JSON.stringify({
        schemaVersion: 999,
        gameState: {
          chapterId: "ch01",
          facts: {},
          evidence: [],
        },
        checkpoint: {
          checkpointId: "ch01_gate",
        },
        settings: {
          mouseSensitivity: 0.0022,
        },
      }),
    );

    expect(service.load()).toBeNull();
    expect(storage.getItem(service.storageKey)).toBeNull();
  });

  it("rejects structurally invalid data instead of partially loading it", () => {
    const storage = new MemoryStorage();
    const service = new SaveService(storage);
    storage.setItem(
      service.storageKey,
      JSON.stringify({
        schemaVersion: SAVE_SCHEMA_VERSION,
        gameState: {
          chapterId: "ch01",
          facts: {
            invalid: { nested: true },
          },
          evidence: ["C03"],
        },
        checkpoint: {
          checkpointId: "",
        },
        settings: {
          mouseSensitivity: 4,
        },
      }),
    );

    expect(service.load()).toBeNull();
    expect(storage.getItem(service.storageKey)).toBeNull();
  });

  it("intentionally resets the incompatible Technical Prototype V1 save", () => {
    const storage = new MemoryStorage();
    const service = new SaveService(storage);
    storage.setItem(
      LEGACY_SAVE_STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        gameState: {
          chapterId: "ch01",
          facts: {
            reality_ch01_ninth_desk_applied: true,
          },
          evidence: ["ev_ch01_erased_ninth_line"],
        },
        settings: {
          mouseSensitivity: 0.0022,
        },
      }),
    );

    expect(service.load()).toBeNull();
    expect(storage.getItem(LEGACY_SAVE_STORAGE_KEY)).toBeNull();
    expect(storage.getItem(service.storageKey)).toBeNull();
  });
});
