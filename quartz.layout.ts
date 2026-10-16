import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.EditingResources(),
    Component.Explorer({
      filterFn: node => !["tags", "Templates", "Attachments", "Items-and-Artifacts"].includes(node.slugSegment),
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      sortFn: (a, b) => {
        const order = ["Planning", "World-Lore", "Locations", "Characters", "Factions", "Storylines", "Session-Logs", "Encounters", "Items-and-Artifacts", "Creatures-and-Afflictions", "Rules", "Templates", "Attachments"]
        const ai = order.indexOf(a.slugSegment), bi = order.indexOf(b.slugSegment)
        return Number(b.isFolder) - Number(a.isFolder) || (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.displayName.localeCompare(b.displayName)
      },
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.EditingResources(),
    Component.Explorer({
      filterFn: node => !["tags", "Templates", "Attachments", "Items-and-Artifacts"].includes(node.slugSegment),
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      sortFn: (a, b) => {
        const order = ["Planning", "World-Lore", "Locations", "Characters", "Factions", "Storylines", "Session-Logs", "Encounters", "Items-and-Artifacts", "Creatures-and-Afflictions", "Rules", "Templates", "Attachments"]
        const ai = order.indexOf(a.slugSegment), bi = order.indexOf(b.slugSegment)
        return Number(b.isFolder) - Number(a.isFolder) || (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.displayName.localeCompare(b.displayName)
      },
    }),
  ],
  right: [],
}
