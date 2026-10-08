"use client";
import { useStoredValue, setStoredValue } from "@/lib/storage";
const guidance = {
  Beginner:
    "Start with the summary, date or setting, and the main idea. You can return to the evidence notes later.",
  Intermediate:
    "Compare the claim with the type of evidence used, then check what remains uncertain.",
  Advanced:
    "Open the research references and ask how methods, sampling, and competing interpretations affect the claim.",
};
export function StudyLevel() {
  const stored = useStoredValue("anthro-level", "Beginner");
  const level =
    stored in guidance ? (stored as keyof typeof guidance) : "Beginner";
  return (
    <div className="study-level">
      <label htmlFor="study-level">Reading level</label>
      <select
        id="study-level"
        className="select"
        value={level}
        onChange={(event) => setStoredValue("anthro-level", event.target.value)}
      >
        {Object.keys(guidance).map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <p className="small-note">{guidance[level]}</p>
    </div>
  );
}
