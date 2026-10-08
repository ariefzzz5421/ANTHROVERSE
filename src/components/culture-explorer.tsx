"use client";
import { useState } from "react";
import Link from "next/link";
import { cultureTopics } from "@/lib/content";
export function CultureExplorer() {
  const [query, setQuery] = useState("");
  const filtered = cultureTopics.filter((t) =>
    (t.title + " " + t.summary + " " + t.concepts.join(" "))
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
          placeholder="Search culture topics"
          aria-label="Search culture topics"
        />
      </div>
      <div className="card-grid">
        {filtered.map((topic, i) => (
          <Link
            href={`/cultures/${topic.slug}`}
            prefetch={false}
            className="exhibit-card"
            key={topic.id}
          >
            <span className="exhibit-number">
              FIELD NOTE {String(i + 1).padStart(2, "0")}
            </span>
            <span className="arrow">↗</span>
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">No topics match that search.</div>
      )}
    </>
  );
}
