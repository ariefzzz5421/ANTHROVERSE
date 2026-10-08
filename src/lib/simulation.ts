export type ModelId = "conformity" | "transmission" | "mimetic" | "partners";
export type Control = {
  key: string;
  label: string;
  min: number;
  max: number;
  initial: number;
};
export type Model = {
  id: ModelId;
  title: string;
  summary: string;
  controls: Control[];
  assumptions: string[];
  unit: string;
};
export const models: Model[] = [
  {
    id: "conformity",
    title: "Social conformity",
    summary:
      "Watch an illustrative norm spread through a community when social influence changes.",
    unit: "agents displaying a norm",
    controls: [
      { key: "size", label: "Community size", min: 20, max: 100, initial: 50 },
      { key: "norm", label: "Norm strength", min: 0, max: 100, initial: 55 },
      {
        key: "approval",
        label: "Approval pressure",
        min: 0,
        max: 100,
        initial: 45,
      },
      { key: "diversity", label: "Diversity", min: 0, max: 100, initial: 50 },
      {
        key: "independence",
        label: "Independence",
        min: 0,
        max: 100,
        initial: 50,
      },
    ],
    assumptions: [
      "Each agent has a fixed, illustrative resistance threshold.",
      "Agents may adopt a visible norm when social influence exceeds that threshold.",
      "The model omits institutions, identities, and changing preferences.",
    ],
  },
  {
    id: "transmission",
    title: "Cultural transmission",
    summary:
      "Explore how a fictional cultural trait may spread, change, or disappear.",
    unit: "agents holding the example trait",
    controls: [
      { key: "size", label: "Population size", min: 20, max: 100, initial: 60 },
      {
        key: "learning",
        label: "Social learning",
        min: 0,
        max: 100,
        initial: 65,
      },
      { key: "innovation", label: "Innovation", min: 0, max: 100, initial: 10 },
      {
        key: "connectivity",
        label: "Network connectivity",
        min: 0,
        max: 100,
        initial: 55,
      },
      {
        key: "fidelity",
        label: "Transmission fidelity",
        min: 0,
        max: 100,
        initial: 75,
      },
    ],
    assumptions: [
      "A fictional trait starts with a small group.",
      "Agents may copy one peer, mutate a trait, or retain their current state in each round.",
      "No real cultural trait or population is represented.",
    ],
  },
  {
    id: "mimetic",
    title: "Mimetic desire",
    summary:
      "See how model prestige and imitation can concentrate attention on a scarce object.",
    unit: "agents drawn to the same object",
    controls: [
      { key: "size", label: "Individuals", min: 20, max: 100, initial: 40 },
      {
        key: "prestige",
        label: "Model prestige",
        min: 0,
        max: 100,
        initial: 60,
      },
      {
        key: "imitation",
        label: "Imitation tendency",
        min: 0,
        max: 100,
        initial: 50,
      },
      {
        key: "scarcity",
        label: "Object scarcity",
        min: 0,
        max: 100,
        initial: 45,
      },
    ],
    assumptions: [
      "A single fictional model draws attention to one object.",
      "Imitation and rivalry are treated as possible responses, never universal outcomes.",
      "This is a visualization of an interpretive theory, not empirical validation.",
    ],
  },
  {
    id: "partners",
    title: "Partner formation",
    summary:
      "Explore opportunities to meet through repeated contact, shared interests, and social ties.",
    unit: "illustrative meeting opportunities",
    controls: [
      { key: "size", label: "Community size", min: 20, max: 100, initial: 50 },
      {
        key: "contact",
        label: "Repeated contact",
        min: 0,
        max: 100,
        initial: 50,
      },
      {
        key: "friends",
        label: "Mutual friends",
        min: 0,
        max: 100,
        initial: 40,
      },
      {
        key: "interests",
        label: "Shared interests",
        min: 0,
        max: 100,
        initial: 50,
      },
      {
        key: "distance",
        label: "Geographic distance",
        min: 0,
        max: 100,
        initial: 50,
      },
    ],
    assumptions: [
      "Agents are abstract points, not demographic profiles.",
      "Connections represent opportunities to meet, not relationships or matches.",
      "The model does not infer compatibility or predict individual outcomes.",
    ],
  },
];
function rng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
export function simulate(id: ModelId, values: Record<string, number>) {
  const n = Math.max(20, Math.min(100, Math.round(values.size || 50)));
  const random = rng(20261008);
  let active = Array.from(
    { length: n },
    (_, i) => i < Math.max(2, Math.floor(n * 0.12)),
  );
  const rows: { round: number; count: number }[] = [];
  for (let round = 0; round <= 10; round++) {
    rows.push({ round, count: active.filter(Boolean).length });
    if (round === 10) break;
    const next = active.map((on, i) => {
      const r = random();
      if (id === "conformity") {
        const influence = (values.norm + values.approval) / 200;
        const resistance = (values.diversity + values.independence) / 240;
        return on || r < Math.max(0.01, (influence - resistance) * 0.6);
      }
      if (id === "transmission") {
        const peer = active[Math.floor(random() * n)];
        const copy =
          peer &&
          random() <
            (values.learning / 100) *
              (values.connectivity / 100) *
              (values.fidelity / 100);
        const innovation = random() < values.innovation / 1000;
        const loss = random() < 0.025;
        return (on && !loss) || Boolean(copy) || innovation;
      }
      if (id === "mimetic") {
        const influence = (values.prestige / 100) * (values.imitation / 100);
        const rivalry = (values.scarcity / 100) * 0.25;
        return on || r < Math.max(0, influence - rivalry) * 0.28;
      }
      const opportunity =
        (values.contact +
          values.friends +
          values.interests +
          (100 - values.distance)) /
        400;
      return on || r < opportunity * 0.1 + (i % 7 === 0 ? 0.015 : 0);
    });
    active = next;
  }
  return rows;
}
