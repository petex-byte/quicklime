import type { Story } from "../types";

/**
 * Michelangelo, Sistine Chapel ceiling (1508–1512), Vatican City.
 * A fresco on a barrel vault has no canvas size. The aspect ratio here comes
 * from the chapel's interior plan, about 40.9 × 13.4 m, so 1600 × 524 at a
 * 1600 long edge, for a flattened whole-ceiling photograph. Swap for the real
 * ratio of whichever photograph clears.
 * Every line here maps to an entry in docs/sources/michelangelo.md.
 * Focus points are estimates that assume the altar end is on the left; they
 * are not measured against an image. Tune them against the cleared image.
 */
export const michelangelo: Story = {
  slug: "michelangelo",
  title: "The Vault",
  year: "1508–1512",
  image: {
    src: "/art/michelangelo.jpg",
    status: "pending",
    width: 1600,
    height: 524,
  },
  cover: { kicker: "Sistine Chapel ceiling" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Rome. 1508.",
        "Pope Julius II wants the vault painted.",
        "The plan: twelve Apostles.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1.8 },
      lines: [
        "Michelangelo told the Pope it would look poor.",
        "Why? The Apostles were poor too, he said.",
        "So the plan changed.",
      ],
      caption: "The Genesis scenes down the centre",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 14, scale: 2.4 },
      lines: [
        "Nine scenes from Genesis.",
        "Prophets and sibyls down the sides.",
      ],
      twist: "Twelve figures were the plan. He painted more than 300.",
      caption: "Prophets and sibyls along the side",
    },
    {
      kind: "beat",
      focus: { x: 41, y: 50, scale: 3 },
      lines: [
        "Two fingers. A gap between them.",
        "He didn't paint it lying down.",
        "He stood. Head back. Arm up.",
      ],
      caption: "The Creation of Adam",
    },
  ],
  reveal: { lines: ["Four years.", "One vault.", "Uncropped."] },
  quote: {
    text: "Since foul I fare and painting is my shame.",
    attribution:
      "Michelangelo, sonnet to Giovanni da Pistoia on painting the ceiling, c. 1509 (trans. J. A. Symonds, 1878)",
  },
  close: {
    heading: "1980–1994",
    lines: [
      "Restorers clean the chapel's frescoes.",
      "Centuries of candle smoke come off.",
      "Colours nobody had seen in centuries return.",
      "Critics said they took too much.",
      "The argument hasn't ended.",
    ],
  },
  sources: [
    {
      label: "Wikipedia — Sistine Chapel ceiling",
      url: "https://en.wikipedia.org/wiki/Sistine_Chapel_ceiling",
    },
    {
      label: "Wikipedia — Restoration of the Sistine Chapel frescoes",
      url: "https://en.wikipedia.org/wiki/Restoration_of_the_Sistine_Chapel_frescoes",
    },
    {
      label: "Christian Science Monitor — A shade of doubt dogs the restoration (1986)",
      url: "https://www.csmonitor.com/1986/0911/lsist-f.html",
    },
    {
      label: "Artnet — Michelangelo's Sistine Chapel poem",
      url: "https://news.artnet.com/art-world/art-bites-michelangelo-sistine-chapel-poem-2435098",
    },
    {
      label: "Project Gutenberg — The Sonnets of Michael Angelo, trans. J. A. Symonds",
      url: "https://www.gutenberg.org/ebooks/10314",
    },
    {
      label: "The Scotsman — A glimpse of heaven",
      url: "https://www.scotsman.com/whats-on/arts-and-entertainment/a-glimpse-of-heaven-the-story-of-michaelangelos-masterpiece-the-ceiling-of-the-sistine-chapel-2463459",
    },
  ],
  showSources: true,
};
