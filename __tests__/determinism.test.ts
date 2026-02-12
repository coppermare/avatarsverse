import { describe, it, expect } from "vitest";
import { createAvatar, render } from "../index";

describe("determinism", () => {
  it("same seed and options produce identical SVG", () => {
    const seed = "alice@example.com";
    const options = { size: 128, radius: 10 };
    const a = createAvatar("voxel", seed, options);
    const b = createAvatar("voxel", seed, options);
    expect(a).toBe(b);
  });

  it("different seeds produce different SVGs", () => {
    const options = { size: 64 };
    const a = createAvatar("voxel", "alice", options);
    const b = createAvatar("voxel", "bob", options);
    expect(a).not.toBe(b);
  });

  it("different options with same seed produce different SVGs", () => {
    const seed = "user123";
    const a = createAvatar("voxel", seed, { size: 64 });
    const b = createAvatar("voxel", seed, { size: 128 });
    expect(a).not.toBe(b);
  });

  it("output is valid SVG with viewBox and xmlns", () => {
    const svg = createAvatar("voxel", "test", { size: 64 });
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 100 100"');
    expect(svg).toContain('width="64"');
    expect(svg).toContain('height="64"');
  });
});

describe("render", () => {
  it("throws for unknown style", () => {
    expect(() => render("unknown-style", "seed", {})).toThrow("Unknown style");
  });

  it("accepts size in range 16-512", () => {
    const small = createAvatar("voxel", "seed", { size: 16 });
    const large = createAvatar("voxel", "seed", { size: 512 });
    expect(small).toContain('width="16"');
    expect(large).toContain('width="512"');
  });

  it("clamps size outside range", () => {
    const tooSmall = createAvatar("voxel", "seed", { size: 1 });
    const tooLarge = createAvatar("voxel", "seed", { size: 999 });
    expect(tooSmall).toContain('width="16"');
    expect(tooLarge).toContain('width="512"');
  });

  it("applies radius when provided", () => {
    const withRadius = createAvatar("voxel", "seed", { radius: 25 });
    expect(withRadius).toContain("clipPath");
    expect(withRadius).toContain('rx="25"');
  });
});
