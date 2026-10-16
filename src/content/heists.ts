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
  /** The full file, shown on /heists/<id>. */
  file: HeistFile;
};

/**
 * The breakdown page. Every line carries `src`: 1-based numbers into the
 * heist's `sources`. Each line is logged in docs/sources/heists.md.
 */
export type HeistFile = {
  standfirst: string;
  /** Caption under the picture. */
  pictureCaption: string;
  /** Show the painting on the page even when it is still missing. */
  showPainting: boolean;
  facts: { k: string; v: string }[];
  timeline: { when: string; text: string; src: number[] }[];
  after: { text: string; src: number[] }[];
  /** Where the sources disagree, or what was left out and why. */
  caveats: string[];
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
    twist: "He gets caught trying to sell her to the Uffizi. He serves less than a year.",
    status: "Back at the Louvre since 4 January 1914",
    sources: [
      { label: "Wikipedia, Mona Lisa", url: "https://en.wikipedia.org/wiki/Mona_Lisa" },
      { label: "Wikipedia, Vincenzo Peruggia", url: "https://en.wikipedia.org/wiki/Vincenzo_Peruggia" },
    ],
    file: {
      standfirst: "A closed Monday. A man in a white smock. One painting gone.",
      pictureCaption: "The Mona Lisa, Leonardo da Vinci. Recovered in 1913.",
      showPainting: true,
      facts: [
        { k: "When", v: "Monday, 21 August 1911" },
        { k: "Where", v: "The Salon Carré, the Louvre, Paris" },
        { k: "Taken", v: "One painting: the Mona Lisa" },
        { k: "The thief", v: "Vincenzo Peruggia, an Italian decorator who had worked at the Louvre" },
        { k: "Outcome", v: "Recovered. Back at the Louvre on 4 January 1914" },
      ],
      timeline: [
        { when: "About 7 am", text: "By his own later account, Peruggia walks in through the door the workers use. He wears a white smock like theirs.", src: [2] },
        { when: "The same morning", text: "It is the weekly closing day, and the Louvre is nearly empty. When the Salon Carré is clear, he lifts the painting off its four iron pegs and carries it to a service stairway. He strips off the case and the frame there.", src: [2] },
        { when: "The exit", text: "A plumber thinks he is an employee and unlocks a service door for him. Peruggia walks out and hides the painting in his Paris apartment.", src: [2] },
        { when: "22 August", text: "A painter who came to copy the Mona Lisa finds the wall empty. The Louvre closes for a week.", src: [1, 2] },
        { when: "The suspects", text: "Police arrest the poet Guillaume Apollinaire, who names his friend Pablo Picasso. Picasso is questioned. Both are later cleared.", src: [1] },
        { when: "Two years", text: "Peruggia keeps the painting in his apartment for two years, then takes it to Italy by train.", src: [1, 2] },
        { when: "December 1913", text: "He contacts a Florence gallery owner, Alfredo Geri, signing as Leonardo V. Geri calls in Giovanni Poggi, director of the Uffizi, who authenticates the painting. Police arrest Peruggia at his hotel.", src: [2] },
        { when: "4 January 1914", text: "After more than two weeks in the Uffizi and a tour of Italy, the Mona Lisa goes back to the Louvre.", src: [1, 2] },
      ],
      after: [
        { text: "Peruggia said he did it for Italy. He told police the painting had been taken from Italy by Napoleon. The court gave him a lenient sentence, and Italy hailed him as a patriot.", src: [2] },
        { text: "Experts doubt that. A patriot would have given the painting to a museum, not tried to sell it. Four months after the theft he wrote to his father that Paris was where he would make his fortune.", src: [2] },
        { text: "Wikipedia says the headlines and the police hunt helped make the painting one of the best known in the world.", src: [2] },
      ],
      caveats: [
        "Sources differ on his sentence. One page says six months in prison, the other says one year and 15 days, cut to seven months on appeal. We say only that he served less than a year.",
        "Some tellings say he hid the painting under his smock. Wikipedia points out he was 160 cm tall and the panel is about 53 by 77 cm, so we leave that out.",
        "In 1932 a journalist, Karl Decker, published a story of a mastermind and six forged copies. It is one man's account. We leave it out.",
        "We left out the detective who is said to have written his report leaning on the table that hid the painting, and the thumbprint the police are said to have missed. Both rest on one page.",
      ],
    },
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
    sources: [
      { label: "Wikipedia, The Just Judges", url: "https://en.wikipedia.org/wiki/The_Just_Judges" },
      { label: "The Art Newspaper, 1995", url: "https://www.theartnewspaper.com/1995/09/01/seeking-out-van-eycks-the-just-judges-altarpiece" },
    ],
    file: {
      standfirst: "One panel leaves a cathedral in the night. A note says it was taken from Germany.",
      pictureCaption: "No picture of the panel is on this site, so you see the frame. A copy hangs in the Ghent Altarpiece today.",
      showPainting: false,
      facts: [
        { k: "When", v: "The night of 10 April 1934" },
        { k: "Where", v: "Saint Bavo Cathedral, Ghent, Belgium" },
        { k: "Taken", v: "The Just Judges, the lower left panel of the Ghent Altarpiece by the van Eycks, with the painting on its back" },
        { k: "The thief", v: "Arsène Goedertier, a church sexton and stockbroker, according to the police. He died before he could be tried" },
        { k: "Outcome", v: "Never found. A copy has hung in its place since 1945" },
      ],
      timeline: [
        { when: "10 April 1934", text: "In the night, the panel is lifted out of its frame. Wikipedia says it was done apparently with care, and the other panels are not damaged.", src: [1, 2] },
        { when: "The note", text: "The thief leaves a note in French: \u201cTaken from Germany by the Treaty of Versailles.\u201d The altarpiece had been taken to Berlin in the First World War and came back under that treaty.", src: [1] },
        { when: "30 April", text: "The Bishop of Ghent receives a ransom demand for one million Belgian francs. The Belgian minister will not agree to pay.", src: [1, 2] },
        { when: "May to October", text: "The letters continue. At least eleven pass between the thief and the government, which argues the panel belongs to the nation, not the diocese. To prove he has it, the thief sends a ticket for a package left at a Brussels railway station. Inside is the painting from the back of the panel.", src: [1, 2] },
        { when: "25 November 1934", text: "Goedertier, dying, tells his lawyer: \u201cI alone know where the Mystic Lamb is.\u201d He says he will take the secret to his grave. The lawyer finds carbon copies of the ransom notes in his desk.", src: [1, 2] },
        { when: "A month later", text: "The lawyer tells the police. They conclude Goedertier was the thief.", src: [1, 2] },
        { when: "1945", text: "The panel is replaced with a copy by the restorer Jef Van der Veken. He gives one of the horsemen the face of King Leopold III, so the copy can be told apart.", src: [1] },
      ],
      after: [
        { text: "The Just Judges has never been recovered. Wikipedia says it is now believed destroyed. A 1995 report in The Art Newspaper says police experts thought it was still hidden in the cathedral. Nobody knows.", src: [1, 2] },
        { text: "Wikipedia says that to this day a Ghent police detective remains assigned to the case.", src: [1] },
      ],
      caveats: [
        "Wikipedia says Goedertier was possibly the thief. The police concluded he was. He never stood trial. We say only what he told his lawyer.",
        "Sources differ on the number of ransom letters: at least eleven on Wikipedia, thirteen in The Art Newspaper. We say at least eleven.",
        "Sources differ on which saint is on the back of the panel. We do not name him.",
        "We left out the story that the police chief left the scene to investigate a theft at a cheese shop. It rests on one page.",
      ],
    },
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
      { label: "Gardner Museum, the five frames", url: "https://www.gardnermuseum.org/blog/five-frames-left-behind" },
      {
        label: "Gardner Museum, $10 million reward",
        url: "https://www.gardnermuseum.org/isabella-stewart-gardner-museums-board-trustees-extends-10-million-reward-return-13-works-stolen",
      },
      { label: "Wikipedia, Isabella Stewart Gardner Museum theft", url: "https://en.wikipedia.org/wiki/Isabella_Stewart_Gardner_Museum_theft" },
    ],
    file: {
      standfirst: "Eighty-one minutes. Thirteen works. Five empty frames still on the wall.",
      pictureCaption: "Rembrandt's Christ in the Storm on the Sea of Galilee, 1633. One of the thirteen. Still missing.",
      showPainting: true,
      facts: [
        { k: "When", v: "Early on Sunday, 18 March 1990" },
        { k: "Where", v: "The Isabella Stewart Gardner Museum, Boston" },
        { k: "Taken", v: "Thirteen works: three Rembrandts, a Vermeer, a Manet, five Degas works, a Flinck, a Chinese beaker and a bronze eagle" },
        { k: "The thieves", v: "Two men dressed as police officers. Never identified" },
        { k: "Outcome", v: "Unsolved. Nothing has been recovered" },
      ],
      timeline: [
        { when: "Early hours, 18 March", text: "Two men in police uniforms ring the museum intercom. They say they are responding to a disturbance.", src: [1] },
        { when: "The door", text: "The guard on duty breaks protocol and lets them in through the employee entrance. At their direction he steps away from the security desk.", src: [1] },
        { when: "The basement", text: "The thieves handcuff him and a second guard and tie them up in the basement.", src: [1, 2] },
        { when: "The Dutch Room", text: "They cut Rembrandt's Christ in the Storm and A Lady and Gentleman in Black from their frames. They take Vermeer's The Concert and Flinck's Landscape with an Obelisk out of their frames. They also take a Chinese bronze beaker and a small Rembrandt self-portrait etching.", src: [1] },
        { when: "The Short Gallery", text: "They take five Degas works and a bronze eagle that topped a flag. From the Blue Room downstairs they take Manet's Chez Tortoni.", src: [1, 4] },
        { when: "2:45 am", text: "The thieves leave, making two trips to their car. Eighty-one minutes after they came in.", src: [1, 2] },
        { when: "8:15 am", text: "Police arrive. The two guards are still handcuffed.", src: [1] },
      ],
      after: [
        { text: "Five of the works were paintings taken from their frames. The museum repaired the five frames and hung them back on the walls as placeholders.", src: [2] },
        { text: "The museum offers a $10 million reward. Wikipedia calls it the largest bounty ever offered by a private institution.", src: [3, 4] },
        { text: "The museum calls the investigation active and ongoing, and offers a further $100,000 for the eagle.", src: [1] },
        { text: "Wikipedia says the FBI valued the theft at $200 million in 1990 and $500 million by 2000.", src: [4] },
      ],
      caveats: [
        "The thieves have never been identified. We do not repeat theories about who they were.",
        "The reward figure comes from the museum's 2018 announcement and Wikipedia. Check the museum's page before quoting it.",
      ],
    },
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
      "The ransom demand is one million dollars. It is refused.",
    ],
    twist: "They leave a note thanking the gallery for its poor security.",
    status: "Recovered undamaged, 7 May 1994",
    sources: [
      { label: "Wikipedia, The Scream", url: "https://en.wikipedia.org/wiki/The_Scream" },
      { label: "History.com, The Scream recovered", url: "https://history.com/this-day-in-history/the-scream-recovered" },
    ],
    file: {
      standfirst: "About fifty seconds, a window and a wire. The opening day of the Winter Olympics.",
      pictureCaption: "The Scream, Edvard Munch. The National Gallery's version, recovered 7 May 1994.",
      showPainting: true,
      facts: [
        { k: "When", v: "12 February 1994, the opening day of the Winter Olympics at Lillehammer" },
        { k: "Where", v: "The National Gallery, Oslo" },
        { k: "Taken", v: "The Scream, the National Gallery's version" },
        { k: "The thieves", v: "Two men broke in. Four men were convicted in 1996, then freed on appeal" },
        { k: "Outcome", v: "Recovered undamaged on 7 May 1994" },
      ],
      timeline: [
        { when: "12 February 1994", text: "Norway opens the Winter Olympics. The painting has been moved down to a second-floor gallery as part of the festivities.", src: [1] },
        { when: "The break-in", text: "Two thieves break through a window, cut the wire that holds the painting to the wall and leave. History.com puts it at about 50 seconds.", src: [1, 2] },
        { when: "The note", text: "They leave a note thanking the gallery for its poor security. The two sources give different English wording. See the note below.", src: [1, 2] },
        { when: "3 March", text: "A ransom demand arrives for one million dollars. It is refused. The sources say the gallery refused, or the government.", src: [1, 2] },
        { when: "The search", text: "Police find four pieces of the painting's frame in Nittedal, north of Oslo. Norwegian police then run a sting with British police and the Getty Museum.", src: [1, 2] },
        { when: "7 May 1994", text: "The painting is found undamaged at a hotel in Åsgårdstrand, about 40 miles south of Oslo.", src: [1, 2] },
        { when: "January 1996", text: "Four men are convicted, among them Pål Enger, who had been convicted in 1988 of stealing another Munch. They are freed on appeal because the British agents in the sting had entered Norway under false identities.", src: [1, 2] },
      ],
      after: [
        { text: "It happened again. In August 2004 masked gunmen took another version of The Scream, and The Madonna, from the Munch Museum in Oslo. Both were recovered in 2006.", src: [1] },
      ],
      caveats: [
        "The note. Wikipedia quotes it as \u201cThanks for the poor security.\u201d History.com quotes it as \u201cThousand thanks for the bad security!\u201d We have not found the original Norwegian wording, so the card paraphrases it.",
        "Who refused the ransom. Wikipedia says the gallery. History.com says the government. We say only that it was refused.",
        "We left out how the thieves got in beyond the window and the wire. No page we checked gives a reliable account.",
      ],
    },
  },
];
