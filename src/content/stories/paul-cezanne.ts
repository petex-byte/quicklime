import type { Story } from "../types";

/**
 * Paul Cézanne, The Card Players (Les Joueurs de cartes), 1890s.
 * Musée d'Orsay, Paris (RF 1969), the two-player version, 47.5 x 57 cm.
 * Every line here maps to an entry in docs/sources/paul-cezanne.md.
 * Focus points are first-pass estimates from the known composition;
 * tune them against the cleared image.
 */
export const paulCezanne: Story = {
  slug: "paul-cezanne",
  title: "The Card Players",
  year: "1890s",
  image: {
    src: "/art/paul-cezanne.jpg",
    status: "pending",
    // 47.5 x 57 cm, landscape.
    width: 1600,
    height: 1333,
  },
  cover: { kicker: "The Card Players, Musée d'Orsay" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Aix-en-Provence. The 1890s.",
        "Two men. One table.",
        "Cézanne paints this game five times.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 26, y: 40, scale: 2.4 },
      lines: [
        "The man on the left smokes a pipe.",
        "Père Alexandre.",
        "He worked on the Cézanne family estate.",
      ],
      caption: "The pipe smoker",
    },
    {
      kind: "beat",
      focus: { x: 74, y: 38, scale: 2.4 },
      lines: [
        "His opponent sits across.",
        "Nobody can name him for certain.",
        "Most likely another hand from the farm.",
      ],
      caption: "The right-hand player",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 48, scale: 3 },
      lines: ["A bottle stands between them.", "Dead centre."],
      twist: "It splits the canvas. One half per man.",
      caption: "The bottle",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 60, scale: 2.2 },
      lines: [
        "Five versions in all.",
        "This is one of the barest.",
      ],
      caption: "The cards and the table",
    },
  ],
  reveal: { lines: ["The whole game.", "Uncropped."] },
  quote: {
    text: "treat nature by means of the cylinder, the sphere, the cone",
    attribution: "Paul Cézanne, letter to Émile Bernard, Aix, 15 April 1904",
  },
  close: {
    heading: "2011",
    lines: [
      "Four of the five versions are in public collections.",
      "The Met. The Orsay. The Courtauld. The Barnes.",
      "The fifth was the last in private hands.",
      "In 2011 it went to the State of Qatar.",
      "The price was never confirmed.",
      "Reports put it near $250 million.",
    ],
  },
  sources: [
    {
      label: "Musée d'Orsay — Les Joueurs de cartes, collection record",
      url: "https://www.musee-orsay.fr/fr/oeuvres/1312",
    },
    {
      label: "The Met — The Card Players (models and Rivière's identification)",
      url: "https://www.metmuseum.org/toah/works-of-art/61.101.1",
    },
    {
      label: "The Courtauld — Cézanne's Card Players (2010–11)",
      url: "https://courtauld.ac.uk/gallery/exhibitions/cezannes-card-players/",
    },
    {
      label: "Cézanne catalogue raisonné (Feilchenfeldt, Warman, Nash)",
      url: "https://www.cezannecatalogue.com/catalogue/entry.php?id=692",
    },
    {
      label: "Hyperallergic — Qatar buys The Card Players (2012)",
      url: "https://hyperallergic.com/qatar-paul-cezanne-card-players",
    },
    {
      label: "Artforum — Cézanne on solids and spaces",
      url: "https://www.artforum.com/features/cezanne-on-solids-and-spaces-209329/",
    },
  ],
  showSources: true,
};
