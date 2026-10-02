import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  CLASSROOM_CHAIRS,
  CLASSROOM_DESKS,
} from "../../src/art/classroom/ClassroomProductionLayout";

const assetDir = join(process.cwd(), "public", "assets", "classroom", "v1");

const expectedAssets = [
  "student-desk-v1.glb",
  "student-chair-v1.glb",
  "teacher-desk-v1.glb",
  "classroom-board-v1.glb",
  "ceiling-fan-v1.glb",
  "wall-ac-v1.glb",
  "fluorescent-fixture-v1.glb",
] as const;

describe("Classroom production assets", () => {
  it("ships the complete authored GLB set without smoke placeholders", () => {
    expect(existsSync(assetDir)).toBe(true);

    const files = readdirSync(assetDir).sort();
    expect(files).toEqual([...expectedAssets].sort());
    expect(files.some((file) => file.startsWith("_"))).toBe(false);

    for (const file of expectedAssets) {
      const fullPath = join(assetDir, file);
      expect(statSync(fullPath).size).toBeGreaterThan(4_000);
    }
  });

  it("keeps the user-directed 10x3 classroom density", () => {
    expect(CLASSROOM_DESKS).toHaveLength(30);
    expect(CLASSROOM_CHAIRS).toHaveLength(60);

    const rows = new Map<number, typeof CLASSROOM_DESKS[number][]>();
    for (const desk of CLASSROOM_DESKS) {
      const row = rows.get(desk.row) ?? [];
      row.push(desk);
      rows.set(desk.row, row);
    }

    expect(rows.size).toBe(10);
    for (const desks of rows.values()) {
      expect(desks).toHaveLength(3);
      const sorted = [...desks].sort((a, b) => a.z - b.z);
      expect(sorted[1]!.z - sorted[0]!.z).toBeGreaterThan(2);
      expect(sorted[2]!.z - sorted[1]!.z).toBeGreaterThan(2);
      expect(sorted.every((desk) => desk.rotationY === Math.PI / 2)).toBe(
        true,
      );
    }
  });
});
