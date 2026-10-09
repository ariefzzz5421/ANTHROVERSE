import type { ImageAsset } from "@/lib/types";

// Documentary object photographs. These are evidence and display objects,
// never speculative portraits of extinct species.
export const exhibitImages: Record<"sangiran" | "lucyCast", ImageAsset> = {
  sangiran: {
    src: "/exhibits/sangiran-calvarium.webp",
    alt: "Original Sangiran II Homo erectus calvarium on display at the Senckenberg Museum",
    credit: "Gerbil / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Calvaria_Sangiran_II_(C).jpg",
    note: "Original fossil specimen photographed in a museum. Image converted and resized to WebP.",
  },
  lucyCast: {
    src: "/exhibits/lucy-cast.webp",
    alt: "Museum cast of the Lucy Australopithecus afarensis skeleton, not the original fossil",
    credit: "Daderot / Wikimedia Commons",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Australopithecus_afarensis_(Lucy)_cast_-_Naturmuseum_Senckenberg_-_DSC02089.JPG",
    note: "Museum cast, not the original fossil. Image converted and resized to WebP.",
  },
};
