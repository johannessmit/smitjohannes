import { expect, test } from "@playwright/test";

test("home page has one h1 and the whole feed", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "I make hardware, software and design.",
  );
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(12);
});

test("material filter narrows the feed and marks the active link", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Filter the feed by material" })
    .getByRole("link", { name: "Hardware" })
    .click();
  await expect(page).toHaveURL(/material=hardware/);
  await expect(page.locator("article")).not.toHaveCount(0);
  await expect(
    page.locator("article:not([data-material=hardware])"),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Hardware" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("unknown material falls back to the full feed", async ({ page }) => {
  await page.goto("/?material=nope");
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(12);
});
