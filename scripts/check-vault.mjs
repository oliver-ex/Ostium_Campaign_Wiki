import fs from 'node:fs'
import path from 'node:path'
import { readVault, walk } from './vault.mjs'

const withheld = new Set(JSON.parse(fs.readFileSync('publication-artwork.json','utf8')).withheld.map(a => path.resolve('content',a.file)))
const pages=readVault(), errors=[], warnings=[]
// Conflict copies are excluded from publication, but must still be reconciled
// in the source vault rather than silently accumulating in Obsidian.
function checkConflicts(dir) {
 for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
  if (entry.name.startsWith('.')) continue
  const filename=path.join(dir,entry.name)
  if (/edit conflict/i.test(entry.name)) errors.push(`Unresolved edit conflict: ${filename}`)
  else if (entry.isDirectory()) checkConflicts(filename)
 }
}
checkConflicts('content')
const files=walk('content'), aliases=new Map()
const add=(key,page)=>{if(!aliases.has(key))aliases.set(key,[]); if(!aliases.get(key).includes(page))aliases.get(key).push(page)}
for(const p of pages){
 add(p.id,p); add(path.basename(p.id),p)
 for(const alias of p.data.aliases??[]) add(alias,p)
}
const slug=s=>s.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').trim().replace(/\s/g,'-')
for(const p of pages){
 if(p.filename.endsWith('.md')&&!p.data.title)warnings.push(`${p.filename}: no title frontmatter`)
 if(p.data['public-counterpart'])errors.push(`${p.filename}: obsolete paired-page metadata`)
 const body=p.body.replace(/```[\s\S]*?```/g,'')
 if (/^(?:<<<<<<< |=======\s*$|>>>>>>> )/m.test(body)) errors.push(`${p.filename}: unresolved merge markers`)
 for(const match of body.matchAll(/!?\[\[([^\]]+)\]\]/g)){
  const raw=match[1].replace(/\\\|/g,'|').split('|')[0], [target,anchor]=raw.split('#')
  if(!target&&!anchor)continue
  let candidates=target?aliases.get(target.replace(/\.(md|base)$/,'')):[p]
  if(!candidates){
   const relative=path.posix.normalize(path.posix.join(path.posix.dirname(p.id),target)).replace(/\.(md|base)$/,'')
   candidates=aliases.get(relative)
  }
  if(candidates){const ext=target.endsWith('.base')?'.base':'.md';candidates=candidates.filter(p=>p.filename.endsWith(ext))}
  if(!candidates?.length){
   if(files.includes(`content/${target}`))continue
   errors.push(`${p.filename}: unresolved [[${raw}]]`);continue
  }
  if(candidates.length!==1){errors.push(`${p.filename}: ambiguous [[${raw}]]`);continue}
  if(anchor&&!anchor.startsWith('^')){
   const dest=candidates[0]
   const names=dest.filename.endsWith('.base')?(dest.data.views??[]).map(v=>v.name):[...dest.body.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>m[1])
   if(!names.some(name=>name===anchor||slug(name)===slug(decodeURIComponent(anchor))))errors.push(`${p.filename}: missing anchor [[${raw}]]`)
  }
 }
 for(const m of body.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)){
  const url=m[1].replace(/^<|>$/g,'').split(/\s+"/)[0]
  if(/^(https?:|mailto:|#)/i.test(url))continue
  if(/^(file:|obsidian:)/i.test(url)){errors.push(`${p.filename}: local-only URL ${url.split(':')[0]}`);continue}
  const target=decodeURIComponent(url.split('#')[0])
  if(target&&!fs.existsSync(path.resolve(path.dirname(p.filename),target))&&!withheld.has(path.resolve(path.dirname(p.filename),target)))errors.push(`${p.filename}: missing Markdown asset/link ${target}`)
 }
 if(/(?:BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16})/.test(p.text))errors.push(`${p.filename}: possible credential; review before publication`)
}
if(fs.existsSync('content/_GM'))errors.push('Former split _GM tree still exists')
for(const warning of warnings)console.warn('Warning:',warning)
for(const error of errors)console.error(error)
if(errors.length)process.exit(1)
const counts=Object.fromEntries(['npc','location','faction','pc','adventure'].map(type=>[type,pages.filter(p=>p.data.type===type&&!p.id.startsWith('Templates/')).length]))
if(counts.pc!==8)throw Error(`Expected 8 current PCs, found ${counts.pc}`)
console.log(`Vault audit passed: ${pages.length} Markdown/Base documents; links, anchors, YAML, assets, and credential patterns checked.`,counts)
