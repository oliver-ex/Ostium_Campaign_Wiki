// @ts-ignore
import directoryScript from "../scripts/directories.inline"
import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString} data-page-type={String(fileData.frontmatter?.type || "")}>{content}</article>
}

Content.afterDOMLoaded = directoryScript

export default (() => Content) satisfies QuartzComponentConstructor
