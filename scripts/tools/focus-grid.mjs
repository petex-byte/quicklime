#!/usr/bin/env node
/**
 * Draw a labelled percentage grid over a painting so you can read off focus
 * coordinates (x/y in % of the full canvas, 0,0 = top left).
 *
 *   node scripts/tools/focus-grid.mjs <slug|image-file> [--region x0,y0,x1,y1] [--step 5] [--out file.png]
 *
 * --region zooms into part of the canvas (all values in % of the full image),
 * but the labels still show full-canvas percentages, so the numbers you read
 * go straight into `focus: { x, y, scale }`.
 * Default output: .focus/<name>-grid.png
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, sharp, imageFile, esc } from "./_lib.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--") && !/^[\d.,]+$/.test(a));
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
if (!target) {
  console.error("Usage: focus-grid.mjs <slug|image-file> [--region x0,y0,x1,y1] [--step 5]");
  process.exit(1);
}
const file = fs.existsSync(target) ? target : imageFile(target).file;
const [x0, y0, x1, y1] = opt("region", "0,0,100,100").split(",").map(Number);
const step = Number(opt("step", x1 - x0 <= 40 ? 2 : 5));

const meta = await sharp(file).metadata();
const left = Math.round((meta.width * x0) / 100);
const top = Math.round((meta.height * y0) / 100);
const width = Math.round((meta.width * (x1 - x0)) / 100);
const height = Math.round((meta.height * (y1 - y0)) / 100);
const scale = Math.min(1, 1600 / Math.max(width, height));
const W = Math.round(width * scale);
const H = Math.round(height * scale);

const lines = [];
for (let p = Math.ceil(x0 / step) * step; p <= x1; p += step) {
  const X = ((p - x0) / (x1 - x0)) * W;
  const major = p % (step * 2) === 0;
  lines.push(`<line x1="${X}" y1="0" x2="${X}" y2="${H}" stroke="#c6f24e" stroke-opacity="${major ? 0.9 : 0.45}" stroke-width="1"/>`);
  if (major) lines.push(`<text x="${X + 3}" y="16" fill="#c6f24e" font-size="14" font-family="sans-serif" stroke="#000" stroke-width="3" paint-order="stroke">${p}</text>`);
}
for (let p = Math.ceil(y0 / step) * step; p <= y1; p += step) {
  const Y = ((p - y0) / (y1 - y0)) * H;
  const major = p % (step * 2) === 0;
  lines.push(`<line x1="0" y1="${Y}" x2="${W}" y2="${Y}" stroke="#c6f24e" stroke-opacity="${major ? 0.9 : 0.45}" stroke-width="1"/>`);
  if (major) lines.push(`<text x="3" y="${Y - 3}" fill="#c6f24e" font-size="14" font-family="sans-serif" stroke="#000" stroke-width="3" paint-order="stroke">${p}</text>`);
}
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${lines.join("")}<text x="${W - 6}" y="${H - 8}" text-anchor="end" fill="#fff" font-size="13" font-family="sans-serif" stroke="#000" stroke-width="3" paint-order="stroke">x across · y down · % of full canvas · ${esc(path.basename(file))}</text></svg>`);

fs.mkdirSync(path.join(ROOT, ".focus"), { recursive: true });
const out = opt("out", path.join(ROOT, ".focus", `${path.basename(target, path.extname(target))}-grid${x0 || y0 || x1 !== 100 || y1 !== 100 ? `-${x0}-${y0}-${x1}-${y1}` : ""}.png`));
await sharp(file).extract({ left, top, width, height }).resize(W, H).composite([{ input: svg }]).png().toFile(out);
console.log(out);
