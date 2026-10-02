export interface ClassroomPlacement {
  x: number;
  y: number;
  z: number;
  rotationY: number;
}

export interface ClassroomDeskPlacement extends ClassroomPlacement {
  row: number;
  column: number;
}

export interface ClassroomChairPlacement extends ClassroomPlacement {
  row: number;
  column: number;
  seat: "left" | "right";
}

// Room orientation: students face +X toward the front board.
// Therefore, from the back of class looking toward the board:
// left wall = +Z, right wall = -Z.
export const CLASSROOM_ROOM = {
  minX: 1.5,
  maxX: 18.2,
  minZ: -4.8,
  maxZ: 5.8,
  height: 4.2,
  centerX: 9.85,
  centerZ: 0.5,
} as const;

// User correction 2026-10-02: main entrance is on the left wall (+Z),
// close to the front wall rather than on the old rear/corridor wall.
export const CLASSROOM_DOOR = {
  centerX: 16.65,
  z: CLASSROOM_ROOM.maxZ,
  width: 1.4,
  height: 2.45,
} as const;

const ROW_START_X = 2.9;
const ROW_PITCH = 1.25;
const COLUMN_Z = [-2.8, 0.5, 3.8] as const;
const FACING_ROTATION_Y = Math.PI / 2;

// User-authoritative base layout: 10 rows × 3 desk columns = 30 desks.
export const CLASSROOM_DESKS: readonly ClassroomDeskPlacement[] =
  Array.from({ length: 10 }, (_, rowIndex) =>
    COLUMN_Z.map((z, columnIndex) => ({
      row: rowIndex + 1,
      column: columnIndex + 1,
      x: ROW_START_X + rowIndex * ROW_PITCH,
      y: 0,
      z,
      rotationY: FACING_ROTATION_Y,
    })),
  ).flat();

// Two chairs per desk = approximately 60 seats.
export const CLASSROOM_CHAIRS: readonly ClassroomChairPlacement[] =
  CLASSROOM_DESKS.flatMap((desk, index) => {
    const pullOffset =
      index % 7 === 0 ? -0.055 : index % 5 === 0 ? 0.035 : 0;
    const yawOffset =
      index % 8 === 0 ? 0.018 : index % 6 === 0 ? -0.014 : 0;
    return [
      {
        row: desk.row,
        column: desk.column,
        seat: "left" as const,
        x: desk.x - 0.62 + pullOffset,
        y: 0,
        z: desk.z - 0.37,
        rotationY: FACING_ROTATION_Y + yawOffset,
      },
      {
        row: desk.row,
        column: desk.column,
        seat: "right" as const,
        x: desk.x - 0.62 - pullOffset * 0.4,
        y: 0,
        z: desk.z + 0.37,
        rotationY: FACING_ROTATION_Y - yawOffset,
      },
    ];
  });

// User correction: teacher desk moves to the right side when viewed from
// the back row, aligned with the right/inner student desk column.
export const CLASSROOM_TEACHER_DESK: ClassroomPlacement = {
  x: 16.35,
  y: 0,
  z: -2.8,
  rotationY: -Math.PI / 2,
};

// Board is centered on the front wall and intentionally large enough for
// the 60-seat room. The GLB itself owns the final physical dimensions.
export const CLASSROOM_BOARD: ClassroomPlacement = {
  x: 18.08,
  y: 2.48,
  z: 0.5,
  rotationY: Math.PI / 2,
};

export const CLASSROOM_FANS: readonly ClassroomPlacement[] = [
  { x: 5.6, y: 3.72, z: 0.5, rotationY: 0 },
  { x: 10.1, y: 3.72, z: 0.5, rotationY: 0.06 },
  { x: 14.4, y: 3.72, z: 0.5, rotationY: -0.05 },
];

export const CLASSROOM_FIXTURES: readonly ClassroomPlacement[] = [
  { x: 5.0, y: 4.03, z: -1.7, rotationY: 0 },
  { x: 9.5, y: 4.03, z: -1.7, rotationY: 0 },
  { x: 14.0, y: 4.03, z: -1.7, rotationY: 0 },
  { x: 5.0, y: 4.03, z: 2.7, rotationY: 0 },
  { x: 9.5, y: 4.03, z: 2.7, rotationY: 0 },
  { x: 14.0, y: 4.03, z: 2.7, rotationY: 0 },
];

export const CLASSROOM_AC: ClassroomPlacement = {
  x: 13.8,
  y: 3.25,
  z: CLASSROOM_ROOM.maxZ - 0.14,
  rotationY: 0,
};

export const CLASSROOM_WINDOWS = {
  // Existing workshop placements retained for now. Latest user correction
  // only changes entrance/teacher/board; window layout is not being expanded
  // further in this correction pass.
  largeLeft: {
    centerX: 6.0,
    centerY: 2.42,
    z: CLASSROOM_ROOM.minZ + 0.06,
    width: 5.0,
    height: 1.5,
  },
  teacherLeft: {
    centerX: 15.1,
    centerY: 2.65,
    z: CLASSROOM_ROOM.minZ + 0.06,
    width: 2.15,
    height: 1.02,
  },
  rearRight: {
    centerX: 3.85,
    centerY: 2.65,
    z: CLASSROOM_ROOM.maxZ - 0.06,
    width: 2.15,
    height: 1.02,
  },
} as const;
