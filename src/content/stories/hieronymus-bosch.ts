import type { Story } from "../types";

/**
 * Hieronymus Bosch, The Garden of Earthly Delights (c. 1490–1500).
 * Museo del Prado, Madrid, P002823. Oil on oak panel, open triptych.
 * Overall size is given as about 220 x 389 cm (Commons/Wikipedia); a Prado
 * figure of 205.5 x 384.9 cm also circulates. Aspect uses 220 x 389.
 * Every line here maps to an entry in docs/sources/hieronymus-bosch.md.
 * Focus points are estimates from the known composition of the open triptych
 * (left wing ~0–23%, centre ~23–77%, right wing ~77–100% of the width);
 * tune them against the cleared image.
 */
export const hieronymusBosch: Story = {
  slug: "hieronymus-bosch",
  title: "The Garden of Earthly Delights",
  year: "c. 1490–1500",
  image: {
    src: "/art/hieronymus-bosch.jpg",
    status: "pending",
    holder: "Museo Nacional del Prado, Madrid (P002823), Spain",
    width: 1600,
    height: 905,
  },
  cover: { kicker: "The Garden of Earthly Delights" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Three panels. Paradise. Pleasure. Hell.",
        "First recorded in 1517. A palace in Brussels.",
        "Closed, it shows a grey world. Open, this.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 12, y: 72, scale: 2.4 },
      lines: ["Eden.", "God brings Eve to Adam.", "Everything is still calm."],
      caption: "God, Adam and Eve",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 55, scale: 2 },
      lines: [
        "The centre is crowded.",
        "Naked bodies. Giant fruit. Giant birds.",
      ],
      caption: "The garden",
    },
    {
      kind: "beat",
      focus: { x: 86, y: 62, scale: 2.4 },
      lines: [
        "Then hell. It's loud.",
        "A harp. A lute. People strung through them.",
        "Music is the punishment.",
      ],
      caption: "The musical instruments of hell",
    },
    {
      kind: "beat",
      focus: { x: 83, y: 78, scale: 3.2 },
      lines: ["One man lies pinned under the lute.", "Notes are painted on his backside."],
      twist: "In 2014 a student transcribed them. It went viral.",
      caption: "The man under the lute",
    },
  ],
  reveal: { lines: ["All three panels.", "Uncropped."] },
  quote: {
    text: "Ipse dixit et facta sunt. Ipse mandavit et creata sunt.",
    attribution:
      "Psalm 33:9, inscribed across the closed wings — “For he spake, and it was done; he commanded, and it stood fast.”",
  },
  close: {
    heading: "8 July 1593",
    lines: [
      "Philip II of Spain bought it at a sale in 1591.",
      "He sent it to his monastery, El Escorial.",
      "It stayed there for 340 years.",
      "In 1933 it went to the Prado.",
    ],
  },
  sources: [
    {
      label: "Museo del Prado — The Garden of Earthly Delights Triptych",
      url: "https://www.museodelprado.es/en/the-collection/art-work/the-garden-of-earthly-delights-triptych/02388242-6d6a-4e9e-a992-e1311eab3609",
    },
    {
      label: "Wikipedia — The Garden of Earthly Delights",
      url: "https://en.wikipedia.org/wiki/The_Garden_of_Earthly_Delights",
    },
    {
      label: "Medievalists.net — the 500-year-old song in hell (2014)",
      url: "https://www.medievalists.net/2014/02/500-year-old-song-found-butt-hell-sound-like/",
    },
    {
      label: "Artnet News — Bosch's butt song from hell",
      url: "https://news.artnet.com/art-world/bosch-butt-song-from-hell-309732",
    },
    {
      label: "Early Music Muse — Bosch and the music of hell (dissent)",
      url: "https://earlymusicmuse.com/bosch1/",
    },
  ],
  showSources: true,
};
