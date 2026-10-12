#!/usr/bin/env node
/**
 * Import painting files supplied by hand (e.g. downloaded from Wikimedia
 * Commons) and replace the preview stand-ins.
 *
 *   node scripts/import-art.mjs <file-or-folder> [...]
 *   node scripts/import-art.mjs vincent-van-gogh=starry.jpg ...   # explicit match
 *   node scripts/import-art.mjs new-artist=file.jpg --source https://commons.wikimedia.org/wiki/File:...
 *
 * Any slug with a story file in src/content/stories/ works with the explicit
 * slug=file form. --source records the page the file came from (it overrides
 * the default page listed below, and is required for slugs not listed).
 *
 * Each file is matched to a story by name ("vermeer.jpg", "Van_Gogh_-_Starry_Night.jpg"
 * both work), converted to a 2400px JPEG at public/art/<slug>.jpg, and its
 * record in src/content/images.generated.json is replaced. The stand-in label goes away.
 * Rights: the source page is the Wikipedia/Commons page listed below; open
 * it and confirm the licence tag before launch (docs/RIGHTS.md).
 */
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const LONG_EDGE = 2400;

/** slug → [name keywords, page the file was taken from] */
const WORKS = {
  rembrandt: [["rembrandt", "galilee", "storm"], "https://en.wikipedia.org/wiki/The_Storm_on_the_Sea_of_Galilee"],
  "albrecht-durer": [["durer", "dürer", "duerer"], "https://en.wikipedia.org/wiki/Self-Portrait_(D%C3%BCrer,_Munich)"],
  "leonardo-da-vinci": [["leonardo", "mona", "lisa", "vinci"], "https://en.wikipedia.org/wiki/Mona_Lisa"],
  michelangelo: [["michelangelo", "sistine"], "https://en.wikipedia.org/wiki/Sistine_Chapel_ceiling"],
  "sandro-botticelli": [["botticelli", "venus", "nascita"], "https://en.wikipedia.org/wiki/The_Birth_of_Venus"],
  "johannes-vermeer": [["vermeer", "pearl", "parel"], "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring"],
  caravaggio: [["caravaggio", "nativity"], "https://en.wikipedia.org/wiki/Nativity_with_St._Francis_and_St._Lawrence"],
  "artemisia-gentileschi": [["gentileschi", "artemisia", "judith", "holofernes"], "https://commons.wikimedia.org/w/index.php?search=Artemisia+Gentileschi+Judith+Holofernes+Uffizi"],
  "jan-van-eyck": [["eyck", "arnolfini"], "https://en.wikipedia.org/wiki/Arnolfini_Portrait"],
  "hieronymus-bosch": [["bosch", "garden", "delights"], "https://en.wikipedia.org/wiki/The_Garden_of_Earthly_Delights"],
  "jmw-turner": [["turner", "temeraire"], "https://en.wikipedia.org/wiki/The_Fighting_Temeraire"],
  "claude-monet": [["monet", "lilies", "nympheas", "nymphéas", "reflets"], "https://commons.wikimedia.org/w/index.php?search=Monet+Reflets+verts+Orangerie"],
  "mary-cassatt": [["cassatt", "child's bath", "childs bath", "bath"], "https://en.wikipedia.org/wiki/The_Child%27s_Bath"],
  "pierre-auguste-renoir": [["renoir", "luncheon", "boating party", "dejeuner"], "https://en.wikipedia.org/wiki/Luncheon_of_the_Boating_Party"],
  "paul-cezanne": [["cezanne", "cézanne", "card players", "joueurs"], "https://en.wikipedia.org/wiki/The_Card_Players"],
  "georges-seurat": [["seurat", "jatte"], "https://en.wikipedia.org/wiki/A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte"],
  "vincent-van-gogh": [["gogh", "starry"], "https://en.wikipedia.org/wiki/The_Starry_Night"],
  "paul-gauguin": [["gauguin", "where do we come", "d'ou", "dou venons"], "https://en.wikipedia.org/wiki/Where_Do_We_Come_From%3F_What_Are_We%3F_Where_Are_We_Going%3F"],
  "edvard-munch": [["munch", "scream", "skrik"], "https://en.wikipedia.org/wiki/The_Scream"],
  "gustav-klimt": [["klimt", "kiss", "kuss"], "https://en.wikipedia.org/wiki/The_Kiss_(Klimt)"],
  "wassily-kandinsky": [["kandinsky", "composition", "vassily"], "https://en.wikipedia.org/wiki/Composition_VIII"],
};

