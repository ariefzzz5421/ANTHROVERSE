"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, GitBranch } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExhibitImage } from "@/components/exhibit-image";
import type { EvolutionEvidenceNode } from "@/lib/evolution-trail";

export function EvolutionTrail({
  nodes,
  branch,
}: {
  nodes: EvolutionEvidenceNode[];
  branch: EvolutionEvidenceNode;
}) {
  const [index, setIndex] = useState(0);
  const [branchOpen, setBranchOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = branchOpen ? branch : nodes[index];

  function select(next: number) {
    setIndex(next);
    setBranchOpen(false);
  }

  return (
    <section className="section evolution-story" aria-labelledby="evolution-story-title">
      <div className="container">
        <div className="section-head evolution-story-head">
          <div>
            <span className="eyebrow">Interactive evidence diagram</span>
            <h2 className="section-title" id="evolution-story-title">
              Follow the fossils.
            </h2>
          </div>
          <p className="section-intro">
            The arrows show time order, not direct ancestry. Each photograph is
            a real museum object or specimen, with its status and source named.
          </p>
        </div>

        <div className="evolution-workbench">
          <div className="evolution-diagram" role="group" aria-label="Fossil evidence from older to more recent">
            <div className="evolution-diagram-key">
              <span>OLDER EVIDENCE</span>
              <ArrowDown size={16} aria-hidden="true" />
              <span>MORE RECENT</span>
            </div>
            {nodes.map((node, position) => (
              <div className="evolution-diagram-row" key={node.id}>
                <button
                  className={`evolution-node ${!branchOpen && index === position ? "is-active" : ""}`}
                  type="button"
                  aria-pressed={!branchOpen && index === position}
                  onClick={() => select(position)}
                >
                  <span className="evolution-node-index">{String(position + 1).padStart(2, "0")}</span>
                  <span className="evolution-node-main">
                    <strong>{node.title}</strong>
                    <small>{node.age}</small>
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                {position < nodes.length - 1 && (
                  <span className="evolution-node-arrow" aria-hidden="true">↓</span>
                )}
              </div>
            ))}
            <div className="evolution-side-branch">
              <span className="evolution-branch-line" aria-hidden="true">↳</span>
              <button
                type="button"
                className={`evolution-node branch-node ${branchOpen ? "is-active" : ""}`}
                aria-pressed={branchOpen}
                onClick={() => setBranchOpen(true)}
              >
                <GitBranch size={18} aria-hidden="true" />
                <span className="evolution-node-main">
                  <strong>{branch.title}</strong>
                  <small>Parallel branch · {branch.age}</small>
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <article className="evolution-focus" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
              >
                <ExhibitImage image={active.image} sizes="(max-width: 900px) 100vw, 650px" />
                <div className="evolution-focus-content">
                  <div className="evolution-focus-meta">
                    <span>{active.group}</span>
                    <span>{active.period}</span>
                  </div>
                  <h3>{active.title}</h3>
                  <p>{active.finding}</p>
                  <p className="evolution-caveat">{active.caveat}</p>
                  <div className="evolution-focus-links">
                    <Link href={active.href} prefetch={false}>Explore record →</Link>
                    {active.sources.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.title} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="evolution-controls">
              {branchOpen ? (
                <button type="button" onClick={() => setBranchOpen(false)}>
                  <ArrowLeft size={16} /> Back to Homo sapiens
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => select(index - 1)} disabled={index === 0}>
                    <ArrowLeft size={16} /> Previous
                  </button>
                  <span>{index + 1} / {nodes.length}</span>
                  <button type="button" onClick={() => select(index + 1)} disabled={index === nodes.length - 1}>
                    Next <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          </article>
        </div>
        <p className="evolution-method-note">
          Specimens are examples of branches and transitions. The fossil record
          has gaps; living fish and apes did not turn into humans.
        </p>
      </div>
    </section>
  );
}
