import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/common";
const MigrationMap = dynamic(() =>
  import("@/components/migration-map").then((m) => m.MigrationMap),
);
export const metadata: Metadata = {
  alternates: { canonical: "/migration" },
  title: "Human Migration Atlas",
  description:
    "Explore prehistoric human dispersal, fossil sites, and Indonesian discoveries with uncertainty made visible.",
};
export default function MigrationPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Migration atlas", "/migration"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery 05 / Geography</span>
          <h1>Movements, not arrows.</h1>
          <p>
            Follow broad population histories, fossil sites, and archaeological
            evidence. The map makes uncertainty visible because prehistoric
            routes were rarely direct or singular.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="empty">Preparing atlas…</div>}>
            <MigrationMap />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
