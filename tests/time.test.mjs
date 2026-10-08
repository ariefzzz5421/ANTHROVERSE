import test from "node:test";
import assert from "node:assert/strict";
import {
  formatYears,
  formatCalendarYear,
  isWithinAgeRange,
  logPosition,
} from "../src/lib/time.ts";
test("deep time and hominin dates keep distinct magnitudes", () => {
  assert.equal(formatYears(4_600_000_000), "4.6 billion years ago");
  assert.equal(formatYears(7_000_000), "7 million years ago");
  assert.equal(formatYears(300_000), "300,000 years ago");
  assert.equal(formatYears(0), "present");
  assert.equal(formatYears(300_000, "id"), "300.000 tahun lalu");
});
test("calendar era uses astronomical year zero correctly", () => {
  assert.equal(formatCalendarYear(0), "1 BCE");
  assert.equal(formatCalendarYear(-1), "2 BCE");
  assert.equal(formatCalendarYear(-999999), "1,000,000 BCE");
  assert.equal(formatCalendarYear(1), "1 CE");
});
test("range bounds and segmented log coordinates are stable", () => {
  assert.equal(isWithinAgeRange(7_000_000, 7_000_000, 2_500_000), true);
  assert.equal(isWithinAgeRange(300_000, 7_000_000, 2_500_000), false);
  assert.equal(logPosition(4_600_000_000, 4_600_000_000, 0), 0);
  assert.equal(logPosition(0, 4_600_000_000, 0), 1);
  assert.ok(logPosition(300_000, 4_600_000_000, 0) > 0);
  assert.throws(() => isWithinAgeRange(1, 0, 2), RangeError);
  assert.throws(() => formatYears(-5), RangeError);
});
