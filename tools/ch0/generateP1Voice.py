"""Temporary Vietnamese TTS candidates; exact draft lines, not final casting/licensing."""
import sys, asyncio, json, hashlib, wave, struct, math
from pathlib import Path
# Optional extra installed dependency path (keeps the Blender installation unchanged).
if len(sys.argv)>2:sys.path.insert(0,sys.argv[2])
import edge_tts
base=Path(sys.argv[1]);script=json.loads((base/'src/content/ch0/p1/script.json').read_text(encoding='utf-8'))
out=base/'public/assets/ch0/p1/audio';out.mkdir(parents=True,exist_ok=True)
async def main():
 with wave.open(str(out/'hangup_candidate.wav'),'wb') as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(24000)
  w.writeframes(b''.join(struct.pack('<h',int(6000*math.sin(2*math.pi*660*i/24000)*max(0,1-i/3600))) for i in range(3600)))
 records=[]
 for group in ['mother','driver','new','why','assumed','thanks']:
  for line in script[group]:
   voice='vi-VN-HoaiMyNeural' if line['speaker']=='MẸ' else 'vi-VN-NamMinhNeural'
   rate='+0%'
   pitch='+0Hz'
   path=out/(line['id']+'.mp3')
   print('GENERATING',line['id'],voice,flush=True)
   if not path.exists() or path.stat().st_size<1000:
    for attempt in range(3):
     try:
      await edge_tts.Communicate(line['text'],voice,rate=rate,pitch=pitch).save(str(path));break
     except edge_tts.exceptions.NoAudioReceived:
      if attempt==2:raise
      rate='+0%';pitch='+0Hz';await asyncio.sleep(1)
   records.append({**line,'file':path.name,'voice':voice,'rate':rate,'pitch':pitch,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'status':'TTS_REVIEW_CANDIDATE_NOT_FINAL','provider':'Microsoft Edge speech via edge-tts 7.2.8; release voice/source rights not decided'})
   print('VOICE',line['id'],path.stat().st_size,flush=True)
 (out/'voice_provenance.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
asyncio.run(main())
