import fs from 'node:fs'
import path from 'node:path'
import { cell, writeIfChanged } from './vault.mjs'

const artPattern = /<!-- campaign-artwork:start -->[\s\S]*?<!-- campaign-artwork:end -->/
const profilePattern = /<!-- character-profile:start -->[\s\S]*?<!-- character-profile:end -->\s*/
const residentsPattern = /<!-- location-residents:start -->[\s\S]*?<!-- location-residents:end -->\s*/
const wiki = (id, label = id.split('/').at(-1)) => `[[${id}|${label}]]`
const plainLocation = value => String(value ?? '').replace(/^\[\[(?:Locations\/)?([^\]|]+)(?:\|[^\]]+)?\]\]$/, '$1')
const quote = text => text.split('\n').map(line => `> >${line ? ' ' + line : ''}`).join('\n')
const field = (body, name) => body.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`))?.[1]?.replace(/\\$/, '').trim()
const summary = body => {
  const heading = body.match(/^## (?:At a Glance|Overview)\s*\n([\s\S]*?)(?=\n## |$(?![\s\S]))/m)?.[1] ?? ''
  return heading.split('\n').map(line => line.replace(/^- /, '').trim()).find(line => line && !line.startsWith('**Species'))
}
function table(rows) {
  return '| Detail | Record |\n| --- | --- |\n' + rows.map(([key,value]) => `| ${cell(key)} | ${cell(value)} |`).join('\n')
}
function insertAfterTitle(text, block) {
  const summary = text.match(/<!-- page-summary:start -->[\s\S]*?<!-- page-summary:end -->\s*/)?.[0]
  if (summary) return text.replace(summary, `${summary}${block}\n\n`)
  return text.replace(/(^# [^\n]+\n)/m, `$1\n${block}\n\n`)
}
export function updateCharacterProfiles(vault) {
  const characters = vault.filter(p => ['npc', 'pc'].includes(p.data.type) && !p.id.startsWith('Templates/'))
  for (const page of characters) {
    const data = page.data
    let text = fs.readFileSync(page.filename, 'utf8')
    // Recover the source image and attribution from an existing generated card.
    const previous = text.match(profilePattern)?.[0]
    let art = (previous ?? text).match(artPattern)?.[0]
    if (previous && art) art = art.replace(/^> > ?/gm, '')
    text = text.replace(profilePattern, '')
    if (!previous) text = text.replace(artPattern, '')
    const age = data.age ? `${data.age}${data['age-note'] ? ' (estimate)' : ''}${data.status === 'deceased' ? ' at death' : ''}` : (data.type === 'pc' ? 'TBD — player choice' : 'Unknown')
    const location = plainLocation(data.location || data.last_known_location || data.usual_location)
    const locationId = vault.find(p => p.data.type === 'location' && path.posix.basename(p.id) === location)?.id
    const rows = [
      [data.type === 'pc' ? 'Ancestry / identity' : 'Species', data.type === 'pc' ? data.ancestry : data.species || data.ancestry],
      ['Age', age],
      ['Pronouns', data.pronouns || 'Not recorded'],
      ['Role', data.occupation || field(page.body, 'Role in campaign') || 'Not recorded'],
      ['Faction / affiliation', data.factions?.length ? data.factions : 'Not established'],
      [data.status === 'deceased' ? 'Last known location' : 'Current location', locationId ? wiki(locationId) : location || 'Unknown'],
      ['Status', data.status || 'Unknown'],
    ]
    if (data['cause-of-death']) rows.push(['Cause of death', data['cause-of-death']])
    if (data.type === 'pc') rows.splice(3, 1, ['Player', data.player || 'TBD'], ['Class / level', [data.class, data.level].filter(Boolean).join(' / ') || 'TBD'])
    const notes = data.type === 'npc' ? [
      ['In play', field(page.body, 'Role in campaign') || summary(page.body)],
      ['Wants now', field(page.body, 'Current agenda')],
      ['Portrayal', field(page.body, 'Voice / portrayal')],
      ['Attitude', field(page.body, 'Disposition toward party')],
    ].filter(([,value]) => value).map(([name,value]) => `**${name}:** ${value}`).join('\n\n') : ''
    const ageNote = data['age-note'] ? `\n\n*Age estimate: ${data['age-note']}*` : ''
    const portrait = art || '*No player-approved portrait recorded.*'
    const block = `<!-- character-profile:start -->\n\n> [!character] Character quick reference\n>\n> > [!profile] Key information\n> >\n${quote(table(rows) + (notes ? '\n\n' + notes : '') + ageNote)}\n>\n> > [!portrait] Portrait\n> >\n${quote(portrait)}\n\n<!-- character-profile:end -->`
    writeIfChanged(page.filename, insertAfterTitle(text, block).replace(/\n{4,}/g, '\n\n\n'))
  }
}
export function updateLocationResidents(vault) {
  const locations = vault.filter(p => p.data.type === 'location' && !p.id.startsWith('Templates/'))
  const names = new Map(locations.map(p => [path.posix.basename(p.id), p]))
  const parents = new Map(locations.map(p => [path.posix.basename(p.id), plainLocation(p.data['parent-location'] || p.data.region)]))
  // Both named districts and the two city halves already sit under Ostium.
  // Pumps belong to the established Waterworks network, not a new settlement.
  parents.set('Old Ostium Waterworks', 'Old Ostium')
  parents.set('Old Ostium Pump 4', 'Old Ostium Waterworks')
  parents.set('Old Ostium Pump 7', 'Old Ostium Waterworks')
  const isWithin = (current, target) => {
    const seen = new Set()
    while (current && !seen.has(current)) {
      if (current === target) return true
      seen.add(current)
      current = parents.get(current)
    }
    return false
  }
  const npcs = vault.filter(p => p.data.type === 'npc' && !p.id.startsWith('Templates/'))
  for (const location of locations) {
    const target = path.posix.basename(location.id)
    const residents = npcs.filter(p => !['deceased','dead','retired'].includes(String(p.data.status).toLowerCase()) && isWithin(plainLocation(p.data.location || p.data.last_known_location), target))
    const rows = residents.map(p => {
      const current = plainLocation(p.data.location || p.data.last_known_location)
      return [wiki(p.id), p.data.occupation, p.data.factions?.length ? p.data.factions : 'Not established', names.has(current) ? wiki(names.get(current).id) : current, p.data.status]
    })
    const header = '| NPC | Role | Faction / affiliation | Recorded current location | Status |\n| --- | --- | --- | --- | --- |'
    const body = rows.length ? rows.map(row => `| ${row.map(cell).join(' | ')} |`).join('\n') : '| None recorded | — | — | — | — |'
    const block = `<!-- location-residents:start -->\n\n## NPCs Currently Based Here\n\n${header}\n${body}\n\n*From NPC current-location records, including contained districts and work sites. A work location is not a confirmed home. Deceased characters, unknown locations, and planned visitors are excluded; table-specific movements must be recorded before changing this list.*\n\n<!-- location-residents:end -->`
    const text = fs.readFileSync(location.filename, 'utf8')
    const updated = residentsPattern.test(text) ? text.replace(residentsPattern, block + '\n\n') : insertAfterTitle(text, block)
    writeIfChanged(location.filename, updated.replace(/\n{4,}/g, '\n\n\n'))
  }
}
