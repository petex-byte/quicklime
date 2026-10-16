import type { Story } from "../types";

/**
 * Johannes Vermeer, Girl with a Pearl Earring (c. 1665), Mauritshuis, The Hague (inv. 670).
 * Every line here maps to an entry in docs/sources/johannes-vermeer.md.
 * Focus points are first-pass estimates from the known composition;
 * tune them against the cleared image.
 * Image ratio from 44.5 × 39 cm (Mauritshuis / Wikipedia), long edge 1600.
 */
export const johannesVermeer: Story = {
  slug: "johannes-vermeer",
  title: "The Pearl",
  year: "c. 1665",
  image: {
    src: "/art/johannes-vermeer.jpg",
    status: "pending",
    width: 1402,
    height: 1600,
  },
  cover: { kicker: "Girl with a Pearl Earring" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Delft. Around 1665.",
        "Nobody knows who she is.",
        "It isn't a portrait. It's a tronie.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 42, y: 40, scale: 2.8 },
      lines: [
        "Look at her eyes.",
        "The 2018 study found eyelashes.",
        "Too fine to see unaided.",
      ],
      caption: "Her eyes",
    },
    {
      kind: "beat",
      focus: { x: 80, y: 30, scale: 2 },
      lines: [
        "The background looks empty.",
        "It was a green curtain.",
        "The green has darkened to black.",
      ],
      caption: "The dark background",
    },
    {
      kind: "beat",
      focus: { x: 40, y: 18, scale: 2.2 },
      lines: [
        "The headscarf is ultramarine.",
        "A costly blue.",
        "Vermeer used it freely.",
      ],
      caption: "The blue headscarf",
    },
    {
      kind: "beat",
      focus: { x: 62, y: 54, scale: 3.2 },
      lines: ["And the pearl.", "Strokes of white paint. Nothing more."],
      twist: "No hook. Nothing holds it to her ear.",
      caption: "The pearl",
    },
  ],
  reveal: { lines: ["The whole head.", "Uncropped."] },
  quote: {
    text: "In a day and a half he had gone from being healthy to being dead.",
    attribution:
      "Catharina Bolnes, Vermeer's widow, in her bankruptcy petition",
  },
  close: {
    heading: "1881",
    lines: [
      "The painting turns up at auction in The Hague.",
      "It sells for two guilders. Plus thirty cents.",
      "The buyer, A.A. des Tombe, dies in 1902.",
      "His will leaves it to the Mauritshuis.",
    ],
  },
  sources: [
    {
      label: "Mauritshuis: Girl with a Pearl Earring (inv. 670)",
      url: "https://mauritshuis.nl/en/discover/mauritshuis/masterpieces-from-the-mauritshuis/girl-with-a-pearl-earring-670",
    },
    {
      label: "Mauritshuis: New research into Vermeer's Girl with a Pearl Earring",
      url: "https://www.mauritshuis.nl/en/press-releases/new-research-into-vermeer-s-girl-with-a-pearl-earring",
    },
    {
      label: "CODART: New discoveries from the examination of Girl with a Pearl Earring",
      url: "https://www.codart.nl/art-works/new-discoveries-and-insights-from-the-examination-of-vermeers-girl-with-a-pearl-earring/",
    },
    {
      label: "The Frick Collection: Vermeer's life and debts (Quodbach)",
      url: "https://www.frick.org/sites/default/files/archivedsite/exhibitions/vermeer/quodbach.htm",
    },
    {
      label: "Wikipedia: Girl with a Pearl Earring",
      url: "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring",
    },
  ],
  showSources: true,
};
