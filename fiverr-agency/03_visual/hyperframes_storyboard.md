# Node 3: Visual Proof (Hyperframes storyboard)

## What I'm making

Scrolling video mock-ups of two live sites, built as HTML compositions in Hyperframes and rendered to MP4:

- **Site A:** Personal design portfolio → `[PORTFOLIO_URL]`
- **Site B:** the family trust website → `[TRUST_SITE_URL]`

Plus short clips for the email, legal and Claude gigs.

### Fiverr gallery limits (check the seller help page before upload; Fiverr changes these)

- 1 video per gig, 75 seconds max, under 50 MB. 1280 × 720, MP4 (H.264).
- Up to 3 images per gig. Use 1280 × 769 px. Keep text inside the middle 1100 × 650 so the search-card crop doesn't clip it.
- No contact details, URLs, QR codes or emails in any frame. Fiverr removes gigs that push buyers off-platform. Blur the URL bar in every browser shot.

### Before you record Site B (family trust)

Walk every page and blur or swap out: trustee names, ID numbers, bank details, addresses, phone numbers, minutes, and any family photos. If in doubt, swap real text for dummy text in a copy of the page. A buyer only needs to see the layout, not the family.

---

## Build recipe (any HTML-to-video tool, Hyperframes included)

1. **Capture.** Take a full-page PNG of each page at 1440 px wide (desktop) and 390 px wide (mobile). Chrome DevTools → "Capture full size screenshot", or Playwright `page.screenshot({ fullPage: true })`.
2. **Frame.** In the composition, place the PNG inside a device frame `<div>` with `overflow: hidden` (laptop: 1040 × 650 viewport; phone: 300 × 650).
3. **Scroll.** Animate the PNG's `transform: translateY()` from `0` to `-(imageHeight - viewportHeight)` with an ease-in-out curve. Pause 0.6 s on each section you want the buyer to read.
4. **Overlay.** Text and the red-pen circle sit in a top layer above the device.
5. **Render** at 1280 × 720, 30 fps. Check the Hyperframes docs for the current clip timing attributes and render command; the shot list below gives you the start time and length of every clip.

### Look and sound

- Background: warm off-white `#F6F1E9`. Ink: near-black `#1B1B1B`. Accent: red-pen red `#D7263D`. One accent only.
- Type: one bold sans for overlays (e.g. Inter Bold / Söhne Bold), 64 px headlines, 32 px labels.
- The **red-pen circle:** a hand-drawn red ring that "draws on" in 0.4 s around a caught mistake. It is the brand. Use it in every video.
- Sound: one soft lo-fi bed at -18 dB, plus a pen-scratch sound each time the red ring draws. No voice-over needed; Fiverr plays videos muted in the feed.

---

## Video 1: Gig 1 (UI/UX) master reel, 60 s

| # | Time | Frame (what you see) | Motion | Text overlay | Sound |
| --- | --- | --- | --- | --- | --- |
| 1 | 0:00–0:03 | Off-white screen. A red pen rolls in from the left and stops. | Pen rolls, 0.8 s | **I catch what slips.** | Pen roll on desk |
| 2 | 0:03–0:06 | The red pen draws a ring around the word "slips". | Ring draws, 0.6 s | Design · Words · Law | Music in |
| 3 | 0:06–0:16 | **Site A desktop.** Laptop frame, portfolio home page. | Slow scroll top → bottom, pause on hero and project grid | Portfolio site · Figma → live | Music |
| 4 | 0:16–0:22 | Same page, **Site A mobile.** Phone frame slides in to the right of the laptop. | Phone scrolls in sync with laptop | Built for the thumb | Swipe |
| 5 | 0:22–0:26 | Split screen: left = Figma frame of the hero, right = live site hero. | Wipe from left to right | Figma file → live page | Whoosh |
| 6 | 0:26–0:38 | **Site B desktop.** Family trust site, home → about → contact (blurred). | Scroll, cut between pages on each pause | Family trust site · plain and calm | Music |
| 7 | 0:38–0:44 | **Site B mobile** menu opening and closing. | Tap ripple on the burger icon, menu slides down | Every menu works on a phone | Tap |
| 8 | 0:44–0:52 | "Caught it" moment: a mock checkout screen. The "Pay" button sits below the fold on an iPhone SE frame. Red ring draws around it. Cut: fixed version, button in view. | Red ring draws, 0.4 s; hard cut | Before: hidden. After: tapped. | Pen scratch, then "ding" |
| 9 | 0:52–0:57 | Three gig tiers as cards: 1 screen / 5 screens / 12 screens. | Cards stack in | Click it before you build it. | Music |
| 10 | 0:57–1:00 | Logo: **Red Pen & Pixel** with the red pen under the words. | Pen draws an underline | Order in the packages below ↓ | Music out |

