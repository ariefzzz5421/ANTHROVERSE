"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { comparisons } from "@/lib/content";
import { Sources } from "@/components/common";
export function CompareExplorer() {
  const router = useRouter();
  const params = useSearchParams();
  const requestedId = params.get("topic");
  const id = comparisons.some((x) => x.id === requestedId)
    ? requestedId!
    : comparisons[0].id;
  const [balance, setBalance] = useState(50);
  const item = comparisons.find((x) => x.id === id)!;
  return (
    <>
      <div className="filter-row">
        <select
          className="select"
          value={id}
          onChange={(e) =>
            router.replace(`/compare?topic=${e.target.value}`, {
              scroll: false,
            })
          }
          aria-label="Choose comparison"
        >
          {comparisons.map((x) => (
            <option value={x.id} key={x.id}>
              {x.title}
            </option>
          ))}
        </select>
      </div>
      <div className="panel">
        <span className="eyebrow">Then versus now / contextual comparison</span>
        <h2 className="serif">{item.title}</h2>
        <p>{item.summary}</p>
        <label className="balance-label">
          Adjust visual emphasis:{" "}
          <input
            type="range"
            min="25"
            max="75"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            aria-label="Adjust comparison emphasis"
          />
        </label>
        <div
          className="compare-panels"
          style={{ "--balance": `${balance}%` } as React.CSSProperties}
        >
          <div>
            <span className="eyebrow">Then / one possible pattern</span>
            <p>{item.past}</p>
          </div>
          <div>
            <span className="eyebrow">Now / one possible pattern</span>
            <p>{item.present}</p>
          </div>
        </div>
        <div className="split">
          <div>
            <h3>Continuities</h3>
            <p>{item.similarities}</p>
          </div>
          <div>
            <h3>Trade-offs and variation</h3>
            <p>{item.tradeoffs}</p>
          </div>
        </div>
        <Sources ids={item.sourceIds} />
      </div>
    </>
  );
}
