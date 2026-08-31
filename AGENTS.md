# AGENTS.md — Ostium Campaign Knowledge Base

This repository is the master knowledge base for the Ostium Daggerheart campaign. It is edited locally in Obsidian, versioned with Git, and the player-safe portion is intended to be published with Quartz to GitHub Pages.

These instructions are binding for any LLM, coding agent, automation, or human contributor working on the repository.

## 1. Core architecture

The Obsidian vault is the `content/` directory.

There are two information layers:

### Player-safe / publishable
Everything under `content/` **except** `content/_GM/`, `content/_Templates/`, `.obsidian/`, and any other directory explicitly excluded by Quartz.

Player-safe material is eligible to be:
- committed to the public GitHub repository;
- rendered on the player-facing Quartz site;
- edited by players through GitHub;
- treated as the canonical record of what the party can reasonably know.

### GM-only / secret
Everything under:

`content/_GM/`

is secret GM material.

It can contain:
- unrevealed lore;
- future story beats;
- NPC motives and secret alliances;
- hidden backstory;
- adversary and environment mechanics;
- encounter planning;
- campaign clocks;
- unrevealed maps and handouts;
- hidden solutions;
- faction agendas;
- possible future outcomes.

**Privacy invariant:** nothing in `content/_GM/` may ever be staged, committed, pushed, published, copied into a public file, or moved outside `_GM/` unless the GM explicitly instructs that the information has become player knowledge.

The repository `.gitignore` is the primary privacy barrier. Quartz exclusions are a secondary barrier only.

Never weaken, remove, rename, or work around the `_GM` ignore rule without explicit GM approval.

## 2. Source of truth

There should be only one canonical copy of player-known information.

For an entity with both public and GM information:
- the public file contains the player-known version;
- the GM file contains only GM-specific material plus a live Obsidian transclusion of the public file.

Example:

Public:
`content/Characters/NPCs/Taran Lusat.md`

GM:
`content/_GM/Characters/NPCs/Taran Lusat - GM.md`

The GM file should end with:

```markdown
# Player Knowledge

![[Characters/NPCs/Taran Lusat]]
```

Do not manually duplicate the contents of the public page into the GM page. The embed is the source of truth.

The same pattern applies to:
- player characters;
- NPCs;
- locations;
- factions;
- storylines;
- quests/adventures;
- session logs when a GM prep note is paired with a public session record.

## 3. Knowledge-state rules

Always decide which of these categories a fact belongs to before writing it:

1. **Public at campaign start**
   - common knowledge;
   - visible or mundane facts;
   - information a reasonably informed resident could know;
   - facts already established as known to the players.

2. **Revealed during play**
   - facts discovered by the party;
   - these should be promoted into the appropriate public page after the session.

3. **GM-only**
   - secrets;
   - hidden motives;
   - unrevealed explanations;
   - future events;
   - hidden stat blocks;
   - unrevealed locations;
   - concealed faction relationships.

4. **Tentative / not canon**
   - ideas under consideration;
   - alternative explanations;
   - unresolved design questions.

Never present tentative material as settled canon. Use explicit labels such as:
- `canon-status: canon`
- `canon-status: tentative`
- `canon-status: open-question`

When the GM supplies a newer instruction that conflicts with older material, the newest explicit instruction takes precedence. Preserve superseded ideas only if they remain useful as clearly labelled alternatives.

## 4. Reveal workflow

When the GM says that the players have learned something:

1. Identify the canonical public entity page.
2. Add the newly revealed information there in concise player-facing language.
3. Update related public pages if the revelation changes their known relationships.
4. Preserve still-secret context in the GM page.
5. Do not delete GM history that remains useful for planning.
6. Update appropriate wikilinks.
7. If the revelation creates a new public entity that previously existed only in `_GM/`, create the public counterpart from the correct template.
8. Add the standard transclusion to the GM counterpart.
9. If appropriate, update the relevant public session log.
10. Before committing, inspect the diff for accidental GM leakage.

A request such as “the players now know X” is authorization to publish **only X and its directly necessary context**, not every secret related to X.

## 5. File and naming conventions

Use human-readable filenames.

Public:
- `Taran Lusat.md`
- `Old Ostium.md`
- `The Protectorate.md`
- `The Prodigal Son.md`

