import { describe, expect, it, vi } from "vitest";

import {
  createEngineWithFallback,
  type EngineFactory,
} from "../../src/engine/EngineAdapter";

const fakeEngine = (name: string) =>
  ({ name, runRenderLoop: vi.fn(), resize: vi.fn(), dispose: vi.fn() }) as never;

describe("createEngineWithFallback", () => {
  it("uses WebGPU when WebGPU initialization succeeds", async () => {
    const webgpu = fakeEngine("webgpu");
    const webgl = fakeEngine("webgl");
    const createWebGPU: EngineFactory = vi.fn(async () => webgpu);
    const createWebGL: EngineFactory = vi.fn(async () => webgl);

    const result = await createEngineWithFallback({ createWebGPU, createWebGL });

    expect(result).toEqual({ engine: webgpu, backend: "webgpu" });
    expect(createWebGPU).toHaveBeenCalledOnce();
    expect(createWebGL).not.toHaveBeenCalled();
  });

  it("falls back to WebGL when WebGPU initialization fails", async () => {
    const webgl = fakeEngine("webgl");
    const createWebGPU: EngineFactory = vi.fn(async () => {
      throw new Error("WebGPU unavailable");
    });
    const createWebGL: EngineFactory = vi.fn(async () => webgl);

    const result = await createEngineWithFallback({ createWebGPU, createWebGL });

    expect(result).toEqual({ engine: webgl, backend: "webgl" });
    expect(createWebGPU).toHaveBeenCalledOnce();
    expect(createWebGL).toHaveBeenCalledOnce();
  });
});
