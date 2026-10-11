import type { Story } from "../types";

/**
 * Edvard Munch, The Scream (Skrik), 1893.
 * National Museum, Oslo (NG.M.00939). 91 x 73.5 cm, on cardboard.
 * This is the 1893 painted version, the one with the pencil inscription and
 * the one stolen in 1994. Not the 1910 version stolen from the Munch Museum
 * in 2004, which the close mentions separately.
 * Every line here maps to an entry in docs/sources/edvard-munch.md.
 * Focus points are first-pass estimates from the known composition, not
 * measured; tune them against the cleared image.
 */
export const edvardMunch: Story = {
  slug: "edvard-munch",
  title: "The Scream",
  year: "1893",
  image: {
    src: "/art/edvard-munch.jpg",
    status: "pending",
    width: 1292,
    height: 1600,
  },
  cover: { kicker: "The Scream" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "1893. One figure. Hands to its head.",
        "Munch made The Scream four times.",
        "This is the one in Oslo's National Museum.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 45, y: 62, scale: 2.6 },
      lines: [
        "Mouth open.",
        "But in Munch's diary, it isn't the man who screams.",
        "The scream passes through nature.",
      ],
      caption: "The figure",
    },
    {
      kind: "beat",
      focus: { x: 24, y: 32, scale: 2.4 },
      lines: [
        "Behind him, two men on the road.",
        "The diary again: his friends walked on.",
        "He stood there, shaking.",
      ],
      caption: "The two walkers",
    },
    {
      kind: "beat",
      focus: { x: 12, y: 8, scale: 3.2 },
      lines: [
        "Top left, in the red sky.",
        "One line of pencil. Barely visible.",
        "For decades, put down to a visitor or a critic.",
      ],
      twist: "In 2021 the museum matched the handwriting. Munch's own.",
      caption: "Pencil inscription, top left",
    },
  ],
  reveal: { lines: ["The whole scream.", "Sky, fjord, road."] },
  quote: {
    text: "Can only have been painted by a madman!",
    attribution:
      "Pencil inscription on the 1893 painting, in Munch's hand: “Kan kun være malet af en gal Mand!”",
  },
  close: {
    heading: "12 February 1994",
    lines: [
      "The Winter Olympics open at Lillehammer.",
      "Thieves take this Scream from the National Gallery.",
      "They leave a note mocking the security.",
      "It comes back on 7 May. Undamaged.",
      "In 2004, gunmen take another Scream from the Munch Museum.",
      "That one is gone for two years.",
    ],
  },
  sources: [
    {
      label: "Nasjonalmuseet — The Scream, sketch on the reverse (NG.M.00939)",
      url: "https://www.nasjonalmuseet.no/en/collection/object/NG.M.00939VERSO",
    },
    {
      label: "The Art Newspaper — 'Madman' graffiti on The Scream (2021)",
      url: "https://theartnewspaper.com/news/madman-graffiti-scribbled-on-the-scream",
    },
    {
      label: "Hyperallergic — Munch's hidden 'madman' message (2021)",
      url: "https://hyperallergic.com/edvard-munch-the-scream-madman-message",
    },
    {
      label: "History.com — The Scream recovered (7 May 1994)",
      url: "https://www.history.com/this-day-in-history/the-scream-recovered",
    },
    {
      label: "Moderna Museet — 'I felt the great scream through nature'",
      url: "https://www.modernamuseet.se/en/stockholm/exhibitions/munch-by-himself/i-felt-the-great-scream-through-nature/",
    },
    {
      label: "Wikipedia — The Scream",
      url: "https://en.wikipedia.org/wiki/The_Scream",
    },
  ],
  showSources: true,
};