GM:
- `Taran Lusat - GM.md`
- `Old Ostium - GM.md`
- `The Protectorate - GM.md`
- `The Prodigal Son - GM.md`

Do not use identical filenames for a public and GM version. The ` - GM` suffix keeps Obsidian autocomplete unambiguous.

Use title case for named entities. Use the exact canonical spelling **Ostium**. Never write “Ostrium.”

Top-level public taxonomy:

- `content/Characters/Player Characters/`
- `content/Characters/NPCs/`
- `content/Locations/`
- `content/Factions/`
- `content/Storylines/Acts/`
- `content/Storylines/Adventures/`
- `content/Session Logs/`
- `content/Rules/`
- `content/Attachments/`
- `content/_Templates/`

Mirrored private taxonomy:

- `content/_GM/Characters/Player Characters/`
- `content/_GM/Characters/NPCs/`
- `content/_GM/Locations/`
- `content/_GM/Factions/`
- `content/_GM/Storylines/Acts/`
- `content/_GM/Storylines/Adventures/`
- `content/_GM/Session Logs/`
- `content/_GM/Rules/`
- `content/_GM/Attachments/`

## 6. Wikilink rules

Use Obsidian wikilinks for established campaign entities.

Examples:

```markdown
[[Taran Lusat]]
[[Old Ostium]]
[[The Protectorate]]
[[Old Ostium Pump 7|Pump 7]]
```

Prefer the shortest unambiguous link target.

Public files must link only to other public files. Never create a public wikilink to a `- GM` file or anything under `_GM/`.

GM files may link to both public and GM files.

When referring to a secret relationship in a GM file, prefer the GM counterpart when the secret page is the useful destination:

```markdown
[[Taran Lusat - GM]]
```

When referring to the public identity or public knowledge, link to:

```markdown
[[Taran Lusat]]
```

Do not create links merely for decorative repetition. Link the first useful occurrence of an entity and important relationship references.

## 7. Frontmatter

Use YAML frontmatter consistently. Do not remove existing useful properties.

Common properties:
- `title`
- `type`
- `tags`
- `aliases`
- `status`
- `canon-status`
- `usual-location`
- `factions`
- `act`
- `tier`
- `public-counterpart`

Use plain strings or arrays. Keep values readable in Obsidian Properties.

Do not store secrets in frontmatter of public pages.

## 8. Daggerheart rules conventions

This campaign uses Daggerheart. Current mechanical terminology should follow the Daggerheart SRD v2.0 (August 25, 2026) unless the GM explicitly adopts a later rules update.

Official reference:
https://www.daggerheart.com/srd/

Do not import 5e assumptions into Daggerheart material.

### Player characters

A PC page may track:
- name and pronouns;
- ancestry;
- community;
- class;
- subclass;
- level;
- domains;
- six traits: Agility, Strength, Finesse, Instinct, Presence, Knowledge;
- Experiences and modifiers;
- Evasion;
- Armor Score and Armor Slots;
- Major and Severe damage thresholds;
- Hit Points;
- Stress;
- Hope;
- class feature;
- Hope Feature;
- active domain cards / loadout;
- vault cards;
- weapons;
- armor;
- inventory;
- gold;
- optional transformation or campaign-specific features.

Do not invent PC mechanical choices for a real player unless asked.

### NPCs and adversaries

NPCs do **not** need to be built as PCs. When an NPC needs mechanics, use a Daggerheart adversary-style block.

Relevant fields:
- Tier;
- Type: Bruiser, Horde, Leader, Minion, Ranged, Skulk, Social, Solo, Standard, or Support;
- Description;
- Motives & Tactics;
- Difficulty;
- Major and Severe thresholds;
- Hit Points;
- Stress;
- Attack Modifier;
- Standard Attack;
- optional Experiences;
- Features;
- Fear Features.

Narrative NPCs may have no adversary block until it is needed.

Homebrew stat blocks in this vault are campaign material, not official published Daggerheart stat blocks. Adjust them at the table as necessary.

### Locations and environments

When a location needs mechanics, use the Daggerheart environment model.

Relevant fields:
- Tier;
- Type: Exploration, Social, Traversal, or Event;
- one-line description;
- Impulses;
- Difficulty;
- Potential Adversaries;
- Features;
- feature questions / prompts.

