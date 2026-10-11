import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/home/Hero";
import { getStory } from "@/content/stories";
import { getArtist, lifespan } from "@/content/artists";
import { Painting } from "@/components/Painting";

export default function Home() {
  const featured = getStory("rembrandt")!;
  const artist = getArtist("rembrandt")!;

  return (
    <>
      <SiteNav />
      <main>
        <Hero />

        <section className="px-6 py-24 md:px-16">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-paper/50">Now showing</p>
          <Link href={`/artists/${artist.slug}`} className="group grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div className="aspect-[4/5] overflow-hidden rounded-xl md:aspect-[16/10]">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
                <Painting image={featured.image} alt={featured.cover.kicker} objectPosition="60% 60%" />
              </div>
            </div>
            <div>
              <p className="font-display text-5xl text-paper md:text-7xl">{featured.title}</p>
              <p className="mt-3 text-paper/60">
                {artist.name} · {featured.year}
              </p>
              <p className="mt-8 max-w-sm text-paper/80">{featured.beats[0].lines.join(" ")} {featured.beats[0].twist}</p>
            </div>
          </Link>
        </section>
      </main>

      <footer className="border-t border-paper/10 px-6 py-10 text-sm text-paper/50 md:px-16">
        quicklime.co.za · Featured: {artist.name}, {lifespan(artist)}
      </footer>
    </>
  );
}
