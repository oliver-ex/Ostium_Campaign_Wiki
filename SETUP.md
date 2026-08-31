# Setup — Obsidian + GitHub + Quartz 5 + GitHub Pages

This ZIP contains the campaign vault and project-specific files. It intentionally does **not** bundle the Quartz source code itself; use the current official Quartz v5 template so Quartz can be upgraded normally.

Quartz 5 documentation: https://quartz.jzhao.xyz/
Daggerheart SRD: https://www.daggerheart.com/srd/

## 1. Extract this ZIP

Put the extracted folder somewhere permanent, for example:

`Documents/Ostium_Campaign_Wiki/`

Do not put the vault inside a folder that another sync service may simultaneously rewrite while Git is operating unless you are comfortable resolving conflicts.

## 2. Open the vault in Obsidian

In Obsidian:

**Open another vault → Open folder as vault**

Choose:

`Ostium_Campaign_Wiki/content`

The `_GM` folder is visible to you locally. It will not be published.

## 3. Check Obsidian

The package includes basic settings:
- shortest-path wikilinks;
- automatic link updates;
- attachments in `Attachments`;
- Templates core plugin folder set to `_Templates`.

If Obsidian asks whether to trust the vault, review the files and enable the built-in Templates plugin if needed.

## 4. Create the GitHub/Quartz repository

Create a new repository from the official Quartz v5 GitHub template.

Use the **TTRPG** configuration when running Quartz setup. The current Quartz TTRPG template builds on Obsidian compatibility.

After cloning the Quartz repository locally, run:

```powershell
npm i
npx quartz create --template ttrpg --strategy new --baseUrl YOUR_USERNAME.github.io/YOUR_REPO
npx quartz plugin install --from-config
```

Do not include `https://` in `baseUrl`.

## 5. Copy this package into the Quartz repository

Replace the Quartz-generated `content/` directory with this package's `content/`.

Also copy:
- `AGENTS.md`
- `.gitignore` rules from this package
- `.github/workflows/deploy.yml`

Do **not** accidentally overwrite Quartz's dependency files (`package.json`, `package-lock.json`, `quartz/`, etc.).

## 6. Apply the Ostium Quartz settings

After `npx quartz create --template ttrpg`, edit the generated `quartz.config.yaml`.

Set:
- `pageTitle` to `Ostium`;
- `analytics` to `null` unless you deliberately want analytics;
- `locale` as desired;
- `baseUrl` to your GitHub Pages path;
- add the following to `ignorePatterns` without deleting existing entries:

```yaml
- _GM
- _Templates
- .obsidian
```

`_GM` is still protected primarily by `.gitignore`; the Quartz ignore is only a second barrier.

## 7. Verify privacy before first commit

From the repository root:

```powershell
git status
```

You should **not** see anything under:

`content/_GM/`

as untracked or staged.

Test:

```powershell
git check-ignore -v "content/_GM/GM Dashboard.md"
```

Git should report that the file is ignored by the `_GM` rule.

## 8. Preview locally

Run:

```powershell
npx quartz build --serve
```

Open:

`http://localhost:8080`

Check that:
- public NPCs and locations render;
- wikilinks work;
- `_GM` pages do not appear;
- `_Templates` does not appear;
- search/backlinks work.

## 9. Push and enable GitHub Pages

Commit your public project files and push them.

In GitHub:
**Repository → Settings → Pages → Source → GitHub Actions**

The included `.github/workflows/deploy.yml` is based on Quartz's current GitHub Pages deployment pattern. If Quartz changes its recommended workflow later, prefer the workflow from the current Quartz documentation.

## 10. Invite players

Invite each player's GitHub account as a collaborator.

Tell players:
1. browse the published Quartz wiki to read;
2. use GitHub to edit;
3. edit only files inside `content/` public folders;
4. never create or edit `_GM`;
5. commit directly only if you are comfortable with that trust model.

A player can open a `.md` file on GitHub, click the pencil icon, edit, and commit.

## 11. Your normal GM workflow

Before prep or a session:

```powershell
npx quartz sync
```

or use normal Git pull/push commands if you prefer.

Open GM pages such as:

`_GM/Characters/NPCs/Taran Lusat - GM.md`

The page shows your secret notes followed by an embed of the current public `Taran Lusat.md`.

After a session:
- update the public session log;
- promote newly discovered facts from GM-only knowledge to public pages;
- update GM consequences;
- push the public changes.

## 12. Codex

Open the project root (the directory containing `AGENTS.md`) in VS Code/Codex.

Codex should be limited to this project workspace.

The `AGENTS.md` file defines:
- privacy boundaries;
- folder conventions;
- Daggerheart mechanical conventions;
- reveal workflow;
- wikilink rules;
- how paired public/GM pages work.

A useful instruction after a session is:

> Update the vault from these session notes. Promote only information the players actually learned to public pages; keep all unrevealed consequences in `_GM`. Update the session log, NPCs, locations, factions, and active storylines, then report every public file changed.

## 13. Optional automation

If you later install Obsidian Git, configure it conservatively:
- pull on startup or manually before play;
- avoid very frequent automatic commits;
- inspect conflicts before resolving them;
- never alter the `_GM` ignore rule.

The simplest reliable workflow remains: pull before editing, push after editing.
