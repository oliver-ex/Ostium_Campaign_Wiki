import { QuartzTransformerPlugin } from "../types"
import publication from "../../../publication-artwork.json"
import path from "path"
import { visit } from "unist-util-visit"
import { Root } from "mdast"
import { VFile } from "vfile"

// Transform only the rendered view; the Obsidian vault remains authoritative.
export const CampaignPublication: QuartzTransformerPlugin = () => ({
  name: "CampaignPublication",
  markdownPlugins() {
    return [() => (tree: Root, file: VFile) => {
      // Remove the source title before TOC generation; ArticleTitle supplies it.
      const firstHeading = tree.children.findIndex(node => node.type === "heading" && node.depth === 1)
      if (firstHeading >= 0) tree.children.splice(firstHeading, 1)
      // Obsidian resolves these from the note's folder. Quartz's shortest-link
      // strategy expects vault-root paths, so resolve before CrawlLinks runs.
      visit(tree, ["image", "link"], node => {
        if ((node.type === "image" || node.type === "link") && /^\.\.?\//.test(node.url)) {
          node.url = path.posix.normalize(path.posix.join(
            path.posix.dirname(file.data.relativePath!), node.url,
          ))
        }
      })
    }]
  },
  textTransform(_ctx, source) {
    const withheld = publication.withheld
    let text = source.replace(/<!-- campaign-artwork:start -->[\s\S]*?<!-- campaign-artwork:end -->/g, block => {
      const item = withheld.find(a => block.includes(a.file.split("/").at(-1)!))
      return item ? `*Artwork reference: [${item.artist}](${item.source}). Image retained locally pending publication rights.*` : block
    })
    for (const item of withheld) {
      const basename = item.file.split("/").at(-1)!
      text = text.split("\n").map(line => line.startsWith("- **Local image:**") && line.includes(basename)
        ? "- **Publication:** Image withheld; original artist source linked above."
        : line).join("\n")
    }
    // Quartz 4 has no native Bases renderer. Directory tables are generated from
    // the same entities; preserve .base files and embeds unchanged in Obsidian.
    text = text.replace(/!?\[\[([^\]|]+)\.base(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g,
      () => "")
    text = text.replace(/\]\(Artwork\//g, "](Attachments/Artwork/")
    // Fold separate system sections without changing source headings or anchors.
    let foldedDepth = 0
    text = text.split("\n").flatMap(line => {
      const heading = line.match(/^(#{1,6}) (.+)$/)
      if (foldedDepth && ((heading && heading[1].length <= foldedDepth) || line.startsWith("<!-- page-connections:start -->"))) foldedDepth = 0
      if (!foldedDepth && heading && /Daggerheart/.test(heading[2])) {
        foldedDepth = heading[1].length
        return [line, "", `> [!info]- ${heading[2]}`]
      }
      return [foldedDepth ? "> " + line : line]
    }).join("\n")
    return text
  },
})
