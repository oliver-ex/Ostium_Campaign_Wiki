# Player Editing Guide

The published Quartz site is the easiest place to **read** the campaign wiki. GitHub is where you **edit** it.

## Edit a page

1. Open the GitHub repository.
2. Open `content/`.
3. Find the appropriate `.md` file.
4. Click the pencil icon.
5. Edit the Markdown.
6. Preview if desired.
7. Commit the change.

Please edit only public material under `content/`.

Do not alter:
- `AGENTS.md`;
- `.gitignore`;
- Quartz configuration;
- `_Templates`;
- any repository infrastructure unless the GM asks.

You will not normally see `_GM` on GitHub because that folder is deliberately never uploaded.

## Links

Use Obsidian-style links:

```markdown
[[Taran Lusat]]
[[Old Ostium]]
[[Taran Lusat|Taran]]
```

If a name is ambiguous, use the path:

```markdown
[[Locations/Old Ostium Hospital District|Old Ostium Hospital District]]
[[Factions/Old Ostium Hospital District Community|Hospital District community]]
```

## Images

Player-safe images belong in:

`content/Attachments/`

Embed them with:

```markdown
![[image-name.jpg]]
```

## What to add

Good player additions include:
- character backstory or appearance;
- details everyone learned in play;
- session-log corrections;
- relationships the party has established;
- memorable quotes if your group wants them;
- player theories **clearly labelled as theories**.

Do not convert a theory into confirmed lore unless it was actually established in play.
