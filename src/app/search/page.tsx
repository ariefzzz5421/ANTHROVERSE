import type { Metadata } from "next";
import { SiteSearch } from "@/components/site-search";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/search" },
  title: "Search the Museum",
  description:
    "Search Anthroverse species, timeline events, cultural topics, researchers, and archaeological sites.",
};
export default function SearchPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Search", "/search"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Museum index</span>
          <h1>Follow your curiosity.</h1>
          <p>
            Search across every curated collection. Each result takes you to an
            actual exhibit or article.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SiteSearch />
        </div>
      </section>
    </main>
  );
}
