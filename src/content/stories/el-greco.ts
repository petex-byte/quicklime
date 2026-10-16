import type { Story } from "../types";

/**
 * El Greco, View of Toledo (c. 1599–1600), The Metropolitan Museum of Art,
 * New York (H. O. Havemeyer Collection, Bequest of Mrs. H. O. Havemeyer, 1929;
 * acc. 29.100.6; Met object 436575).
 * Every line here maps to an entry in docs/sources/el-greco.md.
 * Focus points were checked against the Met image (public/art/w800/el-greco.jpg)
 * by locating each detail on the downloaded file.
 * Image ratio from the Met image (800 × 904), long edge 1600.
 */
export const elGreco: Story = {
  slug: "el-greco",
  title: "Toledo",
  year: "c. 1599 to 1600",
  image: {
    src: "/art/el-greco.jpg",
    status: "pending",
    width: 1416,
    height: 1600,
  },
  cover: { kicker: "View of Toledo" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Toledo. Around 1600.",
        "A painter from Crete paints his city.",
        "He almost never paints landscape.",
        "Two survive. This is one.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 16, scale: 1.8 },
      lines: [
        "The sky is tearing open.",
        "Black cloud. Green-white light.",
        "No sun anywhere.",
      ],
      caption: "The storm sky",
    },
    {
      kind: "beat",
      focus: { x: 16, y: 49, scale: 2.8 },
      lines: [
        "Across the river, a castle on the ridge.",
        "San Servando.",
        "It stands where it really stands.",
      ],
      caption: "Castle of San Servando",
    },
    {
      kind: "beat",
      focus: { x: 36, y: 60, scale: 2.6 },
      lines: [
        "Below it, the Alcántara bridge.",
        "The Tagus runs dark underneath.",
      ],
      caption: "The Alcántara bridge",
    },
    {
      kind: "beat",
      focus: { x: 72, y: 36, scale: 2.4 },
      lines: [
        "On the crest, the cathedral spire.",
        "Beside it, the Alcázar, the royal palace.",
        "Church and crown, side by side.",
      ],
      twist: "From this hill you can't see the cathedral. He moved it in.",
      caption: "Cathedral spire and Alcázar",
    },
  ],
  reveal: { lines: ["The whole city.", "Uncropped."] },
  quote: {
    text: "It was necessary to place the Hospital of Don Juan Tavera in the form of a model",
    attribution:
      "El Greco, inscribed on his later View and Plan of Toledo, explaining why he moved a building",
  },
  close: {
    heading: "1929",
    lines: [
      "The Havemeyers first see it in 1901.",
      "Louisine Havemeyer buys it in 1909.",
      "Her will leaves it to the Met.",
      "It has hung in New York ever since.",
    ],
  },
  sources: [
    {
      label: "The Met: View of Toledo (29.100.6)",
      url: "https://www.metmuseum.org/art/collection/search/436575",
    },
    {
      label: "The Met Bulletin: El Greco (Summer 1981)",
      url: "https://resources.metmuseum.org/resources/metpublications/pdf/El_Greco_The_Metropolitan_Museum_of_Art_Bulletin_v_39_no_1_Summer_1981.pdf",
    },
    {
      label: "Kunsthistorisches Museum: El Greco exhibition, View of Toledo",
      url: "https://khm.at/Archiv/Ausstellungen/elgreco/Ausstellung/blick_aE.html",
    },
    {
      label: "Wikipedia: View of Toledo",
      url: "https://en.wikipedia.org/wiki/View_of_Toledo",
    },
    {
      label: "Wikipedia: View and Plan of Toledo",
      url: "https://en.wikipedia.org/wiki/View_and_Plan_of_Toledo",
    },
  ],
  showSources: true,
};
