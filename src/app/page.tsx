import Link from "next/link";
import {
  ArrowRight,
  Compass,
  FlaskConical,
  Globe2,
  Waypoints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ResearchSpotlight } from "@/components/research-spotlight";
import { ExhibitImage } from "@/components/exhibit-image";
import { DeepTimeExhibit } from "@/components/deep-time-exhibit";
import { exhibitImages } from "@/lib/exhibit-images";
import { sources, timelineEvents, formatYears } from "@/lib/content";
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };
const exhibits = [
  [
    "Before Humanity",
    "Earth and life before our lineage",
    "/timeline?era=deep-life",
  ],
  [
    "The First Hominins",
    "The earliest candidates and open questions",
    "/evolution/sahelanthropus-tchadensis",
  ],
  ["The Rise of Homo", "Diverse branches of our genus", "/evolution"],
  [
    "Homo sapiens",
    "Our species in a changing world",
    "/evolution/homo-sapiens",
  ],
  [
    "Hunter-Gatherer Societies",
    "Learning, cooperation, and variation",
    "/cultures/cooperation",
  ],
  [
    "The Agricultural Transition",
    "An uneven global transformation",
    "/timeline?event=agriculture",
  ],
  [
    "Cities and Civilizations",
    "Dense networks and institutions",
    "/timeline?event=cities",
  ],
  [
    "Empires and Global Trade",
    "Exchange, power, and contact",
    "/cultures/hierarchy",
  ],
  [
    "Industrial Civilization",
    "A new scale of urban life",
    "/timeline?event=industrial",
  ],
  [
    "Digital Humanity and AI",
    "The latest chapter is still being written",
    "/timeline?event=digital",
  ],
];
const deepTimeStops = ["earth-forms", "early-hominins", "sapiens", "agriculture"].map((id) => {
  const event = timelineEvents.find((item) => item.id === id)!;
  return {
    id,
    title: event.title,
    date: formatYears(event.yearsAgo),
    summary: event.summary,
    kind: event.kind,
  };
});
export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div
          className="hero-image"
          role="img"
          aria-label="Illustrative landscape moving from ancient terrain toward a modern city"
        />
        <div className="container hero-content">
          <p className="eyebrow">An interactive museum of humanity</p>
          <h1 className="serif">
            THE STORY
            <br />
            <em>OF US</em>
          </h1>
          <p className="hero-subtitle">
            From our earliest ancestors to the age of artificial intelligence.
            Explore millions of years of human evolution, cultures,
            civilizations, and the forces shaping who we are.
          </p>
          <div className="hero-actions">
            <Button asChild>
              <Link href="/timeline">
                Explore Human Timeline <ArrowRight size={17} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/behavior">Discover Human Behavior</Link>
            </Button>
          </div>
          <div className="hero-caption">
            Illustrative artwork · not a reconstruction of a fossil species
          </div>
        </div>
        <div className="hero-bottom">
          <div className="container hero-bottom-inner">
            <span>01 / A LIVING MUSEUM</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </section>
      <section className="museum-stats">
        <div className="container stat-row">
          <div>
            <strong>4.6B</strong>
            <span>years of Earth history</span>
          </div>
          <div>
            <strong>~7M</strong>
            <span>years of early hominin evidence</span>
          </div>
          <div>
            <strong>~300K</strong>
            <span>years of Homo sapiens</span>
          </div>
          <div>
            <strong>Many</strong>
            <span>branches, never one ladder</span>
          </div>
        </div>
      </section>
      <DeepTimeExhibit stops={deepTimeStops} />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">The galleries</div>
              <h2 className="section-title">
                Ten chapters.
                <br />
                One unfolding story.
              </h2>
            </div>
            <p className="section-intro">
              Move between biological evolution, cultural change, and today’s
              questions. Each exhibit links to sources and marks what remains
              uncertain.
            </p>
          </div>
          <div className="card-grid">
            {exhibits.map(([title, desc, href], i) => (
              <Link
                href={href}
                prefetch={false}
                className="exhibit-card"
                key={title}
              >
                <span className="exhibit-number">
                  EXHIBIT {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowRight className="arrow" size={20} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section feature-section">
        <div className="container feature-grid">
          <div>
            <div className="eyebrow">Featured discovery / Indonesia</div>
            <h2 className="section-title">
              The ground beneath Sangiran tells a larger story.
            </h2>
            <p className="section-intro">
              Central Java preserves important <em>Homo erectus</em> fossils and
              a long archaeological sequence. Its evidence helps us understand a
              diverse, far-reaching human family tree.
            </p>
            <Link className="button-link" href="/migration">
              Explore the atlas <ArrowRight size={16} />
            </Link>
            <p className="small-note" style={{ marginTop: 20 }}>
              Source:{" "}
              <a
                href={sources.find((s) => s.id === "unesco-sangiran")?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                UNESCO World Heritage Centre
              </a>
            </p>
          </div>
          <Reveal>
            <ExhibitImage
              image={exhibitImages.sangiran}
              caption="Sangiran II · an original Homo erectus calvarium from Java"
            />
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Beyond the fossil record</div>
              <h2 className="section-title">
                Why do we live
                <br />
                the way we do?
              </h2>
            </div>
          </div>
          <div className="path-grid">
            <Link href="/evolution" prefetch={false} className="path-card">
              <Waypoints />
              <h3>Human lineages</h3>
              <p>
                Meet the many hominins whose fossils reshape our understanding.
              </p>
              <span>Enter encyclopedia →</span>
            </Link>
            <Link href="/cultures" prefetch={false} className="path-card">
              <Globe2 />
              <h3>Cultural worlds</h3>
              <p>Explore kinship, power, language, ritual, and cooperation.</p>
              <span>Explore topics →</span>
            </Link>
            <Link href="/behavior" prefetch={false} className="path-card">
              <FlaskConical />
              <h3>Behavior lab</h3>
              <p>
                Test explanations, evidence, and limits of familiar theories.
              </p>
              <span>Explore behavior →</span>
            </Link>
            <Link href="/learn" prefetch={false} className="path-card">
              <Compass />
              <h3>Guided learning</h3>
              <p>
                Follow a ten-step path from deep prehistory to the digital age.
              </p>
              <span>Begin path →</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section editorial-section">
        <div className="container editorial-grid">
          <ResearchSpotlight />
          <div className="editorial-stack">
            <div className="editorial-item">
              <span>CURATED NOTE · 01</span>
              <h3>Today in Anthropology</h3>
              <p>
                How do we know what we know? Fossils, artifacts, and ancient DNA
                answer different questions. None tells the whole story alone.
              </p>
              <Link href="/sources">Read our evidence guide →</Link>
            </div>
            <div className="editorial-item">
              <span>CURATED NOTE · 02</span>
              <h3>Look closer at Flores</h3>
              <p>
                The discovery of <em>Homo floresiensis</em> reminds us that
                human diversity persisted surprisingly recently.
              </p>
              <Link href="/evolution/homo-floresiensis">
                Meet the species →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
