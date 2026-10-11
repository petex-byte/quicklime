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
      <div className="sticky top-16 z-20 mb-10 flex flex-col gap-2 rounded-2xl border border-paper/10 bg-ink/80 p-2 backdrop-blur md:flex-row">
        <input
          type="search"
          value={f.q}
          onChange={set("q")}
          placeholder="Search artists, works, movements"
          aria-label="Search"
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-paper placeholder:text-paper/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-lime"
        />
        <div className="grid grid-cols-3 gap-2 md:flex">
          <Select label="Movement" value={f.movement} onChange={set("movement")} options={movements} />
          <Select label="Nationality" value={f.nationality} onChange={set("nationality")} options={nationalities} />
          <Select label="Era" value={f.era} onChange={set("era")} options={eras} />
        </div>
      </div>

      <p className="mb-6 text-sm text-paper/50">
        {shown.length} of {artists.length}
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
                  <p className="text-sm text-paper/50">{lifespan(a)}</p>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {shown.length === 0 && <p className="py-20 text-center text-paper/50">Nothing matches. Loosen a filter.</p>}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl bg-paper/5 px-4 py-3 pr-8 text-sm text-paper focus:outline-none focus-visible:ring-1 focus-visible:ring-lime md:w-auto"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">
            {o === ALL ? `${label}: all` : o}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-paper/50">
        ▾
      </span>
    </label>
  );
}
