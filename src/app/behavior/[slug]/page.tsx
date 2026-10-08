import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { behaviorTheories } from "@/lib/content";
import { BehaviorDemo } from "@/components/behavior-demo";
import { StudyLevel } from "@/components/study-level";
import {
  BookmarkButton,
  Breadcrumb,
  ReadingProgress,
  Sources,
} from "@/components/common";
export function generateStaticParams() {
  return behaviorTheories.map((x) => ({ slug: x.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = behaviorTheories.find((x) => x.slug === slug);
  return {
    alternates: { canonical: `/behavior/${slug}` },
    title: t?.title || "Behavior",
    description: t?.summary,
  };
}
export default async function BehaviorDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = behaviorTheories.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <main>
      <ReadingProgress />
      <div className="container">
        <Breadcrumb
          items={[
            ["Behavior", "/behavior"],
            [t.title, `/behavior/${slug}`],
          ]}
        />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t.discipline}</span>
          <h1>{t.title}</h1>
          <p>{t.summary}</p>
          <BookmarkButton id={`behavior:${t.id}`} />
        </div>
      </section>
      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <h2>What is it?</h2>
            <p>{t.description}</p>
            <h2>Why might it happen?</h2>
            <p>{t.why}</p>
            <h2>Key findings and interpretations</h2>
            <p>{t.finding}</p>
            <p>{t.interpretation}</p>
            <h2>Example in everyday life</h2>
            <p>{t.caseStudy}</p>
            <BehaviorDemo slug={slug} />
            <h2>Counterarguments & limits</h2>
            <p>{t.limitations}</p>
            <Sources ids={t.sourceIds} />
          </article>
          <aside className="article-aside panel">
            <StudyLevel />
            <span className="eyebrow">Study note</span>
            <h3>Disciplinary origin</h3>
            <p>{t.discipline}</p>
            <p className="small-note">
              A useful lens is not the same as a universal scientific law.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
