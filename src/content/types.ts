export type Region = "Europe" | "North America" | "Africa" | "Asia";

/**
 * Rights gate for a single image. An image only renders when `status` is
 * "cleared", which means someone has opened `sourcePage` and confirmed the
 * licence tag on the page itself (see docs/RIGHTS.md).
 */
export type ArtImage = {
  /** Path under /public, e.g. "/art/rembrandt-storm.jpg". */
  src: string;
  status: "cleared" | "pending";
  /** The page that carries the rights tag, not the raw file URL. */
  sourcePage?: string;
  /** As stated on the source page, e.g. "Public domain (PD-Art, PD-old-100)". */
  licence?: string;
  /** Long edge in px; the floor is 2000. */
  longEdge?: number;
  /** Holding institution and its jurisdiction, for the Bridgeman check. */
  holder?: string;
  checkedOn?: string;
  width?: number;
  height?: number;
  /** Why a fetched image is still pending, e.g. "held for sign-off". */
  pendingReason?: string;
  /** PREVIEW ONLY: set when this is another work by the artist standing in
   *  for the featured one. Its title is shown on the page. */
  standIn?: string;
};

export type Artist = {
  slug: string;
  name: string;
  nationality: string;
  region: Region;
  movement: string;
  born: number;
  died: number;
  /** True when a date is approximate (c.). */
  bornApprox?: boolean;
  diedApprox?: boolean;
  featuredWork: string;
  /** Crop shown on the directory card. Same rights gate as the story image. */
  image?: ArtImage;
  /** Card crop focus, as CSS object-position. */
  cardFocus?: string;
};

/** A point on the canvas, in percent of width/height, plus a zoom factor. */
export type Focus = { x: number; y: number; scale: number };

export type StoryBeat = {
  kind: "beat";
  focus: Focus;
  /** Short lines. Each renders as its own paragraph. */
  lines: string[];
  /** Optional twist line, set apart and heavier. */
  twist?: string;
  caption?: string;
};

export type Story = {
  slug: string;
  title: string;
  year: string;
  image: ArtImage;
  cover: { kicker: string };
  beats: StoryBeat[];
  reveal: { lines: string[] };
  quote: { text: string; attribution: string };
  close: { heading: string; lines: string[] };
  /** Sources list, rendered in the page footer unless `showSources` is false. */
  sources: { label: string; url: string }[];
  showSources?: boolean;
};
