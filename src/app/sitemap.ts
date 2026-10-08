import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import {
  species,
  cultureTopics,
  behaviorTheories,
  researchers,
} from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const routes = [
    "",
    "/timeline",
    "/evolution",
    "/cultures",
    "/migration",
    "/behavior",
    "/simulations",
    "/compare",
    "/library",
    "/learn",
    "/search",
    "/sources",
    ...species.map((x) => `/evolution/${x.slug}`),
    ...cultureTopics.map((x) => `/cultures/${x.slug}`),
    ...behaviorTheories.map((x) => `/behavior/${x.slug}`),
    ...researchers.map((x) => `/library/${x.slug}`),
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: "2026-10-08",
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
