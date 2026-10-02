import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import type { Scene } from "@babylonjs/core/scene";
import { describe, expect, it } from "vitest";

import {
  captureScenePerformanceSnapshot,
  sampleRafFps,
} from "../../src/performance/ScenePerformanceSnapshot";

describe("ScenePerformanceSnapshot", () => {
  it("captures stable scene and engine counters without browser-only sampling", async () => {
    const scene = {
      meshes: [{}, {}, {}],
      materials: [{}, {}],
      textures: [{}],
      animationGroups: [{}, {}],
      skeletons: [{}],
      objectRenderers: [
        {
          getActiveMeshes: () => ({ length: 2 }),
        },
      ],
      getActiveMeshes: () => ({ length: 3 }),
      getActiveIndices: () => 300,
      getTotalVertices: () => 1200,
    } as unknown as Scene;

    const engine = {
      isWebGPU: true,
      description: "WebGPU",
      getFps: () => 59.75,
    } as unknown as AbstractEngine;

    const snapshot = await captureScenePerformanceSnapshot(scene, engine, {
      captureRafFps: false,
      captureDrawCalls: false,
      now: () => "2026-10-02T00:00:00.000Z",
    });

    expect(snapshot).toEqual({
      capturedAt: "2026-10-02T00:00:00.000Z",
      backend: "webgpu",
      engineDescription: "WebGPU",
      rafFps: null,
      engineFps: 59.75,
      totalMeshes: 3,
      activeMeshes: 3,
      totalVertices: 1200,
      activeIndices: 300,
      activeTriangles: 100,
      materials: 2,
      textures: 1,
      animationGroups: 2,
      skeletons: 1,
      drawCalls: null,
    });
  });

  it("samples RAF FPS from frame timestamps", async () => {
    let timestamp = 0;

    const fps = await sampleRafFps(4, (callback) => {
      timestamp += 20;
      queueMicrotask(() => callback(timestamp));
      return timestamp;
    });

    expect(fps).toBeCloseTo(50, 6);
  });
});
