import type { Story } from "../types";

/**
 * Gustav Klimt, The Kiss (Kuss), 1908/09.
 * Belvedere, Vienna. Oil and gold leaf on canvas, 180 x 180 cm.
 * Every line here maps to an entry in docs/sources/gustav-klimt.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const gustavKlimt: Story = {
  slug: "gustav-klimt",
  title: "The Kiss",
  year: "1908",
  image: {
    src: "/art/gustav-klimt.jpg",
    status: "pending",
    width: 1600,
    height: 1600,
  },
  cover: { kicker: "The Kiss" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Vienna. 1908.",
        "Two lovers. A field of gold.",
        "A perfect square. 180 by 180 centimetres.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 42, y: 42, scale: 2.2 },
      lines: ["His robe is rectangles.", "Black, white, gold.", "Hard edges."],
      caption: "His robe",
    },
    {
      kind: "beat",
      focus: { x: 58, y: 66, scale: 2.4 },
      lines: [
        "Hers is circles and flowers.",
        "Soft against hard.",
        "Gold leaf. Silver. Platinum.",
      ],
      caption: "Her dress",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 88, scale: 2.6 },
      lines: ["They kneel on a bed of flowers.", "Gold above. Meadow below."],
      caption: "The flower meadow",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 26, scale: 2.8 },
      lines: [
        "Her eyes are closed.",
        "In 1905 Klimt quit a state commission.",
        "Paid back the fee. Took the paintings home.",
      ],
      twist: "In 1908 the state paid 25,000 crowns for this.",
      caption: "The faces",
    },
  ],
  reveal: { lines: ["The whole square.", "Gold, edge to edge."] },
  quote: {
    text: "Whoever wants to know something about me… ought to look carefully at my pictures and try to see in them what I am and what I want to do.",
    attribution:
      "Gustav Klimt, undated manuscript (Wienbibliothek im Rathaus), as translated by the Neue Galerie",
  },
  close: {
    heading: "May 1945",
    lines: [
      "Those paintings were for Vienna University.",
      "By then they were stored at Schloss Immendorf.",
      "The castle burned as the war ended.",
      "They have not been seen since. Photographs remain.",
      "The Kiss has been the state's since 1908.",
    ],
  },
  sources: [
    {
      label: "Belvedere — The Kiss (Google Arts & Culture)",
      url: "https://artsandculture.google.com/asset/the-kiss-0098/HQGxUutM_F6ZGg",
    },
    {
      label: "Belvedere — The Kiss, about the original",
      url: "https://print.belvedere.at/en/?p=14549",
    },
    {
      label: "Smarthistory — Gustav Klimt, The Kiss",
      url: "https://smarthistory.org/gustav-klimt-the-kiss",
    },
    {
      label: "Google Arts & Culture — The Faculty Paintings",
      url: "https://artsandculture.google.com/story/XwUhMS_zkPdZzw",
    },
    {
      label: "Wikipedia — Klimt University of Vienna Ceiling Paintings",
      url: "https://en.wikipedia.org/wiki/Klimt_University_of_Vienna_Ceiling_Paintings",
    },
    {
      label: "Neue Galerie — Gustav Klimt",
      url: "https://www.neuegalerie.org/gustav-klimt",
    },
  ],
  showSources: true,
};
