// Shared helpers for the authoring tools. Plain Node (no TS runtime), so story
// files are read as text: every `focus: { x, y, scale }` and the `caption`
// that follows it inside the same beat.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
export const sharp = createRequire(path.join(ROOT, "package.json"))("sharp");

export function storyPath(slug) {
  return path.join(ROOT, "src/content/stories", `${slug}.ts`);
}

/** All slugs registered in src/content/stories/index.ts, in order. */
export function registeredSlugs() {
  const index = fs.readFileSync(path.join(ROOT, "src/content/stories/index.ts"), "utf8");
  const imports = Object.fromEntries([...index.matchAll(/import \{ (\w+) \} from "\.\/([\w-]+)"/g)].map((m) => [m[1], m[2]]));
  const body = index.slice(index.indexOf("const all: Story[] = ["));
  return [...body.matchAll(/^\s+(\w+),$/gm)].map((m) => imports[m[1]]).filter(Boolean);
}

/** Beats with their focus and caption, in order. Beat 0 is the scale-1 opener. */
export function readBeats(slug) {
  const src = fs.readFileSync(storyPath(slug), "utf8");
  const start = src.indexOf("beats: [");
  const end = src.indexOf("reveal:", start);
  const block = src.slice(start, end);
  return block
    .split(/kind: "beat"/)
    .slice(1)
    .map((chunk, i) => {
      const f = chunk.match(/focus: \{ x: ([\d.]+), y: ([\d.]+), scale: ([\d.]+) \}/);
      const c = chunk.match(/caption: "([^"]*)"/);
      return { i, x: +f[1], y: +f[2], scale: +f[3], caption: c?.[1] ?? "" };
    });
}

/** The image the site will actually render for a slug (generated record wins). */
export function imageFile(slug) {
  const gen = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/images.generated.json"), "utf8"));
  const src = gen[slug]?.src ?? `/art/${slug}.jpg`;
  return { file: path.join(ROOT, "public", src), record: gen[slug] };
}

export function globalModule(name) {
  const root = execSync("npm root -g").toString().trim();
  return path.join(root, name);
}

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
