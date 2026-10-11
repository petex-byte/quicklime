/**
 * SVG refraction filter for glass cards. Chromium applies it through
 * `backdrop-filter: url(#glass)`; other engines fall back to plain blur
 * (see .glass in globals.css).
 */
export function GlassFilter() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <filter id="glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" result="refract" />
        <feGaussianBlur in="refract" stdDeviation="6" />
      </filter>
    </svg>
  );
}
