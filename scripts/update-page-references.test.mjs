import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { updatePageReferences } from './update-page-references.mjs'

test('references preserve authored evidence, continuity, layout and repeated-build stability', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ostium-references-'))
  const fixture = (id, data, body) => {
    const filename = path.join(dir, id + '.md')
    const text = `# ${data.title}\n\n${body}\n`
    fs.mkdirSync(path.dirname(filename), { recursive: true })
    fs.writeFileSync(filename, text)
    return { id, filename, text, body: text, data }
  }
  try {
    const place = fixture('Locations/Pump', { title: 'Pump', type: 'location', description: 'A failing pump.' },
      '<!-- location-residents:start -->\n\n## NPCs Currently Based Here\n\nNone recorded.\n\n<!-- location-residents:end -->\n\n<!-- campaign-artwork:start -->\n\nIllustration.\n\n<!-- campaign-artwork:end -->\n\n## Operational Summary\n\n**Pressure:** Water rising.\n\n## Secrets\n\nKeep this prose.')
    const npc = fixture('Characters/NPCs/Engineer', { title: 'Engineer', type: 'npc', description: 'Keeps the pump running.', aliases: ['Repairer'] }, 'Works at [[Locations/Pump]].')
    const adventure = fixture('Storylines/Adventures/Repairs', { title: 'Repairs', type: 'adventure', description: 'Repair the pump.', status: 'prepared' }, 'Talk to [[Repairer]] at [[Locations/Pump]].')
    const session = fixture("Session Logs/Oliver's Table/Session 2", { title: 'Session 2', type: 'session-prep', status: 'planned' }, 'Possible contact: [[Characters/NPCs/Engineer]].')
    const vault = [place, npc, adventure, session]
    updatePageReferences(vault)
    const snapshot = new Map(vault.map(p => [p.id, fs.readFileSync(p.filename, 'utf8')]))
    const pump = snapshot.get(place.id)
    assert.match(pump, /## Operational Summary\n\n\*\*Pressure:\*\* Water rising\./)
    assert.ok(pump.indexOf('A failing pump.') < pump.indexOf('## Operational Summary'))
    assert.ok(pump.indexOf('## Connected Pages') < pump.indexOf('Illustration.'))
    assert.match(pump, /Keep this prose\./)
    assert.match(snapshot.get(npc.id), /Repairs\\\|Repairs/)
    assert.match(snapshot.get(npc.id), /Oliver’s table \| planned/)
    assert.match(snapshot.get(npc.id), /not proof of an appearance or revelation/)
    // Inbound NPC links do not silently become authored outgoing relationships.
    assert.doesNotMatch(pump, /NPCs\/Engineer/)
    for (const p of vault) p.text = p.body = snapshot.get(p.id)
    updatePageReferences(vault)
    for (const p of vault) assert.equal(fs.readFileSync(p.filename, 'utf8'), snapshot.get(p.id), p.id)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
