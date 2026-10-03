const fs=require('node:fs'),{chromium}=require('playwright');
(async()=>{
const b=await chromium.connectOverCDP('http://127.0.0.1:9229'),results=[];
for(const fallback of [false,true]){
 const c=await b.newContext({viewport:{width:1280,height:720}}),p=await c.newPage(),errors=[],warnings=[];
 if(fallback)await c.addInitScript(()=>Object.defineProperty(Navigator.prototype,'gpu',{get:()=>undefined,configurable:true}));
 p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));
 p.on('response',r=>{if(r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url())});
 p.on('console',m=>{if(['error','warning'].includes(m.type()))warnings.push(m.text())});
 await p.goto('http://127.0.0.1:5180/?sample=p1&mute=1');
 await p.locator('#p1-landing button:not([disabled])').waitFor({timeout:60000});
 const label=await p.locator('#p1-landing button').innerText();if(!label.includes('tạm tắt tiếng'))throw Error('Mute label absent');
 await p.locator('#p1-landing button').click();await p.waitForTimeout(3000);
 const s=await p.evaluate(()=>({dataset:{...document.querySelector('canvas').dataset},backend:window.__UET_P1__.player.camera.getScene().getEngine().constructor.name,fatal:document.querySelector('#p1-fatal')?.textContent||'',driver:window.__UET_P1__.world.driverRoot?.position?.asArray()}));
 await p.screenshot({path:'C:/Users/Dell/projects/p1-delivery/muted-'+(fallback?'webgl':'webgpu')+'.png'});
 results.push({fallback,label,...s,errors,warnings});await c.close();
}
fs.writeFileSync('C:/Users/Dell/projects/p1-muted-backend-check.json',JSON.stringify({timestamp:new Date().toISOString(),method:'Muted production build ordinary Start input; 3s smoke per backend; not full fallback playthrough',results},null,2));
console.log(JSON.stringify(results));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
