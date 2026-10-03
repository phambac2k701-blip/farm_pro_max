/** Sample boundary only; no full-chapter completion or Ch1 unlock. */
export type P1Stage = 'ready' | 'call' | 'wave' | 'bus-pass' | 'driver-ready' | 'driver-talk' | 'review';
export class P1Runtime {
  stage: P1Stage = 'ready';
  private advance(from: P1Stage, to: P1Stage): boolean {
    if (this.stage !== from) return false;
    this.stage = to;
    return true;
  }
  begin(): boolean { return this.advance('ready', 'call'); }
  callFinished(): boolean { return this.advance('call', 'wave'); }
  hail(): boolean { return this.advance('wave', 'bus-pass'); }
  busPassed(): boolean { return this.advance('bus-pass', 'driver-ready'); }
  talk(): boolean { return this.advance('driver-ready', 'driver-talk'); }
  driverFinished(): boolean { return this.advance('driver-talk', 'review'); }
}
