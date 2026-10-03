// Integration checks; deliberately not a visual quality/canon validator.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../public/assets/ch0/p1');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'catalog.json'),'utf8'));
const script=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../src/content/ch0/p1/script.json'),'utf8'));
const voices=JSON.parse(fs.readFileSync(path.join(root,catalog.voice_manifest),'utf8'));
const errors=[];
function check(file,hash){const p=path.join(root,file);if(!fs.existsSync(p)){errors.push('Missing '+file);return null}const b=fs.readFileSync(p);if(!b.length)errors.push('Empty '+file);if(hash&&crypto.createHash('sha256').update(b).digest('hex')!==hash)errors.push('Hash '+file);return b}
for(const a of catalog.assets){
  const b=check(a.file,a.sha256);if(!b||!a.file.endsWith('.glb'))continue;
  if(b.toString('ascii',0,4)!=='glTF') {errors.push('Not GLB '+a.file);continue}
  const j=JSON.parse(b.toString('utf8',20,20+b.readUInt32LE(12)));
  for(const m of j.meshes)for(const p of m.primitives){if(Object.keys(p.attributes).length>8)errors.push('Portable WebGPU buffer limit '+a.file);}
  for(const entry of [...(j.images||[]),...(j.buffers||[])])if(entry.uri&&!entry.uri.startsWith('data:'))check(path.posix.join(path.posix.dirname(a.file),entry.uri));
  if(a.kind==='character')for(const clip of ['driver_idle','driver_talk','driver_point'])if(!j.animations?.some(x=>x.name.includes(clip)))errors.push('Missing clip '+clip);
}
const ids=new Set();
for(const group of ['mother','driver','new','why','assumed','thanks'])for(const line of script[group]){
  if(ids.has(line.id))errors.push('Duplicate cue '+line.id);ids.add(line.id);
  const voice=voices.find(v=>v.id===line.id);if(!voice||voice.text!==line.text||voice.speaker!==line.speaker)errors.push('Voice/script drift '+line.id);
  if(voice)check('audio/'+voice.file,voice.sha256);
}
if(ids.size!==27||script.mother.length!==10)errors.push('Draft cue coverage changed');
console.log(JSON.stringify({assets:catalog.assets.length,voices:ids.size,errors},null,2));
if(errors.length)process.exitCode=1;
