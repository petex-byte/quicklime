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

## Deploy and DNS

See `docs/DEPLOY.md`.
