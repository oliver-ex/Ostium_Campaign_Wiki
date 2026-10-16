import fs from 'node:fs'
import path from 'node:path'
import { cell, writeIfChanged } from './vault.mjs'

const generated = /<!-- ([\w-]+):start -->[\s\S]*?<!-- \1:end -->\s*/g
const blockPattern = name => new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->\\s*`, 'g')
const wiki = p => `[[${p.id}|${p.data.title || path.posix.basename(p.id)}]]`
const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n${rows.map(row => `| ${row.map(cell).join(' | ')} |`).join('\n')}`
const entityTypes = new Set(['npc', 'pc', 'location', 'faction', 'adventure', 'encounter', 'act-outline', 'storyline', 'lore', 'affliction'])

// Read only authored links. Generated navigation must never become new evidence
// for a relationship, residence, appearance, or completed event on the next build.
export function updatePageReferences(vault) {
  const pages = vault.filter(p => p.filename.endsWith('.md') && !p.id.startsWith('Templates/') && !p.id.startsWith('Planning/Archive/'))
  const aliases = new Map()
  for (const p of pages) {
    for (const key of [p.id, path.posix.basename(p.id), ...(p.data.aliases || [])]) {
      if (!aliases.has(key)) aliases.set(key, new Set())
      aliases.get(key).add(p)
    }
  }
  const resolve = (raw, source) => {
    const target = raw.replace(/\\\|/g, '|').split('|')[0].split('#')[0].replace(/\.md$/, '')
    const candidates = aliases.get(target) || aliases.get(path.posix.normalize(path.posix.join(path.posix.dirname(source.id), target)))
    return candidates?.size === 1 ? [...candidates][0] : undefined
  }
  const authored = new Map(pages.map(p => [p.id, p.text.replace(generated, '').replace(/```[\s\S]*?```/g, '')]))
  const links = new Map(pages.map(p => [p.id, new Set([...authored.get(p.id).matchAll(/(?<!!)\[\[([^\]]+)\]\]/g)].map(m => resolve(m[1], p)).filter(q => q && q.id !== p.id))]))
  const sorted = list => [...list].sort((a, b) => a.id.localeCompare(b.id))

  for (const page of pages) {
    let text = fs.readFileSync(page.filename, 'utf8')
    text = text.replace(blockPattern('page-summary'), '').replace(blockPattern('page-connections'), '')
    if (page.data.description) {
      text = text.replace(/(^# [^\n]+\n)/m, `$1\n<!-- page-summary:start -->\n\n${page.data.description}\n\n<!-- page-summary:end -->\n\n`)
    }
    if (!entityTypes.has(page.data.type)) {
      writeIfChanged(page.filename, text)
      continue
    }

    const outgoing = sorted(links.get(page.id))
    const incoming = sorted(pages.filter(p => links.get(p.id).has(page)))
    const groups = [
      ['People', ['npc', 'pc']], ['Locations', ['location']], ['Factions', ['faction']],
      ['Campaign & lore', ['storyline', 'act-outline', 'lore', 'affliction']],
    ]
    const rows = groups.flatMap(([label, types]) => {
      // Faction people and operating areas have contextual authored tables.
      if (page.data.type === 'faction' && ['People', 'Locations'].includes(label)) return []
      const candidates = page.data.type === 'location' && label === 'Factions'
        ? sorted(new Set([...outgoing, ...incoming.filter(p => p.data.type === 'faction')]))
        : outgoing
      const targets = candidates.filter(p => types.includes(p.data.type))
      return targets.length ? [[label, targets.map(wiki).join(' · ')]] : []
    })
    const parentName = page.data['parent-location'] || page.data.region
    const parent = parentName ? resolve(String(parentName), page) : undefined
    if (parent && parent !== page && !outgoing.includes(parent)) rows.unshift(['Within', wiki(parent)])
    const children = sorted(pages.filter(p => p.data.type === 'location' && resolve(String(p.data['parent-location'] || p.data.region || ''), p) === page && p !== page))
    if (children.length) rows.push(['Contained locations', children.map(wiki).join(' · ')])

    // These are document references, not inferred quest involvement or play history.
    const adventures = sorted(new Set([...outgoing, ...incoming].filter(p => ['adventure', 'encounter'].includes(p.data.type))))
    const records = incoming.filter(p => ['session-log', 'session-prep'].includes(p.data.type))
    let content = rows.length ? table(['Connection', 'Follow links'], rows) : ''
    if (adventures.length) {
      content += `${content ? '\n\n' : ''}### Adventures & Encounters\n\n` + table(['Adventure / state', 'Situation'], adventures.map(p => [`${wiki(p)} — ${p.data.status || 'Unknown'}`, p.data.description || 'See the linked preparation.']))
    }
    if (records.length) {
      const recordRows = records.map(p => {
        const tableName = p.data.table || (p.id.includes("Steven's Table/") ? "Steven’s table" : p.id.includes("Oliver's Table/") ? "Oliver’s table" : 'Unassigned')
        return [wiki(p), tableName, p.data.status || (p.data.type === 'session-prep' ? 'Planned' : 'Unfilled')]
      })
      content += `\n\n> [!example]- Session references\n> A link records a mention, not proof of an appearance or revelation. Read each report for actual outcomes.\n>\n${table(['Record', 'Table', 'State'], recordRows).split('\n').map(l => '> ' + l).join('\n')}`
    }
    if (!content) {
      writeIfChanged(page.filename, text)
      continue
    }
    const block = `<!-- page-connections:start -->\n\n## Connected Pages\n\n${content.trim()}\n\n<!-- page-connections:end -->\n\n`
    // Keep the first practical reference visible before the link tables.
    // Large illustrations follow reference material rather than separating title and purpose.
    if (page.data.type === 'encounter') {
      // Combat references belong first; keep generated navigation after the encounter.
      text = text.trimEnd() + '\n\n' + block.trimEnd() + '\n'
    } else if (page.data.type === 'faction') {
      const beforeDetails = /(?=<!-- campaign-artwork:start -->|## Relevant Roles to Populate Later|## Goals, Agenda & Pressures)/
      if (beforeDetails.test(text)) text = text.replace(beforeDetails, block)
      else text = text.replace(/(^# [^\n]+\n)/m, `$1\n${block}`)
    } else {
      const profile = text.match(blockPattern('character-profile'))?.[0]
      const residents = text.match(blockPattern('location-residents'))?.[0]
      if (page.data.type === 'location' && residents) text = text.replace(residents, '')
      const operational = text.match(/^## Operational Summary\n[\s\S]*?(?=\n## |\n<!-- [\w-]+:start -->|(?![\s\S]))/m)?.[0]
      if (page.data.type === 'location') {
        if (operational) text = text.replace(operational, '')
      }
      const summary = text.match(blockPattern('page-summary'))?.[0]
      const anchor = profile || summary
      const reference = (page.data.type === 'location' && operational ? operational.trim() + '\n\n' : '') + block + (residents || '')
      if (anchor) text = text.replace(anchor, anchor + reference)
      else text = text.replace(/(^# [^\n]+\n)/m, `$1\n${reference}`)
    }
    writeIfChanged(page.filename, text.replace(/\n{4,}/g, '\n\n\n'))
  }
  console.log('Page introductions and authored-link references updated.')
}
