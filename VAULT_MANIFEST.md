# Ostium Campaign Wiki — Vault Manifest

The authoritative Obsidian vault is `content/`. It is now one comprehensive DM/co-DM wiki. All campaign lore, secrets, preparation, and planned events are eligible for the same GitHub Pages site. The former `_GM` / public split was explicitly retired by the GM.

## Structure

- `content/index.md` — wiki homepage.
- `Characters/NPCs/` — 22 canonical NPC entries and directory.
- `Characters/Player Characters/` — eight canonical PCs and roster.
- `Locations/` — 16 locations and directory.
- `Factions/` — six factions and directory, including the Shattered Axe.
- `Storylines/` — campaign spine, three act outlines, and eight prepared adventures.
- `Session Logs/` — immediate Road to Ostium prep, earlier prep, and the existing unfilled session record.
- `World Lore/` — Auren history and relative campaign timeline.
- `Creatures and Afflictions/` — Frigid Woe and the Rot, kept distinct.
- `Rules/` — dual-system policy and preserved campaign mechanics.
- `Planning/` — dashboard, mysteries, refactor report, migration inventory, and retired earlier report.
- `Encounters/` — encounter navigation; existing encounter material remains in its canonical session/adventure pages.
- `Items and Artifacts/` — category ready for individually established items; no new item canon invented.
- `Attachments/` — campaign assets, Carl's proposed letter handout, artwork credits, sourcing backlog, and local artwork.
- `Templates/` — 12 current templates; Legacy and Examples retain prior references without becoming campaign canon.

All paths above are relative to `content/`. Obsidian Bases continue to work; Markdown directory tables are regenerated from entity files by `npm run directories` and during builds.

## Artwork

All 44 NPC/location/faction pages now display existing, non-AI artwork: 39 distinct works and 49 placements across 22 NPCs, 16 locations, and six factions. The collection includes 24 historical paintings/illustrations and 15 fantasy illustrations. The four Lusat pages share a labelled Goliath species reference; individual portraits remain a sourcing refinement.

`Attachments/Artwork Credits.md` records artists, original sources, rights information, and interpretation notes. `Attachments/Artwork Sourcing Backlog.md` records remaining portrait refinements. The asset register retains dimensions, hashes, coverage, and source metadata. Classical paintings are preferred where suitable; nonhuman NPCs use fantasy illustrations. Incidental appearance, gear, buildings, and symbols do not establish canon. The public build excludes 14 modern images whose publication rights have not been established, retaining their artist-source links; 25 artworks with recorded terms are published. Local Obsidian images remain intact.

Ordinary relative Markdown image paths work with the vault. The built site adds responsive framing, intrinsic dimensions, click-to-open image links, and lazy loading for secondary art. `scripts/check-artwork.mjs` verifies local files, dimensions, recorded hashes, required credit fields, source availability, and placements during checks/builds.

## Rules and continuity

System-neutral fiction is preferred. D&D 5e (2024) is the mechanical default. Daggerheart has separate labelled guidance; existing numeric profiles are retained campaign homebrew and are not directly converted.

PC identities, players, ancestries, classes, and levels remain unchanged. Unselected subclasses, feats, spells, statistics, and speculative conversions remain TBD. Half-elf's mechanical source requires player/GM confirmation without changing identity.

Use Canon, Proposed/Tentative, Rumor, Unknown, Planned, and Retired labels. Mixed notes keep their existing distinctions in the body. Preparation is not completed history. PC knowledge and introduced clues remain tracked within the unified wiki.

## Publishing

This repository contains the reused Quartz 4.5.2 runtime, dependency lockfile, one active `quartz.config.ts`, and one `.github/workflows/deploy.yml` publisher. GitHub Actions builds the Markdown directly on `main` pushes. There is no copy step or active dependency on the old sibling site checkout.

The local checkout currently has no remote; connecting the intended GitHub repository and enabling Pages with GitHub Actions remain setup steps. No successful live deployment is claimed.

The site includes full-text search, sidebar navigation, breadcrumbs, backlinks, graph, table of contents, dark mode, tags, recent notes, and responsive layouts. Sitemap/RSS and optional social image generation are disabled. Robots/noindex discourage indexing but do not restrict access.

Treat GitHub Pages as publicly accessible unless independent access controls are verified. Campaign spoilers are authorized; credentials, private contact details, unrelated documents, `.obsidian`, `.trash`, local backups, dependencies, and build caches are not site content.

## Validation and preservation

`npm run check` audits the vault and TypeScript. `npm run build` regenerates directories, audits source links/YAML/assets, builds Quartz, adds indexing directives, and checks every emitted local link/asset/anchor plus source-page/search inclusion.

The migration inventory records all 124 original file paths and their canonical destinations. The ignored `.vault-refactor/before.tar.gz` contains the exact pre-refactor content snapshot. No original working-tree lore was discarded, no PC statistics were invented, and all 56 existing numeric NPC/environment lines were preserved. Retired instructions are provenance, not current policy.

See `content/Planning/Wiki Refactor Report.md` for browser results, unresolved continuity decisions, and deployment limitations.
