import type { Node } from "@babylonjs/core/node";
import { describe, expect, it, vi } from "vitest";

import {
  AudioDirector,
  type AudioBackend,
  type AudioCueDefinition,
  type AudioSoundHandle,
} from "../../src/audio/AudioDirector";

function createSound() {
  return {
    play: vi.fn(),
    stop: vi.fn(),
    dispose: vi.fn(),
    attach: vi.fn(),
    setVolume: vi.fn(),
  } satisfies AudioSoundHandle;
}

describe("AudioDirector", () => {
  it("loads cues, unlocks audio and plays spatial captioned sounds", async () => {
    const sound = createSound();
    const backend: AudioBackend = {
      unlockAsync: vi.fn().mockResolvedValue(undefined),
      setVolume: vi.fn(),
      load: vi.fn().mockResolvedValue(sound),
      dispose: vi.fn(),
    };
    const onCaption = vi.fn();
    const manifest: Record<string, AudioCueDefinition> = {
      clue: {
        file: "clue.wav",
        volume: 0.35,
        spatial: { minDistance: 1, maxDistance: 9 },
        caption: "Khang: An?",
      },
    };

    const director = await AudioDirector.forTest(manifest, backend, {
      baseUrl: "https://example.test/game/",
      onCaption,
    });
    const node = {} as Node;

    expect(await director.unlock()).toBe(true);
    expect(director.play("clue", node)).toBe(true);
    expect(backend.load).toHaveBeenCalledWith(
      "clue",
      "https://example.test/game/clue.wav",
      manifest.clue,
    );
    expect(sound.attach).toHaveBeenCalledWith(node);
    expect(sound.play).toHaveBeenCalledWith({
      loop: false,
      volume: 0.35,
    });
    expect(onCaption).toHaveBeenCalledWith("Khang: An?");
  });

  it("keeps missing or failed assets non-blocking", async () => {
    const backend: AudioBackend = {
      unlockAsync: vi.fn().mockResolvedValue(undefined),
      setVolume: vi.fn(),
      load: vi.fn().mockRejectedValue(new Error("decode failed")),
      dispose: vi.fn(),
    };
    const director = await AudioDirector.forTest(
      { broken: { file: "broken.wav" } },
      backend,
      { baseUrl: "https://example.test/" },
    );

    expect(director.failedCueIds).toEqual(["broken"]);
    expect(director.play("broken")).toBe(false);
    expect(director.play("missing")).toBe(false);
  });

  it("supports safe master ducking and cue fades", async () => {
    const sound = createSound();
    const backend: AudioBackend = {
      unlockAsync: vi.fn().mockResolvedValue(undefined),
      setVolume: vi.fn(),
      load: vi.fn().mockResolvedValue(sound),
      dispose: vi.fn(),
    };
    const director = await AudioDirector.forTest(
      { ambience: { file: "ambience.wav", loop: true, volume: 0.4 } },
      backend,
      { baseUrl: "https://example.test/", masterVolume: 0.9 },
    );

    expect(director.setMasterVolume(0.4, 0.12)).toBe(true);
    expect(backend.setVolume).toHaveBeenCalledWith(0.4, 0.12);
    expect(director.restoreMasterVolume(0.25)).toBe(true);
    expect(backend.setVolume).toHaveBeenCalledWith(0.9, 0.25);
    expect(director.fadeCue("ambience", 0.15, 0.3)).toBe(true);
    expect(sound.setVolume).toHaveBeenCalledWith(0.15, 0.3);
  });

  it("treats unlock failure and disposal as safe fallbacks", async () => {
    const sound = createSound();
    const backend: AudioBackend = {
      unlockAsync: vi.fn().mockRejectedValue(new Error("blocked")),
      setVolume: vi.fn(),
      load: vi.fn().mockResolvedValue(sound),
      dispose: vi.fn(),
    };
    const director = await AudioDirector.forTest(
      { ambience: { file: "ambience.wav", loop: true } },
      backend,
    );

    expect(await director.unlock()).toBe(false);
    director.dispose();
    expect(sound.dispose).toHaveBeenCalledOnce();
    expect(backend.dispose).toHaveBeenCalledOnce();
    expect(director.play("ambience")).toBe(false);
  });
});
