import type { Story } from "../types";
import { rembrandt } from "./rembrandt";

/** Stories that have passed research + voice review. Add one per artist. */
export const stories: Record<string, Story> = {
  [rembrandt.slug]: rembrandt,
};

export function getStory(slug: string): Story | undefined {
  return stories[slug];
}
