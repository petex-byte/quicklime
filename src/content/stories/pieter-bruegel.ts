import type { Story } from "../types";

/**
 * Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art,
 * New York (Rogers Fund, 1919; acc. 19.164; Met object 435809).
 * Every line here maps to an entry in docs/sources/pieter-bruegel.md.
 * Focus points were checked against the Met image (public/art/w800/pieter-bruegel.jpg)
 * by locating each detail on the downloaded file.
 * Image ratio from the Met image (800 × 589), long edge 1600.
 */
export const pieterBruegel: Story = {
  slug: "pieter-bruegel",
  title: "The Harvest",
  year: "1565",
  image: {
    src: "/art/pieter-bruegel.jpg",
    status: "pending",
    width: 1600,
    height: 1178,
  },
  cover: { kicker: "The Harvesters" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Antwerp. 1565.",
        "A merchant orders the year. In six panels.",
        "Five survive.",
        "This one is the harvest.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 34, y: 68, scale: 2.6 },
      lines: [
        "A path cut through the wheat.",
        "A man climbs out with a jug.",
        "Lunch is here.",
      ],
      caption: "The cut through the wheat",
    },
    {
      kind: "beat",
      focus: { x: 74, y: 78, scale: 2.4 },
      lines: [
        "Nine people in the shade of a pear tree.",
        "Bowls. Bread.",
        "One tips the jug straight back.",
      ],
      caption: "Lunch under the pear tree",
    },
    {
      kind: "beat",
      focus: { x: 55, y: 86, scale: 3 },
      lines: [
        "One man has stopped altogether.",
        "Flat out against the tree. Mouth open.",
        "Nobody wakes him.",
      ],
      caption: "The sleeper",
    },
    {
      kind: "beat",
      focus: { x: 88, y: 66, scale: 2.2 },
      lines: ["Sheaves stand in the stubble.", "The year's wealth, stacked."],
      twist: "By February 1566, the painting was collateral too.",
      caption: "The sheaves",
    },
  ],
  reveal: { lines: ["The whole field.", "Uncropped."] },
  quote: {
    text: "He painted many things that cannot be painted.",
    attribution:
      "Abraham Ortelius, Bruegel's friend, in his album amicorum (from the Latin)",
  },
  close: {
    heading: "1809",
    lines: [
      "Napoleon's army takes Vienna.",
      "The painting leaves the imperial collection.",
      "Its next owner: Andréossy, the city's French governor.",
      "Paris, 1816. Sold at auction.",
      "The Met buys it in 1919.",
    ],
  },
  sources: [
    {
      label: "The Met — The Harvesters (19.164)",
      url: "https://www.metmuseum.org/art/collection/search/435809",
    },
    {
      label: "The Met Perspectives — Patrick Bringley on The Harvesters",
      url: "https://www.metmuseum.org/perspectives/patrick-bringley-harvesters",
    },
    {
      label: "Google Arts & Culture — The Harvesters (Met record and provenance)",
      url: "https://artsandculture.google.com/asset/the-harvesters-pieter-bruegel-the-elder/PAH1oMZ5dGBkxg",
    },
    {
      label: "Bruegel 2018 (KHM) — Six Seasons for a Dining Room",
      url: "https://www.bruegel2018.at/en/six-seasons-for-a-dining-room/",
    },
    {
      label: "Wikipedia — Nicolaes Jonghelinck",
      url: "https://en.wikipedia.org/wiki/Nicolaes_Jonghelinck",
    },
    {
      label: "Wikipedia — The Harvesters (painting)",
      url: "https://en.wikipedia.org/wiki/The_Harvesters_(painting)",
    },
  ],
  showSources: true,
};