## Video 2: Gig 2 (Email), 30 s

| # | Time | Frame | Motion | Text overlay |
| --- | --- | --- | --- | --- |
| 1 | 0:00–0:03 | Phone frame, Gmail inbox, one sale email at the top. | Thumb taps it | **Sale emails, built right** |
| 2 | 0:03–0:12 | The email opens. Full sale email scrolls: hero image, product grid, "Shop now" button. | Scroll, pause on the button | Designed in Figma |
| 3 | 0:12–0:18 | Three frames side by side: Gmail, Outlook, Apple Mail. Same email in each. | Frames slide in, 0.2 s apart | Coded in HTML. Same in every inbox. |
| 4 | 0:18–0:24 | "Caught it": Outlook frame with a broken stretched image. Red ring draws. Cut to the fixed version. | Ring draws, cut | Broken in Outlook → fixed |
| 5 | 0:24–0:30 | Five email cards in a row labelled Welcome 1–5. | Cards fan out | 1 email · 3 emails · 5-email flow |

## Video 3: Gig 3 (Legal), 25 s

Use a **dummy contract** written for the purpose. Never film a client's document.

| # | Time | Frame | Motion | Text overlay |
| --- | --- | --- | --- | --- |
| 1 | 0:00–0:04 | Two pages side by side: English left, Afrikaans right. | Pages slide in | **Every clause read twice** |
| 2 | 0:04–0:10 | Zoom on clause 4.2. English: "within 30 days". Afrikaans: "binne 60 dae". | Push-in zoom | Spot the problem? |
| 3 | 0:10–0:14 | Red ring draws around "30" and "60". A red line links them. | Ring + line draw | Caught. |
| 4 | 0:14–0:20 | Fast montage: name spelled two ways, clause 9 points to a clause that doesn't exist, missing date on the signature page. A red ring on each. | 3 cuts, 2 s each | Names. Numbers. Dates. |
| 5 | 0:20–0:25 | The "caught it" sheet: a one-page list, "14 mistakes found." | Page slides up | Proofreading, not legal advice. |

## Video 4: Gig 4 (Data), 20 s

| # | Time | Frame | Motion | Text overlay |
| --- | --- | --- | --- | --- |
| 1 | 0:00–0:05 | A messy spreadsheet: merged cells, prices as "R 1 299,00", sizes jammed into one cell. | Slow pan across | **Messy sheet. Clean store.** |
| 2 | 0:05–0:11 | The cells shuffle and snap into neat columns: Handle, Title, Price, SKU, Size, Colour. | Cells fly to place | Sorted into Shopify columns |
| 3 | 0:11–0:16 | "Problem rows" list: 3 rows with a red ring each ("no price", "SKU used twice", "image link dead"). | Rings draw one by one | I flag. I never guess. |
| 4 | 0:16–0:20 | Shopify admin product grid, filled. | Scroll | 500 products. One upload. |

## Video 5: Gig 5 (Prompts), 20 s

| # | Time | Frame | Motion | Text overlay |
| --- | --- | --- | --- | --- |
| 1 | 0:00–0:05 | Left: bland AI product blurb, grey. Right: blank. | Grey text types out | **Prompts in your voice** |
| 2 | 0:05–0:11 | Prompt card slides in: "Product page · {{product_name}} · {{3 facts}}". | Card slides, then paste motion | Paste. Fill the blanks. |
| 3 | 0:11–0:16 | Right side types out an on-brand blurb. Red ring circles one sharp line. | Typewriter | Sounds like you. |
| 4 | 0:16–0:20 | Grid of prompt categories: Product pages · Emails · Replies · Captions · SEO. | Grid pops in | 15 · 40 · 80 prompts |

---

## Thumbnail text overlays (main gallery image, 3–5 words)

Big, dark text on off-white, one red-pen circle or underline, the work on the right half. Exact text in `thumbnail_overlays.txt`.

| Gig | Main thumbnail | Image 2 | Image 3 |
| --- | --- | --- | --- |
| 1 | **Click it before building** | Figma to live site | Built for the thumb |
| 2 | **Sale emails, built right** | Same in every inbox | Every button works |
| 3 | **Every clause read twice** | English and Afrikaans checked | 14 mistakes found |
| 4 | **Messy sheet. Clean store.** | 500 products, one upload | I flag, never guess |
| 5 | **Prompts in your voice** | Paste. Fill. Done. | 80 tested prompts |
