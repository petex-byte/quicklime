import Link from "next/link";
import { Painting } from "@/components/Painting";
import { getStory } from "@/content/stories";
import { getArtist } from "@/content/artists";
import { heists } from "@/content/heists";

/** Famous thefts of paintings on the site. Missing works show an empty frame. */
export function HeistFile() {
  const home = heists.filter((h) => h.recovered).length;
  const out = heists.length - home;
  return (
    <section id="heists" className="px-5 py-20 md:px-12 md:py-28" aria-labelledby="heist-title">
      <p className="text-[11px] uppercase tracking-[0.25em] text-paper/70">The heist file</p>
      <h2
        id="heist-title"
        className="mt-2 max-w-[18ch] font-display text-[clamp(2.4rem,9vw,5.5rem)] font-light leading-[1.02] text-paper text-balance"
      >
        A theft is the loudest review a painting ever gets.
      </h2>
      <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-paper/80">
        {heists.length} heists. {home} paintings came home. {out} are still out there.
      </p>

      <ol className="mt-12 grid gap-5 md:grid-cols-2">
        {heists.map((h, i) => {
          const story = h.slug ? getStory(h.slug) : undefined;
          const artist = h.slug ? getArtist(h.slug) : undefined;
          return (
            <li key={h.id} className="flex flex-col overflow-hidden rounded-3xl border border-paper/10 bg-paper/[0.03]">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                {h.recovered && story ? (
                  <div className="absolute inset-0">
                    <Painting image={story.image} alt={`${h.title}, recovered`} objectPosition={h.focus ?? "50% 30%"} sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#151513]">
                    {/* The empty frame: what the museum has instead. */}
                    <div className="h-[62%] w-[46%] rounded-sm border-[10px] border-[#6f5a35] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.5)]" />
                  </div>
                )}
                <span
                  className={
                    "absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] " +
                    (h.recovered ? "bg-paper text-ink" : "bg-lime text-ink")
                  }
                >
                  {h.recovered ? "Recovered" : "Still missing"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-paper/70">
                  {String(i + 1).padStart(2, "0")} · {h.place} · {h.date}
                </p>
                <h3 className="font-display text-3xl leading-none text-paper md:text-4xl">{h.title}</h3>
                <div className="flex flex-col gap-2 text-base leading-relaxed text-paper/85">
                  {h.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <p className="font-display text-xl leading-snug text-lime md:text-2xl">{h.twist}</p>
                <p className="text-sm text-paper/70">{h.status}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-paper/10 pt-4">
                  {story && artist && (
                    <Link
                      href={`/artists/${h.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-paper hover:text-lime"
                    >
                      {h.linkLabel ?? `Read ${story.title}`} <span aria-hidden>→</span>
                    </Link>
                  )}
                  <span className="flex flex-wrap gap-x-3 text-xs text-paper/60">
                    {h.sources.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                      >
                        {s.label}
                      </a>
                    ))}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
