import type { Story } from "../types";

/**
 * Jan van Eyck, The Arnolfini Portrait (1434). National Gallery, London,
 * NG186. Oil on oak panel, 82.2 x 60 cm.
 * Every line here maps to an entry in docs/sources/jan-van-eyck.md.
 * Focus points are estimates from the known composition; tune them against
 * the cleared image.
 */
export const janVanEyck: Story = {
  slug: "jan-van-eyck",
  title: "The Arnolfini Portrait",
  year: "1434",
  image: {
    src: "/art/jan-van-eyck.jpg",
    status: "pending",
    holder: "The National Gallery, London (NG186), UK",
    width: 1168,
    height: 1600,
  },
  cover: { kicker: "The Arnolfini Portrait" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Bruges. 1434.",
        "An Italian merchant and his wife.",
        "One room. Oil paint, down to the thread.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 12, scale: 2.4 },
      lines: ["A brass chandelier.", "One candle lit.", "In daylight."],
      caption: "The chandelier",
    },
    {
      kind: "beat",
      focus: { x: 53, y: 28, scale: 3 },
      lines: [
        "On the back wall, a convex mirror.",
        "Ten tiny scenes of the Passion ring the frame.",
        "In the glass: the couple's backs. And two more people.",
      ],
      caption: "The convex mirror",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 21, scale: 3.2 },
      lines: [
        "Above the mirror, on the wall itself.",
        "Written like graffiti. His name. A date.",
        "One of the two in the mirror may be him.",
      ],
      twist: "Not “painted this”. “Was here.”",
      caption: "The inscription above the mirror",
    },
    {
      kind: "beat",
      focus: { x: 47, y: 88, scale: 2.6 },
      lines: ["At their feet, a small dog.", "Every hair painted."],
      caption: "The dog",
    },
  ],
  reveal: { lines: ["The whole room.", "Uncropped."] },
  quote: {
    text: "Johannes de eyck fuit hic 1434",
    attribution: "Inscription above the mirror: “Jan van Eyck was here. 1434.”",
  },
  close: {
    heading: "1842",
    lines: [
      "The National Gallery buys it for 600 guineas.",
      "The seller is a Scottish soldier, James Hay.",
      "He'd served in Spain. How he got it is still unclear.",
    ],
  },
  sources: [
    {
      label: "National Gallery: The Arnolfini Portrait",
      url: "https://www.nationalgallery.org.uk/paintings/jan-van-eyck-the-arnolfini-portrait",
    },
    {
      label: "National Gallery: Campbell (1998) catalogue entry",
      url: "https://nationalgallery.org.uk/paintings/catalogues/campbell-1998/the-arnolfini-portrait",
    },
    {
      label: "National Gallery: Reflections: the Arnolfini acquisition",
      url: "https://www.nationalgallery.org.uk/exhibitions/past/reflections-van-eyck-and-the-pre-raphaelites/reflections-behind-the-inspiration?viewPage=6",
    },
    {
      label: "Wikipedia: Arnolfini Portrait",
      url: "https://en.wikipedia.org/wiki/Arnolfini_Portrait",
    },
  ],
  showSources: true,
};
