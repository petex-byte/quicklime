"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ArtImage } from "@/content/types";
import { Painting } from "@/components/Painting";

export type Slide = {
  slug: string;
  title: string;
  artist: string;
  year: string;
  /** What is actually on screen (the featured work, or a preview stand-in). */
  shown: string;
  standIn: boolean;
  image: ArtImage;
};

const SLIDE_MS = 7000;
const IDLE_MS = 2200;

/**
 * Full-screen painting, dimmed, with a lantern that reveals it in full
 * colour and slight magnification. The lantern follows a finger or cursor,
 * and drifts on its own when nobody is touching. Slides advance like phone
 * stories: tap right for next, left for previous.
 */
export function LensHero({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [hint, setHint] = useState(true);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const slide = slides[i];

  const go = useCallback(
    (d: number) => {
      setI((v) => (v + d + slides.length) % slides.length);
      setCycle((c) => c + 1);
    },
    [slides.length],
  );

  // Lantern position: written straight to CSS variables, no re-renders.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let w = el.clientWidth;
    let h = el.clientHeight;
    let tx = w * 0.5;
    let ty = h * 0.45;
    let x = tx;
    let y = ty;
    let last = -Infinity;
    let raf = 0;

    const size = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      el.style.setProperty("--r", `${Math.round(Math.max(110, Math.min(w, h) * (w < 700 ? 0.36 : 0.24)))}px`);
    };
    const aim = (cx: number, cy: number) => {
      const b = el.getBoundingClientRect();
      if (cy < b.top || cy > b.bottom) return;
      tx = cx - b.left;
      ty = cy - b.top;
      last = performance.now();
    };
    const onPointer = (e: PointerEvent) => e.pointerType === "mouse" && aim(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) aim(t.clientX, t.clientY);
      setHint(false);
    };
    const tick = (now: number) => {
      if (!reduce && now - last > IDLE_MS) {
        const t = now / 1000;
        tx = w * (0.5 + 0.27 * Math.sin(t * 0.33));
        ty = h * (0.46 + 0.2 * Math.sin(t * 0.51 + 1.2));
      }
      const k = reduce ? 1 : 0.11;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    size();
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onPointer);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onPointer);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
    };
  }, [reduce]);

  // Auto-advance, paused while touched, off-screen, or the tab is hidden.
  useEffect(() => {
    const el = root.current;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (el) io.observe(el);
    if (paused) return () => io.disconnect();
    const id = window.setTimeout(() => {
      if (visible && !document.hidden) go(1);
      else setCycle((c) => c + 1);
    }, SLIDE_MS);
    return () => {
      window.clearTimeout(id);
      io.disconnect();
    };
  }, [cycle, paused, go]);

  useEffect(() => {
    const id = window.setTimeout(() => setHint(false), 4500);
    return () => window.clearTimeout(id);
  }, []);

  const next = slides[(i + 1) % slides.length];

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Featured paintings"
      className="lens-hero relative h-[100svh] min-h-[560px] overflow-hidden bg-ink select-none"
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.slug}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
        >
          <div className="lens-base absolute inset-0">
            <Painting image={slide.image} alt="" priority={i === 0} />
          </div>
          <div className="lens-glass absolute inset-0">
            <Painting image={slide.image} alt={slide.shown} priority={i === 0} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Warm the cache for the next slide. */}
      <div aria-hidden className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
        <Painting image={next.image} alt="" />
      </div>

      <div aria-hidden className="lens-ring pointer-events-none absolute" />
      <AnimatePresence>
        {hint && (
          <motion.p
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lens-hint pointer-events-none absolute text-[11px] uppercase tracking-[0.25em] text-paper/80"
          >
            <span className="md:hidden">Drag to look</span>
            <span className="hidden md:inline">Move to look</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Legibility: top for the nav and headline, bottom for the caption. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink/90 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />

      {/* Tap zones: left third back, the rest forward. */}
      <button
        type="button"
        aria-label="Previous painting"
        onClick={() => go(-1)}
        className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-w-resize focus-visible:outline-none"
      />
      <button
        type="button"
        aria-label="Next painting"
        onClick={() => go(1)}
        className="absolute inset-y-0 right-0 z-10 w-2/3 cursor-e-resize focus-visible:outline-none"
      />

      <div className="pointer-events-none relative z-20 flex h-full flex-col justify-between px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(env(safe-area-inset-top,0px)+4.75rem)] md:px-12 md:pb-12">
        <div>
          <div className="flex gap-1.5" aria-hidden>
            {slides.map((s, n) => (
              <span key={s.slug} className="h-[2px] flex-1 overflow-hidden rounded-full bg-paper/20">
                {n < i && <span className="block h-full w-full bg-paper/80" />}
                {n === i && (
                  <span
                    key={cycle}
                    className="block h-full bg-lime"
                    style={{
                      animation: reduce ? "none" : `lens-progress ${SLIDE_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                      width: reduce ? "100%" : undefined,
                    }}
                  />
                )}
              </span>
            ))}
          </div>
          <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(2.9rem,13vw,8.5rem)] font-light leading-[0.88] tracking-tight text-paper text-balance">
            Walk through the best <em className="text-lime">art.</em>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.slug}
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.25em] text-paper/60">
                {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {slide.artist}, {slide.year}
              </p>
              <p className="mt-2 font-display text-[clamp(2rem,8vw,4.5rem)] leading-none text-paper">{slide.title}</p>
              <p className="mt-2 text-sm text-paper/60">
                {slide.standIn ? <>Preview image: {slide.shown}</> : slide.shown}
              </p>
            </div>
            <Link
              href={`/artists/${slide.slug}`}
              className="pointer-events-auto inline-flex w-full items-center justify-between gap-4 rounded-full bg-paper px-6 py-4 text-ink transition-colors hover:bg-lime md:w-auto"
            >
              Read the story
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
