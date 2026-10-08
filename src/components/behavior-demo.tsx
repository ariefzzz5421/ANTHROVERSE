"use client";
import { useState } from "react";
export function BehaviorDemo({ slug }: { slug: string }) {
  const [model, setModel] = useState(40);
  const [pressure, setPressure] = useState(30);
  const descriptor =
    slug === "conformity"
      ? "group pressure"
      : slug === "mimetic-desire"
        ? "model prestige"
        : "visibility";
  return (
    <div className="panel demo-panel">
      <span className="eyebrow">Interactive thought experiment</span>
      <h3>Change the conditions</h3>
      <p>
        This visual is a teaching metaphor. It is not a calibrated prediction or
        measured probability.
      </p>
      <label>
        {descriptor}: <strong>{model}</strong>
        <input
          type="range"
          min="0"
          max="100"
          value={model}
          onChange={(e) => setModel(Number(e.target.value))}
        />
      </label>
      <label>
        independent judgment: <strong>{pressure}</strong>
        <input
          type="range"
          min="0"
          max="100"
          value={pressure}
          onChange={(e) => setPressure(Number(e.target.value))}
        />
      </label>
      <div
        className="demo-bars"
        aria-label="Illustrative influence and independence levels"
      >
        <div>
          <span>Model influence</span>
          <i style={{ width: `${model}%` }} />
        </div>
        <div>
          <span>Independence</span>
          <i style={{ width: `${pressure}%` }} />
        </div>
      </div>
      <p className="small-note">
        Interpretation:{" "}
        {model > pressure
          ? "The model is more salient in this scenario. That can increase attention to its behavior, but does not guarantee imitation."
          : "Independent judgment is more salient here. People can still learn from others without adopting their choices."}
      </p>
    </div>
  );
}
