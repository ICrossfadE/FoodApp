import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { mockupGroups } from "./page-manifest.ts";

// Перевіряє доступність макетів і адаптивність, не бізнес-логіку майбутнього MVP.
const baseURL = process.env.MOCKUP_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
});
const failures = [];
const screenshots = [];
const pages = mockupGroups.flatMap((g) => g.screens);
const urls = [
  ...new Set([
    ...pages.flatMap((s) => [
      s.href,
      ...s.states.map((state) => `${s.href}?state=${state}`),
    ]),
    "/menu?category=Піца",
    "/account/orders/unknown",
    "/admin/orders/unknown",
  ]),
];
await mkdir("artifacts/mockups", { recursive: true });
let checked = 0;
let a11yChecked = 0;
const errors = new Set();
const links = new Set();

try {
  for (const width of [360, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 960 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (err) => errors.add(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.add(msg.text());
    });
    for (const path of urls) {
      const response = await page.goto(`${baseURL}${path}`, {
        waitUntil: "load",
      });
      if (response.status() !== 200)
        failures.push(`${width}px ${path}: HTTP ${response.status()}`);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        if (doc.scrollWidth <= window.innerWidth + 1) return [];
        return [...document.querySelectorAll("body *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return (
              r.width > 0 &&
              (r.right > window.innerWidth + 1 || r.left < -1) &&
              getComputedStyle(el).position !== "fixed"
            );
          })
          .slice(0, 8)
          .map((el) => `${el.tagName}.${el.className}`);
      });
      if (overflow.length)
        failures.push(
          `${width}px ${path}: переповнення ${overflow.join(", ")}`,
        );
      if (!path.includes("unknown")) {
        try {
          await expect(page.locator("h1:visible")).toHaveCount(1);
        } catch {
          failures.push(`${path}: потрібен один видимий h1`);
        }
      }
      if (width === 390) {
        for (const href of await page
          .locator('a[href^="/"]')
          .evaluateAll((els) => els.map((el) => el.getAttribute("href"))))
          links.add(href);
      }
      // Повний аудит основних сторінок та форм, а не тест статичної розмітки.
      if (width === 390 && !path.includes("?") && !path.includes("unknown")) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        for (const violation of result.violations)
          failures.push(
            `${path}: a11y ${violation.id} (${violation.nodes.length})`,
          );
        a11yChecked++;
      }
      if (
        [390, 1440].includes(width) &&
        [
          "/",
          "/menu",
          "/cart",
          "/account",
          "/admin",
          "/admin/products",
          "/admin/orders/demo-1042",
        ].includes(path)
      ) {
        const file = `artifacts/mockups/${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}-${width}.png`;
        await page.screenshot({ path: file, fullPage: true });
        screenshots.push(file);
      }
      checked++;
    }
    // Клавіатура й мобільне меню перевіряються після справжнього переходу.
    await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    if ((await page.locator(":focus").textContent()) !== "До основного вмісту")
      failures.push(`${width}px: перший Tab не веде до skip-link`);
    await page.keyboard.press("Enter");
    if (!page.url().endsWith("#main"))
      failures.push(`${width}px: skip-link не працює`);
    if (width < 801) {
      const summary = page.locator(".mobile-menu summary");
      await summary.focus();
      await page.keyboard.press("Enter");
      if (
        !(await page
          .locator(".mobile-menu")
          .getAttribute("open")
          .then((x) => x !== null))
      )
        failures.push(`${width}px: меню не відкривається клавіатурою`);
      await page.locator('.mobile-menu a[href="/menu"]').click();
      await page.waitForURL((url) => url.pathname === "/menu");
      if (new URL(page.url()).pathname !== "/menu")
        failures.push(`${width}px: перехід з мобільного меню не працює`);
    }
    console.log(`Перевірено ${width}px: ${urls.length} сторінок і станів.`);
    await context.close();
  }

  const request = await browser.newContext();
  for (const href of links) {
    const response = await request.request.get(`${baseURL}${href}`);
    if (response.status() !== 200)
      failures.push(`Посилання ${href}: HTTP ${response.status()}`);
  }
  const removed = await request.request.get(`${baseURL}/mockups`);
  if (removed.status() !== 404)
    failures.push("Видалений маршрут /mockups не повертає 404");
  const notFound = await request.request.get(`${baseURL}/nonexistent-page`);
  if (notFound.status() !== 404)
    failures.push("Невідомий маршрут не повертає 404");
  await request.close();
} finally {
  await browser.close();
}
for (const error of errors) failures.push(`Browser error: ${error}`);
const report = {
  date: new Date().toISOString(),
  checked,
  a11yChecked,
  internalLinks: links.size,
  widths: [360, 390, 768, 1440],
  failures,
  screenshots,
};
await writeFile(
  "artifacts/mockups/report.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
