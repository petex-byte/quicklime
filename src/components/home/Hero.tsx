"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const WORDS = ["Walk", "through", "the", "best", "art."];

/**
 * Cursor-reactive hero. A soft lime light follows the pointer and the type
 * tilts against it, live from the first frame. Everything else stays still.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const lightX = useTransform(sx, (v) => `${v * 100}%`);
  const lightY = useTransform(sy, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(38vmax circle at ${lightX} ${lightY}, rgba(198,242,78,0.16), transparent 60%)`;
  const rotX = useTransform(sy, [0, 1], reduce ? [0, 0] : [6, -6]);
  const rotY = useTransform(sx, [0, 1], reduce ? [0, 0] : [-8, 8]);
  const shiftX = useTransform(sx, [0, 1], reduce ? [0, 0] : [-18, 18]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    // Touch devices have no hover: let scroll drive the light instead.
    const onScroll = () => my.set(0.4 + Math.min(window.scrollY / window.innerHeight, 1) * 0.5);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mx, my]);

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 md:px-16">
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: light }} />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <motion.h1
        style={{ rotateX: rotX, rotateY: rotY, x: shiftX, transformPerspective: 1200 }}
        className="relative font-display text-[clamp(3.5rem,13vw,13rem)] font-light leading-[0.86] tracking-tight text-paper"
      >
        {WORDS.map((w, i) => (
          <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={i === WORDS.length - 1 ? "inline-block italic text-lime" : "inline-block"}
              initial={{ y: reduce ? 0 : "105%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.9, ease: [0.2, 0.75, 0.15, 1] }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <p className="max-w-sm text-paper/70">
          Painters gone long enough to belong to everyone. One painting each, told one detail at a time, until the detail turns out to be the story.
        </p>
        <Link
          href="/artists"
          className="group inline-flex w-fit items-center gap-4 rounded-full border border-paper/25 px-7 py-4 text-paper transition-colors hover:border-lime hover:bg-lime hover:text-ink"
        >
          Enter the directory
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
