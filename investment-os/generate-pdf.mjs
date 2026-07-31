import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
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
const partsDir = mkdtempSync(path.join(os.tmpdir(), "hermes-lecture-pdf-"));
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
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

  await page.emulateMedia({ media: "screen" });
  await page.addStyleTag({
    content: [
      "@page { size: 13.333in 7.5in; margin: 0; }",
      "html, body, .deck-app, .deck-viewport, .slide-frame, #slideMount {",
      "  width: 13.333in !important;",
      "  height: 7.5in !important;",
      "  min-width: 0 !important;",
      "  max-width: none !important;",
      "  min-height: 0 !important;",
      "  max-height: none !important;",
      "  margin: 0 !important;",
      "  padding: 0 !important;",
      "  overflow: hidden !important;",
      "}",
      "body, .deck-app, .deck-viewport {",
      "  display: block !important;",
      "  background: white !important;",
      "}",
      ".deck-topbar, .deck-footer, .notes-drawer, .modal-backdrop {",
      "  display: none !important;",
      "}",
      ".slide-frame {",
      "  position: relative !important;",
      "  border: 0 !important;",
      "  box-shadow: none !important;",
      "  aspect-ratio: 16 / 9 !important;",
      "  container-type: size !important;",
      "}",
      "#slideMount { position: absolute !important; inset: 0 !important; }",
      ".deck-slide { display: none !important; }",
      ".deck-slide.pdf-export {",
      "  position: absolute !important;",
      "  inset: 0 !important;",
      "  display: grid !important;",
      "  width: 100% !important;",
      "  height: 100% !important;",
      "}",
    ].join("\n"),
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const slideCount = await page.locator(".deck-slide").count();
  if (slideCount !== 74) {
    throw new Error("Expected 74 slides, found " + slideCount);
  }

  const partPaths = [];

  for (let index = 0; index < slideCount; index += 1) {
    await page.evaluate((activeIndex) => {
      document.querySelectorAll(".deck-slide").forEach((slide, slideIndex) => {
        slide.classList.toggle("pdf-export", slideIndex === activeIndex);
      });
    }, index);

    const partPath = path.join(
      partsDir,
      "slide-" + String(index + 1).padStart(3, "0") + ".pdf",
    );

    await page.pdf({
      path: partPath,
      printBackground: true,
      preferCSSPageSize: true,
      pageRanges: "1",
      tagged: true,
    });
    partPaths.push(partPath);
  }

  execFileSync("pdfunite", [...partPaths, pdfPath]);
  console.log("Created " + pdfPath + " from " + slideCount + " one-page slides.");
} finally {
  await browser.close();
  rmSync(partsDir, { recursive: true, force: true });
}
