import type { Story } from "../types";
import { imageFor } from "../images";
import { albrechtDurer } from "./albrecht-durer";
import { artemisiaGentileschi } from "./artemisia-gentileschi";
import { caravaggio } from "./caravaggio";
import { claudeMonet } from "./claude-monet";
import { edvardMunch } from "./edvard-munch";
import { georgesSeurat } from "./georges-seurat";
import { gustavKlimt } from "./gustav-klimt";
import { hieronymusBosch } from "./hieronymus-bosch";
import { janVanEyck } from "./jan-van-eyck";
import { jmwTurner } from "./jmw-turner";
import { johannesVermeer } from "./johannes-vermeer";
import { katsushikaHokusai } from "./katsushika-hokusai";
import { leonardoDaVinci } from "./leonardo-da-vinci";
import { maryCassatt } from "./mary-cassatt";
import { michelangelo } from "./michelangelo";
import { paulCezanne } from "./paul-cezanne";
import { paulGauguin } from "./paul-gauguin";
import { pierreAugusteRenoir } from "./pierre-auguste-renoir";
import { rembrandt } from "./rembrandt";
import { sandroBotticelli } from "./sandro-botticelli";
import { vincentVanGogh } from "./vincent-van-gogh";
import { wassilyKandinsky } from "./wassily-kandinsky";
import { pieterBruegel } from "./pieter-bruegel";
import { elGreco } from "./el-greco";
import { titian } from "./titian";
import { diegoVelazquez } from "./diego-velazquez";
import { franciscoGoya } from "./francisco-goya";
import { jacquesLouisDavid } from "./jacques-louis-david";
import { rosaBonheur } from "./rosa-bonheur";
import { gustaveCourbet } from "./gustave-courbet";
import { edouardManet } from "./edouard-manet";
import { henriRousseau } from "./henri-rousseau";
import { winslowHomer } from "./winslow-homer";
import { amedeoModigliani } from "./amedeo-modigliani";

/**
 * Stories that have passed research + voice review. Add one per artist.
 *
 * Held back (drafts exist, not registered):
 * - edgar-degas: quote unverified, hook single-sourced
 * - charles-davidson-bell: quote is a medal name, not anyone's words
 * - thomas-baines: no work pinned to a holder yet (docs/sources/thomas-baines.md)
 */
const all: Story[] = [
  janVanEyck,
  sandroBotticelli,
  hieronymusBosch,
  leonardoDaVinci,
  albrechtDurer,
  michelangelo,
  titian,
  pieterBruegel,
  elGreco,
  caravaggio,
  artemisiaGentileschi,
  diegoVelazquez,
  rembrandt,
  johannesVermeer,
  franciscoGoya,
  jacquesLouisDavid,
  katsushikaHokusai,
  jmwTurner,
  gustaveCourbet,
  rosaBonheur,
  edouardManet,
  winslowHomer,
  paulCezanne,
  claudeMonet,
  pierreAugusteRenoir,
  henriRousseau,
  maryCassatt,
  paulGauguin,
  vincentVanGogh,
  georgesSeurat,
  gustavKlimt,
  edvardMunch,
  wassilyKandinsky,
  amedeoModigliani,
];

export const stories: Record<string, Story> = Object.fromEntries(
  all.map((s) => [s.slug, { ...s, image: imageFor(s.slug) ?? s.image }]),
);

export function getStory(slug: string): Story | undefined {
  return stories[slug];
}
