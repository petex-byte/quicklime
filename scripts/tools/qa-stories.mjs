#!/usr/bin/env node
/**
 * Browser QA for story pages against a running site (npm run build && npm start).
 * At phone (390×844) and desktop (1440×900) width it scrolls through every
 * section and reports: text that runs into the reserved bottom band, text
 * that runs off the right edge, page errors and failed requests.
 *
 *   node scripts/tools/qa-stories.mjs [--base http://localhost:3000] [slug...]
 *   (no slugs = every registered story; add --shots to save phone screenshots to .focus/)
 *
 * Needs Playwright. In Claude cloud sessions it is installed globally and
 * Chromium lives in /opt/pw-browsers; elsewhere run `npx playwright install chromium`.
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, registeredSlugs, globalModule } from "./_lib.mjs";

const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:3000";
const shots = args.includes("--shots");
const listed = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--base");
const slugs = listed.length ? listed : registeredSlugs();

let pw;
try {
  pw = await import("playwright");
} catch {
  pw = await import(path.join(globalModule("playwright"), "index.mjs"));
}
const browser = await pw.chromium.launch();
const problems = [];
const errors = [];
fs.mkdirSync(path.join(ROOT, ".focus"), { recursive: true });

for (const [vw, vh] of [
  [390, 844],
  [1440, 900],
]) {
  const page = await browser.newPage({ viewport: { width: vw, height: vh } });
  page.on("pageerror", (e) => errors.push(`${vw}px ${page.url()}: ${e.message}`));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${vw}px ${r.status()} ${r.url()}`));
  for (const slug of slugs) {
    await page.goto(`${base}/artists/${slug}`, { waitUntil: "networkidle" });
    const n = await page.locator("[data-index]").count();
    if (!n) problems.push(`${vw}px ${slug}: no story sections (is the story registered?)`);
    for (let i = 0; i < n; i++) {
      await page.evaluate((i) => document.querySelector(`[data-index="${i}"]`).scrollIntoView(), i);
      await page.waitForTimeout(150);
      const r = await page.evaluate((i) => {
        const sec = document.querySelector(`[data-index="${i}"]`);
        const band = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--band")) * 16;
        const box = sec.getBoundingClientRect();
        let over = 0;
        let wide = 0;
        sec.querySelectorAll("p,h1,blockquote,li,a").forEach((el) => {
          const e = el.getBoundingClientRect();
          if (!e.height) return;
          over = Math.max(over, e.bottom - (box.top + box.height - band));
          wide = Math.max(wide, e.right - innerWidth);
        });
        return { over: Math.round(over), wide: Math.round(wide) };
      }, i);
      if (r.over > 0) problems.push(`${vw}px ${slug} section ${i}: text ${r.over}px into the bottom band`);
      if (r.wide > 0) problems.push(`${vw}px ${slug} section ${i}: text ${r.wide}px off the right edge`);
      if (shots && vw === 390) await page.screenshot({ path: path.join(ROOT, ".focus", `qa-${slug}-${i}.png`) });
    }
  }
  const sideways = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (sideways > 0) problems.push(`${vw}px: page scrolls sideways by ${sideways}px`);
  await page.close();
}
await browser.close();

console.log(`Checked ${slugs.length} stories at 390px and 1440px.`);
console.log(problems.length ? `Problems:\n  ${problems.join("\n  ")}` : "No layout problems.");
console.log(errors.length ? `Errors:\n  ${errors.join("\n  ")}` : "No page errors.");
process.exit(problems.length || errors.length ? 1 : 0);
