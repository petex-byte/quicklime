import type { Story } from "../types";

/**
 * Amedeo Modigliani, Reclining Nude, 1917.
 * The Metropolitan Museum of Art, New York (object 486847, 1997.149.9).
 * Oil on canvas, 60.6 x 92.7 cm. The Mr. and Mrs. Klaus G. Perls
 * Collection, 1997. Provenance begins with Léopold Zborowski.
 * No source found puts THIS canvas in the December 1917 Berthe Weill show,
 * so the copy ties the show to Zborowski and the year, not to this painting.
 * Every line here maps to an entry in docs/sources/amedeo-modigliani.md.
 * Focus points were checked against the Met image
 * (public/art/w800/amedeo-modigliani.jpg, 800 x 536), not guessed from the
 * composition. Width/height follow that file's aspect ratio.
 */
export const amedeoModigliani: Story = {
  slug: "amedeo-modigliani",
  title: "Reclining Nude",
  year: "1917",
  image: {
    src: "/art/amedeo-modigliani.jpg",
    status: "pending",
    width: 1600,
    height: 1072,
  },
  cover: { kicker: "Reclining Nude" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. 1917.",
        "One woman. Arms behind her head.",
        "Red cloth. White pillow. Nothing else.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 12, y: 34, scale: 2.6 },
      lines: [
        "The face is a few lines.",
        "Long nose. Small red mouth.",
        "Cheeks flushed pink.",
      ],
      caption: "The face",
    },
    {
      kind: "beat",
      focus: { x: 90, y: 70, scale: 2.2 },
      lines: [
        "Her legs run off the right edge.",
        "Her elbow runs off the top left.",
        "The canvas can't hold her.",
      ],
      caption: "Legs at the right edge",
    },
    {
      kind: "beat",
      focus: { x: 94, y: 5, scale: 3.2 },
      lines: [
        "Top right, his name.",
        "Its first owner: his dealer, Léopold Zborowski.",
        "He paid the models for Modigliani's nudes.",
      ],
      twist: "He also set up Modigliani's only solo show.",
      caption: "Signature, upper right",
    },
  ],
  reveal: { lines: ["The whole nude.", "Edge to edge."] },
  quote: {
    text: "Your real duty is to save your dream.",
    attribution:
      "Amedeo Modigliani, letter to the painter Oscar Ghiglia, 1901 (English translation)",
  },
  close: {
    heading: "3 December 1917",
    lines: [
      "Galerie Berthe Weill, Paris. Opening day.",
      "Nudes in the window draw a crowd.",
      "A police commissioner calls them indecent.",
      "The objection, as reported: body hair.",
      "The nudes come out of the window.",
      "Modigliani dies in 1920. He is 35.",
    ],
  },
  sources: [
    {
      label: "The Met: Reclining Nude (486847)",
      url: "https://www.metmuseum.org/art/collection/search/486847",
    },
    {
      label: "Britannica: Nude (1917)",
      url: "https://www.britannica.com/art/Nude-1917",
    },
    {
      label: "Tate Papers: Modigliani's painted nudes: a technical study",
      url: "https://www.tate.org.uk/research/tate-papers/35/modiglianis-painted-nudes-technical-study",
    },
    {
      label: "Brooklyn Rail: Make Way for Berthe Weill (2025)",
      url: "https://brooklynrail.org/2025/02/artseen/make-way-for-berthe-weill",
    },
    {
      label: "Allen Memorial Art Museum: Nude with Coral Necklace",
      url: "https://allenartcollection.oberlin.edu/objects/12464",
    },
    {
      label: "Christie's: lot essay quoting the 1901 letter to Ghiglia",
      url: "https://www.christies.com.cn/lot/lot-5893247",
    },
  ],
  showSources: true,
};
