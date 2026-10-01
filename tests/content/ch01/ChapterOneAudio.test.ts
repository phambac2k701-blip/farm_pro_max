import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  CH01_AMBIENCE_IDS,
  CH01_AUDIO,
  CH01_AUDIO_IDS,
} from "../../../src/content/chapters/ch01/audio";

describe("Chapter 1 production audio manifest", () => {
  it("keeps every declared Chapter 1 audio id backed by a runtime asset", () => {
    for (const id of Object.values(CH01_AUDIO_IDS)) {
      const definition = CH01_AUDIO[id];
      expect(definition, id).toBeDefined();
      expect(
        existsSync(resolve("public", definition.file.replace(/^assets\//, "assets/"))),
        definition.file,
      ).toBe(true);
    }
  });

  it("keeps ambience looped and the narrative-critical cues spatial where required", () => {
    for (const id of CH01_AMBIENCE_IDS) {
      expect(CH01_AUDIO[id].loop).toBe(true);
    }

    expect(CH01_AUDIO[CH01_AUDIO_IDS.paHum].spatial).toBeDefined();
    expect(CH01_AUDIO[CH01_AUDIO_IDS.kcrChannelClick].spatial).toBeDefined();
    expect(
      CH01_AUDIO[CH01_AUDIO_IDS.headsetBreathingChair].spatial,
    ).toBeDefined();
    expect(CH01_AUDIO[CH01_AUDIO_IDS.khangClimax].spatial).toBeDefined();
  });

  it("provides a subtitle for Khang's critical climax line", () => {
    expect(CH01_AUDIO[CH01_AUDIO_IDS.khangClimax].caption).toContain(
      "An? Mày tới rồi à?",
    );
  });
});
