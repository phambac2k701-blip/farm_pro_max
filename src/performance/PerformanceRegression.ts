import type { ScenePerformanceSnapshot } from "./ScenePerformanceSnapshot";

export interface PerformanceRegressionThresholds {
  maxRafFpsDrop?: number;
  maxEngineFpsDrop?: number;
  maxMeshIncrease?: number;
  maxActiveMeshIncrease?: number;
  maxVertexIncrease?: number;
  maxActiveTriangleIncrease?: number;
  maxMaterialIncrease?: number;
  maxTextureIncrease?: number;
  maxAnimationGroupIncrease?: number;
  maxSkeletonIncrease?: number;
  maxDrawCallIncrease?: number;
}

export type RegressionMetric =
  | "rafFps"
  | "engineFps"
  | "totalMeshes"
  | "activeMeshes"
  | "totalVertices"
  | "activeTriangles"
  | "materials"
  | "textures"
  | "animationGroups"
  | "skeletons"
  | "drawCalls";

export interface PerformanceRegressionWarning {
  metric: RegressionMetric;
  baseline: number;
  candidate: number;
  delta: number;
  threshold: number;
  direction: "drop" | "increase";
}

export interface PerformanceSnapshotDeltas {
  rafFps: number | null;
  engineFps: number;
  totalMeshes: number;
  activeMeshes: number;
  totalVertices: number;
  activeTriangles: number | null;
  materials: number;
  textures: number;
  animationGroups: number;
  skeletons: number;
  drawCalls: number | null;
}

export interface PerformanceSnapshotComparison {
  deltas: PerformanceSnapshotDeltas;
  warnings: readonly PerformanceRegressionWarning[];
  hasRegression: boolean;
}

function nullableDelta(
  baseline: number | null,
  candidate: number | null,
): number | null {
  return baseline === null || candidate === null ? null : candidate - baseline;
}

function addDropWarning(
  warnings: PerformanceRegressionWarning[],
  metric: RegressionMetric,
  baseline: number | null,
  candidate: number | null,
  threshold: number | undefined,
): void {
  if (
    threshold === undefined ||
    baseline === null ||
    candidate === null ||
    candidate >= baseline - threshold
  ) {
    return;
  }

  warnings.push({
    metric,
    baseline,
    candidate,
    delta: candidate - baseline,
    threshold,
    direction: "drop",
  });
}

function addIncreaseWarning(
  warnings: PerformanceRegressionWarning[],
  metric: RegressionMetric,
  baseline: number | null,
  candidate: number | null,
  threshold: number | undefined,
): void {
  if (
    threshold === undefined ||
    baseline === null ||
    candidate === null ||
    candidate <= baseline + threshold
  ) {
    return;
  }

  warnings.push({
    metric,
    baseline,
    candidate,
    delta: candidate - baseline,
    threshold,
    direction: "increase",
  });
}

export function comparePerformanceSnapshots(
  baseline: ScenePerformanceSnapshot,
  candidate: ScenePerformanceSnapshot,
  thresholds: PerformanceRegressionThresholds = {},
): PerformanceSnapshotComparison {
  const warnings: PerformanceRegressionWarning[] = [];

  addDropWarning(
    warnings,
    "rafFps",
    baseline.rafFps,
    candidate.rafFps,
    thresholds.maxRafFpsDrop,
  );
  addDropWarning(
    warnings,
    "engineFps",
    baseline.engineFps,
    candidate.engineFps,
    thresholds.maxEngineFpsDrop,
  );

  addIncreaseWarning(warnings, "totalMeshes", baseline.totalMeshes, candidate.totalMeshes, thresholds.maxMeshIncrease);
  addIncreaseWarning(warnings, "activeMeshes", baseline.activeMeshes, candidate.activeMeshes, thresholds.maxActiveMeshIncrease);
  addIncreaseWarning(warnings, "totalVertices", baseline.totalVertices, candidate.totalVertices, thresholds.maxVertexIncrease);
  addIncreaseWarning(warnings, "activeTriangles", baseline.activeTriangles, candidate.activeTriangles, thresholds.maxActiveTriangleIncrease);
  addIncreaseWarning(warnings, "materials", baseline.materials, candidate.materials, thresholds.maxMaterialIncrease);
  addIncreaseWarning(warnings, "textures", baseline.textures, candidate.textures, thresholds.maxTextureIncrease);
  addIncreaseWarning(warnings, "animationGroups", baseline.animationGroups, candidate.animationGroups, thresholds.maxAnimationGroupIncrease);
  addIncreaseWarning(warnings, "skeletons", baseline.skeletons, candidate.skeletons, thresholds.maxSkeletonIncrease);
  addIncreaseWarning(warnings, "drawCalls", baseline.drawCalls, candidate.drawCalls, thresholds.maxDrawCallIncrease);

  return {
    deltas: {
      rafFps: nullableDelta(baseline.rafFps, candidate.rafFps),
      engineFps: candidate.engineFps - baseline.engineFps,
      totalMeshes: candidate.totalMeshes - baseline.totalMeshes,
      activeMeshes: candidate.activeMeshes - baseline.activeMeshes,
      totalVertices: candidate.totalVertices - baseline.totalVertices,
      activeTriangles: nullableDelta(baseline.activeTriangles, candidate.activeTriangles),
      materials: candidate.materials - baseline.materials,
      textures: candidate.textures - baseline.textures,
      animationGroups: candidate.animationGroups - baseline.animationGroups,
      skeletons: candidate.skeletons - baseline.skeletons,
      drawCalls: nullableDelta(baseline.drawCalls, candidate.drawCalls),
    },
    warnings,
    hasRegression: warnings.length > 0,
  };
}
