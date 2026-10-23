---
name: outdoor-email-design
description: Design and build premium outdoor or retail sale emails the way The North Face and Salomon do (one column, image-led, one CTA style, product tiles, service band, structured footer), using the Red Pen & Pixel Figma email system and the Klaviyo HTML master. Use for any sale, launch, restock, abandoned-cart or newsletter email design, for Figma email modules, or when asked to update this skill's research.
version: 0.1.0
updated: 2026-10-23
---

# Outdoor email design

A design system and a delivery workflow for sale emails at the standard of top outdoor brands, sized for a one-person studio.

## What the evidence says (read before promising anything to a client)

Full log with sources: [references/research.md](references/research.md).

- **[Certain]** No public source credits a specialist email design agency for The North Face or Salomon. Both run email mostly in house on vendor platforms: TNF uses an in-house creative team plus WITHIN for ads and media, and sends through Bluecore. Salomon uses an in-house CRM team on Snowflake + Hightouch, and Omnisend in Japan.
- **[Certain]** What makes them good is the system: one global template adapted locally, tight segments (activity, loyalty tier), and a review step before every send. The design system and the QA list below copy that system, not their branding.
- Never say a client email is "by the agency behind The North Face". No such agency is on record.

## The Figma system

File: **Red Pen & Pixel · Outdoor Email System** · https://www.figma.com/design/x2tWZmy0qRVdKarpCg1SYt
Pages: Foundations (tokens, type, spacing, rules) · Components · Templates. Plan: Figma Starter, so 1 mode per collection and 3 pages. Themes are variants, not modes.

### Tokens

| Collection | What | Rule |
|---|---|---|
| Primitives | `neutral/0…950`, `accent/500, 600` | The only thing you change to rebrand for a client |
| Color | `color/bg/*`, `color/text/*`, `color/border/*`, `color/action/*`, `color/icon/*` (aliases) | Never edit per email |
| Spacing | `space/0…64` (4px base), `size/email` 600, `size/gutter` 32, `size/button-h` 48 | Padding and gaps are bound to these |
| Radius | `radius/sharp` 0, `sm` 4, `md` 12, `pill` 999 | Button shape comes from the Shape variant |

Text styles: Display/XL, Heading/L, Heading/M, Heading/Caps, Body/M, Body/S, Caption, Label/Mono, Button/Default, Button/Caps, Legal. Archivo + Inter + IBM Plex Mono in Figma; web-safe fallback Helvetica, Arial in HTML.

### Module catalogue

| Component | Node | Variants / props | Klaviyo master module |
|---|---|---|---|
| Header | 6:2 | Show web view · Logo (exposed) | 00 preheader + 01 header |
| Hero | 6:30 | Layout = Text below / Text on image · Headline, Body, Show body, Show scrim · Button (exposed) | 03 hero |
| Section heading | 6:12 | Case = Sentence / Caps · Title, Body, Show body | heading row in 06 |
| Product tile | 7:36 | Ground = Grey / White × Size = Half / Full · Name, Price, Show price, Show link | 06 product grid cell |
| Product row | 7:37 | Left, Right (exposed Product tiles) | 06 product grid row |
| Editorial panel | 7:50 | Label, Headline, Body, Show label | 07 feature split (full-bleed version) |
| Category split | 7:58 | Left label, Right label | new: two linked image cells |
| Service band | 8:70 | Theme = Dark / Light · Promise 1 to 4 · Button (exposed) | 09 promise row |
| Loyalty card | 8:71 | Programme, Benefit | 02 announcement (VIP) |
| Footer | 8:138 | Theme = Light / Dark · Legal, Show utilities | 11 footer |
| Button | 3:60 | Style = Primary / Outline / On image / Text link × Shape = Sharp / Pill · Label | bulletproof VML button |
| Spacer | 6:34 | Size = 16 / 32 / 48 | spacer rows |
| Divider, Logo, Image, Icon/* | 6:35, 3:2, 3:4, 3:10 to 3:43 | Image: Spec · Logo: Wordmark | |

Not yet in Figma, but in the HTML master: coupon (04), cart recovery (05), review quote (08). Add them as components before using them in a Figma design.

Templates (instances only, nothing detached): **Launch · Sharp, light footer** (9:2, TNF-like) and **Restock · Pill, dark footer** (9:138, Salomon-like).

## Workflow (agentic SDLC)

Run these in order. Each step has a done-check; don't start the next until it passes.

1. **Brief.** Goal, audience segment, offer, send date, one CTA label. Done when the email can be described in one sentence.
2. **Plan.** Pick modules from the catalogue, top to bottom. Pick one look: Sharp + sentence case + light footer, or Pill + caps + dark footer. Never mix them in one email. Done when the list has no more than 8 modules and only one hero.
3. **Build in Figma.** Duplicate the nearest template. Change content through component properties only. Detach nothing; if a module is missing, add a component first. Done when a structural read shows 0 non-instance nodes at the top level.
4. **Code.** Map each module to the Klaviyo master (`klaviyo-templates/premium-master.html`), using the table above. Render a sample with `klaviyo-templates/build_sample.py` to check it in a browser. Never touch a client's Klaviyo account without their go-ahead.
5. **QA.** Run every item:
   - Live text for headlines, prices and buttons. No text inside images.
   - Every image has alt text. Images exported at 2x slot width, each under 200 KB.
   - Buttons at least 48px tall, one primary label per section. VML buttons for Outlook on Windows.
   - Tested in Gmail, Outlook and Apple Mail, on phone and desktop, light and dark.
   - Every link goes to the right page, with UTM tags if the client uses them.
   - Footer has unsubscribe, manage preferences, sender address and why they get this.
   - Personalisation has a fallback (no "Hi ,").
   - `<meta charset="utf-8">` sits first in `<head>`: the master once broke "·" because of this.
6. **Caught-it sheet.** List each problem found in step 5: where it was, and what changed. Ship it with the files.
7. **Release.** Send a test to the client. Schedule only after their written OK.
8. **Learn.** Log anything new (a rendering bug, a pattern a brand started using) as a dated entry in `references/research.md`. Then follow "Updating this skill".

## Reusable content (defaults in the components)

- **Service promises:** Free delivery for members · Easy 30-day returns · Quality warranty · Talk to an expert. List only promises the client actually keeps.
- **Footer legal:** "You're getting this because you signed up at {Brand}. {Brand} · {address}". Links: View in browser · Manage preferences · Unsubscribe · Privacy.
- **CTA labels:** short and concrete ("Shop the drop", "Shop the tote", "See what is back"). Never "Click here" or "Learn more".
- **Voice:** the email speaks in the client's voice. Studio-facing copy (Fiverr, site, caught-it sheet) is first person singular, with no personal names.

## Updating this skill

1. Add a dated entry at the **top** of `references/research.md` with sources and confidence tags. Never rewrite old entries; add corrections instead.
2. If the finding changes a module, change the **Figma component first**, then the catalogue table above. Keep node IDs current: check them with a read-only `use_figma` lookup.
3. Bump `version` and `updated` in the frontmatter. Patch for fixes, minor for new modules or rules, major for a new look.
4. Add a line to the changelog below and commit.

Research to do next: see "Open questions" in `references/research.md`.

## Changelog

- **0.1.0 · 2026-10-23.** First version. Research on TNF and Salomon. Figma system with 4 token collections, 11 text styles, 25 components and 2 templates.
