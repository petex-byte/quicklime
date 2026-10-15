import { artists } from "./artists";
import { stories } from "./stories";

/**
 * Story order used by the home wall and each story's "Next" link:
 * directory order, real paintings first, preview stand-ins last.
 */
export const storyOrder: string[] = artists
  .filter((a) => stories[a.slug])
  .sort((x, y) => Number(Boolean(stories[x.slug].image.standIn)) - Number(Boolean(stories[y.slug].image.standIn)))
  .map((a) => a.slug);

export function nextStory(slug: string): string {
  const i = storyOrder.indexOf(slug);
  return storyOrder[(i + 1) % storyOrder.length];
}
