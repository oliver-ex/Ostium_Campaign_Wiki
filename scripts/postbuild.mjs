import fs from 'node:fs'
import path from 'node:path'
fs.writeFileSync('public/robots.txt', 'User-agent: *\nDisallow: /\n')
// An indexing request, not access control. A header improves coverage beyond robots.txt.
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => { const p = `${dir}/${e.name}`; return e.isDirectory() ? walk(p) : [p] }) }
const manifest = JSON.parse(fs.readFileSync('content/Attachments/Artwork/artwork-manifest.json', 'utf8'))
const artwork = new Map(manifest.assets.map(a => [path.posix.basename(a.file), a]))
let images = 0
for (const p of walk('public').filter(p => p.endsWith('.html'))) {
  let first = true
  let text = fs.readFileSync(p, 'utf8')
  text = text.replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1]
    if (!src || !/Attachments\/Artwork\//i.test(src)) return tag
    const asset = artwork.get(path.posix.basename(decodeURIComponent(src)))
    if (!asset) return tag
    // Preserve source alt text and other Quartz attributes; set intrinsic dimensions to prevent layout shifts.
    const className = `campaign-artwork-image ${asset.kind === 'npcs' ? 'artwork-portrait' : 'artwork-scene'}`
    tag = tag.replace(/\s(?:width|height|loading|decoding)="[^"]*"/g, '')
    tag = /\bclass="/.test(tag) ? tag.replace(/\bclass="([^"]*)"/, (_, old) => `class="${old} ${className}"`) : tag.replace('<img', `<img class="${className}"`)
    tag = tag.replace(/\s*\/?>$/, ` width="${asset.width}" height="${asset.height}" loading="${first ? 'eager' : 'lazy'}" decoding="async">`)
    first = false
    images++
    return `<a class="campaign-artwork-link" href="${src}" aria-label="Open full-size artwork" data-no-popover="true">${tag}</a>`
  })
  fs.writeFileSync(p, text.replace('</head>', '<meta name="robots" content="noindex, nofollow, noarchive"></head>'))
}
console.log(`Added robots.txt, noindex directives, and responsive artwork links for ${images} rendered image placements.`)
