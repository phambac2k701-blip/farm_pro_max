import { Scene } from '@babylonjs/core/scene';
import { AudioDirector, type AudioManifest } from '../../../audio/AudioDirector';
import { EngineAdapter } from '../../../engine/EngineAdapter';
import { PlayerController } from '../../../player/PlayerController';
import { InteractionStateMachine } from '../../../interaction/InteractionStateMachine';
import { InteractionSystem } from '../../../interaction/InteractionSystem';
import { InteractionBehaviorHost, type InteractionBehavior } from '../../../interaction/behaviors/InteractionBehaviorHost';
import { Chapter0Ui } from '../Chapter0Ui';
import { StoryBeatDirector, type DirectedSequenceStep } from '../StoryBeatDirector';
import { captureScenePerformanceSnapshot } from '../../../performance/ScenePerformanceSnapshot';
import { P1Runtime } from './P1Runtime';
import { P1World } from './P1World';
import { SceneClock } from './SceneClock';
import script from './script.json';

type Line = {id:string,speaker:string,text:string};
type Reply = 'new'|'why'|'assumed';

export async function bootstrapP1():Promise<void> {
  const canvas=document.querySelector<HTMLCanvasElement>('#game-canvas')!;
  const fatal=document.querySelector<HTMLElement>('#fatal-error')!;
  const prompt=document.querySelector<HTMLElement>('#interaction-prompt')!;
  const reticle=document.querySelector<HTMLElement>('#reticle')!;
  const silentReview=new URLSearchParams(location.search).get('mute')==='1';
  document.body.dataset.sample='p1';document.title='UETốt · Mẫu P1 candidate';
  for(const id of ['inspection-overlay','phone-overlay','book-inspection-controls','evidence-notification','subtitle','chapter-transition'])document.getElementById(id)!.hidden=true;
  const badge=document.createElement('div');badge.id='p1-candidate-badge';badge.textContent='UETốt · Mẫu P1 / hình, giọng và thoại candidate';document.body.append(badge);
  const landing=document.createElement('section');landing.id='p1-landing';landing.innerHTML='<div><small>UETỐT / MẪU CHẤT LƯỢNG P1</small><h1>Một buổi sáng<br>ngoài phố.</h1><p>Gọi mẹ → vẫy xe → hỏi điểm dừng.</p><p class="p1-note">Hình ảnh, giọng và thoại dùng để đánh giá.<br>Chưa là bản hoàn thiện Ch0.</p><button disabled>Đang nạp cảnh và âm thanh…</button><p class="p1-controls">WASD di chuyển · Chuột nhìn · E tương tác<br>Esc thả chuột · Bấm vào cảnh để tiếp tục · R chơi lại</p></div>';document.body.append(landing);
  const pause=document.createElement('div');pause.id='p1-pause';pause.hidden=true;pause.textContent='Đã tạm dừng · trở lại cửa sổ để tiếp tục';document.body.append(pause);
  const review=document.createElement('section');review.id='p1-review';review.hidden=true;review.innerHTML='<div><small>ĐẾN ĐIỂM DỪNG CỦA MẪU P1</small><h2>Bạn đã biết chỗ bắt xe.</h2><p>Có thể đi quanh đoạn phố để xem candidate.</p><p>Đánh giá riêng: hình ảnh · diễn xuất<br>cảm giác điều khiển. Âm thanh tạm để sau.</p><p>R để chơi lại · Esc để thả chuột.</p></div>';document.body.append(review);
  const engine=await EngineAdapter.create(canvas);const scene=new Scene(engine.engine);
  const world=new P1World(scene);const player=PlayerController.create(scene,canvas,{spawn:world.spawn,movementSpeed:3,mouseSensitivity:.0022});
  player.setLocomotionEnabled(false);player.setLookEnabled(false);
  const state=new InteractionStateMachine(player);const interaction=new InteractionSystem(scene,player.camera,state);const host=new InteractionBehaviorHost(interaction);
  const ui=new Chapter0Ui(canvas);document.getElementById('ch0-debug')!.hidden=true;
  const clock=new SceneClock();const director=new StoryBeatDirector(ui,player,{delay:ms=>clock.sleep(ms)});const runtime=new P1Runtime();const lifetime=new AbortController();
  const manifest:AudioManifest={street:{file:'street_candidate.mp3',loop:true,volume:.24},bus:{file:'bus_engine_candidate.mp3',loop:true,volume:.55,spatial:{minDistance:4,maxDistance:35,rolloffFactor:1}},hangup:{file:'hangup_candidate.wav',volume:.15}};
  for(const group of [script.mother,script.driver,script.new,script.why,script.assumed,script.thanks])for(const l of group)manifest[l.id]={file:`${l.id}.mp3`,volume:l.speaker==='MẸ'?.82:.9,...(l.speaker==='TÀI XẾ'?{spatial:{minDistance:2,maxDistance:16,rolloffFactor:.5}}:{})};
  const audio=await AudioDirector.create(manifest,{baseUrl:new URL('assets/ch0/p1/audio/',document.baseURI).toString(),masterVolume:silentReview?0:.85});
  let paused=false,started=false,disposed=false;const frameMs:number[]=[];const audioFailures:string[]=[];
  async function speak(l:Line):Promise<void> {
    world.setActing(l.speaker==='TÀI XẾ'?(/biển/.test(l.text)?'point':'talk'):'idle');
    const controller=new AbortController();const cancel=()=>controller.abort();lifetime.signal.addEventListener('abort',cancel,{once:true});
    let spoken=false;
    try { spoken=await Promise.race([audio.playUntilEnd(l.id,l.speaker==='TÀI XẾ'?world.driverRoot:undefined,controller.signal),clock.sleep(15000).then(()=>{controller.abort();return false})]); }
    finally {lifetime.signal.removeEventListener('abort',cancel);}
    if(!spoken&&!disposed){audioFailures.push(l.id);await clock.sleep(900+l.text.length*35);badge.textContent='Candidate · thiếu giọng ở một cue; xem báo cáo';}
    world.setActing('idle');await clock.sleep(220);
  }
  const lines=(items:Line[]):Extract<DirectedSequenceStep<Reply>,{type:'line'}>[]=>items.map(l=>({type:'line',speaker:l.speaker,text:l.text,completion:()=>speak(l)}));
  function presentation():void {
    canvas.dataset.p1Stage=runtime.stage;canvas.dataset.p1Complete=String(runtime.stage==='review');canvas.dataset.ch0Complete='false';
    world.waveTarget.setEnabled(runtime.stage==='wave');world.driverTarget.setEnabled(runtime.stage==='driver-ready');
    ui.setObjective(runtime.stage==='wave'?'Nhìn ra đường · E để vẫy chiếc xe đang tới':runtime.stage==='driver-ready'?'Xe không dừng · lại gần tài xế bên xe máy, E để hỏi':runtime.stage==='review'?'Điểm dừng xe buýt ở phía bên phải · mẫu P1 dừng tại đây':'');
  }
  async function begin():Promise<void> {
    if(!runtime.begin())return;
    started=true;landing.hidden=true;
    await audio.unlock();audio.attachListener(player.camera);audio.startAmbience(['street']);
    presentation();
    await director.play({id:'p1-mother-call',controlMode:'locked',steps:[...lines(script.mother),{type:'action',run:()=>{world.lowerPhone();audio.play('hangup')}},{type:'pause',durationMs:950}]});
    if(disposed)return;player.input.clearTransientInput();player.setLookEnabled(true);player.setLocomotionEnabled(true);runtime.callFinished();presentation();
  }
  async function hail():Promise<void> {
    if(!runtime.hail())return;presentation();world.startBus();audio.play('bus',world.busRoot);
    await director.play({id:'p1-wave-and-bus-pass',controlMode:'lookOnly',steps:[{type:'pause',durationMs:5900}]});
    audio.stop('bus');runtime.busPassed();presentation();
    // Driver observes the failed hail. A short call is audible in the same 3D situation.
    world.setActing('talk');await ui.showAutoLine({speaker:'TÀI XẾ',text:script.driver[0].text,completion:()=>speak(script.driver[0])});
    ui.hideDialogue();presentation();
  }
  async function talk():Promise<void> {
    if(!runtime.talk())return;presentation();
    const response=await director.play<Reply>({id:'p1-driver-encounter',controlMode:'lookOnly',steps:[...lines(script.driver.slice(1)),{type:'choice',options:[{id:'new',label:'Vâng. Em mới lên.'},{id:'why',label:'Sao anh biết?'},{id:'assumed',label:'Em tưởng đứng đâu vẫy nó cũng dừng.'}]}]});
    const reply=response.choice??'new';canvas.dataset.p1Reply=reply;
    await director.play({id:'p1-point-to-stop',controlMode:'lookOnly',steps:lines(script[reply])});
    // Hold the pointing clip across the line rather than substituting text for the action.
    world.setActing('point');await clock.sleep(2100);world.setActing('idle');
    await director.play({id:'p1-thanks',controlMode:'lookOnly',steps:lines(script.thanks)});
    runtime.driverFinished();presentation();review.hidden=false;window.setTimeout(()=>{review.hidden=true},9000);
  }
  const behavior=(run:()=>Promise<void>):InteractionBehavior=>{let active=false;return {enter(actions){active=true;void run().catch(e=>{console.error(e);fatal.hidden=false;fatal.textContent='Lỗi mẫu P1: '+String(e)}).finally(()=>{active=false;actions.complete()});return true},update(){},requestCancel(){return active}}};
  interaction.register(world.waveTarget,{id:'p1-hail',prompt:'E · Vẫy xe',maxDistance:7,priority:10});host.register('p1-hail',behavior(hail));
  interaction.register(world.driverTarget,{id:'p1-driver',prompt:'E · Hỏi tài xế',maxDistance:3,priority:20});host.register('p1-driver',behavior(talk));interaction.attachInput(canvas);
  const focus=()=>{paused=!document.hasFocus()||document.hidden;pause.hidden=!paused||!started;void audio.setPaused(paused);if(paused)player.input.clearTransientInput()};
  window.addEventListener('blur',focus);window.addEventListener('focus',focus);document.addEventListener('visibilitychange',focus);
  const restart=(e:KeyboardEvent)=>{
    if(e.code==='Escape'&&document.pointerLockElement===canvas){document.exitPointerLock();player.input.clearTransientInput();}
    if(e.code==='KeyR'&&started)location.reload();
  };window.addEventListener('keydown',restart);
  engine.run(()=>{
    const raw=engine.engine.getDeltaTime()/1000,dt=Math.min(.1,Math.max(0,raw));
    if(!paused){player.update(dt);world.update(dt);clock.update(dt);host.update(dt);interaction.update();if(started)frameMs.push(raw*1000);}
    prompt.hidden=!interaction.promptState.visible||director.isBusy;prompt.textContent=interaction.promptState.text;
    reticle.hidden=director.isBusy||!started;
    canvas.dataset.interactionTarget=interaction.promptState.interactableId??'';canvas.dataset.playerFeet=player.getFeetPosition().asArray().map(v=>v.toFixed(3)).join(',');
    canvas.dataset.p1Movement=String(player.isLocomotionEnabled);canvas.dataset.p1Look=String(player.isLookEnabled);canvas.dataset.p1Paused=String(paused);
    scene.render();
  });
  try {
    await world.initialize(player);
    for(let i=0;i<300&&!audio.isReady;i++)await new Promise(r=>setTimeout(r,50));
    if(!audio.isReady||audio.failedCueIds.length)throw new Error(`Audio chưa nạp: ${audio.failedCueIds.join(', ')||'backend'}`);
    canvas.dataset.sceneReady='ch0-p1-quality-candidate-v0';canvas.dataset.renderBackend=engine.backend;presentation();
    const button=landing.querySelector('button')!;button.disabled=false;button.textContent=silentReview?'Bắt đầu mẫu · tạm tắt tiếng':'Bắt đầu mẫu · bật âm thanh';
    button.addEventListener('click',()=>{void canvas.requestPointerLock();void begin().catch(e=>{fatal.hidden=false;fatal.textContent=String(e)})},{once:true});
  } catch(e){console.error(e);fatal.hidden=false;fatal.textContent='Không mở được mẫu P1: '+String(e);}
  const diagnostics={runtime,player,world,interaction,audioFailures,frameMs,snapshot:()=>captureScenePerformanceSnapshot(scene,engine.engine)};
  (window as typeof window & {__UET_P1__?:typeof diagnostics}).__UET_P1__=diagnostics;
  window.addEventListener('beforeunload',()=>{disposed=true;lifetime.abort();clock.dispose();audio.dispose();host.dispose();interaction.dispose();ui.dispose();player.dispose();scene.dispose();engine.dispose();window.removeEventListener('blur',focus);window.removeEventListener('focus',focus);document.removeEventListener('visibilitychange',focus);window.removeEventListener('keydown',restart)},{once:true});
}
