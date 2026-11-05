import { describe, expect, test } from "vitest";
import { type Entry, entries } from "./entries";
import { assignTones, parseMaterial, selectEntries, splitDate } from "./feed";

const make = (material: Entry["material"], date: string): Entry => ({
  slug: `${material}-${date}`,
  kind: "post",
  material,
  title: "t",
  summary: "s",
  date,
  size: "line",
});

describe("parseMaterial", () => {
  test("accepts known materials", () => {
    expect(parseMaterial("hardware")).toBe("hardware");
    expect(parseMaterial("design")).toBe("design");
  });
  test("rejects anything else", () => {
    expect(parseMaterial(null)).toBeNull();
    expect(parseMaterial("Hardware")).toBeNull();
    expect(parseMaterial("<script>")).toBeNull();
  });
});

describe("selectEntries", () => {
  test("sorts newest first without mutating the input", () => {
    const input = [make("design", "2026-01-01"), make("design", "2026-03-01")];
    const out = selectEntries(input, null);
    expect(out.map((e) => e.date)).toEqual(["2026-03-01", "2026-01-01"]);
    expect(input[0]?.date).toBe("2026-01-01");
  });
  test("filters by material", () => {
    const out = selectEntries(entries, "hardware");
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((e) => e.material === "hardware")).toBe(true);
  });
  test("sample data has unique slugs and all three materials", () => {
    expect(new Set(entries.map((e) => e.slug)).size).toBe(entries.length);
    expect(new Set(entries.map((e) => e.material)).size).toBe(3);
  });
});

describe("assignTones", () => {
  test("flips a neighbour of the same material", () => {
    const list = [
      make("software", "2026-03-03"),
      make("software", "2026-03-02"),
      make("software", "2026-03-01"),
    ];
    expect(assignTones(list)).toEqual(["field", "ink", "field"]);
  });
  test("resets when the material changes", () => {
    const list = [
      make("software", "2026-03-03"),
      make("software", "2026-03-02"),
      make("design", "2026-03-01"),
    ];
    expect(assignTones(list)).toEqual(["field", "ink", "field"]);
  });
});

describe("splitDate", () => {
  test("splits without time zone shifts", () => {
    expect(splitDate("2026-10-28")).toEqual({
      day: "28",
      month: "Oct",
      year: "2026",
    });
    expect(splitDate("2026-01-01").month).toBe("Jan");
  });
});
