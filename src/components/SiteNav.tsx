"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

/** Transparent over the hero; picks up a backing once the page scrolls under it. */
export function SiteNav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 pb-4 pt-[calc(env(safe-area-inset-top,0px)+1.1rem)] transition-colors duration-300 md:px-10",
        solid ? "bg-ink/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
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
