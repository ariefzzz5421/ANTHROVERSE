"use client";
import { eras, formatYears } from "@/lib/content";
import { logPosition } from "@/lib/time";
import type { TimelineEvent } from "@/lib/types";
export function TimeScale({
  era,
  events,
  onSelect,
}: {
  era: string;
  events: TimelineEvent[];
  onSelect: (event: TimelineEvent) => void;
}) {
  const segment = eras.find((x) => x.id === era);
  const older = segment?.startYearsAgo ?? 4_600_000_000;
  const younger = segment?.endYearsAgo ?? 0;
  return (
    <div className="time-scale-wrap">
      <div className="time-scale-label">
        <span>{formatYears(older)}</span>
        <span>{formatYears(younger)}</span>
      </div>
      <div
        className="time-scale"
        role="group"
        aria-label="Logarithmic position of milestones in selected time segment"
      >
        {events.map((e) => (
          <button
            key={e.id}
            style={{
              left: `${Math.max(1, Math.min(99, logPosition(Math.max(younger, Math.min(older, e.yearsAgo)), older, younger) * 100))}%`,
            }}
            onClick={() => onSelect(e)}
            title={`${e.title}: ${formatYears(e.yearsAgo)}`}
            aria-label={`${e.title}, ${formatYears(e.yearsAgo)}`}
          />
        ))}
      </div>
      <p className="small-note">
        Position uses a logarithmic scale within this segment. Horizontal
        exhibit cards below are a reading sequence, not proportional time
        intervals.
      </p>
    </div>
  );
}
