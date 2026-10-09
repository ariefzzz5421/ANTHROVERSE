import type { Metadata } from "next";
import { SpeciesExplorer } from "@/components/species-explorer";
import { Breadcrumb } from "@/components/common";
import { EvolutionTrail } from "@/components/evolution-trail";
import { evolutionTrail, parallelBranch } from "@/lib/evolution-trail";
export const metadata: Metadata = {
  alternates: { canonical: "/evolution" },
  title: "Hominin Encyclopedia",
  description:
    "Explore twelve human lineages with evidence, discovery histories, open debates, and cited sources.",
};
export default function EvolutionPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Evolution", "/evolution"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Human evolution</span>
          <h1>A family of many branches.</h1>
          <p>
            Explore the fossils, then compare the branches. Many lineages lived
            alongside one another.
          </p>
        </div>
      </section>
      <EvolutionTrail nodes={evolutionTrail} branch={parallelBranch} />
      <section className="section">
        <div className="container">
          <SpeciesExplorer />
        </div>
      </section>
    </main>
  );
}
