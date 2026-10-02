import { describe, expect, it } from "vitest";

import {
  comparePerformanceSnapshots,
} from "../../src/performance/PerformanceRegression";
import type {
  ScenePerformanceSnapshot,
} from "../../src/performance/ScenePerformanceSnapshot";

function makeSnapshot(
  overrides: Partial<ScenePerformanceSnapshot> = {},
): ScenePerformanceSnapshot {
  return {
    capturedAt: "2026-10-02T00:00:00.000Z",
    backend: "webgpu",
    engineDescription: "WebGPU",
    rafFps: 60,
    engineFps: 60,
    totalMeshes: 2549,
    activeMeshes: 153,
    totalVertices: 470676,
    activeIndices: 3000,
    activeTriangles: 1000,
    materials: 40,
    textures: 24,
    animationGroups: 0,
    skeletons: 0,
    drawCalls: 180,
    ...overrides,
  };
}

describe("comparePerformanceSnapshots", () => {
  it("returns deltas without inventing regressions when thresholds are absent", () => {
    const baseline = makeSnapshot();
    const candidate = makeSnapshot({
      rafFps: 58,
      activeMeshes: 163,
      totalVertices: 480676,
      drawCalls: 190,
    });

    const comparison = comparePerformanceSnapshots(baseline, candidate);

    expect(comparison.deltas.rafFps).toBe(-2);
    expect(comparison.deltas.activeMeshes).toBe(10);
    expect(comparison.deltas.totalVertices).toBe(10000);
    expect(comparison.deltas.drawCalls).toBe(10);
    expect(comparison.warnings).toEqual([]);
    expect(comparison.hasRegression).toBe(false);
  });

  it("flags only configured thresholds that are actually exceeded", () => {
    const baseline = makeSnapshot();
    const candidate = makeSnapshot({
      rafFps: 53.9,
      engineFps: 56,
      totalMeshes: 2650,
      activeMeshes: 190,
      totalVertices: 520000,
      animationGroups: 6,
      skeletons: 2,
      drawCalls: 245,
    });

    const comparison = comparePerformanceSnapshots(baseline, candidate, {
      maxRafFpsDrop: 5,
      maxEngineFpsDrop: 5,
      maxMeshIncrease: 100,
      maxActiveMeshIncrease: 50,
      maxVertexIncrease: 50000,
      maxAnimationGroupIncrease: 4,
      maxSkeletonIncrease: 1,
      maxDrawCallIncrease: 50,
    });

    expect(comparison.warnings.map((warning) => warning.metric)).toEqual([
      "rafFps",
      "totalMeshes",
      "animationGroups",
      "skeletons",
      "drawCalls",
    ]);
    expect(comparison.hasRegression).toBe(true);
  });

  it("does not warn on optional metrics when either snapshot has no sample", () => {
    const baseline = makeSnapshot({ rafFps: null, drawCalls: null });
    const candidate = makeSnapshot({ rafFps: 55, drawCalls: 240 });

    const comparison = comparePerformanceSnapshots(baseline, candidate, {
      maxRafFpsDrop: 1,
      maxDrawCallIncrease: 1,
    });

    expect(comparison.deltas.rafFps).toBeNull();
    expect(comparison.deltas.drawCalls).toBeNull();
    expect(comparison.warnings).toEqual([]);
  });
});
