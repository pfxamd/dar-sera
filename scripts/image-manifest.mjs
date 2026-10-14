import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';import sharp from 'sharp';import {createHash} from 'node:crypto';import {imageDescriptions,imageTargets} from '../src/data.ts';
const files=(await readdir('src/assets/images')).filter(f=>f.endsWith('.webp')).sort();
if(files.length!==28)throw new Error('Exactly 28 source images required');
const records=[];
for(const [index,filename] of files.entries()){
 const id=index+1;const bytes=await readFile(`src/assets/images/${filename}`);const meta=await sharp(bytes).metadata();
 records.push({id,filename,path:`src/assets/images/${filename}`,actual:{width:meta.width,height:meta.height,format:meta.format,bytes:bytes.length},briefTarget:{width:imageTargets[index][0],height:imageTargets[index][1]},aspectRatio:[1,5,26].includes(id)?'16:9':[3,4,7,8,11,12,15,16,19,20].includes(id)?'3:2':'4:5',alt:imageDescriptions[index],caption:imageDescriptions[index],focalPoint:{x:0.5,y:0.5},primaryPage:id<=6?'/the-house/':id<=10?'/rooms/courtyard-room/':id<=14?'/rooms/light-room/':id<=18?'/rooms/terrace-suite/':id<=22?'/rooms/twin-room/':id<=24?'/your-stay/':id===25?'/the-house/':'/tetouan/',provenance:'User-supplied generated image; no independent documentary attribution',destinationIllustration:id>=26,sha256:createHash('sha256').update(bytes).digest('hex')});
}
if(new Set(records.map(r=>r.sha256)).size!==28)throw new Error('Duplicate source file detected');
await mkdir('docs',{recursive:true});await writeFile('docs/image-manifest.json',JSON.stringify({count:28,upscaled:false,records},null,2)+'\n');console.log('Verified 28 distinct source files; manifest written.');
