import {describe,it,expect,vi} from 'vitest';
import {StoryBeatDirector} from '../../../src/content/ch0/StoryBeatDirector';
function setup(move=true,look=true){
 const input={isLocomotionEnabled:move,isLookEnabled:look,setLocomotionEnabled(v:boolean){this.isLocomotionEnabled=v},setLookEnabled(v:boolean){this.isLookEnabled=v}};
 const ui={showAutoLine:vi.fn().mockResolvedValue(undefined),hideDialogue:vi.fn(),choose:vi.fn().mockResolvedValue('new')};
 const director=new StoryBeatDirector(ui,input,{delay:vi.fn().mockResolvedValue(undefined)});
 return {input,ui,director};
}
describe('StoryBeatDirector ownership',()=>{
 it('runs fixed dialogue in order without a continue action and returns controls',async()=>{
  const {input,ui,director}=setup();const order:string[]=[];
  ui.showAutoLine.mockImplementation(async()=>{expect(input.isLocomotionEnabled).toBe(false);expect(input.isLookEnabled).toBe(false);order.push('line')});
  await director.play({id:'call',steps:[{type:'line',text:'mẹ'},{type:'action',run:()=>{order.push('lower phone')}}]});
  expect(order).toEqual(['line','lower phone']);expect(input.isLocomotionEnabled).toBe(true);expect(input.isLookEnabled).toBe(true);expect(director.isBusy).toBe(false);
 });
 it('preserves an external movement owner on completion',async()=>{
  const {input,director}=setup(false,true);await director.play({id:'driver',controlMode:'lookOnly',steps:[{type:'line',text:'điểm dừng'}]});
  expect(input.isLocomotionEnabled).toBe(false);expect(input.isLookEnabled).toBe(true);
 });
 it('releases its lock and subtitle after an audio/action error',async()=>{
  const {input,ui,director}=setup();await expect(director.play({id:'error',steps:[{type:'action',run:()=>{throw Error('decode')}}]})).rejects.toThrow('decode');
  expect(input.isLookEnabled).toBe(true);expect(input.isLocomotionEnabled).toBe(true);expect(ui.hideDialogue).toHaveBeenCalled();expect(director.sequenceId).toBeNull();
 });
 it('rejects repeated E until the active sequence finishes',async()=>{
  const {director}=setup();let release!:()=>void;const first=director.play({id:'held',steps:[{type:'action',run:()=>new Promise<void>(r=>release=r)}]});
  expect(await director.play({id:'duplicate',steps:[]})).toEqual({started:false,choice:null});release();await first;
 });
});
