#!/usr/bin/env node
/**
 * Fetch painting images from Wikimedia Commons and run the rights gate.
 *
 *   npm run fetch-art                     # dry run: resolve files, report licence + size
 *   npm run fetch-art -- --apply          # download, resize, write src/content/images.generated.json
 *   npm run fetch-art -- --apply rembrandt johannes-vermeer   # only these slugs
 *
 * Sources, in order:
 *   - `met`: the Met's Open Access image from its public Google Cloud bucket
 *     (gcs-public-data--met). The Met flags each image `isOasc` (CC0).
 *   - `title`: a Wikimedia Commons file. Needs commons.wikimedia.org and
 *     upload.wikimedia.org to be reachable.
 *
 * An image is marked "cleared" only when ALL of these hold:
 *   - the Commons file page's own licence tag reads public domain or CC0
 *   - the original's long edge is at least 2000px
 *   - the manifest entry has autoClear: true
 * Everything else is still downloaded, but recorded as "pending" with the reason.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "QuicklimeArtFetcher/1.0 (https://quicklime.co.za)";
const LONG_EDGE_FLOOR = 2000;
const OUTPUT_LONG_EDGE = 2400;

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const only = args.filter((a) => !a.startsWith("--"));

const manifest = JSON.parse(await fs.readFile(path.join(ROOT, "scripts/art-manifest.json"), "utf8"));
const outFile = path.join(ROOT, "src/content/images.generated.json");
const existing = JSON.parse(await fs.readFile(outFile, "utf8").catch(() => "{}"));

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: "json", formatversion: "2", origin: "*", ...params })}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } }).catch((e) => {
    console.error(`Can't reach commons.wikimedia.org (${e.cause?.code ?? e.message}). Is it allowed in the network policy?`);
    process.exit(1);
  });
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  return res.json();
}

async function fileInfo(title) {
  const data = await api({
    action: "query",
    titles: `File:${title}`,
    prop: "imageinfo",
    iiprop: "url|size|extmetadata|mime",
    iiurlwidth: String(OUTPUT_LONG_EDGE),
  });
  const page = data.query?.pages?.[0];
  if (!page || page.missing) return null;
  return { title: page.title, info: page.imageinfo?.[0] };
}

async function search(q) {
  const data = await api({ action: "query", list: "search", srnamespace: "6", srlimit: "5", srsearch: q });
  return (data.query?.search ?? []).map((r) => r.title.replace(/^File:/, ""));
}

const strip = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function rights(meta) {
  const licence = strip(meta?.LicenseShortName?.value);
  const copyrighted = meta?.Copyrighted?.value;
  const pd = /public domain|^pd\b|cc0/i.test(licence) || copyrighted === "False";
  return { licence, pd };
}

const today = new Date().toISOString().slice(0, 10);
const results = { ...existing };
const report = [];

const MET_BUCKET = "https://storage.googleapis.com/gcs-public-data--met";

async function metInfo({ objectId }) {
  const res = await fetch(`${MET_BUCKET}/${objectId}/object.json`, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const [first] = await res.json();
  if (!first) return null;
  return { oasc: first.isOasc === true, url: `${MET_BUCKET}/${first.gcsUrl}` };
}

async function writeImage(w, buf, record) {
  const rel = `/art/${w.slug}.jpg`;
  const meta = await sharp(buf).metadata();
  const longEdge = Math.max(meta.width, meta.height);
  const scale = Math.min(1, OUTPUT_LONG_EDGE / longEdge);
  const { width, height } = await sharp(buf)
    .rotate()
    .resize({ width: Math.round(meta.width * scale), withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(ROOT, "public", rel));
  return { src: rel, ...record, longEdge, width, height };
}

for (const w of manifest.works) {
  if (only.length && !only.includes(w.slug)) continue;

  if (w.met) {
    const m = await metInfo(w.met);
    if (m) {
      const reasons = [];
      if (!m.oasc) reasons.push("Met does not flag this image Open Access");
      if (!w.autoClear) reasons.push("held for sign-off (see manifest)");
      const status = reasons.length ? "pending" : "cleared";
      report.push(`${status === "cleared" ? "✓" : "•"} ${w.slug}: Met ${w.met.accession ?? w.met.objectId}, ${m.oasc ? "Open Access (CC0)" : "not Open Access"} → ${status}`);
      if (apply) {
        const res = await fetch(m.url, { headers: { "User-Agent": UA } });
        const buf = Buffer.from(await res.arrayBuffer());
        const rec = await writeImage(w, buf, {
          status,
          sourcePage: `https://www.metmuseum.org/art/collection/search/${w.met.objectId}`,
          licence: m.oasc ? "CC0 (Met Open Access)" : undefined,
          holder: w.holder,
          checkedOn: today,
          ...(reasons.length ? { pendingReason: reasons.join("; ") } : {}),
        });
        if (rec.longEdge < LONG_EDGE_FLOOR) {
          rec.status = "pending";
          rec.pendingReason = `long edge ${rec.longEdge}px < ${LONG_EDGE_FLOOR}px`;
        }
        results[w.slug] = rec;
      }
      continue;
    }
    report.push(`  ${w.slug}: Met object ${w.met.objectId} not found in bucket${w.title ? ", trying Commons" : ""}`);
    if (!w.title) continue;
  }

  let found = await fileInfo(w.title);
  if (!found) {
    const hits = await search(w.search);
    report.push(`✗ ${w.slug}: "${w.title}" not found. Candidates:\n    ${hits.join("\n    ") || "(none)"}`);
    continue;
  }
  const { info } = found;
  const longEdge = Math.max(info.width, info.height);
  const { licence, pd } = rights(info.extmetadata);
  const reasons = [];
  if (!pd) reasons.push(`licence "${licence || "none"}" is not public domain`);
  if (longEdge < LONG_EDGE_FLOOR) reasons.push(`long edge ${longEdge}px < ${LONG_EDGE_FLOOR}px`);
  if (!w.autoClear) reasons.push("held for sign-off (see manifest)");
  const status = reasons.length ? "pending" : "cleared";
  report.push(
    `${status === "cleared" ? "✓" : "•"} ${w.slug}: ${info.width}×${info.height}, ${licence || "no licence tag"} → ${status}` +
      (reasons.length ? ` (${reasons.join("; ")})` : ""),
  );

  if (!apply) continue;

  // Commons only serves thumbnails along the width, so ask for a width that gives the target long edge.
  const scale = Math.min(1, OUTPUT_LONG_EDGE / longEdge);
  const width = Math.round(info.width * scale);
  const thumb = scale < 1 ? info.thumburl.replace(/\/\d+px-/, `/${width}px-`) : info.url;
  const res = await fetch(thumb, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    report.push(`  ✗ download failed: ${res.status} ${thumb}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const rel = `/art/${w.slug}.jpg`;
  const img = sharp(buf).rotate().resize({ width: Math.round(info.width * scale), withoutEnlargement: true });
  const { width: ow, height: oh } = await img
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(ROOT, "public", rel));

  results[w.slug] = {
    src: rel,
    status,
    sourcePage: info.descriptionurl,
    licence: licence || undefined,
    longEdge,
    holder: w.holder,
    checkedOn: today,
    width: ow,
    height: oh,
    ...(reasons.length ? { pendingReason: reasons.join("; ") } : {}),
  };
  // Be polite to Commons.
  await new Promise((r) => setTimeout(r, 400));
}

console.log(report.join("\n"));
if (apply) {
  await fs.writeFile(outFile, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote ${path.relative(ROOT, outFile)}`);
}