A physical place can have several scene-specific environment blocks rather than one universal block.

### Adventure prep

Prefer Daggerheart scene prep over rigid encounter scripting:
- establish the dramatic question;
- identify likely environments;
- identify adversaries by role;
- record stakes and consequences;
- prepare clues and revelations;
- note Fear opportunities;
- preserve multiple player approaches;
- do not predetermine outcomes.

## 9. Canon rules for Ostium

The following are foundational unless the GM explicitly revises them:

- Ostium is spelled O-S-T-I-U-M.
- Old Ostium is the failing former capital; New Ostium emerged from a newer district and became the functioning successor city.
- The two cities are materially interdependent through the waterworks despite political separation.
- Old Ostium contains surviving communities, factions, raiders, infrastructure workers, and Rot-afflicted zones.
- Large military forces cannot safely operate in Old Ostium because of the Rot; small parties can sometimes enter and return. This unintentionally shields Old Ostium residents from major military retaliation.
- The Protectorate is the faction formerly called the Iron Tithe. Use **The Protectorate** going forward.
- The Jagged Blade, also called the Reavers of Old Ostium, grew from organized crime into a raiding and smuggling power.
- The Old Ostium Engineers keep infrastructure functioning on both sides and therefore serve as an important stabilizing force.
- The Hospital District is a survivor settlement and care hub that pays the Protectorate heavily for security.
- Taran Lusat is Egbert Lusat’s son, helps the Hospital District, knows civil engineering and the waterworks, and is in the early stages of Rot affliction.
- Brock Drungur is a veteran waterworks engineer and is crucial to the Pump 7 storyline.
- Pump 7 concludes Act I under the current campaign structure.

### Deep GM truth

Keep the following out of public files until revealed:
- the deepest waterworks connect to an interred ancient/outer/old god captured and wounded by the Titans;
- Titan-built structures around it function as binding, energy-routing, and/or wound-stabilizing works;
- the deepest system is effectively part of the being’s circulatory system;
- Ostium unknowingly benefited from the being’s supernatural vitality as an accelerant for creativity, imagination, prosperity, and technological achievement;
- the being is not the universal source of magic or reason;
- Old Ostium’s infrastructural collapse and sewage contamination have contributed to an infected divine wound;
- the Rot is connected to this infection and has unusually strong cognitive/mental manifestations because of the nature of the afflicted being;
- the being’s death would not make everyone mindless, but it could remove the extraordinary boon that helped make Ostium exceptional;
- a possible endgame includes curing the infection;
- the Rot King is a possible personification/agent of the infection and remains a campaign design element that may be developed rather than assumed in every scene.

Treat unresolved aspects of the deep lore as tentative rather than filling gaps with invented certainty.

## 10. Themes

Use these themes when they help, without forcing them into every note:

- Ostium means “door”: the city is a doorway into the campaign and into the megadungeon below.
- The Rot can symbolize stagnation and rot within a home or civic family.
- Descent underground/underwater can parallel descent into the unconscious and confrontation with repressed trauma.
- The city can operate as a loose metaphor for a mind: the deepest wound is not visible from the orderly surface.
- Old versus New Ostium should remain morally complicated rather than a simple good/evil split.
- Institutions often have defensible motives and harmful consequences at the same time.
- The final conflict should preserve meaningful choices rather than reduce the campaign to killing a single villain.

## 11. Faction-writing rules

Factions should contain:
- public identity and reputation;
- territory / usual operating locations;
- resources;
- goals;
- relationships;
- leadership hierarchy;
- open roles that can be populated later;
- GM-only actual agenda, pressures, secrets, and future moves.

Do not flatten factions into moral labels.

Examples:
- The Protectorate charges heavily because protection genuinely costs resources.
- New Ostium Government prioritizes New Ostium because housing and resources are actually constrained.
- The Merchants Guild is exploitative and consolidating, but its members are rational investors and organizers rather than cartoon villains.
- The Jagged Blade is the clearest predatory faction, but it also arose in a vacuum where desperate people sometimes relied on it.

## 12. Adventure-writing rules

Each adventure should make clear:
- hook;
- patron or initiating pressure;
- objective;
- stakes;
- key NPCs;
- locations;
- factions;
- likely scenes;
- obstacles;
- Daggerheart environment/adversary suggestions;
- discoveries;
- meaningful choices;
- at least two plausible resolutions when the premise allows;
- consequences and links to the larger campaign arc.

