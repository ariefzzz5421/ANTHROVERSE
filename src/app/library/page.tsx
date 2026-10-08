import type { Metadata } from "next";
import { LibraryExplorer } from "@/components/library-explorer";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/library" },
  title: "Anthropologist Library",
  description:
    "Meet anthropologists and interdisciplinary thinkers, with their ideas and critiques clearly labeled.",
};
export default function LibraryPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Library", "/library"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Research library</span>
          <h1>People behind the ideas.</h1>
          <p>
            Meet anthropologists and neighboring thinkers. Their work belongs to
            historical debates, not a timeless list of final answers.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <LibraryExplorer />
        </div>
      </section>
    </main>
  );
}
