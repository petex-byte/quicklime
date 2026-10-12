import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { LensHero, type Slide } from "@/components/home/LensHero";
import { DetailZoom } from "@/components/home/DetailZoom";
import { StoryWall } from "@/components/home/StoryWall";
import { ArtistIndex } from "@/components/home/ArtistIndex";
import { stories, getStory } from "@/content/stories";
import { artists, getArtist, lifespan } from "@/content/artists";

/** Hero order: strongest pictures first. Anything without a cleared image is skipped. */
const HERO = [
  "katsushika-hokusai",
  "vincent-van-gogh",
  "gustav-klimt",
  "claude-monet",
  "johannes-vermeer",
  "rembrandt",
  "jmw-turner",
  "edvard-munch",
];

export default function Home() {
  const slides: Slide[] = HERO.flatMap((slug) => {
    const s = getStory(slug);
    const a = getArtist(slug);
    if (!s || !a || s.image.status !== "cleared") return [];
    return [
      {
        slug,
        title: s.title,
        artist: a.name,
        year: s.year,
        shown: s.image.standIn ?? s.cover.kicker,
        standIn: Boolean(s.image.standIn),
        image: s.image,
      },
    ];
  });

  const wave = getStory("katsushika-hokusai")!;
  const fuji = wave.beats.find((b) => b.twist)!;

  const cards = artists.flatMap((a) => {
    const s = stories[a.slug];
    if (!s) return [];
    return [{ slug: a.slug, title: s.title, artist: a.name, year: s.year, line: s.beats[0].lines.join(" "), image: s.image }];
  });

  const rows = [...artists]
    .sort((a, b) => a.born - b.born)
    .map((a) => ({
      slug: a.slug,
      name: a.name,
      dates: lifespan(a),
      movement: a.movement,
      live: Boolean(stories[a.slug]),
      image: stories[a.slug]?.image ?? a.image,
    }));
  const first = Math.min(...artists.map((a) => a.born));
  const last = Math.max(...artists.map((a) => a.died));
  const span = `${Math.round((last - first) / 10) * 10} years of painting, ${first}–${last}`;

  return (
    <>
      <SiteNav />
      <main>
        <LensHero slides={slides} />

        <section className="px-5 py-24 md:px-12 md:py-32">
          <p className="max-w-[22ch] font-display text-[clamp(1.9rem,7vw,4rem)] font-light leading-[1.05] text-paper text-balance">
            One painting. One story. Told a detail at a time, until the detail turns out to be the story.
          </p>
        </section>

        <DetailZoom
          slug={wave.slug}
          image={wave.image}
          alt={wave.cover.kicker}
          focus={fuji.focus}
          lines={["Start with one detail.", "Then step back."]}
          twist={fuji.twist!}
          cta={`Read ${wave.title}`}
        />

        <StoryWall cards={cards} />

        <ArtistIndex rows={rows} span={span} />

        <section className="px-5 pb-24 md:px-12">
          <Link
            href="/artists"
            className="group flex items-center justify-between gap-6 rounded-3xl bg-lime px-6 py-10 text-ink md:px-12 md:py-16"
          >
            <span className="font-display text-[clamp(2.2rem,8vw,5.5rem)] leading-none">Enter the directory</span>
            <span aria-hidden className="text-4xl transition-transform group-hover:translate-x-2 md:text-6xl">
              →
            </span>
          </Link>
        </section>
      </main>

      <footer className="flex flex-col gap-2 border-t border-paper/10 px-5 py-10 text-sm text-paper/50 md:flex-row md:justify-between md:px-12">
        <span>quicklime.co.za</span>
        <span>Public-domain paintings, told one detail at a time.</span>
      </footer>
    </>
  );
}
