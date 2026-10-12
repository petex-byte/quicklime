# Quicklime

quicklime.co.za: walk through the best art. Next.js (App Router), Tailwind 4, Motion. Deploys to Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export of every route
npm run lint
```

## Layout

| Path | What |
| --- | --- |
| `src/app/page.tsx` | Homepage: cursor-reactive hero, one path into the directory |
| `src/app/artists/page.tsx` | Directory: card grid with search and movement/nationality/era filters |
| `src/app/artists/[slug]/page.tsx` | Artist page. Renders the story template if a story exists, otherwise an "in the studio" holding page |
| `src/components/story/StoryPage.tsx` | The template: cover → beats (pinned canvas, spotlight pan + punch-zoom) → full reveal → quote → close → footer |
| `src/content/artists.ts` | Directory data |
| `src/content/stories/*.ts` | One file per story. Register it in `stories/index.ts` |
| `docs/sources/*.md` | Sources list per story, one row per line of copy |
| `docs/RIGHTS.md` | How an image gets cleared |

## Adding an artist story

1. Research: 3–5 facts from museum or encyclopedic sources. Cross-check anything surprising against a second source. Log every claim in `docs/sources/<slug>.md`.
2. Draft in the house voice: short sentences, hard stops, one twist line, a mandatory quote taken from the piece's own facts.
3. Copy `src/content/stories/rembrandt.ts`, fill it in, and register it in `stories/index.ts`.
4. Clear the image per `docs/RIGHTS.md`, then tune each beat's `focus` (x/y in % of the canvas, plus zoom) against it.

## Pipeline-V3

Lives at pipeline.quicklime.co.za and is untouched by this rebuild. It is deliberately unlinked: nothing on quicklime.co.za points to it, so only people who have the URL can find it.

## Story status

34 stories are live: 33 show their real painting (20 of them as 1280px Wikipedia previews to be swapped for full-size files), 1 (Monet) still shows a labelled stand-in. Every fact was checked against web-search results only, because this build's sandbox couldn't open source pages. Rows marked `re-check` in each `docs/sources/*.md` still need the source page itself opened before launch.

Held back, with drafts in the repo but not registered in `stories/index.ts`:
- **Degas:** quote unverified, hook single-sourced
- **Charles Davidson Bell:** the quote is a medal name, not anyone's words
- **Thomas Baines:** no specific work pinned to a holder yet (see `docs/sources/thomas-baines.md`)

## Deploy and DNS

See `docs/DEPLOY.md`.
