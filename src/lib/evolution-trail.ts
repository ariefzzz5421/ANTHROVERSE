import { getSources, species, timelineEvents } from "@/lib/content";
import { exhibitImages } from "@/lib/exhibit-images";
import { formatYears } from "@/lib/time";
import type { ImageAsset } from "@/lib/types";

export type EvolutionEvidenceNode = {
  id: string;
  title: string;
  group: string;
  age: string;
  period: string;
  finding: string;
  caveat: string;
  image: ImageAsset;
  href: string;
  sources: { title: string; url: string }[];
};

const sourceLinks = (ids: string[]) =>
  getSources(ids).map(({ title, url }) => ({ title, url }));
const event = (id: string) => timelineEvents.find((item) => item.id === id)!;
const lineage = (slug: string) => species.find((item) => item.slug === slug)!;

const tiktaalik = event("tiktaalik");
const aegyptopithecus = event("aegyptopithecus");
const sahelanthropus = lineage("sahelanthropus-tchadensis");
const afarensis = lineage("australopithecus-afarensis");
const erectus = lineage("homo-erectus");
const sapiens = lineage("homo-sapiens");
const neanderthal = lineage("homo-neanderthalensis");

export const evolutionTrail: EvolutionEvidenceNode[] = [
  {
    id: tiktaalik.id,
    title: "Tiktaalik roseae",
    group: "Early vertebrate relatives",
    age: formatYears(tiktaalik.yearsAgo),
    period: "Late Devonian",
    finding: "Its fossil combines fish traits with bones that help explain the later evolution of limbs.",
    caveat: "A relative near this transition, not a proven direct human ancestor.",
    image: exhibitImages.tiktaalikDisplay,
    href: "/timeline?event=tiktaalik",
    sources: sourceLinks(tiktaalik.sourceIds),
  },
  {
    id: aegyptopithecus.id,
    title: "Aegyptopithecus zeuxis",
    group: "Early catarrhine primates",
    age: formatYears(aegyptopithecus.yearsAgo),
    period: "Early Oligocene",
    finding: "Skulls from Egypt document an early branch near the later history of monkeys and apes.",
    caveat: "Its precise place among later branches is inferred from fossils, not a known parent–child link.",
    image: exhibitImages.aegyptopithecusDisplay,
    href: "/timeline?event=aegyptopithecus",
    sources: sourceLinks(aegyptopithecus.sourceIds),
  },
  {
    id: sahelanthropus.id,
    title: sahelanthropus.title,
    group: "Early hominin candidate",
    age: formatYears(sahelanthropus.dateRange[0]),
    period: `${formatYears(sahelanthropus.dateRange[0])}–${formatYears(sahelanthropus.dateRange[1])}`,
    finding: "A skull from Chad places early hominin candidates beyond East Africa.",
    caveat: "Whether it belongs on the human side of the split remains debated.",
    image: exhibitImages.sahelanthropusCast,
    href: `/evolution/${sahelanthropus.slug}`,
    sources: sourceLinks(sahelanthropus.sourceIds),
  },
  {
    id: afarensis.id,
    title: afarensis.title,
    group: "Australopithecines",
    age: formatYears(afarensis.dateRange[0]),
    period: `${formatYears(afarensis.dateRange[0])}–${formatYears(afarensis.dateRange[1])}`,
    finding: "Lucy's skeleton is evidence of a species that regularly walked upright.",
    caveat: "The photograph shows a cast. Direct ancestry to later Homo is not established.",
    image: exhibitImages.lucyCast,
    href: `/evolution/${afarensis.slug}`,
    sources: sourceLinks(afarensis.sourceIds),
  },
  {
    id: erectus.id,
    title: erectus.title,
    group: "Widespread Homo lineage",
    age: formatYears(erectus.dateRange[0]),
    period: `${formatYears(erectus.dateRange[0])}–${formatYears(erectus.dateRange[1])}`,
    finding: "Fossils across Africa and Asia include important finds from Java.",
    caveat: "A varied, long-lived lineage; no single fossil proves a direct line to us.",
    image: exhibitImages.sangiran,
    href: `/evolution/${erectus.slug}`,
    sources: sourceLinks(erectus.sourceIds),
  },
  {
    id: sapiens.id,
    title: sapiens.title,
    group: "Our living species",
    age: formatYears(sapiens.dateRange[0]),
    period: `${formatYears(sapiens.dateRange[0])}–present`,
    finding: "Our species emerged in Africa and overlapped with other human lineages.",
    caveat: "The photograph shows a recent human skull, not the earliest Homo sapiens fossil.",
    image: exhibitImages.sapiensSkull,
    href: `/evolution/${sapiens.slug}`,
    sources: sourceLinks([...sapiens.sourceIds, "smith-genetics"]),
  },
];

export const parallelBranch: EvolutionEvidenceNode = {
  id: neanderthal.id,
  title: neanderthal.title,
  group: "Parallel human lineage",
  age: formatYears(neanderthal.dateRange[0]),
  period: `${formatYears(neanderthal.dateRange[0])}–${formatYears(neanderthal.dateRange[1])}`,
  finding: "Neanderthals and Homo sapiens shared an older ancestor, coexisted, and sometimes interbred.",
  caveat: "A sister branch, not a stage that turned into Homo sapiens.",
  image: exhibitImages.neanderthalCast,
  href: `/evolution/${neanderthal.slug}`,
  sources: sourceLinks(neanderthal.sourceIds),
};
