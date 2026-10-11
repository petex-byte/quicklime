import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { Directory } from "@/components/directory/Directory";
import { artists } from "@/content/artists";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Artists",
  description: "Public-domain painters, one story each.",
};

export default function ArtistsPage() {
  return (
    <>
      <SiteNav />
      <main className="px-6 pb-24 pt-32 md:px-16">
        <h1 className="mb-12 font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.9] text-paper">
          The directory<span className="text-lime">.</span>
        </h1>
        <Directory artists={artists} live={Object.keys(stories)} />
      </main>
    </>
  );
}
