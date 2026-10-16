import type { Story } from "../types";

/**
 * Charles Davidson Bell, The Landing of Van Riebeeck at the Cape of Good Hope
 * in 1652 (1850). Also catalogued as "Jan van Riebeeck Arrives in Table Bay in
 * April 1652". National Library of South Africa, Cape Town.
 * Every line here maps to an entry in docs/sources/charles-davidson-bell.md.
 *
 * Focus points are rough estimates from published descriptions of the
 * composition, not from the image itself. Tune them against the cleared image.
 *
 * The image width/height below are a placeholder 3:2 landscape ratio. The
 * canvas dimensions were not found this pass; replace with the documented
 * dimensions before launch.
 *
 * The quote is flagged in the sources file. It is the recorded name of the
 * 1851 award, and its exact wording varies between sources. Replace it with a
 * line from the Van Riebeeck journal (Thom edition) or Bell's own writing if
 * one can be verified.
 */
export const charlesDavidsonBell: Story = {
  slug: "charles-davidson-bell",
  title: "The Landing",
  year: "1850",
  image: {
    src: "/art/charles-davidson-bell.jpg",
    status: "pending",
    width: 1600,
    height: 1067,
  },
  cover: { kicker: "The Landing of Van Riebeeck at the Cape of Good Hope, 1652" },
  beats: [
    {
      kind: "beat",
      focus: { x: 50, y: 50, scale: 1 },
      lines: [
        "Table Bay. April 1652.",
        "Van Riebeeck comes ashore.",
        "Charles Bell paints it in 1850.",
        "198 years later.",
      ],
    },
    {
      kind: "beat",
      focus: { x: 50, y: 30, scale: 2.2 },
      lines: ["Dutch sailors.", "A flag going up.", "A claim, in one gesture."],
      caption: "The flag",
    },
    {
      kind: "beat",
      focus: { x: 22, y: 60, scale: 2.4 },
      lines: [
        "At the edge, the Khoikhoi.",
        "Bell has them watch.",
        "Not take part.",
      ],
      twist: "They had met Europeans long before 1652.",
      caption: "The watchers on the shore",
    },
    {
      kind: "beat",
      focus: { x: 52, y: 55, scale: 2.6 },
      lines: [
        "February 1851.",
        "Cape Town's first exhibition of fine art.",
        "Bell takes the gold medal.",
      ],
      caption: "Van Riebeeck",
    },
    {
      kind: "beat",
      focus: { x: 78, y: 35, scale: 2 },
      lines: [
        "Bell was not a full-time painter.",
        "He was the Cape's Surveyor-General.",
        "In 1853 he designs a stamp.",
        "Triangular. Africa's first.",
      ],
      caption: "Ships in Table Bay",
    },
  ],
  reveal: { lines: ["The whole landing.", "As Bell imagined it."] },
  quote: {
    text: "Best original history painting",
    attribution:
      "The gold medal it won at the Cape Town First Exhibition of Fine Art, February 1851",
  },
  close: {
    heading: "1952",
    lines: [
      "Three hundred years on.",
      "The landing is re-enacted in Granger Bay.",
      "History books reproduce Bell's version.",
      "It hangs in the National Library, Cape Town.",
    ],
  },
  sources: [
    {
      label: "UCT Libraries: Charles Davidson Bell digital collection",
      url: "https://digitalcollections.lib.uct.ac.za/bell",
    },
    {
      label: "UCT News: Colonial Cape artist exhibits at Irma Stern (2002)",
      url: "https://news.uct.ac.za/edition/-edition/2002-11-04-edition-33/-article/2002-11-04-colonial-cape-artist-exhibits-at-irma-stern",
    },
    {
      label: "de arte: After the Spectacle: the Jan van Riebeeck Tercentenary (2026)",
      url: "https://www.tandfonline.com/doi/full/10.1080/00043389.2026.2696083",
    },
    {
      label: "UCT News: The Khoi encountered Europeans long before Van Riebeeck (2021)",
      url: "https://www.news.uct.ac.za/article/-2021-09-22-the-khoi-encountered-europeans-long-before-van-riebeeck",
    },
    {
      label: "South African History Online: First postage stamp in Africa issued",
      url: "https://www.sahistory.org.za/dated-event/first-postage-stamp-africa-issued-cape-colony",
    },
    {
      label: "Wikipedia: Charles Davidson Bell",
      url: "https://en.wikipedia.org/wiki/Charles_Davidson_Bell",
    },
  ],
  showSources: true,
};
