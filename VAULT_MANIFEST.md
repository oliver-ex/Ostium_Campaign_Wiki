# Ostium Campaign Wiki — Vault Manifest

The authoritative Obsidian vault is `content/`. It is now one comprehensive DM/co-DM wiki. All campaign lore, secrets, preparation, and planned events are eligible for the same GitHub Pages site. The former `_GM` / public split was explicitly retired by the GM.

## Structure

- `content/index.md` — wiki homepage.
- `Characters/NPCs/` — 24 canonical NPC entries and directory, including Aaron Fortisax and Lieutenant Mira Vey.
- `Characters/Player Characters/` — eight canonical PCs and roster.
- `Locations/` — 16 locations and directory.
- `Factions/` — seven factions and directory, including the Shattered Axe and New Ostium City Guard.
- `Storylines/` — campaign spine, three act outlines, and nine prepared adventures.
- `Session Logs/` — separate `Steven's Table/` and `Oliver's Table/` histories and preparation; unassigned opening preparation remains at the root. The duplicate Prodigal Son prep is merged into its adventure; the generic empty Session Log 0 is retired. Steven has five completed summaries and blank Session 6 prep; Oliver has a completed Session 1 summary and a Session 2 outline. The canonical Road to Ostium adventure is in `Storylines/Adventures/`.
- `World Lore/` — Auren history and relative campaign timeline.
- `Creatures and Afflictions/` — Frigid Woe and the Rot, kept distinct.
- `Rules/` — dual-system policy and preserved campaign mechanics.
- `Planning/` — dashboard, mysteries, refactor report, migration inventory, and retired earlier report.
- `Encounters/` — encounter navigation; existing encounter material remains in its canonical session/adventure pages.
- `Items and Artifacts/` — category ready for individually established items; no new item canon invented.
- `Attachments/` — campaign assets, Carl's proposed letter handout, artwork credits with remaining portrait choices, and local artwork.
- `Templates/` — 12 current templates in secondary Editing resources; retired templates and examples live outside publication in `references/Templates/`.

All paths above are relative to `content/`. Obsidian Bases continue to work; Markdown directory tables are regenerated from entity files by `npm run directories` and during builds.

## Artwork and Quick References

All 24 canonical NPCs have publishable portraits, including Aaron Fortisax, Arla Gerrin, and Mira Vey (generated campaign portraits). The active register contains 50 artworks and 67 placements across the 46 NPC/location/faction pages; 20 portraits are AI-generated campaign references with saved prompts and tool provenance. The former local-only portraits have been superseded. Calev and Carl have age-appropriate classical replacements. Location mood boards retain existing classical and fantasy art with artist credits and recorded terms.

All 32 character pages have a generated quick reference: key information on the left and portrait or player-approved-portrait placeholder on the right in Quartz, stacking on mobile. Headers use the original metadata and portrayal notes. New NPC age estimates are labelled; PC metadata and player-owned choices remain unchanged.

All 16 location pages have generated NPC tables drawn from current-location records, including contained districts/work sites at city level. Deceased NPCs, unknown locations, and planned visitors are excluded. A work site is not a confirmed home. Table-specific movements must be recorded before updating shared current locations.

`npm run directories` regenerates character headers, location resident tables, and category indexes. Edit source metadata, portraits, and prose rather than generated blocks. Artwork credits, hashes, dimensions, and provenance remain in `Attachments/Artwork/`; source images with no recorded reuse terms remain excluded in `publication-artwork.json`. Every new NPC and location must include publishable artwork in the same change: seek suitable existing art with recorded reuse terms first, otherwise generate it and save exact prompts and tool provenance. The artwork audit rejects unregistered NPCs/locations and registered pages without publishable art. PC portraits still require player approval.

## Page Design and Connections

Campaign entities and session records have short, authored `description` properties rendered directly below their titles. Factions lead with pressures, linked operating areas, and NPC roles; characters retain their portrait cards; locations show visual inspiration directly below the opening description, then the operational summary. Faction/location illustrations and session-reference tables can be expanded when needed. The homepage provides task-based navigation, and directories use compact tables.

