import type { Story } from "../types";

/**
 * Henri Rousseau (le Douanier), The Repast of the Lion, c. 1907.
 * The Metropolitan Museum of Art, New York (object 438822, 51.112.5).
 * Oil on canvas, 113.7 x 160 cm. Bequest of Sam A. Lewisohn, 1951.
 * Every line here maps to an entry in docs/sources/henri-rousseau.md.
 * Focus points were checked against the Met image
 * (public/art/w800/henri-rousseau.jpg, 800 x 563), not guessed from the
 * composition. Width/height follow that file's aspect ratio.
 */
export const henriRousseau: Story = {
  slug: "henri-rousseau",
  title: "The Repast of the Lion",
  year: "c. 1907",
  image: {
    src: "/art/henri-rousseau.jpg",
    status: "pending",
    width: 1600,
    height: 1126,
  },
  cover: { kicker: "The Repast of the Lion" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. Around 1907.",
        "A jungle, packed to the edges.",
        "Somewhere in it, a lion is eating.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 47, y: 82, scale: 2.6 },
      lines: [
        "Bottom centre. Half hidden in the grass.",
        "The lion has its kill in its jaws.",
        "The kill is spotted.",
      ],
      caption: "The lion and its kill",
    },
    {
      kind: "beat",
      focus: { x: 23, y: 36, scale: 2.2 },
      lines: [
        "Bananas. Giant leaves. Every blade drawn.",
        "He studied plants like these in Paris.",
        "In the botanical gardens.",
      ],
      twist: "The man who painted jungles never left France.",
      caption: "Banana clusters, upper left",
    },
    {
      kind: "beat",
      focus: { x: 53, y: 54, scale: 3 },
      lines: [
        "A blue flower, big as the lion's head.",
        "The animals came from books.",
        "Illustrated journals. Children's picture books.",
      ],
      caption: "Blue flower, centre",
    },
    {
      kind: "beat",
      focus: { x: 90, y: 92, scale: 3 },
      lines: [
        "Bottom right, his name.",
        "He liked to hint he'd served in Mexico.",
        "There's no evidence he ever went.",
      ],
      caption: "Signature, lower right",
    },
  ],
  reveal: { lines: ["The whole jungle.", "Grown in Paris."] },
  quote: {
    text: "When I am in these hothouses and see the strange plants from exotic lands, it seems to me that I am entering a dream.",
    attribution:
      "Henri Rousseau, on his visits to the Paris hothouses (English translation, as quoted by MoMA)",
  },
  close: {
    heading: "1893",
    lines: [
      "Rousseau leaves his job at the Paris toll office.",
      "No formal training. He paints full time.",
      "The nickname sticks: le Douanier. The customs man.",
      "He dies in Paris in 1910.",
      "In 1951 this lion comes to the Met.",
    ],
  },
  sources: [
    {
      label: "The Met: The Repast of the Lion (438822)",
      url: "https://www.metmuseum.org/art/collection/search/438822",
    },
    {
      label: "MoMA via Google Arts & Culture: The Dream (1910)",
      url: "https://artsandculture.google.com/asset/the-dream-henri-rousseau/LwEt57AOdD6SGA",
    },
    {
      label: "Art UK: Henri Rousseau (1844 to 1910)",
      url: "https://artuk.org/discover/artists/rousseau-henri-18441910",
    },
    {
      label: "MoMA press release, Henri Rousseau (1985)",
      url: "https://www.moma.org/momaorg/shared/pdfs/docs/press_archives/6151/releases/MOMA_1985_0005_5.pdf",
    },
    {
      label: "Artnet: Untangling the myths behind Henri Rousseau",
      url: "https://news.artnet.com/art-world/untangling-the-myths-behind-henri-rousseau-eccentric-masterpiece-2724971",
    },
    {
      label: "Wikipedia: The Repast of the Lion",
      url: "https://en.wikipedia.org/wiki/The_Repast_of_the_Lion",
    },
  ],
  showSources: true,
};
