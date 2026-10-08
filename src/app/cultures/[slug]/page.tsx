import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cultureTopics } from "@/lib/content";
import {
  BookmarkButton,
  Breadcrumb,
  ReadingProgress,
  Sources,
} from "@/components/common";
import { ArticleSchema } from "@/components/article-schema";
import { StudyLevel } from "@/components/study-level";
export function generateStaticParams() {
  return cultureTopics.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = cultureTopics.find((x) => x.slug === slug);
  return {
    alternates: { canonical: `/cultures/${slug}` },
    title: t?.title || "Culture",
    description: t?.summary,
  };
}
export default async function CulturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = cultureTopics.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <main>
      <ArticleSchema
        title={t.title}
        description={t.summary}
        path={`/cultures/${slug}`}
        sourceIds={t.sourceIds}
        updated={t.updated}
      />
      <ReadingProgress />
      <div className="container">
        <Breadcrumb
          items={[
            ["Cultures", "/cultures"],
            [t.title, `/cultures/${slug}`],
          ]}
        />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Cultural anthropology / field note</span>
          <h1>{t.title}</h1>
          <p>{t.summary}</p>
          <BookmarkButton id={`culture:${t.id}`} />
        </div>
      </section>
      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <p className="lead">{t.description}</p>
            <h2>How it developed</h2>
            <p>{t.historical}</p>
            <h2>Concepts & thinkers</h2>
            <p>
              {t.concepts.join(", ")}. Researchers associated with this
              discussion include {t.researchers.join(", ")}. These connections
              are starting points for deeper reading, not endorsements of every
              claim.
            </p>
            <h2>Across contexts</h2>
            <div className="split">
              <div className="panel">
                <span className="eyebrow">Illustrative case</span>
                <p>{t.caseStudy}</p>
              </div>
              <div className="panel">
                <span className="eyebrow">Contemporary connection</span>
                <p>{t.modern}</p>
              </div>
            </div>
            <h2>A visual model</h2>
            <div className="concept-diagram">
              <span>People</span>
              <i>↔</i>
              <span>Shared meanings</span>
              <i>↔</i>
              <span>Institutions</span>
            </div>
            <p className="small-note">{t.diagram}</p>
            <h2>Limits & critique</h2>
            <p>{t.limitations}</p>
            <Sources ids={t.sourceIds} />
            <hr className="rule" />
            <Link className="button-link" href="/cultures">
              ← All cultural topics
            </Link>
          </article>
          <aside className="article-aside panel">
            <StudyLevel />
            <span className="eyebrow">Key ideas</span>
            <div className="topic-tags">
              {t.concepts.map((c) => (
                <span className="tag" key={c}>
                  {c}
                </span>
              ))}
            </div>
            <h3>Related researchers</h3>
            <p>{t.researchers.join(", ")}</p>
            <p className="small-note">
              Case examples here are illustrative; they are not claims about
              every member of a population.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
