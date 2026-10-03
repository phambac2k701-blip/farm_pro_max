import {describe,it,expect} from 'vitest';
import {P1Runtime} from '../../../src/content/ch0/p1/P1Runtime';
describe('P1 sample boundary',()=>{
 it('requires the player wave and talk and never advances to P2',()=>{
  const r=new P1Runtime();expect(r.hail()).toBe(false);expect(r.begin()).toBe(true);expect(r.begin()).toBe(false);r.callFinished();expect(r.stage).toBe('wave');
  expect(r.talk()).toBe(false);expect(r.hail()).toBe(true);expect(r.hail()).toBe(false);r.busPassed();expect(r.talk()).toBe(true);r.driverFinished();expect(r.stage).toBe('review');expect(r.talk()).toBe(false);expect(r.hail()).toBe(false);
 });
 it('stays at the wave objective indefinitely without input',()=>{const r=new P1Runtime();r.begin();r.callFinished();expect(r.stage).toBe('wave');expect(r.busPassed()).toBe(false)});
});
