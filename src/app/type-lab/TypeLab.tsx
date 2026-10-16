"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Painting } from "@/components/Painting";
import { HeistFile } from "@/components/home/HeistFile";
import type { ArtImage } from "@/content/types";

const SERIF = `"Fraunces", "Iowan Old Style", Georgia, serif`;
const stack = (n: string, mono = false) =>
  `"${n}", ${mono ? "ui-monospace, Menlo, monospace" : "ui-sans-serif, system-ui, sans-serif"}`;

const DISPLAY = ["Fraunces", "IBM Plex Sans", "Geist", "Inter", "Onest", "Public Sans", "Space Grotesk"];
const BODY = ["Inter", "Public Sans", "IBM Plex Sans", "Geist", "Onest"];
const LABEL = ["Same as body", "DM Mono", "Geist Mono", "IBM Plex Mono"];
const WEIGHT = ["As built", "300", "400", "500"];

type State = { d: string; b: string; l: string; w: string; hero: string; quote: string };

const PRESETS: { name: string; note: string; s: State }[] = [
  { name: "Today", note: "Fraunces + Inter", s: { d: "Fraunces", b: "Inter", l: "Same as body", w: "As built", hero: "Keep Fraunces", quote: "Keep Fraunces" } },
  { name: "Centum × Horizon", note: "Plex + Public Sans + DM Mono", s: { d: "IBM Plex Sans", b: "Public Sans", l: "DM Mono", w: "300", hero: "Follow display", quote: "Follow display" } },
  { name: "Geist system", note: "Geist + Geist Mono", s: { d: "Geist", b: "Geist", l: "Geist Mono", w: "300", hero: "Follow display", quote: "Follow display" } },
  { name: "Museum in a cockpit", note: "Plex + Public Sans + DM Mono, serif for hero and quotes", s: { d: "IBM Plex Sans", b: "Public Sans", l: "DM Mono", w: "300", hero: "Keep Fraunces", quote: "Keep Fraunces" } },
];

