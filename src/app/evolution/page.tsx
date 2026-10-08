import type { Metadata } from "next";
import { SpeciesExplorer } from "@/components/species-explorer";
import { Breadcrumb } from "@/components/common";
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
          <span className="eyebrow">Gallery 02 / Life</span>
          <h1>A family of many branches.</h1>
          <p>
            Explore fossils, geography, and debates across the hominin tree.
            Similarity does not prove direct ancestry; many lineages overlapped.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SpeciesExplorer />
        </div>
      </section>
    </main>
  );
}
