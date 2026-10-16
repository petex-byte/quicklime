import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Painting } from "@/components/Painting";
import { getStory } from "@/content/stories";
import { heists } from "@/content/heists";

export const dynamicParams = false;

export function generateStaticParams() {
  return heists.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const h = heists.find((x) => x.id === id);
  if (!h) return {};
  return { title: `${h.title}: the heist file`, description: h.file.standfirst };
}

function Refs({ src }: { src: number[] }) {
  return (
    <sup className="ml-1 whitespace-nowrap text-[11px] text-lime">
      {src.map((n, i) => (
        <span key={n}>
          {i > 0 && ", "}
          <a href={`#source-${n}`} className="underline-offset-2 hover:underline">
            {n}
          </a>
        </span>
      ))}
    </sup>
  );
}

export default async function HeistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const i = heists.findIndex((x) => x.id === id);
  if (i < 0) notFound();
  const h = heists[i];
  const next = heists[(i + 1) % heists.length];
  const story = h.slug ? getStory(h.slug) : undefined;
  const f = h.file;

  return (
    <>
      <SiteNav />
      <main className="px-5 pb-24 pt-28 md:px-12 md:pt-36">
        <Link href="/#heists" className="inline-flex min-h-11 items-center text-sm text-paper/70 hover:text-lime">
          <span aria-hidden className="mr-2">←</span> The heist file
        </Link>

        <header className="mt-4 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-paper/70">
              {h.place} · {h.date}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.8rem,10vw,7rem)] font-light leading-[0.95] text-paper">
              {h.title}
            </h1>
            <p className="mt-6 max-w-[34ch] font-display text-2xl leading-snug text-lime md:text-3xl">{f.standfirst}</p>
            <p className="mt-6">
              <span
                className={
                  "rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] " +
                  (h.recovered ? "bg-paper text-ink" : "bg-lime text-ink")
                }
              >
                {h.recovered ? "Recovered" : "Still missing"}
              </span>
              {h.status !== "Still missing" && <span className="ml-3 text-sm text-paper/70">{h.status}</span>}
            </p>
          </div>

          <figure>
            <div className="relative flex h-[min(62svh,34rem)] items-center justify-center overflow-hidden rounded-3xl border border-paper/10 bg-[#151513]">
              {f.showPainting && story ? (
                <Painting image={story.image} alt={f.pictureCaption} fit="contain" priority sizes="(max-width: 768px) 100vw, 45vw" />
              ) : (
                <div className="h-[62%] w-[46%] rounded-sm border-[10px] border-[#6f5a35] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.5)]" />
              )}
            </div>
            <figcaption className="mt-3 text-sm text-paper/70">{f.pictureCaption}</figcaption>
          </figure>
        </header>

        <section aria-labelledby="facts" className="mt-20">
          <h2 id="facts" className="text-[11px] uppercase tracking-[0.25em] text-paper/70">The facts</h2>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 md:grid-cols-2">
            {f.facts.map((x) => (
              <div key={x.k} className="bg-ink p-5 md:[&:last-child:nth-child(odd)]:col-span-2">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-paper/60">{x.k}</dt>
                <dd className="mt-1 text-lg leading-snug text-paper">{x.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="timeline" className="mt-20 max-w-3xl">
          <h2 id="timeline" className="text-[11px] uppercase tracking-[0.25em] text-paper/70">How it went</h2>
          <ol className="mt-6 border-l border-paper/15">
            {f.timeline.map((t) => (
              <li key={t.when} className="relative pb-9 pl-6 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-lime" />
                <p className="text-sm uppercase tracking-[0.18em] text-lime">{t.when}</p>
                <p className="mt-2 text-lg leading-relaxed text-paper/90">
                  {t.text}
                  <Refs src={t.src} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="twist" className="mt-20 max-w-3xl">
          <h2 id="twist" className="text-[11px] uppercase tracking-[0.25em] text-paper/70">The twist</h2>
          <p className="mt-4 font-display text-3xl leading-snug text-paper md:text-4xl">{h.twist}</p>
        </section>

        <section aria-labelledby="after" className="mt-20 max-w-3xl">
          <h2 id="after" className="text-[11px] uppercase tracking-[0.25em] text-paper/70">What came after</h2>
          <div className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-paper/90">
            {f.after.map((a) => (
              <p key={a.text}>
                {a.text}
                <Refs src={a.src} />
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="caveats" className="mt-20 max-w-3xl rounded-2xl border border-paper/10 bg-paper/[0.03] p-6 md:p-8">
          <h2 id="caveats" className="text-[11px] uppercase tracking-[0.25em] text-paper/70">Where the sources disagree, and what we left out</h2>
          <ul className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-paper/85">
            {f.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sources" className="mt-20 max-w-3xl">
          <h2 id="sources" className="text-[11px] uppercase tracking-[0.25em] text-paper/70">Sources</h2>
          <ol className="mt-4 flex flex-col">
            {h.sources.map((s, n) => (
              <li key={s.url} id={`source-${n + 1}`} className="flex gap-3 py-1 text-paper/85">
                <span className="w-5 shrink-0 text-lime">{n + 1}</span>
                <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <nav aria-label="More" className="mt-20 flex flex-col gap-4 border-t border-paper/10 pt-8 md:flex-row md:justify-between">
          {story && h.slug && (
            <Link href={`/artists/${h.slug}`} className="inline-flex min-h-11 items-center text-paper hover:text-lime">
              {h.linkLabel ?? `Read ${story.title}`} <span aria-hidden className="ml-2">→</span>
            </Link>
          )}
          <Link href={`/heists/${next.id}`} className="inline-flex min-h-11 items-center text-paper hover:text-lime">
            Next heist: {next.title} <span aria-hidden className="ml-2">→</span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
