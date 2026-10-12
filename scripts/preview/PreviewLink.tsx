import type { AnchorHTMLAttributes } from "react";

/** Flat, relative file names so the static preview works under any sub-path. */
function flat(href: string) {
  if (href === "/") return "home.html";
  if (href === "/artists") return "artists.html";
  const m = href.match(/^\/artists\/([^/]+)$/);
  return m ? `artist-${m[1]}.html` : href;
}

export default function Link({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={flat(href)} {...rest} />;
}
