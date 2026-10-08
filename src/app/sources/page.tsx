import type { Metadata } from "next";
import { sources } from "@/lib/content";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/sources" },
  title: "Sources & Research Method",
  description:
    "How Anthroverse handles evidence, uncertainty, citations, and illustrative artwork.",
};
export default function SourcesPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Sources", "/sources"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Research desk</span>
          <h1>Evidence before certainty.</h1>
          <p>
            Our catalog links each exhibit to research sources and marks
            estimates, debates, and editorial interpretation.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <h2>How to read the museum</h2>
            <p>
              “Years ago” is an approximate distance from today. Fossil species
              ranges describe known evidence, not exact first or last
              individuals. A possible evolutionary connection is not a proven
              direct ancestor. Broad migration lines are schematic and do not
              trace verified travel paths.
            </p>
            <p>
              Illustrations are atmospheric artwork. They are not anatomical
              reconstructions. Where verified images or details are unavailable,
              the exhibit says “Evidence not yet available.”
            </p>
            <h2>Research catalog</h2>
            <div className="source-catalog">
              {sources.map((s) => (
                <article className="panel" key={s.id}>
                  <span className="eyebrow">
                    {s.evidenceType} · {s.confidence} confidence
                  </span>
                  <h3>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title} ↗
                    </a>
                  </h3>
                  <p>
                    {s.author} · {s.publisher}
                    {s.published ? ` · ${s.published}` : ""}
                  </p>
                  <p className="small-note">Last reviewed {s.reviewed}</p>
                </article>
              ))}
            </div>
          </article>
          <aside className="article-aside panel">
            <span className="eyebrow">Evidence labels</span>
            <p>
              <strong>Established:</strong> strongly supported broad claim.
            </p>
            <p>
              <strong>Estimated:</strong> approximate date or range.
            </p>
            <p>
              <strong>Debated:</strong> active taxonomic or interpretive
              disagreement.
            </p>
            <p>
              <strong>Illustrative:</strong> an educational model or editorial
              framing, not measured data.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