function match(file) {
  const n = path.basename(file).toLowerCase().replace(/[_\-.]+/g, " ");
  // Artist names first (most specific), then painting keywords.
  for (const pass of [0, 1]) {
    for (const [slug, [keys]] of Object.entries(WORKS)) {
      const ks = pass === 0 ? keys.slice(0, 1) : keys.slice(1);
      if (ks.some((k) => n.includes(k))) return slug;
    }
  }
  return null;
}

const argv = process.argv.slice(2);
const si = argv.indexOf("--source");
const sourceArg = si >= 0 ? argv.splice(si, 2)[1] : undefined;
const hasStory = (slug) => WORKS[slug] || fsSync.existsSync(path.join(ROOT, "src/content/stories", `${slug}.ts`));

const inputs = [];
const forced = new Map();
for (let arg of argv) {
  const eq = arg.match(/^([a-z-]+)=(.+)$/);
  if (eq && hasStory(eq[1])) {
    forced.set(eq[2], eq[1]);
    arg = eq[2];
  }
  const st = await fs.stat(arg);
  if (st.isDirectory()) for (const f of await fs.readdir(arg)) inputs.push(path.join(arg, f));
  else inputs.push(arg);
}
const imgs = inputs.filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
if (!imgs.length) {
  console.error("No image files given.");
  process.exit(1);
}

const outFile = path.join(ROOT, "src/content/images.generated.json");
const records = JSON.parse(await fs.readFile(outFile, "utf8"));
const today = new Date().toISOString().slice(0, 10);
const done = new Set();

for (const f of imgs) {
  const slug = forced.get(f) ?? match(f);
  if (!slug) {
    console.log(`? ${path.basename(f)}: couldn't tell which painting this is; rename it after the artist`);
    continue;
  }
  if (done.has(slug)) console.log(`! ${path.basename(f)}: a second file for ${slug}; this one wins`);
  const sourcePage = sourceArg ?? WORKS[slug]?.[1];
  if (!sourcePage) {
    console.log(`✗ ${slug}: pass --source <page the file came from>; every image needs its source page`);
    continue;
  }
  const meta = await sharp(f).metadata();
  const longEdge = Math.max(meta.width, meta.height);
  const scale = Math.min(1, LONG_EDGE / longEdge);
  const src = `/art/${slug}.jpg`;
  const { width, height } = await sharp(f)
    .rotate()
    .resize({ width: Math.round(meta.width * scale) })
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toFile(path.join(ROOT, "public", src));
  records[slug] = {
    src,
    status: "cleared",
    sourcePage,
    licence: "Supplied by hand from Wikimedia Commons; confirm the tag on the source page before launch",
    longEdge,
    checkedOn: today,
    width,
    height,
    ...(longEdge < 2000 ? { note: `long edge ${longEdge}px is under the 2000px floor` } : {}),
  };
  done.add(slug);
  console.log(`✓ ${slug}: ${path.basename(f)} (${meta.width}×${meta.height})${longEdge < 2000 ? " — under 2000px" : ""}`);
}

await fs.writeFile(outFile, JSON.stringify(records, null, 2) + "\n");
const left = Object.keys(WORKS).filter((s) => records[s]?.standIn || !records[s]);
console.log(`\n${done.size} imported. Still on stand-ins: ${left.length ? left.join(", ") : "none"}`);
