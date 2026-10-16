---
title: Templates
type: index
tags:
- index
---

# Templates

Copy the relevant template into its campaign folder, then set title, status, and type. Leave unknown details TBD. Never invent player choices or promote a suggestion to canon. See [[Rules/System Guide|System Guide]].

- [[Templates/NPC|NPC]]
- [[Templates/Location|Location]]
- [[Templates/Faction|Faction]]
- [[Templates/Player Character|Player Character]]
- [[Templates/Quest|Quest]]
- [[Templates/Encounter|Encounter]]
- [[Templates/Session Preparation|Session Preparation]]
- [[Templates/Session Report|Session Report]]
- [[Templates/Item or Artifact|Item or Artifact]]
- [[Templates/Creature or Affliction|Creature or Affliction]]
- [[Templates/Lore Entry|Lore Entry]]
- [[Templates/Campaign Mystery|Campaign Mystery]]

## Page Design

Start with one short description explaining the subject and its role in play. Use `description` in frontmatter as the source; `npm run directories` places it under the title and uses it in directory tables. All fields remain optional where not established.

Use two-column tables for quick decisions and connections: a linked person/place on the left, their role or significance on the right. Keep motivations, secrets, alternate approaches, and consequences in prose when they need room. Faction pages lead with pressures, operating areas, and relevant people before collapsible artwork. Character pages retain their portrait cards; location pages lead with their operational summary and people, with visual inspiration below practical details.

The build maintains `page-summary`, `page-connections`, `character-profile`, and `location-residents` blocks. Edit the description, entity metadata, or authored prose instead of those generated blocks. Full Connected Pages sections appear at the end and are collapsed by default. Keep a few essential authored links near the top. Connected pages use explicit authored wikilinks in either direction for adventures and encounters; other links are grouped by subject. Session references retain table and state labels and do not prove an appearance, revelation, or completed event. New NPC affiliations should be linked in their faction’s relevant-NPC table when useful.

## Preserved References

The Legacy folder contains retired templates from the former publishing structure; Examples are sample material, not campaign events. Both remain available outside the published vault under `references/Templates/`.
