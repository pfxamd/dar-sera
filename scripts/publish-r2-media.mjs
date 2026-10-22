import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/r2-media-manifest.json'),'utf8'));
const verified=JSON.parse(fs.readFileSync(path.join(root,'docs/r2-media-verification.json'),'utf8').replace(/^\uFEFF/,''));
const hash=b=>createHash('sha256').update(b).digest('hex');
if(manifest.records.length!==197||verified.length!==197)throw Error('Incomplete R2 manifest');
const outputRoot=path.join(root,'dist');
const expectedOutputs=new Set(manifest.records.map(r=>r.output));
for(const name of fs.readdirSync(path.join(outputRoot,'_astro'))){
 if(/\.(avif|webp)$/.test(name)&&!expectedOutputs.has('_astro/'+name))throw Error('Unmapped generated media: '+name);
}
for(const row of manifest.records){
 if(!row.output||path.isAbsolute(row.output)||row.output.split(/[\\/]/).some(p=>p==='..'||p==='.'||!p)||!row.key.startsWith(manifest.prefix))throw Error('Unsafe media manifest path');
 if(!verified.some(v=>v.key===row.key&&v.verified&&v.sha256===row.sha256&&v.bytes===row.bytes))throw Error('Unverified R2 asset '+row.key);
 if(row.kind==='original'&&hash(fs.readFileSync(path.join(root,row.source)))!==row.sha256)throw Error('Original image changed; upload and verify new media first: '+row.source);
 if(!fs.existsSync(path.join(root,'dist',row.output)))throw Error('Build media changed; update R2 manifest first: '+row.output);
}
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const html=walk(path.join(root,'dist')).filter(p=>p.endsWith('.html'));
const pending=[];
for(const file of html){
 let text=fs.readFileSync(file,'utf8');
 for(const row of manifest.records)text=text.split('/dar-sera/'+row.output).join('https://media.pfxamd.com/'+row.key);
 if(/\/dar-sera\/_astro\/[^\s"'<>]+\.(?:webp|avif)/.test(text))throw Error('Unmapped image in '+file);
 pending.push({file,text});
}
// Only generated files are changed; source originals and documentation stay in GitHub.
for(const {file,text} of pending)fs.writeFileSync(file,text);
for(const row of manifest.records)fs.unlinkSync(path.join(root,'dist',row.output));
console.log(`R2 publication: ${manifest.records.length} verified media files excluded from dist; ${html.length} HTML pages linked to R2.`);
