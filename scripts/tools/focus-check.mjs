#!/usr/bin/env node
/**
 * Render what each beat will actually show: the whole painting, then one
 * phone-shaped crop per beat at its focus point and zoom, labelled with the
 * beat number and caption. Use it to confirm every zoom lands on the detail
 * the copy talks about.
 *
 *   node scripts/tools/focus-check.mjs <slug> [slug...]     # one sheet per story
 *   node scripts/tools/focus-check.mjs --all                # every registered story
 *   node scripts/tools/focus-check.mjs rembrandt --desktop  # 1440×900 instead of a 390×844 phone
 *
 * The crops use the same maths as StoryPage.tsx: the canvas is sized
 * width = max(100vw, 100svh × aspect), centred, then scaled by `scale` and
 * panned so the focus point sits mid-screen. Anything outside the painting
 * shows as black, exactly as the reader would see the page behind it, so a
 * black edge in a crop means the focus is too close to the painting's edge
 * for that zoom.
 *
 * Output: .focus/check-<slug>.jpg
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, sharp, readBeats, imageFile, registeredSlugs, esc } from "./_lib.mjs";

const args = process.argv.slice(2);
const desktop = args.includes("--desktop");
const slugs = args.includes("--all") ? registeredSlugs() : args.filter((a) => !a.startsWith("--"));
if (!slugs.length) {
  console.error("Usage: focus-check.mjs <slug> [slug...] | --all");
  process.exit(1);
}
fs.mkdirSync(path.join(ROOT, ".focus"), { recursive: true });

const [VW, VH] = desktop ? [1440, 900] : [390, 844]; // viewport the crops model
const TW = desktop ? 480 : 300; // tile width
const TH = Math.round((TW * VH) / VW);

for (const slug of slugs) {
  const { file, record } = imageFile(slug);
  if (!fs.existsSync(file)) {
    console.log(`✗ ${slug}: no image at ${path.relative(ROOT, file)}`);
    continue;
  }
  const m = await sharp(file).metadata();
  const label = (t) =>
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="34"><rect width="${TW}" height="34" fill="#000" fill-opacity="0.75"/><text x="8" y="23" font-size="15" font-family="sans-serif" fill="#c6f24e">${esc(t)}</text></svg>`);
  const tiles = [await sharp(file).resize(TW, TH, { fit: "contain", background: "#111" }).composite([{ input: label(record?.standIn ? "whole · STAND-IN" : "whole"), top: 0, left: 0 }]).toBuffer()];

  for (const b of readBeats(slug)) {
    if (b.scale <= 1) continue;
    // Canvas size in CSS px, then the slice of it the viewport shows at this zoom,
    // converted to image pixels.
    const aspect = m.width / m.height;
    const cw = Math.max(VW, VH * aspect);
    const ch = cw / aspect;
    const w = Math.round(((VW / cw) * m.width) / b.scale);
    const h = Math.round(((VH / ch) * m.height) / b.scale);
    const left = Math.round((m.width * b.x) / 100 - w / 2);
    const top = Math.round((m.height * b.y) / 100 - h / 2);
    // Intersect with the painting; pad the rest with black.
    const ix = Math.max(0, left), iy = Math.max(0, top);
    const iw = Math.min(m.width, left + w) - ix, ih = Math.min(m.height, top + h) - iy;
    const crop = await sharp({ create: { width: w, height: h, channels: 3, background: "#000" } })
      .composite(iw > 0 && ih > 0 ? [{ input: await sharp(file).extract({ left: ix, top: iy, width: iw, height: ih }).toBuffer(), left: ix - left, top: iy - top }] : [])
      .png()
      .toBuffer();
    tiles.push(
      await sharp(crop)
        .resize(TW, TH, { fit: "fill" })
        .composite([{ input: label(`${b.i} ${b.caption}`.slice(0, 34)), top: 0, left: 0 }])
        .toBuffer(),
    );
  }
  const out = path.join(ROOT, ".focus", `check-${slug}${desktop ? "-desktop" : ""}.jpg`);
  await sharp({ create: { width: TW * tiles.length + 4 * (tiles.length - 1), height: TH, channels: 3, background: "#000" } })
    .composite(tiles.map((t, i) => ({ input: t, left: i * (TW + 4), top: 0 })))
    .jpeg({ quality: 72 })
    .toFile(out);
  console.log(`✓ ${path.relative(ROOT, out)}`);
}
