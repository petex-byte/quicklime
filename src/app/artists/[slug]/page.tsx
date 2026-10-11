import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getArtist, lifespan } from "@/content/artists";
import { getStory } from "@/content/stories";
import { StoryPage } from "@/components/story/StoryPage";
import { SiteNav } from "@/components/SiteNav";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};
  const story = getStory(slug);
  return {
    title: story ? `${story.title} — ${artist.name}` : artist.name,
    description: story ? story.beats[0].lines.join(" ") : `${artist.name}, ${artist.movement}.`,
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const story = getStory(slug);
  if (story) return <StoryPage story={story} artist={artist} />;

  // No story has cleared research yet: say so plainly, no filler copy.
  return (
    <>
      <SiteNav />
      <main className="flex min-h-svh flex-col justify-center px-6 md:px-16">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-paper/50">In the studio</p>
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-light leading-[0.9] text-paper">{artist.name}</h1>
        <p className="mt-4 text-paper/60">
          {artist.nationality} · {artist.movement} · {lifespan(artist)}
        </p>
        <p className="mt-10 max-w-md text-paper/80">
          {artist.featuredWork}. The story is being researched and fact-checked. It goes up when every line holds.
        </p>
        <Link href="/artists" className="mt-10 w-fit border-b border-lime pb-1 text-lime">
          Back to the directory
        </Link>
      </main>
    </>
  );
}
