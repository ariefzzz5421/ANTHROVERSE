import type { Metadata } from "next";
import Link from "next/link";
import { behaviorTheories } from "@/lib/content";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/behavior" },
  title: "Human Behavior Lab",
  description:
    "Examine social learning, conformity, social identity, and mimetic desire with evidence and caveats.",
};
export default function BehaviorPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Behavior", "/behavior"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery 04 / Mind & Society</span>
          <h1>The behavior lab.</h1>
          <p>
            Explore influential ideas from different disciplines. Each module
            distinguishes a concept from evidence and highlights the limits of
            the explanation.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container card-grid">
          {behaviorTheories.map((t) => (
            <Link
              className="exhibit-card"
              href={`/behavior/${t.slug}`}
              key={t.id}
            >
              <span className="eyebrow">{t.discipline}</span>
              <span className="arrow">↗</span>
              <h3>{t.title}</h3>
              <p>{t.summary}</p>
            </Link>
          ))}
        </div>
        <div className="container" style={{ paddingBottom: "4rem" }}>
          <Link className="button-link" href="/simulations">
            Open interactive simulations →
          </Link>
        </div>
      </section>
    </main>
  );
}
