import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = (process.env.AUDIT_BASE_URL || "https://mrtmaterials.com").replace(/\/$/, "");
const outputDir = "audit-artifacts";
const failures = [];
const results = [];

await mkdir(outputDir, { recursive: true });

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) failures.push(`Sitemap returned HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const statusChecks = await Promise.all(urls.map(async (url) => {
  try {
    const response = await fetch(url, { redirect: "follow" });
    return { url, status: response.status };
  } catch (error) {
    return { url, status: 0, error: String(error) };
  }
}));

for (const check of statusChecks) {
  if (check.status !== 200) failures.push(`${check.url} returned HTTP ${check.status}`);
}

const browser = await chromium.launch({ headless: true });
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "desktop", width: 1366, height: 768 },
];
const paths = ["/vi", "/vi/products", "/vi/about", "/vi/industries", "/vi/contact", "/en"];

for (const viewport of viewports) {
  for (const pathname of paths) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    const consoleErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(900);
    const metrics = await page.evaluate(() => ({
      h1Count: document.querySelectorAll("h1").length,
      h1Text: document.querySelector("h1")?.textContent?.trim() || "",
      innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      pageTransition: Boolean(document.querySelector(".page-transition")),
    }));
    const name = `${viewport.name}-${pathname.replace(/^\//, "").replaceAll("/", "-") || "root"}`;
    if (pathname === "/vi" || pathname === "/vi/products" || pathname === "/vi/about") {
      await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: false });
    }
    const row = { name, status: response?.status() || 0, consoleErrors, ...metrics };
    results.push(row);
    if (row.status !== 200) failures.push(`${name}: navigation returned HTTP ${row.status}`);
    if (row.h1Count !== 1) failures.push(`${name}: expected one H1, found ${row.h1Count}`);
    if (!/\s/.test(row.h1Text)) failures.push(`${name}: H1 text has no normal whitespace`);
    if (row.scrollWidth > row.innerWidth + 1) failures.push(`${name}: horizontal overflow ${row.scrollWidth - row.innerWidth}px`);
    if (row.pageTransition) failures.push(`${name}: full-screen page transition is present`);
    if (consoleErrors.length) failures.push(`${name}: ${consoleErrors.length} console error(s)`);
    await page.close();
  }
}

await browser.close();

const generatedAt = new Date().toISOString();
const report = [
  "# MRT Materials monthly website audit",
  "",
  `- Generated: ${generatedAt}`,
  `- Base URL: ${baseUrl}`,
  `- Sitemap URLs checked: ${urls.length}`,
  `- Browser checks: ${results.length}`,
  `- Failures: ${failures.length}`,
  "",
  "## Failures",
  "",
  ...(failures.length ? failures.map((failure) => `- ${failure}`) : ["- None"]),
  "",
  "## Browser results",
  "",
  "| Check | HTTP | H1 | Overflow | Console errors |",
  "| --- | ---: | ---: | ---: | ---: |",
  ...results.map((result) => `| ${result.name} | ${result.status} | ${result.h1Count} | ${Math.max(0, result.scrollWidth - result.innerWidth)}px | ${result.consoleErrors.length} |`),
  "",
].join("\n");

await writeFile(`${outputDir}/monthly-audit.md`, report, "utf8");
await writeFile(`${outputDir}/monthly-audit.json`, JSON.stringify({ generatedAt, baseUrl, failures, statusChecks, results }, null, 2), "utf8");

console.log(report);
if (failures.length) process.exitCode = 1;