function Pick({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex min-w-[9rem] flex-1 flex-col gap-1 text-[11px] uppercase tracking-[0.18em] text-paper/70">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-lg border border-paper/25 bg-ink px-3 text-sm normal-case tracking-normal text-paper"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function TypeLab({ cards }: { cards: { slug: string; name: string; years: string; image: ArtImage }[] }) {
  const [s, setS] = useState<State>(PRESETS[0].s);
  const set = (k: keyof State) => (v: string) => setS((p) => ({ ...p, [k]: v }));

  // Share a setup by link: ?d=..&b=..&l=..&w=..&hero=..&quote=..
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const next = { ...PRESETS[0].s };
    (Object.keys(next) as (keyof State)[]).forEach((k) => q.get(k) && (next[k] = q.get(k)!));
    setS(next);
  }, []);
  useEffect(() => {
    const q = new URLSearchParams(s as unknown as Record<string, string>);
    window.history.replaceState(null, "", `?${q.toString()}`);
  }, [s]);

  const label = s.l === "Same as body" ? stack(s.b) : stack(s.l, true);
  const vars = {
    "--lab-display": stack(s.d),
    "--lab-body": stack(s.b),
    "--lab-label": label,
    "--lab-weight": s.w,
  } as React.CSSProperties;
  const heroFont = s.hero === "Keep Fraunces" ? SERIF : stack(s.d);
  const quoteFont = s.quote === "Keep Fraunces" ? SERIF : stack(s.d);

  return (
    <div className="lab" style={vars} data-w={s.w === "As built" ? undefined : s.w}>
      <style>{`
        .lab { font-family: var(--lab-body); }
        .lab .font-display { font-family: var(--lab-display) !important; }
        .lab[data-w] .font-display { font-weight: var(--lab-weight) !important; }
        .lab [class*="uppercase"], .lab .lab-label { font-family: var(--lab-label) !important; }
        .lab .keep-hero { font-family: var(--lab-hero) !important; }
        .lab .keep-quote { font-family: var(--lab-quote) !important; }
      `}</style>

      <div className="sticky top-0 z-40 border-b border-paper/15 bg-ink/95 px-4 py-3 backdrop-blur md:px-8">
        <div className="mb-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setS(p.s)}
              title={p.note}
              className={clsx(
                "min-h-11 rounded-full border px-4 text-sm",
                JSON.stringify(s) === JSON.stringify(p.s) ? "border-lime bg-lime text-ink" : "border-paper/25 text-paper hover:border-lime",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Pick label="Display" value={s.d} options={DISPLAY} onChange={set("d")} />
          <Pick label="Display weight" value={s.w} options={WEIGHT} onChange={set("w")} />
          <Pick label="Body" value={s.b} options={BODY} onChange={set("b")} />
          <Pick label="Labels and numbers" value={s.l} options={LABEL} onChange={set("l")} />
          <Pick label="Hero" value={s.hero} options={["Keep Fraunces", "Follow display"]} onChange={set("hero")} />
          <Pick label="Quotes" value={s.quote} options={["Keep Fraunces", "Follow display"]} onChange={set("quote")} />
        </div>
      </div>

      <div style={{ ["--lab-hero" as string]: heroFont, ["--lab-quote" as string]: quoteFont } as React.CSSProperties}>
        <section className="px-5 py-20 md:px-12 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.25em] text-paper/70">1 · The hero (undecided)</p>
          <h1 className="keep-hero mt-6 max-w-[11ch] text-[clamp(2.9rem,13vw,8.5rem)] font-light leading-[0.88] tracking-tight text-paper">
            Walk through the best art.
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-paper/80">
            At the Met, a painting gets 17 seconds. Quicklime shows you the details most people walk past, one at a time.
          </p>
        </section>

        <section className="px-5 py-16 md:px-12">
          <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-paper/70">2 · A story beat</p>
          <div className="max-w-lg rounded-3xl border border-paper/15 bg-paper/[0.05] p-6 md:p-8">
            <p className="mb-5 text-xs tracking-[0.25em] text-paper/60">03</p>
            <p className="font-display text-2xl leading-snug text-paper md:text-3xl">Look up. Three tall masts.</p>
            <p className="font-display text-2xl leading-snug text-paper md:text-3xl">Sails furled. Still half rigged.</p>
            <p className="mt-6 text-lg font-semibold text-lime">The Navy had stripped her masts. Turner painted them back.</p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-paper/70">The masts</p>
        </section>

        <section className="px-5 py-16 md:px-12">
          <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-paper/70">3 · The quote (undecided)</p>
          <blockquote className="keep-quote max-w-[24ch] text-[clamp(1.8rem,5vw,3.5rem)] font-light leading-[1.1] text-paper">
            “The flag which braved the battle and the breeze, / No longer owns her.”
          </blockquote>
          <p className="mt-4 max-w-[48ch] text-sm text-paper/70">
            Lines Turner showed with the painting at the Royal Academy, 1839, adapted from Thomas Campbell&apos;s Ye Mariners of England
          </p>
        </section>

        <section className="px-5 py-16 md:px-12">
          <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-paper/70">4 · Directory cards</p>
          <ul className="grid max-w-3xl grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {cards.map((c) => (
              <li key={c.slug}>
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <Painting image={c.image} alt={c.name} />
                </div>
                <p className="mt-3 font-display text-base leading-tight text-paper">{c.name}</p>
                <p className="text-xs text-paper/70">{c.years}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-5 py-16 md:px-12">
          <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-paper/70">5 · Facts (heist page)</p>
          <dl className="grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 md:grid-cols-2">
            {[
              ["When", "Early on Sunday, 18 March 1990"],
              ["Where", "The Isabella Stewart Gardner Museum, Boston"],
              ["Taken", "Thirteen works: three Rembrandts, a Vermeer, a Manet, five Degas works"],
              ["Outcome", "Unsolved. Nothing has been recovered"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-paper/60">{k}</dt>
                <dd className="mt-1 text-lg leading-snug text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="px-5 py-16 md:px-12">
          <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-paper/70">6 · Small text and look-alikes</p>
          <div className="max-w-xl space-y-3 text-paper/85">
            <p className="text-xs">12px: Il1 O0 rn m 6 9 a g. 17 seconds. $10,000,000. 1440px by 900px.</p>
            <p className="text-sm">14px: Il1 O0 rn m 6 9 a g. 17 seconds. $10,000,000. 1440px by 900px.</p>
            <p className="text-base">16px: Il1 O0 rn m 6 9 a g. 17 seconds. $10,000,000. 1440px by 900px.</p>
          </div>
        </section>

        <HeistFile />
      </div>
    </div>
  );
}
