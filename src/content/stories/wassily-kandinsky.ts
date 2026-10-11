import type { Story } from "../types";

/**
 * Wassily Kandinsky, Composition 8 (Komposition 8), July 1923.
 * Solomon R. Guggenheim Museum, New York (37.262). Oil on canvas, 140 x 201 cm.
 * Every line here maps to an entry in docs/sources/wassily-kandinsky.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const wassilyKandinsky: Story = {
  slug: "wassily-kandinsky",
  title: "Composition VIII",
  year: "1923",
  image: {
    src: "/art/wassily-kandinsky.jpg",
    status: "pending",
    width: 1600,
    height: 1114,
  },
  cover: { kicker: "Composition VIII" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Weimar. July 1923.",
        "Kandinsky is teaching at the Bauhaus.",
        "He calls only ten paintings Compositions.",
        "This is the eighth.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 18, y: 22, scale: 2.4 },
      lines: [
        "Top left. One black circle.",
        "Ringed in pink.",
        "Every smaller circle answers to it.",
      ],
      caption: "The black circle",
    },
    {
      kind: "beat",
      focus: { x: 72, y: 45, scale: 2.2 },
      lines: [
        "On the right, the opposite.",
        "Straight lines. Sharp angles.",
        "Circle against edge.",
      ],
      caption: "Lines and triangles, right side",
    },
    {
      kind: "beat",
      focus: { x: 18, y: 22, scale: 3 },
      lines: [
        "Kandinsky called it the high point",
        "of everything he'd painted since the war.",
      ],
      twist: "And this circle is where his circles start.",
      caption: "The black circle, closer",
    },
  ],
  reveal: { lines: ["The whole composition.", "Circle, line, angle."] },
  quote: {
    text: "The circle is the synthesis of the greatest oppositions.",
    attribution:
      "Kandinsky, letter to Will Grohmann, 1930 (English translation)",
  },
  close: {
    heading: "Three of ten",
    lines: [
      "Kandinsky painted ten Compositions.",
      "The first three were destroyed in the Second World War.",
      "Photographs are all that's left.",
      "In 1937 the Nazis seized 57 of his works.",
      "Composition VIII was already Solomon Guggenheim's.",
      "Bought straight from Kandinsky's studio in Dessau.",
    ],
  },
  sources: [
    {
      label: "Guggenheim Bilbao — Composition 8, teachers' guide",
      url: "https://guggenheim-bilbao.eus/en/learn/schools/teachers-guides/composition-8",
    },
    {
      label: "Britannica — Composition VIII",
      url: "https://britannica.com/topic/Composition-VIII",
    },
    {
      label: "MoMA — Kandinsky: Compositions (1995)",
      url: "https://www.moma.org/calendar/exhibitions/448",
    },
    {
      label: "The Art Newspaper — Kandinsky's Compositions at MoMA",
      url: "https://www.theartnewspaper.com/archive/kandinsky-s-compositions-a-connoisseur-s-show",
    },
    {
      label: "Peggy Guggenheim Collection — Vasily Kandinsky",
      url: "https://www.guggenheim-venice.it/en/art/artists/vasily-kandinsky/",
    },
  ],
  showSources: true,
};
