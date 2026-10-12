# Quicklime — developer handover

Read this first. It covers what was built, how it fits together, and the full workflow for adding a new artist and painting: research, writing, image, zoom points, code, homepage, QA, preview and commit. If you only read one section, read **§5 Adding a new artist and painting**.

Last updated: 12 Oct 2026. Branch: `claude/new-session-vbs2jc`.

---

## Contents

1. [What Quicklime is](#1-what-quicklime-is)
2. [Current status](#2-current-status)
3. [Running it](#3-running-it)
4. [Architecture and file map](#4-architecture-and-file-map)
5. [Adding a new artist and painting (step by step)](#5-adding-a-new-artist-and-painting-step-by-step)
6. [The zoom system: grid, focus points and checking](#6-the-zoom-system-grid-focus-points-and-checking)
7. [Images and rights](#7-images-and-rights)
8. [The homepage](#8-the-homepage)
9. [QA, preview and deploy](#9-qa-preview-and-deploy)
10. [Tool reference](#10-tool-reference)
11. [Environment limits and workarounds (Claude cloud sessions)](#11-environment-limits-and-workarounds-claude-cloud-sessions)
12. [Outstanding before launch](#12-outstanding-before-launch)
13. [Decisions already made](#13-decisions-already-made)

---

## 1. What Quicklime is

quicklime.co.za: walk through the best art. Each artist gets **one painting told as one story**. The reader scrolls; the painting stays pinned behind the text and the camera pans and zooms to one detail per beat, until the twist turns one detail into the point of the story. Then the whole painting is revealed, followed by a real quote, a closing fact, and the sources.

- **Stack:** Next.js 15.5 (App Router, fully static: `generateStaticParams` + `dynamicParams = false`), React 19, Tailwind 4 (`@theme inline` tokens in `globals.css`), Motion 14 (`motion/react`), clsx. Images are resized with sharp at build time.
- **Cost:** zero running cost. No CMS, database, API keys or paid services. Content is TypeScript files in the repo.
- **Scope:** public-domain artists only (Tier A). In-copyright artists (Tier B) are not built (§12).
- **Original spec:** `docs/SPEC.md`.

## 2. Current status

- **37 artists** in the directory (`src/content/artists.ts`): the spec's 20, plus van Eyck, Bosch, Turner, Hokusai, Charles Davidson Bell and 12 Met artists (Bruegel, El Greco, Titian, Velázquez, Goya, David, Bonheur, Courbet, Manet, Rousseau, Homer, Modigliani).
- **34 live stories** (registered in `src/content/stories/index.ts`).
- **3 artists with no live story**, which show an "In the studio" page:
  - Degas: draft in the repo, but the quote is unverified and the hook has only one source.
  - Charles Davidson Bell: draft in the repo, but the "quote" is a medal name, not anyone's words.
  - Thomas Baines: research log only (`docs/sources/thomas-baines.md`). No specific work is pinned to a holder yet.
- **Fact-checking:** every story has `docs/sources/<slug>.md`, with one row per line of copy. Most rows say `re-check`. The research sandbox could search the web but couldn't open source pages, so each row was confirmed from search excerpts only. Someone must open each source page before launch.
- **Preview (design review):** https://claude.ai/artifact/JAf1u31RSAbf7xJzYJ1Gw8 (rebuild with `npm run preview`, §9).

### Image status per live story

| Story | Image now | Long edge | Action before launch |
| --- | --- | --- | --- |
| katsushika-hokusai | Met Open Access (CC0) | 3859 | none |
| pieter-bruegel, el-greco, titian, francisco-goya, jacques-louis-david, rosa-bonheur, edouard-manet, henri-rousseau, winslow-homer | Met Open Access (CC0) | 3800+ | none |
| gustave-courbet | Met Open Access (CC0) | 1905 | under the 2000px floor; accept it or find a larger file |
| amedeo-modigliani | Met Open Access (CC0) | 1912 | under the 2000px floor; accept it or find a larger file |
| diego-velazquez | Met Open Access (CC0) | 1024 | the Met only publishes 1024px for this one; decide |
| claude-monet | **stand-in** (Met *Water Lilies* 1916–19) | 3811 | supply the featured work (*Water Lilies: Green Reflections*, Orangerie); the file supplied was *Red Boats at Argenteuil* |
| rembrandt, albrecht-durer, jan-van-eyck, hieronymus-bosch, sandro-botticelli, caravaggio, johannes-vermeer, jmw-turner, mary-cassatt, pierre-auguste-renoir, paul-cezanne, georges-seurat, vincent-van-gogh, paul-gauguin, wassily-kandinsky | Commons original from Pete's Drive folder (12 Oct) | 2232–3840 | none. Botticelli and Caravaggio still need Pete's sign-off (Italian rules). Kandinsky was cropped to remove the gallery frame |
| edvard-munch | Commons original via chat upload (capped) | 2000 | the 11.4MB original is over the Drive connector's limit; re-export at 4000px or under 6MB |
| leonardo-da-vinci, gustav-klimt | uploaded by hand from Wikipedia (preview size) | 1280–1936 | originals are in the Drive folder but over the connector's ~6MB limit; re-export at 4000px or under 6MB |
| artemisia-gentileschi, michelangelo | uploaded by hand from Wikipedia (preview size) | 1280–1556 | Pete decides (§12): the larger Gentileschi file carries a MiBACT watermark; no PD/CC0 Sistine file reaches 2000px |

The live list is always `src/content/images.generated.json`. Each record carries `sourcePage`, `licence`, `longEdge`, `holder`, `checkedOn` and, when it applies, `note` or `standIn`.

## 3. Running it

```bash
npm install
npm run dev            # http://localhost:3000 (predev builds the responsive image sizes)
npm run build          # static build of every route (prebuild builds the image sizes)
npm start              # serve the build on :3000
npm run lint
npx tsc --noEmit
npm run qa             # browser QA of every story against a running server (§9)
npm run preview        # static, self-contained preview build in .preview/ (§9)
```

Authoring tools (§6, §10): `npm run focus:grid`, `npm run focus:check`, `npm run contact-sheet`, `npm run import-art`, `npm run fetch-art`.

Pass arguments after `--`, for example `npm run focus:check -- rembrandt`.

## 4. Architecture and file map

```
src/
  app/
    layout.tsx                 fonts (Fraunces display, Inter body, Google Fonts stylesheet link), metadata
    globals.css                tokens (--ink #0b0b0a, --paper #f3efe6, --lime #c6f24e, --band 5rem), story + homepage CSS
    page.tsx                   homepage (HERO list lives here)
    artists/page.tsx           directory: search + movement / nationality / era filters
    artists/[slug]/page.tsx    StoryPage if a story exists, else an "In the studio" page
  components/
    Painting.tsx               the ONLY way a painting is rendered: rights gate + srcSet
    SiteNav.tsx                top nav; solid backing after 24px scroll; links only to Artists
    story/StoryPage.tsx        the story template (pinned canvas, beats, reveal, quote, close, footer)
    story/GlassFilter.tsx      SVG refraction filter (#glass) used by the text cards
    home/LensHero.tsx          full-screen hero with a "lantern" magnifier
    home/DetailZoom.tsx        320svh sticky zoom section (Hokusai)
    home/StoryWall.tsx         horizontal snap carousel of story cards
    home/ArtistIndex.tsx       oldest-first list of every artist
  content/
    types.ts                   Artist, Story, StoryBeat, Focus, ArtImage
    artists.ts                 directory data (37 artists)
    images.ts                  imageFor(slug): reads images.generated.json
    images.generated.json      image + rights record per slug (written by the scripts)
    stories/<slug>.ts          one story per file
    stories/index.ts           registry: a story is only live once it is listed here
public/art/<slug>.jpg          master images (2400px long edge max)
public/art/w800/, w1400/       generated sizes (gitignored, made by make-sizes.mjs)
docs/
  SPEC.md                      original spec
  STORY_BRIEF.md               research + voice rules (short version of §5)
  RIGHTS.md                    image rights gate in detail
  DEPLOY.md                    Vercel + DNS cutover (MX-safe)
  sources/<slug>.md            claim-by-claim sources log per story
scripts/
  fetch-art.mjs + art-manifest.json      automated fetch (Met bucket first, then Wikimedia Commons)
  import-art.mjs                         import hand-supplied image files
  fetch-standins.mjs + standins.json     preview-only stand-ins (--clear removes them)
  make-sizes.mjs                         w800 / w1400 copies (runs before dev and build)
  tools/                                 authoring + QA tools (§10)
  preview/                               static preview build (§9)
```

### How data flows

1. A story file exports a `Story` object. Its `image` is a placeholder (`status: "pending"`).
2. `stories/index.ts` registers it, and overrides `image` with the record from `images.generated.json` when one exists (`imageFor(slug)`). `artists.ts` does the same for the directory card.
3. `artists/[slug]/page.tsx` renders `StoryPage` when `getStory(slug)` returns a story.
4. `Painting.tsx` renders an `<img>` **only when `image.status === "cleared"`**. Anything else shows a neutral placeholder, so an unchecked image can't ship by accident. When `standIn` is set, the page labels it "Preview image: …".

### The story template (`StoryPage.tsx`)

- **Sections, in order:** cover → beats → reveal → quote → close → footer (with sources). They sit inside a `.story-scroller` scroll-snap container, one `.story-section` per screen.
- **Pinned canvas:** sized to the painting's aspect ratio and grown until it covers the viewport:

  ```
  width: max(100vw, calc(100svh * aspect)); aspect-ratio: aspect;
  ```

  - It is centred. For each beat it animates to `x = (50 - focus.x) * scale %`, `y = (50 - focus.y) * scale %`, `scale = focus.scale`, using a spring "punch". The result is that the focus point sits mid-screen.
  - An IntersectionObserver decides which section is active.
  - `isolation: isolate` on the scroller keeps the canvas (z -10) above the page background. Don't remove it.
- **Spotlight vignette:** a radial darkening whose opacity comes from `SHADE[section.type]`.
- **Glass cards:** text cards use the `#glass` SVG filter.
- **Bottom band:** `--band: 5rem` is reserved at the bottom for the caption and the scroll cue. Text must never enter it; `npm run qa` checks this. The scroll cue hides at the footer.
- **Cover:** a scrim gradient keeps the title readable on pale paintings.
- **Reveal:** the whole painting, contained and sized by aspect: `min(100%, (100svh - band) * 0.72 * aspect)`.

## 5. Adding a new artist and painting (step by step)

Worked example in this section: adding **"Jane Painter, *The Harbour* (1890), held by the National Gallery of Art, Washington"**. Replace with your own. The reference story to copy is `src/content/stories/rembrandt.ts`, and its log is `docs/sources/rembrandt.md`.

### Step 0 — Eligibility (do this before any research)

- [ ] **Artist died long enough ago.** Project rule: the artist died at least 70 full calendar years ago, so in 2026 they must have died in **1955 or earlier**. The copyright term runs to the end of the calendar year. South Africa's own term is life + 50, but we use the stricter 70 so the site is safe in the EU, UK and most other places too. Works first published in the US before 1931 are also PD there.
- [ ] **The work itself is PD.** That means it was made by this artist, not a later restoration claimed as new work, and it is not a posthumous edition with its own rights.
- [ ] **A usable image exists** (§7): public domain or CC0 on its source page, ideally 2000px+ on the long edge. Check the holder:
  - Italian state museums (Uffizi and others) and the Vatican restrict commercial reproduction. Those images need Pete's sign-off.
  - Some EU and UK institutions claim copyright in their photographs.
  - US institutions follow *Bridgeman v. Corel*.
- [ ] If the artist fails the date rule, stop. That is a Tier B artist, and Tier B is undecided (§12).

### Step 1 — Choose the work and its holder

- Pick the artist's **most recognisable** work that has a **concrete hook**: a count, an object, a theft, a feud, a hidden detail, a rejection, a scandal or a provenance twist.
- Record the holding institution, its city and country, and the museum's object page URL.
- Prefer works held by museums with open-access programmes. Those give the best images and the cleanest rights:
  - the Met (the easiest route from this environment, §7)
  - National Gallery of Art (Washington)
  - Art Institute of Chicago
  - Rijksmuseum
  - Smithsonian
  - Cleveland
  - Yale
  - Paris Musées

### Step 2 — Research

Rules (also in `docs/STORY_BRIEF.md`):

1. Gather **3–5 verified facts** about the work. Use museum pages and encyclopedic sources (museum collection records, Britannica, Wikipedia as a starting point that leads to its citations, catalogues raisonnés, reputable press), not blogs that repeat each other.
2. Find **one hook** that can carry the story and turn into the twist.
3. **Anything surprising needs two independent sources.** If you can't get the second, leave it out, or log it as `weak` and keep it out of the copy.
4. The **quote is mandatory and must be real.** Acceptable sources:
   - the artist's documented words (a letter, diary or interview)
   - a documented contemporary statement
   - an inscription on the work
   - the text the work depicts (for example, a Bible verse)

   Never paraphrase into quote marks, and never invent one. Log exactly where it comes from. Prefer the original-language wording plus a published translation; if you translate it yourself, say so in the attribution.
5. **Don't guess dates or numbers.** If sources disagree, write the disagreement in the sources file and keep the disputed detail out of the copy.
6. **Visual claims** ("a man is seasick over the rail") must be documented somewhere and then confirmed against the actual image in Step 6.

Create `docs/sources/<slug>.md` while you research, not after:

```markdown
# Jane Painter — The Harbour (1890)

Internal sources list for `src/content/stories/jane-painter.ts`. Each line of copy maps to a row below.

| Copy | Claim | Source | Status |
| --- | --- | --- | --- |
| "Washington. 1890." | Painted 1890 | NGA object page | confirmed |
| "Nine boats." | Nine boats in the harbour | NGA object page; Smith (2004) p. 12 | confirmed (2 sources) |
| Quote | "…" | Letter to her brother, 3 May 1890, in *Letters* (1950) p. 88 | confirmed |
| Visual: the red flag | Red flag on the far mast | The painting itself | confirm against the cleared image |

## Links
- NGA object page: https://…
```

Status values:

| Status | Meaning |
| --- | --- |
| `confirmed` | You opened the source page and saw the claim |
| `re-check` | You only saw a search excerpt; confirm before launch |
| `weak` | One hedged source only. **Must not be in the copy** |
| `confirm against the cleared image` | A visual claim |

### Step 3 — Write the story in the house voice

- Short sentences. Hard stops. Fragments where they land harder.
- No scene-setting, and no "this painting depicts".
- **4–6 beats**, each with 2–4 lines of under ~60 characters.
- **Beat 1** sets the scene and shows the whole canvas: `focus: { x: 50, y: 50, scale: 1 }`.
- **Every later beat** zooms into one detail and has a `caption` naming it.
- **Exactly one `twist`** per story, on the beat where a detail turns out to mean more than it first seemed.
- **Reveal:** two short lines over the whole painting (for example "The whole storm." / "Uncropped.").
- **Quote:** `text` plus `attribution`. The attribution says who said it, where and when.
- **Close:** real context (a fact, event or consequence), not trivia. The `heading` is a date, number or short phrase (for example "18 March 1990").
- **Sources:** 3–7 of the best links. They show in the footer by default (the user asked for sources on every page).

### Step 4 — Create the story file

Create `src/content/stories/jane-painter.ts`. The slug is lowercase and hyphenated, matches the artist slug, and becomes the URL `/artists/jane-painter`. The export name is the camelCase slug.

```ts
import type { Story } from "../types";

/**
 * Jane Painter, The Harbour (1890).
 * Every line maps to a row in docs/sources/jane-painter.md.
 * Focus points set against <which image file> with scripts/tools/focus-grid.mjs.
 */
export const janePainter: Story = {
  slug: "jane-painter",
  title: "The Harbour",                 // short display title (cover + cards)
  year: "1890",                         // string, so "c. 1665" or "1503–19" work
  image: {
    src: "/art/jane-painter.jpg",
    status: "pending",                  // the real record comes from images.generated.json
    width: 1600, height: 1200,          // real aspect ratio; replaced once the image is imported
  },
  cover: { kicker: "The Harbour at Dawn" },   // full formal title of the work
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: ["Washington. 1890.", "…"],
    },
    {
      kind: "beat",
      focus: { x: 72, y: 31, scale: 2.4 },   // from the grid, Step 6
      lines: ["…", "…"],
      caption: "The far mast",
    },
    {
      kind: "beat",
      focus: { x: 38, y: 64, scale: 2.8 },
      lines: ["…"],
      twist: "…",                           // exactly one beat in the story has this
      caption: "…",
    },
  ],
  reveal: { lines: ["The whole harbour.", "Uncropped."] },
  quote: { text: "…", attribution: "Jane Painter, letter to her brother, 1890" },
  close: { heading: "1931", lines: ["…", "…"] },
  sources: [
    { label: "National Gallery of Art — object page", url: "https://…" },
  ],
};
```

Field notes:

- `title` stays short because it is set very large. `cover.kicker` holds the full formal title.
- `focus.x` and `focus.y` are percentages of the **whole painting** (0,0 = top left).
- Keep `scale` between 1.8 and 3.2. Go above 3 only when the image has the resolution, and use 3–3.5 sparingly for tiny details such as signatures and inscriptions.
- `showSources: false` hides the footer sources. Don't use it; the decision was to show sources everywhere.

### Step 5 — Get the image

See §7 for the rules. In short:

- **Met work:** add an entry to `scripts/art-manifest.json`, then:

  ```bash
  npm run fetch-art -- jane-painter              # dry run: licence + size
  npm run fetch-art -- --apply jane-painter      # download, resize, write the record
  ```

  ```json
  { "slug": "jane-painter", "met": { "objectId": 123456 }, "title": "", "holder": "Metropolitan Museum of Art, New York (US)", "autoClear": true, "search": "" }
  ```

- **Wikimedia Commons file:** use the same manifest entry, but with `"title": "<Commons file name>"` and no `met` key. This needs a network that can reach Commons.
- **File downloaded by hand:**

  ```bash
  npm run import-art -- jane-painter=~/Downloads/harbour.jpg --source "https://commons.wikimedia.org/wiki/File:…"
  ```

  It writes `public/art/jane-painter.jpg` (2400px max) and the record. It warns if the file is under 2000px.
- **Unidentified uploads:** if you were given a batch of files with generic names, identify them first:

  ```bash
  npm run contact-sheet -- ~/Downloads/batch --cols 4
  ```

  Then open `.focus/contact-1.jpg` and match the numbers to files.

### Step 6 — Set the zoom points (the grid method)

This is the step that makes or breaks a story. The full method is in §6. Short version:

```bash
npm run focus:grid -- jane-painter                          # whole painting, 10% grid
npm run focus:grid -- jane-painter --region 60,20,90,45     # zoom into an area, finer 2–5% grid
# read x,y off the labels → put them in the story's focus
npm run focus:check -- jane-painter                         # phone crops of every beat
npm run focus:check -- jane-painter --desktop               # desktop crops
```

Repeat until every crop shows exactly what its lines describe.

### Step 7 — Register the story

1. `src/content/stories/index.ts`:
   - Add `import { janePainter } from "./jane-painter";`.
   - Add `janePainter` to the `all` array **in order of the artist's birth year**. The story wall and other lists rely on that order.
2. `src/content/artists.ts`: add the artist to `list` (oldest first, matching its neighbours):

   ```ts
   {
     slug: "jane-painter",          // must equal the story slug
     name: "Jane Painter",
     nationality: "American",
     region: "North America",       // "Europe" | "North America" | "Africa" | "Asia" (add to Region in types.ts if needed)
     movement: "Impressionism",     // reuse an existing label where possible; the directory filters on it
     born: 1850,
     died: 1931,                    // bornApprox / diedApprox: true for "c."
     featuredWork: "The Harbour at Dawn",
     cardFocus: "60% 40%",          // CSS object-position for the directory card crop
   },
   ```

   - `era` (the century filter) and `lifespan` are computed; you don't set them.
   - The directory card uses the story's image record automatically.
3. `scripts/import-art.mjs`: optionally add the slug to `WORKS`, with name keywords and the source page, so later re-imports match by file name. It isn't required, because `slug=file --source` works for any story.

An artist **without** a story file still appears in the directory and gets the "In the studio" page. That is how Degas, Bell and Baines work today.

### Step 8 — Put it on the homepage (optional)

- **Story wall and artist index:** automatic. Every registered story appears; stand-ins sort last and carry a "Preview image" badge.
- **Hero slideshow:** add the slug to `HERO` in `src/app/page.tsx`. Order matters: the strongest, most famous pictures go first. Only stories with a cleared, non-stand-in image are shown, so a stand-in can never front the site.
- **DetailZoom section:** this uses Hokusai and the beat that has his `twist`. To feature another story there, change `getStory("katsushika-hokusai")` in `page.tsx`. The chosen beat's focus must be on a detail that still reads at 7×, so it needs a high-res image.

### Step 9 — Check, QA, preview, commit

```bash
npm run lint && npx tsc --noEmit
npm run build && (npm start &)          # then, in another shell:
npm run qa -- jane-painter              # phone + desktop: band overlap, overflow, errors, 404s
npm run qa -- --shots jane-painter      # also saves phone screenshots to .focus/
```

- Fix anything QA reports. Usually that means a line that is too long, so shorten the copy rather than changing the CSS.
- Read the page on a real phone if you can.
- Rebuild the preview for review (§9).
- Commit the story, the sources md, the image, `images.generated.json`, `artists.ts`, `index.ts` and any manifest change together:

```bash
git add src/content docs/sources public/art scripts/art-manifest.json src/app/page.tsx
git commit -m "Add Jane Painter: The Harbour"
```

### Checklist (copy into your PR)

- [ ] Artist died 1955 or earlier; work is PD
- [ ] `docs/sources/<slug>.md`: one row per line of copy; nothing `weak` in the copy; surprising claims have two sources
- [ ] Quote is real and logged
- [ ] One twist; beat 1 at 50/50/1; every other beat has a caption
- [ ] Image record: `sourcePage`, `licence`, `longEdge` (≥ 2000, or noted), `holder`, `checkedOn`
- [ ] `focus:check` crops (phone and desktop) each show the detail their lines describe; no black edges
- [ ] Registered in `stories/index.ts` (birth order) and `artists.ts`
- [ ] Lint, tsc, build and `npm run qa` all pass

## 6. The zoom system: grid, focus points and checking

### Coordinates

- `focus.x` and `focus.y` are **percentages of the whole painting**, measured from the top-left corner. They are not pixels, and not percentages of the screen.
- `{ x: 50, y: 50, scale: 1 }` is the whole picture.
- `scale` is how much the canvas is enlarged. At `scale: 2.5`, the screen shows roughly 1/2.5 of what it showed at scale 1, centred on (x, y).

### What is on screen (the maths `focus-check` uses)

On a 390×844 phone the canvas is `max(390, 844 × aspect)` px wide, so most paintings are wider than the phone even at scale 1.

| Painting | Visible at scale 1 | Visible at scale 2.5 |
| --- | --- | --- |
| Portrait, aspect 0.8 | about 58% of the width | about 23% of the width, 40% of the height |
| Landscape, aspect 1.5 | about 31% of the width | about 12% of the width |

Two consequences:

- **On phones, landscapes are already cropped hard at scale 1.** For a wide painting, use lower scales (1.6–2.2). The detail fills the screen sooner than you'd expect.
- **Points near an edge show the page behind the painting** (black) once zoomed. Keep the focus at least `50 / scale`% of the visible window away from the edges, or lower the scale. `focus-check` shows this as black bands.

### The method

1. **Grid the whole painting**:

   ```bash
   npm run focus:grid -- <slug>
   ```

   It writes `.focus/<slug>-grid.png`, with lime lines every 10% labelled in full-canvas percentages. Find the rough area of each detail your copy mentions.
2. **Grid a region**:

   ```bash
   npm run focus:grid -- <slug> --region x0,y0,x1,y1 --step 2
   ```

   This zooms into the box from (x0,y0) to (x1,y1), still labelled in full-canvas %. Read the exact centre of the detail: the face, not the body; the signature, not the corner. For example, the Rembrandt figure looking out at the viewer was found with `--region 30,55,90,90` and sits at (48, 72).
3. **Pick the scale.** Small details (faces, inscriptions, signatures) need 2.6–3.2. Groups and objects need 1.8–2.4. For wide paintings on phones, go lower (see above). The beat with the twist often deserves the tightest zoom.
4. **Write the values** into the story's `focus`.
5. **Check**:

   ```bash
   npm run focus:check -- <slug>
   npm run focus:check -- <slug> --desktop
   ```

   It writes `.focus/check-<slug>.jpg`: the whole painting, then one crop per beat, sized exactly like the live page at 390×844 (or 1440×900), with the caption on each tile. Ask of each tile: does it show what the lines say, with the detail near the centre? Is there no black edge?
6. **Iterate**, then confirm in the browser with `npm run dev`. The vignette and text cards cover parts of the screen, so look at the real page once.

### When the image changes, the zooms must be re-checked

Focus points belong to one specific image. A different crop or framing of the same painting shifts them: Commons files often include the frame or have different margins. After swapping an image (for example, a 1280px upload replaced by the Commons original), run `npm run focus:check -- --all` and fix anything that moved. Mistakes caught this way so far:

| Story | What was wrong | Fix |
| --- | --- | --- |
| Dürer | inscription and monogram zooms missed | inscription moved to (78,12), monogram to (11,11) |
| Klimt | faces zoom missed | faces moved to (56,15) |
| Rembrandt | all four detail beats needed adjusting | — |
| van Eyck | a face close-up was imported instead of the full portrait | re-imported the full portrait |

## 7. Images and rights

Full detail is in `docs/RIGHTS.md`. The rules:

1. **Nothing renders unless `status: "cleared"`.** `Painting.tsx` enforces this.
2. **Clear an image from its source page, not the file URL.** That means the Commons file page or the museum's open-access record, and it must carry an explicit **PD / PD-Art / CC0** tag. No tag means rejected, however good the file looks.
3. **Long edge ≥ 2000px** for launch (the master is stored at 2400px max). Smaller files show soft at high zoom.
4. **Check the holder:**
   - Italian state museums and the Vatican restrict commercial reproduction. In `art-manifest.json`, `autoClear: false` keeps those pending until Pete signs off. This currently applies to Botticelli, Gentileschi, Caravaggio and Michelangelo; their preview uploads are cleared only for design review.
   - Some EU and UK holders claim copyright in their photos.
5. **Every record keeps:** `sourcePage`, `licence`, `longEdge`, `holder`, `checkedOn` (the scripts write them).
6. **Stand-ins** (`standIn` set) are PREVIEW ONLY: another work by the same artist, labelled on the page. `npm run fetch-standins -- --clear` removes them all. Their zoom points won't match the story.

### The routes, best first

| Route | How | Notes |
| --- | --- | --- |
| Met Open Access | `met: { objectId }` in `art-manifest.json` → `npm run fetch-art -- --apply <slug>` | Reads `storage.googleapis.com/gcs-public-data--met/<id>/object.json`, checks `isOasc` (CC0), downloads `0.jpg`. Find IDs in the Met CSV (`media.githubusercontent.com/media/metmuseum/openaccess/master/MetObjects.csv`) or on metmuseum.org. Some IDs aren't in the bucket (Homer 494854 wasn't; 11122 is). |
| Wikimedia Commons | `title` in `art-manifest.json` → `fetch-art` | Reads the licence from the file page metadata. Blocked from Claude cloud sessions (§11); works from a normal machine. |
| Smithsonian Open Access | S3 bucket `smithsonian-open-access` (metadata `metadata/edan/<unit>/*.txt`, media `media/saam/...`) | Used for the Cassatt stand-in. CC0 flagged per record. |
| By hand | download the original from Commons ("Original file" link) → `npm run import-art -- <slug>=<file> --source <page>` | The current 20 uploads came this way, at preview size. |

## 8. The homepage

`src/app/page.tsx`, top to bottom:

1. **`LensHero`**: a full-screen, dimmed painting with a "lantern" that magnifies (1.14×) and lights the area under the finger or cursor.
   - It is driven by CSS variables `--mx`, `--my` and `--r`, eased with a requestAnimationFrame lerp. After 2.2s with no input the lantern drifts on its own.
   - Tap zones: left third goes back, the right two-thirds go forward.
   - Slides auto-advance every 7s, with progress bars. Auto-advance pauses on pointer-down, when the hero is off-screen, and when the tab is hidden.
   - Slides come from `HERO`, filtered to cleared, non-stand-in images.
2. **Intro line**, in display type.
3. **`DetailZoom`**: a 320svh sticky section that starts at 7× on Hokusai's Fuji detail (the twist beat's focus) and pulls back to 1×, with three text beats and a call to action. Motion keyframe offsets must stay within 0–1 (values outside crashed it once).
4. **`StoryWall`**: a scroll-snap card row with a progress bar and desktop arrow buttons. Real paintings come first; stand-ins come last, with a badge.
5. **`ArtistIndex`**: every artist, oldest first, with "N years of painting" computed from the data.
   - Phones show thumbnails; desktop shows a floating preview on hover.
   - Artists without a story are tagged "Soon".
6. A lime **"Enter the directory"** call to action, then the footer. **No Pipeline link** anywhere (§13).

Everything is plain React, CSS and Motion. There is no paid service or third-party script.

## 9. QA, preview and deploy

### Browser QA

`npm run qa` (`scripts/tools/qa-stories.mjs`) needs a running site (`npm run build && npm start`). It loads every registered story at 390×844 and 1440×900, scrolls each section into view, and fails (exit 1) on:

- text inside the reserved bottom band
- text running off the right edge
- sideways page scroll
- page errors
- 4xx/5xx responses

Options:

- `--base https://<preview-url>` checks a Vercel preview instead of localhost.
- `--shots` saves phone screenshots to `.focus/`.

Latest run: 34 stories, no problems, no errors.

### Static preview (claude.ai Artifact)

`npm run preview` runs `scripts/preview/build-preview.sh`. It copies the repo (including uncommitted content) into `.preview/` and builds a static export there:

- with relative assets (`output: "export"`, `assetPrefix: "./"`)
- with `next/link` swapped for `scripts/preview/PreviewLink.tsx`, which gives flat page names: `home.html`, `artists.html`, `artist-<slug>.html`

It then post-processes the output:

- renames `_next` to `nx` (artifact paths starting with `_` are reserved)
- escapes U+FFFD in the JS (the upload rejects it)
- rewrites `/art/` to `art/` (`relart.py`)
- adds `quicklime-preview.html`, which redirects to `home.html`

The result is in `.preview/out`, with a `{published: source}` file map in `.preview/files.json`. To publish, use the Artifact tool:

- page: `.preview/out/quicklime-preview.html`
- `root`: `.preview/out`
- `files`: the map
- `url`: the existing preview URL above, to keep the link the same

None of this touches the real site build.

### Deploy

See `docs/DEPLOY.md`:

1. Import the repo into Vercel as Next.js. No env vars are needed.
2. QA on the preview URL.
3. In Afrihost, change **only** the apex A record and the `www` CNAME. **Keep the MX, SPF, DKIM and DMARC records** and the `pipeline.quicklime.co.za` record exactly as they are.
4. Lower the TTL a day ahead.

## 10. Tool reference

All the tools live in `scripts/tools/` (shared helpers in `_lib.mjs`) and write to `.focus/` (gitignored).

| Command | What it does |
| --- | --- |
| `npm run focus:grid -- <slug\|file> [--region x0,y0,x1,y1] [--step N] [--out f.png]` | Percentage grid over the painting (or a region of it), labelled in full-canvas % |
| `npm run focus:check -- <slug...> \| --all [--desktop]` | Whole painting plus one true-to-screen crop per beat, captioned |
| `npm run contact-sheet -- <folder\|files...> [--cols N]` | Numbered thumbnails and sizes, to identify uploaded files |
| `npm run import-art -- <file\|folder> \| <slug>=<file> [--source URL]` | Import hand-supplied images, write the rights record, list what is still on stand-ins |
| `npm run fetch-art [-- --apply] [slugs]` | Manifest-driven fetch (Met, then Commons), with the licence/size/autoClear gate |
| `npm run fetch-standins [-- --clear]` | Add or remove preview stand-ins |
| `npm run qa [-- --base URL] [--shots] [slugs]` | Browser QA (Playwright) |
| `npm run preview` | Static preview build for the Artifact |

Playwright isn't a project dependency. In Claude cloud sessions it is installed globally, with Chromium in `/opt/pw-browsers`. Elsewhere, run `npm i -g playwright && npx playwright install chromium`.

## 11. Environment limits and workarounds (Claude cloud sessions)

These apply when the next developer is a Claude agent in a claude.ai cloud session. They don't apply on a normal laptop.

**Blocked:**

- Wikimedia (Commons and Wikipedia uploads)
- most museum websites
- image proxies
- WebFetch, which fails on DNS

**Reachable:**

- the npm registry
- GitHub (raw and LFS via `media.githubusercontent.com`)
- `storage.googleapis.com` (the Met bucket)
- the `smithsonian-open-access` S3 bucket

**Workarounds:**

- **Node fetch through the proxy** needs `NODE_USE_ENV_PROXY=1`. The `fetch-*` npm scripts set it.
- **Research:** WebSearch works but is capped at roughly 200 searches per session, shared across sub-agents. Budget it: about 5–8 searches per story. Mark anything seen only in a search excerpt as `re-check`.
- **Images Claude can't download:** ask the user to upload the Commons "Original file". Then run `contact-sheet` to identify the files, and `import-art slug=file --source …` to import them.

## 12. Outstanding before launch

1. **Images** (status as of 12 Oct 2026):
   - **Done (12 Oct):** 15 stories now use Commons originals from Pete's Drive folder (folder ID `1uqSmR_fePNyqkLuqV6AKYWbP9K5AupWc`). See the §2 table. Their `sourcePage` points at the Commons file page. Checking crops on the new files found zoom points that missed their subject. These 19 were re-aimed today and checked with `focus:check`:
     - Cassatt 4; Renoir 3 and 4; Cézanne 4; Botticelli 1 and 3
     - van Eyck 2 and 3; Turner 1; Bosch 4
     - Gauguin 1, 3 and 4; Van Gogh 1
     - Dürer 3 and 4; Vermeer 4; Munch 2; Seurat 1
   - **Still to do:** Munch (11.4MB), Mona Lisa (9.2MB) and Klimt (7.1MB) are in the folder but over the Drive connector's limit. Rembrandt at 6.2MB worked; Klimt at 7.1MB broke the connection. Pete should re-export these three at 4000px (or under 6MB) into the same folder.
   - **Connector mechanics:** `download_file_content` saves base64 JSON to a tool-results file. Decode it with Python, then import. Drive file names come back in decomposed Unicode, so "é" and "ü" won't match a typed path. Glob for the file instead.
   - **Manifest titles that fail:** these `art-manifest.json` titles fail the floor or are gone from Commons. Update the manifest when importing.
     - Caravaggio: the old file was deleted. Use `Caravaggio-Nativity(1600).jpg` (2940px, PD), which shows the Palermo *Nativity*.
     - Kandinsky: the old file is 1090px. Use `Kandinsky - Composition 8, July 1923.jpg` (3911px, CC0). It is a gallery photo, so crop the frame before importing.
     - Gentileschi: the old file is 1500px. The 2500px `Judit decapitando a Holofernes, por Artemisia Gentileschi.jpg` carries a "Copyright MiBACT 2017" watermark. Don't use it. Keep the preview until Pete decides.
     - Michelangelo: the old file is 634px. No whole-ceiling photo on Commons is both 2000px or larger and PD/CC0; the large ones are CC BY or CC BY-SA. **Pete decides:** accept CC BY with a photographer credit, crop the story to one bay, or drop it.
   - **Verified on Commons (PD, 2000px or larger):** the manifest titles for Rembrandt, Dürer, Leonardo, Vermeer, van Eyck, Bosch, Turner, Cassatt, Renoir, Cézanne, Seurat, Van Gogh, Gauguin, Munch, Klimt and Botticelli.
   - **Monet:** *Water Lilies: Green Reflections* is not on Commons under the manifest title, and searches found nothing. It is still on the stand-in.
   - Decide on Velázquez (the Met's file is 1024px), Courbet (1905px) and Modigliani (1912px).
   - Pete to sign off, or swap, the Italian and Vatican works: Botticelli, Gentileschi, Caravaggio, Michelangelo.
   - **Zoom points:** Dürer's inscription and monogram, Vermeer's pearl, Munch's two walkers and Seurat's monkey were re-aimed. Munch beat 3 ("Pencil inscription, top left") can't be checked: the inscription is invisible at 2000px. Re-check it on the full-size file, or cut the beat.
2. **Fact-check pass:** open every source page behind each `re-check` row in `docs/sources/*.md`. Known weak spots:
   - **Rembrandt**, "Twelve disciples. Christ. Count again. Fourteen.": only one hedged source. Find a museum or catalogue source, or rewrite the twist.
   - **Renoir:** confirm the quote's wording and source.
   - **Velázquez:** confirm the translation of the quote and credit the translator.
   - **Degas, Bell, Baines:** held back (§2). Each needs a real quote or hook before registering.
3. **Deploy:** Vercel setup and DNS cutover per `docs/DEPLOY.md`, with the MX records untouched.
4. **Analytics:** Bklit is undecided (hosted or self-hosted). Nothing is installed; add it in `layout.tsx` once decided.
5. **Tier B (in-copyright artists):** the treatment (low-res commentary crop vs text-only) is an open decision. Don't build it until Pete decides.

## 13. Decisions already made

These came from the owner (Pete). Don't reopen them without asking.

- **Artists:** as many quality public-domain artists as possible.
- **Pipeline-V3** (pipeline.quicklime.co.za) is **hidden and unlinked**. Nothing on quicklime.co.za links to it; only people with the URL can find it. Leave its DNS record alone.
- **Sources** show on every story page.
- **Cost:** no running costs. Own code only; no paid services or plugins.
- **Mobile first:** the homepage must be excellent on phones.
- **Stand-ins and preview-size uploads** are fine for design review. Pete will provide or approve the final launch images.
- **Klaviyo:** never change, delete or add anything in any Klaviyo account without Pete's explicit approval.
