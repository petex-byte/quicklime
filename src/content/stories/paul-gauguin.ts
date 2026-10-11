import type { Story } from "../types";

/**
 * Paul Gauguin, Where Do We Come From? What Are We? Where Are We Going?
 * (1897–98), Museum of Fine Arts, Boston (36.270).
 * The title as inscribed on the canvas: D'ou Venons Nous / Que Sommes Nous /
 * Où Allons Nous (no question marks).
 * Every line here maps to an entry in docs/sources/paul-gauguin.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const paulGauguin: Story = {
  slug: "paul-gauguin",
  title: "Three Questions",
  year: "1897–98",
  image: {
    src: "/art/paul-gauguin.jpg",
    status: "pending",
    width: 1600,
    height: 594,
  },
  cover: { kicker: "D'où Venons Nous / Que Sommes Nous / Où Allons Nous" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Tahiti. 1897.",
        "Nearly four metres of canvas.",
        "His daughter Aline has died that year.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 10, y: 12, scale: 3 },
      lines: [
        "Top left, he paints the title.",
        "D'où Venons Nous.",
        "Que Sommes Nous.",
        "Où Allons Nous.",
      ],
      twist: "Three questions. Not one question mark.",
      caption: "The inscription, upper left",
    },
    {
      kind: "beat",
      focus: { x: 90, y: 75, scale: 2.6 },
      lines: [
        "Read it right to left, he wrote.",
        "Like a sacred scroll.",
        "It begins with a sleeping baby.",
      ],
      caption: "The sleeping child, lower right",
    },
    {
      kind: "beat",
      focus: { x: 28, y: 40, scale: 2.4 },
      lines: [
        "Further left, an idol.",
        "He lists it in his own key to the picture.",
      ],
      caption: "The idol",
    },
    {
      kind: "beat",
      focus: { x: 8, y: 72, scale: 2.6 },
      lines: [
        "It ends at the far left.",
        "An old woman, crouching.",
        "Close to death.",
      ],
      caption: "The old woman, lower left",
    },
  ],
  reveal: { lines: ["Right to left.", "Birth to death."] },
  quote: {
    text: "I shall never do anything better or even like it.",
    attribution:
      "Gauguin to Daniel de Monfreid, February 1898 (English translation)",
  },
  close: {
    heading: "1898",
    lines: [
      "He told Monfreid he took arsenic once it was done.",
      "He survived. Some historians doubt it happened.",
      "That year he shipped the canvas to Paris.",
      "Boston bought it in 1936.",
    ],
  },
  sources: [
    {
      label: "Museum of Fine Arts, Boston — collection record",
      url: "https://collections.mfa.org/objects/32558",
    },
    {
      label: "Smarthistory — Gauguin, Where do we come from?",
      url: "https://smarthistory.org/?p=1491",
    },
    {
      label: "Wikipedia — Where Do We Come From? What Are We? Where Are We Going?",
      url: "https://en.wikipedia.org/wiki/Where_Do_We_Come_From%3F_What_Are_We%3F_Where_Are_We_Going%3F",
    },
    {
      label: "Smartify — the inscription",
      url: "https://app.smartify.org/ro/objects/where-do-we-come-from-what-are-we-where-are-we-going",
    },
  ],
  showSources: true,
};
