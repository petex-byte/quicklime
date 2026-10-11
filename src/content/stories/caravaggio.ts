import type { Story } from "../types";

/**
 * Caravaggio, Nativity with St. Francis and St. Lawrence (1600 or 1609; date disputed),
 * Oratorio di San Lorenzo, Palermo. Stolen October 1969, never recovered.
 * Every line here maps to an entry in docs/sources/caravaggio.md.
 * Focus points are first-pass estimates from the known composition;
 * tune them against the cleared image.
 * Image ratio from 268 × 197 cm, long edge 1600.
 */
export const caravaggio: Story = {
  slug: "caravaggio",
  title: "The Missing Nativity",
  year: "1600 or 1609",
  image: {
    src: "/art/caravaggio.jpg",
    status: "pending",
    width: 1176,
    height: 1600,
  },
  cover: { kicker: "Nativity with St. Francis and St. Lawrence" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Palermo. The Oratory of San Lorenzo.",
        "Caravaggio, over the altar.",
        "Almost 2.7 metres of canvas.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 14, scale: 2.2 },
      lines: ["An angel swoops in from above.", "It carries a scroll."],
      caption: "The angel and the scroll",
    },
    {
      kind: "beat",
      focus: { x: 55, y: 62, scale: 2.4 },
      lines: ["Mary sits slumped.", "The child lies at her feet."],
      caption: "Mary and the Child",
    },
    {
      kind: "beat",
      focus: { x: 82, y: 42, scale: 2.4 },
      lines: [
        "Two saints who never saw Bethlehem.",
        "Lawrence on the left. Francis on the right.",
      ],
      caption: "Saint Francis",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 55, scale: 1.8 },
      lines: ["Look again at the colours.", "Every one comes from a photograph."],
      twist: "The painting itself hasn't been seen since 1969.",
      caption: "The canvas, as photographed before the theft",
    },
  ],
  reveal: { lines: ["The whole Nativity.", "As it was before 1969."] },
  quote: {
    text: "Gloria in excelsis Deo",
    attribution:
      "The angel's scroll. \"Glory to God in the highest\" (Luke 2:14)",
  },
  close: {
    heading: "October 1969",
    lines: [
      "Thieves cut it from its frame.",
      "It has never been found.",
      "Mafia informants have told conflicting stories.",
      "In 2015 a replica went up in its place.",
    ],
  },
  sources: [
    {
      label: "UNESCO — Stolen objects record: Nativity with Saints Lorenzo and Francesco",
      url: "https://museum.unesco.org/stolen-objects/VM-IT-25-001_Nativity_with_Saints_Lorenzo_and_Francesco_dAssisi_painting",
    },
    {
      label: "Finestre sull'Arte — Caravaggio's Nativity: painted in Rome, sent to Palermo, stolen in 1969",
      url: "https://www.finestresullarte.info/en/works-and-artists/caravaggio-s-nativity-the-masterpiece-painted-in-rome-sent-to-palermo-and-stolen-in-1969",
    },
    {
      label: "Artnet — The hunt for Caravaggio's Nativity",
      url: "https://news.artnet.com/art-world/the-hunt-caravaggio-nativity-2454998",
    },
    {
      label: "Apollo — The murky mystery of Caravaggio's stolen Palermo Nativity",
      url: "https://apollo-magazine.com/the-murky-mystery-of-caravaggios-stolen-palermo-nativity",
    },
    {
      label: "Factum Foundation — Recreating the Nativity",
      url: "https://factumfoundation.org/our-projects/digital-restorations/caravaggios-nativity-with-saint-francis-and-saint-lawrence/",
    },
    {
      label: "Wikipedia — Nativity with Saint Francis and Saint Lawrence",
      url: "https://en.wikipedia.org/wiki/Nativity_with_Saint_Francis_and_Saint_Lawrence",
    },
  ],
  showSources: true,
};
