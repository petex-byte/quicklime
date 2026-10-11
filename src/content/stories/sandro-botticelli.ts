import type { Story } from "../types";

/**
 * Sandro Botticelli, The Birth of Venus (c. 1485), Gallerie degli Uffizi, Florence.
 * Tempera on canvas, 172.5 × 278.5 cm, so 1600 × 991 at a 1600 long edge.
 * Every line here maps to an entry in docs/sources/sandro-botticelli.md.
 * Focus points are estimates from the known composition, not measured
 * against an image; tune them against the cleared image.
 */
export const sandroBotticelli: Story = {
  slug: "sandro-botticelli",
  title: "Landfall",
  year: "c. 1485",
  image: {
    src: "/art/sandro-botticelli.jpg",
    status: "pending",
    width: 1600,
    height: 991,
  },
  cover: { kicker: "The Birth of Venus" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Florence. Around 1485.",
        "A pagan goddess. Nude.",
        "Painted on canvas, not wood.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 20, y: 35, scale: 2.4 },
      lines: [
        "Left: Zephyr, the west wind.",
        "A nymph in his arms.",
        "Both of them blowing.",
      ],
      caption: "Zephyr and the nymph",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 45, scale: 2 },
      lines: ["She stands on a shell.", "Driven in by the wind."],
      caption: "Venus on the shell",
    },
    {
      kind: "beat",
      focus: { x: 78, y: 45, scale: 2.4 },
      lines: [
        "Right: a woman on the shore.",
        "A flowered cloak, held open for her.",
      ],
      twist: "The title is wrong. She isn't being born. She's landing.",
      caption: "The Hora of spring and the cloak",
    },
  ],
  reveal: { lines: ["Wind. Shell. Shore.", "Uncropped."] },
  quote: {
    text: "the moist breath of the western wind wafted her over the waves of the loud-moaning sea in soft foam",
    attribution:
      "Homeric Hymn 6, To Aphrodite (trans. H. G. Evelyn-White, 1914) — the myth the painting follows",
  },
  close: {
    heading: "1870",
    lines: [
      "Botticelli died in 1510.",
      "For centuries, his name faded.",
      "Then the Victorians found him.",
      "Ruskin. The Pre-Raphaelites.",
      "Walter Pater's essay, 1870.",
    ],
  },
  sources: [
    {
      label: "Uffizi Galleries — The Birth of Venus",
      url: "https://uffizi.it/en/artworks/birth-of-venus",
    },
    {
      label: "Uffizi, Google Arts & Culture — The Birth of Venus",
      url: "https://artsandculture.google.com/asset/the-birth-of-venus/MQEeq50LABEBVg",
    },
    {
      label: "The Met — Copy after Botticelli (on his 19th-century revival)",
      url: "https://metmuseum.org/art/collection/search/13179",
    },
    {
      label: "Homeric Hymn 6 to Aphrodite, trans. Evelyn-White (Perseus)",
      url: "https://cts.perseids.org/read/greekLit/tlg0013/tlg006/perseus-eng2/1-20",
    },
  ],
  showSources: true,
};
