// Input-level browser check. Never invokes game actions, teleport or autoplay.
const fs = require('node:fs');
const { chromium } = require('playwright');
const delay = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9229');
  const context = browser.contexts()[0];
  for(const old of context.pages()) await old.close();
  const page = await context.newPage();
  await page.bringToFront();
  const errors = [], trace = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => errors.push(`${r.url()}: ${r.failure()?.errorText}`));
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://127.0.0.1:5179/');
  await page.waitForTimeout(5000);
  let mouseX = 640, mouseY = 360;
  async function state() {
    return page.evaluate(() => {
      const d = window.__UET_CH0__;
      const c = document.querySelector('#game-canvas');
      const buttons = [...document.querySelectorAll('#ch0-dialogue.visible button')].map(e => e.textContent);
      const p = d?.player.getFeetPosition(), r = d?.player.camera.rotation;
      return { ...c.dataset, buttons, lock: !!document.pointerLockElement,
        p: p && [p.x,p.y,p.z], r: r && [r.x,r.y], fps: d?.player.camera.getScene().getEngine().getFps(),
        targets: d?.world.interactionTargets.filter(t => t.mesh.isEnabled()).map(t => {
          const q=t.mesh.getAbsolutePosition();return { id:t.actionId,p:[q.x,q.y,q.z],max:t.maxDistance };
        }) };
    });
  }
  const wanted = ['hail_bus','talk_driver','observe_red_light','board_outbound','resolve_fare','finish_ride_uet','nav_staff','complete_admin','prepare_return_fare','board_return','finish_ride_home'];
  let last = '', stuck = 0;
  for(let n=0;n<400;n++) {
    const s=await state();
    if(s.ch0Scene!==last){last=s.ch0Scene;trace.push({scene:last,feet:s.p,fps:s.fps});console.log('SCENE',JSON.stringify(trace.at(-1)))}
    if(s.ch0Complete==='true')break;
    if(s.buttons.length){await page.keyboard.press(s.buttons[0]==='Tiếp'?'Enter':'1');await delay(300);continue}
    if(!s.p){await delay(200);continue}
    if(!s.lock){mouseX=640;mouseY=360;await page.bringToFront();await page.mouse.click(mouseX,mouseY);await delay(120);if(!(await state()).lock)continue}
    const t=s.targets?.find(t=>wanted.includes(t.id));if(!t){await delay(200);continue}
    let goal=t.p;let waypoint=false;
    if(t.id==='complete_admin' && s.p[2]<3.3){goal=s.p[0]>-5.7?[-6,1.65,1.4]:[-6,1.65,3.7];waypoint=true;}
    const dx=goal[0]-s.p[0],dz=goal[2]-s.p[2];const distance=Math.hypot(dx,dz);
    const yaw=Math.atan2(dx,dz),pitch=-Math.atan2(goal[1]-(s.p[1]+1.65),distance);
    let turn=yaw-s.r[1];turn=Math.atan2(Math.sin(turn),Math.cos(turn));
    mouseX+=turn/.0022;mouseY+=(pitch-s.r[0])/.0022;
    await page.mouse.move(mouseX,mouseY);await delay(100);
    if(waypoint || distance>(t.id==='hail_bus'?t.max-1:Math.min(t.max-.6,2.15))){
      await page.keyboard.down('w');await delay(Math.min(500,Math.max(.2,distance-(waypoint?.15:2))/3.2*1000));await page.keyboard.up('w');
    }else{
      const fresh=await state();if(fresh.interactionTarget===`ch0-action-${t.id}`){await page.keyboard.press('e');await delay(180)}else{stuck++;console.log('NO TARGET',t.id,distance,fresh.interactionTarget);await delay(120)}
    }
  }
  const final=await state();console.log('FINAL',JSON.stringify(final));console.log('ERRORS',errors);
  await page.screenshot({path:'C:/Users/Dell/projects/p0-end.png'});
  fs.writeFileSync('C:/Users/Dell/projects/p0-baseline.json',JSON.stringify({method:'normal browser keyboard/mouse; no game action API, no teleport, no autoplay',trace,final,errors,stuck},null,2));
  await browser.close();
  if(final.ch0Complete!=='true')process.exitCode=1;
})();
