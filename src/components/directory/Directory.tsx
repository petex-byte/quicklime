"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import type { Artist } from "@/content/types";
import { era, lifespan } from "@/content/artists";
import { Painting } from "@/components/Painting";

type Filters = { q: string; movement: string; nationality: string; era: string };
const ALL = "All";

function options(values: string[]) {
  return [ALL, ...Array.from(new Set(values)).sort()];
}

export function Directory({ artists, live }: { artists: Artist[]; live: string[] }) {
  const [f, setF] = useState<Filters>({ q: "", movement: ALL, nationality: ALL, era: ALL });

  const movements = options(artists.map((a) => a.movement));
  const nationalities = options(artists.map((a) => a.nationality));
  const eras = [ALL, ...Array.from(new Set(artists.map(era))).sort()];

  const shown = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return artists.filter(
      (a) =>
        (!q || [a.name, a.movement, a.nationality, a.featuredWork].some((s) => s.toLowerCase().includes(q))) &&
        (f.movement === ALL || a.movement === f.movement) &&
        (f.nationality === ALL || a.nationality === f.nationality) &&
        (f.era === ALL || era(a) === f.era),
    );
  }, [artists, f]);

  const set = (k: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <div>
      {/* One collapsed bar: search plus three filters. */}
      <div className="sticky top-16 z-20 mb-8 flex flex-col gap-2 rounded-2xl border border-paper/10 bg-ink/85 p-2 backdrop-blur md:flex-row md:items-center">
        <input
          type="search"
          value={f.q}
          onChange={set("q")}
          placeholder="Painter, painting or movement"
          aria-label="Search"
          className="min-h-12 min-w-0 flex-1 rounded-xl bg-paper/5 px-4 text-base text-paper placeholder:text-paper/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-lime"
        />
        <div className="no-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2 md:mx-0 md:px-0">
          <Select label="Movement" any="Any movement" value={f.movement} onChange={set("movement")} options={movements} />
          <Select label="Nationality" any="Any nationality" value={f.nationality} onChange={set("nationality")} options={nationalities} />
          <Select label="Era" any="Any era" value={f.era} onChange={set("era")} options={eras} />
        </div>
      </div>

      <p className="mb-6 flex items-center gap-2 text-sm text-paper/70">
        {shown.length === artists.length ? `${artists.length} painters` : `${shown.length} of ${artists.length} painters`}
        <span aria-hidden>·</span>
        <span aria-hidden className="h-2 w-2 rounded-full bg-lime" />
        {shown.filter((a) => live.includes(a.slug)).length} with a story
      </p>

      <motion.ul layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {shown.map((a) => {
            const isLive = live.includes(a.slug);
            return (
              <motion.li
                key={a.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Link href={`/artists/${a.slug}`} className="group block">
                  <div
                    className={clsx(
                      "relative aspect-[3/4] overflow-hidden rounded-lg",
                      !isLive && "opacity-60 transition-opacity group-hover:opacity-90",
                    )}
                  >
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06]">
                      <Painting image={a.image} alt={a.featuredWork} objectPosition={a.cardFocus} />
                    </div>
                    {isLive && (
                      <span aria-label="Story live" className="absolute right-3 top-3 h-2 w-2 rounded-full bg-lime" />
                    )}
                  </div>
                  <p className="mt-3 font-display text-lg leading-tight text-paper">{a.name}</p>
                  <p className="text-sm text-paper/70">{lifespan(a)}</p>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {shown.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-center text-paper/70">
          <p>Nothing matches. Loosen a filter.</p>
          <button
            type="button"
            onClick={() => setF({ q: "", movement: ALL, nationality: ALL, era: ALL })}
            className="min-h-11 rounded-full border border-paper/25 px-5 text-sm text-paper hover:border-lime"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  any,
  value,
  onChange,
  options,
}: {
  label: string;
  any: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="relative shrink-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          "min-h-11 appearance-none rounded-full border px-4 pr-9 text-sm text-paper focus:outline-none focus-visible:ring-1 focus-visible:ring-lime",
          value === ALL ? "border-paper/20 bg-transparent" : "border-lime bg-lime/10",
        )}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">
            {o === ALL ? any : o}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-paper/70">
        ▾
      </span>
    </label>
  );
}
