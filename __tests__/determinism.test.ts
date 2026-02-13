import { describe, it, expect } from "vitest";
import { avatarUrl, cyrb53 } from "../index";

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
    const url = avatarUrl("user", "voxel", 15, "main");
    expect(url).toMatch(
      /^https:\/\/cdn\.jsdelivr\.net\/gh\/coppermare\/avatarverse@main\/avatars\/voxel\/\d+\.png$/
    );
  });

  it("accepts custom category, total, and tag", () => {
    const url = avatarUrl("seed", "voxel", 20, "1.0.0");
    expect(url).toContain("/avatars/voxel/");
    expect(url).toContain("@1.0.0");
    const n = parseInt(url.match(/(\d+)\.png$/)?.[1] ?? "0", 10);
    expect(n).toBeGreaterThanOrEqual(1);
    expect(n).toBeLessThanOrEqual(20);
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
