#!/usr/bin/env node
/**
 * Writes smaller copies of every painting in public/art for phones:
 * public/art/w800/<file> and public/art/w1400/<file>. Runs before each build;
 * skips files that are already up to date. Output is gitignored.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ART = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../public/art");
const WIDTHS = [800, 1400];

const files = (await fs.readdir(ART)).filter((f) => f.endsWith(".jpg"));
let made = 0;
for (const w of WIDTHS) {
  await fs.mkdir(path.join(ART, `w${w}`), { recursive: true });
  for (const f of files) {
    const src = path.join(ART, f);
    const out = path.join(ART, `w${w}`, f);
    const [s, o] = await Promise.all([fs.stat(src), fs.stat(out).catch(() => null)]);
    if (o && o.mtimeMs >= s.mtimeMs) continue;
    await sharp(src).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(out);
    made++;
  }
}
console.log(`make-sizes: ${made} written, ${files.length} paintings`);
