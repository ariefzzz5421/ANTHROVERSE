import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { species, formatYears } from "@/lib/content";
import {
  BookmarkButton,
  Breadcrumb,
  ReadingProgress,
  Sources,
} from "@/components/common";
import { ArticleSchema } from "@/components/article-schema";
import { StudyLevel } from "@/components/study-level";
export function generateStaticParams() {
  return species.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = species.find((x) => x.slug === slug);
  return {
    alternates: { canonical: `/evolution/${slug}` },
    title: s?.title || "Species",
    description: s?.summary,
  };
}
export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = species.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <main>
      <ArticleSchema
        title={s.title}
        description={s.summary}
        path={`/evolution/${slug}`}
        sourceIds={s.sourceIds}
        updated={s.updated}
      />
      <ReadingProgress />
      <div className="container">
        <Breadcrumb
          items={[
            ["Evolution", "/evolution"],
            [s.title, `/evolution/${s.slug}`],
          ]}
        />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Species dossier / {s.evidenceStatus}</span>
          <h1>
            <em>{s.title}</em>
          </h1>
          <p>{s.summary}</p>
          <BookmarkButton id={`species:${s.id}`} />
        </div>
      </section>
      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <p className="lead">{s.description}</p>
            <h2>Discovery & fossil record</h2>
            <p>
              {s.discovery}. Important specimens: {s.specimens}.
            </p>
            <h2>Body & behavior</h2>
            <p>
              {s.anatomy}. Estimated brain volume: {s.brainVolume}
            </p>
            <p>{s.behavior}</p>
            <h2>What remains unsettled</h2>
            <p>{s.debate}</p>
            <p className="small-note">
              Images: Evidence not yet available. We avoid invented
              reconstructions and unlicensed specimen photography.
            </p>
            <Sources ids={s.sourceIds} />
            <hr className="rule" />
            <Link className="button-link" href="/evolution">
              ← All lineages
            </Link>
          </article>
          <aside className="article-aside panel">
            <StudyLevel />
            <span className="eyebrow">At a glance</span>
            <div className="fact-grid">
              <div className="fact">
                <span>Time range</span>
                <strong>
                  {formatYears(s.dateRange[0])} to {formatYears(s.dateRange[1])}
                </strong>
              </div>
              <div className="fact">
                <span>Known region</span>
                <strong>{s.region}</strong>
              </div>
              <div className="fact">
                <span>Classification</span>
                <strong>{s.classification}</strong>
              </div>
              <div className="fact">
                <span>Evidence</span>
                <strong>{s.evidenceStatus}</strong>
              </div>
            </div>
            <p className="small-note">
              A date range is not a direct ancestry claim. Fossil sampling is
              incomplete.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
