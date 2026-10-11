# Story brief (for researchers and writers)

Every artist page is one painting told in one story. Read these first:
- `src/content/types.ts`: the `Story` type
- `src/content/stories/rembrandt.ts`: the reference story
- `docs/sources/rembrandt.md`: the reference sources file
- `docs/SPEC.md`: the full spec. The sections that matter here are Voice standard, Research pipeline and Image sourcing rules.

## Research rules
1. Gather 3–5 verified facts about the featured work from museum pages and encyclopedic sources, not blogs repeating each other.
2. Find a hook: a count, an object, an incident, a provenance detail, a theft, a feud, a hidden detail, a rejection, a scandal. Something concrete enough to anchor the copy.
3. Anything surprising needs **two independent sources** before it goes into the copy. If you can't get the second, leave it out, or log it as `weak` and keep it out of the copy.
4. The quote is mandatory and must be real: the artist's own documented words (a letter, diary or interview), a documented statement by a contemporary, an inscription on the work, or the text the work depicts. Never paraphrase it into quote marks, and never invent one. Log its source.
5. In this sandbox, WebFetch to most sites fails, so use WebSearch (it works). Be honest in the sources file: mark claims confirmed only from search excerpts as `re-check`.
6. Don't guess dates or numbers. If sources disagree, say so in the sources file and keep the disputed detail out of the copy.

## Voice
Short sentences. Hard stops. Fragments where they land harder. No scene-setting, and no "this painting depicts". Exactly one `twist` line per story, at the beat where a detail turns out to mean more than it first seemed. Each beat has 2–4 lines, and each line is short (under ~60 characters). The close beat is real context (a fact, an event, a consequence), not trivia. The heading is a date, number or short phrase.

## Structure
- 4–6 beats. The first beat sets the scene with `focus {x:50,y:50,scale:1}`.
- Every other beat zooms into one detail: `focus` x/y in percent of the canvas (0,0 is top left), scale 1.8–3.2. These are estimates from the known composition, so say so in the file comment. Every beat after the first has a `caption` naming the detail.
- Only describe visual details that are well documented, and mark them "visual: confirm against image" in the sources file.
- `image`: `{ src: "/art/<slug>.jpg", status: "pending", width, height }`. Width and height should match the real aspect ratio of the work (from its documented dimensions, scaled so the long edge is 1600).
- `showSources: true`. `sources` holds the 3–7 best links.
