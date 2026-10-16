import type { Story } from "../types";

/**
 * Claude Monet, Water Lilies: Green Reflections (Les Nymphéas: Reflets verts),
 * c. 1915–26. Musée de l'Orangerie, Paris, Room 1, east wall (INV 20102).
 * One panel of the Orangerie cycle; the story is the cycle's, told on this panel.
 * Every line here maps to an entry in docs/sources/claude-monet.md.
 * Focus points are rough estimates (the panel is a 200 x 850 cm strip of water
 * with no fixed landmarks); tune them against the cleared image.
 */
export const claudeMonet: Story = {
  slug: "claude-monet",
  title: "Water Lilies",
  year: "c. 1915 to 1926",
  image: {
    src: "/art/claude-monet.jpg",
    status: "pending",
    // 200 x 850 cm, a very wide panel.
    width: 1600,
    height: 376,
  },
  cover: { kicker: "Water Lilies: Green Reflections, Musée de l'Orangerie" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "12 November 1918.",
        "The Armistice was yesterday.",
        "Monet writes to Clemenceau.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 25, y: 55, scale: 2.4 },
      lines: [
        "He offers France two panels.",
        "Signed on Victory Day.",
        "A monument to peace.",
      ],
      caption: "Lily pads",
    },
    {
      kind: "beat",
      focus: { x: 55, y: 40, scale: 2.6 },
      lines: [
        "Clemenceau talks him up.",
        "Two panels become the whole series.",
        "The 1922 contract: nineteen panels.",
      ],
      caption: "Green reflections",
    },
    {
      kind: "beat",
      focus: { x: 75, y: 50, scale: 2.2 },
      lines: [
        "Clemenceau picks the building.",
        "The Orangerie, in the Tuileries.",
        "Two rooms. Walls of water.",
      ],
      caption: "Open water",
    },
    {
      kind: "beat",
      focus: { x: 90, y: 55, scale: 2.8 },
      lines: ["The gift is signed.", "The paintings stay at Giverny."],
      twist: "He kept them until he died, in 1926.",
      caption: "Lilies at the right edge",
    },
  ],
  reveal: { lines: ["The whole panel.", "Eight and a half metres of it."] },
  quote: {
    text: "…the illusion of an endless whole, of a horizonless and shoreless wave.",
    attribution:
      "Claude Monet to the critic Roger Marx, 1909 (translation: Musée de l'Orangerie)",
  },
  close: {
    heading: "25 August 1944",
    lines: [
      "The panels were judged too fragile to take down.",
      "So they stayed on the walls.",
      "Then came the Liberation of Paris.",
      "Shells hit the Orangerie.",
      "Some of the panels were struck.",
    ],
  },
  sources: [
    {
      label: "Musée de l'Orangerie: History of the Water Lilies cycle",
      url: "https://www.musee-orangerie.fr/en/node/33",
    },
    {
      label: "Musée de l'Orangerie: Archives of the genesis and history of the Water Lilies",
      url: "https://www.musee-orangerie.fr/en/node/198900",
    },
    {
      label: "Musée de l'Orangerie: Condition and restoration documentation",
      url: "https://www.musee-orangerie.fr/it/node/198901",
    },
    {
      label: "Smarthistory: Claude Monet, Les Nymphéas",
      url: "https://smarthistory.org/?p=2818",
    },
    {
      label: "Haus der Kunst: Cyprien Gaillard, Wassermusik (Orangerie archive material)",
      url: "https://www.hausderkunst.de/en/wandtexte-cyprien-gaillard-wassermusik",
    },
  ],
  showSources: true,
};
