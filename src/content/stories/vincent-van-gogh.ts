import type { Story } from "../types";

/**
 * Vincent van Gogh, The Starry Night (June 1889), MoMA, New York.
 * Every line here maps to an entry in docs/sources/vincent-van-gogh.md.
 * Focus points are first-pass estimates from the known composition;
 * tune them against the cleared image.
 */
export const vincentVanGogh: Story = {
  slug: "vincent-van-gogh",
  title: "The Starry Night",
  year: "1889",
  image: {
    src: "/art/vincent-van-gogh.jpg",
    status: "pending",
    // 73.7 x 92.1 cm, landscape.
    width: 1600,
    height: 1280,
  },
  cover: { kicker: "The Starry Night" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Saint-Rémy. June 1889.",
        "Van Gogh is a patient.",
        "A mental hospital in the south of France.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 35, y: 52, scale: 2.6 },
      lines: [
        "One star burns bigger than the rest.",
        "Low. Left of centre.",
        "Most read it as Venus. The morning star.",
      ],
      caption: "The morning star, most often read as Venus",
    },
    {
      kind: "beat",
      focus: { x: 16, y: 50, scale: 2 },
      lines: [
        "A cypress fills the left edge.",
        "Ground to sky in one dark flame.",
      ],
      caption: "Cypress",
    },
    {
      kind: "beat",
      focus: { x: 62, y: 80, scale: 2.4 },
      lines: [
        "The view is from his window. Almost.",
        "The village below wasn't in it.",
        "He added it.",
      ],
      caption: "The village",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 28, scale: 2.2 },
      lines: [
        "Later, he judged it in a letter.",
        "Stars too big, he said.",
      ],
      twist: "He called it a failure.",
      caption: "The sky",
    },
  ],
  reveal: { lines: ["The whole night.", "Uncropped."] },
  quote: {
    text: "This morning I saw the countryside from my window a long time before sunrise, with nothing but the morning star, which looked very big.",
    attribution:
      "Vincent van Gogh to Theo van Gogh, Saint-Rémy, c. 31 May to 6 June 1889 (letter 777)",
  },
  close: {
    heading: "1941",
    lines: [
      "The Museum of Modern Art wants it.",
      "It pays in paintings, not cash.",
      "Three works from the Lillie P. Bliss bequest.",
      "Two Cézannes. One Toulouse-Lautrec.",
      "It has belonged to MoMA ever since.",
    ],
  },
  sources: [
    {
      label: "MoMA: The Starry Night, collection record",
      url: "https://www.moma.org/collection/works/79802",
    },
    {
      label: "MoMA Inside/Out: Shedding light on The Starry Night",
      url: "https://www.moma.org/explore/inside_out/2013/04/10/shedding-light-on-the-starry-night/",
    },
    {
      label: "Van Gogh Letters: letter 777, to Theo",
      url: "https://vangoghletters.org/vg/letters/let777/letter.html",
    },
    {
      label: "Google Arts & Culture: Zoom into The Starry Night",
      url: "https://artsandculture.google.com/story/egVRmbCQ5tyrVA",
    },
    {
      label: "Freakonomics Radio: The Starry Night (MoMA's 1941 exchange)",
      url: "https://freakonomics.com/podcast/the-starry-night/",
    },
    {
      label: "Wikipedia: The Starry Night",
      url: "https://en.wikipedia.org/wiki/The_Starry_Night",
    },
  ],
  showSources: true,
};
