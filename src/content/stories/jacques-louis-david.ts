import type { Story } from "../types";

/**
 * Jacques-Louis David, The Death of Socrates (1787), The Metropolitan Museum
 * of Art, New York (object 436105, acc. 31.45).
 * Every line here maps to an entry in docs/sources/jacques-louis-david.md.
 * Focus points were checked against the Met image
 * (public/art/w800/jacques-louis-david.jpg, 800 × 531). Image ratio from
 * that file, long edge 1600.
 */
export const jacquesLouisDavid: Story = {
  slug: "jacques-louis-david",
  title: "Hemlock",
  year: "1787",
  image: {
    src: "/art/jacques-louis-david.jpg",
    status: "pending",
    width: 1600,
    height: 1062,
  },
  cover: { kicker: "The Death of Socrates" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. The Salon of 1787.",
        "Thomas Jefferson walks the rooms.",
        "“The best thing,” he writes, is this.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 66, y: 34, scale: 2.4 },
      lines: [
        "Socrates, sentenced to die.",
        "One hand points up.",
        "The other reaches for the poison.",
        "He isn't looking at the cup.",
      ],
      caption: "Socrates",
    },
    {
      kind: "beat",
      focus: { x: 50, y: 42, scale: 2.8 },
      lines: [
        "The man with the cup can't watch.",
        "He hands it over with his face in his hand.",
      ],
      caption: "The cup of hemlock",
    },
    {
      kind: "beat",
      focus: { x: 71, y: 62, scale: 2.4 },
      lines: [
        "Crito grips his thigh.",
        "As if he could hold him here.",
      ],
      caption: "Crito",
    },
    {
      kind: "beat",
      focus: { x: 21, y: 44, scale: 2.8 },
      lines: [
        "Down the corridor, up the stairs,",
        "his family is led away.",
      ],
      caption: "The family leaving",
    },
    {
      kind: "beat",
      focus: { x: 27, y: 62, scale: 2.6 },
      lines: [
        "At the foot of the bed, an old man. Head bowed.",
        "Plato. He wrote this scene down.",
      ],
      twist: "He wasn't there. David signed his initials under him.",
      caption: "Plato at the foot of the bed",
    },
  ],
  reveal: { lines: ["The whole cell.", "Uncropped."] },
  quote: {
    text: "Crito, I owe a cock to Asclepius; will you remember to pay the debt?",
    attribution: "Socrates' last words, in Plato's Phaedo (trans. Benjamin Jowett)",
  },
  close: {
    heading: "1794",
    lines: [
      "Seven years after the Salon, the Terror.",
      "The Trudaine brothers go to the guillotine.",
      "One of them paid for this painting.",
    ],
  },
  sources: [
    {
      label: "The Met: The Death of Socrates (31.45)",
      url: "https://www.metmuseum.org/art/collection/search/436105",
    },
    {
      label: "Founders Online: Thomas Jefferson to John Trumbull, 30 August 1787",
      url: "https://founders.archives.gov/documents/Jefferson/01-12-02-0076",
    },
    {
      label: "Plato, Phaedo (trans. Jowett): Wikisource",
      url: "https://en.wikisource.org/wiki/Phaedo_(Jowett)",
    },
    {
      label: "EBSCO Research Starters: David paints The Death of Socrates",
      url: "https://ebsco.com/research-starters/history/david-paints-death-socrates",
    },
    {
      label: "Wikipedia: The Death of Socrates",
      url: "https://en.wikipedia.org/wiki/The_Death_of_Socrates",
    },
  ],
  showSources: true,
};
