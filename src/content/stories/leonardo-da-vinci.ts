import type { Story } from "../types";

/**
 * Leonardo da Vinci, Mona Lisa (c. 1503–), Musée du Louvre, Paris.
 * Oil on poplar panel, 77 × 53 cm, so 1101 × 1600 at a 1600 long edge.
 * Every line here maps to an entry in docs/sources/leonardo-da-vinci.md.
 * Focus points are estimates from the known composition, not measured
 * against an image; tune them against the cleared image.
 */
export const leonardoDaVinci: Story = {
  slug: "leonardo-da-vinci",
  title: "Gone",
  year: "c. 1503",
  image: {
    src: "/art/leonardo-da-vinci.jpg",
    status: "pending",
    width: 1101,
    height: 1600,
  },
  cover: { kicker: "Mona Lisa" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. 21 August 1911.",
        "A former Louvre worker walks out.",
        "He is carrying her.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 27, scale: 2.6 },
      lines: [
        "She is Lisa del Giocondo.",
        "For centuries, the proof was Vasari.",
        "He named her in 1550.",
      ],
      twist: "In 2005, a note turned up. Dated October 1503. It names her.",
      caption: "Lisa del Giocondo",
    },
    {
      kind: "beat",
      focus: { x: 80, y: 38, scale: 2.4 },
      lines: [
        "Behind her: a road, water, a bridge.",
        "Far off. Blue with distance.",
      ],
      caption: "Landscape and bridge",
    },
    {
      kind: "beat",
      focus: { x: 45, y: 82, scale: 2.2 },
      lines: ["Hands at rest.", "One folded over the other."],
      caption: "Hands",
    },
  ],
  reveal: { lines: ["Seventy-seven centimetres of poplar.", "Uncropped."] },
  quote: {
    text: "That is the way Leonardo da Vinci does it in all his paintings, like the face of Lisa del Giocondo",
    attribution:
      "Agostino Vespucci, note in the margin of a printed Cicero, October 1503 (Heidelberg University Library translation)",
  },
  close: {
    heading: "December 1913",
    lines: [
      "The thief was Vincenzo Peruggia.",
      "He had helped make her glass case.",
      "In Florence, he tried to sell her to a dealer.",
      "The dealer brought in the Uffizi's director.",
      "While she was gone, crowds came to see the empty wall.",
    ],
  },
  sources: [
    {
      label: "Heidelberg University — Mona Lisa's identity established (2008)",
      url: "https://uni-heidelberg.de/press/news/press552e.html",
    },
    {
      label: "Smithsonian — The theft that made the Mona Lisa a masterpiece",
      url: "https://www.smithsonianmag.com/arts-culture/the-theft-that-made-the-mona-lisa-a-masterpiece-16406234/",
    },
    {
      label: "Wikipedia — Vincenzo Peruggia",
      url: "https://en.wikipedia.org/wiki/Vincenzo_Peruggia",
    },
    {
      label: "Wikipedia — Mona Lisa",
      url: "https://en.wikipedia.org/wiki/Mona_Lisa",
    },
  ],
  showSources: true,
};
