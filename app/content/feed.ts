import { type Entry, MATERIALS, type Material } from "./entries";

export const MATERIAL_LABELS: Record<Material, string> = {
  hardware: "Hardware",
  software: "Software",
  design: "Design",
};

/** Returns the material for a `?material=` value, or null for anything else. */
export function parseMaterial(value: string | null): Material | null {
  return MATERIALS.find((m) => m === value) ?? null;
}

/** Newest first, optionally limited to one material. Does not mutate input. */
export function selectEntries(
  all: readonly Entry[],
  material: Material | null,
): Entry[] {
  return all
    .filter((e) => material === null || e.material === material)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/**
 * "field" paints an entry in its material colour on its ink. "ink" swaps them.
 * Two neighbours of the same material would merge into one band, so the second
 * one flips. The flip is relative to what the neighbour actually shows.
 */
export type Tone = "field" | "ink";

export function assignTones(list: readonly Entry[]): Tone[] {
  const tones: Tone[] = [];
  list.forEach((entry, i) => {
    const prev = list[i - 1];
    const prevTone = tones[i - 1];
    tones.push(
      prev && prevTone && prev.material === entry.material
        ? prevTone === "field"
          ? "ink"
          : "field"
        : "field",
    );
  });
  return tones;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2026-10-28" -> { day: "28", month: "Oct", year: "2026" }. No time zones. */
export function splitDate(iso: string): {
  day: string;
  month: string;
  year: string;
} {
  const [year = "", month = "1", day = ""] = iso.split("-");
  return { day, month: MONTHS[Number(month) - 1] ?? "", year };
}
