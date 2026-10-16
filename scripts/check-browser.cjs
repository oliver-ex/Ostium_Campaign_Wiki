const { firefox } = require(process.env.PLAYWRIGHT_MODULE || "playwright")
const assert = require("node:assert/strict")
;(async () => {
  const browser = await firefox.launch({
    headless: true,
    executablePath: process.env.FIREFOX_EXECUTABLE || undefined,
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  const go = async (slug) => {
    await page.goto((process.env.WIKI_PREVIEW_URL || "http://127.0.0.1:8883/") + slug, {
      waitUntil: "networkidle",
    })
  }
  await go("index.html")
  assert.equal(await page.locator(".graph").count(), 0)
  assert.equal(await page.locator("article h1").count(), 0)
  assert(
    await page
      .locator(".launchpad")
      .innerText()
      .then((t) => t.includes("Oliver") && t.includes("Steven")),
  )
  await page
    .locator(".explorer a.folder-title")
    .filter({ hasText: /^Locations$/ })
    .click()
  await page.waitForURL("**/Locations/Locations")
  await page.waitForSelector(".directory-controls")
  assert.equal(await page.locator(".directory-controls").count(), 1)
  await page.locator(".directory-controls input").fill("hospital")
  assert.equal(await page.locator("article tbody tr:visible").count(), 1)
  await page.locator(".directory-controls input").fill("")
  await page.locator(".directory-controls select").selectOption("0:-1")
  assert.match(await page.locator("article tbody tr").first().innerText(), /Torney Isles/)
  assert((await page.locator(".directory-tree details").count()) > 2)
  await page.locator(".search-button").click()
  await page.locator(".search-bar").fill("Carl Marsh")
  await page.waitForTimeout(400)
  assert.match(
    await page.locator(".result-card").first().getAttribute("id"),
    /Characters\/NPCs\/Carl-Marsh/,
  )
  assert.match(await page.locator(".result-card").first().innerText(), /Life status: alive/)
  await page.keyboard.press("Escape")
  await page.locator(".search-button").click()
  await page.locator(".search-bar").fill("Session 6")
  await page.waitForTimeout(400)
  assert.match(await page.locator(".result-card").first().innerText(), /Steven.*blank/s)
  await page.keyboard.press("Escape")
  await go("Locations/index.html")
  await page.waitForURL("**/Locations/Locations")
  await go("Characters/NPCs/Carl-Marsh.html")
  const connected = page
    .locator("article .callout")
    .filter({ has: page.locator(".callout-title-inner", { hasText: /^Connected Pages\s*$/ }) })
    .first()
  assert(await connected.evaluate((e) => e.classList.contains("is-collapsed")))
  assert.equal(await connected.locator(":scope > .callout-content").isVisible(), false)
  await connected.locator(":scope > .callout-title").focus()
  await page.keyboard.press("Enter")
  assert.equal(await connected.locator(":scope > .callout-content").isVisible(), true)
  await page.keyboard.press("Space")
  assert.equal(await connected.locator(":scope > .callout-content").isVisible(), false)
  const dagger = page
    .locator("article .callout")
    .filter({ has: page.locator(".callout-title-inner", { hasText: /Daggerheart/ }) })
    .first()
  assert(await dagger.evaluate((e) => e.classList.contains("is-collapsed")))
  await go("Locations/Ostium.html#features")
  assert(await page.locator("#features").isVisible())
  for (const width of [1920, 1440, 1280, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await go("Encounters/Roadside-Ambush.html")
    const sizes = await page
      .locator('[data-callout="battlefield"] .table-container')
      .evaluateAll((es) => es.map((e) => ({ client: e.clientWidth, scroll: e.scrollWidth })))
    const columns = await page
      .locator('[data-callout="battlefield"] > .callout-content')
      .evaluate((e) => getComputedStyle(e).gridTemplateColumns.split(" ").length)
    if (width === 1920) assert.equal(columns, 2, "Wide desktop retains map beside roster")
    if (width === 1280) assert.equal(columns, 1, "Laptop stacks before roster cramps")
    await page
      .locator('[data-callout="statcards"] > .callout-content > .callout > .callout-title')
      .first()
      .click()
    assert(await page.locator('[data-callout="statcards"] .callout-content').last().count())
    assert(
      sizes.every((s) => s.scroll <= s.client + 1),
      `${width}: roster overflow ${JSON.stringify(sizes)}`,
    )
    assert(
      await page
        .locator("article img")
        .first()
        .evaluate((e) => e.complete && e.naturalWidth > 0),
    )
    await page.screenshot({ path: `/tmp/ostium-layout-${width}.png`, fullPage: true })
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.locator(".darkmode").click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: "/tmp/ostium-layout-dark.png", fullPage: true })
  assert.deepEqual(errors, [])
  await browser.close()
  console.log("Browser checks passed")
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