`npm run directories` also maintains `page-summary` and `page-connections` blocks. Descriptions are edited in frontmatter; faction operating areas and NPC role tables remain authored Markdown. Connections come from authored wikilinks, excluding generated blocks so links cannot recursively invent relationships. Adventure/encounter references work in both directions; location pages also collect faction references. Session mentions retain table/status labels and do not establish appearances, PC knowledge, or completed events. Unchanged generated pages are not rewritten, reducing cloud-sync churn. Proton Drive `Edit conflict` copies are excluded from vault reads, Git, and Quartz publication; preserved copies live under the ignored `.vault-refactor/edit-conflicts-2026-10-16/`. Current templates explain the layout and editing workflow; Legacy and Examples remain nonpublished references. Full connections are collapsed at the end of each entity page; geographic containment remains distinct from mentions.

## Rules and continuity

System-neutral fiction is preferred. D&D 5e (2024) is the mechanical default. Daggerheart has separate labelled guidance; existing numeric profiles are retained campaign homebrew and are not directly converted.

PC identities, players, ancestries, classes, and levels remain unchanged. Unselected subclasses, feats, spells, statistics, and speculative conversions remain TBD. Half-elf's mechanical source requires player/GM confirmation without changing identity.

Use Canon, Proposed/Tentative, Rumor, Unknown, Planned, and Retired labels. Mixed notes keep their existing distinctions in the body. Preparation is not completed history. PC knowledge and introduced clues remain tracked within the unified wiki.

## Publishing

This repository contains the reused Quartz 4.5.2 runtime, dependency lockfile, one active `quartz.config.ts`, and one `.github/workflows/deploy.yml` publisher. GitHub Actions builds the Markdown directly on `main` pushes. There is no copy step or active dependency on the old sibling site checkout.

The repository remote is `oliver-ex/Ostium_Campaign_Wiki`. GitHub Actions deploys the Quartz site to https://oliver-ex.github.io/Ostium_Campaign_Wiki/ on pushes to `main`. Local edits must be reviewed, committed, and pushed to reach the site.

The site includes full-text search, sidebar navigation, breadcrumbs, backlinks, desktop table of contents, dark mode, filterable directories, nested geography, campaign metadata, and responsive layouts. Sitemap/RSS and optional social image generation are disabled. Robots/noindex discourage indexing but do not restrict access.

Treat GitHub Pages as publicly accessible unless independent access controls are verified. Campaign spoilers are authorized; credentials, private contact details, unrelated documents, `.obsidian`, `.trash`, local backups, dependencies, and build caches are not site content.

## Validation and preservation

`npm run check` audits the vault and TypeScript. `npm run build` regenerates directories, audits source links/YAML/assets, builds Quartz, adds indexing directives, and checks every emitted local link/asset/anchor plus source-page/search inclusion.

The migration inventory records all 124 original file paths and their canonical destinations. The ignored `.vault-refactor/before.tar.gz` contains the exact pre-refactor content snapshot. No original working-tree lore was discarded, no PC statistics were invented, and all 56 existing numeric NPC/environment lines were preserved. Retired instructions are provenance, not current policy.

See `references/Planning/Wiki Refactor Report.md` for browser results, unresolved continuity decisions, and deployment limitations.

## Vault Cleanup — 2026-10-16

Six stale faction conflict copies were compared against canonical authored content and removed from the vault; all their authored lines were already retained. The empty Session Log 0 was retired, Prodigal Son prep was merged into its canonical adventure with former titles retained as aliases, and remaining portrait choices were consolidated into Artwork Credits. Removed originals and a hash inventory are preserved outside the vault under the ignored `.vault-refactor/cleanup-2026-10-16/`. Completed reports, substantive preparation, live category views, Legacy templates, Examples, and maintenance reports remain outside `content/` under `references/`; actual campaign session reports remain published.
