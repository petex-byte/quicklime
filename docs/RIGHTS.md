# Image rights gate

Nothing renders until it's cleared. `src/components/Painting.tsx` only outputs an `<img>` when the image's `status` is `"cleared"`. Every other image shows a neutral canvas placeholder. Unchecked files can't ship by accident.

## Automated fetch (Wikimedia Commons)

`scripts/art-manifest.json` maps each story to a Commons file. Then:

```bash
npm run fetch-art               # dry run: licence tag and size for each file
npm run fetch-art -- --apply    # download, resize to 2400px, record rights
```

The script reads the licence from the Commons file page's own metadata and records `sourcePage`, `licence`, `longEdge`, `holder` and `checkedOn` in `src/content/images.generated.json`. It marks an image `cleared` only if the tag is public domain or CC0, the original is at least 2000px on the long edge, and the manifest says `autoClear: true`. Botticelli, Gentileschi (Uffizi), Caravaggio (Palermo) and Michelangelo (Vatican) are set to `autoClear: false`: Italy's cultural-heritage code and the Vatican's reproduction rules restrict commercial use of images of their works, so those need Pete's sign-off. If a manifest file name doesn't resolve, the dry run lists search candidates to pick from.

## To clear an image by hand

1. Open the **source page**, not the file URL: the Wikimedia Commons file page, or the museum's open-access record.
2. Confirm the rights tag on that page: public domain, PD-Art or CC0. If the page has no explicit tag, reject the image. A high-res file with no licence is not evidence of one.
3. Confirm the long edge is at least 2000px.
4. Check the holder's jurisdiction. US institutions follow Bridgeman v. Corel (a faithful photo of a 2D public-domain work is itself public domain). Some EU and UK institutions claim copyright in their photographs. Check each image; don't assume per museum.
5. Save the file to `public/art/<slug>-<work>.jpg`. Fill in `src`, `sourcePage`, `licence`, `longEdge`, `holder` and `checkedOn`, then set `status: "cleared"`.

## Tier B (in-copyright artists)

Not built. Their treatment (low-res commentary crop or text-only) is still an open decision.
