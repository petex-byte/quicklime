# Portfolio subdomain wireframe

**Address:** `work.[yourdomain]` (e.g. `work.redpenandpixel.com`)
**Job of the page:** a buyer who found the studio on Fiverr, LinkedIn or Instagram sees proof in 20 seconds and clicks through to a Fiverr gig.
**Rule:** this page links *to* Fiverr. Never paste this page's link into Fiverr messages or gig text (Fiverr bans off-platform links).

Three sections. One scroll. No menu bar beyond the logo.

---

## Section 1: Hero (100% of the first screen)

```
┌──────────────────────────────────────────────────────────────┐
│ RED PEN & PIXEL  (logo, top left)                            │
│                                                              │
│   I catch what slips.                     ┌───────────────┐  │
│   ─────────── (red pen underline)         │  Paper and    │  │
│                                           │  red pen,     │  │
│   Apps, sale emails and contracts.        │  no faces,    │  │
│   Read twice before they reach you.       │  no names     │  │
│                                           └───────────────┘  │
│   [ See the work ↓ ]   [ Order on Fiverr → ]                 │
│                                                              │
│   Figma · HTML email · English + Afrikaans · Claude          │
└──────────────────────────────────────────────────────────────┘
```

- H1: **I catch what slips.** (≤ 5 words)
- Sub line: one line, two short sentences.
- Primary button scrolls to Section 2. Second button opens the Fiverr profile in a new tab.
- Skill strip: four plain labels, grey, no icons.
- Mobile: photo moves above the H1, buttons stack full width.

## Section 2: Proof (the scrolling mock-ups)

```
┌──────────────────────────────────────────────────────────────┐
│  The work                                                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ ▶ laptop     │  │ ▶ laptop     │  │ ▶ phone      │        │
│  │ scroll video │  │ scroll video │  │ email video  │        │
│  │ (Site A)     │  │ (Site B)     │  │ (Gig 2)      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│  Portfolio site    Family trust site  Sale email flow        │
│  Figma → live      Plain and calm     Same in every inbox    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  BEFORE ◀━━━━━━━━━━━ drag ━━━━━━━━━━━▶ AFTER           │  │
│  │  dummy contract, clause 4.2:  30 days / 60 dae         │  │
│  │  red ring on the mismatch → fixed copy                 │  │
│  └────────────────────────────────────────────────────────┘  │
│  "14 mistakes found in one supplier contract."               │
└──────────────────────────────────────────────────────────────┘
```

- Three cards hold the Hyperframes MP4s (autoplay, muted, loop, `playsinline`). Poster image = frame 1.
- Below: a before/after drag slider on the dummy contract. This sells the contract work.
- One line of proof under the slider, with a real count.
- Mobile: cards stack, one per row; slider stays full width.

## Section 3: Order (five gigs, one click each)

```
┌──────────────────────────────────────────────────────────────┐
│  Pick a job                                                  │
│                                                              │
│  App & web screens ........ from $150   [ Order → ]          │
│  Sale emails + HTML ....... from $90    [ Order → ]          │
│  Contract proofreading .... from $40    [ Order → ]          │
│  Product data cleanup ..... from $60    [ Order → ]          │
│  Brand prompt library ..... from $50    [ Order → ]          │
│                                                              │
│  Built with Claude where it says so. Checked by a human.     │
│  Every time.                                                 │
│                                                              │
│  ─────────────────────────────────────────────────────────── │
│  Red Pen & Pixel · Cape Town · © 2026                        │
└──────────────────────────────────────────────────────────────┘
```

- Each row links to that gig's Fiverr URL.
- "from $X" pulls from `02_gigs/gig_pricing_matrix.csv` Basic tier. Update both together.
- Footer: name, city, year. No email form (keep all orders on Fiverr until you have repeat buyers).