Do not write adventures as compulsory sequences. Use “likely scenes” rather than “Scene 1 must lead to Scene 2.”

Side quests should explain how they can alter:
- faction relationships;
- Old/New Ostium cooperation;
- access to resources;
- knowledge of the waterworks;
- the party’s reputation;
- progress toward deeper layers of the campaign.

## 13. Session workflow

Before a session:
- pull player edits;
- work from `_GM/` pages;
- use GM pages as the operational view because they embed current player knowledge;
- update NPC agendas and faction pressures;
- prepare only the scenes and mechanics likely to matter.

During a session:
- prefer quick links to `- GM` pages;
- record temporary notes in the GM session prep page;
- avoid editing public pages in a way that reveals information prematurely.

After a session:
1. summarize what actually happened;
2. create/update the public session log;
3. promote newly learned facts to public entity pages;
4. update NPC status, usual location, and relationships;
5. update faction consequences;
6. update adventure status;
7. update act/storyline progress;
8. preserve secret consequences in `_GM/`;
9. review broken links;
10. inspect the Git diff before pushing.

## 14. Player edits

Players may directly edit public Markdown through GitHub.

Treat player-authored additions as provisional until they are compatible with campaign canon.

Do not silently erase player contributions. If a contribution conflicts with canon:
- preserve the useful intent when possible;
- revise minimally;
- record the reason if the change is substantial.

Player character pages are primarily owned by their players. Do not rewrite characterization, backstory, ancestry, community, class, subclass, experiences, or other player choices without clear instruction.

## 15. New-entity procedure

When asked to create a new public-known entity:

1. Select the correct template.
2. Create the public page.
3. Create a GM counterpart when GM-only notes are useful.
4. Add the public transclusion to the GM counterpart.
5. Add relevant wikilinks to existing entities.
6. Update relevant index or faction/location references if needed.
7. Keep public and GM information strictly separated.
8. Check filenames and aliases for ambiguity.

When asked to create a new secret entity:
- create it only under `_GM/`;
- do not create a public placeholder merely to make an embed work;
- add a note in the GM page that the public counterpart should be created when discovered.

## 16. Handling undeveloped lore

Do not invent major canon to fill an empty field.

Use:
- `TBD`
- `Open question`
- `Tentative`
- `Needs decision`

for material the GM has not settled.

Minor connective details can be proposed when explicitly asked to develop material. Clearly distinguish proposals from established facts.

## 17. Git safety

Before any commit:
- run `git status`;
- verify no path under `content/_GM/` is staged;
- verify no secret attachment has been copied into `content/Attachments/`;
- inspect changes to `.gitignore`;
- inspect public files for leaked GM headings or secret text.

Never use force-add (`git add -f`) on ignored GM files.

Never run a command intended to expose ignored files.

Never change repository visibility or access controls unless the GM explicitly asks.

## 18. Quartz safety

Quartz is a publishing layer, not a privacy layer.

A public Git repository means committed content can be read even if Quartz hides it.

Therefore:
- secrets belong only in `_GM/`, which Git ignores;
- do not rely on `draft`, `unlisted`, encrypted-page settings, CSS hiding, or missing navigation links to protect core campaign secrets;
- `_Templates` and `.obsidian` may be ignored from the generated site for cleanliness, but they are not considered secret.

## 19. Quality standard

Write notes to be useful at the table.

Prefer:
- concise headings;
- short actionable bullets;
- explicit relationships;
- concrete motives;
- quick-reference fields near the top;
- links instead of repeated exposition;
- uncertain material clearly labelled.

Avoid:
- long atmospheric prose when a GM needs a fast answer;
- generic fantasy filler;
- lore invented solely to make a page look complete;
- duplicating the same fact across many files when a link is enough;
- rigid scripts that assume player decisions.

## 20. Final check for every change

Ask:

1. Is this fact public, secret, or tentative?
2. Is it in the correct file?
3. Does the GM page embed the public page rather than duplicate it?
4. Are the wikilinks useful and safe?
5. Is the Daggerheart terminology correct?
6. Does this contradict newer campaign canon?
7. Could this leak a spoiler through Git?
8. Is this concise enough to use during play?
