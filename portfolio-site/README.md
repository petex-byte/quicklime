# portfolio-site/

**work.quicklime.co.za**: the Red Pen & Pixel page. Built with the scroll-craft method
(brief and fingerprint in `/scrollcraft/`). Plain HTML, CSS and JS, no build step.

```bash
python3 -m http.server -d portfolio-site 4500
```

## Chapters

1. **Title page:** paper sheets, a sticky flag and a red pen on four depth planes that drift apart on scroll; the underline under "slips" draws itself.
2. **I. The gap:** dark ground, four mistakes that cost shop owners money.
3. **Your turn:** a deliberate pause.
4. **II. Catch it yourself:** six clause pairs from the dummy test contract. Every word is a button. Real mistakes get a red circle on both versions and a margin note; "Show me all four" reveals the rest. Then the real test result: 14 of 14.
5. **III. The email:** the real Klaviyo master (`samples/email.html`, built by `klaviyo-templates/build_sample.py` with a sample shop) in a phone frame with a Phone/Desktop switch, plus what we check.
6. **IV. The screens:** a demo checkout at iPhone SE size with an 'as designed / as we'd fix it' switch, and what the Figma gig delivers.
7. **V. Two pairs of eyes:** Petri and Chané, and rows from a real caught-it sheet (Legal Catch-Net test run).
8. **VI. The jobs:** five gigs with Basic prices from `fiverr-agency/02_gigs/gig_pricing_matrix.csv`.
9. **Colophon:** the ask, as one sentence.

## Files

- `index.html`, `styles.css`, `script.js`: the page, its styles, the folio and the exercise.
- `scrollcraft.js`, `scrollcraft.css`: the scroll-craft engine, unedited (MIT, `scrollcraft.LICENSE.txt`).

## Details

- Keyboard: Tab into the contract, arrow keys move word to word, Enter marks one.
- Reduced motion keeps every state, drops the movement.
- Without JavaScript the contract shows with all four notes open.
- No photos yet. The P and C plates are slots for a real photo of Petri and Chané.

## Before launch

- [ ] Register **redpenpixel** on Fiverr. Every order link points to `https://www.fiverr.com/redpenpixel`. Swap in gig URLs once the gigs are live.
- [ ] Add a CNAME for `work` at your DNS host (see the deploy notes in the handoff).
