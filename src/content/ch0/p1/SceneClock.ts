/** Time belongs to the running scene, so tab blur never skips authored actions. */
export class SceneClock {
  private pending: {left:number, resolve:()=>void}[] = [];
  sleep(ms:number):Promise<void> { return new Promise(resolve=>this.pending.push({left:Math.max(0,ms),resolve})); }
  update(dt:number):void { for(const p of this.pending)p.left-=dt*1000;const due=this.pending.filter(p=>p.left<=0);this.pending=this.pending.filter(p=>p.left>0);for(const p of due)p.resolve(); }
  dispose():void { for(const p of this.pending)p.resolve();this.pending=[]; }
}
