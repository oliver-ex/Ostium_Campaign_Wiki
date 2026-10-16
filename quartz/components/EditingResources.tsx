import { QuartzComponentConstructor } from "./types"
import { resolveRelative, FullSlug } from "../util/path"
export default (() => {
  return ({ fileData }) => (
    <details class="editing-resources">
      <summary>Editing resources</summary>
      <ul>
        {[
          ["Templates/Templates", "Current templates"],
          ["Attachments/Artwork-Credits", "Artwork credits"],
          ["Attachments/README", "Assets and handouts"],
        ].map(([slug, title]) => (
          <li>
            <a href={resolveRelative(fileData.slug!, slug as FullSlug)}>{title}</a>
          </li>
        ))}
      </ul>
    </details>
  )
}) satisfies QuartzComponentConstructor
