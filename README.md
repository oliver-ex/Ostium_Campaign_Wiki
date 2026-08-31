# Ostium Campaign Wiki

This package is the master Obsidian knowledge base for the **Ostium** Daggerheart campaign.

## Architecture at a glance

- Open `content/` as the Obsidian vault.
- Public/player-safe notes live in the normal folders under `content/`.
- GM-only notes live under `content/_GM/`.
- `.gitignore` prevents `_GM/` from being committed to the public repository.
- GM entity pages embed their corresponding public pages, so the GM sees secret prep and current player knowledge together.
- Quartz can publish the public side as a wiki.
- Players can edit public Markdown directly through GitHub.

## Start here

1. Read `SETUP.md`.
2. Open `content/` in Obsidian.
3. Open `content/_GM/GM Dashboard.md`.
4. Read `AGENTS.md` before allowing Codex or another agent to edit the project.
5. Do not remove the `_GM` rule from `.gitignore`.

## Current campaign material

The vault includes:
- public and GM character templates;
- Daggerheart PC and adversary fields;
- public and GM location templates with Daggerheart environment prep;
- public and GM faction templates;
- storyline/act templates;
- adventure/quest templates;
- session log and GM session prep templates;
- canonical starting pages for the requested Ostium locations, factions, NPCs, acts, and adventures;
- extra supporting NPCs and faction hierarchies;
- a GM dashboard;
- a rules/conventions page;
- example files for every template.

## Important privacy note

The intended GitHub Pages deployment uses a public repository. Anything actually committed to that repository must be assumed public, even if Quartz does not link to it.

`content/_GM/` is deliberately ignored by Git. Keep all unrevealed material and secret attachments there.
