"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Minus,
  Plus,
  Search as SearchIcon,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  eras,
  timelineEvents,
  species,
  formatYears,
  getSources,
} from "@/lib/content";
import { TimeScale } from "@/components/time-scale";
import type { TimelineEvent } from "@/lib/types";
const kinds = ["all", "life", "biology", "culture", "society", "technology"];
export function TimelineExplorer() {
  const params = useSearchParams();
  const [era, setEra] = useState(params.get("era") || "all");
  const [kind, setKind] = useState("all");
  const [speciesId, setSpeciesId] = useState("all");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<TimelineEvent | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = params.get("event");
    if (!id) return;
    const item = timelineEvents.find((e) => e.id === id);
    if (!item) return;
    const timer = window.setTimeout(() => {
      setSelected(item);
      setEra(item.eraId);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [params]);
  const filtered = useMemo(
    () =>
      timelineEvents
        .filter(
          (e) =>
            (era === "all" || e.eraId === era) &&
            (kind === "all" || e.kind === kind) &&
            (speciesId === "all" || e.speciesIds.includes(speciesId)) &&
            (e.title + " " + e.summary)
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) => b.yearsAgo - a.yearsAgo),
    [era, kind, speciesId, query],
  );
  function pan(dir: number) {
    rail.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }
  return (
    <>
      <TimeScale era={era} events={filtered} onSelect={setSelected} />
      <div className="timeline-guide">
        <div>
          <span className="eyebrow">How to read this</span>
          <p>
            Choose a segment of time, then pan horizontally or use the arrows.
            Zoom changes card spacing for close reading. The segments
            deliberately have different time scales.
          </p>
        </div>
        <strong>Biology ≠ culture</strong>
      </div>
      <div className="era-tabs" role="group" aria-label="Time segment">
        {[{ id: "all", title: "All time" }, ...eras].map((e) => (
          <button
            key={e.id}
            aria-pressed={era === e.id}
            onClick={() => {
              setEra(e.id);
              setSelected(null);
              rail.current?.scrollTo({ left: 0 });
            }}
          >
            {e.title}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <label className="search-field">
          <SearchIcon size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search milestones"
            aria-label="Search milestones"
          />
        </label>
        <select
          className="select"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          aria-label="Milestone category"
        >
          {kinds.map((k) => (
            <option value={k} key={k}>
              {k === "all" ? "All categories" : k}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={speciesId}
          onChange={(e) => setSpeciesId(e.target.value)}
          aria-label="Species filter"
        >
          <option value="all">All lineages</option>
          {species.map((s) => (
            <option value={s.id} key={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="timeline-toolbar">
        <span>
          {filtered.length} milestone{filtered.length !== 1 ? "s" : ""} · dates
          approximate unless noted
        </span>
        <div>
          <button
            className="icon-btn"
            onClick={() => pan(-1)}
            aria-label="Pan left"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            className="icon-btn"
            onClick={() => pan(1)}
            aria-label="Pan right"
          >
            <ArrowRight size={17} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setZoom(Math.max(0.8, zoom - 0.2))}
            aria-label="Zoom out"
          >
            <Minus size={17} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setZoom(Math.min(2, zoom + 0.2))}
            aria-label="Zoom in"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>
      {filtered.length ? (
        <div
          className="timeline-rail"
          ref={rail}
          tabIndex={0}
          aria-label="Scrollable timeline"
        >
          <div className="timeline-track">
            {filtered.map((event, i) => (
              <button
                className={`timeline-event ${selected?.id === event.id ? "selected" : ""}`}
                style={{ width: `${Math.round(245 * zoom)}px` }}
                key={event.id}
                onClick={() => setSelected(event)}
              >
                <span className="timeline-point" />
                <span className="timeline-date">
                  {formatYears(event.yearsAgo)}
                </span>
                <span className="timeline-index">
                  {String(i + 1).padStart(2, "0")} / {event.kind.toUpperCase()}
                </span>
                <strong>{event.title}</strong>
                <small>{event.summary}</small>
                <span className="timeline-status">
                  {event.evidenceStatus === "debated"
                    ? "◇ Debated interpretation"
                    : event.evidenceStatus === "estimated"
                      ? "~ Estimated date"
                      : "Curated context"}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty">
          No milestones match these filters. Try another era, category, or
          search term.
        </div>
      )}
      {selected && (
        <div className="panel event-detail" id="event-detail">
          <div>
            <span className="eyebrow">Milestone / {selected.kind}</span>
            <h2>{selected.title}</h2>
            <p>{selected.summary}</p>
            <p className="small-note">
              {formatYears(selected.yearsAgo)} · {selected.evidenceStatus}. Date
              precision and relationships vary by evidence.
            </p>
            {selected.speciesIds.length > 0 && (
              <p>
                Related lineage:{" "}
                {selected.speciesIds.map((id) => (
                  <a key={id} href={`/evolution/${id}`}>
                    {species.find((s) => s.id === id)?.title} ↗{" "}
                  </a>
                ))}
              </p>
            )}
          </div>
          <div>
            <h3>Research record</h3>
            <ul className="source-list">
              {getSources(selected.sourceIds).map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title} ↗
                  </a>
                </li>
              ))}
            </ul>
            <p className="small-note">
              Image gallery: Evidence not yet available for this milestone.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
