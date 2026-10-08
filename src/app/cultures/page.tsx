import type { Metadata } from "next";
import { CultureExplorer } from "@/components/culture-explorer";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/cultures" },
  title: "Cultural Anthropology",
  description:
    "Explore kinship, ritual, identity, hierarchy, language, and cooperation across societies.",
};
export default function CulturesPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Cultures", "/cultures"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery 03 / Culture</span>
          <h1>Many ways to be human.</h1>
          <p>
            Culture is learned, shared, contested, and always changing. These
            field notes introduce key ideas without reducing any society to a
            stereotype.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CultureExplorer />
        </div>
      </section>
    </main>
  );
}
