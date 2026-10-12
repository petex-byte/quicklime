import type { Story } from "../types";

/**
 * Georges Seurat, A Sunday on La Grande Jatte — 1884 (1884–86, border
 * 1888–89), Art Institute of Chicago.
 * Every line here maps to an entry in docs/sources/georges-seurat.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const georgesSeurat: Story = {
  slug: "georges-seurat",
  title: "La Grande Jatte",
  year: "1884–86",
  image: {
    src: "/art/georges-seurat.jpg",
    status: "pending",
    width: 1600,
    height: 1078,
  },
  cover: { kicker: "A Sunday on La Grande Jatte — 1884" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "An island in the Seine. A Sunday.",
        "Seurat works on it from 1884 to 1886.",
        "Dot by dot.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 74, y: 85, scale: 2.4 },
      lines: [
        "Bottom right, a woman with a parasol.",
        "At her feet, a pet monkey.",
        "An old emblem of vice.",
      ],
      caption: "The monkey, right foreground",
    },
    {
      kind: "beat",
      focus: { x: 2, y: 50, scale: 2.6 },
      lines: [
        "Look at the edge.",
        "A border of red, orange and blue dots.",
        "He painted it on in 1888–89.",
      ],
      caption: "The painted border",
    },
    {
      kind: "beat",
      focus: { x: 40, y: 86, scale: 2.8 },
      lines: [
        "Some of his strokes are zinc yellow.",
        "New. Vivid. Unstable.",
        "Within a few years, they start to brown.",
      ],
      twist: "The yellows you see are not the yellows he painted.",
      caption: "Sunlit grass, foreground",
    },
  ],
  reveal: { lines: ["The whole island.", "Every dot."] },
  quote: {
    text: "Art is Harmony.",
    attribution: "Seurat, letter to Maurice Beaubourg, 28 August 1890",
  },
  close: {
    heading: "1926",
    lines: [
      "Seurat dies in 1891. He is 31.",
      "Frederic Clay Bartlett buys the painting in 1924.",
      "In 1926 he gives it to the Art Institute of Chicago.",
      "In memory of his wife, Helen.",
    ],
  },
  sources: [
    {
      label: "Art Institute of Chicago — A Sunday on La Grande Jatte — 1884",
      url: "https://www.artic.edu/artworks/27992/a-sunday-on-la-grande-jatte-1884",
    },
    {
      label: "Britannica — A Sunday on La Grande Jatte—1884",
      url: "https://www.britannica.com/print/article/573797",
    },
    {
      label: "ColourLex — Seurat, A Sunday on La Grande Jatte (pigments)",
      url: "https://colourlex.com/project/seurat-la-grande-jatte/",
    },
    {
      label: "Wikipedia — A Sunday Afternoon on the Island of La Grande Jatte",
      url: "https://en.wikipedia.org/wiki/A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte",
    },
    {
      label: "Wikipedia — Helen Birch Bartlett Memorial Collection",
      url: "https://en.wikipedia.org/wiki/Helen_Birch_Bartlett_Memorial_Collection",
    },
  ],
  showSources: true,
};
