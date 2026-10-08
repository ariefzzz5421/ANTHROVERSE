"use client";
import { useState } from "react";
import Link from "next/link";
import { species, formatYears } from "@/lib/content";
export function SpeciesExplorer() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const regions = ["all", "Africa", "Asia", "Europe", "Indonesia"];
  const filtered = species.filter(
    (s) =>
      (region === "all" || s.region.includes(region)) &&
      (s.title + " " + s.region + " " + s.summary)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function toggle(id: string) {
    setSelected((v) =>
      v.includes(id)
        ? v.filter((x) => x !== id)
        : v.length < 4
          ? [...v, id]
          : v,
    );
  }
  return (
    <>
      <div className="filter-row">
        <input
          className="field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a lineage or place"
          aria-label="Search species"
        />
        <select
          className="select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label="Filter by region"
        >
          {regions.map((r) => (
            <option value={r} key={r}>
              {r === "all" ? "All regions" : r}
            </option>
          ))}
        </select>
      </div>
      <p className="small-note">
        Select 2–4 species for a comparison. Dates and classifications are
        approximate.
      </p>
      <div className="card-grid">
        {filtered.map((s) => (
          <article className="exhibit-card species-card" key={s.id}>
            <div className="species-card-top">
              <span className="eyebrow">{s.classification}</span>
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(s.id)}
                  onChange={() => toggle(s.id)}
                  disabled={!selected.includes(s.id) && selected.length >= 4}
                />{" "}
                Compare
              </label>
            </div>
            <Link href={`/evolution/${s.slug}`} prefetch={false}>
              <h3>
                <em>{s.title}</em>
              </h3>
              <p>{s.region}</p>
              <span className="tag">
                {formatYears(s.dateRange[0])} – {formatYears(s.dateRange[1])}
              </span>
              <span className="card-cta">View evidence →</span>
            </Link>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty">
          No matching species. Try another term or region.
        </div>
      )}
      {selected.length >= 2 && (
        <div className="comparison-table-wrap">
          <h2 className="serif">Lineage comparison</h2>
          <div
            className="comparison-table"
            role="table"
            aria-label="Species comparison"
          >
            <div className="comparison-row" role="row">
              <strong>Attribute</strong>
              {selected.map((id) => (
                <strong key={id}>
                  {species.find((s) => s.id === id)?.title}
                </strong>
              ))}
            </div>
            {[
              [
                "Time",
                (s: (typeof species)[number]) =>
                  `${formatYears(s.dateRange[0])}–${formatYears(s.dateRange[1])}`,
              ],
              ["Region", (s: (typeof species)[number]) => s.region],
              ["Anatomy", (s: (typeof species)[number]) => s.anatomy],
              ["Behavior", (s: (typeof species)[number]) => s.behavior],
              ["Open question", (s: (typeof species)[number]) => s.debate],
            ].map(([label, fn]) => (
              <div className="comparison-row" role="row" key={label as string}>
                <b>{label as string}</b>
                {selected.map((id) => (
                  <span key={id}>
                    {(fn as (s: (typeof species)[number]) => string)(
                      species.find((s) => s.id === id)!,
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
