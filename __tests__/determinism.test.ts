import { describe, it, expect } from "vitest";
import { avatarUrl, cyrb53 } from "../index";
import { AVATAR_MANIFEST } from "../avatar-manifest";

describe("avatarUrl", () => {
  it("same seed returns same URL", () => {
    const a = avatarUrl("alice@example.com");
    const b = avatarUrl("alice@example.com");
    expect(a).toBe(b);
  });

  it("different seeds return different URLs", () => {
    const a = avatarUrl("alice");
    const b = avatarUrl("bob");
    expect(a).not.toBe(b);
  });

  it("returns valid jsDelivr CDN URL", () => {
    const url = avatarUrl("user", "voxel", undefined, "main");
    expect(url).toMatch(
      /^https:\/\/cdn\.jsdelivr\.net\/gh\/coppermare\/avatarverse@main\/avatars\/voxel\/[^/]+\.(png|jpe?g)$/
    );
  });

  it("resolves to an existing manifest file when total is omitted", () => {
    const url = avatarUrl("manifest-check-user");
    const filename = url.split("/").pop() ?? "";
    expect(AVATAR_MANIFEST.voxel.files).toContain(filename);
  });

  it("accepts custom category, total, and tag", () => {
    const url = avatarUrl("seed", "voxel", 20, "1.0.0");
    expect(url).toContain("/avatars/voxel/");
    expect(url).toContain("@1.0.0");
    const n = parseInt(url.match(/(\d+)\.png$/)?.[1] ?? "0", 10);
    expect(n).toBeGreaterThanOrEqual(1);
    expect(n).toBeLessThanOrEqual(20);
  });

  it("throws for invalid total", () => {
    expect(() => avatarUrl("seed", "voxel", 0)).toThrow();
    expect(() => avatarUrl("seed", "voxel", -1)).toThrow();
  });
});

describe("cyrb53", () => {
  it("same input returns same hash", () => {
    expect(cyrb53("alice")).toBe(cyrb53("alice"));
  });

  it("different input returns different hash", () => {
    expect(cyrb53("alice")).not.toBe(cyrb53("bob"));
  });

  it("is deterministic", () => {
    const hashes = Array.from({ length: 10 }, () => cyrb53("test"));
    expect(new Set(hashes).size).toBe(1);
  });
});
