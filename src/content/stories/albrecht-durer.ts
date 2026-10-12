import type { Story } from "../types";

/**
 * Albrecht Dürer, Self-Portrait (1500), Alte Pinakothek, Munich (inv. 537).
 * Oil on lime panel, 67.1 × 48.9 cm, so 1166 × 1600 at a 1600 long edge.
 * Every line here maps to an entry in docs/sources/albrecht-durer.md.
 * Focus points are estimates from the known composition, not measured
 * against an image; tune them against the cleared image.
 */
export const albrechtDurer: Story = {
  slug: "albrecht-durer",
  title: "Face Front",
  year: "1500",
  image: {
    src: "/art/albrecht-durer.jpg",
    status: "pending",
    width: 1166,
    height: 1600,
  },
  cover: { kicker: "Self-Portrait at Twenty-Eight" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: ["Nuremberg. 1500.", "Dürer is twenty-eight.", "He paints himself again."],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 34, scale: 2.2 },
      lines: [
        "Straight on. Symmetrical.",
        "Portraits of the day turned three-quarters.",
        "This pose belonged to Christ.",
      ],
      caption: "The frontal face",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 86, scale: 2.6 },
      lines: [
        "One hand at his chest.",
        "Fingers in the fur trim.",
        "A rich man's coat.",
      ],
      caption: "Hand at the fur collar",
    },
    {
      kind: "beat",
      focus: { x: 78, y: 12, scale: 2.8 },
      lines: [
        "Right of his face: four lines of Latin.",
        "His name. His city. His age.",
      ],
      caption: "The inscription",
    },
    {
      kind: "beat",
      focus: { x: 11, y: 11, scale: 3 },
      lines: ["Left of his face: a date.", "1500. Under it, A and D."],
      twist: "His initials. Read them again. Anno Domini.",
      caption: "Date and monogram",
    },
  ],
  reveal: { lines: ["Twenty-eight.", "Facing you.", "Uncropped."] },
  quote: {
    text: "Albertus Durerus Noricus ipsum me propriis sic effingebam coloribus aetatis anno XXVIII",
    attribution:
      "Inscription on the panel. Roughly: I, Albrecht Dürer of Nuremberg, made myself thus in my own colours, aged 28",
  },
  close: {
    heading: "1805",
    lines: [
      "The panel leaves Nuremberg for Munich.",
      "Price: 600 gulden.",
      "The receipt is signed by Abraham Küfner.",
      "Nuremberg kept a copy.",
      "The original is still in Munich.",
    ],
  },
  sources: [
    {
      label: "Bayerische Staatsgemäldesammlungen — collection record",
      url: "https://www.sammlung.pinakothek.de/en/artwork/Qlx2QpQ4Xq",
    },
    {
      label: "Smarthistory — Albrecht Dürer, Self-Portrait (1500)",
      url: "https://smarthistory.org/?p=4450",
    },
    {
      label: "Nuremberg Municipal Museums, Google Arts & Culture — Made in History",
      url: "https://artsandculture.google.com/story/made-in-history-nuremberg-municipal-museums/XQXhX1Kgx7cOIg",
    },
    {
      label: "University of Oxford, Cabinet — Self-portrait in fur coat (inscription)",
      url: "https://www.cabinet.ox.ac.uk/node/4188",
    },
    {
      label: "Wikipedia — Self-Portrait (Dürer, Munich)",
      url: "https://en.wikipedia.org/wiki/Self-Portrait_(D%C3%BCrer,_Munich)",
    },
  ],
  showSources: true,
};
