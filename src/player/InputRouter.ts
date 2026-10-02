export interface MovementButtons {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export interface MovementAxes {
  x: number;
  z: number;
}

export interface LookDelta {
  x: number;
  y: number;
}

const MOVEMENT_CODES = new Set([
  "KeyW",
  "KeyS",
  "KeyA",
  "KeyD",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
]);

export function calculateMovementAxes(
  buttons: MovementButtons,
): MovementAxes {
  const x = Number(buttons.right) - Number(buttons.left);
  const z = Number(buttons.forward) - Number(buttons.backward);
  const length = Math.hypot(x, z);

  if (length === 0) {
    return { x: 0, z: 0 };
  }

  const divisor = Math.max(1, length);
  return {
    x: x / divisor,
    z: z / divisor,
  };
}

export class InputRouter {
  private readonly pressedKeys = new Set<string>();
  private lookX = 0;
  private lookY = 0;
  private canvas: HTMLCanvasElement | null = null;
  private attached = false;
  private hadPointerLock = false;
  private pointerLockSuspended = false;

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (MOVEMENT_CODES.has(event.code)) {
      this.setKeyState(event.code, true);
      event.preventDefault();
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    if (MOVEMENT_CODES.has(event.code)) {
      this.setKeyState(event.code, false);
      event.preventDefault();
    }
  };

  private readonly onMouseMove = (event: MouseEvent): void => {
    if (!this.canvas || document.pointerLockElement !== this.canvas) {
      return;
    }

    this.lookX += event.movementX;
    this.lookY += event.movementY;
  };

  private readonly onPointerLockChange = (): void => {
    if (!this.canvas) {
      return;
    }

    this.syncPointerLockState(document.pointerLockElement === this.canvas);
  };

  private readonly onBlur = (): void => {
    this.clearTransientInput();
  };

  private readonly onCanvasClick = (): void => {
    if (!this.canvas || document.pointerLockElement === this.canvas) {
      return;
    }

    void this.canvas.requestPointerLock();
  };

  attach(canvas: HTMLCanvasElement): void {
    if (this.attached) {
      this.detach();
    }

    this.canvas = canvas;
    this.attached = true;
    window.addEventListener("keydown", this.onKeyDown, { passive: false });
    window.addEventListener("keyup", this.onKeyUp, { passive: false });
    window.addEventListener("blur", this.onBlur);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("pointerlockchange", this.onPointerLockChange);
    canvas.addEventListener("click", this.onCanvasClick);
  }

  detach(): void {
    if (!this.attached) {
      return;
    }

    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.onBlur);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener(
      "pointerlockchange",
      this.onPointerLockChange,
    );
    this.canvas?.removeEventListener("click", this.onCanvasClick);
    this.canvas = null;
    this.attached = false;
    this.hadPointerLock = false;
    this.pointerLockSuspended = false;
    this.clearTransientInput();
  }

  setKeyState(code: string, pressed: boolean): void {
    if (!MOVEMENT_CODES.has(code)) {
      return;
    }

    if (pressed) {
      this.pressedKeys.add(code);
    } else {
      this.pressedKeys.delete(code);
    }
  }

  syncPointerLockState(locked: boolean): void {
    if (locked) {
      this.hadPointerLock = true;
      this.pointerLockSuspended = false;
      this.clearLookInput();
      return;
    }

    this.clearLookInput();
    if (this.hadPointerLock) {
      this.pointerLockSuspended = true;
    }
  }

  getMovementAxes(): MovementAxes {
    if (this.pointerLockSuspended) {
      return { x: 0, z: 0 };
    }

    return calculateMovementAxes({
      forward:
        this.pressedKeys.has("KeyW") || this.pressedKeys.has("ArrowUp"),
      backward:
        this.pressedKeys.has("KeyS") || this.pressedKeys.has("ArrowDown"),
      left:
        this.pressedKeys.has("KeyA") || this.pressedKeys.has("ArrowLeft"),
      right:
        this.pressedKeys.has("KeyD") || this.pressedKeys.has("ArrowRight"),
    });
  }

  consumeLookDelta(): LookDelta {
    const delta = { x: this.lookX, y: this.lookY };
    this.lookX = 0;
    this.lookY = 0;
    return delta;
  }

  clearTransientInput(): void {
    this.pressedKeys.clear();
    this.clearLookInput();
  }

  private clearLookInput(): void {
    this.lookX = 0;
    this.lookY = 0;
  }
}
