# Quicklime — Agentic Rebuild Spec

Oct 11, 2026 · @Pete

## Rights, corrected

"Educational and non-commercial" doesn't clear copyright by itself. US fair use weighs four things together: purpose, the work's nature, how much is used, and the effect on the market. A full-bleed reproduction of an entire painting fails the "how much" factor regardless of intent.

Quicklime isn't a classroom. It carries Pete's professional story (CV strategy, Pipeline-V3, his agency work), so an estate's lawyer has a real argument the site carries indirect commercial value even with no ads on it. Warhol's, Banksy's and Haring's estates are known to send takedowns regardless of stated purpose.

So this build only uses art in the public domain: artists dead 70+ years, the Berne Convention standard, which South Africa also follows.

A correction on my own earlier work: two turns back I called Irma Stern, Pierneef and Laubser safe. They aren't. Stern died in 1966, Pierneef in 1957, Laubser in 1973, none past 70 years. I pattern-matched "South African" to "safe" without checking dates, the same mistake as Guernica and Nighthawks before that.

| Artist | Movement | Died | Featured work |
| --- | --- | --- | --- |
| Albrecht Dürer | Northern Renaissance | 1528 | Self-Portrait at 28 |
| Rembrandt van Rijn | Baroque | 1669 | Christ in the Storm on the Sea of Galilee — built |
| Leonardo da Vinci | High Renaissance | 1519 | Mona Lisa |
| Michelangelo | High Renaissance | 1564 | Sistine Chapel ceiling |
| Johannes Vermeer | Baroque | 1675 | Girl with a Pearl Earring |
| Caravaggio | Baroque | 1610 | Nativity with St. Francis and St. Lawrence |
| Artemisia Gentileschi | Baroque | c. 1656 | Judith Slaying Holofernes |
| Sandro Botticelli | Early Renaissance | 1510 | The Birth of Venus |
| Claude Monet | Impressionism | 1926 | Water Lilies |
| Vincent van Gogh | Post-Impressionism | 1890 | The Starry Night |
| Paul Cézanne | Post-Impressionism | 1906 | The Card Players |
| Edgar Degas | Impressionism | 1917 | The Dance Class |
| Mary Cassatt | Impressionism | 1926 | The Child's Bath |
| Pierre-Auguste Renoir | Impressionism | 1919 | Luncheon of the Boating Party |
| Paul Gauguin | Post-Impressionism | 1903 | Where Do We Come From? |
| Georges Seurat | Pointillism | 1891 | A Sunday on La Grande Jatte |
| Wassily Kandinsky | Abstract | 1944 | Composition VIII |
| Edvard Munch | Expressionism | 1944 | The Scream |
| Gustav Klimt | Symbolism | 1918 | The Kiss |
| Thomas Baines | Colonial South African | 1875 | Victoria Falls expedition paintings |

Nineteen artists, not twelve, not fifty. Pierneef, Stern and Laubser can go back on the list in 2027, 2036 and 2043, when their terms run out.

## Goal

Done means: quicklime.co.za live on Vercel, a homepage carrying noth.in-grade motion, a searchable artist directory, all nineteen artists built on the Rembrandt template, and the Pipeline-V3 page untouched at its own route. Every fact sourced, every image rights-checked, every page in the same voice.

## Stack and hosting

Next.js (App Router), Tailwind, shadcn/KokonutUI for components, Motion for scroll animation, Bklit (hosted) for analytics. Deployed on Vercel, not Afrihost, static HTML can't run KokonutUI natively.

quicklime.co.za's DNS moves from Afrihost to Vercel. Check Afrihost's MX records before cutover: if email runs through that domain, moving the A/CNAME records without preserving MX breaks it. pipeline.quicklime.co.za is a separate subdomain, untouched by this change.

## Site architecture

&#91;embedded content: sitemap · home, directory, artist template, Pipeline-V3\]

Home branches two ways: into the artist directory, which feeds nineteen artist pages off one shared template, or sideways to Pipeline-V3's own page, which this rebuild doesn't touch.

## Homepage: the noth.in character

I haven't driven noth.in live yet, only read its metadata through search. Before building the homepage I pull it up in a real browser and study the actual cursor behaviour, hover states and load sequence, not a text description of them. That's the first build step, not a research-phase nice-to-have.

What the search confirms: noth.in is a Paris studio site built around heavy, AI-flavoured 3D and cursor-reactive motion, the kind that makes a portfolio feel alive before you've read a word. For quicklime that character translates to: a hero that reacts to the cursor or scroll immediately on load, large confident type, one clear path down into the directory, and restraint everywhere else so the motion reads as craft, not noise.

## Artist directory

The fields in your 50-artist screenshot are the right data model: name, nationality/region, movement, era, search, and filters. That part carries over as-is.

The visual language doesn't. A dark SaaS admin table reads as a dashboard, not a museum. "Walking through the best art" wants a card grid instead: a cropped detail of each painting as the card face, name and era as the only visible text, filters collapsed into a single bar above. Same filtering logic underneath, different skin on top.

## Artist page template

Generalized from the Rembrandt prototype, not rebuilt from scratch per artist:

1. Cover: painting as hero, short title, artist and year.
2. Four to six story beats: pinned painting background, text card holds in place while a spotlight pans and punch-zooms to the next detail. Each beat is its own scroll-snap section.
3. One full-reveal breather: overlay lifts, the whole canvas shows uncropped, minimal text.
4. Quote break: the piece's strongest line, large type, dimmed backdrop.
5. Close beat: real context, a fact, an event, a consequence, not just trivia.

