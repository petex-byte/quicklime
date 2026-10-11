import type { Story } from "../types";

/**
 * Artemisia Gentileschi, Judith Slaying Holofernes, Uffizi version (c. 1620),
 * Gallerie degli Uffizi, Florence (inv. 1890 n. 1567). Not the earlier
 * Capodimonte version in Naples.
 * Every line here maps to an entry in docs/sources/artemisia-gentileschi.md.
 * Focus points are first-pass estimates from the known composition;
 * tune them against the cleared image.
 * Image ratio from the Uffizi's 146.5 × 108 cm (other sources give 199 × 162.5;
 * see the sources file), long edge 1600.
 */
export const artemisiaGentileschi: Story = {
  slug: "artemisia-gentileschi",
  title: "Judith",
  year: "c. 1620",
  image: {
    src: "/art/artemisia-gentileschi.jpg",
    status: "pending",
    width: 1180,
    height: 1600,
  },
  cover: { kicker: "Judith Slaying Holofernes (Uffizi version)" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Florence. Around 1620.",
        "Artemisia paints Judith again.",
        "Her first version hangs in Naples.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 40, scale: 2.2 },
      lines: [
        "Two women hold him down.",
        "The maid pins his arms.",
        "Judith grips his hair.",
      ],
      caption: "Judith and her maid",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 62, scale: 2.6 },
      lines: ["The sword goes through his neck.", "Blood arcs onto the sheets."],
      caption: "The sword",
    },
    {
      kind: "beat",
      focus: { x: 38, y: 30, scale: 2.4 },
      lines: [
        "Her face doesn't flinch.",
        "The painting went to the Medici.",
        "The money was slow to follow.",
      ],
      twist: "Galileo stepped in to get her paid.",
      caption: "Judith's face",
    },
  ],
  reveal: { lines: ["The whole canvas.", "Nothing cropped."] },
  quote: {
    text: "Ego Artemisia Lomi fec.",
    attribution: "Her signature on the canvas: \"I, Artemisia Lomi, made this\"",
  },
  close: {
    heading: "1612",
    lines: [
      "Rome. Her father takes the painter Agostino Tassi to court.",
      "The charge: Tassi raped her.",
      "She testifies under thumbscrews.",
      "Tassi is convicted. His exile is never enforced.",
      "In 1616 she is the first woman in Florence's art academy.",
    ],
  },
  sources: [
    {
      label: "Uffizi — Judith Beheading Holofernes",
      url: "https://www.uffizi.it/en/artworks/judith-beheading-holofernes",
    },
    {
      label: "Wikipedia — Judith Slaying Holofernes (Artemisia Gentileschi, Florence)",
      url: "https://en.wikipedia.org/wiki/Judith_Slaying_Holofernes_(Artemisia_Gentileschi,_Florence)",
    },
    {
      label: "Artnet — Art Bites: Gentileschi and Galileo",
      url: "https://news.artnet.com/art-world/art-bites-gentileschi-galileo-2458092",
    },
    {
      label: "National Geographic — Artemisia Gentileschi shocked 17th-century Italy",
      url: "https://www.nationalgeographic.com/history/history-magazine/article/artist-artemisia-gentileschi-shocked-17th-century-italy",
    },
    {
      label: "Finestre sull'Arte — Artemisia Gentileschi, life and works",
      url: "https://finestresullarte.info/en/ab-art-base/artemisia-gentileschi-life-and-works-of-the-great-seventeenth-century-artist",
    },
  ],
  showSources: true,
};
