import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("should open home page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL("https://practicesoftwaretesting.com/");

    await expect(page).toHaveTitle(/Practice Software Testing/);
  });
});
