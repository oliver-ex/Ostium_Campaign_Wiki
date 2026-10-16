import { Date } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { campaignContext } from "../util/campaignContext"
import style from "./styles/contentMeta.scss"
export default (() => {
  const Meta = ({ fileData, cfg }: QuartzComponentProps) => (
    <p class="content-meta">
      {campaignContext(fileData.frontmatter || {})}
      {fileData.dates?.modified && (
        <small>
          {" "}
          · Modified <Date date={fileData.dates.modified} locale={cfg.locale} />
        </small>
      )}
    </p>
  )
  Meta.css = style
  return Meta
}) satisfies QuartzComponentConstructor
