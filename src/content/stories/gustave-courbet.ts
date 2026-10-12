import type { Story } from "../types";

/**
 * Gustave Courbet, Woman with a Parrot (1866), The Metropolitan Museum of Art,
 * New York (29.100.57, Met object 436002).
 * Every line here maps to an entry in docs/sources/gustave-courbet.md.
 * Focus points were checked against the Met image
 * (public/art/w800/gustave-courbet.jpg); width/height follow its 800x531 ratio.
 */
export const gustaveCourbet: Story = {
  slug: "gustave-courbet",
  title: "The Parrot",
  year: "1866",
  image: {
    src: "/art/gustave-courbet.jpg",
    status: "pending",
    width: 1600,
    height: 1062,
  },
  cover: { kicker: "Woman with a Parrot" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. The Salon of 1866.",
        "Gustave Courbet sends in a nude.",
        "The jury lets her in.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 30, y: 17, scale: 2.8 },
      lines: ["The parrot lands on her raised hand.", "Wings still open."],
      caption: "The parrot",
    },
    {
      kind: "beat",
      focus: { x: 14, y: 75, scale: 2.2 },
      lines: [
        "Her hair spills over the sheet.",
        "Critics complained about the hair.",
        "And the pose. Ungainly, they said.",
      ],
      caption: "The hair",
    },
    {
      kind: "beat",
      focus: { x: 85, y: 33, scale: 2.4 },
      lines: ["Behind her, a tall perch.", "A dish at the top.", "The bird has left it."],
      caption: "The perch",
    },
    {
      kind: "beat",
      focus: { x: 9, y: 95, scale: 3.2 },
      lines: ["Bottom left: '66.", "Gustave Courbet."],
      twist: "Two years earlier, the Salon threw out his nude as indecent.",
      caption: "Date and signature",
    },
  ],
  reveal: { lines: ["The whole canvas.", "Nearly two metres wide."] },
  quote: {
    text: "Painting is an essentially concrete art, and can consist only of representation of real and existing things.",
    attribution:
      "Gustave Courbet, open letter to prospective students, Courrier du dimanche, December 1861 (English translation)",
  },
  close: {
    heading: "Two parrots",
    lines: [
      "The same year, Manet starts his own.",
      "A young woman in a pink gown. A parrot.",
      "One critic said he'd borrowed Courbet's bird.",
      "Manet's reached the Met in 1889.",
      "Courbet's followed in 1929.",
    ],
  },
  sources: [
    {
      label: "The Met — Woman with a Parrot (collection record)",
      url: "https://www.metmuseum.org/art/collection/search/436002",
    },
    {
      label: "The Met — Heilbrunn Timeline entry, Woman with a Parrot",
      url: "https://www.metmuseum.org/toah/works-of-art/29.100.57",
    },
    {
      label: "The Met — Manet, Young Lady in 1866 (collection record)",
      url: "https://www.metmuseum.org/art/collection/search/436964",
    },
    {
      label: "Brooklyn Museum — Courbet, Isolated Rock (1861 letter quoted)",
      url: "https://www.brooklynmuseum.org/objects/4734",
    },
    {
      label: "Wikipedia — Woman with a Parrot (Courbet)",
      url: "https://en.wikipedia.org/wiki/Woman_with_a_Parrot_(Courbet)",
    },
  ],
  showSources: true,
};
