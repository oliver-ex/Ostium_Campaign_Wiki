function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!
  outerBlock.classList.toggle("is-collapsed")
  const content = outerBlock.getElementsByClassName("callout-content")[0] as HTMLElement
  if (!content) return
  const collapsed = outerBlock.classList.contains("is-collapsed")
  this.setAttribute("aria-expanded", String(!collapsed))
  content.style.gridTemplateRows = collapsed ? "0fr" : "1fr"
}

function setupCallout() {
  const collapsible = document.getElementsByClassName(
    `callout is-collapsible`,
  ) as HTMLCollectionOf<HTMLElement>
  for (const div of collapsible) {
    const title = div.getElementsByClassName("callout-title")[0] as HTMLElement
    const content = div.getElementsByClassName("callout-content")[0] as HTMLElement
    if (!title || !content) continue

    title.setAttribute("role", "button")
    title.tabIndex = 0
    title.setAttribute("aria-expanded", String(!div.classList.contains("is-collapsed")))
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        toggleCallout.call(title)
      }
    }
    title.addEventListener("keydown", onKey)
    window.addCleanup(() => title.removeEventListener("keydown", onKey))
    title.addEventListener("click", toggleCallout)
    window.addCleanup(() => title.removeEventListener("click", toggleCallout))

    const collapsed = div.classList.contains("is-collapsed")
    content.style.gridTemplateRows = collapsed ? "0fr" : "1fr"
  }
}

function revealAnchor() {
  if (!location.hash) return
  let target: HTMLElement | null
  try {
    target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  } catch {
    return
  }
  if (!target) return
  const open = (element: Element) => {
    if (element.classList.contains("is-collapsed")) {
      const title = element.querySelector<HTMLElement>(":scope > .callout-title")
      if (title) toggleCallout.call(title)
    }
  }
  let ancestor: HTMLElement | null = target
  while (ancestor) {
    open(ancestor)
    ancestor = ancestor.parentElement
  }
  // A Daggerheart section's public heading precedes its folded reference.
  const next = target.nextElementSibling
  if (next?.matches(".callout.is-collapsible")) open(next)
  target.scrollIntoView()
}
document.addEventListener("nav", () => {
  setupCallout()
  revealAnchor()
})
window.addEventListener("hashchange", revealAnchor)
