import type { Metadata } from "next";
import { Suspense } from "react";
import { TimelineExplorer } from "@/components/timeline-explorer";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/timeline" },
  title: "Human Evolution Timeline",
  description:
    "Explore deep time, branching human evolution, cultural change, and modern history through cited milestones.",
};
export default function TimelinePage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Timeline", "/timeline"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery 01 / Time</span>
          <h1>Humanity in deep time.</h1>
          <p>
            From the earliest evidence of life to the digital age. Zoom into one
            chapter at a time and follow the evidence, including its
            uncertainties.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="empty">Preparing timeline…</div>}>
            <TimelineExplorer />
          </Suspense>
          <div className="tree-panel">
            <div>
              <span className="eyebrow">
                Evolutionary tree / interpretive guide
              </span>
              <h2 className="serif">
                Many branches.
                <br />
                Some connections unresolved.
              </h2>
              <p>
                These labels show broad groups, not proven parent–child lines.
                Fossil discoveries and genetic evidence keep changing the tree.
              </p>
            </div>
            <div
              className="branch-tree"
              aria-label="Schematic branches of human evolution"
            >
              <div className="branch-root">
                Early hominin candidates <span>relationship debated</span>
              </div>
              <div className="branch-row">
                <div>
                  Australopithecines <span>multiple species</span>
                </div>
                <div>
                  Early Homo <span>boundaries debated</span>
                </div>
              </div>
              <div className="branch-row">
                <div>H. erectus and related groups</div>
                <div>
                  Later Homo lineages <span>diverse and overlapping</span>
                </div>
              </div>
              <div className="branch-row">
                <div>Neanderthals / Denisovans</div>
                <div>H. sapiens / island lineages</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
