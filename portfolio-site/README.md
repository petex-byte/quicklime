# portfolio-site/

Front-end for **work.quicklime.co.za**: the Red Pen & Pixel proof page from `fiverr-agency/03_visual/portfolio_subdomain_wireframe.md`.

Plain HTML, CSS and one small script. No build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve portfolio-site    # or: python3 -m http.server -d portfolio-site
```

## Sections

1. **Hero:** "We catch what slips." with a red-ink underline that draws in, two buttons, skill chips, and a duo photo slot (two initial circles plus a sticky note until the real photo lands).
2. **Proof:** three "garden plots" with device frames. Each one plays its Hyperframes MP4 from `media/` once the file exists, and shows an animated skeleton site until then. Hover a card to circle its title in red and light up the "what we checked" list. Below that, a before/after drag slider on a dummy contract with a count-up.
3. **Order:** five gig rows linking to Fiverr, with dotted price leaders. Pointing at one row dims the others.

## Details

- Light and dark themes follow the system. Press `t` to switch; the page remembers the choice.
- `1` / `2` jump to Work / Order.
- Videos load only when near the screen and pause when off it.
- `prefers-reduced-motion` turns off every animation.
- Works without JavaScript: content shows, only the extras drop.
- Growth-stage labels (Seedling / Budding / Evergreen) nod to Maggie Appleton's garden.

## Before it goes live

- [ ] Replace `REPLACE_USERNAME` and the gig slugs in `index.html` with the live Fiverr URLs.
- [ ] Add the media files listed in `media/README.md`.
- [ ] Swap the two `.face` circles for the real photo.
- [ ] Point the `work` subdomain at the folder (Vercel, Netlify or Cloudflare Pages: set the root directory to `portfolio-site`).
