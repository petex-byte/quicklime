"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import clsx from "clsx";
import type { Artist, Focus, Story } from "@/content/types";
import { lifespan } from "@/content/artists";
import { Painting } from "@/components/Painting";
import { GlassFilter } from "./GlassFilter";

type Section =
  | { type: "cover" }
  | { type: "beat"; index: number }
  | { type: "reveal" }
  | { type: "quote" }
  | { type: "close" }
  | { type: "footer" };

const WHOLE: Focus = { x: 50, y: 50, scale: 1 };

/** How dark the spotlight vignette sits over the pinned canvas, per section. */
const SHADE: Record<Section["type"], number> = {
  cover: 0.35,
  beat: 1,
  reveal: 0,
  quote: 0.9,
  close: 0.85,
  footer: 0.95,
};

export function StoryPage({ story, artist }: { story: Story; artist: Artist }) {
  const sections: Section[] = [
    { type: "cover" },
    ...story.beats.map((_, index) => ({ type: "beat" as const, index })),
    { type: "reveal" },
    { type: "quote" },
    { type: "close" },
    { type: "footer" },
  ];

  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root, threshold: 0.55 },
    );
    root.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = sections[active];
  const focus = current.type === "beat" ? story.beats[current.index].focus : WHOLE;
  const caption = current.type === "beat" ? story.beats[current.index].caption : undefined;

  // Pan the focus point to the centre of the viewport, then zoom on it.
  const canvasTarget = {
    x: `${(50 - focus.x) * focus.scale}%`,
    y: `${(50 - focus.y) * focus.scale}%`,
    scale: focus.scale,
  };
  const punch: Transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 140, damping: 20, mass: 0.9 };

  return (
    <div ref={scroller} className="story-scroller">
      <GlassFilter />

      {/* Pinned canvas: one painting for the whole page. */}
      <motion.div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden bg-ink"
        animate={{ opacity: current.type === "reveal" ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.6 }}
      >
        <motion.div className="h-full w-full" initial={false} animate={canvasTarget} transition={punch}>
          <Painting image={story.image} alt="" priority />
        </motion.div>
        <motion.div
          className="spotlight absolute inset-0"
          animate={{ opacity: SHADE[current.type] }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        />
      </motion.div>

      {sections.map((s, i) => (
        <section key={i} data-index={i} className="story-section">
          {s.type === "cover" && <Cover story={story} artist={artist} />}
          {s.type === "beat" && <Beat beat={story.beats[s.index]} n={s.index + 1} />}
          {s.type === "reveal" && <Reveal story={story} artist={artist} />}
          {s.type === "quote" && <Quote story={story} />}
          {s.type === "close" && <Close story={story} />}
          {s.type === "footer" && <Footer story={story} artist={artist} />}
        </section>
      ))}

      {/* Reserved bottom band: captions left, scroll cue right. Nothing else lives here. */}
      <div className="story-band pointer-events-none fixed inset-x-0 bottom-0 flex items-center justify-between px-6 md:px-10">
        <motion.p
          key={caption ?? "none"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: caption ? 0.75 : 0, y: 0 }}
          className="max-w-[60%] text-xs uppercase tracking-[0.2em] text-paper"
        >
          {caption}
        </motion.p>
        <motion.div
          animate={{ opacity: current.type === "footer" ? 0 : 0.8, y: current.type === "footer" ? 12 : 0 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-paper"
        >
          <span>Scroll</span>
          <span className="scroll-cue" />
        </motion.div>
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className={clsx("glass max-w-md p-7 md:p-9", className)}
    >
      {children}
    </motion.div>
  );
}

function Cover({ story, artist }: { story: Story; artist: Artist }) {
  return (
    <div className="flex h-full flex-col justify-end px-6 md:px-16">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-xs uppercase tracking-[0.25em] text-paper"
      >
        {story.cover.kicker}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-paper"
      >
        {story.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-lg text-paper/80"
      >
        {artist.name} · {story.year}
      </motion.p>
    </div>
  );
}

function Beat({ beat, n }: { beat: Story["beats"][number]; n: number }) {
  return (
    <div className="flex h-full items-center px-6 md:px-16">
      <Card>
        <p className="mb-5 text-xs tracking-[0.25em] text-paper/60">{String(n).padStart(2, "0")}</p>
        {beat.lines.map((l) => (
          <p key={l} className="font-display text-2xl leading-snug text-paper md:text-3xl">
            {l}
          </p>
        ))}
        {beat.twist && <p className="mt-6 text-lg font-semibold text-lime">{beat.twist}</p>}
      </Card>
    </div>
  );
}

function Reveal({ story, artist }: { story: Story; artist: Artist }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="h-[72%] w-full max-w-5xl">
        <Painting image={story.image} alt={`${story.cover.kicker}, ${artist.name}, ${story.year}`} fit="contain" />
      </div>
      <div className="text-center text-paper/80">
        {story.reveal.lines.map((l) => (
          <p key={l} className="text-sm uppercase tracking-[0.25em]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function Quote({ story }: { story: Story }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <motion.blockquote
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl font-display text-[clamp(2.4rem,7vw,6rem)] leading-[1.02] text-paper"
      >
        “{story.quote.text}”
      </motion.blockquote>
      <p className="mt-8 text-xs uppercase tracking-[0.25em] text-paper/60">{story.quote.attribution}</p>
    </div>
  );
}

function Close({ story }: { story: Story }) {
  return (
    <div className="flex h-full items-center px-6 md:px-16">
      <Card className="max-w-lg">
        <p className="mb-5 font-display text-4xl text-lime md:text-5xl">{story.close.heading}</p>
        {story.close.lines.map((l) => (
          <p key={l} className="mb-2 text-lg leading-snug text-paper md:text-xl">
            {l}
          </p>
        ))}
      </Card>
    </div>
  );
}

function Footer({ story, artist }: { story: Story; artist: Artist }) {
  return (
    <div className="flex h-full flex-col justify-center gap-10 px-6 md:px-16">
      <div>
        <p className="font-display text-4xl text-paper md:text-6xl">{artist.name}</p>
        <p className="mt-2 text-paper/60">
          {artist.nationality} · {artist.movement} · {lifespan(artist)}
        </p>
      </div>
      {story.showSources !== false && (
        <ul className="space-y-1 text-sm text-paper/60">
          {story.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} className="underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <Link href="/artists" className="w-fit border-b border-lime pb-1 text-lime">
        Back to the directory
      </Link>
    </div>
  );
}
