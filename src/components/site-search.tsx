"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  species,
  cultureTopics,
  timelineEvents,
  behaviorTheories,
  researchers,
  fossilSites,
  simulationEntries,
  comparisons,
  learningPath,
} from "@/lib/content";
const entries = [
  ...species.map((x) => ({
    ...x,
    url: `/evolution/${x.slug}`,
    group: "Species",
  })),
  ...cultureTopics.map((x) => ({
    ...x,
    url: `/cultures/${x.slug}`,
    group: "Culture",
  })),
  ...timelineEvents.map((x) => ({
    ...x,
    url: `/timeline?event=${x.id}`,
    group: "Timeline",
  })),
  ...behaviorTheories.map((x) => ({
    ...x,
    url: `/behavior/${x.slug}`,
    group: "Behavior",
  })),
  ...researchers.map((x) => ({
    ...x,
    url: `/library/${x.slug}`,
    group: "Researcher",
  })),
  ...fossilSites.map((x) => ({
    ...x,
    url: `/migration?site=${x.slug}`,
    group: "Site",
  })),
  ...simulationEntries.map((x) => ({
    ...x,
    url: `/simulations?model=${x.id}`,
    group: "Simulation",
  })),
  ...comparisons.map((x) => ({
    ...x,
    url: `/compare?topic=${x.id}`,
    group: "Comparison",
  })),
  ...learningPath.map(([title, url], index) => ({
    id: `lesson-${index + 1}`,
    title,
    summary: "Guided learning module",
    category: "learning",
    url,
    group: "Learning",
  })),
];
export function SiteSearch() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const result = useMemo(
    () =>
      entries.filter(
        (x) =>
          (group === "all" || x.group === group) &&
          (x.title + " " + x.summary + " " + x.category)
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, group],
  );
  return (
    <>
      <div className="filter-row">
        <label className="search-field">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search species, culture, places, ideas…"
            aria-label="Search museum"
          />
        </label>
        <select
          className="select"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          aria-label="Filter search category"
        >
          {[
            "all",
            "Species",
            "Culture",
            "Timeline",
            "Behavior",
            "Researcher",
            "Site",
            "Simulation",
            "Comparison",
            "Learning",
          ].map((x) => (
            <option value={x} key={x}>
              {x === "all" ? "All collections" : x}
            </option>
          ))}
        </select>
      </div>
      <p className="small-note">
        {result.length} {result.length === 1 ? "result" : "results"}. Search
        covers the locally curated museum catalog.
      </p>
      <div className="search-results">
        {result.slice(0, 80).map((x) => (
          <Link
            href={x.url}
            prefetch={false}
            key={`${x.group}:${x.id}`}
            className="search-result"
          >
            <span className="eyebrow">{x.group}</span>
            <strong>{x.title}</strong>
            <p>{x.summary}</p>
            <span>Explore →</span>
          </Link>
        ))}
      </div>
      {result.length === 0 && (
        <div className="empty">
          No matches. Try a broader term, a different category, or a species
          name.
        </div>
      )}
      {result.length > 80 && (
        <p className="small-note">
          Showing the first 80 results. Narrow your search to see more.
        </p>
      )}
    </>
  );
}
