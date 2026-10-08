"use client";
import Link from "next/link";
import { learningPath } from "@/lib/content";
import { useStoredValue, setStoredValue } from "@/lib/storage";
export function LearningPath() {
  const raw = useStoredValue("anthro-learn", "[]");
  let done: number[] = [];
  try {
    done = JSON.parse(raw);
  } catch {}
  function toggle(i: number) {
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setStoredValue("anthro-learn", JSON.stringify(next));
  }
  return (
    <>
      <div className="learn-progress">
        <strong>
          {done.length} / {learningPath.length}
        </strong>
        <span>modules marked complete on this device</span>
        <div>
          <i
            style={{ width: `${(done.length / learningPath.length) * 100}%` }}
          />
        </div>
      </div>
      <ol className="learning-list">
        {learningPath.map(([title, href], i) => (
          <li key={title}>
            <span className="learn-step">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2>
                <Link href={href} prefetch={false}>
                  {title} ↗
                </Link>
              </h2>
              <p>
                {i < 4
                  ? "Foundations of human origins and social life"
                  : i < 7
                    ? "Institutions, agriculture, and status"
                    : "Mind, technology, and future questions"}
              </p>
            </div>
            <label>
              <input
                type="checkbox"
                checked={done.includes(i)}
                onChange={() => toggle(i)}
              />{" "}
              Complete
            </label>
          </li>
        ))}
      </ol>
    </>
  );
}
