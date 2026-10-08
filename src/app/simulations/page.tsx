import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Breadcrumb } from "@/components/common";
const SimulationLab = dynamic(() =>
  import("@/components/simulation-lab").then((m) => m.SimulationLab),
);
export const metadata: Metadata = {
  alternates: { canonical: "/simulations" },
  title: "Anthropology Simulations",
  description:
    "Explore four cautious toy models of conformity, cultural transmission, imitation, and social opportunity.",
};
export default function SimulationsPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Simulations", "/simulations"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Learning lab / Illustrative models</span>
          <h1>Change the rules. Question the result.</h1>
          <p>
            These interactive models help you think through possible mechanisms.
            They are not empirical forecasts of human behavior.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Suspense
            fallback={<div className="panel">Loading simulations…</div>}
          >
            <SimulationLab />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
