const fs=require('node:fs'),path=require('node:path');
const files=['README.md','docs/START_HERE.md','docs/AI_COORDINATION.md','docs/PROGRESS.md','docs/SESSION_CONTINUITY.md','docs/PROJECT_MASTER_PLAN.md','docs/playtest/ch0-p1-quality-candidate-v0/README.md'],missing=[];
let checked=0;
for(const f of files)for(const m of fs.readFileSync(f,'utf8').matchAll(/\]\(([^)]+)\)/g)){
 const target=m[1].split('#')[0].split('?')[0];if(!target||/^(https?:|app:|sandbox:)/.test(target))continue;
 checked++;const p=path.resolve(path.dirname(f),target);if(!fs.existsSync(p))missing.push({f,target});
}
console.log(JSON.stringify({relativeLinks:checked,missing,branch:require('node:child_process').execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim()},null,2));
if(missing.length)process.exit(1);
