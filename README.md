# Ostium Campaign Wiki

A comprehensive campaign wiki for Game Masters and co-DMs, edited in Obsidian and built with Quartz 4.5.2 for GitHub Pages. It includes spoilers, future plans, and unresolved lore. The fiction is system-neutral; concrete mechanics default to D&D 5e (2024), with separate Daggerheart guidance.

**A GitHub Pages URL is publicly accessible unless restrictions are independently configured and verified.** An unadvertised URL, a private repository, robots.txt, and noindex tags do not establish access control. Never add credentials, private contact details, or unrelated personal material.

## Edit the vault

Open `content/` in Obsidian. All campaign content is edited there. The homepage is `content/index.md`; start with the Campaign Dashboard, directories, timeline, and Plot Threads and Mysteries.

Copy the appropriate file from `content/Templates/` into its category: NPCs in `Characters/NPCs`, locations in `Locations`, factions in `Factions`, and sessions in `Session Logs`. Give it a descriptive title and correct `type`. Keep unknown details TBD. Do not maintain separate player/GM copies.

Every new NPC or location needs artwork in the same change. Find suitable existing art with documented reuse terms first; otherwise generate it. Embed the image and attribution, update the artwork manifest and credits, and retain source/license details or exact generation prompts. The artwork audit rejects NPCs and locations without publishable art; PC portraits require player approval.

Link established entities using `[[Locations/Old Ostium]]` or `[[Locations/Old Ostium|the old city]]`. Use explicit paths for ambiguous filenames. Images and handouts belong in `Attachments/`; embed an image with `![[Attachments/example.png]]` after adding that actual file.

Use Canon, Proposed/Tentative, Rumor, Unknown, Planned, and Retired labels. Mixed notes should label individual claims. Update PC knowledge and introduced clues after play; preparation is not history. Preserve player-owned choices.

Mechanics belong under separate `D&D 5e (2024)` and `Daggerheart` headings when useful. State sources/edition; identify homebrew; do not translate values directly. See `content/Rules/System Guide.md`.

## Build and publish

Node 24 and npm are used by CI:

```sh
npm ci
npm run check
npm run build
npm run serve
```

`npm run build` updates directory tables from the vault, audits links/frontmatter/assets, builds Quartz, and validates the output. Sidebar, search, breadcrumbs, backlinks, graph, table of contents, dark mode, tags, and responsive layouts use the existing Quartz components. `.base` files remain live views in Obsidian; generated Markdown directory tables also render on the site.

Commit reviewed changes and push to the repository's `main` branch. GitHub Actions builds the same Markdown and deploys Pages—no copying or sibling checkout is used. See [SETUP.md](SETUP.md) for the remaining remote/Pages configuration. `Publish Website.command` validates/builds and pushes already committed changes; it never stages unrelated files.

## Collaborate and troubleshoot

Use branches and pull requests for shared changes. Pull/rebase before editing, review canon changes together, and resolve conflicts in the original Markdown. Generated directories can be rebuilt with `npm run directories` after merging entity notes.

For broken links, run `npm run check` and correct the reported target or anchor. Do not create fictional entities merely to silence a missing link. For site failures, run `npm run build`, inspect the Actions build log, and confirm Pages uses GitHub Actions and the deployment base URL is correct. A failed deploy does not mean local content was lost.

The ignored `.vault-refactor/before.tar.gz` snapshot preserves the pre-refactor vault locally. It is not a second wiki or a deployment input. The migration inventory and validation details are in `references/Planning/Wiki Refactor Report.md`.

Quartz's reused framework code retains its MIT license in `LICENSE.txt`. Framework authorship is separate from campaign material.

## Repository layout and publication policy

- `content/`: authoritative campaign Markdown, images, nine Obsidian Bases, and authoring templates.
- `quartz/`: Quartz 4.5.2 source; upstream license is `QUARTZ-LICENSE.txt`.
- `quartz.config.ts` and `quartz.layout.ts`: native Quartz configuration and navigation.
- `scripts/`: directory generation, vault/artwork audits, and generated-site checks.
- `.github/workflows/deploy.yml`: one Actions publisher for `main`; pull requests validate without deploying.
- `publication-artwork.json`: superseded copyrighted originals remain excluded from Git and the public build. All 24 current NPC portraits are publishable; the active register has 50 artworks in 67 placements. Exact generation prompts and existing-artwork source terms are retained under `content/Attachments/Artwork/`.

Editor state, credentials, local backups, dependencies, and generated `public/` output are ignored. Every campaign Markdown page, including current templates and secrets, is included. Maintenance reports and retired templates/examples are retained under nonpublished `references/`. Quartz 4 displays the automatically generated directory tables in place of interactive `.base` embeds; the original Bases remain usable in Obsidian.

### Shared editing

Create a branch with `git switch -c campaign/my-update`, edit the original notes in `content/`, review `git diff`, commit, and push the branch. Open a pull request, resolve any failed checks, and merge into `main`. Collaborators can also edit Markdown through GitHub without installing Node or building locally. After a merge, pull the latest `main` before editing again.

**Edit in Obsidian → Commit → Push → Automatic deployment.** The workflow gets the actual Pages URL from GitHub and handles repository subpaths through `PAGES_BASE_URL`; do not replace it with an assumed account name.

### Updating Quartz

The framework is vendored from [Quartz v4.5.2](https://github.com/jackyzha0/quartz/tree/v4.5.2). On a branch, review the next Quartz 4 release, update framework files and dependencies, and preserve the configuration, layout, custom stylesheet, and `campaignPublication.ts` transformer. Update the lockfile, run `npm ci`, `npm run check`, and `npm run build`, then test search, directory navigation, artwork, and project-subpath navigation before merging. Do not replace the vault with upstream sample content. Quartz 5 requires a separate deliberate migration.

Compatible dependency security fixes have been applied. The current Quartz 4 dependency tree still reports 14 npm audit findings (six high); resolving all of them requires incompatible upstream dependency changes. Do not use `npm audit fix --force` without reviewing and testing those changes. The published site is static; these dependencies are primarily used during builds.

### Session navigation and page structure

Category links open their canonical directory; former folder URLs redirect there. Source filenames and aliases are retained. Directory comparison tables support text filtering and column sorting; location nesting uses only `parent-location` or `region`, with unresolved regions shown separately. Live Bases are unchanged.

The homepage leads with separate table histories and preparation. `status: blank` identifies an unfilled session preparation; it is not a completed event. Search ranks exact titles, exact aliases, partial title/alias matches, then full-text results, and shows campaign context.

`update-page-references.mjs` places full connections last in a folded callout. Location operational summaries and residents precede galleries. The publication transformer folds separate Daggerheart sections and removes duplicate source titles before TOC generation; headings and system distinctions remain intact. Graph components are absent from every layout. Editing resources and attribution remain available in a secondary disclosure.
