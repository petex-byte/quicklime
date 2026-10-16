import type { Story } from "../types";

/**
 * J. M. W. Turner, The Fighting Temeraire (1839). National Gallery, London,
 * NG524. Oil on canvas, 90.7 x 121.6 cm.
 * Chosen over Rain, Steam and Speed: the masts detail is confirmed by the
 * National Gallery and Royal Museums Greenwich, and the bequest, poll and
 * £20 note all have primary sources.
 * Every line here maps to an entry in docs/sources/jmw-turner.md.
 * Focus points are estimates from the known composition; tune them against
 * the cleared image.
 */
export const jmwTurner: Story = {
  slug: "jmw-turner",
  title: "The Fighting Temeraire",
  year: "1839",
  image: {
    src: "/art/jmw-turner.jpg",
    status: "pending",
    holder: "The National Gallery, London (NG524), UK",
    width: 1600,
    height: 1193,
  },
  cover: { kicker: "The Fighting Temeraire, tugged to her last berth to be broken up" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "London. 1839. The Royal Academy.",
        "An old warship goes up the Thames.",
        "To be broken up.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 24, y: 60, scale: 2.2 },
      lines: [
        "She is the Temeraire.",
        "Trafalgar, 1805. She defended Nelson's flagship.",
        "By 1838 the Navy has sold her.",
      ],
      caption: "The Temeraire",
    },
    {
      kind: "beat",
      focus: { x: 42, y: 62, scale: 2.6 },
      lines: ["A small black tug drags her.", "Steam, pulling sail."],
      caption: "The steam tug",
    },
    {
      kind: "beat",
      focus: { x: 28, y: 28, scale: 2 },
      lines: ["Look up. Three tall masts.", "Sails furled. Still half rigged."],
      twist: "The Navy had stripped her masts. Turner painted them back.",
      caption: "The masts",
    },
    {
      kind: "beat",
      focus: { x: 78, y: 55, scale: 2 },
      lines: [
        "Turner probably never saw the tow.",
        "He built it from reports.",
        "Then he set the sun down behind it.",
      ],
      caption: "The sunset",
    },
  ],
  reveal: { lines: ["The whole river.", "Uncropped."] },
  quote: {
    text: "The flag which braved the battle and the breeze, / No longer owns her.",
    attribution:
      "Lines Turner showed with the painting at the Royal Academy, 1839, adapted from Thomas Campbell's Ye Mariners of England",
  },
  close: {
    heading: "His darling",
    lines: [
      "Turner never sold it. He called it his darling.",
      "He died in 1851. He left it to the nation.",
      "2005: a BBC Radio 4 poll names it",
      "Britain's greatest painting.",
      "Since 2020 it has been on the £20 note.",
    ],
  },
  sources: [
    {
      label: "National Gallery: The Fighting Temeraire",
      url: "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-the-fighting-temeraire",
    },
    {
      label: "National Gallery: Heroine of Trafalgar",
      url: "https://www.nationalgallery.org.uk/paintings/learn-about-art/paintings-in-depth/heroine-of-trafalgar-the-fighting-temeraire",
    },
    {
      label: "National Gallery: painting featured on new £20 note (2016)",
      url: "https://www.nationalgallery.org.uk/about-us/press-and-media/press-releases-archive/national-gallery-s-iconic-work-featured-on-new-bank-of-england-20-note",
    },
    {
      label: "Royal Museums Greenwich: Towing Temeraire drawing rediscovered",
      url: "https://rmg.co.uk/stories/blog/curatorial/towing-temeraire-drawing-rediscovered",
    },
    {
      label: "Wikipedia: The Fighting Temeraire",
      url: "https://en.wikipedia.org/wiki/The_Fighting_Temeraire",
    },
  ],
  showSources: true,
};
