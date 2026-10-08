"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fossilSites, getSources, species } from "@/lib/content";

const slides = [
  {
    title: "A family tree, not a ladder.",
    summary:
      "Ancient human groups overlapped, diverged, and sometimes exchanged genes. New fossils and methods keep changing the details.",
    href: "/evolution",
    sourceId: "nhm-origin",
  },
  {
    title: "Another human lineage on Flores.",
    summary: species.find((item) => item.id === "homo-floresiensis")!.summary,
    href: "/evolution/homo-floresiensis",
    sourceId: "smith-flores",
  },
  {
    title: "Java's deep fossil record.",
    summary: fossilSites.find((item) => item.id === "sangiran-site")!.summary,
    href: "/migration?site=sangiran-site",
    sourceId: "unesco-sangiran",
  },
];

export function ResearchSpotlight() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const slide = slides[index];
  const source = getSources([slide.sourceId])[0];
  return (
    <div className="research-spotlight" aria-label="Research spotlight">
      <div className="eyebrow">
        Research spotlight / {String(index + 1).padStart(2, "0")}
      </div>
      <h2 className="section-title" aria-live="polite">
        {slide.title}
      </h2>
      <p className="section-intro">{slide.summary}</p>
      <Link className="text-link" href={slide.href}>
        Explore exhibit <ArrowRight size={16} />
      </Link>
      <p className="small-note">
        Source:{" "}
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {source.publisher} ↗
        </a>
      </p>
      <div className="spotlight-controls">
        <button
          className="icon-btn"
          onClick={() => setIndex((index + slides.length - 1) % slides.length)}
          aria-label="Previous research spotlight"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          className="icon-btn"
          onClick={() => setIndex((index + 1) % slides.length)}
          aria-label="Next research spotlight"
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
