/**
 * Avatarsverse - Deterministic profile avatar library
 * Same seed, same avatar. Every time.
 *
 * @packageDocumentation
 */

import { AVATAR_MANIFEST } from "./avatar-manifest.js";
const CDN_BASE = "https://cdn.jsdelivr.net/gh/coppermare/avatarsverse";

/**
 * Cyrb53 hash for even distribution of seeds to avatar indices.
 * @internal
 */
export function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * Get a deterministic avatar URL from a seed.
 * Same seed always returns the same CDN URL.
 *
 * @param seed - Any string (username, email, ID)
 * @param category - Avatar category (default: "voxel")
 * @param total - Optional limit over the category's available avatars
 * @param tag - jsDelivr tag: "main" for latest, or "1.0.0" for pinned release
 */
export function avatarUrl(
  seed: string,
  category = "voxel",
  total?: number,
  tag = "main"
): string {
  if (!seed) {
    throw new Error("avatarUrl: `seed` is required.");
  }

  const manifestEntry = AVATAR_MANIFEST[category];
  const files = manifestEntry?.files ?? [];

  if (files.length === 0) {
    throw new Error(`avatarUrl: unknown category \`${category}\`.`);
  }

  if (typeof total === "number") {
    if (!Number.isInteger(total) || total <= 0) {
      throw new Error("avatarUrl: `total` must be a positive integer.");
    }
    if (total > files.length) {
      throw new Error(
        `avatarUrl: \`total\` cannot exceed the ${files.length} avatars in \`${category}\`.`
      );
    }
  }

  const pool = typeof total === "number" ? files.slice(0, total) : files;
  const filename = pool[cyrb53(seed) % pool.length];
  return `${CDN_BASE}@${encodeURIComponent(tag)}/avatars/${encodeURIComponent(category)}/${encodeURIComponent(filename)}`;
}
