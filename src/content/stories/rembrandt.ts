import type { Story } from "../types";

/**
 * Rembrandt, Christ in the Storm on the Sea of Galilee (1633).
 * Every line here maps to an entry in docs/sources/rembrandt.md.
 * Focus points set against the Wikimedia image of the painting.
 */
export const rembrandt: Story = {
  slug: "rembrandt",
  title: "The Storm",
  year: "1633",
  image: {
    src: "/art/rembrandt.jpg",
    status: "pending",
    width: 1280,
    height: 1600,
  },
  cover: { kicker: "Christ in the Storm on the Sea of Galilee" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Amsterdam. 1633.",
        "Rembrandt has just left Leiden.",
        "He paints the sea once.",
        "This is the once.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 36, y: 42, scale: 2.2 },
      lines: [
        "The bow climbs the wave.",
        "The sail tears loose.",
        "Half the boat fights the rigging.",
      ],
      caption: "Bow and mainsail",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 80, scale: 2.6 },
      lines: ["One man hangs over the rail.", "Seasick.", "Rembrandt kept him in."],
      caption: "Starboard rail",
    },
    {
      kind: "beat",
      focus: { x: 64, y: 74, scale: 2.4 },
      lines: [
        "At the stern, they wake him.",
        "Every face in the boat is fear.",
        "Except his.",
      ],
      caption: "Christ at the stern",
    },
    {
      kind: "beat",
      focus: { x: 48, y: 72, scale: 3 },
      lines: [
        "One man isn't watching the storm.",
        "He's watching you.",
      ],
      twist: "Twelve disciples. Christ. Count again. Fourteen.",
      caption: "The figure most often read as Rembrandt himself",
    },
  ],
  reveal: { lines: ["The whole storm.", "Uncropped."] },
  quote: {
    text: "Master, carest thou not that we perish?",
    attribution: "Mark 4:38 — the line this painting is built on",
  },
  close: {
    heading: "18 March 1990",
    lines: [
      "Two men dressed as police talk their way into the Gardner Museum, Boston.",
      "Thirteen works leave with them. This is one.",
      "The frame still hangs. Empty.",
      "The reward is ten million dollars.",
      "Nobody has collected it.",
    ],
  },
  sources: [
    {
      label: "Isabella Stewart Gardner Museum — collection record",
      url: "https://gardnermuseum.emuseum.com/objects/212/christ-in-the-storm-on-the-sea-of-galilee",
    },
    {
      label: "WBUR, Last Seen — Christ in the Storm on the Sea of Galilee",
      url: "https://www.wbur.org/lastseen/2018/09/15/christ-in-the-storm-on-the-sea-of-galilee",
    },
    {
      label: "NPR — Gardner Museum doubles reward to $10 million (2017)",
      url: "https://www.npr.org/sections/thetwo-way/2017/05/24/529848502/hot-tip-on-old-heist-could-be-worth-10-million-gardner-museum-says",
    },
    {
      label: "Wikipedia — The Storm on the Sea of Galilee",
      url: "https://en.wikipedia.org/wiki/The_Storm_on_the_Sea_of_Galilee",
    },
  ],
};
