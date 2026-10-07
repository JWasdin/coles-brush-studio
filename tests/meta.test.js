const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const site = "https://colewasdin.com";

function metaContent(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const property = new RegExp('(?:property|name)="' + escaped + '"[^>]*content="([^"]+)"');
  const contentFirst = new RegExp('content="([^"]+)"[^>]*(?:property|name)="' + escaped + '"');
  const match = html.match(property) || html.match(contentFirst);
  return match ? match[1] : null;
}

test("includes Open Graph title, description, and canonical URL", () => {
  assert.equal(metaContent("og:title"), "Cole’s Brush Studio");
  assert.equal(metaContent("og:description"), "Natural nail care, hand-painted details, and one-of-a-kind silks.");
  assert.equal(metaContent("og:url"), site + "/");
  assert.equal(metaContent("og:type"), "website");
});

test("points social previews at an absolute hero share image", () => {
  assert.equal(metaContent("og:image"), site + "/og-image.jpg");
  assert.equal(metaContent("og:image:width"), "1200");
  assert.equal(metaContent("og:image:height"), "630");
  assert.equal(metaContent("twitter:card"), "summary_large_image");
  assert.equal(metaContent("twitter:image"), site + "/og-image.jpg");
});

test("ships a 1200 by 630 share image file", () => {
  const imagePath = path.join(__dirname, "..", "og-image.jpg");
  assert.ok(fs.existsSync(imagePath), "og-image.jpg should exist");
});
