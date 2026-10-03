import '@babylonjs/loaders/glTF';
import { LoadAssetContainerAsync } from '@babylonjs/core/Loading/sceneLoader';
import type { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import { Vector3, Quaternion } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import type { Scene } from '@babylonjs/core/scene';
import type { PlayerController } from '../../../player/PlayerController';

/** A small candidate set in game lighting. No GD4/map production edits. */
export class P1World {
  readonly spawn = new Vector3(0, .15, -4.7);
  readonly driverRoot: TransformNode;
  readonly busRoot: TransformNode;
  readonly waveTarget: AbstractMesh;
  readonly driverTarget: AbstractMesh;
  readonly stop = new Vector3(10.3,.15,.05);
  private readonly shadow: ShadowGenerator;
  private readonly root: TransformNode;
  private phone: TransformNode | null = null;
  private grip: TransformNode | null = null;
  private waveHand: TransformNode | null = null;
  private head: TransformNode | null = null;
  private headBase = Quaternion.Identity();
  private clips: AnimationGroup[] = [];
  private activeClip: AnimationGroup | null = null;
  private time = 0;
  private busElapsed = -1;
  private waveElapsed = -1;
  private phoneAmount = 1;
  private phoneGoal = 1;
  private readonly cars: TransformNode[] = [];
  private player: PlayerController | null = null;
  private speaking = false;

  constructor(private readonly scene: Scene) {
    scene.clearColor = new Color4(.67,.78,.83,1);
    scene.fogMode = 3;scene.fogStart = 23;scene.fogEnd = 58;scene.fogColor = new Color3(.67,.78,.83);
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.exposure = 1.12;
    scene.imageProcessingConfiguration.contrast = 1.12;
    const sky=new HemisphericLight('p1-sky-fill',new Vector3(0,1,0),scene);
    sky.intensity=.7;sky.groundColor=new Color3(.31,.29,.25);sky.diffuse=new Color3(.82,.9,1);
    const sun=new DirectionalLight('p1-morning-sun',new Vector3(-.5,-1,.45),scene);
    sun.position.set(12,19,-15);sun.intensity=2.2;sun.diffuse=new Color3(1,.92,.79);
    this.shadow=new ShadowGenerator(2048,sun);this.shadow.usePercentageCloserFiltering=true;this.shadow.bias=.0005;this.shadow.normalBias=.035;
    this.root=new TransformNode('p1-candidate-street',scene);
    this.driverRoot=new TransformNode('driver-candidate-anchor',scene);this.driverRoot.position.set(2.1,.15,-2.55);this.driverRoot.rotation.y=Math.PI+.3;
    this.busRoot=new TransformNode('bus-candidate-path',scene);this.busRoot.position.set(-26,0,2.5);this.busRoot.rotation.y=Math.PI;this.busRoot.setEnabled(false);
    this.street();
    this.waveTarget=MeshBuilder.CreateBox('p1-wave-region',{width:32,height:3.3,depth:.2},scene);
    this.waveTarget.position.set(0,1.6,.5);this.waveTarget.visibility=0;this.waveTarget.isPickable=true;this.waveTarget.setEnabled(false);
    this.driverTarget=MeshBuilder.CreateCapsule('p1-driver-interaction',{height:1.82,radius:.29},scene);
    this.driverTarget.parent=this.driverRoot;this.driverTarget.position.y=.91;this.driverTarget.visibility=0;this.driverTarget.isPickable=true;this.driverTarget.setEnabled(false);
  }
  private material(name:string,hex:string,rough=true):StandardMaterial {
    const m=new StandardMaterial(name,this.scene);m.diffuseColor=Color3.FromHexString(hex);m.specularColor=rough?new Color3(.03,.03,.03):new Color3(.3,.3,.3);return m;
  }
  private box(name:string,size:[number,number,number],p:[number,number,number],m:StandardMaterial,collide=false):AbstractMesh {
    const o=MeshBuilder.CreateBox(name,{width:size[0],height:size[1],depth:size[2]},this.scene);o.position.set(...p);o.material=m;o.parent=this.root;o.checkCollisions=collide;o.isPickable=false;o.receiveShadows=true;return o;
  }
  private cylinder(name:string,r:number,h:number,p:[number,number,number],m:StandardMaterial):AbstractMesh {
    const o=MeshBuilder.CreateCylinder(name,{diameter:r*2,height:h,tessellation:14},this.scene);o.position.set(...p);o.material=m;o.parent=this.root;o.isPickable=false;this.shadow.addShadowCaster(o);return o;
  }
  private sign(text:string,w:number,h:number,p:[number,number,number],color='#eee6cd',bg='#164e51',back=false):AbstractMesh {
    const tex=new DynamicTexture(`sign-${text}`,{width:1024,height:256},this.scene,false);const c=tex.getContext();c.fillStyle=bg;c.fillRect(0,0,1024,256);c.font='bold 90px Arial';c.fillStyle=color;(c as CanvasRenderingContext2D).textAlign='center';c.fillText(text,512,162);tex.update();
    const m=this.material(`sign-mat-${text}`,'#ffffff');m.diffuseTexture=tex;m.emissiveColor=new Color3(.12,.12,.12);
    const o=MeshBuilder.CreatePlane(`sign-${text}`,{width:w,height:h},this.scene);o.position.set(...p);o.rotation.y=back?Math.PI:0;o.material=m;o.parent=this.root;o.isPickable=false;return o;
  }
  private street():void {
    const asphalt=this.material('asphalt','#565e62'),curb=this.material('curb','#b5b5a9'),paving=this.material('paving','#afa997'),paint=this.material('road-paint','#ece6cf');
    const tex=new DynamicTexture('asphalt-grain',{width:512,height:512},this.scene,false);const c=tex.getContext();c.fillStyle='#596164';c.fillRect(0,0,512,512);
    let seed=71;for(let i=0;i<21000;i++){seed=(seed*16807)%2147483647;const x=seed%512;seed=(seed*16807)%2147483647;const y=seed%512;const v=70+seed%60;c.fillStyle=`rgb(${v},${v},${v})`;c.fillRect(x,y,1,1)}tex.update();tex.uScale=9;tex.vScale=2;asphalt.diffuseTexture=tex;
    this.box('road',[43,.18,6.1],[0,-.1,3.55],asphalt,true);
    this.box('near-sidewalk',[43,.26,6.5],[0,-.015,-2.75],paving,true);
    this.box('far-sidewalk',[43,.26,3],[0,-.015,8.1],paving,true);
    for(const z of [.47,6.6])this.box('curb',[43,.22,.17],[0,.13,z],curb,true);
    for(let x=-21;x<22;x+=3.7)this.box('lane-dash',[1.7,.006,.075],[x,.006,3.55],paint);
    for(let x=-21;x<22;x+=1.2){this.box('paving-joint',[.012,.008,6.4],[x,.12,-2.8],curb)}
    for(const z of [-1.2,-3.0,-4.8])this.box('paving-joint',[43,.008,.012],[0,.12,z],curb);
    const plaster=this.material('warm-plaster','#b7b09b'),mint=this.material('sage-plaster','#a4b5a8'),brick=this.material('terracotta','#967563'),glass=this.material('shop-glass','#324650',false),frame=this.material('window-frame','#d5ceba'),awning=this.material('awning','#d7b967');
    for(let i=0;i<9;i++){
      const x=(i-4)*4.7,w=4.4,h=5.3+(i%3)*.55;
      const o=this.box('shop-shell',[w,h,4],[x,h/2,11.7],i%3===0?mint:plaster,true);this.shadow.addShadowCaster(o);
      this.box('shop-plinth',[w,.35,.13],[x,.22,9.61],brick);
      this.box('shop-window',[w*.73,2.3,.04],[x,1.65,9.66],glass);
      for(const y of [1.6,4.0])for(const xx of [-1,1]){this.box('window-reveal',[.98,1.28,.08],[x+xx,y,9.62],frame);this.box('window-pane',[.83,1.09,.09],[x+xx,y,9.56],glass)}
      this.box('shop-awning',[w,.12,1.1],[x,2.98,9.4],i%2?awning:mint);
      this.sign(['TẠP HÓA','TRÀ ĐÁ','SỬA XE'][i%3],3.4,.55,[x,2.64,9.5]);
    }
    // Only a short, collidable near facade is needed to evaluate the sample.
    for(let i=0;i<7;i++){const x=(i-3)*5.8;const o=this.box('near-facade',[5.5,5.8,2.2],[x,2.9,-7.3],i%2?plaster:brick,true);this.shadow.addShadowCaster(o);this.box('shutter',[3.6,2.8,.08],[x,1.55,-6.15],glass);this.box('lintel',[5.45,.16,.35],[x,3.08,-6.07],frame)}
    const bark=this.material('bark','#6c5a44'),leaf=this.material('leaf','#647856'),leaf2=this.material('leaf-light','#89936b'),iron=this.material('street-iron','#435354');
    for(const [x,z] of [[-9,-.3],[15,-.3],[-13,7.4],[6,7.4]]){
      this.cylinder('street-tree-trunk',.18,3.7,[x,1.9,z],bark);
      for(let j=0;j<5;j++){const o=MeshBuilder.CreateIcoSphere('street-tree-canopy',{radius:1.12,subdivisions:2},this.scene);o.position.set(x+Math.cos(j*1.3)*.65,3.7+(j%2)*.55,z+Math.sin(j*1.3)*.6);o.scaling.y=.9;o.material=j%2?leaf:leaf2;o.parent=this.root;o.isPickable=false;this.shadow.addShadowCaster(o)}
      this.box('tree-pit',[1.15,.02,1.15],[x,.14,z],bark);
    }
    for(const x of [-17,12]){this.cylinder('lamp-post',.05,5.2,[x,2.7,7.3],iron);this.box('lamp-head',[.55,.12,.25],[x,5.35,7.3],frame)}
    this.cylinder('bus-stop-pole',.04,2.9,[this.stop.x,1.58,this.stop.z],iron);
    this.sign('XE BUÝT',1.35,.48,[this.stop.x,2.77,this.stop.z-.07],'#ffffff','#255e88');
    this.sign('ĐIỂM DỪNG',1.35,.34,[this.stop.x,2.32,this.stop.z-.07],'#213747','#e2e1ce');
    this.box('bus-stop-base',[.42,.08,.42],[this.stop.x,.18,this.stop.z],curb);
    this.box('sample-back-boundary',[43,3,.12],[0,1.5,-6],plaster,true).visibility=0;
    for(const x of [-21.5,21.5])this.box('sample-side-boundary',[.12,3,16],[x,1.5,1],plaster,true).visibility=0;
    this.box('road-safety-boundary',[43,2,.08],[0,1,1],asphalt,true).visibility=0;
  }
  private async load(file:string,parent:TransformNode,shadows=true):Promise<{clips:AnimationGroup[],nodes:TransformNode[]}> {
    const url=new URL(`assets/ch0/p1/models/${file}`,document.baseURI).toString();
    const container=await LoadAssetContainerAsync(url,this.scene);container.addAllToScene();
    for(const n of container.rootNodes)n.parent=parent;
    for(const m of container.meshes){m.isPickable=false;m.receiveShadows=true;if(shadows)this.shadow.addShadowCaster(m,false)}
    return {clips:container.animationGroups,nodes:container.transformNodes};
  }
  async initialize(player:PlayerController):Promise<void> {
    this.player=player;
    const driver=await this.load('driver_candidate.glb',this.driverRoot);
    this.clips=driver.clips;this.head=driver.nodes.find(n=>n.name==='Head')??null;
    if(this.head?.rotationQuaternion)this.headBase=this.head.rotationQuaternion.clone();
    this.setActing('idle');
    this.scene.onAfterAnimationsObservable.add(()=>this.updateGaze());
    await this.load('bus_candidate.glb',this.busRoot);
    const scooter=new TransformNode('driver-scooter',this.scene);scooter.position.set(3.15,.14,-1.4);await this.load('scooter_candidate.glb',scooter);
    const car=new TransformNode('passing-car',this.scene);car.position.set(-19,.05,4.75);car.rotation.y=Math.PI/2;car.scaling.setAll(1.55);await this.load('sedan.glb',car);this.cars.push(car);
    this.grip=new TransformNode('pov-grip-anchor',this.scene);this.grip.parent=player.camera;this.grip.position.set(.22,-.18,.48);await this.load('pov_grip.glb',this.grip,false);
    this.phone=new TransformNode('pov-phone-anchor',this.scene);this.phone.parent=this.grip;this.phone.position.set(.018,.073,-.055);this.phone.rotation.y=Math.PI;await this.load('phone_candidate.glb',this.phone,false);
    const importedScreen=this.phone.getChildMeshes().find(m=>m.name.includes('phone_screen'));
    importedScreen?.setEnabled(false);
    const screen=MeshBuilder.CreatePlane('pov-phone-readable-screen',{width:.069,height:.145},this.scene);
    screen.parent=this.phone;screen.position.z=.0068;screen.rotation.y=Math.PI;screen.isPickable=false;
    if(screen){const tex=new DynamicTexture('phone-call-screen',{width:256,height:512},this.scene,false);const c=tex.getContext();c.fillStyle='#152e37';c.fillRect(0,0,256,512);c.fillStyle='#f2eadb';c.font='bold 36px Arial';(c as CanvasRenderingContext2D).textAlign='center';c.fillText('MẸ',128,152);c.font='18px Arial';c.fillText('Đang gọi...',128,197);c.fillStyle='#55a99e';c.beginPath();c.arc(128,320,27,0,Math.PI*2);c.fill();c.fillStyle='#ffffff';c.font='24px Arial';c.fillText('☎',128,329);tex.update();const m=this.material('phone-emissive-screen','#ffffff');m.diffuseTexture=tex;m.emissiveTexture=tex;m.emissiveColor=new Color3(.7,.7,.7);screen.material=m;}
    this.waveHand=new TransformNode('pov-wave-anchor',this.scene);this.waveHand.parent=player.camera;this.waveHand.position.set(.34,-.28,.54);await this.load('pov_wave.glb',this.waveHand,false);this.waveHand.setEnabled(false);
    for(const p of [this.grip,this.waveHand])for(const m of p.getChildMeshes()){m.receiveShadows=false;m.renderingGroupId=1;}
  }
  lowerPhone():void {this.phoneGoal=0;}
  setActing(kind:'idle'|'talk'|'point'):void {
    const clip=this.clips.find(c=>c.name.includes(`driver_${kind}`));
    if(clip&&clip!==this.activeClip){this.activeClip?.stop();clip.start(kind!=='point',1);this.activeClip=clip;}
    this.speaking=kind==='talk';
  }
  startBus():void {this.busElapsed=0;this.busRoot.position.x=-24;this.busRoot.setEnabled(true);this.waveElapsed=0;this.waveHand?.setEnabled(true);}
  get busPassing():boolean {return this.busElapsed>=0;}
  update(dt:number):void {
    this.time+=dt;
    this.phoneAmount+=(this.phoneGoal-this.phoneAmount)*Math.min(1,dt*4.8);
    if(this.grip){this.grip.position.y=-.18-(1-this.phoneAmount)*.65+Math.sin(this.time*1.8)*.003;this.grip.rotation.z=-.08+(1-this.phoneAmount)*.55;this.grip.setEnabled(this.phoneAmount>.025);}
    if(this.waveHand&&this.waveElapsed>=0){this.waveElapsed+=dt;this.waveHand.position.y=-.2+Math.sin(Math.min(1,this.waveElapsed/.3)*Math.PI/2)*.1;this.waveHand.rotation.z=Math.sin(this.waveElapsed*8)*.17;if(this.waveElapsed>2){this.waveHand.setEnabled(false);this.waveElapsed=-1}}
    if(this.busElapsed>=0){this.busElapsed+=dt;this.busRoot.position.x=-24+this.busElapsed*8;for(const m of this.busRoot.getChildMeshes())if(m.name==='wheel')m.rotate(Vector3.Up(),dt*8/.49);if(this.busElapsed>6){this.busRoot.setEnabled(false);this.busElapsed=-1}}
    for(const [i,c]of this.cars.entries()){c.position.x+=dt*(5+i);if(c.position.x>26)c.position.x=-27;}
  }
  private updateGaze():void {
    if(this.head&&this.player){const p=this.player.camera.position,base=this.driverRoot.position;let yaw=Math.atan2(p.x-base.x,p.z-base.z)-this.driverRoot.rotation.y;yaw=Math.atan2(Math.sin(yaw),Math.cos(yaw));yaw=Math.max(-.65,Math.min(.65,yaw));this.head.rotationQuaternion=this.headBase.multiply(Quaternion.RotationYawPitchRoll(yaw*.65,this.speaking?Math.sin(this.time*4)*.014:0,0));}
  }
}
