import type { Story } from "../types";

/**
 * Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), c. 1830–32.
 * Woodblock print, many impressions. Holder used here: The Metropolitan Museum
 * of Art, New York, JP1847 (H. O. Havemeyer Collection), 25.7 x 37.9 cm.
 * Every line here maps to an entry in docs/sources/katsushika-hokusai.md.
 * Focus points checked against the Met image (DP130155).
 */
export const katsushikaHokusai: Story = {
  slug: "katsushika-hokusai",
  title: "The Great Wave",
  year: "c. 1830–32",
  image: {
    src: "/art/katsushika-hokusai.jpg",
    status: "pending",
    holder: "The Metropolitan Museum of Art, New York (JP1847), US",
    sourcePage: "https://www.metmuseum.org/art/collection/search/45434",
    width: 1600,
    height: 1085,
  },
  cover: { kicker: "Under the Wave off Kanagawa" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Edo. Around 1831.",
        "Hokusai is about seventy.",
        "A new series: Thirty-six Views of Mount Fuji.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 46, y: 26, scale: 2.2 },
      lines: [
        "The wave stands over everything.",
        "Its crest breaks into claws.",
      ],
      caption: "The crest of the wave",
    },
    {
      kind: "beat",
      focus: { x: 32, y: 74, scale: 1.8 },
      lines: [
        "Three boats under it.",
        "The rowers keep their heads down.",
        "Nobody looks up.",
      ],
      caption: "The boats",
    },
    {
      kind: "beat",
      focus: { x: 80, y: 72, scale: 2 },
      lines: [
        "The blue is new.",
        "Prussian blue. Imported from Europe.",
      ],
      caption: "Prussian blue in the sea",
    },
    {
      kind: "beat",
      focus: { x: 64, y: 68, scale: 3 },
      lines: ["Now find the mountain.", "There. Under the wave."],
      twist: "The series is about Fuji. Here it's the smallest thing.",
      caption: "Mount Fuji",
    },
  ],
  reveal: { lines: ["The whole wave.", "Uncropped."] },
  quote: {
    text: "From the age of six I had a penchant for copying the forms of things.",
    attribution:
      "Hokusai, colophon to One Hundred Views of Mount Fuji (1834), as translated by the RISD Museum",
  },
  close: {
    heading: "1905",
    lines: [
      "Paris. Debussy's La Mer goes to print.",
      "The cover is a detail of this wave.",
      "A Japanese print, on a French score.",
    ],
  },
  sources: [
    {
      label: "The Met — Under the Wave off Kanagawa, JP1847",
      url: "https://www.metmuseum.org/art/collection/search/45434",
    },
    {
      label: "The Met — The Great Wave: Anatomy of an Icon",
      url: "https://www.metmuseum.org/en/essays/hokusai-great-wave",
    },
    {
      label: "The Met — Hokusai and Debussy's Evocations of the Sea",
      url: "https://www.metmuseum.org/en/perspectives/debussy-la-mer",
    },
    {
      label: "Sibley Music Library, Eastman School — Debussy, La Mer",
      url: "https://www.esm.rochester.edu/sibley/?p=7962",
    },
    {
      label: "RISD Museum — Hokusai's Mount Fuji",
      url: "https://risdmuseum.org/exhibitions-events/exhibitions/hokusais-mount-fuji",
    },
  ],
  showSources: true,
};
