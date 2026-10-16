import type { Story } from "../types";

/**
 * Édouard Manet, Boating (1874), The Metropolitan Museum of Art, New York
 * (29.100.115, Met object 436947).
 * Every line here maps to an entry in docs/sources/edouard-manet.md.
 * Focus points were checked against the Met image
 * (public/art/w800/edouard-manet.jpg); width/height follow its 800x604 ratio.
 */
export const edouardManet: Story = {
  slug: "edouard-manet",
  title: "Boating",
  year: "1874",
  image: {
    src: "/art/edouard-manet.jpg",
    status: "pending",
    width: 1600,
    height: 1208,
  },
  cover: { kicker: "Boating" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Summer 1874. The Seine.",
        "Manet is staying at Gennevilliers.",
        "Across the river, at Argenteuil: Monet. Renoir.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 25, y: 14, scale: 2 },
      lines: ["No horizon.", "No shore. No sky.", "Water, right up to the top edge."],
      caption: "The water",
    },
    {
      kind: "beat",
      focus: { x: 92, y: 18, scale: 2.6 },
      lines: [
        "Top right: a sliver of sail.",
        "The boom runs out of the frame.",
        "Cropped, the way Japanese prints crop.",
      ],
      caption: "Sail and boom",
    },
    {
      kind: "beat",
      focus: { x: 49, y: 22, scale: 2.6 },
      lines: [
        "The man in the straw hat is family.",
        "Rodolphe Leenhoff.",
        "Manet's brother-in-law. Probably.",
      ],
      caption: "The man in the straw hat",
    },
    {
      kind: "beat",
      focus: { x: 24, y: 52, scale: 2.8 },
      lines: ["Beside him, a woman in a veil.", "Blue and white stripes."],
      twist: "Nobody knows who she is.",
      caption: "The woman in the veil",
    },
  ],
  reveal: { lines: ["The whole canvas.", "Still no horizon."] },
  quote: {
    text: "the last word in painting",
    attribution:
      "Mary Cassatt, on seeing it at the Salon of 1879, as recalled by Louisine Havemeyer in Sixteen to Sixty",
  },
  close: {
    heading: "1879",
    lines: [
      "The Salon of 1879. Critics call it rough.",
      "Too sketchy.",
      "Cassatt disagrees.",
      "1895: she tells the Havemeyers to buy it.",
      "1929: Louisine Havemeyer leaves it to the Met.",
    ],
  },
  sources: [
    {
      label: "The Met: Boating (collection record)",
      url: "https://www.metmuseum.org/art/collection/search/436947",
    },
    {
      label: "Getty Center: Boating, 1874 (audio stop)",
      url: "https://www.getty.edu/art/mobile/center/manet/stop.php?id=243293",
    },
    {
      label: "Wikipedia: Boating (Manet)",
      url: "https://en.wikipedia.org/wiki/Boating_(Manet)",
    },
    {
      label: "Britannica: Édouard Manet",
      url: "https://www.britannica.com/EBchecked/topic/361791/Edouard-Manet",
    },
  ],
  showSources: true,
};
