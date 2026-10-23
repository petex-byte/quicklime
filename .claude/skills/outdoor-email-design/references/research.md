# Research log: who builds The North Face and Salomon emails, and how they look

Append new entries at the top. Never edit an old entry; add a correction instead.
Confidence tags: **[Certain]** = a primary or vendor source says it; **[Likely]** = strong inference; **[Guessing]** = filling a gap.

---

## 2026-10-23 · first pass

### Question 1: which agencies design their emails?

**Answer: no public source credits a specialist email design agency for either brand.** Both run email mostly in house, on vendor platforms. Treat any "agency X designs The North Face emails" claim as unverified until a primary source says so.

| Brand | Who / what | Role | Source | Confidence |
|---|---|---|---|---|
| The North Face | In-house creative team | Creative strategy and production brought in house | AdExchanger, 6 Dec 2022, "How The North Face Put A New Face On Its Marketing" | [Certain] |
| The North Face | WITHIN | Won the creative-services RFP (spring 2022), then media (Oct 2022). Performance and ad creative, not named for email | Same article | [Certain] for ads; [Guessing] for any email role |
| The North Face | Bluecore | Sending and personalisation platform; about 25 emails a month, 292 tracked since May 2023 | emaillove.com/authors/the-north-face (checked 23 Oct 2026) | [Likely] (third-party detection) |
| Salomon | In-house CRM team (e.g. "Email Coordinator, NAM"; Head of Data Platform) | Builds audiences and campaigns themselves | hightouch.com/customers/salomon | [Certain] (vendor case study) |
| Salomon | Snowflake + Hightouch | Composable CDP. Audience build 14x faster, +30% opens, +85% CTR vs 2024 averages; AI Decisioning pilot on ~350,000 customers: +124% email click rate vs holdout | Same | [Certain] (vendor numbers, vendor-reported) |
| Salomon Japan | Omnisend | ESP for Japan. 130,000+ customers per send; a global template adapted locally; segments by ski, snowboard, outdoor, running; loyalty-tier and birthday triggers; several people review every send; A/B tests in checkout-abandon flow | omnisend.com/resources/customers/salomon-japan (modified 4 Jun 2025) | [Certain] (vendor case study) |

**What this means for the studio:** the "agency standard" to beat is an in-house team with a good template system, tight segments and a review step. That is exactly what a design system plus a checklist gives a one-person studio.

### Question 2: what do their emails look like?

Studied: The North Face, "Bags that make travel a breeze", 19 Oct 2026 (Email Love #376, sent via Bluecore). Salomon, "Gear in high demand", archived 17 Mar 2025 (Email Love salomon-6). Screens are linked, not stored: third-party brand images stay out of this repo.

- TNF screenshot: https://pub-358a6afec6aa419f9d1772bd320b10aa.r2.dev/2026/10/email-inspiration-from-the-north-face-376829660074_screenshot.jpg
- Salomon screenshot: https://pub-358a6afec6aa419f9d1772bd320b10aa.r2.dev/2025/03/email-inspiration-from-salomon_img-67d7f1a0b4581_screenshot.jpg

**Shared patterns [Certain, from the two screens]:**

1. One column, 600 px design width, image-led. Copy is a headline plus one or two short lines per section.
2. Logo centred at the top. No top nav bar in either.
3. Hero: product or lifestyle photo, then a live-text headline below it (TNF: two-line bold sentence case; Salomon: uppercase).
4. One primary button style, repeated all the way down. TNF: black rectangle, white text. Salomon: black pill, white uppercase text.
5. Products on light grey (TNF) or white (Salomon) tiles, cut out, with a small caption under each. Single product full width, or 2x2 grid.
6. Lifestyle panels with text set over the photo (TNF), or 2-up photo pairs (Salomon).
7. Category splits: "Women's Fleece / Men's Fleece" tiles (TNF); stacked "Shop Men's / Shop Women's" buttons (Salomon).
8. A small monospace product label over a photo (TNF: "YUMIORI OFF PEAK FULL-ZIP").
9. A secondary button on images: white-outline ghost pill (TNF).
10. Text-link CTA under 2-up products: underlined "SHOP NOW" (Salomon).
11. Service band before the footer: icons + four promises (free shipping for members, easy returns, warranty, talk to an expert) and one CTA (Salomon). Loyalty card in the footer (TNF "XPLR Pass").
12. Footer: logo, Men's / Women's / Kids', store / app / resale utilities, hashtag + social icons, address, unsubscribe, privacy, view in browser, manage preferences.

**Differences worth keeping as theme options:** TNF = sentence case, sharp corners, grey product grounds, warmer editorial overlays. Salomon = all caps, pill shapes, white grounds, a dark grey service band and a black footer.

### Open questions for the next update

- Find a primary source (agency case study, trade press, LinkedIn post by the agency) that names an email design or CRM agency for either brand. Search terms that came up empty on 23 Oct 2026: "The North Face email agency", "Salomon email design agency", "Amer Sports email lifecycle agency".
- Study 3 more emails per brand across types (welcome, cart abandon, launch, sale) before changing the module list.
- Check dark-mode renders of both brands (Email Love shows light only).
