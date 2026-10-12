"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { ArtImage } from "@/content/types";
import { Painting } from "@/components/Painting";

export type WallCard = {
  slug: string;
  title: string;
  artist: string;
  year: string;
  line: string;
  image: ArtImage;
};

/** A swipeable row of story cards. Native scroll-snap, so it feels like the phone's own gallery. */
export function StoryWall({ cards }: { cards: WallCard[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = row.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const page = (d: number) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: d * ((card?.clientWidth ?? 300) + 12) * 2, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28" aria-labelledby="wall-title">
      <div className="mb-8 flex items-end justify-between gap-6 px-5 md:px-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-paper/50">{cards.length} stories</p>
          <h2 id="wall-title" className="mt-2 font-display text-[clamp(2.4rem,9vw,5.5rem)] font-light leading-none text-paper">
            The wall
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => page(-1)} aria-label="Scroll back" className="wall-btn">
            ←
          </button>
          <button type="button" onClick={() => page(1)} aria-label="Scroll forward" className="wall-btn">
            →
          </button>
        </div>
      </div>

      <ul
        ref={row}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 md:scroll-px-12 md:px-12"
      >
        {cards.map((c, n) => (
          <li key={c.slug} className="w-[78vw] max-w-[360px] shrink-0 snap-start">
            <Link href={`/artists/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-paper/5">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                <Painting image={c.image} alt={c.title} sizes="(max-width: 768px) 78vw, 360px" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] tracking-[0.25em] text-paper/60">
                  {String(n + 1).padStart(2, "0")} · {c.artist}
                </p>
                <p className="mt-1 font-display text-3xl leading-none text-paper">{c.title}</p>
                <p className="mt-3 line-clamp-2 text-sm text-paper/75">{c.line}</p>
              </div>
            </Link>
          </li>
        ))}
        <li aria-hidden className="w-1 shrink-0" />
      </ul>

      <div className="mx-5 mt-6 h-px bg-paper/15 md:mx-12" aria-hidden>
        <div className="h-px bg-lime" style={{ width: `${Math.max(8, progress * 100)}%` }} />
      </div>
    </section>
  );
}
