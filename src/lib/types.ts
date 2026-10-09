import { z } from "zod";
export const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  publisher: z.string(),
  published: z.string().optional(),
  url: z.url(),
  evidenceType: z.string(),
  confidence: z.enum(["high", "medium", "debated"]),
  reviewed: z.string(),
});
export type Source = z.infer<typeof sourceSchema>;
export type EvidenceStatus =
  "established" | "estimated" | "debated" | "illustrative";
export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
  credit: string;
  license: string;
  sourceUrl?: string;
  licenseUrl?: string;
  note?: string;
};
export type BaseItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  sourceIds: string[];
  evidenceStatus: EvidenceStatus;
  images: ImageAsset[];
  relatedIds: string[];
  updated: string;
};
export type Era = BaseItem & { startYearsAgo: number; endYearsAgo: number };
export type TimelineEvent = BaseItem & {
  yearsAgo: number;
  range?: [number, number];
  eraId: string;
  kind: "life" | "biology" | "culture" | "society" | "technology";
  speciesIds: string[];
};
export type Species = BaseItem & {
  scientificName: string;
  dateRange: [number, number];
  region: string;
  classification: string;
  discovery: string;
  specimens: string;
  anatomy: string;
  brainVolume: string;
  behavior: string;
  debate: string;
  parentHypothesis?: string;
};
export type FossilSite = BaseItem & {
  coordinates: [number, number];
  region: string;
  /** Oldest approximate evidence shown by the time filter, not an exact fossil date. */
  yearsAgo?: number;
  speciesIds: string[];
};
export type MigrationRoute = BaseItem & {
  from: [number, number];
  to: [number, number];
  timeRange: [number, number];
  speciesIds: string[];
  uncertainty: string;
};
export type Civilization = BaseItem & {
  dateRange?: [number, number];
  region: string;
};
export type CultureTopic = BaseItem & {
  historical: string;
  concepts: string[];
  researchers: string[];
  caseStudy: string;
  modern: string;
  limitations: string;
  diagram: string;
};
export type BehaviorTheory = BaseItem & {
  discipline: string;
  why: string;
  finding: string;
  interpretation: string;
  caseStudy: string;
  limitations: string;
};
export type Researcher = BaseItem & {
  field: string;
  years: string;
  contributions: string;
  publications: string[];
  critique: string;
};
export type Publication = BaseItem & {
  author: string;
  year: string;
  url: string;
};
export type Simulation = BaseItem & {
  assumptions: string[];
  controls: string[];
};
export type ComparisonTopic = BaseItem & {
  past: string;
  present: string;
  similarities: string;
  tradeoffs: string;
};

const deepTime = z.number().finite().nonnegative().max(4_600_000_000);
const coordinates = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);
const dateRange = z
  .tuple([deepTime, deepTime])
  .refine(([older, younger]) => older >= younger, "Older date must come first");
const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1).optional(),
  credit: z.string().min(1),
  license: z.string().min(1),
  sourceUrl: z.url().optional(),
  licenseUrl: z.url().optional(),
  note: z.string().optional(),
});
const baseSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  sourceIds: z.array(z.string().min(1)),
  evidenceStatus: z.enum([
    "established",
    "estimated",
    "debated",
    "illustrative",
  ]),
  images: z.array(imageSchema),
  relatedIds: z.array(z.string().min(1)),
  updated: z.iso.date(),
});

export const contentSchemas = {
  era: baseSchema
    .extend({ startYearsAgo: deepTime, endYearsAgo: deepTime })
    .refine(
      ({ startYearsAgo, endYearsAgo }) => startYearsAgo >= endYearsAgo,
      "Era start must be older than era end",
    ),
  timelineEvent: baseSchema.extend({
    yearsAgo: deepTime,
    range: dateRange.optional(),
    eraId: z.string().min(1),
    kind: z.enum(["life", "biology", "culture", "society", "technology"]),
    speciesIds: z.array(z.string()),
  }),
  species: baseSchema.extend({
    scientificName: z.string().min(1),
    dateRange,
    region: z.string().min(1),
    classification: z.string().min(1),
    discovery: z.string().min(1),
    specimens: z.string().min(1),
    anatomy: z.string().min(1),
    brainVolume: z.string().min(1),
    behavior: z.string().min(1),
    debate: z.string().min(1),
    parentHypothesis: z.string().optional(),
  }),
  fossilSite: baseSchema.extend({
    coordinates,
    region: z.string().min(1),
    yearsAgo: deepTime.optional(),
    speciesIds: z.array(z.string()),
  }),
  migrationRoute: baseSchema.extend({
    from: coordinates,
    to: coordinates,
    timeRange: dateRange,
    speciesIds: z.array(z.string()),
    uncertainty: z.string().min(1),
  }),
  civilization: baseSchema.extend({
    dateRange: dateRange.optional(),
    region: z.string().min(1),
  }),
  cultureTopic: baseSchema.extend({
    historical: z.string().min(1),
    concepts: z.array(z.string().min(1)).min(1),
    researchers: z.array(z.string().min(1)),
    caseStudy: z.string().min(1),
    modern: z.string().min(1),
    limitations: z.string().min(1),
    diagram: z.string().min(1),
  }),
  behaviorTheory: baseSchema.extend({
    discipline: z.string().min(1),
    why: z.string().min(1),
    finding: z.string().min(1),
    interpretation: z.string().min(1),
    caseStudy: z.string().min(1),
    limitations: z.string().min(1),
  }),
  researcher: baseSchema.extend({
    field: z.string().min(1),
    years: z.string().min(1),
    contributions: z.string().min(1),
    publications: z.array(z.string().min(1)),
    critique: z.string().min(1),
  }),
  publication: baseSchema.extend({
    author: z.string().min(1),
    year: z.string().min(1),
    url: z.url(),
  }),
  simulation: baseSchema.extend({
    assumptions: z.array(z.string().min(1)).min(1),
    controls: z.array(z.string().min(1)).min(1),
  }),
  comparisonTopic: baseSchema.extend({
    past: z.string().min(1),
    present: z.string().min(1),
    similarities: z.string().min(1),
    tradeoffs: z.string().min(1),
  }),
};
