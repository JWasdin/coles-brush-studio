const { test } = require("node:test");
const assert = require("node:assert/strict");
const studio = require("../js/studio.js");

test("returns natural manicure details as the default service", () => {
  const detail = studio.getServiceDetail("Unknown service");
  assert.equal(detail.title, "Natural manicure");
  assert.equal(detail.time, "About 50 minutes");
  assert.equal(detail.accent, "var(--coral)");
});

test("looks up painted details and care services", () => {
  const painted = studio.getServiceDetail("Painted nail details");
  assert.equal(painted.time, "About 75 minutes");
  assert.equal(painted.accent, "var(--cobalt)");

  const repair = studio.getServiceDetail("Nail care and repair");
  assert.equal(repair.time, "About 40 minutes");
  assert.equal(repair.accent, "var(--marigold)");
});

test("wraps gallery indexes in both directions", () => {
  assert.equal(studio.wrapIndex(0, 3), 0);
  assert.equal(studio.wrapIndex(2, 3), 2);
  assert.equal(studio.wrapIndex(3, 3), 0);
  assert.equal(studio.wrapIndex(-1, 3), 2);
});

test("builds a booking request from service, date, and time of day", () => {
  const request = studio.buildBookingRequest({
    service: "Painted nail details",
    date: "2026-10-12",
    timeOfDay: "Afternoon"
  });

  assert.match(request, /painted nail details/i);
  assert.match(request, /October 12, 2026/);
  assert.match(request, /afternoon/);
});

test("does not build a booking request without a date", () => {
  const request = studio.buildBookingRequest({
    service: "Natural manicure",
    date: "",
    timeOfDay: "Morning"
  });

  assert.equal(request, "");
});

test("builds a silk inquiry for the selected piece", () => {
  const inquiry = studio.buildSilkInquiry("Coral & marigold detail");
  assert.match(inquiry, /Coral & marigold detail/);
  assert.match(inquiry, /availability and purchase details/);
});

test("toggles gallery view labels", () => {
  assert.equal(studio.galleryToggleLabel(false), "View all");
  assert.equal(studio.galleryToggleLabel(true), "Detail view");
});
