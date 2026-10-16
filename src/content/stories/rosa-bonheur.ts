import type { Story } from "../types";

/**
 * Rosa Bonheur, The Horse Fair (1852–55), The Metropolitan Museum of Art,
 * New York (87.25, Met object 435702).
 * Every line here maps to an entry in docs/sources/rosa-bonheur.md.
 * Focus points were checked against the Met image (public/art/w800/rosa-bonheur.jpg).
 * That photo includes the gold frame, so x/y are percent of the full photo,
 * frame included, and every point sits on the canvas inside the frame.
 * width/height follow that photo's 800x412 ratio.
 */
export const rosaBonheur: Story = {
  slug: "rosa-bonheur",
  title: "The Horse Fair",
  year: "1852 to 1855",
  image: {
    src: "/art/rosa-bonheur.jpg",
    status: "pending",
    width: 1600,
    height: 824,
  },
  cover: { kicker: "The Horse Fair" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. 1852.",
        "A horse market on the Boulevard de l'Hôpital.",
        "Rosa Bonheur goes twice a week.",
        "For a year and a half.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 12, y: 39, scale: 3 },
      lines: [
        "That dome is the Salpêtrière.",
        "An asylum.",
        "The market ran beside it.",
      ],
      caption: "The dome of the Salpêtrière",
    },
    {
      kind: "beat",
      focus: { x: 66, y: 61, scale: 2.2 },
      lines: [
        "Over five metres wide.",
        "Nearly two and a half metres high.",
        "Dapple greys, hooves lifting.",
      ],
      caption: "The dapple greys",
    },
    {
      kind: "beat",
      focus: { x: 23, y: 61, scale: 2.6 },
      lines: [
        "She drew here in men's clothes.",
        "It drew fewer stares.",
        "In Paris, a woman in trousers needed a police permit.",
        "Bonheur held one. Renewed every six months.",
      ],
      caption: "A handler in shirtsleeves",
    },
    {
      kind: "beat",
      focus: { x: 37, y: 43, scale: 3 },
      lines: ["One rider wears a blue smock.", "He sits the rearing black horse."],
      twist: "He is often read as Bonheur herself.",
      caption: "The rider in blue, often read as a self-portrait",
    },
  ],
  reveal: { lines: ["The whole market.", "In motion."] },
  quote: {
    text: "The suit I wear is my work attire and nothing else.",
    attribution: "Rosa Bonheur, on her men's clothes (English translation)",
  },
  close: {
    heading: "$53,000",
    lines: [
      "1853: the Paris Salon. Wide praise.",
      "Bordeaux could have had it for 15,000 francs.",
      "The city passed. A dealer paid 40,000.",
      "1887: Cornelius Vanderbilt pays $53,000.",
      "He gives it to the Met the same year.",
    ],
  },
  sources: [
    {
      label: "The Met: The Horse Fair (collection record)",
      url: "https://www.metmuseum.org/art/collection/search/435702",
    },
    {
      label: "The Met: Heilbrunn Timeline entry, The Horse Fair",
      url: "https://www.metmuseum.org/toah/works-of-art/87.25",
    },
    {
      label: "Royal Collection Trust: Rosa Bonheur (the 1855 viewing for Queen Victoria)",
      url: "https://www.rct.uk/collection/stories/rosa-bonheur",
    },
    {
      label: "JSTOR Daily: Rosa Bonheur's permission to wear pants",
      url: "https://daily.jstor.org/rosa-bonheurs-permission-to-wear-pants/",
    },
    {
      label: "Philbrook Museum of Art: Rosa Bonheur",
      url: "https://philbrook.emuseum.com/people/2471/rosa-bonheur",
    },
    {
      label: "Wikipedia: The Horse Fair",
      url: "https://en.wikipedia.org/wiki/The_Horse_Fair",
    },
  ],
  showSources: true,
};
