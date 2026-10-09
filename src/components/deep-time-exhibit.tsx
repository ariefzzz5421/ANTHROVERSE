"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const DeepTimeScene = dynamic(() => import("./deep-time-scene"), {
  ssr: false,
  loading: () => <div className="deep-time-loading">Preparing the 3D exhibit…</div>,
});

export type DeepTimeStop = {
  id: string;
  title: string;
  date: string;
  summary: string;
  kind: string;
};

export function DeepTimeExhibit({ stops }: { stops: DeepTimeStop[] }) {
  const [selected, setSelected] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);

  function open3D() {
    const canvas = document.createElement("canvas");
    const canUseWebGL = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    setSupported(canUseWebGL);
    if (canUseWebGL) setEnabled(true);
  }

  const active = stops[selected];
  return (
    <section className="section deep-time-section" aria-labelledby="deep-time-heading">
      <div className="container deep-time-layout">
        <div className="deep-time-copy">
          <div className="eyebrow">Interactive exhibit / deep time</div>
          <h2 className="section-title" id="deep-time-heading">
            Layers of time.
            <br />
            Branches of life.
          </h2>
          <p className="section-intro">
            Explore four turning points across very different timescales. Biology
            and culture tell related stories, but they are distinct processes.
          </p>
          <div className="deep-time-tabs" aria-label="Choose a turning point">
            {stops.map((stop, index) => (
              <button
                key={stop.id}
                type="button"
                className={selected === index ? "deep-time-tab is-active" : "deep-time-tab"}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {stop.title}
              </button>
            ))}
          </div>
          <div className="deep-time-detail" aria-live="polite">
            <span>{active.kind} · approximately {active.date}</span>
            <p>{active.summary}</p>
            <Link href={`/timeline?event=${active.id}`}>Explore evidence in the timeline →</Link>
          </div>
        </div>
        <div className="deep-time-stage">
          {enabled && supported ? (
            <DeepTimeScene selected={selected} />
          ) : (
            <div className="deep-time-still" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          )}
          {!enabled && supported && (
            <button className="deep-time-play" type="button" onClick={open3D}>
              View animated 3D exhibit
            </button>
          )}
          <p className="deep-time-disclaimer">
            Conceptual sculpture · layer sizes and spacing are not a scientific time scale.
            {supported ? " Animation stops when idle." : " 3D is unavailable on this device."}
          </p>
        </div>
      </div>
    </section>
  );
}
