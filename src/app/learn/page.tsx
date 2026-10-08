import type { Metadata } from "next";
import { LearningPath } from "@/components/learning-path";
import { Breadcrumb } from "@/components/common";
export const metadata: Metadata = {
  alternates: { canonical: "/learn" },
  title: "Guided Learning Path",
  description:
    "Follow ten lessons from prehistoric humans to the modern mind, and save local progress.",
};
export default function LearnPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumb items={[["Learn", "/learn"]]} />
      </div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Guided path / 10 modules</span>
          <h1>From prehistoric humans to the modern mind.</h1>
          <p>
            A connected route through origins, cooperation, culture, status,
            technology, and the future. Mark progress as you go; it stays in
            this browser.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <LearningPath />
        </div>
      </section>
    </main>
  );
}
