#!/usr/bin/env node
/**
 * Numbered thumbnail grid of every image in a folder (or a list of files),
 * with sizes printed to the console. Use it to identify uploaded files that
 * arrive with generic names before importing them with import-art.mjs.
 *
 *   node scripts/tools/contact-sheet.mjs <folder|files...> [--cols 4]
 *
 * Output: .focus/contact-<n>.jpg (16 tiles per sheet)
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, sharp } from "./_lib.mjs";

const args = process.argv.slice(2);
const cols = Number(args.includes("--cols") ? args[args.indexOf("--cols") + 1] : 4);
const files = args
  .filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--cols")
  .flatMap((a) => (fs.statSync(a).isDirectory() ? fs.readdirSync(a).map((f) => path.join(a, f)) : [a]))
  .filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))
  .sort();
fs.mkdirSync(path.join(ROOT, ".focus"), { recursive: true });

const T = 240;
const tiles = [];
for (const [i, f] of files.entries()) {
  const m = await sharp(f).metadata();
  console.log(`${String(i).padStart(3)}  ${m.width}×${m.height}  ${f}`);
  const tag = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="30"><rect width="${T}" height="30" fill="#000"/><text x="6" y="22" font-size="18" font-family="sans-serif" fill="#c6f24e">${i} · ${m.width}×${m.height}</text></svg>`);
  tiles.push(await sharp(f).resize(T, T, { fit: "contain", background: "#222" }).composite([{ input: tag, top: 0, left: 0 }]).toBuffer());
}
for (let s = 0; s * 16 < tiles.length; s++) {
  const part = tiles.slice(s * 16, s * 16 + 16);
  const rows = Math.ceil(part.length / cols);
  const out = path.join(ROOT, ".focus", `contact-${s + 1}.jpg`);
  await sharp({ create: { width: cols * T, height: rows * T, channels: 3, background: "#000" } })
    .composite(part.map((b, i) => ({ input: b, left: (i % cols) * T, top: Math.floor(i / cols) * T })))
    .jpeg({ quality: 75 })
    .toFile(out);
  console.log(`→ ${path.relative(ROOT, out)}`);
}
