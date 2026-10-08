"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { getSources } from "@/lib/content";
import { useStoredValue, setStoredValue } from "@/lib/storage";
export function Sources({ ids }: { ids: string[] }) {
  const items = getSources(ids);
  return (
    <section aria-label="Research references">
      <h2>Research references</h2>
      {items.length ? (
        <ol className="source-list">
          {items.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title}
              </a>{" "}
              — {s.author}, {s.publisher}.{" "}
              <span className="muted">
                {s.evidenceType}; confidence: {s.confidence}; reviewed{" "}
                {s.reviewed}.
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p>Evidence not yet available.</p>
      )}
    </section>
  );
}
export function Breadcrumb({ items }: { items: [string, string][] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Museum</Link>
      {items.map(([label, href]) => (
        <span key={href}>
          / <Link href={href}>{label}</Link>
        </span>
      ))}
    </nav>
  );
}
export function BookmarkButton({ id }: { id: string }) {
  const raw = useStoredValue("anthro-bookmarks", "[]");
  let list: string[] = [];
  try {
    list = JSON.parse(raw);
  } catch {}
  const saved = list.includes(id);
  function toggle() {
    const next = saved
      ? list.filter((x) => x !== id)
      : [...new Set([...list, id])];
    setStoredValue("anthro-bookmarks", JSON.stringify(next));
  }
  return (
    <button
      className={`bookmark ${saved ? "saved" : ""}`}
      onClick={toggle}
      aria-pressed={saved}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{" "}
      {saved ? "Saved" : "Save topic"}
    </button>
  );
}
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      setProgress(
        Math.round(
          (100 * window.scrollY) / Math.max(1, h.scrollHeight - h.clientHeight),
        ),
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      className="sticky-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
