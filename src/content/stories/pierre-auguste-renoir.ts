import type { Story } from "../types";

/**
 * Pierre-Auguste Renoir, Luncheon of the Boating Party (1880–81),
 * The Phillips Collection, Washington.
 * Every line here maps to an entry in docs/sources/pierre-auguste-renoir.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const pierreAugusteRenoir: Story = {
  slug: "pierre-auguste-renoir",
  title: "The Luncheon",
  year: "1880 to 1881",
  image: {
    src: "/art/pierre-auguste-renoir.jpg",
    status: "pending",
    width: 1600,
    height: 1186,
  },
  cover: { kicker: "Luncheon of the Boating Party" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Chatou. Summer 1880.",
        "A restaurant terrace on the Seine.",
        "Fourteen people. Nearly all his friends.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 8, scale: 2 },
      lines: [
        "Look up. The striped awning.",
        "It wasn't there at first.",
        "Underneath it: sky, a bridge, the far bank.",
      ],
      caption: "The awning",
    },
    {
      kind: "beat",
      focus: { x: 35, y: 62, scale: 2.4 },
      lines: [
        "On the table, glasses vanish.",
        "A wine glass, painted out.",
        "Another turns into grapes.",
      ],
      caption: "The table",
    },
    {
      kind: "beat",
      focus: { x: 80, y: 56, scale: 2.4 },
      lines: [
        "Lower right: Gustave Caillebotte.",
        "Painter. Collector. Friend.",
      ],
      caption: "Gustave Caillebotte",
    },
    {
      kind: "beat",
      focus: { x: 24, y: 56, scale: 2.8 },
      lines: [
        "Lower left, a woman with a little dog.",
        "She wasn't the first to sit there.",
        "Renoir scratched the first model out.",
        "He painted in Aline Charigot.",
      ],
      twist: "Ten years later, he married her.",
      caption: "Aline Charigot and the affenpinscher",
    },
  ],
  reveal: { lines: ["The whole terrace.", "Every change in place."] },
  quote: {
    text: "I'm not getting any younger.",
    attribution:
      "Renoir, in an 1880 letter to a friend while painting it (English translation, as quoted by NPR)",
  },
  close: {
    heading: "$125,000",
    lines: [
      "Duncan Phillips first saw it in 1911.",
      "It took him twelve years to get it.",
      "July 1923. The deal closes at $125,000.",
      "It is still the Phillips Collection's.",
    ],
  },
  sources: [
    {
      label: "The Phillips Collection: Luncheon of the Boating Party",
      url: "https://www.phillipscollection.org/collection/luncheon-boating-party",
    },
    {
      label: "The Phillips Collection: Beneath the Surface (Part 2)",
      url: "https://www.phillipscollection.org/blog/2017-12-06-beneath-surface-luncheon-boating-party-part-2",
    },
    {
      label: "Smithsonian: Exhibit sheds new light on Renoir's Luncheon (2017)",
      url: "https://www.smithsonianmag.com/smart-news/new-exhibit-looks-behind-and-beneath-famed-renoir-painting-180965178",
    },
    {
      label: "NPR: Guess who Renoir was in love with (2017)",
      url: "https://www.npr.org/2017/10/26/559515290/guess-who-renoir-was-in-love-with-in-luncheon-of-the-boating-party",
    },
    {
      label: "Wikipedia: Luncheon of the Boating Party",
      url: "https://en.wikipedia.org/wiki/Luncheon_of_the_Boating_Party",
    },
  ],
  showSources: true,
};
