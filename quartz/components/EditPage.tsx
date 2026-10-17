import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/editPage.scss"

const repository = "https://github.com/oliver-ex/Ostium_Campaign_Wiki"

export default (() => {
  const EditPage: QuartzComponent = ({ fileData }) => {
    const source = fileData.relativePath
    const href = source
      ? `${repository}/edit/main/content/${source.split("/").map(encodeURIComponent).join("/")}`
      : `${repository}/tree/main/content`
    const generated = fileData.frontmatter?.type === "index" || !source
    return (
      <div class="page-edit">
        <a class="edit-page-button" href={href} target="_blank" rel="noopener noreferrer" aria-label="Edit this page on GitHub (opens in a new tab)">
          Edit this page
        </a>
        {generated && (
          <small>
            {source
              ? "Directory rows are generated; edit the linked entries to update them."
              : "This listing is generated; edit its source pages on GitHub."}
          </small>
        )}
      </div>
    )
  }
  EditPage.css = style
  return EditPage
}) satisfies QuartzComponentConstructor
