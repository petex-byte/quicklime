import Link from "next/link";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="font-display text-xl tracking-tight text-paper">
        quicklime<span className="text-lime">.</span>
      </Link>
      <nav className="flex gap-6 text-sm text-paper/80">
        <Link href="/artists" className="hover:text-paper">
          Artists
        </Link>
      </nav>
    </header>
  );
}
