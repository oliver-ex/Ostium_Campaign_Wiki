---
title: System Guide
type: rules
tags:
- rules
description: "The campaign’s rules reference for D&D 5e (2024), separately labelled Daggerheart guidance, species choices, and handling uncertain lore."
---

# System Guide

<!-- page-summary:start -->

The campaign’s rules reference for D&D 5e (2024), separately labelled Daggerheart guidance, species choices, and handling uncertain lore.

<!-- page-summary:end -->


## Campaign Rule Policy

Ostium's fiction is system-neutral. Concrete mechanics default to **Dungeons & Dragons 5th Edition, 2024 revision**. Daggerheart is a separate supported interpretation, using the campaign-adopted SRD v2.0 (August 25, 2026). Do not translate numbers between games.

Use **Game Master (GM)** in general guidance and **Dungeon Master (DM)** in D&D sections. Narrative ancestry describes identity; **species** labels the D&D mechanical choice. PC identities and player choices remain unchanged. NPC species follow the 2024 roster below. A species label never grants rules features automatically.

## D&D 5e (2024)

- Use an ability check when an uncertain action has a meaningful consequence. Write the ability and relevant skill, for example Wisdom (Perception) or Charisma (Persuasion).
- The official typical-task benchmarks include DC 10 for an easy task, 15 for a medium task, and 20 for a hard task. Scene suggestions in this vault are **proposed homebrew applications**, not official encounter values.
- A saving throw answers a defined threat. Specify its triggering effect and outcome before calling for it; do not invent disease saves or conditions from narrative symptoms.
- Choose verified creature profiles and encounter pressure for actual PC levels, attendance, resources, and terrain. Existing Daggerheart HP, tiers, and Difficulty are not D&D statistics.
- Resolve spells from their actual 2024 text and established campaign rulings. Do not name a spell as a guaranteed cure or immunity without verification.
- Preserve older material with its real edition/source. The 2024 character-creation rules provide compatibility guidance for older backgrounds/species; they do not automatically select a build for a player.

Sources checked for this refactor: [2024 Playing the Game](https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game) and [2024 Creating a Character](https://www.dndbeyond.com/sources/dnd/br-2024/creating-a-character). Adran's Half-elf rules source remains to be confirmed; identity is unchanged.

## NPC Species — D&D 5e (2024)

NPCs use the ten species in the [2024 Player's Handbook](https://www.dndbeyond.com/posts/1783-the-10-species-in-the-2024-players-handbook): **Aasimar, Dragonborn, Dwarf, Elf, Gnome, Goliath, Halfling, Human, Orc, and Tiefling**.

Store the name in `species` and mirror it in the existing `ancestry` property for compatibility with vault consumers. The NPC directory and Base display species. This policy does not change the PC roster.

The following are **campaign reassignment choices**, not official cross-system equivalents. Existing roles, motives, relationships, ages, and authored mechanics are retained; no species features or numerical bonuses are assigned automatically.

| Former NPC ancestry | Current 2024 species | NPCs |
|---|---|---|
| Galapa | Dwarf | [[Characters/NPCs/Brock Drungur\|Brock Drungur]] |
| Clank | Human | [[Characters/NPCs/Calev Marr\|Calev Marr]] |
| Faerie | Elf | [[Characters/NPCs/Dalia Quent\|Dalia Quent]] |
| Firbolg | Goliath | [[Characters/NPCs/Egbert Lusat\|Egbert Lusat]], [[Characters/NPCs/Taran Lusat\|Taran Lusat]] |
| Simiah | Human | [[Characters/NPCs/Helena Orst\|Helena Orst]] |
| Giant | Goliath | [[Characters/NPCs/Indra Karaf\|Indra Karaf]] |
| Ribbet | Halfling | [[Characters/NPCs/Mara Voss\|Mara Voss]] |
| Fungril | Gnome | [[Characters/NPCs/Orla Meren\|Orla Meren]] |
| Drakona | Dragonborn | [[Characters/NPCs/Senn Vale\|Senn Vale]] |
| Infernus | Tiefling | [[Characters/NPCs/Trine Baradur\|Trine Baradur]] |
| Katari | Elf | [[Characters/NPCs/Vesha Noll\|Vesha Noll]] |
| Half-elf | Elf | [[Characters/NPCs/Shanda Karth\|Shanda Karth]], [[Characters/NPCs/Veritas\|Veritas]] |

[[Characters/NPCs/Sara Lusat|Sara Lusat]] and [[Characters/NPCs/Tara Lusat|Tara Lusat]], whose ancestries were previously unspecified, are now Goliaths alongside Egbert and Taran. NPCs already described as Human, Elf, Gnome, or Orc retain those species. No sublineages or ancestry features have been chosen.

## Daggerheart

The [official SRD page](https://www.daggerheart.com/srd/) identifies v2.0 and its August 25, 2026 changelog. Existing vault profiles are **campaign homebrew**, not official published stat blocks. Their individual features have been preserved, not certified by this refactor.

- Resolve actions with the relevant trait and an independently selected Difficulty. Existing authored scene Difficulties remain proposals for their original tier.
- Use adversary roles and scene environments where helpful; narrative NPCs need no PC class build.
- Keep Hope, Fear, Stress, Evasion, damage thresholds, domains, Experiences, and range terms inside clearly labelled Daggerheart guidance.
- Do not cancel a success merely because it came with Fear. Use a supported consequence, change in the situation, or GM move according to the adopted rules.
- Character concepts may carry between games, but ancestry features, classes, advancement, resources, and numbers require a separately approved sheet.

## Disease & Supernatural Effects

[[Creatures and Afflictions/Frigid Woe|Frigid Woe]] and [[Creatures and Afflictions/The Rot|The Rot]] are distinct. Preserve their established fiction. Both need table-specific mechanical decisions before assigning progression, contagion, saves, cure requirements, or exact spell interactions. Frigid Woe's resistance to divine healing is established lore; no broader spell-immunity system is created here.

## Running Either System

1. Establish situation, participants, stakes, and visible clues.
2. Ask for the PC's approach; allow combat, negotiation, stealth, exploration, withdrawal, and unexpected alternatives.
3. Use only the selected system's resolution section. Essential leads should have multiple plausible routes.
4. Record what happened and what PCs learned. Planned scenes and suggested consequences are not history.

## Lore Labels

- **Canon:** established campaign facts.
- **Proposed / Tentative:** suggestions requiring a GM decision or play.
- **Rumor:** an in-world claim; its existence does not prove its contents.
- **Unknown / Needs decision / TBD:** deliberately unresolved information.
- **Planned:** future prep, not an event that already occurred.
- **Retired:** superseded material retained for provenance.

Use `lore-status` for a page-wide label only when useful. Mixed pages must label proposals and unknowns in their bodies; do not stamp every statement Canon.
