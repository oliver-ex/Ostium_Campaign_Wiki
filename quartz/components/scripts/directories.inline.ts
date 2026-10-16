document.addEventListener("nav", () => {
  const article = document.querySelector('article[data-page-type="index"]')
  if (!article) return
  // Each generated comparison table retains its semantic headers and rows.
  for (const table of article.querySelectorAll<HTMLTableElement>("table")) {
    if (!table.tBodies.length || table.tBodies[0].rows.length < 2) continue
    const rows = Array.from(table.tBodies[0].rows)
    const controls = document.createElement("div")
    controls.className = "directory-controls"
    const filterLabel = document.createElement("label")
    filterLabel.textContent = "Filter rows "
    const filter = document.createElement("input")
    filter.type = "search"
    filter.placeholder = "Name, role, location…"
    filterLabel.append(filter)
    const sortLabel = document.createElement("label")
    sortLabel.textContent = "Sort by "
    const select = document.createElement("select")
    Array.from(table.tHead?.rows[0].cells || []).forEach((cell, i) => {
      for (const [direction, suffix] of [
        [1, "A–Z"],
        [-1, "Z–A"],
      ] as const) {
        const option = document.createElement("option")
        option.value = `${i}:${direction}`
        option.textContent = `${cell.textContent} (${suffix})`
        select.append(option)
      }
    })
    sortLabel.append(select)
    const count = document.createElement("span")
    count.setAttribute("role", "status")
    const update = () => {
      const query = filter.value.toLocaleLowerCase().trim()
      rows.forEach((row) => {
        row.hidden = !row.textContent?.toLocaleLowerCase().includes(query)
      })
      const [column, direction] = select.value.split(":").map(Number)
      rows.sort(
        (a, b) =>
          direction *
          (a.cells[column]?.textContent || "").localeCompare(
            b.cells[column]?.textContent || "",
            undefined,
            { numeric: true },
          ),
      )
      rows.forEach((row) => table.tBodies[0].append(row))
      count.textContent = `${rows.filter((row) => !row.hidden).length} of ${rows.length}`
    }
    filter.addEventListener("input", update)
    select.addEventListener("change", update)
    controls.append(filterLabel, sortLabel, count)
    const wrapper = table.closest(".table-container") || table
    wrapper.before(controls)
    update()
  }
  // Nested lists are readable without JavaScript; native disclosure adds expansion.
  const heading = article.querySelector("#geographic-hierarchy")
  if (heading) {
    let sibling = heading.nextElementSibling
    while (sibling && sibling.id !== "all-locations") {
      if (sibling.tagName === "UL") {
        sibling.classList.add("directory-tree")
        for (const li of sibling.querySelectorAll("li")) {
          const childList = Array.from(li.children).find((e) => e.tagName === "UL")
          if (!childList) continue
          const details = document.createElement("details")
          const summary = document.createElement("summary")
          while (li.firstChild && li.firstChild !== childList) summary.append(li.firstChild)
          details.append(summary, childList)
          li.append(details)
        }
      }
      sibling = sibling.nextElementSibling
    }
  }
})
