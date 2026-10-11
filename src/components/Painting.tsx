import clsx from "clsx";
import type { ArtImage } from "@/content/types";

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
}: {
  image?: ArtImage;
  alt: string;
  className?: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  if (image?.status === "cleared") {
    return (
      // Plain <img>: the source files are pre-sized and served from /public.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.src}
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
