import type { Story } from "../types";

/**
 * Francisco Goya, Manuel Osorio Manrique de Zuñiga (1787–88), The Metropolitan
 * Museum of Art, New York (object 436545, acc. 49.7.41, The Jules Bache
 * Collection, 1949).
 * Every line here maps to an entry in docs/sources/francisco-goya.md.
 * Focus points were checked against the Met image
 * (public/art/w800/francisco-goya.jpg, 800 × 1085). Image ratio from that
 * file (127 × 101.6 cm per the Met; the file includes the frame edge),
 * long edge 1600.
 */
export const franciscoGoya: Story = {
  slug: "francisco-goya",
  title: "The Magpie",
  year: "1787–88",
  image: {
    src: "/art/francisco-goya.jpg",
    status: "pending",
    width: 1180,
    height: 1600,
  },
  cover: { kicker: "Manuel Osorio Manrique de Zuñiga" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Goya paints a count's son.",
        "Manuel. Born April 1784.",
        "Red suit. Satin sash. Lace collar.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 26, y: 80, scale: 2.6 },
      lines: [
        "In his hand, a string.",
        "On the string, his pet magpie.",
        "It holds something in its beak.",
      ],
      caption: "The magpie on its string",
    },
    {
      kind: "beat",
      focus: { x: 21, y: 69, scale: 2.4 },
      lines: [
        "Three cats in the shadow.",
        "Eyes wide.",
        "All of them on the bird.",
      ],
      caption: "The three cats",
    },
    {
      kind: "beat",
      focus: { x: 74, y: 74, scale: 2.4 },
      lines: [
        "Across from them, a cage of finches.",
        "Safe behind a few thin bars.",
      ],
      caption: "The birdcage",
    },
    {
      kind: "beat",
      focus: { x: 40, y: 84, scale: 3.2 },
      lines: ["Look at the scrap of paper.", "It's a calling card."],
      twist: "It's Goya's. He signed the painting in the bird's beak.",
      caption: "The card in the magpie's beak",
    },
  ],
  reveal: { lines: ["The whole room.", "Uncropped."] },
  quote: {
    text: "EL Sr. Dn. MANVEL OSORIO MANRRIQVE DE ZVÑIGA Sr. DE GINES NACIO EN ABR A II DE 1784",
    attribution:
      "Inscription along the bottom edge: Don Manuel, Lord of Ginés, born 11 April 1784",
  },
  close: {
    heading: "1792",
    lines: [
      "Manuel dies. He is eight.",
      "The inscription gives his birth. Only his birth.",
      "The Met reads the cats, the cage, the string",
      "as how little stands between a child and harm.",
    ],
  },
  sources: [
    {
      label: "The Met — Manuel Osorio Manrique de Zuñiga (49.7.41)",
      url: "https://www.metmuseum.org/art/collection/search/436545",
    },
    {
      label: "The Met, Heilbrunn Timeline — Manuel Osorio Manrique de Zuñiga",
      url: "https://www.metmuseum.org/toah/works-of-art/49.7.41",
    },
    {
      label: "Fundación Goya en Aragón — Manuel Osorio Manrique de Zúñiga",
      url: "https://fundaciongoyaenaragon.es/eng/obra/manuel-osorio-manrique-de-zuniga/427",
    },
    {
      label: "Wikipedia — Manuel Osorio Manrique de Zúñiga",
      url: "https://en.wikipedia.org/wiki/Manuel_Osorio_Manrique_de_Z%C3%BA%C3%B1iga",
    },
  ],
  showSources: true,
};
