import fs from 'node:fs'
import YAML from 'yaml'
import { readVault, writePage, cell, section, short } from './vault.mjs'
const vault = readVault()
const entries = (folder, type) => vault.filter(p => p.filename.startsWith(`content/${folder}/`) && p.data.type === type && p.data.status !== 'template').sort((a,b) => a.id.localeCompare(b.id))
const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(()=>'---').join(' | ')} |\n${rows.map(row=>`| ${row.map(cell).join(' | ')} |`).join('\n')}`
const link = p => `[[${p.id}|${p.id.split("/").at(-1)}]]`
const npcs = entries('Characters/NPCs', 'npc')
const adventures = entries('Storylines/Adventures','adventure')
writePage('content/Characters/NPCs/NPCs.md','NPC Directory',`All ${npcs.length} canonical NPC entries. Egbert Lusat is the antidote benefactor; the former unnamed placeholder is merged into his entry. Names, roles, and knowledge are campaign records; planned appearances are not completed events. Search this page or use full-text search.\n\n${table(['Name','Species (2024)','Role','Location','Faction / affiliation','Status','Related quests / preparation'], npcs.map(p=>[link(p),p.data.species || p.data.ancestry,p.data.occupation,p.data.location || p.data.last_known_location,p.data.factions?.length?p.data.factions:'See relationships',p.data.status,adventures.filter(a=>a.text.includes(`[[${p.id}`)).map(link).join('; ') || (p.text.includes('The Road to Ostium') ? '[[Session Logs/Session Prep — The Road to Ostium]]' : 'TBD')]))}\n\n![[Characters/NPCs/NPCs.base#NPCs]]`)
const locs=entries('Locations','location')
writePage('content/Locations/Locations.md','Location Directory',`All ${locs.length} location entries. Parent/region fields describe established relationships; blank fields remain TBD.\n\n${table(['Location','Description / campaign role','Parent / region','Status'],locs.map(p=>[link(p),short(p.body.match(/\*\*Description:\*\*\s*([^\n]+)/)?.[1] || section(p.body,'Operational Summary').replace(/\*\*What is changing:[\s\S]*/,'')),p.data['parent-location'] || p.data.region,p.data.status || p.data.condition]))}\n\n![[Locations/Locations.base#Locations]]`)
const factions=entries('Factions','faction')
writePage('content/Factions/Factions.md','Faction Directory',`All ${factions.length} factions. Relationships are pressures and affiliations, not automatic moral alignments.\n\n${table(['Faction','Objective','Leadership','Relationships / influence'], factions.map(p=>[link(p),short(p.body.match(/\*\*True objective:\*\*\s*([^\n]+)/)?.[1] || section(p.body,'Actual Agenda')),short(section(p.body,'Leadership Hierarchy'),220),short(section(p.body,'Relationships & Leverage'),260)]))}\n\n![[Factions/Factions.base#Factions]]`)
const pcs=entries('Characters/Player Characters','pc')
writePage('content/Characters/Player Characters/Player Characters.md','PC Roster',`The eight GM-supplied PCs retain their exact identities, players, classes, and levels. D&D 5e (2024) is the mechanical default; incomplete choices remain TBD.\n\n${table(['PC','Ancestry / species identity','Class','Level','Player'],pcs.map(p=>[link(p),p.data.ancestry,p.data.class,p.data.level,p.data.player]))}\n\n![[Characters/Player Characters/Player Characters.base#Player Characters]]`)
writePage('content/Storylines/Adventures/Adventures.md','Quests and Prepared Adventures',`The current premise is the PCs' search for a Frigid Woe antidote: [[Session Logs/Session Prep — The Road to Ostium]]. Shanda can introduce [[Characters/NPCs/Egbert Lusat]], who owns two reserved vials and may offer them as negotiated compensation for [[Storylines/Adventures/The Prodigal Son]]. Purchase funded by other work, immediate help against assurances, replacement arrangements, courier retrieval, direct Mistbreak travel, research, or theft remain alternatives; accepting the quest is optional. Prepared hooks below are not evidence of completed events.\n\n${table(['Adventure','Status','Act','Function / stakes'],adventures.map(p=>[link(p),p.data.status,p.data.act,short(section(p.body,'Function in the Larger Arc'))]))}\n\n![[Storylines/Adventures/Adventures.base#GM Adventures]]`)
const sessions=vault.filter(p=>p.id.startsWith('Session Logs/') && ['session-prep','session-log'].includes(p.data.type)).sort((a,b)=>(a.data.session??999)-(b.data.session??999)||a.id.localeCompare(b.id))
writePage('content/Session Logs/Session Logs.md','Session Index',`Upcoming: [[Session Logs/Session Prep — The Road to Ostium]]. No completed report has been supplied; Session Log 0 is an unfilled record. Session numbers describe existing prep labels and do not establish that sessions occurred.\n\n${table(['Document','Kind','Session','Date','Status'],sessions.map(p=>[link(p),p.data.type,p.data.session,p.data.date,p.data.status || (p.data.type==='session-prep'?'Planned':'Unfilled')]))}\n\n## Reading Order\n\n- [[Session Logs/Session 0 Prep]] — earlier campaign-setup plan.\n- [[Session Logs/Session Prep — The Road to Ostium]] — immediate session, number/date TBD.\n- [[Session Logs/Session 1 - The Prodigal Son Prep]] — optional or later prepared hook.\n\nUse previous and next properties once actual chronology is established; no fictitious report navigation has been assigned.`)
writePage('content/Storylines/Storylines.md','Campaign Storylines','- [[Storylines/Ostium Campaign]]\n- [[Storylines/Acts/Acts]]\n- [[Storylines/Adventures/Adventures]]\n- [[Planning/Plot Threads and Mysteries]]')
writePage('content/Storylines/Acts/Acts.md','Campaign Acts',vault.filter(p=>p.data.type==='act-outline').map(link).map(l=>'- '+l).join('\n'))
// Keep Obsidian Bases as live views; Markdown directories also work in static renderers.
const definitions=[
 ['Characters/NPCs/NPCs.base','Characters/NPCs','npc','NPCs',['file.name','species','occupation','location','factions','status']],
 ['Characters/Player Characters/Player Characters.base','Characters/Player Characters','pc','Player Characters',['file.name','player','ancestry','class','level','system']],
 ['Locations/Locations.base','Locations','location','Locations',['file.name','region','parent-location','status']],
 ['Factions/Factions.base','Factions','faction','Factions',['file.name','status']],
 ['Rules/Rules.base','Rules','rules','GM Rules',['file.name','tags']],
]
for(const [filename,folder,type,name,order] of definitions){
 const data={filters:{and:[`file.folder == "${folder}"`,`type == "${type}"`]},views:[{type:'table',name,order}]}
 fs.writeFileSync(`content/${filename}`,YAML.stringify(data))
}
console.log(`Directories updated: ${npcs.length} NPCs, ${locs.length} locations, ${factions.length} factions, ${pcs.length} PCs, ${adventures.length} adventures.`)
