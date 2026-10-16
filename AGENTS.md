# AGENTS.md — Ostium Campaign Wiki

## Scope and source of truth

`content/` is the authoritative Obsidian vault and complete DM/co-DM wiki. The GM explicitly authorized consolidating former public and `_GM` material into a single publishable wiki. There is no spoiler boundary or paired-page/transclusion requirement. Do not restore the old split.

Use the existing Quartz 4.5.2 generator in this repository. `.github/workflows/deploy.yml` builds `content/` directly on pushes to `main`. Do not create a second content repository, sync script, database, or publishing pipeline. Root `content/index.md` is the homepage.

## Rules and identity

Prefer system-neutral fiction. Default concrete mechanics to D&D 5e (2024). Keep Daggerheart in separate labelled sections, using the campaign-adopted SRD v2.0. Never directly translate numeric values between systems. Preserve authored homebrew and label it accurately. Verify official rules/profile references or mark them Needs review.

Use Game Master (GM) generally and Dungeon Master (DM) for D&D-specific material. Use ancestry for narrative identity and species for the D&D mechanical choice. NPCs use species from the 2024 Player's Handbook list in `Rules/System Guide.md`; keep their existing ancestry property synchronized with species for vault compatibility. Preserve all PC identities, players, levels, classes, and approved choices. Do not choose statistics, subclasses, feats, spells, equipment, or speculative conversions for players.

## Canon and continuity

Do not rewrite established lore to fit a game's default setting. Preserve useful author prose and unique metadata. Mark Canon, Proposed/Tentative, Rumor, Unknown/TBD, Planned, and Retired appropriately; mixed notes need labels in their bodies. Do not invent major lore to fill gaps. New explicit GM instructions override older material.

Even though every campaign page is DM-facing, track what PCs actually know. Preparation, introduced clues, and completed events are different states. Do not mark an encounter as played without a report or explicit GM statement. Maintain `Planning/Plot Threads and Mysteries.md` and the timeline from actual outcomes. Keep the Rot and Frigid Woe distinct; do not invent an Auren/buried-god relationship.

Preserve Ostium's spelling. Keep Old/New Ostium morally complicated. Faction motives, resources, leadership, and pressures matter more than alignment labels. Adventures and encounters offer multiple approaches and contingent outcomes; essential revelations should not depend on one check.

## Files and links

Keep the current taxonomy and human-readable filenames. One canonical file per entity; merge overviews and secret detail instead of maintaining counterparts. Use explicit vault-relative wikilinks when basenames are ambiguous. Keep assets in `Attachments/`. Use the concise templates in `Templates/`; Legacy and Examples are retained references, not current canon. Keep useful aliases on renamed files.

Directory pages have generated tables maintained by `npm run directories`; edit entity metadata/prose, not the generated tables. Obsidian Bases remain live category views. Do not add elaborate mandatory schemas.

## Artwork

Every new NPC and location must include artwork in the same change: a portrait for an NPC and a suitable scene, concept illustration, or map for a location. First look for existing art that fits the established description and has documented reuse terms. If no suitable reusable art is available, generate it with the imagegen skill. Save assets under `content/Attachments/Artwork/`, embed them in the page, and update the artwork manifest and credits. Record the creator, source, license and changes for existing art; retain exact prompts and tool provenance for generated art. Artwork is a visual reference and does not establish new canon, equipment, or mechanics. Missing or withheld artwork cannot satisfy this requirement; PC portraits remain subject to player approval.

## Publication and safety

GitHub Pages must be treated as publicly accessible unless access restrictions are independently verified. Robots directives and an obscure URL are not security. Campaign spoilers are authorized; credentials, API keys, private contact details, unrelated personal documents, local editor state, and local backups are not.

Never publish `.obsidian`, `.trash`, `.env` files, `.vault-refactor/`, dependencies, or build caches. Review the diff before committing and preserve unrelated worktree changes. Do not change repository access/visibility without instruction. Do not stage, commit, or push merely to finish an editing task unless requested.

## Verification

Run `npm run check` and `npm run build`. The build regenerates directories, audits YAML/wikilinks/assets/credential patterns, builds Quartz, adds noindex directives, and checks generated pages, links, search, and inclusion. Check actual browser behavior when navigation or UI changes. Document unresolved rules and deployment limitations without inventing success.
