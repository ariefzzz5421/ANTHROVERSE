import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareExplorer } from "@/components/compare-explorer";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Then vs Now",
  description:
    "Compare historical and contemporary social practices with context, similarities, trade-offs, and sources.",
};
export default function ComparePage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Compare", "/compare"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery 06 / Comparison</span>
          <h1>Change has many directions.</h1>
          <p>
            Compare patterns across time without romanticizing the past or
            assuming that modern life is automatically better.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="panel">Loading comparison…</div>}>
            <CompareExplorer />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
