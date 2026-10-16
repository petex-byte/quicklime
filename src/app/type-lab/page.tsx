import type { Metadata } from "next";
import { getStory } from "@/content/stories";
import { TypeLab } from "./TypeLab";

export const metadata: Metadata = {
  title: "Type lab",
  robots: { index: false, follow: false },
};

const FAMILIES = [
  "Fraunces:opsz,wght@9..144,300..700",
  "Inter:wght@300..700",
  "Public+Sans:wght@300..700",
  "IBM+Plex+Sans:wght@300;400;500;600",
  "Geist:wght@300..700",
  "Onest:wght@300..700",
  "Space+Grotesk:wght@300..700",
  "DM+Mono:wght@300;400;500",
  "Geist+Mono:wght@300..700",
  "IBM+Plex+Mono:wght@300;400;500",
];

const CARDS = [
  { slug: "rembrandt", name: "Rembrandt van Rijn", years: "1606 to 1669" },
  { slug: "johannes-vermeer", name: "Johannes Vermeer", years: "1632 to 1675" },
  { slug: "edvard-munch", name: "Edvard Munch", years: "1863 to 1944" },
];

export default function TypeLabPage() {
  const cards = CARDS.flatMap((c) => {
    const s = getStory(c.slug);
    return s ? [{ ...c, image: s.image }] : [];
  });
  return (
    <>
      {/* Lab only: loads every candidate family so the controls can switch live. */}
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?${FAMILIES.map((f) => `family=${f}`).join("&")}&display=swap`}
        precedence="default"
      />
      <TypeLab cards={cards} />
    </>
  );
}
