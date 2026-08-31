# Ostium Campaign Wiki — Vault Manifest

This package is a master Obsidian campaign knowledge base designed for **Daggerheart**, with a player-safe public layer and a local GM-only layer.

## Architecture

- `content/` — open this folder as the Obsidian vault.
- `content/_GM/` — GM-only notes; ignored by Git and Quartz.
- `content/_Templates/` — Obsidian templates and template examples.
- Public entity pages are canonical player knowledge.
- Paired GM pages contain secret information and embed the public page at the bottom.
- `AGENTS.md` defines the rules Codex/LLMs should follow when maintaining the vault.

## Public categories

- Characters
  - Player Characters
  - NPCs
- Locations
- Factions
- Storylines
  - Acts
  - Adventures
- Session Logs
- Rules
- Attachments

## GM categories

The `_GM` tree mirrors the public taxonomy and additionally contains the GM Dashboard, session-prep notes, hidden locations, and unrevealed adventures.

## Canonical NPC pages included

- Egbert Lusat
- Taran Lusat
- Ulroc Grimscar
- Indra Karaf
- Trine Baradur
- Brock Drungur
- Mara Voss
- Senn Vale
- Calev Marr
- Vesha Noll
- Dalia Quent
- Helena Orst
- Orla Meren

Each has a public page and a paired GM page.

## Locations included

Public + GM pairs:
- Ostium
- Old Ostium
- New Ostium
- Old Ostium Pump 4
- Old Ostium Pump 7
- Old Ostium Waterworks
- Old Ostium Hospital District
- Old Ostium Town Hall
- Old Ostium University
- Old Ostium Slums
- New Ostium Market District
- New Ostium Town Hall

GM-only until discovered:
- Titan Works
- The Heart

## Factions included

- Old Ostium Engineers
- Old Ostium Hospital District — Community
- The Protectorate
- The Jagged Blade
- New Ostium Merchants Guild
- New Ostium Government

Each faction has a public page, GM page, leadership hierarchy, and unfilled leadership/operational roles that can become NPCs later.

## Story structure included

- Ostium Campaign — overall storyline
- Act I — Twin Cities
- Act II — Beneath the Waterworks (GM-only until appropriate)
- Act III — The Heart Below Ostium (GM-only until appropriate)

## Adventures included

Public + GM:
- The Prodigal Son

GM-only until revealed:
- Pump 7
- The Heist
- Rescue Mission
- Assassination
- The Best Defense
- Heist II
- Negotiations

## Templates included

- Player Character
- Player Character — GM
- NPC
- NPC — GM
- Location
- Location — GM
- Faction
- Faction — GM
- Storyline
- Storyline — GM
- Adventure — Public
- Adventure — GM
- Session Log
- Session Prep — GM

Every template has either a dedicated example or a canonical campaign page identified as its example in `_Templates/Examples/index.md`.

## Daggerheart support

Templates use Daggerheart-oriented fields, including PC traits, ancestry, community, class/subclass, domains, Experiences, Hope, Stress, Evasion, armour, thresholds, HP, domain cards, equipment, and gold. GM NPC notes support Daggerheart adversary fields, and GM location notes support Daggerheart environment fields.

Any authored adversary/environment numbers in this package are campaign-prep homebrew and should be adjusted to the party tier and actual table experience.

## Project/support files

- `AGENTS.md`
- `.gitignore`
- `.github/workflows/deploy.yml`
- `README.md`
- `SETUP.md`
- `PLAYER_EDITING_GUIDE.md`
- `quartz.ostium-settings.yaml`
- `.obsidian/` basic vault configuration

Quartz itself is intentionally not vendored in this ZIP; `SETUP.md` explains how to place the vault into the current official Quartz v5 TTRPG project so Quartz remains upgradeable.
