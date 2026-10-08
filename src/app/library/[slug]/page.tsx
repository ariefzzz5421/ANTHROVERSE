import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { researchers } from "@/lib/content";
import { Breadcrumb, ReadingProgress, Sources } from "@/components/common";
export function generateStaticParams() {
  return researchers.map((x) => ({ slug: x.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = researchers.find((x) => x.slug === slug);
  return {
    alternates: { canonical: `/library/${slug}` },
    title: r?.title || "Researcher",
    description: r?.summary,
  };
}
export default async function ResearcherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = researchers.find((x) => x.slug === slug);
  if (!r) notFound();
  return (
    <main>
      <ReadingProgress />
      <div className="container">
        <Breadcrumb
          items={[
            ["Library", "/library"],
            [r.title, `/library/${slug}`],
          ]}
        />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            {r.field} · {r.years}
          </span>
          <h1>{r.title}</h1>
          <p>{r.summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <h2>Contribution in context</h2>
            <p>{r.description}</p>
            <p>{r.contributions}</p>
            <h2>Selected publication</h2>
            <ul>
              {r.publications.map((p) => (
                <li key={p}>
                  <em>{p}</em>
                </li>
              ))}
            </ul>
            <h2>Critiques and limits</h2>
            <p>{r.critique}</p>
            <p className="small-note">
              A full scholarly biography and publication bibliography require
              further source verification. Evidence not yet available in this
              catalog.
            </p>
            <Sources ids={r.sourceIds} />
          </article>
          <aside className="article-aside panel">
            <span className="eyebrow">Index card</span>
            <div className="fact">
              <span>Field</span>
              <strong>{r.field}</strong>
            </div>
            <div className="fact">
              <span>Years</span>
              <strong>{r.years}</strong>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
