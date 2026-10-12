"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ArtImage } from "@/content/types";
import { Painting } from "@/components/Painting";

export type IndexRow = {
  slug: string;
  name: string;
  dates: string;
  movement: string;
  live: boolean;
  image?: ArtImage;
};

/**
 * Every painter in large type, oldest first. Phones get a thumbnail in each
 * row; on desktop the painting floats beside the cursor instead.
 */
export function ArtistIndex({ rows, span }: { rows: IndexRow[]; span: string }) {
  const [hover, setHover] = useState<IndexRow | null>(null);
  const float = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !float.current) return;
      float.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="px-5 py-20 md:px-12 md:py-28" aria-labelledby="index-title">
      <p className="text-[11px] uppercase tracking-[0.25em] text-paper/50">{span}</p>
      <h2 id="index-title" className="mt-2 font-display text-[clamp(2.4rem,9vw,5.5rem)] font-light leading-none text-paper">
        {rows.length} painters
      </h2>

      <ol className="mt-10 border-t border-paper/10" onPointerLeave={() => setHover(null)}>
        {rows.map((r) => (
          <li key={r.slug} className="border-b border-paper/10">
            <Link
              href={`/artists/${r.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(r)}
              className="group flex items-center gap-4 py-4 md:py-5"
            >
              <span className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-paper/5 md:hidden">
                <Painting image={r.image} alt="" sizes="48px" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={
                    "block truncate font-display text-[clamp(1.5rem,6vw,3.25rem)] leading-tight transition-colors " +
                    (r.live ? "text-paper group-hover:text-lime" : "text-paper/40")
                  }
                >
                  {r.name}
                </span>
                <span className="block text-xs text-paper/50 md:hidden">
                  {r.dates} · {r.movement}
                </span>
              </span>
              <span className="hidden shrink-0 text-right text-sm text-paper/50 tabular-nums md:block">
                {r.movement}
                <br />
                {r.dates}
              </span>
              {!r.live && (
                <span className="shrink-0 rounded-full border border-paper/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-paper/40">
                  Soon
                </span>
              )}
            </Link>
          </li>
        ))}
      </ol>

      <div ref={float} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <AnimatePresence>
          {hover?.image && (
            <motion.div
              key={hover.slug}
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="h-60 w-48 overflow-hidden rounded-xl shadow-2xl shadow-black/60"
            >
              <Painting image={hover.image} alt="" sizes="192px" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
