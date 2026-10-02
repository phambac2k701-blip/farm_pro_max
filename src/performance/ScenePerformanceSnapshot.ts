import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { SceneInstrumentation } from "@babylonjs/core/Instrumentation/sceneInstrumentation";
import type { Scene } from "@babylonjs/core/scene";

export type SnapshotRenderingBackend = "webgpu" | "webgl" | "unknown";

export interface ScenePerformanceSnapshot {
  capturedAt: string;
  backend: SnapshotRenderingBackend;
  engineDescription: string;
  rafFps: number | null;
  engineFps: number;
  totalMeshes: number;
  activeMeshes: number;
  totalVertices: number;
  activeIndices: number;
  activeTriangles: number | null;
  materials: number;
  textures: number;
  animationGroups: number;
  skeletons: number;
  drawCalls: number | null;
}

export interface ScenePerformanceSnapshotOptions {
  captureRafFps?: boolean;
  rafFrameCount?: number;
  captureDrawCalls?: boolean;
  drawCallTimeoutMs?: number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  now?: () => string;
}

const DEFAULT_RAF_FRAME_COUNT = 30;
const DEFAULT_DRAW_CALL_TIMEOUT_MS = 250;

function detectBackend(engine: AbstractEngine): SnapshotRenderingBackend {
  if (engine.isWebGPU) {
    return "webgpu";
  }

  const description = engine.description.toLowerCase();
  return description.includes("webgl") ? "webgl" : "unknown";
}

function countActiveMeshes(scene: Scene): number {
  return scene.getActiveMeshes().length;
}

export async function sampleRafFps(
  frameCount = DEFAULT_RAF_FRAME_COUNT,
  requestFrame?: (callback: FrameRequestCallback) => number,
): Promise<number | null> {
  if (frameCount < 2) {
    return null;
  }

  const scheduler =
    requestFrame ??
    (typeof requestAnimationFrame === "function" ? requestAnimationFrame : undefined);

  if (!scheduler) {
    return null;
  }

  return new Promise((resolve) => {
    let firstTimestamp: number | null = null;
    let observedFrames = 0;

    const onFrame = (timestamp: number): void => {
      observedFrames += 1;

      if (firstTimestamp === null) {
        firstTimestamp = timestamp;
      }

      if (observedFrames >= frameCount) {
        const elapsedMs = timestamp - firstTimestamp;
        resolve(elapsedMs > 0 ? ((observedFrames - 1) * 1000) / elapsedMs : null);
        return;
      }

      scheduler(onFrame);
    };

    scheduler(onFrame);
  });
}

async function sampleDrawCalls(
  scene: Scene,
  timeoutMs: number,
): Promise<number | null> {
  const instrumentation = new SceneInstrumentation(scene);

  return new Promise((resolve) => {
    let settled = false;
    let timeout: ReturnType<typeof globalThis.setTimeout> | undefined;

    const finish = (value: number | null): void => {
      if (settled) {
        return;
      }

      settled = true;
      if (timeout !== undefined) {
        globalThis.clearTimeout(timeout);
      }
      instrumentation.dispose();
      resolve(value);
    };

    const observer = scene.onAfterRenderObservable.addOnce(() => {
      const current = instrumentation.drawCallsCounter.current;
      finish(Number.isFinite(current) ? current : null);
    });

    timeout = globalThis.setTimeout(() => {
      scene.onAfterRenderObservable.remove(observer);
      finish(null);
    }, timeoutMs);
  });
}

export async function captureScenePerformanceSnapshot(
  scene: Scene,
  engine: AbstractEngine,
  options: ScenePerformanceSnapshotOptions = {},
): Promise<ScenePerformanceSnapshot> {
  const rafFpsPromise =
    options.captureRafFps === false
      ? Promise.resolve<number | null>(null)
      : sampleRafFps(options.rafFrameCount, options.requestFrame);

  const drawCallsPromise =
    options.captureDrawCalls === false
      ? Promise.resolve<number | null>(null)
      : sampleDrawCalls(
          scene,
          options.drawCallTimeoutMs ?? DEFAULT_DRAW_CALL_TIMEOUT_MS,
        );

  const [rafFps, drawCalls] = await Promise.all([rafFpsPromise, drawCallsPromise]);
  const activeIndices = scene.getActiveIndices();

  return {
    capturedAt: (options.now ?? (() => new Date().toISOString()))(),
    backend: detectBackend(engine),
    engineDescription: engine.description,
    rafFps,
    engineFps: engine.getFps(),
    totalMeshes: scene.meshes.length,
    activeMeshes: countActiveMeshes(scene),
    totalVertices: scene.getTotalVertices(),
    activeIndices,
    activeTriangles: activeIndices % 3 === 0 ? activeIndices / 3 : null,
    materials: scene.materials.length,
    textures: scene.textures.length,
    animationGroups: scene.animationGroups.length,
    skeletons: scene.skeletons.length,
    drawCalls,
  };
}
