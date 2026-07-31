import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const projectRoot = process.cwd();
const htmlPath = path.join(projectRoot, "investment-os", "index.html");
const pdfPath = path.join(
  projectRoot,
  "investment-os",
  "hermes-investment-os-lecture.pdf",
);

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto(pathToFileURL(htmlPath).href, {
    waitUntil: "networkidle",
    timeout: 120_000,
  });

  await page.waitForFunction(
    () => document.querySelectorAll(".deck-slide").length === 74,
    undefined,
    { timeout: 30_000 },
  );

  await page.addStyleTag({
    content: "@media print { .deck-slide:last-child { break-after: auto; } }",
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.emulateMedia({ media: "print" });

  const slideCount = await page.locator(".deck-slide").count();
  if (slideCount !== 74) {
    throw new Error("Expected 74 slides, found " + slideCount);
  }

  await page.pdf({
    path: pdfPath,
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });

  console.log("Created " + pdfPath + " from " + slideCount + " slides.");
} finally {
  await browser.close();
}
