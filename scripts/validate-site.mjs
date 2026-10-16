import fs from 'node:fs'
import path from 'node:path'
import { readVault } from './vault.mjs'
const root=path.resolve('public'), errors=[]
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]})}
const html=walk(root).filter(p=>p.endsWith('.html'))
const index=JSON.parse(fs.readFileSync(path.join(root,'static/contentIndex.json'),'utf8'))
const sourcePages=readVault().filter(p=>p.filename.endsWith('.md'))
const indexedPaths=new Set(Object.values(index).map(v=>v.filePath?.replace(/^content\//,'')))
for(const page of sourcePages)if(!indexedPaths.has(page.filename.replace(/^content\//,'')))errors.push(`Source page missing from content/search index: ${page.filename}`)
const origin='http://localhost'
// Exercise a repository subpath even in local builds: root hosting can hide
// excess ../ segments because URL resolution clamps them at the domain root.
const basePath=process.env.PAGES_BASE_URL ? new URL(process.env.PAGES_BASE_URL).pathname.replace(/\/$/,'') : '/__quartz_preview__'
for(const file of html){
 const text=fs.readFileSync(file,'utf8')
 for(const m of text.matchAll(/\b(href|src)="([^"]+)"/g)){
  const ref=m[2].replace(/&amp;/g,'&')
  if(/^(?:[a-z][a-z0-9+.-]*:|\/\/|data:)/i.test(ref))continue
  let url
  try{url=new URL(ref,origin+basePath+'/'+path.relative(root,file).split(path.sep).join('/'))}catch{errors.push(`${path.relative(root,file)}: invalid URL`);continue}
  let pathname=decodeURIComponent(url.pathname)
  if(basePath){
   if(pathname!==basePath && !pathname.startsWith(basePath+'/')){errors.push(`${path.relative(root,file)}: URL escapes site base path: ${ref}`);continue}
   pathname=pathname.slice(basePath.length)||'/'
  }
  let target=path.join(root,pathname)
  const options=[target,`${target}.html`,path.join(target,'index.html')]
  target=options.find(p=>fs.existsSync(p)&&fs.statSync(p).isFile())
  if(!target){errors.push(`${path.relative(root,file)}: missing ${ref}`);continue}
  if(url.hash&&target.endsWith('.html')){
   const id=decodeURIComponent(url.hash.slice(1))
   const destination=fs.readFileSync(target,'utf8')
   if(!destination.includes(`id="${id}"`)&&!destination.includes(`name="${id}"`))errors.push(`${path.relative(root,file)}: missing anchor ${ref}`)
  }
 }
}
const entries=Object.values(index)
for(const term of ['Mistbreak','Frigid Woe','Shattered Axe','The Heart','Road to Ostium'])if(!entries.some(v=>`${v.title} ${v.content}`.toLowerCase().includes(term.toLowerCase())))errors.push(`Search index missing campaign term: ${term}`)
const home=fs.readFileSync(path.join(root,'index.html'),'utf8')
for(const marker of ['search','explorer','darkmode'])if(!home.includes(marker))errors.push(`Homepage missing ${marker} component`)
const heart=entries.find(v=>v.filePath?.replace(/^content\//,'')==='Locations/The Heart.md')
if(!heart)errors.push('Former GM-only Heart entry missing')
if(fs.existsSync('public/sitemap.xml')||fs.existsSync('public/index.xml'))errors.push('Optional discovery feed/sitemap unexpectedly enabled')
if(!fs.readFileSync('public/robots.txt','utf8').includes('Disallow: /'))errors.push('Missing indexing discouragement')
for(const dir of ['.obsidian','.trash','_GM','.vault-refactor'])if(fs.existsSync(path.join(root,dir)))errors.push(`Unexpected noncampaign output directory: ${dir}`)
for(const a of JSON.parse(fs.readFileSync('publication-artwork.json','utf8')).withheld)if(fs.existsSync(path.join(root,a.file)))errors.push(`Withheld artwork leaked: ${a.file}`)
if(errors.length){for(const e of [...new Set(errors)])console.error(e);process.exit(1)}
console.log(`Site audit passed: ${html.length} HTML pages, ${sourcePages.length} source pages included, all generated local links/assets/anchors resolve; full-text index covers current and formerly GM-only material.`)
