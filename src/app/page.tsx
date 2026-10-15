import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { LensHero, type Slide } from "@/components/home/LensHero";
import { DetailZoom } from "@/components/home/DetailZoom";
import { StoryWall } from "@/components/home/StoryWall";
import { ArtistIndex } from "@/components/home/ArtistIndex";
import { stories, getStory } from "@/content/stories";
import { artists, getArtist, lifespan } from "@/content/artists";

/**
 * Hero order: strongest pictures first. Only stories whose own painting is
 * on screen qualify, so no preview stand-in ever fronts the site.
 */
const HERO = [
  "katsushika-hokusai",
  "vincent-van-gogh",
  "johannes-vermeer",
  "gustav-klimt",
  "rembrandt",
  "sandro-botticelli",
  "pieter-bruegel",
  "jmw-turner",
  "winslow-homer",
  "leonardo-da-vinci",
  "edvard-munch",
  "el-greco",
];

export default function Home() {
  const slides: Slide[] = HERO.flatMap((slug) => {
    const s = getStory(slug);
    const a = getArtist(slug);
    if (!s || !a || s.image.status !== "cleared" || s.image.standIn) return [];
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

  // Real paintings first; preview stand-ins after, labelled on the card.
  const cards = artists
    .flatMap((a) => {
      const s = stories[a.slug];
      if (!s) return [];
      return [
        {
          slug: a.slug,
          title: s.title,
          artist: a.name,
          year: s.year,
          line: s.beats.find((b) => b.twist)?.twist ?? s.beats[0].lines.join(" "),
          image: s.image,
          standIn: Boolean(s.image.standIn),
        },
      ];
    })
    .sort((x, y) => Number(x.standIn) - Number(y.standIn));

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
  const span = `${first}–${last}`;
  const oldest = rows[0].name;
  const newest = rows[rows.length - 1].name;

  return (
    <>
      <SiteNav />
      <main>
        <LensHero slides={slides} />

        <section className="px-5 py-24 md:px-12 md:py-32">
          <p className="max-w-[22ch] font-display text-[clamp(1.9rem,7vw,4rem)] font-light leading-[1.05] text-paper text-balance">
            At the Met, the median visitor gives a painting 17 seconds. Label included.
          </p>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-paper/80">
            Call it the walk-past. Quicklime slows it down: one painting, a few details, and the thing nobody stayed long enough to see.
          </p>
          <a
            href="https://journals.sagepub.com/doi/10.2190/5MQM-59JH-X21R-JN5J"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-paper/70 underline-offset-4 hover:underline"
          >
            Source: Smith &amp; Smith, Spending Time on Art, 2001
          </a>
        </section>

        <DetailZoom
          slug={wave.slug}
          image={wave.image}
          alt={wave.cover.kicker}
          focus={fuji.focus}
          lines={["A tiny mountain.", "Now step back."]}
          twist={fuji.twist!}
          cta={`Read ${wave.title}`}
        />

        <StoryWall cards={cards} />

        <ArtistIndex rows={rows} span={span} oldest={oldest} newest={newest} />

        <section className="px-5 pb-24 md:px-12">
          <Link
            href="/artists"
            className="group flex items-center justify-between gap-6 rounded-3xl bg-lime px-6 py-10 text-ink md:px-12 md:py-16"
          >
            <span className="font-display text-[clamp(2.2rem,8vw,5.5rem)] leading-none">Pick one. Beat 17 seconds.</span>
            <span aria-hidden className="text-4xl transition-transform group-hover:translate-x-2 md:text-6xl">
              →
            </span>
          </Link>
        </section>
      </main>

      <footer className="flex flex-col gap-2 border-t border-paper/10 px-5 py-10 text-sm text-paper/70 md:flex-row md:justify-between md:px-12">
        <span>quicklime.co.za</span>
        <span>Every painting is out of copyright. Every story shows its sources, so you can check our homework.</span>
      </footer>
    </>
  );
}
