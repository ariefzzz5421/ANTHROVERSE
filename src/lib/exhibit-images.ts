import type { ImageAsset } from "@/lib/types";

// Documentary object photographs. These are evidence and display objects,
// never speculative portraits of extinct species.
export const exhibitImages: Record<
  | "sangiran"
  | "lucyCast"
  | "tiktaalikDisplay"
  | "aegyptopithecusDisplay"
  | "sahelanthropusCast"
  | "neanderthalCast"
  | "sapiensSkull",
  ImageAsset
> = {
  sangiran: {
    src: "/exhibits/sangiran-calvarium.webp",
    alt: "Original Sangiran II Homo erectus calvarium on display at the Senckenberg Museum",
    caption: "Sangiran II · original Homo erectus fossil from Java",
    credit: "Gerbil / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Calvaria_Sangiran_II_(C).jpg",
  },
  lucyCast: {
    src: "/exhibits/lucy-cast.webp",
    alt: "Museum cast of the Lucy Australopithecus afarensis skeleton, not the original fossil",
    caption: "Lucy · museum cast, not the original fossil",
    credit: "Daderot / Wikimedia Commons",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Australopithecus_afarensis_(Lucy)_cast_-_Naturmuseum_Senckenberg_-_DSC02089.JPG",
  },
  tiktaalikDisplay: {
    src: "/exhibits/tiktaalik.webp",
    alt: "Museum display labeled Tiktaalik roseae showing a fish-like fossil form",
    caption: "Tiktaalik · photographed museum display",
    credit: "Ghedoghedo / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiktaalik_roseae.jpg",
    note: "Original or cast not specified.",
  },
  aegyptopithecusDisplay: {
    src: "/exhibits/aegyptopithecus.webp",
    alt: "Aegyptopithecus skull and jaw displayed at the University of Zurich anthropology museum",
    caption: "Aegyptopithecus · museum skull and jaw display",
    credit: "Guérin Nicolas / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aegyptopithecus_skull_(University_of_Zurich)-1.JPG",
    note: "Original or cast not specified.",
  },
  sahelanthropusCast: {
    src: "/exhibits/sahelanthropus.webp",
    alt: "Cast of the Toumaï Sahelanthropus tchadensis cranium",
    caption: "Toumaï · cast of a Sahelanthropus skull",
    credit: "Didier Descouens / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sahelanthropus_tchadensis_-_TM_266-01-060-1.jpg",
  },
  neanderthalCast: {
    src: "/exhibits/neanderthal.webp",
    alt: "Cast of the Neanderthal 1 skullcap in Göteborgs Naturhistoriska Museum",
    caption: "Neanderthal 1 · skullcap cast",
    credit: "Gunnar Creutz / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Homo_neanderthalensis_(cast_of_Neanderthal_1_skullcap)_at_G%C3%B6teborgs_Naturhistoriska_Museum_8790.jpg",
  },
  sapiensSkull: {
    src: "/exhibits/sapiens.webp",
    alt: "Homo sapiens skull photographed at Naturmuseum Augsburg",
    caption: "Homo sapiens · recent skull specimen",
    credit: "Tiia Monto / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Homo_sapiens_skull.jpg",
    note: "Recent specimen, not an early fossil.",
  },
};