Glass-card panels (SVG refraction filter), a bottom band reserved on every section for the scroll cue and captions so nothing overlaps, and the cue drops away at the footer so its absence signals the end.

## Voice standard

Short sentences. Hard stops. Fragments where they land harder than full ones. One twist line per piece, usually where a detail turns out to mean more than it first looked like. No scene-setting exposition, no "this painting depicts". A quote line is mandatory, pulled from the piece's own facts, not invented. Every fact drafted gets verified before it ships, not after a reader catches it.

## Research pipeline, per artist

1. Pull 3-5 verified facts from real sources: museum pages, encyclopedic sources, not blogs repeating each other.
2. Find the hook, a count, an object, an incident, a provenance detail, something concrete enough to anchor the copy the way the fourteenth figure anchored Rembrandt's page.
3. Cross-check anything surprising against a second source before it goes in a draft. The 14-figure claim held up under this check; it's the standard going forward, not a one-off.
4. Keep a short sources list per artist, internal reference, not necessarily published on the page unless Pete wants attribution visible.

### Research node: fun facts and untold stories

Scope corrected: this runs on all fifty artists from the directory, not just the nineteen with cleared image rights. Research and commentary are fair use regardless of an artist's death date. Only the hero-image treatment stays gated by rights, covered below and in Image sourcing.

**Node input:** one artist/work pair from the fifty-name list.

**Node output per work:**

- 3-5 verified facts, museum-sourced or encyclopedic, not blog-repeated
- one untold-story hook: a theft, a feud, a hidden detail, a rejection, a scandal, a trial, an obsession, the thing that makes someone stop scrolling
- a cross-check note on anything surprising, second source required before it's treated as fact
- an image-tier flag: Tier A (public domain, full hero treatment) or Tier B (in copyright, commentary-only crop or text-only page)
- a short sources list

**Good sources for the untold-story hook specifically**, not just the encyclopedic facts: museum curatorial blogs and "stories behind the work" series, Smarthistory, Artsy and Artnet editorial (not their market reporting), biography excerpts, auction-house provenance notes, exhibition catalog essays, news archives for theft, restitution and forgery cases. Encyclopedic sources give facts; these give the story.

**Starter hooks for the Tier B list**, from memory, unverified, each needs the same cross-check as everything else before it's drafted:

| Artist | Untold-story angle |
| --- | --- |
| Pablo Picasso | Guernica painted in days after the Nazi bombing of a Basque town, still a political flashpoint |
| Salvador Dalí | Expelled from art school for telling examiners none of them were qualified to judge him |
| Frida Kahlo | Began painting during a year in a full-body cast after a bus accident that nearly killed her |
| Edward Hopper | Married his only model, Josephine, who logged every painting in a shared ledger for forty years |
| Jackson Pollock | Died in a car crash at 44, drunk, with his mistress in the car, his wife out of the country |
| Andy Warhol | Shot and nearly killed in his studio by a woman he'd rejected a film script from |
| Banksy | A work self-destructed by shredder seconds after selling for over a million pounds at auction |
| Jean-Michel Basquiat | Slept in his own paintings-in-progress as a teenager, with nowhere else to go |
| Marcel Duchamp | Submitted a urinal as sculpture under a fake name, the jury that rejected it ran the show |
| Keith Haring | Drew directly on blank subway ad panels across New York before anyone knew his name |
| Yayoi Kusama | Has lived voluntarily in a psychiatric hospital since the 1970s, working in a studio nearby |
| Zanele Muholi | Had a home break-in where years of archived photographs were stolen, not valuables |

## Image sourcing rules

Resolution floor: long edge at least 2000px, matching what the Rembrandt page used. Acceptable sources: Wikimedia Commons tagged public domain, and museum open-access programs with explicit PD or CC0 release, Rijksmuseum, the Met's Open Access, the National Gallery. Reject anything without a clear rights tag on the source page itself, a high-res image with no stated license is not evidence of one.

One wrinkle: a museum's own photograph of a 2D public-domain painting is itself public domain under US law (Bridgeman v. Corel), but several EU institutions and the UK's 2019 directive take the opposite position and claim a new copyright on the photograph. Check this per image, not once for the whole list, since sourcing will mix US and European museums.

## Agentic build sequence

1. Confirm the artist list and the DNS/hosting plan with Pete (open in Open decisions below).
2. Scaffold the Next.js project, deploy an empty shell to a Vercel preview URL so there's a live target from day one.
3. Drive noth.in live in a real browser, extract the specific motion patterns worth reusing, then build the homepage shell.
4. Build the artist directory on the card-grid layout.
5. Generalize the Rembrandt page into the reusable template components (sections 7 above).
6. Per artist, in parallel: research and verify facts, source and rights-check images, draft copy in the Ritchie voice, build the page from the template.
7. QA pass across all nineteen pages: broken links, mobile layout, rights re-check, voice consistency.
8. Cut the DNS over last, after everything above is verified live on the preview URL.

## Open decisions

- [ ] Confirm the nineteen-artist list, or trim/extend it.
- [ ] Confirm DNS cutover timing and check whether Afrihost handles quicklime.co.za email (MX records) before moving anything.
- [ ] Pipeline-V3 in the main nav, or linked only from its own dedicated page.
- [ ] Bklit hosted vs self-hosted, final call.
- [ ] More public-domain South African artists exist beyond Thomas Baines, but I haven't verified death dates on further candidates this pass. Worth a dedicated research step before the list is called final.
- [ ] Decide the Tier B page treatment: low-res commentary crop vs. text-only, and whether it's the same decision for all thirty-one or made per artist
