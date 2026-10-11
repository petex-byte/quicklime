import type { ArtImage } from "./types";
import generated from "./images.generated.json";

/**
 * Image records written by `node scripts/fetch-art.mjs --apply`. Each one
 * carries its own rights status; Painting only renders "cleared" ones.
 */
const images = generated as Record<string, ArtImage>;

export function imageFor(slug: string): ArtImage | undefined {
  return images[slug];
}
