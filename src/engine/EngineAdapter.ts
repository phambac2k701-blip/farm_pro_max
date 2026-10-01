import { Engine } from "@babylonjs/core/Engines/engine";
import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";

export type RenderingBackend = "webgpu" | "webgl";
export type EngineFactory = () => Promise<AbstractEngine>;

export interface EngineFactories {
  createWebGPU: EngineFactory;
  createWebGL: EngineFactory;
}

export interface SelectedEngine {
  engine: AbstractEngine;
  backend: RenderingBackend;
}

export async function createEngineWithFallback(
  factories: EngineFactories,
): Promise<SelectedEngine> {
  try {
    const engine = await factories.createWebGPU();
    return { engine, backend: "webgpu" };
  } catch {
    const engine = await factories.createWebGL();
    return { engine, backend: "webgl" };
  }
}

export class EngineAdapter {
  readonly engine: AbstractEngine;
  readonly backend: RenderingBackend;

  private readonly resizeHandler = (): void => {
    this.engine.resize();
  };

  private constructor(selected: SelectedEngine) {
    this.engine = selected.engine;
    this.backend = selected.backend;
    window.addEventListener("resize", this.resizeHandler);
  }

  static async create(canvas: HTMLCanvasElement): Promise<EngineAdapter> {
    const selected = await createEngineWithFallback({
      createWebGPU: async () => {
        if (typeof navigator === "undefined" || !("gpu" in navigator)) {
          throw new Error("WebGPU is not available in this browser.");
        }

        const engine = new WebGPUEngine(canvas, {
          antialias: true,
          adaptToDeviceRatio: true,
        });
        await engine.initAsync();
        return engine;
      },
      createWebGL: async () =>
        new Engine(canvas, true, undefined, true),
    });

    return new EngineAdapter(selected);
  }

  run(render: () => void): void {
    this.engine.runRenderLoop(render);
  }

  stop(render?: () => void): void {
    this.engine.stopRenderLoop(render);
  }

  dispose(): void {
    window.removeEventListener("resize", this.resizeHandler);
    this.stop();
    this.engine.dispose();
  }
}

