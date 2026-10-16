import Link from "next/link";

const year = new Date().getFullYear();

/** Site-wide footer. No newsletter or third-party embeds: no running costs. */
export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 md:px-12 md:pt-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <p className="max-w-[30ch] font-display text-2xl leading-snug text-paper md:text-3xl">
            Great paintings, one detail at a time.
          </p>
          <p className="max-w-[44ch] text-sm leading-relaxed text-paper/70">
            Every painting is out of copyright. Every story shows its sources, so you can check our homework.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col">
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-paper/70">Explore</p>
          <Link href="/" className="flex min-h-11 items-center text-paper/85 hover:text-lime">Home</Link>
          <Link href="/artists" className="flex min-h-11 items-center text-paper/85 hover:text-lime">All painters</Link>
          <Link href="/#heists" className="flex min-h-11 items-center text-paper/85 hover:text-lime">The heist file</Link>
        </nav>
        <div className="flex flex-col">
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-paper/70">Start here</p>
          <Link href="/artists/katsushika-hokusai" className="flex min-h-11 items-center text-paper/85 hover:text-lime">The Great Wave</Link>
          <Link href="/artists/johannes-vermeer" className="flex min-h-11 items-center text-paper/85 hover:text-lime">The Pearl</Link>
          <Link href="/artists/rembrandt" className="flex min-h-11 items-center text-paper/85 hover:text-lime">The Storm</Link>
        </div>
      </div>

      <p
        aria-hidden
        className="mt-16 select-none font-display text-[clamp(4.5rem,24vw,22rem)] leading-[0.8] tracking-tight text-paper/[0.08]"
      >
        quicklime<span className="text-lime/60">.</span>
      </p>

      <div className="mt-6 flex flex-col gap-1 text-xs text-paper/60 md:flex-row md:justify-between">
        <span>© {year} Quicklime · quicklime.co.za</span>
        <span>Painting images: public domain, via the museums and Wikimedia Commons</span>
      </div>
    </footer>
  );
}
