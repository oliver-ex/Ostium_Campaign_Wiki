import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'
import { readVault } from './vault.mjs'

const manifest = JSON.parse(fs.readFileSync('content/Attachments/Artwork/artwork-manifest.json', 'utf8'))
const withheld = new Set(JSON.parse(fs.readFileSync('publication-artwork.json','utf8')).withheld.map(a => a.file))
const pages = readVault()
const assets = new Map(manifest.assets.map(a => [a.id, a]))
const errors = []
for (const asset of assets.values()) {
  const file = `content/${asset.file}`
  if (asset.license.startsWith("Copyright retained") && !withheld.has(asset.file)) errors.push(`Uncleared artwork missing from publication exclusions: ${file}`)
  if (!fs.existsSync(file) && withheld.has(asset.file)) continue
  if (!fs.existsSync(file)) { errors.push(`Missing artwork ${file}`); continue }
  const metadata = await sharp(file).metadata()
  if (metadata.width !== asset.width || metadata.height !== asset.height) errors.push(`Incorrect image dimensions: ${file}`)
  const bytes = fs.readFileSync(file)
  if (crypto.createHash('sha256').update(bytes).digest('hex') !== asset.sha256) errors.push(`Artwork changed without source-register review: ${file}`)
  if (!asset.artist || !asset.source?.startsWith('https://') || !asset.license || (!asset.license_url && !asset.rights_note)) errors.push(`Incomplete attribution: ${file}`)
  if (asset.license === 'GPL-2.0-or-later' && (!asset.source_file || !fs.existsSync(`content/${asset.source_file}`))) errors.push(`Missing GPL image source: ${file}`)
  if (bytes.length > 650_000) errors.push(`Review image download size: ${file}`)
}
for (const entry of manifest.pages) {
  const page = pages.find(p => p.id === entry.page)
  if (!page) { errors.push(`Artwork register references missing page: ${entry.page}`); continue }
  if (['npc', 'location'].includes(page.data.type) && !entry.images.some(id => {
    const asset = assets.get(id)
    return asset && !withheld.has(asset.file)
  })) errors.push(`${page.data.type === 'npc' ? 'NPC has no publishable portrait' : 'Location has no publishable artwork'}: ${entry.page}`)
  if (!['illustrated', 'backlog'].includes(entry.status) || (entry.status === 'illustrated') !== (entry.images.length > 0)) errors.push(`Invalid artwork status: ${entry.page}`)
  for (const id of entry.images) {
    const asset = assets.get(id)
    if (!asset || !asset.pages.includes(entry.page)) { errors.push(`Missing reciprocal image register: ${entry.page}: ${id}`); continue }
    const relative = path.posix.relative(path.posix.dirname(entry.page), asset.file)
    if (!page.body.includes(`](${relative})`)) errors.push(`Registered artwork missing from Markdown: ${entry.page}: ${id}`)
  }
}
const subjects = pages.filter(p => ['npc', 'location', 'faction'].includes(p.data.type) && !p.id.startsWith('Templates/'))
for (const p of subjects) if (!manifest.pages.some(e => e.page === p.id)) {
  if (['npc', 'location'].includes(p.data.type)) errors.push(`Required artwork missing from register: ${p.id}`)
  else console.warn(`Artwork review pending for new subject: ${p.id}`)
}
for (const error of errors) console.error(error)
if (errors.length) process.exit(1)
console.log(`Artwork audit passed: ${assets.size} images, ${manifest.pages.length} reviewed subjects, ${manifest.pages.filter(p => p.status === 'backlog').length} documented gaps.`)
