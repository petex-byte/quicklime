import type { Story } from "../types";

/**
 * Diego Velázquez, Juan de Pareja (1650), The Metropolitan Museum of Art,
 * New York (object 437869, acc. 1971.86).
 * Every line here maps to an entry in docs/sources/diego-velazquez.md.
 * Focus points were checked against the Met image
 * (public/art/w800/diego-velazquez.jpg, 800 × 931). Image ratio from that
 * file, which matches 81.3 × 69.9 cm (Met), long edge 1600.
 */
export const diegoVelazquez: Story = {
  slug: "diego-velazquez",
  title: "Truth",
  year: "1650",
  image: {
    src: "/art/diego-velazquez.jpg",
    status: "pending",
    width: 1375,
    height: 1600,
  },
  cover: { kicker: "Juan de Pareja" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Rome. 1650.",
        "Velázquez is here to paint the pope.",
        "First, he paints his assistant.",
        "Juan de Pareja.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 43, y: 31, scale: 2.6 },
      lines: [
        "Pareja looks straight back at you.",
        "A practice piece, the story goes.",
        "Velázquez loosening his hand.",
      ],
      caption: "Pareja's face",
    },
    {
      kind: "beat",
      focus: { x: 37, y: 52, scale: 2.4 },
      lines: [
        "The collar is lace. A gentleman's collar.",
        "Up close, it's dragged strokes of white.",
      ],
      twist: "The man wearing it was enslaved. Velázquez owned him.",
      caption: "The lace collar",
    },
    {
      kind: "beat",
      focus: { x: 72, y: 88, scale: 2.8 },
      lines: [
        "March. It hangs at the Pantheon.",
        "That November, Velázquez signs a paper.",
        "Pareja will be free in four years.",
      ],
      caption: "His hand at his chest",
    },
    {
      kind: "beat",
      focus: { x: 43, y: 29, scale: 3.2 },
      lines: [
        "Free, Pareja paints for himself.",
        "1661. The Calling of Saint Matthew.",
        "He puts himself in it. Looking out.",
      ],
      caption: "His eyes",
    },
  ],
  reveal: { lines: ["The whole man.", "Uncropped."] },
  quote: {
    text: "Everything else seemed like painting, but this alone like truth.",
    attribution:
      "The painters at the Pantheon, 1650, as recorded by Antonio Palomino (1724)",
  },
  close: {
    heading: "27 November 1970",
    lines: [
      "Christie's, London. Lot 110.",
      "The hammer falls at 2,200,000 guineas.",
      "£2.31 million. A first: a painting past a million.",
      "Wildenstein buys it for the Met.",
    ],
  },
  sources: [
    {
      label: "The Met — Juan de Pareja (1971.86)",
      url: "https://www.metmuseum.org/art/collection/search/437869",
    },
    {
      label: "The Met — Juan de Pareja: Afro-Hispanic Painter in the Age of Velázquez (2023)",
      url: "https://www.metmuseum.org/press-releases/juan-de-pareja-2023-exhibitions",
    },
    {
      label: "Country Life — The first million-pound picture",
      url: "https://countrylife.co.uk/?p=144183",
    },
    {
      label: "The Spectator (Richard Cork) — the first painting to sell for over a million pounds",
      url: "https://spectator.com/article/the-story-of-the-first-painting-to-sell-for-over-a-million-pounds/",
    },
    {
      label: "Wikipedia — Portrait of Juan de Pareja",
      url: "https://en.wikipedia.org/wiki/Portrait_of_Juan_de_Pareja",
    },
    {
      label: "Wikipedia — Juan de Pareja",
      url: "https://en.wikipedia.org/wiki/Juan_de_Pareja",
    },
  ],
  showSources: true,
};
