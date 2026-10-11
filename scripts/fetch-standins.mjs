#!/usr/bin/env node
/**
 * PREVIEW ONLY: fill stories that have no image yet with a stand-in work by
 * the same artist (scripts/standins.json), so the design can be reviewed
 * with real paintings. Each record is tagged `standIn`, which the story page
 * shows as a label. Never overwrites a real (non-stand-in) image.
 *
 *   npm run fetch-standins
 *   npm run fetch-standins -- --clear   # remove all stand-ins again
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const UA = "QuicklimeArtFetcher/1.0 (https://quicklime.co.za)";
const LONG_EDGE = 2400;
const outFile = path.join(ROOT, "src/content/images.generated.json");
const images = JSON.parse(await fs.readFile(outFile, "utf8").catch(() => "{}"));
const { works } = JSON.parse(await fs.readFile(path.join(ROOT, "scripts/standins.json"), "utf8"));

if (process.argv.includes("--clear")) {
  for (const [slug, img] of Object.entries(images)) {
    if (img.standIn) {
      delete images[slug];
      await fs.rm(path.join(ROOT, "public", img.src), { force: true });
    }
  }
  await fs.writeFile(outFile, JSON.stringify(images, null, 2) + "\n");
  console.log("Stand-ins removed.");
  process.exit(0);
}

const get = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
};

const today = new Date().toISOString().slice(0, 10);
for (const w of works) {
  if (images[w.slug] && !images[w.slug].standIn) {
    console.log(`- ${w.slug}: has the real image, skipped`);
    continue;
  }
  let url, sourcePage, licence;
  if (w.met) {
    const meta = await (await get(`https://storage.googleapis.com/gcs-public-data--met/${w.met}/object.json`)).json();
    if (!meta[0]?.isOasc) {
      console.log(`✗ ${w.slug}: Met ${w.met} is not Open Access, skipped`);
      continue;
    }
    url = `https://storage.googleapis.com/gcs-public-data--met/${meta[0].gcsUrl}`;
    sourcePage = `https://www.metmuseum.org/art/collection/search/${w.met}`;
    licence = "CC0 (Met Open Access)";
  } else if (w.s3) {
    url = `https://smithsonian-open-access.s3-us-west-2.amazonaws.com/${w.s3}`;
    sourcePage = "https://www.si.edu/openaccess";
    licence = "CC0 (Smithsonian Open Access)";
  } else {
    url = w.url;
    sourcePage = w.url;
    licence = "Public-domain painting; this file has no rights tag of its own";
  }
  const buf = Buffer.from(await (await get(url)).arrayBuffer());
  const meta = await sharp(buf).metadata();
  const longEdge = Math.max(meta.width, meta.height);
  const scale = Math.min(1, LONG_EDGE / longEdge);
  const src = `/art/${w.slug}.jpg`;
  const { width, height } = await sharp(buf)
    .rotate()
    .resize({ width: Math.round(meta.width * scale) })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(ROOT, "public", src));
  images[w.slug] = { src, status: "cleared", standIn: w.title, sourcePage, licence, longEdge, checkedOn: today, width, height };
  console.log(`✓ ${w.slug}: ${w.title} (${meta.width}×${meta.height})`);
}
await fs.writeFile(outFile, JSON.stringify(images, null, 2) + "\n");
