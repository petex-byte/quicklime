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

type Next = { slug: string; title: string };

export function StoryPage({ story, artist, next }: { story: Story; artist: Artist; next: Next }) {
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
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root, threshold: 0.55 },
    );
    root.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = sections[active];
  const focus =
    current.type === "beat" ? story.beats[current.index].focus : WHOLE;
  const caption =
    current.type === "beat" ? story.beats[current.index].caption : undefined;
  const aspect = aspectOf(story);

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

      {/* Top bar: progress through the story and a way out at any point. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 bg-gradient-to-b from-ink/70 to-transparent px-4 pb-6 pt-[calc(env(safe-area-inset-top,0px)+0.6rem)] md:px-8">
        <div className="flex gap-1" aria-hidden>
          {sections.map((_, i) => (
            <span
              key={i}
              className={clsx(
                "h-[3px] flex-1 rounded-full transition-colors duration-300",
                i < active ? "bg-paper" : i === active ? "bg-lime" : "bg-paper/25",
              )}
            />
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <Link
            href="/artists"
            aria-label="Close story, back to the directory"
            className="pointer-events-auto -ml-2 flex h-11 w-11 items-center justify-center text-paper"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Link>
          <p className="text-xs uppercase tracking-[0.18em] text-paper/80" aria-live="polite">
            {story.title} · {active + 1} / {sections.length}
          </p>
          <span className="w-9" aria-hidden />
        </div>
      </div>

      {/* Pinned canvas: one painting for the whole page. */}
      <motion.div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden bg-ink"
        animate={{ opacity: current.type === "reveal" ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.6 }}
      >
        {/* Sized to the artwork's own aspect ratio and grown until it covers the
            viewport, so focus x/y percentages land on the same spot of the
            painting at any screen shape. */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `max(100vw, calc(100svh * ${aspect}))`,
            aspectRatio: `${aspect}`,
          }}
        >
          <motion.div
            className="h-full w-full"
            initial={false}
            animate={canvasTarget}
            transition={punch}
          >
            <Painting image={story.image} alt="" priority />
          </motion.div>
        </div>
        <motion.div
          className="spotlight absolute inset-0"
          animate={{ opacity: SHADE[current.type] }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        />
      </motion.div>

      {sections.map((s, i) => (
        <section key={i} data-index={i} className="story-section" style={s.type === "footer" ? { paddingBottom: 0 } : undefined}>
          {s.type === "cover" && <Cover story={story} artist={artist} />}
          {s.type === "beat" && (
            <Beat beat={story.beats[s.index]} n={s.index + 1} />
          )}
          {s.type === "reveal" && <Reveal story={story} artist={artist} />}
          {s.type === "quote" && <Quote story={story} />}
          {s.type === "close" && <Close story={story} />}
          {s.type === "footer" && <Footer story={story} artist={artist} next={next} />}
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
          animate={{
            opacity: current.type === "footer" ? 0 : 0.8,
            y: current.type === "footer" ? 12 : 0,
          }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-paper"
        >
          <span>Scroll</span>
          <span className="scroll-cue" />
        </motion.div>
      </div>
    </div>
  );
}

function aspectOf(story: Story) {
  const { width, height } = story.image;
  return width && height ? width / height : 4 / 5;
}

/** PREVIEW ONLY: says which painting is on screen when it isn't the featured work. */
function StandInNote({ title, className }: { title: string; className?: string }) {
  return (
    <p className={clsx("w-fit rounded-full border border-lime/40 px-3 py-1 text-xs text-lime", className)}>
      Preview image: {title}
    </p>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
      {/* Scrim so the title reads over pale paintings; fills the section, band included. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.2 }}
        className="relative mb-4 text-xs uppercase tracking-[0.25em] text-paper"
      >
        {story.cover.kicker}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-paper"
      >
        {story.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative mt-6 text-lg text-paper/80"
      >
        {artist.name} · {story.year}
      </motion.p>
      {story.image.standIn && <StandInNote title={story.image.standIn} className="relative mt-4" />}
    </div>
  );
}

function Beat({ beat, n }: { beat: Story["beats"][number]; n: number }) {
  return (
    <div className="flex h-full items-center px-6 md:px-16">
      <Card>
        <p className="mb-5 text-xs tracking-[0.25em] text-paper/60">
          {String(n).padStart(2, "0")}
        </p>
        {beat.lines.map((l) => (
          <p
            key={l}
            className="font-display text-2xl leading-snug text-paper md:text-3xl"
          >
            {l}
          </p>
        ))}
        {beat.twist && (
          <p className="mt-6 text-lg font-semibold text-lime">{beat.twist}</p>
        )}
      </Card>
    </div>
  );
}

function Reveal({ story, artist }: { story: Story; artist: Artist }) {
  const aspect = aspectOf(story);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="flex h-[72%] w-full max-w-5xl items-center justify-center">
        <div
          style={{
            aspectRatio: `${aspect}`,
            width: `min(100%, calc((100svh - var(--band)) * 0.72 * ${aspect}))`,
          }}
        >
          <Painting
            image={story.image}
            alt={`${story.cover.kicker}, ${artist.name}, ${story.year}`}
            fit="contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center text-center text-paper/80">
        {story.reveal.lines.map((l) => (
          <p key={l} className="text-sm uppercase tracking-[0.25em]">
            {l}
          </p>
        ))}
        {story.image.standIn && <StandInNote title={story.image.standIn} className="mt-3" />}
      </div>
    </div>
  );
}

function Quote({ story }: { story: Story }) {
  return (
    <div className="flex h-full items-end justify-center px-5 pb-6 md:items-center md:px-16 md:pb-0">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="glass glass-solid w-full max-w-3xl p-6 md:p-10"
      >
        <blockquote className="font-display text-[clamp(1.6rem,6vw,3.25rem)] leading-[1.15] text-paper">
          “{story.quote.text}”
        </blockquote>
        <figcaption className="mt-5 text-xs uppercase leading-relaxed tracking-[0.16em] text-paper/75">
          {story.quote.attribution}
        </figcaption>
      </motion.figure>
    </div>
  );
}

function Close({ story }: { story: Story }) {
  return (
    <div className="flex h-full items-center px-6 md:px-16">
      <Card className="max-w-lg">
        <p className="mb-5 font-display text-4xl text-lime md:text-5xl">
          {story.close.heading}
        </p>
        {story.close.lines.map((l) => (
          <p
            key={l}
            className="mb-2 text-lg leading-snug text-paper md:text-xl"
          >
            {l}
          </p>
        ))}
      </Card>
    </div>
  );
}

function Footer({ story, artist, next }: { story: Story; artist: Artist; next: Next }) {
  return (
    <div className="flex h-full flex-col justify-end">
      {/* Solid sheet over the painting: sources and the next step stay readable on any image. */}
      <div className="max-h-[78svh] overflow-y-auto rounded-t-3xl bg-[#121211] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 shadow-[0_-12px_40px_rgba(11,11,10,0.6)] md:mx-auto md:mb-10 md:w-full md:max-w-2xl md:rounded-3xl md:px-10 md:pb-10">
        <p className="font-display text-4xl leading-none text-paper md:text-5xl">{artist.name}</p>
        <p className="mt-2 text-sm text-paper/70">
          {artist.nationality} · {artist.movement} · {lifespan(artist)}
        </p>
        {story.showSources !== false && (
          <div className="mt-6">
            <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-paper/70">
              Sources · {story.sources.length}
            </p>
            <ul>
              {story.sources.map((s) => (
                <li key={s.url} className="border-b border-paper/10">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm leading-snug text-paper/85 hover:text-paper"
                  >
                    <span>{s.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="shrink-0 opacity-60">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-col gap-1">
          <Link
            href={`/artists/${next.slug}`}
            className="flex h-14 items-center justify-between rounded-full bg-lime px-6 text-base font-medium text-ink"
          >
            <span>Next: {next.title}</span>
            <span aria-hidden>→</span>
          </Link>
          <Link href="/artists" className="flex h-11 items-center justify-center text-sm text-paper/80 hover:text-paper">
            All painters
          </Link>
        </div>
      </div>
    </div>
  );
}
