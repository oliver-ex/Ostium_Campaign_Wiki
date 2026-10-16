---
title: Wiki Refactor Report
type: report
status: complete
tags: [maintenance]
---

# Wiki Refactor Report

## Outcome

One comprehensive DM/co-DM vault now builds directly into one Quartz 4.5.2 website. The former public/GM split is removed. The existing campaign fiction, PC roster, and authored Daggerheart mechanics are preserved; D&D 5e (2024) is the concrete mechanical default.

No commit, push, remote change, repository-access change, or live deployment was performed. Existing unrelated worktree changes were retained. The previous live website is unchanged.

## Structure & Content Inventory

The familiar Characters, Locations, Factions, Storylines, Session Logs, and Attachments folders remain. World Lore, Creatures and Afflictions, Rules, Planning, Encounters, Items and Artifacts, and Templates provide focused navigation without renumbering the whole vault.

- **21 NPCs at the time of this refactor**; a subsequent explicit GM canon revision merged the unnamed antidote-benefactor placeholder into [[Characters/NPCs/Egbert Lusat|Egbert Lusat]], leaving **20 canonical NPCs at that stage**. Adding Sara and Tara Lusat subsequently brought the current directory to **22 NPCs**.
- **16 locations**, including Mistbreak, Torney Isles, Titan Works, and the Heart.
- **Six factions**, including the Shattered Axe with its established leadership.
- **Eight PCs**, with the supplied ancestry, class, level, and player retained exactly.
- **Eight prepared adventures**, three act outlines, the existing session documents, and the Road to Ostium prep.
- **12 current templates**, plus preserved retired templates/examples.
- **124 Markdown pages and nine Obsidian Bases**; all Markdown pages are included in site output and full-text indexing.

[[Planning/Migration Inventory|Migration Inventory]] lists all 124 original file paths and their destinations. There are 100 path changes, 24 unchanged original paths, and 15 merged destinations. Paired overview/detail pages and duplicate navigation resolve to a single canonical page. All internal references were updated; former names remain useful aliases where appropriate.

Exact pre-refactor bytes are preserved locally in the ignored `.vault-refactor/before.tar.gz`; prior root guidance is also saved there. This snapshot is not a publication input or a maintained second wiki. Retired templates and the earlier update report remain accessible as labelled provenance, not active policy.

## New and Updated Reference Pages

- [[index|Wiki homepage]] and [[Planning/Campaign Dashboard|Campaign Dashboard]].
- [[Characters/NPCs/NPCs|NPC Directory]], [[Locations/Locations|Location Directory]], [[Factions/Factions|Faction Directory]], and [[Characters/Player Characters/Player Characters|PC Roster]].
- [[World Lore/Campaign Timeline|Campaign Timeline]] and [[Planning/Plot Threads and Mysteries|Plot Threads and Mysteries]].
- [[Rules/System Guide|System Guide]], [[Creatures and Afflictions/The Rot|The Rot]], and expanded [[Creatures and Afflictions/Frigid Woe|Frigid Woe]].
- [[Templates/Templates|Templates]], with NPC, Location, Faction, PC, Quest, Encounter, Session Preparation, Session Report, Item/Artifact, Creature/Affliction, Lore Entry, and Campaign Mystery templates.
- Landing pages for World Lore, Planning, Encounters, Items/Artifacts, Creatures/Afflictions, and Rules.

No unknown item, creature, date, completed session, or additional canonical NPC was invented to fill a category. Proposed incidental people remain in the existing improvisation toolkit.

## Rules and Terminology Changes

- Neutral campaign fiction is primary; general guidance uses Game Master, while D&D sections use Dungeon Master where relevant.
- D&D species fields coexist with unchanged narrative ancestry identities. No ancestry restriction or speculative conversion overrides the roster.
- All eight PCs have a D&D 2024 sheet section with unknown options blank/TBD. Original Daggerheart fields are retained under an optional section, and character-concept adaptations require player approval.
- All NPC/location entries have separate D&D guidance. Existing Daggerheart adversary/environment profiles remain separately labelled campaign homebrew.
- All eight adventures retain their flexible narrative structures and Daggerheart scene kits, with individual D&D approach suggestions and proposed scenario DCs.
- Session preparation supports either system; Road to Ostium has a specific D&D approach table alongside independent Daggerheart guidance. Post-session work records actual events and PC knowledge in the same wiki.
- All **56 original numeric NPC/environment lines** were checked against the snapshot and retained. Features were preserved, not newly certified as official rules.
- No D&D creature statistics, official profile, spell list, feat, subclass, disease save, contagion rule, or progression clock was invented. No direct numeric translation was made.

