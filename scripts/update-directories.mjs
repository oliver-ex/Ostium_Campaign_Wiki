import YAML from 'yaml'
import { updateCharacterProfiles, updateLocationResidents } from './update-character-profiles.mjs'
import { updatePageReferences } from './update-page-references.mjs'
import { readVault, writePage, writeIfChanged, cell, section, short } from './vault.mjs'
const vault = readVault()
updateCharacterProfiles(vault)
updateLocationResidents(vault)
const entries = (folder, type) => vault.filter(p => p.filename.startsWith(`content/${folder}/`) && p.data.type === type && p.data.status !== 'template').sort((a,b) => a.id.localeCompare(b.id))
const table = (headers, rows) => `| ${headers.join(' | ')} |\n| ${headers.map(()=>'---').join(' | ')} |\n${rows.map(row=>`| ${row.map(cell).join(' | ')} |`).join('\n')}`
const link = p => `[[${p.id}|${p.id.split("/").at(-1)}]]`
const npcs = entries('Characters/NPCs', 'npc')
const adventures = entries('Storylines/Adventures','adventure')
writePage('content/Characters/NPCs/NPCs.md','NPC Directory',`All ${npcs.length} canonical NPC entries. Egbert Lusat is the antidote benefactor; the former unnamed placeholder is merged into his entry. Names, roles, and knowledge are campaign records; planned appearances are not completed events. Search this page or use full-text search.\n\n${table(['NPC','Role','Recorded location','Affiliation'], npcs.map(p=>[link(p),p.data.occupation,p.data.location || p.data.last_known_location,p.data.factions?.length?p.data.factions:'Not established']))}\n\n![[Characters/NPCs/NPCs.base#NPCs]]`)
const locs=entries('Locations','location')
writePage('content/Locations/Locations.md','Location Directory',`All ${locs.length} location entries. Parent/region fields describe established relationships; blank fields remain TBD.\n\n${table(['Location','Description / campaign role','Parent / region','Status'],locs.map(p=>[link(p),p.data.description || 'Description not yet recorded',p.data['parent-location'] || p.data.region,p.data.status || p.data.condition]))}\n\n![[Locations/Locations.base#Locations]]`)
const factions=entries('Factions','faction')
writePage('content/Factions/Factions.md','Faction Directory',`All ${factions.length} factions. Relationships are pressures and affiliations, not automatic moral alignments.\n\n${table(['Faction','What they are about','Key contacts'], factions.map(p=>[link(p),p.data.description || 'Description not yet recorded',npcs.filter(n=>(n.data.factions || []).some(f=>f.includes('[['+p.id))).map(link).join(' · ') || 'See faction page']))}\n\n![[Factions/Factions.base#Factions]]`)
const pcs=entries('Characters/Player Characters','pc')
writePage('content/Characters/Player Characters/Player Characters.md','PC Roster',`The eight GM-supplied PCs retain their exact identities, players, classes, and levels. D&D 5e (2024) is the mechanical default; incomplete choices remain TBD.\n\n${table(['PC','Ancestry / species identity','Class','Level','Player'],pcs.map(p=>[link(p),p.data.ancestry,p.data.class,p.data.level,p.data.player]))}\n\n![[Characters/Player Characters/Player Characters.base#Player Characters]]`)
writePage('content/Storylines/Adventures/Adventures.md','Quests and Prepared Adventures',`Shared adventure preparation includes the search for a Frigid Woe antidote: [[Storylines/Adventures/The Road to Ostium]]. Shanda can introduce [[Characters/NPCs/Egbert Lusat]], who owns two reserved vials and may offer them as negotiated compensation for [[Storylines/Adventures/The Prodigal Son]]. Purchase funded by other work, immediate help against assurances, replacement arrangements, courier retrieval, direct Mistbreak travel, research, or theft remain alternatives; accepting the quest is optional. Table-specific outcomes belong in [[Session Logs/Session Logs]]: Steven’s table retrieved an antidote in Session 5; Oliver’s Road to Ostium is planned for Session 2. Prepared hooks below are not evidence of completed events.\n\n${table(['Adventure','Situation / stakes','Act · status'],adventures.map(p=>[link(p),p.data.description || short(section(p.body,'Function in the Larger Arc')),[p.data.act,p.data.status].filter(Boolean).join(' · ')]))}\n\n![[Storylines/Adventures/Adventures.base#GM Adventures]]`)
const sessions=vault.filter(p=>p.id.startsWith('Session Logs/') && ['session-prep','session-log'].includes(p.data.type))
const sessionTable=pages=>table(['Document','Kind','Session','Date','Status'],pages.sort((a,b)=>(a.data.session??999)-(b.data.session??999)||a.id.localeCompare(b.id)).map(p=>[link(p),p.data.type,p.data.session,p.data.date,p.data.status || (p.data.type==='session-prep'?'Planned':'Unfilled')]))
const tables=["Steven's Table","Oliver's Table"]
for(const name of tables){
 const folder=`Session Logs/${name}`
 const records=sessions.filter(p=>p.id.startsWith(folder+'/'))
 const overview=name==="Steven's Table"
   ? 'Sessions 1–5 are completed GM-supplied summaries. Session 6 is a blank preparation template. Antidote retrieval in Session 5 does not establish administration or a cure.'
   : 'Session 1 is completed. Session 2 is planned preparation for [[Storylines/Adventures/The Road to Ostium]]. Two pregen characters are affected by Frigid Woe but do not yet know the danger.'
 writePage(`content/${folder}/${name}.md`,name,`${overview}\n\n${sessionTable(records)}\n\n![[Session Logs/Session Logs.base#${name}]]`,{table:name})
}
const unassigned=sessions.filter(p=>!tables.some(name=>p.id.startsWith(`Session Logs/${name}/`)))
writePage('content/Session Logs/Session Logs.md','Session Index',`Session numbering and outcomes are separate for each table. Completed GM summaries establish only the events recorded; preparation and blank records remain unplayed.\n\n- [[Session Logs/Steven's Table/Steven's Table]] — five completed summaries; blank Session 6 prep.\n- [[Session Logs/Oliver's Table/Oliver's Table]] — completed Session 1; planned Session 2.\n- [[Storylines/Adventures/The Road to Ostium]] — canonical shared adventure, with Oliver’s next-session outline in his table folder.\n\n## Earlier Unassigned Material\n\nThese older notes have no confirmed table assignment. Preserve them as preparation/reference; Session Log 0 is unfilled.\n\n${sessionTable(unassigned)}\n\n![[Session Logs/Session Logs.base#Session Logs]]`)
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
 writeIfChanged(`content/${filename}`,YAML.stringify(data))
}
console.log(`Directories updated: ${npcs.length} NPCs, ${locs.length} locations, ${factions.length} factions, ${pcs.length} PCs, ${adventures.length} adventures.`)
updatePageReferences(vault)
