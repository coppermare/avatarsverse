import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { avatarUrl, cyrb53 } from "../dist/index.js";

const manifest = JSON.parse(
  await readFile(new URL("../avatars/avatars.json", import.meta.url), "utf8")
);

test("avatarUrl is deterministic", () => {
  assert.equal(avatarUrl("alice@example.com"), avatarUrl("alice@example.com"));
  assert.notEqual(avatarUrl("alice"), avatarUrl("bob"));
});

test("avatarUrl returns an existing manifest file", () => {
  const url = avatarUrl("manifest-check-user");
  const filename = url.split("/").at(-1);

  assert.match(
    url,
    /^https:\/\/cdn\.jsdelivr\.net\/gh\/coppermare\/avatarsverse@main\/avatars\/voxel\/[^/]+\.(png|jpe?g)$/
  );
  assert.ok(manifest.voxel.files.includes(filename));
});

test("avatarUrl supports an explicit pool and release tag", () => {
  const url = avatarUrl("seed", "voxel", 20, "1.0.0");
  const filename = url.split("/").at(-1);

  assert.match(url, /@1\.0\.0\/avatars\/voxel\//);
  assert.ok(manifest.voxel.files.slice(0, 20).includes(filename));
});

test("avatarUrl rejects invalid input", () => {
  assert.throws(() => avatarUrl(""), /seed.*required/);
  assert.throws(() => avatarUrl("seed", "voxel", 0), /positive integer/);
  assert.throws(() => avatarUrl("seed", "voxel", 1.5), /positive integer/);
  assert.throws(() => avatarUrl("seed", "voxel", 360), /cannot exceed/);
  assert.throws(() => avatarUrl("seed", "unknown"), /unknown category/);
});

test("cyrb53 is deterministic and seed-sensitive", () => {
  assert.equal(cyrb53("alice"), cyrb53("alice"));
  assert.notEqual(cyrb53("alice"), cyrb53("bob"));
  assert.equal(
    new Set(Array.from({ length: 10 }, () => cyrb53("test"))).size,
    1
  );
});