The [[Rules/System Guide|System Guide]] links the checked [2024 rules](https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game), [character-creation compatibility guidance](https://www.dndbeyond.com/sources/dnd/br-2024/creating-a-character), and [official Daggerheart SRD](https://www.daggerheart.com/srd/). The latter identifies v2.0 and the August 25, 2026 changelog. Individual homebrew features still need table review before use.

## Navigation and Publishing Changes

- Migrated the prior Quartz 5 setup to the official Quartz 4.5.2 source tag, preserving campaign content and the upstream MIT license.
- `quartz.config.ts` is the single active configuration; the former settings fragment is a retired pointer.
- `scripts/update-directories.mjs` maintains Markdown directory tables from entity files. Bases remain live Obsidian views; the website does not depend on a functioning external database or manually copied index.
- `scripts/check-vault.mjs` checks source YAML, wikilinks/anchors, local assets, obsolete counterpart metadata, and credential patterns.
- `scripts/validate-site.mjs` checks every rendered local link/anchor/asset and source-page/search inclusion, including the former GM-only content.
- `scripts/postbuild.mjs` adds robots.txt and noindex directives. Sitemap/RSS and optional social-image generation are disabled. Search, sidebar, breadcrumbs, backlinks, graph, table of contents, tags, recent notes, dark mode, and responsive layouts remain enabled.
- Simplified the inherited theme to readable default Quartz styling rather than keeping low-contrast colored text. This does not change content or add a UI framework.
- `.github/workflows/deploy.yml` validates pull requests and builds/deploys main pushes through GitHub Pages. The actual Pages base URL comes from [GitHub's configure-pages action](https://github.com/actions/configure-pages/blob/main/action.yml).
- `Publish Website.command` checks/builds and pushes already committed changes from this repository. It no longer syncs, stages, commits, or pushes a separate sibling site.
- `README.md`, `SETUP.md`, `VAULT_MANIFEST.md`, `AGENTS.md`, and the retained editing-guide entry point describe the new workflow. `.gitignore` now protects local editor settings, backups, credentials, dependencies, and output rather than campaign spoilers.

## Validation Results

- `npm run check`: source audit and strict TypeScript check passed.
- `npm run build`: Quartz compiled all 124 Markdown pages; no filtering of campaign pages. Generated output contains 232 HTML pages including alias, folder, and tag pages.
- Source audit: no unresolved or ambiguous wikilinks, missing anchors, broken Markdown asset paths, or detected credential patterns in the campaign text.
- Site audit: all emitted local links, anchors, and assets resolve; every source Markdown page appears in the content/search index. No editor directories or backup folders appear in output.
- Chromium desktop: homepage, full-text search for Mistbreak, result navigation, 21-row NPC directory, breadcrumbs, backlinks, graph, dark-mode toggle, and the formerly GM-only Heart page passed.
- Chromium mobile at 390×844: homepage and search for Frigid Woe passed with no horizontal page overflow. Screenshots were visually reviewed for readability.
- Browser run: no page errors and no failed HTTP requests.
- Launcher passes shell syntax validation. Workflow structure includes separate build/deploy jobs, Pages artifact upload, deployment permissions, and pull-request checks without deployment.
- Diff whitespace check passed; intentional Markdown hard breaks use explicit backslashes.
- No campaign image files existed to migrate; generated framework image/icon assets and their requests were verified. Carl's letter remains a Markdown handout.

## Deployment Status and Remaining Setup

**Local implementation and validation complete; live deployment pending.** This checkout has no Git remote. No remote or GitHub Pages access settings were changed. Follow `SETUP.md` to choose/connect the intended repository, commit reviewed changes, select GitHub Actions as the Pages source, and push main.

The old sibling site's publisher is no longer used by this vault. If reusing that remote, reconcile its history and retire its old publishing workflow deliberately; do not force-push or run two publishers against one Pages site. Its website-only Session Log 1 was inspected and is an unfilled template duplicate, not an additional supplied campaign report. Both empty records were retired; future reports use [[Templates/Session Report|Session Report]].

The local dependency symlink was used only to reuse installed packages for verification. Fresh clones run `npm ci`; the checked-in build has no dependency on the sibling checkout.

GitHub Pages must be treated as publicly accessible unless independent restrictions are verified. Campaign spoilers are intentionally included. Robots/noindex are requests to indexers, not security mechanisms. The four previously tracked Obsidian configuration files were removed from Git's index while retaining their local copies; their deletion from tracking is the only staged change. New editor settings, dependencies, and the migration snapshot are ignored. No credentials or private contact material were found in the site inputs.

## Lore and Rules Issues Kept Unresolved

- **Half-elf rules source:** Adran's identity remains unchanged; confirm the chosen older-book species rules and 2024 compatibility choices. Do not silently replace the ancestry.
- **Diseases:** Frigid Woe and Rot stay distinct. Symptoms already used, progression, spell interactions, dose requirements, and treatment specifics still require GM/table input.
- **Ancient history:** no Auren/Titan or Auren/buried-god connection has been established. The two timeline strands are not dated relative to each other.
- **Benefactor — resolved by subsequent explicit GM revision:** Egbert is the patron and has two sons plus daughter [[Characters/NPCs/Sara Lusat|Sara Lusat]]. The latest GM instruction names his wife [[Characters/NPCs/Tara Lusat|Tara Lusat]] and establishes her death from the Rot of Old Ostium. The former placeholder is merged into his canonical entry. The earlier only-surviving-child and wife-Frigid-Woe descriptions are superseded; Taran's own Rot affliction remains established.
- **Leadership:** Korok leads the immediate ambush; Ulroc remains faction boss and Berrik the existing raiding captain.
- **Session order:** Road to Ostium is the immediate premise; Prodigal Son remains an optional/later prepared hook. No session date/number or completed event has been fabricated.
- **Suggested lore:** Mistbreak details, surviving Auren evidence, Veritas's possible research, new dialogue, encounter staging, and future consequences remain Tentative/Proposed.

## Separate Future Improvements

After the next session, add the actual recap and introduced-clue ledger, choose any needed verified combat profiles, and resolve courier/stockpile logistics. Confirm any access-control requirements independently before relying on a hosted site as private. Assign previous/next session navigation only after chronology is established.
