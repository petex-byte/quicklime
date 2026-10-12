import type { Story } from "../types";

/**
 * Titian and Workshop, Venus and the Lute Player (c. 1565–70),
 * The Metropolitan Museum of Art, New York (Munsey Fund, 1936; acc. 36.29;
 * Met object 437827).
 * Every line here maps to an entry in docs/sources/titian.md.
 * Focus points were checked against the Met image (public/art/w800/titian.jpg)
 * by locating each detail on the downloaded file.
 * Image ratio from the Met image (800 × 633), long edge 1600.
 */
export const titian: Story = {
  slug: "titian",
  title: "Venus, Again",
  year: "c. 1565–70",
  image: {
    src: "/art/titian.jpg",
    status: "pending",
    width: 1600,
    height: 1266,
  },
  cover: { kicker: "Venus and the Lute Player" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Venice. Around 1565–70.",
        "Venus, with a musician at her feet.",
        "Titian's studio paints it five times.",
        "Two with a lute. This is one.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 32, y: 58, scale: 2.4 },
      lines: [
        "The lute player twists round.",
        "Eyes on her. Not on his strings.",
      ],
      caption: "The lute player",
    },
    {
      kind: "beat",
      focus: { x: 81, y: 42, scale: 2.4 },
      lines: ["Cupid crowns her with flowers.", "She has stopped playing."],
      twist: "She's a template. Her outline moved canvas to canvas.",
      caption: "Venus and Cupid",
    },
    {
      kind: "beat",
      focus: { x: 53, y: 50, scale: 3 },
      lines: [
        "Behind them, a shepherd plays.",
        "Nymphs and satyrs dance.",
        "This part, Titian painted himself.",
      ],
      caption: "The landscape",
    },
    {
      kind: "beat",
      focus: { x: 93, y: 70, scale: 2.2 },
      lines: ["A viol leans against the bed.", "Blocked in. Never finished."],
      caption: "The viol",
    },
  ],
  reveal: { lines: ["The whole room.", "Uncropped."] },
  quote: {
    text: "I have chosen in this other poesia to vary the appearance and show the opposite side",
    attribution:
      "Titian, letter to Philip II, 1554, on sending a new Venus",
  },
  close: {
    heading: "1930",
    lines: [
      "The Earl of Leicester sells it out of Holkham Hall.",
      "The dealer Duveen holds it for six years.",
      "In 1936, the Met buys it.",
    ],
  },
  sources: [
    {
      label: "The Met — Venus and the Lute Player (36.29)",
      url: "https://www.metmuseum.org/art/collection/search/437827",
    },
    {
      label: "Museo del Prado — Venus with an Organist and Cupid",
      url: "https://www.museodelprado.es/en/the-collection/art-work/venus-with-an-organist-and-cupid/b36421df-4d51-43b6-911c-c0517377e48d",
    },
    {
      label: "Wikipedia — Venus and Musician",
      url: "https://en.wikipedia.org/wiki/Venus_and_Musician",
    },
    {
      label: "The Frame Blog — Titian's poesie and the 1554 letter",
      url: "https://theframeblog.com/tag/titian/",
    },
    {
      label: "PubHist — Titian and workshop, Venus and the Lute Player (provenance)",
      url: "https://www.pubhist.com/w6932",
    },
  ],
  showSources: true,
};
