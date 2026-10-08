"use client";
import { useState } from "react";
import Link from "next/link";
import { researchers } from "@/lib/content";
export function LibraryExplorer() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const groups = [
    "all",
    "Anthropology",
    "Sociology",
    "Cultural evolution",
    "Philosophy",
    "Psychology",
    "Evolutionary biology",
  ];
  const result = researchers.filter(
    (r) =>
      (field === "all" || r.field.includes(field)) &&
      (r.title + " " + r.contributions + " " + r.publications.join(" "))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="filter-row">
        <input
          className="field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a researcher or idea"
          aria-label="Search researchers"
        />
        <select
          className="select"
          value={field}
          onChange={(e) => setField(e.target.value)}
          aria-label="Research field"
        >
          {groups.map((x) => (
            <option value={x} key={x}>
              {x === "all" ? "All fields" : x}
            </option>
          ))}
        </select>
      </div>
      <div className="card-grid">
        {result.map((r) => (
          <Link
            className="exhibit-card"
            href={`/library/${r.slug}`}
            prefetch={false}
            key={r.id}
          >
            <span className="eyebrow">{r.field}</span>
            <span className="arrow">↗</span>
            <h3>{r.title}</h3>
            <p>{r.contributions}</p>
          </Link>
        ))}
      </div>
      {!result.length && (
        <div className="empty">No researchers match these filters.</div>
      )}
    </>
  );
}
