"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { ArtImage, Focus } from "@/content/types";
import { Painting } from "@/components/Painting";

const START_SCALE = 7;

/**
 * The site's idea in one gesture: scroll starts on a single detail at
 * extreme close-up, then pulls all the way back to the whole picture.
 */
export function DetailZoom({
  slug,
  image,
  alt,
  focus,
  lines,
  twist,
  cta,
}: {
  slug: string;
  image: ArtImage;
  alt: string;
  focus: Focus;
  lines: [string, string];
  twist: string;
  cta: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // k: 1 = fully zoomed on the detail, 0 = whole picture.
  const k = useTransform(p, [0.05, 0.72], [1, 0], { clamp: true });
  const scale = useTransform(k, (v) => (reduce ? 1 : 1 + (START_SCALE - 1) * v));
  const x = useTransform(k, (v) => (reduce ? "0%" : `${(50 - focus.x) * (1 + (START_SCALE - 1) * v) * v}%`));
  const y = useTransform(k, (v) => (reduce ? "0%" : `${(50 - focus.y) * (1 + (START_SCALE - 1) * v) * v}%`));

  const aspect = image.width && image.height ? image.width / image.height : 3 / 2;

  return (
    <section ref={ref} className="relative h-[320svh] bg-ink" aria-label="One detail">
      <div className="sticky top-0 flex h-[100svh] items-start justify-center overflow-hidden pt-[24svh] md:items-center md:pt-0">
        <p className="absolute left-5 top-[calc(env(safe-area-inset-top,0px)+5rem)] z-10 text-[11px] uppercase tracking-[0.25em] text-paper/70 md:left-12">
          Look closer
        </p>
        <div
          className="relative max-w-full"
          style={{ aspectRatio: `${aspect}`, width: `min(92vw, calc(68svh * ${aspect}))` }}
        >
          <motion.div className="h-full w-full will-change-transform" style={{ scale, x, y }}>
            <Painting image={image} alt={alt} sizes="(max-width: 768px) 200vw, 100vw" fit="cover" />
          </motion.div>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-12 md:pb-14">
          <div className="relative min-h-[9.5rem] md:min-h-[8rem]">
            <Beat p={p} range={[0.02, 0.1, 0.24, 0.3]}>{lines[0]}</Beat>
            <Beat p={p} range={[0.3, 0.36, 0.5, 0.56]}>{lines[1]}</Beat>
            <Beat p={p} range={[0.58, 0.66, 0.99, 1]} accent>
              {twist}
            </Beat>
          </div>
          <Cta p={p} href={`/artists/${slug}`}>
            {cta}
          </Cta>
        </div>
      </div>
    </section>
  );
}

function Beat({
  p,
  range,
  accent,
  children,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  accent?: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [24, 0, 0, -16]);
  return (
    <motion.p
      style={{ opacity, y }}
      className={
        "absolute inset-x-0 bottom-0 max-w-[18ch] font-display text-[clamp(2.1rem,9vw,5rem)] leading-[0.98] text-balance " +
        (accent ? "text-lime" : "text-paper")
      }
    >
      {children}
    </motion.p>
  );
}

function Cta({ p, href, children }: { p: MotionValue<number>; href: string; children: React.ReactNode }) {
  const opacity = useTransform(p, [0.7, 0.8], [0, 1]);
  return (
    <motion.div style={{ opacity }} className="mt-6">
      <Link href={href} className="inline-flex items-center gap-3 border-b border-lime pb-1 text-lime">
        {children} <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}
