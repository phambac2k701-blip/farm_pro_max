// Ordinary browser input only. Diagnostics are read-only; no runtime action API.
// Optional Playwright tooling; npm install --no-save --package-lock=false playwright
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const out = process.env.UET_EVIDENCE || 'C:/Users/Dell/projects/p1-evidence';
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.connectOverCDP(process.env.UET_CDP || 'http://127.0.0.1:9229');
  const anchor=browser.contexts()[0]?.pages()[0] ?? await browser.contexts()[0].newPage();
  await anchor.goto('about:blank');
  for (const c of browser.contexts()) for (const p of c.pages()) if(p!==anchor) await p.close();
  const capture=process.env.UET_CAPTURE!=='0';
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, ...(capture?{recordVideo: { dir: out, size: { width: 1280, height: 720 } }}:{}) });
  if(capture)await context.addInitScript(() => {
    // Tap live game output, after its gain/spatial mixing. No reconstructed audio.
    const connect = AudioNode.prototype.connect;
    AudioNode.prototype.connect = function(destination, ...args) {
      const result = connect.call(this, destination, ...args);
      if (destination === this.context.destination && !window.__audioCapture) {
        const tap = this.context.createMediaStreamDestination();
        connect.call(this, tap);
        const recorder = new MediaRecorder(tap.stream, { mimeType: 'audio/webm;codecs=opus' });
        const capture = window.__audioCapture = { recorder, context: this.context, chunks: [], startedAt: Date.now() };
        recorder.ondataavailable = e => { if (e.data.size) capture.chunks.push(e.data); };
        recorder.start(1000);
      }
      return result;
    };
  });
  const page = await context.newPage();
  const video = page.video();
  const createdAt = Date.now(), errors = [], warnings = [], trace = [], subtitles = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => errors.push(`${r.url()}: ${r.failure()?.errorText}`));
  page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) warnings.push(m.text()); });
  await page.goto(process.env.UET_P1_URL || 'http://127.0.0.1:5180/?sample=p1');
  await page.bringToFront();
  await page.locator('#p1-landing button:not([disabled])').waitFor({ timeout: 60000 });
  async function state() {
    return page.evaluate(() => {
      const d = window.__UET_P1__, c = document.querySelector('canvas');
      const p = d.player.getFeetPosition(), r = d.player.camera.rotation;
      return { ...c.dataset, p1Movement:String(d.player.isLocomotionEnabled),p1Look:String(d.player.isLookEnabled), focused:document.hasFocus(), audioState:window.__audioCapture?.context.state, p: [p.x,p.y,p.z], r: [r.x,r.y], lock: !!document.pointerLockElement,
        line: document.querySelector('#ch0-dialogue.visible .ch0-dialogue-text')?.textContent,
        buttons: [...document.querySelectorAll('#ch0-dialogue.visible button')].map(e => e.textContent),
        bus: d.world.busRoot.position.asArray(), audioFailures: [...d.audioFailures], fps: d.player.camera.getScene().getEngine().getFps() };
    });
  }
  async function mark(label) { const s = await state(); trace.push({ label, seconds: (Date.now()-createdAt)/1000, ...s }); console.log(label, JSON.stringify(s)); return s; }
  await page.screenshot({ path: path.join(out, 'street.png') });
  const clickedAt = Date.now();
  await page.locator('#p1-landing button').click();
  await page.waitForTimeout(4500);
  await page.screenshot({ path: path.join(out, 'hand-phone.png') });
  await mark('call');
  await page.mouse.move(640,360);await page.waitForTimeout(120);
  if(process.env.UET_ROBUST==='1') {
    const other=await context.newPage();await other.goto('about:blank');
    // Playwright re-enables focus emulation on navigation: disable it only
    // after both documents exist, so this check observes native browser focus.
    await (await context.newCDPSession(page)).send('Emulation.setFocusEmulationEnabled',{enabled:false});
    await (await context.newCDPSession(other)).send('Emulation.setFocusEmulationEnabled',{enabled:false});
    await other.bringToFront();
    await page.waitForTimeout(180);const paused=await mark('blur-pause');
    await page.waitForTimeout(1800);const still=await state();
    if(paused.p1Paused!=='true'||still.line!==paused.line)throw Error('Blur failed to hold the staged call');
    await other.close();await page.bringToFront();await page.waitForTimeout(250);await mark('focus-resume');
    // Restore the recorder's focus emulation after the native blur/resume check.
    // This avoids unrelated desktop activity pausing a long input recording.
    await (await context.newCDPSession(page)).send('Emulation.setFocusEmulationEnabled',{enabled:true});
  }
  await page.waitForFunction(() => document.querySelector('canvas').dataset.p1Stage === 'wave', undefined, { timeout: 60000 }).catch(async e=>{await mark('call-timeout');throw e});
  const handoff = await mark('handoff');
  if (handoff.p1Movement !== 'true' || handoff.p1Look !== 'true') throw Error('Control handoff failed');
  // Standing still and walking away do not advance the encounter.
  await page.waitForTimeout(2500);
  await page.keyboard.down('s'); await page.waitForTimeout(220); await page.keyboard.up('s');
  await mark('wait-and-walk-back');
  let mx=640, my=360;
  async function acquire() { if (!(await state()).lock) { mx=640;my=360;await page.mouse.click(mx,my);await page.waitForTimeout(100); } }
  async function aim(target) {
    await acquire(); const s=await state(), dx=target[0]-s.p[0], dz=target[2]-s.p[2], dist=Math.hypot(dx,dz);
    const yaw=Math.atan2(dx,dz), pitch=-Math.atan2(target[1]-(s.p[1]+1.65),dist);
    const turn=Math.atan2(Math.sin(yaw-s.r[1]),Math.cos(yaw-s.r[1]));
    mx+=turn/.0022;my+=(pitch-s.r[0])/.0022;await page.mouse.move(mx,my);await page.waitForTimeout(150);return dist;
  }
  await aim([0,1.6,.5]);
  if((await state()).interactionTarget!=='p1-hail')throw Error('Input harness missed the wave target');
  await page.keyboard.press('e'); await page.waitForTimeout(2700);
  await mark('moving-bus');await page.screenshot({path:path.join(out,'bus-pass.png')});
  // Repeated input cannot launch a second pass.
  await page.keyboard.press('e');await page.keyboard.press('e');
  await page.waitForFunction(() => document.querySelector('canvas').dataset.p1Stage==='driver-ready', undefined, {timeout:20000});
  await page.waitForTimeout(4500);
  for(let i=0;i<25;i++) {
    const dist=await aim([2.1,1.65,-2.55]);
    if((await state()).interactionTarget==='p1-driver')break;
    await page.keyboard.down('w');await page.waitForTimeout(Math.min(450,Math.max(100,(dist-2)/3*1000)));await page.keyboard.up('w');
  }
  await mark('driver-target');await page.screenshot({path:path.join(out,'driver.png')});
  await page.keyboard.press('e');
  let selected=false, pointed=false;
  for(let i=0;i<150;i++) {
    const s=await state();
    if(s.line && subtitles.at(-1)?.text!==s.line)subtitles.push({seconds:(Date.now()-createdAt)/1000,text:s.line});
    if(s.buttons.length&&!selected){await page.keyboard.press(process.env.UET_REPLY || '1');selected=true;}
    if(s.line?.includes('biển')&&!pointed){await acquire();await page.waitForTimeout(1300);await page.screenshot({path:path.join(out,'driver-point.png')});await mark('point-cue');pointed=true;}
    if(s.p1Stage==='review')break;
    await page.waitForTimeout(400);
  }
  const final=await mark('review');
  if(final.p1Stage!=='review'||final.ch0Complete!=='false'||!selected||!pointed)throw Error('Candidate did not complete at P1 boundary');
  await acquire();await aim([10.3,2.5,.05]);await page.screenshot({path:path.join(out,'stop.png')});
  await page.waitForTimeout(1200);
  if(process.env.UET_ROBUST==='1') {
    await page.keyboard.press('Escape');await page.waitForTimeout(150);const escaped=await mark('escape');if(escaped.lock)throw Error('Esc did not release the pointer');
    await acquire();await page.keyboard.down('w');await page.waitForTimeout(150);await page.keyboard.up('w');
    await mark('reacquire-and-move');
  }
  const performance=await page.evaluate(async()=>{const d=window.__UET_P1__,values=[...d.frameMs].sort((a,b)=>a-b);return {snapshot:await d.snapshot(),frames:values.length,p50:values[Math.floor(values.length*.5)],p95:values[Math.floor(values.length*.95)],p99:values[Math.floor(values.length*.99)]}});
  const audio=await page.evaluate(async()=>{
    const c=window.__audioCapture;if(!c)return null;
    const stopped=new Promise(r=>c.recorder.addEventListener('stop',r,{once:true}));c.recorder.stop();await stopped;
    const blob=new Blob(c.chunks,{type:'audio/webm'});const data=await new Promise(r=>{const reader=new FileReader();reader.onload=()=>r(reader.result);reader.readAsDataURL(blob)});
    return {startedAt:c.startedAt,data};
  });
  if(capture&&!audio)throw Error('Live audio capture missing');
  if(audio)fs.writeFileSync(path.join(out,'live-audio.webm'),Buffer.from(audio.data.split(',')[1],'base64'));
  const report={method:'AI uses ordinary keyboard/mouse through Playwright; diagnostics read only. Not a human subjective playtest, not runtime autoplay.',createdAt,clickedAt,recording:capture,audioStartedAt:audio?.startedAt,audioOffsetSeconds:audio?(audio.startedAt-createdAt)/1000:null,trace,subtitles,performance,errors,warnings};
  fs.writeFileSync(path.join(out,'normal-input.json'),JSON.stringify(report,null,2));
  if(process.env.UET_ROBUST==='1') {
    await page.keyboard.press('r');await page.locator('#p1-landing button:not([disabled])').waitFor({timeout:60000});
    const reset=await mark('R-replay-ready');
    if(reset.p1Stage!=='ready'||reset.p1Complete!=='false'||reset.ch0Complete!=='false')throw Error('Replay failed to reset the sample');
    report.trace=trace;fs.writeFileSync(path.join(out,'normal-input.json'),JSON.stringify(report,null,2));
  }
  await page.close();await context.close();if(video)await video.saveAs(path.join(out,'normal-input-silent.webm'));
  await browser.close();console.log('RESULT',JSON.stringify({complete:true,audioBytes:audio?fs.statSync(path.join(out,'live-audio.webm')).size:0,performance,errors,warnings:warnings.length}));
  if(errors.length||warnings.length||final.audioFailures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
