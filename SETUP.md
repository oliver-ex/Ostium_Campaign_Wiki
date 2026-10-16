# GitHub Pages setup

This repository now contains the existing Quartz 4.5.2 runtime and its lockfile. `content/` is the single complete campaign vault. The old sibling `Ostium_Wiki` checkout is no longer used by the source, launcher, or CI workflow; do not run its former sync publisher for this wiki.

## Local development

Install Node 24, then run:

```sh
npm ci
npm run check
npm run build
npm run serve
```

The checked-in base URL is `localhost:8080` for local preview. GitHub Actions obtains the real URL from `actions/configure-pages` and applies it only in CI before building. It works for repository Pages and account-root Pages without hardcoding this machine's path or account.

Dependencies are installed directly in this checkout with `npm ci`. Quartz is pinned to the official v4.5.2 source tag; there is no dependency on a sibling checkout.

## Connect and deploy

This local repository currently has no remote. Choose the intended GitHub repository before pushing. If reusing the old website repository, reconcile its existing generator/history deliberately rather than force-pushing or enabling two workflows against the same site. This refactor has not changed that remote repository or its deployed site.

1. Add the chosen repository as this checkout's `origin` using `git remote add origin <repository-url>`.
2. Review `git status` and the content diff, then commit the intended campaign and generator changes. Local backups, editor settings, and credentials must remain excluded.
3. In the chosen repository's Settings → Pages, select **GitHub Actions** as the source.
4. Push `main`. The workflow validates pull requests without deploying and deploys only main pushes or a manual workflow dispatch.
5. Review the deployment result in Actions, then verify the actual published URL, search, and representative campaign pages. Do not infer successful deployment from a local build.

No remote, GitHub authentication, or Pages access restrictions were configured by this refactor. Campaign spoilers are intentionally included. Treat the site as public unless access restrictions are separately verified. Robots/noindex merely request reduced indexing.

## One workflow

`.github/workflows/deploy.yml` is the single publisher. It installs locked dependencies, checks the vault and TypeScript, builds Quartz, validates the emitted pages/search/internal links, uploads `public/`, and deploys Pages. The workflow never copies content to another repository.

`Publish Website.command` runs the same checks/build and pushes already committed changes. It stops on a dirty worktree or missing origin rather than committing other people's edits.

## Current deployment handoff

The requested repository name is `Ostium_Campaign_Wiki`. Its owner and URL must come from the authenticated GitHub account; no account name is assumed. At this point the local build is validated, but GitHub authentication and a remote are still required. There is no successful Actions run or published Pages URL to report.

GitHub CLI was downloaded temporarily to `/tmp/ostium-gh/gh_2.102.0_macOS_arm64/bin/gh`. If this temporary directory has been cleared, install GitHub CLI again. Authenticate with `gh auth login --hostname github.com --git-protocol https --web`, then inspect `gh api user --jq .login` and `gh repo view OWNER/Ostium_Campaign_Wiki`.

For a new repository, use `gh repo create OWNER/Ostium_Campaign_Wiki --public --source=. --remote=origin`. For an existing repository, add its URL as origin, fetch, and reconcile history without force-pushing. Enable Actions-based Pages with `gh api --method POST repos/OWNER/Ostium_Campaign_Wiki/pages -f build_type=workflow` (use PUT if Pages already exists). Push `main`, watch the deployment using `gh run list` and `gh run watch RUN_ID --exit-status`, then retrieve the real URL using `gh api repos/OWNER/Ostium_Campaign_Wiki/pages --jq .html_url`.

Local verification covers 120 published Markdown pages and 237 generated HTML pages, with nine Bases preserved for Obsidian. The build audits generated links, anchors, assets, search inclusion, excluded references, and graph absence. Browser checks cover session shortcuts, canonical directories, title/alias search, filtering/sorting, geographic disclosures, folded references, keyboard activation, anchor reveal, and encounter layouts from 1920px to 390px. These checks do not by themselves establish remote deployment.

For browser regression checks, serve `public/` with clean `.html` resolution and directory slash redirects matching Pages, then run `node scripts/check-browser.cjs` with Playwright installed. `WIKI_PREVIEW_URL` selects the server (default `http://127.0.0.1:8883/`); `PLAYWRIGHT_MODULE` and `FIREFOX_EXECUTABLE` optionally select an existing installation. Screenshots are written to the system temporary directory.
