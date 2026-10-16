import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

export function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name.includes('Edit conflict')) return []
    const filename = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(filename) : [filename]
  })
}
export function readVault() {
  return walk('content').filter(p => /\.(md|base)$/.test(p)).map(filename => {
    const text = fs.readFileSync(filename, 'utf8')
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
    const data = filename.endsWith('.base') ? YAML.parse(text) : front ? YAML.parse(front[1]) : {}
    return { filename, id: filename.replace(/^content\//, '').replace(/\.(md|base)$/, ''), text, data, body: front ? text.slice(front[0].length) : text }
  })
}
export function writePage(filename, title, body, extra = {}) {
  body = body.split('\n').map(line => line.replace(/(?<!!)\[\[([^\]]+)\]\]/g, (whole, value) => {
    if (value.includes('|') || !value.includes('/') || value.includes('.base')) return whole
    const label = value.split('#')[0].split('/').at(-1)
    const pipe = line.trimStart().startsWith('|') ? '\\|' : '|'
    return '[[' + value + pipe + label + ']]'
  })).join('\n')
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  writeIfChanged(filename, `---\n${YAML.stringify({ title, type: 'index', tags: ['index'], ...extra })}---\n\n# ${title}\n\n${body.trim()}\n`)
}
export function writeIfChanged(filename, text) {
  if (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8') !== text) fs.writeFileSync(filename, text)
}
export function cell(value) {
  if (Array.isArray(value)) return value.map(cell).join('; ') || 'TBD'
  return String(value ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim() || 'TBD'
}
export function section(body, title) {
  return body.match(new RegExp(`^## ${title}\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1]?.trim() ?? ''
}
export function short(text, max = 190) {
  text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label ?? target.split('/').at(-1)).replace(/\*\*/g, '').replace(/^[-\d.]+\s*/gm, '').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text
}
