import type { Story } from "../types";

/**
 * Winslow Homer, The Gulf Stream, 1899 (reworked by 1906).
 * The Metropolitan Museum of Art, New York (object 11122, 06.1234).
 * Oil on canvas. Catharine Lorillard Wolfe Collection, Wolfe Fund, 1906.
 * Every line here maps to an entry in docs/sources/winslow-homer.md.
 * Focus points were checked against the Met image
 * (public/art/w800/winslow-homer.jpg, 800 x 489), not guessed from the
 * composition. Width/height follow that file's aspect ratio.
 */
export const winslowHomer: Story = {
  slug: "winslow-homer",
  title: "The Gulf Stream",
  year: "1899",
  image: {
    src: "/art/winslow-homer.jpg",
    status: "pending",
    width: 1600,
    height: 978,
  },
  cover: { kicker: "The Gulf Stream" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "1899. One man. One small boat.",
        "No mast. No rudder.",
        "Homer built it from his Bahamas sketches.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 45, y: 78, scale: 2.4 },
      lines: [
        "Below the hull, sharks.",
        "One rolls with its jaws open.",
        "Red streaks in the water around them.",
      ],
      caption: "Sharks, lower centre",
    },
    {
      kind: "beat",
      focus: { x: 58, y: 50, scale: 2.6 },
      lines: [
        "He lies on the deck. Shirtless.",
        "Visitors to the dealer's gallery asked: does he live?",
        "Homer wrote back. He'll be rescued.",
        "Home to his friends. Happy ever after.",
      ],
      caption: "The sailor",
    },
    {
      kind: "beat",
      focus: { x: 89, y: 14, scale: 2.4 },
      lines: [
        "Far right, a waterspout.",
        "Sharks below. Weather behind.",
      ],
      caption: "Waterspout, upper right",
    },
    {
      kind: "beat",
      focus: { x: 24, y: 20, scale: 3 },
      lines: [
        "Far left, on the horizon. A ship.",
        "He's looking the other way.",
        "It wasn't in the painting he first showed.",
      ],
      twist: "Homer painted in the rescue. Then made the waterspout bigger.",
      caption: "Ship on the horizon, upper left",
    },
  ],
  reveal: { lines: ["The whole sea.", "Sharks, spout, ship."] },
  quote: {
    text: "I have crossed the Gulf Stream ten times & I should know something about it.",
    attribution:
      "Winslow Homer, letter to his dealer, M. Knoedler & Co., answering viewers' questions about the painting",
  },
  close: {
    heading: "1906",
    lines: [
      "The Met buys The Gulf Stream.",
      "By then the ship is on the horizon.",
      "Homer is 70.",
      "He dies four years later, at Prouts Neck, Maine.",
    ],
  },
  sources: [
    {
      label: "The Met — The Gulf Stream (11122)",
      url: "https://www.metmuseum.org/art/collection/search/11122",
    },
    {
      label: "Cooper Hewitt — Study for The Gulf Stream",
      url: "https://collection.cooperhewitt.org/objects/18175043/",
    },
    {
      label: "Cooper Hewitt — Blood in the Water (2020)",
      url: "https://www.cooperhewitt.org/2020/02/24/blood-in-the-water/",
    },
    {
      label: "New York Times via Portland Museum of Art — Winslow Homer: Radical Impressionist",
      url: "https://www.portlandmuseum.org/magazine/nyt-winslow-homer/",
    },
    {
      label: "Art Students League — Lethal Scenarios and Gorgeous Landscapes",
      url: "https://www.artstudentsleague.org/stories/lethal-scenarios-and-gorgeous-landscapes",
    },
    {
      label: "Wikipedia — The Gulf Stream (painting)",
      url: "https://en.wikipedia.org/wiki/The_Gulf_Stream_(painting)",
    },
  ],
  showSources: true,
};
