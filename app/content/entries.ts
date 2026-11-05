export const MATERIALS = ["hardware", "software", "design"] as const;
export type Material = (typeof MATERIALS)[number];

export type EntryKind = "project" | "post";
/** How much room an entry takes in the feed. Size carries weight. */
export type EntrySize = "full" | "column" | "line";

export type Entry = {
  slug: string;
  kind: EntryKind;
  material: Material;
  title: string;
  summary: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  size: EntrySize;
};

/**
 * SAMPLE CONTENT. Every entry below is invented to show the design at full
 * density. Replace with real content (see ADR 0003) before launch.
 */
export const entries: Entry[] = [
  {
    slug: "keyboard-with-no-letters",
    kind: "project",
    material: "hardware",
    title: "A keyboard with no letters on it",
    summary:
      "Sixty switches under one blank slab. You learn it by touch or not at all.",
    date: "2026-10-28",
    size: "full",
  },
  {
    slug: "build-takes-four-seconds",
    kind: "post",
    material: "software",
    title: "Why my build takes four seconds",
    summary: "Cutting a cold build down by deleting things.",
    date: "2026-10-21",
    size: "line",
  },
  {
    slug: "typeface-from-a-label-maker",
    kind: "post",
    material: "design",
    title: "A typeface from a broken label maker",
    summary:
      "The printer skipped the same pixel in every letter. That became the alphabet.",
    date: "2026-10-14",
    size: "column",
  },
  {
    slug: "router-that-explains-itself",
    kind: "project",
    material: "software",
    title: "A router that explains itself",
    summary:
      "Every URL answers with the code path that handled it and how long each step took.",
    date: "2026-10-02",
    size: "full",
  },
  {
    slug: "soldering-with-a-steady-breath",
    kind: "post",
    material: "hardware",
    title: "Soldering with a steady breath",
    summary: "Small notes on small joints.",
    date: "2026-09-26",
    size: "line",
  },
  {
    slug: "posters-for-a-gig-that-never-happened",
    kind: "project",
    material: "design",
    title: "Posters for a gig that never happened",
    summary: "Nine posters, one cancelled venue.",
    date: "2026-09-19",
    size: "line",
  },
  {
    slug: "four-weeks-with-a-bench-supply",
    kind: "post",
    material: "hardware",
    title: "Four weeks with a bench power supply",
    summary:
      "What a current limit teaches you about the circuits you thought worked.",
    date: "2026-09-09",
    size: "column",
  },
  {
    slug: "letters-cut-from-scrap",
    kind: "project",
    material: "design",
    title: "Letters cut from scrap",
    summary:
      "An alphabet cut out of whatever was left on the workshop floor, then scanned flat.",
    date: "2026-08-30",
    size: "full",
  },
  {
    slug: "notes-on-boring-databases",
    kind: "post",
    material: "software",
    title: "Notes on boring databases",
    summary: "A defence of tables, keys and migrations.",
    date: "2026-08-22",
    size: "line",
  },
  {
    slug: "type-error-and-naming",
    kind: "post",
    material: "software",
    title: "What a type error taught me about naming",
    summary:
      "The compiler was right. The function name was lying about what it returned.",
    date: "2026-08-11",
    size: "column",
  },
  {
    slug: "a-lamp-that-tells-the-time",
    kind: "project",
    material: "hardware",
    title: "A lamp that tells the time",
    summary: "Warm at dusk, cold at noon, dark when it is late.",
    date: "2026-07-30",
    size: "line",
  },
  {
    slug: "a-year-of-tiny-posters",
    kind: "project",
    material: "design",
    title: "A year of tiny posters",
    summary:
      "One A6 poster a week for fifty-two weeks. The first ten are not good, which is the point.",
    date: "2026-07-12",
    size: "full",
  },
];
