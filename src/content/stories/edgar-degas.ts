import type { Story } from "../types";

/**
 * Edgar Degas, The Dance Class (La Classe de danse), 1873–76.
 * Musée d'Orsay, Paris, 85.5 x 75 cm. Bequest of Count Isaac de Camondo, 1911.
 *
 * DRAFT, NOT LAUNCH-READY: the research pass ran out of searches before this
 * story had a two-source hook or a verified quote. See
 * docs/sources/edgar-degas.md for the open rows.
 *
 * Every line here maps to an entry in docs/sources/edgar-degas.md.
 * Focus points are first-pass estimates from the known composition;
 * tune them against the cleared image.
 */
export const edgarDegas: Story = {
  slug: "edgar-degas",
  title: "The Dance Class",
  year: "1873–76",
  image: {
    src: "/art/edgar-degas.jpg",
    status: "pending",
    // 85.5 x 75 cm, portrait.
    width: 1404,
    height: 1600,
  },
  cover: { kicker: "La Classe de danse, Musée d'Orsay" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Paris. The Opéra.",
        "The lesson is over.",
        "The dancers rest.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 56, y: 48, scale: 2.4 },
      lines: [
        "The man with the stick is Jules Perrot.",
        "The ballet master.",
        "He stands near the middle of the room.",
      ],
      twist: "And almost nobody is watching him.",
      caption: "Jules Perrot",
    },
    {
      kind: "beat",
      focus: { x: 78, y: 40, scale: 2.2 },
      lines: [
        "Behind him, the class waits it out.",
        "Nobody holds a pose for him now.",
      ],
      caption: "Dancers at the back of the room",
    },
    {
      kind: "beat",
      focus: { x: 30, y: 70, scale: 2 },
      lines: [
        "Degas came back to this subject.",
        "The Met holds another Dance Class.",
        "Dated 1874.",
      ],
      caption: "Foreground dancers",
    },
  ],
  reveal: { lines: ["The whole class.", "Uncropped."] },
  quote: {
    text: "No art was ever less spontaneous than mine.",
    attribution: "Edgar Degas, as recorded by George Moore (1890s)",
  },
  close: {
    heading: "1911",
    lines: [
      "Count Isaac de Camondo dies.",
      "He leaves it to the French state.",
      "Today it hangs in the Musée d'Orsay.",
    ],
  },
  sources: [
    {
      label: "Musée d'Orsay — La Classe de danse, collection record",
      url: "https://www.musee-orsay.fr/it/opere/la-classe-de-danse-1151",
    },
    {
      label: "The Met — The Dance Class (1874)",
      url: "https://www.metmuseum.org/toah/works-of-art/1987.47.1",
    },
    {
      label: "Wikipedia — The Ballet Class (Degas, Musée d'Orsay)",
      url: "https://en.wikipedia.org/wiki/The_Ballet_Class_(Degas,_Mus%C3%A9e_d%27Orsay)",
    },
  ],
  showSources: true,
};
