/**
 * The heist file on the homepage. Every line is checked against the sources
 * listed per heist (docs/sources/heists.md). Painting slugs link to stories.
 */
export type Heist = {
  id: string;
  place: string;
  date: string;
  title: string;
  /** Story slug for the painter, when the site has one. */
  slug?: string;
  /** Link text when the story is a different painting by the same painter. */
  linkLabel?: string;
  /** object-position for the recovered painting crop. */
  focus?: string;
  /** Show the painting (recovered) or an empty frame (still missing). */
  recovered: boolean;
  lines: string[];
  twist: string;
  status: string;
  sources: { label: string; url: string }[];
};

export const heists: Heist[] = [
  {
    id: "mona-lisa",
    place: "Paris",
    date: "21 August 1911",
    title: "The Mona Lisa",
    slug: "leonardo-da-vinci",
    linkLabel: "Read the Leonardo story",
    recovered: true,
    lines: [
      "Vincenzo Peruggia works at the Louvre. He helped build her glass case.",
      "The museum is shut for the day. He locks himself in and leaves with her.",
      "Police jail the poet Apollinaire. They question Picasso.",
      "She spends two years in Peruggia's flat.",
    ],
    twist: "He gets caught trying to sell her to the Uffizi. Sentence: six months.",
    status: "Back at the Louvre since 4 January 1914",
    sources: [{ label: "Wikipedia, Mona Lisa", url: "https://en.wikipedia.org/wiki/Mona_Lisa" }],
  },
  {
    id: "just-judges",
    place: "Ghent",
    date: "10 April 1934",
    title: "The Just Judges",
    slug: "jan-van-eyck",
    linkLabel: "Another van Eyck: The Arnolfini Portrait",
    recovered: false,
    lines: [
      "At night, one panel leaves the van Eycks' Ghent Altarpiece.",
      "Ransom letters follow. At least eleven. One million Belgian francs.",
      "The government says no.",
      "November 1934. Arsène Goedertier, dying, tells his lawyer he alone knows where it is.",
    ],
    twist: "He says he'll take the secret to his grave. He does.",
    status: "Still missing. A copy has hung in its place since 1945",
    sources: [{ label: "Wikipedia, The Just Judges", url: "https://en.wikipedia.org/wiki/The_Just_Judges" }],
  },
  {
    id: "gardner",
    place: "Boston",
    date: "18 March 1990",
    title: "Thirteen works, one night",
    slug: "rembrandt",
    recovered: false,
    lines: [
      "Two men in police uniforms ring the Gardner Museum's intercom.",
      "Thirteen works leave with them. Rembrandt's only seascape is one.",
      "The museum repaired the frames and hung them back up. Empty.",
    ],
    twist: "The reward is ten million dollars. Nobody has collected it.",
    status: "Still missing",
    sources: [
      { label: "Gardner Museum, the theft", url: "https://www.gardnermuseum.org/about/theft" },
      {
        label: "Gardner Museum, $10 million reward",
        url: "https://www.gardnermuseum.org/isabella-stewart-gardner-museums-board-trustees-extends-10-million-reward-return-13-works-stolen",
      },
      { label: "Gardner Museum, the five frames", url: "https://www.gardnermuseum.org/blog/five-frames-left-behind" },
    ],
  },
  {
    id: "scream",
    place: "Oslo",
    date: "12 February 1994",
    title: "The Scream",
    slug: "edvard-munch",
    focus: "50% 75%",
    recovered: true,
    lines: [
      "Norway opens the Winter Olympics at Lillehammer.",
      "Two men break into the National Gallery and take The Scream.",
      "The ransom demand: one million dollars. The gallery refuses.",
    ],
    twist: "They leave a note: “Thanks for the poor security.”",
    status: "Recovered undamaged, 7 May 1994",
    sources: [{ label: "Wikipedia, The Scream", url: "https://en.wikipedia.org/wiki/The_Scream" }],
  },
];
