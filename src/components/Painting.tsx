import clsx from "clsx";
import type { ArtImage } from "@/content/types";

/** /art/x.jpg → the w800/w1400 copies written by scripts/make-sizes.mjs, plus the 2400px original. */
export function srcSet(src: string) {
  const m = src.match(/^\/art\/([^/]+\.jpg)$/);
  if (!m) return undefined;
  return `/art/w800/${m[1]} 800w, /art/w1400/${m[1]} 1400w, ${src} 2400w`;
}

/**
 * Renders an artwork only when its rights check is cleared. Anything else
 * gets a neutral canvas-toned placeholder, so an unchecked file can never
 * ship by accident.
 */
export function Painting({
  image,
  alt,
  className,
  objectPosition,
  fit = "cover",
  priority,
  sizes = "100vw",
}: {
  image?: ArtImage;
  alt: string;
  className?: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  /** Rendered width hint for the browser's srcset choice. */
  sizes?: string;
}) {
  if (image?.status === "cleared") {
    return (
      // Plain <img>: the source files are pre-sized and served from /public.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.src}
        srcSet={srcSet(image.src)}
        sizes={sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={clsx("h-full w-full", fit === "cover" ? "object-cover" : "object-contain", className)}
        style={{ objectPosition }}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (image pending rights check)`}
      className={clsx("canvas-placeholder h-full w-full", className)}
    />
  );
}
