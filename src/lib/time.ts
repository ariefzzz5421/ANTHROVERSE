/** Dates in deep time are approximate ages, never literal BCE calendar dates. */
export function formatYears(years: number, locale: "en" | "id" = "en") {
  if (!Number.isFinite(years) || years < 0)
    throw new RangeError("Age must be a non-negative finite number");
  if (years === 0) return locale === "id" ? "kini" : "present";
  if (years >= 1_000_000_000)
    return `${(years / 1_000_000_000).toFixed(years % 1_000_000_000 ? 1 : 0)} ${locale === "id" ? "miliar tahun lalu" : "billion years ago"}`;
  if (years >= 1_000_000)
    return `${(years / 1_000_000).toFixed(years % 1_000_000 ? 1 : 0)} ${locale === "id" ? "juta tahun lalu" : "million years ago"}`;
  return `${new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(years)} ${locale === "id" ? "tahun lalu" : "years ago"}`;
}
/** Astronomical year numbering: year 0 is 1 BCE, year -1 is 2 BCE. */
export function formatCalendarYear(year: number, locale: "en" | "id" = "en") {
  if (!Number.isSafeInteger(year))
    throw new RangeError("Calendar year must be a safe integer");
  const number = new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US");
  return year <= 0
    ? `${number.format(1 - year)} ${locale === "id" ? "SM" : "BCE"}`
    : `${number.format(year)} ${locale === "id" ? "M" : "CE"}`;
}
export function isWithinAgeRange(age: number, older: number, younger: number) {
  if (
    [age, older, younger].some((x) => !Number.isFinite(x) || x < 0) ||
    older < younger
  )
    throw new RangeError("Invalid deep-time range");
  return age <= older && age >= younger;
}
/** Log scale is used only within a chosen segment, so deep and recent dates can coexist. */
export function logPosition(age: number, older: number, younger: number) {
  if (!isWithinAgeRange(age, older, younger))
    throw new RangeError("Age outside segment");
  if (older === younger) return 0;
  return (
    (Math.log10(older + 1) - Math.log10(age + 1)) /
    (Math.log10(older + 1) - Math.log10(younger + 1))
  );
}
