import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: "msedge" });
const failures = [];
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const [url, button] of [
    ["/admin/products", "Архівувати"],
    ["/admin/categories", "Видалити"],
    ["/admin/banners", "Видалити"],
    ["/admin/orders/demo-1042", "Скасувати замовлення"],
  ]) {
    await page.goto(base + url, { waitUntil: "networkidle" });
    const trigger = page
      .getByRole("button", { name: button, exact: true })
      .first();
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    for (const v of result.violations) failures.push(url + ": " + v.id);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      if (!(await dialog.evaluate((el) => el.contains(document.activeElement))))
        failures.push(url + ": фокус вийшов із діалогу");
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  for (const [url, expected] of [
    ["/admin/products/02/edit", "Боул з овочами"],
    ["/admin/categories/02/edit", "Основні страви"],
    ["/admin/banners/02/edit", "Сезонна пропозиція"],
  ]) {
    await page.goto(base + url);
    const field = page
      .getByRole("textbox", { name: /Назва|Заголовок/ })
      .first();
    if ((await field.inputValue()) !== expected)
      failures.push(url + ": неправильна сутність у формі");
  }
  for (const url of [
    "/admin/products/unknown/edit",
    "/admin/categories/unknown/edit",
    "/admin/banners/unknown/edit",
    "/admin/products/01/delete",
    "/admin/categories/01/delete",
    "/admin/banners/01/delete",
    "/admin/orders/demo-1042/cancel",
  ]) {
    const response = await context.request.get(base + url);
    if (response.status() !== 404) failures.push(url + ": очікувався 404");
  }
  await context.close();
  const motion = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const animated = await motion.newPage();
  const errors = [];
  animated.on("pageerror", (e) => errors.push(e.message));
  await animated.goto(base + "/", { waitUntil: "networkidle" });
  await animated.waitForFunction(
    () =>
      Number(getComputedStyle(document.querySelector(".hero-copy")).opacity) >
      0.99,
  );
  await animated.locator(".product").first().scrollIntoViewIfNeeded();
  await animated.waitForFunction(
    () =>
      Number(getComputedStyle(document.querySelector(".product")).opacity) >
      0.99,
  );
  await animated.locator('.desktop-nav a[href="/menu"]').click();
  await animated.waitForURL("**/menu");
  await animated.waitForFunction(
    () =>
      Number(
        getComputedStyle(document.querySelector(".page-heading")).opacity,
      ) > 0.99,
  );
  await animated.locator('.desktop-nav a[href="/cart"]').click();
  await animated.waitForURL("**/cart");
  await animated.waitForFunction(
    () =>
      Number(
        getComputedStyle(document.querySelector(".page-heading")).opacity,
      ) > 0.99,
  );
  failures.push(...errors);
  await motion.close();
} finally {
  await browser.close();
}
await mkdir("artifacts/front02", { recursive: true });
await writeFile(
  "artifacts/front02/interactions.json",
  JSON.stringify(
    {
      dialogs: 4,
      forms: 3,
      notFoundRoutes: 7,
      motion: "GSAP appearance, scroll, two client transitions",
      failures,
    },
    null,
    2,
  ),
);
console.log(JSON.stringify({ failures }, null, 2));
if (failures.length) process.exitCode = 1;
