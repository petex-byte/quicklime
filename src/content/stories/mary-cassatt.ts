import type { Story } from "../types";

/**
 * Mary Cassatt, The Child's Bath (1893), Art Institute of Chicago (1910.2).
 * Every line here maps to an entry in docs/sources/mary-cassatt.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const maryCassatt: Story = {
  slug: "mary-cassatt",
  title: "The Bath",
  year: "1893",
  image: {
    src: "/art/mary-cassatt.jpg",
    status: "pending",
    width: 1063,
    height: 1600,
  },
  cover: { kicker: "The Child's Bath" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. April 1890.",
        "725 Japanese prints go on show.",
        "Mary Cassatt goes to see them.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 40, scale: 1.8 },
      lines: [
        "Three years later, she paints this.",
        "From above. Looking down.",
        "The way the Japanese printmakers did.",
      ],
      caption: "The view from above",
    },
    {
      kind: "beat",
      focus: { x: 48, y: 55, scale: 2.4 },
      lines: [
        "Her dress: stripes.",
        "The child's legs run as straight as the stripes.",
      ],
      caption: "Striped dress, bare legs",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 82, scale: 2.2 },
      lines: [
        "Rug. Wallpaper. Stripes.",
        "Pattern pressed against pattern.",
        "Only the child is bare.",
      ],
      caption: "Patterned rug and wallpaper",
    },
    {
      kind: "beat",
      focus: { x: 42, y: 26, scale: 2.6 },
      lines: [
        "Mother and child.",
        "She painted it for decades.",
        "She never married.",
      ],
      twist: "She never had a child of her own.",
      caption: "The woman's face, turned down to the child",
    },
  ],
  reveal: { lines: ["The whole room.", "Seen from above."] },
  quote: {
    text: "You who want to make color prints you couldn't dream of anything more beautiful.",
    attribution:
      "Mary Cassatt to Berthe Morisot, 15 April 1890, on the Japanese print show (English translation)",
  },
  close: {
    heading: "1910",
    lines: [
      "Paris, 1893. Her solo show at Durand-Ruel.",
      "It is shown as La Toilette de l'Enfant.",
      "Durand-Ruel keeps it seventeen years.",
      "In 1910 the Art Institute of Chicago buys it.",
      "It has been in Chicago ever since.",
    ],
  },
  sources: [
    {
      label: "Art Institute of Chicago — The Child's Bath (collection record)",
      url: "https://www.artic.edu/artworks/111442",
    },
    {
      label: "Art Institute of Chicago — Cassatt's Modern Vision of the Everyday",
      url: "https://www.artic.edu/articles/818/cassatts-modern-vision-of-the-everyday-2",
    },
    {
      label: "Cleveland Museum of Art — The Feminine Ideal (1890 letter to Morisot)",
      url: "https://www.clevelandart.org/articles/feminine-ideal",
    },
    {
      label: "Britannica — The Child's Bath",
      url: "https://www.britannica.com/topic/The-Childs-Bath",
    },
    {
      label: "Wikipedia — The Child's Bath",
      url: "https://en.wikipedia.org/wiki/The_Child%27s_Bath",
    },
  ],
  showSources: true,
};
